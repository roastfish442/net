/**
 * 物品与共鸣配方。
 *
 * items   name 是物品名（结局、存档都按名字走）；color 写 style.css 里的颜色变量
 *         （--item-*，两套主题各有一套，改色去 style.css），一件一个颜色好分辨。
 *         顺序就是物品编号，但要新增物品直接往后加即可，不用记编号。
 * recipes scene 是共鸣出的场景名（要和 events.js 里的 name 完全一致），
 *         use 里写物品名，2-5 件，顺序无关。
 *
 * 想加一件新的可修复道具：在 items 里加一行（并用同名变量去 style.css 里加颜色），
 * 再给它写上能共鸣出的配方；如果它是「后半程的入口道具」，把名字加进 config.js 的 stage2Items。
 */
window.WYL_ITEMS = [
	{ name: "天青石手串", color: "var(--item-bracelet)" },
	{ name: "玉佩（宵）", color: "var(--item-jade-xiao)" },
	{ name: "玉佩（柳）", color: "var(--item-jade-liu)" },
	{ name: "玉佩（锋）", color: "var(--item-jade-feng)" },
	{ name: "破碎的月琴", color: "var(--item-broken-lute)" },
	{ name: "月琴", color: "var(--item-lute)" },
	// —— 第二案 ——
	// 暗淡的玉镯是第二案的起点（相当于第一案的「破碎的月琴」）；
	// 收满这一案的思念后合成出「明亮的玉镯」（相当于「月琴」，见 config.js 的 stage2Items）。
	{ name: "暗淡的玉镯", color: "var(--item-dull-bangle)" },
	{ name: "婚戒", color: "var(--item-ring)" },
	{ name: "手表", color: "var(--item-watch)" },
	{ name: "小猫挂件", color: "var(--item-cat-charm)" },
	{ name: "兔子挂件", color: "var(--item-rabbit-charm)" },
	{ name: "明亮的玉镯", color: "var(--item-bright-bangle)" },
];

window.WYL_RECIPES = [
	{ scene: "雷电之夜", use: ["天青石手串", "破碎的月琴"] },
	{ scene: "猛毒", use: ["天青石手串", "玉佩（宵）"] },
	{ scene: "月光下的死亡", use: ["玉佩（宵）", "破碎的月琴"] },
	{ scene: "认亲", use: ["玉佩（宵）", "玉佩（锋）"] },
	{ scene: "初见", use: ["玉佩（柳）", "玉佩（锋）"] },
	{ scene: "红色月牙泉", use: ["玉佩（锋）", "破碎的月琴"] },
	{ scene: "定亲", use: ["玉佩（宵）", "玉佩（柳）"] },
	{ scene: "拉钩", use: ["天青石手串", "玉佩（柳）"] },
	{ scene: "病中", use: ["天青石手串", "玉佩（锋）"] },
	{ scene: "礼物", use: ["玉佩（柳）", "月琴"] },
	{ scene: "弹琴", use: ["玉佩（锋）", "月琴"] },
	{ scene: "夜半", use: ["天青石手串", "月琴"] },
	{ scene: "天命", use: ["天青石手串", "玉佩（宵）", "玉佩（锋）"] },
	{ scene: "宴席", use: ["天青石手串", "玉佩（宵）", "玉佩（柳）", "玉佩（锋）"] },
	{ scene: "刺杀", use: ["天青石手串", "玉佩（宵）", "玉佩（柳）", "玉佩（锋）", "月琴"] },
	{ scene: "承诺", use: ["天青石手串", "玉佩（锋）", "月琴"] },
	{ scene: "谈心", use: ["玉佩（宵）", "玉佩（锋）", "月琴"] },

	// —— 第二案·一阶段（手镯 = 暗淡的玉镯）——
	{ scene: "平凡的一天", use: ["暗淡的玉镯", "婚戒"] },
	{ scene: "最后一次见面", use: ["暗淡的玉镯", "手表"] },
	{ scene: "妈妈的葬礼", use: ["暗淡的玉镯", "兔子挂件"] },
	{ scene: "天赐良机", use: ["暗淡的玉镯", "小猫挂件"] },
	{ scene: "婚礼", use: ["婚戒", "手表"] },
	{ scene: "好朋友的证明", use: ["小猫挂件", "兔子挂件"] },
	{ scene: "我的爸爸", use: ["手表", "兔子挂件"] },
	{ scene: "难忘的一天", use: ["手表", "小猫挂件", "兔子挂件"] },

	// —— 第二案·二阶段（手镯 = 明亮的玉镯）——
	{ scene: "举杯邀明月", use: ["明亮的玉镯", "兔子挂件"] },
	{ scene: "月亮", use: ["明亮的玉镯", "手表"] },
	{ scene: "对影成三人", use: ["明亮的玉镯", "婚戒"] },
	// 「月亮」有两个组合都能共鸣出来（另一条在上面），这是故意的
	{ scene: "月亮", use: ["明亮的玉镯", "小猫挂件"] },
];
