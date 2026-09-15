/**
 * 全局配置 —— 想改游戏名、进度规则、解锁条件，改这里就够了。
 */
window.WYL_CONFIG = {
	title: '万物有灵',
	subtitle: '思念管理中心',
	version: 'v1.1 ',
	author: '烧烤鳜鱼',

	startNode: '起',           // 打开游戏进入的节点
	firstNode: '开场',         // “开始游戏”按钮的去向

	storageKey: 'wyl.save.v1', // localStorage 键名，改它等于清空老存档
	slots: 3,                  // 手动存档槽数量（自动存档不占槽）

	/**
	 * 进度条：收集类别的名称与顺序，顺序即界面显示顺序。
	 * total 不用写 —— 装载时按 events.js 里归到这条线的场景数量自动算。
	 */
	tracks: [
		{ key: 'moon', name: '思念碎片', short: '思念' },
		{ key: 'soul', name: '月琴残魂', short: '残魂' },
		{ key: 'truth', name: '真相', short: '真相' },
		{ key: 'core', name: '思念核心', short: '核心' },
		// 第二案（名字先占着，想改随时改）
		{ key: 'case2a', name: '玉镯思念', short: '玉镯' },
		{ key: 'case2b', name: '月下记忆', short: '月下' },
		// 第三阶段的「真相」线：每梳理完一场（点开它的真相页）记一格
		{ key: 'case2c', name: '真相', short: '真相' }
	],

	/**
	 * 阶段推进：这条线收满后自动跳到某个节点，once 是只触发一次的标记。
	 * count 也不用写 —— 按该分类的场景数量自动算。
	 */
	advance: [
		{ track: 'moon', to: '合成大月琴', once: 'hecheng1' },
		{ track: 'soul', to: '合成大月琴2', once: 'hecheng2' },
		{ track: 'truth', to: '合成大月琴3', once: 'hecheng3' },
		// 第二案：一阶段的思念收满 → 合出明亮的玉镯（三阶段的推进等场景定下来再加）
		{ track: 'case2a', to: '合成明亮的玉镯', once: 'hecheng2a' },
		// 第二案：二阶段的思念收满 → 进第三阶段（过渡页的文案是占位，剧情写好后替换）
		{ track: 'case2b', to: '第三阶段·过渡', once: 'hecheng2b' },
		// 第二案：第三阶段的真相全梳理完 → 结尾的 077 对话
		{ track: 'case2c', to: '第二案·结局档案', once: 'hecheng2c' }
	],

	/** 解锁规则：面板什么时候可用
	 *  always 一直可用 | visited 进过任意记忆碎片后 | tutorial 教程结束后 | stage2 拿到月琴后 */
	unlock: {
		crafting: 'visited',
		cloze: 'visited',
		archive1: 'visited',
		archive2: 'stage2',
		hints2: 'stage2'
	},

	/**
	 * 后半程入口道具：拿到其中任意一件，就算进入「后一阶段」——
	 * 解锁档案柜（二）、AI 助手提示这些（见上面的 unlock）。
	 * 第一案是月琴，第二案是合成出来的明亮的玉镯；写 items.js 里的物品名。
	 */
	stage2Items: ['月琴', '明亮的玉镯']

	/**
	 * 档案柜里始终列出的事件、场景里的额外按钮，不在这里配 ——
	 * 写在 events.js 对应场景的 listed / listedTitle / listedWhen 与 buttons 里，
	 * 装载时会自动整理成 CFG.alwaysInArchive 与 CFG.overrides。
	 */
};
