// artworks.js - 绘画作品数据
const artworksData = [
        // 插画作品 - 节日系列
            {
        id: 35,
        title: "冰雪节",
        description: "好大的雪滑梯！",
        image: "img/十二月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
        {
        id: 34,
        title: "智慧节",
        description: "一站到底，看看谁是最聪明的小朋友！",
        image: "img/十一月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
         {
        id: 33,
        title: "鬼怪节",
        description: "吓你一跳！",
        image: "img/十月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
         {
        id: 32,
        title: "月光节",
        description: "沿着这条路，我们到月亮上去。",
        image: "img/九月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
         {
        id: 31,
        title: "美食节",
        description: "制作美食是一件幸福的事。",
        image: "img/八月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
        {
        id: 30,
        title: "银河节",
        description: "满载一船星辉，在星辉斑斓里放歌。",
        image: "img/七月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    }, 
        {
        id: 29,
        title: "刨冰节",
        description: "这么大的刨冰，要吃很久吧？",
        image: "img/六月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
{
        id: 28,
        title: "苹果节",
        description: "化身角色，在大舞台上表演吧！",
        image: "img/五月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
         {
        id: 27,
        title: "七色节",
        description: "拿着七色花，前往彩虹的尽头。",
        image: "img/四月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
                {
        id: 26,
        title: "繁花节",
        description: "开满了鲜花的春天。",
        image: "img/三月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
          {
        id: 25,
        title: "冰钓节",
        description: "在冰面上钓鱼，别有一番风味呢。",
        image: "img/二月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
    {
        id: 23,
        title: "冬眠节",
        description: "好好睡觉的孩子会有奖励哦。",
        image: "img/一月.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2026-03-10"
    },
    // 插画作品 - 花卉系列
    {
        id: 1,
        title: "向日葵",
        description: "很大，很大的床。",
        image: "img/flower1.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 2,
        title: "玫瑰",
        description: "以我的鲜血浇灌。",
        image: "img/flower2.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 3,
        title: "蒲公英",
        description: "高高地飞向天空吧！",
        image: "img/flower3.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 4,
        title: "铃兰",
        description: "下雨了，还好有一把大伞。",
        image: "img/flower4.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    
    // 插画作品 - 季节系列
    {
        id: 5,
        title: "春游",
        description: "大家一起热闹地野餐！",
        image: "img/picnic.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 6,
        title: "夏天",
        description: "享受清凉的海水吧！",
        image: "img/summer.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 7,
        title: "圣诞节",
        description: "在圣诞树下拿走你的礼物吧。",
        image: "img/winter.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    
    // 插画作品 - 奇幻系列
    {
        id: 8,
        title: "永无乡巴士",
        description: "这辆车会开去哪里？",
        image: "img/bus.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 9,
        title: "彩虹",
        description: "彩虹的尽头有什么？",
        image: "img/rainbow.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    {
        id: 10,
        title: "银河列车",
        description: "我们要去往宇宙之中。",
        image: "img/yinhetiedao.png",
        category: "游戏",
        tags: ["永无乡", "插画"],
        date: "2025-06-08"
    },
    
    // 立绘作品
    {
        id: 11,
        title: "女仆执事咖啡厅",
        description: "欢迎光临，请问想喝点什么？",
        image: "img/nvpu.png",
        category: "游戏",
        tags: ["永无乡", "立绘"],
        date: "2025-06-08"
    },
    
    // 场景作品
    {
        id: 12,
        title: "餐厅",
        description: "因为是餐厅，所以是苹果。",
        image: "img/canting.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 13,
        title: "海边小屋",
        description: "爱丽丝最爱的地方。",
        image: "img/haibianxiaowu.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 14,
        title: "服装店",
        description: "像一顶大大的礼帽。",
        image: "img/fuzhuangdian.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 15,
        title: "咖啡厅",
        description: "一家只提供黑咖啡的店。",
        image: "img/kafeiting.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 16,
        title: "图书馆",
        description: "存放着全世界的图书。",
        image: "img/tushuguan.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 17,
        title: "玩具店",
        description: "可爱的玩具熊！",
        image: "img/wanjudian.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 18,
        title: "杂货店",
        description: "有各种实用物品。",
        image: "img/zahuodian.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    {
        id: 19,
        title: "乐器店",
        description: "乐器多到可以原地开交响乐团。",
        image: "img/yueqidian.png",
        category: "游戏",
        tags: ["永无乡", "场景"],
        date: "2025-06-08"
    },
    
    // 企划作品
    {
        id: 20,
        title: "猫猫",
        description: "每诞生一个猫耳娘，就会有一只人耳猫。",
        image: "img/cat.png",
        category: "企划",
        tags: ["其他"],
        date: "2025-06-08"
    },
    {
        id: 21,
        title: "彩蛋",
        description: "诞生了！",
        image: "img/caidan.gif",
        category: "企划",
        tags: ["其他"],
        date: "2025-06-08"
    },
    {
        id: 22,
        title: "飞向月亮",
        description: "我们要去一个更好的地方。",
        image: "img/fly.png",
        category: "企划",
        tags: ["其他"],
        date: "2025-06-08"
    }
];