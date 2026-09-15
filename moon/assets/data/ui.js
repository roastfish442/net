/**
 * 界面文案 —— 想改提示语、按钮名、帮助内容，改这里。
 *
 * 把某条文案改成空字符串（''），界面上对应的提示 / 占位模块就会整块不显示，
 * 不需要改代码。例如 craft.empty 留空后，共鸣台的空位提示就没了。
 */
window.WYL_TEXT = {
	tabCrafting: '共鸣仪',
	tabCloze: '思念还原',
	tabArchive: '案卷',
	tabMenu: '菜单',

	common: {
		close: '关闭',
		back: '返回',
		confirm: '确认',
		empty: '暂无内容',
		locked: '尚未解锁',
		noSelection: '未选择',
		lockedClue: '线索未解锁',
		toTop: '回到顶部'
	},

	/** 标题页（起）上的按钮与说明 */
	start: {
		resume: '继续',
		restart: '重新开始',
		changelog: '版本记录'
	},

	/** 功能还没解锁时的提示 */
	locked: {
		crafting: '功能未解锁',
		cloze: '功能未解锁',
		archive: '功能未解锁'
	},

	error: {
		badState: '进度数据有误，已回到标题页。'
	},

	story: {
		cont: '继续',
		tapHint: '点击继续'
	},

	craft: {
		title: '共鸣仪',
		hint: '点击下方物品放入共鸣仪进行共鸣，可放入多个物品',
		empty: '',
		bag: '物品栏',
		start: '开始共鸣',
		working: '共鸣中……',
		nothing: '似乎并没有产生共鸣……',
		discovery: '仪器上浮现出画面……',
		again: '再试一次',
		enter: '进入记忆'
	},

	cloze: {
		title: '思念还原',
		hint: '点击关键词填入空白处',
		pickFirst: '',
		filled: '已填入',
		selected: '已选关键词',
		collected: '已收集的关键词',
		progressLabel: '已还原 ',
		fromHere: '　·本事件',
		emptyHint: '',
		otherClues: '其它关键词',
		stageTip: '打开【思念还原】补全事件',
		pick: '选择关键词',
		all: '全部关键词',
		thisEvent: '本事件的关键词',
		wrong: '',
		done: '思念已收集',
		collect: '收集思念',
		locked: '',
		noEvent: '还没有可还原的事件'
	},

	archive: {
		title: '案卷',
		case1: '第一案',
		case2: '第二案',
		notCurrent: '不在本案',
		tab1: '档案柜（一）',
		tab2: '档案柜（二）',
		tab3: '还原记录',
		tab4: 'AI 助手',
		empty: '还没有进入过任何记忆碎片。',
		progress: '进度',
		collect: '思念收集',
		filled: '还原',
		enter: '进入',
		notVisited: '尚未进入',
		revisit: '重新进入',
		noReview: '还没有还原完整的事件。',
		stage1: '一阶段',
		stage2: '二阶段'
	},

	menu: {
		// 下面 resume / help / about 三条已从菜单里去掉（菜单现在是 存档 / 重新开始 / 界面配色）
		// 文案先留在这里，以后想加回入口，在 views.js 的 buildMenu 里补一项即可
		title: '菜单',
		theme: '界面配色',
		resume: '继续游戏',
		save: '存档',
		restart: '重新开始',
		help: '玩法说明',
		about: '制作信息',
		saveSlot: '存档位',
		saveEmpty: '空存档位',
		saveDo: '保存',
		saveLoad: '读取',
		saveDone: '已保存',
		saveLoaded: '已读取',
		restartConfirm: '确定要重新开始吗？当前进度会被清空。',
		progressLabel: '当前进度：',
		autoSave: '自动存档已开启',
		saveHint: '',
		saveProgress: '进度'
	},

	/** 主题名（键与 theme.js 里的 id 对应） */
	theme: {
		title: '界面配色',
		moon: '深色',
		paper: '浅色'
	},

	toast: {
		clue: '已获得关键词',
		item: '已加入共鸣仪',
		blank: '填空正确',
		collected: '思念已收集'
	},

	hintTitle: '不知道用什么物品共鸣？可提前查看事件概述进行推论。',

	/** 玩法说明的内容（当前菜单里没有入口） */
	help: [
		{
			t: '目标',
			p: ['这是一把破碎的月琴。你要用共鸣仪让物品之间产生共鸣，还原它们记忆里的场景，收集思念，直到把月琴修复完整，并弄清这一连串死亡事件的真相。']
		},
		{
			t: '共鸣仪',
			p: ['点击底部“共鸣仪”，把物品从物品栏点到共鸣台上，再点“开始共鸣”。只有特定的组合才会产生共鸣，共鸣成功后会进入一段记忆碎片。']
		},
		{
			t: '调查',
			p: ['记忆碎片里带下划线的词都可以点击，点击后能看到细节，并可能获得线索。线索会自动收进“思念还原”。']
		},
		{
			t: '思念还原',
			p: ['每段记忆都有一段残缺的描述。点击空缺处，从已收集的线索中挑一条填进去，填对就能解锁下一格。全部填完后，场景里会出现“收集思念”按钮。']
		},
		{
			t: '案卷',
			p: ['“案卷”里可以回看已经进入过的事件、已经还原完整的事件原文，以及 AI 助理写的事件概述。卡住的时候就去看看提示。']
		}
	],

	about: {
		// credits / note / url 当前没有入口
		// thanks 与 group 是结局档案页底部那两行。现在游戏还有下一案，所以留空（留空 = 不显示）；
		// 等整个游戏真的完结了，把文字填回来就会重新出现。
		credits: [
			['策划', '烧烤鳜鱼'],
			['文案', '烧烤鳜鱼'],
			['程序', '烧烤鳜鱼'],
			['测试', '不愿意透露姓名的潇洒哥　江江　海岭']
		],
		note: '想玩我的更多游戏？请访问下面的地址（长按可复制）：',
		url: 'https://roastfish042.itch.io/',
		// 档案页底部那两行：只有 story.js 里 footer: true 的档案页才显示（现在用在第二案的最终档案上）
		thanks: '全剧终，感谢您的游玩！',
		group: '如果您在游玩之后感到疑惑，欢迎加入交流群：2155016255，与玩家们进行剧情上的交流！'
	}
};
