/**
 * 数据装载 —— 把 data/ 里手写的内容整理成引擎与界面直接使用的表。
 *
 * 它做两件事：
 *   1. 搬运：events.js 的 clues / cloze / details / hint 展开成线索表、填空句、详情卡、事件概述；
 *      items.js 的配方按物品名换成编号；config.js 的进度总数按事件数量算出来。
 *   2. 检查：线索词没声明、详情卡重名、配方指向不存在的场景等等，都在这里报出来
 *      （浏览器控制台会打印，冒烟测试也会卡住），不用等玩到那一步才发现。
 *
 * 改内容不需要动这个文件。
 * 语法基线：ES2017（不使用可选链、空值合并等新语法）。
 */
(function () {
	'use strict';

	var EVENTS = window.WYL_EVENTS || [];
	var GROUPS = window.WYL_CLUE_GROUPS || [];
	var ITEMS = window.WYL_ITEMS || [];
	var RAW_RECIPES = window.WYL_RECIPES || [];
	var CFG = window.WYL_CONFIG || {};
	var STORY = window.WYL_STORY || [];
	var TEXT = window.WYL_TEXT || {};

	var errors = [];
	var notes = [];
	var err = function (m) { errors.push(m); };
	var note = function (m) { notes.push(m); };

	// ---------------------------------------------------------------- 可跳转的节点

	var nodeKind = {};
	EVENTS.forEach(function (ev) { if (ev && ev.name) nodeKind[ev.name] = 'event'; });
	// 剧情节点记下它自己的 kind（story / popup / doc / item …），方便校验 popup 之类的字段
	STORY.forEach(function (n) { if (n && n.id) nodeKind[n.id] = n.kind || 'story'; });

	// ---------------------------------------------------------------- 详情卡

	var details = {};
	EVENTS.forEach(function (ev) {
		var cards = ev.details || {};
		Object.keys(cards).forEach(function (name) {
			var card = cards[name] || {};
			if (!name) { err('场景「' + ev.name + '」里有一张没写名字的详情卡'); return; }
			if (details[name]) {
				err('详情卡重名：「' + name + '」在「' + details[name].owner + '」和「' + ev.name +
					'」里都写了。给其中一个换个名字（比如 ' + name + 'C / ' + name + 'Q）就行');
				return;
			}
			if (!card.text || !card.text.length) {
				err('详情卡「' + name + '」（' + ev.name + '）没有正文，补一个 text: ["……"]');
				return;
			}
			details[name] = { text: card.text.slice(), owner: ev.name };
		});
	});

	// ---------------------------------------------------------------- 线索表

	var clueRows = [];
	var clueIndex = {};
	var clueOwner = {};
	// 每条线索属于第几案（记的是声明它的那个场景的案子）——换案时按它清关键词
	var clueCaseRows = EVENTS.map(function () { return []; });

	EVENTS.forEach(function (ev, i) {
		clueRows[i] = [];
		(ev.clues || []).forEach(function (word) {
			if (typeof word !== 'string' || !word.trim()) {
				err('场景「' + ev.name + '」的 clues 里有空项');
				return;
			}
			if (clueOwner[word]) {
				err('线索词重复：「' + word + '」在「' + clueOwner[word] + '」和「' + ev.name +
					'」里都写了。一条线索只能属于一个场景');
				return;
			}
			clueOwner[word] = ev.name;
			clueIndex[word] = [i, clueRows[i].length];
			clueRows[i].push(word);
			clueCaseRows[i].push(Number(ev.case) > 1 ? Number(ev.case) : 1);
		});
	});

	// ---------------------------------------------------------------- 填空句

	var cloze = EVENTS.map(function (ev) {
		if (!ev.cloze) return '';
		return String(ev.cloze).replace(/\{\{([^{}]*)\}\}/g, function (all, inner) {
			var key = inner.trim();
			if (/^\d+\s*,\s*\d+$/.test(key)) return '{{' + key.replace(/\s+/g, '') + '}}';   // 兼容坐标写法
			var hit = clueIndex[key];
			if (!hit) {
				err('场景「' + ev.name + '」的填空用了没有声明的线索词「' + key +
					'」。线索词要先写进某个场景的 clues 里');
				return all;
			}
			return '{{' + hit[0] + ',' + hit[1] + '}}';
		});
	});

	// ---------------------------------------------------------------- 标记检查

	function scanMarkup(text, where) {
		if (typeof text !== 'string') return;
		var re = /\[\[([^\[\]]+?)\]\]/g;
		var m;
		while ((m = re.exec(text))) {
			var parts = m[1].split('|');
			var display = parts[0].trim();
			var target = '';
			var hasClue = false;
			for (var i = 1; i < parts.length; i++) {
				var part = parts[i].trim();
				if (!part) continue;
				if (part.charAt(0) === '#') {
					hasClue = true;
					part.slice(1).split(';').forEach(function (piece) {
						piece = piece.trim();
						if (!piece) return;
						if (/^\d+\s*,\s*\d+$/.test(piece)) {
							var rc = piece.split(',');
							if (!(clueRows[Number(rc[0])] || [])[Number(rc[1])]) {
								err(where + ' 引用了不存在的线索坐标 ' + piece);
							}
							return;
						}
						if (!clueIndex[piece]) {
							err(where + ' 引用了没有声明的线索词「' + piece + '」');
						}
					});
				} else if (!target) {
					target = part;
				}
			}
			if (!target && details[display]) target = display;
			if (target) {
				if (!details[target] && !nodeKind[target]) {
					err(where + ' 里的「' + display + '」指向的「' + target + '」既不是详情卡也不是节点');
				}
			} else if (!hasClue && !details[display]) {
				err(where + ' 里的「' + display + '」点了没反应（既没有同名详情卡，也没写线索或跳转目标）');
			}
		}
	}

	EVENTS.forEach(function (ev) {
		(ev.body || []).forEach(function (line) { scanMarkup(line, '场景「' + ev.name + '」正文'); });
		Object.keys(ev.details || {}).forEach(function (name) {
			((ev.details[name] || {}).text || []).forEach(function (line) {
				scanMarkup(line, '详情卡「' + name + '」');
			});
		});
	});
	STORY.forEach(function (node) {
		var where = '剧情「' + node.id + '」';
		(node.body || []).forEach(function (line) { scanMarkup(line, where); });
		(node.bodyOnce || []).forEach(function (line) { scanMarkup(line, where); });
		(node.chat || []).forEach(function (item) {
			if (item.a) scanMarkup(item.a, where + ' 的对话');
		});
		(node.links || []).forEach(function (item) {
			if (item.to && !nodeKind[item.to]) err(where + ' 的按钮指向不存在的节点「' + item.to + '」');
		});
		(node.buttons || []).forEach(function (item) {
			if (item.to && !nodeKind[item.to]) err(where + ' 的按钮指向不存在的节点「' + item.to + '」');
		});
		if (node.next && node.next.to && !nodeKind[node.next.to]) {
			err(where + ' 的下一步指向不存在的节点「' + node.next.to + '」');
		}
	});

	// ---------------------------------------------------------------- 线索分类

	var kindNames = [];
	var kindColors = {};
	var kindOfWord = {};

	GROUPS.forEach(function (group) {
		if (!group || !group.name) { err('clues.js 里有一个没写 name 的类别'); return; }
		if (kindNames.indexOf(group.name) >= 0) { err('clues.js 里类别「' + group.name + '」写了两次'); return; }
		kindNames.push(group.name);
		kindColors[group.name] = group.color || '#c9a0a0';
		if (!group.color) note('线索类别「' + group.name + '」没有写颜色，先用默认色');
		(group.words || []).forEach(function (word) {
			if (kindOfWord[word] && kindOfWord[word] !== group.name) {
				err('线索词「' + word + '」在类别「' + kindOfWord[word] + '」和「' + group.name + '」里都写了');
				return;
			}
			kindOfWord[word] = group.name;
			if (!clueIndex[word]) note('clues.js 的「' + group.name + '」里写了「' + word + '」，但没有场景把它作为线索');
		});
	});
	if (kindNames.indexOf('其它') < 0) {
		kindNames.push('其它');
		kindColors['其它'] = '#c9a0a0';
	}
	var unclassified = Object.keys(clueIndex).filter(function (w) { return !kindOfWord[w]; });
	if (unclassified.length) {
		note('这些线索词还没归类，界面上会落到「其它」：' + unclassified.join('、'));
	}

	// ---------------------------------------------------------------- 事件

	var trackKeys = {};
	(CFG.tracks || []).forEach(function (t) { if (t && t.key) trackKeys[t.key] = true; });

	// story.js 里写过的剧情标记名（listedWhen 也可以写这些名字）
	var storyFlags = {};
	STORY.forEach(function (node) {
		var fx = node.onEnter;
		if (!fx || !fx.flags) return;
		Object.keys(fx.flags).forEach(function (k) { storyFlags[k] = true; });
	});

	var slotCounter = {};
	var idSeen = {};
	var nameSeen = {};
	var events = EVENTS.map(function (ev, i) {
		var name = ev.name;
		if (typeof name !== 'string' || !name) {
			err('第 ' + (i + 1) + ' 个事件没写 name');
			name = '（第' + (i + 1) + '个事件）';
		} else if (nameSeen[name]) {
			err('场景重名：「' + name + '」出现了两次');
		}
		nameSeen[name] = true;

		var id = ev.id === undefined || ev.id === null || ev.id === '' ? String(i) : String(ev.id);
		if (idSeen[id]) err('事件 id 重复：「' + id + '」（场景 ' + name + '）');
		idSeen[id] = true;

		var out = {
			id: id,
			index: i,
			name: name,
			archive: ev.archive === 2 ? 2 : 1,
			// 属于第几案：不写就是第一案（案卷里按它分组，也决定能不能进入）
			case: Number(ev.case) > 1 ? Number(ev.case) : 1,
			body: (ev.body || []).slice(),
			details: ev.details || {}
		};
		if (!out.body.length) note('场景「' + name + '」没有正文');

		if (ev.collect) {
			var collect = {
				label: ev.collect.label || (TEXT.cloze && TEXT.cloze.collect) || '收集思念',
				to: ev.collect.to
			};
			if (ev.collect.track) {
				if (!trackKeys[ev.collect.track]) {
					err('场景「' + name + '」的 collect.track 写了 config.js 里没有的分类「' + ev.collect.track + '」');
				} else {
					collect.track = ev.collect.track;
					collect.slot = slotCounter[ev.collect.track] || 0;
					slotCounter[ev.collect.track] = collect.slot + 1;
				}
			}
			if (!collect.to) err('场景「' + name + '」的 collect 没写 to（收集完去哪）');
			else if (!nodeKind[collect.to]) err('场景「' + name + '」的 collect.to 指向不存在的节点「' + collect.to + '」');
			out.collect = collect;
		}
		if (ev.listed) {
			out.listed = true;
			if (ev.listedTitle) out.listedTitle = ev.listedTitle;
			if (ev.listedWhen) {
				var when = ev.listedWhen;
				if (when !== 'core' && when !== 'tutorial' && when !== 'stage2' && !storyFlags[when]) {
					note('场景「' + name + '」的 listedWhen 写了「' + when +
						'」——既不是内置条件（core / tutorial / stage2），也不是 story.js 里写过的剧情标记，' +
						'这一条会一直显示不出来');
				}
				out.listedWhen = when;
			}
		}
		if (ev.buttons && ev.buttons.length) out.buttons = ev.buttons.slice();
		if (ev.popup) {
			if (nodeKind[ev.popup] !== 'popup') {
				err('场景「' + name + '」的 popup 指向「' + ev.popup +
					'」，但那个节点不是 kind: \'popup\'（或者根本不存在）');
			} else {
				out.popup = ev.popup;
			}
		}
		if (ev.hint && ev.hint.length) out.hint = ev.hint.slice();
		return out;
	});

	// ---------------------------------------------------------------- 事件概述

	var hints = { stage1: [], stage2: [] };
	events.forEach(function (ev) {
		if (!ev.hint) return;
		hints[ev.archive === 2 ? 'stage2' : 'stage1'].push({ title: ev.name, text: ev.hint, case: ev.case });
	});

	// ---------------------------------------------------------------- 物品与配方

	var itemIndexByName = {};
	ITEMS.forEach(function (it, i) {
		if (!it || !it.name) { err('items 里第 ' + (i + 1) + ' 件物品没写 name'); return; }
		if (itemIndexByName[it.name] !== undefined) { err('物品重名：「' + it.name + '」'); return; }
		itemIndexByName[it.name] = i;
		if (!it.color) note('物品「' + it.name + '」没写 color，先用默认色');
	});

	var recipes = [];
	var comboUsed = {};
	RAW_RECIPES.forEach(function (r) {
		var names = r.use || r.items || [];
		var idx = [];
		names.forEach(function (n) {
			if (typeof n === 'number') { idx.push(n); return; }
			if (itemIndexByName[n] === undefined) {
				err('配方里的物品「' + n + '」不在 items.js 里');
				return;
			}
			idx.push(itemIndexByName[n]);
		});
		if (!nodeKind[r.scene] || nodeKind[r.scene] !== 'event') {
			err('配方的场景「' + r.scene + '」对不上 events.js 里的场景名');
		}
		if (idx.length < 2 || idx.length > 5) {
			note('配方「' + (r.scene || '') + '」放了 ' + idx.length + ' 件物品，界面上是按 2-5 件做的');
		}
		var sorted = idx.slice().sort(function (a, b) { return a - b; });
		var key = sorted.join('+');
		if (comboUsed[key]) err('「' + r.scene + '」和「' + comboUsed[key] + '」用了同一组物品，后一条永远用不到');
		comboUsed[key] = r.scene;
		// 允许两条不同配方通向同一个场景（比如第二案「月亮」有两个组合都能共鸣出来）
		recipes.push({ items: sorted, scene: r.scene });
	});

	// ---------------------------------------------------------------- 配置回填

	// 剧情节点里发道具：grants（发这几件，写物品名或编号都行）、items（整份物品栏，按编号）
	function itemIndexOf(value, where) {
		if (typeof value === 'number') return value;
		if (itemIndexByName[value] === undefined) {
			err(where + ' 里写的道具「' + value + '」不在 items.js 里');
			return null;
		}
		return itemIndexByName[value];
	}

	function convertGrants(list, where) {
		return list.map(function (value) {
			var i = itemIndexOf(value, where);
			return i === null ? -1 : i;
		}).filter(function (i) { return i >= 0; });
	}

	STORY.forEach(function (node) {
		var where = '剧情「' + node.id + '」';
		if (node.grants) node.grants = convertGrants(node.grants, where + ' 的 grants');
		var fx = node.onEnter;
		if (!fx) return;
		if (fx.grants) fx.grants = convertGrants(fx.grants, where + ' 的 onEnter.grants');
		if (fx.fillTrack) {
			fx.fillTrack.forEach(function (key) {
				var known = false;
				(CFG.tracks || []).forEach(function (t) { if (t.key === key) known = true; });
				if (!known) err(where + ' 的 fillTrack 写了 config.js 里没有的分类「' + key + '」');
			});
		}
		if (fx.unlockClues) {
			fx.unlockClues.forEach(function (word) {
				if (!clueIndex[word]) {
					err(where + ' 的 unlockClues 写了没有声明的关键词「' + word + '」（要先写进某个场景的 clues 里）');
				}
			});
		}
		if (fx.items) {
			var arr = fx.items;
			fx.items = ITEMS.map(function (it, i) { return arr[i] ? 1 : 0; });
			if (arr.length !== ITEMS.length) {
				note(where + ' 的 onEnter.items 是按编号写的整份物品栏，现在有 ' + ITEMS.length +
					' 件道具，已自动补齐（只写需要的道具可以用 grants）');
			}
		}
	});

	var trackTotal = {};
	events.forEach(function (ev) {
		if (ev.collect && ev.collect.track) trackTotal[ev.collect.track] = (trackTotal[ev.collect.track] || 0) + 1;
	});
	// 有的分类是由剧情节点记进度的（story.js 里 onEnter: { done: ['truth', 2] }），
	// 这类分类的数量取「场景收集数」与「剧情节点里最大的进度位 + 1」里的较大值。
	STORY.forEach(function (node) {
		var done = node.onEnter && node.onEnter.done;
		if (!done) return;
		var need = Number(done[1]) + 1;
		if (!isNaN(need) && need > (trackTotal[done[0]] || 0)) trackTotal[done[0]] = need;
	});
	CFG.tracks = (CFG.tracks || []).map(function (t) {
		return { key: t.key, name: t.name, short: t.short, total: trackTotal[t.key] || 0 };
	});
	CFG.advance = (CFG.advance || []).map(function (a) {
		var total = trackTotal[a.track] || 0;
		if (!total) note('config.js 的推进规则引用了没有场景的分类「' + a.track + '」');
		return { track: a.track, count: total, to: a.to, once: a.once };
	});
	CFG.alwaysInArchive = events.filter(function (e) { return e.listed; }).map(function (e) {
		if (!e.listedTitle && !e.listedWhen) return e.name;
		var entry = { name: e.name };
		if (e.listedTitle) entry.title = e.listedTitle;
		if (e.listedWhen) entry.when = e.listedWhen;
		return entry;
	});
	CFG.overrides = {};
	events.forEach(function (e) { if (e.buttons) CFG.overrides[e.id] = { buttons: e.buttons }; });
	// 后半程入口道具：写一个名字或一串名字都行，装载时换成物品编号
	var stage2 = CFG.stage2Items === undefined ? CFG.stage2Item : CFG.stage2Items;
	if (stage2 !== undefined) {
		var stage2List = Array.isArray(stage2) ? stage2 : [stage2];
		var stage2Index = [];
		stage2List.forEach(function (name) {
			if (typeof name === 'number') { stage2Index.push(name); return; }
			if (itemIndexByName[name] === undefined) {
				err('config.js 的 stage2Items 里写的「' + name + '」不在 items.js 里');
				return;
			}
			stage2Index.push(itemIndexByName[name]);
		});
		CFG.stage2Items = stage2Index;
	}

	// ---------------------------------------------------------------- 发布

	window.WYL_EVENTS = events;
	window.WYL_DETAILS = details;
	window.WYL_CLUES = clueRows;
	window.WYL_CLUE_CASE = clueCaseRows;
	window.WYL_CLOZE = cloze;
	window.WYL_CLUE_INDEX = clueIndex;
	window.WYL_CLUE_KINDS = kindNames;
	window.WYL_CLUE_KIND_COLORS = kindColors;
	window.WYL_CLUE_KIND = kindOfWord;
	window.WYL_HINTS = hints;
	window.WYL_RECIPES = recipes;
	window.WYL_DATA_ERRORS = errors;
	window.WYL_DATA_NOTES = notes;

	if (window.console) {
		if (errors.length) {
			window.console.error('数据有问题 ' + errors.length + ' 处：\n- ' + errors.join('\n- '));
		}
		if (notes.length) {
			window.console.warn('数据提醒 ' + notes.length + ' 条：\n- ' + notes.join('\n- '));
		}
	}
})();
