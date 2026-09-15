/**
 * 界面层 —— 主舞台渲染、各个面板（共鸣仪 / 思念还原 / 案卷 / 菜单）、详情卡与提示。
 */
(function () {
	'use strict';

	var T = window.WYL_TEXT;
	var CFG = window.WYL_CONFIG;
	var A = window.App;

	// ------------------------------------------------------------ DOM 工具

	function mk(tag, cls, text) {
		var node = document.createElement(tag);
		if (cls) node.className = cls;
		if (text !== undefined && text !== null) node.textContent = text;
		return node;
	}

	function clear(node) {
		while (node.firstChild) node.removeChild(node.firstChild);
	}

	/**
	 * 文案留空 = 整个模块不显示。
	 * 在 ui.js 里把某条文案改成空字符串，界面上对应的提示 / 占位就会自动消失。
	 */
	function textEl(tag, cls, text) {
		if (text === undefined || text === null || String(text).trim() === '') return null;
		return mk(tag, cls, text);
	}

	function add(parent, el) {
		if (el) parent.appendChild(el);
		return el;
	}

	function toastIf(text) {
		if (text) showToast(text);
	}

	var dom = {};
	var renderedNode = null;   // 上一次渲染的节点名，用于判断是否需要入场动画
	var stageTap = null;       // 「点屏幕任意位置继续」的处理函数（对话进行中才有）

	// ------------------------------------------------------------ 提示

	var toastTimer = null;

	function showToast(message) {
		if (!dom.toast) return;
		dom.toast.textContent = message;
		dom.toast.classList.add('show');
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(function () {
			dom.toast.classList.remove('show');
		}, 1900);
	}

	// ------------------------------------------------------------ 标记文本渲染

	function bindLink(button, link) {
		button.addEventListener('click', function () {
			A.inspect(link);
		});
	}

	function linkToken(link) {
		var seen = link.target && A.isRead(link.target);
		var button = mk('button', link.isDetail ? 'word' + (seen ? ' seen' : '') : 'link-btn');
		button.type = 'button';
		button.textContent = link.display;
		bindLink(button, link);
		return button;
	}

	/** 把一段带标记的文本渲染成元素（整行都是链接时渲染成按钮行） */
	function renderText(text, tagName) {
		var tokens = A.parseMarkup(text);
		var onlyLinks = tokens.length > 0;
		tokens.forEach(function (t) {
			if (t.type === 'text' && t.text.trim()) onlyLinks = false;
		});

		var box = mk(tagName || 'p', onlyLinks ? 'link-row' : 'para');
		tokens.forEach(function (t) {
			if (t.type === 'text') {
				var parts = t.text.split('\n');
				parts.forEach(function (line, i) {
					if (i > 0) box.appendChild(mk('br'));
					if (line) box.appendChild(document.createTextNode(line));
				});
			} else {
				box.appendChild(linkToken(t));
			}
		});
		return box;
	}

	function renderParagraphs(list, parent, tagName) {
		(list || []).forEach(function (text) {
			parent.appendChild(renderText(text, tagName));
		});
	}

	// ------------------------------------------------------------ 主舞台

	function renderStage() {
		if (!dom.stage) return;
		stageTap = null;
		var node = A.node();
		var sameNode = renderedNode === A.nodeName();
		renderedNode = A.nodeName();
		var keepScroll = sameNode ? dom.stage.scrollTop : 0;
		clear(dom.stage);
		if (!node) {
			dom.stage.appendChild(mk('p', 'para', T.error.badState));
			dom.stage.scrollTop = 0;
			return;
		}
		renderProgress();
		if (node.kind === 'start') renderStart(node.ref, sameNode);
		else if (node.kind === 'event') renderEvent(node.ref, sameNode);
		else if (node.kind === 'item') renderItem(node.ref, sameNode);
		else if (node.kind === 'doc') renderDoc(node.ref, sameNode);
		else renderStory(node.ref, sameNode);
		dom.stage.scrollTop = keepScroll;
	}

	/** 只有切换节点时才播放入场动画，避免点调查词时整屏抖动 */
	function markEnter(el, sameNode) {
		if (!sameNode) el.classList.add('enter');
		return el;
	}

	function renderProgress() {
		if (!dom.progress) return;
		clear(dom.progress);
		var total = A.totalDone();
		var max = A.totalPossible();
		var bar = mk('div', 'progress-track');
		var fill = mk('div', 'progress-fill');
		fill.style.width = (max ? Math.min(100, Math.round(total / max * 100)) : 0) + '%';
		bar.appendChild(fill);
		var label = mk('span', 'progress-label', T.archive.progress + ' ' + total + '/' + max);
		dom.progress.appendChild(label);
		dom.progress.appendChild(bar);
	}

	function stageTitle(text) {
		var head = mk('header', 'stage-head');
		head.appendChild(mk('h1', 'stage-title', text));
		return head;
	}

	function buttonRow(items) {
		var row = mk('div', 'actions');
		items.forEach(function (item) {
			var btn = mk('button', 'btn' + (item.primary ? ' primary' : ''));
			btn.type = 'button';
			btn.textContent = item.text;
			btn.addEventListener('click', item.onClick || function () { runAction(item); });
			row.appendChild(btn);
		});
		return row;
	}

	function actionButton(item) {
		return {
			text: item.text,
			primary: item.primary,
			onClick: function () { runAction(item); }
		};
	}

	function runAction(item) {
		if (item.to) { A.go(item.to); return; }
		switch (item.action) {
			case 'crafting': openCrafting(true); break;
			case 'cloze': openCloze(true); break;
			case 'archive': openArchive(); break;
			case 'menu': openMenu(); break;
			case 'back': A.back(); break;
			case 'restart':
				if (window.confirm(T.menu.restartConfirm)) {
					closeLayer();
					A.restart();
				}
				break;
			default: break;
		}
	}

	function linkButtons(list) {
		var items = (list || []).map(function (item) {
			if (item.to) return { text: item.text, to: item.to, primary: item.primary };
			return actionButton(item);
		});
		return buttonRow(items);
	}

	/** 对话流程里的按钮：跟【工作……？】那种提问按钮同一套样式，做成整行的大按钮 */
	function dialogButtons(list) {
		var items = (list || []).map(function (item) {
			if (item.to) return { text: item.text, to: item.to };
			return actionButton(item);
		});
		var row = mk('div', 'actions col');
		items.forEach(function (item) {
			var btn = mk('button', 'chat-ask');
			btn.type = 'button';
			btn.textContent = item.text;
			btn.addEventListener('click', item.onClick || function () { runAction(item); });
			row.appendChild(btn);
		});
		return row;
	}

	// ------------------------------------------------------------ 各节点渲染

	function renderStart(node, sameNode) {
		var wrap = markEnter(mk('div', 'stage-inner start-screen'), sameNode);
		var hero = mk('div', 'start-hero');
		hero.appendChild(mk('p', 'start-eyebrow', CFG.subtitle));
		hero.appendChild(mk('h1', 'start-title', CFG.title));
		wrap.appendChild(hero);

		var body = mk('div', 'start-body');
		renderParagraphs(node.body, body);
		wrap.appendChild(body);

		var actions = [];
		if (A.pendingResume()) {
			actions.push({
				text: T.start.resume,
				primary: true,
				onClick: function () {
					A.resume();
					closeLayer();
				}
			});
		}
		actions.push({
			text: A.pendingResume() ? T.start.restart : node.next.text,
			primary: !A.pendingResume(),
			onClick: function () {
				A.restart();
			}
		});
		wrap.appendChild(buttonRow(actions));

		// 标题页的额外按钮来自「起」节点的 links（例：从第二案开始）
		if (node.links && node.links.length) wrap.appendChild(linkButtons(node.links));

		if (T.start.changelog && node.changelog && node.changelog.length) {
			var change = mk('details', 'changelog');
			change.appendChild(mk('summary', null, T.start.changelog));
			renderParagraphs(node.changelog, change);
			wrap.appendChild(change);
		}

		dom.stage.appendChild(wrap);
	}

	function renderStory(node, sameNode) {
		var wrap = markEnter(mk('div', 'stage-inner'), sameNode);
		if (node.title) wrap.appendChild(stageTitle(node.title));

		// 助理的口述 + 问答合成一条消息流：点一下出一条
		var msgs = [];
		if (node.speaker) {
			(node.body || []).forEach(function (line) {
				msgs.push({ mine: false, text: line });
			});
		}
		chatSteps(node.chat).forEach(function (step) { msgs.push(step); });

		var tail = mk('div', 'story-tail');

		function buildTail() {
			clear(tail);
			var next = A.pendingAdvance();
			if (next) {
				tail.appendChild(dialogButtons([{ text: T.story.cont, to: next }]));
			}
			if (node.next) tail.appendChild(dialogButtons([node.next]));
			if (node.links) tail.appendChild(dialogButtons(node.links));
		}

		if (msgs.length) {
			var chatBox = mk('div', 'chat');
			if (node.speaker) {
				var head = mk('div', 'chat-head');
				head.appendChild(mk('span', 'avatar', shortName(node.speaker)));
				head.appendChild(mk('span', 'chat-name', node.speaker));
				chatBox.appendChild(head);
			}
			wrap.appendChild(chatBox);
			renderMessages(chatBox, msgs, node.id, node.speaker, function () {
				buildTail();
				if (dom.stage) dom.stage.scrollTop = dom.stage.scrollHeight;
			});
		} else {
			var body = mk('div', 'prose');
			renderParagraphs(node.body, body);
			wrap.appendChild(body);
		}
		wrap.appendChild(tail);

		if (node.showOnce && A.state().once[node.showOnce]) {
			// 已经看过一次性说明，附加段落不再展示
		} else if (node.bodyOnce) {
			var extra = mk('div', 'prose');
			renderParagraphs(node.bodyOnce, extra);
			wrap.appendChild(extra);
			if (node.showOnce) A.state().once[node.showOnce] = 1;
		}

		// 消息全部出现之后，底部的推进按钮才出现
		if (!msgs.length || A.chatProgress(node.id) >= msgs.length) buildTail();
		dom.stage.appendChild(wrap);
	}

	/**
	 * 把对话拆成「一句一步」：回答里的 \n 分段会一句一句地放出来，
	 * 只有提问（没有回答，例如「点击打开共鸣仪」）算单独一步。
	 */
	function chatSteps(items) {
		var steps = [];
		(items || []).forEach(function (item, idx) {
			steps.push({ idx: idx, mine: true, text: item.q, action: item.action || null });
			if (item.a) {
				item.a.split('\n').forEach(function (line) {
					if (line) steps.push({ idx: idx, mine: false, text: line });
				});
			}
		});
		return steps;
	}

	/** 头像上的短名：助理 077 -> 077 */
	function shortName(speaker) {
		var name = String(speaker || '').replace(/^助理\s*/, '').trim();
		return name || '077';
	}

	/** 一条消息气泡：mine = 玩家自己发的（靠右），否则是对方（靠左，带头像） */
	function messageRow(text, mine, speaker) {
		var row = mk('div', 'msg ' + (mine ? 'me' : 'them'));
		if (!mine && speaker) row.appendChild(mk('span', 'avatar', shortName(speaker)));
		var bubble = mk('div', 'bubble');
		bubble.appendChild(renderText(text, 'div'));
		row.appendChild(bubble);
		return row;
	}

	/**
	 * 聊天式对话：每点一下出现一条消息（点屏幕任意位置都行），不自动播放。
	 */
	function renderMessages(container, msgs, nodeId, speaker, onDone) {
		// 进入时先显示第一条，其余的每点一下出一条（已经看过的按存档进度显示）
		var saved = Math.min(A.chatProgress(nodeId), msgs.length);
		var shown = msgs.length ? Math.max(saved, 1) : 0;
		var rendered = 0;     // 已经放进 DOM 的消息条数（增量追加，不整段重建）
		var hintEl = null;    // 底部「点击继续」提示

		function paint() {
			for (; rendered < shown; rendered++) {
				container.appendChild(messageRow(msgs[rendered].text, msgs[rendered].mine, speaker));
			}
			if (hintEl) {
				container.removeChild(hintEl);
				hintEl = null;
			}
			if (shown < msgs.length) {
				hintEl = textEl('p', 'chat-hint', T.story.tapHint);
				if (hintEl) container.appendChild(hintEl);
			}
		}

		/** 新消息出现后滚到底部，跟聊天 App 一样 */
		function scrollDown() {
			if (dom.stage) dom.stage.scrollTop = dom.stage.scrollHeight;
		}

		function finish() {
			stageTap = null;
			A.setChatProgress(nodeId, msgs.length);
			if (onDone) onDone();
		}

		/** 点一下：出现下一条消息（我方提问或对方的一句话） */
		function advance() {
			if (shown >= msgs.length) return;
			var msg = msgs[shown];
			shown++;
			A.setChatProgress(nodeId, shown);
			paint();
			scrollDown();
			if (msg.action) runAction({ action: msg.action });
			if (shown >= msgs.length) finish();
		}

		paint();
		if (shown >= msgs.length) finish();
		else stageTap = advance;
	}

function renderItem(node, sameNode) {
	var wrap = markEnter(mk('div', 'stage-inner'), sameNode);
	var card = mk('div', 'item-card');
	card.appendChild(mk('span', 'item-tag', T.toast.item));
	// 大字统一用主题里的「获得」高亮色（每件道具一个颜色会显得花）
	var title = mk('h1', 'item-title', node.id);
	card.appendChild(title);
		renderParagraphs(node.body, card);
		wrap.appendChild(card);
		if (node.next) wrap.appendChild(dialogButtons([node.next]));
		dom.stage.appendChild(wrap);
	}

function renderEvent(ev, sameNode) {
		var wrap = markEnter(mk('div', 'stage-inner'), sameNode);
		var st = A.eventState(ev);
		wrap.appendChild(stageTitle(ev.name));

		var prose = mk('div', 'prose scene');
		renderParagraphs(ev.body, prose);
		wrap.appendChild(prose);

		var tip = '';
		if (st.complete) tip = T.cloze.done;
		else if (st.total) {
			tip = T.cloze.progressLabel + st.filled + '/' + st.total;
			if (T.cloze.stageTip) tip += '　' + T.cloze.stageTip;
		}
		add(wrap, textEl('p', 'stage-tip', tip));

		// 事件页只保留推进用的按钮（收集思念 / 教程继续），其余入口都在底部导航
		var actions = [];
		if (A.pendingAdvance()) {
			actions.push({
				text: T.story.cont,
				primary: true,
				onClick: (function (to) {
					return function () { A.go(to); };
				})(A.pendingAdvance())
			});
		}
		if (ev.collect && st.complete && !A.collected(ev.id)) {
			actions.push({
				text: ev.collect.label || T.cloze.collect,
				primary: true,
				onClick: (function (id) {
					return function () { A.collect(id); };
				})(ev.id)
			});
		}
		var override = CFG.overrides[ev.id];
		// 场景自带的额外按钮（写在 events.js 的 buttons 里，装载时收进 CFG.overrides）
		((override && override.buttons) || []).forEach(function (b) {
			if (b.whenFlag && A.state().flags[b.whenFlag]) return;
			actions.push(actionButton(b));
		});
		if (actions.length) wrap.appendChild(buttonRow(actions));

		dom.stage.appendChild(wrap);
	}

	function renderDoc(node, sameNode) {
		var wrap = markEnter(mk('div', 'stage-inner'), sameNode);
		var doc = mk('article', 'doc');
		var head = mk('header', 'doc-head');
		head.appendChild(mk('h1', 'doc-title', node.title));
		head.appendChild(mk('span', 'doc-code', node.code));
		doc.appendChild(head);

		var table = mk('dl', 'doc-fields');
		(node.fields || []).forEach(function (row) {
			table.appendChild(mk('dt', null, row[0]));
			table.appendChild(mk('dd', null, row[1]));
		});
		doc.appendChild(table);

		(node.sections || []).forEach(function (sec) {
			doc.appendChild(mk('h3', 'doc-section', sec.t));
			renderParagraphs(sec.p, doc);
		});

		// 档案页底部的完结信息（全剧终 / 交流群）：写在节点上 footer: true 才会出现
		if (node.footer) {
			var foot = mk('div', 'doc-foot');
			add(foot, textEl('p', 'doc-thanks', T.about.thanks));
			add(foot, textEl('p', 'doc-group', T.about.group));
			if (foot.childNodes.length) doc.appendChild(foot);
		}
		wrap.appendChild(doc);

		var items = (node.links || []).slice();
		items.push({ text: T.menu.restart, action: 'restart' });
		wrap.appendChild(linkButtons(items));
		dom.stage.appendChild(wrap);
	}

	// ------------------------------------------------------------ 面板：通用

	var panel = null;      // 当前面板（共鸣仪 / 思念还原 / 案卷 / 菜单）
	var cards = [];        // 详情卡栈
	var cardClose = null;  // 当前弹出层的关闭回调

function closeLayer() {
	panel = null;
	cards = [];
	cardClose = null;
	setActiveTab(null);
	if (dom.sheet) hideEl(dom.sheet);
	if (dom.card) hideEl(dom.card);
	if (dom.scrim) dom.scrim.classList.remove('show');
}

/** 底部导航的选中态：选中的那一格，点从月牙变成满月 */
var TAB_IDS = ['tab-crafting', 'tab-cloze', 'tab-archive', 'tab-menu'];

function setActiveTab(id) {
	TAB_IDS.forEach(function (key) {
		var el = document.getElementById(key);
		if (!el) return;
		if (key === id) el.classList.add('active');
		else el.classList.remove('active');
	});
}

	/** 先播滑出动画，再隐藏，避免浮层“瞬间消失” */
	function hideEl(el) {
		el.classList.remove('open');
		setTimeout(function () {
			if (!el.classList.contains('open')) el.hidden = true;
		}, 320);
	}

	function showSheet() {
		if (!panel || !dom.sheet) return;
		dom.card.hidden = true;
		dom.sheet.hidden = false;
		refreshPanel();
		setTimeout(function () { dom.sheet.classList.add('open'); }, 0);
		showScrim();
	}

	function showScrim() {
		if (dom.scrim) dom.scrim.classList.add('show');
	}

	function fill(container, nodes) {
		clear(container);
		(nodes || []).forEach(function (n) {
			if (n) container.appendChild(n);
		});
	}

	function openPanel(title, build) {
		cards = [];
		panel = { title: title, build: build };
		if (dom.card) {
			dom.card.classList.remove('open');
			dom.card.hidden = true;
		}
		dom.sheet.hidden = false;
		fill(dom.sheetTitle, [document.createTextNode(title)]);
		fill(dom.sheetBody, [build()]);
		dom.sheetBody.scrollTop = 0;
		showScrim();
		// 下一帧加类，保证过渡动画生效
		setTimeout(function () { dom.sheet.classList.add('open'); }, 0);
	}

	function refreshPanel() {
		if (!panel) return;
		var top = dom.sheetBody.scrollTop;      // 重建内容时保持阅读位置
		fill(dom.sheetBody, [panel.build()]);
		dom.sheetBody.scrollTop = top;
	}

	/**
	 * 片段名里的字母数字只是 Twine 里区分同名片段的记号，
	 * 显示时优先用玩家点击的那个词，必要时再去掉尾部字母。
	 */
	function prettyName(name) {
		var cleaned = String(name).replace(/[A-Za-z]+\d*$/, '');
		return cleaned || String(name);
	}

	/** 详情卡：点击调查词后弹出的说明，关闭即整层收起 */
	function pushDetail(name, title, gained) {
		var detail = A.details[name];
		if (!detail) return;
		cards = [name];
		var body = mk('div', 'card-body');
		renderParagraphs(detail.text, body);
		if (gained && gained.length) {
			add(body, textEl('p', 'card-gain',
				(T.toast.clue ? T.toast.clue + '：' : '') + gained.join('、')));
		}
		showCard(title || prettyName(name), body);
	}

	/** 关闭弹出层：一律整层收起，不会退回上一层详情 */
	function dismissCard() {
		cards = [];
		cardClose = null;
		hideEl(dom.card);
		if (panel) showSheet();
		else if (dom.scrim) dom.scrim.classList.remove('show');
	}

	// ------------------------------------------------------------ 面板：共鸣仪

	var craft = { table: [], message: '', result: null, busy: false };

	function openCrafting(force) {
		if (!force && !A.unlocked(CFG.unlock.crafting)) {
			toastIf(T.locked.crafting);
			return;
		}
		// 重新开始或读档后，桌上可能残留已经不在物品栏里的物品
		craft.table = craft.table.filter(function (i) { return A.hasItem(i); });
		craft.message = '';
		craft.result = null;
		setActiveTab('tab-crafting');
		openPanel(T.craft.title, buildCrafting);
	}

	function buildCrafting() {
		var wrap = mk('div', 'panel-body');
		add(wrap, textEl('p', 'hint', T.craft.hint));

		var table = mk('div', 'craft-table');
		if (!craft.table.length) {
			add(table, textEl('span', 'placeholder', T.craft.empty));
		} else {
			craft.table.forEach(function (index) {
				table.appendChild(itemChip(index, true));
			});
		}
		wrap.appendChild(table);

		var go = mk('button', 'btn primary wide', craft.busy ? T.craft.working : T.craft.start);
		go.type = 'button';
		go.disabled = craft.busy || !craft.table.length;
		go.addEventListener('click', runCraft);
		wrap.appendChild(go);

		if (craft.message) wrap.appendChild(mk('p', 'craft-msg', craft.message));

		if (craft.result) {
			var card = mk('div', 'craft-result');
			card.appendChild(mk('h3', 'craft-scene', craft.result.scene));
			var enter = mk('button', 'btn primary wide', T.craft.enter);
			enter.type = 'button';
			enter.addEventListener('click', function () {
				var target = craft.result.scene;
				closeLayer();
				A.go(target);
				// 有些场景进去时会先弹一个窗口（events.js 里的 popup 字段）
				var ev = A.byName(target);
				if (ev && ev.popup) showPopup(ev.popup);
			});
			card.appendChild(enter);
			wrap.appendChild(card);
		}

		add(wrap, textEl('h3', 'panel-sub', T.craft.bag));
		var bag = mk('div', 'chip-row');
		var owned = 0;
		A.items.forEach(function (item, index) {
			if (!A.hasItem(index)) return;
			owned++;
			if (craft.table.indexOf(index) >= 0) return;
			bag.appendChild(itemChip(index, false));
		});
		if (!owned) bag.appendChild(mk('span', 'placeholder', T.common.empty));
		wrap.appendChild(bag);
		return wrap;
	}

	function itemChip(index, onTable) {
		var item = A.items[index];
		var chip = mk('button', 'chip item' + (onTable ? ' on-table' : ''));
		chip.type = 'button';
		chip.textContent = item.name;
		chip.style.color = item.color;
		chip.style.borderColor = item.color;
		chip.addEventListener('click', function () {
			var at = craft.table.indexOf(index);
			if (at >= 0) craft.table.splice(at, 1);
			else craft.table.push(index);
			craft.message = '';
			craft.result = null;
			refreshPanel();
		});
		return chip;
	}

	function runCraft() {
		if (craft.busy) return;
		craft.busy = true;
		craft.result = null;
		craft.message = '';
		refreshPanel();
		setTimeout(function () {
			var found = A.checkRecipe(craft.table);
			craft.busy = false;
			if (found) {
				craft.result = found;
				craft.message = T.craft.discovery;
			} else {
				craft.message = T.craft.nothing;
			}
			refreshPanel();
		}, 900);
	}

	// ------------------------------------------------------------ 面板：思念还原

	var cloze = { event: null, selected: null };   // selected = [行, 列]，先选线索再点空缺
	var clozeShake = false;   // 填错时让句子抖一下（面板重建后也能生效）
	cloze.flash = null;       // 面板内的即时提示（比底部提示条离句子更近）

	function visitedEvents() {
		return A.events.filter(function (e) { return A.state().visited[e.name]; });
	}

	function openCloze(force) {
		if (!force && !A.unlocked(CFG.unlock.cloze)) {
			toastIf(T.locked.cloze);
			return;
		}
		var list = visitedEvents();
		if (!list.length) {
			toastIf(T.cloze.locked);
			return;
		}
		var current = A.node();
		if (current && current.kind === 'event') {
			// 从某个事件点进来，直接切到该事件的填空
			cloze.event = A.nodeName();
		} else if (!cloze.event || !A.state().visited[cloze.event]) {
			cloze.event = list[0].name;
		}
		cloze.selected = null;
		cloze.flash = null;
		setActiveTab('tab-cloze');
		openPanel(T.cloze.title, buildCloze);
	}

	function buildCloze() {
		var wrap = mk('div', 'panel-body');
		var list = visitedEvents();
		var ev = A.byName(cloze.event) || list[0];
		cloze.event = ev.name;
		var st = A.eventState(ev);

		// 事件选择用换行排列，事件多了也不用横向找
		var filter = mk('div', 'chip-row cloze-events');
		list.forEach(function (e) {
			var chip = mk('button', 'chip' + (e.name === ev.name ? ' active' : ''), e.name);
			chip.type = 'button';
			chip.addEventListener('click', function () {
				cloze.event = e.name;
				cloze.selected = null;
				cloze.flash = null;
				refreshPanel();
			});
			filter.appendChild(chip);
		});
		wrap.appendChild(filter);

		add(wrap, textEl('p', 'hint', T.cloze.hint));

		// 句子固定在面板顶部：向下翻线索时也看得见要填的位置
		var sticky = mk('div', 'cloze-sticky');
		var sentence = mk('div', 'cloze-sentence' + (clozeShake ? ' wrong' : ''));
		clozeShake = false;
		buildSentence(ev, st, sentence);
		sticky.appendChild(sentence);
		sticky.appendChild(mk('p', 'cloze-picked', T.cloze.selected + '：' +
			(cloze.selected ? A.clueWord(cloze.selected[0], cloze.selected[1]) : T.common.noSelection)));
		if (cloze.flash) {
			sticky.appendChild(mk('p', 'cloze-flash ' + cloze.flash.kind, cloze.flash.text));
		}
		wrap.appendChild(sticky);

		var status = mk('p', 'panel-sub');
		status.textContent = st.complete ? T.cloze.done : (st.filled + '/' + st.total);
		wrap.appendChild(status);

		if (st.complete && ev.collect) {
			var done = A.collected(ev.id);
			var btn = mk('button', 'btn primary wide', done ? T.toast.collected : T.cloze.collect);
			btn.type = 'button';
			btn.disabled = !!done;
			btn.addEventListener('click', function () {
				closeLayer();
				A.collect(ev.id);
			});
			wrap.appendChild(btn);
		}

		add(wrap, textEl('h3', 'panel-sub', T.cloze.collected));
		wrap.appendChild(buildClueGroups(ev));
		return wrap;
	}

	/** 已收集的线索，按「人物 / 地点 / 物品 / 其它」分组；颜色仍代表来源事件 */
	function buildClueGroups(ev) {
		var groups = mk('div', 'clue-groups');
		var kinds = A.clueKinds();
		var buckets = {};
		kinds.forEach(function (kind) { buckets[kind] = []; });
		var total = 0;
		A.clues.forEach(function (row, r) {
			row.forEach(function (word, c) {
				if (!A.hasClue(r, c)) return;
				var kind = A.clueKind(word);
				if (!buckets[kind]) buckets[kind] = [];
				buckets[kind].push({ r: r, c: c, word: word });
				total++;
			});
		});
		if (!total) {
			add(groups, textEl('p', 'placeholder', T.cloze.emptyHint));
			return groups;
		}
		kinds.forEach(function (kind) {
			var list = buckets[kind];
			if (!list || !list.length) return;
			var fromHere = false;
			list.forEach(function (item) { if (item.r === ev.index) fromHere = true; });

			var group = mk('section', 'clue-group');
			var title = mk('h4', 'clue-group-title',
				kind + '　' + list.length + (fromHere ? T.cloze.fromHere : ''));
			title.style.color = A.clueKindColor(list[0].word);
			group.appendChild(title);

			var chips = mk('div', 'chip-row');
			list.forEach(function (item) {
				var selected = cloze.selected && cloze.selected[0] === item.r && cloze.selected[1] === item.c;
				var chip = mk('button', 'chip clue' + (selected ? ' active' : ''), item.word);
				chip.type = 'button';
				chip.style.color = A.clueKindColor(item.word);
				chip.style.borderColor = A.clueKindColor(item.word);
				chip.addEventListener('click', function () {
					cloze.selected = selected ? null : [item.r, item.c];
					cloze.flash = null;
					refreshPanel();
				});
				chips.appendChild(chip);
			});
			group.appendChild(chips);
			groups.appendChild(group);
		});
		return groups;
	}

	function buildSentence(ev, st, container) {
		var text = A.cloze[ev.index] || '';
		var re = /\{\{(\d+),(\d+)\}\}/g;
		var last = 0;
		var pos = 0;
		var m;
		while ((m = re.exec(text))) {
			if (m.index > last) {
				container.appendChild(document.createTextNode(text.slice(last, m.index)));
			}
			container.appendChild(blankEl(Number(m[1]), Number(m[2]), pos, ev, st));
			pos++;
			last = re.lastIndex;
		}
		if (last < text.length) container.appendChild(document.createTextNode(text.slice(last)));
	}

	function blankEl(r, c, pos, ev, st) {
		var filled = A.isFilled(ev.index, pos);
		var span = mk('span', 'blank' + (filled ? ' filled' : ''));
		if (filled) {
			span.textContent = A.clueWord(r, c);
			span.style.color = A.clueKindColor(A.clueWord(r, c));
			span.style.borderColor = A.clueKindColor(A.clueWord(r, c));
			return span;
		}
		span.textContent = '？';
		span.setAttribute('role', 'button');
		span.tabIndex = 0;
		span.addEventListener('click', function () { fillFromSelection(r, c, pos, ev); });
		span.addEventListener('keydown', function (e) {
			if (e.keyCode === 13 || e.keyCode === 32) {
				e.preventDefault();
				fillFromSelection(r, c, pos, ev);
			}
		});
		return span;
	}

	/**
	 * 弹一个「系统窗口」——story.js 里 kind: 'popup' 的节点（标题 + 正文 + 按钮）。
	 * 场景在 events.js 里写 popup: '节点名' 时，从共鸣仪点「进入记忆」会先弹它。
	 * 按钮的显示条件：whenFlag = 标记没置上时显示，whenFlagSet = 标记置上时显示（用来做第一次 / 第二次）。
	 */
	function showPopup(name) {
		var node = A.resolve(name);
		if (!node || node.kind !== 'popup') return;
		var ref = node.ref;

		dom.card.hidden = false;
		dom.card.classList.add('error');
		cardClose = function () {};     // 系统窗口：点旁边不关，得走按钮

		var head = mk('header', 'card-head');
		head.appendChild(mk('h2', 'card-title', ref.title || ''));

		var body = mk('div', 'card-body popup-body');
		renderParagraphs(ref.text, body);

		var row = mk('div', 'actions col popup-actions');
		(ref.buttons || []).forEach(function (b) {
			if (b.whenFlag && A.state().flags[b.whenFlag]) return;
			if (b.whenFlagSet && !A.state().flags[b.whenFlagSet]) return;
			var btn = mk('button', 'btn wide primary');
			btn.type = 'button';
			btn.textContent = b.text;
			btn.addEventListener('click', function () {
				dismissCard();
				if (b.to) A.go(b.to);
				else if (b.action) runAction(b);
			});
			row.appendChild(btn);
		});

		fill(dom.card, [head, body, row]);
		showScrim();
		setTimeout(function () { dom.card.classList.add('open'); }, 0);
	}

	/** 弹出详情 / 选择面板，关闭时统一收起该层 */
	function showCard(title, body) {
		dom.card.classList.remove('error');
		dom.card.hidden = false;
		cardClose = dismissCard;
		var head = mk('header', 'card-head');
		head.appendChild(mk('h2', 'card-title', title));
		var closeBtn = mk('button', 'icon-btn', T.common.close);
		closeBtn.type = 'button';
		closeBtn.addEventListener('click', dismissCard);
		head.appendChild(closeBtn);
		fill(dom.card, [head, body]);
		showScrim();
		setTimeout(function () { dom.card.classList.add('open'); }, 0);
		return closeBtn;
	}

	function eventNameByIndex(index) {
		var found = A.events.filter(function (e) { return e.index === index; })[0];
		return found ? found.name : T.cloze.otherClues;
	}

	/** 用当前选中的线索填这个空：只有完全对得上才填得进去 */
	function fillFromSelection(r, c, pos, ev) {
		if (!cloze.selected) {
			cloze.flash = T.cloze.pickFirst ? { kind: 'warn', text: T.cloze.pickFirst } : null;
			refreshPanel();
			return;
		}
		var hit = cloze.selected[0] === r && cloze.selected[1] === c;
		var word = A.clueWord(cloze.selected[0], cloze.selected[1]);
		cloze.selected = null;
		if (hit) {
			A.fillBlank(ev.index, pos);
			A.persist();
			cloze.flash = { kind: 'ok', text: T.cloze.filled + '：' + word };
			refreshPanel();
			renderStage();
		} else {
			cloze.flash = T.cloze.wrong ? { kind: 'warn', text: T.cloze.wrong } : null;
			clozeShake = true;
			refreshPanel();
		}
	}

	// ------------------------------------------------------------ 面板：案卷

var archive = { tab: 0, case: 1 };

/** 某一案在档案柜（一）/（二）里有没有东西可看（进过的，或固定列出的） */
function archiveHas(stage, caseNo) {
	if (stage === 2 && !A.unlocked(CFG.unlock.archive2)) return false;
	var visited = A.state().visited;
	return A.events.some(function (e) {
		return e.archive === stage && (e.case || 1) === caseNo && (visited[e.name] || e.listed);
	});
}

/** 打开案卷 / 切案子时，停在第一个有内容的档案柜上（免得一进来是个空列表） */
function firstArchiveTab(caseNo) {
	if (archiveHas(1, caseNo)) return 0;
	if (archiveHas(2, caseNo)) return 1;
	return 0;
}

function openArchive() {
	if (!A.unlocked(CFG.unlock.archive1)) {
		toastIf(T.locked.archive);
		return;
	}
	archive.case = A.currentCase();     // 打开时先停在当前所在的案子
	archive.tab = firstArchiveTab(archive.case);
	setActiveTab('tab-archive');
	openPanel(T.archive.title, buildArchive);
}

function buildArchive() {
	var wrap = mk('div', 'panel-body');

	// 案子切换：只有到过第二案才会出现（免得提前剧透），切到哪一案就看哪一案的档案
	if (A.currentCase() > 1) {
		var cases = mk('div', 'chip-row');
		[1, 2].forEach(function (n) {
			if (n > A.currentCase()) return;
			var label = n === 1 ? T.archive.case1 : T.archive.case2;
			var chip = mk('button', 'chip' + (archive.case === n ? ' active' : ''), label);
			chip.type = 'button';
			chip.addEventListener('click', function () {
				archive.case = n;
				archive.tab = firstArchiveTab(n);
				refreshPanel();
			});
			cases.appendChild(chip);
		});
		wrap.appendChild(cases);
	}

	var tabs = mk('div', 'chip-row scroll');
		var names = [T.archive.tab1, T.archive.tab2, T.archive.tab3, T.archive.tab4];
		names.forEach(function (name, i) {
			if (i === 1 && !A.unlocked(CFG.unlock.archive2)) return;
			var chip = mk('button', 'chip' + (archive.tab === i ? ' active' : ''), name);
			chip.type = 'button';
			chip.addEventListener('click', function () {
				archive.tab = i;
				refreshPanel();
			});
			tabs.appendChild(chip);
		});
		wrap.appendChild(tabs);

		var body = mk('div', 'panel-block');
		if (archive.tab === 0) body.appendChild(archiveList(1));
		else if (archive.tab === 1) body.appendChild(archiveList(2));
		else if (archive.tab === 2) body.appendChild(archiveReview());
		else body.appendChild(archiveHints());
		wrap.appendChild(body);
		return wrap;
	}

function archiveList(stage) {
	var box = mk('div', 'list');
	var cur = archive.case;
	// 只有当前所在的案子才能进去；另一案只列名字（内容已经过去了）
	var canEnter = cur === A.currentCase();
	var inCase = function (e) { return (e.case || 1) === cur; };
	var seen = visitedEvents().filter(function (e) { return e.archive === stage && inCase(e); });
		// 原版直接给出的入口：即使没进过也列出来，方便点进去
		// name 必须是 events.js 里的事件名；title 可选，用来换个显示名
		var rows = [];
		(CFG.alwaysInArchive || []).forEach(function (entry) {
			var name = typeof entry === 'string' ? entry : entry.name;
			var when = typeof entry === 'string' ? null : entry.when;
			var title = typeof entry === 'string' ? null : entry.title;
			if (!A.cond(when)) return;
			var ev = A.byName(name);
			if (!ev || ev.archive !== stage || !inCase(ev) || seen.indexOf(ev) >= 0) return;
			rows.push({ ev: ev, title: title });
		});
		seen.forEach(function (ev) { rows.push({ ev: ev, title: null }); });
		if (!rows.length) return textEl('p', 'placeholder', T.archive.empty) || mk('div');
		rows.forEach(function (item) {
			var ev = item.ev;
			var row = mk('div', 'list-row');
			var main = mk('div', 'list-main');
			main.appendChild(mk('span', 'list-title', item.title || ev.name));
			var st = A.eventState(ev);
			var done = ev.collect ? A.collected(ev.id) : false;
			var parts = [];
			if (!A.state().visited[ev.name]) parts.push(T.archive.notVisited);
			else if (ev.collect) parts.push(T.archive.collect + ' ' + (done ? '1/1' : '0/1'));
			if (st.total) parts.push(T.archive.filled + ' ' + st.filled + '/' + st.total);
		main.appendChild(mk('span', 'list-sub', parts.join('　')));
		row.appendChild(main);
		if (!canEnter) {
			// 不在本案：只给名字，不给进入
			var locked = mk('button', 'btn small', T.archive.notCurrent);
			locked.type = 'button';
			locked.disabled = true;
			row.appendChild(locked);
			box.appendChild(row);
			return;
		}
		var btn = mk('button', 'btn small',
			A.state().visited[ev.name] ? T.archive.revisit : T.archive.enter);
			btn.type = 'button';
			btn.addEventListener('click', function () {
				closeLayer();
				A.go(ev.name);
			});
			row.appendChild(btn);
			box.appendChild(row);
		});
		return box;
	}

function archiveReview() {
	var box = mk('div', 'review');
	var list = A.events.filter(function (e) {
		var st = A.eventState(e);
		return (e.case || 1) === archive.case && st.complete && st.total > 0;
	});
		if (!list.length) return textEl('p', 'placeholder', T.archive.noReview) || mk('div');
		list.forEach(function (ev) {
			var card = mk('section', 'review-card');
			card.appendChild(mk('h4', 'review-title', ev.name));
			var sentence = mk('div', 'cloze-sentence');
			var text = A.cloze[ev.index] || '';
			var re = /\{\{(\d+),(\d+)\}\}/g;
			var last = 0;
			var m;
			while ((m = re.exec(text))) {
				if (m.index > last) sentence.appendChild(document.createTextNode(text.slice(last, m.index)));
				var span = mk('span', 'blank filled');
				span.textContent = A.clueWord(Number(m[1]), Number(m[2]));
				span.style.color = A.clueKindColor(A.clueWord(Number(m[1]), Number(m[2])));
				span.style.borderColor = A.clueKindColor(A.clueWord(Number(m[1]), Number(m[2])));
				sentence.appendChild(span);
				last = re.lastIndex;
			}
			if (last < text.length) sentence.appendChild(document.createTextNode(text.slice(last)));
			card.appendChild(sentence);
			box.appendChild(card);
		});
		return box;
	}

function archiveHints() {
	var box = mk('div', 'panel-block');
	add(box, textEl('p', 'hint', T.hintTitle));
	var groups = [];
	var inCase = function (h) { return (h.case || 1) === archive.case; };
	var stage1 = A.hints.stage1.filter(inCase);
	var stage2 = A.hints.stage2.filter(inCase);
	if (stage1.length) groups.push({ name: T.archive.stage1, list: stage1 });
	if (A.unlocked(CFG.unlock.hints2) && stage2.length) groups.push({ name: T.archive.stage2, list: stage2 });
	if (!groups.length) return textEl('p', 'placeholder', T.common.empty) || mk('div');
	groups.forEach(function (group) {
			box.appendChild(mk('h3', 'panel-sub', group.name));
			group.list.forEach(function (hint) {
				var details = mk('details', 'hint-card');
				details.appendChild(mk('summary', null, hint.title));
				renderParagraphs(hint.text, details);
				box.appendChild(details);
			});
		});
		return box;
	}

	// ------------------------------------------------------------ 面板：菜单

	function openMenu() {
		setActiveTab('tab-menu');
		openPanel(T.menu.title, buildMenu);
	}

	function buildMenu() {
		var wrap = mk('div', 'panel-body');
		var row = mk('div', 'actions col');
		[
			{ text: T.menu.save, onClick: openSave },
			{ text: T.menu.restart, onClick: function () { runAction({ action: 'restart' }); } }
		].forEach(function (item) {
			var btn = mk('button', 'btn wide' + (item.subtle ? ' subtle' : ''));
			btn.type = 'button';
			btn.textContent = item.text;
			btn.addEventListener('click', item.onClick);
			row.appendChild(btn);
		});
		wrap.appendChild(row);

		// 界面配色：两套主题，点一下立即换，选择记在本地
		var theme = window.WYL_THEME;
		if (theme && T.theme) {
			add(wrap, textEl('h3', 'panel-sub', T.menu.theme));
			var themes = mk('div', 'chip-row');
			theme.ids.forEach(function (id) {
				var chip = mk('button', 'chip' + (theme.current() === id ? ' active' : ''), T.theme[id] || id);
				chip.type = 'button';
				chip.addEventListener('click', function () {
					theme.set(id);
					refreshPanel();
				});
				themes.appendChild(chip);
			});
			wrap.appendChild(themes);
		}

		var line = '';
		if (T.menu.progressLabel) line = T.menu.progressLabel + A.totalDone() + '/' + A.totalPossible();
		if (T.menu.autoSave) line += (line ? '　' : '') + T.menu.autoSave;
		add(wrap, textEl('p', 'hint', line));
		return wrap;
	}

	function openSave() {
		openPanel(T.menu.save, buildSave);
	}

	function buildSave() {
		var wrap = mk('div', 'panel-body');
		add(wrap, textEl('p', 'hint', T.menu.saveHint));
		for (var i = 1; i <= CFG.slots; i++) {
			wrap.appendChild(saveRow(i));
		}
		return wrap;
	}

	function saveRow(i) {
		var info = A.slotInfo(i);
		var row = mk('div', 'list-row');
		var main = mk('div', 'list-main');
		main.appendChild(mk('span', 'list-title', T.menu.saveSlot + ' ' + i));
		main.appendChild(mk('span', 'list-sub', info ? info.at + '　' + T.menu.saveProgress + ' ' + info.total : T.menu.saveEmpty));
		row.appendChild(main);

		var saveBtn = mk('button', 'btn small', T.menu.saveDo);
		saveBtn.type = 'button';
		saveBtn.addEventListener('click', function () {
			A.saveToSlot(i);
			showToast(T.menu.saveDone);
			refreshPanel();
		});
		row.appendChild(saveBtn);

		if (info) {
			var loadBtn = mk('button', 'btn small', T.menu.saveLoad);
			loadBtn.type = 'button';
			loadBtn.addEventListener('click', function () {
				A.loadFromSlot(i);
				showToast(T.menu.saveLoaded);
				closeLayer();
			});
			row.appendChild(loadBtn);
		}
		return row;
	}

	// ------------------------------------------------------------ 启动

	function init(config) {
		dom.stage = document.getElementById('stage');
		dom.progress = document.getElementById('progress');
		dom.toast = document.getElementById('toast');
		dom.scrim = document.getElementById('scrim');
		dom.sheet = document.getElementById('sheet');
		dom.sheetTitle = document.getElementById('sheet-title');
		dom.sheetBody = document.getElementById('sheet-body');
		dom.card = document.getElementById('card');

		// 标题与副标题统一来自 config.js
		var brandTitle = document.getElementById('brand-title');
		if (brandTitle) brandTitle.textContent = CFG.title;
		var brandSub = document.getElementById('brand-sub');
		if (brandSub) brandSub.textContent = CFG.subtitle;
		document.title = CFG.title;

		// 对话进行中：点屏幕任意位置出现下一条消息（点在按钮等交互元素上则不触发）
		dom.stage.addEventListener('click', function (e) {
			if (!stageTap) return;
			var el = e && e.target ? e.target : null;
			while (el && el !== dom.stage) {
				var cls = String(el.className || '');
				if (el.tagName === 'BUTTON' || el.tagName === 'A' ||
					cls.indexOf('word') >= 0 || cls.indexOf('chat-ask') >= 0 ||
					cls.indexOf('btn') >= 0 || cls.indexOf('blank') >= 0) {
					return;
				}
				el = el.parentNode;
			}
			stageTap();
		});

		dom.scrim.addEventListener('click', function () {
			if (cardClose) {
				var fn = cardClose;
				cardClose = null;
				fn();
				return;
			}
			closeLayer();
		});
		document.getElementById('sheet-close').addEventListener('click', closeLayer);

		document.getElementById('tab-crafting').addEventListener('click', function () { openCrafting(false); });
		document.getElementById('tab-cloze').addEventListener('click', function () { openCloze(false); });
		document.getElementById('tab-archive').addEventListener('click', openArchive);
		document.getElementById('tab-menu').addEventListener('click', openMenu);

		renderStage();
	}

	window.Views = {
		init: init,
		renderStage: renderStage,
		showToast: showToast,
		pushDetail: pushDetail,
		closeLayer: closeLayer
	};
})();
