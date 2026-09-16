/**
 * 引擎层 —— 状态、存档、导航与各项规则。
 * 这一层负责“游戏怎么运转”，界面在 views.js，内容在 data/ 里。
 * 语法基线：ES2017 / Chrome 61（不使用可选链、空值合并、replaceAll 等新语法）。
 */
(function () {
	'use strict';

	var CFG = window.WYL_CONFIG;
	var TEXT = window.WYL_TEXT;
	var EVENTS = window.WYL_EVENTS;
	var STORY = window.WYL_STORY;
	var DETAILS = window.WYL_DETAILS;
	var CLUES = window.WYL_CLUES;
	var CLUE_CASE = window.WYL_CLUE_CASE || [];
	var CLUE_KIND_COLORS = window.WYL_CLUE_KIND_COLORS || {};
	var CLUE_INDEX = window.WYL_CLUE_INDEX || {};
	var CLOZE = window.WYL_CLOZE;
	var ITEMS = window.WYL_ITEMS;
	var RECIPES = window.WYL_RECIPES;
	var HINTS = window.WYL_HINTS;
	var CLUE_KINDS = window.WYL_CLUE_KINDS || ['其它'];
	var CLUE_KIND_MAP = window.WYL_CLUE_KIND || {};

	// ------------------------------------------------------------ 索引

	var byId = {};
	var byName = {};
	EVENTS.forEach(function (e) {
		byId[e.id] = e;
		byName[e.name] = e;
	});

	var nodes = {};
	EVENTS.forEach(function (e) {
		nodes[e.name] = { kind: 'event', ref: e };
	});
	STORY.forEach(function (s) {
		nodes[s.id] = { kind: s.kind, ref: s };
	});

	function resolveNode(name) {
		return Object.prototype.hasOwnProperty.call(nodes, name) ? nodes[name] : null;
	}

	// ------------------------------------------------------------ 状态

	function freshState() {
		return {
			v: 1,
			node: CFG.startNode,
			stack: [],
			checkpoint: '',     // 还没做完选择的卡点页（story.js 里写了 checkpoint 的页面）
			clues: {},
			filled: {},
			visited: {},
			items: ITEMS.map(function () { return 0; }),
			done: (function () {
				var buckets = {};
				(CFG.tracks || []).forEach(function (t) { buckets[t.key] = {}; });
				return buckets;
			})(),
			flags: {},
			once: {},
			chat: {},
			collected: {},
			read: {}
		};
	}

	var state = freshState();
	var pending = null;   // 有自动存档时，先回到标题页，点“继续”再回这里

	// ------------------------------------------------------------ 工具

	function each(obj, fn) {
		if (!obj) return;
		for (var k in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, k)) fn(obj[k], k);
		}
	}

	function count(obj) {
		var n = 0;
		each(obj, function () { n++; });
		return n;
	}

	function escapeHtml(s) {
		return String(s)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	/** #线索词 / #线索词;另一个线索 / #行,列 统一解析成 [行,列] 坐标 */
	function resolveClueRefs(raw) {
		var out = [];
		String(raw).split(';').forEach(function (piece) {
			piece = piece.trim();
			if (!piece) return;
			if (/^\d+\s*,\s*\d+$/.test(piece)) {
				var rc = piece.split(',');
				out.push([Number(rc[0]), Number(rc[1])]);
				return;
			}
			var hit = CLUE_INDEX[piece];
			if (hit) out.push([hit[0], hit[1]]);
		});
		return out.length ? out : null;
	}

	/**
	 * 把一段带标记的文本拆成 token 数组。
	 * [[词]] / [[词|#线索词]] / [[词|#线索词|详情]] / [[词|节点]]
	 */
	function parseMarkup(text) {
		var out = [];
		var re = /\[\[([^\[\]]+?)\]\]/g;
		var last = 0;
		var m;
		while ((m = re.exec(text))) {
			if (m.index > last) out.push({ type: 'text', text: text.slice(last, m.index) });
			var parts = m[1].split('|');
			var link = { type: 'link', display: parts[0].trim(), coords: null, target: null };
			for (var i = 1; i < parts.length; i++) {
				var part = parts[i].trim();
				if (!part) continue;
				if (part.charAt(0) === '#') {
					link.coords = resolveClueRefs(part.slice(1));
				} else {
					link.target = part;
				}
			}
			if (!link.target && Object.prototype.hasOwnProperty.call(DETAILS, link.display)) {
				link.target = link.display;
			}
			link.isDetail = !!(link.coords || (link.target && Object.prototype.hasOwnProperty.call(DETAILS, link.target)));
			out.push(link);
			last = re.lastIndex;
		}
		if (last < text.length) out.push({ type: 'text', text: text.slice(last) });
		return out;
	}

	function toPlainText(text) {
		return parseMarkup(text).map(function (t) {
			return t.type === 'text' ? t.text : t.display;
		}).join('');
	}

	// ------------------------------------------------------------ 线索

	function clueKey(r, c) { return r + ',' + c; }

	function clueWord(r, c) {
		var row = CLUES[r] || [];
		return row[c];
	}

	/** 线索类别（人物 / 地点 / 物品 / 其它），表里没有的词归入「其它」 */
	function clueKind(word) {
		return Object.prototype.hasOwnProperty.call(CLUE_KIND_MAP, word) ? CLUE_KIND_MAP[word] : '其它';
	}

	function clueKinds() {
		return CLUE_KINDS;
	}

	/** 线索颜色：同一类别的词用同一个颜色 */
	function clueKindColor(word) {
		var kind = clueKind(word);
		return CLUE_KIND_COLORS[kind] || CLUE_KIND_COLORS['其它'] || '#d4b06a';
	}

	function hasClue(r, c) {
		return !!state.clues[clueKey(r, c)];
	}

	function unlockClue(r, c) {
		if (!clueWord(r, c)) return false;
		if (state.clues[clueKey(r, c)]) return false;
		state.clues[clueKey(r, c)] = 1;
		return true;
	}

	function unlockedClues() {
		var list = [];
		CLUES.forEach(function (row, r) {
			row.forEach(function (word, c) {
				if (hasClue(r, c)) list.push({ r: r, c: c, word: word, color: clueKindColor(word) });
			});
		});
		return list;
	}

	/**
	 * 清除已获得的关键词：写案子编号（如 2）就只保留那一案的词，其余的清掉；
	 * 写 true 则清空全部。换案时用——第二案开始时把第一案的词收走，
	 * 思念还原里才不会一直混着上一案的词。认不出属于哪一案的词一律留着。
	 */
	function clearClues(keep) {
		if (!state.clues) state.clues = {};
		if (keep === true) { state.clues = {}; return; }
		var keepCase = Number(keep);
		Object.keys(state.clues).forEach(function (key) {
			var rc = String(key).split(',');
			var c = (CLUE_CASE[Number(rc[0])] || [])[Number(rc[1])];
			if (c === undefined) return;
			if (c !== keepCase) delete state.clues[key];
		});
	}

	// ------------------------------------------------------------ 填空

	function blanksOf(index) {
		var out = [];
		var re = /\{\{(\d+),(\d+)\}\}/g;
		var m;
		var text = CLOZE[index] || '';
		while ((m = re.exec(text))) out.push({ r: Number(m[1]), c: Number(m[2]) });
		return out;
	}

	function eventState(ev) {
		var blanks = blanksOf(ev.index);
		var filled = 0;
		for (var i = 0; i < blanks.length; i++) {
			if (state.filled[ev.index + '_' + i]) filled++;
		}
		return {
			blanks: blanks,
			filled: filled,
			total: blanks.length,
			// 没有填空的场景（正文里写明「无需复原」的那种）直接算完成，好让收集按钮出现
			complete: blanks.length === 0 || filled === blanks.length
		};
	}

	function isFilled(index, pos) {
		return !!state.filled[index + '_' + pos];
	}

	function fillBlank(index, pos) {
		state.filled[index + '_' + pos] = 1;
	}

	// ------------------------------------------------------------ 进度

	function trackDone(key, slot) {
		return !!(state.done[key] && state.done[key][slot]);
	}

	function trackCount(key) {
		return count(state.done[key]);
	}

	function markDone(key, slot) {
		if (!state.done[key]) state.done[key] = {};
		state.done[key][slot] = 1;
	}

	/** 某个事件的思念是否已经收集过 */
	function collected(eventId) {
		return !!(state.collected && state.collected[eventId]);
	}

	function totalDone() {
		var n = 0;
		CFG.tracks.forEach(function (t) { n += trackCount(t.key); });
		return n;
	}

	function totalPossible() {
		return CFG.tracks.reduce(function (sum, t) { return sum + t.total; }, 0);
	}

	function hasItem(i) {
		return !!state.items[i];
	}

	function stage2Open() {
		if (state.flags.stage2Unlocked) return true;
		rememberStage2();
		return !!state.flags.stage2Unlocked;
	}

	/**
	 * 拿到后半程入口道具（config.js 的 stage2Items）就记一个标记。
	 * 换案子会清空道具栏，但已经解锁的档案柜（二）这类入口不能再锁回去，所以用标记记着。
	 */
	function rememberStage2() {
		if (state.flags.stage2Unlocked) return;
		var list = CFG.stage2Items || (CFG.stage2Item === undefined ? [] : [CFG.stage2Item]);
		for (var i = 0; i < list.length; i++) {
			if (state.items[list[i]]) { state.flags.stage2Unlocked = 1; return; }
		}
	}

	function unlocked(rule) {
		if (rule === 'always') return true;
		if (rule === 'tutorial') return !!state.flags.tutorial;
		if (rule === 'stage2') return stage2Open();
		if (rule === 'visited') return visitedAny();
		return true;
	}

	/**
	 * 现在在第几案：剧情节点写 flags.case 决定（换案子时写一次）。
	 * 没写过就按「进过哪一案」推——进过第二案的场景就算第二案，免得忘了写。
	 */
	function currentCase() {
		if (state.flags.case) return Number(state.flags.case) || 1;
		var n = 1;
		EVENTS.forEach(function (e) {
			var c = Number(e.case) > 1 ? Number(e.case) : 1;
			if (c > n && state.visited[e.name]) n = c;
		});
		return n;
	}

	/**
	 * 配置里 when / listedWhen 条件的判断：
	 *   core      已拿到思念核心
	 *   tutorial  教程结束
	 *   stage2    已拿到后半程入口道具（月琴 / 明亮的玉镯）
	 *   其它字符串 = 剧情标记名（story.js 的 onEnter.flags 里写的那个），置上了才显示
	 */
	function cond(flag) {
		if (!flag) return true;
		if (flag === 'core') return trackCount('core') > 0;
		if (flag === 'tutorial') return !!state.flags.tutorial;
		if (flag === 'stage2') return stage2Open();
		return !!state.flags[flag];
	}

	function visitedAny() {
		for (var k in state.visited) {
			if (Object.prototype.hasOwnProperty.call(state.visited, k)) return true;
		}
		return false;
	}

	// ------------------------------------------------------------ 导航与效果

	function applyEffects(fx) {
		if (!fx) return;
		if (fx.items) {
			state.items = fx.items.slice();
		}
		if (fx.clearItems) {
			state.items = ITEMS.map(function () { return 0; });
		}
		if (fx.grants) {
			fx.grants.forEach(function (i) { state.items[i] = 1; });
		}
		if (fx.fillTrack) {
			// 把整条进度线一次性收满（测试入口用：从某个阶段开头直接开始）
			fx.fillTrack.forEach(function (key) {
				var total = 0;
				CFG.tracks.forEach(function (t) { if (t.key === key) total = t.total; });
				for (var i = 0; i < total; i++) markDone(key, i);
			});
		}
		if (fx.unlockAllClues) {
			// 解锁全部关键词（测试入口用）
			CLUES.forEach(function (row, r) {
				row.forEach(function (word, c) { state.clues[clueKey(r, c)] = 1; });
			});
		}
		if (fx.unlockClues) {
			// 直接发几个关键词（写线索词就行，玩家不用点）
			fx.unlockClues.forEach(function (word) {
				var hit = CLUE_INDEX[word];
				if (hit) state.clues[clueKey(hit[0], hit[1])] = 1;
			});
		}
		if (fx.clearClues) clearClues(fx.clearClues);
		if (fx.items || fx.grants) rememberStage2();
		if (fx.visited) state.visited[fx.visited] = 1;
		if (fx.done) markDone(fx.done[0], fx.done[1]);
		if (fx.flags) {
			each(fx.flags, function (v, k) { state.flags[k] = v; });
		}
		if (fx.once) {
			each(fx.once, function (v, k) { state.once[k] = v; });
		}
	}

	function advanceTarget() {
		for (var i = 0; i < CFG.advance.length; i++) {
			var rule = CFG.advance[i];
			if (state.flags[rule.once]) continue;
			if (trackCount(rule.track) >= rule.count) return rule.to;
		}
		return null;
	}

	function enter(name) {
		var node = resolveNode(name);
		if (!node) return false;
		var ref = node.ref;
		if (node.kind === 'event') {
			state.visited[ref.name] = 1;
		} else {
			applyEffects(ref.onEnter);
			applyEffects({ grants: ref.grants });
			// 卡点页（story.js 里写了 checkpoint 的页面）：记下它，玩家跳去别处之后还能回来；
			// 一旦走了它给出的某个选项，这个卡点就算做完了，界面上的「返回」也跟着消失。
			if (ref.checkpoint) state.checkpoint = ref.id;
			else if (state.checkpoint && isChoiceOf(state.checkpoint, ref.id)) state.checkpoint = '';
		}
		return true;
	}

	/** ref.id 是不是卡点页给出的选项之一（会 / 不会 那种） */
	function isChoiceOf(checkpointId, targetId) {
		var node = resolveNode(checkpointId);
		if (!node) return true;      // 卡点页被改名或删了，就当它已经做完，别再卡着玩家
		var outs = (node.ref.links || []);
		if (node.ref.next) outs = outs.concat([node.ref.next]);
		for (var i = 0; i < outs.length; i++) {
			if (outs[i] && outs[i].to === targetId) return true;
		}
		return false;
	}

	/** 跳转到某个节点（name 可以是节点名或事件 id） */
	function go(name, options) {
		var target = name;
		if (!resolveNode(target) && byId[target]) target = byId[target].name;
		if (!resolveNode(target)) {
			toast('未知节点：' + name);
			return;
		}
		var opts = options || {};
		if (opts.push !== false && state.node !== target) {
			state.stack.push(state.node);
			if (state.stack.length > 60) state.stack.shift();
		}
		state.node = target;
		enter(target);

		// 阶段推进（原版 PassageHeader 的自动跳转）
		if (!opts.noAdvance) {
			var guard = 0;
			var next = advanceTarget();
			while (next && next !== state.node && guard++ < 4) {
				state.stack.push(state.node);
				state.node = next;
				enter(next);
				next = advanceTarget();
			}
		}
		persist();
		render();
	}

	/** 还欠着一次阶段推进时，返回要去的节点名（界面据此显示「继续」） */
	function pendingAdvance() {
		return advanceTarget();
	}

	function back() {
		var prev = state.stack.pop();
		// 作者改过节点名之后，老存档里的这一格可能已经不存在了：跳过它接着往前找
		while (prev !== undefined && !resolveNode(prev)) prev = state.stack.pop();
		if (prev === undefined) return;
		state.node = prev;
		persist();
		render();
	}

	// ------------------------------------------------------------ 调查 / 合成 / 填空动作

	/** 点击调查词：解锁线索并（或）打开详情卡 */
	function inspect(link) {
		var gained = [];
		if (link.coords) {
			link.coords.forEach(function (rc) {
				if (unlockClue(rc[0], rc[1])) gained.push(clueWord(rc[0], rc[1]));
			});
		}
		var hasCard = link.target && Object.prototype.hasOwnProperty.call(DETAILS, link.target);
		if (hasCard) {
			state.read[link.target] = 1;
			persist();
			render();
			Views.pushDetail(link.target, link.display, gained);
			return;
		}
		if (gained.length) {
			toast(TEXT.toast.clue + '：' + gained.join('、'));
			persist();
			render();
		}
		if (link.target) go(link.target);
	}

	/** 这个词是否已经查看过（用于把调查词改成“已读”配色） */
	function isRead(name) {
		return !!(state.read && state.read[name]);
	}

	function checkRecipe(selected) {
		var sorted = selected.slice().sort(function (a, b) { return a - b; });
		for (var i = 0; i < RECIPES.length; i++) {
			var want = RECIPES[i].items.slice().sort(function (a, b) { return a - b; });
			if (want.length !== sorted.length) continue;
			var same = true;
			for (var j = 0; j < want.length; j++) {
				if (want[j] !== sorted[j]) { same = false; break; }
			}
			if (same) return RECIPES[i];
		}
		return null;
	}

	function collect(eventId) {
		var ev = byId[eventId] || byName[eventId];
		if (!ev || !ev.collect) return;
		state.collected[ev.id] = 1;
		if (ev.collect.track) markDone(ev.collect.track, ev.collect.slot);
		var track = null;
		for (var i = 0; i < CFG.tracks.length; i++) {
			if (CFG.tracks[i].key === ev.collect.track) track = CFG.tracks[i];
		}
		if (track) {
			toast('已收集' + track.name + '　' + trackCount(track.key) + '/' + track.total);
		}
		persist();
		// 先让玩家看完这一页（原版也是下一次翻页才跳到下一阶段）
		go(ev.collect.to, { noAdvance: true });
	}

	// ------------------------------------------------------------ 存档

	var storage = (function () {
		try {
			var k = '__wyl_probe__';
			window.localStorage.setItem(k, '1');
			window.localStorage.removeItem(k);
			return window.localStorage;
		} catch (e) {
			return null;
		}
	})();

	function slotKey(n) { return CFG.storageKey + '.slot' + n; }

	function persist() {
		if (!storage) return;
		try {
			var snapshot = state;
			if (pending) {
				snapshot = {};
				each(state, function (v, k) { snapshot[k] = v; });
				snapshot.node = pending;
			}
			storage.setItem(CFG.storageKey, JSON.stringify(snapshot));
		} catch (e) { /* 空间不足或隐私模式，忽略 */ }
	}

	function restore() {
		if (!storage) return false;
		try {
			var raw = storage.getItem(CFG.storageKey);
			if (!raw) return false;
			var parsed = JSON.parse(raw);
			if (!parsed || parsed.v !== 1) return false;
			state = mergeState(parsed);
			return true;
		} catch (e) {
			return false;
		}
	}

	function mergeState(parsed) {
		var s = freshState();
		each(parsed, function (v, k) {
			if (k === 'items' || k === 'clues' || k === 'filled' || k === 'visited' ||
				k === 'done' || k === 'flags' || k === 'once' || k === 'stack') {
				s[k] = v;
			} else {
				s[k] = v;
			}
		});
		if (!s.items || s.items.length !== ITEMS.length) {
			// 加了新道具之后，老存档的道具数组会更短：保留已经拿到的，缺的补 0
			var blank = freshState().items;
			if (s.items && s.items.length < ITEMS.length) {
				for (var i = 0; i < s.items.length; i++) blank[i] = s.items[i];
			}
			s.items = blank;
		}
		if (!resolveNode(s.node)) s.node = CFG.startNode;
		return s;
	}

	function saveToSlot(n) {
		if (!storage) return false;
		try {
			storage.setItem(slotKey(n), JSON.stringify({ at: now(), state: state }));
			return true;
		} catch (e) {
			return false;
		}
	}

	function loadFromSlot(n) {
		if (!storage) return false;
		try {
			var raw = storage.getItem(slotKey(n));
			if (!raw) return false;
			var parsed = JSON.parse(raw);
			state = mergeState(parsed.state);
			persist();
			render();
			return true;
		} catch (e) {
			return false;
		}
	}

	function slotInfo(n) {
		if (!storage) return null;
		try {
			var raw = storage.getItem(slotKey(n));
			if (!raw) return null;
			var parsed = JSON.parse(raw);
			return { at: parsed.at, total: parsed.state ? countProgress(parsed.state) : 0 };
		} catch (e) {
			return null;
		}
	}

	function countProgress(s) {
		var n = 0;
		each(s.done, function (bucket) { n += count(bucket); });
		return n;
	}

	function clearSlot(n) {
		if (!storage) return;
		try { storage.removeItem(slotKey(n)); } catch (e) { /* ignore */ }
	}

	function now() {
		var d = new Date();
		function pad(v) { return (v < 10 ? '0' : '') + v; }
		return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
			' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
	}

	function restart() {
		state = freshState();
		pending = null;
		persist();
		go(CFG.firstNode, { push: false });
	}

	/** 教程对话的展开进度：按节点名记录已经点开几条 */
	function chatProgress(nodeId) {
		return state.chat && state.chat[nodeId] ? state.chat[nodeId] : 0;
	}

	function setChatProgress(nodeId, count) {
		if (!state.chat) state.chat = {};
		state.chat[nodeId] = count;
		persist();
	}

	/** 有存档时把标题页顶上来，等玩家选择继续或重开 */
	function holdForResume() {
		pending = state.node;
		state.node = CFG.startNode;
		// 导航栈留着：下次点「继续」回到那一页时，事件页上的「返回上一页」还得能用
	}

	function resume() {
		var target = pending || CFG.firstNode;
		pending = null;
		go(target, { push: false });
	}

	// ------------------------------------------------------------ 界面辅助

	var toastTimer = null;

	function toast(message) {
		Views.showToast(message);
	}

	function render() {
		Views.renderStage();
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = null;
	}

	// ------------------------------------------------------------ 能力检测

	function detectCapabilities() {
		var root = document.documentElement;
		try {
			var flex = document.createElement('div');
			flex.style.position = 'absolute';
			flex.style.visibility = 'hidden';
			flex.style.display = 'flex';
			flex.style.flexDirection = 'column';
			flex.style.rowGap = '1px';
			flex.appendChild(document.createElement('div'));
			flex.appendChild(document.createElement('div'));
			document.body.appendChild(flex);
			if (flex.scrollHeight === 1) root.className += ' supports-flex-gap';
			flex.parentNode.removeChild(flex);
		} catch (e) { /* ignore */ }

		setAppHeight();
		window.addEventListener('resize', setAppHeight);
		if (window.visualViewport) {
			window.visualViewport.addEventListener('resize', setAppHeight);
		}
	}

	function setAppHeight() {
		var h = window.innerHeight || document.documentElement.clientHeight;
		document.documentElement.style.setProperty('--app-height', h + 'px');
	}

	// ------------------------------------------------------------ 导出

	window.App = {
		config: CFG,
		text: TEXT,
		details: DETAILS,
		events: EVENTS,
		story: STORY,
		hints: HINTS,
		items: ITEMS,
		recipes: RECIPES,
		clues: CLUES,
		cloze: CLOZE,

		state: function () { return state; },
		node: function () { return nodes[state.node] || null; },
		nodeName: function () { return state.node; },
		resolve: resolveNode,
		byId: function (id) { return byId[id]; },
		byName: function (n) { return byName[n]; },

		go: go,
		pendingAdvance: pendingAdvance,
		back: back,
		canBack: function () { return state.stack.length > 0; },
		checkpoint: function () { return state.checkpoint || ''; },
		resume: resume,
		holdForResume: holdForResume,
		pendingResume: function () { return !!pending; },
		inspect: inspect,
		collect: collect,
		checkRecipe: checkRecipe,
		restart: restart,
		persist: persist,
		restore: restore,
		saveToSlot: saveToSlot,
		loadFromSlot: loadFromSlot,
		slotInfo: slotInfo,
		clearSlot: clearSlot,
		toast: toast,
		render: render,
		setup: detectCapabilities,

		parseMarkup: parseMarkup,
		toPlainText: toPlainText,
		escapeHtml: escapeHtml,

		clueWord: clueWord,
		clueKind: clueKind,
		clueKinds: clueKinds,
		clueKindColor: clueKindColor,
		hasClue: hasClue,
		isRead: isRead,
		unlockClue: unlockClue,
		unlockedClues: unlockedClues,
		blanksOf: blanksOf,
		eventState: eventState,
		isFilled: isFilled,
		fillBlank: fillBlank,
		trackDone: trackDone,
		collected: collected,
		trackCount: trackCount,
		markDone: markDone,
		totalDone: totalDone,
		totalPossible: totalPossible,
		hasItem: hasItem,
		stage2Open: stage2Open,
		currentCase: currentCase,
		visitedAny: visitedAny,
		unlocked: unlocked,
		cond: cond,
		chatProgress: chatProgress,
		setChatProgress: setChatProgress
	};
})();
