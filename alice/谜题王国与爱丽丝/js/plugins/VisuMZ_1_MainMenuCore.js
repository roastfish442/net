//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.23;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [MainMenuCore]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
* @orderAfter VisuMZ_0_CoreEngine
*
* @help
* ============================================================================
* 简介
* ============================================================================
*
* 主菜单核心插件旨在让你在 RPG Maker MZ 编辑器之外更多地控制主菜单。游戏开发者可以控制命令的工作方式，主菜单的视觉美学以及为角色分配背景肖像作为菜单图像。
*
* 功能包括但不限于以下内容：
*
* * 控制通用主菜单设置。
* * 设置单独角色的菜单背景肖像。
* * 灵活更改出现在主菜单中的命令。
* * 添加新窗口，如游戏时间窗口和变量窗口。
* * 更改主菜单中窗口排列的样式。
* * 更改状态列表的显示方式和它的显示方式。
*
* ============================================================================
* 要求
* ============================================================================
*
* 此插件适用于 RPG Maker MZ。在其他版本的 RPG Maker 中将无法使用。
*
* ------ Tier 1 ------
*
* 此插件是 Tier 1 插件。请将其放置在插件管理器列表中较低 Tier 值的其他插件下方（例如：0、1、2、3、4、5）。这样可以确保您的插件与 VisuStella MZ 库中的其余部分兼容性最佳。
*
* ============================================================================
* 注释标签
* ============================================================================
*
* 以下是通过此插件添加的注释标签。如果此插件未启用或不存在，这些注释标签将无效。
*
* ---
*
* <Menu Portrait: filename>
*
* - 用于：角色
* - 与“Portrait（肖像）”样式的主菜单列表一起使用。
* - 将角色的菜单图像设置为“filename”。
* - 将“filename”替换为游戏项目的 img/pictures/ 文件夹中找到的图片。文件名区分大小写。不要包含文件名扩展名在注释标记中。
*
* ---
* 
* <Menu Portrait Offset: +x, +y>
* <Menu Portrait Offset: -x, -y>
* 
* <Menu Portrait Offset X: +x>
* <Menu Portrait Offset X: -x>
* 
* <Menu Portrait Offset Y: +y>
* <Menu Portrait Offset Y: -y>
*
* - 用于：角色
* - 与“Portrait（肖像）”样式的主菜单列表一起使用。
* - 调整菜单图像的 X 和 Y 坐标偏移量。
* - 用数字值 'x' 替换偏移 X 坐标。
* - 负值 'x' 向左偏移。正值 'x' 向右偏移。
* - 用数字值 'y' 替换偏移 Y 坐标。
* - 负值 'y' 向上偏移。正值 'y' 向下偏移。
* - 这仅适用于主菜单肖像。
* 
* ---
*
* ============================================================================
* 插件命令
* ============================================================================
*
* 以下是此插件提供的插件命令。可以通过插件命令事件命令访问它们。
*
* ---
* 
* === 角色插件命令 ===
* 
* ---
*
* Actor: Change Menu Image (Group)
* Actor: Change Menu Image (Range)
* Actor: Change Menu Image (JS)
* - 更改角色的菜单图像。
* - 每个版本都有不同的选择角色 ID 的方法。
*
*   角色 ID：
*   - 选择要影响的 ID（们）。
*
*   文件名：
*   - 选择的角色将其菜单图像更改为此文件名。
*
* ---
* 
* === 菜单命令插件命令 ===
* 
* ---
* 
* Menu Command: Clear Forced Settings
* - 清除菜单命令符号的任何强制设置。
* 
*   符号（们）：
*   - 在此处插入菜单命令的符号。
*   - 符号区分大小写。
*   - VisuStella 不对由于变得超出预期使用范围的菜单而产生的任何错误负责。
* 
* ---
* 
* Menu Command: Force Disable
* - 强制通过其符号禁用特定菜单命令。
* - 将被强制启用的匹配符号将被覆盖。
* 
*   符号（们）：
*   - 在此处插入菜单命令的符号。
*   - 符号区分大小写。
*   - VisuStella 不对由于变得超出预期使用范围的菜单而产生的任何错误负责。
* 
* ---
* 
* Menu Command: Force Enable
* - 强制通过其符号启用特定菜单命令。
* - 将被强制禁用的匹配符号将被覆盖。
* 
*   符号（们）：
*   - 在此处插入菜单命令的符号。
*   - 符号区分大小写。
*   - VisuStella 不对由于变得超出预期使用范围的菜单而产生的任何错误负责。
* 
* ---
* 
* Menu Command: Force Hide
* - 强制通过其符号隐藏特定菜单命令。
* - 将被强制显示的匹配符号将被覆盖。
* 
*   符号（们）：
*   - 在此处插入菜单命令的符号。
*   - 符号区分大小写。
*   - VisuStella 不对由于变得超出预期使用范围的菜单而产生的任何错误负责。
* 
* ---
* 
* Menu Command: Force Show
* - 强制通过其符号显示特定菜单命令。
* - 将被强制隐藏的匹配符号将被覆盖。
* 
*   符号（们）：
*   - 在此处插入菜单命令的符号。
*   - 符号区分大小写。
*   - VisuStella 不对由于变得超出预期使用范围的菜单而产生的任何错误负责。

* 
* ---
*
* ============================================================================
* 插件参数: 通用设置
* ============================================================================
*
* 这些通用设置包含了关于主菜单场景如何显示特定窗口、改变特定窗口行为以及确定哪些场景会显示角色菜单图像作为背景肖像的各种设置。
*
* ---
*
* 金币窗口
* 
*   缩小金币窗口：
*   - 在主菜单中使金币窗口变窄？
*   - 用于匹配游戏时间窗口和变量窗口。
*   - 仅适用于命令窗口样式：默认垂直。
* 
*   自动调整高度：
*   - 自动调整较窄的金币窗口的高度？
*
*   自动调整 Y 轴位置：
*   - 自动调整较窄的金币窗口的 Y 轴位置？
*
* ---
* 
* 状态窗口
* 
*   选择最后一个？
*   - 在从命令窗口选择个人命令时，选择上次选定的角色还是总是第一个？
* 
* ---
*
* 单人队伍
*
*   单人快速模式：
*   - 当只有一个队员时，选择“技能”、“装备”或“状态”后立即进入场景。
*
* ---
*
* 子菜单
*
*   含有角色背景的菜单：
*   - 一个兼容角色菜单背景的菜单列表
*
*   JS：角色背景动作：
*   - 用于确定加载时如何显示精灵的代码。
*
* ---
* 
* 队伍窗口
* 
*   显示备用成员：
*   - 在主菜单场景中显示备用成员？
* 
*   仅隐藏主菜单：
*   - 如果隐藏备用成员，只在主菜单中隐藏还是在所有场景中都隐藏？
*
* ---
*
* ============================================================================
* 插件参数: 命令窗口列表
* ============================================================================
*
* 命令窗口作为连接到主菜单的各种场景的中心。这些包括“物品”、“技能”、“装备”、“状态”、“保存”等。此插件参数是一个数组，允许您添加、删除和/或修改命令窗口的各种命令，包括它们的处理方式、可见性以及在选择时的反应。
*
* 这将需要适当的 JavaScript 知识来正确使用。
*
* ---
*
* 命令窗口列表
* 
*   符号：
*   - 用于此命令的符号。
* 
*   子类别：
*   - 此命令使用的子类别。
*   - 如果没有子类别，留空。
*
*   图标：
*   - 用于此命令的图标。
*   - 使用 0 表示没有图标。
* 
*   STR：文本：
*   - 用于标题命令的显示文本。
*   - 如果有值，忽略 JS：文本 版本。
*
*   JS：文本：
*   - 用于确定显示名称的字符串的 JavaScript 代码。
* 
*   JS：显示：
*   - 用于确定项目是否显示的 JavaScript 代码。
* 
*   JS：启用：
*   - 用于确定项目是否启用的 JavaScript 代码。
* 
*   JS：扩展：
*   - 用于确定应添加的任何扩展数据的 JavaScript 代码。
* 
*   JS：运行代码：
*   - 选定此命令后运行的 JavaScript 代码。
* 
*   JS：个人代码：
*   - 选中此命令时运行的 JavaScript 代码，其中包含角色列表。
*
* ---
* 
* ==== 子类别 ====
* 
* 子类别是主菜单核心版本 1.18 的新功能。设置子类别后，它将仅显示属于该子类别的命令窗口项目。当没有活动子类别或者是不同子类别时，这些命令窗口项目将不会显示。
* 
* ---
* 
* 要创建一个子类别，必须完成以下几项操作：
* 
* 1. 子类别符号必须是 "subcategory"。
* 
* 2. 由 JS：扩展 返回的字符串决定子类别。在默认的插件参数中，返回 'datalog' 作为子类别。选择时会变为这个子类别。
* 
* 3. 对于 JS：运行代码，请在其中的某处包含以下代码：
* 
*    const ext = arguments[0];
*    this.setSubcategory(ext);
* 
* ---
* 
* 要使命令窗口项目成为子类别的一部分，请执行以下操作：
* 
* 1. 使用 JS：扩展 字符串值（区分大小写）。
* 
* 2. 将其设置为目标命令窗口项目的 "子类别" 值。
* 
* 3. 如果子类别不存在，则此命令窗口项目将正常显示。

* 
* ---
*
* ============================================================================
* 插件参数: 游戏时间窗口
* ============================================================================
*
* 游戏时间窗口是一个可选功能，可以显示在主菜单中。顾名思义，它显示玩家当前游戏进度的游戏时间。
*
* ---
*
* 游戏时间窗口
* 
*   启用：
*   - 使用游戏时间窗口？
* 
*   调整命令窗口：
*   - 调整命令窗口的高度以适应游戏时间窗口？
*
*   背景类型：
*   - 选择游戏时间窗口的背景类型。
* 
*   字体大小：
*   - 用于在游戏时间窗口中显示金币的字体大小。
* 
*   时间图标：
*   - “时间”标签显示的图标。
* 
*   时间文本：
*   - 游戏时间窗口中“时间”显示的文本。
* 
*   JS: X, Y, W, H:
*   - 用于确定游戏时间窗口尺寸的代码。
*
* ---
*
* ============================================================================
* 插件参数: 变量窗口
* ============================================================================
*
* 变量窗口是一个可选功能，可以显示在主菜单中。如果启用，变量窗口将显示游戏开发者在主菜单中选择的变量。
*
* ---
*
* 变量窗口
* 
*   启用：
*   - 使用变量窗口？
* 
*   调整命令窗口：
*   - 调整命令窗口的高度以适应变量窗口？
*
*   背景类型：
*   - 选择变量窗口的背景类型。
* 
*   字体大小：
*   - 用于在变量窗口中显示金币的字体大小。
* 
*   变量列表：
*   - 选择要显示在窗口中的变量。
*     使用 \i[x] 来确定它们的图标。
* 
*   JS: X, Y, W, H:
*   - 用于确定变量窗口尺寸的代码。
*
* ---
*
* ============================================================================
* 插件参数: 命令窗口样式与命令样式设置
* ============================================================================
*
* 这确定了基于命令窗口样式的主菜单外观。如果使用除“默认”以外的样式，那么这些设置将接管主菜单的窗口布局设置。这意味着即使您使用了VisuStella的核心引擎，窗口布局也会被覆盖。
*
* ---
*
* 命令窗口样式：
* - 选择主菜单命令窗口的定位和样式。
* - 这将自动重新排列窗口。
* 
*   默认垂直侧边样式：
*   - 默认的主菜单布局样式。
*   - 受VisuStella核心引擎插件参数设置的影响。
* 
*   顶部水平样式：
*   - 将命令窗口置于屏幕顶部。
*   - 金币、游戏时间和变量窗口移到底部。
*   - 角色列表窗口放置在中间。
*   - 不受VisuStella核心引擎插件参数设置的影响。
*
*   底部水平样式：
*   - 将命令窗口置于屏幕底部。
*   - 金币、游戏时间和变量窗口移到顶部。
*   - 角色列表窗口放置在中间。
*   - 不受VisuStella核心引擎插件参数设置的影响。
* 
*   移动全屏样式：
*   - 将命令窗口放置在屏幕中央，按钮更大。
*   - 金币、游戏时间和变量窗口移到底部。
*   - 直到被选择为止，角色列表窗口都是隐藏的。
*   - 不受VisuStella核心引擎插件参数设置的影响。
*
* ---
*
* 命令样式设置
*
*   样式：
*   - 您希望如何绘制命令条目在命令窗口中？
*   - 仅文本：只显示文本。
*   - 仅图标：只显示图标。
*   - 图标 + 文本：先显示图标，然后是文本。
*   - 自动：确定适合大小的最佳方式。
*
*   文本对齐：
*   - 决定文本的对齐方式。
*   - 左对齐、居中或右对齐
* 
*   行数：
*   - 可见行数。
*   - 仅适用于顶部、底部和移动样式。
* 
*   列数：
*   - 最大列数。
*   - 仅适用于顶部、底部和移动样式。
* 
*   移动版本厚度：
*   - 移动版本按钮的厚度。
*   - 仅适用于顶部、底部和移动样式。

*
* ---
*
* ============================================================================
* 插件参数: 状态图形, 状态列表样式 & 列表样式设置
* ============================================================================
*
* 选择主菜单中角色状态列表窗口的显示方式。
* 这可以涵盖角色图形的选择以及显示数据的样式。
*
* ---
*
* 状态图形:
* - 选择角色状态菜单中角色图形的显示方式。
* 
*   无:
*   - 不显示任何角色图形。
* 
*   脸部:
*   - 显示角色的脸部图像。这是RPG Maker MZ中的默认选项。
*
*   地图精灵:
*   - 显示角色的地图精灵。
* 
*   侧视战斗者:
*   - 显示角色的侧视战斗者。
*
* ---
*
* 主菜单列表样式
* - 选择主菜单中角色状态列表的外观。
*
* 内部菜单列表样式
* - 选择像物品场景（Scene_Item）、技能场景（Scene_Skill）等内部菜单中角色状态列表的外观。
*
*   默认水平样式:
*   - 这是RPG Maker MZ主菜单中的默认样式。
*
*   垂直样式:
*   - 使角色列表的显示垂直而不是水平。
*
*   竖版样式:
*   - 类似于垂直样式，不同之处在于每个角色的菜单图像显示在背景中。需要使用角色肖像。
*   - 如果未使用菜单图像，将切换到垂直样式并使用脸部图像。
*
*   单人样式:
*   - 用于单人游戏。扩展整个状态窗口以适应单个角色。
*
*   窄水平样式:
*   - 使角色的可选菜单条目成为单行窄条。
*
*   更厚水平样式:
*   - 使角色的可选菜单条目成为双行厚条。
*
* ---
*
* 列表样式
*   JavaScript代码用于确定如何绘制各种样式。
*
*   JS: 默认:
*   JS: 垂直:
*   JS: 竖版:
*   JS: 单人:
*   JS: 窄:
*   JS: 更厚:
*   - 用于绘制这些样式的代码。
*
* ---
*
* ============================================================================
* 使用条款
* ============================================================================
*
* 1. 这些插件可以在免费或商业游戏中使用，前提是它们通过VisuStella.com和/或任何其他官方批准的VisuStella来源进行获取。在VisuStella.com上列出的例外情况和特殊情况可能会禁止使用。
* 
* 2. 必须在您的游戏中为插件的Credits部分中列出的所有开发人员给予适当的赞助，或以“VisuStella”团队的名义集体给予赞助。
* 
* 3. 您可以编辑源代码以满足您的需求，但不得声称源代码属于您。VisuStella也不对插件的代码进行修改后可能产生的问题负责，也不对用户提供的自定义代码负责，包括高级JavaScript标签和/或允许自定义JavaScript代码的插件参数，这些代码用于自定义控制效果。
* 
* 4. 您不得重新分发这些插件，也不得将这些插件的代码用作您自己的代码。这些插件及其代码仅可从VisuStella.com和其他官方/批准的VisuStella来源下载。VisuStella.com上还列出了官方/批准的来源列表。
*
* 5. VisuStella不对因不当使用、与VisuStella MZ库之外的插件不兼容的问题、未更新的插件版本，或由任何第三方提供的用于自定义控制效果的自定义代码引起的问题负责。VisuStella不对由任何用户提供的用于自定义控制效果的自定义JavaScript标签和/或插件参数允许的JavaScript代码引起的错误负责。
*
* 6. 如果需要通过与VisuStella无关的第三方进行兼容性修补程序，并涉及使用VisuStella MZ库中的代码，必须与VisuStella的成员联系并获得批准。该补丁将在VisuStella.com上作为免费下载向公众提供。此类补丁不得用于获得金钱利益，包括佣金、众筹和/或捐款。
*
* ============================================================================
* Credits
* ============================================================================
* 
* 如果您使用此插件，请在游戏中为以下人员致谢：
* 
* VisuStella团队
* * Yanfly
* * Arisu
* * Olivia
* * Irina

*
* ============================================================================
* 更新日志
* ============================================================================
* 
* Version 1.23: 2024年2月15日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，包括“战斗策略”命令。
* *** 这是为即将推出的VisuStella MZ插件准备的。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“battleGridTactics”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* 
* Version 1.22: 2023年10月12日
* * 功能更新！
* ** 现在从子类推动的场景退出时，子类别现在可以保持。由Olivia添加并由AndyL赞助。
* 
* Version 1.21: 2023年4月13日
* * Bug修复！
* ** 现在多个子类别应该可以正常工作了。由Arisu修复。
* 
* Version 1.20: 2022年3月16日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，包括“图鉴”命令。
* *** 这是为即将推出的VisuStella MZ插件准备的。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“bestiary”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* 
* Version 1.19: 2022年12月15日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，包括“CG画廊”，“制作人员页面”和“更新说明”命令。
* *** 这是为即将推出的VisuStella MZ插件准备的。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“cgGallery”，“creditsPage”或“patchNotes”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* 
* Version 1.18: 2022年10月27日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* * 文档更新！
* ** 更新了帮助文件以适应新功能。
* ** 在“命令窗口列表”的插件参数中添加了一个新部分，用于“子类别”及其处理方式的信息。
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，包括“教程列表”命令。
* *** 这是为即将推出的VisuMZ_2_TutorialPanelSys插件准备的。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“tutorialList”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* ** 添加了名为“Datalog”的子类别。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“subcategory”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* **** 现在将“Quest”、“Message Log”和“Combat Log”的现有条目添加到“Datalog”子类别中。
* * 新功能！
* ** 现在主菜单命令窗口支持子类别。
* *** 子类别允许您在选择子类别之前使某些命令窗口项目不可见。这有助于减少混乱并节省命令窗口命令列表中的空间。
* 
* Version 1.17: 2022年8月18日
* * Bug修复！
* ** 更改角色图形现在应该能够在使用默认状态菜单时正确反映出来。由Irina修复。
* 
* Version 1.16: 2022年4月21日
* * 文档更新！
* ** 帮助文件更新以适应新功能。
* * 新功能！
* ** 由Arisu添加并由AndyL赞助的新插件命令：
* *** 菜单命令：清除强制设置
* *** 菜单命令：强制禁用
* *** 菜单命令：强制启用
* *** 菜单命令：强制隐藏
* *** 菜单命令：强制显示
* **** 这些新的插件命令允许您强制显示、隐藏、启用或禁用插件命令，而不考虑其所需的设置。
* **** 我们不对访问应该被禁用或隐藏的菜单而导致的错误负责。
* 
* Version 1.15: 2022年2月10日
* * 优化更新！
* ** 插件应该运行得更加优化。
* 
* Version 1.14: 2021年10月25日
* * Bug修复！
* ** 插件参数设置，用于自动调整命令窗口高度，现在应该可以正常工作了。由Irina修复。
* * 文档更新！
* ** 在帮助文件中为“Gold Window > Thinner Gold Window”添加了一个注释。
* *** 仅适用于命令窗口样式：默认垂直。
* 
* Version 1.13: 2021年10月21日
* * 功能更新！
* ** 更新了图片肖像的四舍五入，以避免由于基础图像具有奇数值而绘制非整数坐标。由Olivia更新。
* 
* Version 1.12: 2021年7月16日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，包括“消息日志”命令。
* *** 这是为即将推出的VisuMZ_3_MessageLog插件准备的。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“MessageLog”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* 
* Version 1.11: 2021年5月14日
* * 功能更新！
* ** 更新了“命令窗口列表”的默认插件参数，将“加载”命令放在“保存”命令之后。
* *** 这允许玩家从主菜单访问加载游戏画面。
* *** 已安装主菜单核心的项目不会自动更新，但您可以按以下步骤从新项目中复制设置：
* **** 创建一个新项目。安装主菜单核心。打开新项目的“命令窗口列表”。右键单击“Load”选项并复制。转到目标项目的主菜单核心的“命令窗口列表”插件参数。粘贴命令到您希望的位置。
* 
* Version 1.10: 2021年4月16日
* * 功能更新！
* ** 现在列表样式的默认样式已经更新，并带有适合JS的代码：默认插件参数，适用于垂直屏幕分辨率大于正常的游戏。
* *** 要更新此设置，请执行以下操作之一：
* **** 打开主菜单核心插件参数。选择“列表样式设置”并按Delete。然后按Enter。将替换新的更新设置为JS：默认设置。
* **** 或者，在插件管理器列表中删除现有的VisuMZ_1_MainMenuCore.js并安装最新版本。
* 
* Version 1.09: 2021年3月19日
* * 文档更新！
* ** 在“状态图形，状态列表样式和列表样式设置”的插件参数部分为“肖像风格”添加了清晰度说明：
* *** 如果未使用菜单图像，则将切换到垂直样式并使用面部图像。
* 
* Version 1.08: 2021年2月26日
* * 功能更新！
* ** 更新了列表样式设置的默认插件参数，采用更紧凑的坐标值，以便更准确地显示UI元素的位置。由Olivia更新。
* 
* Version 1.07: 2021年1月1日
* * 文档更新！
* ** 为新功能添加了文档！
* ** 删除了“<菜单图像：文件名>”版本的标签说明，以减少混乱并遵循Battle Core声明的规范。
* * 新功能！
* ** 由Yanfly添加的新标签：
* *** <菜单肖像偏移：+x，+y>
* *** <菜单肖像偏移X：+x>
* *** <菜单肖像偏移Y：+y>
* **** 这与“肖像”风格的主菜单列表一起使用。
* **** 偏移菜单肖像的X和Y坐标。
* 
* Version 1.06: 2020年12月11日
* * 兼容性更新！
* ** 增加了未来插件的兼容功能。
* 
* Version 1.05: 2020年10月11日
* * 文档更新！
* ** 添加了新的插件参数的文档。
* * 新功能！
* ** Yanfly添加的新插件参数。
* *** 插件参数 > 一般 > 状态窗口 > 最后选择？
* **** 在从命令窗口选择个人命令时，选择上次选择的角色还是始终选择第一个？
* 
* Version 1.04: 2020年10月4日
* * 功能更新！
* ** 现在某些窗口在创建时将预加载所有关联的角色图像类型，以避免自定义JS绘图问题。由Irina更新。
* ** 添加了防护措施，以防止不存在的变量在未从变量列表中移除时导致游戏崩溃。由Irina更新。
* 
* Version 1.03: 2020年9月20日
* * 文档更新！
* ** 添加了另一种可选标签：<菜单肖像：文件名>，其功能与<菜单图像：文件名>相同。
* 
* Version 1.02: 2020年9月13日
* * 兼容性更新！
* ** 改进了SV角色图形的兼容性。
* 
* Version 1.01: 2020年8月23日
* * Bug修复！
* ** 修复了“显示”插件参数中技能检查的问题。由Yanfly和Shaz修复。
* *** 从版本1.00升级的用户需要通过删除插件管理器列表中的插件并重新安装它，或者转到插件参数 > 命令窗口列表 > skill > JS: Show > 并将 'this.needsCommand("item")' 更改为 'this.needsCommand("skill")'
*
* Version 1.00: 2020年8月20日
* * 完成插件！

*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Begin
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* ============================================================================
* 更新角色菜单图像组
* ============================================================================
* 
* @command ChangeActorMenuImageGroup
* @text 角色：更改菜单图像（组）
* @desc 更改角色的菜单图像。
* 从一组角色ID中选择要更改的角色。
*
* @arg Step1:arraynum
* @text 角色ID(s)
* @type actor[]
* @desc 选择要影响的角色ID(s)。
* @default ["1"]
*
* @arg Step2:str
* @text 文件名
* @type file
* @dir img/pictures/
* @desc 选定的角色将其菜单图像更改为此文件。
* @default 
*
* @ --------------------------------------------------------------------------
*
* @command ChangeActorMenuImageRange
* @text 角色：更改菜单图像（范围）
* @desc 更改角色的菜单图像。
* 从一段角色ID范围中选择要更改的角色。
*
* @arg Step1
* @text 角色ID范围
*
* @arg Step1Start:num
* @text 起始范围
* @parent Step1
* @type actor
* @desc 选择要开始的角色ID。
* @default 1
*
* @arg Step1End:num
* @text 结束范围
* @parent Step1
* @type actor
* @desc 选择要结束的角色ID。
* @default 4
*
* @arg Step2:str
* @text 文件名
* @type file
* @dir img/pictures/
* @desc 选定的角色将其菜单图像更改为此文件。
* @default 
*
* @ --------------------------------------------------------------------------
*
* @command ChangeActorMenuImageJS
* @text 角色：更改菜单图像（JS）
* @desc 更改角色的菜单图像。
* 使用JavaScript从一组角色ID中选择。
*
* @arg Step1:arrayeval
* @text 角色ID(s)
* @type string[]
* @desc 输入要影响的角色ID(s)。
* 您可以使用JavaScript代码。
* @default ["$gameVariables.value(1)"]
*
* @arg Step2:str
* @text 文件名
* @type file
* @dir img/pictures/
* @desc 选定的角色将其菜单图像更改为此文件。
* @default 
*
* @ --------------------------------------------------------------------------
*
* @command Separator_MenuCommand
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command MenuCommandClear
* @text 菜单命令：清除强制设置
* @desc 清除菜单命令符号的任何强制设置。
*
* @arg Symbols:arraystr
* @text 符号(s)
* @type string[]
* @desc 在此处插入菜单命令的符号。
* 符号区分大小写。
* @default []
*
* @ --------------------------------------------------------------------------
*
* @command MenuCommandForceDisable
* @text 菜单命令：强制禁用
* @desc 通过其符号强制禁用特定菜单命令。
* 匹配的强制启用符号将被覆盖。
*
* @arg Symbols:arraystr
* @text 符号(s)
* @type string[]
* @desc 在此处插入菜单命令的符号。
* 符号区分大小写。
* @default []
*
* @ --------------------------------------------------------------------------
*
* @command MenuCommandForceEnable
* @text 菜单命令：强制启用
* @desc 通过其符号强制启用特定菜单命令。
* 匹配的强制禁用符号将被覆盖。
*
* @arg Symbols:arraystr
* @text 符号(s)
* @type string[]
* @desc 在此处插入菜单命令的符号。
* 符号区分大小写。
* @default []
*
* @ --------------------------------------------------------------------------
*
* @command MenuCommandForceHide
* @text 菜单命令：强制隐藏
* @desc 通过其符号强制隐藏特定菜单命令。
* 匹配的强制显示符号将被覆盖。
*
* @arg Symbols:arraystr
* @text 符号(s)
* @type string[]
* @desc 在此处插入菜单命令的符号。
* 符号区分大小写。
* @default []
*
* @ --------------------------------------------------------------------------
*
* @command MenuCommandForceShow
* @text 菜单命令：强制显示
* @desc 通过其符号强制显示特定菜单命令。
* 匹配的强制隐藏符号将被覆盖。
*
* @arg Symbols:arraystr
* @text 符号(s)
* @type string[]
* @desc 在此处插入菜单命令的符号。
* 符号区分大小写。
* @default []
*
* @ --------------------------------------------------------------------------
*
* @command Separator_End
* @text -
* @desc -

*
* @ --------------------------------------------------------------------------
*
* @ ==========================================================================
* @ 插件参数
* @ ==========================================================================
*
* @param BreakHead
* @text --------------------------
* @default ----------------------------------
*
* @param MainMenuCore
* @text 主菜单核心
* @default Plugin Parameters
*
* @param ATTENTION
* @text 注意
* @default 请阅读帮助文件
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------

*
/**
* @param General:struct
* @text 常规设置
* @type struct<General>
* @desc 主菜单及相关设置的常规设置。
*

* @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
*
* @param CommandList:arraystruct
 * @text 命令窗口列表
 * @parent General:struct
 * @type struct<Command>[]
 * @desc 主菜单使用的窗口命令。
 * 在这里添加新命令。
* @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"subcategory\",\"Subcategory:str\":\"\",\"Icon:num\":\"230\",\"TextStr:str\":\"Datalog\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return this.isSubcategoryVisible(arguments[1]);\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"// This becomes the subcategory name. Case-sensitive.\\\\n\\\\nreturn 'datalog';\\\"\",\"CallHandlerJS:func\":\"\\\"const ext = arguments[0];\\\\nthis.setSubcategory(ext);\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"bestiary\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"10\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BestiaryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_Bestiary &&\\\\n    this.isBestiaryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBestiaryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBestiary();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"tutorialList\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.tutorial.menuCmd;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_TutorialPanelSys &&\\\\n    this.isTutorialListCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isTutorialListCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandTutorialList();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"cgGallery\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"311\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.cgGalleryMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CGGallery &&\\\\n    this.isCgGalleryCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCgGalleryCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCgGallery();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"creditsPage\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.CreditsPageMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CreditsPage &&\\\\n    this.isCreditsPageCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCreditsPageCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCreditsPage();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"patchNotes\",\"Subcategory:str\":\"datalog\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.PatchNotesMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_PatchNotes &&\\\\n    this.isPatchNotesCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isPatchNotesCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPatchNotes();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"battleGridTactics\",\"Subcategory:str\":\"\",\"Icon:num\":\"76\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.BattleGridTacticsMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_BattleGridSystem &&\\\\n    this.isBattleGridTacticsCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isBattleGridTacticsCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandBattleGridTactics();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
*
* @param Playtime:struct
 * @text 游戏时间窗口
 * @type struct<Playtime>
 * @desc 游戏时间窗口的设置。
* @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
*
* @param Variable:struct
* @text 变量窗口
* @type struct<Variable>
* @desc 变量窗口的设置。
* @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
*
* @param ParamBreak1
* @text --------------------------
* @default ----------------------------------
*
 *
 * @param CommandWindowStyle:str
 * @text 命令窗口样式
 * @type select
 * @option 默认垂直侧边样式
 * @value default
 * @option 顶部水平样式
 * @value top
 * @option 较细顶部水平样式
 * @value thinTop
 * @option 底部水平样式
 * @value bottom
 * @option 较细底部水平样式
 * @value thinBottom
 * @option 移动端全屏样式
 * @value mobile
 * @desc 选择主菜单命令窗口的位置和样式。这将自动重新排列窗口。
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text 命令窗口样式设置
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc 非默认命令窗口样式的设置。
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text 状态图形
 * @type select
 * @option 无
 * @value none
 * @option 头像
 * @value face
 * @option 地图精灵
 * @value sprite
 * @option 侧视战斗者
 * @value svbattler
 * @desc 在类似状态菜单的菜单中选择角色图形的显示方式。
 * @default face
 *
 * @param StatusListStyle:str
 * @text 主菜单列表样式
 * @type select
 * @option 默认水平样式
 * @value default
 * @option 垂直样式
 * @value vertical
 * @option 头像样式
 * @value portrait
 * @option 单独样式
 * @value solo
 * @option 较细水平样式
 * @value thin
 * @option 较厚水平样式
 * @value thicker
 * @desc 选择主菜单中角色状态列表的外观。
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text 内部菜单列表样式
 * @parent StatusListStyle:str
 * @type select
 * @option 默认水平样式
 * @value default
 * @option 垂直样式
 * @value vertical
 * @option 头像样式
 * @value portrait
 * @option 单独样式
 * @value solo
 * @option 较细水平样式
 * @value thin
 * @option 较厚水平样式
 * @value thicker
 * @desc 选择类似Scene_Item、Scene_Skill等内部菜单中角色状态列表的外观。
 * @default default
 *
 * @param ListStyles:struct
 * @text 列表样式设置
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc 用于确定如何绘制各个样式的JavaScript代码。
 *

* @default { "DefaultStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"", "VerticalStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"", "PortraitStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"", "SoloStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"", "ThinStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"", "ThickerStyle:func": "\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"" }
*
* @param BreakEnd1
  * @text--------------------------
* @default ----------------------------------
*
* @param End Of
  * @default Plugin Parameters
    *
* @param BreakEnd2
  * @text--------------------------
* @default ----------------------------------
*
* /
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 /**
 * @param Symbol:str
 * @text 符号
 * @desc 此命令使用的符号。
 * @default Symbol
 *
 * @param Subcategory:str
 * @text 子类别
 * @desc 此命令使用的子类别。
 * 留空表示无子类别。
 * @default 
 *
 * @param Icon:num
 * @text 图标
 * @desc 此命令使用的图标。
 * 使用 0 表示无图标。
 * @default 0
 *
 * @param TextStr:str
 * @text 文本
 * @desc 显示在菜单命令中的文本。
 * 如果填写了值，则忽略JS版本的文本。
 * @default 未命名
 *
 * @param TextJS:func
 * @text JS：文本
 * @type note
 * @desc 用于确定显示名称的字符串的JavaScript代码。
 * @default "return '文本';"
 *
 * @param ShowJS:func
 * @text JS：显示
 * @type note
 * @desc 决定项目是否显示的JavaScript代码。
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS：启用
 * @type note
 * @desc 决定项目是否启用的JavaScript代码。
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS：扩展
 * @type note
 * @desc 用于确定应添加的任何扩展数据的JavaScript代码。
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS：运行代码
 * @type note
 * @desc 选中此命令后运行的JavaScript代码。
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS：个人代码
 * @type note
 * @desc 在选中此命令时运行的JavaScript代码，高亮显示角色列表。
 * @default "const ext = arguments[0];"
 */

/* ----------------------------------------------------------------------------
 * 常规设置
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text 金币窗口
 *
 * @param ThinGoldWindow:eval
 * @text 更窄的金币窗口
 * @parent GoldWindow
 * @type boolean
 * @on 更窄
 * @off 正常
 * @desc 在主菜单中使金币窗口变窄？
 * 用于与游戏时间和变量窗口匹配。
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text 自动调整高度
 * @parent GoldWindow
 * @type boolean
 * @on 自动
 * @off 手动
 * @desc 自动调整更窄的金币窗口的高度？
 * @default true
 *
 * @param AutoGoldY:eval
 * @text 自动调整Y位置
 * @parent GoldWindow
 * @type boolean
 * @on 自动
 * @off 手动
 * @desc 自动调整更窄的金币窗口的Y位置？
 * @default true
 *
 * @param StatusWindow
 * @text 状态窗口
 *
 * @param StatusSelectLast:eval
 * @text 最后选中？
 * @parent StatusWindow
 * @type boolean
 * @on 最后选中的角色
 * @off 总是第一个角色
 * @desc 在命令窗口中选择个人命令时，选中最后选中的角色还是总是第一个角色？
 * @default false
 *
 * @param SoloParty
 * @text 单人队伍
 *
 * @param SoloQuick:eval
 * @text 单人快速模式
 * @parent SoloParty
 * @type boolean
 * @on 快速
 * @off 正常
 * @desc 当只有一个队员时，选择 "技能"、"装备" 或 "状态" 时，立即进入场景。
 * @default true
 *
 * @param SubMenus
 * @text 子菜单
 *
 * @param ActorBgMenus:arraystr
 * @text 带角色背景的菜单
 * @parent SubMenus
 * @type string[]
 * @desc 兼容角色菜单背景的菜单列表。
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS：角色背景操作
 * @parent SubMenus
 * @type note
 * @desc 用于确定加载时如何显示精灵的代码。
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text 队伍窗口
 *
 * @param ShowReserve:eval
 * @text 显示预备成员
 * @parent PartyWindow
 * @type boolean
 * @on 显示预备成员
 * @off 隐藏预备成员
 * @desc 在主菜单场景中显示预备成员？
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text 仅在主菜单中隐藏
 * @parent ShowReserve:eval
 * @type boolean
 * @on 仅在主菜单中隐藏
 * @off 在所有场景中隐藏
 * @desc 如果隐藏预备成员，仅在主菜单中隐藏还是在所有场景中隐藏？
 * @default true
 *
 */

/* ----------------------------------------------------------------------------
 * 游戏时间窗口
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text 使用窗口
 * @type boolean
 * @on 启用
 * @off 不启用
 * @desc 是否使用游戏时间窗口？
 * @default true
 *
 * @param AdjustCommandHeight:eval
 * @text 调整命令窗口高度
 * @type boolean
 * @on 启用
 * @off 正常
 * @desc 调整命令窗口的高度以适应游戏时间窗口？
 * @default true
 *
 * @param BgType:num
 * @text 背景类型
 * @type select
 * @option 窗口
 * @value 0
 * @option 半透明
 * @value 1
 * @option 透明
 * @value 2
 * @desc 选择游戏时间窗口的背景类型。
 * @default 0
 *
 * @param FontSize:num
 * @text 字体大小
 * @type number
 * @min 1
 * @desc 用于在游戏时间窗口中显示金币的字体大小。
 * 默认值：26
 * @default 20
 *
 * @param Icon:num
 * @text 时间图标
 * @desc 在“时间”标签上显示的图标。
 * @default 75
 *
 * @param Time:str
 * @text 时间文本
 * @desc 在游戏时间窗口中显示“时间”的文本。
 * @default 时间
 *
 * @param WindowRect:func
 * @text JS：X, Y, W, H
 * @type note
 * @desc 用于确定游戏时间窗口尺寸的代码。
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */

/* ----------------------------------------------------------------------------
 * 变量窗口
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text 使用窗口
 * @type boolean
 * @on 启用
 * @off 不启用
 * @desc 是否使用变量窗口？
 * @default false
 *
 * @param AdjustCommandHeight:eval
 * @text 调整命令窗口高度
 * @type boolean
 * @on 启用
 * @off 正常
 * @desc 调整命令窗口的高度以适应变量窗口？
 * @default true
 *
 * @param BgType:num
 * @text 背景类型
 * @type select
 * @option 窗口
 * @value 0
 * @option 半透明
 * @value 1
 * @option 透明
 * @value 2
 * @desc 选择变量窗口的背景类型。
 * @default 0
 *
 * @param FontSize:num
 * @text 字体大小
 * @type number
 * @min 1
 * @desc 用于在变量窗口中显示字体的大小。
 * 默认值：26
 * @default 20
 *
 * @param VarList:arraynum
 * @text 变量列表
 * @type variable[]
 * @desc 选择要显示在窗口中的变量。
 * 使用 \i[x] 来确定它们的图标。
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS：X, Y, W, H
 * @type note
 * @desc 用于确定变量窗口尺寸的代码。
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */

/* ----------------------------------------------------------------------------
 * 水平命令窗口样式
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text 命令样式
 * @parent MainList
 * @type select
 * @option 仅文本
 * @value text
 * @option 仅图标
 * @value icon
 * @option 图标 + 文本
 * @value iconText
 * @option 自动
 * @value auto
 * @desc 您希望如何在命令窗口中绘制命令条目？
 * @default auto
 *
 * @param TextAlign:str
 * @text 文本对齐
 * @type combo
 * @option 左对齐
 * @option 居中
 * @option 右对齐
 * @desc 决定文本的对齐方式。
 * @default center
 *
 * @param Rows:num
 * @text 行数
 * @type number
 * @min 1
 * @desc 可见行数。
 * @default 2
 *
 * @param Cols:num
 * @text 列数
 * @type number
 * @min 1
 * @desc 最大列数。
 * @default 4
 *
 * @param MobileThickness:num
 * @text 移动端按钮厚度
 * @type number
 * @min 1
 * @desc 移动版本按钮的厚度。
 * @default 5
 *
 */

/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
  * @param DefaultStyle:func
 * @text JS：默认
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS：垂直
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS：肖像
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS：单独
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS：细
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS：加粗
 * @type note
 * @desc 用于绘制此特定样式数据的代码。

 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

function _0x25ed() { const _0x1d49d2 = ['drawItemStatusThinStyle', 'forceDisable', 'map', 'lineHeight', '_variableWindow', 'resetTextColor', 'blt', 'MIKzF', 'systemColor', 'right', 'update', '_mainMenuSubcategory', 'characterName', 'drawPlaytime', 'EnableJS', 'svActorVertCells', 'drawItemImage', 'height', 'itemHeight', 'VisuMZ_0_CoreEngine', 'svActorHorzCells', 'variables', 'ytWmX', 'setHandler', 'InnerMenuListStyle', 'maxBattleMembers', '_data', 'commandName', 'addMainCommands', 'eINtg', 'battleMembers', 'QxMmh', '78310mGnahq', 'isMainMenuCommandVisible', 'MenuCommandForceDisable', '_subcategory', '_mainMenuCore', 'top', 'adjustDefaultCommandWindowRect', 'loadOtherActorImages', 'bxYsk', 'drawItem', 'Scene_Menu_statusWindowRect', 'drawTextEx', 'VfRAB', 'loadSvActor', 'nABYJ', 'addSaveCommand', 'drawItemActorSprite', 'ceil', 'parse', 'remove', 'Window_MenuCommand_initialize', 'mainMenuCoreSettings', 'ThinStyle', 'xTYSN', 'numVisibleRows', '_actor', 'includes', 'getMenuImage', 'faceHeight', 'mainAreaHeight', 'bind', 'ConvertParams', 'removeSubcategory', 'goldWindowRectTopStyle', 'initialize', 'calcWindowHeight', 'bitmap', 'commandWindowRectThinBottomStyle', 'max', 'item', 'vertical', '_statusWindow', 'iconText', 'thinGoldWindow', 'floor', '1899813JZxBlf', 'Window_MenuStatus_selectLast', 'Scene_MenuBase_createBackground', 'variableWindowRect', 'STRUCT', 'commandPersonal', 'icon', 'MobileThickness', 'createCommandNameWindow', 'Symbols', 'iconWidth', 'forceEnable', 'makeMainMenuCoreCommandList', 'GaOrp', 'drawText', 'iGDmt', 'actor', 'popScene', 'tigLk', 'isBattleMember', 'Rows', 'SceneManager_push', 'BtVay', 'resetFontSettings', 'playtimeWindowRectTopStyle', 'ListStyles', 'getMenuImageOffsetX', 'isSubcategoryVisible', 'itemLineRect', 'onPersonalCancel', 'commandNameWindowDrawText', 'eEmon', '_commandList', 'initMainMenuCore', 'currentSymbol', 'TextAlign', 'bynyA', '_scrollDuration', 'opacity', 'thicker', 'faceWidth', 'none', 'windowPadding', 'ARRAYSTR', 'maxCols', 'ChangeActorMenuImageJS', 'name', 'commandNameWindowDrawBackground', 'registerCommand', 'drawItemStatusVerticalStyle', 'addSymbolBridge', 'statusWindowRect', 'Eoans', 'default', 'commandCommonEvent', 'updateOpacity', 'pkyPC', 'DefaultStyle', 'battlerName', 'commandNameWindowCenter', 'bottom', '6oWXBqB', 'Style', 'commandWindowRectBottomStyle', '1075090cjZDWV', 'formation', 'Window_MenuStatus_drawItemImage', 'ChangeActorMenuImageGroup', '_targetX', 'Scene_Menu_commandPersonal', 'Step2', '_list', 'thinTop', 'adjustStatusWindowMobile', 'zaPPc', 'Untitled', 'createActorMenuBackgroundImageSprite', 'VerticalStyle', 'drawIcon', 'cancel', 'maySr', 'eGHsz', 'Enable', 'findExt', 'save', 'ShowJS', 'MenuCommandForceShow', 'graphicType', 'AdjustCommandHeight', 'BgType', 'options', 'index', 'lhNhs', 'drawItemActorSvBattler', 'listStyle', 'text', 'createPlaytimeWindow', 'currentExt', 'setBackgroundType', 'gVfEV', 'adjustCommandHeightByVariable', 'activate', 'qlWya', 'SoloQuick', 'center', 'Window_MenuStatus_itemHeight', 'getMainMenuSymbolState', 'svbattler', 'subcategory', 'commandStyle', 'addWindow', 'Subcategory', 'mTQpT', 'loadBitmap', 'Playtime', 'adjustCommandHeightByPlaytime', 'YgWFp', 'mainAreaBottom', 'Game_System_initialize', 'HbjcP', 'commandFormation', 'changePaintOpacity', 'drawItemActorFace', 'ARRAYSTRUCT', 'QLCEF', 'commandLoad', 'clear', 'drawItemStyleIconText', 'refresh', 'fontSize', 'General', 'openness', 'onFormationCancel', 'PersonalHandlerJS', 'Scene_Menu_onPersonalCancel', 'selectLast', 'KnIie', 'Scene_Menu_commandFormation', 'Step1', '_goldWindow', 'MainMenuCore', 'loadFaceImages', 'statusWindowRectMobileStyle', 'concat', 'NUM', 'SUBCATEGORY_LIST', 'updateDuration', 'parameters', 'StatusSelectLast', 'ARRAYNUM', 'solo', 'YZtHx', 'itemRect', 'Scene_Menu_onFormationCancel', 'drawItemActorMenuImage', 'forceHideMainMenuCommand', 'round', 'updateActor', 'canCreatePlaytimeWindow', 'isIncludedInSubcategory', 'yAZvE', 'contents', 'smoothSelect', 'commandWindowRectTopStyle', 'addLoadListener', 'format', 'open', '110joMiug', '160GvSHkh', 'commandWindowRectMobileStyle', '_playtimeWindow', 'isBigCharacter', 'VxcJY', 'min', 'shift', 'commandWindowRect', 'drawItemStatusPortraitStyleOnLoad', 'Symbol', 'AutoGoldY', 'statusWindowRectTopStyle', 'ksMLf', 'FibfT', '%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.', 'updateSmoothScroll', 'uRwdZ', 'applyThinnerGoldWindowRect', 'Step1Start', 'iIZmE', 'drawItemStyleIcon', 'note', 'HideMainMenuOnly', 'addChild', '_commandWindow', 'CommandList', 'ARRAYEVAL', 'Scene_Menu_goldWindowRect', 'forceHide', 'Scene_MenuBase_updateActor', 'Variable', '_playtimeText', 'Window_MenuStatus_maxItems', 'ThinGoldWindow', 'oDvHP', '_scene', 'isMainMenuCommandEnabled', 'doesSubcategoryExist', '2ahHIzj', 'LBSrs', 'description', '_menuImage', 'updatePosition', 'changeTextColor', 'constructor', '_commandNameWindow', 'yTJNw', 'addGameEndCommand', 'drawItemStatus', 'drawItemStatusPortraitStyle', 'playtimeText', 'updateTimer', 'call', 'kYuxj', 'ShowReserve', 'drawActorGraphic', '_timer', 'callUpdateHelp', 'playtimeWindowRect', 'textSizeEx', 'commandWindowStyle', 'TextJS', '27hnsAZT', 'KCGby', 'createStatusWindow', 'drawItemStatusSoloStyleOnLoad', 'mainAreaTop', 'forceShowMainMenuCommand', 'auto', 'value', 'drawTimeLabel', 'createVariableWindow', 'width', 'updateCommandNameWindow', 'XeHjX', 'CustomCmdWin', '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.', 'SoloStyle', 'VIVZX', 'variableWindowRectBottomStyle', 'Cols', 'createDummyWindow', 'cxJfA', 'isCommandEnabled', 'tLbPr', '6694560mIEtjI', 'create', 'exit', 'VEQyS', 'thin', 'filter', 'commandStyleCheck', 'VarList', 'commandCancel', '_bitmapReady', 'boxWidth', 'maxVisibleItems', 'CommandWindowStyle', 'fWovg', 'innerHeight', 'Icon', 'RnoDW', 'mainCommandWidth', 'isDisplayActorMenuBackgroundImage', 'setup', 'initMenuImage', 'isExpGaugeDrawn', 'ZupkA', 'Isngg', 'TQjDU', 'ARRAYJSON', '101598XDwbvZ', 'forceEnableMainMenuCommand', 'MenuCommandForceEnable', 'members', '_actorMenuBgSprite', 'commandWindowRectThinTopStyle', 'loadCharacter', 'setMenuImage', 'GUbCB', 'return\x200', 'HHfWT', 'CoreEngine', 'onBitmapLoad', 'sprite', 'ARRAYFUNC', 'MtrkL', 'isSoloQuickMode', 'Scene_Menu_create', '6228166odrynV', 'addFormationCommand', 'FloJz', 'status', 'ztgSW', 'AutoGoldHeight', 'showOnlyBattleMembers', 'select', 'left', 'currentSubcategory', 'loadPicture', 'drawActorFace', 'addOriginalCommands', 'forceShow', 'length', 'ZrkFh', '730248jOOBZg', 'onPersonalOk', 'CallHandlerJS', 'addOptionsCommand', 'drawItemStatusDefaultStyle', 'isArray', 'WindowRect', '\x5cI[%1]%2', 'ChangeActorMenuImageRange', 'push', 'drawItemStatusSoloStyle', 'zpbjO', 'characterIndex', 'lPdgz', 'HsYtY', 'StatusListStyle', 'MenuCommandForceHide', 'thinBottom', 'addCommand', 'playtimeWindowRectBottomStyle', 'Settings', 'goldWindowRect', 'prototype', 'drawItemStatusThickerStyle', 'maxItems', 'Scene_Menu_commandWindowRect', 'QoL', 'jDeKk', 'aBGsZ', 'Step1End', 'drawItemBackground', 'ExtJS', 'yEVqs', 'PortraitStyle', 'setActor', 'statusWindowRectBottomStyle', 'itemTextAlign', 'drawTimeIcon', 'gameEnd', 'goldWindowRectBottomStyle', 'forceDisableMainMenuCommand', 'variableWindowRectTopStyle', 'match', 'OAVIn', 'StatusGraphic', 'replace', 'mDUmk', 'QDNTA', 'setTopRow', 'FigtM', 'needsDummyWindow', 'yQumK', 'Scene_Menu_createStatusWindow', 'getMenuImageOffsetY', 'innerWidth', 'EVAL', 'cBOXe', '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.', 'Window_StatusBase_loadFaceImages', '_dummyWindow', 'SIUvq', 'mobile', 'canCreateVariableWindow', 'version', 'fittingHeight', 'setSubcategory', '_duration', 'drawPendingItemBackground', 'portrait', 'iconHeight', 'VRYKz', 'lJabe', 'close', 'getSubcategoryList', 'trim', 'TextStr', 'colSpacing', 'STR', 'JSON', 'Game_Actor_setup']; _0x25ed = function () { return _0x1d49d2; }; return _0x25ed(); } const _0x364f2c = _0x3219; (function (_0x205683, _0x56495b) { const _0x360296 = _0x3219, _0x219cb3 = _0x205683(); while (!![]) { try { const _0x39e473 = parseInt(_0x360296(0x156)) / 0x1 + parseInt(_0x360296(0x2e3)) / 0x2 * (-parseInt(_0x360296(0x215)) / 0x3) + parseInt(_0x360296(0x2bd)) / 0x4 * (parseInt(_0x360296(0x1e8)) / 0x5) + -parseInt(_0x360296(0x252)) / 0x6 * (parseInt(_0x360296(0x168)) / 0x7) + -parseInt(_0x360296(0x178)) / 0x8 * (parseInt(_0x360296(0x125)) / 0x9) + -parseInt(_0x360296(0x255)) / 0xa * (-parseInt(_0x360296(0x2bc)) / 0xb) + parseInt(_0x360296(0x13c)) / 0xc; if (_0x39e473 === _0x56495b) break; else _0x219cb3['push'](_0x219cb3['shift']()); } catch (_0x148b9a) { _0x219cb3['push'](_0x219cb3['shift']()); } } }(_0x25ed, 0x89be4)); var label = _0x364f2c(0x2a1), tier = tier || 0x0, dependencies = [], pluginData = $plugins[_0x364f2c(0x141)](function (_0x1918a6) { const _0x94a083 = _0x364f2c; return _0x1918a6[_0x94a083(0x16b)] && _0x1918a6[_0x94a083(0x2e5)]['includes']('[' + label + ']'); })[0x0]; VisuMZ[label][_0x364f2c(0x18c)] = VisuMZ[label][_0x364f2c(0x18c)] || {}, VisuMZ[_0x364f2c(0x207)] = function (_0x1394b3, _0x43e81b) { const _0x4988f6 = _0x364f2c; for (const _0x5ed2b3 in _0x43e81b) { if (_0x5ed2b3['match'](/(.*):(.*)/i)) { if (_0x4988f6(0x1a9) !== _0x4988f6(0x1a7)) { const _0x739300 = String(RegExp['$1']), _0x4a414f = String(RegExp['$2'])['toUpperCase']()[_0x4988f6(0x1c2)](); let _0x19906f, _0x863a39, _0x113fc7; switch (_0x4a414f) { case _0x4988f6(0x2a5): _0x19906f = _0x43e81b[_0x5ed2b3] !== '' ? Number(_0x43e81b[_0x5ed2b3]) : 0x0; break; case _0x4988f6(0x2aa): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39[_0x4988f6(0x1ca)](_0x304b0b => Number(_0x304b0b)); break; case _0x4988f6(0x1af): _0x19906f = _0x43e81b[_0x5ed2b3] !== '' ? eval(_0x43e81b[_0x5ed2b3]) : null; break; case _0x4988f6(0x2d7): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39[_0x4988f6(0x1ca)](_0x429ba7 => eval(_0x429ba7)); break; case _0x4988f6(0x1c6): _0x19906f = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : ''; break; case _0x4988f6(0x155): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON['parse'](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39[_0x4988f6(0x1ca)](_0x19eccd => JSON[_0x4988f6(0x1fa)](_0x19eccd)); break; case 'FUNC': _0x19906f = _0x43e81b[_0x5ed2b3] !== '' ? new Function(JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3])) : new Function(_0x4988f6(0x15f)); break; case _0x4988f6(0x164): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39['map'](_0x172bee => new Function(JSON['parse'](_0x172bee))); break; case _0x4988f6(0x1c5): _0x19906f = _0x43e81b[_0x5ed2b3] !== '' ? String(_0x43e81b[_0x5ed2b3]) : ''; break; case _0x4988f6(0x240): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39[_0x4988f6(0x1ca)](_0x55859a => String(_0x55859a)); break; case _0x4988f6(0x219): _0x113fc7 = _0x43e81b[_0x5ed2b3] !== '' ? JSON['parse'](_0x43e81b[_0x5ed2b3]) : {}, _0x1394b3[_0x739300] = {}, VisuMZ['ConvertParams'](_0x1394b3[_0x739300], _0x113fc7); continue; case _0x4988f6(0x290): _0x863a39 = _0x43e81b[_0x5ed2b3] !== '' ? JSON[_0x4988f6(0x1fa)](_0x43e81b[_0x5ed2b3]) : [], _0x19906f = _0x863a39[_0x4988f6(0x1ca)](_0x2e19e5 => VisuMZ['ConvertParams']({}, JSON['parse'](_0x2e19e5))); break; default: continue; }_0x1394b3[_0x739300] = _0x19906f; } else return _0x2de402(_0x39fd24['$1']); } } return _0x1394b3; }, (_0x30f32d => { const _0x392c4d = _0x364f2c, _0x23e5c9 = _0x30f32d[_0x392c4d(0x243)]; for (const _0x3a491c of dependencies) { if (!Imported[_0x3a491c]) { alert(_0x392c4d(0x133)[_0x392c4d(0x2ba)](_0x23e5c9, _0x3a491c)), SceneManager['exit'](); break; } } const _0x58fc46 = _0x30f32d['description']; if (_0x58fc46['match'](/\[Version[ ](.*?)\]/i)) { const _0x45f831 = Number(RegExp['$1']); _0x45f831 !== VisuMZ[label][_0x392c4d(0x1b7)] && (alert(_0x392c4d(0x1b1)['format'](_0x23e5c9, _0x45f831)), SceneManager[_0x392c4d(0x13e)]()); } if (_0x58fc46[_0x392c4d(0x1a2)](/\[Tier[ ](\d+)\]/i)) { if (_0x392c4d(0x291) === _0x392c4d(0x165)) return this[_0x392c4d(0x1cb)](); else { const _0xb3bfc3 = Number(RegExp['$1']); if (_0xb3bfc3 < tier) { if (_0x392c4d(0x1a6) === _0x392c4d(0x1a6)) alert(_0x392c4d(0x2cb)['format'](_0x23e5c9, _0xb3bfc3, tier)), SceneManager[_0x392c4d(0x13e)](); else { const _0x5c846d = _0x2b9fce[_0x392c4d(0x146)], _0x1fabb9 = this[_0x392c4d(0x205)]() - this[_0x392c4d(0x2d5)][_0x392c4d(0x1d9)] - this['_goldWindow'][_0x392c4d(0x1d9)], _0x196b92 = 0x0, _0x46f25f = this[_0x392c4d(0x2a0)]['y'] + this[_0x392c4d(0x2a0)][_0x392c4d(0x1d9)]; return new _0x3bbca8(_0x196b92, _0x46f25f, _0x5c846d, _0x1fabb9); } } else tier = Math[_0x392c4d(0x20e)](_0xb3bfc3, tier); } } VisuMZ['ConvertParams'](VisuMZ[label]['Settings'], _0x30f32d[_0x392c4d(0x2a8)]); })(pluginData), PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)], _0x364f2c(0x258), _0x2cc418 => { const _0x48757d = _0x364f2c; VisuMZ[_0x48757d(0x207)](_0x2cc418, _0x2cc418); const _0x65774 = _0x2cc418['Step1'], _0x33ab86 = _0x2cc418[_0x48757d(0x25b)]; for (let _0x16c8f6 of _0x65774) { if (_0x48757d(0x115) === _0x48757d(0x115)) { _0x16c8f6 = parseInt(_0x16c8f6) || 0x0; if (_0x16c8f6 <= 0x0) continue; const _0x27018c = $gameActors[_0x48757d(0x225)](_0x16c8f6); if (!_0x27018c) continue; _0x27018c[_0x48757d(0x15d)](_0x33ab86); } else this[_0x48757d(0x28e)](_0x2cc910[_0x48757d(0x228)]()); } }), PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)], _0x364f2c(0x180), _0x568285 => { const _0x224acd = _0x364f2c; VisuMZ[_0x224acd(0x207)](_0x568285, _0x568285); const _0x11deb0 = _0x568285[_0x224acd(0x195)] >= _0x568285[_0x224acd(0x2cf)] ? _0x568285[_0x224acd(0x2cf)] : _0x568285['Step1End'], _0x4ff187 = _0x568285[_0x224acd(0x195)] >= _0x568285[_0x224acd(0x2cf)] ? _0x568285['Step1End'] : _0x568285[_0x224acd(0x2cf)], _0x4adc98 = Array(_0x4ff187 - _0x11deb0 + 0x1)['fill']()[_0x224acd(0x1ca)]((_0x2119f0, _0x323922) => _0x11deb0 + _0x323922), _0x4ec79e = _0x568285[_0x224acd(0x25b)]; for (let _0x3e8011 of _0x4adc98) { _0x3e8011 = parseInt(_0x3e8011) || 0x0; if (_0x3e8011 <= 0x0) continue; const _0x356462 = $gameActors[_0x224acd(0x225)](_0x3e8011); if (!_0x356462) continue; _0x356462[_0x224acd(0x15d)](_0x4ec79e); } }), PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)], _0x364f2c(0x242), _0x35c112 => { const _0x1df640 = _0x364f2c; VisuMZ[_0x1df640(0x207)](_0x35c112, _0x35c112); const _0x416c4c = _0x35c112[_0x1df640(0x29f)]; let _0x12e97d = []; while (_0x416c4c[_0x1df640(0x176)] > 0x0) { const _0xac12ca = _0x416c4c[_0x1df640(0x2c3)](); if (Array[_0x1df640(0x17d)](_0xac12ca)) _0x12e97d = _0x12e97d[_0x1df640(0x2a4)](_0xac12ca); else { if (_0x1df640(0x1e5) !== _0x1df640(0x131)) _0x12e97d[_0x1df640(0x181)](_0xac12ca); else return !![]; } } const _0x47c50e = _0x35c112[_0x1df640(0x25b)]; for (let _0x4dfd50 of _0x12e97d) { if (_0x1df640(0x265) === _0x1df640(0x27b)) _0x277a6f = _0x43eb87(_0x55e57e['$1']), _0x485d1a = _0x514fab[_0x1df640(0x1a5)](/\\I\[(\d+)\]/i, '')[_0x1df640(0x1c2)](); else { _0x4dfd50 = parseInt(_0x4dfd50) || 0x0; if (_0x4dfd50 <= 0x0) continue; const _0x51618f = $gameActors[_0x1df640(0x225)](_0x4dfd50); if (!_0x51618f) continue; _0x51618f['setMenuImage'](_0x47c50e); } } }), PluginManager['registerCommand'](pluginData['name'], 'MenuCommandClear', _0x4f3804 => { const _0x9aa619 = _0x364f2c; VisuMZ[_0x9aa619(0x207)](_0x4f3804, _0x4f3804); const _0x182c72 = _0x4f3804[_0x9aa619(0x21e)] || []; for (const _0x49c933 of _0x182c72) { if ('mTQpT' !== _0x9aa619(0x285)) { const _0x152dec = _0x3effd4[_0x9aa619(0x284)] || ''; if (!this[_0x9aa619(0x2e2)](_0x152dec) && this[_0x9aa619(0x171)]() === '') return !![]; return _0x152dec === this[_0x9aa619(0x171)](); } else $gameSystem['clearShowMainMenuCommand'](_0x49c933); } }), PluginManager[_0x364f2c(0x245)](pluginData[_0x364f2c(0x243)], _0x364f2c(0x158), _0x1a7b45 => { const _0x50794a = _0x364f2c; VisuMZ['ConvertParams'](_0x1a7b45, _0x1a7b45); const _0x2b9cd8 = _0x1a7b45[_0x50794a(0x21e)] || []; for (const _0x432985 of _0x2b9cd8) { if (_0x50794a(0x194) === _0x50794a(0x194)) $gameSystem['forceEnableMainMenuCommand'](_0x432985); else return this[_0x50794a(0x254)](); } }), PluginManager['registerCommand'](pluginData['name'], _0x364f2c(0x1ea), _0xa66458 => { const _0x43bbd4 = _0x364f2c; VisuMZ[_0x43bbd4(0x207)](_0xa66458, _0xa66458); const _0x2f8086 = _0xa66458[_0x43bbd4(0x21e)] || []; for (const _0x1a5cdf of _0x2f8086) { if (_0x43bbd4(0x193) !== 'jDeKk') { let _0x2d3411 = _0x35864f['Symbol']; if (this[_0x43bbd4(0x1e9)](_0x2d3411, _0x3d94d4)) { let _0x1ed29d = _0x3d707d['TextStr']; if (['', _0x43bbd4(0x260)][_0x43bbd4(0x202)](_0x1ed29d)) _0x1ed29d = _0x4b18f8[_0x43bbd4(0x124)]['call'](this); const _0x201665 = _0x1cee39[_0x43bbd4(0x14b)]; _0x201665 > 0x0 && this[_0x43bbd4(0x282)]() !== _0x43bbd4(0x274) && (_0x1ed29d = '\x5cI[%1]%2'[_0x43bbd4(0x2ba)](_0x201665, _0x1ed29d)); const _0x44c725 = this[_0x43bbd4(0x2e1)](_0x2d3411, _0x58e8f8), _0x48de90 = _0x3ddc68[_0x43bbd4(0x197)]['call'](this); _0x2d3411 === _0x43bbd4(0x281) && (_0x4cbd0f++, _0x2d3411 += _0x6cd85e), this['addCommand'](_0x1ed29d, _0x2d3411, _0x44c725, _0x48de90), this[_0x43bbd4(0x1df)](_0x2d3411, _0x4204aa[_0x43bbd4(0x17a)][_0x43bbd4(0x206)](this, _0x48de90)); } this[_0x43bbd4(0x247)](_0x2d3411); } else $gameSystem[_0x43bbd4(0x1a0)](_0x1a5cdf); } }), PluginManager['registerCommand'](pluginData[_0x364f2c(0x243)], _0x364f2c(0x188), _0x25cdfb => { const _0x4aa71b = _0x364f2c; VisuMZ[_0x4aa71b(0x207)](_0x25cdfb, _0x25cdfb); const _0x236299 = _0x25cdfb[_0x4aa71b(0x21e)] || []; for (const _0x565cb2 of _0x236299) { if (_0x4aa71b(0x227) !== _0x4aa71b(0x227)) { _0x434fa3['ConvertParams'](_0x4af4cd, _0x3f65b9); const _0x47e697 = _0x2a1d72[_0x4aa71b(0x21e)] || []; for (const _0x2b7ea5 of _0x47e697) { _0x18047b[_0x4aa71b(0x2b0)](_0x2b7ea5); } } else $gameSystem['forceHideMainMenuCommand'](_0x565cb2); } }), PluginManager[_0x364f2c(0x245)](pluginData['name'], _0x364f2c(0x26b), _0x31b535 => { const _0x2e067f = _0x364f2c; VisuMZ[_0x2e067f(0x207)](_0x31b535, _0x31b535); const _0x3ea974 = _0x31b535[_0x2e067f(0x21e)] || []; for (const _0x57e0c6 of _0x3ea974) { $gameSystem['forceShowMainMenuCommand'](_0x57e0c6); } }), VisuMZ['MainMenuCore'][_0x364f2c(0x22a)] = SceneManager[_0x364f2c(0x181)], SceneManager['push'] = function (_0x4f9772) { const _0x3d4a9c = _0x364f2c; _0x4f9772 === Scene_Menu && ($gameTemp[_0x3d4a9c(0x1d3)] = undefined), VisuMZ['MainMenuCore']['SceneManager_push'][_0x3d4a9c(0x11b)](this, _0x4f9772); }, VisuMZ['MainMenuCore']['Game_System_initialize'] = Game_System[_0x364f2c(0x18e)][_0x364f2c(0x20a)], Game_System['prototype'][_0x364f2c(0x20a)] = function () { const _0x5e5dcb = _0x364f2c; VisuMZ['MainMenuCore'][_0x5e5dcb(0x28b)][_0x5e5dcb(0x11b)](this), this['initMainMenuCore'](); }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x236)] = function () { const _0x55c1d3 = _0x364f2c; this[_0x55c1d3(0x1ec)] = this[_0x55c1d3(0x1ec)] || { 'forceShow': [], 'forceHide': [], 'forceEnable': [], 'forceDisable': [] }; }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x1fd)] = function () { const _0x18bf54 = _0x364f2c; if (this[_0x18bf54(0x1ec)] === undefined) this[_0x18bf54(0x236)](); const _0x495e33 = ['forceShow', _0x18bf54(0x2d9), _0x18bf54(0x220), 'forceDisable']; for (const _0x5d508e of _0x495e33) { _0x18bf54(0x154) !== _0x18bf54(0x154) ? (this['adjustCommandHeightByPlaytime']() && (_0x1d80d0[_0x18bf54(0x1d9)] -= this['playtimeWindowRect']()['height']), this[_0x18bf54(0x279)]() && (_0x27c1a1[_0x18bf54(0x1d9)] -= this['variableWindowRect']()[_0x18bf54(0x1d9)])) : this[_0x18bf54(0x1ec)][_0x5d508e] = this[_0x18bf54(0x1ec)][_0x5d508e] || []; } return this['_mainMenuCore']; }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x27f)] = function (_0x31335e, _0x1d0b25) { const _0x2a97c4 = _0x364f2c, _0x419789 = this[_0x2a97c4(0x1fd)](); if (!_0x419789[_0x1d0b25]) return ![]; return _0x419789[_0x1d0b25]['includes'](_0x31335e); }, Game_System[_0x364f2c(0x18e)]['clearShowMainMenuCommand'] = function (_0x382340) { const _0x4cbedc = _0x364f2c, _0x222fa1 = this[_0x4cbedc(0x1fd)](), _0x75e505 = [_0x4cbedc(0x175), _0x4cbedc(0x2d9), _0x4cbedc(0x220), _0x4cbedc(0x1c9)]; for (const _0x370c8c of _0x75e505) { if (_0x4cbedc(0x22b) === _0x4cbedc(0x22b)) _0x222fa1[_0x370c8c][_0x4cbedc(0x1fb)](_0x382340); else { const _0x231dca = this['currentSubcategory'](); this[_0x4cbedc(0x1eb)] = '', _0x213c07[_0x4cbedc(0x1d3)] = _0x10cead, this[_0x4cbedc(0x295)](), this[_0x4cbedc(0x1a8)](0x0); this['_scrollDuration'] > 0x1 && (this[_0x4cbedc(0x23a)] = 0x1, this['updateSmoothScroll']()); const _0x75299b = _0x58297a[_0x4cbedc(0x20e)](this['findExt'](_0x231dca), 0x0); this[_0x4cbedc(0x2b7)](_0x75299b), this[_0x4cbedc(0x27a)](); } } }, Game_System[_0x364f2c(0x18e)]['forceShowMainMenuCommand'] = function (_0xec14f8) { const _0x26b8f0 = _0x364f2c, _0x374763 = this[_0x26b8f0(0x1fd)](); if (!_0x374763[_0x26b8f0(0x175)][_0x26b8f0(0x202)](_0xec14f8)) { if (_0x26b8f0(0x222) !== _0x26b8f0(0x222)) { this[_0x26b8f0(0x22c)](), this['changeTextColor'](_0x2b1f09[_0x26b8f0(0x1d0)]()); const _0x1ce22b = _0x15f171[_0x26b8f0(0x2a1)][_0x26b8f0(0x18c)]['Playtime']['Time']; this[_0x26b8f0(0x223)](_0x1ce22b, _0x5a926e['x'], _0x59f8b8['y'], _0x284cfe[_0x26b8f0(0x12f)], 'left'), this[_0x26b8f0(0x1cd)](); } else _0x374763[_0x26b8f0(0x175)][_0x26b8f0(0x181)](_0xec14f8); } _0x374763[_0x26b8f0(0x2d9)]['remove'](_0xec14f8); }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x2b0)] = function (_0x485679) { const _0x39b56d = _0x364f2c, _0x18df78 = this['mainMenuCoreSettings'](); !_0x18df78[_0x39b56d(0x2d9)][_0x39b56d(0x202)](_0x485679) && _0x18df78[_0x39b56d(0x2d9)][_0x39b56d(0x181)](_0x485679), _0x18df78['forceShow'][_0x39b56d(0x1fb)](_0x485679); }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x157)] = function (_0x20fa3d) { const _0x236565 = _0x364f2c, _0x33aec0 = this[_0x236565(0x1fd)](); !_0x33aec0[_0x236565(0x220)][_0x236565(0x202)](_0x20fa3d) && ('cBOXe' === _0x236565(0x1b0) ? _0x33aec0[_0x236565(0x220)][_0x236565(0x181)](_0x20fa3d) : _0xabf0ac[_0x236565(0x15c)](_0xcdd8d3['characterName']())), _0x33aec0['forceDisable']['remove'](_0x20fa3d); }, Game_System[_0x364f2c(0x18e)][_0x364f2c(0x1a0)] = function (_0x19fb3e) { const _0x1b1cb4 = _0x364f2c, _0x5324bb = this[_0x1b1cb4(0x1fd)](); !_0x5324bb[_0x1b1cb4(0x1c9)]['includes'](_0x19fb3e) && _0x5324bb[_0x1b1cb4(0x1c9)][_0x1b1cb4(0x181)](_0x19fb3e), _0x5324bb[_0x1b1cb4(0x220)][_0x1b1cb4(0x1fb)](_0x19fb3e); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1c7)] = Game_Actor['prototype'][_0x364f2c(0x14f)], Game_Actor[_0x364f2c(0x18e)]['setup'] = function (_0x4d49bd) { const _0xdfadc0 = _0x364f2c; VisuMZ[_0xdfadc0(0x2a1)][_0xdfadc0(0x1c7)][_0xdfadc0(0x11b)](this, _0x4d49bd), this['initMenuImage'](); }, Game_Actor['prototype'][_0x364f2c(0x150)] = function () { const _0x39c2d4 = _0x364f2c; this[_0x39c2d4(0x2e6)] = ''; if (this[_0x39c2d4(0x225)]() && this[_0x39c2d4(0x225)]()[_0x39c2d4(0x2d2)]['match'](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)) { if (_0x39c2d4(0x160) === _0x39c2d4(0x160)) this[_0x39c2d4(0x2e6)] = String(RegExp['$1']); else { _0x1d6eb8 = _0x55aa8e || _0x50ffe4[_0x39c2d4(0x23d)], _0x3c3559 = _0xb5df0a || _0x39176b['faceHeight']; const _0x58759a = _0x10a26a['characterName'](), _0x124422 = _0x5acfda[_0x39c2d4(0x184)](), _0x4f0aaa = _0x355d8f[_0x39c2d4(0x15c)](_0x58759a), _0x3dccb9 = _0x9965c8[_0x39c2d4(0x2c0)](_0x58759a), _0x1eb847 = _0x4f0aaa['width'] / (_0x3dccb9 ? 0x3 : 0xc), _0x6a47dd = _0x4f0aaa[_0x39c2d4(0x1d9)] / (_0x3dccb9 ? 0x4 : 0x8), _0x5f38bd = _0x4b8974, _0x1901be = _0x4dc391 - 0x2, _0x2c5dd1 = _0x52cecc + _0x19b71e[_0x39c2d4(0x214)](_0x5f38bd / 0x2), _0x24e482 = _0x5d5171 + _0x56ea6e['ceil']((_0x1c684f + _0x6a47dd) / 0x2); this[_0x39c2d4(0x2e9)] === _0x420109 && this[_0x39c2d4(0x28e)](_0x5d105a[_0x39c2d4(0x228)]()); const _0x5c447a = _0x4563e0[_0x39c2d4(0x2c2)](_0x2f644e, _0x1eb847), _0x144748 = _0x16d5a1[_0x39c2d4(0x2c2)](_0x3f7728, _0x6a47dd), _0xe5e7c4 = _0x423529['floor'](_0x289f2e + _0x465d9b[_0x39c2d4(0x20e)](_0x289c9c - _0x1eb847, 0x0) / 0x2), _0x45aabf = _0x5b307d[_0x39c2d4(0x214)](_0x14d5b2 + _0x19b60b[_0x39c2d4(0x20e)](_0x2bdc65 - _0x6a47dd, 0x0) / 0x2), _0x1a734c = _0x3dccb9 ? 0x0 : _0x124422, _0x12aae9 = (_0x1a734c % 0x4 * 0x3 + 0x1) * _0x1eb847, _0xa00664 = _0x219de0[_0x39c2d4(0x214)](_0x1a734c / 0x4) * 0x4 * _0x6a47dd; this['contents'][_0x39c2d4(0x1ce)](_0x4f0aaa, _0x12aae9, _0xa00664, _0x5c447a, _0x144748, _0xe5e7c4, _0x45aabf), this['changePaintOpacity'](!![]); } } }, Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x203)] = function () { const _0x2eca97 = _0x364f2c; if (this[_0x2eca97(0x2e6)] === undefined) this[_0x2eca97(0x150)](); return this[_0x2eca97(0x2e6)]; }, Game_Actor['prototype'][_0x364f2c(0x15d)] = function (_0x47b0cb) { const _0x3096a0 = _0x364f2c; if (this[_0x3096a0(0x2e6)] === undefined) this['initMenuImage'](); this[_0x3096a0(0x2e6)] = _0x47b0cb; }, Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x22f)] = function () { const _0x193005 = _0x364f2c; if (this['actor']()[_0x193005(0x2d2)][_0x193005(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i)) return Number(RegExp['$1']); else { if (this[_0x193005(0x225)]()[_0x193005(0x2d2)][_0x193005(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)) { if (_0x193005(0x186) !== _0x193005(0x16a)) return Number(RegExp['$1']); else this['drawItemStyleIcon'](_0x140ed6); } } return 0x0; }, Game_Actor[_0x364f2c(0x18e)][_0x364f2c(0x1ad)] = function () { const _0x37dea2 = _0x364f2c; if (this[_0x37dea2(0x225)]()[_0x37dea2(0x2d2)]['match'](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i)) return Number(RegExp['$1']); else { if (this[_0x37dea2(0x225)]()[_0x37dea2(0x2d2)][_0x37dea2(0x1a2)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)) return _0x37dea2(0x289) !== _0x37dea2(0x1bf) ? Number(RegExp['$2']) : this[_0x37dea2(0x20d)](); } return 0x0; }, Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x14e)] = function () { const _0x118b75 = _0x364f2c; return VisuMZ[_0x118b75(0x2a1)][_0x118b75(0x18c)][_0x118b75(0x297)]['ActorBgMenus'][_0x118b75(0x202)](this[_0x118b75(0x2e9)][_0x118b75(0x243)]); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x217)] = Scene_MenuBase[_0x364f2c(0x18e)]['createBackground'], Scene_MenuBase[_0x364f2c(0x18e)]['createBackground'] = function () { const _0x49e5b1 = _0x364f2c; VisuMZ[_0x49e5b1(0x2a1)]['Scene_MenuBase_createBackground'][_0x49e5b1(0x11b)](this), this[_0x49e5b1(0x261)](); }, Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x261)] = function () { const _0x563888 = _0x364f2c; this[_0x563888(0x15a)] = new Sprite_MenuBackgroundActor(), this['addChild'](this['_actorMenuBgSprite']); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2da)] = Scene_MenuBase[_0x364f2c(0x18e)][_0x364f2c(0x2b2)], Scene_MenuBase['prototype'][_0x364f2c(0x2b2)] = function () { const _0x9965e2 = _0x364f2c; VisuMZ[_0x9965e2(0x2a1)][_0x9965e2(0x2da)][_0x9965e2(0x11b)](this), this[_0x9965e2(0x14e)]() && this[_0x9965e2(0x15a)] && ('gCzHx' === _0x9965e2(0x1f6) ? _0x6e5fe2[_0x9965e2(0x2a1)][_0x9965e2(0x18c)]['ListStyles'][_0x9965e2(0x134)][_0x9965e2(0x11b)](this, _0xf1f86a, _0x51cb83) : this[_0x9965e2(0x15a)][_0x9965e2(0x19a)](this[_0x9965e2(0x201)])); }, VisuMZ['MainMenuCore'][_0x364f2c(0x167)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x13d)], Scene_Menu['prototype'][_0x364f2c(0x13d)] = function () { const _0x346733 = _0x364f2c; VisuMZ[_0x346733(0x2a1)]['Scene_Menu_create'][_0x346733(0x11b)](this), this[_0x346733(0x275)](), this[_0x346733(0x12e)](), this['createDummyWindow'](); }, Scene_Menu[_0x364f2c(0x18e)]['createCommandWindow'] = function () { const _0x43cd0a = _0x364f2c, _0x488032 = this[_0x43cd0a(0x2c4)](), _0x36cae9 = new Window_MenuCommand(_0x488032); _0x36cae9[_0x43cd0a(0x1df)](_0x43cd0a(0x264), this[_0x43cd0a(0x144)][_0x43cd0a(0x206)](this)), this[_0x43cd0a(0x283)](_0x36cae9), this['_commandWindow'] = _0x36cae9; }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x191)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2c4)], Scene_Menu[_0x364f2c(0x18e)]['commandWindowRect'] = function () { const _0x15bef4 = _0x364f2c, _0x54c5a2 = this[_0x15bef4(0x123)](); if (_0x54c5a2 === 'top') return this[_0x15bef4(0x2b8)](); else { if (_0x54c5a2 === _0x15bef4(0x25d)) { if (_0x15bef4(0x278) !== _0x15bef4(0x149)) return this[_0x15bef4(0x15b)](); else this[_0x15bef4(0x20c)] = new _0x6b67f1(0x1, 0x1); } else { if (_0x54c5a2 === 'bottom') { if (_0x15bef4(0x266) === _0x15bef4(0x266)) return this[_0x15bef4(0x254)](); else _0x2e7720[_0x15bef4(0x18e)]['drawItem'][_0x15bef4(0x11b)](this, _0x593b30); } else { if (_0x54c5a2 === _0x15bef4(0x189)) return this[_0x15bef4(0x20d)](); else { if (_0x54c5a2 === _0x15bef4(0x1b5)) return this[_0x15bef4(0x2be)](); else { const _0x21c113 = VisuMZ[_0x15bef4(0x2a1)][_0x15bef4(0x191)]['call'](this); return this['adjustDefaultCommandWindowRect'](_0x21c113), _0x21c113; } } } } } }, Scene_Menu['prototype'][_0x364f2c(0x1ee)] = function (_0x27149e) { const _0x46b2bc = _0x364f2c; this[_0x46b2bc(0x288)]() && (_0x27149e[_0x46b2bc(0x1d9)] -= this[_0x46b2bc(0x121)]()[_0x46b2bc(0x1d9)]), this[_0x46b2bc(0x279)]() && (_0x27149e['height'] -= this['variableWindowRect']()[_0x46b2bc(0x1d9)]); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2b8)] = function () { const _0x360577 = _0x364f2c, _0x409a91 = VisuMZ[_0x360577(0x2a1)][_0x360577(0x18c)][_0x360577(0x132)]['Rows'], _0x1ae37e = Graphics[_0x360577(0x146)], _0x433053 = this[_0x360577(0x20b)](_0x409a91, !![]), _0xf8e671 = 0x0, _0x5e0801 = this[_0x360577(0x129)](); return new Rectangle(_0xf8e671, _0x5e0801, _0x1ae37e, _0x433053); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x15b)] = function () { const _0x32778f = _0x364f2c, _0x15412e = VisuMZ[_0x32778f(0x2a1)][_0x32778f(0x18c)][_0x32778f(0x132)][_0x32778f(0x229)], _0x17428e = Graphics[_0x32778f(0x146)], _0x4e7acb = this[_0x32778f(0x20b)](0x1, !![]), _0x5aae20 = 0x0, _0x565f83 = this[_0x32778f(0x129)](); return new Rectangle(_0x5aae20, _0x565f83, _0x17428e, _0x4e7acb); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x254)] = function () { const _0x4a0287 = _0x364f2c, _0x132505 = VisuMZ[_0x4a0287(0x2a1)][_0x4a0287(0x18c)][_0x4a0287(0x132)]['Rows'], _0x1954a0 = Graphics['boxWidth'], _0x355778 = this['calcWindowHeight'](_0x132505, !![]), _0x57a5e5 = 0x0, _0x3b437f = this['mainAreaBottom']() - _0x355778; return new Rectangle(_0x57a5e5, _0x3b437f, _0x1954a0, _0x355778); }, Scene_Menu[_0x364f2c(0x18e)]['commandWindowRectThinBottomStyle'] = function () { const _0x2292aa = _0x364f2c, _0x164a8d = VisuMZ[_0x2292aa(0x2a1)]['Settings'][_0x2292aa(0x132)]['Rows'], _0x23d50e = Graphics[_0x2292aa(0x146)], _0x2c4193 = this[_0x2292aa(0x20b)](0x1, !![]), _0x46600 = 0x0, _0x20588b = this[_0x2292aa(0x28a)]() - _0x2c4193; return new Rectangle(_0x46600, _0x20588b, _0x23d50e, _0x2c4193); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2be)] = function () { const _0x513c50 = _0x364f2c, _0x448585 = VisuMZ[_0x513c50(0x2a1)][_0x513c50(0x18c)][_0x513c50(0x132)][_0x513c50(0x229)], _0x4fe8e2 = Graphics[_0x513c50(0x146)], _0x40cd39 = Window_MenuCommand['prototype'][_0x513c50(0x1b8)](_0x448585), _0x307810 = 0x0, _0x577567 = Math['round']((Graphics['boxHeight'] - _0x40cd39) / 0x2); return new Rectangle(_0x307810, _0x577567, _0x4fe8e2, _0x40cd39); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x123)] = function () { const _0x2b7e91 = _0x364f2c; return VisuMZ[_0x2b7e91(0x2a1)]['Settings'][_0x2b7e91(0x148)]; }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x213)] = function () { const _0x5f4932 = _0x364f2c; if (this[_0x5f4932(0x123)]() !== _0x5f4932(0x24a)) return !![]; return VisuMZ['MainMenuCore'][_0x5f4932(0x18c)]['General'][_0x5f4932(0x2de)]; }, Scene_Menu['prototype']['createGoldWindow'] = function () { const _0x1a3839 = _0x364f2c, _0x11b54f = this[_0x1a3839(0x18d)](); this[_0x1a3839(0x2a0)] = this[_0x1a3839(0x213)]() ? new Window_ThinGold(_0x11b54f) : new Window_Gold(_0x11b54f), this['addWindow'](this['_goldWindow']); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2d8)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18d)], Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18d)] = function () { const _0x4121dd = _0x364f2c, _0x42e340 = this[_0x4121dd(0x123)](); if (['top', _0x4121dd(0x25d), _0x4121dd(0x1b5)][_0x4121dd(0x202)](_0x42e340)) return this[_0x4121dd(0x209)](); else { if ([_0x4121dd(0x251), _0x4121dd(0x189)][_0x4121dd(0x202)](_0x42e340)) return this[_0x4121dd(0x19f)](); else { if (_0x4121dd(0x1cf) === 'TpPhf') _0x590359[_0x4121dd(0x2a1)][_0x4121dd(0x18c)][_0x4121dd(0x297)][_0x4121dd(0x2a9)] ? _0x1eb8b5['MainMenuCore'][_0x4121dd(0x216)]['call'](this) : this[_0x4121dd(0x2b7)](0x0); else { const _0x315ae0 = VisuMZ[_0x4121dd(0x2a1)][_0x4121dd(0x2d8)][_0x4121dd(0x11b)](this); return this[_0x4121dd(0x2ce)](_0x315ae0), _0x315ae0; } } } }, Scene_Menu['prototype'][_0x364f2c(0x2ce)] = function (_0x9a88a5) { const _0x172b5a = _0x364f2c; if (this['thinGoldWindow']()) { if (VisuMZ[_0x172b5a(0x2a1)][_0x172b5a(0x18c)][_0x172b5a(0x297)][_0x172b5a(0x2c7)]) { const _0x2b60f4 = _0x9a88a5[_0x172b5a(0x1d9)] - this['calcWindowHeight'](0x1, ![]); _0x9a88a5['y'] += _0x2b60f4; } if (VisuMZ['MainMenuCore'][_0x172b5a(0x18c)][_0x172b5a(0x297)][_0x172b5a(0x16d)]) { if (_0x172b5a(0x1ab) === _0x172b5a(0x2e4)) { const _0x5e2c64 = this[_0x172b5a(0x1fd)](); !_0x5e2c64['forceHide']['includes'](_0x2911f8) && _0x5e2c64[_0x172b5a(0x2d9)][_0x172b5a(0x181)](_0x41c5b5), _0x5e2c64[_0x172b5a(0x175)][_0x172b5a(0x1fb)](_0x30da00); } else _0x9a88a5[_0x172b5a(0x1d9)] = this[_0x172b5a(0x20b)](0x1, ![]); } } }, Scene_Menu[_0x364f2c(0x18e)]['goldWindowRectTopStyle'] = function () { const _0x455e7e = _0x364f2c, _0x2cd820 = this[_0x455e7e(0x14d)](), _0x3e1ac1 = this['calcWindowHeight'](0x1, ![]), _0x38eb38 = Graphics[_0x455e7e(0x146)] - _0x2cd820, _0x2b0718 = this['mainAreaBottom']() - _0x3e1ac1; return new Rectangle(_0x38eb38, _0x2b0718, _0x2cd820, _0x3e1ac1); }, Scene_Menu['prototype'][_0x364f2c(0x19f)] = function () { const _0x550f44 = _0x364f2c, _0x318131 = this[_0x550f44(0x14d)](), _0x15b2f8 = this[_0x550f44(0x20b)](0x1, ![]), _0x4a184d = Graphics[_0x550f44(0x146)] - _0x318131, _0x50eaed = this['mainAreaTop'](); return new Rectangle(_0x4a184d, _0x50eaed, _0x318131, _0x15b2f8); }, VisuMZ['MainMenuCore'][_0x364f2c(0x1ac)] = Scene_Menu['prototype'][_0x364f2c(0x127)], Scene_Menu[_0x364f2c(0x18e)]['createStatusWindow'] = function () { const _0x35d12b = _0x364f2c; VisuMZ[_0x35d12b(0x2a1)][_0x35d12b(0x1ac)][_0x35d12b(0x11b)](this), this[_0x35d12b(0x25e)](); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x25e)] = function () { const _0x1576cf = _0x364f2c; this['commandWindowStyle']() === _0x1576cf(0x1b5) && (this[_0x1576cf(0x211)][_0x1576cf(0x298)] = 0x0); }, VisuMZ['MainMenuCore']['Scene_Menu_statusWindowRect'] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x248)], Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x248)] = function () { const _0x45bb1e = _0x364f2c, _0x4df499 = this[_0x45bb1e(0x123)](); if ([_0x45bb1e(0x1ed), 'thinTop'][_0x45bb1e(0x202)](_0x4df499)) { if (_0x45bb1e(0x1f4) === 'ZxCgd') this[_0x45bb1e(0x201)] = _0x4dc607, this[_0x45bb1e(0x286)](); else return this[_0x45bb1e(0x2c8)](); } else { if ([_0x45bb1e(0x251), _0x45bb1e(0x189)][_0x45bb1e(0x202)](_0x4df499)) { if (_0x45bb1e(0x13f) !== _0x45bb1e(0x29d)) return this[_0x45bb1e(0x19b)](); else { const _0x538c30 = this[_0x45bb1e(0x2ea)]; _0x538c30[_0x45bb1e(0x223)](_0x2e1e3f, 0x0, _0x55dc1e['y'], _0x538c30[_0x45bb1e(0x1ae)], _0x45bb1e(0x27d)); } } else return _0x4df499 === _0x45bb1e(0x1b5) ? this[_0x45bb1e(0x2a3)]() : VisuMZ[_0x45bb1e(0x2a1)][_0x45bb1e(0x1f2)][_0x45bb1e(0x11b)](this); } }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2c8)] = function () { const _0x4eb9b7 = _0x364f2c, _0x55d4b0 = Graphics[_0x4eb9b7(0x146)], _0xbb4cc6 = this[_0x4eb9b7(0x205)]() - this[_0x4eb9b7(0x2d5)]['height'] - this[_0x4eb9b7(0x2a0)][_0x4eb9b7(0x1d9)], _0xb4a32b = 0x0, _0x289630 = this[_0x4eb9b7(0x2d5)]['y'] + this[_0x4eb9b7(0x2d5)][_0x4eb9b7(0x1d9)]; return new Rectangle(_0xb4a32b, _0x289630, _0x55d4b0, _0xbb4cc6); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x19b)] = function () { const _0x20f99f = _0x364f2c, _0x539dbe = Graphics[_0x20f99f(0x146)], _0x3b8f6b = this['mainAreaHeight']() - this['_commandWindow'][_0x20f99f(0x1d9)] - this[_0x20f99f(0x2a0)][_0x20f99f(0x1d9)], _0x427b12 = 0x0, _0x31b3d8 = this[_0x20f99f(0x2a0)]['y'] + this[_0x20f99f(0x2a0)][_0x20f99f(0x1d9)]; return new Rectangle(_0x427b12, _0x31b3d8, _0x539dbe, _0x3b8f6b); }, Scene_Menu['prototype'][_0x364f2c(0x2a3)] = function () { const _0xd87ac9 = _0x364f2c, _0x17ee04 = Graphics['boxWidth'], _0x24fee8 = this['mainAreaHeight']() - this[_0xd87ac9(0x2a0)][_0xd87ac9(0x1d9)], _0x4cb90c = 0x0, _0x41a332 = this[_0xd87ac9(0x28a)]() - this[_0xd87ac9(0x2a0)][_0xd87ac9(0x1d9)] - _0x24fee8; return new Rectangle(_0x4cb90c, _0x41a332, _0x17ee04, _0x24fee8); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x275)] = function () { const _0x1e7588 = _0x364f2c; if (!this[_0x1e7588(0x2b3)]()) return new Rectangle(0x0, 0x0, 0x0, 0x0); const _0x561720 = this['playtimeWindowRect'](); this[_0x1e7588(0x2bf)] = new Window_Playtime(_0x561720), this[_0x1e7588(0x2bf)]['setBackgroundType'](VisuMZ[_0x1e7588(0x2a1)][_0x1e7588(0x18c)]['Playtime'][_0x1e7588(0x26e)]), this[_0x1e7588(0x283)](this[_0x1e7588(0x2bf)]); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x2b3)] = function () { const _0x385653 = _0x364f2c; return VisuMZ[_0x385653(0x2a1)][_0x385653(0x18c)][_0x385653(0x287)][_0x385653(0x267)]; }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x288)] = function () { const _0x6a69d1 = _0x364f2c; return this[_0x6a69d1(0x2b3)]() && (VisuMZ[_0x6a69d1(0x2a1)]['Settings'][_0x6a69d1(0x287)][_0x6a69d1(0x26d)] ?? !![]); }, Scene_Menu['prototype']['playtimeWindowRect'] = function () { const _0x382056 = _0x364f2c, _0x47f6d4 = this[_0x382056(0x123)](); if ([_0x382056(0x1ed), _0x382056(0x25d), _0x382056(0x1b5)]['includes'](_0x47f6d4)) { if (_0x382056(0x183) !== _0x382056(0x183)) { if (this['_mainMenuCore'] === _0x1f82ce) this[_0x382056(0x236)](); const _0x43a335 = [_0x382056(0x175), 'forceHide', _0x382056(0x220), _0x382056(0x1c9)]; for (const _0x292577 of _0x43a335) { this[_0x382056(0x1ec)][_0x292577] = this[_0x382056(0x1ec)][_0x292577] || []; } return this[_0x382056(0x1ec)]; } else return this[_0x382056(0x22d)](); } else { if (['bottom', _0x382056(0x189)]['includes'](_0x47f6d4)) { if (_0x382056(0x1a3) !== _0x382056(0x224)) return this[_0x382056(0x18b)](); else { const _0xadf149 = new _0x2c571b(0x0, 0x0, _0x53e258[_0x382056(0x12f)], _0x4868d5[_0x382056(0x1d9)]); this['_commandNameWindow'] = new _0x2439c2(_0xadf149), this[_0x382056(0x2ea)]['opacity'] = 0x0, this[_0x382056(0x2d4)](this[_0x382056(0x2ea)]), this[_0x382056(0x130)](); } } else return VisuMZ['MainMenuCore']['Settings'][_0x382056(0x287)][_0x382056(0x17e)][_0x382056(0x11b)](this); } }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x22d)] = function () { const _0x5bd203 = _0x364f2c, _0x3e15bf = this[_0x5bd203(0x14d)](), _0xefa1e = this['calcWindowHeight'](0x1, ![]), _0x8db55d = 0x0, _0x57d0e9 = this[_0x5bd203(0x28a)]() - _0xefa1e; return new Rectangle(_0x8db55d, _0x57d0e9, _0x3e15bf, _0xefa1e); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x18b)] = function () { const _0x5e5b6c = _0x364f2c, _0x24f00f = this[_0x5e5b6c(0x14d)](), _0x261963 = this['calcWindowHeight'](0x1, ![]), _0x4a56d5 = 0x0, _0x509a8c = this[_0x5e5b6c(0x129)](); return new Rectangle(_0x4a56d5, _0x509a8c, _0x24f00f, _0x261963); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x12e)] = function () { const _0x3b2a6a = _0x364f2c; if (!this[_0x3b2a6a(0x1b6)]()) return new Rectangle(0x0, 0x0, 0x0, 0x0); const _0x7424d1 = this['variableWindowRect'](); this[_0x3b2a6a(0x1cc)] = new Window_MenuVariables(_0x7424d1), this[_0x3b2a6a(0x1cc)]['setBackgroundType'](VisuMZ[_0x3b2a6a(0x2a1)][_0x3b2a6a(0x18c)][_0x3b2a6a(0x2db)]['BgType']), this[_0x3b2a6a(0x283)](this[_0x3b2a6a(0x1cc)]); }, Scene_Menu['prototype']['canCreateVariableWindow'] = function () { const _0x4fc14f = _0x364f2c; return VisuMZ[_0x4fc14f(0x2a1)][_0x4fc14f(0x18c)][_0x4fc14f(0x2db)][_0x4fc14f(0x267)]; }, Scene_Menu['prototype']['adjustCommandHeightByVariable'] = function () { const _0x47c38d = _0x364f2c; return this[_0x47c38d(0x1b6)]() && (VisuMZ[_0x47c38d(0x2a1)]['Settings'][_0x47c38d(0x2db)][_0x47c38d(0x26d)] ?? !![]); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x218)] = function () { const _0x33fbaa = _0x364f2c, _0x28c7f2 = this[_0x33fbaa(0x123)](); if ([_0x33fbaa(0x1ed), _0x33fbaa(0x25d), _0x33fbaa(0x1b5)][_0x33fbaa(0x202)](_0x28c7f2)) return this[_0x33fbaa(0x1a1)](); else return [_0x33fbaa(0x251), _0x33fbaa(0x189)][_0x33fbaa(0x202)](_0x28c7f2) ? this[_0x33fbaa(0x136)]() : VisuMZ['MainMenuCore'][_0x33fbaa(0x18c)]['Variable']['WindowRect'][_0x33fbaa(0x11b)](this); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x1a1)] = function () { const _0xed419f = _0x364f2c, _0x13685d = Graphics['boxWidth'] - this[_0xed419f(0x2a0)][_0xed419f(0x12f)] - (this['_playtimeWindow'] ? this[_0xed419f(0x2bf)][_0xed419f(0x12f)] : 0x0), _0x2340af = this[_0xed419f(0x20b)](0x1, ![]), _0x43550a = this[_0xed419f(0x2a0)]['x'] - _0x13685d, _0x1386b7 = this[_0xed419f(0x28a)]() - _0x2340af; return new Rectangle(_0x43550a, _0x1386b7, _0x13685d, _0x2340af); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x136)] = function () { const _0x33497b = _0x364f2c, _0x5b9930 = Graphics[_0x33497b(0x146)] - this[_0x33497b(0x2a0)][_0x33497b(0x12f)] - (this['_playtimeWindow'] ? this[_0x33497b(0x2bf)][_0x33497b(0x12f)] : 0x0), _0x17a90c = this[_0x33497b(0x20b)](0x1, ![]), _0x5e60df = this[_0x33497b(0x2a0)]['x'] - _0x5b9930, _0x2f9e57 = this[_0x33497b(0x129)](); return new Rectangle(_0x5e60df, _0x2f9e57, _0x5b9930, _0x17a90c); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x138)] = function () { const _0x5d1394 = _0x364f2c; if (!this[_0x5d1394(0x1aa)]()) return; const _0x435dd7 = this[_0x5d1394(0x218)](); this[_0x5d1394(0x1b3)] = new Window_Base(_0x435dd7), this[_0x5d1394(0x1b3)][_0x5d1394(0x277)](VisuMZ[_0x5d1394(0x2a1)]['Settings'][_0x5d1394(0x2db)][_0x5d1394(0x26e)]), this['addWindow'](this[_0x5d1394(0x1b3)]); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x1aa)] = function () { const _0x1d9a86 = _0x364f2c; if ([_0x1d9a86(0x24a), _0x1d9a86(0x1b5)][_0x1d9a86(0x202)](this[_0x1d9a86(0x123)]())) return ![]; if (this[_0x1d9a86(0x1cc)]) return ![]; return !![]; }, VisuMZ['MainMenuCore'][_0x364f2c(0x25a)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x21a)], Scene_Menu[_0x364f2c(0x18e)]['commandPersonal'] = function () { const _0x4f5478 = _0x364f2c; if (this[_0x4f5478(0x166)]() && this[_0x4f5478(0x211)]) $gameParty['setTargetActor']($gameParty['members']()[0x0]), this[_0x4f5478(0x179)](); else { if (this['commandWindowStyle']() === _0x4f5478(0x1b5)) this[_0x4f5478(0x211)]['open'](); VisuMZ[_0x4f5478(0x2a1)][_0x4f5478(0x25a)]['call'](this); } }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x166)] = function () { const _0x2155b7 = _0x364f2c; return VisuMZ[_0x2155b7(0x2a1)][_0x2155b7(0x18c)]['General'][_0x2155b7(0x27c)] && $gameParty['members']()[_0x2155b7(0x176)] <= 0x1; }, Scene_Menu['prototype'][_0x364f2c(0x179)] = function () { const _0x2852a9 = _0x364f2c, _0x312cfb = this[_0x2852a9(0x2d5)][_0x2852a9(0x237)](), _0x1dce71 = this[_0x2852a9(0x2d5)]['currentExt'](); for (const _0x55e6db of Window_MenuCommand[_0x2852a9(0x235)]) { if (_0x2852a9(0x2c1) === _0x2852a9(0x2c1)) { if (_0x55e6db[_0x2852a9(0x2c6)] === _0x312cfb) { if (_0x2852a9(0x25f) !== _0x2852a9(0x25f)) _0x5914cd[_0x2852a9(0x1d3)] = _0x152596; else { _0x55e6db[_0x2852a9(0x29a)][_0x2852a9(0x11b)](this, _0x1dce71); return; } } } else return _0x2852a9(0x274); } }, VisuMZ['MainMenuCore'][_0x364f2c(0x29b)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x232)], Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x232)] = function () { const _0x532e52 = _0x364f2c; VisuMZ[_0x532e52(0x2a1)][_0x532e52(0x29b)][_0x532e52(0x11b)](this); if (this[_0x532e52(0x123)]() === _0x532e52(0x1b5)) this[_0x532e52(0x211)][_0x532e52(0x1c0)](); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x24b)] = function () { const _0x512963 = _0x364f2c, _0x3a23b8 = parseInt(this[_0x512963(0x2d5)][_0x512963(0x276)]()); _0x3a23b8 ? ($gameTemp['reserveCommonEvent'](_0x3a23b8), this[_0x512963(0x226)]()) : _0x512963(0x1de) === _0x512963(0x1de) ? this[_0x512963(0x2d5)][_0x512963(0x27a)]() : _0x5de8dc[_0x512963(0x1d9)] -= this[_0x512963(0x218)]()[_0x512963(0x1d9)]; }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x29e)] = Scene_Menu['prototype']['commandFormation'], Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x28d)] = function () { const _0x365dc8 = _0x364f2c; VisuMZ['MainMenuCore'][_0x365dc8(0x29e)][_0x365dc8(0x11b)](this); if (this['commandWindowStyle']() === 'mobile') this[_0x365dc8(0x211)][_0x365dc8(0x2bb)](); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2ae)] = Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x299)], Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x299)] = function () { const _0x586089 = _0x364f2c; VisuMZ[_0x586089(0x2a1)][_0x586089(0x2ae)][_0x586089(0x11b)](this); if (this[_0x586089(0x123)]() === _0x586089(0x1b5)) this[_0x586089(0x211)][_0x586089(0x1c0)](); }, Scene_Menu[_0x364f2c(0x18e)][_0x364f2c(0x292)] = function () { const _0x5cf68e = _0x364f2c; SceneManager[_0x5cf68e(0x181)](Scene_Load); }, Scene_Menu[_0x364f2c(0x18e)]['commandCancel'] = function () { const _0x2c3432 = _0x364f2c; if (this[_0x2c3432(0x2d5)][_0x2c3432(0x171)]() !== '') { if (_0x2c3432(0x152) !== _0x2c3432(0x271)) this['_commandWindow'][_0x2c3432(0x208)](); else return this['goldWindowRectTopStyle'](); } else this['popScene'](); }; function Sprite_MenuBackgroundActor() { const _0x36834e = _0x364f2c; this[_0x36834e(0x20a)](...arguments); } function _0x3219(_0x1334e9, _0x19b6c0) { const _0x25ede5 = _0x25ed(); return _0x3219 = function (_0x3219a1, _0x3bbaa3) { _0x3219a1 = _0x3219a1 - 0x115; let _0x370ef6 = _0x25ede5[_0x3219a1]; return _0x370ef6; }, _0x3219(_0x1334e9, _0x19b6c0); } Sprite_MenuBackgroundActor[_0x364f2c(0x18e)] = Object['create'](Sprite['prototype']), Sprite_MenuBackgroundActor[_0x364f2c(0x18e)]['constructor'] = Sprite_MenuBackgroundActor, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x20a)] = function () { const _0x7fc770 = _0x364f2c; this[_0x7fc770(0x201)] = null, this['_bitmapReady'] = ![], Sprite['prototype']['initialize'][_0x7fc770(0x11b)](this), this['x'] = Graphics[_0x7fc770(0x12f)]; }, Sprite_MenuBackgroundActor['prototype']['setActor'] = function (_0x15015f) { const _0x4b58a8 = _0x364f2c; if (this[_0x4b58a8(0x201)] !== _0x15015f) { if (_0x4b58a8(0x13b) !== _0x4b58a8(0x13b)) return _0x5661c8['MainMenuCore'][_0x4b58a8(0x18c)][_0x4b58a8(0x2db)][_0x4b58a8(0x143)]['length']; else this[_0x4b58a8(0x201)] = _0x15015f, this[_0x4b58a8(0x286)](); } }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x286)] = function () { const _0x397b39 = _0x364f2c; this[_0x397b39(0x145)] = ![], this[_0x397b39(0x201)] ? (this[_0x397b39(0x20c)] = ImageManager[_0x397b39(0x172)](this[_0x397b39(0x201)][_0x397b39(0x203)]()), this[_0x397b39(0x20c)][_0x397b39(0x2b9)](this[_0x397b39(0x162)][_0x397b39(0x206)](this))) : this[_0x397b39(0x20c)] = new Bitmap(0x1, 0x1); }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x162)] = function () { const _0x4aec93 = _0x364f2c; this[_0x4aec93(0x145)] = !![], VisuMZ[_0x4aec93(0x2a1)][_0x4aec93(0x18c)][_0x4aec93(0x297)]['ActorBgMenuJS'][_0x4aec93(0x11b)](this); }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x1d2)] = function () { const _0x45ddaf = _0x364f2c; Sprite[_0x45ddaf(0x18e)]['update'][_0x45ddaf(0x11b)](this); if (this[_0x45ddaf(0x145)]) { if (_0x45ddaf(0x2ac) !== _0x45ddaf(0x2ac)) { _0x8eb7fc = _0x108ff6 || _0x5df1f9[_0x45ddaf(0x23d)], _0x3f1893 = _0x26bf45 || _0x14594a[_0x45ddaf(0x204)]; const _0xd29350 = _0x4a443e['faceWidth'], _0x3f51c4 = _0x27c7c6 - 0x2, _0x4e4118 = _0x574804 + _0x20fbad[_0x45ddaf(0x214)]((_0x1ef0ad - _0xd29350) / 0x2); this[_0x45ddaf(0x2e9)] === _0x43096f && this['changePaintOpacity'](_0x331492['isBattleMember']()), this[_0x45ddaf(0x173)](_0x56b781, _0x4e4118, _0x30b8f7, _0xd29350, _0x3f51c4), this[_0x45ddaf(0x28e)](!![]); } else this[_0x45ddaf(0x24c)](), this[_0x45ddaf(0x2e7)](), this[_0x45ddaf(0x2a7)](); } }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x24c)] = function () { const _0x4a7094 = _0x364f2c; if (this[_0x4a7094(0x1ba)] > 0x0) { if (_0x4a7094(0x24d) !== _0x4a7094(0x24d)) _0x4bd3ba++, _0x17f03f += _0x4879ab; else { const _0x751b82 = this['_duration']; this[_0x4a7094(0x23b)] = (this[_0x4a7094(0x23b)] * (_0x751b82 - 0x1) + 0xff) / _0x751b82; } } }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)][_0x364f2c(0x2e7)] = function () { const _0x4ad995 = _0x364f2c; if (this['_duration'] > 0x0) { const _0x4c298e = this[_0x4ad995(0x1ba)]; this['x'] = (this['x'] * (_0x4c298e - 0x1) + this[_0x4ad995(0x259)]) / _0x4c298e, this['y'] = (this['y'] * (_0x4c298e - 0x1) + this['_targetY']) / _0x4c298e; } }, Sprite_MenuBackgroundActor[_0x364f2c(0x18e)]['updateDuration'] = function () { if (this['_duration'] > 0x0) this['_duration']--; }, ImageManager[_0x364f2c(0x1dc)] = ImageManager['svActorHorzCells'] || 0x9, ImageManager['svActorVertCells'] = ImageManager[_0x364f2c(0x1d7)] || 0x6, Window_Base[_0x364f2c(0x18e)]['drawSvActor'] = function (_0x6f030a, _0x232bb5, _0x1dcc03) { const _0x5bafbf = _0x364f2c, _0x35c8f1 = _0x6f030a['match'](/\$/i), _0x378b26 = ImageManager['loadSvActor'](_0x6f030a), _0x467227 = _0x378b26[_0x5bafbf(0x12f)] / (_0x35c8f1 ? 0x1 : ImageManager[_0x5bafbf(0x1dc)]), _0x5bc74c = _0x378b26[_0x5bafbf(0x1d9)] / (_0x35c8f1 ? 0x1 : ImageManager[_0x5bafbf(0x1d7)]), _0x20482f = 0x0, _0x24a16a = 0x0; this[_0x5bafbf(0x2b6)][_0x5bafbf(0x1ce)](_0x378b26, _0x20482f, _0x24a16a, _0x467227, _0x5bc74c, _0x232bb5 - _0x467227 / 0x2, _0x1dcc03 - _0x5bc74c); }, Window_MenuCommand['_commandList'] = VisuMZ[_0x364f2c(0x2a1)]['Settings'][_0x364f2c(0x2d6)], Window_MenuCommand[_0x364f2c(0x2a6)] = undefined, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1fc)] = Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x20a)], Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x20a)] = function (_0x2adacc) { const _0x280432 = _0x364f2c; this['_subcategory'] = $gameTemp[_0x280432(0x1d3)] || '', VisuMZ[_0x280432(0x2a1)][_0x280432(0x1fc)][_0x280432(0x11b)](this, _0x2adacc), this[_0x280432(0x21d)](_0x2adacc); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x21d)] = function (_0x136d39) { const _0x4627d7 = _0x364f2c, _0x121b46 = new Rectangle(0x0, 0x0, _0x136d39[_0x4627d7(0x12f)], _0x136d39[_0x4627d7(0x1d9)]); this[_0x4627d7(0x2ea)] = new Window_Base(_0x121b46), this['_commandNameWindow']['opacity'] = 0x0, this['addChild'](this[_0x4627d7(0x2ea)]), this[_0x4627d7(0x130)](); }, Window_MenuCommand['prototype'][_0x364f2c(0x120)] = function () { const _0x2a7b91 = _0x364f2c; Window_HorzCommand['prototype'][_0x2a7b91(0x120)][_0x2a7b91(0x11b)](this); if (this[_0x2a7b91(0x2ea)]) this['updateCommandNameWindow'](); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x130)] = function () { const _0x2bb844 = _0x364f2c, _0x1f492a = this['_commandNameWindow']; _0x1f492a[_0x2bb844(0x2b6)][_0x2bb844(0x293)](); const _0x3ff159 = this[_0x2bb844(0x142)](this['index']()); if (_0x3ff159 === _0x2bb844(0x21b)) { const _0x25b925 = this[_0x2bb844(0x231)](this[_0x2bb844(0x270)]()); let _0x38ac87 = this[_0x2bb844(0x1e3)](this[_0x2bb844(0x270)]()); _0x38ac87 = _0x38ac87[_0x2bb844(0x1a5)](/\\I\[(\d+)\]/gi, ''), _0x1f492a[_0x2bb844(0x22c)](), this[_0x2bb844(0x244)](_0x38ac87, _0x25b925), this[_0x2bb844(0x233)](_0x38ac87, _0x25b925), this[_0x2bb844(0x250)](_0x38ac87, _0x25b925); } }, Window_MenuCommand[_0x364f2c(0x18e)]['commandNameWindowDrawBackground'] = function (_0x14da51, _0x37ef40) { }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x233)] = function (_0x49218b, _0x156dc0) { const _0x2e4555 = _0x364f2c, _0x51b9b1 = this[_0x2e4555(0x2ea)]; _0x51b9b1[_0x2e4555(0x223)](_0x49218b, 0x0, _0x156dc0['y'], _0x51b9b1[_0x2e4555(0x1ae)], 'center'); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x250)] = function (_0x6719e3, _0x58fa4c) { const _0x26d48c = _0x364f2c, _0x561c6d = this[_0x26d48c(0x2ea)], _0x3c36f4 = $gameSystem[_0x26d48c(0x23f)](), _0x58f8cd = _0x58fa4c['x'] + Math['floor'](_0x58fa4c[_0x26d48c(0x12f)] / 0x2) + _0x3c36f4; _0x561c6d['x'] = _0x561c6d[_0x26d48c(0x12f)] / -0x2 + _0x58f8cd, _0x561c6d['y'] = Math[_0x26d48c(0x214)](_0x58fa4c['height'] / 0x4); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1da)] = function () { const _0x15c8e3 = _0x364f2c, _0x1a03b6 = SceneManager[_0x15c8e3(0x2e0)][_0x15c8e3(0x123)](); if (_0x1a03b6 === _0x15c8e3(0x1b5)) { const _0x5b0fa9 = VisuMZ[_0x15c8e3(0x2a1)][_0x15c8e3(0x18c)][_0x15c8e3(0x132)][_0x15c8e3(0x21c)]; return this[_0x15c8e3(0x1cb)]() * _0x5b0fa9 + 0x8; } else return Window_Command[_0x15c8e3(0x18e)][_0x15c8e3(0x1da)]['call'](this); }, Window_MenuCommand[_0x364f2c(0x18e)]['makeCommandList'] = function () { const _0x505d4e = _0x364f2c; this[_0x505d4e(0x221)](); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x221)] = function () { const _0x23fe1d = _0x364f2c; let _0xcb6c25 = 0x0; for (const _0x4ca09f of Window_MenuCommand['_commandList']) { if ('BpSRA' === _0x23fe1d(0x15e)) return this['statusWindowRectBottomStyle'](); else { let _0x97bc70 = _0x4ca09f[_0x23fe1d(0x2c6)]; if (this[_0x23fe1d(0x1e9)](_0x97bc70, _0x4ca09f)) { let _0x34f0bb = _0x4ca09f[_0x23fe1d(0x1c3)]; if (['', _0x23fe1d(0x260)][_0x23fe1d(0x202)](_0x34f0bb)) _0x34f0bb = _0x4ca09f[_0x23fe1d(0x124)][_0x23fe1d(0x11b)](this); const _0xe7fcaf = _0x4ca09f[_0x23fe1d(0x14b)]; _0xe7fcaf > 0x0 && this[_0x23fe1d(0x282)]() !== _0x23fe1d(0x274) && (_0x34f0bb = _0x23fe1d(0x17f)[_0x23fe1d(0x2ba)](_0xe7fcaf, _0x34f0bb)); const _0x16a0a5 = this['isMainMenuCommandEnabled'](_0x97bc70, _0x4ca09f), _0x526245 = _0x4ca09f[_0x23fe1d(0x197)][_0x23fe1d(0x11b)](this); if (_0x97bc70 === 'subcategory') { if (_0x23fe1d(0x234) === _0x23fe1d(0x1ff)) { const _0x1a9bd8 = _0x3d1868[_0x23fe1d(0x2a1)][_0x23fe1d(0x18c)][_0x23fe1d(0x132)]['Rows'], _0x51ed39 = _0x4abee8[_0x23fe1d(0x146)], _0x52cd0a = this[_0x23fe1d(0x20b)](0x1, !![]), _0x25a9ee = 0x0, _0x61b0b1 = this[_0x23fe1d(0x129)](); return new _0x5d81ee(_0x25a9ee, _0x61b0b1, _0x51ed39, _0x52cd0a); } else _0xcb6c25++, _0x97bc70 += _0xcb6c25; } this[_0x23fe1d(0x18a)](_0x34f0bb, _0x97bc70, _0x16a0a5, _0x526245), this[_0x23fe1d(0x1df)](_0x97bc70, _0x4ca09f[_0x23fe1d(0x17a)][_0x23fe1d(0x206)](this, _0x526245)); } this[_0x23fe1d(0x247)](_0x97bc70); } } }, Window_MenuCommand['prototype'][_0x364f2c(0x1e9)] = function (_0x2b05c4, _0x318861, _0x1bb310) { const _0x42839f = _0x364f2c; if (!_0x1bb310) { if (_0x42839f(0x16c) !== 'ztgSW') _0x30774a[_0x42839f(0x2a1)][_0x42839f(0x167)][_0x42839f(0x11b)](this), this[_0x42839f(0x275)](), this['createVariableWindow'](), this[_0x42839f(0x138)](); else { if (!this[_0x42839f(0x2b4)](_0x2b05c4, _0x318861)) return ![]; } } if ($gameSystem[_0x42839f(0x27f)](_0x2b05c4, 'forceShow')) return !![]; if ($gameSystem[_0x42839f(0x27f)](_0x2b05c4, _0x42839f(0x2d9))) return ![]; return _0x318861[_0x42839f(0x26a)]['call'](this, _0x2b05c4, _0x318861); }, Window_MenuCommand['prototype']['isMainMenuCommandEnabled'] = function (_0xd7115e, _0x5a4e5c) { const _0x127d4f = _0x364f2c; if ($gameSystem['getMainMenuSymbolState'](_0xd7115e, _0x127d4f(0x220))) return !![]; if ($gameSystem['getMainMenuSymbolState'](_0xd7115e, _0x127d4f(0x1c9))) return ![]; return _0x5a4e5c[_0x127d4f(0x1d6)]['call'](this, _0xd7115e, _0x5a4e5c); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x247)] = function (_0x12da4c) { const _0x2b5ba6 = _0x364f2c; switch (_0x12da4c) { case _0x2b5ba6(0x20f): this['addMainCommands'](); break; case _0x2b5ba6(0x256): this[_0x2b5ba6(0x169)](), this[_0x2b5ba6(0x174)](); break; case _0x2b5ba6(0x26f): this[_0x2b5ba6(0x17b)](); break; case _0x2b5ba6(0x269): this[_0x2b5ba6(0x1f7)](); break; case _0x2b5ba6(0x19e): this['addGameEndCommand'](); break; } }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1e4)] = function () { }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x169)] = function () { }, Window_MenuCommand['prototype'][_0x364f2c(0x174)] = function () { }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x17b)] = function () { }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1f7)] = function () { }, Window_MenuCommand['prototype'][_0x364f2c(0x116)] = function () { }, Window_MenuCommand['prototype']['maxCols'] = function () { const _0x1e3ba = _0x364f2c, _0x1b8510 = SceneManager[_0x1e3ba(0x2e0)][_0x1e3ba(0x123)](); if ([_0x1e3ba(0x25d), _0x1e3ba(0x189)][_0x1e3ba(0x202)](_0x1b8510)) { if (_0x1e3ba(0x2df) === _0x1e3ba(0x2df)) return this[_0x1e3ba(0x25c)] ? this[_0x1e3ba(0x190)]() : 0x4; else _0x4be8d2['MainMenuCore']['Scene_MenuBase_updateActor'][_0x1e3ba(0x11b)](this), this[_0x1e3ba(0x14e)]() && this[_0x1e3ba(0x15a)] && this[_0x1e3ba(0x15a)]['setActor'](this['_actor']); } else return _0x1b8510 !== 'default' ? _0x1e3ba(0x1b4) !== 'vDSbL' ? VisuMZ[_0x1e3ba(0x2a1)][_0x1e3ba(0x18c)][_0x1e3ba(0x132)][_0x1e3ba(0x137)] : _0x1d8aaa[_0x1e3ba(0x2a1)][_0x1e3ba(0x18c)][_0x1e3ba(0x1a4)] : Window_Command['prototype'][_0x1e3ba(0x241)]['call'](this); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x171)] = function () { return this['_subcategory'] || ''; }, Window_MenuCommand[_0x364f2c(0x18e)]['isIncludedInSubcategory'] = function (_0x3e346d, _0x9db7) { const _0x4f5851 = _0x364f2c, _0x4fe50a = _0x9db7[_0x4f5851(0x284)] || ''; if (!this['doesSubcategoryExist'](_0x4fe50a) && this['currentSubcategory']() === '') return !![]; return _0x4fe50a === this[_0x4f5851(0x171)](); }, Window_MenuCommand[_0x364f2c(0x18e)]['doesSubcategoryExist'] = function (_0x33f5e8) { const _0x5128fb = _0x364f2c; return this[_0x5128fb(0x1c1)]()[_0x5128fb(0x202)](_0x33f5e8); }, Window_MenuCommand[_0x364f2c(0x18e)]['getSubcategoryList'] = function () { const _0x14a375 = _0x364f2c; if (Window_MenuCommand[_0x14a375(0x2a6)] !== undefined) { if ('Eoans' === _0x14a375(0x249)) return Window_MenuCommand['SUBCATEGORY_LIST']; else _0x537d19[_0x14a375(0x12a)](_0x2fa515); } Window_MenuCommand['SUBCATEGORY_LIST'] = []; for (const _0x15230e of Window_MenuCommand['_commandList']) { if (_0x14a375(0x2d0) !== _0x14a375(0x198)) { const _0x362c08 = _0x15230e[_0x14a375(0x2c6)]; if (_0x362c08 !== _0x14a375(0x281)) continue; const _0x4a2341 = _0x15230e[_0x14a375(0x197)]['call'](this); Window_MenuCommand[_0x14a375(0x2a6)]['push'](_0x4a2341); } else this[_0x14a375(0x20a)](...arguments); } return Window_MenuCommand[_0x14a375(0x2a6)]; }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x230)] = function (_0x4e83fd) { const _0x45ff88 = _0x364f2c; if (!_0x4e83fd) return !![]; const _0x443ec4 = _0x4e83fd['ExtJS'][_0x45ff88(0x11b)](this); for (const _0x48f6fd of Window_MenuCommand[_0x45ff88(0x235)]) { if (_0x48f6fd === _0x4e83fd) continue; const _0x3bfc95 = _0x48f6fd[_0x45ff88(0x284)] || ''; if (_0x3bfc95 !== _0x443ec4) continue; const _0x330119 = _0x48f6fd['Symbol']; if (this[_0x45ff88(0x1e9)](_0x330119, _0x48f6fd, !![])) return !![]; } return ![]; }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1b9)] = function (_0x12c683) { const _0xc71e57 = _0x364f2c; _0x12c683 = _0x12c683; if (this['currentSubcategory']() === _0x12c683) return; this[_0xc71e57(0x1eb)] = _0x12c683, $gameTemp[_0xc71e57(0x1d3)] = _0x12c683, this[_0xc71e57(0x295)](), this[_0xc71e57(0x16f)](0x0), this['setTopRow'](0x0), this[_0xc71e57(0x27a)](); }, Window_MenuCommand['prototype'][_0x364f2c(0x208)] = function () { const _0x13553f = _0x364f2c, _0x306d70 = this[_0x13553f(0x171)](); this[_0x13553f(0x1eb)] = '', $gameTemp['_mainMenuSubcategory'] = undefined, this[_0x13553f(0x295)](), this[_0x13553f(0x1a8)](0x0); this[_0x13553f(0x23a)] > 0x1 && (this[_0x13553f(0x23a)] = 0x1, this[_0x13553f(0x2cc)]()); const _0x43fd8d = Math[_0x13553f(0x20e)](this[_0x13553f(0x268)](_0x306d70), 0x0); this[_0x13553f(0x2b7)](_0x43fd8d), this[_0x13553f(0x27a)](); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x19c)] = function () { const _0x286f2e = _0x364f2c; return VisuMZ[_0x286f2e(0x2a1)]['Settings']['CustomCmdWin'][_0x286f2e(0x238)]; }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x1f1)] = function (_0x3d33ca) { const _0x31d521 = _0x364f2c, _0x42f69b = this[_0x31d521(0x142)](_0x3d33ca); if (_0x42f69b === _0x31d521(0x212)) this[_0x31d521(0x294)](_0x3d33ca); else _0x42f69b === _0x31d521(0x21b) ? this[_0x31d521(0x2d1)](_0x3d33ca) : Window_Command['prototype'][_0x31d521(0x1f1)][_0x31d521(0x11b)](this, _0x3d33ca); }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x282)] = function () { const _0x307680 = _0x364f2c; return VisuMZ[_0x307680(0x2a1)]['Settings']['CustomCmdWin'][_0x307680(0x253)]; }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x142)] = function (_0x4b86a3) { const _0x4b3f87 = _0x364f2c, _0x519d19 = this[_0x4b3f87(0x282)](); if (_0x519d19 !== _0x4b3f87(0x12b)) return _0x519d19; else { if ('ZrkFh' !== _0x4b3f87(0x177)) _0x30d514['forceDisableMainMenuCommand'](_0x2b91fb); else { const _0x2c293b = this['commandName'](_0x4b86a3); if (_0x2c293b[_0x4b3f87(0x1a2)](/\\I\[(\d+)\]/i)) { const _0x30618e = this[_0x4b3f87(0x231)](_0x4b86a3), _0x161bdb = this[_0x4b3f87(0x122)](_0x2c293b)[_0x4b3f87(0x12f)]; if (_0x161bdb <= _0x30618e['width']) return _0x4b3f87(0x212); else { if (_0x4b3f87(0x135) !== _0x4b3f87(0x135)) this[_0x4b3f87(0x28e)](_0x53a647['isBattleMember']()); else return _0x4b3f87(0x21b); } } else return _0x4b3f87(0x274); } } }, Window_MenuCommand['prototype'][_0x364f2c(0x294)] = function (_0x1b48d4) { const _0x2e245e = _0x364f2c, _0x3320b6 = this[_0x2e245e(0x231)](_0x1b48d4), _0x5da05e = this[_0x2e245e(0x1e3)](_0x1b48d4), _0x1e14dc = this[_0x2e245e(0x122)](_0x5da05e)[_0x2e245e(0x12f)]; this['changePaintOpacity'](this[_0x2e245e(0x13a)](_0x1b48d4)); let _0x52fd61 = this[_0x2e245e(0x19c)](); if (_0x52fd61 === _0x2e245e(0x1d1)) _0x2e245e(0x2cd) === _0x2e245e(0x1e7) ? this['drawTextEx'](_0x4cf5e3, _0x405c14['x'], _0x3c9b1c['y'], _0x10b357) : this[_0x2e245e(0x1f3)](_0x5da05e, _0x3320b6['x'] + _0x3320b6[_0x2e245e(0x12f)] - _0x1e14dc, _0x3320b6['y'], _0x1e14dc); else { if (_0x52fd61 === 'center') { if (_0x2e245e(0x185) !== _0x2e245e(0x1be)) { const _0x12fa6b = _0x3320b6['x'] + Math[_0x2e245e(0x214)]((_0x3320b6[_0x2e245e(0x12f)] - _0x1e14dc) / 0x2); this[_0x2e245e(0x1f3)](_0x5da05e, _0x12fa6b, _0x3320b6['y'], _0x1e14dc); } else return _0x4d9dd8[_0x2e245e(0x2a1)]['Settings'][_0x2e245e(0x2db)][_0x2e245e(0x267)]; } else this[_0x2e245e(0x1f3)](_0x5da05e, _0x3320b6['x'], _0x3320b6['y'], _0x1e14dc); } }, Window_MenuCommand[_0x364f2c(0x18e)][_0x364f2c(0x2d1)] = function (_0x2a5ab7) { const _0x3d0ddc = _0x364f2c; this['commandName'](_0x2a5ab7)['match'](/\\I\[(\d+)\]/i); const _0x4a1a60 = Number(RegExp['$1']), _0x4df2a3 = this[_0x3d0ddc(0x231)](_0x2a5ab7), _0x3f6a44 = _0x4df2a3['x'] + Math[_0x3d0ddc(0x214)]((_0x4df2a3[_0x3d0ddc(0x12f)] - ImageManager[_0x3d0ddc(0x21f)]) / 0x2), _0xa3ec83 = _0x4df2a3['y'] + (_0x4df2a3['height'] - ImageManager[_0x3d0ddc(0x1bd)]) / 0x2; this[_0x3d0ddc(0x263)](_0x4a1a60, _0x3f6a44, _0xa3ec83); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x1b2)] = Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x2a2)], Window_StatusBase[_0x364f2c(0x18e)]['loadFaceImages'] = function () { const _0x1a2c53 = _0x364f2c; VisuMZ['MainMenuCore']['Window_StatusBase_loadFaceImages'][_0x1a2c53(0x11b)](this), this[_0x1a2c53(0x1ef)](); }, Window_StatusBase['prototype'][_0x364f2c(0x1ef)] = function () { const _0x112b82 = _0x364f2c; for (const _0x4b927f of $gameParty[_0x112b82(0x159)]()) { if (!_0x4b927f) continue; _0x4b927f['characterName']() && ImageManager['loadCharacter'](_0x4b927f[_0x112b82(0x1d4)]()), _0x4b927f['battlerName']() && ImageManager['loadSvActor'](_0x4b927f[_0x112b82(0x24f)]()), _0x4b927f[_0x112b82(0x203)]() && ImageManager[_0x112b82(0x172)](_0x4b927f[_0x112b82(0x203)]()); } }, Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x26c)] = function () { const _0x5dd2d1 = _0x364f2c; return VisuMZ[_0x5dd2d1(0x2a1)][_0x5dd2d1(0x18c)]['StatusGraphic']; }, Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x28f)] = function (_0x570ba9, _0xf13b64, _0x1acc54, _0x513b4a, _0x7b3b07) { const _0x11da31 = _0x364f2c; _0x513b4a = _0x513b4a || ImageManager[_0x11da31(0x23d)], _0x7b3b07 = _0x7b3b07 || ImageManager[_0x11da31(0x204)]; const _0x5bd7e9 = ImageManager[_0x11da31(0x23d)], _0xaacf88 = _0x7b3b07 - 0x2, _0x52c097 = _0xf13b64 + Math[_0x11da31(0x214)]((_0x513b4a - _0x5bd7e9) / 0x2); this[_0x11da31(0x2e9)] === Window_MenuStatus && this[_0x11da31(0x28e)](_0x570ba9['isBattleMember']()), this[_0x11da31(0x173)](_0x570ba9, _0x52c097, _0x1acc54, _0x5bd7e9, _0xaacf88), this['changePaintOpacity'](!![]); }, Window_StatusBase[_0x364f2c(0x18e)][_0x364f2c(0x1f8)] = function (_0x1a9342, _0x3756ab, _0x3cb26a, _0x3fb65b, _0x444487) { const _0x404bbd = _0x364f2c; _0x3fb65b = _0x3fb65b || ImageManager['faceWidth'], _0x444487 = _0x444487 || ImageManager[_0x404bbd(0x204)]; const _0x46d058 = _0x1a9342['characterName'](), _0x6e24ba = _0x1a9342[_0x404bbd(0x184)](), _0x56b2dc = ImageManager[_0x404bbd(0x15c)](_0x46d058), _0x11c0fd = ImageManager[_0x404bbd(0x2c0)](_0x46d058), _0x453063 = _0x56b2dc['width'] / (_0x11c0fd ? 0x3 : 0xc), _0x445fdb = _0x56b2dc[_0x404bbd(0x1d9)] / (_0x11c0fd ? 0x4 : 0x8), _0x1bceae = _0x3fb65b, _0x4c70d5 = _0x444487 - 0x2, _0x2bee5e = _0x3756ab + Math[_0x404bbd(0x214)](_0x1bceae / 0x2), _0x4f115e = _0x3cb26a + Math[_0x404bbd(0x1f9)]((_0x444487 + _0x445fdb) / 0x2); this[_0x404bbd(0x2e9)] === Window_MenuStatus && ('GXufi' === 'xnPag' ? this[_0x404bbd(0x2d5)][_0x404bbd(0x27a)]() : this[_0x404bbd(0x28e)](_0x1a9342[_0x404bbd(0x228)]())); const _0x401bb7 = Math['min'](_0x3fb65b, _0x453063), _0x19550e = Math[_0x404bbd(0x2c2)](_0x444487, _0x445fdb), _0x15631c = Math[_0x404bbd(0x214)](_0x3756ab + Math['max'](_0x3fb65b - _0x453063, 0x0) / 0x2), _0x49afca = Math[_0x404bbd(0x214)](_0x3cb26a + Math[_0x404bbd(0x20e)](_0x444487 - _0x445fdb, 0x0) / 0x2), _0x2b3487 = _0x11c0fd ? 0x0 : _0x6e24ba, _0x433da3 = (_0x2b3487 % 0x4 * 0x3 + 0x1) * _0x453063, _0x56275f = Math[_0x404bbd(0x214)](_0x2b3487 / 0x4) * 0x4 * _0x445fdb; this[_0x404bbd(0x2b6)][_0x404bbd(0x1ce)](_0x56b2dc, _0x433da3, _0x56275f, _0x401bb7, _0x19550e, _0x15631c, _0x49afca), this['changePaintOpacity'](!![]); }, Window_StatusBase['prototype'][_0x364f2c(0x272)] = function (_0x35312c, _0x834104, _0x30cfd0, _0x16339e, _0x2e04ef) { const _0x1eba91 = _0x364f2c; _0x16339e = _0x16339e || ImageManager[_0x1eba91(0x23d)], _0x2e04ef = _0x2e04ef || ImageManager[_0x1eba91(0x204)]; const _0x4d6706 = ImageManager[_0x1eba91(0x1f5)](_0x35312c[_0x1eba91(0x24f)]()), _0x20ec00 = _0x4d6706[_0x1eba91(0x12f)] / ImageManager[_0x1eba91(0x1dc)], _0x401758 = _0x4d6706['height'] / ImageManager[_0x1eba91(0x1d7)], _0x4b0e66 = _0x16339e, _0x580f1e = _0x2e04ef - 0x2, _0x24f7ce = _0x834104 + Math[_0x1eba91(0x214)](_0x4b0e66 / 0x2), _0x1ad066 = _0x30cfd0 + Math[_0x1eba91(0x1f9)]((_0x2e04ef + _0x401758) / 0x2); this[_0x1eba91(0x2e9)] === Window_MenuStatus && this[_0x1eba91(0x28e)](_0x35312c[_0x1eba91(0x228)]()); const _0x5cfb02 = _0x35312c['hasStaticSvBattler'] && _0x35312c['hasStaticSvBattler'](), _0x21d183 = 0x0, _0x3b1499 = 0x0, _0x5ca173 = _0x5cfb02 ? _0x4d6706[_0x1eba91(0x12f)] : _0x20ec00, _0x302c71 = _0x5cfb02 ? _0x4d6706['height'] : _0x401758, _0x991f1 = Math['min'](0x1, _0x16339e / _0x5ca173, _0x2e04ef / _0x302c71), _0x96d4fd = _0x991f1 * _0x5ca173, _0x12b13d = _0x991f1 * _0x302c71, _0x2b1dac = Math[_0x1eba91(0x214)](_0x834104 + Math[_0x1eba91(0x20e)](_0x16339e - _0x96d4fd, 0x0) / 0x2), _0x3c69a6 = Math[_0x1eba91(0x214)](_0x30cfd0 + Math[_0x1eba91(0x20e)](_0x2e04ef - _0x12b13d, 0x0) / 0x2); this[_0x1eba91(0x2b6)]['blt'](_0x4d6706, _0x21d183, _0x3b1499, _0x5ca173, _0x302c71, _0x2b1dac, _0x3c69a6, _0x96d4fd, _0x12b13d), this[_0x1eba91(0x28e)](!![]); }, Window_StatusBase['prototype'][_0x364f2c(0x2af)] = function (_0x19d2f7, _0x57cd17, _0x3d72a8, _0x4dd485, _0x143bc1) { const _0x1a8e4f = _0x364f2c, _0x117baa = ImageManager['loadPicture'](_0x19d2f7['getMenuImage']()); _0x4dd485 = (_0x4dd485 || ImageManager['faceWidth']) - 0x2, _0x143bc1 = (_0x143bc1 || ImageManager[_0x1a8e4f(0x204)]) - 0x2; const _0x17dbdd = _0x117baa['width'], _0xb1cc6 = _0x117baa[_0x1a8e4f(0x1d9)], _0x3ac843 = _0x4dd485, _0x2b39ee = _0x143bc1 - 0x2, _0x4d63ad = _0x57cd17 + Math[_0x1a8e4f(0x214)](_0x3ac843 / 0x2), _0x376f40 = _0x3d72a8 + Math['ceil']((_0x143bc1 + _0xb1cc6) / 0x2); this[_0x1a8e4f(0x2e9)] === Window_MenuStatus && this[_0x1a8e4f(0x28e)](_0x19d2f7[_0x1a8e4f(0x228)]()); const _0x1c6f80 = Math[_0x1a8e4f(0x2c2)](_0x4dd485, _0x17dbdd), _0x1b4776 = Math[_0x1a8e4f(0x2c2)](_0x143bc1, _0xb1cc6), _0x9b7e0c = _0x57cd17 + 0x1, _0x1ca748 = Math['max'](_0x3d72a8 + 0x1, _0x3d72a8 + _0x2b39ee - _0xb1cc6 + 0x3); let _0x5e76dd = Math[_0x1a8e4f(0x2b1)]((_0x17dbdd - _0x1c6f80) / 0x2), _0xe68eee = Math[_0x1a8e4f(0x2b1)]((_0xb1cc6 - _0x1b4776) / 0x2); _0x5e76dd -= _0x19d2f7['getMenuImageOffsetX'](), _0xe68eee -= _0x19d2f7['getMenuImageOffsetY'](); if (Imported[_0x1a8e4f(0x1db)]) { if ('cxJfA' === _0x1a8e4f(0x139)) { if (VisuMZ[_0x1a8e4f(0x161)][_0x1a8e4f(0x18c)][_0x1a8e4f(0x192)]['PixelateImageRendering']) { } } else this['_mainMenuCore'][_0x5ef28d] = this[_0x1a8e4f(0x1ec)][_0x4a485e] || []; } this[_0x1a8e4f(0x2b6)][_0x1a8e4f(0x1ce)](_0x117baa, _0x5e76dd, _0xe68eee, _0x1c6f80, _0x1b4776, _0x9b7e0c, _0x1ca748), this[_0x1a8e4f(0x28e)](!![]); }, Window_Status['prototype'][_0x364f2c(0x173)] = function (_0xcebe33, _0x5c1fae, _0x50e989, _0x1f28b4, _0x380193) { const _0x476acd = _0x364f2c; switch (this[_0x476acd(0x26c)]()) { case _0x476acd(0x23e): break; case _0x476acd(0x163): this[_0x476acd(0x1f8)](_0xcebe33, _0x5c1fae, _0x50e989, _0x1f28b4, _0x380193); break; case _0x476acd(0x280): this['drawItemActorSvBattler'](_0xcebe33, _0x5c1fae, _0x50e989, _0x1f28b4, _0x380193); break; default: Window_StatusBase[_0x476acd(0x18e)][_0x476acd(0x173)][_0x476acd(0x11b)](this, _0xcebe33, _0x5c1fae, _0x50e989, _0x1f28b4, _0x380193); break; } }, VisuMZ['MainMenuCore'][_0x364f2c(0x216)] = Window_MenuStatus['prototype']['selectLast'], Window_MenuStatus['prototype'][_0x364f2c(0x29c)] = function () { const _0x6cb852 = _0x364f2c; if (VisuMZ['MainMenuCore'][_0x6cb852(0x18c)]['General']['StatusSelectLast']) VisuMZ[_0x6cb852(0x2a1)][_0x6cb852(0x216)][_0x6cb852(0x11b)](this); else { if (_0x6cb852(0x153) !== _0x6cb852(0x11c)) this[_0x6cb852(0x2b7)](0x0); else return _0x2d7b88[_0x6cb852(0x2a1)][_0x6cb852(0x18c)][_0x6cb852(0x297)][_0x6cb852(0x27c)] && _0x343276[_0x6cb852(0x159)]()[_0x6cb852(0x176)] <= 0x1; } }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x2dd)] = Window_MenuStatus['prototype']['maxItems'], Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x190)] = function () { const _0x1c882f = _0x364f2c; return this[_0x1c882f(0x16e)]() ? $gameParty[_0x1c882f(0x1e6)]()[_0x1c882f(0x176)] : VisuMZ[_0x1c882f(0x2a1)]['Window_MenuStatus_maxItems'][_0x1c882f(0x11b)](this); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x16e)] = function () { const _0x17be09 = _0x364f2c, _0x2b007e = VisuMZ['MainMenuCore']['Settings'][_0x17be09(0x297)]; if (_0x2b007e[_0x17be09(0x11d)] === undefined) _0x2b007e[_0x17be09(0x11d)] = !![]; const _0x20c3ca = SceneManager[_0x17be09(0x2e0)]; if (!_0x2b007e[_0x17be09(0x11d)]) { if (_0x17be09(0x2ca) === _0x17be09(0x2ca)) { if (_0x2b007e[_0x17be09(0x2d3)]) return _0x20c3ca[_0x17be09(0x2e9)] === Scene_Menu; return !![]; } else _0x71bf90 = _0x475630[_0x17be09(0x2a4)](_0x25e685); } return ![]; }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x273)] = function () { const _0x1471fb = _0x364f2c, _0x3c000f = SceneManager['_scene']['constructor']; if (_0x3c000f === Scene_Menu) { if (_0x1471fb(0x28c) !== _0x1471fb(0x1f0)) return VisuMZ['MainMenuCore'][_0x1471fb(0x18c)][_0x1471fb(0x187)]; else this[_0x1471fb(0x2d5)][_0x1471fb(0x171)]() !== '' ? this[_0x1471fb(0x2d5)][_0x1471fb(0x208)]() : this['popScene'](); } else return VisuMZ[_0x1471fb(0x2a1)]['Settings'][_0x1471fb(0x1e0)]; }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x200)] = function () { const _0x1da990 = _0x364f2c, _0x376926 = this[_0x1da990(0x273)](); switch (_0x376926) { case _0x1da990(0x210): case 'portrait': return 0x1; case _0x1da990(0x2ab): return 0x1; default: return $gameParty[_0x1da990(0x1e1)](); } }, Window_MenuStatus['prototype'][_0x364f2c(0x241)] = function () { const _0x2cab7c = _0x364f2c, _0x1feacf = this['listStyle'](); switch (_0x1feacf) { case _0x2cab7c(0x210): case 'portrait': return $gameParty[_0x2cab7c(0x1e1)](); default: return 0x1; } }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x27e)] = Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1da)], Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1da)] = function () { const _0x152c2a = _0x364f2c, _0x4826c0 = this[_0x152c2a(0x273)](); switch (_0x4826c0) { case 'vertical': case 'portrait': case _0x152c2a(0x2ab): return this[_0x152c2a(0x14a)]; case _0x152c2a(0x140): return Window_Selectable['prototype'][_0x152c2a(0x1da)][_0x152c2a(0x11b)](this); case 'thicker': return this[_0x152c2a(0x1cb)]() * 0x2 + 0x8; default: return VisuMZ[_0x152c2a(0x2a1)][_0x152c2a(0x27e)][_0x152c2a(0x11b)](this); } }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1f1)] = function (_0x354c91) { const _0x7ed781 = _0x364f2c; this[_0x7ed781(0x1bb)](_0x354c91), this['drawItemStatus'](_0x354c91); }, VisuMZ[_0x364f2c(0x2a1)][_0x364f2c(0x257)] = Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1d8)], Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x11e)] = function (_0x36bf18, _0x3cb787, _0x56aa95, _0xec82a8, _0x5a0b06) { const _0x227fb1 = _0x364f2c; switch (this[_0x227fb1(0x26c)]()) { case _0x227fb1(0x23e): break; case _0x227fb1(0x163): this[_0x227fb1(0x1f8)](_0x36bf18, _0x3cb787, _0x56aa95 + 0x1, _0xec82a8, _0x5a0b06 - 0x2); break; case _0x227fb1(0x280): this[_0x227fb1(0x272)](_0x36bf18, _0x3cb787, _0x56aa95 + 0x1, _0xec82a8, _0x5a0b06 - 0x2); break; default: this[_0x227fb1(0x28f)](_0x36bf18, _0x3cb787, _0x56aa95, _0xec82a8, _0x5a0b06); break; } }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x117)] = function (_0x296ae6) { const _0x281d7e = _0x364f2c; this[_0x281d7e(0x22c)](); const _0x44b8ab = this['actor'](_0x296ae6), _0x1b7f91 = this[_0x281d7e(0x2ad)](_0x296ae6), _0x357efd = this[_0x281d7e(0x273)](); switch (_0x357efd) { case 'vertical': this[_0x281d7e(0x246)](_0x44b8ab, _0x1b7f91); break; case _0x281d7e(0x1bc): this[_0x281d7e(0x118)](_0x44b8ab, _0x1b7f91); break; case _0x281d7e(0x2ab): this[_0x281d7e(0x182)](_0x44b8ab, _0x1b7f91); break; case _0x281d7e(0x140): this[_0x281d7e(0x1c8)](_0x44b8ab, _0x1b7f91); break; case _0x281d7e(0x23c): this[_0x281d7e(0x18f)](_0x44b8ab, _0x1b7f91); break; default: this[_0x281d7e(0x17c)](_0x44b8ab, _0x1b7f91); break; } }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x246)] = function (_0xf53524, _0x2d6e61) { const _0x4a3552 = _0x364f2c; VisuMZ[_0x4a3552(0x2a1)][_0x4a3552(0x18c)][_0x4a3552(0x22e)][_0x4a3552(0x262)][_0x4a3552(0x11b)](this, _0xf53524, _0x2d6e61); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x118)] = function (_0x502643, _0x1a7d35) { const _0x1133c7 = _0x364f2c; if (_0x502643[_0x1133c7(0x203)]() !== '') { if (_0x1133c7(0x239) === _0x1133c7(0x126)) return _0x3d3797[_0x1133c7(0x18e)][_0x1133c7(0x1da)][_0x1133c7(0x11b)](this); else { const _0x175a05 = ImageManager[_0x1133c7(0x172)](_0x502643['getMenuImage']()); _0x175a05[_0x1133c7(0x2b9)](this['drawItemStatusPortraitStyleOnLoad'][_0x1133c7(0x206)](this, _0x502643, _0x1a7d35)); } } else { if ('kjCuj' !== _0x1133c7(0x2b5)) this[_0x1133c7(0x246)](_0x502643, _0x1a7d35); else return this[_0x1133c7(0x2b8)](); } }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x2c5)] = function (_0x1ce3b4, _0x27ae31) { const _0x430a75 = _0x364f2c; VisuMZ[_0x430a75(0x2a1)][_0x430a75(0x18c)]['ListStyles'][_0x430a75(0x199)]['call'](this, _0x1ce3b4, _0x27ae31); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x182)] = function (_0x5aeb26, _0x5eff15) { const _0x22abaa = _0x364f2c, _0x4a0abb = ImageManager[_0x22abaa(0x172)](_0x5aeb26[_0x22abaa(0x203)]()); _0x4a0abb[_0x22abaa(0x2b9)](this[_0x22abaa(0x128)][_0x22abaa(0x206)](this, _0x5aeb26, _0x5eff15)); }, Window_MenuStatus['prototype']['drawItemStatusSoloStyleOnLoad'] = function (_0x128468, _0x4a4f54) { const _0x35489b = _0x364f2c; VisuMZ[_0x35489b(0x2a1)][_0x35489b(0x18c)]['ListStyles'][_0x35489b(0x134)][_0x35489b(0x11b)](this, _0x128468, _0x4a4f54); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x1c8)] = function (_0x36ae9f, _0x38af92) { const _0x2b7d79 = _0x364f2c; VisuMZ[_0x2b7d79(0x2a1)][_0x2b7d79(0x18c)][_0x2b7d79(0x22e)][_0x2b7d79(0x1fe)]['call'](this, _0x36ae9f, _0x38af92); }, Window_MenuStatus[_0x364f2c(0x18e)]['drawItemStatusThickerStyle'] = function (_0x2187a9, _0x5c6c4a) { const _0x2ef66e = _0x364f2c; VisuMZ[_0x2ef66e(0x2a1)][_0x2ef66e(0x18c)][_0x2ef66e(0x22e)]['ThickerStyle'][_0x2ef66e(0x11b)](this, _0x2187a9, _0x5c6c4a); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x151)] = function () { const _0x5387f5 = _0x364f2c, _0xeb0794 = this[_0x5387f5(0x273)](); if ([_0x5387f5(0x140), _0x5387f5(0x23c)][_0x5387f5(0x202)](_0xeb0794)) return ![]; return Window_StatusBase['prototype'][_0x5387f5(0x151)][_0x5387f5(0x11b)](this); }, Window_MenuStatus[_0x364f2c(0x18e)][_0x364f2c(0x17c)] = function (_0xe3f2c4, _0x591fe1) { const _0x482a7f = _0x364f2c; VisuMZ[_0x482a7f(0x2a1)][_0x482a7f(0x18c)]['ListStyles'][_0x482a7f(0x24e)][_0x482a7f(0x11b)](this, _0xe3f2c4, _0x591fe1); }, Window_SkillStatus['prototype']['drawActorFace'] = function (_0x40333e, _0x3c6fc5, _0x37a06f, _0x12393d, _0x535828) { const _0x379439 = _0x364f2c; switch (this[_0x379439(0x26c)]()) { case _0x379439(0x23e): break; case _0x379439(0x163): this[_0x379439(0x1f8)](_0x40333e, _0x3c6fc5, _0x37a06f, _0x12393d, _0x535828); break; case _0x379439(0x280): this['drawItemActorSvBattler'](_0x40333e, _0x3c6fc5, _0x37a06f, _0x12393d, _0x535828); break; default: Window_StatusBase[_0x379439(0x18e)]['drawActorFace'][_0x379439(0x11b)](this, _0x40333e, _0x3c6fc5, _0x37a06f, _0x12393d, _0x535828); break; } }, Window_EquipStatus[_0x364f2c(0x18e)][_0x364f2c(0x173)] = function (_0x9cc4de, _0x3eb1ec, _0x2042ab, _0x5d3a96, _0x5c6aa7) { const _0x15e2fc = _0x364f2c; switch (this[_0x15e2fc(0x26c)]()) { case 'none': break; case _0x15e2fc(0x163): this[_0x15e2fc(0x1f8)](_0x9cc4de, _0x3eb1ec, _0x2042ab, _0x5d3a96, _0x5c6aa7); break; case _0x15e2fc(0x280): this[_0x15e2fc(0x272)](_0x9cc4de, _0x3eb1ec, _0x2042ab, _0x5d3a96, _0x5c6aa7); break; default: Window_StatusBase[_0x15e2fc(0x18e)][_0x15e2fc(0x173)][_0x15e2fc(0x11b)](this, _0x9cc4de, _0x3eb1ec, _0x2042ab, _0x5d3a96, _0x5c6aa7); break; } }; function Window_ThinGold() { const _0x31698c = _0x364f2c; this[_0x31698c(0x20a)](...arguments); } Window_ThinGold['prototype'] = Object[_0x364f2c(0x13d)](Window_Gold[_0x364f2c(0x18e)]), Window_ThinGold[_0x364f2c(0x18e)][_0x364f2c(0x2e9)] = Window_ThinGold, Window_ThinGold['prototype'][_0x364f2c(0x1da)] = function () { return this['lineHeight'](); }, Window_ThinGold[_0x364f2c(0x18e)][_0x364f2c(0x1c4)] = function () { const _0x20c7db = _0x364f2c; return Window_Selectable[_0x20c7db(0x18e)][_0x20c7db(0x1c4)][_0x20c7db(0x11b)](this); }; function Window_Playtime() { const _0xca645f = _0x364f2c; this[_0xca645f(0x20a)](...arguments); } Window_Playtime[_0x364f2c(0x18e)] = Object['create'](Window_Selectable[_0x364f2c(0x18e)]), Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x2e9)] = Window_Playtime, Window_Playtime[_0x364f2c(0x18e)]['initialize'] = function (_0x2edefd) { const _0x47926c = _0x364f2c; this[_0x47926c(0x2dc)] = $gameSystem[_0x47926c(0x119)](), this['_timer'] = 0x3c, Window_Selectable[_0x47926c(0x18e)][_0x47926c(0x20a)][_0x47926c(0x11b)](this, _0x2edefd), this['refresh'](); }, Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x1da)] = function () { const _0x265fd6 = _0x364f2c; return this[_0x265fd6(0x1cb)](); }, Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x1d2)] = function () { const _0x95e5ef = _0x364f2c; Window_Selectable['prototype'][_0x95e5ef(0x1d2)][_0x95e5ef(0x11b)](this), this[_0x95e5ef(0x11a)](); }, Window_Playtime['prototype'][_0x364f2c(0x11a)] = function () { const _0x3db9b7 = _0x364f2c; if (this[_0x3db9b7(0x11f)]-- > 0x0) { if (this['_timer'] <= 0x0) this[_0x3db9b7(0x295)](); } }, Window_Playtime['prototype'][_0x364f2c(0x295)] = function () { const _0x2ffd27 = _0x364f2c; this['_timer'] = 0x3c; const _0x1c128f = this[_0x2ffd27(0x231)](0x0), _0x41ce86 = _0x1c128f['x'], _0x31dab8 = _0x1c128f['y'], _0x33827b = _0x1c128f[_0x2ffd27(0x12f)]; this[_0x2ffd27(0x2b6)][_0x2ffd27(0x293)](), this['drawTimeIcon'](_0x1c128f), this[_0x2ffd27(0x12d)](_0x1c128f), this['drawPlaytime'](_0x1c128f); }, Window_Playtime[_0x364f2c(0x18e)]['resetFontSettings'] = function () { const _0x1e9903 = _0x364f2c; Window_Selectable[_0x1e9903(0x18e)][_0x1e9903(0x22c)][_0x1e9903(0x11b)](this), this[_0x1e9903(0x2b6)][_0x1e9903(0x296)] = VisuMZ[_0x1e9903(0x2a1)][_0x1e9903(0x18c)][_0x1e9903(0x287)]['FontSize']; }, Window_Playtime['prototype'][_0x364f2c(0x19d)] = function (_0x2609c3) { const _0x12a561 = _0x364f2c; if (VisuMZ[_0x12a561(0x2a1)][_0x12a561(0x18c)][_0x12a561(0x287)][_0x12a561(0x14b)] > 0x0) { const _0x2d3553 = VisuMZ[_0x12a561(0x2a1)]['Settings'][_0x12a561(0x287)][_0x12a561(0x14b)], _0x5eb908 = _0x2609c3['y'] + (this['lineHeight']() - ImageManager['iconHeight']) / 0x2; this[_0x12a561(0x263)](_0x2d3553, _0x2609c3['x'], _0x5eb908); const _0x453a8a = ImageManager[_0x12a561(0x21f)] + 0x4; _0x2609c3['x'] += _0x453a8a, _0x2609c3[_0x12a561(0x12f)] -= _0x453a8a; } }, Window_Playtime[_0x364f2c(0x18e)][_0x364f2c(0x12d)] = function (_0x6a7ca0) { const _0x3740e4 = _0x364f2c; this[_0x3740e4(0x22c)](), this[_0x3740e4(0x2e8)](ColorManager[_0x3740e4(0x1d0)]()); const _0x3b8852 = VisuMZ['MainMenuCore'][_0x3740e4(0x18c)][_0x3740e4(0x287)]['Time']; this[_0x3740e4(0x223)](_0x3b8852, _0x6a7ca0['x'], _0x6a7ca0['y'], _0x6a7ca0[_0x3740e4(0x12f)], _0x3740e4(0x170)), this[_0x3740e4(0x1cd)](); }, Window_Playtime['prototype'][_0x364f2c(0x1d5)] = function (_0x476b65) { const _0x44358d = _0x364f2c, _0x4be5f8 = $gameSystem['playtimeText'](); this['drawText'](_0x4be5f8, _0x476b65['x'], _0x476b65['y'], _0x476b65[_0x44358d(0x12f)], _0x44358d(0x1d1)); }; function Window_MenuVariables() { const _0x25e015 = _0x364f2c; this[_0x25e015(0x20a)](...arguments); } Window_MenuVariables[_0x364f2c(0x18e)] = Object[_0x364f2c(0x13d)](Window_Selectable[_0x364f2c(0x18e)]), Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x2e9)] = Window_MenuVariables, Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x20a)] = function (_0x24c002) { const _0x5c6ce3 = _0x364f2c; Window_Selectable[_0x5c6ce3(0x18e)]['initialize'][_0x5c6ce3(0x11b)](this, _0x24c002), this[_0x5c6ce3(0x1e2)] = VisuMZ[_0x5c6ce3(0x2a1)][_0x5c6ce3(0x18c)][_0x5c6ce3(0x2db)]['VarList'], this['refresh'](); }, Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x1da)] = function () { const _0x589a21 = _0x364f2c; return this[_0x589a21(0x1cb)](); }, Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x241)] = function () { const _0x38eb28 = _0x364f2c, _0x169938 = SceneManager['_scene'][_0x38eb28(0x123)](); return _0x169938 === _0x38eb28(0x24a) ? 0x1 : VisuMZ[_0x38eb28(0x2a1)][_0x38eb28(0x18c)]['Variable'][_0x38eb28(0x143)][_0x38eb28(0x176)]; }, Window_MenuVariables[_0x364f2c(0x18e)][_0x364f2c(0x22c)] = function () { const _0x3cea18 = _0x364f2c; Window_Selectable[_0x3cea18(0x18e)]['resetFontSettings'][_0x3cea18(0x11b)](this), this[_0x3cea18(0x2b6)][_0x3cea18(0x296)] = VisuMZ[_0x3cea18(0x2a1)][_0x3cea18(0x18c)][_0x3cea18(0x2db)]['FontSize'], this[_0x3cea18(0x2e8)](ColorManager[_0x3cea18(0x1d0)]()); }, Window_MenuVariables['prototype'][_0x364f2c(0x190)] = function () { const _0x5afc16 = _0x364f2c; return this['_data'][_0x5afc16(0x176)]; }, Window_MenuVariables[_0x364f2c(0x18e)]['drawAllItems'] = function () { const _0xfe6f61 = _0x364f2c, _0x318fdc = this['topIndex'](); for (let _0x2b68c4 = 0x0; _0x2b68c4 < this[_0xfe6f61(0x147)](); _0x2b68c4++) { if (_0xfe6f61(0x2c9) === _0xfe6f61(0x2c9)) { const _0x2f91f1 = _0x318fdc + _0x2b68c4; _0x2f91f1 < this[_0xfe6f61(0x190)]() && (this['drawItemBackground'](_0x2f91f1), this[_0xfe6f61(0x1f1)](_0x2f91f1)); } else { _0x105f49[_0xfe6f61(0x29a)][_0xfe6f61(0x11b)](this, _0x55139f); return; } } }, Window_MenuVariables['prototype'][_0x364f2c(0x196)] = function (_0x56fa85) { }, Window_MenuVariables['prototype']['drawItem'] = function (_0x58994d) { const _0x42a5d5 = _0x364f2c, _0x3e85a6 = this[_0x42a5d5(0x1e2)][_0x58994d]; if (_0x3e85a6 <= 0x0) return; if (!$dataSystem[_0x42a5d5(0x1dd)][_0x3e85a6]) return; const _0x1428af = this[_0x42a5d5(0x231)](_0x58994d); this[_0x42a5d5(0x22c)](); let _0x5bc398 = 0x0, _0x5d74db = $dataSystem['variables'][_0x3e85a6][_0x42a5d5(0x1c2)](); if (_0x5d74db[_0x42a5d5(0x1a2)](/\\I\[(\d+)\]/i)) { if (_0x42a5d5(0x14c) !== 'RnoDW') { _0x38cd91[_0x42a5d5(0x18e)]['callUpdateHelp'][_0x42a5d5(0x11b)](this); if (this['_commandNameWindow']) this[_0x42a5d5(0x130)](); } else _0x5bc398 = Number(RegExp['$1']), _0x5d74db = _0x5d74db['replace'](/\\I\[(\d+)\]/i, '')[_0x42a5d5(0x1c2)](); } if (_0x5bc398 > 0x0) { const _0x606540 = _0x1428af['y'] + (this['lineHeight']() - ImageManager[_0x42a5d5(0x1bd)]) / 0x2; this['drawIcon'](_0x5bc398, _0x1428af['x'], _0x606540); const _0x55040f = ImageManager[_0x42a5d5(0x21f)] + 0x4; _0x1428af['x'] += _0x55040f, _0x1428af[_0x42a5d5(0x12f)] -= _0x55040f; } this['drawText'](_0x5d74db, _0x1428af['x'], _0x1428af['y'], _0x1428af[_0x42a5d5(0x12f)], 'left'), this[_0x42a5d5(0x2e8)](ColorManager['normalColor']()), this[_0x42a5d5(0x223)]($gameVariables[_0x42a5d5(0x12c)](_0x3e85a6), _0x1428af['x'], _0x1428af['y'], _0x1428af[_0x42a5d5(0x12f)], _0x42a5d5(0x1d1)); };