// stories.js - 小说作品数据
// 包含思念管理中心世界观相关的短篇和中篇小说

const storiesData = [
    // ========== 短篇系列：思念体观察日记 ==========
    {
        id: 1,
        title: "丑人多作怪",
        summary: "同学们都说，她和冯峻是很般配的一对。",
        cover: "img/story-cover1.jpg",  // 你可以用相关的绘画作品作为封面，比如 flower1.png
        content: "stories/丑人多作怪.md",
        category: "短篇",
        tags: ["校园"],
        date: "2026-03-10",
        words: 3063,
        relatedArtIds: []  
    },
    {
        id: 2,
        title: "末日考",
        summary: "也许听起来有点自大，但我相信，外星人是为了你我而来的。",
        cover: "img/story-cover2.jpg",
        content: "stories/末日考.md",
        category: "短篇",
        tags: ["校园", "gl向"],
        date: "2026-03-10",
        words: 8553,
        relatedArtIds: []  // 暂时没有对应绘画
    },
    {
        id: 3,
        title: "我发现女神用AI写文",
        summary: "你凭什么以为自己能全身而退呢？",
        cover: "img/story-cover3.jpg",
        content: "stories/我发现女神用AI写文.md",
        category: "短篇",
        tags: ["同人女爱同人"],
        date: "2026-03-10",
        words: 6868,
        relatedArtIds: [14, 15]  // 服装店、咖啡厅
    },
    {
        id: 4,
        title: "新鲜新鲜",
        summary: "为了追求新鲜感，奥罗拉出轨了。",
        cover: "img/story-cover4.jpg",
        content: "stories/新鲜新鲜.md",
        category: "短篇",
        tags: ["西幻", "魔女", "gl向"],
        date: "2026-03-10",
        words: 5950,
        relatedArtIds: []
    },
    
    // ========== 中篇 ==========
    {
 id: 5,
    title: "粉红色的秘密",
    summary: "我最喜欢粉红色了。",
    cover: "img/story-cover5.jpg",
    // 中篇：用 chapters 数组，不用 content
    chapters: [
        {
            title: "第一章",
            file: "stories/粉红色的秘密第一章.md"
        },
        {
            title: "第二章",
            file: "stories/粉红色的秘密第二章.md"
        },
        {
            title: "第三章",
            file: "stories/粉红色的秘密第三章.md"
        },

    ],
    category: "中篇",
    tags: ["校园", "cb向"],
    date: "2026-03-10",
    words: 15371,
    chapterCount: 3  // 总章节数
    },
    {
id: 6,
    title: "大小姐究竟为何这样",
    summary: "一个人和几十万人，常望舒永远会选人多的那边。",
    cover: "img/story-cover5.jpg",
    // 中篇：用 chapters 数组，不用 content
    chapters: [
        {
            title: "第一章",
            file: "stories/大小姐究竟为何这样第一章.md"
        },
        {
            title: "第二章",
            file: "stories/大小姐究竟为何这样第二章.md"
        },


    ],
    category: "中篇",
    tags: ["古风", "gl向"],
    date: "2026-03-10",
    words: 9901,
    chapterCount: 2  // 总章节数
    },
    {
        id: 7,
    title: "飞向冥王星",
    summary: "冥王星在我心里，一直都是行星！",
    cover: "img/story-cover5.jpg",
    // 中篇：用 chapters 数组，不用 content
    chapters: [
        {
            title: "第一章",
            file: "stories/飞向冥王星第一章.md"
        },
        {
            title: "第二章",
            file: "stories/飞向冥王星第二章.md"
        },
        {
            title: "第三章",
            file: "stories/飞向冥王星第三章.md"
        },
        {
            title: "第四章",
            file: "stories/飞向冥王星第四章.md"
        },
        {
            title: "第五章",
            file: "stories/飞向冥王星第五章.md"
        },


    ],
    category: "中篇",
    tags: ["校园", "cb向"],
    date: "2026-03-10",
    words: 27016,
    chapterCount: 5 // 总章节数
    },
]