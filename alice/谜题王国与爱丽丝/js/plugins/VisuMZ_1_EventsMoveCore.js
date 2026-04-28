//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.59;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.59] [EventsMoveCore]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
* @orderAfter VisuMZ_0_CoreEngine
*
* @help
/* ============================================================================
* 简介
* ============================================================================
*
* 事件与移动核心插件为RPG Maker MZ增加了大量新功能，提升了事件的灵活性和移动选项。
* 这些功能从增加了从旧版RPG Maker中提取的功能到在其他游戏引擎中常见的主流技术。
* 移动选项还扩展支持8方向移动以及使用VisuStella 8格式的精灵表。
*
* 功能包括但不限于以下内容：
* 
* * 扩展事件命令以包括旧版和新版功能。
* * 事件模板用于复制事件、变形事件和生成事件。
* * 支持8方向移动选项和精灵表支持。
* * 美学特性，如奔跑时角色精灵的倾斜和下方阴影。
* * 通过自定义移动路线命令支持事件路径查找。
* * 高级开关和变量支持，自动运行代码。
* * 将常规开关和变量转换为自动开关和自动变量。
* * 在事件上放置标签和图标。
* * 允许通过点击、接近或使用区域多种方式触发事件。
* * 改变事件的碰撞箱大小，向任意方向扩展。
* * 同步事件移动选项，与玩家/其他事件一起移动。
* * 玩家能力在原地转向。
*
* ============================================================================
* 要求
* ============================================================================
*
* 本插件适用于RPG Maker MZ。不支持其他版本的RPG Maker。
*
* ------ Tier 1 ------
*
* 本插件是Tier 1级别插件。请在插件管理器列表中将其放置在低于其优先级的其他插件之下（例如：0, 1, 2, 3, 4, 5）。
* 这样可以确保插件与VisuStella MZ库的其他部分具有最佳的兼容性。
*
* ============================================================================
* 功能：高级开关和变量
* ============================================================================
*
* 现在开关和变量可以立即运行JavaScript代码并返回值。
* 乍一看，这似乎与使用“控制变量”事件命令的脚本选项没有区别，
* 但这可以用于即时设置开关和/或变量条件，用于并行公共事件、事件页条件、敌人技能条件和部队页条件，
* 而无需制作事件命令。
*
* ---
*
* <JS> code </JS>
* - 用于：开关和变量名称
* - 将“code”替换为返回值的JavaScript代码。
*
* ---
*
* 注意：标记的开关/变量彼此之间是互斥的。
* 不能同时使用<JS>、<Self>、<Map>或<Global>标记它们。
*
* ============================================================================
* 功能：自动开关和自动变量
* ============================================================================
*
* RPG Maker MZ默认有4个自动开关：A、B、C、D。对于某些类型的游戏，这是不够的。
* 本插件允许您将常规开关转换为自动开关，以便您可以拥有更多的自动开关。
*
* 与开关类似，RPG Maker MZ默认没有自动变量。与开关类似，您可以将常规变量转换为自动变量。
*
* ---
*
* <Self>
* - 用于：开关和变量名称
* - 将开关/变量转换为自动开关/自动变量。
*
* ---
*
* 然后，您可以像在事件的页条件中使用普通开关和变量一样使用它们。
* 如果开关或变量的名称中存在<Self>标记，则它将仅使用该事件的唯一数据。
*
* 注意：标记的开关/变量彼此之间是互斥的。
* 不能同时使用<JS>、<Self>、<Map>或<Global>标记它们。
* 
* ---
* 
* 如果您需要使用脚本调用来获取自动开关或自动变量的值，可以使用以下脚本调用。
* 
*   ---
* 
*   获取自动开关值：
* 
*   getSelfSwitchValue(mapID, eventID, switchID)
*   - 将“mapID”替换为目标事件所在地图的ID。
*   - 将“eventID”替换为目标事件的ID。
*   - 将“switchID”替换为使用<Self>创建的自动开关的ID号，或者如果是A、B、C或D，则用引号括起来的大写字母。
*   - 这将返回自动开关的true/false值。
*   - 示例: getSelfSwitchValue(12, 34, 56)
*   - 示例: getSelfSwitchValue(12, 34, 'B')
* 
*   ---
* 
*   获取自动变量值：
* 
*   getSelfVariableValue(mapID, eventID, variableID)
*   - 将“mapID”替换为目标事件所在地图的ID。
*   - 将“eventID”替换为目标事件的ID。
*   - 将“variableID”替换为自动变量的ID号。
*   - 这将返回自动变量中存储的值。
*   - 示例: getSelfVariableValue(12, 34, 56)
* 
*   ---
* 
*   设置自动开关值：
* 
*   setSelfSwitchValue(mapID, eventID, switchID, value)
*   - 将“mapID”替换为目标事件所在地图的ID。
*   - 将“eventID”替换为目标事件的ID。
*   - 将“switchID”替换为使用<Self>创建的自动开关的ID号，或者如果是A、B、C或D，则用引号括起来的大写字母。
*   - 将“value”替换为'true'或'false'，表示ON或OFF。不要使用引号。
*   - 这将改变自动开关的值为true/false。
*     - 示例: setSelfSwitchValue(12, 34, 56, false)
*     - 示例: setSelfSwitchValue(12, 34, 'B', true)
* 
*   ---
* 
*   设置自动变量值：
* 
*   setSelfVariableValue(mapID, eventID, variableID, value)
*   - 将“mapID”替换为目标事件所在地图的ID。
*   - 将“eventID”替换为目标事件的ID。
*   - 将“variableID”替换为自动变量的ID号。
*   - 将“value”替换为要设置的自动变量的值。
*   - 示例: setSelfVariableValue(12, 34, 56, 88888)
* 
*   ---
* 
* ============================================================================
* 功能：地图开关和变量
* ============================================================================
* 
* 类似于自动开关和自动变量，地图开关和地图变量是根据玩家当前所在地图保留数据的开关和变量。
* 换句话说，它们是用于地图的自动开关和自动变量！
* 
* 这些功能在RPG Maker MZ默认情况下是不存在的。
* 与自动开关和自动变量类似，您可以使用以下名称标记将常规开关或变量转换为地图开关或地图变量：
* 
* ---
* 
* <Map>
* - 用于：开关和变量名称
* - 将开关/变量转换为地图开关/地图变量。
* 
* ---
*
* 然后，您可以像在事件的页条件中使用普通开关和变量一样使用它们。
* 如果开关或变量的名称中存在<Map>标记，则它将仅使用该地图的唯一数据。
*
* 注意：标记的开关/变量彼此之间是互斥的。
* 不能同时使用<JS>、<Self>、<Map>或<Global>标记它们。
* 
* ---
* 
* 如果您需要使用脚本调用来获取地图开关或地图变量的值，可以使用以下脚本调用：
* 
*   ---
* 
*   获取地图开关值：
* 
*   getMapSwitchValue(mapID, switchID)
*   - 将“mapID”替换为开关所在的地图ID。
*   - 将“switchID”替换为要获取数据的开关ID号。
*   - 示例: getMapSwitchValue(4, 20)
* 
*   ---
* 
*   获取地图变量值：
* 
*   getMapVariableValue(mapID, variableID)
*   - 将“mapID”替换为变量所在的地图ID。
*   - 将“variableID”替换为要获取数据的变量ID号。
*   - 示例: getMapVariableValue(6, 9)
* 
*   ---
* 
*   设置地图开关值：
* 
*   setMapSwitchValue(mapID, switchID, value)
*   - 将“mapID”替换为开关所在的地图ID。
*   - 将“switchID”替换为要设置数据的开关ID号。
*   - 将“value”替换为'true'或'false'，表示ON或OFF。不要使用引号。
*   - 示例: setMapSwitchValue(4, 20, true)
*   - 示例: setMapSwitchValue(6, 9, false)
* 
*   ---
* 
*   设置地图变量值：
* 
*   setMapVariableValue(mapID, variableID, value)
*   - 将“mapID”替换为变量所在的地图ID。
*   - 将“variableID”替换为要设置数据的变量ID号。
*   - 将“value”替换为要设置的变量值。
*   - 示例: setMapVariableValue(6, 9, 420)
* 
*   ---
* 
* ============================================================================
*
 
*   ---
* 
* ---
*
* ============================================================================
* Features: Character Sprite Filename Tags
* ============================================================================
* 
* For the files located inside of your project's /img/characters/ folder, if
* the filenames themselves have specific "tags" in them, special properties
* will be applied to them. These tags can be combined together with a few
* exceptions.
* 
* Some of these are new to VisuStella MZ, while others are default to MZ.
* 
* ---
* 
*   !filename.png
*   - Tag: !
*   - Causes this character's sprite to align with the tile grid instead of
*     being lifted a few pixels higher.
*   - This is primarily used for things like doors, chests, and floor plates.
*   - Default to RPG Maker MZ.
* 
* ---
* 
*   $filename.png
*   - Tag: $
*   - Causes this character's sprite to use the "big character" format.
*   - Primarily used for sprites like the big monsters and such which only
*     have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
*   - Cannot be combined with the [VS8] tag.
*   - Default to RPG Maker MZ.
* 
* ---
* 
*   filename[Invisible].png
*   - Tag: [Invisible] or [Inv]
*   - This character's sprite will become invisible on the map screen in-game
*     while almost everything else about it is visible.
*   - This is used for those who wish to use sprite labels for things such as
*     autorun and parallel events.
* 
* ---
* 
*   filename[VS8].png
*   - Tag: [VS8]
*   - Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
*   - Refer to the section below.
*   - Cannot be combined with the $ tag.
* 
* ---
*
* ============================================================================
* Features: VisuStella-Style 8-Directional Sprite Sheets
* ============================================================================
*
* This plugin provides support for the VisuStella-Style 8-Directional Sprite
* Sheets, also know as VS8. VS8 sprite sheets offer support for walking
* frames, dashing frames, carrying frames, and emotes.
*
* ---
*
* To designate a sprite sheet as VS8, simply add [VS8] to the filename.
* Something like Actor1.png would become Actor1_[VS8].png.
*
* ---
*
* VS8 sprites are formatted as such. Each block below is a set of 3 frames.
*
* Walk Down    Walk DL     Dash Down   Dash DL
* Walk Left    Walk DR     Dash Left   Dash DR
* Walk Right   Walk UL     Dash Right  Dash UL
* Walk Up      Walk UR     Dash Up     Dash UR
*
* Carry Down   Carry DL    Ladder      Emotes 3
* Carry Left   Carry DR    Rope        Emotes 4
* Carry Right  Carry UL    Emotes 1    Emotes 5
* Carry Up     Carry UR    Emotes 2    Emotes 6
*
* ---
*
* Here are how each of the emote sets are grouped from left to right.
*
* Emotes 1: Item, Hmph, Victory
* Emotes 2: Hurt, Kneel, Collapse
* Emotes 3: !, ?, Music Note
* Emotes 4: Heart, Anger, Sweat
* Emotes 5: Cobweb, ..., Light Bulb
* Emotes 6: Sleep0, Sleep1, Sleep2
*
* ---
*
* ============================================================================
* Features: Weighted Random Movement
* ============================================================================
* 
* When creating events to place on the map, you can determine what type of
* autonomous movement the event will have. When selecting "Random", the event
* will move randomly across the map.
* 
* However, with the way "Random" movement works with the RPG Maker MZ default
* code, the event is more likely to hit a wall and then hug the said wall as
* it maps laps around the map's outer borders making it feel very unnatural
* for any player who's been on the map long enough.
* 
* This is where "Weighted Random Movement" comes in. It changes up the random
* movement behavior to function where the farther the event is, the more
* likely the event is to step back towards its "home" position (aka where it
* spawned upon loading the map). This is so that a housewife NPC doesn't
* suddenly wander off into the middle of an army's training grounds on the
* same town map.
* 
* The event will stay closer to its home value depending on how high the
* weight's value is. There are a number of ways to adjust the weighted value.
* 
* ---
* 
* Plugin Parameters > Movement > Event Movement > Random Move Weight
* 
* This Plugin Parameter setting allows you to set the default weight for all
* events with "Random" autonomous movement. It is set at a default value of
* 0.10 to give the event an understandable degree of freedom.
* 
* Lower numbers give events more freedom to move. Larger numbers will make the
* events stick closer to home.
* 
* Change this value to 0 to disable it.
* 
* ---
* 
* You can customize this individually per event by using Notetags and/or
* Comment Tags for the events.
* 
* <Random Move Weight: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If this tag is used on an event with random-type autonomous movement, then
*   the event will stick closer to their home location (where they are located
*   upon spawning on the map). How close they stick to their home location
*   will depend on the weighted 'x' value.
* - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
*   event more freedom when moving randomly while numbers closer to 1 cause
*   the event to stick closer to their home position.
* 
* <True Random Move>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If this tag is used on an event with random-type autonomous movement, then
*   that event will ignore the effects of weighted randomized movement.
* 
* ---
*
* ============================================================================
* Notetags and Comment Tags
* ============================================================================
*
* The following are notetags that have been added through this plugin. These
* notetags will not work with your game if this plugin is OFF or not present.
*
* Some of these are comment tags. Comment tags are used for events to mark and
* affect individual event pages rather than the whole event.
*
* === Map Notetags ===
*
* The following notetags are used for maps only. While some of these options
* are also available in the Plugin Parameters, some of these notetags extend
* usage to specific maps marked by these notetags as well.
*
* ---
*
* <Diagonal Movement: On>
* <Diagonal Movement: Off>
*
* - Used for: Map Notetags
* - Turns on/off diagonal movement for those maps.
* - If notetag isn't present, use Plugin Parameter setting.
*
* ---
*
* <type Allow Region: x>
* <type Allow Region: x, x, x>
*
* <type Forbid Region: x>
* <type Forbid Region: x, x, x>
*
* <type Dock Region: x>
* <type Dock Region: x, x, x>
*
* - Used for: Map Notetags
* - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
*   'Ship', or 'Airship'.
* - 'Allow' notetag variants allow that type to pass through them no matter
*   what other passability settings are in place.
* - 'Forbid' notetag variants forbid that type from passing through at all.
* - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
*   face the region direction while airships must land directly on top.
*
* ---
* 
* <Map Load Common Event: x>
* <Map Load Common Events: x, x, x>
* 
* - Used for: Map Notetags
* - When this map is loaded, run the specified Common Events once available.
*   - Does NOT trigger if you transfer to a different part of the same map.
* - Replace 'x' with a number representing the ID of the Common Event you wish
*   to reserve and run once ready.
* 
* ---
*
* <Save Event Locations>
*
* - Used for: Maps Notetags
* - Saves the locations of all events on the map so that when you return to
*   that map at a later point, the events will be in the position they were
*   last in.
*
* ---
* 
* <Hide Player>
* <Show Player>
* 
* - Used for: Map Notetags
* - Forcefully hides or shows the player sprite. This is so you don't need to
*   manually turn the setting on/off each time you enter a specific map.
* - These settings will take priority over the event commands.
* - If the player sprite is hidden, so are the player's followers.
* - If the player sprite is visible, the player's followers will still depend
*   on their settings.
* - These notetags are mutually exclusive from each other.
* 
* ---
* 
* <Hide Followers>
* <Show Followers>
* 
* - Used for: Map Notetags
* - Forcefully hides or shows the player's followers. This is so you don't
*   need to manually turn them on/off each time you enter a specific map.
* - These settings will take priority over the event commands.
* - These notetags are mutually exclusive from each other.
* 
* ---
* 
* === Page Comment Tags ===
* 
* The following comment tags are to be put inside of the pages of events,
* troops, and common events for them to work!
* 
* ---
* 
* <Page Conditions>
*   conditions
*   conditions
*   conditions
* </Page Conditions>
* 
* - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
* - This allows you to create custom page conditions that utilize the
*   Conditional Branch event command to see if the additional page conditions
*   are met.
* 
* ---
* 
* <Conditions Met>
* - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
* - If used between the <Page Conditions> and </Page Conditions> comment tag,
*   upon reaching this part of event command list, the custom page conditions
*   will be considered met.
* 
* ---
* 
* Example:
* 
* ◆Comment：<Page Conditions>
* ◆If：Reid has equipped Potion Sword
*   ◆Comment：If Reid has equipped the Potion Sword
* ：       ：<Condition Met>
*   ◆
* ：End
* ◆Comment：</Page Conditions>
* 
* If Reid has the "Potion Sword" weapon equipped, then the additional custom
* page conditions are met and the event page will be present/active.
* 
* If this is a troop condition, the troop page event will activate.
* 
* If this is a common event, there will be a parallel common event active.
* 
* ---
*
* === Event and Event Page Notetags ===
*
* The following notetags have comment tag variants (with a few exceptions).
* If a notetag is used for an event, it will affect the event constantly.
* If a comment tag is used, it will only affect the page the comment tag is
* on and only that page.
*
* ---
*
* <Activation Region: x>
* <Activation Regions: x,x,x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Allows this event to be remotely activated as long as the player is
*   standing within a tile marked by a designated region.
* - Replace 'x' with the regions you wish to remotely activate this event in.
*   - Action Button: Player must press OK while being in the region.
*   - Player/Event Touch: Player must step onto the region.
*   - Autorun/Parallel: Player be in the region.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* - NOTE: This cannot be used with any other activation tags.
*
* ---
*
* <Activation Square: x>
* <Activation Circle: x>
* <Activation Delta: x>
* <Activation Row: x>
* <Activation Column: x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Allows this event to be remotely activated as long as the player is
*   within range of its activation type.
* - Replace 'x' with a number stating the range in tiles.
*   - Square: A square-shaped range with the event at the center.
*   - Circle: A circle-shaped range with the event at the center.
*   - Delta: A diamond-shaped range with the event at the center.
*   - Row: Spans horizontally across the map. 'x' expands up and down.
*   - Column: Spans vertically across the map. 'x' expands left and right.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* - NOTE: This cannot be used with any other activation tags.
*
* ---
*
* <Always Update Movement>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Events normally have to be within screen range for them to update their
*   self movement. If this tag is present, the event is always updating.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Click Trigger>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Allows this event to activate upon being clicked on with the mouse.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Copy Event: Map x, Event y>
* <Copy Event: x, y>
*
* <Copy Event: template>
*
* - Used for: Event Notetags ONLY
* - Makes this event copy all of the event settings from a different event
*   that can be found on a different map (as long as that map is registered
*   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
* - Replace 'x' with a number representing the copied event's Map ID.
*   - If '0' is used for the Map ID, reference the current map.
* - Replace 'y' with a number representing the copied event's Event ID.
* - For the 'template' variant, replace 'template' with the name of the
*   template made in Plugin Parameters => Event Template Settings =>
*   Event Template List.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
*
* ---
* 
* <Custom Z: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Replace 'x' with a number value to determine the event sprite's Z value
*   relative to the tilemap.
* - For reference from rmmz_core.js:
*   - 0 : Lower tiles
*   - 1 : Lower characters
*   - 3 : Normal characters
*   - 4 : Upper tiles
*   - 5 : Upper characters
*   - 6 : Airship shadow
*   - 7 : Balloon
*   - 8 : Animation
*   - 9 : Destination
* - You can use numbers below 0 and above 9.
*   - Values under 0 go below the tilemap.
*   - Values above 9 go above everything else on the tilemap.
*   - These values do NOT go below or above other screen objects that are
*     NOT attached to the tilemap layer such as parallaxes or weather or
*     windows because that's simply not how z-axis work with sprite layers.
* 
* ---
* 
* <Encounter Half Square: x>
* <Encounter Half Circle: x>
* <Encounter Half Delta: x>
* <Encounter Half Row: x>
* <Encounter Half Column: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If the player is within the 'x' area effect of this event, the random
*   encounter rate will be halved.
* - Replace 'x' with a number stating the range in tiles.
*   - Square: A square-shaped range with the event at the center.
*   - Circle: A circle-shaped range with the event at the center.
*   - Delta: A diamond-shaped range with the event at the center.
*   - Row: Spans horizontally across the map. 'x' expands up and down.
*   - Column: Spans vertically across the map. 'x' expands left and right.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* Script Call Check:
* 
*   $isTileEncounterHalf(x, y)
* 
* - This can be used to check if a certain map tile (x, y) has an encounter
*   rate halving effect on it.
* - Returns a boolean (true or false) when used.
* 
* ---
* 
* <Encounter None Square: x>
* <Encounter None Circle: x>
* <Encounter None Delta: x>
* <Encounter None Row: x>
* <Encounter None Column: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If the player is within the 'x' area effect of this event, the random
*   encounter rate will be suppressed completely.
* - Replace 'x' with a number stating the range in tiles.
*   - Square: A square-shaped range with the event at the center.
*   - Circle: A circle-shaped range with the event at the center.
*   - Delta: A diamond-shaped range with the event at the center.
*   - Row: Spans horizontally across the map. 'x' expands up and down.
*   - Column: Spans vertically across the map. 'x' expands left and right.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* Script Call Check:
* 
*   $isTileEncounterNone(x, y)
* 
* - This can be used to check if a certain map tile (x, y) has an encounter
*   rate suppression effect on it.
* - Returns a boolean (true or false) when used.
* 
* ---
* 
* <Erase if Encounter Half>
* <Erase if Encounter None>
* 
* - Used for: Event Notetags ONLY
* - Automatically erase this event if the player's party has an encounter half
*   or encounter none effect, or if the event has spawned in an encounter half
*   or encounter none area.
* - This check only occurs in two situations: when the map is first loaded
*   after being teleported into or when the player leaves a menu and returns
*   back to the map.
* - Events that have been erased due to this effect will NOT return even if
*   the encounter half/none effect is removed while the player is still on the
*   map. The event will return if the player exits the map and comes back.
* 
* ---
* 
* <Exit Reset Self Data>
* 
* - Used for: Event Notetags ONLY
* - When the player leaves the current map, all Self Switches and Self
*   Variables related to this event will be reset.
* 
* ---
*
* <Hitbox Left: x>
* <Hitbox Right: x>
* <Hitbox Up: x>
* <Hitbox Down: x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Replace 'x' with a number to extend the hitbox of the event by that many
*   tiles towards the listed direction.
* - Use multiples of this notetag to extend them to different directions.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Icon: x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Replace 'x' with the Icon ID you wish to put above this event.
* - This will not override any Icons designated to the ID through a
*   Plugin Command.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Icon Buffer X: +x>
* <Icon Buffer X: -x>
*
* <Icon Buffer Y: +x>
* <Icon Buffer Y: -x>
*
* <Icon Buffer: +x, +y>
* <Icon Buffer: -x, -y>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Allows you to adjust the positions of the icon on the envent by buffers.
* - Replace 'x' and 'y' with the values to adjust the position buffers by.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Label: text>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Puts a label over the event's head displaying 'text'.
* - Text codes can be used.
*   - If text codes are used, avoid text codes that use < and > wrappers.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Label>
* text
* text
* </Label>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Puts a label over the event's head displaying 'text'.
* - This can display multiple lines.
* - Text codes can be used.
*   - You can use text codes with < and > wrappers.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Label Range: x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Sets a range requirement for the player to be in order for the event's
*   label to appear.
* - Replace 'x' with a number value depicting the range in tiles.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Label Offset X: +x>
* <Label Offset X: -x>
*
* <Label Offset Y: +x>
* <Label Offset Y: -x>
*
* <Label Offset: +x, +y>
* <Label Offset: -x, -y>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Allows you to adjust the positions of the label on the envent by offsets.
* - Replace 'x' and 'y' with the values to adjust the position offsets by.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
* 
* <Label Hue Shift: +x>
* <Label Hue Shift: -x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Changes the hue of the event label by +x or -x every frame.
*   - Keep in mind that since this is changing hue, this will appear to have
*     no effect if you are using black and white labels.
*   - Use labels with text codes that add color to them like '\C[4]text'
* - This only works with the sprite version of event labels and does not work
*   with the legacy version.
* 
* ---
* 
* <Location X: +x>
* <Location X: -x>
* 
* <Location Y: +x>
* <Location Y: -x>
* 
* <Location: +x, +y>
* <Location: +x, -y>
* <Location: -x, +y>
* <Location: -x, -y>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Adjusts the initial location of this event by +x and +y (or -x and -y).
* - This allows you to stack events on top of each other or even move them to
*   various places of the map.
* - Replace 'x' with a number that represents the horizontal tiles to adjust
*   the initial starting location by.
* - Replace 'y' with a number that represents the vertical tiles to adjust
*   the initial starting location by.
* 
* ---
* 
* <Mirror Sprite>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - The event sprite's visual appearance is mirrored.
* 
* ---
* 
* <Move Only Region: x>
* <Move Only Regions: x,x,x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Sets the move range of this event to only the region(s) marked by the
*   notetag(s) or comment tag(s).
* - This will bypass terrain passability.
* - This will not bypass event collision.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
*
* <Move Synch Target: Player>
*
* <Move Synch Target: Event x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Synchronizes the movement of this event with a target (either the player
*   or another event). This event will only move whenever the synchronized
*   target moves.
* - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Move Synch Type: Random>
* <Move Synch Type: Approach>
* <Move Synch Type: Away>
* <Move Synch Type: Custom>
*
* <Move Synch Type: Mimic>
* <Move Synch Type: Reverse Mimic>
*
* <Move Synch Type: Mirror Horizontal>
* <Move Synch Type: Mirror Vertical>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Choose the type of movement the event will have if it is synchronized to
*   a target.
*   - Random: Move to a random position.
*   - Approach: Approaches target.
*   - Away: Flees from target.
*   - Custom: Follows a custom move route.
*   - Mimic: Imitates the target's movement style.
*   - Reverse Mimic: Does the opposite of the target's movement.
*   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
*   - Mirror Vertical: Moves as if a mirror is placed vertically.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Move Synch Delay: x>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - If this tag is present, the event will wait a bit after each move before
*   moving again.
* - Replace 'x' with the number of movement instances in between.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
* 
* <Move Synch Distance Opacity: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Changes the opacity of the event based on the distance between it and its
*   move synched target. Closer means more opaque. Further away means more
*   transparent.
* - Replace 'x' with a number representing the opacity change per pixel
*   distance away. 'x' can use decimal values like 1.05 and 1.5.
* 
* ---
* 
* <Picture Filename: filename>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Applies a picture graphic from the /img/pictures/ folder of your project.
* - This graphic will be on top of the character sprite but below the event
*   icon sprite.
*   - The picture priority will be the same as the event's priority.
*   - If it is "below characters", the player can walk on top of it.
*   - If it is "above characters", the player will behind it.
*   - If it is "same as characters", the priority will be based on the
*     current relative Y position. This also means, if the picture is big
*     enough, it can clip into the top of tree tiles and such.
* - Replace 'filename' with a filename from the game project's /img/pictures/
*   folder. This is case sensitive. Do NOT include the file extension.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
* 
* <Picture Max Size: x>
* <Picture Scale: y%>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Used with <Picture Filename: filename> notetag.
* - If the "Max Size" or "Scale" supplementary notetags are used, the picture
*   graphic will be scaled proportionally to fit either the exact pixel size
*   for "Max Size" or the "Scale" ratio.
*   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
* - Replace 'x' with a number value representing the exact pixel size for the
*   "Max Size" notetag.
* - Replace 'y' with a number value representing the scale on which to shrink
*   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
*   double size.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
*
* <Picture Offset X: +x>
* <Picture Offset X: -x>
*
* <Picture Offset Y: +x>
* <Picture Offset Y: -x>
*
* <Picture Offset: +x, +y>
* <Picture Offset: -x, -y>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Used with <Picture Filename: filename> notetag.
* - Offsets the X and Y position of the event picture relative to the event
*   sprite's own position.
* - Replace 'x' and 'y' with numbers indicating the offset in pixels.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
* 
* <Picture Wait Frames: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Used with <Picture Filename: filename> notetag.
* - Requires VisuMZ_4_AnimatedPictures!
* - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
*   determines the delay inbetween frame changes.
* - Replace 'x' with a number representing the amount of frames to wait
*   inbetween frame changes.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
* 
* <Playtest>
* 
* - Used for: Event Notetags.
* - This does NOT work when it's in the Event Page Comment Tags.
* - If this notetag is found in the event's notebox (NOT comments), then the
*   event will only appear during a playtest session. It will not appear in a
*   deployed game where the playtest flag is not on.
* 
* ---
* 
* <Random Move Weight: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If this tag is used on an event with random-type autonomous movement, then
*   the event will stick closer to their home location (where they are located
*   upon spawning on the map). How close they stick to their home location
*   will depend on the weighted 'x' value.
* - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
*   event more freedom when moving randomly while numbers closer to 1 cause
*   the event to stick closer to their home position.
* 
* ---
* 
* <True Random Move>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - If this tag is used on an event with random-type autonomous movement, then
*   that event will ignore the effects of weighted randomized movement.
* 
* ---
*
* <Save Event Location>
*
* - Used for: Event Notetags ONLY
* - Saves the locations of the event on the map so that when you return to
*   that map at a later point, the event will be in the position it was
*   last in.
*
* ---
*
* <Hide Shadow>
* - Used for: Event Notetags and Event Page Comment Tags
* - Hides the shadow for the event.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
* 
* <Scale: x%>
* 
* <Scale X: x%>
* <Scale Y: y%>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Changes the scale of the sprite to the designated size.
* - For <Scale: x%> variant: replace 'x' with a number representing the
*   scaling overall percentage to be used.
* - For <Scale X: x%> variant, replace 'x' with a number representing the x
*   factor for the horizontal scaling percentage to be used.
* - For <Scale Y: y%> variant, replace 'y' with a number representing the y
*   factor for the vertical scaling percentage to be used.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
* 
* ---
*
* <Shadow Filename: filename>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Replaces the shadow graphic used with 'filename' found in the
*   img/system/ project folder.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Sprite Offset X: +x>
* <Sprite Offset X: -x>
*
* <Sprite Offset Y: +x>
* <Sprite Offset Y: -x>
*
* <Sprite Offset: +x, +y>
* <Sprite Offset: -x, -y>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Changes how much the event's sprite is visibly offset by.
* - Replace 'x' and 'y' with numbers indicating the offset in pixels.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
*
* <Step Pattern: Left to Right>
* <Step Pattern: Right to Left>
*
* <Step Pattern: Spin Clockwise>
* <Step Pattern: Spin CW>
*
* <Step Pattern: Spin CounterClockwise>
* <Step Pattern: Spin CCW>
* <Step Pattern: Spin AntiClockwise>
* <Step Pattern: Spin ACW>
*
* - Used for: Event Notetags and Event Page Comment Tags
* - Changes the way the event animates if a tag is present.
*   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
*     1 to 2, then back to 0 instead of looping backward.
*   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
*     1 to 0, then back to 2 instead of looping forward.
*   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
*   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
* - If this is placed in a notetag, the effect will be present across
*   all event pages used.
* - If this is placed inside a page's comment, the effect will only occur
*   if that event page is currently active.
*
* ---
* 
* <Tile Expand Up: x>
* <Tile Expand Down: x>
* <Tile Expand Left: x>
* <Tile Expand Right: x>
* 
* - Used for: Event Notetags and Event Page Comment Tags
* - Used for events with tile graphics. Expands the graphic up, down, left, or
*   right from the spritesheet.
*   - This does NOT expand the hitbox.
* - The graphic will be anchored to the tile it's expanded from. This means
*   even if you expanded downward, the actual event's position will still be
*   the current event's X/Y coordinates. It's just grown more vertically and
*   is still centered horizontally.
* - This is primarily used to save on having to use too many events for tiles
*   that expanded past 1x1 tile sizes.
* 
* ---
*
* ============================================================================
* Plugin Commands
* ============================================================================
*
* The following are Plugin Commands that come with this plugin. They can be
* accessed through the Plugin Command event command.
*
* ---
* 
* === Auto Movement Plugin Commands ===
* 
* ---
*
* Auto Movement: Events
* - Allow/stop events from auto movement.
*
*   Value:
*   - Allow events to move automatically?
*
* ---
* 
* === Call Event Plugin Commands ===
* 
* ---
*
* Call Event: Remote Read
* - Runs the page of a different event remotely.
* - This will run the page of the target event on the CURRENT event.
* - This means that any "This Event" commands will be applied to the event
*   using this Plugin Command and NOT the target event that page data is being
*   retrieved from.
* - Think of it as the current event using the target called event as a
*   Common Event ala how RPG Maker 2003 works (for those familiar with it).
*
*   Map ID:
*   - Target event's map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the event to remotely run.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Page ID:
*   - The page of the remote event to run.
*   - You may use JavaScript code.
*
* ---
* 
* === Dash Plugin Commands ===
* 
* ---
*
* Dash Enable: Toggle
* - Enable/Disable Dashing on maps.
*
*   Value:
*   - What do you wish to change dashing to?
*
* ---
* 
* === Event Icon Plugin Commands ===
* 
* ---
*
* Event Icon: Change (Temporary)
* - Change the icon that appears on an event.
* - This change is temporary and resets upon new events.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Icon Index:
*   - Icon index used for the icon.
*   - You may use JavaScript code.
*
*   Buffer X:
*   - How much to shift the X position by?
*   - You may use JavaScript code.
*
*   Buffer Y:
*   - How much to shift the Y position by?
*   - You may use JavaScript code.
*
*   Blend Mode:
*   - What kind of blend mode do you wish to apply to the icon sprite?
*
* ---
*
* Event Icon: Change (Forced)
* - Change the icon that appears on an event.
* - This change is forced and needs to be restored.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Icon Index:
*   - Icon index used for the icon.
*   - You may use JavaScript code.
*
*   Buffer X:
*   - How much to shift the X position by?
*   - You may use JavaScript code.
*
*   Buffer Y:
*   - How much to shift the Y position by?
*   - You may use JavaScript code.
*
*   Blend Mode:
*   - What kind of blend mode do you wish to apply to the icon sprite?
*
* ---
*
* Event Icon: Delete
* - Delete the icon that appears on an event.
* - This will remain deleted and invisible for events.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
* ---
* 
* Event Icon: Restore
* - Restores a deleted or forced icon that appears on an event.
* 
*   Map ID: 
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
* 
* ---
* 
* === Event Label Plugin Commands ===
* 
* ---
*
* Event Label: Refresh
* - Refresh all Event Labels on screen.
* - This is used to refresh page conditions for map changes that don't
*   force a refresh.
*
* ---
*
* Event Label: Visible
* - Change the visibility of Event Labels.
*
*   Visibility:
*   - What do you wish to change visibility to?
*
* ---
* 
* === Event Location Plugin Commands ===
* 
* ---
*
* Event Location: Save
* - Memorize an event's map location so it reappears there the next time the
*   map is loaded.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
* ---
*
* Event Location: Delete
* - Deletes an event's saved map location.
* - The event will reappear at its default location.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*   
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
* ---
*
* Event Location: Create
* - Creates a custom spawn location for a specific map's event so it appears
*   there the next time the map is loaded.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   X Coordinate:
*   - The X coordinate of the event.
*   - You may use JavaScript code.
*
*   Y Coordinate:
*   - The Y coordinate of the event.
*   - You may use JavaScript code.
*
*   Direction:
*   - The direction the event will be facing.
*
*   Optional:
*
*     Page ID:
*     - The page of the event to set the move route to.
*     - You may use JavaScript code.
*
*     Move Route Index:
*     - The point in the move route for this event to be at if the page ID
*       matches the rest of the page conditions.
*
* ---
* 
* === Event Popup Plugin Commands ===
* 
* ---
* 
* Event Popup: Player
* - Makes a centered event popup on the player sprite.
* - Requires VisuMZ_1_MessageCore!
* - Cannot be used in battle!
* 
*   Message Text:
*   - Insert the text to be displayed.
*   - Text codes can be used.
* 
*   Message Duration:
*   - What is the frame duration of the event popup?
*   - 60 frames = 1 second. You may use code.
* 
*   Popup Settings:
*   - These settings let you adjust how the popup animates.
*   - See "Popup Settings" section below.
* 
* ---
* 
* Event Popup: Follower
* - Makes a centered event popup on target follower sprite.
* - Requires VisuMZ_1_MessageCore!
* - Cannot be used in battle!
* 
*   Follower Index:
*   - Which follower index to play popup?
*   - Index starts at 0.
*   - You may use JavaScript code.
* 
*   Message Text:
*   - Insert the text to be displayed.
*   - Text codes can be used.
* 
*   Message Duration:
*   - What is the frame duration of the event popup?
*   - 60 frames = 1 second.
*   - You may use code.
* 
*   Popup Settings:
*   - These settings let you adjust how the popup animates.
*   - See "Popup Settings" section below.
* 
* ---
* 
* Event Popup: Event
* - Makes a centered event popup on target event sprite.
* - Requires VisuMZ_1_MessageCore!
* - Cannot be used in battle!
* 
*   Event ID:
*   - The ID of the event to play popup on.
*   - Use 0 for current event.
*   - You may use JavaScript code.
* 
*   Message Text:
*   - Insert the text to be displayed.
*   - Text codes can be used.
* 
*   Message Duration:
*   - What is the frame duration of the event popup?
*   - 60 frames = 1 second. You may use code.
* 
*   Popup Settings:
*   - These settings let you adjust how the popup animates.
*   - See "Popup Settings" section below.
* 
* ---
* 
* Event Popup: Target Tile
* - Makes a centered event popup on target tile.
* - Requires VisuMZ_1_MessageCore!
* - Cannot be used in battle!
* 
*   Map Tile X:
*   Map Tile Y:
*   - The x/y coordinate of the map tile.
*   - You may use JavaScript code.
* 
*   Message Text:
*   - Insert the text to be displayed.
*   - Text codes can be used.
* 
*   Message Duration:
*   - What is the frame duration of the event popup?
*   - 60 frames = 1 second. You may use code.
* 
*   Popup Settings:
*   - These settings let you adjust how the popup animates.
*   - See "Popup Settings" section below.
* 
* ---
* 
* Popup Settings
* 
*   Fade Settings:
* 
*     Fade In Duration:
*     - How many frames does it take to fade in?
*     - 60 frames = 1 second.
* 
*     Fade Out Duration:
*     - How many frames does it take to fade out?
*     - 60 frames = 1 second.
* 
*   Offset Settings:
* 
*     Starting Offset X:
*     - Offsets the starting x position.
*     - Negative: left. Positive: right.
*     - You may use code.
* 
*     Starting Offset Y:
*     - Offsets the starting y position. 
*     - Negative: up. Positive: down.
*     - You may use code.
* 
*     Ending Offset X:
*     - Offsets the ending x position. 
*     - Negative: left. Positive: right.
*     - You may use code.
* 
*     Ending Offset Y:
*     - Offsets the ending y position. 
*     - Negative: up. Positive: down.
*     - You may use code.
* 
*   Scaling Settings:
* 
*     Starting Scale X:
*     - What is the starting scale x?
*     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
*     - You may use code.
* 
*     Starting Scale Y:
*     - What is the starting scale y?
*     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
*     - You may use code.
* 
*     Ending Scale X:
*     - What is the ending scale x?
*     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
*     - You may use code.
* 
*     Ending Scale Y:
*     - What is the ending scale y?
*     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
*     - You may use code.
* 
*   Angle Settings:
* 
*     Starting Offset Angle:
*     - What is the starting angle offset?
*     - Use numbers between 0 and 360.
*     - You may use code.
* 
*     Ending Offset Angle:
*     - What is the ending angle offset?
*     - Use numbers between 0 and 360.
*     - You may use code.
* 
*   Misc Settings:
* 
*     Arc Peak:
*     - This is the height of the popup's trajectory arc in pixels.
*     - Positive: up. Negative: down.
*     - You may use code.
* 
* ---
* 
* === Event Timer Plugin Commands ===
* 
* ---
*
* Event Timer: Change Speed
* - Changes the timer frame decrease (or increase) speed.
*
*   Speed:
*   - How many 1/60ths of a second does each frame increase or decrease by?
*   - Negative decreases.
*   - Positive increases.
*   - JavaScript allowed.
*
* ---
*
* Event Timer: Expire Event Assign
* - Sets a Common Event to run upon expiration.
* - Bypasses the default code if one is set.
*
*   Common Event ID:
*   - Select the Common Event to run upon the timer's expiration.
*
* ---
*
* Event Timer: Expire Event Clear
* - Clears any set to expire Common Event and instead, run the default
*   Game_Timer expiration code.
*
* ---
*
* Event Timer: Frames Gain
* - Chooses how many frames, seconds, minutes, or hours are gained or lost for
*   the event timer.
*
*   Frames:
*   - How many 1/60ths of a second are gained/lost?
*   - Positive for gain.
*   - Negative for lost.
*   - JavaScript allowed.
*
*   Seconds:
*   - How many seconds are gained/lost?
*   - Positive for gain.
*   - Negative for lost.
*   - JavaScript allowed.
*
*   Minutes:
*   - How many minutes are gained/lost?
*   - Positive for gain.
*   - Negative for lost.
*   - JavaScript allowed.
*
*   Hours:
*   - How many hours are gained/lost?
*   - Positive for gain.
*   - Negative for lost.
*   - JavaScript allowed.
*
* ---
*
* Event Timer: Frames Set
* - Chooses how many frames, seconds, minutes, or hours are set for the event
*   timer.
*
*   Frames:
*   - Set frame count to this value.
*   - Each frame is 1/60th of a second.
*   - JavaScript allowed.
*
*   Seconds:
*   - Set seconds to this value.
*   - JavaScript allowed.
*
*   Minutes:
*   - Set minutes to this value.
*   - Each minute is 60 seconds.
*   - JavaScript allowed.
*
*   Hours:
*   - Set hours to this value.
*   - Each hour is 60 minutes.
*   - JavaScript allowed.
*
* ---
*
* Event Timer: Pause
* - Pauses the current event timer, but does not stop it.
*
* ---
*
* Event Timer: Resume
* - Resumes the current event timer from the paused state.
*
* ---
* 
* === Follower Control Plugin Commands ===
* 
* ---
*
* Follower: Set Global Chase
* - Disables all followers from chasing the player or reenables it.
*
*   Chase:
*   - Sets all followers to chase the player or not.
*
* ---
*
* Follower: Set Target Chase
* - Disables target follower from chasing the player or reenables it.
*
*   Follower ID:
*   - Select which follower ID to disable/reenable chasing for.
*
*   Chase:
*   - Sets target follower to chase its target or not.
*
* ---
*
* Follower: Set Control
* - Sets the event commands to target a follower when "Player" is selected as
*   the target.
*
*   Follower ID:
*   - Select which follower ID to control.
*   - 0 is the player.
*
* ---
*
* Follower: Reset
* - Resets all follower controls. Event Commands that target the "Player"
*   return to normal and followers chase again.
*
* ---
* 
* === Global Switch Plugin Commands ===
* 
* ---
* 
* Global Switch: Get Self Switch A B C D
* - Gets the current ON/OFF value from a Self Switch and stores it onto a
*   Global Switch.
* 
*   Map ID:
*   - The map the source map. Use 0 for current map.
*   - You may use JavaScript code.
* 
*   Event ID:
*   - The ID of the source event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
* 
*   Letter:
*   - Letter of the target event's Self Switch to obtain data from.
* 
*   -
* 
*   Target Switch ID:
*   - The ID of the target switch.
* 
* ---
* 
* Global Switch: Get Self Switch ID
* - Gets the current ON/OFF value from a Self Switch and stores it onto a
*   Global Switch.
* 
*   Map ID:
*   - The map the source map. Use 0 for current map.
*   - You may use JavaScript code.
* 
*   Event ID:
*   - The ID of the source event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
* 
*   Switch ID:
*   - The ID of the source switch.
* 
*   -
* 
*   Target Switch ID:
*   - The ID of the target switch.
* 
* ---
* 
* === Global Variable Plugin Commands ===
* 
* ---
* 
* Global Variable: Get Self Variable ID
* - Gets the current stored value from a Self Variable and stores it onto a
*   Global Variable.
* 
*   Map ID:
*   - The map the source map. Use 0 for current map.
*   - You may use JavaScript code.
* 
*   Event ID:
*   - The ID of the source event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
* 
*   Variable ID:
*   - The ID of the source variable.
* 
*   -
* 
*   Target Variable ID:
*   - The ID of the target variable.
* 
* ---
* 
* === Morph Event Plugin Commands ===
* 
* ---
*
* Morph Event: Change
* - Runs the page of a different event remotely.
*
*   Step 1:
*
*     Map ID:
*     - Target event's map. Use 0 for current map.
*     - You may use JavaScript code.
*
*     Event ID:
*     - The ID of the target event.
*     - Use 0 for current event.
*     - You may use JavaScript code.
*
*   Step 2:
*
*     Template Name:
*     - Name of the target event template to morph into.
*     - Ignored if this is called "Untitled".
*
*     Map ID:
*     - Target event's map. Use 0 for current map.
*     - You may use JavaScript code.
*
*     Event ID:
*     - The ID of the target event.
*     - Use 0 for current event.
*     - You may use JavaScript code.
*
*     Preserve Morph:
*     - Is the morph effect preserved?
*     - Or does it expire upon leaving the map?
*
* ---
*
* Morph Event: Remove
* - Remove the morph status of an event.
*
*   Map ID:
*   - Target event's map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the event to remotely run.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Remove Preservation:
*   - Also remove the preservation effect?
*
* ---
* 
* === Player Icon Plugin Commands ===
* 
* ---
*
* Player Icon: Change
* - Change the icon that appears on on the player.
*
*   Icon Index:
*   - Icon index used for the icon.
*   - You may use JavaScript code.
*
*   Buffer X:
*   - How much to shift the X position by?
*   - You may use JavaScript code.
*
*   Buffer Y:
*   - How much to shift the Y position by?
*   - You may use JavaScript code.
*
*   Blend Mode:
*   - What kind of blend mode do you wish to apply to the icon sprite?
*
* ---
*
* Player Icon: Delete
* - Delete the icon that appears on the player.
*
* ---
* 
* === Player Movement Plugin Commands ===
* 
* ---
* 
* Player Movement: Control
* - Enable or disable player control over the player character's movement.
* 
*   Enable?:
*   - Let the player control where the player character moves?
* 
* ---
* 
* Player Movement: Diagonal
* - Override settings to for player diagonal movement.
* 
*   Setting:
*   - How do you want to change diagonal movement?
*   - Default: Whatever the Map Uses
*   - Forcefully Disable Diagonal Movement
*   - Forcefully Enable Diagonal Movement
* 
* ---
* 
* === Self Data Plugin Commands ===
* 
* ---
* 
* Self Data: Reset All
* - Reset the Self Switch and Self Variable data of all events within the
*   specified map.
* 
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
* 
* ---
* 
* === Self Switch Plugin Commands ===
* 
* ---
*
* Self Switch: A B C D
* - Change the Self Switch of a different event.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Letter:
*   - Letter of the target event's Self Switch to change.
*
*   Value:
*   - What value do you want to set the Self Switch to?
*
* ---
*
* Self Switch: Switch ID
* - Change the Self Switch of a different event.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Switch ID:
*   - The ID of the target switch.
*
*   Value:
*   - What value do you want to set the Self Switch to?
*
* ---
* 
* === Self Variable Plugin Commands ===
* 
* ---
*
* Self Variable: Variable ID
* - Change the Self Variable of a different event.
*
*   Map ID:
*   - The map the target map. Use 0 for current map.
*   - You may use JavaScript code.
*
*   Event ID:
*   - The ID of the target event.
*   - Use 0 for current event.
*   - You may use JavaScript code.
*
*   Variable ID:
*   - The ID of the target variable.
*
*   Value:
*   - What value do you want to set the Self Switch to?
*
* ---
* 
* === Spawn Event Plugin Commands ===
* 
* ---
*
* Spawn Event: Spawn At X, Y
* - Spawns desired event at X, Y location on the current map.
*
*   Step 1:
*
*     Template Name:
*     - Name of the target event template to spawn as.
*     - Ignored if this is called "Untitled".
*
*     Map ID:
*     - Target event's map to be used as reference.
*     - You may use JavaScript code.
*
*     Event ID:
*     - The ID of the target event to be used as reference.
*     - You may use JavaScript code.
*
*   Step 2:
*
*     X Coordinate:
*     - Target Location to spawn at.
*     - You may use JavaScript code.
*
*     Y Coordinate:
*     - Target Location to spawn at.
*     - You may use JavaScript code.
*
*     Check Event Collision:
*     - Check collision with any other events and player?
*
*     Check Passability:
*     - Check passability of the target location.
*
*     Preserve Spawn:
*     - Is the spawned event preserved?
*     - Or does it expire upon leaving the map?
*
*   Step 3:
*
*     Success Switch ID:
*     - Target switch ID to record spawning success.
*     - Ignore if ID is 0. OFF means failed. ON means success.
*
* ---
*
* Spawn Event: Spawn At Region
* - Spawns desired event at a random region-marked location on the
*   current map.
*
*   Step 1:
*
*     Template Name:
*     - Name of the target event template to spawn as.
*     - Ignored if this is called "Untitled".
*
*     Map ID:
*     - Target event's map to be used as reference.
*     - You may use JavaScript code.
*
*     Event ID:
*     - The ID of the target event to be used as reference.
*     - You may use JavaScript code.
*
*   Step 2:
*
*     Region ID(s):
*     - Pick region(s) to spawn this event at.
*
*     Check Event Collision:
*     - Check collision with any other events and player?
*
*     Check Passability:
*     - Check passability of the target location.
*
*     Preserve Spawn:
*     - Is the spawned event preserved?
*     - Or does it expire upon leaving the map?
*
*   Step 3:
*
*     Success Switch ID:
*     - Target switch ID to record spawning success.
*     - Ignore if ID is 0. OFF means failed. ON means success.
*
* ---
*
* Spawn Event: Spawn At Terrain Tag
* - Spawns desired event at a random terrain tag-marked location on the
*   current map.
*
*   Step 1:
*
*     Template Name:
*     - Name of the target event template to spawn as.
*     - Ignored if this is called "Untitled".
*
*     Map ID:
*     - Target event's map to be used as reference.
*     - You may use JavaScript code.
*
*     Event ID:
*     - The ID of the target event to be used as reference.
*     - You may use JavaScript code.
*
*   Step 2:
*
*     Terrain Tag(s):
*     - Pick terrain tag(s) to spawn this event at.
*     - Insert numbers between 0 and 7.
*
*     Check Event Collision:
*     - Check collision with any other events and player?
*
*     Check Passability:
*     - Check passability of the target location.
*
*     Preserve Spawn:
*     - Is the spawned event preserved?
*     - Or does it expire upon leaving the map?
*
*   Step 3:
*
*     Success Switch ID:
*     - Target switch ID to record spawning success.
*     - Ignore if ID is 0. OFF means failed. ON means success.
*
* ---
*
* Spawn Event: Despawn Event ID
* - Despawns the selected Event ID on the current map.
*
*   Event ID
*   - The ID of the target event.
*   - You may use JavaScript code.
*
* ---
*
* Spawn Event: Despawn At X, Y
* - Despawns any spawned event(s) at X, Y location on the current map.
*
*   X Coordinate:
*   - Target Location to despawn at.
*   - You may use JavaScript code.
*
*   Y Coordinate:
*   - Target Location to despawn at.
*   - You may use JavaScript code.
*
* ---
*
* Spawn Event: Despawn Region(s)
* - Despawns the selected Region(s) on the current map.
*
*   Region ID(s):
*   - Pick region(s) and despawn everything inside it.
*
* ---
*
* Spawn Event: Despawn Terrain Tag(s)
* - Despawns the selected Terrain Tags(s) on the current map.
*
*   Terrain Tag(s):
*   - Pick terrain tag(s) and despawn everything inside it.
*   - Insert numbers between 0 and 7.
*
* ---
*
* Spawn Event: Despawn Everything
* - Despawns all spawned events on the current map.
*
* ---
*
* ============================================================================
* Move Route Custom Commands
* ============================================================================
*
* Some custom commands have been added to the "Set Movement Route" event
* command. These can be accessed by pressing the "Script..." command and
* typing in the following, which don't need to be in code form.
*
* Keep in mind that since these are custom additions and RPG Maker MZ does not
* allow plugins to modify the editor, the "Preview" button will not factor in
* the effects of these commands.
* 
* If you wish to use a value from a variable, insert $gameVariables.value(x)
* or \V[x] in place of the x in any of the below.
* 
* If you wish to use a value from a self variable, insert \SelfVar[x] in place
* of the x in any of the below. This will only draw from the current event. If
* you wish to draw data from outside event self variables, we recommend you
* use the \V[x] variant after using the Plugin Commands to draw data from them
* for the best accuracy.
*
* ---
* 
* Animation: x
* - Replace 'x' with the ID of the animation to play on moving unit.
*
* ---
* 
* Balloon: name
* - Replace 'name' with any of the following to play a balloon on that the
*   target moving unit.
* - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
*   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
*   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
*    - Do NOT insert quotes.
* - Examples:
*   - Balloon: !
*   - Balloon: Sleep
*   - Balloon: Heart
*
* ---
* 
* Fade In: x
* Fade Out: x
* - Fades in/out the sprite's opacity.
* - Fade In will continuously raise the opacity level until it reaches 255.
* - Fade Out will continuously lower the opacity level until it reaches 0.
* - Replace 'x' with the speed to fade in/out the sprite.
* 
* ---
* 
* Force Carry: On
* Force Carry: Off
* - For usage with the VS8 sprite sheet.
* - Use ON to turn force carrying on.
* - Use OFF to turn force carrying off.
* - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
* 
* ---
* 
* Force Dash: On
* Force Dash: Off
* - Use ON to turn force dashing on.
* - Use OFF to turn force dashing off.
* - Forces dashing will prompt the player or event to be in the dashing state.
* - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
* 
* ---
* 
* Hug: Left
* Hug: Right
* - Causes the moving unit to hug the left/right side of the wall.
*
* ---
* 
* Index: x
* - Replace 'x' with a number depicting the character index to change the
*   moving unit's sprite to.
*
* ---
* 
* Index: +x
* Index: -x
* - Replace 'x' with the value to change the character index of the moving
*   unit's sprite by.
*
* ---
* 
* Jump Forward: x
* - Replace 'x' with the number of tiles for the unit to jump forward by.
*
* ---
* 
* Jump To: x, y
* - Replace 'x' and 'y' with the coordinates for the unit to jump to.
*
* ---
* 
* Jump to Event: x
* - Replace 'x' with the ID of the event for the unit to jump to.
*
* ---
* 
* Jump to Player
* - Causes the moving unit to jump to the player.
*
* ---
* 
* Jump To Home
* - Causes the event to jump to its home position.
* - This only works on events, not player characters or followers.
* 
* ---
* 
* Move Lower Left Until Stop
* Move Down Until Stop
* Move Lower Right Until Stop
* Move Left Until Stop
* Move Right Until Stop
* Move Upper Left Until Stop
* Move Up Until Stop
* Move Upper Right Until Stop
* - Causes the moving unit to move that direction until it hits a stop.
* - Events will stop moving before they make contact with the player.
*
* ---
* 
* Crash Move Lower Left Until Stop
* Crash Move Down Until Stop
* Crash Move Lower Right Until Stop
* Crash Move Left Until Stop
* Crash Move Right Until Stop
* Crash Move Upper Left Until Stop
* Crash Move Up Until Stop
* Crash Move Upper Right Until Stop
* - Causes the moving unit to move that direction until it hits a stop.
* - Events can crash into the player and trigger an event.
*
* ---
* 
* Move To: x, y
* - Replace 'x' and 'y' with the map coordinates to move the unit to through
*   pathfinding.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* - Events will go around the player.
*
* ---
* 
* Crash Move To: x, y
* - Replace 'x' and 'y' with the map coordinates to move the unit to through
*   pathfinding.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* - Events can crash into the player and trigger an event.
*
* ---
* 
* Move to Event: x
* - Replace 'x' with the ID of the event to move the unit to.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* - Events will go around the player.
*
* ---
* 
* Crash Move to Event: x
* - Replace 'x' with the ID of the event to move the unit to.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* - Events can crash into the player and trigger an event.
*
* ---
* 
* Move to Player
* - Moves the unit to the player.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Move to Home
* - Moves the unit towards their home position on the map.
* - This only works on events, not player characters or followers.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* 
* ---
* 
* Crash Move to Home
* - Moves the unit towards their home position on the map.
* - This only works on events, not player characters or followers.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* - Events can crash into the player and trigger an event.
* 
* ---
* 
* Move Lower Left: x
* Move Down: x
* Move Lower Right: x
* Move Left: x
* Move Right: x
* Move Upper Left: x
* Move Up: x
* Move Upper Right: x
* - Replace 'x' with the number of times to move the unit by in the designated
*   direction on the map.
* - Events can crash into the player and trigger an event.
*
* ---
* 
* Opacity: x%
* - Replace 'x' with the percentage to change the unit's sprite opacity to.
*
* ---
* 
* Opacity: +x
* Opacity: -x
* - Replace 'x' with the increment to change the unit's sprite opacity by.
*
* ---
*
* Pattern Lock: x
* - Replace 'x' with the step pattern to lock the unit's sprite to.
*
* ---
*
* Pattern Unlock
* - Removes pattern lock effect.
*
* ---
* 
* Pose: name
* - If using a VS8 sprite, this will cause the unit to strike a pose.
* - Replace 'name' with any the following:
* - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
*   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
*   'Light Bulb', 'Sleep'
*    - Do NOT insert quotes.
* - Examples:
*   - Balloon: Item
*   - Balloon: Victory
*   - Balloon: ?
*
* ---
* 
* Step Toward: x, y
* - Replace 'x' and 'y' for the desired coordinates for the unit to take one
*   step towards.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Toward Event: x
* - Replace 'x' with the ID of the event for the unit to take one step to.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Toward Player
* - Causes event to take one step towards the player.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Toward Home
* - Causes the event to take one step towards its home position.
* - This only works on events, not player characters or followers.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* 
* ---
* 
* Step Away From: x, y
* - Replace 'x' and 'y' for the desired coordinates for the unit to take one
*   step away from.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Away From Event: x
* - Replace 'x' with the ID of the event for the unit to take one step from.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Away From Player
* - Causes event to take one step away from the player.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
*
* ---
* 
* Step Away From Home
* - Causes the event to take one step away from its home position.
* - This only works on events, not player characters or followers.
* - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
*   not expect the most optimal results.
* 
* ---
* 
* Turn To: x, y
* - Replace 'x' and 'y' for the coordinates to make the unit face towards.
* - This supports 8 directional turning.
*
* ---
* 
* Turn to Event: x
* - Replace 'x' with the ID of the event to turn the unit towards.
* - This supports 8 directional turning.
*
* ---
* 
* Turn to Player
* - Causes the unit to turn towards the player.
* - This supports 8 directional turning.
*
* ---
* 
* Turn to Home
* - Causes the event to turn towards its home position.
* - This refers to the original position's X/Y on the map.
* - The event will turn and face the tile that is its original X/Y location.
* - This only works on events, not player characters or followers.
* 
* ---
* 
* Turn Away From: x, y
* - Replace 'x' and 'y' for the coordinates to make the unit face away from.
* - This supports 8 directional turning.
*
* ---
* 
* Turn Away From Event: x
* - Replace 'x' with the ID of the event to turn the unit away from.
* - This supports 8 directional turning.
*
* ---
* 
* Turn Away From Player
* - Causes the unit to turn away from the player.
* - This supports 8 directional turning.
*
* ---
* 
* Turn Away From Home
* - Causes the event to turn away from its home position.
* - This only works on events, not player characters or followers.
* 
* ---
* 
* Turn Lower Left
* Turn Lower Right
* Turn Upper Left
* Turn Upper Right
* - Causes the unit to turn to one of the diagonal directions.
*
* ---
* 
* Self Switch x: On
* Self Switch x: Off
* Self Switch x: Toggle
* - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
*   unit's Self Switch.
*
* ---
* 
* Self Variable x: y
* - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
* - Replace 'y' with a number value to set the Self Variable to.
*
* ---
* 
* Teleport To: x, y
* - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
*
* ---
* 
* Teleport to Event: x
* - Replace 'x' with the ID of the event to instantly move the unit to.
*
* ---
* 
* Teleport to Player
* - Instantly moves the unit to the player's location.
*
* ---
* 
* Teleport to Home
* - Instantly teleports an event to its home position on the map.
* - This only works on events, not player characters or followers.
* 
* ---
* 
* If none of the commands are detected above, then a script call will be ran.
*
* ---
*
* ============================================================================
* Plugin Parameters: Event Label Settings
* ============================================================================
*
* Event Labels are small windows created to display text over an event's head.
* They're set up using the <Label> notetags and/or comment tags. Event Labels
* are a great way to instantly relay information about the event's role to
* the player.
*
* ---
*
* Event Labels
* 
*   Sprite Based?:
*   - Use sprite-based labels instead of legacy-window version.
*   - Legacy-window version will not be supported in future.
*   - Sprite-based labels are more memory efficient and work better
*     compatibility-wise.
* 
*   Mobile-Enabled?:
*   - Enable event labels for mobile devices?
* 
*   Font Size:
*   - The font size used for the Event Labels.
* 
*   Icon Size:
*   - The size of the icons used in the Event Labels.
* 
*   Line Height:
*   - The line height used for the Event Labels.
* 
*   Offset X:
*   - Globally offset all labels horizontally by this amount.
* 
*   Offset Y:
*   - Globally offset all labels vertically by this amount.
* 
*   Fade Speed:
*   - Fade speed for labels.
* 
*   Visible Range:
*   - Range the player has to be within the event to make its label visible.
*
* ---
*
* ============================================================================
* Plugin Parameters: Event Icon Settings
* ============================================================================
*
* Icons can be displayed over an event's head through the <Icon> notetags
* and/or comment tags. These can be used for a variety of things such as
* making them look like they're carrying an item or to indicate they have a
* specific role.
*
* ---
*
* Event Icon
* 
*   Buffer X:
*   - Default X position buffer for event icons.
* 
*   Buffer Y:
*   - Default Y position buffer for event icons.
* 
*   Blend Mode:
*   - Default blend mode for even icons.
*     - 0 - Normal
*     - 1 - Additive
*     - 2 - Multiply
*     - 3 - Screen
*
* ---
*
* ============================================================================
* Plugin Parameters: Event Template Settings
* ============================================================================
*
* Event Templates allow you to store specific maps and/or event data to bring
* out on need while having a premade set base. They're similar to prefabs but
* aren't things that can be altered individually as one setting for an event
* template will serve as a blueprint for all of them that use them.
*
* Event Templates are used for the <Copy Event> notetags, the Morph Event and
* Spawn Event Plugin Commands.
*
* ---
*
* Settings
* 
*   Preloaded Maps:
*   - A list of all the ID's of the maps that will be preloaded to serve as
*     template maps for this plugin.
*
* ---
*
* Templates
* - A list of all the Event Templates used by this project. Used for notetags
*   and Plugin Commands.
* 
*     Name:
*     - Name of the template. It'll be used as anchor points for notetags and
*       Plugin Commands.
* 
*     Map ID:
*     - ID of the map the template event is stored on.
*     - This will automatically add this ID to preloaded list.
* 
*     Event ID:
*     - ID of the event the template event is based on.
* 
*     JavaScript:
*       JS: Pre-Copy:
*       JS: Post-Copy:
*       JS: Pre-Morph:
*       JS: Post-Morph:
*       JS: Pre-Spawn:
*       JS: Post-Spawn:
*       - Code that's ran during certain circumstances.
*       - The code will occur at the same time as the ones listed in the main
*         Event Template Settings Plugin Parameters. However, the ones listed
*         in these individual entries will only occur for these specific
*         templates and only if the templates are used.
*
* ---
*
* JavaScript
* 
*   JS: Pre-Copy:
*   JS: Post-Copy:
*   JS: Pre-Morph:
*   JS: Post-Morph:
*   JS: Pre-Spawn:
*   JS: Post-Spawn:
*   - Code that's ran during certain circumstances.
*   - These are global and are ran for all copies, morphs, and/or spawns.
*
* ---
*
* ============================================================================
* Plugin Parameters: Movement Settings
* ============================================================================
*
* These plugin parameters allow you to control how movement works in your
* game, toggling it from 4-directional to 8-directional, setting up rules to
* stop self-movement from events while an event or message is present, and
* other aesthetics such as tilting the sprite while dashing, setting shadows
* beneath the sprites, and allow for turning in place.
*
* ---
*
* 8 Directional Movement
* 
*   Enable:
*   - Allow 8-directional movement by default? Players can move diagonally.
* 
*   Strict Collision:
*   - Enforce strict collission rules where the player must be able to pass
*     both cardinal directions?
* 
*   Favor Horizontal:
*   - Favor horizontal if cannot pass diagonally but can pass both
*     horizontally and vertically?
* 
*   Slower Diagonals?
*   - Enforce a slower movement speed when moving diagonally?
* 
*     Speed Multiplier
*     - What's the multiplier to adjust movement speed when moving diagonally?
*
* ---
*
* Automatic Movement
* 
*   Stop During Events:
*   - Stop automatic event movement while events are running.
* 
*   Stop During Messages:
*   - Stop automatic event movement while a message is running.
*
* ---
* 
* Bitmap
* 
*   Smoothing:
*   - Do you want to smooth or pixelate the map sprites?
*   - Pixelating them is better for zooming and tilting.
* 
* ---
*
* Dash
* 
*   Dash Modifier:
*   - Alters the dash speed modifier.
* 
*   Dash on Ladder?
*   - Allow dashing while on a ladder or rope?
* 
*   Enable Dash Tilt?:
*   - Tilt any sprites that are currently dashing?
* 
*     Tilt Left Amount:
*     - Amount in radians when moving left (upper left, left, lower left).
* 
*     Tilt Right Amount:
*     - Amount in radians when moving right (upper right, right, lower right).
* 
*     Tilt Vertical Amount:
*     - Amount in radians when moving vertical (up, down).
*
* ---
* 
* Event Movement
* 
*   Random Move Weight:
*   - Use numbers between 0 and 1.
*   - Numbers closer to 1 stay closer to their home position.
*   - 0 to disable it.
* 
*   Shift Y:
*   - How many pixels should non-tile characters be shifted by?
*   - Negative: up. Positive: down.
* 
* ---
* 
* Path Finding
* 
*   Mobile-Enabled?:
*   - Enable diagonal pathfinding for mobile devices?
* 
* ---
*
* Shadows
* 
*   Show:
*   - Show shadows on all events and player-related sprites.
* 
*   Default Filename:
*   - Default filename used for shadows found in img/system/ folder.
*
* ---
*
* Turn in Place
* 
*   Enable:
*   - When not dashing, player will turn in place before moving.
*   - This only applies with keyboard inputs.
* 
*   Delay in Frames:
*   - The number of frames to wait before moving.
*
* ---
* 
* Vehicle Speeds
* 
*   Boat Speed:
*   - Allows you to adjust the base speed of the boat vehicle.
* 
*   Ship Speed:
*   - Allows you to adjust the base speed of the ship vehicle.
* 
*   Airship Speed:
*   - Allows you to adjust the base speed of the airship vehicle.
* 
* ---
* 
* Wall Bump
* 
*   Enable?:
*   - Enable the sound effect to be played when bumping into a wall?
* 
* ---
*
* ============================================================================
* Plugin Parameters: VisuStella 8-Dir Settings
* ============================================================================
*
* These are settings for sprite sheets using the VS8 format.
* For more information on the VS8 format, look in the help section above.
*
* ---
*
* Balloon Icon Settings
* 
*   Auto-Balloon Poses:
*   - Automatically pose VS8 sprites when using balloon icons.
* 
*   Balloon Offset X:
*   - Offset balloon icons on VS8 sprites by x pixels.
* 
*   Balloon Offset Y:
*   - Offset balloon icons on VS8 sprites by y pixels.
*
* ---
*
* Icons
* 
*   Auto Buffer:
*   - Automatically buffer the X and Y coordinates of VS8 sprites?
* 
*   Use Carry Pose:
*   - Use the carry pose when moving with an icon overhead.
*
* ---
*
* ============================================================================
* Plugin Parameters: Region Rulings
* ============================================================================
*
* These settings allow you to decide the passability of the player, events,
* and various vehicles through the usage of Regions.
*
* ---
*
* Allow Regions
* 
*   All Allow:
*   Walk Allow:
*   Player Allow:
*   Event Allow:
*   Vehicle Allow:
*   Boat Allow:
*   Ship Allow:
*   Airship Allow:
*   - Insert Region ID's where the affected unit type can enter.
*   - Region ID's range from 0 to 255.
*
* ---
*
* Forbid Regions
* 
*   All Forbid:
*   Walk Forbid:
*   Player Forbid:
*   Event Forbid:
*   Vehicle Forbid:
*   Boat Forbid:
*   Ship Forbid:
*   Airship Forbid:
*   - Insert Region ID's where the affected unit type cannot enter.
*   - Region ID's range from 0 to 255.
*
* ---
*
* Dock Regions
* 
*   Vehicle Dock:
*   Boat Dock:
*   Ship Dock:
*   Airship Dock:
*   - Insert Region ID's where the affected vehicle can dock
*   - Region ID's range from 0 to 255.
* 
*   Only Region Dockable:
*   - Vehicles are only able to dock at designated regions.
*
* ---
*
* ============================================================================
* Plugin Parameters: Common Event on OK Button
* ============================================================================
*
* These Plugin Parameters allow you to setup Common Events that activate using
* Regions when pressing the OK button while standing on top of them or in
* front of them. These let you create near universally interactable objects
* using Regions, such as rivers to start up fishing events or locations to
* places items on.
*
* ---
*
* Regions
* 
*   Regions 1 - 255:
*   - Which Common Event does this region activate?
*   - Use 0 to not activate any Common Events.
*
* ---
*
* Target Tile
* 
*   Target Tile:
*   - Which tile should be checked for Common Event on OK Button?
*     - Tile in front of player.
*     - Tile player is standing on top of.
*
* ---
*
* ============================================================================
* Plugin Parameters: Common Event on Touch
* ============================================================================
*
* These Plugin Parameters allow you to setup Common Events that trigger when
* stepping onto Region-marked tiles. These let you create custom effects that
* will occur such as customized damage floors, traps, and/or events.
* 
* Areas marked with these regions will not allow random encounters to occur.
* This is how RPG Maker works. Assuming you are not using plugins at all, by
* putting on touch events all over the map, tiles with those on touch events
* will not let random encounters trigger.
*
* ---
*
* Regions
* 
*   Regions 1 - 255:
*   - Which Common Event does this region activate?
*   - Use 0 to not activate any Common Events.
*
* ---
*
* ============================================================================
* Plugin Parameters: Terrain Tag Settings
* ============================================================================
*
* Terrain Tags are used in Database => Tilesets to mark certain tiles and
* give them unique properties through terrain tags.
*
* ---
*
* Terrain Tag ID's
* 
*   Rope:
*   - Which terrain tag number to use for ropes?
*
* ---
*
* ============================================================================
* Terms of Use
* ============================================================================
*
* 1. These plugins may be used in free or commercial games provided that they
* have been acquired through legitimate means at VisuStella.com and/or any
* other official approved VisuStella sources. Exceptions and special
* circumstances that may prohibit usage will be listed on VisuStella.com.
* 
* 2. All of the listed coders found in the Credits section of this plugin must
* be given credit in your games or credited as a collective under the name:
* "VisuStella".
* 
* 3. You may edit the source code to suit your needs, so long as you do not
* claim the source code belongs to you. VisuStella also does not take
* responsibility for the plugin if any changes have been made to the plugin's
* code, nor does VisuStella take responsibility for user-provided custom code
* used for custom control effects including advanced JavaScript notetags
* and/or plugin parameters that allow custom JavaScript code.
* 
* 4. You may NOT redistribute these plugins nor take code from this plugin to
* use as your own. These plugins and their code are only to be downloaded from
* VisuStella.com and other official/approved VisuStella sources. A list of
* official/approved sources can also be found on VisuStella.com.
*
* 5. VisuStella is not responsible for problems found in your game due to
* unintended usage, incompatibility problems with plugins outside of the
* VisuStella MZ library, plugin versions that aren't up to date, nor
* responsible for the proper working of compatibility patches made by any
* third parties. VisuStella is not responsible for errors caused by any
* user-provided custom code used for custom control effects including advanced
* JavaScript notetags and/or plugin parameters that allow JavaScript code.
*
* 6. If a compatibility patch needs to be made through a third party that is
* unaffiliated with VisuStella that involves using code from the VisuStella MZ
* library, contact must be made with a member from VisuStella and have it
* approved. The patch would be placed on VisuStella.com as a free download
* to the public. Such patches cannot be sold for monetary gain, including
* commissions, crowdfunding, and/or donations.
*
* ============================================================================
* Credits
* ============================================================================
* 
* If you are using this plugin, credit the following people in your game:
* 
* Team VisuStella
* * Yanfly
* * Arisu
* * Olivia
* * Irina
*
* ============================================================================
* Changelog
* ============================================================================
* 
* Version 1.59: June 13, 2024
* * Bug Fixes!
* ** Added a cache check for character sprite tag names to reduce frame drops.
*    Fix made by Arisu.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New notetags added by Arisu:
* *** <Location X: +x>, <Location X: -x>
* *** <Location Y: +y>, <Location Y: -y>
* *** <Location: +x, +y>, <Location: +x, -y>
* *** <Location: -x, +y>, <Location: -x, -y>
* **** Adjusts the initial location of this event by +x and +y (or -x and -y).
* **** This allows you to stack events on top of each other or even move them
*      to various places of the map.
* *** <Tile Expand Up: x>
* *** <Tile Expand Down: x>
* *** <Tile Expand Left: x>
* *** <Tile Expand Right: x>
* **** Used for events with tile graphics. Expands the graphic up, down, left,
*      or right from the spritesheet.
* **** This does NOT expand the hitbox.
* **** The graphic will be anchored to the tile it's expanded from. This means
*      even if you expanded downward, the actual event's position will still
*      be the current event's X/Y coordinates. It's just grown more vertically
*      and is still centered horizontally.
* **** This is primarily used to save on having to use too many events for
*      tiles that expanded past 1x1 tile sizes.
* 
* Version 1.58: May 16, 2024
* * Documentation Update!
* ** Added "Features: Character Sprite Filename Tags" section.
* * New Features!
* ** [Invisible] tag added to character sprite filenames.
* *** If a character sprite's filename has [invisible] in it, it will become
*     invisible on the map screen in-game while almost everything else about
*     it is visible. This is used for those who wish to use sprite labels for
*     things such as autorun and parallel events.
* 
* Version 1.57: March 14, 2024
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
*    until the newly added Plugin Command: "Event Icon: Restore" is used.
*    Update made by Arisu.
* ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
*    after its name in order to clarify the temporary changes made to it.
* * New Features!
* ** New Plugin Command added by Arisu:
* *** Event Icon: Event Icon: Change (Forced)
* **** Change the icon that appears on an event.
* **** This change is forced and needs to be restored.
* *** Event Icon: Restore
* **** Restores a deleted or forced icon that appears on an event.
* 
* Version 1.56: February 15, 2024
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** Added fail safes for activation proximity notetags when loaded from past
*    save files without Events and Movement Core installed. Added by Arisu.
* * New Features!
* ** New notetags added by Arisu:
* *** <Encounter Half Square: x>
* *** <Encounter Half Circle: x>
* *** <Encounter Half Delta: x>
* *** <Encounter Half Row: x>
* *** <Encounter Half Column: x>
* *** <Encounter None Square: x>
* *** <Encounter None Circle: x>
* *** <Encounter None Delta: x>
* *** <Encounter None Row: x>
* *** <Encounter None Column: x>
* **** If the player is within the 'x' area effect of this event, the random
*      encounter rate will be halved or suppressed completely depending on the
*      notetag used.
* **** These include script call checks.
* *** <Erase if Encounter Half>
* *** <Erase if Encounter None>
* **** Automatically erase this event if the player's party has an encounter
*      half or encounter none effect, or if the event has spawned in an
*      encounter half or encounter none area.
* **** This check only occurs in two situations: when the map is first loaded
*      after being teleported into or when the player leaves a menu and
*      returns back to the map.
* **** Events that have been erased due to this effect will NOT return even if
*      the encounter half/none effect is removed while the player is still on
*      the map. The event will return if the player exits the map and comes
*      back.
* 
* Version 1.55: December 14, 2023
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Commands added by Arisu:
* *** Event Popup: Player
* *** Event Popup: Follower
* *** Event Popup: Event
* *** Event Popup: Target Tile
* **** Makes a centered event popup on the player sprite, target follower
*      sprite, target event sprite, or target tile.
* **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
*      cannot be used in battle.
* 
* Version 1.54: October 12, 2023
* * Documentation Update!
* ** Help file updated for new features.
* ** Help file updated to reduce confusion:
* *** Call Event: Remote Read
* **** This will run the page of the target event on the current event.
* **** This means that any "This Event" commands will be applied to the event
*      using this Plugin Command and NOT the target event that page data is
*      being retrieved from.
* **** Think of it as the current event using the target called event as a
*      Common Event ala how RPG Maker 2003 works (for those familiar with it).
* * Feature Update!
* ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
*    reduce confusion.
* * Feature Update!
* ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
* *** 'Radius' variant will still work and function as 'Delta' but will no
*     longer be listed in the help file as 'Radius'
* *** This is changed to avoid confusion with the new notetag.
* * New Features!
* ** New notetag added by Arisu and sponsored by AndyL:
* *** <Activation Circle: x>
* **** A circle-shaped range with the event at the center.
* **** 'x' represents the distance from the center.
* 
* Version 1.53: August 17, 2023
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** <Map Load Common Event: x>
* ** <Map Load Common Events: x, x, x>
* *** When this map is loaded, run the specified Common Events once available.
* **** Does NOT trigger if you transfer to a different part of the same map.
* 
* Version 1.52: July 13, 2023
* * Documentation Update!
* ** Help file updated for new features.
* ** Updated help file for <Label: text> notetags:
* *** If text codes are used, avoid text codes that use < and > wrappers.
* ** Updated help file for <Label> sandwich notetags:
* *** You can use text codes with < and > wrappers.
* * Feature Update!
* ** Event labels now work properly with scaling sprites.
* * New Features!
* ** New notetag added by Arisu and sponsored by Anon:
* *** <Label Hue Shift: +x>
* *** <Label Hue Shift: -x>
* **** Changes the hue of the event label by +x or -x every frame.
* **** Keep in mind that since this is changing hue, this will appear to have
*      no effect if you are using black and white labels.
* **** Use labels with text codes that add color to them like '\C[4]text'
* **** This only works with the sprite version of event labels and does not
*      work with the legacy version.
* 
* Version 1.51: June 15, 2023
* * Bug Fixes!
* ** Provided a fail safe for plugins using the scaling options from this
*    plugin but do not have scaling parameters identified. The scaling ratio
*    should now default to 1.0. Fix made by Olivia.
* * Feature Update!
* ** Diagonal pathfinding is now improved as to not get stuck on tight corners
*    on the map. Feature update made by Arisu.
* 
* Version 1.50: April 13, 2023
* * Bug Fixes!
* ** <Icon: x> should now update correctly when changing pages through self
*    switches or other event conditions. Fix made by Arisu.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameters added by Arisu:
* *** Plugin Parameters > Event Labels > Mobile-Enabled?
* *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
* **** These settings allow you to enable or disable certain features when
*      played on mobile devices for better performance.
* 
* Version 1.49: March 16, 2023
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Event Notetag and Comment Tags added by Arisu:
* *** <Scale: x%>
* *** <Scale X: x%>
* *** <Scale Y: y%>
* **** Changes the scale of the sprite to the designated size.
* 
* Version 1.48: January 20, 2023
* * Feature Update!
* ** <Move Synch> for certain types will also copy facing directions even if
*    there are no tile movements (ie changing directions when pressed up
*    against and obstacle). Update made by Arisu.
* 
* Version 1.47: November 10, 2022
* * Feature Update!
* ** If "Follower: Set Global Chase" is set to false, followers will no longer
*    jump towards the player location when the player jumps. This does NOT
*    apply to gather or location changing players. Followers will still have
*    to synchronize their positions there regardless in order to maintain
*    consistency. Update made by Olivia.
* 
* Version 1.46: September 29, 2022
* * Bug Fixes!
* ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
* * Feature Update!
* ** Added self-movement prevention whenever scenes are deactivated. Update
*    made by Arisu.
* 
* Version 1.45: August 18, 2022
* * Bug Fixes!
* ** Fixed a bug that caused event labels with variables from refreshing
*    properly. Fix made by Arisu.
* 
* Version 1.44: July 21, 2022
* * Bug Fixes!
* ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
*    Fix made by Arisu.
* * Feature Update!
* ** Diagonal pathfinding is now disabled when there are too many events on a
*    map, causing extra collission checks. This value is set to 100 for the
*    time being until we can figure out a better way to calculate diagonal
*    pathfinding. Update made by Irina.
* 
* Version 1.43: July 14, 2022
* * Bug Fixes!
* ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** Added caching function for pathfinding when using touch movement for a
*    smoother experience. When touch movement is held down, pathfinding will
*    utilize the non-diagonal function for less resource consumption to
*    prevent FPS frame drops. Update made by Arisu.
* * New Features!
* ** New notetag added by Arisu:
* *** <Playtest>
* **** If this notetag is found in the event's notebox (NOT comments), then
*      the event will only appear during a playtest session. It will not
*      appear in a deployed game where the playtest flag is not on.
* 
* Version 1.42: June 23, 2022
* * Documentation Update!
* ** Help file updated for new features.
* ** Added to <Copy Event: x, y> notetag help:
* *** - If '0' is used for the Map ID, reference the current map.
* * Feature Update!
* ** Default MZ behavior would have "below characters" trigger events with
*    only comments lock out facing "same as characters" trigger events. This
*    is now bypassed. Update made by Arisu.
* ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
*    mapID to reference the current map. Update made by Arisu.
* ** <Save Event Location> should now work more efficiently. Update by Arisu.
* ** Dashing animations for followers will no longer look weird after having
*    gathered up and then proceeding to dash. Update made by Irina.
* * New Features!
* ** New event notetag added by Arisu:
* *** <Exit Reset Self Data>
* **** When the player leaves the current map, all Self Switches and Self
*      Variables related to this event will be reset.
* ** New Plugin Command added by Arisu and sponsored by Anon:
* *** Self Data: Reset All
* **** Reset the Self Switch and Self Variable data of all events within the
*      specified map.
* ** New Plugin Parameter added by Arisu and sponsored by Anon:
* *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
* **** Allow dashing while on a ladder or rope?
* 
* Version 1.41: June 1, 2022
* * Bug Fixes!
* ** Parallel Process Common Events above 1000 should no longer crash the
*    game. Bug fixed by Irina.
* 
* Version 1.40: May 19, 2022
* * Bug Fixes!
* ** Sprite Event Labels with distance properties will now work properly
*    when changing from a non-met page condition to a met page condition.
*    Fix made by Arisu.
* 
* Version 1.39: May 5, 2022
* * Bug Fixes!
* ** Save event location should now work properly with Set Event Location
*    command. Fix made by Arisu.
* ** Sprite Event Labels with distance properties will no longer be visible
*    when constantly entering/exiting the Main Menu. Fix made by Arisu.
* 
* Version 1.38: April 28, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameter added by Arisu and sponsored by Archeia:
* *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
* **** How many pixels should non-tile characters be shifted by?
* ** New Notetags added by Arisu and sponsored by Archeia:
* *** <Picture Filename: filename>
* **** applies a picture graphic from the /img/pictures/ folder of your
*      game project.
* **** This graphic will be on top of the character sprite but below the event
*      icon sprite.
* **** The picture priority will be the same as the event's priority. If it is
*      "below characters", the player can walk on top of it. If it is "above
*      characters", the player will behind it. If it is "same as characters",
*      the priority will be based on the current relative Y position.
* *** <Picture Max Size: x>
* *** <Picture Scale: y%>
* **** If the "Max Size" or "Scale" supplementary notetags are used, the
*      picture graphic will be scaled proportionally to fit either the exact
*      pixel size for "Max Size" or the "Scale" ratio.
* *** <Picture Offset: +x, +y>
* *** <Picture Offset: -x, -y>
* **** Offsets the X and Y position of the event picture relative to the event
*      sprite's own position.
* *** <Picture Wait Frames: x>
* **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
*      Animated Pictures plugin. This determines the delay inbetween
*      frame changes.
* 
* Version 1.37: March 24, 2022
* * Documentation Update!
* ** Added extra clarity to "Turn to Home" Movement Command.
* *** This refers to the original position's X/Y on the map.
* *** The event will turn and face the tile that is its original X/Y location.
* 
* Version 1.36: March 17, 2022
* * Bug Fixes!
* ** "Turn To Home" movement command now properly faces the home position.
*    Fix made by Irina.
* * Feature Update!
* ** Plugin Commands now have separators for easier selection.
* 
* Version 1.35: March 3, 2022
* * IMPORTANT! Compatibility Update!
* ** Compatibility Update with RPG Maker MZ 1.4.4.
* *** For some reason this update broke any saves made before 1.4.4 was
*     updated and they cannot be loaded. The only way saves would load is if
*     you made a safe after 1.4.4 was done. This should be fixed and saves
*     made with 1.4.3 and before should now be working. Update made by Irina.
* 
* Version 1.34: February 17, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * Optimization Update!
* ** Plugin should run more optimized.
* * New Features!
* ** Arisu has created new event notetag/comment tags:
* *** <Custom Z: x>
* **** Replace 'x' with a number value to determine the event sprite's Z value
*      relative to the tilemap.
* **** View the helpfile for more information.
* *** <Mirror Sprite>
* **** The event sprite's visual appearance is mirrored.
* *** <Move Synch Distance Opacity: x>
* **** Changes the opacity of the event based on the distance between it and
*      its move synched target. Closer means more opaque. Further away means
*      more transparent.
* ** Irina has created a more memory efficient version of Event Labels.
* *** Plugin Parameters > Event Label Settings > Sprite Based?
* **** Use sprite-based labels instead of legacy-window version.
* **** Legacy-window version will not be supported in future.
* 
* Version 1.33: February 3, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Notetags added by Arisu!
* *** <Hide Player>
* *** <Show Player>
* **** Map Notetag. Forcefully hides or shows the player sprite. This is so
*      you don't need to manually turn the setting on/off each time you enter
*      a specific map.
* *** <Hide Followers>
* *** <Show Followers>
* **** Map Notetag. Forcefully hides or shows the player's followers. This is
*      so you don't need to manually turn them on/off each time you enter a
*      specific map.
* 
* Version 1.32: January 20, 2022
* * Bug Fixes!
* ** Self Variable changes from custom move routes should no longer cause
*    crashes. Fix made by Arisu.
* ** Self Switch custom move route toggles should now work properly. Fix made
*    by Arisu.
* * Feature Update!
* ** Better shadow tracking algorithm to remove any shadow twitching.
*    Update made by Yanfly.
* 
* Version 1.31: January 6, 2022
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.30: November 25, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** Map Switches and Map Variables added by Arisu:
* *** Map Switches are self-switches for maps. Instead of using <Self>, use
*     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
*     data for that Switch will vary depending on the map the player is
*     currently on.
* *** Map Variables are self-variables for maps. Instead of using <Self>, use
*     <Map> in the Variable name to designate it as a Map Switch. The number
*     data for that Variable will vary depending on the map the player is
*     currently on.
* *** Script Calls have been added for these features as well.
* **** See help file for them.
* 
* Version 1.29: October 7, 2021
* * Bug Fixes!
* ** Same map event spawning should now work properly without the need to add
*    the current map ID to the preloaded map array. Update made by Arisu.
* 
* Version 1.28: September 30, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New move route commands added by Arisu:
* *** Jump to Home
* *** Move to Home
* *** Crash Move to Home
* *** Step Toward Home
* *** Step Away From Home
* *** Turn to Home
* *** Turn Away From Home
* *** Teleport to Home
* **** These only work on events. Their actions should be reflective of what
*      their command names suggest.
* 
* Version 1.27: September 17, 2021
* * Bug Fixes!
* ** Fixed event spawn templates so that they can work properly with Common
*    Events. Fix made by Arisu.
* 
* Version 1.26: September 3, 2021
* * Bug Fixes!
* ** "Step Towards Player" custom command should now work properly. Fix made
*    by Arisu.
* ** Having multiple region restriction notetags for a map will no longer
*    cause others to lock out. Fix made by Arisu.
* 
* Version 1.25: July 30, 2021
* * Bug Fixes!
* ** Fixed a problem that caused the 'setSelfSwitchValue' and
*    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
* 
* Version 1.24: June 4, 2021
* * Documentation Update!
* ** Help file updated for new features.
* ** Added extra clarification on which commands will go around the player
*    character and which ones won't.
* * New Move Route Custom Commands added by Arisu:
* ** Crash Move (direction) Until Stop
* ** Crash Move To: x, y
* ** Crash Move To Event: x
* *** These allow events to collide with the player character and trigger
*     Event Touch events.
* 
* Version 1.23: May 21, 2021
* * Bug Fixes!
* ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
* 
* Version 1.22: May 7, 2021
* * Bug Fixes!
* ** Plugin Commands for Event Label Visibility should now update without
*    needing to take steps as per distance detection. Fix made by Arisu.
* * Documentation Update!
* ** Added clarity to "Common Event on Touch" Plugin Parameters.
* *** Areas marked with these regions will not allow random encounters to
*     occur. This is how RPG Maker works. Assuming you are not using plugins
*     at all, by putting on touch events all over the map, tiles with those on
*     touch events will not let random encounters trigger.
* 
* Version 1.21: March 12, 2021
* * Bug Fixes!
* ** Move until stop custom move routes should no longer cause crashes.
*    Fix made by Arisu.
* 
* Version 1.20: February 26, 2021
* * Bug Fixes!
* ** Region Restrictions regarding Player Allow will no longer affect vehicle
*    passability. Update made by Arisu.
* 
* Version 1.19: February 12, 2021
* * Bug Fixes!
* ** "Self Variable: Variable ID" plugin command's Map ID should now be able
*    to use "0" to self reference the current map. Fix made by Olivia.
* 
* Version 1.18: February 5, 2021
* * Bug Fixes!
* ** Event icon plugin commands should now work properly. Fix made by Arisu.
* * Documentation Update!
* ** Added new "Features: Weighted Random Movement" section.
* ** Help file updated for new features.
* * New Features!
* ** New Notetags added by Arisu:
* *** <Random Move Weight: x>
* **** If this tag is used on an event with random-type autonomous movement,
*      then the event will stick closer to their home location (where they are
*      located upon spawning on the map). How close they stick to their home
*      location will depend on the weighted 'x' value.
* *** <True Random Move>
* **** If this tag is used on an event with random-type autonomous movement,
*      then that event will ignore the effects of weighted randomized
*      movement.
* ** New Plugin Commands added by Arisu and sponsored by AndyL:
* *** Event Timer: Change Speed
* *** Event Timer: Expire Event Assign
* *** Event Timer: Expire Event Clear
* *** Event Timer: Frames Gain
* *** Event Timer: Frames Set
* *** Event Timer: Pause
* *** Event Timer: Resume
* **** The above Plugin Commands allow you to control the game timer better.
* ** New Plugin Parameters added by Arisu:
* *** Plugin Parameters > Movement > Event Movement > Random Move Weight
* **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
*      home position.
* 
* Version 1.17: January 29, 2021
* * Documentation Update!
* ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
* ** Added Examples for extra clarification.
* * Optimization Update!
* ** When touch clicking an event on a map with multiple events, pathfinding
*    will utilize the non-diagonal function for less resource consumption to
*    prevent FPS frame drops. Fix made by Arisu.
* 
* Version 1.16: January 22, 2021
* * Optimization Update!
* ** When touch clicking multiple times on an impassable tile, pathfinding
*    will utilize the non-diagonal function for less resource consumption to
*    prevent FPS frame drops. Fix made by Arisu.
* 
* Version 1.15: January 1, 2021
* * Bug Fixes!
* ** Spawned events should now resume their automated self movement after
*    being interacted with. Fix made by Yanfly.
* * Documentation Update!
* ** Help file updated for new features.
* ** Help file updated for updated features.
* * Feature Updates!
* ** Collission checks for the Spawn Event Plugin Commands now account for
*    the spawning event's Hitbox, too. Update made by Yanfly.
* ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
*    check if the spawning has been successful or not.
* * New Features!
* ** New Plugin Commands added by Yanfly!
* *** Spawn Event: Spawn At Terrain Tag
* *** Spawn Event: Despawn Terrain Tag(s)
* **** These function similar to their region counterparts except they target
*      terrain tags instead.
* 
* Version 1.14: December 18, 2020
* * Bug Fixes!
* ** Caching for event label positions now account for page index.
*    Fix made by Yanfly.
* * Documentation Update!
* ** Added documentation for the new features!
* * New Features!
* ** New Plugin Commands added by Irina.
* *** Follower: Set Global Chase
* *** Follower: Set Target Chase
* *** Follower: Set Control
* *** Follower: Reset
* **** These plugin commands allow you to change whether or not the followers
*      will chase their intended targets and/or shift control over their
*      movement route from the "Player" to the target follower.
* 
* Version 1.13: December 4, 2020
* * Bug Fixes!
* ** Caching for event label positions now account for one-screen maps.
*    Fix made by Arisu.
* 
* Version 1.12: November 29, 2020
* * Bug Fixes!
* ** Click Triggers no longer work on erased events. Fix made by Arisu.
* ** Erased events no longer have icons appear above their heads.
*    Fix made by Arisu.
* * Feature Update!
* ** Initialization of the plugin's effects no only occur if the event's
*    current page settings have been altered. Change made by Arisu.
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.11: November 15, 2020
* * Bug Fixes!
* ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
* * Documentation Update!
* ** Added documentation for the updated features!
* * Feature Updates!
* ** Updates to these Plugin Commands made by Yanfly:
* *** Call Event: Remote Activation
* *** Event Icon: Change
* *** Event Icon: Delete
* *** Event Location: Create
* *** Event Location: Delete
* *** Global Switch: Get Self Switch A B C D
* *** Global Switch: Get Self Switch ID
* *** Global Variable: Get Self Variable ID
* *** Morph Event: Change
* *** Morph Event: Remove
* *** Self Switch: A B C D
* *** Self Switch: Switch ID
* *** Self Variable: Variable ID
* **** All of the above Plugin Commands can now use 0 for their Event ID's in
*      order to refer to the running event's ID value.
* 
* Version 1.10: November 1, 2020
* * Bug Fixes!
* ** Spawned Event preserve function now works properly. Fix made by Arisu.
* 
* Version 1.09: October 25, 2020
* * Documentation Update
* ** Added clarity on the notetags and comment tags on when their effects
*    are present.
* * Feature Update!
* ** Event icons now have an unsmoothing property to them to make them
*    look better. Update made by Irina.
* 
* Version 1.08: October 11, 2020
* * Compatibility Update
* ** Added failsafes for better compatibility.
* 
* Version 1.07: October 4, 2020
* * Documentation Update!
* ** Updated for the new features!
* * Feature Update!
* ** Data from deleted events will now be cleared and removed from maps if the
*    events do not exist to prevent conflict with plugins from the VisuStella
*    MZ library and other plugins. Feature added by Irina.
* ** Move Route Custom Commands now support self variable values! If you wish
*    to use a value from a self variable, insert \SelfVar[x] in place of the x
*    in any of the below. This will only draw from the current event. If you 
*    wish to draw data from outside event self variables, we recommend you
*    use the \V[x] variant after using the Plugin Commands to draw data from
*    them for the best accuracy.
* * New Features!
* ** New Plugin Parameter added by Yanfly!
* *** Movement > Bitmap > Smoothing
* **** Do you want to smooth or pixelate the map sprites? Pixelating them is
*      better for zooming and tilting.
* 
* Version 1.06: September 27, 2020
* * Bug Fixes!
* ** Events & Movement Core no longer disables the Core Engine's Smart Event
*    Collision plugin parameter. Fix made by Yanfly.
* * Documentation Update!
* ** Move Route Custom Commands updated with the new feature for inserting
*    variable values.
* * Feature Update!
* ** Move Route Custom Commands now support $gameVariable.value(x) values.
*    You can also just use \V[x] for variable values, too. Added by Irina.
* 
* Version 1.05: September 20, 2020
* * Bug Fixes!
* ** If player movement is disabled, mouse movement is disabled, too.
*    Fix made by Arisu.
* ** The region restriction notetags should be fixed and work again.
*    Fix made by Arisu.
* 
* Version 1.04: September 13, 2020
* * Feature Update!
* * Some Move Route Custom Commands are updated to ignore spaces:
* ** Jump To: x, y
* ** Move To: x, y
* ** Step Toward: x, y
* ** Step Away From: x, y
* ** Turn To: x, y
* ** Turn Away From: x, y
* ** Teleport To: x, y
* *** These can now be written as x,y. There still needs to be a space between
*     the : and x for parsing clarity, however.
* *** Feature updated by Arisu with help from BlueMoon and Zeriab.
* * New Features!
* ** New 'Move Route Custom Commands' added by Arisu.
* *** Fade In: x
* *** Fade Out: x
* *** Force Carry: On
* *** Force Carry: Off
* *** Force Dash: On
* *** Force Dash: Off
* ** New Plugin Commands added by Arisu.
* *** Player Movement: Control
* **** Enable or disable player control over the player character's movement.
* *** Player Movement: Diagonal
* **** Override settings to for player diagonal movement.
* 
* Version 1.03: September 6, 2020
* * Bug Fixes!
* ** Sleeping pose is now fixed and working! Fix made by Yanfly.
* * Documentation Update!
* ** Extended "Features: Self Switches and Variables" to explain how to use
*    script calls to grab self switch information.
* * New Features!
* ** New Plugin Commands added by Yanfly:
* *** Global Switch: Get Self Switch A B C D
* *** Global Switch: Get Self Switch ID
* *** Global Variable: Get Self Variable ID
* **** These plugin commands allow you to transfer data stored in a self
*      switch or Self Variable into a global switch or global variable.
* 
* Version 1.02: August 30, 2020
* * Bug Fixes!
* ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
* ** Plugin Command "Event Label: Visible" now works properly. Fix made by
*    Shaz.
* ** Custom Move Route commands should now be working properly. Fix made by
*    Shaz.
* 
* Version 1.01: August 23, 2020
* * Bug Fixes!
* ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
*
* Version 1.00: August 20, 2020
* * Finished Plugin!
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @ --------------------------------------------------------------------------
*
* @command Separator_AutoMove
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command AutoMoveEvents
* @text Auto Movement: Events
* @desc Allow/stop events from auto movement.
*
* @arg Value:str
* @text Value
* @type select
* @option Allow
* @value Allow
* @option Stop
* @value Stop
* @option Toggle
* @value Toggle
* @desc Allow events to move automatically?
* @default Allow
*
* @ --------------------------------------------------------------------------
*
* @command Separator_CallEvent
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command CallEvent
* @text Call Event: Remote Read
* @desc Runs the page of a different event remotely. This will run
* the page of the target event on the CURRENT event.
*
* @arg MapId:eval
* @text Map ID
* @desc Target event's map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
* @default 0
*
* @arg PageId:eval
* @text Page ID
* @desc The page of the remote event to run.
* You may use JavaScript code.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command Separator_DashEnable
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command DashEnableToggle
* @text Dash Enable: Toggle
* @desc Enable/Disable Dashing on maps.
*
* @arg Value:str
* @text Value
* @type select
* @option Enable
* @value Enable
* @option Disable
* @value Disable
* @option Toggle
* @value Toggle
* @desc What do you wish to change dashing to?
* @default Enable
*
* @ --------------------------------------------------------------------------
*
* @command Separator_EventIcon
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command EventIconChange
* @text Event Icon: Change (Temporary)
* @desc Change the icon that appears on an event.
* This change is temporary and resets upon new events.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent MapId:eval
* @desc The ID of the target event.  Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg IconIndex:eval
* @text Icon Index
* @desc Icon index used for the icon.
* You may use JavaScript code.
* @default 1
*
* @arg IconBufferX:eval
* @text Buffer X
* @parent IconIndex:eval
* @desc How much to shift the X position by?
* You may use JavaScript code.
* @default 0
*
* @arg IconBufferY:eval
* @text Buffer Y
* @parent IconIndex:eval
* @desc How much to shift the Y position by?
* You may use JavaScript code.
* @default 12
*
* @arg IconBlendMode:num
* @text Blend Mode
* @parent IconIndex:eval
* @type select
* @option 0 - Normal
* @value 0
* @option 1 - Additive
* @value 1
* @option 2 - Multiply
* @value 2
* @option 3 - Screen
* @value 3
* @desc What kind of blend mode do you wish to apply to the icon sprite?
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command EventIconChangeForced
* @text Event Icon: Change (Forced)
* @desc Change the icon that appears on an event.
* This change is forced and needs to be restored.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent MapId:eval
* @desc The ID of the target event.  Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg IconIndex:eval
* @text Icon Index
* @desc Icon index used for the icon.
* You may use JavaScript code.
* @default 1
*
* @arg IconBufferX:eval
* @text Buffer X
* @parent IconIndex:eval
* @desc How much to shift the X position by?
* You may use JavaScript code.
* @default 0
*
* @arg IconBufferY:eval
* @text Buffer Y
* @parent IconIndex:eval
* @desc How much to shift the Y position by?
* You may use JavaScript code.
* @default 12
*
* @arg IconBlendMode:num
* @text Blend Mode
* @parent IconIndex:eval
* @type select
* @option 0 - Normal
* @value 0
* @option 1 - Additive
* @value 1
* @option 2 - Multiply
* @value 2
* @option 3 - Screen
* @value 3
* @desc What kind of blend mode do you wish to apply to the icon sprite?
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command EventIconDelete
* @text Event Icon: Delete
* @desc Delete the icon that appears on an event.
* This will remain deleted and invisible for events.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent MapId:eval
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command EventIconRestore
* @text Event Icon: Restore
* @desc Restores a deleted or forced icon that appears on an event.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent MapId:eval
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_EventLabel
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command EventLabelRefresh
* @text Event Label: Refresh
* @desc Refresh all Event Labels on screen.
*
* @ --------------------------------------------------------------------------
*
* @command EventLabelVisible
* @text Event Label: Visible
* @desc Change the visibility of Event Labels.
*
* @arg Visibility:str
* @text Visibility
* @type select
* @option Visible
* @value Visible
* @option Hidden
* @value Hidden
* @option Toggle
* @value Toggle
* @desc What do you wish to change visibility to?
* @default Visible
*
* @ --------------------------------------------------------------------------
*
* @command Separator_EventLocation
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command EventLocationSave
* @text Event Location: Save
* @desc Memorize an event's map location so it reappears there
* the next time the map is loaded.
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the target event.
* You may use JavaScript code.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command EventLocationCreate
* @text Event Location: Create
* @desc Creates a custom spawn location for a specific map's event
* so it appears there the next time the map is loaded.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent MapId:eval
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg PosX:eval
* @text X Coordinate
* @parent MapId:eval
* @desc The X coordinate of the event.
* You may use JavaScript code.
* @default 0
*
* @arg PosY:eval
* @text Y Coordinate
* @parent MapId:eval
* @desc The Y coordinate of the event.
* You may use JavaScript code.
* @default 0
*
* @arg Direction:num
* @text Direction
* @parent MapId:eval
* @type select
* @option 1 - Lower Left
* @value 1
* @option 2 - Down
* @value 2
* @option 3 - Lower Right
* @value 3
* @option 4 - Left
* @value 4
* @option 6 - Right
* @value 6
* @option 7 - Upper Left
* @value 7
* @option 8 - Up
* @value 8
* @option 9 - Upper Right
* @value 9
* @desc The direction the event will be facing.
* @default 2
*
* @arg Optional
*
* @arg PageId:eval
* @text Page ID
* @parent Optional
* @desc The page of the event to set the move route to.
* You may use JavaScript code.
* @default 1
*
* @arg MoveRouteIndex:eval
* @text Move Route Index
* @parent Optional
* @desc The point in the move route for this event to be at
* if the page ID matches the rest of the page conditions.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command EventLocationDelete
* @text Event Location: Delete
* @desc Deletes an event's saved map location.
* The event will reappear at its default location.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_EventPopup
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command MsgPopupPlayer
* @text Event Popup: Player
* @desc Makes a centered event popup on the player sprite.
* Requires VisuMZ_1_MessageCore! Cannot be used in battle!
*
* @arg MessageText:json
* @text Message Text
* @type note
* @desc Insert the text to be displayed.
* Text codes can be used.
* @default "+\\LastGainObjQuantity\\LastGainObj"
* 
* @arg MsgDuration:eval
* @text Message Duration
* @parent MessageText:json
* @desc What is the frame duration of the event popup?
* 60 frames = 1 second. You may use code.
* @default 60
*
* @arg PopupExtra:struct
* @text Popup Settings
* @type struct<PopupExtra>
* @desc These settings let you adjust how the popup animates.
* @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
*
* @ --------------------------------------------------------------------------
*
* @command MsgPopupFollower
* @text Event Popup: Follower
* @desc Makes a centered event popup on target follower sprite.
* Requires VisuMZ_1_MessageCore! Cannot be used in battle!
*
* @arg FollowerIndex:eval
* @text Follower Index
* @desc Which follower index to play popup?
* Index starts at 0. You may use JavaScript code.
* @default 0
*
* @arg MessageText:json
* @text Message Text
* @type note
* @desc Insert the text to be displayed.
* Text codes can be used.
* @default "\\I[23]"
* 
* @arg MsgDuration:eval
* @text Message Duration
* @parent MessageText:json
* @desc What is the frame duration of the event popup?
* 60 frames = 1 second. You may use code.
* @default 60
*
* @arg PopupExtra:struct
* @text Popup Settings
* @type struct<PopupExtra>
* @desc These settings let you adjust how the popup animates.
* @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
*
* @ --------------------------------------------------------------------------
*
* @command MsgPopupEvent
* @text Event Popup: Event
* @desc Makes a centered event popup on target event sprite.
* Requires VisuMZ_1_MessageCore! Cannot be used in battle!
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the event to play popup on.
* Use 0 for current event. You may use JavaScript code.
* @default 0
*
* @arg MessageText:json
* @text Message Text
* @type note
* @desc Insert the text to be displayed.
* Text codes can be used.
* @default "Line1\nLine2"
* 
* @arg MsgDuration:eval
* @text Message Duration
* @parent MessageText:json
* @desc What is the frame duration of the event popup?
* 60 frames = 1 second. You may use code.
* @default 60
*
* @arg PopupExtra:struct
* @text Popup Settings
* @type struct<PopupExtra>
* @desc These settings let you adjust how the popup animates.
* @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
*
* @ --------------------------------------------------------------------------
*
* @command MsgPopupTargetTile
* @text Event Popup: Target Tile
* @desc Makes a centered event popup on target tile.
* Requires VisuMZ_1_MessageCore! Cannot be used in battle!
*
* @arg TileX:eval
* @text Map Tile X
* @desc The x coordinate of the map tile.
* You may use JavaScript code.
* @default $gameMap.width() / 2
*
* @arg TileY:eval
* @text Map Tile Y
* @desc The y coordinate of the map tile.
* You may use JavaScript code.
* @default $gameMap.height() / 2
*
* @arg MessageText:json
* @text Message Text
* @type note
* @desc Insert the text to be displayed.
* Text codes can be used.
* @default "\\I[87]"
* 
* @arg MsgDuration:eval
* @text Message Duration
* @parent MessageText:json
* @desc What is the frame duration of the event popup?
* 60 frames = 1 second. You may use code.
* @default 60
*
* @arg PopupExtra:struct
* @text Popup Settings
* @type struct<PopupExtra>
* @desc These settings let you adjust how the popup animates.
* @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
*
* @ --------------------------------------------------------------------------
*
* @command Separator_EventTimer
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerExpireEvent
* @text Event Timer: Expire Event Assign
* @desc Sets a Common Event to run upon expiration.
* Bypasses the default code if one is set.
*
* @arg CommonEventID:num
* @text Common Event ID
* @type common_event
* @desc Select the Common Event to run upon the timer's expiration.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerSpeed
* @text Event Timer: Change Speed
* @desc Changes the timer frame decrease (or increase) speed.
*
* @arg Speed:eval
* @text Speed
* @desc How many 1/60ths of a second does each frame increase or
* decrease by? Negative decreases. Positive increases.
* @default -1
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerExpireClear
* @text Event Timer: Expire Event Clear
* @desc Clears any set to expire Common Event and instead,
* run the default Game_Timer expiration code.
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerFramesGain
* @text Event Timer: Frames Gain
* @desc Chooses how many frames, seconds, minutes, or hours
* are gained or lost for the event timer.
*
* @arg Frames:eval
* @text Frames
* @desc How many 1/60ths of a second are gained/lost?
* Positive for gain. Negative for lost. JavaScript allowed.
* @default +0
*
* @arg Seconds:eval
* @text Seconds
* @desc How many seconds are gained/lost?
* Positive for gain. Negative for lost. JavaScript allowed.
* @default +0
*
* @arg Minutes:eval
* @text Minutes
* @desc How many minutes are gained/lost?
* Positive for gain. Negative for lost. JavaScript allowed.
* @default +0
*
* @arg Hours:eval
* @text Hours
* @desc How many hours are gained/lost?
* Positive for gain. Negative for lost. JavaScript allowed.
* @default +0
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerFramesSet
* @text Event Timer: Frames Set
* @desc Chooses how many frames, seconds, minutes, or hours
* are set for the event timer.
*
* @arg Frames:eval
* @text Frames
* @desc Set frame count to this value.
* Each frame is 1/60th of a second. JavaScript allowed.
* @default 0
*
* @arg Seconds:eval
* @text Seconds
* @desc Set seconds to this value.
* JavaScript allowed.
* @default 0
*
* @arg Minutes:eval
* @text Minutes
* @desc Set minutes to this value.
* Each minute is 60 seconds. JavaScript allowed.
* @default 0
*
* @arg Hours:eval
* @text Hours
* @desc Set hours to this value.
* Each hour is 60 minutes. JavaScript allowed.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerPause
* @text Event Timer: Pause
* @desc Pauses the current event timer, but does not stop it.
*
* @ --------------------------------------------------------------------------
*
* @command EventTimerResume
* @text Event Timer: Resume
* @desc Resumes the current event timer from the paused state.
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Follower
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command FollowerSetGlobalChase
* @text Follower: Set Global Chase
* @desc Disables all followers from chasing the player
* or reenables it.
*
* @arg Chase:eval
* @text Chase
* @type boolean
* @on Chase
* @off Don't Chase
* @desc Sets all followers to chase the player or not.
* @default false
*
* @ --------------------------------------------------------------------------
*
* @command FollowerSetTargetChase
* @text Follower: Set Target Chase
* @desc Disables target follower from chasing the player
* or reenables it.
*
* @arg FollowerID:eval
* @text Follower ID
* @desc Select which follower ID to disable/reenable chasing for.
* @default 1
*
* @arg Chase:eval
* @text Chase
* @type boolean
* @on Chase
* @off Don't Chase
* @desc Sets target follower to chase its target or not.
* @default false
*
* @ --------------------------------------------------------------------------
*
* @command FollowerSetControl
* @text Follower: Set Control
* @desc Sets the event commands to target a follower when "Player"
* is selected as the target.
*
* @arg FollowerID:eval
* @text Follower ID
* @desc Select which follower ID to control.
* 0 is the player.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command FollowerReset
* @text Follower: Reset
* @desc Resets all follower controls. Event Commands that target
* the "Player" return to normal and followers chase again.
*
* @ --------------------------------------------------------------------------
*
* @command Separator_GlobalSwitch
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SwitchGetSelfSwitchABCD
* @text Global Switch: Get Self Switch A B C D
* @desc Gets the current ON/OFF value from a Self Switch and
* stores it onto a Global Switch.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the source map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the source event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg Letter:str
* @text Letter
* @type select
* @option A
* @value A
* @option B
* @value B
* @option C
* @value C
* @option D
* @value D
* @desc Letter of the target event's Self Switch to obtain data from.
* @default A
*
* @arg Break
* @text -
*
* @arg TargetSwitchId:num
* @text Target Switch ID
* @type switch
* @desc The ID of the target switch.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command SwitchGetSelfSwitchID
* @text Global Switch: Get Self Switch ID
* @desc Gets the current ON/OFF value from a Self Switch and
* stores it onto a Global Switch.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the source map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the source event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg SwitchId:num
* @text Switch ID
* @type switch
* @desc The ID of the source switch.
* @default 1
*
* @arg Break
* @text -
*
* @arg TargetSwitchId:num
* @text Target Switch ID
* @type switch
* @desc The ID of the target switch.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command Separator_GlobalVar
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command VariableGetSelfVariableID
* @text Global Variable: Get Self Variable ID
* @desc Gets the current stored value from a Self Variable and
* stores it onto a Global Variable.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the source map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the source event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg VariableId:num
* @text Variable ID
* @type variable
* @desc The ID of the source variable.
* @default 1
*
* @arg Break
* @text -
*
* @arg TargetVariableId:num
* @text Target Variable ID
* @type variable
* @desc The ID of the target variable.
* @default 1
*
* @ --------------------------------------------------------------------------
*
* @command Separator_MorphEvent
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command MorphEventTo
* @text Morph Event: Change
* @desc Runs the page of a different event remotely.
*
* @arg Step1
* @text Step 1: To Be Changed
*
* @arg Step1MapId:eval
* @text Map ID
* @parent Step1
* @desc Target event's map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg Step1EventId:eval
* @text Event ID
* @parent Step1
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg Step2
* @text Step 2: Change Into
*
* @arg TemplateName:str
* @text Template Name
* @parent Step2
* @desc Name of the target event template to morph into.
* Ignored if this is called "Untitled".
* @default Untitled
*
* @arg Step2MapId:eval
* @text Map ID
* @parent Step2
* @desc Target event's map. Use 0 for current map.
* You may use JavaScript code.
* @default 1
*
* @arg Step2EventId:eval
* @text Event ID
* @parent Step2
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg Step2Preserve:eval
* @text Preserve Morph
* @parent Step2
* @type boolean
* @on Preserve
* @off Expires
* @desc Is the morph effect preserved?
* Or does it expire upon leaving the map?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command MorphEventRemove
* @text Morph Event: Remove
* @desc Remove the morph status of an event.
*
* @arg MapId:eval
* @text Map ID
* @parent Step1
* @desc Target event's map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @parent Step1
* @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
* @default 0
*
* @arg RemovePreserve:eval
* @text Remove Preservation
* @parent Step2
* @type boolean
* @on Remove
* @off Contain
* @desc Also remove the preservation effect?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command Separator_PlayerIcon
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command PlayerIconChange
* @text Player Icon: Change
* @desc Change the icon that appears on on the player.
*
* @arg IconIndex:eval
* @text Icon Index
* @desc Icon index used for the icon.
* You may use JavaScript code.
* @default 1
*
* @arg IconBufferX:eval
* @text Buffer X
* @parent IconIndex:eval
* @desc How much to shift the X position by?
* You may use JavaScript code.
* @default 0
*
* @arg IconBufferY:eval
* @text Buffer Y
* @parent IconIndex:eval
* @desc How much to shift the Y position by?
* You may use JavaScript code.
* @default 12
*
* @arg IconBlendMode:num
* @text Blend Mode
* @parent IconIndex:eval
* @type select
* @option 0 - Normal
* @value 0
* @option 1 - Additive
* @value 1
* @option 2 - Multiply
* @value 2
* @option 3 - Screen
* @value 3
* @desc What kind of blend mode do you wish to apply to the icon sprite?
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command PlayerIconDelete
* @text Player Icon: Delete
* @desc Delete the icon that appears on the player.
*
* @ --------------------------------------------------------------------------
*
* @command Separator_PlayerMovement
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command PlayerMovementChange
* @text Player Movement: Control
* @desc Enable or disable player control over the player character's movement.
*
* @arg Enable:eval
* @text Enable?
* @type boolean
* @on Enable
* @off Disable
* @desc Let the player control where the player character moves?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command PlayerMovementDiagonal
* @text Player Movement: Diagonal
* @desc Override settings to for player diagonal movement.
*
* @arg Setting:str
* @text Setting
* @type select
* @option Default: Whatever the Map Uses
* @value default
* @option Forcefully Disable Diagonal Movement
* @value disable
* @option Forcefully Enable Diagonal Movement
* @value enable
* @desc How do you want to change diagonal movement?
* @default default
*
* @ --------------------------------------------------------------------------
*
* @command Separator_SelfData
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SelfDataResetAll
* @text Self Data: Reset All
* @desc Reset the Self Switch and Self Variable data of all events
* within the specified map.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_SelfSwitch
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SelfSwitchABCD
* @text Self Switch: A B C D
* @desc Change the Self Switch of a different event.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg Letter:str
* @text Letter
* @type select
* @option A
* @value A
* @option B
* @value B
* @option C
* @value C
* @option D
* @value D
* @desc Letter of the target event's Self Switch to change.
* @default A
*
* @arg Break
* @text -
*
* @arg Value:str
* @text Value
* @type select
* @option ON
* @value ON
* @option OFF
* @value OFF
* @option Toggle
* @value Toggle
* @desc What value do you want to set the Self Switch to?
* @default ON
*
* @ --------------------------------------------------------------------------
*
* @command SelfSwitchID
* @text Self Switch: Switch ID
* @desc Change the Self Switch of a different event.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg SwitchId:num
* @text Switch ID
* @type switch
* @desc The ID of the target switch.
* @default 1
*
* @arg Break
* @text -
*
* @arg Value:str
* @text Value
* @type select
* @option ON
* @value ON
* @option OFF
* @value OFF
* @option Toggle
* @value Toggle
* @desc What value do you want to set the Self Switch to?
* @default ON
*
* @ --------------------------------------------------------------------------
*
* @command Separator_SelfVar
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SelfVariableID
* @text Self Variable: Variable ID
* @desc Change the Self Variable of a different event.
*
* @arg MapId:eval
* @text Map ID
* @desc The map the target map. Use 0 for current map.
* You may use JavaScript code.
* @default 0
*
* @arg EventId:eval
* @text Event ID
* @desc The ID of the target event. Use 0 for current event.
* You may use JavaScript code.
* @default 0
*
* @arg VariableId:num
* @text Variable ID
* @type variable
* @desc The ID of the target variable.
* @default 1
*
* @arg Break
* @text -
*
* @arg Operation:str
* @text Operation
* @type select
* @option = Set
* @value =
* @option + Add
* @value +
* @option - Subtract
* @value -
* @option * Multiply
* @value *
* @option / Divide
* @value /
* @option % Modulus
* @value %
* @desc Set the operation used.
* @default =
*
* @arg Break2
* @text -
*
* @arg Value:eval
* @text Value
* @desc Insert the value to modify the Self Variable by.
* You may use JavaScript code.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command Separator_SpawnEvent
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventAtXY
* @text Spawn Event: Spawn At X, Y
* @desc Spawns desired event at X, Y location on the current map.
*
* @arg Step1
* @text Step 1: Spawned Event
*
* @arg TemplateName:str
* @text Template Name
* @parent Step1
* @desc Name of the target event template to spawn as.
* Ignored if this is called "Untitled".
* @default Untitled
*
* @arg MapId:eval
* @text Map ID
* @parent Step1
* @desc Target event's map to be used as reference.
* You may use JavaScript code.
* @default 1
*
* @arg EventId:eval
* @text Event ID
* @parent Step1
* @desc The ID of the target event to be used as reference.
* You may use JavaScript code.
* @default 1
*
* @arg Step2
* @text Step 2: Location
*
* @arg PosX:eval
* @text X Coordinate
* @parent Step2
* @type combo
* @option $gamePlayer.frontX()
* @option $gamePlayer.backX()
* @option Math.randomInt($gameMap.width())
* @option 0
* @desc Target Location to spawn at.
* You may use JavaScript code.
* @default $gamePlayer.frontX()
*
* @arg PosY:eval
* @text Y Coordinate
* @parent Step2
* @type combo
* @option $gamePlayer.frontY()
* @option $gamePlayer.backY()
* @option Math.randomInt($gameMap.height())
* @option 0
* @desc Target Location to spawn at.
* You may use JavaScript code.
* @default $gamePlayer.frontY()
*
* @arg Collision:eval
* @text Check Event Collision
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check collision with any other events and player?
* @default true
*
* @arg Passability:eval
* @text Check Passability
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check passability of the target location.
* @default true
*
* @arg Preserve:eval
* @text Preserve Spawn
* @parent Step2
* @type boolean
* @on Preserve
* @off Expires
* @desc Is the spawned event preserved?
* Or does it expire upon leaving the map?
* @default true
*
* @arg Step3
* @text Step 3: Success Check
*
* @arg SuccessSwitchId:num
* @text Success Switch ID
* @parent Step3
* @type switch
* @desc Target switch ID to record spawning success.
* Ignore if ID is 0. OFF means failed. ON means success.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventAtRegion
* @text Spawn Event: Spawn At Region
* @desc Spawns desired event at a random region-marked location on the current map.
*
* @arg Step1
* @text Step 1: Spawned Event
*
* @arg TemplateName:str
* @text Template Name
* @parent Step1
* @desc Name of the target event template to spawn as.
* Ignored if this is called "Untitled".
* @default Untitled
*
* @arg MapId:eval
* @text Map ID
* @parent Step1
* @desc Target event's map.
* You may use JavaScript code.
* @default 1
*
* @arg EventId:eval
* @text Event ID
* @parent Step1
* @desc The ID of the target event.
* You may use JavaScript code.
* @default 1
*
* @arg Step2
* @text Step 2: Location
*
* @arg Region:arraynum
* @text Region ID(s)
* @parent Step2
* @type number[]
* @min 0
* @max 255
* @desc Pick region(s) to spawn this event at.
* @default ["1"]
*
* @arg Collision:eval
* @text Check Event Collision
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check collision with any other events and player?
* @default true
*
* @arg Passability:eval
* @text Check Passability
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check passability of the target location.
* @default true
*
* @arg Preserve:eval
* @text Preserve Spawn
* @parent Step2
* @type boolean
* @on Preserve
* @off Expires
* @desc Is the spawned event preserved?
* Or does it expire upon leaving the map?
* @default true
*
* @arg Step3
* @text Step 3: Success Check
*
* @arg SuccessSwitchId:num
* @text Success Switch ID
* @parent Step3
* @type switch
* @desc Target switch ID to record spawning success.
* Ignore if ID is 0. OFF means failed. ON means success.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventAtTerrainTag
* @text Spawn Event: Spawn At Terrain Tag
* @desc Spawns desired event at a random terrain tag-marked location on the current map.
*
* @arg Step1
* @text Step 1: Spawned Event
*
* @arg TemplateName:str
* @text Template Name
* @parent Step1
* @desc Name of the target event template to spawn as.
* Ignored if this is called "Untitled".
* @default Untitled
*
* @arg MapId:eval
* @text Map ID
* @parent Step1
* @desc Target event's map.
* You may use JavaScript code.
* @default 1
*
* @arg EventId:eval
* @text Event ID
* @parent Step1
* @desc The ID of the target event.
* You may use JavaScript code.
* @default 1
*
* @arg Step2
* @text Step 2: Location
*
* @arg TerrainTags:arraynum
* @text Terrain Tag(s)
* @parent Step2
* @type number[]
* @min 0
* @max 7
* @desc Pick terrain tag(s) to spawn this event at.
* Insert numbers between 0 and 7.
* @default ["1"]
*
* @arg Collision:eval
* @text Check Event Collision
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check collision with any other events and player?
* @default true
*
* @arg Passability:eval
* @text Check Passability
* @parent Step2
* @type boolean
* @on Check
* @off Ignore
* @desc Check passability of the target location.
* @default true
*
* @arg Preserve:eval
* @text Preserve Spawn
* @parent Step2
* @type boolean
* @on Preserve
* @off Expires
* @desc Is the spawned event preserved?
* Or does it expire upon leaving the map?
* @default true
*
* @arg Step3
* @text Step 3: Success Check
*
* @arg SuccessSwitchId:num
* @text Success Switch ID
* @parent Step3
* @type switch
* @desc Target switch ID to record spawning success.
* Ignore if ID is 0. OFF means failed. ON means success.
* @default 0
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventDespawnEventID
* @text Spawn Event: Despawn Event ID
* @desc Despawns the selected Event ID on the current map.
*
* @arg EventID:eval
* @text Event ID
* @type combo
* @option $gameMap.firstSpawnedEventID()
* @option $gameMap.lastSpawnedEventID()
* @option 1001
* @desc The ID of the target event.
* You may use JavaScript code.
* @default $gameMap.lastSpawnedEventID()
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventDespawnAtXY
* @text Spawn Event: Despawn At X, Y
* @desc Despawns any spawned event(s) at X, Y location on the current map.
*
* @arg PosX:eval
* @text X Coordinate
* @parent Step2
* @type combo
* @option $gamePlayer.frontX()
* @option $gamePlayer.backX()
* @option Math.randomInt($gameMap.width())
* @option 0
* @desc Target Location to despawn at.
* You may use JavaScript code.
* @default $gamePlayer.frontX()
*
* @arg PosY:eval
* @text Y Coordinate
* @parent Step2
* @type combo
* @option $gamePlayer.frontY()
* @option $gamePlayer.backY()
* @option Math.randomInt($gameMap.height())
* @option 0
* @desc Target Location to despawn at.
* You may use JavaScript code.
* @default $gamePlayer.frontY()
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventDespawnRegions
* @text Spawn Event: Despawn Region(s)
* @desc Despawns the selected Region(s) on the current map.
*
* @arg Region:arraynum
* @text Region ID(s)
* @parent Step2
* @type number[]
* @min 0
* @max 255
* @desc Pick region(s) and despawn everything inside it.
* @default ["1"]
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventDespawnTerrainTags
* @text Spawn Event: Despawn Terrain Tag(s)
* @desc Despawns the selected Terrain Tags(s) on the current map.
*
* @arg TerrainTags:arraynum
* @text Terrain Tag(s)
* @parent Step2
* @type number[]
* @min 0
* @max 7
* @desc Pick terrain tag(s) and despawn everything inside it.
* Insert numbers between 0 and 7.
* @default ["1"]
*
* @ --------------------------------------------------------------------------
*
* @command SpawnEventDespawnEverything
* @text Spawn Event: Despawn Everything
* @desc Despawns all spawned events on the current map.
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
* @ Plugin Parameters
* @ ==========================================================================
*
* @param BreakHead
* @text --------------------------
* @default ----------------------------------
*
* @param EventsMoveCore
* @default Plugin Parameters
*
* @param ATTENTION
* @default READ THE HELP FILE
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------
*
 * @param Label:struct
 * @text 事件标签设置
 * @type struct<Label>
 * @desc 选择关于事件标签的设置。

* @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
*
 * @param Icon:struct
 * @text 事件图标设置
 * @type struct<Icon>
 * @desc 选择关于事件图标的设置。

* @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
*
 * @param Template:struct
 * @text 事件模板设置
 * @type struct<Template>
 * @desc 选择关于事件模板的设置。

* @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
*
* @param EventBreak
* @text --------------------------
* @default ----------------------------------
*
 * @param Movement:struct
 * @text 移动设置
 * @type struct<Movement>
 * @desc 修改游戏中的移动规

* @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
*
 * @param VS8:struct
 * @text VisuStella 8方向设置
 * @type struct<VS8>
 * @desc 选择关于VisuStella 8方向精灵的设置。

* @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
*
* @param MovementBreak
* @text --------------------------
* @default ----------------------------------
*
 * @param Region:struct
 * @text 区域规则
 * @type struct<Region>
 * @desc 选择关于区域的设置。

* @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
*
 * @param RegionOk:struct
 * @text 按下确定按钮的公共事件
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc 在站在指定区域上按下确定按钮时触发的公共事件设置。

* @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
*
 * @param RegionOkTarget:str
 * @text 目标图块
 * @parent RegionOk:struct
 * @type select
 * @option 玩家正前方的图块
 * @value front
 * @option 玩家站立在上面的图块
 * @value standing
 * @desc 触发“按下确定按钮的公共事件”时应检查哪个图块？

* @default front
*
 * @param RegionTouch:struct
 * @text 触摸时公共事件
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc 设置在踏上被指定区域标记的图块时触发的公共事件。

* @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
*
 * @param TerrainTag:struct
 * @text 地形标签设置
 * @type struct<TerrainTag>
 * @desc 选择关于地形标签的设置。

* @default {"TerrainTag":"","Rope:num":"1"}
*
* @param BreakEnd1
* @text --------------------------
* @default ----------------------------------
* @desc 分隔线1
*
* @param End Of
* @default Plugin Parameters
* @desc 插件参数结束标记
*
* @param BreakEnd2
* @text --------------------------
* @default ----------------------------------
* @desc 分隔线2

*
*/
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
  * @param SpriteBased:eval
 * @text 基于精灵？
 * @type boolean
 * @on 基于精灵
 * @off 传统窗口
 * @desc 是否使用基于精灵的标签，而不是传统的窗口版本。
 * 传统窗口版本将不会在未来得到支持。
 * @default true
 *
 * @param MobileEnabled:eval
 * @text 移动设备启用？
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 是否为移动设备启用事件标签？
 * @default true
 *
 * @param FontSize:num
 * @text 字体大小
 * @type number
 * @min 1
 * @desc 事件标签使用的字体大小。
 * @default 22
 *
 * @param IconSize:num
 * @text 图标大小
 * @type number
 * @min 1
 * @desc 事件标签中使用的图标大小。
 * @default 26
 *
 * @param LineHeight:num
 * @text 行高
 * @type number
 * @min 1
 * @desc 事件标签使用的行高。
 * @default 26
 *
 * @param OffsetX:num
 * @text 水平偏移量 X
 * @type number
 * @min 0
 * @desc 将所有标签在水平方向上整体偏移这么多像素。
 * @default 0
 *
 * @param OffsetY:num
 * @text 垂直偏移量 Y
 * @type number
 * @min 0
 * @desc 将所有标签在垂直方向上整体偏移这么多像素。
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text 渐变速度
 * @type number
 * @min 1
 * @desc 标签的渐变速度。
 * @default 16
 *
 * @param VisibleRange:num
 * @text 可见范围
 * @type number
 * @min 1
 * @desc 玩家需要在事件内的范围，才能看到其标签。
 * @default 30
 *
 */

/* ----------------------------------------------------------------------------
 * 图标设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text X 偏移量
 * @desc 事件图标的默认 X 坐标偏移量。
 * @default 0
 *
 * @param BufferY:num
 * @text Y 偏移量
 * @desc 事件图标的默认 Y 坐标偏移量。
 * @default 12
 *
 * @param BlendMode:num
 * @text 混合模式
 * @type select
 * @option 0 - 普通
 * @value 0
 * @option 1 - 加法
 * @value 1
 * @option 2 - 乘法
 * @value 2
 * @option 3 - 屏幕
 * @value 3
 * @desc 事件图标的默认混合模式。
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * 模板设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text 预加载地图
 * @parent Settings
 * @type number[]
 * @desc 用作此插件模板地图的所有地图 ID 列表。
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text 事件模板列表
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc 此项目使用的所有事件模板列表。
 * 用于备注标签和插件命令。
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS：复制前
 * @parent JavaScript
 * @type note
 * @desc 复制事件前运行的代码。
 * 全局运行，适用于所有复制的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostCopyJS:func
 * @text JS：复制后
 * @parent JavaScript
 * @type note
 * @desc 复制事件后运行的代码。
 * 全局运行，适用于所有复制的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PreMorphJS:func
 * @text JS：变形前
 * @parent JavaScript
 * @type note
 * @desc 变形事件前运行的代码。
 * 全局运行，适用于所有变形的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostMorphJS:func
 * @text JS：变形后
 * @parent JavaScript
 * @type note
 * @desc 变形事件后运行的代码。
 * 全局运行，适用于所有变形的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PreSpawnJS:func
 * @text JS：生成前
 * @parent JavaScript
 * @type note
 * @desc 生成事件前运行的代码。
 * 全局运行，适用于所有生成的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostSpawnJS:func
 * @text JS：生成后
 * @parent JavaScript
 * @type note
 * @desc 生成事件后运行的代码。
 * 全局运行，适用于所有生成的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 */

/* ----------------------------------------------------------------------------
 * 事件模板
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text 名称
 * @desc 模板的名称。将用作备注标签和插件命令的锚点。
 * @default 未命名
 *
 * @param MapID:num
 * @text 地图 ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc 存储模板事件的地图 ID。
 * 这将自动将此 ID 添加到预加载列表中。
 * @default 1
 *
 * @param EventID:num
 * @text 事件 ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc 模板事件基于的事件的 ID。
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS：复制前
 * @parent JavaScript
 * @type note
 * @desc 复制事件前运行的代码。
 * 仅适用于此模板。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostCopyJS:func
 * @text JS：复制后
 * @parent JavaScript
 * @type note
 * @desc 复制事件后运行的代码。
 * 仅适用于此模板。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PreMorphJS:func
 * @text JS：变形前
 * @parent JavaScript
 * @type note
 * @desc 变形事件前运行的代码。
 * 仅适用于此模板。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostMorphJS:func
 * @text JS：变形后
 * @parent JavaScript
 * @type note
 * @desc 变形事件后运行的代码。
 * 仅适用于此模板。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PreSpawnJS:func
 * @text JS：生成前
 * @parent JavaScript
 * @type note
 * @desc 生成事件前运行的代码。
 * 全局运行，适用于所有生成的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 * @param PostSpawnJS:func
 * @text JS：生成后
 * @parent JavaScript
 * @type note
 * @desc 生成事件后运行的代码。
 * 全局运行，适用于所有生成的事件。
 * @default "// 声明常量\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// 执行操作\n"
 *
 */
/* ----------------------------------------------------------------------------
 * 移动设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 八方向移动
 *
 * @param EnableDir8:eval
 * @text 启用
 * @parent Dir8
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 默认是否允许八方向移动？玩家可以对角线移动。
 * @default true
 *
 * @param StrictCollision:eval
 * @text 严格碰撞检测
 * @parent Dir8
 * @type boolean
 * @on 严格
 * @off 灵活
 * @desc 强制严格的碰撞检测规则，玩家必须同时能通过两个基本方向？
 * @default true
 *
 * @param FavorHorz:eval
 * @text 偏向水平移动
 * @parent StrictCollision:eval
 * @type boolean
 * @on 水平
 * @off 垂直
 * @desc 如果无法对角线移动，但可以水平和垂直移动，是否偏向水平移动？
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text 减慢对角移动？
 * @parent Dir8
 * @type boolean
 * @on 减慢
 * @off 正常
 * @desc 对角移动时是否降低移动速度？
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text 速度倍增器
 * @parent SlowerSpeed:eval
 * @desc 对角移动时调整移动速度的倍增器？
 * @default 0.85
 *
 * @param AutoMove
 * @text 自动移动
 *
 * @param StopAutoMoveEvents:eval
 * @text 事件运行时停止
 * @parent AutoMove
 * @type boolean
 * @on 停止
 * @off 漫游
 * @desc 事件运行时停止自动移动。
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text 消息运行时停止
 * @parent AutoMove
 * @type boolean
 * @on 停止
 * @off 漫游
 * @desc 消息运行时停止自动移动。
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text 平滑处理
 * @parent Bitmap
 * @type boolean
 * @on 平滑
 * @off 像素化
 * @desc 你想要平滑处理还是像素化地图精灵？
 * 像素化对于缩放和倾斜效果更好。
 * @default false
 *
 * @param Dash
 * @text 冲刺
 *
 * @param DashModifier:num
 * @text 冲刺修正
 * @parent Dash
 * @desc 调整冲刺速度修正值。
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text 梯子上冲刺？
 * @parent Dash
 * @type boolean
 * @on 允许
 * @off 禁止
 * @desc 在梯子或绳索上是否允许冲刺？
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text 启用冲刺倾斜？
 * @parent Dash
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 当当前冲刺时，倾斜任何精灵？
 * @default true
 *
 * @param TiltLeft:num
 * @text 左倾斜量
 * @parent EnableDashTilt:eval
 * @desc 向左移动时的倾斜量（左上、左、左下）。
 * @default -0.15
 *
 * @param TiltRight:num
 * @text 右倾斜量
 * @parent EnableDashTilt:eval
 * @desc 向右移动时的倾斜量（右上、右、右下）。
 * @default 0.15
 *
 * @param TiltVert:num
 * @text 垂直倾斜量
 * @parent EnableDashTilt:eval
 * @desc 垂直移动时的倾斜量（上、下）。
 * @default 0.05
 *
 * @param EventMove
 * @text 事件移动
 *
 * @param RandomMoveWeight:num
 * @text 随机移动权重
 * @parent EventMove
 * @desc 使用介于 0 和 1 之间的数字。接近 1 的数字会更接近它们的起始位置。设置为 0 则禁用。
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Y 轴偏移
 * @parent EventMove
 * @desc 非地形字符应移动多少像素？
 * 负数：向上。正数：向下。
 * @default -6
 *
 * @param PathFind
 * @text 寻路
 *
 * @param PathfindMobileEnabled:eval
 * @text 移动设备是否启用？
 * @parent PathFind
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 启用移动设备的对角线寻路？
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text 显示阴影
 * @parent Shadows
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 在所有事件和与玩家相关的精灵上显示阴影。
 * @default true
 *
 * @param DefaultShadow:str
 * @text 默认文件名
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc 用于 img/system/ 文件夹中阴影的默认文件名。
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text 原地转向
 *
 * @param EnableTurnInPlace:eval
 * @text 启用
 * @parent TurnInPlace
 * @type boolean
 * @on 原地转向
 * @off 跳过
 * @desc 在非冲刺状态下，玩家会在移动前原地转向。
 * 仅适用于键盘输入。
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text 延迟帧数
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc 移动前等待的帧数。
 * @default 10
 *
 * @param Vehicle
 * @text 载具速度
 *
 * @param BoatSpeed:num
 * @text 船速度
 * @parent Vehicle
 * @desc 调整船载具的基础速度。
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text 舰速度
 * @parent Vehicle
 * @desc 调整舰载具的基础速度。
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text 飞艇速度
 * @parent Vehicle
 * @desc 调整飞艇载具的基础速度。
 * @default 6.0
 *
 */

/* ----------------------------------------------------------------------------
 * 区域规则
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text 允许区域
 *
 * @param AllAllow:arraynum
 * @text 所有允许
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入玩家可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text 步行允许
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入步行单位可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text 玩家允许
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入玩家可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param EventAllow:arraynum
 * @text 事件允许
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入事件可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text 载具允许
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入任何载具可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text 船只允许
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入船只可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text 舰只允许
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入舰只可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text 飞艇允许
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入飞艇可以进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param Forbid
 * @text 禁止区域
 *
 * @param AllForbid:arraynum
 * @text 所有禁止
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入玩家不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text 步行禁止
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入步行单位不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text 玩家禁止
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入玩家不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param EventForbid:arraynum
 * @text 事件禁止
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入事件不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text 载具禁止
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入载具不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text 船只禁止
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入船只不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text 舰只禁止
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入舰只不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text 飞艇禁止
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入飞艇不能进入的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param Dock
 * @text 码头区域
 *
 * @param VehicleDock:arraynum
 * @text 载具码头
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入任何载具可以停靠的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param BoatDock:arraynum
 * @text 船只码头
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入船只可以停靠的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text 仅限区域停靠
 * @parent BoatDock:arraynum
 * @type boolean
 * @on 仅限于指定区域
 * @off 默认
 * @desc 船只只能在指定的区域停靠。
 * @default false
 *
 * @param ShipDock:arraynum
 * @text 舰只码头
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入舰只可以停靠的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text 仅限区域停靠
 * @parent ShipDock:arraynum
 * @type boolean
 * @on 仅限于指定区域
 * @off 默认
 * @desc 舰只只能在指定的区域停靠。
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text 飞艇码头
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc 插入飞艇可以停靠的区域 ID。
 * 区域 ID 范围从 0 到 255。
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text 仅限区域停靠
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on 仅限于指定区域
 * @off 默认
 * @desc 飞艇只能在指定的区域停靠。
 * @default false
 *
 */

/* ----------------------------------------------------------------------------
 * 区域公共事件
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text 区域 1
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region2:num
 * @text 区域 2
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region3:num
 * @text 区域 3
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region4:num
 * @text 区域 4
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region5:num
 * @text 区域 5
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region6:num
 * @text 区域 6
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region7:num
 * @text 区域 7
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region8:num
 * @text 区域 8
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region9:num
 * @text 区域 9
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region10:num
 * @text 区域 10
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region11:num
 * @text 区域 11
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region12:num
 * @text 区域 12
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region13:num
 * @text 区域 13
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region14:num
 * @text 区域 14
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region15:num
 * @text 区域 15
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region16:num
 * @text 区域 16
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region17:num
 * @text 区域 17
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region18:num
 * @text 区域 18
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region19:num
 * @text 区域 19
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region20:num
 * @text 区域 20
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region21:num
 * @text 区域 21
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region22:num
 * @text 区域 22
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region23:num
 * @text 区域 23
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region24:num
 * @text 区域 24
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region25:num
 * @text 区域 25
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region26:num
 * @text 区域 26
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region27:num
 * @text 区域 27
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region28:num
 * @text 区域 28
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region29:num
 * @text 区域 29
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region30:num
 * @text 区域 30
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region31:num
 * @text 区域 31
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region32:num
 * @text 区域 32
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region33:num
 * @text 区域 33
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region34:num
 * @text 区域 34
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region35:num
 * @text 区域 35
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region36:num
 * @text 区域 36
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region37:num
 * @text 区域 37
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region38:num
 * @text 区域 38
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region39:num
 * @text 区域 39
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region40:num
 * @text 区域 40
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region41:num
 * @text 区域 41
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region42:num
 * @text 区域 42
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region43:num
 * @text 区域 43
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region44:num
 * @text 区域 44
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region45:num
 * @text 区域 45
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region46:num
 * @text 区域 46
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region47:num
 * @text 区域 47
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region48:num
 * @text 区域 48
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region49:num
 * @text 区域 49
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region50:num
 * @text 区域 50
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region51:num
 * @text 区域 51
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region52:num
 * @text 区域 52
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region53:num
 * @text 区域 53
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region54:num
 * @text 区域 54
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region55:num
 * @text 区域 55
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region56:num
 * @text 区域 56
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region57:num
 * @text 区域 57
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region58:num
 * @text 区域 58
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region59:num
 * @text 区域 59
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region60:num
 * @text 区域 60
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region61:num
 * @text 区域 61
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region62:num
 * @text 区域 62
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region63:num
 * @text 区域 63
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region64:num
 * @text 区域 64
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region65:num
 * @text 区域 65
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region66:num
 * @text 区域 66
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region67:num
 * @text 区域 67
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region68:num
 * @text 区域 68
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region69:num
 * @text 区域 69
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region70:num
 * @text 区域 70
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region71:num
 * @text 区域 71
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region72:num
 * @text 区域 72
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region73:num
 * @text 区域 73
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0
 *
 * @param Region74:num
 * @text 区域 74
 * @type common_event
 * @desc 此区域触发哪个公共事件？
 * 使用 0 表示不触发任何公共事件。
 * @default 0

 *
  * @param Region75:num
 * @text 区域 75
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region76:num
 * @text 区域 76
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region77:num
 * @text 区域 77
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region78:num
 * @text 区域 78
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region79:num
 * @text 区域 79
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region80:num
 * @text 区域 80
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region81:num
 * @text 区域 81
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region82:num
 * @text 区域 82
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region83:num
 * @text 区域 83
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region84:num
 * @text 区域 84
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region85:num
 * @text 区域 85
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region86:num
 * @text 区域 86
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0

 *
  * @param Region87:num
 * @text 区域 87
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region88:num
 * @text 区域 88
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region89:num
 * @text 区域 89
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region90:num
 * @text 区域 80
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region91:num
 * @text 区域 81
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region92:num
 * @text 区域 82
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region93:num
 * @text 区域 83
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region94:num
 * @text 区域 84
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region95:num
 * @text 区域 85
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region96:num
 * @text 区域 86
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region97:num
 * @text 区域 87
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region98:num
 * @text 区域 88
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0
 *
 * @param Region99:num
 * @text 区域 89
 * @type common_event
 * @desc 此区域激活哪个公共事件？
 * 使用 0 表示不激活任何公共事件。
 * @default 0

 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * 地形标签设置
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text 地形标签ID
 *
 * @param Rope:num
 * @text 绳索
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc 用于绳索的地形标签编号是？
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8 方向设置
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text 气球图标设置
 *
 * @param AutoBalloon:eval
 * @text 自动气球姿势
 * @parent Balloons
 * @type boolean
 * @on 自动
 * @off 手动
 * @desc 使用气球图标时自动设置 VS8 精灵的姿势。
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text 气球偏移 X
 * @parent Balloons
 * @desc 在 VS8 精灵上偏移气球图标的 X 像素。
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text 气球偏移 Y
 * @parent Balloons
 * @desc 在 VS8 精灵上偏移气球图标的 Y 像素。
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text 自动缓冲
 * @parent Icons
 * @type boolean
 * @on 自动
 * @off 手动
 * @desc 自动缓冲 VS8 精灵的 X 和 Y 坐标？
 * @default true
 * 
 * @param CarryPose:eval
 * @text 使用携带姿势
 * @parent Icons
 * @type boolean
 * @on 携带姿势
 * @off 正常
 * @desc 携带图标时使用携带姿势移动。
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * 弹出额外设置
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text 渐变设置
 *
 * @param fadeInDuration:eval
 * @text 渐入持续时间
 * @parent Fade
 * @desc 渐入需要多少帧？
 * 60 帧 = 1 秒。
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text 渐出持续时间
 * @parent Fade
 * @desc 渐出需要多少帧？
 * 60 帧 = 1 秒。
 * @default 8
 *
 * @param Offset
 * @text 偏移设置
 *
 * @param startOffsetX:eval
 * @text 起始偏移 X
 * @parent Offset
 * @desc 偏移起始 X 位置。可以使用代码。
 * 负数：左。正数：右。
 * @default +0
 *
 * @param startOffsetY:eval
 * @text 起始偏移 Y
 * @parent Offset
 * @desc 偏移起始 Y 位置。可以使用代码。
 * 负数：上。正数：下。
 * @default -48
 *
 * @param endOffsetX:eval
 * @text 结束偏移 X
 * @parent Offset
 * @desc 偏移结束 X 位置。可以使用代码。
 * 负数：左。正数：右。
 * @default +0
 *
 * @param endOffsetY:eval
 * @text 结束偏移 Y
 * @parent Offset
 * @desc 偏移结束 Y 位置。可以使用代码。
 * 负数：上。正数：下。
 * @default -96
 *
 * @param Scale
 * @text 缩放设置
 *
 * @param startScaleX:eval
 * @text 起始缩放 X
 * @parent Scale
 * @desc 起始缩放 X 是多少？可以使用代码。
 * 0.0 = 0%，0.5 = 50%，1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text 起始缩放 Y
 * @parent Scale
 * @desc 起始缩放 Y 是多少？可以使用代码。
 * 0.0 = 0%，0.5 = 50%，1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text 结束缩放 X
 * @parent Scale
 * @desc 结束缩放 X 是多少？可以使用代码。
 * 0.0 = 0%，0.5 = 50%，1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text 结束缩放 Y
 * @parent Scale
 * @desc 结束缩放 Y 是多少？可以使用代码。
 * 0.0 = 0%，0.5 = 50%，1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text 角度设置
 *
 * @param startAngle:eval
 * @text 起始偏移角度
 * @parent Angle
 * @desc 起始角度偏移是多少？
 * 使用介于 0 到 360 之间的数字。可以使用代码。
 * @default +0
 *
 * @param endAngle:eval
 * @text 结束偏移角度
 * @parent Angle
 * @desc 结束角度偏移是多少？
 * 使用介于 0 到 360 之间的数字。可以使用代码。
 * @default +0
 * 
 * @param Misc
 * @text 其他设置
 * 
 * @param Arc:eval
 * @text 弧峰
 * @parent Misc
 * @desc 弹出的轨迹弧的高度，以像素为单位。
 * 正数：上。负数：下。允许使用代码。
 * @default +0
 *
 */

//=============================================================================

const _0x2542b2 = _0x5c62; function _0x4d4d() { const _0x4c979b = ['tgTjD', 'switch1Val', 'ypgXj', 'vvLuI', 'eRouteAnim', 'jump', 'WWFOj', '_eventEras', '_opacity', 'CzgdO', '_inputTime', 'PosY', 'OFF', 'owChanges', 'switch1Id', 'niiLt', '15|2|6|5', 'hDepth', 'Seconds', 'AuxcQ', 'rget', 'woDgp', 'ndexVS8', 'DespawnEve', 'ata', 'setDiagona', 'lTyoz', 'Setting', 'UntilStop', 'AVDJG', 'mation', '_vehicleTy', 'left', 'saveEventL', 'roundX', 'yxyYH', 'posEventsM', 'EbAOY', 'HGVxZ', 'SynchOpaci', 'MsgPopupFo', 'fDSaj', 'EsGIv', 'setPositio', '_regionRul', 'yRegions', 'upport', 'VisibleRan', '14|6|1', 'ohBvn', 'ble', 'mqaez', 'rID', 'updatePatt', 'Data', 'bTcyP', 'meetsSwitc', '_findPrope', 'LZTbS', 'r_checkEve', 'Visible', 'Self\x20Switc', 'itmap', 'isSelfSwit', 'ariablePre', 'COBWEB', 'EXxPz', 'ttern', 'isValid', 'r_getInput', 'eOurB', 'rocessOk', 'template', 'CDKWG', 'BZSRO', 'hes_setVal', 'mallest\x20to', 'VS8', 'pZMoT', 'yyXqT', 'unterRaw', 'acterShado', 'adjustDir8', 'ANNOYED', 'moveToward', 'MoveCore', 'oCjkK', 'witches_va', 'ager.', '_cpc', 'ateMove', '_lastAttac', 'KKZht', 'Plugin\x20Man', '$preloaded', '_checkEnco', 'TileX', 'column', 'startMapCo', 'setPose', 'Jipfx', 'ing', 'ge_setNumb', 'LoadTempla', 'orPeriodic', 'EXCLAMATIO', 'yGPai', 'lfEvent', 'fittingHei', 'Minutes', 'entsMoveCo', 'nput', 'initFollow', 'XYLil', 'RegionPass', 'xEIJy', 'morphInto', 'COLLAPSE', 'kywEb', 'KasYa', 'BUvOU', 'Characters', 'floor', 'add', 'NORMAL', 'Pkcfq', 'lock', 'eSynch', 'HYGoV', 'hasClickTr', 'UadWi', 'oPoLW', '\x20is\x20requir', 'mitdi', '_paused', '_onExpire', 'roundY', 'Step2MapId', 'chTargets', 'unlockEven', 'pluginComm', '_character', 'HEART', 'odifier', 'zFAoa', 'UnWCk', '_event', '_patternLo', 'ge_setItem', 'DashingEna', 'fRnqj', 'Step1Event', 'GxNXI', 'createIcon', 'JzRMY', 'RIGHT\x20TO\x20L', 'kCrml', 'EYfYp', 'VariableGe', 'sMoveCoreE', 'SuccessSwi', 'belsVisibl', 'Event', 'get', '_actuallyM', 'hrtmT', 'eLgjJ', 'hPictureUp', 'return\x200', 'iKuyf', 'racter_set', 'up_Preload', 'bzgkf', 'QWUTI', 'needsAttac', 'llower', 'sfJLp', 'sTranspare', 'IFT_Y', 'bpEzO', 'ACWGC', 'LEFT\x20TO\x20RI', 'sEIQw', 'resetExitS', 'tionKey', 'deletePres', 'anchor', 'PosX', '\x20have\x20Map\x20', 'MapId', 'IUbKJ', 'ZZZ', 'cter', 'removeTemp', 'EECSv', '_hasEncoun', 'andCallEve', 'mimic', 'odicRefres', 'NgEPQ', 'isCollided', 'PhOyB', 'eventsXy', 'isPressed', 'WalkForbid', 'haracterDi', 'Locations', 'AKHZG', 'aMmIe', 'iable', 'NKiEN', 'map', 'leX', 'GetMoveSyn', 'despawnAtX', 'textSizeEx', 'ARRAYFUNC', 'werVisibil', 'kNCpe', 'pattern', '_diagonalS', 'padZero', 'updateVisi', 'dxbLu', 'WnjRL', 'activation', 'oLAGc', 'tsMoveCore', 'aracter', 'fhWtX', 'elfMovemen', 'veEvents', '_EventsMov', 'convertVar', 'sWHzY', 'CustomPage', '_eventCach', 'tLocation', 'Self\x20Varia', 'lize', 'sufEY', 'wnedEventA', 'bZffC', 'events', 'iKwwR', 'yDNxL', 'tSize', 'Plugin\x20Par', 'List', 'tXY', 'fVariableV', 'ureFilenam', '3|5|11|8|4', 'hasDragonb', 'vVLLr', 'AiWgW', 'OwoRG', 'oveStraigh', 'VisibleEve', 'rNVFU', 'lOffsetX', 'checkEvent', 'ocation', 'entY', 'eKVLH', 'checkColli', 'ahJWZ', 'vert\x20mirro', 'defaultFon', 'oving', 'sible', 'Game_Map_s', 'EVAL', 'terrainTag', 'despawnTer', 'XTdtK', 'iconSize', '_seconds', 'setupSaveE', 'ARRAYEVAL', 'emdSu', 'jqgcJ', 'DespawnAtX', 'clearPageS', 'vertical\x20m', 'LowerLayer', 'vehicle', 'isEventRun', 'ernY', 'shadowY', 'TRUE', 'JNFVi', 'eRouteStep', 'ayer', 'monEvent', 'InPlace', 'SWHka', 'nfOQR', 'rCharacter', 'giuhP', 'drawTextEx', 'igger', 'offsetY', 'isObjectCh', '_commonEve', 'kRpbT', 'utKvZ', '9|11|1|0', 'lfTarget', 'HURT', 'ntItem_onC', 'ZIsLL', 'removeMorp', 'SZtgG', 'FgJpR', 'blendMode', 'sage_start', '3|1|0|4|5|', 'QCrdw', 'dd\x20in\x20Map\x20', 'CPxBK', 'TGDWv', 'tIconSprit', 'setupChild', 'createShad', 'QeXbA', 'MUSIC', '3|0|2|4|1', 'hPictureFi', 'VnFHz', 'WithEvents', 'MessageTex', 'Game_Syste', 'ancel', 'Game_Switc', 'meetsCondi', '_shadowSpr', 'Switches_V', 'setupPlaye', 'IQott', 'FjohX', 'les', 'DdfCz', 'qASVz', 'WtQoP', 'cter_force', 'lly', 'JSON', 'iaLKf', 'isRunning', 'createLabe', 'DIAGONAL_P', '_visibleEv', 'ExtraSetti', 'zMumQ', 'chId', 'rve', 'tItemChoic', 'EventAllow', 'eDelay', 'cterBase_p', 'AbJCJ', '_PlayerDia', 'chPictureB', 'resume', '%1Forbid', 'disable', 'sMoveCoreN', 'r_isMapPas', 'GwALp', 'entX', 'checkRegio', 'onLoadAtta', 'tNumberInp', 'iTwrp', 'lastSpawne', 'AOpKg', 'createAtta', 'tTargetCha', 'eEventLoca', 'Choice', 'CPCsMet', '\x20plugin\x20pl', 'SPIN\x20COUNT', 'You\x20do\x20not', 'eWeight', 'setupPageS', 'asStepAnim', 'Conditions', 'VILQL', 'le_initMov', 'itions', 'CoxgP', 'evsJz', 'owerChasin', 'RegionTouc', 'Map\x20%1\x20Swi', 'uDoBY', 'EJCQF', 'XDylz', 'updateTilt', 'meHUF', 'set', '_SavedEven', 'rEvents', '2|3|4|1|0', 'ist\x20from\x20s', 'EventId', 'ctive', 'Visibility', '\x20mirror', 'ffects', 'XfXfe', 'forced', 'eRppP', 'UAoEr', 'endOffset', 'rUfap', 'qixcd', 'lename', 'Shadow', 'YvgCr', 'ioxFH', 'type', 'ntrolDisab', 'visibleRan', 'IconIndex', 'entAutoMov', 'late\x20Setti', 'lid', 'jKHAB', 'isPlayerFo', 'setFrame', 'setValue', 'sVNCl', 'Window_Num', 'Character', 'nCommandIn', 'tTerrainTa', 'note', 'ommand!', '...', 'slice', 'NoneProxim', 'findDirect', 'fxgKo', 'GtZpO', 'oraryMapSp', 'JLdni', '_setupPage', 'yjkgw', 'etup', 'page', 'llel', '_initializ', 'hLGAo', 'BoatSpeed', 'qHkPG', '_fadeOutDu', 'MuWbN', 'ntItem_onO', 'ZaLvq', 'gNrDx', 'WjjUu', '_type', 'ataKey', 'rceHidden', 'mity', 'distance', '4|0|1|2|3', 'cterBase_c', '_eventSpaw', 'updateBitm', 'SwitchId', 'BMvkf', 'Ynctu', 'SoroE', 'event', 'Hbrdu', 'loadPictur', 'filename', 'CsBXL', 'ision', 'ConvertPar', 'FjIUR', 'bVODm', 'leID', 'isShip', '%1DockRegi', 'down', 'Delete', '_Map', 'getSavedEv', 'SelfSwitch', 'Proximity', 'setImage', 'Map%1.json', 'OfCci', 'siWZi', 'gger', 'executeMov', 'AJPYL', 'RLDan', 'r_executeM', '_offsetX', '_onDatabas', 'resizeWind', 'startMessa', 'createProx', 'eed', 'QzsYn', 'mrNGe', 'bid', '_cacheSyst', 'gsCTQ', 'ndex', 'atternYVS8', 'rbidPass', 'MsgDuratio', 'PdXFM', 'MUSIC\x20NOTE', 'Interprete', 'MfghE', 'prepareSpa', '%1:%2', 'isEventCli', 'ED\x202', 'setCommonE', 'misc', 'descriptio', 'switches', 'witchVaria', '\x20remove\x20us', '_realY', 'regionId', 'NbNjY', 'LCeRG', 'Game_Chara', 'updateSpri', 'erIcon', 'h\x20%1', 'RIxbp', 'endScale', 'resetFontS', 'mTXoO', 'isMapSwitc', 'cWTzP', 'HXXjH', 'createDisp', 'EffectDura', 'EventMorph', 'onClickTri', 'isMapVaria', '_targetX', 'eventsXyNt', 'awXrc', 'xSize', 'tions', 'command357', '_chaseOff', 'cedSwitchV', 'mapId', 'Game_Map_r', 'eHkkN', 'Game_Troop', 'qbsTb', 'jmSBE', 'UsxrQ', 'KIrUf', 'VehicleAll', 'format', 'ROUTE_SCRI', 'roximityTy', 'adjustX', 'Chase', 'cterBase_b', '_forceDash', 'standing', 'concat', 'MoveRouteI', 'General', 'Settings', 'EstGP', 'ZrReb', 'isDashing', 'Game_SelfS', 'cterBase_d', 'OXjQt', 'aRRlq', 'Region', 'clearAttac', 'PlayerAllo', 'xEXbe', 'ableId', 'TileMessag', 'ams', 'ARRAYJSON', 'lowerChasi', 'ReEQb', 'text', 'lWindowFor', 'bcvPT', 'isoVs', 'SLEEP', 'conditions', 'Sprite_Cha', 'Fgsme', 'edEvents', 'edMorphEve', 'nUzru', 'updateOpac', 'KLaHu', 'setupDiago', 'FramesSet', 'KDPIv', 'EventAutoM', 'TiltVert', 'yLgky', 'andData', 'FwKnM', 'variableId', 'efresh', 'eRouteJump', 'eDir8', '_clearPage', 'BufferX', 'faVmc', 'yIkTa', 'duration', 'updateSelf', 'AtRegion', 'eCoreSetti', 'nlmzO', 'berInput_p', 'TriggerEve', 'turnRight9', 'DfRBy', 'EventIconR', 'nedEventDa', 'sOwXL', 'mentDiagon', 'cDCbA', 'MorphEvent', 'loon_updat', 'VDTQJ', 'FRUSTRATIO', '_trigger', 'WmHnC', 'isInVehicl', 'tzAPY', 'loadThresh', 'ayerContro', 'Mode', 'IDZNR', 'ionTo', 'update', 'scqQs', '_proxyWind', 'DefaultSha', 'thXBy', 'tch\x20%2', '_lastMoved', 'on\x20does\x20no', '7|8|10|5|3', '_spriteOff', 'ZpZvz', 'rBypass', '_selfEvent', 'MoveCoreEf', 'wfbFW', 'call', 'WenQR', 'lnMmc', 'createText', 'TerrainTag', 'nedEvent', 'tsAndMovem', 'wTFdk', 'Events', 'setLastPlu', 'Window_Eve', 'isMovement', 'Spriteset_', 'sable', 'essageCore', 'ntId', 'isSpriteVS', 'prototype', 'trigger', 'fadeOutDur', 'rSpawn', 'acity', '_pageIndex', 'endScaleX', 'push', '%1Dock', 'LvtKF', 'ionDelete', 'updatePosi', 'Frame', 'witchesFor', 'esh', 'getSelfTar', 'AdvancedVa', 'execute', 'hideShadow', 'NT_LABELS', 'cRDhg', 'createChar', 'cgglQ', 'Game_Map_p', 'ventOverlo', 'QVqsf', 'Message', 'erase', 'isMoveOnly', '6|5', 'WXTQM', 'ErFFT', 'screenX', 'start', '_textSprit', 'bYmso', 'Game_Temp_', 'pos', 'eSynchMirr', 'JzjMV', 'QvAXh', 'JHhey', 'NmzfG', 'characterI', 'Variable', 'bileEnable', 'drawing', 'isPassable', '_mirrorSpr', 'uWIfM', 'KrbXE', '_eventMorp', 'pow', 'AllAllow', '_working', 'MapID', 'FontSize', 'shift', 'hPictureMa', '_settings', '_spawnPres', 'front', '_randomHom', 'sionKeywor', 'seEncounte', 'UfMlo', '16|13|2|9|', 'WPOAc', '|8|12|3|4|', 'Hhdkj', 'lastMovedD', 'Dock', 'startAngle', 'MUSICNOTE', 'ting', '\x20%1\x20has\x20no', 'tmap', 'Index', 'oute', '\x20largest\x20t', 'DyVNv', 'pcqJz', 'tion', 'PcnEb', 'setY', 'lheis', 'isSceneMap', 'ftjFb', 'jZOpZ', 'isBigChara', 'mIWZJ', 'Nikav', 'DfFvU', 'eSynchCust', 'ere', 'ions', '_EVENT_LIM', 'ureOffsetY', 'xRoan', 'thinEncoun', 'FramesGain', '_encounter', 'ZlVIr', 'cterBase_r', 'Icon', 'khfTm', 'setControl', 'HWdJD', 'eSynchRand', 'oWljZ', '_targetY', 'ylECa', 'cterBase_u', 'LKdwe', 'deleteEven', 'lOffsetY', 'itionsCPC', 'none', 'region', 'SCREEN', 'spawnPrese', 'anPass', 'innerWidth', 'ove', 'sion', 'cter_setMo', 'Change', 'WbPNv', 'WISE', '2699739lGUulZ', 'SpriteBase', 'attachPict', 'jReza', 'VisuMZ_1_M', 'OpacitySpe', 'sAt', 'CRZTB', 'SKcFe', 'VgMKb', 'PreCopyJS', 'isNormalPr', 'pageIndex', 'rceShown', 'vent', 'bitmap', 'round', 'zMaiO', 'oTugR', 'jfdGg', 'art', 'createSave', 'isInstance', 'setNumberI', 'teMaps', 'Stop', 'haseOff', 'allel', 'isMobileDe', '4|7|5', 'QrMZy', 'needsUpdat', 'ntTriggerH', 'aDBMR', 'ckable', 'oijRH', 'xwmDM', 'SelfVariab', 'CLHRA', 'hxaem', 'registerSe', 'setMoveSpe', 'noUTw', 'horz\x20mirro', 'VariableId', 'tionRegion', 'ntCollisio', '_moveTypeR', 'Scale', 'PreloadMap', 'oreEngine', '%1\x27s\x20versi', '0|1|2|4|3', 'yOverrides', 'ets', 'aySiv', 'Tilt', 'VICTORY', '_meetsSwit', '_expireCom', 'Map%1-Even', 'ntID', 'Resume', 'mainFontSi', 'eRouteSelf', 'Aawrh', 'Passabilit', 'IyDAK', 'creenX', 'jzZPu', 'hAKZR', 'ncDHi', 'eRouteMove', 'nCgES', 'FollowerID', 'sent', 'tMirrorSpr', 'LrtiX', 'toLowerCas', 'knvBK', 'dfxxp', 'reverse', 'eCommandEv', 'crvvk', 'Ueqzr', 'log', 'updateWait', '_scene', 'enX', 'smooth', 'Bjyfx', 'checkActiv', 'cked', 'bJUnE', 'some', 'berInput_s', '_reflectio', 'Game_Follo', 'NUM', 'bleID', 'isSpawnedE', 'mic', 'VLIBW', 'savePreser', 'XHCrL', 'tyDelta', 'setMapValu', 'HMnut', '_startY', 'UlYhJ', 'isWorking', 'pkKOt', 's\x20&\x20Moveme', 'TRfTF', 'TOGGLE', 'szphu', 'bCDLy', '_tileExpan', 'RIGHT', 'FGaTI', 'moveBackTo', '_waitMode', 'cterBase_i', 'PathfindMo', 'vdfcp', 'preter_exe', 'OXSAy', 'BalloonOff', '_isCharact', 'ommentTags', 'JvfoL', 'apSmoothin', '_fadeInDur', 'wText', 'tValue', 'tringTags', 'USZSw', 'doEKg', 'vifck', 'ityConditi', 'mapValue', '155448XSIipz', 'ePopup', 'ale', '0|4', 'wXLaO', 'findDiagon', 'CQCsE', 'isSelfVari', '%1\x20is\x20inco', 'IXLPK', 'Movement', 'GEJEo', 'SBhCo', 'zpseS', 'initMember', 'tureSprite', 'le_isMapPa', 'ation', 'AhVgy', 'startOffse', 'moveForwar', 'racter', 'istance', '_eventPage', 'joouh', 'tLabelText', 'BlendMode', 'OffsetY', 'ZJTyd', 'AdvancedSw', 'dEventData', 'ymZTu', '7|0|2|1|6|', '_scaleY', 'tePosition', 'BDXHa', '_targetAng', 'tYyui', 'EXIJb', 'nEventTrig', 'isPreventS', 'cZmnX', 'Dcrtm', 'MessagePop', '_update', 'tileHeight', 'bFirn', 'ommonEvent', '_eventIcon', 'Map_%1', 'aUeyc', 'ealMoveSpe', 'eventId', '%1%2', 'nProximity', 'ByAnyDirec', 'vWXOK', 'ciVLW', 'roximityDi', 'PreloadedM', 'TriggerThe', 'cXZRH', 'patternHei', 'lowPass', 'square', '_DisablePl', 'etDirectio', 'eBase', 'updateHueS', 'tASqz', 'mand', 'ntsMoveCor', 'IWREH', 'RMMMA', 'UNTITLED', 'oPbau', 'uUVaD', 'command108', 'sCVkK', 'OfSceneMap', 'otetags', 'klbxM', 'RPqJB', '8IXKgde', 'create', 'setupEvent', 'fontFace', 'hblCy', 'sqrt', 'XgnFx', 'getPreserv', '_advancedS', 'HIxFS', 'metCPC', 'tUgOb', 'ytGXu', 'getMapSpaw', 't\x20been\x20pre', 'RcmDY', 'cvChv', 'approach', 'WithPlayer', 'ndom', 'EventID', 'xWmgF', 'nts', 'ApplyPopup', 'ship', 'ikcNb', 'rfCUc', 'arget', 'rsForceSho', 'LUvDT', 'egions', 'nedEventWi', 'GONAL_PATH', 'getPlayerD', 'apply', 'xEKlu', 'gdeyB', 'return\x20%1', 'characterP', 'arallelCom', 'setPlayerD', 'ccwX', 'WNawJ', 'hData', 'setDirecti', 'DespawnReg', 'parent', 'qAWqi', 'Letter', 'Window_Mes', '_targetSca', 'rotation', 'Iixfh', 'CnPcV', 'LOWER\x20LEFT', 'uzbpv', 'isRegionDo', 'hDfRV', 'xhOem', 'createCont', 'nitMembers', 'SynchDirec', 'ons', 'match', 'bles_setVa', 'veEventLoc', 'despawnReg', 'correctFac', 'refresh', '385CTuIfB', 'EventLabel', '_hue', 'screenY', 'rything', 'isPlaytest', '_erased', 'ntTriggerT', 'cQfRm', 'MEUze', 'initEvents', 'startsWith', 'dzsde', 'findTarget', 'terNone', '_eventCopy', 'isSpawnHit', 'bility', 'EventLocat', 'GSqsb', 'Frames', 'setCharact', 'setFrames', 'aced\x20on\x20th', 'GVsFa', 'anager.', 'Synch', 'JHQUN', 'QUESTION', 'isPlayerCo', 'PtGRZ', 'morphIntoT', 'tCustomZ', 'GqpOB', 'oveDiagona', 'width', 'randomInt', 'jKZFi', 'UGmIq', 'isInvisibl', 'bufferY', '2ZLMhBu', 'VfXky', 'hZkOR', 'posNt', 'Button', 'CharacterB', 'length', 'PostMorphJ', 'vdeer', 'NOTE', 'cter_proce', 'WmSJM', 'ED\x205', 'ATHFINDING', 'cwY', 'DataKey', '_forceHide', '0|2|1|4|3', 'SWEAT', 'iable\x20%2', 'qBIMR', 'ProximityD', 'createBitm', 'isLabelVis', 'isAutoBuff', 'name', 'omPoint', '_activatio', 'MobileEnab', 'EventerMap', 'nabled', 'isEventTes', 'setStopFol', 'Game_Playe', 'setEventIc', 'advancedFu', 'opacityDel', 'dashSpeedM', 'seForIcons', 'sDashDisab', 'angle', 'createLowe', 'terNoneEve', 'klDcr', 'iconWidth', 'HgavI', 'kTHvG', 'LOVE', 'endOffsetY', 'portToChar', 'encounterP', 'e\x20Plugin\x20M', '|9|11|12|1', 'onToPoint', 'YFWRK', 'eRouteHugW', 'Angle', 'Core', 'dxxbZ', 'JvDyb', '_spriteset', 'IczYX', 'chaseChara', 'aBkiT', 'useCarryPo', 'Toggle', 'TFSdM', 'updateShad', '_requestSa', 'nalSupport', 'hImCW', 'selfValue', 'ame', 'XFUWh', 'FastForwar', 'xZkIH', 'ingDirecti', '_spawnData', 'Scene_Boot', 'tVFbN', '_spawnedEv', 'reverse\x20mi', 'MapVariabl', '_EventIcon', 'fBOsD', 'hPxyY', 'llSynchTar', 'CommonEven', 'KIxEj', 'ALLOW_LADD', 'parallelCo', 'FollowerSe', 'Aoxcv', '_starting', 'irection', 'toUpperCas', 'setupCopyE', 'Game_Commo', 'mandCommon', 'ionData', 'Game_Varia', '1|4|0|3|2', 'uQAPh', 'SlowerSpee', 'hLqwd', 'onOk', 'dEvent', 'tMembers', 'BZCLR', '2|0|5|3|4|', 'vents', 'PlayerIcon', 'eFjtu', 'KvNiq', 'ment', 'KiCKn', 'shadowX', 'xXYya', 'isTurnInPl', 'itches', 'cterBase_o', '120059gTBmNW', 'IDJXE', 'findProper', 'BitmapSmoo', 'isMapPassa', 'KwoXc', 'onLoadSucc', 'LMMjI', 'VehicleFor', 'SILENCE', 'rUAQx', 'QuUMC', 'isEventsMo', 'hpDrB', 'isTargetEv', 'RandomMove', 'requestMap', '_pose', 'sInScriptC', 'age.', 'IconSize', 'autoEventI', 'FDoWD', 'kQTWK', 'ontrolDisa', 'rHIHK', 'ubrms', 'isSupportD', 'loadCPC', 'rLabelWind', 'ace', 'oyOag', 'TiltRight', 'atternYBas', 'EuhQi', 'IObGe', 'iepis', 'GYWlR', 'rainTags', 'PreSpawnJS', 'JQnAP', 'erInput', '_moveRoute', 'OJKDs', 'sWithCPC', 'boat', 'isRegionAl', 'CBDPJ', 'EJtje', 'updateSave', 'sDashing', 'setHue', 'pause', 'QCbPv', 'ayerY', 'thing', 'Ppeoj', 'sOnEventsD', 'ATZrc', 'removeChil', 'p\x20in\x20Event', 'drawIcon', 'ayerX', 'SPIN\x20ANTIC', 'BULB', 'loaded\x20for', 'kWDSP', 'wers_isVis', 'MSLjJ', 'IabId', 'all', 'racterTilt', 'pqmXH', 'ed\x20to\x20run\x20', 'ction', 'EVFAz', 'RegionOkTa', 'wer_initia', 'onIndex', 'RegionList', '_clickTrig', 'xBhKN', 'bpdHB', 'updateRout', '_text', 'PageIndex', 'eSynchDire', 'ationProxi', 'zzWtN', 'ePosition', 'wIcon', 'lDirection', 'getAttachP', 'nterEffect', '_mapId', 'leY', 'EventTimer', 'updateMove', 'phic', 'eCharacter', 'estore', 'edEvent', 'variableVa', 'ess', 'oFwuH', 'createSpaw', 'isEmptyCha', 'checkValid', 'ionSave', 'VRVci', 'beVCf', '_filename', 'setupRegio', 'ernEventsM', 'WyimZ', 'qkBiD', 'absDistanc', 'ckTriggere', 'RmCGE', 'veCoreInvi', 'deltaX', 'vQdHZ', 'yEmNO', 'isAllowEve', 'nTo', '8|21|20|22', 'eSynchAway', 'stance', 'Game_Vehic', 'wer_chaseC', 'tGlobalCha', 'tTriggerAu', 'contents', 'yugQB', 'Sprite', 'RjHGM', 'irror', 'enY', 'preter_Plu', 'EventForbi', '_visiblePl', 'cUYKI', 'entValidFo', 'ttings', 'away', 'xLDlt', 'ZRewY', 'rsForceHid', 'makeDeepCo', '_interpret', 'initMoveSp', 'Name', 'oach', 'FINDING', 'ement', 'bDIlL', 'suMZ_Event', '_speed', 'ERROR:\x20Map', 'Direction', 'here', 'KNEEL', 'abs', '1|0', 'eedMultipl', 'RXYCr', 'clearEvent', 'regionList', 'sKDzU', 'ovement', 'MOBILE_DIA', 'uSjfg', 'HOnVc', 'ier\x20number', 'TDpOs', 'bcvox', 'XeWaA', 'resetIcons', 'fRran', 'of\x20Preload', 'CallEvent', 'isDashingA', 'ICnry', '_comments', 'followers', 'MsgPopupPl', 'haracterIn', 'bOMhi', 'HYVch', 'VVlAb', 'monEvents', 'RGvSU', 'VisuMZ_Set', 'lnxZi', 'calEvents', 'isBoat', 'EqLLV', 'WZcHA', 'NWpGO', 'wUHJe', 'Game_Enemy', 'VKrdR', 'canPass', 'Ahqug', '_eventOver', 'isBattleTe', 'mGasB', 'Enabled', 'bind', '_callEvent', 'checkAdvan', 'process_Vi', 'erved', 'hzkAL', 'lBqUM', 'ntLabels', 'rink', 'ed\x20Maps.\x0a\x0a', 'memiz', 'WbIAm', 'isRegionFo', 'eCore', 'terpreter', '_startX', 'Target', 'HCMCq', '_stop', 'qsTKD', 'bles_value', '_start', '_eventLabe', 'Jzaaf', 'iUcij', 'sMoveCoreS', 'up:\x20Player', 'resh', 'omCharacte', 'loadSystem', 'PlayerForb', 'TargetVari', '\x20a\x20Tier\x20%2', 'BzPSw', 'zxZSs', '_addedHitb', 'gKldM', 'Step1MapId', 'dEventLoca', 'spriteId', 'HlLJK', 'setupMorph', 'FCPdT', 'Vehicle', 'turnLeft90', 'dow', 'setBackgro', 'glSgK', 'updateAtta', 'usQMW', 'ShowShadow', 'OJChQ', 'SqGtn', 'andom', 'QLIMk', '%1,', 'kGYJf', 'cuteComman', 'hJBvH', 'lDestinati', 'eRoutePatt', 'horizontal', '_selfTarge', 'reverseDir', 'Loaded', 'Speed', 'izontal', '_fadeOutSt', 'm_initiali', 'jvQRT', 'ragonbones', 'variables', 'isActive', 'hPictureSe', 'isOnRope', '_frames', 'SelfDataRe', 'nsOnEvents', 'opacitySpe', 'Set\x20this\x20u', '_randomMov', 'SmOhF', 'updateScal', 'LXSwA', 'otaLX', 'Starting', 'ARRAYSTRUC', 'VnpwP', 'IaCEl', 'clearCarry', 'NvuBD', 'nOK', 'LineHeight', 'ateWaitMod', 'Dfita', 'Bvuxn', 'Game_Inter', 'EventsMove', 'hueShift', 'layObjects', 'ureBlendMo', '5|3|4|2|0|', 'clamp', 'eLuBY', 'BwSgI', 'canMove', 'startScale', 'lWindows', 'pageId', 'deltaYFrom', 'Cache', 'UUcvA', 'ern', 'ssable', 'eeded', 'iteVS8dir', 'veMessages', 'erSpriteSh', 'PageId', 'terHalf', 'pdatePatte', 'VehicleDoc', 'advancedVa', 'bAMdx', 'ger', 'ureSetting', 'wdeck', 'led', 'Game_Event', '_hidden', '_counter', 'checkSmart', 'mScale', 'isPlayerWi', 'eRouteTele', 'TNVWt', '_customZ', 'clearDesti', 'wers_jumpA', 'Follower', 'HalfProxim', 'eoIjV', 'constructo', 'Map_create', 'spssD', 'isBusy', 'emplate', 'lue', 't%2', 'firstSpawn', '1|0|3|4|2', 'ration', '_saveEvent', 'uCSUA', 'mIKhC', 'LzPcf', 'ureScale', 'NCwja', '_shadowGra', 'rVisibilit', 'haracterPa', 'isAnyEvent', 'eLoaded', 'pacity', 'gainFrames', '_scaleBase', 'TileBitmap', 'RprrO', 'random', 'loadDataFi', 'loon_setup', 'xgFGg', '_tilemap', '_forceShow', 'jVuIA', 'EODPx', 'yMOgv', 'creen', 'qXSkc', 'moveSynchT', '_cacheVisi', 'turnToward', 'okvOa', 'tener', '4|2|1|3|0', 'getDiagona', 'ORdPX', 'right', '|2|0|1|7', 'XAiGk', 'mxUAQ', 'atternY', 'HnLCw', '_active', 'iWIqD', 'TriggerAut', '_direction', 't\x20match\x20pl', 'Preloaded\x20', 'updateDura', 'cQFtZ', '\x20%3\x20plugin', 'mmonEvents', 'BufferY', 'parameters', 'NQgue', 'Union', 'entCore', 'Game_Map_u', 'ity', 'rjrBD', '6|12|10|9|', 'alDirectio', 'createDumm', 'KwNJz', 'setEventLa', 'isTranspar', 'Steps', 'PreMorphJS', 'requestRef', 'iconIndex', 'UKvwK', 'XsArV', 'Switch', 'onData', 'ying', '_eventScre', 'cAAIK', 'PlayerMove', '_moveSpeed', 'tControl', 'labelWindo', 'replace', 'Arc', 'Fzsmf', 'FfTCZ', 'restoreIco', '_currentAr', 'edEventID', 'KaxYL', 'clearSelfT', '_poseDurat', 'locate', 'hasAdvance', 'zoomScale', 'OnEventsDa', 'aUFXE', 'deltaXFrom', 'TagChanges', '_screenZoo', 'SWpYl', 'copy', 'changeSpee', 'IconBuffer', 'ZIOUM', 'r_isDashin', 'moveTypeRa', 'edEventPos', 'ANGER', 'increaseSt', 'hasCPCs', 'EventIconD', 'den', 'blt', 'setAll', 'uOVmZ', 'ED\x203', 'and', 'isTriggerI', 'mirror\x20hor', 'indexOf', 'ode', '_shadowOpa', 'isAdvanced', 'canStartLo', 'EltbN', 'min', 'eRouteFade', 'e\x20it\x20in\x20th', 'wSXjK', 'Step2Prese', 'Advwt', '3|0|17|19|', 'ncreaseSte', 'qVsuE', 'iptCall', 'executeCom', 'ollText_st', 'NuFiB', 'createEven', 'delay', 'KyzXR', 'fEkSn', 'DespawnTer', 'MsgPopupEv', 'ddqJt', 'qxqxZ', '_dragonbon', 'ture', 'bSsjg', 'mEROk', 'yIkDJ', 'vFLVB', 'AtTerrainT', 'BghAd', 'ITEM', '3|2', 'DxRZq', 'setOpacity', 'NBZOT', 'onExpire', 'isSmartEve', 'ngs', 'DOWN', 'determineC', 'setupFollo', 'fadeInDura', 'AutoBalloo', 'Allow', '\x22Event\x20Pop', 'getEventIc', 'ZyOFX', 'emVisible', 'switch2Id', '_duration', 'forceMoveR', 'HMPH', 'zVwlm', 'startEncou', 'onDataKey', 'assable', 'roundYWith', 'isAllowCha', 'erControll', 'chPicture', 'eventLabel', 'DBtlz', 'opacity', 'KoPRh', '_startAngl', '_data', 'YYPAi', 'FavorHorz', 'isJumping', 'KKrUG', 'TargetSwit', 'list', 'ervedMorph', '_checkRelo', 'erNone', 'BCD', 'enable', 'nutvm', 'isNearTheS', 'stop', 'setAllowEv', 'tTBQw', 'Step2Event', 'clearStepP', 'racter_upd', 'aEGZU', 'ityOverrid', 'hjuBb', 'arERR', 'updateText', 'MovementSp', 'direction', 'chConditio', 'Region%1', 'vUBUr', 'dEncErase', 'ZfiMf', 'ADDITIVE', 'hasEncount', 'Scene_Map_', 'TyGWE', 'TDqvZ', '%1\x20is\x20miss', 'e\x20plugin\x20l', 'scale', 'isLongPres', 'ates', 'Map\x20%1\x20Var', 'sed', 'Sprite_Bal', 'mentChange', 'PlayerColl', 'nation', 'ionCreate', 'jfHxq', 'despawnEve', 'updateTile', 'ETbpn', 'LVBnJ', 'eRouteSetI', 'USER-DEFIN', 'qcOyV', 'Walk', 'artMessage', 'UlxgY', 'FOcxX', 'YhajL', 'delta', 'gZIAc', 'DashEnable', 'UPPER\x20RIGH', 'Enable', 'tart', 'updatePose', 'spawnEvent', 'WlFra', '_tileId', 'YRSMO', 'eCommand', 'LlsiB', 'JcpAz', 'bufferX', 'Forbid', 'setSelfVal', 'updatePeri', 'FaceSynchA', 'AUeUh', 'cxykP', 'reorder\x20th', 'cterBase_h', 'Game_Messa', 'hasEventIc', 'moveStraig', 'trim', 'cQlSe', 'ExpireEven', 'RandomHome', 'ingEntitie', 'LoadCommon', 'fontSize', 'zEoWJ', 'ZiVaE', 'fadeIn', 'move', 'eRouteBall', 'UwWnT', '_labelWind', 'yWindow', 'ning', '%1\x20added\x20t', 'nlockEvent', 'cwITf', '%1,%2,', 'awnedEvent', 'exit', 'convertSel', 'fects', '_realX', 'cess', 'pDRfr', 'eSynchMimi', 'apWidth', 'MsgPopupTa', '_meetsCond', 'racter_cha', 'cterBase_s', 'reserveCom', 'MapSwitche', 'visible', 'windowPadd', 'CcOtu', 'AALpM', 'Template', 'eOffsets', 'player', 'HTTRu', 'OffsetX', '8dir', 'AirshipSpe', 'string', 'ShiftY', 'SpawnEvent', 'old', 'ionValid', 'rgetTile', '_needsPeri', 'xgmwz', 'ype', 'nates', 'directionO', 'Rope', 'PostCopyJS', 'preter_cha', 'DjtcO', 'ariables', 'TileY', 'VBTUM', 'PopupExtra', 'AFVON', 'setup', 'contentsOp', 'hangeForce', 'JCLkx', 'bcPfQ', 'CTpZy', 'height', 'Maps\x20and\x20a', 'able', 'setWaitMod', 'OBpMJ', 'jAdkx', 'csErc', 'onFromPoin', 'oveCore', 'EcOxe', 'avxuv', '8110520eUtGCM', 'pdate', 'Location', '_locate', 'Position', 'qIruE', 'Point', 'oaDLe', 'filter', 'circle', 'Repeat', 'isMoving', 'YRwIy', 'maxSize', 'ccwcI', 'Fpywy', 'fduMH', 'fMovement', 'ZWpDo', 'updateStop', 'Scene_Load', 'characterN', 'rqhdw', 'TjEcB', 'ents', 'charAt', 'hPictureSc', 'processMov', 'WDbZc', '_lastMapId', 'TtMcD', 'setItemCho', 'nLadderSpr', 'ameters\x20>\x20', 'outlineCol', 'KGAXZ', 'isAirship', 'value', 'KPmpl', 'sEventsMov', 'zmHvl', 'setChaseOf', 'riables', '_stepPatte', 'DVJku', 'ally', 'YQHUb', 'LDqWZ', 'qohKM', 'ease\x20updat', 'StrictColl', 'FwRme', '11jAGwnB', 'hes_value', 'areFollowe', 'moveDiagon', 'WdNkR', 'preter_upd', 'iDGrZ', 'isDiagonal', 'ate', 'hCondition', 'getInputDi', 'pjkxx', 'GBJYo', 'uEtBP', 'oWHrA', '$callEvent', 'ion', 'KzKep', 'character', 'NfUke', 'Game_Timer', 'isSaveEven', 'jUaWs', 'ZSalp', 'sCKIJ', 'frameCount', '_startScal', 'max', 'Event\x20Temp', 'ntAutoMove', 'itemPaddin', 'refreshEve', 'LOCKWISE', 'erHalf', 'hgjRr', 'creenY', '4|1|2|3|0|', 'nData', 'ge_add', 'SPIN\x20CLOCK', 'remove', '_offsetY', 'RlKVL', 'nEvent_isA', 'elfSwitche', 'StopAutoMo', 'isOnLadder', 'YpbAJ', 'refreshIfN', 'Player', 'ble\x20%1', 'All', 'WSIIy', 'aQuiT', 'clearDashi', 'wDxYe', 'realMoveSp', 'eetInvisib', 'elete', 'hasMoveOnl', 'iconHeight', 'refreshBus', 'forceCarry', 'xhgiX', 'BVaOw', 'koIkg', 'addLoadLis', 'MUSIC-NOTE', 'LIGHT\x20BULB', 'padding', 'portTo', 'eXVOo', 'prite', 'getPosingC', 'load', 'lRWNM', 'ntData', 'shadowFile', 'eSpeed', '2|1|5|0|6|', 'hasStepAni', 'ledFollowe', 'moveByInpu', 'vedMorphEv', 'other\x20Tier', 'updatePara', 'isDashingE', 'setBalloon', 'SPIN\x20CCW', 'alloonOffs', 'ushDepth', 'drawText', '5|6', 'Game_Map_i', '_followerC', 'MoveCoreSe', 'setDashing', 'mmand', 'UbkLZ', '5|4|3|6|2|', 'xJUjL', 'gfyRr', 'GSCnJ', 'orHorz', 'checkExist', 'LIGHT', 'wRange', '_needsRefr', 'Hours', 'acter', 'referEvent', 'SwitchGetS', 'onCancel', 'agvvu', 'LQMeD', 'parse', '_stopCount', 'XEXfT', 'mhJHj', 'DEFAULT_SH', 'TJprM', 'EventTempl', 'tyKbu', 'cterBase_m', 'oFrcY', 'ptEVH', 'keys', 'nMdAs', 'aps', 'qBIwH', 'nILGr', 'Map', 'requestBal', 'rNNeS', 'oMOWn', 'isShadowSh', 'isAirshipP', 'registerCo', 'AkOsS', 'pbtCB', 'ired\x20plugi', 'erve', 'etupEvents', 'getLastPlu', 'dGvXR', 'canUpdate', 'meetActiva', 'deleteSave', 'ddkyu', '_periodicR', '_dummyWind', 'rection', 'isStopFoll', 'ojqEB', '_MapSpawne', 'IEIfI', 'racter_ini', 'tSelfVaria', 'roundXWith', 'erBitmap', 'jajOH', 'chTarget', '_eventId', 'isDestinat', 'cVDIs', 'tileWidth', 'includes', 'unlock', 'lwVVR', 'setMoveRou', 'ER_DASH', '_updatePar', 'yhHjD', 'lineHeight', 'updateEven', 'ERCLOCKWIS', 'clearSprit', 'From', 'FCHga', '\x20into\x20the\x20', 'iagonalSet', 'haracter', 'EventDataK', 'CmyFX', 'MoveAllSyn', 'tCFpV', 'oon', 'nOKTarget', 'iagpW', 'cwX', '0|2', 'tionProxim', 'mirror\x20ver', '42300lnWJuo', 'AutoTrigge', '_pattern', 'meetsCPC', 'avEof', 'tical', 'dir8', 'Tjrnk', 'GSXsq', 'Out', 'processEra', 'JXogG', 'ShipSpeed', 'ent', 'setTileBit', 'tLocations', 'ymNco', 'XOYpL', 'Collision', 'setupAttac', 'ELjZP', 'unJGX', 'Sprites', '_checkEven', 'YARGD', '_moveOnlyR', 'destinatio', 'EGbBn', 'Succeeded', 'Iyiru', 'qyXOE', 'WalkAllow', 'ictureBitm', '_target', 'taKey', 'getControl', 'BEQPW', 'efreshTime', 'split', 'XGrZI', '_updateSel', 'ows', 'getDirecti', '%1Allow', 'mCHQs', 'Game_Party', 'processSav', 'PostSpawnJ', 'Refresh', '_scaleX', 'o\x20the\x20list', 'qKYSi', 'destroy', 'MOBILE_EVE', 'OperateVal', 'PeYrr', 'Airship', 'XezzT', 'Pose', 'fadeDurati', 'ier', '25716PIiwEh', 'tchId', 'version', 'CPC', 'originalTe', 'JmQdP', 'gnGEh', 'Oldju', 'IIxXU', 'getTileExp', '0|3|2|4|5|', 'WxlNY', 'pages', 'MULTIPLY', '_moveSynch', 'updateFade', 'isShadowVi', 'onMapLoade', 'ettings', 'Operation', '2|3|1|0|4', 'IconBlendM', 'pzrzQ', 'frontX', 'zYgvW', 'fadeOut', 'SPIN\x20ACW', '_Preserved', 'Ship', 'atpOK', 'sMoveCoreC', 'thData', '_attachPic', 'suRUM', '_onLoadSuc', 'veRoute', 'rseMimic', 'attern', 'iagonalMov', 'turnAwayFr', 'isPosing', 'QMffu', 'MoveRoute', 'witches_se', 'boxWidth', 'timer', 'clear', 'onOnly', 'isVisible', 'LKyFJ', 'ite', 'Window_Scr', 'addChild', 'restoreSav', 'offsetX', 'hwzIH', 'Weight', 'ginCommand', 'eSynchAppr', 'iableValue', 'code', 'startCallE', '77864fhmViN', 'setX', 'MessageCor', 'ventLocati', '_CPCs', 'follower', 'ght', '_events', 'ndMoving', 'setDestina', 'eps', 'scrolledY', 'tileCoordi', 'ngs\x20>\x0a', 'gonalSetti', '_lastPlugi', 'setupSpawn', 'dex', 'FUNC', 'tRegion', 'KoJGU', 'AUEKP', 'ssMoveComm', 'cJEab', 'moveAwayFr', 'LDUCq', 'TemplateNa', '_wholeDura', 'airship', 'vgYtj', 'ZZVAJ', 'sVisible', 'Value', 'Disable', 'moveRouteI', 'jxFYe', 'nkLfr', 'isDashDisa', 'boxCollisi', 'tatuz', 'nTouch', 'IconSet', 'chPictureS', 'nt\x20Core\x27s\x0a', 'DashModifi', 'zjcRL', 'AllForbid', 'rBXBS', 'cateNoteta', 'sMoveCore_', '_moveAllow', 'adjustMove', 'iWKmM', 'ExpireClea', 'RWVCd', 'gets', 'initialize', 'ible', 'KKCUS', 'JGGoe', 'hPictureBi', 'Game_Map_e', 'ontrolID', 'TVouY', 'Forward', 'LVnQZ', 'WUbVx', 'ProximityT', 'entLocatio', 'entDataKey', '\x22\x20plugin\x20c', 'mmonEventO', 'Label', 'vice', 'dSwitchVar', 'ineMove', 'rrmKx', 'setPattern', '1|2|0|4|5|', 'Preserve', 'le_isLandO', 'getPose', 'iority', 'wakPA', '1|6|5|2|3|', 'forceDashi', 'onDatabase', 'clearPose', 'target', 'deleteIcon', 'gEqnK', 'r_increase', 'JtiTW', 'resetSelfS', 'qWtHF', 'adjustY', 'ToCharacte', '3|4', 'GqQKn', 'checkNeedF', 'splice', 'ccwY']; _0x4d4d = function () { return _0x4c979b; }; return _0x4d4d(); } (function (_0xd767b, _0x3aca16) { const _0x147d03 = _0x5c62, _0x85b6bd = _0xd767b(); while (!![]) { try { const _0x13c392 = -parseInt(_0x147d03(0x57e)) / (-0x19ce + 0x10c0 + 0x90f) * (parseInt(_0x147d03(0x505)) / (0x194d + 0xd9d + 0x18 * -0x19f)) + parseInt(_0x147d03(0x444)) / (0xc6d + 0xd4f + -0x3 * 0x893) + -parseInt(_0x147d03(0x9bd)) / (-0x127c + 0x3 * 0xc77 + -0x12e5) + -parseInt(_0x147d03(0x942)) / (-0x6bb + -0x263d + 0x2cfd) + parseInt(_0x147d03(0x97f)) / (0xe3 * 0x17 + 0x1 * 0xc11 + -0x2070) * (-parseInt(_0x147d03(0x4dc)) / (0x88 * -0x44 + -0xcf4 + -0x311b * -0x1)) + -parseInt(_0x147d03(0x497)) / (0x218b + -0xa * 0x25f + -0x9cd) * (parseInt(_0x147d03(0x3b7)) / (-0x7 * 0x3f + 0x13e * 0x7 + -0x6f0)) + -parseInt(_0x147d03(0x84d)) / (0xb56 + 0x138 + -0x12 * 0xb2) * (-parseInt(_0x147d03(0x881)) / (0x4 * -0x761 + -0x1d52 * -0x1 + -0x3d * -0x1)); if (_0x13c392 === _0x3aca16) break; else _0x85b6bd['push'](_0x85b6bd['shift']()); } catch (_0x2839a3) { _0x85b6bd['push'](_0x85b6bd['shift']()); } } }(_0x4d4d, -0xbc92 + -0x567e8 + -0x5eaf * -0x18)); var label = _0x2542b2(0x6af) + 'Core', tier = tier || 0x13a3 + -0x23c5 + -0x3b * -0x46, dependencies = [], pluginData = $plugins[_0x2542b2(0x855)](function (_0x2bb8c2) { const _0x3bbe78 = _0x2542b2, _0x202b69 = { 'bSsjg': function (_0x36c592, _0xffc9b5) { return _0x36c592 + _0xffc9b5; } }; return _0x2bb8c2['status'] && _0x2bb8c2[_0x3bbe78(0x298) + 'n'][_0x3bbe78(0x927)](_0x202b69[_0x3bbe78(0x779)](_0x202b69['bSsjg']('[', label), ']')); })[-0x1bf6 + 0x43 * -0x5 + 0x1d45]; VisuMZ[label][_0x2542b2(0x2cc)] = VisuMZ[label]['Settings'] || {}, VisuMZ['ConvertPar' + _0x2542b2(0x2da)] = function (_0x20a6ce, _0x4e1163) { const _0x5071b0 = _0x2542b2, _0x58d95b = { 'LvtKF': function (_0x3ead31, _0x41c882) { return _0x3ead31(_0x41c882); }, 'SKcFe': _0x5071b0(0x419), 'ncDHi': function (_0x5f4174, _0x4cb842) { return _0x5f4174 !== _0x4cb842; }, 'okvOa': function (_0x30d712, _0x3881b6) { return _0x30d712(_0x3881b6); }, 'cgglQ': 'ARRAYNUM', 'SWpYl': _0x5071b0(0xb33), 'QMffu': function (_0x5ee4ab, _0xf6bbc0) { return _0x5ee4ab(_0xf6bbc0); }, 'ngGXc': _0x5071b0(0xb3a), 'sKDzU': _0x5071b0(0x1e2), 'cQlSe': function (_0x200bf1, _0x46f0e1) { return _0x200bf1 !== _0x46f0e1; }, 'tVFbN': _0x5071b0(0x2db), 'nUzru': _0x5071b0(0x9cf), 'LDqWZ': function (_0x1f5ead, _0x4b9897) { return _0x1f5ead !== _0x4b9897; }, 'rjrBD': _0x5071b0(0xacb), 'RWoLA': _0x5071b0(0xafb), 'XHCrL': 'STR', 'pKPVD': function (_0x46f4d9, _0x23b31d) { return _0x46f4d9 !== _0x23b31d; }, 'UbkLZ': 'ARRAYSTR', 'zCWaA': 'STRUCT', 'jVuIA': function (_0x406222, _0x2573f2) { return _0x406222 !== _0x2573f2; }, 'aDBMR': _0x5071b0(0x6a4) + 'T' }; for (const _0x56cdd7 in _0x4e1163) { if (_0x56cdd7[_0x5071b0(0x4d6)](/(.*):(.*)/i)) { const _0x5d36e0 = _0x58d95b[_0x5071b0(0x33f)](String, RegExp['$1']), _0x58cdea = _0x58d95b[_0x5071b0(0x33f)](String, RegExp['$2'])['toUpperCas' + 'e']()[_0x5071b0(0x7fa)](); let _0x39b276, _0x5d8b3a, _0x5b273f; switch (_0x58cdea) { case _0x58d95b[_0x5071b0(0x3bf)]: _0x39b276 = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? _0x58d95b[_0x5071b0(0x704)](Number, _0x4e1163[_0x56cdd7]) : 0xffa + 0x7 * -0x129 + -0x1 * 0x7db; break; case _0x58d95b[_0x5071b0(0x34c)]: _0x5d8b3a = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a[_0x5071b0(0xaf6)](_0x11e27d => Number(_0x11e27d)); break; case _0x58d95b[_0x5071b0(0x748)]: _0x39b276 = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? _0x58d95b[_0x5071b0(0x9a8)](eval, _0x4e1163[_0x56cdd7]) : null; break; case _0x58d95b['ngGXc']: _0x5d8b3a = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? JSON['parse'](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a['map'](_0x3ca13b => eval(_0x3ca13b)); break; case _0x58d95b[_0x5071b0(0x626)]: _0x39b276 = _0x58d95b[_0x5071b0(0x7fb)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : ''; break; case _0x58d95b[_0x5071b0(0x554)]: _0x5d8b3a = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a[_0x5071b0(0xaf6)](_0x49c732 => JSON[_0x5071b0(0x8f4)](_0x49c732)); break; case _0x58d95b[_0x5071b0(0x2e8)]: _0x39b276 = _0x58d95b['LDqWZ'](_0x4e1163[_0x56cdd7], '') ? new Function(JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7])) : new Function(_0x58d95b[_0x5071b0(0x720)]); break; case _0x58d95b['RWoLA']: _0x5d8b3a = _0x58d95b[_0x5071b0(0x87c)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a[_0x5071b0(0xaf6)](_0x2f0b32 => new Function(JSON[_0x5071b0(0x8f4)](_0x2f0b32))); break; case _0x58d95b[_0x5071b0(0x41f)]: _0x39b276 = _0x58d95b['pKPVD'](_0x4e1163[_0x56cdd7], '') ? _0x58d95b[_0x5071b0(0x9a8)](String, _0x4e1163[_0x56cdd7]) : ''; break; case _0x58d95b[_0x5071b0(0x8e3)]: _0x5d8b3a = _0x58d95b[_0x5071b0(0x3fe)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a['map'](_0x2fe4a5 => String(_0x2fe4a5)); break; case _0x58d95b['zCWaA']: _0x5b273f = _0x58d95b[_0x5071b0(0x6fc)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : {}, _0x20a6ce[_0x5d36e0] = {}, VisuMZ[_0x5071b0(0x26a) + _0x5071b0(0x2da)](_0x20a6ce[_0x5d36e0], _0x5b273f); continue; case _0x58d95b[_0x5071b0(0x3d8)]: _0x5d8b3a = _0x58d95b[_0x5071b0(0x87c)](_0x4e1163[_0x56cdd7], '') ? JSON[_0x5071b0(0x8f4)](_0x4e1163[_0x56cdd7]) : [], _0x39b276 = _0x5d8b3a[_0x5071b0(0xaf6)](_0xc934a2 => VisuMZ[_0x5071b0(0x26a) + _0x5071b0(0x2da)]({}, JSON[_0x5071b0(0x8f4)](_0xc934a2))); break; default: continue; }_0x20a6ce[_0x5d36e0] = _0x39b276; } } return _0x20a6ce; }, (_0x544c23 => { const _0x2268c5 = _0x2542b2, _0x2847be = { 'zmHvl': function (_0x2e99bf, _0x4f0b19) { return _0x2e99bf(_0x4f0b19); }, 'EsGIv': _0x2268c5(0x7c7) + 'ing\x20a\x20requ' + _0x2268c5(0x90d) + 'n.\x0aPlease\x20' + 'install\x20%2' + _0x2268c5(0x934) + _0x2268c5(0xa80) + _0x2268c5(0xa7b), 'XTdtK': function (_0x380072, _0x4b604a) { return _0x380072(_0x4b604a); }, 'qZTzs': function (_0x182d61, _0x5907e1) { return _0x182d61 !== _0x5907e1; }, 'UwWnT': function (_0x5c20ba, _0x1e8f57) { return _0x5c20ba(_0x1e8f57); }, 'ohBvn': _0x2268c5(0x3ea) + _0x2268c5(0x31d) + _0x2268c5(0x713) + 'ugin\x27s.\x20Pl' + _0x2268c5(0x87e) + _0x2268c5(0x764) + _0x2268c5(0x538) + _0x2268c5(0x4f5), 'IczYX': function (_0x44a04b, _0x5c822b) { return _0x44a04b < _0x5c822b; }, 'UwQKY': _0x2268c5(0x44c) + 'rrectly\x20pl' + _0x2268c5(0x4f3) + _0x2268c5(0x7c8) + 'ist.\x0aIt\x20is' + _0x2268c5(0x66e) + _0x2268c5(0x205) + 'aced\x20over\x20' + _0x2268c5(0x8d5) + _0x2268c5(0x717) + 's.\x0aPlease\x20' + _0x2268c5(0x7f5) + _0x2268c5(0x7c8) + _0x2268c5(0x21d) + _0x2268c5(0xa6f) + _0x2268c5(0x385) + _0x2268c5(0x62b) + 's.' }, _0x5815af = _0x544c23[_0x2268c5(0x51e)]; for (const _0x463e71 of dependencies) { if (!Imported[_0x463e71]) { _0x2847be[_0x2268c5(0x875)](alert, _0x2847be[_0x2268c5(0xa4d)]['format'](_0x5815af, _0x463e71)), SceneManager[_0x2268c5(0x80f)](); break; } } const _0x464dee = _0x544c23[_0x2268c5(0x298) + 'n']; if (_0x464dee[_0x2268c5(0x4d6)](/\[Version[ ](.*?)\]/i)) { const _0x518ab0 = _0x2847be[_0x2268c5(0xb36)](Number, RegExp['$1']); _0x2847be['qZTzs'](_0x518ab0, VisuMZ[label][_0x2268c5(0x981)]) && (_0x2847be[_0x2268c5(0x806)](alert, _0x2847be[_0x2268c5(0xa54)][_0x2268c5(0x2c1)](_0x5815af, _0x518ab0)), SceneManager[_0x2268c5(0x80f)]()); } if (_0x464dee[_0x2268c5(0x4d6)](/\[Tier[ ](\d+)\]/i)) { const _0x358067 = _0x2847be[_0x2268c5(0xb36)](Number, RegExp['$1']); _0x2847be[_0x2268c5(0x542)](_0x358067, tier) ? (_0x2847be[_0x2268c5(0x806)](alert, _0x2847be['UwQKY'][_0x2268c5(0x2c1)](_0x5815af, _0x358067, tier)), SceneManager[_0x2268c5(0x80f)]()) : tier = Math[_0x2268c5(0x89c)](_0x358067, tier); } VisuMZ[_0x2268c5(0x26a) + 'ams'](VisuMZ[label][_0x2268c5(0x2cc)], _0x544c23['parameters']); })(pluginData), VisuMZ[_0x2542b2(0x978) + 'ues'] = function (_0x47ddb2, _0x4da83c, _0xbb49f1) { const _0x445d35 = _0x2542b2, _0x4de911 = { 'gsCTQ': function (_0x537c0e, _0x1690dc) { return _0x537c0e + _0x1690dc; }, 'ayycQ': function (_0x285d6f, _0x9742e9) { return _0x285d6f - _0x9742e9; }, 'ZfiMf': function (_0x551bb7, _0x2f3cc8) { return _0x551bb7 * _0x2f3cc8; }, 'jvQRT': function (_0x55ed77, _0x4cd383) { return _0x55ed77 / _0x4cd383; }, 'DVRda': function (_0x98c54a, _0x1fcae9) { return _0x98c54a % _0x1fcae9; } }; switch (_0xbb49f1) { case '=': return _0x4da83c; break; case '+': return _0x4de911[_0x445d35(0x289)](_0x47ddb2, _0x4da83c); break; case '-': return _0x4de911['ayycQ'](_0x47ddb2, _0x4da83c); break; case '*': return _0x4de911[_0x445d35(0x7c1)](_0x47ddb2, _0x4da83c); break; case '/': return _0x4de911[_0x445d35(0x693)](_0x47ddb2, _0x4da83c); break; case '%': return _0x4de911['DVRda'](_0x47ddb2, _0x4da83c); break; }return _0x47ddb2; }, PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'AutoMoveEv' + _0x2542b2(0x865), _0x8e365d => { const _0x24f2f9 = _0x2542b2, _0x4e3f0d = { 'OwoRG': _0x24f2f9(0x78c), 'yDNxL': _0x24f2f9(0x3d0), 'VVlAb': _0x24f2f9(0x546) }; VisuMZ[_0x24f2f9(0x26a) + _0x24f2f9(0x2da)](_0x8e365d, _0x8e365d); switch (_0x8e365d['Value']) { case _0x4e3f0d[_0x24f2f9(0xb23)]: $gameSystem[_0x24f2f9(0x7b1) + _0x24f2f9(0x232) + 'ement'](!![]); break; case _0x4e3f0d[_0x24f2f9(0xb18)]: $gameSystem['setAllowEv' + _0x24f2f9(0x232) + 'ement'](![]); break; case _0x4e3f0d[_0x24f2f9(0x63b)]: $gameSystem[_0x24f2f9(0x7b1) + _0x24f2f9(0x232) + 'ement'](!$gameSystem[_0x24f2f9(0x5f9) + _0x24f2f9(0x89e) + _0x24f2f9(0x577)]()); break; } }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData['name'], _0x2542b2(0x632), _0x25cd6e => { const _0x207d6e = _0x2542b2, _0x1e1295 = { 'Aawrh': function (_0x1583af, _0x53a6a3) { return _0x1583af <= _0x53a6a3; } }; VisuMZ[_0x207d6e(0x26a) + _0x207d6e(0x2da)](_0x25cd6e, _0x25cd6e); const _0x3cd1d8 = $gameTemp['getLastPlu' + _0x207d6e(0x9b8) + _0x207d6e(0x290) + 'r'](), _0x156787 = { 'mapId': _0x25cd6e[_0x207d6e(0xae0)], 'eventId': _0x25cd6e[_0x207d6e(0x21e)] || _0x3cd1d8[_0x207d6e(0x478)](), 'pageId': _0x25cd6e[_0x207d6e(0x6c4)] }; if (_0x1e1295[_0x207d6e(0x3f8)](_0x156787[_0x207d6e(0x2b8)], 0x6 * -0xdd + -0x13d9 * -0x1 + -0xeab)) _0x156787['mapId'] = $gameMap ? $gameMap[_0x207d6e(0x2b8)]() : -0x9f * 0x2b + -0xccb + -0x3 * -0xd2b; $gameTemp[_0x207d6e(0x910) + _0x207d6e(0x9b8) + _0x207d6e(0x290) + 'r']()[_0x207d6e(0xaaf) + _0x207d6e(0xae7) + 'nt'](_0x156787); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x7e2) + _0x2542b2(0x546), _0x1f4c4a => { const _0xa13089 = _0x2542b2, _0x277a56 = { 'wKkFx': _0xa13089(0x7e4), 'xBhKN': _0xa13089(0x9de), 'RXYCr': _0xa13089(0x546) }; VisuMZ[_0xa13089(0x26a) + _0xa13089(0x2da)](_0x1f4c4a, _0x1f4c4a); switch (_0x1f4c4a[_0xa13089(0x9dd)]) { case _0x277a56['wKkFx']: $gameSystem[_0xa13089(0x8e1) + _0xa13089(0x64d)](!![]); break; case _0x277a56[_0xa13089(0x5cf)]: $gameSystem[_0xa13089(0x8e1) + 'Enabled'](![]); break; case _0x277a56[_0xa13089(0x623)]: $gameSystem[_0xa13089(0x8e1) + _0xa13089(0x64d)](!$gameSystem[_0xa13089(0x8d7) + _0xa13089(0x523)]()); break; } }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'EventIconC' + 'hange', _0x23df1c => { const _0x43df20 = _0x2542b2; VisuMZ[_0x43df20(0x26a) + _0x43df20(0x2da)](_0x23df1c, _0x23df1c); const _0x3fab1b = $gameTemp['getLastPlu' + 'ginCommand' + _0x43df20(0x290) + 'r'](); _0x23df1c[_0x43df20(0xae0)] = _0x23df1c[_0x43df20(0xae0)] || $gameMap[_0x43df20(0x2b8)](), $gameSystem[_0x43df20(0x527) + _0x43df20(0x797)](_0x23df1c[_0x43df20(0xae0)], _0x23df1c['EventId'] || _0x3fab1b[_0x43df20(0x478)](), _0x23df1c[_0x43df20(0x231)], _0x23df1c[_0x43df20(0x74b) + 'X'], _0x23df1c['IconBuffer' + 'Y'], _0x23df1c[_0x43df20(0x994) + 'ode'], ![]); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'EventIconC' + _0x2542b2(0x83e) + 'd', _0x16c7bf => { const _0x244100 = _0x2542b2; VisuMZ[_0x244100(0x26a) + _0x244100(0x2da)](_0x16c7bf, _0x16c7bf); const _0x54ca0f = $gameTemp[_0x244100(0x910) + _0x244100(0x9b8) + _0x244100(0x290) + 'r'](); _0x16c7bf['MapId'] = _0x16c7bf['MapId'] || $gameMap[_0x244100(0x2b8)](), $gameSystem[_0x244100(0x527) + _0x244100(0x797)](_0x16c7bf['MapId'], _0x16c7bf['EventId'] || _0x54ca0f['eventId'](), _0x16c7bf[_0x244100(0x231)], _0x16c7bf[_0x244100(0x74b) + 'X'], _0x16c7bf['IconBuffer' + 'Y'], _0x16c7bf[_0x244100(0x994) + _0x244100(0x75d)], !![]); }), PluginManager['registerCo' + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x753) + _0x2542b2(0x8bb), _0x14346d => { const _0x4267f4 = _0x2542b2; VisuMZ[_0x4267f4(0x26a) + _0x4267f4(0x2da)](_0x14346d, _0x14346d); const _0x3abecb = $gameTemp[_0x4267f4(0x910) + 'ginCommand' + _0x4267f4(0x290) + 'r'](); _0x14346d[_0x4267f4(0xae0)] = _0x14346d[_0x4267f4(0xae0)] || $gameMap[_0x4267f4(0x2b8)](), $gameSystem[_0x4267f4(0xa16) + _0x4267f4(0x5b7) + _0x4267f4(0x258)](_0x14346d[_0x4267f4(0xae0)], _0x14346d[_0x4267f4(0x21e)] || _0x3abecb[_0x4267f4(0x478)]()); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x304) + _0x2542b2(0x5e2), _0x392b37 => { const _0x22d1dd = _0x2542b2; VisuMZ[_0x22d1dd(0x26a) + 'ams'](_0x392b37, _0x392b37); const _0xba91f = $gameTemp[_0x22d1dd(0x910) + _0x22d1dd(0x9b8) + _0x22d1dd(0x290) + 'r'](); _0x392b37[_0x22d1dd(0xae0)] = _0x392b37[_0x22d1dd(0xae0)] || $gameMap[_0x22d1dd(0x2b8)](), $gameSystem['restoreIco' + 'nsOnEvents' + _0x22d1dd(0x514)](_0x392b37[_0x22d1dd(0xae0)], _0x392b37['EventId'] || _0xba91f[_0x22d1dd(0x478)]()); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'EventLabel' + 'Refresh', _0x45675f => { const _0x5f2286 = _0x2542b2; if ($gameMap) for (const _0x8c3f64 of $gameMap['events']()) { _0x8c3f64[_0x5f2286(0x4db)](), _0x8c3f64[_0x5f2286(0x92f) + _0x5f2286(0x45d)](); } if (SceneManager['isSceneMap']()) { const _0x5ea12a = SceneManager[_0x5f2286(0x40e)][_0x5f2286(0x541)]; if (_0x5ea12a) _0x5ea12a['refreshEve' + _0x5f2286(0x655)](); } }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x4dd) + _0x2542b2(0xa5f), _0x216ce5 => { const _0x3d9bcd = _0x2542b2, _0xa21b6f = { 'TrmNO': _0x3d9bcd(0xa5f), 'qKYSi': 'Hidden', 'Dfita': 'Toggle' }; VisuMZ['ConvertPar' + 'ams'](_0x216ce5, _0x216ce5); switch (_0x216ce5[_0x3d9bcd(0x220)]) { case _0xa21b6f['TrmNO']: $gameSystem[_0x3d9bcd(0x725) + _0x3d9bcd(0xac4) + 'e'](!![]); break; case _0xa21b6f[_0x3d9bcd(0x975)]: $gameSystem[_0x3d9bcd(0x725) + _0x3d9bcd(0xac4) + 'e'](![]); break; case _0xa21b6f[_0x3d9bcd(0x6ac)]: $gameSystem[_0x3d9bcd(0x725) + _0x3d9bcd(0xac4) + 'e'](!$gameSystem[_0x3d9bcd(0x79d) + 'sVisible']()); break; } }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x4ee) + _0x2542b2(0x5ea), _0x56dbc4 => { const _0x777063 = _0x2542b2; VisuMZ[_0x777063(0x26a) + _0x777063(0x2da)](_0x56dbc4, _0x56dbc4); const _0x2628ba = $gameTemp[_0x777063(0x910) + 'ginCommand' + _0x777063(0x290) + 'r'](); if (!$gameMap) return; const _0x312e39 = $gameMap[_0x777063(0x264)](_0x56dbc4[_0x777063(0x21e)] || _0x2628ba['eventId']()); if (_0x312e39) _0x312e39['saveEventL' + 'ocation'](); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x4ee) + _0x2542b2(0x7d2), _0x12d263 => { const _0x635c2a = _0x2542b2, _0x260a28 = { 'cXZRH': function (_0x531d0f, _0x379598) { return _0x531d0f - _0x379598; } }; VisuMZ[_0x635c2a(0x26a) + _0x635c2a(0x2da)](_0x12d263, _0x12d263); const _0x23b2f3 = $gameTemp[_0x635c2a(0x910) + _0x635c2a(0x9b8) + _0x635c2a(0x290) + 'r'](), _0x2a3516 = _0x12d263[_0x635c2a(0xae0)] || $gameMap['mapId'](), _0x290d28 = _0x12d263[_0x635c2a(0x21e)] || _0x23b2f3[_0x635c2a(0x478)](), _0x1731d3 = _0x12d263['PosX'] || -0x137 * -0x4 + -0xd8b + 0x39 * 0x27, _0x37da5d = _0x12d263[_0x635c2a(0xa2e)] || 0x524 * 0x1 + -0x1abf + 0x159b, _0x56dd5d = _0x12d263['Direction'] || 0x15f7 * 0x1 + 0x1b3f + -0x3134, _0x418ae1 = _0x260a28[_0x635c2a(0x481)](_0x12d263[_0x635c2a(0x6c4)] || 0x17b4 * 0x1 + -0x1 * 0xb7f + -0x4 * 0x30d, 0x3f1 * -0x6 + 0x1 * 0xa0a + 0x5 * 0x2b9)[_0x635c2a(0x6b4)](0x2bd * 0x3 + -0x43 * 0x3b + -0x19 * -0x4a, 0xb * -0x201 + -0x1 * 0x23ae + -0x6 * -0x9a2), _0x2f36d9 = _0x12d263[_0x635c2a(0x2ca) + _0x635c2a(0x28a)] || 0x3 * 0x6a1 + 0xfa1 * 0x1 + 0x4 * -0x8e1; $gameSystem[_0x635c2a(0x3cc) + _0x635c2a(0x4ee) + _0x635c2a(0x568)](_0x2a3516, _0x290d28, _0x1731d3, _0x37da5d, _0x56dd5d, _0x418ae1, _0x2f36d9); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x4ee) + _0x2542b2(0x340), _0x5857bf => { const _0x55793c = _0x2542b2; VisuMZ[_0x55793c(0x26a) + _0x55793c(0x2da)](_0x5857bf, _0x5857bf); const _0x364822 = $gameTemp[_0x55793c(0x910) + _0x55793c(0x9b8) + 'Interprete' + 'r'](), _0x37da6f = _0x5857bf[_0x55793c(0xae0)] || $gameMap[_0x55793c(0x2b8)](), _0x1c2a22 = _0x5857bf[_0x55793c(0x21e)] || _0x364822[_0x55793c(0x478)](); $gameSystem[_0x55793c(0x914) + _0x55793c(0x674) + 'tionKey'](_0x37da6f, _0x1c2a22); }), VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x4ae) + 'ExtraSetti' + _0x2542b2(0x786)] = function (_0x580377, _0x5770f9) { const _0x285054 = _0x2542b2, _0x45d274 = { 'jfdGg': _0x285054(0x464) + '3|4|5', 'zpseS': function (_0x268e8e, _0x240cf6) { return _0x268e8e || _0x240cf6; } }, _0x2150e1 = _0x45d274[_0x285054(0x3ca)][_0x285054(0x968)]('|'); let _0x3b2c93 = -0x1723 + -0x215d + 0x3880; while (!![]) { switch (_0x2150e1[_0x3b2c93++]) { case '0': _0x580377['fadeDurati' + 'on'] = { 'fadeIn': _0x5770f9[_0x285054(0x78a) + _0x285054(0x388)] || -0x7 * 0x233 + -0x4 * -0x11 + 0x3 * 0x50b, 'fadeOut': _0x5770f9[_0x285054(0x338) + _0x285054(0x455)] || 0x1 * 0x242f + -0x18c3 + 0x11 * -0xac }; continue; case '1': _0x580377[_0x285054(0x227)] = { 'x': _0x5770f9['endOffsetX'] || -0x3d7 * 0x1 + 0x10e * 0x2 + 0x1 * 0x1bb, 'y': _0x5770f9[_0x285054(0x535)] || -0xb0d + 0x20ed * 0x1 + -0xa * 0x230 }; continue; case '2': _0x580377[_0x285054(0x457) + 't'] = { 'x': _0x5770f9[_0x285054(0x457) + 'tX'] || -0x16b1 + -0x3 * 0xbdf + 0x22 * 0x1b7, 'y': _0x5770f9[_0x285054(0x457) + 'tY'] || -0x18d4 + -0x18d + 0x1a61 }; continue; case '3': _0x580377[_0x285054(0x6b8)] = { 'x': _0x5770f9[_0x285054(0x6b8) + 'X'] || -0x1d1b + -0x23f9 + -0x77 * -0x8c, 'y': _0x5770f9[_0x285054(0x6b8) + 'Y'] || -0x17e7 + 0x257 + 0x1590 }; continue; case '4': _0x580377['angle'] = { 'start': _0x5770f9[_0x285054(0x37e)] || -0x159 + -0x10f8 + 0x1251, 'end': _0x5770f9['endAngle'] || 0x71 * 0x38 + -0x1f * 0xea + 0x39e }; continue; case '5': _0x580377[_0x285054(0x297)] = { 'arc': _0x5770f9[_0x285054(0x737)] || 0x66c + 0x1a51 * 0x1 + -0x20bd }; continue; case '6': _0x580377[_0x285054(0x2a5)] = { 'x': _0x5770f9[_0x285054(0x33c)] || 0x26eb + 0x6f * -0x1c + -0x1ac7, 'y': _0x5770f9['endScaleY'] || 0x1a51 * 0x1 + 0x1 * 0x57b + -0x1fcc }; continue; case '7': _0x5770f9 = _0x45d274[_0x285054(0x451)](_0x5770f9, {}); continue; }break; } }, PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x637) + _0x2542b2(0xb48), _0x40a833 => { const _0x3ff976 = _0x2542b2, _0x4f69a7 = { 'oMOWn': function (_0x4a75b5, _0x51b354) { return _0x4a75b5(_0x51b354); }, 'GBJYo': function (_0x579abf, _0x1fb0cd) { return _0x579abf + _0x1fb0cd; }, 'teKWw': _0x3ff976(0x3bb) + _0x3ff976(0x333) + _0x3ff976(0xaa7) + 'ed\x20to\x20run\x20', 'uEINT': '\x22Event\x20Pop' + _0x3ff976(0x668) + _0x3ff976(0xa03) + _0x3ff976(0x23f) }; if (!SceneManager[_0x3ff976(0x3cd) + 'OfSceneMap']()) return; if (!Imported[_0x3ff976(0x3bb) + _0x3ff976(0x333)]) { $gameTemp['isPlaytest']() && _0x4f69a7[_0x3ff976(0x907)](alert, _0x4f69a7[_0x3ff976(0x88d)](_0x4f69a7['teKWw'], _0x4f69a7['uEINT'])); return; } VisuMZ[_0x3ff976(0x26a) + _0x3ff976(0x2da)](_0x40a833, _0x40a833); const _0x30053 = { 'text': _0x40a833[_0x3ff976(0x1d2) + 't'] || '', 'duration': Math['max'](_0x40a833[_0x3ff976(0x28d) + 'n'] || 0x2 * -0x496 + -0x9 * 0xb2 + 0xfaa, -0x22da + 0x29c + 0x204a) }, _0x4b996d = _0x40a833[_0x3ff976(0x83a)] || {}; VisuMZ['EventsMove' + _0x3ff976(0x53e)][_0x3ff976(0x4ae) + _0x3ff976(0x1e8) + _0x3ff976(0x786)](_0x30053, _0x4b996d); const _0x33380e = SceneManager[_0x3ff976(0x40e)][_0x3ff976(0x541)]; if (_0x33380e) { const _0x1a7da3 = $gamePlayer; _0x33380e[_0x3ff976(0x76f) + _0x3ff976(0xb06) + _0x3ff976(0x46f) + 'up'](_0x1a7da3, _0x30053); } }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0xa4b) + _0x2542b2(0xad2), _0xb67c2d => { const _0x4c61ef = _0x2542b2, _0x221a3f = { 'bpdHB': function (_0x4437be, _0x50d675) { return _0x4437be(_0x50d675); }, 'cstLr': function (_0x3590a8, _0x20c7e3) { return _0x3590a8 + _0x20c7e3; }, 'crvvk': _0x4c61ef(0x3bb) + _0x4c61ef(0x333) + _0x4c61ef(0xaa7) + _0x4c61ef(0x5c7), 'YrYwO': _0x4c61ef(0x78d) + _0x4c61ef(0x668) + _0x4c61ef(0xa03) + 'ommand!' }; if (!SceneManager[_0x4c61ef(0x3cd) + _0x4c61ef(0x493)]()) return; if (!Imported[_0x4c61ef(0x3bb) + _0x4c61ef(0x333)]) { $gameTemp[_0x4c61ef(0x4e1)]() && _0x221a3f[_0x4c61ef(0x5d0)](alert, _0x221a3f['cstLr'](_0x221a3f[_0x4c61ef(0x40a)], _0x221a3f['YrYwO'])); return; } VisuMZ[_0x4c61ef(0x26a) + _0x4c61ef(0x2da)](_0xb67c2d, _0xb67c2d); const _0x49c00e = _0xb67c2d['FollowerIn' + _0x4c61ef(0x9ce)] || 0x3c7 + -0x2 * 0x1306 + 0x2245, _0x56e60 = { 'text': _0xb67c2d[_0x4c61ef(0x1d2) + 't'] || '', 'duration': Math['max'](_0xb67c2d[_0x4c61ef(0x28d) + 'n'] || -0x2 * -0x4bd + -0x171d * -0x1 + -0x205b, 0x13ac + 0x1770 + -0x2b10) }, _0x3f4bf7 = _0xb67c2d['PopupExtra'] || {}; VisuMZ[_0x4c61ef(0x6af) + _0x4c61ef(0x53e)][_0x4c61ef(0x4ae) + _0x4c61ef(0x1e8) + _0x4c61ef(0x786)](_0x56e60, _0x3f4bf7); const _0x3ea4b9 = SceneManager[_0x4c61ef(0x40e)][_0x4c61ef(0x541)]; if (_0x3ea4b9) { const _0x2bd116 = $gamePlayer[_0x4c61ef(0x636)]()[_0x4c61ef(0x9c2)](_0x49c00e); _0x3ea4b9[_0x4c61ef(0x76f) + _0x4c61ef(0xb06) + _0x4c61ef(0x46f) + 'up'](_0x2bd116, _0x56e60); } }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x774) + _0x2542b2(0x94f), _0x416931 => { const _0x33ea5a = _0x2542b2, _0x33a52e = { 'LCeRG': function (_0x56728a, _0x98282a) { return _0x56728a(_0x98282a); }, 'uQAPh': function (_0x30e012, _0x30e0c9) { return _0x30e012 + _0x30e0c9; }, 'vifck': 'VisuMZ_1_M' + _0x33ea5a(0x333) + _0x33ea5a(0xaa7) + 'ed\x20to\x20run\x20', 'Bjyfx': _0x33ea5a(0x78d) + _0x33ea5a(0x668) + _0x33ea5a(0xa03) + _0x33ea5a(0x23f) }; if (!SceneManager[_0x33ea5a(0x3cd) + _0x33ea5a(0x493)]()) return; if (!Imported['VisuMZ_1_M' + _0x33ea5a(0x333)]) { $gameTemp[_0x33ea5a(0x4e1)]() && _0x33a52e[_0x33ea5a(0x29f)](alert, _0x33a52e[_0x33ea5a(0x56b)](_0x33a52e[_0x33ea5a(0x441)], _0x33a52e[_0x33ea5a(0x411)])); return; } VisuMZ[_0x33ea5a(0x26a) + 'ams'](_0x416931, _0x416931); const _0x53e70c = $gameTemp[_0x33ea5a(0x910) + _0x33ea5a(0x9b8) + _0x33ea5a(0x290) + 'r'](), _0x45acc5 = _0x416931['EventId'] || (_0x53e70c ? _0x53e70c[_0x33ea5a(0x478)]() : -0x2301 + 0x2 * -0x9d7 + -0x15e * -0x28), _0xe61c80 = { 'text': _0x416931[_0x33ea5a(0x1d2) + 't'] || '', 'duration': Math['max'](_0x416931[_0x33ea5a(0x28d) + 'n'] || -0x2001 + 0x23c2 + -0x385, -0x275 * 0x7 + 0x2b2 + 0x1 * 0xe8d) }, _0x3e39de = _0x416931[_0x33ea5a(0x83a)] || {}; VisuMZ[_0x33ea5a(0x6af) + _0x33ea5a(0x53e)]['ApplyPopup' + 'ExtraSetti' + _0x33ea5a(0x786)](_0xe61c80, _0x3e39de); const _0xeb4e31 = SceneManager[_0x33ea5a(0x40e)][_0x33ea5a(0x541)]; if (_0xeb4e31) { const _0x7257fe = $gameMap[_0x33ea5a(0x264)](_0x45acc5); _0xeb4e31[_0x33ea5a(0x76f) + _0x33ea5a(0xb06) + _0x33ea5a(0x46f) + 'up'](_0x7257fe, _0xe61c80); } }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x817) + _0x2542b2(0x82d), _0x56dbb5 => { const _0x265e64 = _0x2542b2, _0x36a8c3 = { 'Dmitc': function (_0x3a61d8, _0x4b1335) { return _0x3a61d8(_0x4b1335); }, 'QCrdw': function (_0x3f891b, _0x3494d2) { return _0x3f891b + _0x3494d2; }, 'KwNJz': 'VisuMZ_1_M' + _0x265e64(0x333) + _0x265e64(0xaa7) + 'ed\x20to\x20run\x20', 'dzWYu': _0x265e64(0x78d) + _0x265e64(0x668) + _0x265e64(0xa03) + _0x265e64(0x23f) }; if (!SceneManager[_0x265e64(0x3cd) + _0x265e64(0x493)]()) return; if (!Imported[_0x265e64(0x3bb) + _0x265e64(0x333)]) { $gameTemp[_0x265e64(0x4e1)]() && _0x36a8c3['Dmitc'](alert, _0x36a8c3[_0x265e64(0xb61)](_0x36a8c3[_0x265e64(0x724)], _0x36a8c3['dzWYu'])); return; } VisuMZ[_0x265e64(0x26a) + 'ams'](_0x56dbb5, _0x56dbb5); const _0x28a47a = { 'text': _0x56dbb5[_0x265e64(0x1d2) + 't'] || '', 'duration': Math[_0x265e64(0x89c)](_0x56dbb5[_0x265e64(0x28d) + 'n'] || 0x17 * -0x15d + -0x2561 + 0x44f8, -0x5 * 0x59 + -0x493 * 0x1 + 0x65c), 'tileCoordinates': { 'x': Math[_0x265e64(0x3c7)](_0x56dbb5[_0x265e64(0xa83)] || 0x1fbb + -0x6 * -0x438 + -0x390b), 'y': Math['round'](_0x56dbb5[_0x265e64(0x838)] || -0x1029 + 0x211d + 0x10f4 * -0x1) } }, _0x3d43b1 = _0x56dbb5[_0x265e64(0x83a)] || {}; VisuMZ['EventsMove' + _0x265e64(0x53e)]['ApplyPopup' + 'ExtraSetti' + _0x265e64(0x786)](_0x28a47a, _0x3d43b1); const _0x31d74c = SceneManager['_scene']['_spriteset']; _0x31d74c && _0x31d74c[_0x265e64(0x76f) + _0x265e64(0xb06) + _0x265e64(0x2d9) + _0x265e64(0x445)](_0x28a47a); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'EventTimer' + _0x2542b2(0x7fc) + 't', _0x51ae8d => { const _0x5843d6 = _0x2542b2; VisuMZ['ConvertPar' + _0x5843d6(0x2da)](_0x51ae8d, _0x51ae8d); const _0x64a81b = _0x51ae8d[_0x5843d6(0x55c) + 'tID']; $gameTimer[_0x5843d6(0x296) + _0x5843d6(0x3c5)](_0x64a81b); }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData['name'], 'EventTimer' + _0x2542b2(0x9f2) + 'r', _0x56c6f6 => { const _0x5eff4e = _0x2542b2; $gameTimer[_0x5eff4e(0x296) + _0x5eff4e(0x3c5)](0x828 + 0x254f * 0x1 + 0x1 * -0x2d77); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x5de) + _0x2542b2(0x39a), _0x3176d1 => { const _0x4f251f = _0x2542b2, _0x26b00d = { 'bYmso': function (_0x10ef44, _0x44416f) { return _0x10ef44 * _0x44416f; }, 'gKldM': function (_0x53b6cc, _0x24c49a) { return _0x53b6cc * _0x24c49a; }, 'aQuiT': function (_0x350875, _0x856a08) { return _0x350875 * _0x856a08; } }; if (!$gameTimer[_0x4f251f(0x425)]()) return; VisuMZ[_0x4f251f(0x26a) + _0x4f251f(0x2da)](_0x3176d1, _0x3176d1); let _0x52ddc5 = -0x1 * -0x104e + 0x15a3 + -0x25f1; _0x52ddc5 += _0x3176d1[_0x4f251f(0x4f0)], _0x52ddc5 += _0x26b00d['bYmso'](_0x3176d1[_0x4f251f(0xa35)], 0x1d * 0x8b + -0xea7 + -0xdc), _0x52ddc5 += _0x26b00d[_0x4f251f(0x359)](_0x26b00d['gKldM'](_0x3176d1[_0x4f251f(0xa90)], 0x1 * -0x977 + 0x6 * 0x101 + 0x1 * 0x3ad), 0x1ffe + -0x1603 + -0x1 * 0x9bf), _0x52ddc5 += _0x26b00d[_0x4f251f(0x672)](_0x26b00d[_0x4f251f(0x672)](_0x26b00d[_0x4f251f(0x8b6)](_0x3176d1[_0x4f251f(0x8ed)], -0x1809 + 0x13 * 0xd0 + 0x8d5), -0x3 * -0x61f + 0x11cf + 0x5 * -0x730), 0x7b * -0xd + 0x234c + -0x1cd1), $gameTimer[_0x4f251f(0x6f2)](_0x52ddc5); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x5de) + _0x2542b2(0x2ec), _0x5971c9 => { const _0x485723 = _0x2542b2, _0x388daf = { 'vUBUr': function (_0x5d94e9, _0x45369a) { return _0x5d94e9 * _0x45369a; }, 'PhOyB': function (_0x222e93, _0x3edaaf) { return _0x222e93 * _0x3edaaf; }, 'CRZTB': function (_0x11a8a8, _0x28ca44) { return _0x11a8a8 * _0x28ca44; }, 'LKdwe': function (_0x33ac6c, _0x34c648) { return _0x33ac6c * _0x34c648; } }; if (!$gameTimer[_0x485723(0x425)]()) return; VisuMZ[_0x485723(0x26a) + 'ams'](_0x5971c9, _0x5971c9); let _0x21c79f = 0x6de * 0x2 + -0x18a1 + -0x1 * -0xae5; _0x21c79f += _0x5971c9[_0x485723(0x4f0)], _0x21c79f += _0x388daf[_0x485723(0x7bf)](_0x5971c9[_0x485723(0xa35)], -0xda8 + -0x7ac * 0x1 + -0x14 * -0x114), _0x21c79f += _0x388daf[_0x485723(0xaec)](_0x388daf[_0x485723(0xaec)](_0x5971c9[_0x485723(0xa90)], -0x3 * -0x2a1 + 0x29 * 0x14 + -0xadb), 0x853 + 0xa * 0x6a + 0x1 * -0xc3b), _0x21c79f += _0x388daf[_0x485723(0x7bf)](_0x388daf[_0x485723(0x3be)](_0x388daf[_0x485723(0x3a7)](_0x5971c9[_0x485723(0x8ed)], -0x1045 + -0x113 * 0x1c + -0x2d * -0x109), -0x439 * 0x3 + 0xd37 * -0x2 + 0x2755), 0xd03 + -0x3d * 0xa + -0x1 * 0xa65), $gameTimer[_0x485723(0x4f2)](_0x21c79f); }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x5de) + 'Pause', _0x1696ba => { const _0x5c90f8 = _0x2542b2; if (!$gameTimer[_0x5c90f8(0x425)]()) return; $gameTimer['pause'](); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'EventTimer' + _0x2542b2(0x3f5), _0x268b6a => { const _0x1f8b4a = _0x2542b2; if (!$gameTimer[_0x1f8b4a(0x425)]()) return; $gameTimer[_0x1f8b4a(0x1f3)](); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x5de) + 'Speed', _0x43120c => { const _0x4d1215 = _0x2542b2; VisuMZ[_0x4d1215(0x26a) + _0x4d1215(0x2da)](_0x43120c, _0x43120c); const _0x2484ea = _0x43120c[_0x4d1215(0x68f)] || 0xab4 + 0x1ca1 + -0x1 * 0x2755; $gameTimer[_0x4d1215(0x74a) + 'd'](_0x2484ea); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x560) + _0x2542b2(0x600) + 'se', _0xeadf8c => { const _0x400629 = _0x2542b2; VisuMZ[_0x400629(0x26a) + _0x400629(0x2da)](_0xeadf8c, _0xeadf8c); const _0xd23cdd = !_0xeadf8c[_0x400629(0x2c5)]; $gameSystem[_0x400629(0x525) + _0x400629(0x2dc) + 'ng'](_0xd23cdd); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x560) + _0x2542b2(0x201) + 'se', _0x4654af => { const _0x5724ee = _0x2542b2, _0x11856f = { 'LQMeD': function (_0x243095, _0x56c87e) { return _0x243095 - _0x56c87e; } }; VisuMZ[_0x5724ee(0x26a) + _0x5724ee(0x2da)](_0x4654af, _0x4654af); const _0x548d29 = _0x11856f[_0x5724ee(0x8f3)](_0x4654af[_0x5724ee(0x401)] || 0x100d * -0x1 + 0x115 * 0x17 + -0x8d6, 0xd48 + -0x1 * -0x75a + -0x14a1), _0x3fd830 = !_0x4654af[_0x5724ee(0x2c5)], _0x5eefc0 = $gamePlayer[_0x5724ee(0x636)]()[_0x5724ee(0x9c2)](_0x548d29); if (_0x5eefc0) _0x5eefc0[_0x5724ee(0x876) + 'f'](_0x3fd830); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x560) + _0x2542b2(0x734), _0xc39789 => { const _0x448728 = _0x2542b2; VisuMZ[_0x448728(0x26a) + _0x448728(0x2da)](_0xc39789, _0xc39789); const _0x525803 = _0xc39789['FollowerID']; $gameSystem[_0x448728(0x3a0) + 'ledFollowe' + _0x448728(0xa57)](_0x525803); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'FollowerRe' + _0x2542b2(0x219), _0x4687d8 => { const _0x2bc849 = _0x2542b2; VisuMZ[_0x2bc849(0x26a) + _0x2bc849(0x2da)](_0x4687d8, _0x4687d8), $gameSystem[_0x2bc849(0x3a0) + _0x2bc849(0x8d2) + _0x2bc849(0xa57)](-0x1189 + 0xe5c * 0x2 + 0x199 * -0x7), $gameSystem['setStopFol' + 'lowerChasi' + 'ng'](![]); for (const _0x36ba3d of $gamePlayer[_0x2bc849(0x636)]()[_0x2bc849(0x7a2)]) { if (_0x36ba3d) _0x36ba3d['setChaseOf' + 'f'](![]); } }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], 'SwitchGetS' + 'elfSwitchA' + _0x2542b2(0x7ac), _0x3feb7e => { const _0x17f21c = _0x2542b2; VisuMZ[_0x17f21c(0x26a) + _0x17f21c(0x2da)](_0x3feb7e, _0x3feb7e); const _0xb5d499 = $gameTemp[_0x17f21c(0x910) + _0x17f21c(0x9b8) + 'Interprete' + 'r'](); _0x3feb7e[_0x17f21c(0xae0)] = _0x3feb7e[_0x17f21c(0xae0)] || $gameMap[_0x17f21c(0x2b8)](); const _0x4c1a65 = [_0x3feb7e[_0x17f21c(0xae0)], _0x3feb7e[_0x17f21c(0x21e)] || _0xb5d499[_0x17f21c(0x478)](), _0x3feb7e[_0x17f21c(0x4c7)]], _0x310663 = _0x3feb7e[_0x17f21c(0x7a7) + _0x17f21c(0x1ea)], _0x19f794 = $gameSelfSwitches[_0x17f21c(0x872)](_0x4c1a65) || ![]; $gameSwitches[_0x17f21c(0x238)](_0x310663, _0x19f794); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x8f0) + 'elfSwitchI' + 'D', _0x265b6b => { const _0x3dd472 = _0x2542b2, _0x31e1c1 = { 'gNrDx': _0x3dd472(0xa60) + 'h\x20%1' }; VisuMZ[_0x3dd472(0x26a) + _0x3dd472(0x2da)](_0x265b6b, _0x265b6b); const _0x294001 = $gameTemp[_0x3dd472(0x910) + 'ginCommand' + 'Interprete' + 'r'](); _0x265b6b['MapId'] = _0x265b6b['MapId'] || $gameMap['mapId'](); const _0x1ea76b = [_0x265b6b[_0x3dd472(0xae0)], _0x265b6b[_0x3dd472(0x21e)] || _0x294001[_0x3dd472(0x478)](), _0x31e1c1[_0x3dd472(0x255)][_0x3dd472(0x2c1)](_0x265b6b[_0x3dd472(0x260)])], _0x4197b9 = _0x265b6b[_0x3dd472(0x7a7) + _0x3dd472(0x1ea)], _0x4a07f4 = $gameSelfSwitches[_0x3dd472(0x872)](_0x1ea76b) || ![]; $gameSwitches[_0x3dd472(0x238)](_0x4197b9, _0x4a07f4); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0xac1) + _0x2542b2(0x91e) + _0x2542b2(0x41a), _0x547558 => { const _0x1f78de = _0x2542b2, _0x3cdb66 = { 'MLezo': _0x1f78de(0xb11) + _0x1f78de(0x8b3) }; VisuMZ[_0x1f78de(0x26a) + _0x1f78de(0x2da)](_0x547558, _0x547558); const _0x213658 = $gameTemp['getLastPlu' + _0x1f78de(0x9b8) + _0x1f78de(0x290) + 'r'](); _0x547558[_0x1f78de(0xae0)] = _0x547558[_0x1f78de(0xae0)] || $gameMap[_0x1f78de(0x2b8)](); const _0x42a86e = [_0x547558['MapId'], _0x547558[_0x1f78de(0x21e)] || _0x213658[_0x1f78de(0x478)](), _0x3cdb66['MLezo'][_0x1f78de(0x2c1)](_0x547558[_0x1f78de(0x3e3)])], _0x4b74ac = _0x547558[_0x1f78de(0x66d) + _0x1f78de(0x2d8)], _0x16cb38 = $gameSelfSwitches[_0x1f78de(0x872)](_0x42a86e) || ![]; $gameVariables['setValue'](_0x4b74ac, _0x16cb38); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x309) + 'To', _0xb84996 => { const _0x4b22cc = _0x2542b2, _0x4c7739 = { 'hSXrX': function (_0x5b806f, _0x1e3d9d) { return _0x5b806f !== _0x1e3d9d; }, 'SPypB': function (_0x42aa8a, _0x4b587e) { return _0x42aa8a === _0x4b587e; }, 'cZmnX': _0x4b22cc(0x48e) }; VisuMZ[_0x4b22cc(0x26a) + _0x4b22cc(0x2da)](_0xb84996, _0xb84996); if (!$gameMap) return; const _0x43c1a0 = $gameTemp[_0x4b22cc(0x910) + _0x4b22cc(0x9b8) + _0x4b22cc(0x290) + 'r'](), _0x1c5dec = _0xb84996[_0x4b22cc(0x766) + _0x4b22cc(0x1eb)]; _0xb84996[_0x4b22cc(0x673)] = _0xb84996['Step1MapId'] || $gameMap['mapId'](), _0xb84996[_0x4b22cc(0xaac)] = _0xb84996[_0x4b22cc(0xaac)] || $gameMap[_0x4b22cc(0x2b8)](), _0xb84996[_0x4b22cc(0x9d7) + 'me'] = _0xb84996[_0x4b22cc(0x9d7) + 'me'][_0x4b22cc(0x564) + 'e']()[_0x4b22cc(0x7fa)](); if (!_0x1c5dec && _0x4c7739['hSXrX'](_0xb84996[_0x4b22cc(0x673)], $gameMap[_0x4b22cc(0x2b8)]())) return; if (_0x4c7739['SPypB']($gameMap[_0x4b22cc(0x2b8)](), _0xb84996['Step1MapId'])) { const _0xb65376 = $gameMap[_0x4b22cc(0x264)](_0xb84996[_0x4b22cc(0xaba) + 'Id'] || _0x43c1a0[_0x4b22cc(0x478)]()); if (!_0xb65376) return; _0x4c7739['hSXrX'](_0xb84996['TemplateNa' + 'me'], _0x4c7739[_0x4b22cc(0x46d)]) ? _0xb65376[_0x4b22cc(0x4fb) + 'emplate'](_0xb84996[_0x4b22cc(0x9d7) + 'me']) : _0xb65376[_0x4b22cc(0xa97)](_0xb84996[_0x4b22cc(0xaac)], _0xb84996[_0x4b22cc(0x7b3) + 'Id'] || _0x43c1a0[_0x4b22cc(0x478)]()); } _0x1c5dec && $gameSystem[_0x4b22cc(0x41e) + _0x4b22cc(0x8d4) + _0x4b22cc(0xa02)](_0xb84996['Step1MapId'], _0xb84996[_0x4b22cc(0xaba) + 'Id'], _0xb84996[_0x4b22cc(0x9d7) + 'me'], _0xb84996['Step2MapId'], _0xb84996['Step2Event' + 'Id']); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x309) + 'Remove', _0x4e271d => { const _0x1e938a = _0x2542b2, _0x31b63d = { 'HTTRu': function (_0x2f8d22, _0x1651e0) { return _0x2f8d22 === _0x1651e0; } }; VisuMZ[_0x1e938a(0x26a) + _0x1e938a(0x2da)](_0x4e271d, _0x4e271d); if (!$gameMap) return; const _0x269080 = $gameTemp[_0x1e938a(0x910) + _0x1e938a(0x9b8) + _0x1e938a(0x290) + 'r'](); _0x4e271d[_0x1e938a(0xae0)] = _0x4e271d['MapId'] || $gameMap[_0x1e938a(0x2b8)](); if (_0x31b63d[_0x1e938a(0x824)]($gameMap['mapId'](), _0x4e271d[_0x1e938a(0xae0)])) { const _0x331e92 = $gameMap[_0x1e938a(0x264)](_0x4e271d['EventId'] || _0x269080[_0x1e938a(0x478)]()); _0x331e92[_0x1e938a(0xb5b) + 'h'](); } _0x4e271d['RemovePres' + _0x1e938a(0x90e)] && $gameSystem[_0x1e938a(0xadc) + _0x1e938a(0x7a9) + _0x1e938a(0x937) + 'ey'](_0x4e271d[_0x1e938a(0xae0)], _0x4e271d['EventId'] || _0x269080[_0x1e938a(0x478)]()); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x574) + _0x2542b2(0x3b4), _0xc6f2ef => { const _0x51c6f6 = _0x2542b2; VisuMZ[_0x51c6f6(0x26a) + _0x51c6f6(0x2da)](_0xc6f2ef, _0xc6f2ef), $gameSystem[_0x51c6f6(0x527) + 'onData']($gamePlayer, _0xc6f2ef['IconIndex'], _0xc6f2ef[_0x51c6f6(0x74b) + 'X'], _0xc6f2ef[_0x51c6f6(0x74b) + 'Y'], _0xc6f2ef[_0x51c6f6(0x994) + 'ode']); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x574) + _0x2542b2(0x271), _0x4e2474 => { const _0x15ee07 = _0x2542b2; VisuMZ[_0x15ee07(0x26a) + 'ams'](_0x4e2474, _0x4e2474), $gameSystem[_0x15ee07(0xa16) + _0x15ee07(0x5b7) + 'ata']($gamePlayer); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x732) + _0x2542b2(0x7cf), _0xb04943 => { const _0x59b64c = _0x2542b2; VisuMZ['ConvertPar' + 'ams'](_0xb04943, _0xb04943), $gameSystem['setPlayerC' + _0x59b64c(0x596) + 'ble'](!_0xb04943[_0x59b64c(0x7e4)]); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x732) + _0x2542b2(0x307) + 'al', _0x87e465 => { const _0x4c0d2c = _0x2542b2; VisuMZ[_0x4c0d2c(0x26a) + _0x4c0d2c(0x2da)](_0x87e465, _0x87e465), $gameSystem[_0x4c0d2c(0x4bf) + 'iagonalSet' + _0x4c0d2c(0x380)](_0x87e465[_0x4c0d2c(0xa3e)]); }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x69a) + _0x2542b2(0x756), _0x241fcd => { const _0xf1013 = _0x2542b2; VisuMZ['ConvertPar' + 'ams'](_0x241fcd, _0x241fcd); const _0x512fc = _0x241fcd[_0xf1013(0xae0)] || $gameMap[_0xf1013(0x2b8)](); $gameSelfSwitches[_0xf1013(0xa1a) + _0xf1013(0x343) + _0xf1013(0x904)](_0x512fc); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x274) + 'ABCD', _0x4f6e94 => { const _0x484cc5 = _0x2542b2, _0x35ba45 = { 'xEIJy': _0x484cc5(0xa2f), 'eLuBY': _0x484cc5(0x546) }; VisuMZ['ConvertPar' + _0x484cc5(0x2da)](_0x4f6e94, _0x4f6e94); const _0x1246ac = $gameTemp['getLastPlu' + _0x484cc5(0x9b8) + _0x484cc5(0x290) + 'r'](); _0x4f6e94[_0x484cc5(0xae0)] = _0x4f6e94[_0x484cc5(0xae0)] || $gameMap[_0x484cc5(0x2b8)](); const _0x29d97a = [_0x4f6e94[_0x484cc5(0xae0)], _0x4f6e94[_0x484cc5(0x21e)] || _0x1246ac[_0x484cc5(0x478)](), _0x4f6e94[_0x484cc5(0x4c7)]]; switch (_0x4f6e94[_0x484cc5(0x9dd)]) { case 'ON': $gameSelfSwitches[_0x484cc5(0x238)](_0x29d97a, !![]); break; case _0x35ba45[_0x484cc5(0xa96)]: $gameSelfSwitches[_0x484cc5(0x238)](_0x29d97a, ![]); break; case _0x35ba45[_0x484cc5(0x6b5)]: $gameSelfSwitches[_0x484cc5(0x238)](_0x29d97a, !$gameSelfSwitches[_0x484cc5(0x872)](_0x29d97a)); break; } }), PluginManager['registerCo' + 'mmand'](pluginData['name'], _0x2542b2(0x274) + 'ID', _0x39734e => { const _0x5318be = _0x2542b2, _0x3f4978 = { 'lheis': _0x5318be(0xa60) + _0x5318be(0x2a3), 'ESDaV': 'OFF', 'YRwIy': _0x5318be(0x546) }; VisuMZ[_0x5318be(0x26a) + _0x5318be(0x2da)](_0x39734e, _0x39734e); const _0x1f2589 = $gameTemp[_0x5318be(0x910) + _0x5318be(0x9b8) + 'Interprete' + 'r'](); _0x39734e[_0x5318be(0xae0)] = _0x39734e['MapId'] || $gameMap[_0x5318be(0x2b8)](); const _0x3b6185 = [_0x39734e[_0x5318be(0xae0)], _0x39734e[_0x5318be(0x21e)] || _0x1f2589[_0x5318be(0x478)](), _0x3f4978[_0x5318be(0x38b)][_0x5318be(0x2c1)](_0x39734e[_0x5318be(0x260)])]; switch (_0x39734e[_0x5318be(0x9dd)]) { case 'ON': $gameSelfSwitches['setValue'](_0x3b6185, !![]); break; case _0x3f4978['ESDaV']: $gameSelfSwitches[_0x5318be(0x238)](_0x3b6185, ![]); break; case _0x3f4978[_0x5318be(0x859)]: $gameSelfSwitches[_0x5318be(0x238)](_0x3b6185, !$gameSelfSwitches[_0x5318be(0x872)](_0x3b6185)); break; } }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x3dc) + _0x2542b2(0x26d), _0x420fb8 => { const _0x45c41d = _0x2542b2, _0x2cb020 = { 'Iyiru': 'Self\x20Varia' + _0x45c41d(0x8b3) }; VisuMZ[_0x45c41d(0x26a) + _0x45c41d(0x2da)](_0x420fb8, _0x420fb8); const _0x3a6a90 = $gameTemp[_0x45c41d(0x910) + 'ginCommand' + 'Interprete' + 'r'](); _0x420fb8[_0x45c41d(0xae0)] = _0x420fb8['MapId'] || $gameMap[_0x45c41d(0x2b8)](); const _0xd85ea3 = [_0x420fb8[_0x45c41d(0xae0)], _0x420fb8[_0x45c41d(0x21e)] || _0x3a6a90['eventId'](), _0x2cb020[_0x45c41d(0x95f)][_0x45c41d(0x2c1)](_0x420fb8[_0x45c41d(0x3e3)])], _0x5e2a29 = VisuMZ[_0x45c41d(0x978) + 'ues']($gameSelfSwitches[_0x45c41d(0x872)](_0xd85ea3), _0x420fb8[_0x45c41d(0x9dd)], _0x420fb8[_0x45c41d(0x992)]); $gameSelfSwitches['setValue'](_0xd85ea3, _0x5e2a29); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], 'SpawnEvent' + 'AtXY', _0x206f60 => { const _0x4e636d = _0x2542b2, _0x49ebac = { 'kQTWK': function (_0x4f9e1b, _0x1c2e4c) { return _0x4f9e1b + _0x1c2e4c; }, 'HvvMU': function (_0x209461, _0x53d079) { return _0x209461 !== _0x53d079; }, 'qbsTb': 'You\x20do\x20not' + _0x4e636d(0xadf) + _0x4e636d(0x80a) + _0x4e636d(0x974) + '\x0a', 'xiNvO': _0x4e636d(0x631) + _0x4e636d(0x657), 'KwoXc': _0x4e636d(0x69d) + _0x4e636d(0x5ba) + _0x4e636d(0x427) + 'nt\x20Core\x27s\x0a', 'BZSRO': _0x4e636d(0xb1a) + _0x4e636d(0x86e) + _0x4e636d(0x89d) + _0x4e636d(0x233) + _0x4e636d(0x9ca), 'IUiCg': 'Preloaded\x20' + _0x4e636d(0x843) + _0x4e636d(0xb62) + '%1', 'mbwYy': function (_0x5319bc, _0x1aa36a) { return _0x5319bc(_0x1aa36a); } }; VisuMZ[_0x4e636d(0x26a) + _0x4e636d(0x2da)](_0x206f60, _0x206f60); const _0x506c8f = $gameTemp['getLastPlu' + _0x4e636d(0x9b8) + _0x4e636d(0x290) + 'r'](), _0x389b24 = { 'template': _0x206f60[_0x4e636d(0x9d7) + 'me'], 'mapId': _0x206f60[_0x4e636d(0xae0)] || $gameMap['mapId'](), 'eventId': _0x206f60[_0x4e636d(0x21e)] || _0x506c8f[_0x4e636d(0x478)](), 'x': _0x206f60['PosX'], 'y': _0x206f60[_0x4e636d(0xa2e)], 'spawnPreserved': _0x206f60[_0x4e636d(0xa0c)], 'spawnEventId': _0x49ebac[_0x4e636d(0x595)]($gameMap[_0x4e636d(0x555) + 'ents']['length'], 0x24eb + 0x24d0 + -0xd * 0x55f) }, _0x1b1958 = _0x206f60[_0x4e636d(0xac3) + _0x4e636d(0x980)] || 0x2663 + -0xe9 * 0x8 + -0x1f1b; if (!VisuMZ[_0x4e636d(0x47f) + 'aps'][_0x389b24['mapId']] && _0x49ebac['HvvMU'](_0x389b24[_0x4e636d(0x2b8)], $gameMap[_0x4e636d(0x2b8)]())) { let _0x5f00a2 = _0x49ebac[_0x4e636d(0x2bc)][_0x4e636d(0x2c1)](_0x389b24[_0x4e636d(0x2b8)]); _0x5f00a2 += _0x49ebac['xiNvO'], _0x5f00a2 += _0x49ebac[_0x4e636d(0x583)], _0x5f00a2 += _0x49ebac[_0x4e636d(0xa6d)], _0x5f00a2 += _0x49ebac['IUiCg']['format'](_0x389b24[_0x4e636d(0x2b8)]), _0x49ebac['mbwYy'](alert, _0x5f00a2); return; } const _0x513765 = $gameMap[_0x4e636d(0x292) + 'wnedEventA' + _0x4e636d(0xb1c)](_0x389b24, _0x206f60[_0x4e636d(0x954)], _0x206f60['Passabilit' + 'y']); _0x1b1958 && $gameSwitches['setValue'](_0x1b1958, !!_0x513765); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x82a) + _0x2542b2(0x2fd), _0x2904ee => { const _0x242545 = _0x2542b2, _0x298861 = { 'WnjRL': function (_0x173cf5, _0x2074de) { return _0x173cf5 + _0x2074de; }, 'WmHnC': function (_0x44e81d, _0x3d06c1) { return _0x44e81d !== _0x3d06c1; }, 'dbgkv': _0x242545(0x207) + _0x242545(0xadf) + '%1\x20added\x20t' + _0x242545(0x974) + '\x0a', 'GwALp': 'of\x20Preload' + _0x242545(0x657), 'WhLYy': 'Set\x20this\x20u' + _0x242545(0x5ba) + _0x242545(0x427) + _0x242545(0x9e8), 'jZzkm': _0x242545(0xb1a) + 'ameters\x20>\x20' + _0x242545(0x89d) + _0x242545(0x233) + _0x242545(0x9ca), 'KDPIv': _0x242545(0x714) + 'Maps\x20and\x20a' + _0x242545(0xb62) + '%1', 'OtvxV': function (_0x38f91a, _0x43a846) { return _0x38f91a(_0x43a846); } }; VisuMZ[_0x242545(0x26a) + 'ams'](_0x2904ee, _0x2904ee); const _0x20b4c7 = $gameTemp[_0x242545(0x910) + _0x242545(0x9b8) + _0x242545(0x290) + 'r'](), _0x4dffc2 = { 'template': _0x2904ee['TemplateNa' + 'me'], 'mapId': _0x2904ee['MapId'] || $gameMap[_0x242545(0x2b8)](), 'eventId': _0x2904ee[_0x242545(0x21e)] || _0x20b4c7['eventId'](), 'x': -(-0x16 * -0x3a + 0x2 * -0x3e6 + -0x7 * -0x67), 'y': -(0x249a * -0x1 + -0x2 * -0xfa + 0x1 * 0x22a7), 'spawnPreserved': _0x2904ee[_0x242545(0xa0c)], 'spawnEventId': _0x298861[_0x242545(0xb03)]($gameMap[_0x242545(0x555) + _0x242545(0x865)][_0x242545(0x50b)], -0xbb * 0x2d + 0x1fc5 + -0x1 * -0x502) }, _0x1a36e9 = _0x2904ee[_0x242545(0xac3) + 'tchId'] || -0x3 * 0x29 + 0x47 + 0x1 * 0x34; if (!VisuMZ[_0x242545(0x47f) + _0x242545(0x901)][_0x4dffc2[_0x242545(0x2b8)]] && _0x298861[_0x242545(0x30e)](_0x4dffc2[_0x242545(0x2b8)], $gameMap['mapId']())) { let _0x472d62 = _0x298861['dbgkv']['format'](_0x4dffc2['mapId']); _0x472d62 += _0x298861[_0x242545(0x1f8)], _0x472d62 += _0x298861['WhLYy'], _0x472d62 += _0x298861['jZzkm'], _0x472d62 += _0x298861[_0x242545(0x2ed)][_0x242545(0x2c1)](_0x4dffc2[_0x242545(0x2b8)]), _0x298861['OtvxV'](alert, _0x472d62); return; } const _0x19ce02 = $gameMap[_0x242545(0x292) + _0x242545(0xb14) + _0x242545(0x9d0)](_0x4dffc2, _0x2904ee[_0x242545(0x2d4)], _0x2904ee[_0x242545(0x954)], _0x2904ee[_0x242545(0x3f9) + 'y']); _0x1a36e9 && $gameSwitches[_0x242545(0x238)](_0x1a36e9, !!_0x19ce02); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x82a) + _0x2542b2(0x77d) + 'ag', _0x412e34 => { const _0x30a29e = _0x2542b2, _0x28b001 = { 'iHtUA': function (_0x50dcbc, _0xcb9efe) { return _0x50dcbc + _0xcb9efe; }, 'aEGZU': function (_0x3dc25b, _0x2c0111) { return _0x3dc25b !== _0x2c0111; }, 'bDIlL': _0x30a29e(0x207) + _0x30a29e(0xadf) + '%1\x20added\x20t' + 'o\x20the\x20list' + '\x0a', 'WenQR': _0x30a29e(0x631) + _0x30a29e(0x657), 'KoJGU': 'Set\x20this\x20u' + _0x30a29e(0x5ba) + 's\x20&\x20Moveme' + _0x30a29e(0x9e8), 'wTFdk': _0x30a29e(0xb1a) + _0x30a29e(0x86e) + 'Event\x20Temp' + 'late\x20Setti' + 'ngs\x20>\x0a', 'AVDJG': _0x30a29e(0x714) + _0x30a29e(0x843) + _0x30a29e(0xb62) + '%1', 'GSCnJ': function (_0x3f79be, _0x528d2e) { return _0x3f79be(_0x528d2e); } }; VisuMZ['ConvertPar' + _0x30a29e(0x2da)](_0x412e34, _0x412e34); const _0xb3e403 = $gameTemp['getLastPlu' + _0x30a29e(0x9b8) + _0x30a29e(0x290) + 'r'](), _0x284598 = { 'template': _0x412e34[_0x30a29e(0x9d7) + 'me'], 'mapId': _0x412e34[_0x30a29e(0xae0)] || $gameMap['mapId'](), 'eventId': _0x412e34[_0x30a29e(0x21e)] || _0xb3e403[_0x30a29e(0x478)](), 'x': -(-0x158a + -0x136d + 0x28f8), 'y': -(0x73 * -0x17 + -0x1ae2 + -0x18d * -0x18), 'spawnPreserved': _0x412e34['Preserve'], 'spawnEventId': _0x28b001['iHtUA']($gameMap[_0x30a29e(0x555) + _0x30a29e(0x865)][_0x30a29e(0x50b)], 0xca8 + -0x1249 + 0x989 * 0x1) }, _0x26a8ca = _0x412e34[_0x30a29e(0xac3) + _0x30a29e(0x980)] || -0x1 * -0xcc6 + 0x1ee5 + -0x2bab; if (!VisuMZ['PreloadedM' + 'aps'][_0x284598[_0x30a29e(0x2b8)]] && _0x28b001[_0x30a29e(0x7b6)](_0x284598[_0x30a29e(0x2b8)], $gameMap[_0x30a29e(0x2b8)]())) { let _0x348098 = _0x28b001[_0x30a29e(0x619)][_0x30a29e(0x2c1)](_0x284598[_0x30a29e(0x2b8)]); _0x348098 += _0x28b001[_0x30a29e(0x326)], _0x348098 += _0x28b001[_0x30a29e(0x9d1)], _0x348098 += _0x28b001[_0x30a29e(0x32c)], _0x348098 += _0x28b001[_0x30a29e(0xa40)]['format'](_0x284598['mapId']), _0x28b001[_0x30a29e(0x8e7)](alert, _0x348098); return; } const _0x49e46b = $gameMap[_0x30a29e(0x292) + _0x30a29e(0xb14) + 'tTerrainTa' + 'g'](_0x284598, _0x412e34[_0x30a29e(0x329) + 's'], _0x412e34[_0x30a29e(0x954)], _0x412e34[_0x30a29e(0x3f9) + 'y']); _0x26a8ca && $gameSwitches['setValue'](_0x26a8ca, !!_0x49e46b); }), PluginManager['registerCo' + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x82a) + 'DespawnEve' + _0x2542b2(0x3f4), _0xd0d1b8 => { const _0x397932 = _0x2542b2; VisuMZ['ConvertPar' + 'ams'](_0xd0d1b8, _0xd0d1b8); const _0x44efb9 = $gameTemp['getLastPlu' + _0x397932(0x9b8) + _0x397932(0x290) + 'r'](); $gameMap[_0x397932(0x7d4) + _0x397932(0x334)](_0xd0d1b8['EventID'] || _0x44efb9[_0x397932(0x478)]()); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData[_0x2542b2(0x51e)], _0x2542b2(0x82a) + _0x2542b2(0xb3d) + 'Y', _0x13f3fc => { const _0x272b8f = _0x2542b2; VisuMZ[_0x272b8f(0x26a) + _0x272b8f(0x2da)](_0x13f3fc, _0x13f3fc); const _0x5c5a85 = _0x13f3fc[_0x272b8f(0xade)], _0x9da8a8 = _0x13f3fc[_0x272b8f(0xa2e)]; $gameMap[_0x272b8f(0xaf9) + 'Y'](_0x5c5a85, _0x9da8a8); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x82a) + _0x2542b2(0x4c4) + 'ions', _0x2ab44d => { const _0x3c066d = _0x2542b2; VisuMZ[_0x3c066d(0x26a) + _0x3c066d(0x2da)](_0x2ab44d, _0x2ab44d), $gameMap[_0x3c066d(0x4d9) + _0x3c066d(0x395)](_0x2ab44d[_0x3c066d(0x2d4)]); }), PluginManager[_0x2542b2(0x90a) + _0x2542b2(0x8e2)](pluginData['name'], _0x2542b2(0x82a) + _0x2542b2(0x773) + _0x2542b2(0x5a4), _0x1913d7 => { const _0x5b225c = _0x2542b2; VisuMZ[_0x5b225c(0x26a) + 'ams'](_0x1913d7, _0x1913d7), $gameMap[_0x5b225c(0xb35) + 'rainTags'](_0x1913d7[_0x5b225c(0x329) + 's']); }), PluginManager[_0x2542b2(0x90a) + 'mmand'](pluginData[_0x2542b2(0x51e)], 'SpawnEvent' + _0x2542b2(0xa3a) + 'rything', _0x19f39d => { const _0x5adba1 = _0x2542b2; VisuMZ[_0x5adba1(0x26a) + _0x5adba1(0x2da)](_0x19f39d, _0x19f39d), $gameMap[_0x5adba1(0x7d4) + _0x5adba1(0x4e0)](); }), VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Scene_Boot' + _0x2542b2(0x280) + _0x2542b2(0x6f0)] = Scene_Boot['prototype'][_0x2542b2(0xa13) + 'Loaded'], Scene_Boot['prototype'][_0x2542b2(0xa13) + _0x2542b2(0x68e)] = function () { const _0x4acd06 = _0x2542b2; VisuMZ['EventsMove' + _0x4acd06(0x53e)][_0x4acd06(0x553) + _0x4acd06(0x280) + _0x4acd06(0x6f0)][_0x4acd06(0x325)](this), this['process_Vi' + 'suMZ_Event' + _0x4acd06(0x9ee) + _0x4acd06(0xa8a) + _0x4acd06(0x3cf)](), this[_0x4acd06(0x651) + _0x4acd06(0x61a) + _0x4acd06(0x9ee) + _0x4acd06(0x1d8) + 'ariables'](); if (VisuMZ[_0x4acd06(0x6af) + _0x4acd06(0x53e)]['CustomPage' + _0x4acd06(0x20b)]) VisuMZ[_0x4acd06(0x6af) + _0x4acd06(0x53e)][_0x4acd06(0xb0e) + 'Conditions']['initialize'](); }, VisuMZ[_0x2542b2(0x47f) + 'aps'] = [], VisuMZ[_0x2542b2(0x8fa) + 'ates'] = {}, Scene_Boot[_0x2542b2(0x336)][_0x2542b2(0x651) + _0x2542b2(0x61a) + _0x2542b2(0x9ee) + _0x2542b2(0xa8a) + _0x2542b2(0x3cf)] = function () { const _0x172fc4 = _0x2542b2, _0x5aa236 = { 'ccwcI': _0x172fc4(0x277), 'GEJEo': _0x172fc4(0xa81) + _0x172fc4(0x475), 'UlYhJ': function (_0x19b2b5, _0x32e1d6, _0x4f6f2f) { return _0x19b2b5(_0x32e1d6, _0x4f6f2f); } }; if (DataManager[_0x172fc4(0x64b) + 'st']() || DataManager[_0x172fc4(0x524) + 't']()) return; const _0x16e578 = VisuMZ[_0x172fc4(0x6af) + _0x172fc4(0x53e)][_0x172fc4(0x2cc)]['Template'], _0x446cc6 = _0x16e578[_0x172fc4(0x3e8) + 's'][_0x172fc4(0x241)](0x14de + 0x13cf + -0x28ad); for (const _0x480038 of _0x16e578[_0x172fc4(0xb1b)]) { _0x480038[_0x172fc4(0x615)] = _0x480038['Name'][_0x172fc4(0x564) + 'e']()[_0x172fc4(0x7fa)](), VisuMZ[_0x172fc4(0x8fa) + _0x172fc4(0x7cb)][_0x480038[_0x172fc4(0x615)]] = _0x480038; if (!_0x446cc6[_0x172fc4(0x927)](_0x480038[_0x172fc4(0x36d)])) _0x446cc6[_0x172fc4(0x33d)](_0x480038['MapID']); } for (const _0x281863 of _0x446cc6) { if (VisuMZ[_0x172fc4(0x47f) + _0x172fc4(0x901)][_0x281863]) continue; const _0x301588 = _0x5aa236[_0x172fc4(0x85b)]['format'](_0x281863[_0x172fc4(0xb00)](0x71 * -0x3b + 0x56f * 0x1 + 0x149f)), _0x2d799a = _0x5aa236[_0x172fc4(0x44f)][_0x172fc4(0x2c1)](_0x281863); DataManager[_0x172fc4(0x6f7) + 'le'](_0x2d799a, _0x301588), _0x5aa236[_0x172fc4(0x424)](setTimeout, this[_0x172fc4(0x63e) + _0x172fc4(0xace) + _0x172fc4(0x272)][_0x172fc4(0x64e)](this, _0x281863, _0x2d799a), -0x12e4 * -0x2 + 0x1 * 0x420 + 0x14c2 * -0x2); } }, Scene_Boot['prototype'][_0x2542b2(0x63e) + _0x2542b2(0xace) + _0x2542b2(0x272)] = function (_0x30f3ec, _0x18aad2) { const _0x1dfb40 = _0x2542b2, _0x53de92 = { 'xLxLX': function (_0x50dd84, _0x71a11c, _0x4e586a) { return _0x50dd84(_0x71a11c, _0x4e586a); } }; window[_0x18aad2] ? (VisuMZ[_0x1dfb40(0x47f) + 'aps'][_0x30f3ec] = window[_0x18aad2], window[_0x18aad2] = undefined) : _0x53de92['xLxLX'](setTimeout, this[_0x1dfb40(0x63e) + _0x1dfb40(0xace) + _0x1dfb40(0x272)][_0x1dfb40(0x64e)](this, _0x30f3ec, _0x18aad2), 0x4 * -0x5a6 + 0x11e + 0x15de); }, VisuMZ[_0x2542b2(0x461) + _0x2542b2(0x57c)] = [], VisuMZ[_0x2542b2(0x274) + 'es'] = [], VisuMZ['MapSwitche' + 's'] = [], VisuMZ[_0x2542b2(0x346) + _0x2542b2(0x877)] = [], VisuMZ[_0x2542b2(0x3dc) + _0x2542b2(0x1dc)] = [], VisuMZ['MapVariabl' + 'es'] = [], Scene_Boot[_0x2542b2(0x336)]['process_Vi' + _0x2542b2(0x61a) + _0x2542b2(0x9ee) + _0x2542b2(0x1d8) + _0x2542b2(0x837)] = function () { const _0x394b01 = _0x2542b2, _0x69b3d5 = { 'AKHZG': function (_0x26ec54, _0xd9fc8a) { return _0x26ec54 < _0xd9fc8a; } }; for (let _0x3044ae = 0x5e9 * -0x1 + -0x252a + 0x2b14; _0x69b3d5[_0x394b01(0xaf2)](_0x3044ae, $dataSystem[_0x394b01(0x299)][_0x394b01(0x50b)]); _0x3044ae++) { if ($dataSystem[_0x394b01(0x299)][_0x3044ae][_0x394b01(0x4d6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i)) VisuMZ[_0x394b01(0x461) + _0x394b01(0x57c)][_0x394b01(0x33d)](_0x3044ae); if ($dataSystem[_0x394b01(0x299)][_0x3044ae][_0x394b01(0x4d6)](/<SELF>/i)) VisuMZ['SelfSwitch' + 'es'][_0x394b01(0x33d)](_0x3044ae); if ($dataSystem['switches'][_0x3044ae][_0x394b01(0x4d6)](/<MAP>/i)) VisuMZ['MapSwitche' + 's'][_0x394b01(0x33d)](_0x3044ae); } for (let _0x5040ee = 0x1 * -0x52f + -0x1479 + 0x19a9 * 0x1; _0x69b3d5['AKHZG'](_0x5040ee, $dataSystem[_0x394b01(0x695)]['length']); _0x5040ee++) { if ($dataSystem[_0x394b01(0x695)][_0x5040ee][_0x394b01(0x4d6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i)) VisuMZ['AdvancedVa' + _0x394b01(0x877)]['push'](_0x5040ee); if ($dataSystem['variables'][_0x5040ee][_0x394b01(0x4d6)](/<SELF>/i)) VisuMZ[_0x394b01(0x3dc) + 'les'][_0x394b01(0x33d)](_0x5040ee); if ($dataSystem['variables'][_0x5040ee]['match'](/<MAP>/i)) VisuMZ[_0x394b01(0x557) + 'es'][_0x394b01(0x33d)](_0x5040ee); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0xb0e) + _0x2542b2(0x20b)] = {}, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0xb0e) + 'Conditions']['initialize'] = function () { const _0x4b97d5 = _0x2542b2; this[_0x4b97d5(0x613) + 'er'] = new Game_CPCInterpreter(), this[_0x4b97d5(0x788) + _0x4b97d5(0x473) + 'sWithCPC'](); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0xb0e) + _0x2542b2(0x20b)][_0x2542b2(0x788) + 'ommonEvent' + _0x2542b2(0x5aa)] = function () { const _0x354769 = _0x2542b2, _0x4e21df = { 'hwzIH': function (_0x1915a1, _0x416714) { return _0x1915a1 > _0x416714; } }; this[_0x354769(0xb53) + _0x354769(0x4ad)] = []; for (const _0xdb9dd1 of $dataCommonEvents) { if (!_0xdb9dd1) continue; VisuMZ['EventsMove' + _0x354769(0x53e)][_0x354769(0xb0e) + 'Conditions'][_0x354769(0x59a)](_0xdb9dd1); if (_0x4e21df[_0x354769(0x9b6)](_0xdb9dd1[_0x354769(0x982)][_0x354769(0x50b)], 0x67 * 0x27 + 0x964 + 0x1 * -0x1915)) this['_commonEve' + _0x354769(0x4ad)]['push'](_0xdb9dd1['id']); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0xb0e) + 'Conditions'][_0x2542b2(0x4a1)] = function (_0x3e1ab7, _0x2f77a9, _0x534284) { const _0x5b5096 = _0x2542b2; return this[_0x5b5096(0x613) + 'er'][_0x5b5096(0x83c)](_0x3e1ab7, _0x2f77a9), _0x534284 ? this[_0x5b5096(0x613) + 'er']['executeCom' + 'monEvent'](_0x534284) : this[_0x5b5096(0x613) + 'er'][_0x5b5096(0x347)](), this[_0x5b5096(0x613) + 'er'][_0x5b5096(0xa7c)]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0xb0e) + 'Conditions']['loadCPC'] = function (_0x283661) { const _0x1c7126 = _0x2542b2; let _0x203a80 = ![]; _0x283661[_0x1c7126(0x982)] = []; for (const _0x121cde of _0x283661['list']) { if ([0x2609 + -0x225a + -0x343, 0x24 * 0x65 + 0x3d * -0x7a + -0x56 * -0x31]['includes'](_0x121cde[_0x1c7126(0x9bb)])) { const _0x5e25d8 = _0x121cde[_0x1c7126(0x71a)][-0x55 * 0x49 + -0x15fd + 0x2e3a]; if (_0x5e25d8['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i)) _0x203a80 = !![]; else _0x5e25d8[_0x1c7126(0x4d6)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i) && (_0x203a80 = ![]); } _0x203a80 && _0x283661[_0x1c7126(0x982)][_0x1c7126(0x33d)](_0x121cde); } }, getSelfSwitchValue = function (_0x215284, _0x3a33b7, _0x3372b6) { const _0x2b332a = _0x2542b2, _0x3eadba = { 'kGYJf': _0x2b332a(0xa60) + _0x2b332a(0x2a3), 'mxUAQ': function (_0x3389aa, _0x2a9576) { return _0x3389aa === _0x2a9576; }, 'yGPai': _0x2b332a(0x828) }; let _0x228b32 = [_0x215284, _0x3a33b7, _0x3eadba[_0x2b332a(0x686)][_0x2b332a(0x2c1)](_0x3372b6)]; return _0x3eadba[_0x2b332a(0x70c)](typeof _0x3372b6, _0x3eadba[_0x2b332a(0xa8d)]) && (_0x228b32 = [_0x215284, _0x3a33b7, _0x3372b6[_0x2b332a(0x564) + 'e']()[_0x2b332a(0x7fa)]()]), $gameSelfSwitches[_0x2b332a(0x872)](_0x228b32); }, getMapSwitchValue = function (_0x5db3b8, _0x38e495) { const _0x5cc6c1 = _0x2542b2, _0xadea9 = { 'GWiJQ': _0x5cc6c1(0x213) + _0x5cc6c1(0x31b) }; let _0x27dd34 = [-0x2e * 0x2b + -0xf3d + 0x16f7, 0x1 * 0x1445 + 0x2007 + -0x344c * 0x1, _0xadea9['GWiJQ']['format'](_0x5db3b8, _0x38e495)]; return $gameSelfSwitches[_0x5cc6c1(0x872)](_0x27dd34); }, getMapVariableValue = function (_0x2f9a7b, _0x66284) { const _0x57293c = _0x2542b2, _0x4f1b92 = { 'qkBiD': 'Map\x20%1\x20Var' + 'iable\x20%2' }; let _0xd44b3d = [0x8 * -0x34e + 0x101c + 0xa54, -0xcf + 0x881 * -0x2 + -0x11d1 * -0x1, _0x4f1b92[_0x57293c(0x5f1)][_0x57293c(0x2c1)](_0x2f9a7b, _0x66284)]; return $gameSelfSwitches[_0x57293c(0x872)](_0xd44b3d); }, getSelfVariableValue = function (_0x291be6, _0x558640, _0x56ace0) { const _0x208e72 = _0x2542b2, _0x31cfa7 = { 'qBIwH': _0x208e72(0xb11) + _0x208e72(0x8b3) }, _0x700599 = [_0x291be6, _0x558640, _0x31cfa7[_0x208e72(0x902)]['format'](_0x56ace0)]; return $gameSelfSwitches[_0x208e72(0x872)](_0x700599); }, setSelfSwitchValue = function (_0x3c1b44, _0x4fb6f8, _0x34c4e0, _0x1a3edb) { const _0x51cd2e = _0x2542b2, _0x3b0492 = { 'NvuBD': _0x51cd2e(0xa60) + _0x51cd2e(0x2a3), 'GqQKn': function (_0x545567, _0x62e83b) { return _0x545567 === _0x62e83b; }, 'eLgjJ': _0x51cd2e(0x828) }; let _0xeddc56 = [_0x3c1b44, _0x4fb6f8, _0x3b0492[_0x51cd2e(0x6a8)][_0x51cd2e(0x2c1)](_0x34c4e0)]; _0x3b0492[_0x51cd2e(0xa1f)](typeof _0x34c4e0, _0x3b0492[_0x51cd2e(0xac9)]) && (_0xeddc56 = [_0x3c1b44, _0x4fb6f8, _0x34c4e0[_0x51cd2e(0x564) + 'e']()['trim']()]), $gameSelfSwitches[_0x51cd2e(0x238)](_0xeddc56, _0x1a3edb); }, setSelfVariableValue = function (_0x5eb511, _0xb99011, _0xb886e0, _0x1e6e95) { const _0x49e80c = _0x2542b2, _0x39c49e = { 'WSIIy': 'Self\x20Varia' + _0x49e80c(0x8b3) }, _0x5d66c6 = [_0x5eb511, _0xb99011, _0x39c49e[_0x49e80c(0x8b5)][_0x49e80c(0x2c1)](_0xb886e0)]; $gameSelfSwitches[_0x49e80c(0x238)](_0x5d66c6, _0x1e6e95); }, setMapSwitchValue = function (_0x3484a7, _0x4cb1ae, _0x1a527b) { const _0x1a53a3 = { 'eAUdW': 'Map\x20%1\x20Swi' + 'tch\x20%2' }; let _0x4bc0dc = [0x3a7 + -0xa97 + 0x1 * 0x6f0, -0x2673 + 0x3b3 * -0x1 + 0x5 * 0x86e, _0x1a53a3['eAUdW']['format'](_0x3484a7, _0x4cb1ae)]; $gameSelfSwitches['setValue'](_0x4bc0dc, _0x1a527b); }, setMapVariableValue = function (_0xf642c9, _0x2e8d45, _0xa4355a) { const _0x5f4df9 = _0x2542b2, _0x498d3d = { 'gKXKh': _0x5f4df9(0x7cc) + _0x5f4df9(0x518) }; let _0x117bc6 = [-0x811 + 0x20a4 + -0x1893, -0x846 + 0x8 * 0x18b + -0x412, _0x498d3d['gKXKh'][_0x5f4df9(0x2c1)](_0xf642c9, _0x2e8d45)]; $gameSelfSwitches['setValue'](_0x117bc6, _0xa4355a); }, DataManager[_0x2542b2(0x75f) + _0x2542b2(0x72d)] = function (_0xedd6a4) { const _0x479991 = _0x2542b2, _0xa48eb3 = { 'FJIZj': function (_0x1c1e57, _0xe0e5fc) { return _0x1c1e57 === _0xe0e5fc; } }; if (_0xa48eb3['FJIZj'](SceneManager[_0x479991(0x40e)][_0x479991(0x6dc) + 'r'], Scene_Debug)) return ![]; return VisuMZ[_0x479991(0x461) + _0x479991(0x57c)][_0x479991(0x927)](_0xedd6a4); }, DataManager[_0x2542b2(0x75f) + 'Variable'] = function (_0x4e5772) { const _0x22fe6 = _0x2542b2, _0x3728ad = { 'ELjZP': function (_0x4f0c8e, _0x16fe54) { return _0x4f0c8e === _0x16fe54; } }; if (_0x3728ad[_0x22fe6(0x956)](SceneManager[_0x22fe6(0x40e)]['constructo' + 'r'], Scene_Debug)) return ![]; return VisuMZ[_0x22fe6(0x346) + _0x22fe6(0x877)]['includes'](_0x4e5772); }, DataManager[_0x2542b2(0xa62) + 'ch'] = function (_0x1540bd) { const _0x458997 = _0x2542b2, _0x3d6679 = { 'ZIsLL': function (_0x4e7f78, _0x11ac3a) { return _0x4e7f78 === _0x11ac3a; } }; if (_0x3d6679[_0x458997(0xb5a)](SceneManager[_0x458997(0x40e)]['constructo' + 'r'], Scene_Debug)) return ![]; return VisuMZ['SelfSwitch' + 'es'][_0x458997(0x927)](_0x1540bd); }, DataManager[_0x2542b2(0x44b) + _0x2542b2(0x844)] = function (_0x58067f) { const _0x4878ea = _0x2542b2, _0x348af2 = { 'hZkOR': function (_0xea1250, _0x1e4410) { return _0xea1250 === _0x1e4410; } }; if (_0x348af2[_0x4878ea(0x507)](SceneManager[_0x4878ea(0x40e)][_0x4878ea(0x6dc) + 'r'], Scene_Debug)) return ![]; return VisuMZ[_0x4878ea(0x3dc) + 'les']['includes'](_0x58067f); }, DataManager[_0x2542b2(0x2a8) + 'h'] = function (_0x2a93c1) { const _0x5562e3 = _0x2542b2; if (BattleManager[_0x5562e3(0x64b) + 'st']()) return ![]; return VisuMZ[_0x5562e3(0x81c) + 's'][_0x5562e3(0x927)](_0x2a93c1); }, DataManager[_0x2542b2(0x2af) + _0x2542b2(0xa55)] = function (_0x3443d9) { const _0x381db3 = _0x2542b2; if (BattleManager['isBattleTe' + 'st']()) return ![]; return VisuMZ[_0x381db3(0x557) + 'es'][_0x381db3(0x927)](_0x3443d9); }, ImageManager['isInvisibl' + _0x2542b2(0x5e1)] = function (_0x5f36b0) { const _0x81140 = _0x2542b2; return _0x5f36b0[_0x81140(0x4d6)](/\[INV(?:|ISIBLE)\]/i); }, SceneManager[_0x2542b2(0x38c)] = function () { const _0x5dc330 = _0x2542b2, _0x481bdf = { 'OfCci': function (_0x45538f, _0x4df2d1) { return _0x45538f === _0x4df2d1; } }; return this[_0x5dc330(0x40e)] && _0x481bdf[_0x5dc330(0x278)](this[_0x5dc330(0x40e)]['constructo' + 'r'], Scene_Map); }, SceneManager[_0x2542b2(0x3cd) + _0x2542b2(0x493)] = function () { const _0x343865 = _0x2542b2, _0x35ef04 = { 'jZOpZ': function (_0x4ce440, _0x19b144) { return _0x4ce440 instanceof _0x19b144; } }; return this[_0x343865(0x40e)] && _0x35ef04[_0x343865(0x38e)](this[_0x343865(0x40e)], Scene_Map); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x35a) + _0x2542b2(0x9c6) + _0x2542b2(0x388)] = Game_Temp['prototype'][_0x2542b2(0x9c6) + _0x2542b2(0x388)], Game_Temp[_0x2542b2(0x336)]['setDestina' + 'tion'] = function (_0x1fdee5, _0x100fba) { const _0x453d80 = _0x2542b2; if (this[_0x453d80(0x294) + _0x453d80(0x5f3) + 'd'](_0x1fdee5, _0x100fba)) return; VisuMZ[_0x453d80(0x6af) + _0x453d80(0x53e)]['Game_Temp_' + 'setDestina' + 'tion'][_0x453d80(0x325)](this, _0x1fdee5, _0x100fba); }, Game_Temp['prototype']['isEventCli' + _0x2542b2(0x5f3) + 'd'] = function (_0x3e107c, _0x130788) { const _0x475eed = _0x2542b2, _0x8061ff = { 'cHYnu': function (_0x29b212, _0x391370) { return _0x29b212 > _0x391370; } }, _0x44ace7 = $gameMap[_0x475eed(0xaed)](_0x3e107c, _0x130788); for (const _0x54c652 of _0x44ace7) { if (_0x54c652 && _0x54c652[_0x475eed(0xaa4) + _0x475eed(0xb50)]()) return _0x54c652[_0x475eed(0x2ae) + _0x475eed(0x27a)](), !![]; } return TouchInput[_0x475eed(0x7ca) + _0x475eed(0x7cd)]() && _0x8061ff['cHYnu'](_0x44ace7['length'], 0x2a5 * -0x6 + 0x4 * 0x460 + -0x1a2) && TouchInput[_0x475eed(0x9ad)](), ![]; }, Game_Temp[_0x2542b2(0x336)][_0x2542b2(0x32e) + _0x2542b2(0x9b8) + 'Interprete' + 'r'] = function (_0x278cb9) { const _0x310d6f = _0x2542b2; this['_lastPlugi' + _0x310d6f(0x23c) + 'terpreter'] = _0x278cb9; }, Game_Temp[_0x2542b2(0x336)]['getLastPlu' + _0x2542b2(0x9b8) + 'Interprete' + 'r'] = function () { const _0x3eb25c = _0x2542b2; return this[_0x3eb25c(0x9cc) + _0x3eb25c(0x23c) + _0x3eb25c(0x65c)]; }, Game_Temp[_0x2542b2(0x336)]['registerSe' + _0x2542b2(0xb57)] = function (_0x135927) { this['_selfTarge' + 't'] = _0x135927; }, Game_Temp['prototype'][_0x2542b2(0x73e) + _0x2542b2(0x4b2)] = function () { const _0x22e533 = _0x2542b2; this[_0x22e533(0x68c) + 't'] = undefined; }, Game_Temp['prototype'][_0x2542b2(0x345) + _0x2542b2(0xac6)] = function () { const _0x3ed586 = _0x2542b2; return this[_0x3ed586(0x68c) + 't']; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x1d3) + _0x2542b2(0x692) + 'ze'] = Game_System[_0x2542b2(0x336)][_0x2542b2(0x9f5)], Game_System[_0x2542b2(0x336)][_0x2542b2(0x9f5)] = function () { const _0x1e9ec7 = _0x2542b2; VisuMZ['EventsMove' + _0x1e9ec7(0x53e)][_0x1e9ec7(0x1d3) + _0x1e9ec7(0x692) + 'ze'][_0x1e9ec7(0x325)](this), this[_0x1e9ec7(0x4e6) + _0x1e9ec7(0xa78)](), this['initFollow' + _0x1e9ec7(0x79b) + 'er'](); }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x4e6) + _0x2542b2(0xa78)] = function () { const _0x5e718a = _0x2542b2, _0x9da15d = { 'usQMW': _0x5e718a(0x8a5) + _0x5e718a(0x353), 'zMywF': 'default' }, _0x30501e = _0x9da15d[_0x5e718a(0x67f)]['split']('|'); let _0x5b236a = -0x1ddd + 0x10ce + 0xd0f * 0x1; while (!![]) { switch (_0x30501e[_0x5b236a++]) { case '0': this[_0x5e718a(0x21a) + _0x5e718a(0x951)] = {}; continue; case '1': this[_0x5e718a(0x558) + 's'] = {}; continue; case '2': this[_0x5e718a(0x91b) + _0x5e718a(0x462)] = []; continue; case '3': this[_0x5e718a(0x99a) + 'EventMorph' + _0x5e718a(0xa59)] = {}; continue; case '4': this['_EventsMov' + _0x5e718a(0x2fe) + _0x5e718a(0x786)] = { 'DashingEnable': !![], 'EventAutoMovement': !![], 'VisibleEventLabels': !![] }; continue; case '5': this[_0x5e718a(0x1f1) + _0x5e718a(0x9cb) + 'ng'] = _0x9da15d['zMywF']; continue; case '6': this['_DisablePl' + _0x5e718a(0x312) + 'l'] = ![]; continue; }break; } }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x8d7) + _0x2542b2(0x523)] = function () { const _0x453591 = _0x2542b2, _0x5eb145 = { 'Bvuxn': function (_0x3f9e81, _0x4d6742) { return _0x3f9e81 === _0x4d6742; } }; if (_0x5eb145[_0x453591(0x6ad)](this['_EventsMov' + _0x453591(0x2fe) + _0x453591(0x786)], undefined)) this['initEvents' + 'MoveCore'](); if (_0x5eb145[_0x453591(0x6ad)](this[_0x453591(0xb0b) + _0x453591(0x2fe) + _0x453591(0x786)][_0x453591(0xab8) + 'ble'], undefined)) this['initEvents' + _0x453591(0xa78)](); return this[_0x453591(0xb0b) + _0x453591(0x2fe) + _0x453591(0x786)][_0x453591(0xab8) + _0x453591(0xa55)]; }, Game_System['prototype'][_0x2542b2(0x8e1) + _0x2542b2(0x64d)] = function (_0x365c2) { const _0xdcdb53 = _0x2542b2, _0x634cc3 = { 'lBZGt': function (_0x3f778d, _0x4b0113) { return _0x3f778d === _0x4b0113; }, 'SmOhF': function (_0x542946, _0x36aefa) { return _0x542946 === _0x36aefa; } }; if (_0x634cc3['lBZGt'](this[_0xdcdb53(0xb0b) + _0xdcdb53(0x2fe) + 'ngs'], undefined)) this[_0xdcdb53(0x4e6) + _0xdcdb53(0xa78)](); if (_0x634cc3[_0xdcdb53(0x69f)](this[_0xdcdb53(0xb0b) + _0xdcdb53(0x2fe) + _0xdcdb53(0x786)][_0xdcdb53(0xab8) + _0xdcdb53(0xa55)], undefined)) this[_0xdcdb53(0x4e6) + 'MoveCore'](); this[_0xdcdb53(0xb0b) + _0xdcdb53(0x2fe) + _0xdcdb53(0x786)][_0xdcdb53(0xab8) + _0xdcdb53(0xa55)] = _0x365c2; }, Game_System['prototype'][_0x2542b2(0x5f9) + 'ntAutoMove' + _0x2542b2(0x577)] = function () { const _0x25d4e2 = _0x2542b2, _0x642d9b = { 'mTXoO': function (_0x560756, _0x4dced6) { return _0x560756 === _0x4dced6; } }; if (_0x642d9b[_0x25d4e2(0x2a7)](this[_0x25d4e2(0xb0b) + 'eCoreSetti' + _0x25d4e2(0x786)], undefined)) this[_0x25d4e2(0x4e6) + _0x25d4e2(0xa78)](); if (_0x642d9b[_0x25d4e2(0x2a7)](this[_0x25d4e2(0xb0b) + _0x25d4e2(0x2fe) + _0x25d4e2(0x786)][_0x25d4e2(0x2ee) + _0x25d4e2(0x627)], undefined)) this[_0x25d4e2(0x4e6) + _0x25d4e2(0xa78)](); return this[_0x25d4e2(0xb0b) + _0x25d4e2(0x2fe) + _0x25d4e2(0x786)][_0x25d4e2(0x2ee) + 'ovement']; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x7b1) + _0x2542b2(0x232) + _0x2542b2(0x618)] = function (_0x25d52d) { const _0x4a8928 = _0x2542b2, _0xd37fee = { 'cRDhg': function (_0x431ce3, _0x228a80) { return _0x431ce3 === _0x228a80; } }; if (_0xd37fee['cRDhg'](this[_0x4a8928(0xb0b) + _0x4a8928(0x2fe) + _0x4a8928(0x786)], undefined)) this['initEvents' + _0x4a8928(0xa78)](); if (_0xd37fee[_0x4a8928(0x34a)](this[_0x4a8928(0xb0b) + _0x4a8928(0x2fe) + _0x4a8928(0x786)]['EventAutoM' + 'ovement'], undefined)) this[_0x4a8928(0x4e6) + _0x4a8928(0xa78)](); this[_0x4a8928(0xb0b) + _0x4a8928(0x2fe) + _0x4a8928(0x786)]['EventAutoM' + 'ovement'] = _0x25d52d; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x79d) + _0x2542b2(0x9dc)] = function () { const _0x5e294e = _0x2542b2, _0x316954 = { 'AOpKg': function (_0x42b13e, _0x5599da) { return _0x42b13e === _0x5599da; } }; if (_0x316954[_0x5e294e(0x1ff)](this[_0x5e294e(0xb0b) + _0x5e294e(0x2fe) + _0x5e294e(0x786)], undefined)) this[_0x5e294e(0x4e6) + 'MoveCore'](); if (_0x316954[_0x5e294e(0x1ff)](this['_EventsMov' + _0x5e294e(0x2fe) + _0x5e294e(0x786)][_0x5e294e(0xb25) + _0x5e294e(0x655)], undefined)) this[_0x5e294e(0x4e6) + _0x5e294e(0xa78)](); return this[_0x5e294e(0xb0b) + _0x5e294e(0x2fe) + _0x5e294e(0x786)][_0x5e294e(0xb25) + _0x5e294e(0x655)]; }, Game_System['prototype']['setEventLa' + _0x2542b2(0xac4) + 'e'] = function (_0x4c838e) { const _0x4abf2f = _0x2542b2, _0x4d18ec = { 'oWljZ': function (_0x13d028, _0xcf1e13) { return _0x13d028 === _0xcf1e13; } }; if (_0x4d18ec['oWljZ'](this['_EventsMov' + _0x4abf2f(0x2fe) + _0x4abf2f(0x786)], undefined)) this[_0x4abf2f(0x4e6) + _0x4abf2f(0xa78)](); if (_0x4d18ec[_0x4abf2f(0x3a3)](this[_0x4abf2f(0xb0b) + _0x4abf2f(0x2fe) + 'ngs']['VisibleEve' + _0x4abf2f(0x655)], undefined)) this[_0x4abf2f(0x4e6) + _0x4abf2f(0xa78)](); this[_0x4abf2f(0xb0b) + _0x4abf2f(0x2fe) + _0x4abf2f(0x786)]['VisibleEve' + _0x4abf2f(0x655)] = _0x4c838e; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x4f9) + _0x2542b2(0x22f) + _0x2542b2(0x6cd)] = function () { const _0x46b3da = _0x2542b2, _0x143de8 = { 'iaLKf': function (_0x123765, _0x167cb8) { return _0x123765 === _0x167cb8; } }; return _0x143de8[_0x46b3da(0x1e3)](this[_0x46b3da(0x485) + _0x46b3da(0x312) + 'l'], undefined) && (this['_DisablePl' + _0x46b3da(0x312) + 'l'] = ![]), this['_DisablePl' + 'ayerContro' + 'l']; }, Game_System[_0x2542b2(0x336)]['setPlayerC' + _0x2542b2(0x596) + _0x2542b2(0xa55)] = function (_0x4b6201) { const _0xd89b93 = _0x2542b2; this[_0xd89b93(0x485) + _0xd89b93(0x312) + 'l'] = _0x4b6201; }, Game_System['prototype']['getPlayerD' + 'iagonalSet' + _0x2542b2(0x380)] = function () { const _0x3315c0 = _0x2542b2; return this[_0x3315c0(0x1f1) + _0x3315c0(0x9cb) + 'ng']; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x4bf) + _0x2542b2(0x935) + _0x2542b2(0x380)] = function (_0x41166f) { const _0x2af8dd = _0x2542b2, _0x4ef4c8 = { 'GqMhC': function (_0x23f2b4, _0x10f66d) { return _0x23f2b4(_0x10f66d); } }; this[_0x2af8dd(0x1f1) + _0x2af8dd(0x9cb) + 'ng'] = _0x4ef4c8['GqMhC'](String, _0x41166f)[_0x2af8dd(0x405) + 'e']()[_0x2af8dd(0x7fa)](); }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x78e) + _0x2542b2(0x72e)] = function (_0x358d0a) { const _0xece06e = _0x2542b2, _0x29d473 = { 'cIwLw': function (_0x248314, _0x37cb2f) { return _0x248314 === _0x37cb2f; }, 'hPxyY': function (_0x52bff8, _0x549767) { return _0x52bff8 === _0x549767; }, 'SqGtn': _0xece06e(0x8b2), 'PCBUY': _0xece06e(0x3f3) + 't%2' }; if (_0x29d473['cIwLw'](this[_0xece06e(0x558) + 's'], undefined)) this[_0xece06e(0x4e6) + 'MoveCore'](); if (!_0x358d0a) return null; if (_0x29d473[_0xece06e(0x55a)](_0x358d0a, $gamePlayer)) return this['_EventIcon' + 's'][_0x29d473[_0xece06e(0x682)]]; else { const _0x2562da = VisuMZ[_0xece06e(0x6af) + 'Core'][_0xece06e(0x2cc)], _0x29809e = _0x29d473['PCBUY'][_0xece06e(0x2c1)](_0x358d0a['_mapId'], _0x358d0a[_0xece06e(0x923)]); return this['_EventIcon' + 's'][_0x29809e] = this[_0xece06e(0x558) + 's'][_0x29809e] || { 'iconIndex': 0x0, 'bufferX': _0x2562da[_0xece06e(0x39e)][_0xece06e(0x2f8)], 'bufferY': _0x2562da[_0xece06e(0x39e)]['BufferY'], 'blendMode': _0x2562da['Icon'][_0xece06e(0x45e)] }, this[_0xece06e(0x558) + 's'][_0x29809e]; } }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x527) + _0x2542b2(0x72e)] = function (_0x5fcffc, _0x198d49, _0xf441ee, _0x9eb655, _0x4515bd) { const _0xb91401 = _0x2542b2, _0x13f520 = { 'evsJz': function (_0x9867fc, _0x368e65) { return _0x9867fc === _0x368e65; }, 'WyimZ': _0xb91401(0x8b2), 'cFDeG': _0xb91401(0x3f3) + _0xb91401(0x6e2) }; if (_0x13f520[_0xb91401(0x210)](this[_0xb91401(0x558) + 's'], undefined)) this[_0xb91401(0x4e6) + _0xb91401(0xa78)](); const _0x5c2213 = _0x13f520[_0xb91401(0x210)](_0x5fcffc, $gamePlayer) ? _0x13f520[_0xb91401(0x5f0)] : _0x13f520['cFDeG'][_0xb91401(0x2c1)](_0x5fcffc[_0xb91401(0x5dc)], _0x5fcffc['_eventId']); this[_0xb91401(0x558) + 's'][_0x5c2213] = { 'iconIndex': _0x198d49, 'bufferX': _0xf441ee, 'bufferY': _0x9eb655, 'blendMode': _0x4515bd }; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x527) + _0x2542b2(0x797)] = function (_0x12f84f, _0xc1c239, _0x1be85a, _0x512c27, _0x257a9e, _0x2a98b4, _0x4ae1a7) { const _0x51198a = _0x2542b2, _0x3596d7 = { 'ERfhK': function (_0x58da06, _0x2d08db) { return _0x58da06 === _0x2d08db; }, 'QCbPv': _0x51198a(0x3f3) + 't%2' }; if (_0x3596d7['ERfhK'](this[_0x51198a(0x558) + 's'], undefined)) this[_0x51198a(0x4e6) + 'MoveCore'](); const _0x567aad = _0x3596d7[_0x51198a(0x5b3)]['format'](_0x12f84f, _0xc1c239); this[_0x51198a(0x558) + 's'][_0x567aad] = { 'iconIndex': _0x1be85a, 'forced': _0x4ae1a7, 'bufferX': _0x512c27, 'bufferY': _0x257a9e, 'blendMode': _0x2a98b4 }; }, Game_System[_0x2542b2(0x336)]['deleteIcon' + _0x2542b2(0x5b7) + _0x2542b2(0xa3b)] = function (_0x8830ae) { const _0x3b229d = _0x2542b2, _0x35b07e = { 'XgnFx': function (_0x1b31a7, _0x21071f) { return _0x1b31a7 === _0x21071f; }, 'QeXbA': function (_0x4fdf85, _0x24bf14) { return _0x4fdf85 === _0x24bf14; }, 'VBTUM': 'Player' }; if (_0x35b07e[_0x3b229d(0x49d)](this['_EventIcon' + 's'], undefined)) this[_0x3b229d(0x4e6) + _0x3b229d(0xa78)](); if (!_0x8830ae) return null; _0x35b07e[_0x3b229d(0xb68)](_0x8830ae, $gamePlayer) ? delete this[_0x3b229d(0x558) + 's'][_0x35b07e[_0x3b229d(0x839)]] : this['deleteIcon' + _0x3b229d(0x5b7) + _0x3b229d(0x258)](_0x8830ae[_0x3b229d(0x5dc)], _0x8830ae[_0x3b229d(0x923)]); }, Game_System['prototype'][_0x2542b2(0xa16) + 'sOnEventsD' + _0x2542b2(0x258)] = function (_0x1b435b, _0x1fc2cd) { const _0x442619 = _0x2542b2, _0x541f6e = { 'KyzXR': function (_0x1ad54e, _0x354721) { return _0x1ad54e === _0x354721; } }; if (_0x541f6e[_0x442619(0x771)](this[_0x442619(0x558) + 's'], undefined)) this['initEvents' + _0x442619(0xa78)](); this[_0x442619(0x527) + _0x442619(0x797)](_0x1b435b, _0x1fc2cd, -(0x2579 * -0x1 + 0x543 + 0x2037), 0x18be * 0x1 + 0x9e * -0x2d + -0x2 * -0x184, 0xf23 + 0xdc2 * -0x2 + 0xc61, -0x24 * -0x4f + -0x261e + -0x2 * -0xd81, ![]); }, Game_System['prototype'][_0x2542b2(0x62f) + _0x2542b2(0x743) + 'ta'] = function (_0x23d870) { const _0x3ae4dd = _0x2542b2, _0x2ed3f1 = { 'cVDIs': function (_0x25286d, _0x17d6c7) { return _0x25286d === _0x17d6c7; }, 'tTBQw': _0x3ae4dd(0x8b2) }; if (_0x2ed3f1[_0x3ae4dd(0x925)](this[_0x3ae4dd(0x558) + 's'], undefined)) this['initEvents' + _0x3ae4dd(0xa78)](); if (!_0x23d870) return null; _0x2ed3f1[_0x3ae4dd(0x925)](_0x23d870, $gamePlayer) ? delete this['_EventIcon' + 's'][_0x2ed3f1[_0x3ae4dd(0x7b2)]] : this[_0x3ae4dd(0x62f) + _0x3ae4dd(0x743) + _0x3ae4dd(0x964)](_0x23d870[_0x3ae4dd(0x5dc)], _0x23d870['_eventId']); }, Game_System['prototype']['resetIcons' + _0x2542b2(0x743) + 'taKey'] = function (_0x21a5e9, _0x23316d) { const _0x1a11d5 = _0x2542b2, _0x4f992e = { 'NQgue': function (_0x1cf64e, _0x10e95d) { return _0x1cf64e === _0x10e95d; }, 'JvDyb': 'Map%1-Even' + 't%2', 'XfXfe': function (_0x5792a6, _0x1e3333) { return _0x5792a6 < _0x1e3333; } }; if (_0x4f992e[_0x1a11d5(0x71b)](this[_0x1a11d5(0x558) + 's'], undefined)) this['initEvents' + _0x1a11d5(0xa78)](); const _0x4e69f5 = _0x4f992e[_0x1a11d5(0x540)][_0x1a11d5(0x2c1)](_0x21a5e9, _0x23316d); if (this[_0x1a11d5(0x558) + 's'][_0x4e69f5]) { if (_0x4f992e[_0x1a11d5(0x223)](this[_0x1a11d5(0x558) + 's'][_0x4e69f5]['iconIndex'], -0x210 + -0x218a + 0x239a)) return; if (this['_EventIcon' + 's'][_0x4e69f5]['forced']) return; } delete this['_EventIcon' + 's'][_0x4e69f5]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x73a) + _0x2542b2(0x69b) + _0x2542b2(0x514)] = function (_0x1a1aef, _0x3e7671) { const _0x2f6573 = _0x2542b2, _0x3fb756 = { 'qsTKD': function (_0x2a3176, _0x3e2f94) { return _0x2a3176 === _0x3e2f94; }, 'NfUke': _0x2f6573(0x3f3) + _0x2f6573(0x6e2), 'WWFOj': function (_0x397182, _0x3843ce) { return _0x397182 !== _0x3843ce; } }; if (_0x3fb756[_0x2f6573(0x661)](this[_0x2f6573(0x558) + 's'], undefined)) this[_0x2f6573(0x4e6) + 'MoveCore'](); const _0x2fe075 = _0x3fb756[_0x2f6573(0x894)][_0x2f6573(0x2c1)](_0x1a1aef, _0x3e7671); delete this[_0x2f6573(0x558) + 's'][_0x2fe075]; if (_0x3fb756[_0x2f6573(0xa29)](_0x1a1aef, $gameMap[_0x2f6573(0x2b8)]())) return; const _0x1d22b7 = $gameMap[_0x2f6573(0x264)](_0x3e7671); if (!_0x1d22b7) return; _0x1d22b7[_0x2f6573(0x209) + 'ettings'](); }, Game_System['prototype'][_0x2542b2(0x273) + _0x2542b2(0xa01) + 'n'] = function (_0xa27d2a) { const _0x2048d2 = _0x2542b2, _0x694dfe = { 'yyXqT': function (_0x51fc16, _0x162404) { return _0x51fc16 === _0x162404; }, 'XFUWh': _0x2048d2(0x3f3) + _0x2048d2(0x6e2) }; if (_0x694dfe[_0x2048d2(0xa72)](this[_0x2048d2(0x21a) + 'tLocations'], undefined)) this[_0x2048d2(0x4e6) + _0x2048d2(0xa78)](); if (!_0xa27d2a) return null; const _0x575884 = _0x694dfe[_0x2048d2(0x54e)]['format'](_0xa27d2a[_0x2048d2(0x5dc)], _0xa27d2a[_0x2048d2(0x923)]); return this['_SavedEven' + 'tLocations'][_0x575884]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0xa44) + _0x2542b2(0xb29)] = function (_0x670091) { const _0x1bcd68 = _0x2542b2, _0x34cd34 = { 'tgTjD': function (_0x2db562, _0x17fb5b) { return _0x2db562 === _0x17fb5b; }, 'niiLt': 'Map%1-Even' + _0x1bcd68(0x6e2) }; if (_0x34cd34[_0x1bcd68(0xa23)](this[_0x1bcd68(0x21a) + _0x1bcd68(0x951)], undefined)) this['initEvents' + 'MoveCore'](); if (!_0x670091) return; const _0x46b6ed = _0x34cd34[_0x1bcd68(0xa32)][_0x1bcd68(0x2c1)](_0x670091[_0x1bcd68(0x5dc)], _0x670091[_0x1bcd68(0x923)]); this[_0x1bcd68(0x21a) + _0x1bcd68(0x951)][_0x46b6ed] = { 'direction': _0x670091['direction'](), 'x': Math['round'](_0x670091['x']), 'y': Math[_0x1bcd68(0x3c7)](_0x670091['y']), 'pageIndex': _0x670091['_pageIndex'], 'moveRouteIndex': _0x670091[_0x1bcd68(0x5a8) + _0x1bcd68(0x383)] }; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x914) + 'dEventLoca' + _0x2542b2(0x388)] = function (_0x120d37) { const _0x367cb5 = _0x2542b2, _0x3a424e = { 'sfJLp': function (_0x1a0321, _0x5dae60) { return _0x1a0321 === _0x5dae60; } }; if (_0x3a424e[_0x367cb5(0xad3)](this[_0x367cb5(0x21a) + _0x367cb5(0x951)], undefined)) this[_0x367cb5(0x4e6) + 'MoveCore'](); if (!_0x120d37) return; this[_0x367cb5(0x914) + 'dEventLoca' + _0x367cb5(0xadb)](_0x120d37[_0x367cb5(0x5dc)], _0x120d37[_0x367cb5(0x923)]); }, Game_System[_0x2542b2(0x336)]['deleteSave' + _0x2542b2(0x674) + _0x2542b2(0xadb)] = function (_0x567327, _0xb5d03d) { const _0x177c06 = _0x2542b2, _0x3a2128 = { 'QtmKO': function (_0x5e1df3, _0x4ab5d2) { return _0x5e1df3 === _0x4ab5d2; }, 'uzbpv': 'Map%1-Even' + _0x177c06(0x6e2) }; if (_0x3a2128['QtmKO'](this[_0x177c06(0x21a) + _0x177c06(0x951)], undefined)) this[_0x177c06(0x4e6) + _0x177c06(0xa78)](); const _0x27e59c = _0x3a2128[_0x177c06(0x4ce)][_0x177c06(0x2c1)](_0x567327, _0xb5d03d); delete this['_SavedEven' + _0x177c06(0x951)][_0x27e59c]; }, Game_System[_0x2542b2(0x336)]['createSave' + _0x2542b2(0x4ee) + 'ionData'] = function (_0x2d1d7f, _0xe94a84, _0x23553f, _0xb82494, _0x5600c1, _0x16bf76, _0xbeec52) { const _0x538235 = _0x2542b2, _0x2ce228 = { 'DfRBy': function (_0x557796, _0x1dbeac) { return _0x557796 === _0x1dbeac; }, 'WUbVx': 'Map%1-Even' + _0x538235(0x6e2) }; if (_0x2ce228[_0x538235(0x303)](this[_0x538235(0x21a) + 'tLocations'], undefined)) this[_0x538235(0x4e6) + 'MoveCore'](); const _0x4232d9 = _0x2ce228[_0x538235(0x9ff)][_0x538235(0x2c1)](_0x2d1d7f, _0xe94a84); this[_0x538235(0x21a) + _0x538235(0x951)][_0x4232d9] = { 'direction': _0x5600c1, 'x': Math[_0x538235(0x3c7)](_0x23553f), 'y': Math['round'](_0xb82494), 'pageIndex': _0x16bf76, 'moveRouteIndex': _0xbeec52 }; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x49e) + _0x2542b2(0x2e7) + _0x2542b2(0x8cd)] = function (_0x426e5e) { const _0x3146c3 = _0x2542b2, _0xec4e20 = { 'hImCW': function (_0x4d0559, _0x1ab3b5) { return _0x4d0559 === _0x1ab3b5; }, 'szphu': _0x3146c3(0x3f3) + _0x3146c3(0x6e2) }; if (_0xec4e20[_0x3146c3(0x54b)](this[_0x3146c3(0x99a) + _0x3146c3(0x2ad) + _0x3146c3(0xa59)], undefined)) this['initEvents' + _0x3146c3(0xa78)](); if (!_0x426e5e) return; const _0x6f343 = _0xec4e20[_0x3146c3(0x42a)][_0x3146c3(0x2c1)](_0x426e5e[_0x3146c3(0x5dc)], _0x426e5e[_0x3146c3(0x923)]); return this['_Preserved' + _0x3146c3(0x2ad) + _0x3146c3(0xa59)][_0x6f343]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x41e) + 'vedMorphEv' + _0x2542b2(0xa02)] = function (_0x2b4511, _0x31fcb1, _0xca5874, _0x19fef0, _0x1142f5) { const _0x3ddae = _0x2542b2, _0x2fd167 = { 'peYdE': function (_0x3c5431, _0x17d66a) { return _0x3c5431 === _0x17d66a; }, 'ixkix': _0x3ddae(0x3f3) + _0x3ddae(0x6e2) }; if (_0x2fd167['peYdE'](this[_0x3ddae(0x99a) + 'EventMorph' + _0x3ddae(0xa59)], undefined)) this['initEvents' + _0x3ddae(0xa78)](); const _0x5ccdb7 = _0x2fd167['ixkix'][_0x3ddae(0x2c1)](_0x2b4511, _0x31fcb1); this[_0x3ddae(0x99a) + 'EventMorph' + 'Data'][_0x5ccdb7] = { 'template': _0xca5874, 'mapId': _0x19fef0, 'eventId': _0x1142f5 }; }, Game_System['prototype'][_0x2542b2(0xadc) + _0x2542b2(0x7a9) + _0x2542b2(0x937) + 'ey'] = function (_0x5902e2, _0x4b53bd) { const _0x1d4b1d = _0x2542b2, _0x3b217d = { 'ZSalp': function (_0x8c5359, _0x534481) { return _0x8c5359 === _0x534481; }, 'bueam': _0x1d4b1d(0x3f3) + _0x1d4b1d(0x6e2) }; if (_0x3b217d[_0x1d4b1d(0x898)](this[_0x1d4b1d(0x99a) + 'EventMorph' + _0x1d4b1d(0xa59)], undefined)) this[_0x1d4b1d(0x4e6) + _0x1d4b1d(0xa78)](); const _0x2e98df = _0x3b217d['bueam'][_0x1d4b1d(0x2c1)](_0x5902e2, _0x4b53bd); delete this['_Preserved' + _0x1d4b1d(0x2ad) + 'Data'][_0x2e98df]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x4a4) + _0x2542b2(0x305) + 'ta'] = function (_0x537682) { const _0x5ae4f1 = _0x2542b2, _0xc1a4d1 = { 'wxAiX': function (_0x50756c, _0x2a4134) { return _0x50756c === _0x2a4134; } }; if (_0xc1a4d1['wxAiX'](this[_0x5ae4f1(0x91b) + _0x5ae4f1(0x462)], undefined)) this[_0x5ae4f1(0x4e6) + 'MoveCore'](); return this['_MapSpawne' + _0x5ae4f1(0x462)][_0x537682] = this[_0x5ae4f1(0x91b) + 'dEventData'][_0x537682] || [], this[_0x5ae4f1(0x91b) + 'dEventData'][_0x537682]; }, Game_System[_0x2542b2(0x336)]['removeTemp' + _0x2542b2(0x246) + _0x2542b2(0x80e) + 's'] = function (_0x5b0b32) { const _0x10ac76 = _0x2542b2, _0x1508da = this['getMapSpaw' + 'nedEventDa' + 'ta'](_0x5b0b32); for (const _0x1c674b of _0x1508da) { if (!_0x1c674b) continue; if (_0x1c674b[_0x10ac76(0x372) + _0x10ac76(0x652)]) continue; const _0x523f91 = _0x1508da[_0x10ac76(0x75c)](_0x1c674b); _0x1508da[_0x523f91] = null; } }, Game_System[_0x2542b2(0x336)]['initFollow' + _0x2542b2(0x79b) + 'er'] = function () { const _0x2eb39b = _0x2542b2; this['_followerC' + _0x2eb39b(0x9fb)] = 0xcd3 + 0x82c + -0x14ff, this[_0x2eb39b(0x8df) + _0x2eb39b(0x3d1)] = ![]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x965) + _0x2542b2(0x8d2) + 'rID'] = function () { const _0x5eeb23 = _0x2542b2, _0x25cbf7 = { 'eHkkN': function (_0x1e11bb, _0x38d4c8) { return _0x1e11bb === _0x38d4c8; } }; if (_0x25cbf7[_0x5eeb23(0x2ba)](this[_0x5eeb23(0x8df) + 'ontrolID'], undefined)) this[_0x5eeb23(0xa93) + _0x5eeb23(0x79b) + 'er'](); return this[_0x5eeb23(0x8df) + _0x5eeb23(0x9fb)]; }, Game_System[_0x2542b2(0x336)]['setControl' + 'ledFollowe' + _0x2542b2(0xa57)] = function (_0x5ace14) { const _0x28b78f = _0x2542b2, _0x37ceee = { 'mhJHj': function (_0x486e77, _0x3dcd9f) { return _0x486e77 === _0x3dcd9f; } }; if (_0x37ceee[_0x28b78f(0x8f7)](this[_0x28b78f(0x8df) + _0x28b78f(0x9fb)], undefined)) this['initFollow' + _0x28b78f(0x79b) + 'er'](); this[_0x28b78f(0x8df) + 'ontrolID'] = _0x5ace14;; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Inter' + 'preter_cha' + _0x2542b2(0x459)] = Game_Interpreter['prototype']['character'], Game_Interpreter[_0x2542b2(0x336)][_0x2542b2(0x893)] = function (_0x5bfafb) { const _0xd9e26c = _0x2542b2, _0x263f84 = { 'ubrms': function (_0x5b49c3, _0x260b6b) { return _0x5b49c3 < _0x260b6b; }, 'EltbN': function (_0xae8354, _0x35af05) { return _0xae8354 > _0x35af05; }, 'JLdni': function (_0x4b5d9f, _0x25855b) { return _0x4b5d9f - _0x25855b; } }; if (!$gameParty['inBattle']() && _0x263f84[_0xd9e26c(0x598)](_0x5bfafb, 0x13b * -0x4 + 0x9ff + -0x513 * 0x1)) { let _0x149d43 = $gameSystem[_0xd9e26c(0x965) + 'ledFollowe' + _0xd9e26c(0xa57)](); if (_0x263f84[_0xd9e26c(0x761)](_0x149d43, -0x1f87 + -0x160d * -0x1 + -0x2 * -0x4bd)) return $gamePlayer['followers']()['follower'](_0x263f84[_0xd9e26c(0x247)](_0x149d43, -0x85 * 0x7 + 0x1eae + -0x1b0a)); } return VisuMZ[_0xd9e26c(0x6af) + _0xd9e26c(0x53e)][_0xd9e26c(0x6ae) + _0xd9e26c(0x835) + 'racter'][_0xd9e26c(0x325)](this, _0x5bfafb); }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x919) + _0x2542b2(0x211) + 'g'] = function () { const _0x1b9b5f = _0x2542b2, _0x1176e5 = { 'UnWCk': function (_0x54d9f1, _0x2e1785) { return _0x54d9f1 === _0x2e1785; } }; if (_0x1176e5[_0x1b9b5f(0xab4)](this['_followerC' + _0x1b9b5f(0x3d1)], undefined)) this[_0x1b9b5f(0xa93) + _0x1b9b5f(0x79b) + 'er'](); return this[_0x1b9b5f(0x8df) + _0x1b9b5f(0x3d1)]; }, Game_System[_0x2542b2(0x336)][_0x2542b2(0x525) + _0x2542b2(0x2dc) + 'ng'] = function (_0x3053ae) { const _0x462503 = _0x2542b2, _0x5521dc = { 'eKVLH': function (_0x3f4267, _0x4dd245) { return _0x3f4267 === _0x4dd245; } }; if (_0x5521dc[_0x462503(0xb2b)](this[_0x462503(0x8df) + 'haseOff'], undefined)) this[_0x462503(0xa93) + _0x462503(0x79b) + 'er'](); this[_0x462503(0x8df) + _0x462503(0x3d1)] = _0x3053ae;; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x418) + _0x2542b2(0x6d8) + 'll'] = Game_Followers[_0x2542b2(0x336)]['jumpAll'], Game_Followers['prototype']['jumpAll'] = function () { const _0x2a919e = _0x2542b2; if ($gameSystem[_0x2a919e(0x919) + 'owerChasin' + 'g']()) return; VisuMZ[_0x2a919e(0x6af) + _0x2a919e(0x53e)][_0x2a919e(0x418) + _0x2a919e(0x6d8) + 'll'][_0x2a919e(0x325)](this); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Timer' + _0x2542b2(0x24d) + 'e'] = Game_Timer[_0x2542b2(0x336)]['initialize'], Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x9f5)] = function () { const _0x4addc9 = _0x2542b2; VisuMZ[_0x4addc9(0x6af) + _0x4addc9(0x53e)][_0x4addc9(0x895) + '_initializ' + 'e']['call'](this), this[_0x4addc9(0x4e6) + 'MoveCore'](); }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x4e6) + 'MoveCore'] = function () { const _0x3323cc = _0x2542b2; this[_0x3323cc(0xaa9)] = ![], this['_speed'] = -(-0x120e * -0x2 + 0x4 * 0x76e + -0x41d3), this[_0x3323cc(0x3f2) + _0x3323cc(0xb49)] = -0x250c + -0x11f4 + -0x1b8 * -0x20; }, Game_Timer[_0x2542b2(0x336)]['update'] = function (_0x457c8c) { const _0x3180e9 = _0x2542b2, _0x2ccedb = { 'tyKbu': _0x3180e9(0xa11) + _0x3180e9(0x447), 'Ahqug': function (_0x53605d, _0x2c6f6a) { return _0x53605d <= _0x2c6f6a; }, 'BwSgI': function (_0x3738e4, _0xe1a074) { return _0x3738e4 === _0xe1a074; }, 'ILGzu': function (_0x3e2c2a, _0x19a2d7) { return _0x3e2c2a <= _0x19a2d7; } }, _0x227270 = _0x2ccedb[_0x3180e9(0x8fb)]['split']('|'); let _0x2e390c = 0x56b * 0x4 + 0x1 * -0x2696 + -0x1b1 * -0xa; while (!![]) { switch (_0x227270[_0x2e390c++]) { case '0': this[_0x3180e9(0x699)] += this['_speed']; continue; case '1': if (!_0x457c8c) return; continue; case '2': if (_0x2ccedb[_0x3180e9(0x649)](this[_0x3180e9(0x699)], -0x26b7 + 0x19f6 * 0x1 + 0x1 * 0xcc1)) return; continue; case '3': if (_0x2ccedb[_0x3180e9(0x6b6)](this[_0x3180e9(0x61b)], undefined)) this['initEvents' + 'MoveCore'](); continue; case '4': _0x2ccedb['ILGzu'](this[_0x3180e9(0x699)], -0x5d4 + 0x442 + 0x192) && this['onExpire'](); continue; case '5': if (this['_paused']) return; continue; case '6': if (!this['_working']) return; continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Timer' + _0x2542b2(0x663)] = Game_Timer[_0x2542b2(0x336)]['start'], Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x357)] = function (_0x17169b) { const _0x2858a3 = _0x2542b2, _0x39131f = { 'ygosw': function (_0x47d9c2, _0x115eb9) { return _0x47d9c2 === _0x115eb9; } }; VisuMZ[_0x2858a3(0x6af) + _0x2858a3(0x53e)][_0x2858a3(0x895) + _0x2858a3(0x663)]['call'](this, _0x17169b); if (_0x39131f['ygosw'](this['_paused'], undefined)) this[_0x2858a3(0x4e6) + 'MoveCore'](); this[_0x2858a3(0xaa9)] = ![]; }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x895) + _0x2542b2(0x660)] = Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x7b0)], Game_Timer[_0x2542b2(0x336)]['stop'] = function () { const _0x46c9a4 = _0x2542b2, _0x4ebfdc = { 'AkOsS': function (_0x1f9ff5, _0x111dc4) { return _0x1f9ff5 === _0x111dc4; } }; VisuMZ['EventsMove' + _0x46c9a4(0x53e)][_0x46c9a4(0x895) + _0x46c9a4(0x660)][_0x46c9a4(0x325)](this); if (_0x4ebfdc[_0x46c9a4(0x90b)](this[_0x46c9a4(0xaa9)], undefined)) this[_0x46c9a4(0x4e6) + _0x46c9a4(0xa78)](); this[_0x46c9a4(0xaa9)] = ![]; }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x5b2)] = function () { const _0x35cc40 = _0x2542b2, _0xa4f931 = { 'IQott': function (_0x2fee9b, _0x2d3d87) { return _0x2fee9b <= _0x2d3d87; } }; if (_0xa4f931[_0x35cc40(0x1da)](this[_0x35cc40(0x699)], -0x1 * -0x191c + 0x2690 + 0x1 * -0x3fac)) return; this[_0x35cc40(0xaa9)] = !![], this[_0x35cc40(0x36c)] = !![]; }, Game_Timer['prototype']['resume'] = function () { const _0x5299fe = _0x2542b2, _0x541ae0 = { 'eRppP': function (_0x2633e8, _0x25f742) { return _0x2633e8 <= _0x25f742; } }; if (_0x541ae0[_0x5299fe(0x225)](this[_0x5299fe(0x699)], -0xbc1 * 0x3 + 0x1c79 + 0x6ca)) return; this['_paused'] = ![], this[_0x5299fe(0x36c)] = !![]; }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x6f2)] = function (_0x225cea) { const _0x5e8c69 = _0x2542b2; this[_0x5e8c69(0x699)] = this['_frames'] || 0x88c + 0x186 + -0xa12 * 0x1, this[_0x5e8c69(0x699)] += _0x225cea, this[_0x5e8c69(0x36c)] = !![], this['_frames'] = Math[_0x5e8c69(0x89c)](0x2453 + 0x1a5f + -0xb * 0x5b3, this[_0x5e8c69(0x699)]); }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x4f2)] = function (_0x4ec767) { const _0x3707ff = _0x2542b2; this['_frames'] = this[_0x3707ff(0x699)] || -0x1 * 0xbb + 0x31 * 0xa7 + -0x1f3c, this[_0x3707ff(0x699)] = _0x4ec767, this[_0x3707ff(0x36c)] = !![], this[_0x3707ff(0x699)] = Math['max'](-0x1503 + 0x1f2b + -0xa27, this[_0x3707ff(0x699)]); }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x74a) + 'd'] = function (_0x39d379) { const _0x500e4e = _0x2542b2, _0x3e9798 = { 'JmQdP': function (_0x1f9b42, _0x1ddddd) { return _0x1f9b42 > _0x1ddddd; } }; this['_speed'] = _0x39d379, this['_working'] = !![], _0x3e9798[_0x500e4e(0x984)](_0x39d379, -0x1d8e + 0x54f + 0x1 * 0x183f) && (this[_0x500e4e(0x699)] = Math[_0x500e4e(0x89c)](this[_0x500e4e(0x699)], -0x118d + 0xe6 * 0x7 + -0xe * -0xce)); }, Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x296) + _0x2542b2(0x3c5)] = function (_0x4359b7) { const _0x4250a6 = _0x2542b2, _0x161b47 = { 'xgFGg': function (_0x384b8e, _0x508bb2) { return _0x384b8e === _0x508bb2; } }; if (_0x161b47[_0x4250a6(0x6f9)](this['_expireCom' + 'monEvent'], undefined)) this[_0x4250a6(0x4e6) + _0x4250a6(0xa78)](); this['_expireCom' + 'monEvent'] = _0x4359b7; }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x895) + '_onExpire'] = Game_Timer[_0x2542b2(0x336)][_0x2542b2(0x784)], Game_Timer[_0x2542b2(0x336)]['onExpire'] = function () { const _0x56c340 = _0x2542b2, _0x85f6b3 = { 'MuWbN': function (_0x5962b0, _0x3faaae) { return _0x5962b0 === _0x3faaae; } }; if (_0x85f6b3[_0x56c340(0x252)](this['_expireCom' + _0x56c340(0xb49)], undefined)) this[_0x56c340(0x4e6) + 'MoveCore'](); this[_0x56c340(0x3f2) + _0x56c340(0xb49)] ? $gameTemp[_0x56c340(0x81b) + _0x56c340(0xb49)](this['_expireCom' + _0x56c340(0xb49)]) : VisuMZ['EventsMove' + _0x56c340(0x53e)]['Game_Timer' + _0x56c340(0xaaa)][_0x56c340(0x325)](this); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Messa' + _0x2542b2(0x8a7)] = Game_Message[_0x2542b2(0x336)][_0x2542b2(0xa9e)], Game_Message[_0x2542b2(0x336)][_0x2542b2(0xa9e)] = function (_0xfa67e9) { const _0x2b4410 = _0x2542b2; VisuMZ[_0x2b4410(0x6af) + _0x2b4410(0x53e)][_0x2b4410(0x7f7) + _0x2b4410(0x8a7)][_0x2b4410(0x325)](this, _0xfa67e9), this[_0x2b4410(0x322)] = $gameTemp['getSelfTar' + _0x2b4410(0xac6)](); }, Game_Message[_0x2542b2(0x336)][_0x2542b2(0x3df) + _0x2542b2(0xa8e)] = function () { const _0x3a3424 = _0x2542b2; $gameTemp[_0x3a3424(0x3df) + _0x3a3424(0xb57)](this[_0x3a3424(0x322)]); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x1d5) + _0x2542b2(0x882)] = Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x872)], Game_Switches[_0x2542b2(0x336)]['value'] = function (_0x1771e0) { const _0x270c7c = _0x2542b2; if (DataManager['isAdvanced' + _0x270c7c(0x72d)](_0x1771e0)) return !!this[_0x270c7c(0x6c8) + _0x270c7c(0x6e1)](_0x1771e0); else { if (DataManager['isSelfSwit' + 'ch'](_0x1771e0)) return !!this[_0x270c7c(0x54c)](_0x1771e0); else return DataManager[_0x270c7c(0x2a8) + 'h'](_0x1771e0) ? !!this[_0x270c7c(0x443)](_0x1771e0) : VisuMZ[_0x270c7c(0x6af) + _0x270c7c(0x53e)][_0x270c7c(0x1d5) + _0x270c7c(0x882)][_0x270c7c(0x325)](this, _0x1771e0); } }, Game_Switches[_0x2542b2(0x528) + 'nc'] = {}, Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x6c8) + _0x2542b2(0x6e1)] = function (_0xbf36c2) { const _0x1814be = _0x2542b2, _0xb8ad63 = { 'emdSu': _0x1814be(0x4bc), 'fjbkA': function (_0x3b6216, _0x2ff28c) { return _0x3b6216(_0x2ff28c); }, 'gnGEh': 'switchId' }; if (!Game_Switches[_0x1814be(0x528) + 'nc'][_0xbf36c2]) { $dataSystem[_0x1814be(0x299)][_0xbf36c2][_0x1814be(0x4d6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i); const _0x4c6c76 = _0xb8ad63[_0x1814be(0xb3b)]['format'](_0xb8ad63['fjbkA'](String, RegExp['$1'])); Game_Switches[_0x1814be(0x528) + 'nc'][_0xbf36c2] = new Function(_0xb8ad63[_0x1814be(0x985)], _0x4c6c76); } const _0x2d2273 = $gameTemp[_0x1814be(0x345) + 'get']() || this; return Game_Switches[_0x1814be(0x528) + 'nc'][_0xbf36c2]['call'](_0x2d2273, _0xbf36c2); }, Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x54c)] = function (_0x5e0b1d) { const _0x48499a = _0x2542b2, _0x5aad0a = { 'JQnAP': function (_0x467540, _0xf67a1) { return _0x467540 !== _0xf67a1; }, 'gfyRr': _0x48499a(0xa60) + _0x48499a(0x2a3) }, _0x2f58eb = $gameTemp[_0x48499a(0x345) + _0x48499a(0xac6)]() || this; if (_0x5aad0a[_0x48499a(0x5a6)](_0x2f58eb[_0x48499a(0x6dc) + 'r'], Game_Event)) return VisuMZ[_0x48499a(0x6af) + _0x48499a(0x53e)][_0x48499a(0x1d5) + _0x48499a(0x882)][_0x48499a(0x325)](this, _0x5e0b1d); else { const _0x552e95 = [_0x2f58eb['_mapId'], _0x2f58eb[_0x48499a(0x923)], _0x5aad0a[_0x48499a(0x8e6)][_0x48499a(0x2c1)](_0x5e0b1d)]; return $gameSelfSwitches[_0x48499a(0x872)](_0x552e95); } }, Game_Switches['prototype'][_0x2542b2(0x443)] = function (_0x509ce7) { const _0x701ca3 = _0x2542b2, _0xef6bdb = { 'OHOAY': 'Map\x20%1\x20Swi' + _0x701ca3(0x31b) }, _0x4d3ce7 = $gameMap ? $gameMap['mapId']() : -0x18f0 + -0x1623 * 0x1 + 0x75 * 0x67, _0x410b20 = [-0x613 * 0x1 + 0xc * 0xa2 + 0x185 * -0x1, 0x1ea3 + 0x1977 + -0x381a, _0xef6bdb['OHOAY']['format'](_0x4d3ce7, _0x509ce7)]; return $gameSelfSwitches['value'](_0x410b20); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x1d5) + _0x2542b2(0xa6e) + 'ue'] = Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x238)], Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x238)] = function (_0x5b30bb, _0x27b767) { const _0x115408 = _0x2542b2; if (DataManager[_0x115408(0xa62) + 'ch'](_0x5b30bb)) this[_0x115408(0x7f0) + 'ue'](_0x5b30bb, _0x27b767); else DataManager['isMapSwitc' + 'h'](_0x5b30bb) ? this[_0x115408(0x421) + 'e'](_0x5b30bb, _0x27b767) : VisuMZ[_0x115408(0x6af) + _0x115408(0x53e)]['Game_Switc' + _0x115408(0xa6e) + 'ue'][_0x115408(0x325)](this, _0x5b30bb, _0x27b767); }, Game_Switches[_0x2542b2(0x336)][_0x2542b2(0x7f0) + 'ue'] = function (_0x32f36f, _0x113934) { const _0x4a485a = _0x2542b2, _0x7ea39 = { 'ORdPX': function (_0x30aa9f, _0xb1813) { return _0x30aa9f !== _0xb1813; }, 'KvNiq': _0x4a485a(0xa60) + 'h\x20%1' }, _0x22b348 = $gameTemp[_0x4a485a(0x345) + 'get']() || this; if (_0x7ea39[_0x4a485a(0x708)](_0x22b348[_0x4a485a(0x6dc) + 'r'], Game_Event)) VisuMZ[_0x4a485a(0x6af) + _0x4a485a(0x53e)][_0x4a485a(0x1d5) + _0x4a485a(0xa6e) + 'ue'][_0x4a485a(0x325)](this, _0x32f36f, _0x113934); else { const _0x57b497 = [_0x22b348[_0x4a485a(0x5dc)], _0x22b348[_0x4a485a(0x923)], _0x7ea39[_0x4a485a(0x576)]['format'](_0x32f36f)]; $gameSelfSwitches[_0x4a485a(0x238)](_0x57b497, _0x113934); } }, Game_Switches['prototype'][_0x2542b2(0x421) + 'e'] = function (_0x117f71, _0x5d97af) { const _0x2139ac = _0x2542b2, _0x26d58a = { 'zzWtN': _0x2139ac(0x213) + _0x2139ac(0x31b) }, _0x32034a = $gameMap ? $gameMap[_0x2139ac(0x2b8)]() : -0x4 * -0x52 + -0xa7 * 0x29 + 0x1977, _0x44113b = [-0x22c0 + 0x1 * 0x752 + 0x2 * 0xdb7, 0x2 * -0x510 + 0xa38 + 0xc * -0x2, _0x26d58a[_0x2139ac(0x5d6)][_0x2139ac(0x2c1)](_0x32034a, _0x117f71)]; return $gameSelfSwitches[_0x2139ac(0x238)](_0x44113b, _0x5d97af); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x569) + _0x2542b2(0x662)] = Game_Variables[_0x2542b2(0x336)][_0x2542b2(0x872)], Game_Variables[_0x2542b2(0x336)][_0x2542b2(0x872)] = function (_0x4fa20c) { const _0x193237 = _0x2542b2; if (DataManager[_0x193237(0x75f) + _0x193237(0x362)](_0x4fa20c)) return this[_0x193237(0x6c8) + _0x193237(0x6e1)](_0x4fa20c); else { if (DataManager[_0x193237(0x44b) + 'able'](_0x4fa20c)) return this['selfValue'](_0x4fa20c); else return DataManager[_0x193237(0x2af) + _0x193237(0xa55)](_0x4fa20c) ? this['mapValue'](_0x4fa20c) : VisuMZ['EventsMove' + _0x193237(0x53e)]['Game_Varia' + 'bles_value']['call'](this, _0x4fa20c); } }, Game_Variables[_0x2542b2(0x528) + 'nc'] = {}, Game_Variables['prototype'][_0x2542b2(0x6c8) + _0x2542b2(0x6e1)] = function (_0x3e5d59) { const _0x2a6745 = _0x2542b2, _0x54b2c0 = { 'QVqsf': 'return\x20%1', 'gdeyB': function (_0x2d8618, _0x4c22c2) { return _0x2d8618(_0x4c22c2); }, 'TDqvZ': _0x2a6745(0x2f3) }; if (!Game_Variables[_0x2a6745(0x528) + 'nc'][_0x3e5d59]) { $dataSystem[_0x2a6745(0x695)][_0x3e5d59][_0x2a6745(0x4d6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i); const _0xa245ce = _0x54b2c0[_0x2a6745(0x34f)][_0x2a6745(0x2c1)](_0x54b2c0[_0x2a6745(0x4bb)](String, RegExp['$1'])); Game_Variables[_0x2a6745(0x528) + 'nc'][_0x3e5d59] = new Function(_0x54b2c0[_0x2a6745(0x7c6)], _0xa245ce); } const _0x3048cc = $gameTemp[_0x2a6745(0x345) + _0x2a6745(0xac6)]() || this; return Game_Variables[_0x2a6745(0x528) + 'nc'][_0x3e5d59][_0x2a6745(0x325)](_0x3048cc, _0x3e5d59); }, Game_Variables[_0x2542b2(0x336)]['selfValue'] = function (_0x1cf21) { const _0x496968 = _0x2542b2, _0x2b0fb4 = { 'QWUTI': function (_0xe3eb1d, _0x3569d3) { return _0xe3eb1d !== _0x3569d3; }, 'knvBK': _0x496968(0xb11) + _0x496968(0x8b3) }, _0x2a6daf = $gameTemp['getSelfTar' + 'get']() || this; if (_0x2b0fb4[_0x496968(0xad0)](_0x2a6daf[_0x496968(0x6dc) + 'r'], Game_Event)) return VisuMZ[_0x496968(0x6af) + _0x496968(0x53e)][_0x496968(0x569) + _0x496968(0x662)][_0x496968(0x325)](this, _0x1cf21); else { const _0x47d9df = [_0x2a6daf[_0x496968(0x5dc)], _0x2a6daf[_0x496968(0x923)], _0x2b0fb4[_0x496968(0x406)][_0x496968(0x2c1)](_0x1cf21)]; return $gameSelfSwitches[_0x496968(0x872)](_0x47d9df); } }, Game_Variables['prototype'][_0x2542b2(0x443)] = function (_0x113cae) { const _0x437a46 = _0x2542b2, _0x40770a = { 'BCjJN': 'Map\x20%1\x20Var' + _0x437a46(0x518) }, _0x7e60f5 = $gameMap ? $gameMap[_0x437a46(0x2b8)]() : 0xb0f + 0x7b3 + 0x1 * -0x12c2, _0x38099c = [0x18ca + 0x9 * 0x29a + -0x3034, -0x1f75 * 0x1 + 0x9 * -0xc1 + 0x263e, _0x40770a['BCjJN'][_0x437a46(0x2c1)](_0x7e60f5, _0x113cae)]; return $gameSelfSwitches[_0x437a46(0x872)](_0x38099c) || 0x2547 + -0x7bc + 0x3 * -0x9d9; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x569) + 'bles_setVa' + _0x2542b2(0x6e1)] = Game_Variables['prototype'][_0x2542b2(0x238)], Game_Variables[_0x2542b2(0x336)][_0x2542b2(0x238)] = function (_0x472be1, _0x3c319e) { const _0x5e0817 = _0x2542b2; if (DataManager[_0x5e0817(0x44b) + 'able'](_0x472be1)) this['setSelfVal' + 'ue'](_0x472be1, _0x3c319e); else DataManager['isMapVaria' + _0x5e0817(0xa55)](_0x472be1) ? this[_0x5e0817(0x421) + 'e'](_0x472be1, _0x3c319e) : VisuMZ['EventsMove' + _0x5e0817(0x53e)]['Game_Varia' + _0x5e0817(0x4d7) + _0x5e0817(0x6e1)]['call'](this, _0x472be1, _0x3c319e); }, Game_Variables[_0x2542b2(0x336)][_0x2542b2(0x7f0) + 'ue'] = function (_0x3853ba, _0xa0224f) { const _0x14ecec = _0x2542b2, _0x4f2bdc = { 'zNAma': function (_0xd88112, _0x57866d) { return _0xd88112 !== _0x57866d; }, 'eKYCW': _0x14ecec(0xb11) + _0x14ecec(0x8b3) }, _0x4b4f82 = $gameTemp[_0x14ecec(0x345) + _0x14ecec(0xac6)]() || this; if (_0x4f2bdc['zNAma'](_0x4b4f82[_0x14ecec(0x6dc) + 'r'], Game_Event)) VisuMZ[_0x14ecec(0x6af) + _0x14ecec(0x53e)][_0x14ecec(0x569) + _0x14ecec(0x4d7) + _0x14ecec(0x6e1)][_0x14ecec(0x325)](this, _0x3853ba, _0xa0224f); else { const _0x589070 = [_0x4b4f82['_mapId'], _0x4b4f82[_0x14ecec(0x923)], _0x4f2bdc['eKYCW'][_0x14ecec(0x2c1)](_0x3853ba)]; $gameSelfSwitches[_0x14ecec(0x238)](_0x589070, _0xa0224f); } }, Game_Variables[_0x2542b2(0x336)][_0x2542b2(0x421) + 'e'] = function (_0x48cac7, _0x1b3bff) { const _0x5a5077 = _0x2542b2, _0x556c6c = { 'peiYC': _0x5a5077(0x7cc) + _0x5a5077(0x518) }, _0x12549d = $gameMap ? $gameMap[_0x5a5077(0x2b8)]() : 0x1430 * -0x1 + 0x1 * -0x10d + 0x153d * 0x1, _0x225cf2 = [-0x2a5 * -0x4 + 0x20 * -0xef + 0x134c, -0x15e3 + -0x2fa + -0x13 * -0x14f, _0x556c6c['peiYC'][_0x5a5077(0x2c1)](_0x12549d, _0x48cac7)]; $gameSelfSwitches[_0x5a5077(0x238)](_0x225cf2, _0x1b3bff); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2d0) + _0x2542b2(0xa7a) + _0x2542b2(0x6e1)] = Game_SelfSwitches[_0x2542b2(0x336)][_0x2542b2(0x872)], Game_SelfSwitches[_0x2542b2(0x336)][_0x2542b2(0x872)] = function (_0x330638) { const _0x55da2f = _0x2542b2; if (_0x330638[-0x1 * 0x2151 + 0x1d2 * 0x11 + -0x15 * -0x1d][_0x55da2f(0x4d6)](/(?:SELF|MAP)/i)) return this[_0x55da2f(0x54c)](_0x330638); else { return VisuMZ[_0x55da2f(0x6af) + _0x55da2f(0x53e)][_0x55da2f(0x2d0) + 'witches_va' + _0x55da2f(0x6e1)][_0x55da2f(0x325)](this, _0x330638);; } }, Game_SelfSwitches[_0x2542b2(0x336)]['selfValue'] = function (_0x19f753) { const _0x38270a = _0x2542b2; return _0x19f753[0xb * 0x243 + 0x1499 + 0x1 * -0x2d78][_0x38270a(0x4d6)](/VAR/i) ? this[_0x38270a(0x7a2)][_0x19f753] || -0x1831 * -0x1 + 0x1a76 + -0x32a7 : !!this[_0x38270a(0x7a2)][_0x19f753]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_SelfS' + _0x2542b2(0x9aa) + _0x2542b2(0x43d)] = Game_SelfSwitches['prototype'][_0x2542b2(0x238)], Game_SelfSwitches[_0x2542b2(0x336)][_0x2542b2(0x238)] = function (_0x3cb00d, _0x14f9b4) { const _0xe475f = _0x2542b2; _0x3cb00d[0x104e * -0x1 + -0x3 * 0x325 + -0xa9 * -0x27][_0xe475f(0x4d6)](/(?:SELF|MAP)/i) ? this[_0xe475f(0x7f0) + 'ue'](_0x3cb00d, _0x14f9b4) : VisuMZ[_0xe475f(0x6af) + _0xe475f(0x53e)][_0xe475f(0x2d0) + 'witches_se' + _0xe475f(0x43d)][_0xe475f(0x325)](this, _0x3cb00d, _0x14f9b4); }, Game_SelfSwitches[_0x2542b2(0x336)][_0x2542b2(0x7f0) + 'ue'] = function (_0x445566, _0x26b3bc) { const _0x4df7ed = _0x2542b2; this[_0x4df7ed(0x7a2)][_0x445566] = _0x445566[0x208f + 0x1772 + 0x1 * -0x37ff][_0x4df7ed(0x4d6)](/VAR/i) ? _0x26b3bc : !!_0x26b3bc, this['onChange'](); }, VisuMZ[_0x2542b2(0x6af) + 'Core']['Scene_Map_' + _0x2542b2(0x2ab) + _0x2542b2(0x6b1)] = Scene_Map[_0x2542b2(0x336)][_0x2542b2(0x2ab) + _0x2542b2(0x6b1)], Scene_Map['prototype']['createDisp' + _0x2542b2(0x6b1)] = function () { const _0x3640ad = _0x2542b2; $gameMap[_0x3640ad(0xada) + _0x3640ad(0x8ad) + 's'](), VisuMZ['EventsMove' + _0x3640ad(0x53e)]['Scene_Map_' + _0x3640ad(0x2ab) + _0x3640ad(0x6b1)]['call'](this); }, Game_Map['prototype'][_0x2542b2(0xada) + _0x2542b2(0x8ad) + 's'] = function () { const _0x5363cc = _0x2542b2; this[_0x5363cc(0x86a)] = this['mapId'](), this[_0x5363cc(0xb0f) + 'e'] = undefined; const _0x239f61 = this[_0x5363cc(0xb16)](); for (const _0x19daeb of _0x239f61) { if (_0x19daeb) $gameSelfSwitches['resetSelfS' + _0x5363cc(0x343) + 'Event'](_0x19daeb); } }, Game_SelfSwitches['prototype']['resetSelfS' + _0x2542b2(0x343) + _0x2542b2(0xac5)] = function (_0x3aa4b6) { const _0x510af4 = _0x2542b2, _0x5698a0 = { 'TyGWE': _0x510af4(0x80d), 'yxyYH': function (_0x10ab87, _0x40f23a) { return _0x10ab87 > _0x40f23a; } }; if (!_0x3aa4b6) return; if (!_0x3aa4b6[_0x510af4(0x264)]()) return; const _0x5195b9 = _0x3aa4b6[_0x510af4(0x264)]()[_0x510af4(0x23e)] || ''; if (_0x5195b9[_0x510af4(0x4d6)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)) { const _0x4b6908 = _0x5698a0[_0x510af4(0x7c5)][_0x510af4(0x2c1)]($gameMap[_0x510af4(0x5dc)], _0x3aa4b6[_0x510af4(0x923)]), _0x400579 = Object['keys'](this[_0x510af4(0x7a2)])[_0x510af4(0x855)](_0x2aca7a => _0x2aca7a[_0x510af4(0x4e7)](_0x4b6908)); while (_0x5698a0[_0x510af4(0xa46)](_0x400579[_0x510af4(0x50b)], 0x60d + 0x2561 * 0x1 + -0x2b6e)) { const _0x470eea = _0x400579[_0x510af4(0x36f)](); delete this['_data'][_0x470eea]; } } }, Game_SelfSwitches[_0x2542b2(0x336)][_0x2542b2(0xa1a) + _0x2542b2(0x343) + _0x2542b2(0x904)] = function (_0x2ddf66) { const _0x3b6146 = _0x2542b2, _0x54bfe2 = { 'ODzwD': _0x3b6146(0x685), 'HMnut': function (_0x53bc24, _0x229b8a) { return _0x53bc24 > _0x229b8a; }, 'GSqsb': function (_0x175bb8, _0x54a3b5) { return _0x175bb8 === _0x54a3b5; } }, _0x4ed3c9 = _0x54bfe2['ODzwD']['format']($gameMap[_0x3b6146(0x5dc)]), _0x4e2701 = Object[_0x3b6146(0x8ff)](this['_data'])[_0x3b6146(0x855)](_0x2469d2 => _0x2469d2[_0x3b6146(0x4e7)](_0x4ed3c9)); while (_0x54bfe2[_0x3b6146(0x422)](_0x4e2701['length'], 0x35f + -0xa84 * -0x2 + -0x1 * 0x1867)) { const _0x109001 = _0x4e2701[_0x3b6146(0x36f)](); delete this['_data'][_0x109001]; } _0x54bfe2[_0x3b6146(0x4ef)](_0x2ddf66, $gameMap[_0x3b6146(0x2b8)]()) && $gameMap[_0x3b6146(0x729) + 'resh'](); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x646) + _0x2542b2(0x3f1) + _0x2542b2(0x7bd) + 'n'] = Game_Enemy['prototype'][_0x2542b2(0xa5b) + _0x2542b2(0x88a)], Game_Enemy[_0x2542b2(0x336)][_0x2542b2(0xa5b) + _0x2542b2(0x88a)] = function (_0x3dd393) { const _0x25f49d = _0x2542b2; $gameTemp[_0x25f49d(0x3df) + _0x25f49d(0xb57)](this); const _0xc9907f = VisuMZ[_0x25f49d(0x6af) + 'Core']['Game_Enemy' + '_meetsSwit' + _0x25f49d(0x7bd) + 'n'][_0x25f49d(0x325)](this, _0x3dd393); return $gameTemp['clearSelfT' + 'arget'](), _0xc9907f; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x96f) + _0x2542b2(0xae6) + _0x2542b2(0x6c5)] = Game_Party[_0x2542b2(0x336)][_0x2542b2(0x7c3) + _0x2542b2(0x8a2)], Game_Party[_0x2542b2(0x336)]['hasEncount' + _0x2542b2(0x8a2)] = function () { const _0x57a022 = _0x2542b2; if (this[_0x57a022(0x6d3) + _0x57a022(0x399) + 'terHalfEve' + _0x57a022(0x4ad)]()) return !![]; return VisuMZ[_0x57a022(0x6af) + _0x57a022(0x53e)][_0x57a022(0x96f) + _0x57a022(0xae6) + _0x57a022(0x6c5)]['call'](this); }, Game_Party[_0x2542b2(0x336)]['isPlayerWi' + _0x2542b2(0x399) + 'terHalfEve' + 'nts'] = function () { const _0x498573 = _0x2542b2, _0x30fbe3 = { 'cWTzP': function (_0xaf60d2, _0xb52b10, _0x59e319) { return _0xaf60d2(_0xb52b10, _0x59e319); } }; if (this[_0x498573(0xa82) + 'unterRaw']) return ![]; return _0x30fbe3[_0x498573(0x2a9)]($isTileEncounterHalf, $gamePlayer['x'], $gamePlayer['y']); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x96f) + _0x2542b2(0xae6) + _0x2542b2(0x4ea)] = Game_Party['prototype'][_0x2542b2(0x7c3) + _0x2542b2(0x7ab)], Game_Party[_0x2542b2(0x336)][_0x2542b2(0x7c3) + _0x2542b2(0x7ab)] = function () { const _0x408780 = _0x2542b2; if (this['isPlayerWi' + _0x408780(0x399) + _0x408780(0x52f) + _0x408780(0x4ad)]()) return !![]; return VisuMZ[_0x408780(0x6af) + _0x408780(0x53e)][_0x408780(0x96f) + _0x408780(0xae6) + 'terNone'][_0x408780(0x325)](this); }, Game_Party['prototype'][_0x2542b2(0x6d3) + 'thinEncoun' + 'terNoneEve' + _0x2542b2(0x4ad)] = function () { const _0x3d73af = _0x2542b2, _0x3556af = { 'iTwrp': function (_0xe7461d, _0xfdd56d, _0xaf5bb9) { return _0xe7461d(_0xfdd56d, _0xaf5bb9); } }; if (this[_0x3d73af(0xa82) + _0x3d73af(0xa73)]) return ![]; return _0x3556af[_0x3d73af(0x1fd)]($isTileEncounterNone, $gamePlayer['x'], $gamePlayer['y']); }; var $isTileEncounterHalf = function (_0x3e7fc3, _0x324176) { const _0x1484d2 = _0x2542b2, _0x4e12bc = { 'uSjfg': function (_0x165043, _0x1c4c36) { return _0x165043 || _0x1c4c36; }, 'AUeUh': function (_0x4c7234, _0x41ecf3) { return _0x4c7234 || _0x41ecf3; } }; if (!$gameMap) return ![]; _0x3e7fc3 = Math['round'](_0x4e12bc[_0x1484d2(0x629)](_0x3e7fc3, 0x424 + -0x3dd + -0x47)), _0x324176 = Math[_0x1484d2(0x3c7)](_0x4e12bc[_0x1484d2(0x7f3)](_0x324176, -0x228f * 0x1 + 0x1d8 * -0x14 + 0x476f)); const _0x5eb635 = $gameMap[_0x1484d2(0xb16)](); for (const _0xd32eb7 of _0x5eb635) { if (!_0xd32eb7) continue; if (_0xd32eb7[_0x1484d2(0x4e2)]) continue; const _0x479e05 = _0xd32eb7['encounterP' + _0x1484d2(0x2c3) + 'pe'](!![]), _0x4fedff = _0xd32eb7[_0x1484d2(0x537) + _0x1484d2(0x47e) + _0x1484d2(0x5fd)](!![]); if ($gameMap[_0x1484d2(0xb28) + 'Proximity'](_0x3e7fc3, _0x324176, _0xd32eb7, _0x479e05, _0x4fedff)) return !![]; } return ![]; }, $isTileEncounterNone = function (_0x5223e2, _0x4ebecd) { const _0x15acda = _0x2542b2, _0x1814cc = { 'Nikav': function (_0x36bbf3, _0x2533b8) { return _0x36bbf3 || _0x2533b8; }, 'HIxFS': function (_0x5316b6, _0x168288) { return _0x5316b6 || _0x168288; } }; if (!$gameMap) return ![]; _0x5223e2 = Math[_0x15acda(0x3c7)](_0x1814cc[_0x15acda(0x391)](_0x5223e2, 0x1 * -0x22a3 + 0xc4c + 0x1657)), _0x4ebecd = Math[_0x15acda(0x3c7)](_0x1814cc[_0x15acda(0x4a0)](_0x4ebecd, 0x4d7 + -0xfe9 + 0xb12 * 0x1)); const _0x1c1a98 = $gameMap[_0x15acda(0xb16)](); for (const _0x58464f of _0x1c1a98) { if (!_0x58464f) continue; if (_0x58464f[_0x15acda(0x4e2)]) continue; const _0x25e166 = _0x58464f[_0x15acda(0x537) + _0x15acda(0x2c3) + 'pe'](![]), _0x25d588 = _0x58464f[_0x15acda(0x537) + _0x15acda(0x47e) + 'stance'](![]); if ($gameMap[_0x15acda(0xb28) + _0x15acda(0x275)](_0x5223e2, _0x4ebecd, _0x58464f, _0x25e166, _0x25d588)) return !![]; } return ![]; }; VisuMZ['EventsMove' + 'Core'][_0x2542b2(0x2bb) + _0x2542b2(0x818) + _0x2542b2(0x20e)] = Game_Troop[_0x2542b2(0x336)][_0x2542b2(0x1d6) + 'tions'], Game_Troop[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)] = function (_0x3035e0) { const _0x1ff857 = _0x2542b2; $gameTemp[_0x1ff857(0x3df) + 'lfTarget'](this); const _0x1519e0 = VisuMZ[_0x1ff857(0x6af) + _0x1ff857(0x53e)][_0x1ff857(0x2bb) + _0x1ff857(0x818) + _0x1ff857(0x20e)][_0x1ff857(0x325)](this, _0x3035e0); return $gameTemp['clearSelfT' + _0x1ff857(0x4b2)](), _0x1519e0; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Game_Map_s' + _0x2542b2(0x24a)] = Game_Map['prototype'][_0x2542b2(0x83c)], Game_Map[_0x2542b2(0x336)][_0x2542b2(0x83c)] = function (_0x5e56e5) { const _0x488c19 = _0x2542b2, _0x45efe5 = { 'YzqiF': _0x488c19(0x31e) + '|4|2|6|12|' + _0x488c19(0xb56) }, _0x1274d9 = _0x45efe5['YzqiF'][_0x488c19(0x968)]('|'); let _0xb167e9 = -0x29 * 0x57 + 0x1adf + -0xcf0; while (!![]) { switch (_0x1274d9[_0xb167e9++]) { case '0': this['clearEvent' + _0x488c19(0x6bc)](); continue; case '1': this['requestMap' + _0x488c19(0x7ff) + _0x488c19(0x32d)](); continue; case '2': this['setupSaveE' + _0x488c19(0x9c0) + 'ons'](); continue; case '3': this[_0x488c19(0x2eb) + _0x488c19(0x54a)](); continue; case '4': this[_0x488c19(0x5ee) + 'nRestricti' + _0x488c19(0x4d5)](); continue; case '5': this[_0x488c19(0x624) + _0x488c19(0x6bc)](); continue; case '6': this[_0x488c19(0x9cd) + _0x488c19(0x2e6)](); continue; case '7': this[_0x488c19(0xae4) + 'oraryMapSp' + _0x488c19(0x80e) + 's'](_0x5e56e5); continue; case '8': this[_0x488c19(0x624) + 'Cache'](); continue; case '9': this[_0x488c19(0x789) + 'werVisibil' + _0x488c19(0x7b7) + 'es'](); continue; case '10': VisuMZ[_0x488c19(0x6af) + _0x488c19(0x53e)]['Game_Map_s' + 'etup'][_0x488c19(0x325)](this, _0x5e56e5); continue; case '11': this[_0x488c19(0x94c) + _0x488c19(0x376) + _0x488c19(0x21b)](); continue; case '12': this[_0x488c19(0x1d9) + _0x488c19(0x6ed) + _0x488c19(0x3ec)](); continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0xb32) + _0x2542b2(0x90f)] = Game_Map[_0x2542b2(0x336)][_0x2542b2(0x499) + 's'], Game_Map[_0x2542b2(0x336)][_0x2542b2(0x499) + 's'] = function () { const _0x43d37c = _0x2542b2; VisuMZ[_0x43d37c(0x6af) + _0x43d37c(0x53e)]['Game_Map_s' + _0x43d37c(0x90f)]['call'](this), this[_0x43d37c(0x8b1) + _0x43d37c(0x6c0)](); }, Game_Map[_0x2542b2(0x64a) + _0x2542b2(0x311) + _0x2542b2(0x82b)] = -0x238e + 0xc82 + 0x1 * 0x17d4, Game_Map[_0x2542b2(0x336)]['determineE' + _0x2542b2(0x34e) + 'ad'] = function () { const _0x3dfaf2 = _0x2542b2, _0x2f02ca = { 'yhHjD': function (_0x28443c, _0x360155) { return _0x28443c > _0x360155; } }, _0x5b1941 = Game_Map[_0x3dfaf2(0x64a) + _0x3dfaf2(0x311) + _0x3dfaf2(0x82b)]; this[_0x3dfaf2(0x64a) + _0x3dfaf2(0x8cb)] = _0x2f02ca[_0x3dfaf2(0x92d)](this[_0x3dfaf2(0xb16)]()['length'], _0x5b1941); if (this['_eventOver' + _0x3dfaf2(0x8cb)] && $gameTemp[_0x3dfaf2(0x4e1)]()) { } }, Game_Map[_0x2542b2(0x336)]['isEventOve' + 'rloaded'] = function () { const _0x39bfb4 = _0x2542b2; return this[_0x39bfb4(0x64a) + 'load']; }, Game_Map[_0x2542b2(0x336)]['clearEvent' + 'Cache'] = function () { this['_eventCach' + 'e'] = undefined; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x2eb) + _0x2542b2(0x54a)] = function () { const _0x76f065 = _0x2542b2; this['_diagonalS' + _0x76f065(0xa51)] = VisuMZ['EventsMove' + _0x76f065(0x53e)][_0x76f065(0x2cc)][_0x76f065(0x44e)]['EnableDir8']; const _0x5a1386 = $dataMap[_0x76f065(0x23e)] || ''; if (_0x5a1386[_0x76f065(0x4d6)](/<DIAGONAL MOVEMENT: ON>/i)) this[_0x76f065(0xaff) + _0x76f065(0xa51)] = !![]; else _0x5a1386['match'](/<DIAGONAL MOVEMENT: OFF>/i) && (this[_0x76f065(0xaff) + 'upport'] = ![]); }, Game_Map[_0x2542b2(0x628) + 'GONAL_PATH' + _0x2542b2(0x617)] = VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2cc)][_0x2542b2(0x44e)][_0x2542b2(0x432) + _0x2542b2(0x363) + 'd'] ?? ![], Game_Map['prototype']['isSupportD' + 'iagonalMov' + _0x2542b2(0x618)] = function () { const _0x1d88a7 = _0x2542b2, _0x153132 = { 'SoroE': function (_0x4f271b, _0x106800) { return _0x4f271b === _0x106800; }, 'bFirn': _0x1d88a7(0x7ad), 'dzsde': function (_0x3ea8af, _0x4a2477) { return _0x3ea8af === _0x4a2477; }, 'DePgF': _0x1d88a7(0x1f5) }; if (Utils['isMobileDe' + _0x1d88a7(0xa06)]()) { if (!Game_Map[_0x1d88a7(0x628) + _0x1d88a7(0x4b7) + _0x1d88a7(0x617)]) return ![]; } const _0x382316 = $gameSystem[_0x1d88a7(0x4b8) + _0x1d88a7(0x935) + _0x1d88a7(0x380)](); if (_0x153132[_0x1d88a7(0x263)](_0x382316, _0x153132[_0x1d88a7(0x472)])) return !![]; if (_0x153132[_0x1d88a7(0x4e8)](_0x382316, _0x153132['DePgF'])) return ![]; if (_0x153132[_0x1d88a7(0x263)](this[_0x1d88a7(0xaff) + _0x1d88a7(0xa51)], undefined)) this[_0x1d88a7(0x2eb) + _0x1d88a7(0x54a)](); return this['_diagonalS' + _0x1d88a7(0xa51)]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x91f) + _0x2542b2(0x61d)] = function (_0x193cc7, _0x49427e) { const _0x3df03a = _0x2542b2; if ([-0x225e + 0xaf * 0x7 + -0xe * -0x21d, -0xdf2 + 0x1 * 0x2401 + -0xb * 0x201, 0x1 * -0x139 + -0x1 * -0x26ef + -0x25af][_0x3df03a(0x927)](_0x49427e)) _0x193cc7 -= 0x541 + -0x1608 + 0x10c8; if ([0x337 * -0x1 + -0x506 * -0x2 + 0x369 * -0x2, -0x1c * 0xd6 + 0x742 + 0xb4 * 0x17, -0xe37 + 0x152e * 0x1 + 0x1 * -0x6ee][_0x3df03a(0x927)](_0x49427e)) _0x193cc7 += 0x1891 + -0x1d35 + -0x29 * -0x1d; return this[_0x3df03a(0xa45)](_0x193cc7); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x799) + _0x2542b2(0x61d)] = function (_0x32decf, _0x3a0a1d) { const _0x1017fb = _0x2542b2; if ([0x1301 + 0x1 * 0x1fec + -0x32ec, 0x1 * -0x23f6 + 0xa * -0x152 + 0x312c, 0x236d + 0x1 * -0x9e4 + -0x1986][_0x1017fb(0x927)](_0x3a0a1d)) _0x32decf += 0x1ba1 * 0x1 + 0x606 + 0x49 * -0x76; if ([0x2 * 0xa00 + 0xb * 0x16b + -0x3a * 0x9d, 0x1 * -0x980 + -0x6fa + 0x1082, -0x1a0e + 0x6e6 + 0x1331]['includes'](_0x3a0a1d)) _0x32decf -= -0x52d + 0x29 * 0x8b + -0x1115; return this[_0x1017fb(0xaab)](_0x32decf); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x5f2) + 'e'] = function (_0x2fca06, _0x35c108, _0x4d569f, _0x48e17d) { const _0x26edc9 = _0x2542b2; return Math[_0x26edc9(0x89c)](Math[_0x26edc9(0x620)](this[_0x26edc9(0x5f6)](_0x2fca06, _0x4d569f)), Math['abs'](this['deltaY'](_0x35c108, _0x48e17d))); }, Game_Map['prototype'][_0x2542b2(0x5ee) + 'nRestricti' + _0x2542b2(0x4d5)] = function () { const _0x1497eb = _0x2542b2, _0xb3cdfb = { 'ydUBb': _0x1497eb(0x78c), 'vQdHZ': _0x1497eb(0x7ef), 'xJUjL': _0x1497eb(0x37d), 'cQFtZ': _0x1497eb(0x8b4), 'FGaTI': _0x1497eb(0x7db), 'LXpEM': _0x1497eb(0x8b2), 'memiz': _0x1497eb(0xac5), 'iUcij': _0x1497eb(0x679), 'iKwwR': 'Boat', 'SXDCF': _0x1497eb(0x99b), 'OwXhG': _0x1497eb(0x97a), 'xEKlu': _0x1497eb(0x479), 'KasYa': function (_0x34711e, _0x378097) { return _0x34711e(_0x378097); }, 'FjohX': function (_0x529ca7, _0x5e8d6f) { return _0x529ca7 + _0x5e8d6f; }, 'KKrUG': function (_0x22d743, _0x201e16) { return _0x22d743 + _0x201e16; }, 'FwKnM': function (_0x413fe6, _0x26ba02) { return _0x413fe6 + _0x26ba02; } }, _0x4b5cfe = VisuMZ['EventsMove' + _0x1497eb(0x53e)][_0x1497eb(0x2cc)][_0x1497eb(0x2d4)], _0x48ed65 = {}, _0x35add1 = [_0xb3cdfb['ydUBb'], _0xb3cdfb[_0x1497eb(0x5f7)], _0xb3cdfb[_0x1497eb(0x8e5)]], _0x49e501 = [_0xb3cdfb[_0x1497eb(0x716)], _0xb3cdfb[_0x1497eb(0x42e)], _0xb3cdfb['LXpEM'], _0xb3cdfb[_0x1497eb(0x658)], _0xb3cdfb[_0x1497eb(0x666)], _0xb3cdfb[_0x1497eb(0xb17)], _0xb3cdfb['SXDCF'], _0xb3cdfb['OwXhG']]; for (const _0xbd0429 of _0x35add1) { for (const _0x5c7eab of _0x49e501) { const _0x1fa32f = _0xb3cdfb[_0x1497eb(0x4ba)][_0x1497eb(0x2c1)](_0x5c7eab, _0xbd0429); _0x4b5cfe[_0x1fa32f] && (_0x48ed65[_0x1fa32f] = _0x4b5cfe[_0x1fa32f]['slice'](0x4f9 + 0x1 * -0x24ab + 0x1fb2)); } } const _0x32b86c = $dataMap[_0x1497eb(0x23e)] || '', _0x482199 = _0x32b86c[_0x1497eb(0x4d6)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi); if (_0x482199) for (const _0x4cecb7 of _0x482199) { _0x4cecb7[_0x1497eb(0x4d6)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i); let _0x53044d = _0xb3cdfb[_0x1497eb(0xa9a)](String, RegExp['$1'])[_0x1497eb(0x405) + 'e']()[_0x1497eb(0x7fa)](), _0x5ad816 = _0xb3cdfb[_0x1497eb(0xa9a)](String, RegExp['$2'])[_0x1497eb(0x405) + 'e']()[_0x1497eb(0x7fa)](); const _0x300562 = JSON[_0x1497eb(0x8f4)](_0xb3cdfb[_0x1497eb(0x1db)](_0xb3cdfb[_0x1497eb(0x7a6)]('[', RegExp['$3'][_0x1497eb(0x4d6)](/\d+/g)), ']')); _0x53044d = _0xb3cdfb[_0x1497eb(0x2f2)](_0x53044d[_0x1497eb(0x866)](0x111d + 0x1 * -0x24e4 + 0x13c7)[_0x1497eb(0x564) + 'e'](), _0x53044d[_0x1497eb(0x241)](-0x2635 + -0x2440 + 0x253b * 0x2)), _0x5ad816 = _0xb3cdfb[_0x1497eb(0x1db)](_0x5ad816[_0x1497eb(0x866)](0x56d + 0xf7b + -0x14e8)[_0x1497eb(0x564) + 'e'](), _0x5ad816[_0x1497eb(0x241)](-0x1 * -0x241a + 0x174c + -0x5 * 0xbe1)); const _0xff1ebc = _0xb3cdfb[_0x1497eb(0x4ba)][_0x1497eb(0x2c1)](_0x53044d, _0x5ad816); if (_0x48ed65[_0xff1ebc]) _0x48ed65[_0xff1ebc] = _0x48ed65[_0xff1ebc]['concat'](_0x300562); } this['_regionRul' + 'es'] = _0x48ed65; }, Game_Map['prototype'][_0x2542b2(0x5ac) + _0x2542b2(0x483)] = function (_0x4062d1, _0x55b563, _0x506075, _0x1242ec) { const _0x5cd2f6 = _0x2542b2, _0x479113 = { 'thXBy': function (_0x16bd22, _0x50e315) { return _0x16bd22 === _0x50e315; }, 'jxFYe': _0x5cd2f6(0x823), 'oTugR': function (_0x16b703, _0x6bcdc7) { return _0x16b703 === _0x6bcdc7; }, 'RLDan': 'event', 'xhOem': _0x5cd2f6(0x96d), 'CzgdO': function (_0x7a4ed6, _0x3d9c03) { return _0x7a4ed6 + _0x3d9c03; } }, _0x24ee17 = this[_0x5cd2f6(0x91f) + 'Direction'](_0x4062d1, _0x506075), _0x355bb0 = this[_0x5cd2f6(0x799) + _0x5cd2f6(0x61d)](_0x55b563, _0x506075), _0x13dbc7 = this[_0x5cd2f6(0x29d)](_0x24ee17, _0x355bb0), _0x31f745 = this[_0x5cd2f6(0xa4f) + 'es']; if (_0x31f745[_0x5cd2f6(0x36b)][_0x5cd2f6(0x927)](_0x13dbc7)) return !![]; else { if (_0x479113[_0x5cd2f6(0x31a)](_0x1242ec, _0x479113[_0x5cd2f6(0x9e0)])) return _0x31f745[_0x5cd2f6(0x2d6) + 'w'][_0x5cd2f6(0x927)](_0x13dbc7) || _0x31f745[_0x5cd2f6(0x961)][_0x5cd2f6(0x927)](_0x13dbc7); else { if (_0x479113[_0x5cd2f6(0x3c9)](_0x1242ec, _0x479113[_0x5cd2f6(0x27d)])) return _0x31f745[_0x5cd2f6(0x1ed)]['includes'](_0x13dbc7) || _0x31f745[_0x5cd2f6(0x961)]['includes'](_0x13dbc7); else { if (_0x31f745[_0x5cd2f6(0x2c0) + 'ow'][_0x5cd2f6(0x927)](_0x13dbc7)) return !![]; else { const _0x4aa6e5 = _0x479113[_0x5cd2f6(0x4d1)]['format'](_0x479113[_0x5cd2f6(0xa2c)](_0x1242ec[_0x5cd2f6(0x866)](0x8b * -0x8 + 0xc * 0x2aa + 0x1a * -0x110)[_0x5cd2f6(0x564) + 'e'](), _0x1242ec[_0x5cd2f6(0x241)](0x73c + -0x1b * 0xef + -0x4e * -0x3b))); if (_0x31f745[_0x4aa6e5]) return _0x31f745[_0x4aa6e5][_0x5cd2f6(0x927)](_0x13dbc7); } } } } return ![]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x65a) + _0x2542b2(0x28c)] = function (_0x178192, _0x2bd281, _0x4ac2b8, _0x194beb) { const _0x2a04c0 = _0x2542b2, _0x5d7310 = { 'NmzfG': function (_0x5a1e26, _0x268f61) { return _0x5a1e26 === _0x268f61; }, 'Ppeoj': 'player', 'RODne': _0x2a04c0(0x264), 'yOFhK': _0x2a04c0(0x1f4), 'YLnBH': function (_0xa1f042, _0x3a22ed) { return _0xa1f042 + _0x3a22ed; } }, _0x27cc60 = this[_0x2a04c0(0x91f) + _0x2a04c0(0x61d)](_0x178192, _0x4ac2b8), _0xa1dac3 = this[_0x2a04c0(0x799) + _0x2a04c0(0x61d)](_0x2bd281, _0x4ac2b8), _0x58ec41 = this[_0x2a04c0(0x29d)](_0x27cc60, _0xa1dac3), _0x3b0000 = this[_0x2a04c0(0xa4f) + 'es']; if (_0x3b0000[_0x2a04c0(0x9eb)]['includes'](_0x58ec41)) return !![]; else { if (_0x5d7310['NmzfG'](_0x194beb, _0x5d7310[_0x2a04c0(0x5b6)])) return _0x3b0000[_0x2a04c0(0x66c) + 'id'][_0x2a04c0(0x927)](_0x58ec41) || _0x3b0000[_0x2a04c0(0xaef)][_0x2a04c0(0x927)](_0x58ec41); else { if (_0x5d7310[_0x2a04c0(0x360)](_0x194beb, _0x5d7310['RODne'])) return _0x3b0000[_0x2a04c0(0x609) + 'd'][_0x2a04c0(0x927)](_0x58ec41) || _0x3b0000[_0x2a04c0(0xaef)][_0x2a04c0(0x927)](_0x58ec41); else { if (_0x3b0000[_0x2a04c0(0x586) + _0x2a04c0(0x287)]['includes'](_0x58ec41)) return !![]; else { const _0x2bfa6d = _0x5d7310['yOFhK'][_0x2a04c0(0x2c1)](_0x5d7310['YLnBH'](_0x194beb['charAt'](-0x1ef2 * 0x1 + -0x1efd + 0x421 * 0xf)[_0x2a04c0(0x564) + 'e'](), _0x194beb[_0x2a04c0(0x241)](-0x1b17 * 0x1 + 0x1fe3 + -0x4cb))); if (_0x3b0000[_0x2bfa6d]) return _0x3b0000[_0x2bfa6d][_0x2a04c0(0x927)](_0x58ec41); } } } } return ![]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x4cf) + _0x2542b2(0x3d9)] = function (_0x2cecca, _0x4b04bb, _0x432f2e, _0x13e0a7) { const _0x4edc9f = _0x2542b2, _0x38f1b6 = { 'HWdJD': function (_0xa9f506, _0x4c2412) { return _0xa9f506 === _0x4c2412; }, 'laDZE': _0x4edc9f(0x9d9), 'FCHga': _0x4edc9f(0x33e), 'zsFFh': function (_0x41a606, _0x53947f) { return _0x41a606 + _0x53947f; } }; _0x432f2e = _0x38f1b6[_0x4edc9f(0x3a1)](_0x13e0a7, _0x38f1b6['laDZE']) ? -0xefd * 0x1 + 0x22d1 + -0x13cf : _0x432f2e; const _0x30e53e = this['roundXWith' + 'Direction'](_0x2cecca, _0x432f2e), _0x399ce3 = this['roundYWith' + 'Direction'](_0x4b04bb, _0x432f2e), _0x3dfef0 = this[_0x4edc9f(0x29d)](_0x30e53e, _0x399ce3), _0x54b544 = this[_0x4edc9f(0xa4f) + 'es']; if (_0x54b544[_0x4edc9f(0x6c7) + 'k'][_0x4edc9f(0x927)](_0x3dfef0)) return !![]; else { const _0x5c5742 = _0x38f1b6[_0x4edc9f(0x933)]['format'](_0x38f1b6['zsFFh'](_0x13e0a7[_0x4edc9f(0x866)](-0x2 * -0x3f7 + -0x14c5 + 0x13 * 0xad)[_0x4edc9f(0x564) + 'e'](), _0x13e0a7[_0x4edc9f(0x241)](-0x26d9 + 0x1fe8 + 0xe * 0x7f))); if (_0x54b544[_0x5c5742]) return _0x54b544[_0x5c5742][_0x4edc9f(0x927)](_0x3dfef0); } return ![]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2b9) + _0x2542b2(0x2f4)] = Game_Map[_0x2542b2(0x336)]['refresh'], Game_Map[_0x2542b2(0x336)]['refresh'] = function () { const _0x4b8294 = _0x2542b2; VisuMZ[_0x4b8294(0x6af) + _0x4b8294(0x53e)][_0x4b8294(0x2b9) + _0x4b8294(0x2f4)][_0x4b8294(0x325)](this), this[_0x4b8294(0xa20) + _0x4b8294(0xa8b) + _0x4b8294(0x972)](); }, Game_Map['prototype'][_0x2542b2(0xa20) + _0x2542b2(0xa8b) + _0x2542b2(0x972)] = function () { const _0x563655 = _0x2542b2, _0x278838 = { 'LzPcf': _0x563655(0x25c) }, _0x292214 = _0x278838[_0x563655(0x6e9)][_0x563655(0x968)]('|'); let _0x26be66 = 0x106f + 0x2317 + -0x1 * 0x3386; while (!![]) { switch (_0x292214[_0x26be66++]) { case '0': if (this[_0x563655(0xb16)]()[_0x563655(0x415)](_0x52ded8 => _0x52ded8[_0x563655(0x741) + _0x563655(0xa07) + _0x563655(0xaf4)]())) { this[_0x563655(0x82e) + _0x563655(0xae9) + 'h'] = !![]; return; } continue; case '1': if (this[_0x563655(0xb16)]()[_0x563655(0x415)](_0x48b689 => _0x48b689[_0x563655(0x752)]())) { this[_0x563655(0x82e) + _0x563655(0xae9) + 'h'] = !![]; return; } continue; case '2': if (this[_0x563655(0xb53) + 'nts'][_0x563655(0x415)](_0x173fd1 => _0x173fd1[_0x563655(0x741) + _0x563655(0xa07) + 'iable']())) { this[_0x563655(0x82e) + _0x563655(0xae9) + 'h'] = !![]; return; } continue; case '3': if (this['_commonEve' + _0x563655(0x4ad)][_0x563655(0x415)](_0x57d737 => _0x57d737['hasCPCs']())) { this[_0x563655(0x82e) + _0x563655(0xae9) + 'h'] = !![]; return; } continue; case '4': this[_0x563655(0x82e) + 'odicRefres' + 'h'] = ![]; continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x71e) + 'pdate'] = Game_Map[_0x2542b2(0x336)][_0x2542b2(0x316)], Game_Map['prototype']['update'] = function (_0x991ee9) { const _0x1b14b1 = _0x2542b2; this['updatePeri' + 'odicRefres' + 'h'](), VisuMZ[_0x1b14b1(0x6af) + _0x1b14b1(0x53e)]['Game_Map_u' + _0x1b14b1(0x84e)][_0x1b14b1(0x325)](this, _0x991ee9); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x7f1) + _0x2542b2(0xae9) + 'h'] = function () { const _0x452d74 = _0x2542b2, _0x6c97e2 = { 'Aoxcv': function (_0x3f441e, _0x3558fd) { return _0x3f441e <= _0x3558fd; } }; if (!this[_0x452d74(0x82e) + 'odicRefres' + 'h']) return; this[_0x452d74(0x916) + _0x452d74(0x967) + 'r'] = this[_0x452d74(0x916) + _0x452d74(0x967) + 'r'] || 0x9 * -0x3d + -0xd5 * 0x1b + 0x18d8, this[_0x452d74(0x916) + _0x452d74(0x967) + 'r']--, _0x6c97e2[_0x452d74(0x561)](this[_0x452d74(0x916) + _0x452d74(0x967) + 'r'], 0xa * 0x288 + 0xed9 + -0x2829) && (this[_0x452d74(0x729) + _0x452d74(0x669)](), this[_0x452d74(0x916) + _0x452d74(0x967) + 'r'] = 0x87e * 0x2 + 0xf1 * -0x22 + 0x3f * 0x3e); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x8de) + _0x2542b2(0x52c) + _0x2542b2(0x6cd)] = Game_Map['prototype'][_0x2542b2(0x9e2) + 'bled'], Game_Map[_0x2542b2(0x336)][_0x2542b2(0x9e2) + 'bled'] = function () { const _0x5a1609 = _0x2542b2; if (!$gameSystem[_0x5a1609(0x8d7) + _0x5a1609(0x523)]()) return !![]; return VisuMZ['EventsMove' + _0x5a1609(0x53e)]['Game_Map_i' + _0x5a1609(0x52c) + 'led'][_0x5a1609(0x325)](this); }, Game_Map['prototype'][_0x2542b2(0xb39) + _0x2542b2(0x9c0) + _0x2542b2(0x4d5)] = function () { const _0x9404d9 = _0x2542b2; this[_0x9404d9(0x6e6) + _0x9404d9(0xaf1)] = ![]; const _0x3a9db9 = $dataMap[_0x9404d9(0x23e)] || ''; _0x3a9db9[_0x9404d9(0x4d6)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i) && (this['_saveEvent' + 'Locations'] = !![]); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x896) + 'tLocations'] = function () { const _0x3a06e1 = _0x2542b2, _0xe2c626 = { 'EstGP': function (_0xfce767, _0x1859b4) { return _0xfce767 === _0x1859b4; } }; if (_0xe2c626[_0x3a06e1(0x2cd)](this[_0x3a06e1(0x6e6) + 'Locations'], undefined)) this[_0x3a06e1(0xb39) + 'ventLocati' + _0x3a06e1(0x4d5)](); return this[_0x3a06e1(0x6e6) + _0x3a06e1(0xaf1)]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0xae4) + 'oraryMapSp' + _0x2542b2(0x80e) + 's'] = function (_0x4756c7) { const _0xd4c1ee = _0x2542b2, _0x28f00e = { 'vWXOK': function (_0x2cc4f8, _0x284e01) { return _0x2cc4f8 !== _0x284e01; } }; _0x28f00e[_0xd4c1ee(0x47c)](_0x4756c7, this[_0xd4c1ee(0x2b8)]()) && $gamePlayer && $gameSystem[_0xd4c1ee(0xae4) + _0xd4c1ee(0x246) + 'awnedEvent' + 's'](this[_0xd4c1ee(0x2b8)]()); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x9cd) + _0x2542b2(0x2e6)] = function () { const _0x1d1c54 = _0x2542b2; this[_0x1d1c54(0x555) + _0x1d1c54(0x865)] = $gameSystem[_0x1d1c54(0x4a4) + _0x1d1c54(0x305) + 'ta'](this[_0x1d1c54(0x2b8)]()), this[_0x1d1c54(0x8ec) + _0x1d1c54(0x344)] = !![]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x9fa) + _0x2542b2(0x573)] = Game_Map['prototype'][_0x2542b2(0xb16)], Game_Map[_0x2542b2(0x336)][_0x2542b2(0xb16)] = function () { const _0x47ef93 = _0x2542b2; if (this[_0x47ef93(0xb0f) + 'e']) return this[_0x47ef93(0xb0f) + 'e']; const _0x436a93 = VisuMZ['EventsMove' + 'Core'][_0x47ef93(0x9fa) + _0x47ef93(0x573)][_0x47ef93(0x325)](this), _0x1f79c5 = _0x436a93[_0x47ef93(0x2c9)](this[_0x47ef93(0x555) + 'ents'] || []); return this[_0x47ef93(0xb0f) + 'e'] = _0x1f79c5[_0x47ef93(0x855)](_0x13f961 => !!_0x13f961), this[_0x47ef93(0xb0f) + 'e']; }, VisuMZ['EventsMove' + 'Core'][_0x2542b2(0x9fa) + _0x2542b2(0x3c5)] = Game_Map[_0x2542b2(0x336)][_0x2542b2(0x264)], Game_Map[_0x2542b2(0x336)][_0x2542b2(0x264)] = function (_0xb9f586) { const _0x3762f4 = _0x2542b2, _0x397d3e = { 'nMlbB': function (_0x111d75, _0x52ed3c) { return _0x111d75 >= _0x52ed3c; } }; return _0x397d3e['nMlbB'](_0xb9f586, -0x1 * -0x84f + 0x1a24 + -0x1e8b) ? (_0xb9f586 -= -0x635 * 0x4 + 0x1 * 0xd77 + 0xf45, this[_0x3762f4(0x555) + _0x3762f4(0x865)][_0xb9f586]) : VisuMZ[_0x3762f4(0x6af) + _0x3762f4(0x53e)]['Game_Map_e' + _0x3762f4(0x3c5)][_0x3762f4(0x325)](this, _0xb9f586); }, Game_Map[_0x2542b2(0x336)]['eraseEvent'] = function (_0x32b216) { const _0x51dd9b = _0x2542b2, _0xabeb11 = this[_0x51dd9b(0x264)](_0x32b216); if (_0xabeb11) _0xabeb11[_0x51dd9b(0x351)](); }, Game_Map[_0x2542b2(0x336)]['setupSpawn' + 'Test'] = function () { const _0x2b0c53 = _0x2542b2, _0x4d42fb = { 'xhGst': _0x2b0c53(0x509), 'aBkiT': function (_0x2a8a80, _0x12c32d) { return _0x2a8a80 + _0x12c32d; } }, _0x5bd7a7 = { 'template': _0x4d42fb['xhGst'], 'mapId': 0x1, 'eventId': 0xc, 'x': _0x4d42fb[_0x2b0c53(0x544)]($gamePlayer['x'], 0x20dc + 0x1b1 * 0x2 + -0x243d), 'y': _0x4d42fb[_0x2b0c53(0x544)]($gamePlayer['y'], -0xe7 * 0x11 + -0x10e8 + 0x81 * 0x40), 'spawnPreserved': !![], 'spawnEventId': _0x4d42fb[_0x2b0c53(0x544)](this[_0x2b0c53(0x555) + 'ents'][_0x2b0c53(0x50b)], -0x26 * -0x39 + -0xc40 * -0x1 + 0x9 * -0x1de) }; this[_0x2b0c53(0x5e7) + _0x2b0c53(0x4b6) + _0x2b0c53(0x99e)](_0x5bd7a7); }, Game_Map[_0x2542b2(0x336)]['checkExist' + 'ingEntitie' + _0x2542b2(0x3bd)] = function (_0x58e3a7, _0x13e55d) { const _0x469ad1 = _0x2542b2, _0x59ad49 = { 'hLGAo': '0|1|3|4|2', 'fDSaj': function (_0x319866, _0x27812e) { return _0x319866 > _0x27812e; }, 'arERR': function (_0x487550, _0x221f0b) { return _0x487550 === _0x221f0b; }, 'lxRLc': function (_0x28f7e4, _0x2a706a) { return _0x28f7e4 === _0x2a706a; } }, _0x51c418 = _0x59ad49[_0x469ad1(0x24e)][_0x469ad1(0x968)]('|'); let _0x2499d6 = 0x18ef + 0x6d * 0x1 + -0x874 * 0x3; while (!![]) { switch (_0x51c418[_0x2499d6++]) { case '0': if (_0x59ad49[_0x469ad1(0xa4c)](this[_0x469ad1(0xaed)](_0x58e3a7, _0x13e55d)[_0x469ad1(0x50b)], 0x1 * 0x26ef + -0x1cd8 + -0xa17)) return !![]; continue; case '1': if (_0x59ad49[_0x469ad1(0x7b9)]($gamePlayer['x'], _0x58e3a7) && _0x59ad49['lxRLc']($gamePlayer['y'], _0x13e55d)) return !![]; continue; case '2': return ![]; case '3': if (this[_0x469ad1(0x5ab)]()[_0x469ad1(0x508)](_0x58e3a7, _0x13e55d)) return !![]; continue; case '4': if (this[_0x469ad1(0x4af)]()['posNt'](_0x58e3a7, _0x13e55d)) return !![]; continue; }break; } }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x4ec) + _0x2542b2(0x9e3) + 'onOk'] = function (_0x4f40e4, _0x6cd2df, _0x5bd224) { const _0x416880 = _0x2542b2, _0x27de12 = { 'xWmgF': function (_0x5ea373, _0x598d11) { return _0x5ea373 - _0x598d11; }, 'wdeck': function (_0x5ed50f, _0x31df97) { return _0x5ed50f + _0x31df97; }, 'bvUSo': function (_0x58d8a0, _0x2b144d) { return _0x58d8a0 - _0x2b144d; }, 'emVqA': function (_0x528094, _0x9ba7f3) { return _0x528094 <= _0x9ba7f3; } }; $gameTemp[_0x416880(0x552)] = _0x4f40e4; const _0x2beedf = new Game_Event(_0x4f40e4[_0x416880(0x2b8)], _0x4f40e4[_0x416880(0x478)]); $gameTemp[_0x416880(0x552)] = undefined, _0x2beedf[_0x416880(0x4db)](); let _0x31d897 = _0x27de12[_0x416880(0x4ac)](_0x6cd2df, _0x2beedf[_0x416880(0x671) + 'ox'][_0x416880(0xa43)]), _0x2a154f = _0x27de12[_0x416880(0x6cc)](_0x6cd2df, _0x2beedf[_0x416880(0x671) + 'ox'][_0x416880(0x709)]), _0x2ea998 = _0x27de12['bvUSo'](_0x5bd224, _0x2beedf[_0x416880(0x671) + 'ox']['up']), _0x3c1eaa = _0x27de12['wdeck'](_0x5bd224, _0x2beedf[_0x416880(0x671) + 'ox'][_0x416880(0x270)]); for (let _0x4224fe = _0x31d897; _0x27de12['emVqA'](_0x4224fe, _0x2a154f); _0x4224fe++) { for (let _0x4774ee = _0x2ea998; _0x27de12['emVqA'](_0x4774ee, _0x3c1eaa); _0x4774ee++) { if (this[_0x416880(0x8e9) + _0x416880(0x7fe) + _0x416880(0x3bd)](_0x4224fe, _0x4774ee)) return ![]; } } return !![]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x5e7) + _0x2542b2(0x4b6) + _0x2542b2(0x99e)] = function (_0x21ff47) { const _0x2d0c7e = _0x2542b2; $gameTemp[_0x2d0c7e(0x552)] = _0x21ff47; const _0x44bddc = new Game_Event(_0x21ff47['mapId'], _0x21ff47['eventId']); $gameTemp[_0x2d0c7e(0x552)] = undefined, this[_0x2d0c7e(0x555) + _0x2d0c7e(0x865)][_0x2d0c7e(0x33d)](_0x44bddc), _0x44bddc[_0x2d0c7e(0x9cd)](_0x21ff47), this[_0x2d0c7e(0x624) + _0x2d0c7e(0x6bc)](); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x292) + _0x2542b2(0xb14) + 'tXY'] = function (_0x574adf, _0x36ed16, _0x36c976) { const _0x4fc34f = _0x2542b2, _0x131ca9 = { 'EYfYp': function (_0x481377, _0x3902bf) { return _0x481377 !== _0x3902bf; }, 'YMKUZ': _0x4fc34f(0x48e) }, _0x1e8455 = _0x574adf[_0x4fc34f(0xa6b)]['toUpperCas' + 'e']()[_0x4fc34f(0x7fa)](); if (_0x131ca9[_0x4fc34f(0xac0)](_0x1e8455, _0x131ca9['YMKUZ'])) { const _0xdd4a94 = VisuMZ['EventTempl' + _0x4fc34f(0x7cb)][_0x1e8455]; _0xdd4a94 && (_0x574adf[_0x4fc34f(0x2b8)] = _0xdd4a94[_0x4fc34f(0x36d)], _0x574adf[_0x4fc34f(0x478)] = _0xdd4a94['EventID']); } const _0x5c3ed1 = _0x574adf['x'], _0x1c6c39 = _0x574adf['y']; if (!this[_0x4fc34f(0xa67)](_0x5c3ed1, _0x1c6c39)) return ![]; if (_0x36ed16) { if (this[_0x4fc34f(0x8e9) + 'ingEntitie' + _0x4fc34f(0x3bd)](_0x5c3ed1, _0x1c6c39)) return ![]; if (!this[_0x4fc34f(0x4ec) + 'boxCollisi' + _0x4fc34f(0x56e)](_0x574adf, _0x5c3ed1, _0x1c6c39)) return ![]; } if (_0x36c976) { if (!this[_0x4fc34f(0x365) + _0x4fc34f(0x47b) + _0x4fc34f(0x388)](_0x5c3ed1, _0x1c6c39)) return ![]; } return this[_0x4fc34f(0x5e7) + _0x4fc34f(0x4b6) + _0x4fc34f(0x99e)](_0x574adf), !![]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x292) + 'wnedEventA' + _0x2542b2(0x9d0)] = function (_0x32d286, _0x50983d, _0x116f64, _0x50d724) { const _0x4d6731 = _0x2542b2, _0x39bf03 = { 'DDpnw': function (_0x42f568, _0x2e7193) { return _0x42f568 !== _0x2e7193; }, 'jReza': _0x4d6731(0x48e), 'RmCGE': function (_0x4f04f8, _0x1994b6) { return _0x4f04f8 < _0x1994b6; }, 'lTyoz': function (_0x3264e0, _0x3fc7ad) { return _0x3264e0 < _0x3fc7ad; }, 'bJUnE': function (_0x467832, _0x21d763) { return _0x467832 > _0x21d763; } }, _0x429071 = _0x32d286[_0x4d6731(0xa6b)][_0x4d6731(0x564) + 'e']()[_0x4d6731(0x7fa)](); if (_0x39bf03['DDpnw'](_0x429071, _0x39bf03[_0x4d6731(0x3ba)])) { const _0xf11578 = VisuMZ[_0x4d6731(0x8fa) + _0x4d6731(0x7cb)][_0x429071]; _0xf11578 && (_0x32d286['mapId'] = _0xf11578[_0x4d6731(0x36d)], _0x32d286[_0x4d6731(0x478)] = _0xf11578['EventID']); } const _0x46c37a = [], _0x2d05e2 = this[_0x4d6731(0x4ff)](), _0x42ce08 = this[_0x4d6731(0x842)](); for (let _0x18c57c = 0x2e * -0x5c + -0x5a7 + 0x162f; _0x39bf03[_0x4d6731(0x5f4)](_0x18c57c, _0x2d05e2); _0x18c57c++) { for (let _0x345b8 = -0x2241 + -0x7b9 + -0x18e * -0x1b; _0x39bf03[_0x4d6731(0xa3d)](_0x345b8, _0x42ce08); _0x345b8++) { if (!_0x50983d[_0x4d6731(0x927)](this['regionId'](_0x18c57c, _0x345b8))) continue; if (!this[_0x4d6731(0xa67)](_0x18c57c, _0x345b8)) continue; if (_0x116f64) { if (this[_0x4d6731(0x8e9) + 'ingEntitie' + _0x4d6731(0x3bd)](_0x18c57c, _0x345b8)) continue; if (!this['isSpawnHit' + 'boxCollisi' + _0x4d6731(0x56e)](_0x32d286, _0x18c57c, _0x345b8)) continue; } if (_0x50d724) { if (!this[_0x4d6731(0x365) + _0x4d6731(0x47b) + _0x4d6731(0x388)](_0x18c57c, _0x345b8)) continue; } _0x46c37a[_0x4d6731(0x33d)]([_0x18c57c, _0x345b8]); } } if (_0x39bf03[_0x4d6731(0x414)](_0x46c37a['length'], 0x229a + 0x2 * -0x80 + -0x219a)) { const _0x382647 = _0x46c37a[Math['randomInt'](_0x46c37a['length'])]; return _0x32d286['x'] = _0x382647[-0xd73 + -0x23d8 + 0x314b], _0x32d286['y'] = _0x382647[-0x3e8 + 0x1273 + 0xe8a * -0x1], this[_0x4d6731(0x5e7) + _0x4d6731(0x4b6) + _0x4d6731(0x99e)](_0x32d286), !![]; } return ![]; }, Game_Map['prototype'][_0x2542b2(0x292) + _0x2542b2(0xb14) + _0x2542b2(0x23d) + 'g'] = function (_0x3d3889, _0x4ac6a9, _0x1266ac, _0x2b2488) { const _0x1a0798 = _0x2542b2, _0x3c59f1 = { 'ZZVAJ': function (_0x940301, _0x5453d3) { return _0x940301 !== _0x5453d3; }, 'AJPYL': _0x1a0798(0x48e), 'zYgvW': function (_0x3d0112, _0x38910f) { return _0x3d0112 < _0x38910f; }, 'HgavI': function (_0x5b27bd, _0x5c4517) { return _0x5b27bd < _0x5c4517; }, 'HnLCw': function (_0x14537b, _0x5ebb42) { return _0x14537b > _0x5ebb42; } }, _0xfabda1 = _0x3d3889['template'][_0x1a0798(0x564) + 'e']()[_0x1a0798(0x7fa)](); if (_0x3c59f1[_0x1a0798(0x9db)](_0xfabda1, _0x3c59f1[_0x1a0798(0x27c)])) { const _0x401cd5 = VisuMZ[_0x1a0798(0x8fa) + _0x1a0798(0x7cb)][_0xfabda1]; _0x401cd5 && (_0x3d3889[_0x1a0798(0x2b8)] = _0x401cd5['MapID'], _0x3d3889['eventId'] = _0x401cd5[_0x1a0798(0x4ab)]); } const _0x56591e = [], _0x636367 = this[_0x1a0798(0x4ff)](), _0x1ed297 = this[_0x1a0798(0x842)](); for (let _0x349d29 = -0x53a * 0x4 + 0x1faf * -0x1 + 0x3497; _0x3c59f1[_0x1a0798(0x997)](_0x349d29, _0x636367); _0x349d29++) { for (let _0x153765 = -0xf3 * -0x1 + -0x1dbe + 0x1ccb; _0x3c59f1[_0x1a0798(0x532)](_0x153765, _0x1ed297); _0x153765++) { if (!_0x4ac6a9[_0x1a0798(0x927)](this[_0x1a0798(0xb34)](_0x349d29, _0x153765))) continue; if (!this[_0x1a0798(0xa67)](_0x349d29, _0x153765)) continue; if (_0x1266ac) { if (this['checkExist' + _0x1a0798(0x7fe) + _0x1a0798(0x3bd)](_0x349d29, _0x153765)) continue; if (!this['isSpawnHit' + 'boxCollisi' + _0x1a0798(0x56e)](_0x3d3889, _0x349d29, _0x153765)) continue; } if (_0x2b2488) { if (!this['isPassable' + _0x1a0798(0x47b) + _0x1a0798(0x388)](_0x349d29, _0x153765)) continue; } _0x56591e[_0x1a0798(0x33d)]([_0x349d29, _0x153765]); } } if (_0x3c59f1[_0x1a0798(0x70e)](_0x56591e[_0x1a0798(0x50b)], 0x18f1 + 0x20fc * -0x1 + 0x80b)) { const _0x55cc4f = _0x56591e[Math[_0x1a0798(0x500)](_0x56591e['length'])]; return _0x3d3889['x'] = _0x55cc4f[-0x1b89 + 0x9d * 0x3 + 0x19b2], _0x3d3889['y'] = _0x55cc4f[0xa * 0xe3 + -0x70 + 0x1 * -0x86d], this[_0x1a0798(0x5e7) + _0x1a0798(0x4b6) + _0x1a0798(0x99e)](_0x3d3889), !![]; } return ![]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x365) + _0x2542b2(0x47b) + 'tion'] = function (_0x5f0448, _0x133107) { const _0x3c88d4 = _0x2542b2, _0x56564c = { 'XAiGk': '4|3|2|1|0' }, _0x4339c7 = _0x56564c[_0x3c88d4(0x70b)][_0x3c88d4(0x968)]('|'); let _0x24f494 = 0x112 + 0x33 * -0x9d + 0x1e35; while (!![]) { switch (_0x4339c7[_0x24f494++]) { case '0': return ![]; case '1': if (this['isPassable'](_0x5f0448, _0x133107, 0x2 * 0xb77 + -0x417 * 0x3 + -0xaa1)) return !![]; continue; case '2': if (this[_0x3c88d4(0x365)](_0x5f0448, _0x133107, 0x1af3 + -0x1d02 + 0x215 * 0x1)) return !![]; continue; case '3': if (this[_0x3c88d4(0x365)](_0x5f0448, _0x133107, 0x394 + -0x4a * 0x62 + 0x27a * 0xa)) return !![]; continue; case '4': if (this['isPassable'](_0x5f0448, _0x133107, 0xc7c + 0xb29 + 0x17a3 * -0x1)) return !![]; continue; }break; } }, Game_Map[_0x2542b2(0x336)]['despawnEve' + _0x2542b2(0x334)] = function (_0x112b0a) { const _0x5760c5 = _0x2542b2, _0x4808c1 = { 'VCCtw': function (_0x284657, _0x5b5742) { return _0x284657 < _0x5b5742; }, 'IxpPF': function (_0x3e5695, _0x5e5479) { return _0x3e5695 - _0x5e5479; } }; if (_0x4808c1['VCCtw'](_0x112b0a, -0x17d9 + 0x2 * 0xbcb + 0x42b)) return; if (!this['_spawnedEv' + 'ents']) return; const _0x4814d5 = this[_0x5760c5(0x264)](_0x112b0a); _0x4814d5[_0x5760c5(0x740)](-(-0x1b5 + 0x593 + -0x3dd), -(-0x14cc + 0x4f4 + -0xfd9 * -0x1)), _0x4814d5[_0x5760c5(0x351)](), this[_0x5760c5(0x555) + _0x5760c5(0x865)][_0x4808c1['IxpPF'](_0x112b0a, -0x121c + 0x44 * 0x67 + -0x1c8 * 0x3)] = null, this[_0x5760c5(0x624) + _0x5760c5(0x6bc)](); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x6e3) + _0x2542b2(0x5e3)] = function () { const _0x16a5b5 = _0x2542b2; for (const _0x1070cf of this[_0x16a5b5(0x555) + 'ents']) { if (_0x1070cf) return _0x1070cf; } return null; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x6e3) + _0x2542b2(0x73c)] = function () { const _0x17a7f5 = this['firstSpawn' + 'edEvent'](); return _0x17a7f5 ? _0x17a7f5['_eventId'] : -0xb6a + -0x6db + 0x1245; }, Game_Map['prototype']['lastSpawne' + 'dEvent'] = function () { const _0x213bd3 = _0x2542b2, _0x301756 = this[_0x213bd3(0x555) + _0x213bd3(0x865)][_0x213bd3(0x241)](0x1c0a + 0x20c + -0x1e16)[_0x213bd3(0x408)](); for (const _0x1e2b5c of _0x301756) { if (_0x1e2b5c) return _0x1e2b5c; } return null; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x1fe) + 'dEventID'] = function () { const _0x253112 = _0x2542b2, _0x47633e = this[_0x253112(0x1fe) + _0x253112(0x56f)](); return _0x47633e ? _0x47633e[_0x253112(0x923)] : 0x1405 + -0x7 * 0x3c2 + 0x649; }, Game_Map['prototype'][_0x2542b2(0xaf9) + 'Y'] = function (_0x6c8919, _0xa185ae) { const _0x2f2948 = _0x2542b2, _0x4ca85c = this[_0x2f2948(0xaed)](_0x6c8919, _0xa185ae); for (const _0x3ce0b8 of _0x4ca85c) { if (!_0x3ce0b8) continue; if (_0x3ce0b8[_0x2f2948(0x41b) + _0x2f2948(0x3c5)]()) this[_0x2f2948(0x7d4) + _0x2f2948(0x334)](_0x3ce0b8[_0x2f2948(0x923)]); } }, Game_Map['prototype'][_0x2542b2(0x4d9) + 'ions'] = function (_0x5435e5) { const _0x5cc816 = _0x2542b2; for (const _0xa3b993 of this[_0x5cc816(0x555) + _0x5cc816(0x865)]) { if (!_0xa3b993) continue; _0x5435e5['includes'](_0xa3b993[_0x5cc816(0x29d)]()) && this[_0x5cc816(0x7d4) + _0x5cc816(0x334)](_0xa3b993[_0x5cc816(0x923)]); } }, Game_Map['prototype'][_0x2542b2(0xb35) + _0x2542b2(0x5a4)] = function (_0x4af26c) { const _0x311899 = _0x2542b2; for (const _0x4ec3af of this[_0x311899(0x555) + 'ents']) { if (!_0x4ec3af) continue; _0x4af26c[_0x311899(0x927)](_0x4ec3af[_0x311899(0xb34)]()) && this[_0x311899(0x7d4) + _0x311899(0x334)](_0x4ec3af['_eventId']); } }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x7d4) + _0x2542b2(0x4e0)] = function () { const _0x3038d5 = _0x2542b2; for (const _0xd283a6 of this[_0x3038d5(0x555) + _0x3038d5(0x865)]) { if (!_0xd283a6) continue; this['despawnEve' + 'ntId'](_0xd283a6[_0x3038d5(0x923)]); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Map_u' + _0x2542b2(0x80b)] = Game_Map[_0x2542b2(0x336)]['unlockEven' + 't'], Game_Map[_0x2542b2(0x336)][_0x2542b2(0xaae) + 't'] = function (_0x4703a6) { const _0x2d5a8e = _0x2542b2, _0x30b732 = { 'XbQSm': function (_0x8d0fd0, _0xb94521) { return _0x8d0fd0 >= _0xb94521; } }; VisuMZ[_0x2d5a8e(0x6af) + _0x2d5a8e(0x53e)]['Game_Map_u' + 'nlockEvent'][_0x2d5a8e(0x325)](this, _0x4703a6); if (_0x30b732['XbQSm'](_0x4703a6, 0x87 + -0x501 * 0x3 + -0x4 * -0x499)) { const _0x17596b = this[_0x2d5a8e(0x264)](_0x4703a6); if (_0x17596b) _0x17596b[_0x2d5a8e(0x928)](); } }, Game_Map[_0x2542b2(0x336)]['setupPlaye' + _0x2542b2(0x6ed) + _0x2542b2(0x3ec)] = function () { const _0x61e652 = _0x2542b2; this[_0x61e652(0x6fb) + _0x61e652(0x8b2)] = ![], this[_0x61e652(0x515) + _0x61e652(0x8b2)] = ![]; if (!$dataMap) return; const _0x1172e9 = $dataMap[_0x61e652(0x23e)] || ''; if (_0x1172e9[_0x61e652(0x4d6)](/<HIDE PLAYER>/i)) this['_forceShow' + _0x61e652(0x8b2)] = ![], this['_forceHide' + _0x61e652(0x8b2)] = !![]; else _0x1172e9[_0x61e652(0x4d6)](/<SHOW PLAYER>/i) && (this['_forceShow' + _0x61e652(0x8b2)] = !![], this[_0x61e652(0x515) + _0x61e652(0x8b2)] = ![]); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x236) + _0x2542b2(0x3c4)] = function () { const _0x4dc8c3 = _0x2542b2, _0x2c6164 = { 'qohKM': function (_0x3166f3, _0xd128c1) { return _0x3166f3 === _0xd128c1; } }; return _0x2c6164[_0x4dc8c3(0x87d)](this[_0x4dc8c3(0x6fb) + _0x4dc8c3(0x8b2)], undefined) && this['setupPlaye' + _0x4dc8c3(0x6ed) + _0x4dc8c3(0x3ec)](), this[_0x4dc8c3(0x6fb) + _0x4dc8c3(0x8b2)]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x236) + _0x2542b2(0x259)] = function () { const _0xbfe7a0 = _0x2542b2, _0x1d32ed = { 'LUvDT': function (_0x45064d, _0x3b6055) { return _0x45064d === _0x3b6055; } }; return _0x1d32ed[_0xbfe7a0(0x4b4)](this[_0xbfe7a0(0x515) + _0xbfe7a0(0x8b2)], undefined) && this['setupPlaye' + _0xbfe7a0(0x6ed) + _0xbfe7a0(0x3ec)](), this[_0xbfe7a0(0x515) + _0xbfe7a0(0x8b2)]; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x431) + _0x2542b2(0xad4) + 'nt'] = Game_CharacterBase[_0x2542b2(0x336)]['isTranspar' + 'ent'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x726) + 'ent'] = function () { const _0x22c2ae = _0x2542b2, _0x76382b = { 'VDTQJ': function (_0x1694f5, _0x3df386) { return _0x1694f5 === _0x3df386; } }; if (_0x76382b[_0x22c2ae(0x30b)](this, $gamePlayer)) { if ($gameMap['isPlayerFo' + _0x22c2ae(0x3c4)]()) return ![]; if ($gameMap[_0x22c2ae(0x236) + _0x22c2ae(0x259)]()) return !![]; } return VisuMZ[_0x22c2ae(0x6af) + _0x22c2ae(0x53e)][_0x22c2ae(0x2a0) + _0x22c2ae(0x431) + _0x22c2ae(0xad4) + 'nt'][_0x22c2ae(0x325)](this); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x789) + _0x2542b2(0xafc) + _0x2542b2(0x7b7) + 'es'] = function () { const _0x182e37 = _0x2542b2; this[_0x182e37(0x6fb) + 'Follower'] = ![], this[_0x182e37(0x515) + _0x182e37(0x6d9)] = ![]; if (!$dataMap) return; const _0x5e4029 = $dataMap['note'] || ''; if (_0x5e4029[_0x182e37(0x4d6)](/<HIDE FOLLOWERS>/i)) this['_forceShow' + _0x182e37(0x6d9)] = ![], this[_0x182e37(0x515) + 'Follower'] = !![]; else _0x5e4029[_0x182e37(0x4d6)](/<SHOW FOLLOWERS>/i) && (this[_0x182e37(0x6fb) + _0x182e37(0x6d9)] = !![], this[_0x182e37(0x515) + _0x182e37(0x6d9)] = ![]); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x883) + _0x2542b2(0x4b3) + 'wn'] = function () { const _0x1b9609 = _0x2542b2, _0x29331e = { 'wakPA': function (_0x29cbb7, _0x438d35) { return _0x29cbb7 === _0x438d35; } }; return _0x29331e[_0x1b9609(0xa10)](this[_0x1b9609(0x6fb) + 'Follower'], undefined) && this[_0x1b9609(0x789) + _0x1b9609(0xafc) + 'ityOverrid' + 'es'](), this['_forceShow' + _0x1b9609(0x6d9)]; }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x883) + _0x2542b2(0x611) + _0x2542b2(0x754)] = function () { const _0x2066a2 = _0x2542b2, _0x10f610 = { 'EXxPz': function (_0x5395a0, _0x5529d4) { return _0x5395a0 === _0x5529d4; } }; return _0x10f610[_0x2066a2(0xa65)](this[_0x2066a2(0x515) + _0x2066a2(0x6d9)], undefined) && this[_0x2066a2(0x789) + _0x2066a2(0xafc) + 'ityOverrid' + 'es'](), this[_0x2066a2(0x515) + _0x2066a2(0x6d9)]; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x418) + _0x2542b2(0x5c1) + _0x2542b2(0x9f6)] = Game_Followers['prototype'][_0x2542b2(0x9af)], Game_Followers[_0x2542b2(0x336)][_0x2542b2(0x9af)] = function () { const _0x2cfc1e = _0x2542b2; if ($gameMap[_0x2cfc1e(0x883) + _0x2cfc1e(0x4b3) + 'wn']()) return !![]; if ($gameMap[_0x2cfc1e(0x883) + _0x2cfc1e(0x611) + _0x2cfc1e(0x754)]()) return ![]; return VisuMZ['EventsMove' + 'Core'][_0x2cfc1e(0x418) + _0x2cfc1e(0x5c1) + 'ible'][_0x2cfc1e(0x325)](this); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x94c) + _0x2542b2(0x376) + _0x2542b2(0x21b)] = function () { const _0x260c90 = _0x2542b2, _0x537f65 = this[_0x260c90(0xb16)](), _0x17a7c5 = []; $gameParty[_0x260c90(0xa82) + _0x260c90(0xa73)] = !![]; for (const _0x36db9d of _0x537f65) { if (!_0x36db9d) continue; if (_0x36db9d['_erased']) continue; _0x36db9d[_0x260c90(0x94c) + 'seEncounte' + _0x260c90(0x339)]() && _0x17a7c5[_0x260c90(0x33d)](_0x36db9d); } $gameParty[_0x260c90(0xa82) + _0x260c90(0xa73)] = undefined; for (const _0x329ce6 of _0x17a7c5) { if (!_0x329ce6) continue; if (_0x329ce6[_0x260c90(0x4e2)]) continue; this['eraseEvent'](_0x329ce6['eventId']()); } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x94c) + _0x2542b2(0x376) + _0x2542b2(0x339)] = function () { const _0x1bcd48 = _0x2542b2, _0x2cfc1c = { 'XyjWo': function (_0x5e60c7, _0x5b91ab, _0x54d118) { return _0x5e60c7(_0x5b91ab, _0x54d118); }, 'JtiTW': function (_0x54dc0e, _0x2a6ef1, _0x888c02) { return _0x54dc0e(_0x2a6ef1, _0x888c02); } }, _0x375916 = this[_0x1bcd48(0x264)]()[_0x1bcd48(0x23e)] || ''; if (_0x375916['match'](/<ERASE IF ENC(?:|OUNTER) HALF>/i)) { if ($gameParty['hasEncount' + _0x1bcd48(0x8a2)]()) return !![]; if (_0x2cfc1c['XyjWo']($isTileEncounterHalf, this['x'], this['y'])) return !![]; } if (_0x375916[_0x1bcd48(0x4d6)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)) { if ($gameParty[_0x1bcd48(0x7c3) + _0x1bcd48(0x7ab)]()) return !![]; if (_0x2cfc1c[_0x1bcd48(0xa19)]($isTileEncounterNone, this['x'], this['y'])) return !![]; } return ![]; }, VisuMZ[_0x2542b2(0x6af) + 'Core']['Scene_Map_' + _0x2542b2(0x990) + 'dEncErase'] = Scene_Map['prototype'][_0x2542b2(0x990) + 'd'], Scene_Map['prototype'][_0x2542b2(0x990) + 'd'] = function () { const _0x3d5019 = _0x2542b2; VisuMZ[_0x3d5019(0x6af) + _0x3d5019(0x53e)]['Scene_Map_' + _0x3d5019(0x990) + _0x3d5019(0x7c0)][_0x3d5019(0x325)](this), $gameMap[_0x3d5019(0x94c) + _0x3d5019(0x376) + 'rEvents'](); }, Game_Map[_0x2542b2(0x336)][_0x2542b2(0x58e) + _0x2542b2(0x7ff) + _0x2542b2(0x32d)] = function () { const _0x3b92c7 = _0x2542b2, _0x513469 = { 'klDcr': function (_0x11f358, _0x14501a) { return _0x11f358(_0x14501a); } }; if (!$dataMap) return; if (!$dataMap[_0x3b92c7(0x23e)]) return; const _0x2e7507 = $dataMap[_0x3b92c7(0x23e)]; if (_0x2e7507[_0x3b92c7(0x4d6)](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)) { const _0x5ad1e4 = _0x513469[_0x3b92c7(0x530)](String, RegExp['$1'])[_0x3b92c7(0x968)](',')[_0x3b92c7(0xaf6)](_0x4a27c9 => Number(_0x4a27c9)); for (const _0xa05351 of _0x5ad1e4) { $gameTemp[_0x3b92c7(0x81b) + _0x3b92c7(0xb49)](_0xa05351); } } }, Game_CommonEvent[_0x2542b2(0x336)][_0x2542b2(0x741) + _0x2542b2(0xa07) + 'iable'] = function () { const _0x37b4de = _0x2542b2, _0x385a93 = { 'nutvm': function (_0x5dd4f6, _0x3490a5) { return _0x5dd4f6 >= _0x3490a5; } }, _0x5bfcf6 = this['event'](); return this[_0x37b4de(0x696)]() && _0x385a93[_0x37b4de(0x7ae)](_0x5bfcf6[_0x37b4de(0x337)], -0x1315 + 0x4f + 0xb * 0x1b5) && DataManager[_0x37b4de(0x75f) + _0x37b4de(0x72d)](_0x5bfcf6['switchId']); }, Game_CommonEvent[_0x2542b2(0x336)][_0x2542b2(0x752)] = function () { const _0x54b1a7 = _0x2542b2; return VisuMZ[_0x54b1a7(0x6af) + _0x54b1a7(0x53e)][_0x54b1a7(0xb0e) + _0x54b1a7(0x20b)]['_commonEve' + 'nts']['includes'](this['_commonEve' + _0x54b1a7(0x334)]); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x566) + _0x2542b2(0x8ac) + _0x2542b2(0x21f)] = Game_CommonEvent[_0x2542b2(0x336)]['isActive'], Game_CommonEvent[_0x2542b2(0x336)][_0x2542b2(0x696)] = function () { const _0x44d121 = _0x2542b2; if (VisuMZ[_0x44d121(0x6af) + _0x44d121(0x53e)][_0x44d121(0x566) + _0x44d121(0x8ac) + 'ctive'][_0x44d121(0x325)](this)) return !![]; else { const _0x507a3f = this['event'](); return VisuMZ['EventsMove' + 'Core']['CustomPage' + _0x44d121(0x20b)][_0x44d121(0x4a1)](this['event']()[_0x44d121(0x982)], this['_commonEve' + _0x44d121(0x334)], _0x507a3f); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Map_p' + 'arallelCom' + _0x2542b2(0x63c)] = Game_Map['prototype']['parallelCo' + _0x2542b2(0x718)], Game_Map[_0x2542b2(0x336)][_0x2542b2(0x55f) + _0x2542b2(0x718)] = function () { const _0x46e6f1 = _0x2542b2, _0x572250 = VisuMZ['EventsMove' + _0x46e6f1(0x53e)][_0x46e6f1(0x34d) + _0x46e6f1(0x4be) + _0x46e6f1(0x63c)][_0x46e6f1(0x325)](this), _0x1b0ba3 = VisuMZ[_0x46e6f1(0x6af) + _0x46e6f1(0x53e)][_0x46e6f1(0xb0e) + 'Conditions'][_0x46e6f1(0xb53) + _0x46e6f1(0x4ad)][_0x46e6f1(0xaf6)](_0x10eaaf => $dataCommonEvents[_0x10eaaf]); return _0x572250[_0x46e6f1(0x2c9)](_0x1b0ba3)[_0x46e6f1(0x855)]((_0x949136, _0x16cf99, _0x282c6c) => _0x282c6c[_0x46e6f1(0x75c)](_0x949136) === _0x16cf99); }, Game_CharacterBase[_0x2542b2(0x55e) + 'ER_DASH'] = VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2cc)]['Movement']['DashOnLadd' + 'er'] ?? ![], VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x431) + _0x2542b2(0x4d3)] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x452) + 's'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x452) + 's'] = function () { const _0x5109df = _0x2542b2; VisuMZ[_0x5109df(0x6af) + 'Core'][_0x5109df(0x2a0) + _0x5109df(0x431) + _0x5109df(0x4d3)]['call'](this), this[_0x5109df(0x4e6) + _0x5109df(0x8e0) + 'ttings'](); }, Game_CharacterBase['prototype'][_0x2542b2(0x4e6) + 'MoveCoreSe' + 'ttings'] = function () { const _0x5c29cf = _0x2542b2, _0x410290 = { 'oPbau': '4|0|2|1|3|' + _0x5c29cf(0x8dd) }, _0x4d1a91 = _0x410290[_0x5c29cf(0x48f)][_0x5c29cf(0x968)]('|'); let _0x1da021 = -0x431 * 0x9 + -0x2 * 0x73 + 0x269f; while (!![]) { switch (_0x4d1a91[_0x1da021++]) { case '0': this[_0x5c29cf(0x6f3) + 'Y'] = 0x10ec + -0x1def + 0xd04; continue; case '1': this[_0x5c29cf(0xa14)](); continue; case '2': this[_0x5c29cf(0xab6) + 'cked'] = ![]; continue; case '3': this[_0x5c29cf(0x8b7) + 'ng'](); continue; case '4': this['_scaleBase' + 'X'] = 0x257a + -0x1 * -0x1b8d + 0x7 * -0x94a; continue; case '5': this[_0x5c29cf(0x931) + 'eOffsets'](); continue; case '6': this[_0x5c29cf(0x7b4) + _0x5c29cf(0x9a4)](); continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x57d) + 'pacity'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x79f)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x79f)] = function () { const _0x594b13 = _0x2542b2; let _0x4fc030 = VisuMZ[_0x594b13(0x6af) + _0x594b13(0x53e)][_0x594b13(0x2a0) + _0x594b13(0x57d) + _0x594b13(0x6f1)]['call'](this); return _0x4fc030 = this[_0x594b13(0x9f0) + _0x594b13(0xa4a) + _0x594b13(0x420)](_0x4fc030), _0x4fc030; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x9f0) + 'SynchOpaci' + _0x2542b2(0x420)] = function (_0x365291) { return _0x365291; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x335) + _0x2542b2(0x826)] = function () { const _0x430fc4 = _0x2542b2, _0x22e970 = { 'oWHrA': function (_0x12a5b4, _0x3806c1) { return _0x12a5b4 === _0x3806c1; } }; if (_0x22e970[_0x430fc4(0x88f)](this[_0x430fc4(0x6dc) + 'r'], Game_Player) && this[_0x430fc4(0x30f) + 'e']()) return this[_0x430fc4(0xb41)]()[_0x430fc4(0x862) + _0x430fc4(0x54d)]()[_0x430fc4(0x4d6)](/\[VS8\]/i); else return Imported['VisuMZ_2_D' + _0x430fc4(0x694) + _0x430fc4(0x71c)] && this[_0x430fc4(0xb20) + 'ones']() ? !![] : this[_0x430fc4(0x862) + _0x430fc4(0x54d)]()['match'](/\[VS8\]/i); }, VisuMZ['EventsMove' + 'Core']['Game_Chara' + _0x2542b2(0x2d1) + _0x2542b2(0x563)] = Game_CharacterBase[_0x2542b2(0x336)]['direction'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x7bc)] = function () { const _0xb753 = _0x2542b2; if (!$dataMap) return this[_0xb753(0x712)] || 0x35 * -0x71 + 0x7d * 0x30 + -0x9 * 0x1; if (this[_0xb753(0x8af)]() && !this[_0xb753(0x7a5)]() && this['isSpriteVS' + _0xb753(0x826)]()) return this[_0xb753(0x832) + _0xb753(0x86d) + _0xb753(0x6c1)](); else { if (this[_0xb753(0x8af)]() && !this[_0xb753(0x7a5)]()) return -0xf * 0x119 + -0x1770 + 0x1 * 0x27ef; else return this[_0xb753(0x9a7)]() && this[_0xb753(0x335) + _0xb753(0x826)]() ? this['getPosingC' + _0xb753(0xaf0) + _0xb753(0x918)]() : VisuMZ['EventsMove' + _0xb753(0x53e)][_0xb753(0x2a0) + _0xb753(0x2d1) + 'irection'][_0xb753(0x325)](this); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x81a) + _0x2542b2(0x486) + 'n'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x4c3) + 'on'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x4c3) + 'on'] = function (_0xe37d49) { const _0x678ab0 = _0x2542b2; if (!this[_0x678ab0(0x335) + '8dir']()) _0xe37d49 = this[_0x678ab0(0x4da) + _0x678ab0(0x551) + 'on'](_0xe37d49); VisuMZ[_0x678ab0(0x6af) + 'Core'][_0x678ab0(0x2a0) + _0x678ab0(0x81a) + _0x678ab0(0x486) + 'n']['call'](this, _0xe37d49), this['updateMove' + _0x678ab0(0x4d4) + _0x678ab0(0x388)](); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x4da) + _0x2542b2(0x551) + 'on'] = function (_0x73a090) { const _0x185dc0 = _0x2542b2, _0x2443d2 = { 'ypIam': '2|0|1|4|3', 'qVGTm': function (_0x721ab3, _0x45c8c7) { return _0x721ab3 === _0x45c8c7; }, 'hJBvH': function (_0x13cdee, _0x1d62d2) { return _0x13cdee === _0x1d62d2; }, 'yugQB': function (_0x1cc565, _0x1d2662) { return _0x1cc565 === _0x1d2662; } }, _0x3a8f22 = _0x2443d2['ypIam']['split']('|'); let _0x2cf791 = -0x29 * -0x92 + 0xf31 + -0x2693; while (!![]) { switch (_0x3a8f22[_0x2cf791++]) { case '0': if (_0x2443d2['qVGTm'](_0x73a090, 0x1146 + 0x25bd + -0x5 * 0xb00)) return this['canPass'](this['_x'], this['_y'], -0x2 * -0x8ef + 0x1cea + -0x2ec2) ? -0x1d08 + 0x13c * -0x6 + 0x2476 : 0x67b + 0xeb2 + -0x152b; continue; case '1': if (_0x2443d2['hJBvH'](_0x73a090, 0x24d1 + 0x200 + -0x26ca)) return this[_0x185dc0(0x648)](this['_x'], this['_y'], -0xec5 + 0x25df + -0x2 * 0xb8b) ? -0x27a * -0x3 + 0x26cf + 0x1 * -0x2e39 : -0x897 + -0x1 * 0x5e2 + 0xe81; continue; case '2': if (_0x2443d2[_0x185dc0(0x688)](_0x73a090, -0x1192 + 0xe * -0xd3 + 0x1d1d)) return this['canPass'](this['_x'], this['_y'], -0x1e00 + 0x122f + 0xbd5) ? 0xdaf + -0x6 * -0x1b1 + 0xd * -0x1d5 : -0x1d12 + 0x1294 + 0xa80; continue; case '3': return _0x73a090; case '4': if (_0x2443d2[_0x185dc0(0x603)](_0x73a090, -0x21f5 + 0xe8 * 0x1c + 0x89e * 0x1)) return this['canPass'](this['_x'], this['_y'], 0x448 * -0x8 + 0x14da + 0xd6c) ? -0x52f * -0x5 + 0x5ee + -0x1fd3 : -0x2c * 0xce + -0x1094 + 0x3404; continue; }break; } }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x888) + _0x2542b2(0x61d)] = function (_0x4c0c4a) { return [0x1853 * 0x1 + 0x1f2a + -0x377c, -0x248 + -0x1756 + 0x1b * 0xf3, -0x5e * -0x5b + -0x9c2 + -0x17a3, -0x705 + 0xa * 0xd + 0x68a, 0x50 * -0x4c + 0x10 * 0x175 + 0x79]['includes'](_0x4c0c4a); }, Game_CharacterBase['prototype']['lastMovedD' + _0x2542b2(0x563)] = function () { const _0x409512 = _0x2542b2; return this['_lastMoved' + _0x409512(0x61d)] || -0x71 * -0x16 + -0x1e36 + 0x1480; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Chara' + _0x2542b2(0x8fc) + _0x2542b2(0xb24) + 't'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x7f9) + 'ht'], Game_CharacterBase['prototype']['moveStraig' + 'ht'] = function (_0x25614a) { const _0x1a9acf = _0x2542b2; this[_0x1a9acf(0x31c) + 'Direction'] = _0x25614a, VisuMZ[_0x1a9acf(0x6af) + _0x1a9acf(0x53e)][_0x1a9acf(0x2a0) + _0x1a9acf(0x8fc) + _0x1a9acf(0xb24) + 't']['call'](this, _0x25614a); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x27b) + _0x2542b2(0x2f6)] = function (_0xc00bbf) { const _0x523305 = _0x2542b2; if (!this[_0x523305(0x888) + _0x523305(0x61d)](_0xc00bbf)) return this[_0x523305(0x7f9) + 'ht'](_0xc00bbf); let _0x54645e = 0x74f * -0x2 + -0xc94 + 0x1b32 * 0x1, _0x4af71c = -0x1cf8 + -0xc1a + 0x2912; switch (_0xc00bbf) { case -0x554 + 0x2 * 0xc40 + 0x132b * -0x1: _0x54645e = 0xec * -0x1a + -0x788 + -0x7e1 * -0x4, _0x4af71c = -0x20cd + 0x8bf * 0x4 + -0x22d; break; case -0x10 * -0x7f + 0x16f * -0x1 + -0x1 * 0x67e: _0x54645e = 0x9c5 * -0x3 + -0x1cb2 + 0x3a07, _0x4af71c = 0x2 * -0x7be + 0xa65 * -0x2 + 0x102 * 0x24; break; case 0xe19 + -0x68a + -0x788: _0x54645e = 0x10 * 0x216 + -0x5c6 * -0x2 + -0x2 * 0x1674, _0x4af71c = 0xcaf + -0x758 + -0x54f; break; case -0xe78 + 0x2 * 0xe27 + -0xdcd * 0x1: _0x54645e = -0x34 * 0x7 + -0x2049 + 0x6bf * 0x5, _0x4af71c = 0x11fa + -0x3 * -0x6c4 + 0xa * -0x3d3; break; }if (VisuMZ[_0x523305(0x6af) + _0x523305(0x53e)][_0x523305(0x2cc)][_0x523305(0x44e)][_0x523305(0x87f) + _0x523305(0x269)]) { if (!this['canPass'](this['_x'], this['_y'], _0x54645e)) return this[_0x523305(0x7f9) + 'ht'](_0x4af71c); if (!this['canPass'](this['_x'], this['_y'], _0x4af71c)) return this[_0x523305(0x7f9) + 'ht'](_0x54645e); if (!this['canPassDia' + 'gonally'](this['_x'], this['_y'], _0x54645e, _0x4af71c)) { let _0x240180 = VisuMZ[_0x523305(0x6af) + 'Core']['Settings']['Movement'][_0x523305(0x7a4)] ? _0x54645e : _0x4af71c; return this['moveStraig' + 'ht'](_0x240180); } } this['_lastMoved' + _0x523305(0x61d)] = _0xc00bbf, this[_0x523305(0x884) + _0x523305(0x87a)](_0x54645e, _0x4af71c); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Chara' + _0x2542b2(0x39d) + _0x2542b2(0x477) + 'ed'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8b9) + _0x2542b2(0x284)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8b9) + 'eed'] = function () { const _0x1a78fc = _0x2542b2; let _0x2c1fc0 = this[_0x1a78fc(0x733)]; return this[_0x1a78fc(0x2cf)]() && (_0x2c1fc0 += this[_0x1a78fc(0x52a) + _0x1a78fc(0xab2)]()), this[_0x1a78fc(0xa75) + _0x1a78fc(0x7bb) + _0x1a78fc(0x284)](_0x2c1fc0); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x52a) + _0x2542b2(0xab2)] = function () { const _0x3d9503 = _0x2542b2, _0x36b825 = { 'XEXfT': function (_0x116e9c, _0x203cf5) { return _0x116e9c !== _0x203cf5; }, 'ahJWZ': function (_0x1dd05a, _0x44cf11) { return _0x1dd05a - _0x44cf11; } }, _0x408847 = VisuMZ[_0x3d9503(0x6af) + _0x3d9503(0x53e)][_0x3d9503(0x2cc)][_0x3d9503(0x44e)]; return _0x36b825[_0x3d9503(0x8f6)](_0x408847[_0x3d9503(0x9e9) + 'er'], undefined) ? _0x408847[_0x3d9503(0x9e9) + 'er'] : _0x36b825[_0x3d9503(0xb2d)](VisuMZ[_0x3d9503(0x6af) + 'Core'][_0x3d9503(0x2a0) + _0x3d9503(0x39d) + 'ealMoveSpe' + 'ed']['call'](this), this[_0x3d9503(0x733)]); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa75) + _0x2542b2(0x7bb) + _0x2542b2(0x284)] = function (_0x3225e9) { const _0x1219cd = _0x2542b2, _0x4cf683 = VisuMZ['EventsMove' + _0x1219cd(0x53e)][_0x1219cd(0x2cc)][_0x1219cd(0x44e)]; if (!_0x4cf683[_0x1219cd(0x56c) + 'd']) return _0x3225e9; return [-0x11be + -0x2e * -0x20 + 0xbff, 0x1738 + -0x141 * -0x16 + 0x1 * -0x32cb, -0x2373 * -0x1 + -0x1724 + -0xc48, -0x6b3 * -0x3 + -0x1 * -0x1d49 + -0x1 * 0x3159][_0x1219cd(0x927)](this[_0x1219cd(0x31c) + _0x1219cd(0x61d)]) && (_0x3225e9 *= _0x4cf683['DiagonalSp' + _0x1219cd(0x622) + _0x1219cd(0x97e)] || 0x18bc + 0x12bc + -0x358 * 0xd + 0.01), _0x3225e9; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x431) + _0x2542b2(0x5b0)] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x2cf)], Game_CharacterBase[_0x2542b2(0x336)]['isDashing'] = function () { const _0xa2d704 = _0x2542b2; if (!Game_CharacterBase['ALLOW_LADD' + _0xa2d704(0x92b)] && this[_0xa2d704(0x8af)]()) return ![]; if (this['_forceDash' + _0xa2d704(0xa88)]) return !![]; return VisuMZ[_0xa2d704(0x6af) + _0xa2d704(0x53e)]['Game_Chara' + _0xa2d704(0x431) + _0xa2d704(0x5b0)][_0xa2d704(0x325)](this); }, Game_CharacterBase['prototype']['isDashingA' + 'ndMoving'] = function () { const _0x47f221 = _0x2542b2, _0x14443b = { 'LovBt': function (_0x325631, _0x59c52a) { return _0x325631 === _0x59c52a; } }; return this['isDashing']() && _0x14443b['LovBt'](this[_0x47f221(0x8f5)], -0x254 * 0x1 + 0x1839 + 0x461 * -0x5); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x1ef) + _0x2542b2(0x9a4)] = Game_CharacterBase['prototype'][_0x2542b2(0xafe)], Game_CharacterBase['prototype'][_0x2542b2(0xafe)] = function () { const _0x4b5a25 = _0x2542b2; return this[_0x4b5a25(0x9a7)]() ? this[_0x4b5a25(0x8ca) + _0x4b5a25(0x6ee) + _0x4b5a25(0xa66)]() : VisuMZ[_0x4b5a25(0x6af) + _0x4b5a25(0x53e)][_0x4b5a25(0x2a0) + _0x4b5a25(0x1ef) + _0x4b5a25(0x9a4)]['call'](this); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x431) + _0x2542b2(0x769) + 'ps'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x751) + _0x2542b2(0x9c7)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x751) + _0x2542b2(0x9c7)] = function () { const _0x3fd26d = _0x2542b2; VisuMZ[_0x3fd26d(0x6af) + _0x3fd26d(0x53e)][_0x3fd26d(0x2a0) + _0x3fd26d(0x431) + _0x3fd26d(0x769) + 'ps']['call'](this), this['clearPose'](); }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x2a0) + _0x2542b2(0x25d) + _0x2542b2(0x638) + 'dex'] = Game_CharacterBase['prototype'][_0x2542b2(0x361) + 'ndex'], Game_CharacterBase['prototype'][_0x2542b2(0x361) + _0x2542b2(0x28a)] = function () { const _0x3194c1 = _0x2542b2; if (this[_0x3194c1(0x335) + _0x3194c1(0x826)]()) return this[_0x3194c1(0x361) + 'ndexVS8'](); return VisuMZ[_0x3194c1(0x6af) + _0x3194c1(0x53e)]['Game_Chara' + 'cterBase_c' + _0x3194c1(0x638) + 'dex']['call'](this); }, Game_CharacterBase['prototype'][_0x2542b2(0x361) + _0x2542b2(0xa39)] = function () { const _0x4beca6 = _0x2542b2, _0xdc49a6 = this[_0x4beca6(0x7bc)](); if (this['isJumping']()) { if ([0x2 * 0xcc7 + -0x25b3 + -0x3d * -0x33, -0x233f + 0xa5a + 0x18e9, 0x1136 + -0x479 + -0x7 * 0x1d1, 0x571 + -0x16b9 + 0x1150][_0x4beca6(0x927)](_0xdc49a6)) return 0x1cfb + 0x2647 + -0x433e; if ([0x1d75 * 0x1 + -0x1 * 0x89 + -0x1 * 0x1ceb, -0x625 + 0x1d4d * 0x1 + -0x1725, 0xd21 * -0x2 + -0x208 + -0x293 * -0xb, 0x93 + -0x4 * 0x3f8 + 0xf56][_0x4beca6(0x927)](_0xdc49a6)) return 0x17e6 + 0x25 * -0x7b + -0x61a; } else { if (this[_0x4beca6(0x8af)]()) return 0x21d2 + 0x21d6 + 0x43a2 * -0x1; else { if (this[_0x4beca6(0x9a7)]()) return this[_0x4beca6(0x8ca) + _0x4beca6(0x638) + _0x4beca6(0x9ce)](); else { if (this['_forceCarr' + _0x4beca6(0x72f)]) { if ([-0xa39 + 0x36 * -0x2 + 0x1b * 0x65, -0x1 * -0x170 + 0x1b * 0x151 + -0x24f7, 0x11ae + -0xef * 0xa + 0x6 * -0x163, -0x2 * -0x1223 + -0x1 * -0x1613 + -0x3a51]['includes'](_0xdc49a6)) return 0x7 * -0x6d + -0x549 * -0x2 + -0x793 * 0x1; if ([-0x1 * 0x1eab + -0x3 * -0x989 + -0x17 * -0x17, 0x6 * -0x4d9 + -0x1 * -0x1834 + 0x4e5, 0x2a4 + 0x1c29 + -0x1ec6, -0x20fa + 0x281 * 0xb + 0x578][_0x4beca6(0x927)](_0xdc49a6)) return -0x1 * 0x9c3 + -0x2073 + 0x2a3b; } else { if (this['hasEventIc' + 'on']() && this[_0x4beca6(0x545) + _0x4beca6(0x52b)]()) { if ([0x1 * -0xb33 + -0x4 * 0x79 + 0xd19, -0x1 * -0x1ed7 + -0x5b * -0x5a + -0x3ed1, 0x2 * -0x1163 + -0x2157 + -0x4423 * -0x1, 0x2531 + 0x1 * -0x277 + -0x22b2][_0x4beca6(0x927)](_0xdc49a6)) return -0x1de9 + -0x2360 + 0x414d; if ([-0x14ed + -0x58 * 0x5 + 0x16a6, 0xa95 + -0xa08 + -0x8a, 0x1928 + -0xec2 + 0x3 * -0x375, -0x19c5 + -0x1243 * -0x1 + -0x1 * -0x78b]['includes'](_0xdc49a6)) return 0x1 * 0x9c1 + -0x1937 + 0xf7b; } else { if (this[_0x4beca6(0x633) + _0x4beca6(0x9c5)]()) { if ([0x687 + -0x236c + 0x31 * 0x97, 0x2310 + -0xa86 + -0x1886, -0x25a5 + 0x195a + 0xc51, -0x25da + 0x1c41 + -0x5 * -0x1ed][_0x4beca6(0x927)](_0xdc49a6)) return -0x1 * -0x1e01 + -0x1 * -0x268f + -0x96 * 0x75; if ([0x270b + 0x253b + -0x6ef * 0xb, -0x1 * -0x1379 + -0x1096 * -0x1 + -0x602 * 0x6, -0x13 * 0x9 + -0x1517 + 0x21 * 0xa9, -0x150 + -0x1ed5 * 0x1 + 0x202e][_0x4beca6(0x927)](_0xdc49a6)) return 0x16a3 + 0x17b * 0x16 + -0x3732; } else { if ([-0x110c * -0x1 + 0x16db + 0x1 * -0x27e5, 0xe * -0x7d + -0x2 * 0x641 + 0x135c, -0x1e2b * -0x1 + 0x3 * -0x447 + -0x1150, 0x1e69 * 0x1 + -0x3 * 0x3fa + -0x1273]['includes'](_0xdc49a6)) return -0x2e * 0x88 + -0x3 * -0x90a + -0x7 * 0x62; if ([0x19ad + -0x218b * 0x1 + -0x1f * -0x41, 0x7fe * -0x1 + -0x6c4 * -0x4 + -0x130f, 0x1 * 0x1593 + -0x22d1 + 0x2b * 0x4f, -0xdfd + -0x662 + 0x4 * 0x51a]['includes'](_0xdc49a6)) return 0x8cd * 0x1 + 0x154d + 0x43 * -0x73; } } } } } } }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x545) + _0x2542b2(0x52b)] = function () { const _0x5d978b = _0x2542b2; return VisuMZ['EventsMove' + _0x5d978b(0x53e)][_0x5d978b(0x2cc)][_0x5d978b(0xa70)]['CarryPose']; }, Game_CharacterBase[_0x2542b2(0x336)]['isOnRope'] = function () { const _0x420c16 = _0x2542b2, _0x5bd327 = { 'ddkyu': function (_0x491e47, _0x28e03c) { return _0x491e47 === _0x28e03c; } }; return this['isOnLadder']() && _0x5bd327[_0x420c16(0x915)](this[_0x420c16(0xb34)](), VisuMZ['EventsMove' + _0x420c16(0x53e)]['Settings'][_0x420c16(0x329)][_0x420c16(0x833)]); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x832) + _0x2542b2(0x86d) + _0x2542b2(0x6c1)] = function () { const _0x1e62f5 = _0x2542b2; return this[_0x1e62f5(0x698)]() ? 0xd8 + 0x1 * 0x61a + -0x2 * 0x377 : -0xbcd + 0x440 + 0x78f; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x3a6) + _0x2542b2(0x84e)] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x316)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x316)] = function () { const _0x3182d9 = _0x2542b2; this['updateScal' + _0x3182d9(0x487)](), VisuMZ[_0x3182d9(0x6af) + 'Core'][_0x3182d9(0x2a0) + 'cterBase_u' + 'pdate'][_0x3182d9(0x325)](this), this[_0x3182d9(0x7e6)](); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x6a0) + _0x2542b2(0x487)] = function () { const _0x1f936a = _0x2542b2; this['_scaleX'] = this[_0x1f936a(0x6f3) + 'X'] ?? -0x46 * -0x41 + -0x1b14 + 0x94f * 0x1, this[_0x1f936a(0x465)] = this[_0x1f936a(0x6f3) + 'Y'] ?? 0x17fc + 0x1 * 0x1636 + -0x2e31; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x2c6) + 'ushDepth'] = Game_CharacterBase[_0x2542b2(0x336)]['bushDepth'], Game_CharacterBase[_0x2542b2(0x336)]['bushDepth'] = function () { const _0x33153c = _0x2542b2, _0x4081d1 = { 'uCSUA': function (_0x2760d4, _0x24c53a) { return _0x2760d4 !== _0x24c53a; } }; let _0x2f63f8 = VisuMZ[_0x33153c(0x6af) + _0x33153c(0x53e)]['Game_Chara' + 'cterBase_b' + _0x33153c(0x8db)]['call'](this); return _0x4081d1[_0x33153c(0x6e7)](this[_0x33153c(0x465)], undefined) && (_0x2f63f8 /= Math[_0x33153c(0x89c)](this[_0x33153c(0x465)], 0x1a7a + -0x1b51 + 0xd7 + 0.00001)), Math[_0x33153c(0xa9d)](_0x2f63f8); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x7e6)] = function () { const _0x2bc2bb = _0x2542b2, _0x32a3f8 = { 'WPlny': function (_0x39ca19, _0x2a5569) { return _0x39ca19 > _0x2a5569; }, 'ZLdwm': function (_0x443d47, _0x395225) { return _0x443d47 <= _0x395225; }, 'nCgES': function (_0x42325e, _0x5bfe82) { return _0x42325e !== _0x5bfe82; }, 'ZWpDo': _0x2bc2bb(0xae2) }; this[_0x2bc2bb(0x73f) + 'ion'] = this['_poseDurat' + _0x2bc2bb(0x891)] || -0x129c * 0x2 + 0xe43 + -0x7a7 * -0x3; if (_0x32a3f8['WPlny'](this[_0x2bc2bb(0x73f) + 'ion'], -0x29b + -0x1b9a + 0xd1 * 0x25)) { this['_poseDurat' + _0x2bc2bb(0x891)]--; if (_0x32a3f8['ZLdwm'](this[_0x2bc2bb(0x73f) + _0x2bc2bb(0x891)], 0x18d * 0xf + -0x1 * -0xce6 + -0x2429) && _0x32a3f8[_0x2bc2bb(0x400)](this['_pose'], _0x32a3f8[_0x2bc2bb(0x85f)])) this[_0x2bc2bb(0xa14)](); } }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x8fc) + _0x2542b2(0x4fe) + 'lly'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x884) + _0x2542b2(0x87a)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x884) + _0x2542b2(0x87a)] = function (_0x55bc54, _0x44cc12) { const _0x1c1984 = _0x2542b2; VisuMZ[_0x1c1984(0x6af) + _0x1c1984(0x53e)][_0x1c1984(0x2a0) + _0x1c1984(0x8fc) + 'oveDiagona' + _0x1c1984(0x1e1)][_0x1c1984(0x325)](this, _0x55bc54, _0x44cc12); if (this[_0x1c1984(0x335) + '8dir']()) this[_0x1c1984(0xa3c) + _0x1c1984(0x5d9)](_0x55bc54, _0x44cc12); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa3c) + 'lDirection'] = function (_0x13cc98, _0x554370) { const _0xac93e1 = _0x2542b2, _0x50a1fd = { 'dGvXR': function (_0x40ce8c, _0x17d476) { return _0x40ce8c === _0x17d476; }, 'oyOag': function (_0x5b79b1, _0x7c2ef1) { return _0x5b79b1 === _0x7c2ef1; }, 'XOYpL': function (_0x3bb9aa, _0x570405) { return _0x3bb9aa === _0x570405; }, 'oaDLe': function (_0x2bb44e, _0x56e76a) { return _0x2bb44e === _0x56e76a; }, 'ptEVH': function (_0x5584f3, _0x5802e1) { return _0x5584f3 === _0x5802e1; } }; if (_0x50a1fd[_0xac93e1(0x911)](_0x13cc98, -0x20cf + -0x1 * 0x1709 + -0x1bee * -0x2) && _0x50a1fd[_0xac93e1(0x59d)](_0x554370, -0x21a * -0x5 + -0x2563 * 0x1 + 0x1ae3)) this[_0xac93e1(0x4c3) + 'on'](-0x2 * 0x7f7 + 0x200f + 0x60 * -0x2b); if (_0x50a1fd[_0xac93e1(0x59d)](_0x13cc98, 0x3 * 0x3f + 0x1 * -0xd5a + 0xca3) && _0x50a1fd['XOYpL'](_0x554370, -0xc1a * 0x3 + -0x7 * -0x4e + 0x222e)) this[_0xac93e1(0x4c3) + 'on'](-0x1 * 0x60d + -0x99b + 0xfab); if (_0x50a1fd[_0xac93e1(0x911)](_0x13cc98, -0x13 * 0x5e + 0x22d6 + 0x48 * -0x63) && _0x50a1fd[_0xac93e1(0x953)](_0x554370, 0x2095 * 0x1 + 0x1 * 0xcbd + -0x2d4a)) this[_0xac93e1(0x4c3) + 'on'](-0x1 * -0x1b0e + -0x10cd + -0xa3a); if (_0x50a1fd[_0xac93e1(0x854)](_0x13cc98, 0x1872 + -0x2007 * 0x1 + -0x3b * -0x21) && _0x50a1fd[_0xac93e1(0x8fe)](_0x554370, -0x19b2 + 0x7d5 * 0x1 + 0x1fd * 0x9)) this[_0xac93e1(0x4c3) + 'on'](-0x20e3 + 0x2656 + -0x56a); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x7f6) + _0x2542b2(0x20a) + 'e'] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8d1) + 'me'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8d1) + 'me'] = function () { const _0x5b0674 = _0x2542b2, _0x317281 = { 'TtMcD': function (_0x54dbf7, _0x1098f0) { return _0x54dbf7 === _0x1098f0; }, 'DyVNv': 'ZZZ' }; if (this[_0x5b0674(0x9a7)]() && _0x317281[_0x5b0674(0x86b)](this[_0x5b0674(0xa0e)](), _0x317281[_0x5b0674(0x386)])) return !![]; return VisuMZ[_0x5b0674(0x6af) + _0x5b0674(0x53e)][_0x5b0674(0x2a0) + _0x5b0674(0x7f6) + _0x5b0674(0x20a) + 'e']['call'](this); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa86)] = function (_0x3ff24d, _0x135838) { const _0x114868 = _0x2542b2, _0x371ca3 = { 'avEof': _0x114868(0xae2), 'KKZht': function (_0x3ebf74, _0x5854cf) { return _0x3ebf74 || _0x5854cf; } }; if (_0x3ff24d[_0x114868(0x4d6)](/Z/i)) _0x3ff24d = _0x371ca3[_0x114868(0x946)]; if (_0x3ff24d[_0x114868(0x4d6)](/SLEEP/i)) _0x3ff24d = _0x371ca3[_0x114868(0x946)]; this[_0x114868(0x335) + _0x114868(0x826)]() && (this['_pose'] = _0x3ff24d['toUpperCas' + 'e']()['trim'](), this[_0x114868(0x73f) + _0x114868(0x891)] = _0x371ca3[_0x114868(0xa7f)](_0x135838, Infinity)); }, Game_CharacterBase['prototype'][_0x2542b2(0xa0e)] = function () { const _0xa9a57a = _0x2542b2; return this[_0xa9a57a(0x335) + _0xa9a57a(0x826)]() ? (this[_0xa9a57a(0x58f)] || '')[_0xa9a57a(0x564) + 'e']()['trim']() : ''['toUpperCas' + 'e']()[_0xa9a57a(0x7fa)](); }, Game_CharacterBase['prototype'][_0x2542b2(0x8d8) + _0x2542b2(0x97c)] = function (_0x51290d, _0x37d778) { const _0x1bd539 = _0x2542b2, _0x24ac30 = { 'DmOqL': _0x1bd539(0xa8c) + 'N', 'bMIOn': _0x1bd539(0x4f8), 'oijRH': _0x1bd539(0x28f), 'YYPAi': 'HEART', 'KIrUf': _0x1bd539(0x750), 'SZtgG': _0x1bd539(0x517), 'lnMmc': 'COBWEB', 'QMgXl': _0x1bd539(0x587), 'zMaiO': _0x1bd539(0x8c5), 'jzZPu': 'ZZZ' }; if (this[_0x1bd539(0x335) + '8dir']()) { const _0x3dc735 = ['', _0x24ac30['DmOqL'], _0x24ac30['bMIOn'], _0x24ac30[_0x1bd539(0x3da)], _0x24ac30[_0x1bd539(0x7a3)], _0x24ac30[_0x1bd539(0x2bf)], _0x24ac30[_0x1bd539(0xb5c)], _0x24ac30[_0x1bd539(0x327)], _0x24ac30['QMgXl'], _0x24ac30[_0x1bd539(0x3c8)], _0x24ac30[_0x1bd539(0x3fc)], '', '', '', '', ''][_0x51290d]; this[_0x1bd539(0xa86)](_0x3dc735, _0x37d778); } }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa14)] = function () { const _0x4250fb = _0x2542b2; this[_0x4250fb(0x58f)] = '', this[_0x4250fb(0x73f) + _0x4250fb(0x891)] = -0x9b + 0x149 * -0xf + -0x2 * -0x9f1; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x9a7)] = function () { const _0x4f8493 = _0x2542b2; return this[_0x4f8493(0x335) + _0x4f8493(0x826)]() && !!this[_0x4f8493(0x58f)]; }, Game_CharacterBase[_0x2542b2(0x336)]['getPosingC' + _0x2542b2(0x638) + _0x2542b2(0x9ce)] = function () { const _0x2cafeb = _0x2542b2, _0x504b7a = { 'fRnqj': _0x2cafeb(0x77f), 'yLgky': _0x2cafeb(0x794), 'rqhdw': 'VICTORY', 'VKCfC': _0x2cafeb(0xb58), 'rNNeS': 'KNEEL', 'FCPdT': 'COLLAPSE' }, _0xa2cc48 = this[_0x2cafeb(0x58f)][_0x2cafeb(0x564) + 'e'](); switch (this[_0x2cafeb(0x58f)][_0x2cafeb(0x564) + 'e']()['trim']()) { case _0x504b7a[_0x2cafeb(0xab9)]: case _0x504b7a[_0x2cafeb(0x2f0)]: case _0x504b7a[_0x2cafeb(0x863)]: case _0x504b7a['VKCfC']: case _0x504b7a[_0x2cafeb(0x906)]: case _0x504b7a[_0x2cafeb(0x678)]: return 0x1 * -0x1f21 + 0x37e * -0x1 + -0x7 * -0x4f3; break; default: return -0x12cc * -0x1 + -0x2382 + 0x10bd; break; } }, Game_CharacterBase['prototype'][_0x2542b2(0x8ca) + _0x2542b2(0xaf0) + _0x2542b2(0x918)] = function () { const _0x22f60f = _0x2542b2, _0xdcc53b = { 'aJGxQ': _0x22f60f(0xa8c) + 'N', 'TJprM': _0x22f60f(0x4f8), 'iDGrZ': _0x22f60f(0x28f), 'cSaRr': _0x22f60f(0xab1), 'LFPlD': _0x22f60f(0x750), 'EXIJb': _0x22f60f(0x517), 'vdeer': 'ITEM', 'nGYrZ': _0x22f60f(0x794), 'ypgXj': 'VICTORY', 'cAAIK': _0x22f60f(0xa64), 'RcmDY': _0x22f60f(0x587), 'SWHka': _0x22f60f(0x8c5), 'ftOeL': _0x22f60f(0xb58), 'YFWRK': _0x22f60f(0x61f), 'lwVVR': _0x22f60f(0xa98), 'kTHvG': _0x22f60f(0xae2), 'TYAFi': _0x22f60f(0x2e2) }; switch (this['_pose'][_0x22f60f(0x564) + 'e']()) { case _0xdcc53b['aJGxQ']: case _0xdcc53b[_0x22f60f(0x8f9)]: case _0xdcc53b[_0x22f60f(0x887)]: case '!': case '?': return -0x307 + 0x29 * 0xf + 0x6 * 0x1b; break; case _0xdcc53b['cSaRr']: case _0xdcc53b['LFPlD']: case _0xdcc53b[_0x22f60f(0x46a)]: return -0x479 * -0x3 + -0x198d + 0xc26; break; case _0xdcc53b[_0x22f60f(0x50d)]: case _0xdcc53b['nGYrZ']: case _0xdcc53b[_0x22f60f(0xa25)]: case _0xdcc53b[_0x22f60f(0x731)]: case _0xdcc53b[_0x22f60f(0x4a6)]: case _0xdcc53b[_0x22f60f(0xb4b)]: return 0x23ab + -0x219b + -0x20a; break; case _0xdcc53b['ftOeL']: case _0xdcc53b[_0x22f60f(0x53b)]: case _0xdcc53b[_0x22f60f(0x929)]: case _0xdcc53b[_0x22f60f(0x533)]: case _0xdcc53b['TYAFi']: return 0x8cb * 0x2 + 0x449 * -0x2 + 0x5 * -0x1cc; break; default: return VisuMZ[_0x22f60f(0x6af) + _0x22f60f(0x53e)]['Game_Chara' + 'cterBase_s' + _0x22f60f(0x486) + 'n']['call'](this); break; } }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8ca) + _0x2542b2(0x6ee) + _0x2542b2(0xa66)] = function () { const _0xc65aa6 = _0x2542b2, _0x4f205d = { 'isoVs': _0xc65aa6(0x77f), 'mYxUI': _0xc65aa6(0xb58), 'eOurB': _0xc65aa6(0xa8c) + 'N', 'VQgvR': 'HEART', 'cAUgI': _0xc65aa6(0xa64), 'IaCEl': _0xc65aa6(0x794), 'BMvkf': _0xc65aa6(0x61f), 'KuuZi': _0xc65aa6(0x4f8), 'xRoan': _0xc65aa6(0x750), 'UsxrQ': _0xc65aa6(0x587), 'oCjkK': _0xc65aa6(0x3f0), 'Fgsme': _0xc65aa6(0xa98), 'FUJRn': _0xc65aa6(0x28f), 'ytGXu': _0xc65aa6(0x517), 'meHUF': _0xc65aa6(0x8c5) }; switch (this[_0xc65aa6(0x58f)][_0xc65aa6(0x564) + 'e']()) { case _0x4f205d[_0xc65aa6(0x2e1)]: case _0x4f205d['mYxUI']: case _0x4f205d[_0xc65aa6(0xa69)]: case '!': case _0x4f205d['VQgvR']: case _0x4f205d['cAUgI']: return 0xb92 * -0x1 + 0x2140 + 0x6 * -0x39d; break; case _0x4f205d[_0xc65aa6(0x6a6)]: case _0x4f205d[_0xc65aa6(0x261)]: case _0x4f205d['KuuZi']: case '?': case _0x4f205d[_0xc65aa6(0x398)]: case _0x4f205d[_0xc65aa6(0x2be)]: return 0x6b * -0x3f + 0x1d50 + -0x6 * 0x7f; break; case _0x4f205d[_0xc65aa6(0xa79)]: case _0x4f205d[_0xc65aa6(0x2e5)]: case _0x4f205d['FUJRn']: case _0x4f205d[_0xc65aa6(0x4a3)]: case _0x4f205d[_0xc65aa6(0x218)]: return -0xa25 + -0x23b8 + 0x2ddf; break; default: return VisuMZ[_0xc65aa6(0x6af) + 'Core'][_0xc65aa6(0x2a0) + _0xc65aa6(0x1ef) + 'attern'][_0xc65aa6(0x325)](this); break; } }, Game_CharacterBase[_0x2542b2(0x336)]['forceCarry' + _0x2542b2(0xa88)] = function () { const _0x8b1b50 = _0x2542b2; this['_forceCarr' + _0x8b1b50(0x72f)] = !![]; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x6a7) + _0x2542b2(0xa88)] = function () { const _0x4157c5 = _0x2542b2; this['_forceCarr' + _0x4157c5(0x72f)] = ![]; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa12) + 'ng'] = function () { const _0x24efc8 = _0x2542b2; this[_0x24efc8(0x2c7) + _0x24efc8(0xa88)] = !![]; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x8b7) + 'ng'] = function () { const _0x4a9e6a = _0x2542b2; this[_0x4a9e6a(0x2c7) + 'ing'] = ![]; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x98f) + _0x2542b2(0xb31)] = function () { const _0x4c4877 = _0x2542b2, _0x1ce1f3 = { 'Hhdkj': _0x4c4877(0x989) + '1', 'UAoEr': function (_0x2f53bc, _0x8db271) { return _0x2f53bc === _0x8db271; }, 'hjuBb': function (_0x5dfa53, _0x4e049e) { return _0x5dfa53 === _0x4e049e; } }, _0x25be44 = _0x1ce1f3[_0x4c4877(0x37b)][_0x4c4877(0x968)]('|'); let _0x3c84a4 = 0x13ee * 0x1 + -0x6a8 + -0xd46 * 0x1; while (!![]) { switch (_0x25be44[_0x3c84a4++]) { case '0': if (this['isTile']()) return ![]; continue; case '1': return !![]; case '2': if (_0x1ce1f3[_0x4c4877(0x226)](this[_0x4c4877(0xab0) + _0x4c4877(0x615)], '')) return ![]; continue; case '3': if (this['_isObjectC' + _0x4c4877(0x936)]) return ![]; continue; case '4': if (_0x1ce1f3[_0x4c4877(0x7b8)](this['constructo' + 'r'], Game_Vehicle)) return ![]; continue; case '5': if (this[_0x4c4877(0x726) + 'ent']()) return ![]; continue; }break; } }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x908) + _0x2542b2(0x656)] = function () { const _0x183592 = _0x2542b2, _0x5c103e = { 'RPqJB': function (_0x43f035, _0x12c969) { return _0x43f035 === _0x12c969; } }; if (this[_0x183592(0x8af)]()) return !![]; if (_0x5c103e[_0x183592(0x496)](this[_0x183592(0x6dc) + 'r'], Game_Player) && this[_0x183592(0x30f) + 'e']()) return !![]; return ![]; }, Game_CharacterBase['prototype'][_0x2542b2(0x8ce) + _0x2542b2(0x51e)] = function () { const _0x29cb9d = _0x2542b2; return VisuMZ[_0x29cb9d(0x6af) + _0x29cb9d(0x53e)][_0x29cb9d(0x2cc)]['Movement'][_0x29cb9d(0x319) + _0x29cb9d(0x67b)]; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x579)] = function () { const _0x44fe81 = _0x2542b2; return this[_0x44fe81(0x356)](); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xb44)] = function () { const _0x16c049 = _0x2542b2, _0x4036a5 = { 'OBpMJ': function (_0x170303, _0x32efcf) { return _0x170303 + _0x32efcf; }, 'Ueqzr': function (_0x2b5184, _0x3dfeae) { return _0x2b5184 * _0x3dfeae; } }, _0x5e947e = $gameMap[_0x16c049(0x471)](); return Math['floor'](_0x4036a5[_0x16c049(0x846)](_0x4036a5[_0x16c049(0x40b)](this[_0x16c049(0x9c8)](), _0x5e947e), _0x5e947e)); }, Game_CharacterBase[_0x2542b2(0x1e6) + _0x2542b2(0x512) + _0x2542b2(0x396) + 'IT'] = -0x102e + -0x7f9 * 0x2 + -0x4 * -0x821, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x707) + _0x2542b2(0x689) + 'on'] = function (_0x147cf2, _0x9d2c2d) { const _0x4e084d = _0x2542b2, _0x5e8cc5 = { 'hgjRr': function (_0x3289f6, _0x5e86a1) { return _0x3289f6 > _0x5e86a1; }, 'aRRlq': function (_0x5b1152, _0xd497f7) { return _0x5b1152 >= _0xd497f7; } }; if (TouchInput[_0x4e084d(0xaee)]()) return ![]; if (!$gameMap[_0x4e084d(0x599) + _0x4e084d(0x9a5) + 'ement']()) return ![]; if (_0x5e8cc5[_0x4e084d(0x8a3)]($gameMap[_0x4e084d(0x2b1)](_0x147cf2, _0x9d2c2d)[_0x4e084d(0x50b)], -0x2f + 0x12bf + -0x18c * 0xc)) return ![]; if (!$gameMap[_0x4e084d(0x365) + _0x4e084d(0x47b) + 'tion'](_0x147cf2, _0x9d2c2d)) return ![]; const _0x5574e6 = $gameMap[_0x4e084d(0x9c4)][_0x4e084d(0x50b)]; if (_0x5e8cc5[_0x4e084d(0x2d3)](_0x5574e6, Game_CharacterBase[_0x4e084d(0x1e6) + _0x4e084d(0x512) + _0x4e084d(0x396) + 'IT'])) return ![]; return !![]; }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x449) + _0x2542b2(0x722) + _0x2542b2(0x5fa)] = function (_0x584f67, _0x353f19) { const _0x123127 = _0x2542b2, _0x66f0b4 = { 'NWpGO': function (_0x3b1f0f, _0x37bec2) { return _0x3b1f0f === _0x37bec2; }, 'jajOH': function (_0x139b80, _0x59c61a) { return _0x139b80 > _0x59c61a; }, 'MSLjJ': function (_0x594f85, _0x1aa2fb) { return _0x594f85 < _0x1aa2fb; }, 'MhoJL': function (_0x351c7f, _0x170972) { return _0x351c7f === _0x170972; }, 'Jqclr': function (_0x5d82cd, _0x230bc8) { return _0x5d82cd > _0x230bc8; }, 'BzPSw': function (_0x5e574b, _0x52f557) { return _0x5e574b < _0x52f557; }, 'JHQUN': function (_0x21f8b5, _0x565781) { return _0x21f8b5 < _0x565781; } }; let _0x179c4a = this[_0x123127(0x243) + _0x123127(0x315)](_0x584f67, _0x353f19); if (!this['getDiagona' + 'lDestinati' + 'on'](_0x584f67, _0x353f19)) return _0x179c4a; if (this[_0x123127(0xaeb) + _0x123127(0x1d1)](_0x584f67, _0x353f19)) return _0x179c4a; const _0x4f520f = _0x179c4a; if (_0x66f0b4[_0x123127(0x644)](_0x179c4a, 0x16f * -0x8 + -0x195d + 0x24d7)) { if (_0x66f0b4[_0x123127(0x921)](_0x584f67, this['x']) && this[_0x123127(0x648)](this['x'], this['y'], -0x525 * -0x1 + -0x185e * -0x1 + -0x1 * 0x1d7d)) _0x179c4a = -0x26cc + -0x19d3 * -0x1 + 0xcfc; if (_0x66f0b4['MSLjJ'](_0x584f67, this['x']) && this[_0x123127(0x648)](this['x'], this['y'], -0x1835 * -0x1 + 0x1 * 0x19cd + -0x31fe)) _0x179c4a = -0x1537 + -0x2005 + 0x353d; } else { if (_0x66f0b4['MhoJL'](_0x179c4a, -0x5 * 0x42d + -0x8a7 + 0x763 * 0x4)) { if (_0x66f0b4['jajOH'](_0x353f19, this['y']) && this[_0x123127(0x648)](this['x'], this['y'], 0xeaa + 0x2236 * 0x1 + 0xec * -0x35)) _0x179c4a = 0xeff * 0x1 + -0x21 * 0x3d + -0x721; if (_0x66f0b4[_0x123127(0x5c2)](_0x353f19, this['y']) && this['canPass'](this['x'], this['y'], -0x159b + -0x4b * 0x5 + 0x1718)) _0x179c4a = 0x21a9 * 0x1 + 0x2065 + -0x4207; } else { if (_0x66f0b4[_0x123127(0x644)](_0x179c4a, -0x1903 * -0x1 + 0x157f * 0x1 + 0x23 * -0x154)) { if (_0x66f0b4['Jqclr'](_0x353f19, this['y']) && this[_0x123127(0x648)](this['x'], this['y'], -0x1f5 * 0x1 + 0x722 + -0x529)) _0x179c4a = 0x233d + -0x20ec + -0x5 * 0x76; if (_0x66f0b4[_0x123127(0x66f)](_0x353f19, this['y']) && this['canPass'](this['x'], this['y'], -0x1 * -0x472 + 0x3 * -0x71f + 0x10f1)) _0x179c4a = 0x1 * 0x14c5 + 0x2 * 0x1b1 + 0x1 * -0x181e; } else { if (_0x66f0b4[_0x123127(0x644)](_0x179c4a, -0x1a56 + -0x129b + 0x18d * 0x1d)) { if (_0x66f0b4[_0x123127(0x921)](_0x584f67, this['x']) && this[_0x123127(0x648)](this['x'], this['y'], 0x9d9 * -0x1 + -0x18af + 0x2 * 0x1147)) _0x179c4a = 0x20ea * 0x1 + -0x1823 + -0x8be; if (_0x66f0b4[_0x123127(0x4f7)](_0x584f67, this['x']) && this[_0x123127(0x648)](this['x'], this['y'], -0x3 * 0x345 + -0x15c2 + 0x1f95)) _0x179c4a = 0x2 * -0xe91 + -0x8e8 + 0x2611; } } } } if (!this[_0x123127(0x648)](this['x'], this['y'], _0x179c4a)) return _0x4f520f; const _0xae419b = $gameMap[_0x123127(0x91f) + _0x123127(0x61d)](this['x'], _0x179c4a), _0x587a46 = $gameMap[_0x123127(0x799) + _0x123127(0x61d)](this['y'], _0x179c4a); if (this[_0x123127(0xaeb) + _0x123127(0x1d1)](_0xae419b, _0x587a46)) _0x179c4a = _0x4f520f; return _0x179c4a; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Chara' + 'cterBase_c' + _0x2542b2(0x3af)] = Game_CharacterBase['prototype']['canPass'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x648)] = function (_0x4bb768, _0x128dc1, _0x27a524) { const _0x309c76 = _0x2542b2, _0x4914bb = { 'WZcHA': function (_0x3fdc83, _0x11d7ca) { return _0x3fdc83 === _0x11d7ca; }, 'HlOEY': _0x309c76(0x9d9) }; return _0x4914bb[_0x309c76(0x643)](this[_0x309c76(0xa42) + 'pe'], _0x4914bb['HlOEY']) ? this['vehicle']()[_0x309c76(0x909) + _0x309c76(0x798)](_0x4bb768, _0x128dc1, _0x27a524) : VisuMZ[_0x309c76(0x6af) + _0x309c76(0x53e)]['Game_Chara' + 'cterBase_c' + _0x309c76(0x3af)]['call'](this, _0x4bb768, _0x128dc1, _0x27a524); }, Game_CharacterBase[_0x2542b2(0x336)]['clearSprit' + _0x2542b2(0x822)] = function () { const _0x1b9b54 = _0x2542b2; this[_0x1b9b54(0x31f) + _0x1b9b54(0x9be)] = -0x196e + -0x1112 + 0x2a80, this[_0x1b9b54(0x31f) + _0x1b9b54(0x38a)] = 0x1 * 0xf76 + -0x260f + 0x1699; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x81a) + _0x2542b2(0x3fb)] = Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x356)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x356)] = function () { const _0x436c8c = _0x2542b2, _0x5cdd3d = { 'zLkQb': function (_0xc62b3e, _0xf8e394) { return _0xc62b3e + _0xf8e394; } }; return _0x5cdd3d['zLkQb'](VisuMZ[_0x436c8c(0x6af) + _0x436c8c(0x53e)][_0x436c8c(0x2a0) + _0x436c8c(0x81a) + _0x436c8c(0x3fb)]['call'](this), this['_spriteOff' + 'setX'] || -0xbd5 + 0x5db * 0x6 + 0x174d * -0x1); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + 'cterBase_s' + _0x2542b2(0x8a4)] = Game_CharacterBase[_0x2542b2(0x336)]['screenY'], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x4df)] = function () { const _0x1e0723 = _0x2542b2, _0x29b02e = { 'DfFvU': function (_0xca54eb, _0x3f612a) { return _0xca54eb + _0x3f612a; } }; return _0x29b02e[_0x1e0723(0x392)](VisuMZ[_0x1e0723(0x6af) + 'Core']['Game_Chara' + _0x1e0723(0x81a) + 'creenY']['call'](this), this['_spriteOff' + _0x1e0723(0x38a)] || 0x1e2 * -0xb + 0x1ede + -0xa28); }, Game_CharacterBase[_0x2542b2(0x8f8) + _0x2542b2(0xad5)] = VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2cc)][_0x2542b2(0x44e)][_0x2542b2(0x829)] ?? -(-0xa0e + 0x20 * 0x4 + 0x994), Game_CharacterBase['prototype']['shiftY'] = function () { const _0x5522a6 = _0x2542b2; let _0x5426b4 = this[_0x5522a6(0xb52) + _0x5522a6(0xb07)]() ? -0x1a4 + -0x12db + 0x147f : -Game_CharacterBase['DEFAULT_SH' + _0x5522a6(0xad5)]; return this[_0x5522a6(0x465)] && (_0x5426b4 *= this['_scaleY']), Math[_0x5522a6(0x3c7)](_0x5426b4); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x7b4) + _0x2542b2(0x9a4)] = function () { this['_stepPatte' + 'rn'] = ''; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + 'cterBase_u' + _0x2542b2(0x6c6) + 'rn'] = Game_CharacterBase[_0x2542b2(0x336)]['updatePatt' + _0x2542b2(0x6be)], Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0xa58) + _0x2542b2(0x6be)] = function () { const _0x11cd67 = _0x2542b2; if (this[_0x11cd67(0xab6) + 'cked']) return; if (this[_0x11cd67(0xa58) + 'ernEventsM' + _0x11cd67(0x84a)]()) return; VisuMZ[_0x11cd67(0x6af) + _0x11cd67(0x53e)][_0x11cd67(0x2a0) + _0x11cd67(0x3a6) + _0x11cd67(0x6c6) + 'rn'][_0x11cd67(0x325)](this); }, Game_CharacterBase['prototype'][_0x2542b2(0xa58) + _0x2542b2(0x5ef) + _0x2542b2(0x84a)] = function () { const _0x5932ae = _0x2542b2, _0x210a4f = { 'cQfRm': function (_0x5ba9e0, _0x32e108) { return _0x5ba9e0 > _0x32e108; }, 'KGAXZ': function (_0xd7aea5, _0x42faca) { return _0xd7aea5(_0x42faca); }, 'FwRme': _0x5932ae(0xad8) + 'GHT', 'LKyFJ': function (_0x4f8775, _0x14ce44) { return _0x4f8775 > _0x14ce44; }, 'IXLPK': _0x5932ae(0xabe) + 'EFT', 'zxZSs': function (_0x2181b7, _0x249739) { return _0x2181b7 < _0x249739; }, 'AALpM': _0x5932ae(0x8a8) + _0x5932ae(0x3b6), 'DdfCz': 'SPIN\x20CW', 'LAiSp': _0x5932ae(0x206) + _0x5932ae(0x930) + 'E', 'Xcawc': _0x5932ae(0x8d9), 'PdXFM': _0x5932ae(0x5bd) + _0x5932ae(0x8a1), 'HOnVc': _0x5932ae(0x999) }; if (!this[_0x5932ae(0x8d1) + 'me']() && _0x210a4f[_0x5932ae(0x4e4)](this['_stopCount'], 0x49 * -0x2e + -0x3 * 0x66a + 0x205c)) return ![]; switch (_0x210a4f[_0x5932ae(0x870)](String, this[_0x5932ae(0x878) + 'rn'])['toUpperCas' + 'e']()[_0x5932ae(0x7fa)]()) { case _0x210a4f[_0x5932ae(0x880)]: this[_0x5932ae(0x944)] += 0x1e5 * 0x2 + -0x861 * -0x3 + -0x1cec; if (_0x210a4f[_0x5932ae(0x9b0)](this['_pattern'], 0x93d + -0xb64 + -0x7 * -0x4f)) this[_0x5932ae(0xa0a)](-0x1ba0 + 0x1ee5 + -0x345 * 0x1); break; case _0x210a4f[_0x5932ae(0x44d)]: this[_0x5932ae(0x944)] -= -0xccd * -0x3 + 0x4ae + 0xe5c * -0x3; if (_0x210a4f[_0x5932ae(0x670)](this['_pattern'], -0x204d + -0x644 * -0x1 + 0x1a09)) this[_0x5932ae(0xa0a)](-0xa * -0x1e2 + 0x11e7 + -0x24b9); break; case _0x210a4f[_0x5932ae(0x820)]: case _0x210a4f[_0x5932ae(0x1dd)]: this['turnRight9' + '0'](); break; case _0x210a4f['LAiSp']: case _0x210a4f['Xcawc']: case _0x210a4f[_0x5932ae(0x28e)]: case _0x210a4f[_0x5932ae(0x62a)]: this[_0x5932ae(0x67a)](); break; default: return ![]; }return !![]; }, Game_CharacterBase['prototype'][_0x2542b2(0x78e) + _0x2542b2(0x72e)] = function () { const _0x4776b1 = _0x2542b2; return $gameSystem[_0x4776b1(0x78e) + _0x4776b1(0x72e)](this); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x7f8) + 'on'] = function () { const _0x5bd3b4 = _0x2542b2, _0x47ab09 = { 'CTpZy': function (_0x412a2f, _0x1d4ce6) { return _0x412a2f > _0x1d4ce6; } }, _0x283c43 = this[_0x5bd3b4(0x78e) + 'onData'](); if (!_0x283c43) return ![]; return _0x47ab09[_0x5bd3b4(0x841)](_0x283c43['iconIndex'], -0x520 + 0xe64 + -0x944); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x996)] = function () { const _0x519e7f = _0x2542b2, _0x452aa3 = this['direction'](); return $gameMap['roundXWith' + _0x519e7f(0x61d)](this['x'], _0x452aa3); }, Game_CharacterBase[_0x2542b2(0x336)]['frontY'] = function () { const _0x31668a = _0x2542b2, _0x11f4f2 = this[_0x31668a(0x7bc)](); return $gameMap[_0x31668a(0x799) + _0x31668a(0x61d)](this['y'], _0x11f4f2); }, Game_CharacterBase[_0x2542b2(0x336)]['backX'] = function () { const _0x25af47 = _0x2542b2, _0x4f880e = this['reverseDir'](this['direction']()); return $gameMap[_0x25af47(0x91f) + 'Direction'](this['x'], _0x4f880e); }, Game_CharacterBase[_0x2542b2(0x336)]['backY'] = function () { const _0xb73ead = _0x2542b2, _0x291186 = this[_0xb73ead(0x68d)](this[_0xb73ead(0x7bc)]()); return $gameMap[_0xb73ead(0x799) + _0xb73ead(0x61d)](this['y'], _0x291186); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x4c0)] = function () { const _0x470eeb = _0x2542b2, _0x2e7edd = [-0xeda + 0x18 * -0x108 + 0x279a, -0x41 * 0x10 + -0x251c + 0x292f, 0x641 * 0x3 + 0xf12 + 0xb45 * -0x3, 0x1564 + -0x1f58 + 0x1 * 0x9fd, 0x1 * 0xbf2 + 0x1538 + -0x2128, -0x1fb6 + 0x21e4 + -0x229, 0x5f2 + 0x545 + -0xb2f, -0x1004 + 0x1 * 0x63d + 0x9c8, -0x7dc + -0xecb + -0x16ab * -0x1, 0x2 * 0x4f9 + -0xb3 * 0x26 + -0x15 * -0xcb][this[_0x470eeb(0x7bc)]()]; return $gameMap['roundXWith' + _0x470eeb(0x61d)](this['x'], _0x2e7edd); }, Game_CharacterBase['prototype'][_0x2542b2(0xa22)] = function () { const _0x399ca5 = _0x2542b2, _0x25b4f4 = [-0x1fed + -0x1518 + 0x3505, -0x1 * 0x1764 + -0x457 + -0x43 * -0x6a, -0x13 * 0xb1 + -0x67b + 0x13a4, -0x4d * 0x19 + 0x1b31 + -0x13a3, -0x6 * 0x34d + 0x43 * 0x15 + -0xe51 * -0x1, -0x17cd + -0xb5 * -0x1f + 0x1e7, -0x5b * 0x41 + -0x1 * -0x119 + -0x3e * -0x5b, -0x8d2 + -0x24a1 * 0x1 + -0xb5d * -0x4, -0x1cbc + -0x1a04 + -0xa * -0x57a, -0x1 * -0x2485 + -0x181d + -0xc61][this[_0x399ca5(0x7bc)]()]; return $gameMap[_0x399ca5(0x799) + _0x399ca5(0x61d)](this['y'], _0x25b4f4); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x93e)] = function () { const _0x4b1bfc = _0x2542b2, _0x374de1 = [-0x22d6 + -0x2 * -0x9b1 + 0xf74, 0xd24 + 0x1124 + -0x1e41, 0x1f15 * 0x1 + 0x1d65 + -0x3c76, -0x403 * 0x7 + -0x146 * -0x11 + 0x670, 0x822 + 0x16a * -0x1a + 0x1caa, 0x409 * -0x7 + -0xd66 + 0x29aa, 0x1f16 + 0x2433 + 0x166d * -0x3, -0x346 * -0x7 + 0x1fb1 + -0x3692, -0x3f * -0x8 + 0x239b + -0x258d * 0x1, -0x601 * -0x3 + 0x1e0 + -0x8 * 0x27c][this[_0x4b1bfc(0x7bc)]()]; return $gameMap['roundXWith' + _0x4b1bfc(0x61d)](this['x'], _0x374de1); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x513)] = function () { const _0x52cd2c = _0x2542b2, _0x3f1567 = [-0xe3d + 0xa41 + -0x22 * -0x1e, 0x1549 + -0x1 * 0x2017 + 0xad5, 0xd3d + -0x1f * 0x13a + -0x1 * -0x18cd, 0xe5 * -0x19 + 0x401 + 0x125d, -0x1dc + -0x1351 + -0x1535 * -0x1, 0xbd2 + -0x15 * 0x1b + 0x4cb * -0x2, -0x1 * 0x680 + -0x784 * 0x2 + 0x158a, 0x9b3 * -0x3 + -0xb75 + 0x2897, 0x2262 + 0x1280 + -0x34dc, 0x1 * -0x2f1 + 0x745 * -0x2 + 0x117e][this[_0x52cd2c(0x7bc)]()]; return $gameMap[_0x52cd2c(0x799) + _0x52cd2c(0x61d)](this['y'], _0x3f1567); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + _0x2542b2(0x3b3) + 'veRoute'] = Game_Character[_0x2542b2(0x336)][_0x2542b2(0x92a) + 'te'], Game_Character[_0x2542b2(0x336)]['setMoveRou' + 'te'] = function (_0x1034e3) { const _0x22b1cc = _0x2542b2; route = JsonEx[_0x22b1cc(0x612) + 'py'](_0x1034e3), VisuMZ[_0x22b1cc(0x6af) + _0x22b1cc(0x53e)][_0x22b1cc(0x2a0) + 'cter_setMo' + _0x22b1cc(0x9a2)][_0x22b1cc(0x325)](this, route); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2a0) + 'cter_force' + _0x2542b2(0x9a9)] = Game_Character['prototype']['forceMoveR' + 'oute'], Game_Character[_0x2542b2(0x336)][_0x2542b2(0x793) + _0x2542b2(0x384)] = function (_0x4408b0) { const _0x5356fe = _0x2542b2; route = JsonEx[_0x5356fe(0x612) + 'py'](_0x4408b0), VisuMZ[_0x5356fe(0x6af) + _0x5356fe(0x53e)]['Game_Chara' + _0x5356fe(0x1e0) + 'MoveRoute'][_0x5356fe(0x325)](this, route); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Game_Chara' + _0x2542b2(0x50f) + _0x2542b2(0x9d3) + _0x2542b2(0x759)] = Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x7eb)], Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x7eb)] = function (_0x45a8bf) { const _0x5717fd = _0x2542b2, _0x26ed7a = { 'KPmpl': function (_0x1373de, _0x49de3f) { return _0x1373de === _0x49de3f; } }, _0x5b49b2 = Game_Character, _0x246edd = _0x45a8bf[_0x5717fd(0x71a)]; if (_0x26ed7a[_0x5717fd(0x873)](_0x45a8bf[_0x5717fd(0x9bb)], _0x5b49b2[_0x5717fd(0x2c2) + 'PT'])) { let _0x1e0d40 = _0x45a8bf[_0x5717fd(0x71a)][-0x11 * 0x11b + -0x9ae + 0x1c79]; _0x1e0d40 = this[_0x5717fd(0xb0c) + 'iableValue' + _0x5717fd(0x590) + _0x5717fd(0x5c4)](_0x1e0d40), _0x1e0d40 = this[_0x5717fd(0x810) + _0x5717fd(0xb1d) + 'aluesInScr' + 'iptCall'](_0x1e0d40), this[_0x5717fd(0x868) + _0x5717fd(0x409) + _0x5717fd(0xa91) + 're'](_0x45a8bf, _0x1e0d40); } else VisuMZ['EventsMove' + _0x5717fd(0x53e)][_0x5717fd(0x2a0) + _0x5717fd(0x50f) + _0x5717fd(0x9d3) + _0x5717fd(0x759)][_0x5717fd(0x325)](this, _0x45a8bf); }, Game_Character['prototype'][_0x2542b2(0xb0c) + _0x2542b2(0x9ba) + _0x2542b2(0x590) + _0x2542b2(0x5c4)] = function (_0x1ccf27) { const _0x51383f = _0x2542b2, _0x573502 = /\$gameVariables\.value\((\d+)\)/gi, _0x3eaa2a = /\\V\[(\d+)\]/gi; while (_0x1ccf27[_0x51383f(0x4d6)](_0x573502)) { _0x1ccf27 = _0x1ccf27[_0x51383f(0x736)](_0x573502, (_0x4cda4a, _0x3897ef) => $gameVariables['value'](parseInt(_0x3897ef))); } while (_0x1ccf27[_0x51383f(0x4d6)](_0x3eaa2a)) { _0x1ccf27 = _0x1ccf27[_0x51383f(0x736)](_0x3eaa2a, (_0x43f423, _0x2824d1) => $gameVariables[_0x51383f(0x872)](parseInt(_0x2824d1))); } return _0x1ccf27; }, Game_Character['prototype']['convertSel' + _0x2542b2(0xb1d) + 'aluesInScr' + _0x2542b2(0x76b)] = function (_0x5bfff8) { const _0x691902 = _0x2542b2, _0x2cc7c5 = /\\SELFVAR\[(\d+)\]/gi; while (_0x5bfff8[_0x691902(0x4d6)](_0x2cc7c5)) { _0x5bfff8 = _0x5bfff8[_0x691902(0x736)](_0x2cc7c5, (_0x4cf157, _0x3515cf) => getSelfVariableValue(this[_0x691902(0x5dc)], this['_eventId'], parseInt(_0x3515cf))); } return _0x5bfff8; }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0x409) + _0x2542b2(0xa91) + 're'] = function (_0x42e76e, _0x261c9c) { const _0x384ed9 = _0x2542b2, _0x60fb92 = { 'LXSwA': function (_0xe22f3f, _0x29543b) { return _0xe22f3f(_0x29543b); }, 'Jzaaf': _0x384ed9(0xa43), 'LohVI': _0x384ed9(0x709), 'YRSMO': function (_0x2f6b7b, _0x43a0ad) { return _0x2f6b7b(_0x43a0ad); }, 'CcOtu': function (_0x4a062f, _0xc60423) { return _0x4a062f + _0xc60423; }, 'RprrO': function (_0x1f4a85, _0x447869) { return _0x1f4a85(_0x447869); }, 'noUTw': function (_0x135faa, _0x4b5581) { return _0x135faa(_0x4b5581); }, 'GYWlR': function (_0x2fa0bb, _0x1022f4) { return _0x2fa0bb(_0x1022f4); }, 'qxqxZ': function (_0x2c59f0, _0x43ae4d) { return _0x2c59f0(_0x43ae4d); }, 'HGVxZ': function (_0x1c0b29, _0x49c15c) { return _0x1c0b29(_0x49c15c); }, 'Hbrdu': function (_0x5318eb, _0x174004) { return _0x5318eb(_0x174004); }, 'VgMKb': function (_0x293ea4, _0x1295fe) { return _0x293ea4(_0x1295fe); }, 'mSCgq': function (_0x5dd720, _0x153c09) { return _0x5dd720(_0x153c09); }, 'EECSv': function (_0x359773, _0x33d05d) { return _0x359773 * _0x33d05d; }, 'WtQoP': function (_0x591b0e, _0x3c8de3) { return _0x591b0e / _0x3c8de3; }, 'pjkxx': function (_0xbfc3fe, _0x249e67) { return _0xbfc3fe(_0x249e67); }, 'bZffC': function (_0x1b1288, _0x253c26) { return _0x1b1288(_0x253c26); }, 'yMOgv': function (_0x43f865, _0x3177f3) { return _0x43f865 + _0x3177f3; }, 'WUuMo': function (_0x2c5549, _0x3d1e92) { return _0x2c5549(_0x3d1e92); }, 'LlsiB': function (_0x23b7ef, _0x281099) { return _0x23b7ef(_0x281099); }, 'RjHGM': function (_0x3371c3, _0x424e55) { return _0x3371c3(_0x424e55); }, 'Oldju': function (_0x258ca4, _0x3d0c83) { return _0x258ca4(_0x3d0c83); }, 'AbJCJ': function (_0x17826c, _0x3c737b) { return _0x17826c(_0x3c737b); }, 'EODPx': function (_0x5342f4, _0x558dca) { return _0x5342f4(_0x558dca); }, 'oPoLW': function (_0x6aa837, _0x3f4313) { return _0x6aa837(_0x3f4313); }, 'kOcBd': function (_0x1bdda6, _0x47f0cf) { return _0x1bdda6(_0x47f0cf); }, 'XDylz': function (_0x5ca54f, _0x4f5479) { return _0x5ca54f(_0x4f5479); }, 'ZyOFX': function (_0x3a6f3d, _0x838bb8) { return _0x3a6f3d(_0x838bb8); }, 'yixIk': function (_0x84297d, _0x3af221) { return _0x84297d(_0x3af221); }, 'UlxgY': function (_0x638f4a, _0x166c94) { return _0x638f4a(_0x166c94); }, 'qyXOE': function (_0x1e9307, _0x4ec2e6) { return _0x1e9307(_0x4ec2e6); } }; if (_0x261c9c[_0x384ed9(0x4d6)](/ANIMATION:[ ](\d+)/i)) return this['processMov' + 'eRouteAnim' + 'ation'](_0x60fb92['LXSwA'](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/BALLOON:[ ](.*)/i)) return this['processMov' + _0x384ed9(0x805) + _0x384ed9(0x93b)](_0x60fb92['LXSwA'](String, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/FADE IN:[ ](\d+)/i)) return this[_0x384ed9(0x868) + 'eRouteFade' + 'In'](_0x60fb92[_0x384ed9(0x6a1)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/FADE OUT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x763) + _0x384ed9(0x94b)](_0x60fb92[_0x384ed9(0x6a1)](Number, RegExp['$1'])); if (_0x261c9c['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)) return this[_0x384ed9(0x8bf) + _0x384ed9(0xa88)](); if (_0x261c9c[_0x384ed9(0x4d6)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)) return this[_0x384ed9(0x6a7) + _0x384ed9(0xa88)](); if (_0x261c9c[_0x384ed9(0x4d6)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)) return this[_0x384ed9(0xa12) + 'ng'](); if (_0x261c9c['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)) return this[_0x384ed9(0x8b7) + 'ng'](); if (_0x261c9c[_0x384ed9(0x4d6)](/HUG:[ ]LEFT/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x53c) + _0x384ed9(0x5c4)](_0x60fb92[_0x384ed9(0x665)]); if (_0x261c9c['match'](/HUG:[ ]RIGHT/i)) return this['processMov' + _0x384ed9(0x53c) + _0x384ed9(0x5c4)](_0x60fb92['LohVI']); if (_0x261c9c['match'](/INDEX:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x7d8) + _0x384ed9(0x28a)](_0x60fb92[_0x384ed9(0x7ea)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/INDEX:[ ]([\+\-]\d+)/i)) { const _0x547c27 = _0x60fb92[_0x384ed9(0x81f)](this['_character' + _0x384ed9(0x383)], _0x60fb92[_0x384ed9(0x6f5)](Number, RegExp['$1'])); return this[_0x384ed9(0x868) + _0x384ed9(0x7d8) + _0x384ed9(0x28a)](_0x547c27); } if (_0x261c9c[_0x384ed9(0x4d6)](/JUMP FORWARD:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x2f5) + _0x384ed9(0x9fd)](_0x60fb92['RprrO'](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x2f5) + 'To'](_0x60fb92[_0x384ed9(0x3e1)](Number, RegExp['$1']), _0x60fb92[_0x384ed9(0x7ea)](Number, RegExp['$2'])); if (_0x261c9c[_0x384ed9(0x4d6)](/JUMP TO EVENT:[ ](\d+)/i)) { const _0x28d95a = $gameMap['event'](_0x60fb92[_0x384ed9(0x5a3)](Number, RegExp['$1'])); return this[_0x384ed9(0x868) + 'eRouteJump' + 'ToCharacte' + 'r'](_0x28d95a); } if (_0x261c9c['match'](/JUMP TO PLAYER/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x2f5) + _0x384ed9(0xa1d) + 'r']($gamePlayer); if (_0x261c9c[_0x384ed9(0x4d6)](/JUMP TO HOME/i) && this[_0x384ed9(0x478)]) { const _0x211b8f = this[_0x384ed9(0x374) + 'eX'], _0x16f8dc = this[_0x384ed9(0x374) + 'eY']; return this[_0x384ed9(0x868) + _0x384ed9(0x2f5) + 'To'](_0x211b8f, _0x16f8dc); } if (_0x261c9c['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)) { const _0x339f07 = _0x60fb92['LXSwA'](String, RegExp['$1']), _0x669579 = this[_0x384ed9(0xb2c) + _0x384ed9(0x375) + 'ds'](_0x261c9c); return this[_0x384ed9(0x868) + 'eRouteMove' + _0x384ed9(0xa3f)](_0x339f07, _0x669579); } if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)) { const _0x404f91 = _0x60fb92[_0x384ed9(0x776)](Number, RegExp['$1']), _0x899586 = _0x60fb92[_0x384ed9(0x7ea)](Number, RegExp['$2']), _0x8df986 = this[_0x384ed9(0xb2c) + _0x384ed9(0x375) + 'ds'](_0x261c9c); return this[_0x384ed9(0x868) + 'eRouteMove' + 'To'](_0x404f91, _0x899586, _0x8df986); } if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE TO EVENT:[ ](\d+)/i)) { const _0xc27717 = $gameMap['event'](_0x60fb92[_0x384ed9(0xa49)](Number, RegExp['$1'])), _0x48ad91 = this[_0x384ed9(0xb2c) + 'sionKeywor' + 'ds'](_0x261c9c); return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + 'ToCharacte' + 'r'](_0xc27717, _0x48ad91); } if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE TO PLAYER/i)) { const _0x3990a7 = this[_0x384ed9(0xb2c) + _0x384ed9(0x375) + 'ds'](_0x261c9c); return this['processMov' + 'eRouteMove' + 'ToCharacte' + 'r']($gamePlayer, _0x3990a7); } if (_0x261c9c['match'](/MOVE TO HOME/i) && this[_0x384ed9(0x478)]) { const _0x17f9a4 = this['_randomHom' + 'eX'], _0x11a6da = this['_randomHom' + 'eY'], _0x56ccab = this['checkColli' + _0x384ed9(0x375) + 'ds'](_0x261c9c); return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + 'To'](_0x17f9a4, _0x11a6da, _0x56ccab); } if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE LOWER LEFT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + 'Repeat'](0x116d * 0x1 + 0x25c3 * 0x1 + -0x372f, _0x60fb92[_0x384ed9(0x265)](Number, RegExp['$1'])); if (_0x261c9c['match'](/MOVE DOWN:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + _0x384ed9(0x857)](0xc9 * 0xf + -0x1b8 + -0xa0d, _0x60fb92['noUTw'](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE LOWER RIGHT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + _0x384ed9(0x857)](0x1c02 + -0x53 + -0x9a * 0x2e, _0x60fb92[_0x384ed9(0x3e1)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE LEFT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + 'Repeat'](-0x27c + 0x2118 + 0xb2 * -0x2c, _0x60fb92[_0x384ed9(0x6a1)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE RIGHT:[ ](\d+)/i)) return this['processMov' + 'eRouteMove' + 'Repeat'](0x23a5 * 0x1 + -0x1 * -0x25f + 0x25fe * -0x1, _0x60fb92[_0x384ed9(0x7ea)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE UPPER LEFT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + _0x384ed9(0x857)](0x152f * 0x1 + 0x8ac * 0x2 + -0x58 * 0x70, _0x60fb92[_0x384ed9(0x3c0)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE UP:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + _0x384ed9(0x857)](0x1b * -0xad + 0x7ff + -0x1 * -0xa48, _0x60fb92['mSCgq'](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/MOVE UPPER RIGHT:[ ](\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3ff) + _0x384ed9(0x857)](0x165b + -0x8a5 + -0xdad, _0x60fb92[_0x384ed9(0xa49)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/OPACITY:[ ](\d+)([%％])/i)) { const _0x3697e6 = Math[_0x384ed9(0x3c7)](_0x60fb92['EECSv'](_0x60fb92[_0x384ed9(0x1df)](_0x60fb92[_0x384ed9(0x88c)](Number, RegExp['$1']), -0xa8 + -0x4f8 + 0x604), 0x6e * 0x35 + -0x58a + -0x103d)); return this['setOpacity'](_0x3697e6[_0x384ed9(0x6b4)](-0x1 * -0x883 + -0x1c82 + 0x13ff, 0x253f + -0x2 * 0xfae + -0x1 * 0x4e4)); } if (_0x261c9c['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)) { const _0x58358e = _0x60fb92[_0x384ed9(0x81f)](this[_0x384ed9(0xa2b)], Math[_0x384ed9(0x3c7)](_0x60fb92[_0x384ed9(0xae5)](_0x60fb92[_0x384ed9(0x1df)](_0x60fb92[_0x384ed9(0xb15)](Number, RegExp['$1']), -0x15 * 0xc1 + -0xe77 + 0x1eb0), 0x1bb + -0x208c + 0x1fd0))); return this[_0x384ed9(0x782)](_0x58358e[_0x384ed9(0x6b4)](0x500 + 0x1463 + -0x1963, 0xc1 * -0x5 + -0x1758 + 0x1c1c)); } if (_0x261c9c[_0x384ed9(0x4d6)](/OPACITY:[ ]([\+\-]\d+)/i)) { const _0x3ccb92 = _0x60fb92[_0x384ed9(0x6fe)](this[_0x384ed9(0xa2b)], _0x60fb92['WUuMo'](Number, RegExp['$1'])); return this[_0x384ed9(0x782)](_0x3ccb92['clamp'](0xc * 0x24e + 0x3 * 0xb7b + -0x3e19, -0x1 * 0x397 + 0x4ec + 0x2b * -0x2)); } if (_0x261c9c[_0x384ed9(0x4d6)](/PATTERN LOCK:[ ](\d+)/i)) return this['processMov' + _0x384ed9(0x68a) + 'ernLock'](_0x60fb92[_0x384ed9(0x7ec)](Number, RegExp['$1'])); if (_0x261c9c[_0x384ed9(0x4d6)](/PATTERN UNLOCK/i)) return this['_patternLo' + _0x384ed9(0x413)] = ![]; if (_0x261c9c[_0x384ed9(0x4d6)](/POSE:[ ](.*)/i)) { const _0x398826 = _0x60fb92['bZffC'](String, RegExp['$1'])[_0x384ed9(0x564) + 'e']()['trim'](); return this[_0x384ed9(0xa86)](_0x398826); } if (_0x261c9c[_0x384ed9(0x4d6)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)) { const _0x45a200 = _0x60fb92[_0x384ed9(0x605)](Number, RegExp['$1']), _0x5afc80 = _0x60fb92[_0x384ed9(0x986)](Number, RegExp['$2']); return this[_0x384ed9(0x868) + _0x384ed9(0xb47) + 'To'](_0x45a200, _0x5afc80); } if (_0x261c9c[_0x384ed9(0x4d6)](/STEP TOWARD EVENT:[ ](\d+)/i)) { const _0x292c36 = $gameMap['event'](_0x60fb92[_0x384ed9(0x1f0)](Number, RegExp['$1'])); return this[_0x384ed9(0x868) + _0x384ed9(0xb47) + _0x384ed9(0xa1d) + 'r'](_0x292c36); } if (_0x261c9c[_0x384ed9(0x4d6)](/STEP TOWARD PLAYER/i)) return this['processMov' + 'eRouteStep' + _0x384ed9(0xa1d) + 'r']($gamePlayer); if (_0x261c9c[_0x384ed9(0x4d6)](/STEP TOWARD HOME/i) && this[_0x384ed9(0x478)]) { const _0x127aca = this[_0x384ed9(0x374) + 'eX'], _0x398058 = this[_0x384ed9(0x374) + 'eY']; return this[_0x384ed9(0x868) + _0x384ed9(0xb47) + 'To'](_0x127aca, _0x398058); } if (_0x261c9c[_0x384ed9(0x4d6)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)) return this[_0x384ed9(0x9d5) + _0x384ed9(0x51f)](_0x60fb92[_0x384ed9(0x6fd)](Number, RegExp['$1']), _0x60fb92[_0x384ed9(0xb15)](Number, RegExp['$2'])); if (_0x261c9c[_0x384ed9(0x4d6)](/STEP AWAY FROM EVENT:[ ](\d+)/i)) { const _0x487f39 = $gameMap[_0x384ed9(0x264)](_0x60fb92[_0x384ed9(0xaa6)](Number, RegExp['$1'])); return this[_0x384ed9(0x9d5) + _0x384ed9(0x66a) + 'r'](_0x487f39); } if (_0x261c9c[_0x384ed9(0x4d6)](/STEP AWAY FROM PLAYER/i)) return this[_0x384ed9(0x9d5) + _0x384ed9(0x66a) + 'r']($gamePlayer); if (_0x261c9c[_0x384ed9(0x4d6)](/STEP AWAY FROM HOME/i) && this['eventId']) { const _0x4481c2 = this[_0x384ed9(0x374) + 'eX'], _0x56b06d = this[_0x384ed9(0x374) + 'eY']; return this[_0x384ed9(0x9d5) + _0x384ed9(0x51f)](_0x4481c2, _0x56b06d); } if (_0x261c9c[_0x384ed9(0x4d6)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)) return this[_0x384ed9(0xa77) + _0x384ed9(0x853)](_0x60fb92['kOcBd'](Number, RegExp['$1']), _0x60fb92[_0x384ed9(0x6f5)](Number, RegExp['$2'])); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN TO EVENT:[ ](\d+)/i)) { const _0x3c225d = $gameMap[_0x384ed9(0x264)](_0x60fb92[_0x384ed9(0x216)](Number, RegExp['$1'])); return this[_0x384ed9(0x703) + _0x384ed9(0x23b)](_0x3c225d); } if (_0x261c9c[_0x384ed9(0x4d6)](/TURN TO PLAYER/i)) return this[_0x384ed9(0x703) + _0x384ed9(0x23b)]($gamePlayer); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN TO HOME/i) && this[_0x384ed9(0x478)]) { const _0x3921e0 = this[_0x384ed9(0x374) + 'eX'], _0x28739a = this[_0x384ed9(0x374) + 'eY']; return this[_0x384ed9(0x703) + _0x384ed9(0x853)](_0x3921e0, _0x28739a); } if (_0x261c9c[_0x384ed9(0x4d6)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)) return this['turnAwayFr' + _0x384ed9(0x51f)](_0x60fb92[_0x384ed9(0x5a3)](Number, RegExp['$1']), _0x60fb92[_0x384ed9(0x78f)](Number, RegExp['$2'])); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN AWAY FROM EVENT:[ ](\d+)/i)) { const _0x1f61fa = $gameMap[_0x384ed9(0x264)](_0x60fb92['yixIk'](Number, RegExp['$1'])); return this[_0x384ed9(0x9a6) + _0x384ed9(0x66a) + 'r'](_0x1f61fa); } if (_0x261c9c[_0x384ed9(0x4d6)](/TURN AWAY FROM PLAYER/i)) return this['turnAwayFr' + _0x384ed9(0x66a) + 'r']($gamePlayer); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN AWAY FROM HOME/i) && this[_0x384ed9(0x478)]) { const _0x927653 = this[_0x384ed9(0x374) + 'eX'], _0x416603 = this[_0x384ed9(0x374) + 'eY']; return this[_0x384ed9(0x9a6) + _0x384ed9(0x51f)](_0x927653, _0x416603); } if (_0x261c9c[_0x384ed9(0x4d6)](/TURN LOWER LEFT/i)) return this[_0x384ed9(0x4c3) + 'on'](-0xcf1 + -0x2554 + 0x3246); if (_0x261c9c['match'](/TURN LOWER RIGHT/i)) return this[_0x384ed9(0x4c3) + 'on'](-0xb8 * -0x8 + 0x267d + -0x2c3a); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN UPPER LEFT/i)) return this[_0x384ed9(0x4c3) + 'on'](0xcf2 + 0x1ead + -0x2b98); if (_0x261c9c[_0x384ed9(0x4d6)](/TURN UPPER RIGHT/i)) return this[_0x384ed9(0x4c3) + 'on'](0x25f * -0x8 + 0x16 * -0x112 + -0x3 * -0xe2f); if (_0x261c9c[_0x384ed9(0x4d6)](/Self Switch[ ](.*):[ ](.*)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x3f7) + _0x384ed9(0x72d)](RegExp['$1'], RegExp['$2']); if (_0x261c9c[_0x384ed9(0x4d6)](/Self Variable[ ](.*):[ ](.*)/i)) return this[_0x384ed9(0x868) + 'eRouteSelf' + _0x384ed9(0x362)](RegExp['$1'], RegExp['$2']); if (_0x261c9c[_0x384ed9(0x4d6)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)) return this[_0x384ed9(0x868) + _0x384ed9(0x6d4) + 'portTo'](_0x60fb92[_0x384ed9(0x7dd)](Number, RegExp['$1']), _0x60fb92[_0x384ed9(0x5a3)](Number, RegExp['$2'])); if (_0x261c9c[_0x384ed9(0x4d6)](/TELEPORT TO EVENT:[ ](\d+)/i)) { const _0x464258 = $gameMap[_0x384ed9(0x264)](_0x60fb92[_0x384ed9(0x960)](Number, RegExp['$1'])); return this[_0x384ed9(0x868) + _0x384ed9(0x6d4) + _0x384ed9(0x536) + 'acter'](_0x464258); } if (_0x261c9c[_0x384ed9(0x4d6)](/TELEPORT TO PLAYER/i)) return this['processMov' + _0x384ed9(0x6d4) + _0x384ed9(0x536) + 'acter']($gamePlayer); if (_0x261c9c['match'](/TELEPORT TO HOME/i) && this[_0x384ed9(0x478)]) { const _0x434b6d = this['_randomHom' + 'eX'], _0x48505d = this[_0x384ed9(0x374) + 'eY']; return this['processMov' + 'eRouteTele' + 'portTo'](_0x434b6d, _0x48505d); } try { VisuMZ[_0x384ed9(0x6af) + _0x384ed9(0x53e)][_0x384ed9(0x2a0) + 'cter_proce' + _0x384ed9(0x9d3) + _0x384ed9(0x759)]['call'](this, _0x42e76e); } catch (_0xf154d6) { if ($gameTemp['isPlaytest']()) console['log'](_0xf154d6); } }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0xa27) + _0x2542b2(0x455)] = function (_0xd86a06) { const _0x4d45ac = _0x2542b2; $gameTemp['requestAni' + _0x4d45ac(0xa41)]([this], _0xd86a06); }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0x805) + _0x2542b2(0x93b)] = function (_0x4d94d4) { const _0x40bca5 = _0x2542b2, _0x1dacf6 = { 'pqmXH': _0x40bca5(0xa8c) + 'N', 'qBIMR': _0x40bca5(0x4f8), 'fhWtX': _0x40bca5(0xb69), 'WmSJM': _0x40bca5(0x50e), 'cvChv': _0x40bca5(0x28f), 'JGGoe': _0x40bca5(0x8c4), 'EbAOY': _0x40bca5(0x37f), 'jKDLX': _0x40bca5(0xab1), 'OSEVe': _0x40bca5(0x534), 'ACWGC': _0x40bca5(0x750), 'qXSkc': _0x40bca5(0x517), 'Darpx': 'COBWEB', 'CQCsE': _0x40bca5(0xa76), 'LVnQZ': _0x40bca5(0x30c) + 'N', 'ICnry': 'SILENCE', 'rrmKx': _0x40bca5(0x240), 'QzsYn': _0x40bca5(0x8ea), 'VLIBW': _0x40bca5(0x5be), 'bCDLy': _0x40bca5(0x8c5), 'UzJKX': 'LIGHT-BULB', 'eOnpe': 'LIGHTBULB', 'CLHRA': 'ZZZ', 'awXrc': _0x40bca5(0x2e2), 'HYGoV': _0x40bca5(0x7d9) + 'ED\x201', 'MEUze': _0x40bca5(0x7d9) + _0x40bca5(0x295), 'TGDWv': _0x40bca5(0x7d9) + _0x40bca5(0x758), 'RlKVL': 'USER-DEFIN' + 'ED\x204', 'QuUMC': _0x40bca5(0x7d9) + _0x40bca5(0x511) }; let _0x5a0e23 = -0x4 * -0x301 + -0x4da + -0x1 * 0x72a; switch (_0x4d94d4['toUpperCas' + 'e']()[_0x40bca5(0x7fa)]()) { case '!': case _0x1dacf6[_0x40bca5(0x5c6)]: _0x5a0e23 = 0x33 + 0x2de * 0x9 + -0x1a0 * 0x10; break; case '?': case _0x1dacf6[_0x40bca5(0x519)]: _0x5a0e23 = 0x174c + -0x1 * -0x26c9 + 0x3e13 * -0x1; break; case _0x1dacf6[_0x40bca5(0xb08)]: case _0x1dacf6[_0x40bca5(0x510)]: case _0x1dacf6[_0x40bca5(0x4a7)]: case _0x1dacf6[_0x40bca5(0x9f8)]: case _0x1dacf6[_0x40bca5(0xa48)]: _0x5a0e23 = -0x1 * -0x2d7 + -0xacf * 0x1 + 0x7fb; break; case _0x1dacf6['jKDLX']: case _0x1dacf6['OSEVe']: _0x5a0e23 = -0xf0d * 0x1 + -0x1fd9 + -0x2eea * -0x1; break; case _0x1dacf6[_0x40bca5(0xad7)]: _0x5a0e23 = -0x12c6 + -0x250f * -0x1 + -0x1244; break; case _0x1dacf6[_0x40bca5(0x700)]: _0x5a0e23 = 0x1 * -0x1365 + -0x225 + 0x8 * 0x2b2; break; case _0x1dacf6['Darpx']: case _0x1dacf6[_0x40bca5(0x44a)]: case _0x1dacf6[_0x40bca5(0x9fe)]: _0x5a0e23 = 0x1d * 0x56 + -0x1725 + 0x3 * 0x47a; break; case _0x1dacf6[_0x40bca5(0x634)]: case _0x1dacf6[_0x40bca5(0xa09)]: _0x5a0e23 = 0x370 + -0x782 * 0x3 + 0x131e * 0x1; break; case _0x1dacf6[_0x40bca5(0x285)]: case _0x1dacf6[_0x40bca5(0x41d)]: case _0x1dacf6[_0x40bca5(0x42b)]: case _0x1dacf6['UzJKX']: case _0x1dacf6['eOnpe']: _0x5a0e23 = 0xb0b + 0x368 * 0x5 + 0x1c0a * -0x1; break; case 'Z': case 'ZZ': case _0x1dacf6[_0x40bca5(0x3dd)]: case _0x1dacf6[_0x40bca5(0x2b2)]: _0x5a0e23 = 0x1316 + 0xe26 + -0x2132; break; case _0x1dacf6[_0x40bca5(0xaa3)]: _0x5a0e23 = 0x199 * -0x2 + -0x25d6 + -0x3 * -0xdb1; break; case _0x1dacf6[_0x40bca5(0x4e5)]: _0x5a0e23 = -0x1272 + -0x1d1 * 0xe + 0xafb * 0x4; break; case _0x1dacf6[_0x40bca5(0xb64)]: _0x5a0e23 = 0xd3f + 0x997 + 0x13 * -0x133; break; case _0x1dacf6[_0x40bca5(0x8ab)]: _0x5a0e23 = 0xd * -0xf7 + 0x1 * -0xb3a + 0x17d3; break; case _0x1dacf6[_0x40bca5(0x589)]: _0x5a0e23 = 0x26e8 + 0x19c5 + -0x6 * 0xac5; break; }$gameTemp[_0x40bca5(0x905) + 'loon'](this, _0x5a0e23); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x763) + 'In'] = function (_0xb275f7) { const _0x2b6e06 = _0x2542b2, _0x3b9f99 = { 'WPOAc': function (_0x2b76d8, _0x54eed8) { return _0x2b76d8 < _0x54eed8; } }; _0xb275f7 += this['_opacity'], this[_0x2b6e06(0x782)](_0xb275f7['clamp'](-0x3ed + 0x33 * 0x22 + -0x2d9, 0x208f + 0x378 + -0x13 * 0x1d8)); if (_0x3b9f99[_0x2b6e06(0x379)](this['_opacity'], -0x1 * 0x17c7 + -0x7c * 0x1f + 0x16 * 0x1cf)) this['_moveRoute' + 'Index']--; }, Game_Character[_0x2542b2(0x336)]['processMov' + _0x2542b2(0x763) + _0x2542b2(0x94b)] = function (_0x1d89dc) { const _0x933cb7 = _0x2542b2, _0xce56ca = { 'NBZOT': function (_0x35ad5b, _0x4bf921) { return _0x35ad5b - _0x4bf921; }, 'khfTm': function (_0x44c60e, _0x3fb547) { return _0x44c60e > _0x3fb547; } }; _0x1d89dc = _0xce56ca[_0x933cb7(0x783)](this['_opacity'], _0x1d89dc), this[_0x933cb7(0x782)](_0x1d89dc[_0x933cb7(0x6b4)](0xb49 + -0x494 * 0x4 + -0x7 * -0x101, 0x1f74 + -0x1d6e * 0x1 + -0x107)); if (_0xce56ca[_0x933cb7(0x39f)](this[_0x933cb7(0xa2b)], 0xf00 + -0xf * 0x1d8 + -0x9 * -0x168)) this[_0x933cb7(0x5a8) + 'Index']--; }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x53c) + 'all'] = function (_0x32503a) { const _0x17001a = _0x2542b2, _0x39b41f = { 'CoxgP': function (_0x46dde2, _0x138340) { return _0x46dde2 === _0x138340; }, 'WDbZc': 'left', 'FIRox': function (_0x2b5ff3, _0x23bb12) { return _0x2b5ff3 === _0x23bb12; }, 'USZSw': function (_0x457aed, _0x49046c) { return _0x457aed === _0x49046c; } }, _0x262555 = [-0xfb + -0x915 + 0x142 * 0x8, 0x1348 * 0x1 + 0x2 * -0xb47 + -0x349 * -0x1, -0x13a * 0x14 + -0xc9c + 0x252a, -0x43 * 0x85 + -0x11de + 0x34b6, 0x316 * -0x7 + -0x2053 + 0x35ef, 0x2323 + -0x2 * -0x163 + -0x25e9, 0x2 * 0x1fa + 0xe6f * -0x1 + 0xa83 * 0x1, -0x20c6 + 0x2 * -0x8d1 + -0x1bd * -0x1d, 0x160 + 0x1808 + -0x1964, 0x1aeb + 0xd5 * 0x3 + -0x1d63], _0x5b7a76 = [0x56b + -0x1c64 + 0x16f9, 0x1 * 0xe14 + -0x1 * -0x1bd2 + -0x29df, -0x28 * 0x99 + 0x1471 * -0x1 + -0x29 * -0x115, 0x2 * 0xe6b + 0x1 * 0xc01 + 0x1 * -0x28d6, 0x7 * 0x24d + 0x605 * -0x3 + -0x1 * -0x1fc, 0xe3 * 0x2a + -0x1173 + -0x13cb, -0x2 * 0x113f + -0x52e * 0x5 + 0x3c66, -0x2f2 * -0x7 + 0x8e1 * -0x1 + -0xbb4, -0x83 * 0x37 + 0xef7 + 0xd34, -0x1 * 0x198d + -0x1415 * 0x1 + 0xf37 * 0x3], _0x335c4b = this['direction'](), _0x57bacc = (_0x39b41f['CoxgP'](_0x32503a, _0x39b41f[_0x17001a(0x869)]) ? _0x262555 : _0x5b7a76)[_0x335c4b], _0x12bfdd = (_0x39b41f[_0x17001a(0x20f)](_0x32503a, _0x39b41f[_0x17001a(0x869)]) ? _0x5b7a76 : _0x262555)[_0x335c4b]; if (this['canPass'](this['x'], this['y'], _0x57bacc)) _0x39b41f['FIRox'](_0x32503a, _0x39b41f['WDbZc']) ? this[_0x17001a(0x67a)]() : this[_0x17001a(0x302) + '0'](); else !this[_0x17001a(0x648)](this['x'], this['y'], this['direction']()) && (this[_0x17001a(0x648)](this['x'], this['y'], _0x12bfdd) ? _0x39b41f[_0x17001a(0x43f)](_0x32503a, _0x39b41f[_0x17001a(0x869)]) ? this[_0x17001a(0x302) + '0']() : this[_0x17001a(0x67a)]() : this['turn180']()); this['canPass'](this['x'], this['y'], this[_0x17001a(0x7bc)]()) && this[_0x17001a(0x458) + 'd'](); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x7d8) + _0x2542b2(0x28a)] = function (_0x2765b3) { const _0x386298 = _0x2542b2; if (ImageManager[_0x386298(0x38f) + 'cter'](this[_0x386298(0xab0) + _0x386298(0x615)])) return; _0x2765b3 = _0x2765b3[_0x386298(0x6b4)](-0x7 * 0x2da + 0x1f64 + -0xb6e, 0x20ac + -0x857 + -0x184e), this[_0x386298(0x276)](this[_0x386298(0xab0) + _0x386298(0x615)], _0x2765b3); }, Game_Character[_0x2542b2(0x336)]['processMov' + _0x2542b2(0x2f5) + _0x2542b2(0x9fd)] = function (_0x5edfa4) { const _0x3b6fca = _0x2542b2; switch (this[_0x3b6fca(0x7bc)]()) { case -0x5 * -0x103 + 0x18a1 + -0x1daf: this[_0x3b6fca(0xa28)](-_0x5edfa4, _0x5edfa4); break; case 0xdb2 + -0x2a7 * -0x3 + 0x15a5 * -0x1: this[_0x3b6fca(0xa28)](0x1 * 0x1d3e + -0x1 * -0x1c13 + -0x3951, _0x5edfa4); break; case -0x4cd * 0x1 + 0xc21 + -0x751: this['jump'](_0x5edfa4, _0x5edfa4); break; case -0xd81 + 0x1b1f + -0xd9a: this[_0x3b6fca(0xa28)](-_0x5edfa4, 0xd85 + -0x1 * -0x201e + -0x2da3); break; case 0xd03 * 0x1 + -0x1150 + 0x453: this[_0x3b6fca(0xa28)](_0x5edfa4, 0xa55 * -0x3 + -0xb23 * -0x1 + -0x52 * -0x3e); break; case 0x251b + -0xb8f + -0x1 * 0x1985: this['jump'](-_0x5edfa4, -_0x5edfa4); break; case 0x22f3 + 0x16f0 + 0x39db * -0x1: this[_0x3b6fca(0xa28)](-0xfdf * 0x1 + -0x31 * -0xad + -0x113e, -_0x5edfa4); break; case 0x1 * -0x162a + 0x7a * 0x29 + 0x2a9: this[_0x3b6fca(0xa28)](_0x5edfa4, -_0x5edfa4); break; } }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x2f5) + 'To'] = function (_0x133328, _0x31e63d) { const _0x1c9fe0 = _0x2542b2, _0x44df58 = { 'hDfRV': function (_0x2c2abe, _0x5cb23e) { return _0x2c2abe - _0x5cb23e; } }, _0x5b6b7a = Math[_0x1c9fe0(0x3c7)](_0x44df58[_0x1c9fe0(0x4d0)](_0x133328, this['x'])), _0x149ce1 = Math[_0x1c9fe0(0x3c7)](_0x44df58[_0x1c9fe0(0x4d0)](_0x31e63d, this['y'])); this[_0x1c9fe0(0xa28)](_0x5b6b7a, _0x149ce1); }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0x2f5) + 'ToCharacte' + 'r'] = function (_0x3a7448) { const _0x4dc7f4 = _0x2542b2; if (_0x3a7448) this[_0x4dc7f4(0x868) + _0x4dc7f4(0x2f5) + 'To'](_0x3a7448['x'], _0x3a7448['y']); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0xb47) + 'To'] = function (_0x322144, _0x3fc220, _0x3ae2ac) { const _0x155e9e = _0x2542b2; let _0x547455 = 0x2 * -0xab5 + -0x131d + 0x2887; if (_0x3ae2ac) $gameTemp[_0x155e9e(0x9ef) + _0x155e9e(0x7d0) + 'ision'] = !![]; $gameMap['isSupportD' + _0x155e9e(0x9a5) + _0x155e9e(0x618)]() ? _0x547455 = this[_0x155e9e(0x449) + _0x155e9e(0x722) + _0x155e9e(0x5fa)](_0x322144, _0x3fc220) : _0x547455 = this[_0x155e9e(0x243) + 'ionTo'](_0x322144, _0x3fc220); if (_0x3ae2ac) $gameTemp[_0x155e9e(0x9ef) + _0x155e9e(0x7d0) + _0x155e9e(0x269)] = ![]; this['executeMov' + _0x155e9e(0x2f6)](_0x547455), this['setMovemen' + 'tSuccess'](!![]); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0xb47) + _0x2542b2(0xa1d) + 'r'] = function (_0x1bef10) { const _0x1922bd = _0x2542b2; if (_0x1bef10) this['processMov' + _0x1922bd(0xb47) + 'To'](_0x1bef10['x'], _0x1bef10['y']); }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0xb47) + _0x2542b2(0x932)] = function (_0x39f917, _0x3be567) { const _0x24a710 = _0x2542b2, _0xcc6d51 = this['deltaXFrom'](_0x39f917), _0x126a6f = this[_0x24a710(0x6bb)](_0x3be567); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0xb2c) + _0x2542b2(0x375) + 'ds'] = function (_0x2441b0) { const _0x565529 = _0x2542b2; if (_0x2441b0[_0x565529(0x4d6)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)) return !![]; else return _0x2441b0[_0x565529(0x4d6)](/(?:AVOID|EVADE|DODGE)/i) ? ![] : ![]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Event' + '_isCollide' + 'dWithPlaye' + 'rCharacter' + 's'] = Game_Event['prototype'][_0x2542b2(0xaeb) + _0x2542b2(0x4a9) + _0x2542b2(0xa9c)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0xaeb) + _0x2542b2(0x4a9) + _0x2542b2(0xa9c)] = function (_0x4c17d1, _0x52144c) { const _0x14ff71 = _0x2542b2; if ($gameTemp['_moveAllow' + _0x14ff71(0x7d0) + 'ision']) return ![]; return VisuMZ[_0x14ff71(0x6af) + _0x14ff71(0x53e)][_0x14ff71(0x6ce) + '_isCollide' + 'dWithPlaye' + _0x14ff71(0xb4d) + 's'][_0x14ff71(0x325)](this, _0x4c17d1, _0x52144c); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x3ff) + _0x2542b2(0xa3f)] = function (_0x4b280b, _0x13d693) { const _0xe16a3e = _0x2542b2, _0x10771f = { 'GVsFa': _0xe16a3e(0x4cd), 'VnpwP': _0xe16a3e(0x787), 'KaxYL': 'LOWER\x20RIGH' + 'T', 'PuCXC': 'LEFT', 'jfHxq': _0xe16a3e(0x42d), 'RIxbp': 'UPPER\x20LEFT', 'NAqfX': _0xe16a3e(0x7e3) + 'T', 'Pkcfq': function (_0x597752, _0x19b4df) { return _0x597752 <= _0x19b4df; } }, _0x40f3b6 = ['', _0x10771f[_0xe16a3e(0x4f4)], _0x10771f[_0xe16a3e(0x6a5)], _0x10771f[_0xe16a3e(0x73d)], _0x10771f['PuCXC'], '', _0x10771f[_0xe16a3e(0x7d3)], _0x10771f[_0xe16a3e(0x2a4)], 'UP', _0x10771f['NAqfX']], _0x1a4a15 = _0x40f3b6[_0xe16a3e(0x75c)](_0x4b280b['toUpperCas' + 'e']()[_0xe16a3e(0x7fa)]()); if (_0x10771f[_0xe16a3e(0xaa0)](_0x1a4a15, 0x16bb + 0xb27 + -0x21e2 * 0x1)) return; if (_0x13d693) $gameTemp[_0xe16a3e(0x9ef) + _0xe16a3e(0x7d0) + _0xe16a3e(0x269)] = !![]; if (this['canPass'](this['x'], this['y'], _0x1a4a15)) { if (_0x13d693) $gameTemp['_moveAllow' + _0xe16a3e(0x7d0) + 'ision'] = ![]; this[_0xe16a3e(0x27b) + _0xe16a3e(0x2f6)](_0x1a4a15), this['_moveRoute' + 'Index'] -= 0x257 * -0x5 + 0x1b49 + 0xf95 * -0x1; } if (_0x13d693) $gameTemp[_0xe16a3e(0x9ef) + _0xe16a3e(0x7d0) + _0xe16a3e(0x269)] = ![]; }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x3ff) + 'To'] = function (_0x4fcb9b, _0x4bf5f8, _0xdf68b4) { const _0x402847 = _0x2542b2, _0x28ea40 = { 'jUaWs': function (_0x5aa02b, _0xce67f6) { return _0x5aa02b !== _0xce67f6; } }; this['processMov' + _0x402847(0xb47) + 'To'](_0x4fcb9b, _0x4bf5f8, _0xdf68b4); if (_0x28ea40['jUaWs'](this['x'], _0x4fcb9b) || _0x28ea40[_0x402847(0x897)](this['y'], _0x4bf5f8)) this[_0x402847(0x5a8) + _0x402847(0x383)]--; }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x3ff) + _0x2542b2(0xa1d) + 'r'] = function (_0x4c85e6, _0x2dd3ba) { const _0x5b098c = _0x2542b2, _0x40ebc1 = { 'OJChQ': function (_0x3017c5, _0x4968f3) { return _0x3017c5 <= _0x4968f3; } }; if (_0x4c85e6 && !_0x4c85e6[_0x5b098c(0x4e2)]) { this[_0x5b098c(0x868) + _0x5b098c(0x3ff) + 'To'](_0x4c85e6['x'], _0x4c85e6['y'], _0x2dd3ba); if (_0x4c85e6[_0x5b098c(0x3c2) + _0x5b098c(0xa0f)]() && this[_0x5b098c(0x3c2) + _0x5b098c(0xa0f)]()) { const _0x5b018b = $gameMap[_0x5b098c(0x25b)](this['x'], this['y'], _0x4c85e6['x'], _0x4c85e6['y']); if (_0x40ebc1[_0x5b098c(0x681)](_0x5b018b, -0x3ea + -0x465 + 0x4c * 0x1c)) this[_0x5b098c(0x5a8) + 'Index']++; } } }, Game_Character[_0x2542b2(0x336)]['processMov' + 'eRouteMove' + _0x2542b2(0x857)] = function (_0xbf25bc, _0x137aa1) { const _0x57df48 = _0x2542b2, _0x32247c = { 'hrtmT': function (_0x2427a3, _0x4146e9) { return _0x2427a3 || _0x4146e9; }, 'Fzsmf': function (_0x46cfdc, _0x6dbe44) { return _0x46cfdc + _0x6dbe44; } }; _0x137aa1 = _0x32247c[_0x57df48(0xac8)](_0x137aa1, -0x139d + 0x117 * 0x1d + -0xbfe); const _0x15f5fe = { 'code': 0x1, 'indent': null, 'parameters': [] }; _0x15f5fe[_0x57df48(0x9bb)] = [0x1 * 0x1e3b + -0x187a + -0x5c1, 0xf4a + 0x4af + 0x9fa * -0x2, 0x366 + -0x2 * 0x524 + -0x29 * -0x2b, -0x26c7 + 0x72f * 0x3 + 0x1140, -0x154e + -0x99a + 0x1eea, 0x2502 + -0x14e * -0x5 + -0xc7 * 0x38, -0xa84 * 0x1 + -0xa65 + -0x2 * -0xa76, -0x397 * 0x9 + 0xd08 + 0x134e, -0x1cb4 * 0x1 + -0x6d1 * 0x5 + -0x45 * -0xe9, -0x519 * 0x3 + 0xf25 * -0x2 + 0x1 * 0x2d9d][_0xbf25bc], this[_0x57df48(0x5a8)]['list'][this[_0x57df48(0x5a8) + _0x57df48(0x383)]][_0x57df48(0x71a)][0x24b5 + -0x3e + -0x2477] = ''; while (_0x137aa1--) { this[_0x57df48(0x5a8)]['list'][_0x57df48(0xa21)](_0x32247c[_0x57df48(0x738)](this['_moveRoute' + _0x57df48(0x383)], -0x5 * -0x2c + 0x25c1 + 0x269c * -0x1), -0x737 * -0x3 + -0x1cad + 0x708, _0x15f5fe); } }, Game_Character['prototype'][_0x2542b2(0x868) + 'eRoutePatt' + 'ernLock'] = function (_0xe71a01) { this['_patternLo' + 'cked'] = !![], this['setPattern'](_0xe71a01); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x3f7) + 'Switch'] = function (_0x1370d9, _0x25338f) { const _0x885425 = _0x2542b2, _0x5f5d32 = { 'dxxbZ': function (_0x1b9632, _0xa7be9b) { return _0x1b9632 === _0xa7be9b; }, 'VKrdR': function (_0x3b338b, _0x3b8465) { return _0x3b338b(_0x3b8465); }, 'iepis': _0x885425(0xa60) + _0x885425(0x2a3), 'AFVON': _0x885425(0xb45), 'qcOyV': _0x885425(0xa2f), 'uUVaD': 'FALSE', 'fxgKo': _0x885425(0x429) }; if (_0x5f5d32[_0x885425(0x53f)](this, $gamePlayer)) return; const _0x1ff6c2 = [this[_0x885425(0x5dc)], this['_eventId'], 'A']; _0x1370d9['match'](/\b[ABCD]\b/i) ? _0x1ff6c2[-0x1455 + 0x1 * -0x1835 + 0x1 * 0x2c8c] = _0x5f5d32[_0x885425(0x647)](String, _0x1370d9)[_0x885425(0x866)](0xcc5 + 0x92 * -0x12 + 0x281 * -0x1)[_0x885425(0x564) + 'e']()[_0x885425(0x7fa)]() : _0x1ff6c2[0x8ec + 0x1 * 0x1d5f + -0x2649] = _0x5f5d32[_0x885425(0x5a2)][_0x885425(0x2c1)](_0x1370d9); switch (_0x25338f[_0x885425(0x564) + 'e']()[_0x885425(0x7fa)]()) { case 'ON': case _0x5f5d32[_0x885425(0x83b)]: $gameSelfSwitches['setValue'](_0x1ff6c2, !![]); break; case _0x5f5d32[_0x885425(0x7da)]: case _0x5f5d32[_0x885425(0x490)]: $gameSelfSwitches[_0x885425(0x238)](_0x1ff6c2, ![]); break; case _0x5f5d32[_0x885425(0x244)]: $gameSelfSwitches[_0x885425(0x238)](_0x1ff6c2, !$gameSelfSwitches[_0x885425(0x872)](_0x1ff6c2)); break; } }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x3f7) + _0x2542b2(0x362)] = function (_0x59c6bd, _0x5db12b) { const _0x2fa4d5 = _0x2542b2, _0xca2b40 = { 'bVODm': function (_0x437628, _0x1a97cf) { return _0x437628 === _0x1a97cf; }, 'hErie': 'Self\x20Varia' + _0x2fa4d5(0x8b3), 'hxaem': function (_0x3ab30a, _0x5baa29) { return _0x3ab30a(_0x5baa29); } }; if (_0xca2b40[_0x2fa4d5(0x26c)](this, $gamePlayer)) return; const _0x8a84a5 = [this[_0x2fa4d5(0x5dc)], this[_0x2fa4d5(0x923)], _0xca2b40['hErie'][_0x2fa4d5(0x2c1)](_0x59c6bd)]; $gameSelfSwitches[_0x2fa4d5(0x238)](_0x8a84a5, _0xca2b40[_0x2fa4d5(0x3de)](Number, _0x5db12b)); }, Game_Character['prototype'][_0x2542b2(0x868) + _0x2542b2(0x6d4) + 'portTo'] = function (_0x142251, _0x61ddbd) { this['locate'](_0x142251, _0x61ddbd); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x6d4) + _0x2542b2(0x536) + _0x2542b2(0x8ee)] = function (_0x1be0e1) { const _0x5748c1 = _0x2542b2; if (_0x1be0e1) this[_0x5748c1(0x868) + 'eRouteTele' + _0x5748c1(0x8c7)](_0x1be0e1['x'], _0x1be0e1['y']); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x302) + '0'] = function () { const _0x48ded6 = _0x2542b2; switch (this['direction']()) { case -0x2e * 0x5 + 0x150e + -0x1 * 0x1427: this[_0x48ded6(0x4c3) + 'on'](-0xc77 * 0x2 + 0x438 + -0x14bd * -0x1); break; case 0xcb7 * -0x3 + 0x5c0 + 0x2067: this['setDirecti' + 'on'](-0xc52 + -0x1e26 + -0x4 * -0xa9f); break; case -0xc0 + -0x4e3 * -0x4 + -0x2af * 0x7: this[_0x48ded6(0x4c3) + 'on'](0xdef + -0x3 * 0x4a + 0x98 * -0x16); break; case -0x272 * -0x3 + 0x1037 + 0x19 * -0xf1: this[_0x48ded6(0x4c3) + 'on'](0x7 * 0x4eb + -0x3 * -0xca9 + -0x2 * 0x2430); break; case 0xe09 + 0x1 * -0x1c8e + 0xe8b: this[_0x48ded6(0x4c3) + 'on'](0x868 + -0x472 * 0x2 + 0x7e); break; case -0x9be + 0x1 * -0x16e5 + 0x20aa: this[_0x48ded6(0x4c3) + 'on'](0x786 + -0x1 * -0x14b1 + 0xe17 * -0x2); break; case 0x8dd + 0x1 * -0xddc + 0x507: this[_0x48ded6(0x4c3) + 'on'](-0x8d5 + -0x1e3 * 0x2 + 0xca1); break; case 0x79b * 0x3 + 0x23b8 + -0x3a80: this[_0x48ded6(0x4c3) + 'on'](0x7a * -0x4a + 0x1ad5 + 0x872); break; } }, Game_Character['prototype'][_0x2542b2(0x67a)] = function () { const _0x3eb979 = _0x2542b2; switch (this['direction']()) { case 0xb5a + 0x100 + 0x1 * -0xc59: this['setDirecti' + 'on'](0xc30 + -0xe * 0x283 + 0x16fd); break; case -0x9ed + 0xd1 * -0x5 + 0x9c * 0x17: this['setDirecti' + 'on'](-0x22bb * -0x1 + 0x7 * 0x8 + -0x22ed * 0x1); break; case 0x3 * -0xa69 + -0x23 * 0x11a + 0x45cc: this[_0x3eb979(0x4c3) + 'on'](-0x11c0 + -0xbdf + 0x1da8); break; case -0x5 * -0x733 + 0x59f + -0x299a: this[_0x3eb979(0x4c3) + 'on'](-0x1bc5 + 0x1 * 0xff3 + -0x1 * -0xbd4); break; case -0x26eb + -0x1ff * 0x7 + -0x1 * -0x34ea: this[_0x3eb979(0x4c3) + 'on'](0x239b * 0x1 + -0x1 * -0xe9d + -0x3230); break; case -0x1b7 * -0x15 + 0xd4 + 0x4c * -0x7c: this[_0x3eb979(0x4c3) + 'on'](-0xb46 + -0x120f * 0x1 + 0x5de * 0x5); break; case -0x2577 + -0x563 * -0x5 + 0xa90: this[_0x3eb979(0x4c3) + 'on'](0x1116 * -0x1 + -0x9b4 * -0x1 + 0x766 * 0x1); break; case 0x1d1f + 0xd26 + 0x6a * -0x66: this[_0x3eb979(0x4c3) + 'on'](-0x24e9 + -0x1 * 0x131a + 0x380a); break; } }, Game_Character[_0x2542b2(0x336)]['getDirecti' + _0x2542b2(0x53a)] = function (_0x5beb96, _0x52f129, _0x335797) { const _0x213906 = _0x2542b2, _0x2f47e4 = { 'ddqJt': function (_0x110b80, _0x51f759) { return _0x110b80 > _0x51f759; }, 'iagpW': function (_0xb28e0, _0x57630f) { return _0xb28e0 < _0x57630f; }, 'mIQfI': function (_0x567159, _0x4959d8) { return _0x567159 < _0x4959d8; }, 'oFwuH': function (_0x156660, _0x2790a7) { return _0x156660 !== _0x2790a7; } }, _0x36fa4c = this[_0x213906(0x745)](_0x5beb96), _0x10c3bb = this['deltaYFrom'](_0x52f129); if ($gameMap['isSupportD' + _0x213906(0x9a5) + _0x213906(0x618)]()) { if (_0x335797 || this['isSpriteVS' + '8dir']()) { if (_0x2f47e4['ddqJt'](_0x36fa4c, 0xa2 * 0x19 + -0x1f63 + 0xf91) && _0x2f47e4['iagpW'](_0x10c3bb, 0x3b * 0x65 + 0x53 * -0x3c + -0x3d3)) return 0x2 * 0x12a8 + -0x11 * 0x15d + -0x12 * 0xc9; if (_0x2f47e4['iagpW'](_0x36fa4c, 0x118 * -0x22 + -0x11bc + 0x36ec) && _0x2f47e4[_0x213906(0x93d)](_0x10c3bb, 0x649 + 0x7f * 0xe + -0xd3b)) return 0x237e + 0x2617 + -0x4992; if (_0x2f47e4[_0x213906(0x775)](_0x36fa4c, -0x21a7 + 0x3 * -0x6b9 + 0x35d2) && _0x2f47e4[_0x213906(0x775)](_0x10c3bb, 0xb * -0x328 + -0x1f91 + -0x1 * -0x4249)) return 0x197 * -0x2 + -0x1 * 0x1d81 + 0x9e * 0x35; if (_0x2f47e4['mIQfI'](_0x36fa4c, 0x16e * 0x1b + -0x169d + -0xffd) && _0x2f47e4['ddqJt'](_0x10c3bb, 0x1bd1 + 0xa * 0x26f + -0x3427)) return -0xdbe + -0x87f + 0x1646; } } if (_0x2f47e4['ddqJt'](Math[_0x213906(0x620)](_0x36fa4c), Math[_0x213906(0x620)](_0x10c3bb))) return _0x2f47e4['ddqJt'](_0x36fa4c, 0x1da8 + 0x1f7b * 0x1 + 0x14d * -0x2f) ? 0x72a * 0x5 + 0x4d * -0x5b + -0x1 * 0x86f : -0x1 * 0x177d + -0x1 * 0x833 + 0x12 * 0x1c3; else { if (_0x2f47e4[_0x213906(0x5e6)](_0x10c3bb, 0xff3 + 0x7c6 + 0x17b9 * -0x1)) return _0x2f47e4[_0x213906(0x775)](_0x10c3bb, 0xdeb + -0x4 * 0x387 + -0x31 * -0x1) ? 0x317 * -0x2 + -0x19d3 + 0x8b * 0x3b : -0x81d * 0x3 + -0x1b24 + -0x1 * -0x337d; } return 0x2458 * -0x1 + -0x319 * 0x3 + 0x2da3; }, Game_Character[_0x2542b2(0x336)]['getDirecti' + _0x2542b2(0x849) + 't'] = function (_0x4fe5c1, _0x280acb, _0x5a02ae) { const _0x5df21b = _0x2542b2, _0x3e4906 = { 'BVaOw': function (_0x3e587a, _0x4c97c2) { return _0x3e587a > _0x4c97c2; }, 'cxykP': function (_0x4dfa04, _0x981139) { return _0x4dfa04 < _0x981139; }, 'fduMH': function (_0x5c3f55, _0x362448) { return _0x5c3f55 < _0x362448; }, 'pMHJL': function (_0x24c78e, _0x1f2fc2) { return _0x24c78e > _0x1f2fc2; }, 'ZpZvz': function (_0x329084, _0x38b726) { return _0x329084 < _0x38b726; }, 'FDoWD': function (_0x52fd11, _0x222402) { return _0x52fd11 > _0x222402; }, 'OJKDs': function (_0x31604d, _0x3be3a1) { return _0x31604d !== _0x3be3a1; }, 'fVeFg': function (_0x3228da, _0x53960e) { return _0x3228da > _0x53960e; } }, _0x553f8f = this[_0x5df21b(0x745)](_0x4fe5c1), _0x210d9e = this[_0x5df21b(0x6bb)](_0x280acb); if ($gameMap[_0x5df21b(0x599) + _0x5df21b(0x9a5) + _0x5df21b(0x618)]()) { if (_0x5a02ae || this['isSpriteVS' + '8dir']()) { if (_0x3e4906[_0x5df21b(0x8c1)](_0x553f8f, 0xca3 + 0x2 * -0x820 + -0x1 * -0x39d) && _0x3e4906[_0x5df21b(0x7f4)](_0x210d9e, -0x1da7 * -0x1 + -0x1998 + -0x40f)) return -0x11e1 + 0x1d2 * -0x4 + 0x1932; if (_0x3e4906[_0x5df21b(0x7f4)](_0x553f8f, 0xf3f + -0x20a0 + 0x1161) && _0x3e4906[_0x5df21b(0x85d)](_0x210d9e, 0x116 * 0x17 + 0x11f * 0xd + -0x2d * 0xe1)) return 0x15c4 + 0x80c + -0x3d * 0x7d; if (_0x3e4906['pMHJL'](_0x553f8f, 0x22f * 0x10 + 0x12b4 + -0x1 * 0x35a4) && _0x3e4906['pMHJL'](_0x210d9e, -0x950 + -0x2158 * 0x1 + 0x2aa8)) return 0xe9a + 0x3b * 0x37 + 0x4 * -0x6d1; if (_0x3e4906[_0x5df21b(0x320)](_0x553f8f, 0x16a * -0x1 + -0x1ed0 + 0x1e * 0x113) && _0x3e4906['BVaOw'](_0x210d9e, 0xf24 + -0xd * 0x5 + -0xee3)) return -0x160a + 0x7 * 0x51f + -0x72 * 0x1f; } } if (_0x3e4906[_0x5df21b(0x8c1)](Math['abs'](_0x553f8f), Math[_0x5df21b(0x620)](_0x210d9e))) return _0x3e4906[_0x5df21b(0x594)](_0x553f8f, -0x1d7c + -0x4c * 0x6d + 0x3dd8 * 0x1) ? 0x1269 * 0x1 + -0xcd * 0x1f + 0x670 : -0x26e0 * -0x1 + -0x1f10 + 0x7cc * -0x1; else { if (_0x3e4906[_0x5df21b(0x5a9)](_0x210d9e, -0x1c86 + -0xd95 + 0x2a1b)) return _0x3e4906['fVeFg'](_0x210d9e, -0x1916 + 0xf6 + 0x1820) ? -0x1b17 * -0x1 + 0x234f + -0xf99 * 0x4 : 0x139a + 0x29c + -0x14e * 0x11; } return 0x9a6 + 0x62 + -0xa08; }, Game_Character['prototype'][_0x2542b2(0xa77) + _0x2542b2(0x853)] = function (_0x178f07, _0x33562f) { const _0x167b2b = _0x2542b2, _0x199c4b = this[_0x167b2b(0x96c) + _0x167b2b(0x53a)](_0x178f07, _0x33562f, !![]); if (_0x199c4b) this['executeMov' + _0x167b2b(0x2f6)](_0x199c4b); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x9d5) + _0x2542b2(0x51f)] = function (_0xc2b13f, _0x11efb6) { const _0x2e2c57 = _0x2542b2, _0x56a161 = this[_0x2e2c57(0x96c) + _0x2e2c57(0x849) + 't'](_0xc2b13f, _0x11efb6, !![]); if (_0x56a161) this['executeMov' + 'eDir8'](_0x56a161); }, Game_Character['prototype'][_0x2542b2(0x703) + 'Point'] = function (_0x294c21, _0x41baa7) { const _0x5d667a = _0x2542b2, _0x44ccc6 = this['getDirecti' + _0x5d667a(0x53a)](_0x294c21, _0x41baa7, ![]); if (_0x44ccc6) this[_0x5d667a(0x4c3) + 'on'](_0x44ccc6); }, Game_Character['prototype']['turnAwayFr' + 'omPoint'] = function (_0x25a6c2, _0x5d26fb) { const _0x3559b2 = _0x2542b2, _0x37ffb6 = this[_0x3559b2(0x96c) + _0x3559b2(0x849) + 't'](_0x25a6c2, _0x5d26fb, ![]); if (_0x37ffb6) this['setDirecti' + 'on'](_0x37ffb6); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0xa77) + _0x2542b2(0x23b)] = function (_0x1c8827) { const _0x465b60 = _0x2542b2; if (_0x1c8827) this[_0x465b60(0xa77) + _0x465b60(0x853)](_0x1c8827['x'], _0x1c8827['y']); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x9d5) + 'omCharacte' + 'r'] = function (_0x3a1f75) { const _0x2e696d = _0x2542b2; if (_0x3a1f75) this[_0x2e696d(0x9d5) + _0x2e696d(0x51f)](_0x3a1f75['x'], _0x3a1f75['y']); }, Game_Character[_0x2542b2(0x336)]['turnToward' + 'Character'] = function (_0x464557) { const _0x120557 = _0x2542b2; if (_0x464557) this[_0x120557(0x703) + _0x120557(0x853)](_0x464557['x'], _0x464557['y']); }, Game_Character[_0x2542b2(0x336)][_0x2542b2(0x9a6) + _0x2542b2(0x66a) + 'r'] = function (_0x164d65) { const _0x1f4c92 = _0x2542b2; if (_0x164d65) this[_0x1f4c92(0x9a6) + _0x1f4c92(0x51f)](_0x164d65['x'], _0x164d65['y']); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Game_Playe' + 'r_isDashin' + 'g'] = Game_Player['prototype'][_0x2542b2(0x2cf)], Game_Player[_0x2542b2(0x336)][_0x2542b2(0x2cf)] = function () { const _0x4611c4 = _0x2542b2; if (!Game_CharacterBase[_0x4611c4(0x55e) + _0x4611c4(0x92b)] && this[_0x4611c4(0x8af)]()) return ![]; if (this['_forceDash' + _0x4611c4(0xa88)]) return !![]; return VisuMZ[_0x4611c4(0x6af) + 'Core'][_0x4611c4(0x526) + _0x4611c4(0x74d) + 'g'][_0x4611c4(0x325)](this); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x526) + _0x2542b2(0xa68) + _0x2542b2(0x61d)] = Game_Player[_0x2542b2(0x336)]['getInputDi' + _0x2542b2(0x918)], Game_Player['prototype'][_0x2542b2(0x88b) + 'rection'] = function () { const _0x356515 = _0x2542b2; return $gameMap[_0x356515(0x599) + _0x356515(0x9a5) + _0x356515(0x618)]() ? this['getInputDi' + 'r8']() : VisuMZ[_0x356515(0x6af) + _0x356515(0x53e)][_0x356515(0x526) + _0x356515(0xa68) + _0x356515(0x61d)][_0x356515(0x325)](this); }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0x88b) + 'r8'] = function () { const _0xe0fb8e = _0x2542b2; return Input[_0xe0fb8e(0x948)]; }, Game_Player['prototype'][_0x2542b2(0x8d3) + 't'] = function () { const _0x4fa094 = _0x2542b2, _0x306c6d = { 'EGbBn': function (_0x13a780, _0x1ba189) { return _0x13a780 > _0x1ba189; } }; if ($gameSystem[_0x4fa094(0x4f9) + _0x4fa094(0x22f) + _0x4fa094(0x6cd)]()) return 0xee + 0x21b3 * -0x1 + -0x1 * -0x20c5; if (!this[_0x4fa094(0x858)]() && this[_0x4fa094(0x6b7)]()) { let _0x56a762 = this[_0x4fa094(0x88b) + 'rection'](); if (_0x306c6d[_0x4fa094(0x95d)](_0x56a762, -0x2 * 0x24d + -0xb * -0x185 + 0x1 * -0xc1d)) $gameTemp[_0x4fa094(0x6d7) + 'nation'](); else { if ($gameTemp[_0x4fa094(0x924) + 'ionValid']()) { const _0x57980b = $gameTemp[_0x4fa094(0x95c) + 'nX'](), _0x4e2eaa = $gameTemp[_0x4fa094(0x95c) + 'nY'](); this[_0x4fa094(0x707) + 'lDestinati' + 'on'](_0x57980b, _0x4e2eaa) ? _0x56a762 = this[_0x4fa094(0x449) + _0x4fa094(0x722) + _0x4fa094(0x5fa)](_0x57980b, _0x4e2eaa) : _0x56a762 = this['findDirect' + _0x4fa094(0x315)](_0x57980b, _0x4e2eaa); } } _0x306c6d[_0x4fa094(0x95d)](_0x56a762, 0x1231 + 0x421 + -0x1652) ? (this['_inputTime'] = this[_0x4fa094(0xa2d)] || 0x18dd * -0x1 + 0x1a * 0x3d + 0x12ab, this[_0x4fa094(0x57b) + 'ace']() ? this[_0x4fa094(0x4c3) + 'on'](_0x56a762) : this[_0x4fa094(0x27b) + 'e'](_0x56a762), this[_0x4fa094(0xa2d)]++) : this[_0x4fa094(0xa2d)] = -0x96f + -0xed + 0x33 * 0x34; } }, Game_Player[_0x2542b2(0x336)]['isTurnInPl' + _0x2542b2(0x59c)] = function () { const _0x369956 = _0x2542b2, _0x45605f = { 'GtZpO': function (_0x41b57f, _0x584edd) { return _0x41b57f < _0x584edd; } }, _0x3780fe = VisuMZ['EventsMove' + 'Core'][_0x369956(0x2cc)][_0x369956(0x44e)]; if (!_0x3780fe['EnableTurn' + _0x369956(0xb4a)]) return ![]; if ($gameTemp[_0x369956(0x924) + _0x369956(0x82c)]()) return ![]; if (this[_0x369956(0x2cf)]() || this[_0x369956(0x858)]() || this[_0x369956(0x8af)]()) return ![]; return _0x45605f[_0x369956(0x245)](this[_0x369956(0xa2d)], _0x3780fe['TurnInPlac' + _0x369956(0x1ee)]); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Playe' + 'r_executeM' + 'ove'] = Game_Player['prototype'][_0x2542b2(0x27b) + 'e'], Game_Player[_0x2542b2(0x336)][_0x2542b2(0x27b) + 'e'] = function (_0x377807) { const _0x4c1b61 = _0x2542b2; $gameMap['isSupportD' + _0x4c1b61(0x9a5) + _0x4c1b61(0x618)]() ? this[_0x4c1b61(0x27b) + _0x4c1b61(0x2f6)](_0x377807) : VisuMZ[_0x4c1b61(0x6af) + _0x4c1b61(0x53e)][_0x4c1b61(0x526) + _0x4c1b61(0x27e) + _0x4c1b61(0x3b1)][_0x4c1b61(0x325)](this, _0x377807); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x526) + 'r_isMapPas' + _0x2542b2(0x332)] = Game_Player[_0x2542b2(0x336)][_0x2542b2(0x582) + 'ble'], Game_Player['prototype'][_0x2542b2(0x582) + _0x2542b2(0xa55)] = function (_0x2f0321, _0x42d84d, _0x3fa85c) { const _0x51eeb3 = _0x2542b2, _0x4dcd7c = { 'GqpOB': _0x51eeb3(0x823) }; if ($gameMap[_0x51eeb3(0x5ac) + 'lowPass'](_0x2f0321, _0x42d84d, _0x3fa85c, _0x4dcd7c[_0x51eeb3(0x4fd)])) return this[_0x51eeb3(0x30f) + 'e']() && this[_0x51eeb3(0xb41)]() ? this[_0x51eeb3(0xb41)]()['isMapPassa' + 'ble'](_0x2f0321, _0x42d84d, _0x3fa85c) : !![]; if ($gameMap[_0x51eeb3(0x65a) + _0x51eeb3(0x28c)](_0x2f0321, _0x42d84d, _0x3fa85c, _0x4dcd7c['GqpOB'])) return ![]; return VisuMZ[_0x51eeb3(0x6af) + _0x51eeb3(0x53e)]['Game_Playe' + _0x51eeb3(0x1f7) + _0x51eeb3(0x332)][_0x51eeb3(0x325)](this, _0x2f0321, _0x42d84d, _0x3fa85c); }, VisuMZ['EventsMove' + 'Core'][_0x2542b2(0x526) + 'r_checkEve' + 'ntTriggerH' + _0x2542b2(0x394)] = Game_Player['prototype'][_0x2542b2(0xb28) + 'TriggerHer' + 'e'], Game_Player['prototype'][_0x2542b2(0xb28) + 'TriggerHer' + 'e'] = function (_0x5e84c4) { const _0x17cb27 = _0x2542b2, _0x51e893 = { 'xLDlt': function (_0x325b6f, _0x2cb5c7) { return _0x325b6f === _0x2cb5c7; }, 'TRfTF': _0x17cb27(0x2c8) }; VisuMZ['EventsMove' + 'Core'][_0x17cb27(0x526) + _0x17cb27(0xa5e) + _0x17cb27(0x3d7) + 'ere'][_0x17cb27(0x325)](this, _0x5e84c4); if (this[_0x17cb27(0x760) + _0x17cb27(0x640)]()) { this[_0x17cb27(0xb28) + _0x17cb27(0x301) + _0x17cb27(0x48b) + 'e'](_0x5e84c4); if (_0x5e84c4[_0x17cb27(0x927)](0x1571 + -0x6 * 0x28d + -0x623 * 0x1) && _0x51e893[_0x17cb27(0x60f)](this[_0x17cb27(0xa85) + _0x17cb27(0xa04) + 'nOKTarget'](), _0x51e893[_0x17cb27(0x428)])) this['startMapCo' + _0x17cb27(0xa04) + _0x17cb27(0x6a9)](this['x'], this['y']); else (_0x5e84c4[_0x17cb27(0x927)](0x178a + -0x1 * -0x257c + -0x7f * 0x7b) || _0x5e84c4[_0x17cb27(0x927)](0x879 + -0x126e * 0x1 + 0x1 * 0x9f7)) && this['startMapCo' + _0x17cb27(0xa04) + _0x17cb27(0x9e5)](); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x526) + _0x2542b2(0xa5e) + _0x2542b2(0x4e3) + _0x2542b2(0x61e)] = Game_Player[_0x2542b2(0x336)][_0x2542b2(0xb28) + _0x2542b2(0x480) + 're'], Game_Player[_0x2542b2(0x336)]['checkEvent' + 'TriggerThe' + 're'] = function (_0x119a99) { const _0x177b43 = _0x2542b2, _0x3f5323 = { 'oLAGc': function (_0x594bde, _0x1c0176) { return _0x594bde === _0x1c0176; }, 'mqaez': _0x177b43(0x373) }; VisuMZ[_0x177b43(0x6af) + _0x177b43(0x53e)]['Game_Playe' + _0x177b43(0xa5e) + 'ntTriggerT' + 'here'][_0x177b43(0x325)](this, _0x119a99); if (this[_0x177b43(0x760) + _0x177b43(0x640)]() && _0x119a99[_0x177b43(0x927)](-0x2 * -0xe9c + -0xb * -0x201 + -0x3343) && _0x3f5323[_0x177b43(0xb05)](this[_0x177b43(0xa85) + _0x177b43(0xa04) + _0x177b43(0x93c)](), _0x3f5323[_0x177b43(0xa56)])) { const _0x28324f = this[_0x177b43(0x7bc)](), _0x509d0e = $gameMap[_0x177b43(0x91f) + _0x177b43(0x61d)](this['x'], _0x28324f), _0x5e2f51 = $gameMap[_0x177b43(0x799) + 'Direction'](this['y'], _0x28324f); this['startMapCo' + 'mmonEventO' + _0x177b43(0x6a9)](_0x509d0e, _0x5e2f51); } }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0xb28) + _0x2542b2(0x301) + _0x2542b2(0x48b) + 'e'] = function (_0x566ad7) { const _0x2c4638 = _0x2542b2; if ($gameMap['isEventRun' + 'ning']()) return; if ($gameMap[_0x2c4638(0x6ef) + _0x2c4638(0x6a3)]()) return; const _0x5b7800 = $gameMap[_0x2c4638(0xb16)](); for (const _0x381e44 of _0x5b7800) { if (!_0x381e44) continue; if (!_0x381e44['isTriggerI' + 'n'](_0x566ad7)) continue; if (this[_0x2c4638(0x913) + _0x2c4638(0x3e4) + _0x2c4638(0x20b)](_0x381e44)) return _0x381e44[_0x2c4638(0x357)](); if (this[_0x2c4638(0x913) + _0x2c4638(0x940) + _0x2c4638(0x442) + 'ons'](_0x381e44)) return _0x381e44[_0x2c4638(0x357)](); } }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0x913) + _0x2542b2(0x3e4) + _0x2542b2(0x20b)] = function (_0x38fc79) { const _0x1561a3 = _0x2542b2; if ($gameMap['isEventRun' + 'ning']()) return ![]; if ($gameMap[_0x1561a3(0x6ef) + 'Starting']()) return ![]; return _0x38fc79[_0x1561a3(0xb04) + _0x1561a3(0x5cd)]()[_0x1561a3(0x927)](this[_0x1561a3(0x29d)]()); }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0x913) + 'tionProxim' + _0x2542b2(0x442) + 'ons'] = function (_0x27b770) { const _0x522c5b = _0x2542b2, _0x1da24a = { 'rBXBS': _0x522c5b(0x3ab), 'Advwt': 'region' }; if ($gameMap['isEventRun' + _0x522c5b(0x809)]()) return ![]; if ($gameMap[_0x522c5b(0x6ef) + _0x522c5b(0x6a3)]()) return ![]; if ([_0x1da24a[_0x522c5b(0x9ec)], _0x1da24a[_0x522c5b(0x767)]]['includes'](_0x27b770[_0x522c5b(0xb04) + 'ProximityT' + _0x522c5b(0x830)]())) return ![]; const _0x5978b9 = _0x27b770[_0x522c5b(0xb04) + 'ProximityT' + _0x522c5b(0x830)](), _0x14802c = _0x27b770[_0x522c5b(0xb04) + 'ProximityD' + _0x522c5b(0x45a)](); return this['checkEvent' + _0x522c5b(0x275)](_0x27b770, _0x5978b9, _0x14802c); }, Game_Map['prototype'][_0x2542b2(0xb28) + _0x2542b2(0x275)] = function (_0x24d2b1, _0x8248c0, _0x3ccdd0, _0x1d56e4, _0x457fbf) { const _0x4e7370 = _0x2542b2, _0x3c4a77 = { 'yZpGp': _0x4e7370(0x484), 'FOcxX': function (_0x1d57a2, _0x3393c0) { return _0x1d57a2 >= _0x3393c0; }, 'XGrZI': _0x4e7370(0x856), 'bNQEt': function (_0x5f29a1, _0x30afe1) { return _0x5f29a1 - _0x30afe1; }, 'EydvH': function (_0x2b3af0, _0x24e1d1) { return _0x2b3af0 - _0x24e1d1; }, 'fnBFA': function (_0x518b99, _0x473f4b) { return _0x518b99 >= _0x473f4b; }, 'TFSdM': function (_0xda8cb7, _0x24d48d) { return _0xda8cb7 + _0x24d48d; }, 'LMMjI': 'radius', 'UToyh': _0x4e7370(0x7e0), 'jKHAB': function (_0x2fe0a6, _0x5a025a) { return _0x2fe0a6 >= _0x5a025a; }, 'agvvu': 'row', 'PLmLl': function (_0x525337, _0x3bbb27) { return _0x525337 >= _0x3bbb27; }, 'ZlVIr': _0x4e7370(0xa84), 'avxuv': function (_0x14eca4, _0x4a6f2f) { return _0x14eca4 >= _0x4a6f2f; } }; switch (_0x1d56e4) { case _0x3c4a77['yZpGp']: return _0x3c4a77[_0x4e7370(0x7de)](_0x457fbf, Math[_0x4e7370(0x620)](_0x3ccdd0[_0x4e7370(0x745)](_0x24d2b1))) && _0x3c4a77[_0x4e7370(0x7de)](_0x457fbf, Math[_0x4e7370(0x620)](_0x3ccdd0[_0x4e7370(0x6bb)](_0x8248c0))); break; case _0x3c4a77[_0x4e7370(0x969)]: const _0x4cc4e8 = Math[_0x4e7370(0x36a)](_0x3c4a77['bNQEt'](_0x3ccdd0['x'], _0x24d2b1), 0x1ed2 + 0x95 * 0x33 + -0x1 * 0x3c7f), _0x596371 = Math['pow'](_0x3c4a77['EydvH'](_0x3ccdd0['y'], _0x8248c0), 0x5cf * 0x5 + 0x238 * 0x11 + 0x42c1 * -0x1); return _0x3c4a77['fnBFA'](_0x457fbf, Math[_0x4e7370(0x3c7)](Math[_0x4e7370(0x49c)](_0x3c4a77[_0x4e7370(0x547)](_0x4cc4e8, _0x596371)))); break; case _0x3c4a77[_0x4e7370(0x585)]: case _0x3c4a77['UToyh']: const _0x176df5 = $gameMap[_0x4e7370(0x25b)](_0x24d2b1, _0x8248c0, _0x3ccdd0['x'], _0x3ccdd0['y']); return _0x3c4a77[_0x4e7370(0x235)](_0x3ccdd0[_0x4e7370(0xb04) + 'ProximityD' + 'istance'](), _0x176df5); break; case _0x3c4a77[_0x4e7370(0x8f2)]: return _0x3c4a77['PLmLl'](_0x457fbf, Math[_0x4e7370(0x620)](_0x3ccdd0['deltaYFrom'](_0x8248c0))); break; case _0x3c4a77[_0x4e7370(0x39c)]: return _0x3c4a77[_0x4e7370(0x84c)](_0x457fbf, Math[_0x4e7370(0x620)](_0x3ccdd0[_0x4e7370(0x745)](_0x24d2b1))); break; }return ![]; }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0xb28) + _0x2542b2(0x275)] = function (_0xb73d33, _0x277578, _0x340c19) { const _0xf5654e = _0x2542b2, _0x646a7d = this['x'], _0x3d80be = this['y']; return $gameMap[_0xf5654e(0xb28) + 'Proximity'](_0x646a7d, _0x3d80be, _0xb73d33, _0x277578, _0x340c19); }, Game_Player[_0x2542b2(0x336)][_0x2542b2(0xa85) + _0x2542b2(0xa04) + 'nOK'] = function (_0x3037b3, _0x2fadc7) { const _0x3ec736 = _0x2542b2, _0x2c61ed = { 'ETbpn': _0x3ec736(0x7be) }; if ($gameMap[_0x3ec736(0xb42) + 'ning']()) return; if ($gameMap['isAnyEvent' + _0x3ec736(0x6a3)]()) return; let _0x2f7a62 = VisuMZ[_0x3ec736(0x6af) + 'Core'][_0x3ec736(0x2cc)]['RegionOk'], _0x46c054 = $gameMap[_0x3ec736(0x29d)](_0x3037b3, _0x2fadc7); const _0x15b471 = _0x2c61ed[_0x3ec736(0x7d6)][_0x3ec736(0x2c1)](_0x46c054); _0x2f7a62[_0x15b471] && $gameTemp[_0x3ec736(0x81b) + 'monEvent'](_0x2f7a62[_0x15b471]); }, Game_Player[_0x2542b2(0x336)]['startMapCo' + _0x2542b2(0xa04) + _0x2542b2(0x93c)] = function () { const _0x81bfa5 = _0x2542b2; return VisuMZ[_0x81bfa5(0x6af) + _0x81bfa5(0x53e)][_0x81bfa5(0x2cc)][_0x81bfa5(0x5ca) + _0x81bfa5(0xa37)]; }, Game_Player['prototype'][_0x2542b2(0xa85) + _0x2542b2(0xa04) + _0x2542b2(0x9e5)] = function () { const _0x387032 = _0x2542b2, _0x1e352a = { 'NCwja': 'Region%1' }; if ($gameMap[_0x387032(0xb42) + _0x387032(0x809)]()) return; if ($gameMap[_0x387032(0x6ef) + _0x387032(0x6a3)]()) return; let _0x6d4a97 = VisuMZ[_0x387032(0x6af) + _0x387032(0x53e)][_0x387032(0x2cc)][_0x387032(0x212) + 'h']; const _0x231507 = _0x1e352a[_0x387032(0x6eb)][_0x387032(0x2c1)](this['regionId']()); _0x6d4a97[_0x231507] && $gameTemp[_0x387032(0x81b) + _0x387032(0xb49)](_0x6d4a97[_0x231507]); }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x526) + _0x2542b2(0xa18) + 'Steps'] = Game_Player[_0x2542b2(0x336)][_0x2542b2(0x751) + _0x2542b2(0x9c7)], Game_Player[_0x2542b2(0x336)][_0x2542b2(0x751) + _0x2542b2(0x9c7)] = function () { const _0x227689 = _0x2542b2; VisuMZ['EventsMove' + _0x227689(0x53e)]['Game_Playe' + _0x227689(0xa18) + _0x227689(0x727)]['call'](this), VisuMZ[_0x227689(0x939) + _0x227689(0xaad)](0xdcf + 0x133f + -0x210e * 0x1); }, Game_Player['prototype']['updateMove' + 'SynchDirec' + _0x2542b2(0x388)] = function () { const _0x25119e = _0x2542b2; VisuMZ[_0x25119e(0x7f2) + 'llSynchTar' + _0x25119e(0x9f4)](0xb3 + -0x1a4 + -0x1 * -0xf1); }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x418) + _0x2542b2(0x5cb) + _0x2542b2(0xb12)] = Game_Follower[_0x2542b2(0x336)][_0x2542b2(0x9f5)], Game_Follower['prototype'][_0x2542b2(0x9f5)] = function (_0x50e988) { const _0x58fe8f = _0x2542b2; VisuMZ['EventsMove' + _0x58fe8f(0x53e)]['Game_Follo' + _0x58fe8f(0x5cb) + _0x58fe8f(0xb12)]['call'](this, _0x50e988), this[_0x58fe8f(0x2b6)] = ![]; }, Game_Follower[_0x2542b2(0x336)][_0x2542b2(0x2cf)] = function () { const _0x4fd07e = _0x2542b2; if (this[_0x4fd07e(0x2b6)]) return Game_Character['prototype']['isDashing']['call'](this); return $gamePlayer['isDashing'](); }, Game_Follower[_0x2542b2(0x336)]['isDashingA' + _0x2542b2(0x9c5)] = function () { const _0x361723 = _0x2542b2; if (this['_chaseOff']) return Game_Character['prototype'][_0x361723(0x633) + 'ndMoving']['call'](this); return $gamePlayer[_0x361723(0x633) + _0x361723(0x9c5)]() && this[_0x361723(0xac7) + 'oving']; }, Game_Follower[_0x2542b2(0x336)][_0x2542b2(0x8b9) + _0x2542b2(0x284)] = function () { const _0xa8a94 = _0x2542b2; return $gamePlayer[_0xa8a94(0x8b9) + 'eed'](); }, Game_Follower[_0x2542b2(0x336)][_0x2542b2(0x860)] = function () { const _0x3d95e9 = _0x2542b2, _0x10a891 = { 'lnxZi': function (_0x234f3, _0x919798) { return _0x234f3 > _0x919798; } }; Game_Character[_0x3d95e9(0x336)][_0x3d95e9(0x860)][_0x3d95e9(0x325)](this), _0x10a891[_0x3d95e9(0x63f)](this[_0x3d95e9(0x8f5)], 0x23 * -0x15 + -0x2681 + 0x2960) && (this[_0x3d95e9(0xac7) + _0x3d95e9(0xb30)] = ![]); }, Game_Follower[_0x2542b2(0x336)][_0x2542b2(0x876) + 'f'] = function (_0xe6e105) { const _0x1f0b67 = _0x2542b2; this[_0x1f0b67(0x2b6)] = _0xe6e105; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Game_Follo' + _0x2542b2(0x5ff) + _0x2542b2(0x936)] = Game_Follower[_0x2542b2(0x336)]['chaseChara' + _0x2542b2(0xae3)], Game_Follower['prototype'][_0x2542b2(0x543) + 'cter'] = function (_0x56ce21) { const _0x3e3a10 = _0x2542b2; if (this[_0x3e3a10(0x2b6)]) return; if ($gameSystem[_0x3e3a10(0x919) + _0x3e3a10(0x211) + 'g']()) return; VisuMZ[_0x3e3a10(0x6af) + _0x3e3a10(0x53e)]['Game_Follo' + 'wer_chaseC' + _0x3e3a10(0x936)][_0x3e3a10(0x325)](this, _0x56ce21), this[_0x3e3a10(0xac7) + _0x3e3a10(0xb30)] = !![]; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x5fe) + _0x2542b2(0x454) + _0x2542b2(0x6bf)] = Game_Vehicle[_0x2542b2(0x336)][_0x2542b2(0x582) + 'ble'], Game_Vehicle[_0x2542b2(0x336)][_0x2542b2(0x582) + _0x2542b2(0xa55)] = function (_0x5e17e1, _0x3e026b, _0x1e4b92) { const _0x178f9d = _0x2542b2; if ($gameMap['isRegionAl' + 'lowPass'](_0x5e17e1, _0x3e026b, _0x1e4b92, this[_0x178f9d(0x257)])) return !![]; if ($gameMap[_0x178f9d(0x65a) + 'rbidPass'](_0x5e17e1, _0x3e026b, _0x1e4b92, this[_0x178f9d(0x257)])) return ![]; return VisuMZ[_0x178f9d(0x6af) + _0x178f9d(0x53e)][_0x178f9d(0x5fe) + _0x178f9d(0x454) + _0x178f9d(0x6bf)][_0x178f9d(0x325)](this, _0x5e17e1, _0x3e026b, _0x1e4b92); }, Game_Vehicle[_0x2542b2(0x336)][_0x2542b2(0x909) + 'assable'] = function (_0x242f19, _0x25907a, _0x29571f) { const _0x2094ac = _0x2542b2; if ($gameMap[_0x2094ac(0x5ac) + _0x2094ac(0x483)](_0x242f19, _0x25907a, _0x29571f, this[_0x2094ac(0x257)])) return !![]; if ($gameMap[_0x2094ac(0x65a) + _0x2094ac(0x28c)](_0x242f19, _0x25907a, _0x29571f, this['_type'])) return ![]; return VisuMZ[_0x2094ac(0x6af) + 'Core'][_0x2094ac(0x2a0) + 'cterBase_c' + 'anPass'][_0x2094ac(0x325)]($gamePlayer, _0x242f19, _0x25907a, _0x29571f); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Vehic' + _0x2542b2(0xa0d) + 'k'] = Game_Vehicle[_0x2542b2(0x336)]['isLandOk'], Game_Vehicle[_0x2542b2(0x336)]['isLandOk'] = function (_0x4f148d, _0x20e58f, _0x5ec413) { const _0x29aa9a = _0x2542b2, _0x5ccf17 = { 'Iixfh': function (_0x557871, _0x2dd724) { return _0x557871 + _0x2dd724; }, 'vvLuI': _0x29aa9a(0x26f) + _0x29aa9a(0x9ae) }; if ($gameMap['isRegionDo' + _0x29aa9a(0x3d9)](_0x4f148d, _0x20e58f, _0x5ec413, this[_0x29aa9a(0x257)])) return !![]; const _0x24e70e = _0x5ccf17[_0x29aa9a(0x4cb)](this[_0x29aa9a(0x257)]['charAt'](-0x1dbc + -0x1109 + 0x2ec5)[_0x29aa9a(0x564) + 'e'](), this['_type'][_0x29aa9a(0x241)](0x3d * 0x5f + -0x92b + -0xd77)), _0x1d2371 = _0x5ccf17[_0x29aa9a(0xa26)][_0x29aa9a(0x2c1)](_0x24e70e); return VisuMZ[_0x29aa9a(0x6af) + _0x29aa9a(0x53e)][_0x29aa9a(0x2cc)][_0x29aa9a(0x2d4)][_0x1d2371] ? ![] : VisuMZ['EventsMove' + _0x29aa9a(0x53e)]['Game_Vehic' + _0x29aa9a(0xa0d) + 'k'][_0x29aa9a(0x325)](this, _0x4f148d, _0x20e58f, _0x5ec413); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x5fe) + _0x2542b2(0x20d) + _0x2542b2(0x8cf)] = Game_Vehicle[_0x2542b2(0x336)][_0x2542b2(0x614) + _0x2542b2(0x284)], Game_Vehicle[_0x2542b2(0x336)][_0x2542b2(0x614) + _0x2542b2(0x284)] = function () { const _0x4dc8a8 = _0x2542b2; VisuMZ['EventsMove' + _0x4dc8a8(0x53e)][_0x4dc8a8(0x5fe) + _0x4dc8a8(0x20d) + 'eSpeed'][_0x4dc8a8(0x325)](this); const _0x44ae21 = VisuMZ[_0x4dc8a8(0x6af) + _0x4dc8a8(0x53e)][_0x4dc8a8(0x2cc)][_0x4dc8a8(0x44e)]; if (this[_0x4dc8a8(0x641)]()) { if (_0x44ae21[_0x4dc8a8(0x24f)]) this['setMoveSpe' + 'ed'](_0x44ae21['BoatSpeed']); } else { if (this[_0x4dc8a8(0x26e)]()) { if (_0x44ae21[_0x4dc8a8(0x94e)]) this['setMoveSpe' + 'ed'](_0x44ae21[_0x4dc8a8(0x94e)]); } else { if (this[_0x4dc8a8(0x871)]()) { if (_0x44ae21[_0x4dc8a8(0x827) + 'ed']) this[_0x4dc8a8(0x3e0) + 'ed'](_0x44ae21['AirshipSpe' + 'ed']); } } } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + _0x2542b2(0x24d) + 'e'] = Game_Event[_0x2542b2(0x336)]['initialize'], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x9f5)] = function (_0x1ebfe6, _0x4f8f2c) { const _0x5d6a28 = _0x2542b2, _0x53de61 = { 'ikcNb': _0x5d6a28(0x6b3) + '1' }, _0x28bda3 = _0x53de61[_0x5d6a28(0x4b0)]['split']('|'); let _0x16ccd0 = 0x81f + 0x12d * -0xd + 0x72a; while (!![]) { switch (_0x28bda3[_0x16ccd0++]) { case '0': this[_0x5d6a28(0x677) + 'Event'](); continue; case '1': this[_0x5d6a28(0x9b4) + 'edEventPos' + 'ition'](); continue; case '2': this['setupCopyE' + _0x5d6a28(0x3c5)](); continue; case '3': VisuMZ['EventsMove' + _0x5d6a28(0x53e)][_0x5d6a28(0x6ce) + _0x5d6a28(0x24d) + 'e'][_0x5d6a28(0x325)](this, _0x1ebfe6, _0x4f8f2c); continue; case '4': this[_0x5d6a28(0x7aa) + _0x5d6a28(0x9ed) + 'g'] = undefined; continue; case '5': this['_checkRelo' + _0x5d6a28(0x9ed) + 'g'] = !![]; continue; }break; } }, Game_Map['prototype']['referEvent'] = function (_0x516926, _0x1d71d0) { const _0x108c00 = _0x2542b2, _0x58a033 = { 'kRpbT': function (_0x1310e6, _0x3120b9) { return _0x1310e6 === _0x3120b9; } }; return _0x58a033[_0x108c00(0xb54)](_0x516926, $gameMap[_0x108c00(0x2b8)]()) ? $dataMap[_0x108c00(0xb16)][_0x1d71d0] : VisuMZ[_0x108c00(0x47f) + _0x108c00(0x901)][_0x516926][_0x108c00(0xb16)][_0x1d71d0]; }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x6ce) + _0x2542b2(0xab5)] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x264)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x264)] = function () { const _0x1a1117 = _0x2542b2, _0x577a46 = { 'cwITf': function (_0x5c1ed6, _0xfa7e8e) { return _0x5c1ed6 !== _0xfa7e8e; }, 'GUOYX': function (_0x54cbfd, _0x4c4636) { return _0x54cbfd !== _0x4c4636; }, 'EVFAz': function (_0x280798, _0x1cfa80) { return _0x280798 !== _0x1cfa80; } }; if (_0x577a46[_0x1a1117(0x80c)](this[_0x1a1117(0x369) + 'hData'], undefined)) { const _0x30c61e = this[_0x1a1117(0x369) + _0x1a1117(0x4c2)]['mapId'], _0x1c1d33 = this[_0x1a1117(0x369) + _0x1a1117(0x4c2)]['eventId']; return $gameMap[_0x1a1117(0x8ef)](_0x30c61e, _0x1c1d33); } if (_0x577a46[_0x1a1117(0x80c)](this[_0x1a1117(0x4eb) + _0x1a1117(0xa59)], undefined)) { const _0x371faa = this[_0x1a1117(0x4eb) + _0x1a1117(0xa59)][_0x1a1117(0x2b8)], _0x16dce0 = this[_0x1a1117(0x4eb) + _0x1a1117(0xa59)][_0x1a1117(0x478)]; return $gameMap[_0x1a1117(0x8ef)](_0x371faa, _0x16dce0); } if (_0x577a46['GUOYX'](this[_0x1a1117(0x25e) + _0x1a1117(0x8a6)], undefined)) { const _0x1c4d3a = this[_0x1a1117(0x25e) + 'nData'][_0x1a1117(0x2b8)], _0x4e2e14 = this[_0x1a1117(0x25e) + _0x1a1117(0x8a6)][_0x1a1117(0x478)]; return $gameMap[_0x1a1117(0x8ef)](_0x1c4d3a, _0x4e2e14); } if (_0x577a46[_0x1a1117(0x5c9)]($gameTemp[_0x1a1117(0x552)], undefined)) { const _0x9c7e14 = $gameTemp[_0x1a1117(0x552)]['mapId'], _0x2d04bb = $gameTemp[_0x1a1117(0x552)][_0x1a1117(0x478)]; return $gameMap[_0x1a1117(0x8ef)](_0x9c7e14, _0x2d04bb); } return VisuMZ[_0x1a1117(0x6af) + _0x1a1117(0x53e)][_0x1a1117(0x6ce) + _0x1a1117(0xab5)][_0x1a1117(0x325)](this); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x5e9) + _0x2542b2(0x522)] = function (_0x1af79f, _0x52c1a2) { const _0x1d31ac = _0x2542b2, _0x59b14f = { 'siWZi': function (_0x222ba5, _0x451a33) { return _0x222ba5 === _0x451a33; }, 'FjIUR': function (_0x34390f, _0x4e3579) { return _0x34390f !== _0x4e3579; }, 'XwEGH': _0x1d31ac(0x61c) + _0x1d31ac(0x381) + _0x1d31ac(0x4a5) + _0x1d31ac(0x5bf) + _0x1d31ac(0x29b) + _0x1d31ac(0x591) }; if (_0x59b14f[_0x1d31ac(0x279)](_0x1af79f, 0x61a + -0x12b0 + 0xc96) || _0x59b14f['siWZi'](_0x52c1a2, -0x8d * -0x33 + 0x1 * -0x1fd3 + -0x2 * -0x1de)) return ![]; if (_0x59b14f['siWZi'](_0x1af79f, $gameMap[_0x1d31ac(0x2b8)]())) return !![]; if (!VisuMZ[_0x1d31ac(0x47f) + 'aps'][_0x1af79f] && _0x59b14f[_0x1d31ac(0x26b)](_0x1af79f, $gameMap[_0x1d31ac(0x2b8)]())) return $gameTemp[_0x1d31ac(0x4e1)]() && console[_0x1d31ac(0x40c)](_0x59b14f['XwEGH'][_0x1d31ac(0x2c1)](_0x1af79f)), ![]; return !![]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + '_start'] = Game_Event['prototype'][_0x2542b2(0x357)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x357)] = function () { const _0x1f4fc1 = _0x2542b2; VisuMZ[_0x1f4fc1(0x6af) + _0x1f4fc1(0x53e)][_0x1f4fc1(0x6ce) + _0x1f4fc1(0x663)][_0x1f4fc1(0x325)](this), Imported[_0x1f4fc1(0x3bb) + _0x1f4fc1(0x333)] && Input[_0x1f4fc1(0xaee)](VisuMZ[_0x1f4fc1(0x9bf) + 'e'][_0x1f4fc1(0x2cc)][_0x1f4fc1(0x2cb)][_0x1f4fc1(0x54f) + 'dKey']) && Input[_0x1f4fc1(0x9ad)](); }, Game_Event['prototype'][_0x2542b2(0x565) + 'vent'] = function () { const _0x1ec918 = _0x2542b2, _0x52509e = { 'hLqwd': function (_0x4fe415, _0x2ccc1b) { return _0x4fe415 === _0x2ccc1b; }, 'iUkQK': function (_0x33ace1, _0x2fe3f5) { return _0x33ace1(_0x2fe3f5); }, 'BUvOU': function (_0x144394, _0x1adb60) { return _0x144394(_0x1adb60); }, 'YbUUc': function (_0x25b742, _0x223fd3) { return _0x25b742 === _0x223fd3; }, 'hblCy': function (_0x512558, _0x5a04e6) { return _0x512558(_0x5a04e6); }, 'MvoQU': function (_0x2de10e, _0x786422) { return _0x2de10e(_0x786422); }, 'IObGe': function (_0x178a2d, _0x1b70b4) { return _0x178a2d === _0x1b70b4; }, 'BghAd': function (_0x387407, _0xbee76d) { return _0x387407(_0xbee76d); } }, _0x34d2a9 = this['event']()[_0x1ec918(0x23e)]; if (_0x52509e[_0x1ec918(0x56d)](_0x34d2a9, '')) return; if (DataManager[_0x1ec918(0x64b) + 'st']() || DataManager[_0x1ec918(0x524) + 't']()) return; const _0x5267c = VisuMZ['EventsMove' + 'Core'][_0x1ec918(0x2cc)][_0x1ec918(0x821)]; let _0x2ebbdc = null, _0x5098c0 = 0x1bf7 + -0xf9d * -0x1 + -0x2b94, _0x104fc7 = -0xe60 + 0xad2 + 0x38e; if (_0x34d2a9[_0x1ec918(0x4d6)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)) { _0x5098c0 = _0x52509e['iUkQK'](Number, RegExp['$1']), _0x104fc7 = _0x52509e[_0x1ec918(0xa9b)](Number, RegExp['$2']); if (_0x52509e['YbUUc'](_0x5098c0, -0x1259 + 0xa * 0x29 + 0x10bf)) _0x5098c0 = $gameMap[_0x1ec918(0x2b8)](); } else { if (_0x34d2a9[_0x1ec918(0x4d6)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)) { _0x5098c0 = _0x52509e[_0x1ec918(0x49b)](Number, RegExp['$1']), _0x104fc7 = _0x52509e['MvoQU'](Number, RegExp['$2']); if (_0x52509e[_0x1ec918(0x5a1)](_0x5098c0, 0x41c * -0x8 + -0x1013 + -0x3 * -0x1051)) _0x5098c0 = $gameMap[_0x1ec918(0x2b8)](); } else { if (_0x34d2a9[_0x1ec918(0x4d6)](/<COPY EVENT:[ ](.*?)>/i)) { const _0x2d0b41 = _0x52509e[_0x1ec918(0x77e)](String, RegExp['$1'])[_0x1ec918(0x564) + 'e']()['trim'](); _0x2ebbdc = VisuMZ[_0x1ec918(0x8fa) + 'ates'][_0x2d0b41]; if (!_0x2ebbdc) return; _0x5098c0 = _0x2ebbdc[_0x1ec918(0x36d)], _0x104fc7 = _0x2ebbdc['EventID']; } } } if (!this[_0x1ec918(0x5e9) + _0x1ec918(0x522)](_0x5098c0, _0x104fc7)) return; _0x5267c[_0x1ec918(0x3c1)][_0x1ec918(0x325)](this, _0x5098c0, _0x104fc7, this); if (_0x2ebbdc) _0x2ebbdc['PreCopyJS'][_0x1ec918(0x325)](this, _0x5098c0, _0x104fc7, this); this['_eventCopy' + _0x1ec918(0xa59)] = { 'mapId': _0x5098c0, 'eventId': _0x104fc7 }, this[_0x1ec918(0x33b)] = -(-0x4ff + 0xd63 * -0x2 + 0x1fc7), this[_0x1ec918(0x4db)](), _0x5267c[_0x1ec918(0x834)][_0x1ec918(0x325)](this, _0x5098c0, _0x104fc7, this); if (_0x2ebbdc) _0x2ebbdc[_0x1ec918(0x834)][_0x1ec918(0x325)](this, _0x5098c0, _0x104fc7, this); $gameMap['clearEvent' + _0x1ec918(0x6bc)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x677) + _0x2542b2(0xac5)] = function () { const _0x1e0c27 = _0x2542b2, _0x5e381f = { 'fEkSn': function (_0xbfc602, _0x4907c4) { return _0xbfc602 !== _0x4907c4; }, 'nMdAs': _0x1e0c27(0x48e) }, _0x51a895 = $gameSystem[_0x1e0c27(0x49e) + 'edMorphEve' + _0x1e0c27(0x8cd)](this); if (!_0x51a895) return; const _0xbfa9d5 = _0x51a895[_0x1e0c27(0xa6b)][_0x1e0c27(0x564) + 'e']()[_0x1e0c27(0x7fa)](); _0x5e381f[_0x1e0c27(0x772)](_0xbfa9d5, _0x5e381f[_0x1e0c27(0x900)]) ? this[_0x1e0c27(0x4fb) + _0x1e0c27(0x6e0)](_0xbfa9d5, !![]) : this[_0x1e0c27(0xa97)](_0x51a895[_0x1e0c27(0x2b8)], _0x51a895['eventId'], !![]); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xa97)] = function (_0x452354, _0x14afd3, _0xe62146) { const _0x33d72e = _0x2542b2; if (!this[_0x33d72e(0x5e9) + _0x33d72e(0x522)](_0x452354, _0x14afd3)) return; const _0x1a732a = VisuMZ['EventsMove' + _0x33d72e(0x53e)]['Settings'][_0x33d72e(0x821)]; if (!_0xe62146) _0x1a732a[_0x33d72e(0x728)][_0x33d72e(0x325)](this, _0x452354, _0x14afd3, this); this[_0x33d72e(0x369) + _0x33d72e(0x4c2)] = { 'mapId': _0x452354, 'eventId': _0x14afd3 }, this[_0x33d72e(0x33b)] = -(0x1519 + 0x99 * -0x39 + 0xcfa), this['refresh'](); if (!_0xe62146) _0x1a732a['PostMorphJ' + 'S'][_0x33d72e(0x325)](this, _0x452354, _0x14afd3, this); $gameMap[_0x33d72e(0x624) + _0x33d72e(0x6bc)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x4fb) + _0x2542b2(0x6e0)] = function (_0x1be3e3, _0x7a412e) { const _0xa6cb3d = _0x2542b2; _0x1be3e3 = _0x1be3e3[_0xa6cb3d(0x564) + 'e']()[_0xa6cb3d(0x7fa)](); const _0x2dbef5 = VisuMZ[_0xa6cb3d(0x8fa) + 'ates'][_0x1be3e3]; if (!_0x2dbef5) return; const _0x5e33b0 = _0x2dbef5[_0xa6cb3d(0x36d)], _0x5c636f = _0x2dbef5[_0xa6cb3d(0x4ab)]; if (!this[_0xa6cb3d(0x5e9) + _0xa6cb3d(0x522)](_0x5e33b0, _0x5c636f)) return; if (!_0x7a412e) _0x2dbef5['PreMorphJS']['call'](this, _0x5e33b0, _0x5c636f, this); this['morphInto'](_0x5e33b0, _0x5c636f, _0x7a412e); if (!_0x7a412e) _0x2dbef5[_0xa6cb3d(0x50c) + 'S'][_0xa6cb3d(0x325)](this, _0x5e33b0, _0x5c636f, this); if ($gameMap) $gameMap[_0xa6cb3d(0x624) + _0xa6cb3d(0x6bc)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xb5b) + 'h'] = function () { const _0x3ed707 = _0x2542b2; this[_0x3ed707(0x369) + _0x3ed707(0x4c2)] = undefined, this[_0x3ed707(0x33b)] = -(-0x12dc + -0x3bb * 0x3 + -0x2d * -0xab), this['refresh'](); }, Game_Event[_0x2542b2(0x336)]['setupSpawn'] = function (_0x58034a) { const _0x51a5c2 = _0x2542b2, _0x561c7d = { 'VnFHz': _0x51a5c2(0x48e) }, _0x3da4c0 = VisuMZ[_0x51a5c2(0x6af) + _0x51a5c2(0x53e)][_0x51a5c2(0x2cc)][_0x51a5c2(0x821)], _0x3adb9a = _0x58034a['template'][_0x51a5c2(0x564) + 'e']()['trim'](), _0x3e4c47 = !['', _0x561c7d[_0x51a5c2(0x1d0)]][_0x51a5c2(0x927)](_0x3adb9a); let _0x1bd7d2 = -0x14b * -0x11 + 0x1e8 * -0xd + -0xef * -0x3, _0x1f56b9 = 0x258e + -0x2140 + 0x26 * -0x1d; if (_0x3e4c47) { const _0x4fc3b5 = VisuMZ[_0x51a5c2(0x8fa) + _0x51a5c2(0x7cb)][_0x3adb9a]; if (!_0x4fc3b5) return; _0x1bd7d2 = _0x4fc3b5['MapID'], _0x1f56b9 = _0x4fc3b5['EventID']; } else _0x1bd7d2 = _0x58034a[_0x51a5c2(0x2b8)], _0x1f56b9 = _0x58034a[_0x51a5c2(0x478)]; if (!this[_0x51a5c2(0x5e9) + 'EventerMap'](_0x1bd7d2, _0x1f56b9)) return; if (_0x3e4c47) { const _0x465332 = VisuMZ['EventTempl' + 'ates'][_0x3adb9a]; _0x465332[_0x51a5c2(0x5a5)][_0x51a5c2(0x325)](this, _0x1bd7d2, _0x1f56b9, this); } _0x3da4c0[_0x51a5c2(0x5a5)][_0x51a5c2(0x325)](this, _0x1bd7d2, _0x1f56b9, this), this['_eventSpaw' + 'nData'] = _0x58034a, this[_0x51a5c2(0x33b)] = -(0x23cb + -0x19f3 + 0x1 * -0x9d6), this['_mapId'] = $gameMap['mapId'](), this[_0x51a5c2(0x923)] = _0x58034a[_0x51a5c2(0x7e7) + 'Id'], this[_0x51a5c2(0x372) + _0x51a5c2(0x652)] = _0x58034a[_0x51a5c2(0x3ae) + 'rved'], this[_0x51a5c2(0x740)](_0x58034a['x'], _0x58034a['y']), this[_0x51a5c2(0x4c3) + 'on'](_0x58034a[_0x51a5c2(0x7bc)]), this[_0x51a5c2(0x4db)](); if (_0x3e4c47) { const _0xe2be0e = VisuMZ[_0x51a5c2(0x8fa) + _0x51a5c2(0x7cb)][_0x3adb9a]; if (!_0xe2be0e) return; _0xe2be0e[_0x51a5c2(0x971) + 'S'][_0x51a5c2(0x325)](this, _0x1bd7d2, _0x1f56b9, this); } _0x3da4c0[_0x51a5c2(0x971) + 'S'][_0x51a5c2(0x325)](this, _0x1bd7d2, _0x1f56b9, this); const _0x446416 = SceneManager[_0x51a5c2(0x40e)]; if (_0x446416 && _0x446416[_0x51a5c2(0x541)]) _0x446416[_0x51a5c2(0x541)]['createSpaw' + 'nedEvent'](this); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x41b) + 'vent'] = function () { const _0x192ccf = _0x2542b2; return !!this[_0x192ccf(0x25e) + 'nData']; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x357)] = function () { const _0xf820e0 = _0x2542b2, _0x513dbd = { 'YARGD': function (_0x6bd99f, _0x318321) { return _0x6bd99f > _0x318321; } }; if (!this['list']()) return; const _0x5eeab1 = this[_0xf820e0(0x7a8)]()[_0xf820e0(0x855)](_0x2e3afa => _0x2e3afa[_0xf820e0(0x9bb)] !== -0x35 * -0x6b + 0xcea + -0x22a5 && _0x2e3afa[_0xf820e0(0x9bb)] !== 0x1a8f + -0x20bb + 0x2 * 0x3e2); _0x513dbd[_0xf820e0(0x95a)](_0x5eeab1[_0xf820e0(0x50b)], 0x26a2 + -0x134a + -0x1 * 0x1357) && (this[_0xf820e0(0x562)] = !![], this[_0xf820e0(0x75a) + 'n']([-0x1a26 * 0x1 + -0x22 * -0xd6 + 0xc2 * -0x3, 0x6e * 0x5 + -0x3 * 0x435 + 0xa7a, -0x25b0 + 0x1 * 0x556 + 0x205c]) && this[_0xf820e0(0xaa1)]()); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Event' + _0x2542b2(0x2f7) + 'Settings'] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0xb3e) + 'ettings'], Game_Event[_0x2542b2(0x336)]['clearPageS' + _0x2542b2(0x991)] = function () { const _0x5e677b = _0x2542b2; VisuMZ[_0x5e677b(0x6af) + _0x5e677b(0x53e)][_0x5e677b(0x6ce) + _0x5e677b(0x2f7) + _0x5e677b(0x2cc)][_0x5e677b(0x325)](this), this[_0x5e677b(0x4e6) + _0x5e677b(0x323) + _0x5e677b(0x811)](), this['autosaveEv' + _0x5e677b(0xa01) + 'n'](); }, VisuMZ['EventsMove' + 'Core'][_0x2542b2(0x6ce) + _0x2542b2(0x248) + 'Settings'] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x209) + _0x2542b2(0x991)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x209) + _0x2542b2(0x991)] = function () { const _0x3c5c24 = _0x2542b2, _0x54d5c1 = { 'YpbAJ': _0x3c5c24(0x6e4) }, _0x29ac55 = _0x54d5c1[_0x3c5c24(0x8b0)]['split']('|'); let _0x476125 = -0x194a + -0x2f * -0x80 + -0x2 * -0xe5; while (!![]) { switch (_0x29ac55[_0x476125++]) { case '0': VisuMZ[_0x3c5c24(0x6af) + _0x3c5c24(0x53e)]['Game_Event' + _0x3c5c24(0x248) + _0x3c5c24(0x2cc)][_0x3c5c24(0x325)](this); continue; case '1': this['_activatio' + _0x3c5c24(0x47a) + _0x3c5c24(0x943) + _0x3c5c24(0x321)] = !![]; continue; case '2': this[_0x3c5c24(0x520) + _0x3c5c24(0x47a) + _0x3c5c24(0x943) + _0x3c5c24(0x321)] = ![]; continue; case '3': this['setupEvent' + 'sMoveCoreE' + _0x3c5c24(0x222)](); continue; case '4': this['autosaveEv' + _0x3c5c24(0xa01) + 'n'](); continue; }break; } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x499) + _0x2542b2(0xac2) + _0x2542b2(0x222)] = function () { const _0x3e537d = _0x2542b2, _0x334fe8 = { 'tYyui': _0x3e537d(0xb6a) }, _0x4851e2 = _0x334fe8[_0x3e537d(0x469)][_0x3e537d(0x968)]('|'); let _0x3eb0be = -0x1309 + -0x43 * -0x7c + -0x2af * 0x5; while (!![]) { switch (_0x4851e2[_0x3eb0be++]) { case '0': this['initEvents' + _0x3e537d(0x323) + 'fects'](); continue; case '1': this[_0x3e537d(0x92f) + _0x3e537d(0xb06) + _0x3e537d(0x746)](); continue; case '2': this[_0x3e537d(0x499) + _0x3e537d(0x1f6) + _0x3e537d(0x494)](); continue; case '3': if (!this[_0x3e537d(0x264)]()) return; continue; case '4': this[_0x3e537d(0x499) + _0x3e537d(0x99d) + _0x3e537d(0x438)](); continue; }break; } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x499) + _0x2542b2(0x1f6) + _0x2542b2(0x494)] = function () { const _0x263f17 = _0x2542b2, _0x33cadf = { 'IWREH': function (_0x54060e, _0x1b3828) { return _0x54060e === _0x1b3828; } }, _0x50f1ad = this['event']()[_0x263f17(0x23e)]; if (_0x33cadf[_0x263f17(0x48c)](_0x50f1ad, '')) return; this[_0x263f17(0xb28) + _0x263f17(0x667) + 'tringTags'](_0x50f1ad); }, Game_Event['prototype']['setupEvent' + 'sMoveCoreC' + 'ommentTags'] = function () { const _0x1bd2b6 = _0x2542b2, _0x206dad = { 'WbPNv': function (_0x5330d8, _0x48b831) { return _0x5330d8 !== _0x48b831; } }; if (!this[_0x1bd2b6(0x24b)]()) return; const _0x5bac38 = this['list'](); let _0x1efa51 = ''; for (const _0x514370 of _0x5bac38) { if ([0xead + -0x11a1 + 0x30 * 0x12, 0x205d + -0x47 * -0x59 + -0x3774][_0x1bd2b6(0x927)](_0x514370[_0x1bd2b6(0x9bb)])) { if (_0x206dad[_0x1bd2b6(0x3b5)](_0x1efa51, '')) _0x1efa51 += '\x0a'; _0x1efa51 += _0x514370[_0x1bd2b6(0x71a)][-0x519 + 0x1177 + -0xc5e]; } } this[_0x1bd2b6(0xb28) + 'sMoveCoreS' + _0x1bd2b6(0x43e)](_0x1efa51); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x4e6) + _0x2542b2(0x323) + _0x2542b2(0x811)] = function () { const _0x34a8f4 = _0x2542b2, _0x1e77fc = { 'BEQPW': _0x34a8f4(0x3ab), 'ymZTu': 'random' }, _0x56bf7a = VisuMZ[_0x34a8f4(0x6af) + _0x34a8f4(0x53e)][_0x34a8f4(0x2cc)]; this[_0x34a8f4(0x520) + _0x34a8f4(0x47a)] = { 'type': _0x1e77fc[_0x34a8f4(0x966)], 'distance': 0x0, 'regionList': [] }, this['_alwaysUpd' + _0x34a8f4(0xa7d)] = ![], this['clearAttac' + 'hPictureSe' + _0x34a8f4(0x60d)](), this[_0x34a8f4(0x5ce) + _0x34a8f4(0x6ca)] = ![], this[_0x34a8f4(0x6d6)] = ![], this[_0x34a8f4(0x671) + 'ox'] = { 'up': 0x0, 'down': 0x0, 'left': 0x0, 'right': 0x0 }, this['_encounter' + _0x34a8f4(0x6da) + _0x34a8f4(0x71f)] = { 'type': _0x1e77fc[_0x34a8f4(0x966)], 'distance': 0x0 }, this['_encounter' + _0x34a8f4(0x242) + _0x34a8f4(0x71f)] = { 'type': _0x1e77fc['BEQPW'], 'distance': 0x0 }, $gameSystem[_0x34a8f4(0x62f) + _0x34a8f4(0x743) + 'ta'](this), this['_eventIcon'] = $gameSystem[_0x34a8f4(0x78e) + _0x34a8f4(0x72e)](this), this[_0x34a8f4(0x807) + 'ow'] = { 'originalText': '', 'text': '', 'visibleRange': _0x56bf7a['Label'][_0x34a8f4(0xa52) + 'ge'], 'offsetX': _0x56bf7a[_0x34a8f4(0xa05)][_0x34a8f4(0x825)], 'offsetY': _0x56bf7a[_0x34a8f4(0xa05)][_0x34a8f4(0x45f)], 'hueShift': 0x0 }, this[_0x34a8f4(0x366) + 'ite'] = ![], this[_0x34a8f4(0x95b) + 'egions'] = [], this[_0x34a8f4(0x98d)] = { 'target': -(0xb51 + -0x5 * -0x478 + 0xb38 * -0x3), 'type': _0x1e77fc[_0x34a8f4(0x463)], 'delay': 0x1, 'opacityDelta': 0x0 }, this[_0x34a8f4(0x69e) + _0x34a8f4(0x208)] = _0x56bf7a[_0x34a8f4(0x44e)][_0x34a8f4(0x58d) + _0x34a8f4(0x9b7)] ?? -0x232 * 0x10 + 0x248c * 0x1 + 0xd * -0x1c, this[_0x34a8f4(0x6e6) + _0x34a8f4(0x84f)] = ![], this[_0x34a8f4(0x6f3) + 'X'] = 0x9c7 * -0x1 + -0x1c95 + 0x265d, this[_0x34a8f4(0x6f3) + 'Y'] = 0x1409 + -0x114 + -0x12f4 * 0x1, this[_0x34a8f4(0x6ec) + _0x34a8f4(0x5e0)] = { 'visible': !![], 'filename': _0x56bf7a[_0x34a8f4(0x44e)][_0x34a8f4(0x319) + 'dow'] }, this['_tileExpan' + 'd'] = { 'up': 0x0, 'down': 0x0, 'left': 0x0, 'right': 0x0 }, this[_0x34a8f4(0x931) + 'eOffsets'](), this[_0x34a8f4(0x7b4) + _0x34a8f4(0x9a4)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xb28) + _0x2542b2(0x667) + 'tringTags'] = function (_0x358562) { const _0x1fdbb7 = _0x2542b2, _0x38e302 = { 'dfxxp': function (_0x2cbd6a, _0x437941) { return _0x2cbd6a + _0x437941; }, 'pZMoT': function (_0x5d8543, _0x42e9fd) { return _0x5d8543 + _0x42e9fd; }, 'zVwlm': _0x1fdbb7(0x3ac), 'QrMZy': function (_0x25da17, _0x4f8d14) { return _0x25da17(_0x4f8d14); }, 'vVLLr': function (_0x567a3f, _0xb89cad) { return _0x567a3f(_0xb89cad); }, 'uWIfM': function (_0x43e1fb, _0x257738) { return _0x43e1fb(_0x257738); }, 'rfCUc': _0x1fdbb7(0xa9f), 'bpEzO': _0x1fdbb7(0x7c2), 'ATZrc': _0x1fdbb7(0x98c), 'XeWaA': _0x1fdbb7(0x3ad), 'mGasB': function (_0x3048b3, _0x565d2b) { return _0x3048b3(_0x565d2b); }, 'ZJTyd': function (_0x4d42b5, _0xaed609) { return _0x4d42b5(_0xaed609); }, 'QLIMk': function (_0x427f80, _0x44e70d) { return _0x427f80 * _0x44e70d; }, 'CPxBK': function (_0x154d20, _0x74caed) { return _0x154d20(_0x74caed); }, 'nILGr': function (_0x1e4e4e, _0x2d963c) { return _0x1e4e4e(_0x2d963c); }, 'cDCbA': function (_0x1e852a, _0x2267bf) { return _0x1e852a(_0x2267bf); }, 'bcvox': function (_0x2d1af6, _0x50853b) { return _0x2d1af6 >= _0x50853b; }, 'qWtHF': function (_0x45ce77, _0x43e7f3) { return _0x45ce77(_0x43e7f3); }, 'KoPRh': function (_0x698208, _0x595ddd) { return _0x698208(_0x595ddd); }, 'doEKg': function (_0x1b4738, _0x3d9270) { return _0x1b4738(_0x3d9270); }, 'ZRewY': function (_0x168914, _0x9e793b) { return _0x168914(_0x9e793b); }, 'HYVch': function (_0x44ae61, _0x15b881) { return _0x44ae61(_0x15b881); }, 'JNFVi': function (_0x4af269, _0x6670ef) { return _0x4af269 + _0x6670ef; }, 'aySiv': function (_0x3f7501, _0x26d8a7) { return _0x3f7501(_0x26d8a7); }, 'aMmIe': function (_0x25b3ac, _0x24dcb9) { return _0x25b3ac(_0x24dcb9); }, 'KKCUS': function (_0x2ac6a5, _0x383556) { return _0x2ac6a5(_0x383556); }, 'zMumQ': function (_0x4a663d, _0x1209a0) { return _0x4a663d * _0x1209a0; }, 'cnCOm': function (_0x485b17, _0xc9b24e) { return _0x485b17(_0xc9b24e); }, 'sCKIJ': function (_0xa32a24, _0x128b58) { return _0xa32a24 * _0x128b58; }, 'oYjjx': function (_0x5c8c2e, _0x58df2b) { return _0x5c8c2e(_0x58df2b); }, 'yIkTa': function (_0x516314, _0x172ecc) { return _0x516314(_0x172ecc); }, 'eoIjV': function (_0x52ed2f, _0x1ca4ad) { return _0x52ed2f(_0x1ca4ad); }, 'VfXky': function (_0x433c1e, _0x471e9e) { return _0x433c1e(_0x471e9e); }, 'IEIfI': function (_0x184d5e, _0x1da5ec) { return _0x184d5e(_0x1da5ec); } }; if (_0x358562[_0x1fdbb7(0x4d6)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) this['_activatio' + _0x1fdbb7(0x47a)][_0x1fdbb7(0x625)] = JSON[_0x1fdbb7(0x8f4)](_0x38e302['dfxxp'](_0x38e302[_0x1fdbb7(0xa71)]('[', RegExp['$1'][_0x1fdbb7(0x4d6)](/\d+/g)), ']')), this[_0x1fdbb7(0x520) + 'nProximity'][_0x1fdbb7(0x22e)] = _0x38e302[_0x1fdbb7(0x795)]; else _0x358562['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i) && (type = _0x38e302['QrMZy'](String, RegExp['$1'])[_0x1fdbb7(0x405) + 'e']()[_0x1fdbb7(0x7fa)](), this[_0x1fdbb7(0x520) + 'nProximity']['type'] = type, this[_0x1fdbb7(0x520) + 'nProximity']['distance'] = _0x38e302[_0x1fdbb7(0xb21)](Number, RegExp['$2'])); _0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i) && (this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)][_0x1fdbb7(0x267)] = _0x38e302[_0x1fdbb7(0x3d5)](String, RegExp['$1'])); if (_0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)) { const _0x58d47e = _0x38e302['uWIfM'](String, RegExp['$1'])['toUpperCas' + 'e']()[_0x1fdbb7(0x7fa)](), _0x2d3be1 = [_0x38e302[_0x1fdbb7(0x4b1)], _0x38e302[_0x1fdbb7(0xad6)], _0x38e302[_0x1fdbb7(0x5b8)], _0x38e302[_0x1fdbb7(0x62e)]]; this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)]['blendMode'] = _0x2d3be1[_0x1fdbb7(0x75c)](_0x58d47e)['clamp'](0x1878 + -0xd * -0x8b + -0x1f87, -0x2 * 0x1262 + 0x3 * 0x90 + -0x2317 * -0x1); } _0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i) && (this['_attachPic' + _0x1fdbb7(0x778)][_0x1fdbb7(0x85a)] = _0x38e302['uWIfM'](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)][_0x1fdbb7(0x9b5)] = _0x38e302[_0x1fdbb7(0x64c)](Number, RegExp['$1'])); _0x358562['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)][_0x1fdbb7(0xb51)] = _0x38e302[_0x1fdbb7(0x367)](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)]['offsetX'] = _0x38e302[_0x1fdbb7(0x367)](Number, RegExp['$1']), this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)][_0x1fdbb7(0xb51)] = _0x38e302['ZJTyd'](Number, RegExp['$2'])); _0x358562[_0x1fdbb7(0x4d6)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i) && (this[_0x1fdbb7(0x99f) + _0x1fdbb7(0x778)][_0x1fdbb7(0x7c9)] = _0x38e302[_0x1fdbb7(0x684)](_0x38e302[_0x1fdbb7(0x460)](Number, RegExp['$1']), -0xfa0 + 0x5c5 * 0x3 + -0x1af + 0.01)); _0x358562[_0x1fdbb7(0x4d6)](/<ALWAYS UPDATE MOVEMENT>/i) && (this['_alwaysUpd' + _0x1fdbb7(0xa7d)] = !![]); _0x358562[_0x1fdbb7(0x4d6)](/<CLICK TRIGGER>/i) && (this[_0x1fdbb7(0x5ce) + _0x1fdbb7(0x6ca)] = !![]); _0x358562[_0x1fdbb7(0x4d6)](/<CUSTOM Z:[ ](.*?)>/i) && (this['_customZ'] = _0x38e302[_0x1fdbb7(0xb63)](Number, RegExp['$1']) || -0x2082 + 0x9 * -0x1c9 + 0x5 * 0x9b7); _0x358562[_0x1fdbb7(0x4d6)](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i) && (type = _0x38e302[_0x1fdbb7(0x3d5)](String, RegExp['$1'])[_0x1fdbb7(0x405) + 'e']()[_0x1fdbb7(0x7fa)](), this[_0x1fdbb7(0x39b) + _0x1fdbb7(0x6da) + _0x1fdbb7(0x71f)][_0x1fdbb7(0x22e)] = type, this[_0x1fdbb7(0x39b) + _0x1fdbb7(0x6da) + _0x1fdbb7(0x71f)][_0x1fdbb7(0x25b)] = _0x38e302['mGasB'](Number, RegExp['$2'])); _0x358562[_0x1fdbb7(0x4d6)](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i) && (type = _0x38e302[_0x1fdbb7(0xb63)](String, RegExp['$1'])['toLowerCas' + 'e']()[_0x1fdbb7(0x7fa)](), this[_0x1fdbb7(0x39b) + _0x1fdbb7(0x242) + _0x1fdbb7(0x71f)][_0x1fdbb7(0x22e)] = type, this[_0x1fdbb7(0x39b) + 'NoneProxim' + _0x1fdbb7(0x71f)][_0x1fdbb7(0x25b)] = _0x38e302[_0x1fdbb7(0x903)](Number, RegExp['$2'])); const _0x113ac1 = _0x358562['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi); if (_0x113ac1) for (const _0x10bb75 of _0x113ac1) { if (_0x10bb75['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)) { const _0x4d4802 = _0x38e302[_0x1fdbb7(0x308)](String, RegExp['$1'])[_0x1fdbb7(0x405) + 'e']()['trim'](), _0x533dcf = _0x38e302[_0x1fdbb7(0xb21)](Number, RegExp['$2']); this[_0x1fdbb7(0x671) + 'ox'][_0x4d4802] = _0x533dcf; } } if (_0x38e302[_0x1fdbb7(0x62d)](this[_0x1fdbb7(0x474)][_0x1fdbb7(0x72a)], 0x2 * 0x32d + -0x6fd * 0x2 + 0x7a0) && !this['_eventIcon'][_0x1fdbb7(0x224)]) { _0x358562[_0x1fdbb7(0x4d6)](/<ICON:[ ](\d+)>/i) && (this[_0x1fdbb7(0x474)][_0x1fdbb7(0x72a)] = _0x38e302[_0x1fdbb7(0xa1b)](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x474)][_0x1fdbb7(0x7ee)] = _0x38e302[_0x1fdbb7(0x7a0)](Number, RegExp['$1'])); _0x358562['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i) && (this['_eventIcon'][_0x1fdbb7(0x504)] = _0x38e302[_0x1fdbb7(0xb21)](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i) && (this['_eventIcon'][_0x1fdbb7(0x7ee)] = _0x38e302[_0x1fdbb7(0x3d5)](Number, RegExp['$1']), this[_0x1fdbb7(0x474)][_0x1fdbb7(0x504)] = _0x38e302[_0x1fdbb7(0xb21)](Number, RegExp['$2'])); if (_0x358562[_0x1fdbb7(0x4d6)](/<ICON BLEND MODE:[ ](.*?)>/i)) { const _0x54fec0 = _0x38e302[_0x1fdbb7(0x440)](String, RegExp['$1'])['toUpperCas' + 'e']()[_0x1fdbb7(0x7fa)](), _0x388f54 = [_0x38e302['rfCUc'], _0x38e302[_0x1fdbb7(0xad6)], _0x38e302['ATZrc'], _0x38e302[_0x1fdbb7(0x62e)]]; this[_0x1fdbb7(0x474)][_0x1fdbb7(0xb5e)] = _0x388f54[_0x1fdbb7(0x75c)](_0x54fec0)[_0x1fdbb7(0x6b4)](-0x1683 + -0x5 * 0x21d + 0x2114, 0x1 * 0x89 + 0xdd * 0x6 + 0x5b4 * -0x1); } $gameSystem['setEventIc' + _0x1fdbb7(0x72e)](this, this[_0x1fdbb7(0x474)]['iconIndex'], this[_0x1fdbb7(0x474)][_0x1fdbb7(0x7ee)], this[_0x1fdbb7(0x474)][_0x1fdbb7(0x504)], this[_0x1fdbb7(0x474)][_0x1fdbb7(0xb5e)]); } if (_0x358562[_0x1fdbb7(0x4d6)](/<LABEL:[ ](.*?)>/i)) { let _0x12a184 = _0x38e302[_0x1fdbb7(0x610)](String, RegExp['$1'])['trim'](); this[_0x1fdbb7(0x807) + 'ow']['text'] = _0x12a184, this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0x983) + 'xt'] = _0x12a184; } if (_0x358562[_0x1fdbb7(0x4d6)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)) { let _0x3a50d7 = _0x38e302['CPxBK'](String, RegExp['$1'])[_0x1fdbb7(0x7fa)](); this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0x2de)] = _0x3a50d7, this['_labelWind' + 'ow'][_0x1fdbb7(0x983) + 'xt'] = _0x3a50d7; } _0x358562[_0x1fdbb7(0x4d6)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i) && (this['_labelWind' + 'ow'][_0x1fdbb7(0x9b5)] = _0x38e302[_0x1fdbb7(0x460)](Number, RegExp['$1'])); _0x358562['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0xb51)] = _0x38e302[_0x1fdbb7(0x440)](Number, RegExp['$1'])); _0x358562['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0x9b5)] = _0x38e302[_0x1fdbb7(0x460)](Number, RegExp['$1']), this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0xb51)] = _0x38e302[_0x1fdbb7(0x903)](Number, RegExp['$2'])); _0x358562['match'](/<LABEL HUE SHIFT:[ ](.*?)>/i) && (this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0x6b0)] = _0x38e302['nILGr'](Number, RegExp['$1'])); this[_0x1fdbb7(0x92f) + _0x1fdbb7(0x45d)](); _0x358562[_0x1fdbb7(0x4d6)](/<LABEL RANGE:[ ](\d+)>/i) && (this[_0x1fdbb7(0x807) + 'ow'][_0x1fdbb7(0x230) + 'ge'] = _0x38e302[_0x1fdbb7(0x63a)](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<MIRROR SPRITE>/i) && (this[_0x1fdbb7(0x366) + _0x1fdbb7(0x9b1)] = !![]); if (_0x358562['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)) { const _0x238252 = JSON[_0x1fdbb7(0x8f4)](_0x38e302[_0x1fdbb7(0xb46)](_0x38e302[_0x1fdbb7(0x407)]('[', RegExp['$1'][_0x1fdbb7(0x4d6)](/\d+/g)), ']')); this[_0x1fdbb7(0x95b) + _0x1fdbb7(0x4b5)] = this['_moveOnlyR' + _0x1fdbb7(0x4b5)]['concat'](_0x238252), this[_0x1fdbb7(0x95b) + _0x1fdbb7(0x4b5)][_0x1fdbb7(0x8a9)](0xb * -0x34b + -0x3 * -0x115 + 0x20fa); } if (_0x358562[_0x1fdbb7(0x4d6)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)) { const _0xe103ca = _0x38e302[_0x1fdbb7(0xa1b)](String, RegExp['$1']); if (_0xe103ca[_0x1fdbb7(0x4d6)](/PLAYER/i)) this[_0x1fdbb7(0x98d)][_0x1fdbb7(0xa15)] = 0x1 * -0x725 + -0x7af * -0x1 + -0x8a; else _0xe103ca[_0x1fdbb7(0x4d6)](/EVENT[ ](\d+)/i) && (this[_0x1fdbb7(0x98d)][_0x1fdbb7(0xa15)] = _0x38e302[_0x1fdbb7(0x7a0)](Number, RegExp['$1'])); } _0x358562[_0x1fdbb7(0x4d6)](/<MOVE SYNCH TYPE:[ ](.*?)>/i) && (this['_moveSynch'][_0x1fdbb7(0x22e)] = _0x38e302[_0x1fdbb7(0x3ee)](String, RegExp['$1'])[_0x1fdbb7(0x405) + 'e']()['trim']()); _0x358562[_0x1fdbb7(0x4d6)](/<MOVE SYNCH DELAY:[ ](\d+)>/i) && (this['_moveSynch'][_0x1fdbb7(0x770)] = _0x38e302[_0x1fdbb7(0x63a)](Number, RegExp['$1'])); _0x358562[_0x1fdbb7(0x4d6)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i) && (this[_0x1fdbb7(0x98d)][_0x1fdbb7(0x529) + 'ta'] = _0x38e302[_0x1fdbb7(0xaf3)](Number, RegExp['$1'])); if (_0x358562[_0x1fdbb7(0x4d6)](/<TRUE RANDOM MOVE>/i)) this[_0x1fdbb7(0x69e) + _0x1fdbb7(0x208)] = 0x1305 + 0x1d0b + -0x3010; else _0x358562[_0x1fdbb7(0x4d6)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i) && (this['_randomMov' + 'eWeight'] = _0x38e302[_0x1fdbb7(0x9f7)](Number, RegExp['$1']) || -0x1b08 + -0x22e1 + 0x3de9); _0x358562['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i) && (this['_saveEvent' + 'Location'] = !![]); _0x358562[_0x1fdbb7(0x4d6)](/<SCALE X:[ ](\d+)([%％])>/i) && (this['_scaleBase' + 'X'] = _0x38e302[_0x1fdbb7(0x1e9)](_0x38e302['cnCOm'](Number, RegExp['$1']), 0x1 * -0xa65 + 0xb90 + 0xd * -0x17 + 0.01)); _0x358562[_0x1fdbb7(0x4d6)](/<SCALE Y:[ ](\d+)([%％])>/i) && (this['_scaleBase' + 'Y'] = _0x38e302[_0x1fdbb7(0x1e9)](_0x38e302[_0x1fdbb7(0x9f7)](Number, RegExp['$1']), -0x212 + -0x17ba + 0x19cc + 0.01)); if (_0x358562[_0x1fdbb7(0x4d6)](/<SCALE:[ ](\d+)([%％])>/i)) { const _0x364f51 = _0x38e302[_0x1fdbb7(0x899)](_0x38e302['oYjjx'](Number, RegExp['$1']), 0x1 * 0xd9c + 0x1 * -0x12fd + 0x561 + 0.01); this[_0x1fdbb7(0x6f3) + 'X'] = _0x364f51, this['_scaleBase' + 'Y'] = _0x364f51; } _0x358562['match'](/<HIDE SHADOW>/i) && (this[_0x1fdbb7(0x6ec) + 'phic'][_0x1fdbb7(0x81d)] = ![]), _0x358562[_0x1fdbb7(0x4d6)](/<SHADOW FILENAME:[ ](.*?)>/i) && (this['_shadowGra' + _0x1fdbb7(0x5e0)][_0x1fdbb7(0x267)] = _0x38e302['CPxBK'](String, RegExp['$1'])), _0x358562['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x31f) + _0x1fdbb7(0x9be)] = _0x38e302['cDCbA'](Number, RegExp['$1'])), _0x358562[_0x1fdbb7(0x4d6)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x31f) + _0x1fdbb7(0x38a)] = _0x38e302[_0x1fdbb7(0x2fa)](Number, RegExp['$1'])), _0x358562[_0x1fdbb7(0x4d6)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i) && (this[_0x1fdbb7(0x31f) + _0x1fdbb7(0x9be)] = _0x38e302[_0x1fdbb7(0x6db)](Number, RegExp['$1']), this['_spriteOff' + _0x1fdbb7(0x38a)] = _0x38e302[_0x1fdbb7(0x3ee)](Number, RegExp['$2'])), _0x358562[_0x1fdbb7(0x4d6)](/<STEP PATTERN:[ ](.*)>/i) && (this[_0x1fdbb7(0x878) + 'rn'] = _0x38e302[_0x1fdbb7(0x367)](String, RegExp['$1'])[_0x1fdbb7(0x564) + 'e']()[_0x1fdbb7(0x7fa)]()), _0x358562[_0x1fdbb7(0x4d6)](/<(?:TILE EXPAND|EXPAND TILE) UP:[ ](\d+)>/i) && (this[_0x1fdbb7(0x42c) + 'd'] = this[_0x1fdbb7(0x42c) + 'd'] || {}, this[_0x1fdbb7(0x42c) + 'd']['up'] = _0x38e302[_0x1fdbb7(0x440)](Number, RegExp['$1'])), _0x358562[_0x1fdbb7(0x4d6)](/<(?:TILE EXPAND|EXPAND TILE) DOWN:[ ](\d+)>/i) && (this[_0x1fdbb7(0x42c) + 'd'] = this['_tileExpan' + 'd'] || {}, this['_tileExpan' + 'd']['down'] = _0x38e302[_0x1fdbb7(0x506)](Number, RegExp['$1'])), _0x358562['match'](/<(?:TILE EXPAND|EXPAND TILE) LEFT:[ ](\d+)>/i) && (this['_tileExpan' + 'd'] = this[_0x1fdbb7(0x42c) + 'd'] || {}, this['_tileExpan' + 'd']['left'] = _0x38e302[_0x1fdbb7(0xb21)](Number, RegExp['$1'])), _0x358562[_0x1fdbb7(0x4d6)](/<(?:TILE EXPAND|EXPAND TILE) RIGHT:[ ](\d+)>/i) && (this[_0x1fdbb7(0x42c) + 'd'] = this[_0x1fdbb7(0x42c) + 'd'] || {}, this[_0x1fdbb7(0x42c) + 'd'][_0x1fdbb7(0x709)] = _0x38e302[_0x1fdbb7(0x91c)](Number, RegExp['$1'])); }, Game_Event[_0x2542b2(0x336)]['updateEven' + _0x2542b2(0x45d)] = function () { const _0x494497 = _0x2542b2; $gameTemp['registerSe' + _0x494497(0xb57)](this), this[_0x494497(0x807) + 'ow']['text'] = this['_labelWind' + 'ow']['originalTe' + 'xt']; for (; ;) { if (this[_0x494497(0x807) + 'ow']['text'][_0x494497(0x4d6)](/\\V\[(\d+)\]/gi)) this[_0x494497(0x807) + 'ow'][_0x494497(0x2de)] = this[_0x494497(0x807) + 'ow'][_0x494497(0x983) + 'xt'][_0x494497(0x736)](/\\V\[(\d+)\]/gi, (_0x121cd7, _0x363143) => $gameVariables[_0x494497(0x872)](parseInt(_0x363143))); else break; } $gameTemp[_0x494497(0x73e) + _0x494497(0x4b2)](); }, Game_Event[_0x2542b2(0x336)]['updateEven' + 'tsMoveCore' + _0x2542b2(0x746)] = function () { this['updateShad' + 'owChanges'](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x7af) + _0x2542b2(0x6ff)] = function () { const _0x13dcb6 = _0x2542b2; if (this['_alwaysUpd' + _0x13dcb6(0xa7d)]) return !![]; return Game_Character[_0x13dcb6(0x336)]['isNearTheS' + _0x13dcb6(0x6ff)][_0x13dcb6(0x325)](this); }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + _0x2542b2(0x96a) + _0x2542b2(0x85e)] = Game_Event['prototype'][_0x2542b2(0x2fc) + _0x2542b2(0x44e)], Game_Event[_0x2542b2(0x336)]['updateSelf' + _0x2542b2(0x44e)] = function () { const _0x188716 = _0x2542b2; if (this[_0x188716(0x46c) + _0x188716(0xb09) + 't']()) return; VisuMZ['EventsMove' + _0x188716(0x53e)][_0x188716(0x6ce) + '_updateSel' + _0x188716(0x85e)][_0x188716(0x325)](this), this[_0x188716(0x858)]() && VisuMZ[_0x188716(0x939) + _0x188716(0xaad)](this['_eventId']); }, Game_Event[_0x2542b2(0x336)]['isPreventS' + _0x2542b2(0xb09) + 't'] = function () { const _0x28db0c = _0x2542b2, _0x4a6f36 = { 'iKuyf': function (_0x1540f3, _0x13dc9e) { return _0x1540f3 >= _0x13dc9e; } }, _0x17d91b = VisuMZ[_0x28db0c(0x6af) + _0x28db0c(0x53e)][_0x28db0c(0x2cc)][_0x28db0c(0x44e)]; if ($gameMap['isEventRun' + 'ning']() && _0x17d91b[_0x28db0c(0x8ae) + _0x28db0c(0xb0a)]) return !![]; if ($gameMessage[_0x28db0c(0x6df)]() && _0x17d91b[_0x28db0c(0x8ae) + _0x28db0c(0x6c2)]) return !![]; if (!$gameSystem['isAllowEve' + _0x28db0c(0x89e) + 'ment']()) return !![]; if (_0x4a6f36[_0x28db0c(0xacc)](this[_0x28db0c(0x701) + _0x28db0c(0x4b2)](), 0x1d04 * 0x1 + 0xa * 0x204 + 0x419 * -0xc)) return !![]; if (!SceneManager[_0x28db0c(0x40e)][_0x28db0c(0x70f)]) return !![]; return ![]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x548) + _0x2542b2(0xa30)] = function () { const _0x4b34d6 = _0x2542b2, _0x5852ad = { 'pbtCB': function (_0x5b0871, _0x98f7be) { return _0x5b0871 !== _0x98f7be; } }, _0xe8095a = SceneManager['_scene'][_0x4b34d6(0x541)]; if (_0xe8095a) { const _0x2ea717 = _0xe8095a[_0x4b34d6(0x4e9) + _0x4b34d6(0x604)](this); _0x2ea717 && _0x2ea717['_shadowSpr' + _0x4b34d6(0x9b1)] && _0x5852ad[_0x4b34d6(0x90c)](_0x2ea717[_0x4b34d6(0x1d7) + _0x4b34d6(0x9b1)][_0x4b34d6(0x5ed)], this[_0x4b34d6(0x8ce) + 'name']()) && (_0x2ea717[_0x4b34d6(0x1d7) + _0x4b34d6(0x9b1)][_0x4b34d6(0x5ed)] = this[_0x4b34d6(0x8ce) + _0x4b34d6(0x51e)](), _0x2ea717[_0x4b34d6(0x1d7) + 'ite'][_0x4b34d6(0x3c6)] = ImageManager[_0x4b34d6(0x66b)](_0x2ea717[_0x4b34d6(0x1d7) + _0x4b34d6(0x9b1)]['_filename'])); } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x8ce) + 'name'] = function () { const _0x46ffc0 = _0x2542b2; return this['_shadowGra' + _0x46ffc0(0x5e0)][_0x46ffc0(0x267)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x98f) + _0x2542b2(0xb31)] = function () { const _0x57ea11 = _0x2542b2; if (!this[_0x57ea11(0x6ec) + _0x57ea11(0x5e0)]['visible']) return ![]; return Game_CharacterBase[_0x57ea11(0x336)][_0x57ea11(0x98f) + _0x57ea11(0xb31)][_0x57ea11(0x325)](this); }, Game_Event[_0x2542b2(0x336)]['labelWindo' + _0x2542b2(0x43c)] = function () { const _0x5368a8 = _0x2542b2; return this[_0x5368a8(0x807) + 'ow'][_0x5368a8(0x2de)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x735) + _0x2542b2(0x8eb)] = function () { const _0x46e9fe = _0x2542b2; return this[_0x46e9fe(0x807) + 'ow']['visibleRan' + 'ge']; }, Game_Event['prototype'][_0x2542b2(0x582) + 'ble'] = function (_0x5939df, _0x18831a, _0x9f445d) { const _0x41131f = _0x2542b2, _0x27b667 = { 'tASqz': _0x41131f(0x264) }; if (this['hasMoveOnl' + 'yRegions']()) return this['isMoveOnly' + _0x41131f(0xa95) + _0x41131f(0x844)](_0x5939df, _0x18831a, _0x9f445d); if ($gameMap[_0x41131f(0x5ac) + _0x41131f(0x483)](_0x5939df, _0x18831a, _0x9f445d, _0x27b667[_0x41131f(0x489)])) return !![]; if ($gameMap[_0x41131f(0x65a) + _0x41131f(0x28c)](_0x5939df, _0x18831a, _0x9f445d, _0x27b667['tASqz'])) return ![]; return Game_Character['prototype'][_0x41131f(0x582) + _0x41131f(0xa55)][_0x41131f(0x325)](this, _0x5939df, _0x18831a, _0x9f445d); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x8bc) + _0x2542b2(0xa50)] = function () { const _0x2c82cb = _0x2542b2, _0x383a47 = { 'ZiVaE': function (_0x2962f3, _0x460a14) { return _0x2962f3 === _0x460a14; }, 'yIkDJ': function (_0x9d1a56, _0x4ddcb3) { return _0x9d1a56 > _0x4ddcb3; } }; if (_0x383a47[_0x2c82cb(0x802)](this[_0x2c82cb(0x95b) + _0x2c82cb(0x4b5)], undefined)) this[_0x2c82cb(0x4e6) + _0x2c82cb(0x323) + _0x2c82cb(0x811)](); return _0x383a47[_0x2c82cb(0x77b)](this[_0x2c82cb(0x95b) + 'egions'][_0x2c82cb(0x50b)], -0x9c5 + 0x1ba + 0x80b); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x352) + _0x2542b2(0xa95) + _0x2542b2(0x844)] = function (_0x2b134f, _0x208009, _0x42821e) { const _0x275854 = _0x2542b2, _0x4dcd5e = $gameMap[_0x275854(0x91f) + _0x275854(0x61d)](_0x2b134f, _0x42821e), _0x55ce00 = $gameMap[_0x275854(0x799) + _0x275854(0x61d)](_0x208009, _0x42821e), _0x358a6c = $gameMap[_0x275854(0x29d)](_0x4dcd5e, _0x55ce00); return this[_0x275854(0x95b) + _0x275854(0x4b5)][_0x275854(0x927)](_0x358a6c); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Event' + _0x2542b2(0xa5c) + 'rPageIndex'] = Game_Event[_0x2542b2(0x336)]['findProper' + _0x2542b2(0x5d3)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x580) + 'PageIndex'] = function () { const _0x296b57 = _0x2542b2; if (this[_0x296b57(0x264)]() && !$gameTemp[_0x296b57(0x4e1)]()) { if (this['event']()[_0x296b57(0x23e)][_0x296b57(0x4d6)](/<(?:PLAYTEST|PLAY TEST)>/i)) return -(-0x14e1 + 0xbfb * 0x2 + 0xc5 * -0x4); } return this['_advancedS' + _0x296b57(0x29a) + 'ble'] = ![], this[_0x296b57(0x9c1)] = ![], this['event']() ? VisuMZ[_0x296b57(0x6af) + 'Core']['Game_Event' + _0x296b57(0xa5c) + 'rPageIndex'][_0x296b57(0x325)](this) : -(-0x1 * 0x1567 + -0x24 * 0x31 + 0x1c4c * 0x1); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + _0x2542b2(0x818) + _0x2542b2(0x20e)] = Game_Event['prototype'][_0x2542b2(0x1d6) + 'tions'], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)] = function (_0x46214e) { const _0x54adb6 = _0x2542b2; this[_0x54adb6(0x650) + _0x54adb6(0x2b7) + 'ariablePre' + _0x54adb6(0x402)](_0x46214e), $gameTemp['registerSe' + _0x54adb6(0xb57)](this); const _0x34cc7c = VisuMZ[_0x54adb6(0x6af) + 'Core'][_0x54adb6(0x6ce) + _0x54adb6(0x818) + 'itions']['call'](this, _0x46214e); return $gameTemp['clearSelfT' + _0x54adb6(0x4b2)](), _0x34cc7c; }, Game_Event['prototype'][_0x2542b2(0x741) + 'dSwitchVar' + 'iable'] = function () { const _0x5972ad = _0x2542b2; return this[_0x5972ad(0x49f) + _0x5972ad(0x29a) + _0x5972ad(0xa55)]; }, Game_Event[_0x2542b2(0x336)]['checkAdvan' + _0x2542b2(0x2b7) + _0x2542b2(0xa63) + _0x2542b2(0x402)] = function (_0x2f380f) { const _0x1adc3a = _0x2542b2, _0x54febf = _0x2f380f[_0x1adc3a(0x2e3)]; if (_0x54febf[_0x1adc3a(0xa24) + 'id'] && DataManager[_0x1adc3a(0x75f) + _0x1adc3a(0x72d)](_0x54febf[_0x1adc3a(0xa31)])) this[_0x1adc3a(0x49f) + _0x1adc3a(0x29a) + _0x1adc3a(0xa55)] = !![]; else { if (_0x54febf['switch2Val' + 'id'] && DataManager['isAdvanced' + _0x1adc3a(0x72d)](_0x54febf[_0x1adc3a(0x791)])) this[_0x1adc3a(0x49f) + 'witchVaria' + _0x1adc3a(0xa55)] = !![]; else _0x54febf[_0x1adc3a(0x5e4) + _0x1adc3a(0x234)] && DataManager[_0x1adc3a(0x75f) + _0x1adc3a(0x362)](_0x54febf[_0x1adc3a(0x2f3)]) && (this[_0x1adc3a(0x49f) + 'witchVaria' + _0x1adc3a(0xa55)] = !![]); } }, Game_Event['prototype'][_0x2542b2(0xaa4) + _0x2542b2(0xb50)] = function () { const _0x1abce4 = _0x2542b2; if (this[_0x1abce4(0x4e2)]) return ![]; return this[_0x1abce4(0x5ce) + _0x1abce4(0x6ca)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x2ae) + _0x2542b2(0x27a)] = function () { const _0x40ac85 = _0x2542b2; $gameTemp[_0x40ac85(0x6d7) + _0x40ac85(0x7d1)](), this['start'](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x35b)] = function (_0x1e30cd, _0x2f9aa8) { const _0x9cfde7 = _0x2542b2; return this['_addedHitb' + 'ox'] ? this[_0x9cfde7(0xa47) + _0x9cfde7(0x84a)](_0x1e30cd, _0x2f9aa8) : Game_Character[_0x9cfde7(0x336)]['pos'][_0x9cfde7(0x325)](this, _0x1e30cd, _0x2f9aa8); }, Game_Event['prototype']['posEventsM' + _0x2542b2(0x84a)] = function (_0x21b9ad, _0x30f4d3) { const _0x1c0e2f = _0x2542b2, _0x2e596d = { 'lRWNM': _0x1c0e2f(0x516), 'tCFpV': function (_0x5b3bf5, _0x2cc154) { return _0x5b3bf5 - _0x2cc154; }, 'NuFiB': function (_0x51e8cd, _0xf4c972) { return _0x51e8cd + _0xf4c972; }, 'wUHJe': function (_0x28e61f, _0x6e96e1) { return _0x28e61f <= _0x6e96e1; }, 'DjtcO': function (_0x13df5e, _0x30a185) { return _0x13df5e <= _0x30a185; }, 'GxNXI': function (_0xcbbd4c, _0x522702) { return _0xcbbd4c <= _0x522702; }, 'GaWGc': function (_0x101594, _0x42d5f6) { return _0x101594 + _0x42d5f6; } }, _0x457d18 = _0x2e596d[_0x1c0e2f(0x8cc)]['split']('|'); let _0x2ec3d4 = -0x2e3 + 0x2b2 + 0x31; while (!![]) { switch (_0x457d18[_0x2ec3d4++]) { case '0': var _0x39b156 = _0x2e596d[_0x1c0e2f(0x93a)](this['x'], this[_0x1c0e2f(0x671) + 'ox'][_0x1c0e2f(0xa43)]); continue; case '1': var _0x1ad6d8 = _0x2e596d[_0x1c0e2f(0x93a)](this['y'], this['_addedHitb' + 'ox']['up']); continue; case '2': var _0x1b7eac = _0x2e596d[_0x1c0e2f(0x76e)](this['x'], this[_0x1c0e2f(0x671) + 'ox'][_0x1c0e2f(0x709)]); continue; case '3': return _0x2e596d[_0x1c0e2f(0x645)](_0x39b156, _0x21b9ad) && _0x2e596d[_0x1c0e2f(0x836)](_0x21b9ad, _0x1b7eac) && _0x2e596d['wUHJe'](_0x1ad6d8, _0x30f4d3) && _0x2e596d[_0x1c0e2f(0xabb)](_0x30f4d3, _0x4036d4); case '4': var _0x4036d4 = _0x2e596d['GaWGc'](this['y'], this['_addedHitb' + 'ox'][_0x1c0e2f(0x270)]); continue; }break; } }, Game_Event[_0x2542b2(0x336)]['canPass'] = function (_0x16bf37, _0x275ffc, _0x3afb3e) { const _0x453fdb = _0x2542b2, _0x17f178 = { 'mitdi': function (_0x3836e3, _0x594479) { return _0x3836e3 <= _0x594479; }, 'nUpsW': function (_0x131a2e, _0x401111) { return _0x131a2e <= _0x401111; }, 'NKiEN': function (_0x53c0eb, _0x1dd25b) { return _0x53c0eb + _0x1dd25b; } }; for (let _0x7b44e8 = -this['_addedHitb' + 'ox']['left']; _0x17f178[_0x453fdb(0xaa8)](_0x7b44e8, this['_addedHitb' + 'ox']['right']); _0x7b44e8++) { for (let _0x5d1ce0 = -this[_0x453fdb(0x671) + 'ox']['up']; _0x17f178['nUpsW'](_0x5d1ce0, this[_0x453fdb(0x671) + 'ox'][_0x453fdb(0x270)]); _0x5d1ce0++) { if (!Game_Character[_0x453fdb(0x336)][_0x453fdb(0x648)][_0x453fdb(0x325)](this, _0x17f178[_0x453fdb(0xaf5)](_0x16bf37, _0x7b44e8), _0x17f178['NKiEN'](_0x275ffc, _0x5d1ce0), _0x3afb3e)) return ![]; } } return !![]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xaeb) + _0x2542b2(0x1d1)] = function (_0x1b8a64, _0x3c868c) { const _0x325069 = _0x2542b2, _0x212ec8 = { 'OXjQt': function (_0x415599, _0x39523f) { return _0x415599 > _0x39523f; } }; if (Imported['VisuMZ_0_C' + _0x325069(0x3e9)] && this[_0x325069(0x785) + _0x325069(0x3e5) + 'nOn']()) return this[_0x325069(0x6d1) + 'EventColli' + _0x325069(0x3b2)](_0x1b8a64, _0x3c868c); else { const _0xaa25f0 = $gameMap[_0x325069(0x2b1)](_0x1b8a64, _0x3c868c)[_0x325069(0x855)](_0xc737c9 => _0xc737c9 !== this); return _0x212ec8[_0x325069(0x2d2)](_0xaa25f0['length'], -0x2 * -0xbf0 + 0x1 * 0x25f5 + -0x3dd5); } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x6d1) + 'EventColli' + _0x2542b2(0x3b2)] = function (_0x331aea, _0x10c768) { const _0x194d1d = _0x2542b2, _0x16c5b6 = { 'koIkg': function (_0x1da43e, _0x3fafb9) { return _0x1da43e > _0x3fafb9; } }; if (!this[_0x194d1d(0x3c2) + _0x194d1d(0xa0f)]()) return ![]; else { const _0x407565 = $gameMap[_0x194d1d(0x2b1)](_0x331aea, _0x10c768)['filter'](_0x338653 => _0x338653 !== this && _0x338653[_0x194d1d(0x3c2) + 'iority']()); return _0x16c5b6[_0x194d1d(0x8c2)](_0x407565[_0x194d1d(0x50b)], -0x3b7 + -0xc62 + 0x1019); } }, Game_Event['prototype'][_0x2542b2(0xb04) + _0x2542b2(0xa00) + _0x2542b2(0x830)] = function () { const _0x59f648 = _0x2542b2, _0x4ff5f9 = { 'kNCpe': _0x59f648(0x3ab) }; if (!this['_activatio' + _0x59f648(0x47a)]) return _0x4ff5f9[_0x59f648(0xafd)]; return this[_0x59f648(0x520) + _0x59f648(0x47a)][_0x59f648(0x22e)] || _0x4ff5f9[_0x59f648(0xafd)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xb04) + _0x2542b2(0x51a) + _0x2542b2(0x45a)] = function () { const _0xc08d2 = _0x2542b2; if (!this['_activatio' + _0xc08d2(0x47a)]) return 0x232 * 0x3 + -0x1cb + -0x199 * 0x3; return this['_activatio' + 'nProximity'][_0xc08d2(0x25b)] || 0x1f29 + 0x184 * -0x18 + 0x537; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xb04) + 'RegionList'] = function () { const _0x1945d4 = _0x2542b2; if (!this['_activatio' + 'nProximity']) return []; return this[_0x1945d4(0x520) + _0x1945d4(0x47a)][_0x1945d4(0x625)] || []; }, Game_Event['prototype'][_0x2542b2(0x751) + 'eps'] = function () { const _0x56c738 = _0x2542b2, _0x9b8ec8 = { 'BRJnV': _0x56c738(0x3ab), 'VljgG': _0x56c738(0x3ac) }; Game_Character[_0x56c738(0x336)][_0x56c738(0x751) + _0x56c738(0x9c7)][_0x56c738(0x325)](this); if ([_0x9b8ec8['BRJnV'], _0x9b8ec8['VljgG']][_0x56c738(0x927)](this[_0x56c738(0xb04) + _0x56c738(0xa00) + _0x56c738(0x830)]())) return; $gamePlayer[_0x56c738(0xb28) + _0x56c738(0x301) + _0x56c738(0x48b) + 'e']([0x25ff + -0x184c + -0xdb1]); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Event' + _0x2542b2(0x959) + 'tTriggerAu' + 'to'] = Game_Event[_0x2542b2(0x336)]['checkEvent' + _0x2542b2(0x711) + 'o'], Game_Event[_0x2542b2(0x336)]['checkEvent' + _0x2542b2(0x711) + 'o'] = function () { const _0x36edda = _0x2542b2, _0xbe62de = { 'LZTbS': _0x36edda(0x3eb), 'ftjFb': function (_0x39499b, _0x38cbee) { return _0x39499b !== _0x38cbee; } }, _0x8de579 = _0xbe62de[_0x36edda(0xa5d)]['split']('|'); let _0x1471cf = 0x117a + -0x1 * 0xd6d + 0x1 * -0x40d; while (!![]) { switch (_0x8de579[_0x1471cf++]) { case '0': if (_0xbe62de[_0x36edda(0x38d)](this[_0x36edda(0x30d)], -0x79 * 0x35 + 0xe * 0x148 + 0x26 * 0x30)) return; continue; case '1': if (this['_activatio' + _0x36edda(0x47a) + _0x36edda(0x943) + 'rBypass']) return; continue; case '2': if (!this[_0x36edda(0x1fa) + _0x36edda(0x46b) + _0x36edda(0x6ca)](![])) return; continue; case '3': VisuMZ[_0x36edda(0x6af) + _0x36edda(0x53e)][_0x36edda(0x6ce) + _0x36edda(0x959) + _0x36edda(0x601) + 'to']['call'](this); continue; case '4': if (!this['checkActiv' + _0x36edda(0x5d5) + _0x36edda(0x25a)](![])) return; continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Event' + _0x2542b2(0x92c) + _0x2542b2(0x3d2)] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x8d6) + 'llel'], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x8d6) + _0x2542b2(0x24c)] = function () { const _0x4e20fe = _0x2542b2; if (!this['_interpret' + 'er']) return; if (!this[_0x4e20fe(0x1fa) + _0x4e20fe(0x46b) + 'ger'](!![])) return; if (!this[_0x4e20fe(0x412) + _0x4e20fe(0x5d5) + _0x4e20fe(0x25a)](!![])) return; VisuMZ[_0x4e20fe(0x6af) + _0x4e20fe(0x53e)][_0x4e20fe(0x6ce) + _0x4e20fe(0x92c) + 'allel']['call'](this); }, Game_Event[_0x2542b2(0x336)]['checkRegio' + 'nEventTrig' + _0x2542b2(0x6ca)] = function (_0x26f52b) { const _0x4e009f = _0x2542b2, _0x26a9e0 = { 'IIxXU': function (_0x322db8, _0x3a1f5d) { return _0x322db8 <= _0x3a1f5d; } }; if (!_0x26f52b && $gameMap['isEventRun' + _0x4e009f(0x809)]()) return ![]; if (!_0x26f52b && $gameMap['isAnyEvent' + _0x4e009f(0x6a3)]()) return ![]; if (_0x26a9e0[_0x4e009f(0x987)](this[_0x4e009f(0xb04) + _0x4e009f(0x5cd)](), -0x7d * 0x2f + 0xbf6 + 0x61 * 0x1d)) return !![]; return $gamePlayer[_0x4e009f(0x913) + _0x4e009f(0x3e4) + _0x4e009f(0x20b)](this); }, Game_Event[_0x2542b2(0x336)]['checkActiv' + _0x2542b2(0x5d5) + _0x2542b2(0x25a)] = function (_0x35476a) { const _0x2ab17 = _0x2542b2, _0x2c0012 = { 'qAWqi': 'none', 'XsArV': _0x2ab17(0x3ac) }; if (!_0x35476a && $gameMap['isEventRun' + _0x2ab17(0x809)]()) return ![]; if (!_0x35476a && $gameMap[_0x2ab17(0x6ef) + _0x2ab17(0x6a3)]()) return ![]; if ([_0x2c0012[_0x2ab17(0x4c6)], _0x2c0012[_0x2ab17(0x72c)]][_0x2ab17(0x927)](this[_0x2ab17(0xb04) + _0x2ab17(0xa00) + 'ype']())) return !![]; return $gamePlayer[_0x2ab17(0x913) + 'tionProxim' + _0x2ab17(0x442) + _0x2ab17(0x4d5)](this); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x537) + _0x2542b2(0x2c3) + 'pe'] = function (_0x3dba78) { const _0x371bc6 = _0x2542b2, _0x236793 = { 'iWIqD': _0x371bc6(0x3ab) }, _0x2651f7 = _0x3dba78 ? this['_encounter' + _0x371bc6(0x6da) + _0x371bc6(0x71f)] : this[_0x371bc6(0x39b) + _0x371bc6(0x242) + 'ity']; return _0x2651f7 ? _0x2651f7[_0x371bc6(0x22e)] : _0x236793[_0x371bc6(0x710)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x537) + 'roximityDi' + 'stance'] = function (_0x515f65) { const _0x591208 = _0x2542b2, _0xaa52ab = _0x515f65 ? this[_0x591208(0x39b) + _0x591208(0x6da) + 'ity'] : this[_0x591208(0x39b) + 'NoneProxim' + _0x591208(0x71f)]; return _0xaa52ab ? _0xaa52ab['distance'] : -0x170f * 0x1 + -0x1f34 + 0x1df * 0x1d; }, VisuMZ[_0x2542b2(0x939) + 'chTargets'] = function (_0x38a882) { const _0x3bc699 = _0x2542b2, _0x40c674 = { 'GiCRa': function (_0x418bd0, _0x10ca89) { return _0x418bd0 === _0x10ca89; } }; for (const _0x1b6d4c of $gameMap[_0x3bc699(0xb16)]()) { if (!_0x1b6d4c) continue; _0x40c674['GiCRa'](_0x1b6d4c[_0x3bc699(0x701) + _0x3bc699(0x4b2)](), _0x38a882) && _0x1b6d4c[_0x3bc699(0x5df) + _0x3bc699(0x4f6)](); } }, VisuMZ[_0x2542b2(0xaf8) + _0x2542b2(0x922)] = function (_0x539dce) { const _0x4ab401 = _0x2542b2, _0x4e867f = { 'kWDSP': function (_0x1ca60e, _0x7c73e1) { return _0x1ca60e === _0x7c73e1; } }; if (_0x4e867f[_0x4ab401(0x5c0)](_0x539dce, -0x29c + 0x1d54 + -0xf * 0x1c8)) return $gamePlayer; return $gameMap['event'](_0x539dce); }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x5df) + _0x2542b2(0x4d4) + _0x2542b2(0x388)] = function () { }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x5df) + _0x2542b2(0x4d4) + _0x2542b2(0x388)] = function () { const _0x4fe7aa = _0x2542b2; VisuMZ[_0x4fe7aa(0x7f2) + _0x4fe7aa(0x55b) + 'gets'](this['_eventId']); }, VisuMZ[_0x2542b2(0x7f2) + _0x2542b2(0x55b) + 'gets'] = function (_0x447336) { const _0x3dca3b = _0x2542b2, _0xf67f6f = { 'mrNGe': function (_0xf89d01, _0x5ed04f) { return _0xf89d01 === _0x5ed04f; } }; for (const _0x2e69d9 of $gameMap[_0x3dca3b(0xb16)]()) { if (!_0x2e69d9) continue; _0xf67f6f[_0x3dca3b(0x286)](_0x2e69d9[_0x3dca3b(0x701) + _0x3dca3b(0x4b2)](), _0x447336) && _0x2e69d9[_0x3dca3b(0x868) + _0x3dca3b(0x5d4) + _0x3dca3b(0x5c8)](); } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x701) + _0x2542b2(0x4b2)] = function () { const _0x145692 = _0x2542b2; return this[_0x145692(0x98d)][_0x145692(0xa15)]; }, Game_Event['prototype']['moveSynchT' + _0x2542b2(0x830)] = function () { const _0x114c89 = _0x2542b2; return this[_0x114c89(0x98d)][_0x114c89(0x22e)]; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x8b9) + 'eed'] = function () { const _0x5ebb51 = _0x2542b2, _0x25d9db = { 'bTcyP': function (_0x28d5b7, _0x23aafa) { return _0x28d5b7 >= _0x23aafa; } }; if (_0x25d9db[_0x5ebb51(0xa5a)](this[_0x5ebb51(0x701) + _0x5ebb51(0x4b2)](), 0x3b * 0x8d + -0x300 + -0x1d7f * 0x1)) { const _0x2271c0 = VisuMZ[_0x5ebb51(0xaf8) + _0x5ebb51(0x922)](this[_0x5ebb51(0x701) + _0x5ebb51(0x4b2)]()); if (_0x2271c0) return _0x2271c0[_0x5ebb51(0x8b9) + _0x5ebb51(0x284)](); } return Game_Character['prototype'][_0x5ebb51(0x8b9) + _0x5ebb51(0x284)][_0x5ebb51(0x325)](this); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x5df) + _0x2542b2(0x4f6)] = function () { const _0x5c4260 = _0x2542b2, _0x5f28de = { 'NbNjY': _0x5c4260(0x21c), 'dxbLu': function (_0x39c7b5, _0x5c987d) { return _0x39c7b5 > _0x5c987d; } }, _0x48f152 = _0x5f28de[_0x5c4260(0x29e)][_0x5c4260(0x968)]('|'); let _0x5f3791 = 0x1e * -0xb5 + 0x1f * -0x10b + 0x358b; while (!![]) { switch (_0x48f152[_0x5f3791++]) { case '0': this[_0x5c4260(0x868) + _0x5c4260(0xaa2)](); continue; case '1': this[_0x5c4260(0x98d)][_0x5c4260(0x9ac)] = this[_0x5c4260(0x98d)]['delay']; continue; case '2': this[_0x5c4260(0x98d)]['timer'] = this[_0x5c4260(0x98d)]['timer'] || 0xec0 * -0x2 + 0x5 * 0x19 + -0x425 * -0x7; continue; case '3': this[_0x5c4260(0x98d)][_0x5c4260(0x9ac)]--; continue; case '4': if (_0x5f28de[_0x5c4260(0xb02)](this[_0x5c4260(0x98d)]['timer'], 0x653 * -0x5 + -0x5de * 0x4 + 0x3717)) return; continue; }break; } }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x9f0) + _0x2542b2(0xa4a) + _0x2542b2(0x420)] = function (_0x50e917) { const _0x279a91 = _0x2542b2, _0x4b4eff = { 'NtCcj': function (_0x56fe64, _0x591785) { return _0x56fe64 >= _0x591785; }, 'lBqUM': function (_0xc1da00, _0x13999f) { return _0xc1da00 - _0x13999f; }, 'EqLLV': function (_0x219057, _0xf25274) { return _0x219057 * _0xf25274; }, 'GSXsq': function (_0x2d599b, _0x440a79) { return _0x2d599b * _0x440a79; } }; if (_0x4b4eff['NtCcj'](this[_0x279a91(0x701) + _0x279a91(0x4b2)](), -0x137 * 0x1d + -0x5 * 0x4a9 + 0x4 * 0xea2)) { const _0x2394ba = VisuMZ[_0x279a91(0xaf8) + _0x279a91(0x922)](this[_0x279a91(0x701) + _0x279a91(0x4b2)]()); if (_0x2394ba) { const _0x3a0444 = _0x4b4eff[_0x279a91(0x654)]($gameMap[_0x279a91(0x25b)](this[_0x279a91(0x812)], this['_realY'], _0x2394ba[_0x279a91(0x812)], _0x2394ba[_0x279a91(0x29c)]), -0x9 * 0x174 + -0x9 * 0x1cf + 0x1d5c), _0x19486e = Math['min']($gameMap[_0x279a91(0x926)](), $gameMap[_0x279a91(0x471)]()), _0x55cc20 = this['_moveSynch'][_0x279a91(0x529) + 'ta'] || -0x1519 * -0x1 + -0x1ad9 + 0x5c0; _0x50e917 -= _0x4b4eff[_0x279a91(0x642)](_0x4b4eff[_0x279a91(0x94a)](Math['max'](0x319 + 0x77d + 0xa96 * -0x1, _0x3a0444), _0x19486e), _0x55cc20); } } return _0x50e917; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + 'eSynch'] = function () { const _0x1612e0 = _0x2542b2, _0x3a0303 = { 'klbxM': _0x1612e0(0x6f6), 'uDoBY': _0x1612e0(0x4a8), 'kBxgV': _0x1612e0(0x60e), 'xmbTX': 'custom', 'qEuOF': _0x1612e0(0xae8), 'TVouY': _0x1612e0(0x749), 'zNWnD': _0x1612e0(0x556) + 'mic', 'mEROk': 'reverse\x20co' + 'py', 'vFLVB': 'mirror\x20hor' + _0x1612e0(0x690), 'FgiQc': _0x1612e0(0x68b) + _0x1612e0(0x221), 'bOMhi': _0x1612e0(0x75b) + 'z', 'UUcvA': _0x1612e0(0x3e2) + 'r', 'PeYrr': _0x1612e0(0x941) + _0x1612e0(0x947), 'SsCjr': 'vertical\x20m' + 'irror', 'nlmzO': _0x1612e0(0x941) + 't', 'JCLkx': _0x1612e0(0xb2e) + 'r' }; switch (this[_0x1612e0(0x701) + _0x1612e0(0x830)]()) { case _0x3a0303[_0x1612e0(0x495)]: this['processMov' + _0x1612e0(0x3a2) + 'om'](); break; case _0x3a0303[_0x1612e0(0x214)]: this[_0x1612e0(0x868) + 'eSynchAppr' + 'oach'](); break; case _0x3a0303['kBxgV']: this[_0x1612e0(0x868) + _0x1612e0(0x5fc)](); break; case _0x3a0303['xmbTX']: this[_0x1612e0(0x868) + 'eSynchCust' + 'om'](); break; case _0x3a0303['qEuOF']: case _0x3a0303[_0x1612e0(0x9fc)]: this['processMov' + _0x1612e0(0x815) + 'c'](); break; case _0x3a0303['zNWnD']: case _0x3a0303[_0x1612e0(0x77a)]: this['processMov' + 'eSynchReve' + 'rseMimic'](); break; case _0x3a0303[_0x1612e0(0x77c)]: case _0x3a0303['FgiQc']: case _0x3a0303[_0x1612e0(0x639)]: case _0x3a0303[_0x1612e0(0x6bd)]: this['processMov' + _0x1612e0(0x35c) + _0x1612e0(0x8e8)](); break; case _0x3a0303[_0x1612e0(0x979)]: case _0x3a0303['SsCjr']: case _0x3a0303[_0x1612e0(0x2ff)]: case _0x3a0303[_0x1612e0(0x83f)]: this[_0x1612e0(0x868) + _0x1612e0(0x35c) + 'orVert'](); break; default: this[_0x1612e0(0x868) + _0x1612e0(0x3a2) + 'om'](); break; }this['update'](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + 'eSynchRand' + 'om'] = function () { const _0x2b7efd = _0x2542b2, _0x29dc2f = { 'rUfap': function (_0x183f94, _0x57d349) { return _0x183f94 > _0x57d349; } }, _0x339ea6 = [-0x680 + 0x5 * 0x172 + -0xb8, -0x1f72 + -0x9f * -0x17 + 0x112d, 0x114b + 0x1f11 + -0x3056, 0x27a * 0x4 + -0x16a1 * -0x1 + -0x2081 * 0x1]; $gameMap[_0x2b7efd(0x599) + _0x2b7efd(0x9a5) + _0x2b7efd(0x618)]() && _0x339ea6[_0x2b7efd(0x33d)](-0x12ff * 0x2 + 0xf63 + 0x169c * 0x1, 0x31d * 0x9 + -0x4e * -0x2b + -0x291c, -0x2050 + 0x495 * 0x7 + 0x44, -0x2 * -0x496 + -0x24f9 + 0x1bd6); const _0x5c3548 = []; for (const _0x12e221 of _0x339ea6) { if (this['canPass'](this['x'], this['y'], _0x12e221)) _0x5c3548[_0x2b7efd(0x33d)](_0x12e221); } if (_0x29dc2f[_0x2b7efd(0x228)](_0x5c3548['length'], 0x20cd * 0x1 + 0xc9b + -0x2d68)) { const _0x3586e5 = _0x5c3548[Math[_0x2b7efd(0x500)](_0x5c3548[_0x2b7efd(0x50b)])]; this[_0x2b7efd(0x27b) + _0x2b7efd(0x2f6)](_0x3586e5); } }, Game_Event['prototype'][_0x2542b2(0x868) + _0x2542b2(0x9b9) + _0x2542b2(0x616)] = function () { const _0x23d2d6 = _0x2542b2, _0x4ac7ce = VisuMZ[_0x23d2d6(0xaf8) + _0x23d2d6(0x922)](this[_0x23d2d6(0x701) + 'arget']()); this['moveToward' + _0x23d2d6(0x23b)](_0x4ac7ce); }, Game_Event['prototype'][_0x2542b2(0x868) + 'eSynchAway'] = function () { const _0x276b97 = _0x2542b2, _0x5cb400 = VisuMZ[_0x276b97(0xaf8) + 'chTarget'](this['moveSynchT' + _0x276b97(0x4b2)]()); this[_0x276b97(0x9d5) + _0x276b97(0x66a) + 'r'](_0x5cb400); }, Game_Event['prototype'][_0x2542b2(0x868) + _0x2542b2(0x393) + 'om'] = function () { const _0x373b81 = _0x2542b2; this[_0x373b81(0x5d1) + _0x373b81(0xa08)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x815) + 'c'] = function () { const _0x36adb7 = _0x2542b2, _0x1e3072 = VisuMZ[_0x36adb7(0xaf8) + 'chTarget'](this[_0x36adb7(0x701) + 'arget']()); this['executeMov' + 'eDir8'](_0x1e3072[_0x36adb7(0x37c) + 'irection']()); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + 'eSynchReve' + _0x2542b2(0x9a3)] = function () { const _0x1f41bc = _0x2542b2, _0x1e866f = VisuMZ[_0x1f41bc(0xaf8) + _0x1f41bc(0x922)](this[_0x1f41bc(0x701) + _0x1f41bc(0x4b2)]()); this[_0x1f41bc(0x27b) + 'eDir8'](this[_0x1f41bc(0x68d)](_0x1e866f[_0x1f41bc(0x37c) + _0x1f41bc(0x563)]())); }, Game_Event['prototype'][_0x2542b2(0x868) + _0x2542b2(0x35c) + _0x2542b2(0x8e8)] = function () { const _0x384beb = _0x2542b2, _0xfc1641 = VisuMZ[_0x384beb(0xaf8) + _0x384beb(0x922)](this[_0x384beb(0x701) + 'arget']()), _0x3d1263 = [0xe10 + -0x94f * -0x1 + -0x175f * 0x1, 0x65 * 0x2a + 0x1 * 0x1d8d + -0x2e18, -0x134f + 0x1b7 * -0x1 + 0x150e, 0x566 * -0x4 + 0xd * -0x1cf + 0x2d24, -0x22b7 + -0x7 * -0x6a + 0x1fd5 * 0x1, 0x6 * 0x267 + 0x1 * 0x3eb + 0xd * -0x169, -0x362 * -0x6 + -0x30 * -0x4e + -0x22e6, -0xc1d + 0x150b + -0x8ed, 0x1288 + -0x167b + 0x3f5, 0x929 + 0xf70 * 0x2 + -0x2806][_0xfc1641[_0x384beb(0x37c) + 'irection']()]; this[_0x384beb(0x27b) + _0x384beb(0x2f6)](_0x3d1263); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + _0x2542b2(0x35c) + 'orVert'] = function () { const _0x373761 = _0x2542b2, _0x1c3967 = VisuMZ[_0x373761(0xaf8) + _0x373761(0x922)](this[_0x373761(0x701) + 'arget']()), _0x1fca8b = [0x18fc + 0x11 * -0xc1 + -0xc2b, -0x1a1 * -0x11 + -0x1 * 0x421 + -0x178d, -0x29 * 0x7b + 0x595 + 0xe20, 0x1d * -0x14b + 0x217c + -0x404 * -0x1, -0x11c5 + 0x112 * -0x3 + 0x1 * 0x1501, 0x1 * -0x1e66 + 0x1f85 + -0x11f, 0x212d + -0x102 + 0x2027 * -0x1, -0xe * 0x61 + 0x6 * 0x1d3 + -0xcd * 0x7, -0x1b60 + 0x1 * 0xd3f + -0xe29 * -0x1, 0x64d * -0x2 + 0x262d + -0x198c][_0x1c3967[_0x373761(0x37c) + _0x373761(0x563)]()]; this['executeMov' + 'eDir8'](_0x1fca8b); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x868) + 'eSynchDire' + _0x2542b2(0x5c8)] = function () { const _0xd35607 = _0x2542b2, _0x3843ed = { 'lmZBm': _0xd35607(0xae8), 'CsBXL': _0xd35607(0x749), 'JzRMY': _0xd35607(0x556) + _0xd35607(0x41c), 'unJGX': 'reverse\x20co' + 'py', 'ciVLW': _0xd35607(0x75b) + _0xd35607(0x690), 'IXNMq': _0xd35607(0x68b) + _0xd35607(0x221), 'HTjBg': 'mirror\x20hor' + 'z', 'AhVgy': 'horz\x20mirro' + 'r', 'wfbFW': _0xd35607(0x941) + 'tical', 'IDZNR': _0xd35607(0xb3f) + _0xd35607(0x606), 'AUEKP': _0xd35607(0x941) + 't', 'KLaHu': _0xd35607(0xb2e) + 'r' }, _0x2bf298 = VisuMZ[_0xd35607(0xaf8) + _0xd35607(0x922)](this[_0xd35607(0x701) + _0xd35607(0x4b2)]()), _0x1c7b55 = _0x2bf298['direction'](); switch (this['moveSynchT' + _0xd35607(0x830)]()) { case _0x3843ed['lmZBm']: case _0x3843ed[_0xd35607(0x268)]: this[_0xd35607(0x4c3) + 'on'](_0x1c7b55); break; case _0x3843ed[_0xd35607(0xabd)]: case _0x3843ed[_0xd35607(0x957)]: this[_0xd35607(0x4c3) + 'on'](this[_0xd35607(0x68d)](_0x1c7b55)); break; case _0x3843ed[_0xd35607(0x47d)]: case _0x3843ed['IXNMq']: case _0x3843ed['HTjBg']: case _0x3843ed[_0xd35607(0x456)]: this['setDirecti' + 'on']([0x1c * -0xe6 + 0xcce + 0xc5a, 0x13 * -0x109 + 0x27a + 0x1138, 0x1fef + 0x5ea + 0x567 * -0x7, -0x12f1 + 0x1829 * 0x1 + -0x52f * 0x1, 0x194a + 0x72d * 0x1 + 0x47 * -0x75, -0x23d3 + -0x1830 + 0x3c03 * 0x1, 0x1296 + 0x4e4 * -0x1 + -0x7 * 0x1f4, 0x511 * -0x6 + 0x180c + -0x1 * -0x65b, 0x561 * -0x4 + 0x5 * 0x649 + -0x9e7, 0x1203 + -0x9a * -0x3a + -0x34e4][_0x1c7b55]); break; case _0x3843ed[_0xd35607(0x324)]: case _0x3843ed[_0xd35607(0x314)]: case _0x3843ed[_0xd35607(0x9d2)]: case _0x3843ed[_0xd35607(0x2ea)]: this[_0xd35607(0x4c3) + 'on']([0x5 * 0x1cf + 0x6c3 * -0x2 + -0x47b * -0x1, 0x2537 + 0xd * 0x5c + -0x50 * 0x86, -0xcf9 + -0x12e7 + -0x247 * -0xe, 0x2e9 * -0xc + 0x17a5 + 0xb48, 0x1 * 0x1a5e + 0x20dc + 0x9 * -0x694, -0x1cbb + 0x57 * 0x6c + -0x1 * 0x7f9, -0x223f + -0x15b * -0x9 + -0x2 * -0xb08, 0x16ad + -0x127e + -0x426, 0x851 + -0x19a * -0x17 + -0x2d1f, 0x1 * -0x5e3 + 0x185b + -0x1271][_0x1c7b55]); break; default: return; }this[_0xd35607(0x316)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x9b4) + _0x2542b2(0x74f) + 'ition'] = function () { const _0x49fc4e = _0x2542b2, _0x276b10 = { 'LVBnJ': function (_0x295382, _0x48e7ad) { return _0x295382 === _0x48e7ad; } }, _0x234045 = $gameSystem['getSavedEv' + _0x49fc4e(0xa01) + 'n'](this); if (!_0x234045) return; this[_0x49fc4e(0xa4e) + 'n'](_0x234045['x'], _0x234045['y']), this[_0x49fc4e(0x8be) + _0x49fc4e(0xa34)](), this[_0x49fc4e(0x4c3) + 'on'](_0x234045['direction']), _0x276b10[_0x49fc4e(0x7d7)](this['_pageIndex'], _0x234045[_0x49fc4e(0x3c3)]) && (this[_0x49fc4e(0x5a8) + 'Index'] = _0x234045[_0x49fc4e(0x9df) + _0x49fc4e(0x28a)]); }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x6ce) + '_update'] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x316)], Game_Event[_0x2542b2(0x336)]['update'] = function () { const _0x299ba5 = _0x2542b2; VisuMZ[_0x299ba5(0x6af) + _0x299ba5(0x53e)]['Game_Event' + _0x299ba5(0x470)]['call'](this), !Utils[_0x299ba5(0x3d3) + 'vice']() && this['updateSave' + _0x299ba5(0x4ee) + 'ion'](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x5df)] = function () { const _0x13c987 = _0x2542b2; Game_Character[_0x13c987(0x336)][_0x13c987(0x5df)][_0x13c987(0x325)](this), this['autosaveEv' + _0x13c987(0xa01) + 'n'](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x896) + _0x2542b2(0xb10)] = function () { const _0x512c77 = _0x2542b2; if ($gameMap[_0x512c77(0x896) + 'tLocations']()) return !![]; return this['_saveEvent' + _0x512c77(0x84f)]; }, Game_Event[_0x2542b2(0x336)]['autosaveEv' + 'entLocatio' + 'n'] = function () { const _0x253562 = _0x2542b2; if (!this[_0x253562(0x896) + _0x253562(0xb10)]()) return; this[_0x253562(0xa44) + _0x253562(0xb29)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0xa44) + 'ocation'] = function () { const _0x39b1fb = _0x2542b2; this['_requestSa' + 'veEventLoc' + _0x39b1fb(0x455)] = !![]; }, Game_Event['prototype'][_0x2542b2(0x5af) + _0x2542b2(0x4ee) + _0x2542b2(0x891)] = function () { const _0x2d697c = _0x2542b2; this[_0x2d697c(0x549) + _0x2d697c(0x4d8) + 'ation'] && this['processSav' + _0x2d697c(0x202) + _0x2d697c(0x388)](); }, Game_Event['prototype'][_0x2542b2(0x970) + _0x2542b2(0x202) + _0x2542b2(0x388)] = function () { const _0x37e716 = _0x2542b2; this['_requestSa' + _0x37e716(0x4d8) + _0x37e716(0x455)] = ![], $gameSystem[_0x37e716(0xa44) + _0x37e716(0xb29)](this); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x3a8) + _0x2542b2(0xb10)] = function () { const _0x20f77f = _0x2542b2; $gameSystem[_0x20f77f(0x914) + _0x20f77f(0x674) + _0x20f77f(0x388)](this); }, Game_Event['prototype'][_0x2542b2(0x78e) + _0x2542b2(0x72e)] = function () { const _0x2ad742 = _0x2542b2; return $gameSystem['getEventIc' + _0x2ad742(0x72e)](this) ? Game_Character[_0x2ad742(0x336)][_0x2ad742(0x78e) + _0x2ad742(0x72e)][_0x2ad742(0x325)](this) : { 'iconIndex': 0x0, 'bufferX': settings[_0x2ad742(0x39e)]['BufferX'], 'bufferY': settings['Icon'][_0x2ad742(0x719)], 'blendMode': settings[_0x2ad742(0x39e)][_0x2ad742(0x45e)] }; }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x752)] = function () { const _0x244a99 = _0x2542b2; return this[_0x244a99(0x9c1)]; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + _0x2542b2(0x818) + _0x2542b2(0x3aa)] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)], Game_Event[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)] = function (_0x15ef0d) { const _0x26a5fc = _0x2542b2, _0x460fcb = VisuMZ[_0x26a5fc(0x6af) + _0x26a5fc(0x53e)]['Game_Event' + _0x26a5fc(0x818) + _0x26a5fc(0x3aa)]['call'](this, _0x15ef0d); if (!_0x460fcb) return ![]; return this[_0x26a5fc(0x945)](_0x15ef0d); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x945)] = function (_0x4702e8) { const _0x45b6b6 = _0x2542b2, _0x56ab9b = { 'WpLhT': _0x45b6b6(0x993), 'LrtiX': function (_0x8304af, _0x4818af) { return _0x8304af > _0x4818af; }, 'eOOma': function (_0x32294a, _0x17a506) { return _0x32294a === _0x17a506; } }, _0x59f182 = _0x56ab9b['WpLhT'][_0x45b6b6(0x968)]('|'); let _0x3f12c9 = 0x3 * 0x8ed + 0x187 + -0x1c4e; while (!![]) { switch (_0x59f182[_0x3f12c9++]) { case '0': if (_0x56ab9b[_0x45b6b6(0x404)](_0x4702e8[_0x45b6b6(0x982)][_0x45b6b6(0x50b)], 0x1 * 0x17dd + -0x1 * 0x3da + 0x6d * -0x2f)) return $gameMap[_0x45b6b6(0x264)](this['_eventId']) && VisuMZ[_0x45b6b6(0x6af) + _0x45b6b6(0x53e)][_0x45b6b6(0xb0e) + 'Conditions'][_0x45b6b6(0x4a1)](_0x4702e8[_0x45b6b6(0x982)], this['_eventId']); continue; case '1': _0x56ab9b['eOOma'](_0x4702e8['CPC'], undefined) && VisuMZ[_0x45b6b6(0x6af) + 'Core']['CustomPage' + 'Conditions'][_0x45b6b6(0x59a)](_0x4702e8); continue; case '2': VisuMZ[_0x45b6b6(0x6af) + 'Core'][_0x45b6b6(0xb0e) + _0x45b6b6(0x20b)]['loadCPC'](_0x4702e8); continue; case '3': this[_0x45b6b6(0x9c1)] = _0x56ab9b[_0x45b6b6(0x404)](_0x4702e8[_0x45b6b6(0x982)][_0x45b6b6(0x50b)], 0x1bb8 + 0x223d + 0x137 * -0x33); continue; case '4': return !![]; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2bb) + _0x2542b2(0x818) + _0x2542b2(0x3aa)] = Game_Troop[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)], Game_Troop[_0x2542b2(0x336)][_0x2542b2(0x1d6) + _0x2542b2(0x2b4)] = function (_0x260cf8) { const _0x185eba = _0x2542b2; var _0x570e04 = VisuMZ[_0x185eba(0x6af) + _0x185eba(0x53e)]['Game_Troop' + _0x185eba(0x818) + _0x185eba(0x3aa)][_0x185eba(0x325)](this, _0x260cf8); return _0x570e04 && this[_0x185eba(0x204)](_0x260cf8); }, Game_Troop[_0x2542b2(0x336)][_0x2542b2(0x204)] = function (_0x206daa) { const _0x3d97b0 = _0x2542b2, _0x3ba238 = { 'WdNkR': function (_0x225f5f, _0x184f8e) { return _0x225f5f === _0x184f8e; }, 'WAQaV': function (_0x2eba61, _0x9e2b8d) { return _0x2eba61 > _0x9e2b8d; } }; _0x3ba238[_0x3d97b0(0x885)](_0x206daa[_0x3d97b0(0x982)], undefined) && VisuMZ['EventsMove' + _0x3d97b0(0x53e)][_0x3d97b0(0xb0e) + _0x3d97b0(0x20b)][_0x3d97b0(0x59a)](_0x206daa); if (_0x3ba238['WAQaV'](_0x206daa[_0x3d97b0(0x982)]['length'], 0x19 * -0x139 + 0x163a + -0x131 * -0x7)) return VisuMZ[_0x3d97b0(0x6af) + _0x3d97b0(0x53e)][_0x3d97b0(0xb0e) + _0x3d97b0(0x20b)][_0x3d97b0(0x4a1)](_0x206daa[_0x3d97b0(0x982)], 0x752 + 0x1ac + -0x8fe); return !![]; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + _0x2542b2(0x850)] = Game_Event['prototype'][_0x2542b2(0x740)], Game_Event[_0x2542b2(0x336)]['locate'] = function (_0x2629b4, _0x2388e9) { const _0x440f10 = _0x2542b2, _0x4b832e = { 'cJEab': function (_0x5da6de, _0x40da81) { return _0x5da6de(_0x40da81); }, 'JzjMV': function (_0x29f2ec, _0x4fc570) { return _0x29f2ec(_0x4fc570); }, 'vUjOC': function (_0xfed4c6, _0x1878bb) { return _0xfed4c6(_0x1878bb); }, 'EJtje': function (_0xb5797c, _0x20e007) { return _0xb5797c(_0x20e007); } }; if (this[_0x440f10(0x7aa) + _0x440f10(0x9ed) + 'g']) { const _0x4a60eb = this[_0x440f10(0x264)]()[_0x440f10(0x23e)] || ''; if (_0x4a60eb['match'](/<(?:LOCATION|START|START LOCATION):[ ](.*?)>/i)) { const _0x585364 = _0x4b832e[_0x440f10(0x9d4)](String, RegExp['$1'])[_0x440f10(0x968)](',')[_0x440f10(0xaf6)](_0x435545 => Number(_0x435545)); _0x2629b4 += _0x4b832e[_0x440f10(0x35d)](Number, _0x585364[-0x2088 * 0x1 + 0x17a4 + 0x8e4] || 0x2d2 * 0x1 + 0x1 * 0x1654 + -0x1926) || -0x15f * 0x1c + 0x2650 + 0xa * 0x2, _0x2388e9 += _0x4b832e['vUjOC'](Number, _0x585364[-0x63a + 0x1d8e * -0x1 + 0x23c9] || -0x168c + -0x14ec + 0x2b78) || -0xeea + 0xe * -0x1db + 0x28e4 * 0x1; } _0x4a60eb['match'](/<(?:LOCATION|START|START LOCATION) X:[ ](.*?)>/i) && (_0x2629b4 += _0x4b832e[_0x440f10(0x9d4)](Number, RegExp['$1'])), _0x4a60eb[_0x440f10(0x4d6)](/<(?:LOCATION|START|START LOCATION) Y:[ ](.*?)>/i) && (_0x2388e9 += _0x4b832e[_0x440f10(0x5ae)](Number, RegExp['$1'])); } VisuMZ[_0x440f10(0x6af) + _0x440f10(0x53e)][_0x440f10(0x6ce) + '_locate'][_0x440f10(0x325)](this, _0x2629b4, _0x2388e9), this['_randomHom' + 'eX'] = _0x2629b4, this[_0x440f10(0x374) + 'eY'] = _0x2388e9, this['autosaveEv' + 'entLocatio' + 'n'](); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ce) + '_moveTypeR' + _0x2542b2(0x683)] = Game_Event[_0x2542b2(0x336)][_0x2542b2(0x74e) + _0x2542b2(0x4aa)], Game_Event[_0x2542b2(0x336)]['moveTypeRa' + _0x2542b2(0x4aa)] = function () { const _0x2f3e4e = _0x2542b2, _0x36b34a = { 'bcPfQ': function (_0x415480, _0x2b4bb1) { return _0x415480 * _0x2b4bb1; }, 'vdfcp': function (_0x4b6af5, _0xcc947e) { return _0x4b6af5 >= _0xcc947e; } }, _0xf700d4 = $gameMap[_0x2f3e4e(0x25b)](this['x'], this['y'], this[_0x2f3e4e(0x374) + 'eX'], this[_0x2f3e4e(0x374) + 'eY']), _0x3bb0dc = _0x36b34a[_0x2f3e4e(0x840)](_0xf700d4, this[_0x2f3e4e(0x69e) + _0x2f3e4e(0x208)] || -0xd63 + -0x5 * 0x3b + -0x1 * -0xe8a); _0x36b34a[_0x2f3e4e(0x433)](Math[_0x2f3e4e(0x6f6)](), _0x3bb0dc) ? VisuMZ[_0x2f3e4e(0x6af) + _0x2f3e4e(0x53e)][_0x2f3e4e(0x6ce) + _0x2f3e4e(0x3e6) + _0x2f3e4e(0x683)][_0x2f3e4e(0x325)](this) : this[_0x2f3e4e(0x42f) + _0x2f3e4e(0x7fd)](); }, Game_Event[_0x2542b2(0x336)][_0x2542b2(0x42f) + _0x2542b2(0x7fd)] = function () { const _0x34c7c4 = _0x2542b2, _0x4ebd10 = { 'HlLJK': function (_0x1b8349, _0xf3ee24) { return _0x1b8349 > _0xf3ee24; }, 'Jipfx': function (_0x51454d, _0x537c69) { return _0x51454d !== _0x537c69; }, 'KrbXE': function (_0x377795, _0x468c60) { return _0x377795 !== _0x468c60; }, 'qixcd': function (_0x3f3615, _0x3b2acd) { return _0x3f3615 > _0x3b2acd; } }, _0x45e71a = this[_0x34c7c4(0x745)](this['_randomHom' + 'eX']), _0x5bfb1b = this['deltaYFrom'](this['_randomHom' + 'eY']); if (_0x4ebd10[_0x34c7c4(0x676)](Math[_0x34c7c4(0x620)](_0x45e71a), Math['abs'](_0x5bfb1b))) this['moveStraig' + 'ht'](_0x4ebd10['HlLJK'](_0x45e71a, -0x5fb + -0x5b2 + -0x31 * -0x3d) ? -0xb92 + 0x1 * 0x13f1 + -0x85b : 0x2 * 0x207 + -0x1 * 0x3cd + -0x1 * 0x3b), !this[_0x34c7c4(0x330) + _0x34c7c4(0x95e)]() && _0x4ebd10[_0x34c7c4(0xa87)](_0x5bfb1b, 0x2 * -0x7a + 0x246c + -0x2 * 0x11bc) && this[_0x34c7c4(0x7f9) + 'ht'](_0x4ebd10[_0x34c7c4(0x676)](_0x5bfb1b, -0x27 * -0x13 + 0xab + -0x390) ? -0x1 * -0x231 + 0xbe * -0x2a + 0x425 * 0x7 : -0x2 * 0x10bb + -0x8fa + 0x2a72); else _0x4ebd10[_0x34c7c4(0xa87)](_0x5bfb1b, -0x1 * -0xca3 + 0x9fb * 0x1 + -0x169e) && (this['moveStraig' + 'ht'](_0x4ebd10[_0x34c7c4(0x676)](_0x5bfb1b, 0x1 * 0xa54 + 0x89e * 0x3 + -0x242e * 0x1) ? 0x1de4 + -0x1 * -0x1e13 + 0x43 * -0xe5 : 0x9 * -0x284 + 0x1241 + 0xe1 * 0x5), !this[_0x34c7c4(0x330) + 'Succeeded']() && _0x4ebd10[_0x34c7c4(0x368)](_0x45e71a, -0x1280 + -0x1806 + 0x2a86) && this['moveStraig' + 'ht'](_0x4ebd10[_0x34c7c4(0x229)](_0x45e71a, 0x3b7 + 0x22ca + -0x2681) ? 0x135a * 0x1 + -0x73 + 0x12e3 * -0x1 : 0x750 + -0x13 * -0x3f + 0x3 * -0x3fd)); }, Game_CharacterBase['prototype'][_0x2542b2(0x2d5) + _0x2542b2(0x697) + 'ttings'] = function () { const _0xe6b465 = _0x2542b2; this[_0xe6b465(0x99f) + _0xe6b465(0x778)] = { 'filename': '', 'blendMode': 0x0, 'maxSize': 0x0, 'offsetX': 0x0, 'offsetY': 0x0, 'scale': 0x1 }; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x3b9) + _0x2542b2(0x6cb) + 's'] = function () { const _0x374940 = _0x2542b2, _0x8e0a81 = { 'rUAQx': function (_0x642ebc, _0x556a74) { return _0x642ebc === _0x556a74; } }; if (_0x8e0a81[_0x374940(0x588)](this[_0x374940(0x99f) + _0x374940(0x778)], undefined)) this['clearAttac' + 'hPictureSe' + 'ttings'](); return this[_0x374940(0x99f) + _0x374940(0x778)]; }, Game_CharacterBase['prototype'][_0x2542b2(0x3b9) + _0x2542b2(0xb1e) + 'e'] = function () { const _0x196350 = _0x2542b2; return this[_0x196350(0x3b9) + _0x196350(0x6cb) + 's']()[_0x196350(0x267)] ?? ''; }, Game_CharacterBase[_0x2542b2(0x336)]['attachPict' + _0x2542b2(0x6b2) + 'de'] = function () { const _0x2349f4 = _0x2542b2; return this[_0x2349f4(0x3b9) + 'ureSetting' + 's']()[_0x2349f4(0xb5e)] ?? 0x117e + -0x1f24 + 0xda6; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x3b9) + 'ureMaxSize'] = function () { const _0x1c1629 = _0x2542b2; return this['attachPict' + _0x1c1629(0x6cb) + 's']()['maxSize'] ?? 0x9d9 * -0x1 + -0x201 + 0xbda; }, Game_CharacterBase[_0x2542b2(0x336)]['attachPict' + 'ureOffsetX'] = function () { const _0x473ac1 = _0x2542b2; return this[_0x473ac1(0x3b9) + _0x473ac1(0x6cb) + 's']()['offsetX'] ?? -0x1a0 * -0x10 + -0x13b7 + 0x1 * -0x649; }, Game_CharacterBase['prototype'][_0x2542b2(0x3b9) + 'ureOffsetY'] = function () { const _0x2390e7 = _0x2542b2; return this[_0x2390e7(0x3b9) + _0x2390e7(0x6cb) + 's']()[_0x2390e7(0xb51)] ?? 0x41d + 0x5 * 0x4bd + -0x1bce; }, Game_CharacterBase[_0x2542b2(0x336)][_0x2542b2(0x3b9) + _0x2542b2(0x6ea)] = function () { const _0x5db1f2 = _0x2542b2; return this[_0x5db1f2(0x3b9) + _0x5db1f2(0x6cb) + 's']()['scale'] ?? 0x1 * -0x1f15 + -0x3f4 + 0xd * 0x2b2; }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x6ae) + _0x2542b2(0x886) + _0x2542b2(0x6ab) + 'e'] = Game_Interpreter[_0x2542b2(0x336)][_0x2542b2(0x40d) + _0x2542b2(0x313)], Game_Interpreter['prototype'][_0x2542b2(0x40d) + _0x2542b2(0x313)] = function () { const _0x170e5a = _0x2542b2, _0x543900 = { 'eFjtu': function (_0x2bfa89, _0x598644) { return _0x2bfa89 === _0x598644; }, 'IUbKJ': 'CallEvent' }; if (_0x543900[_0x170e5a(0x575)](this[_0x170e5a(0x430)], _0x543900[_0x170e5a(0xae1)])) { if (window[this['_callEvent' + _0x170e5a(0x904)]]) this[_0x170e5a(0x430)] = '', this[_0x170e5a(0x9bc) + _0x170e5a(0x3c5)](); else return !![]; } else return VisuMZ[_0x170e5a(0x6af) + _0x170e5a(0x53e)][_0x170e5a(0x6ae) + 'preter_upd' + _0x170e5a(0x6ab) + 'e'][_0x170e5a(0x325)](this); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ae) + _0x2542b2(0x434) + _0x2542b2(0x687) + 'd'] = Game_Interpreter[_0x2542b2(0x336)][_0x2542b2(0x76c) + _0x2542b2(0x48a)], Game_Interpreter['prototype'][_0x2542b2(0x76c) + _0x2542b2(0x48a)] = function () { const _0x40541d = _0x2542b2, _0x2a1092 = $gameMap && this[_0x40541d(0x923)] ? $gameMap[_0x40541d(0x264)](this[_0x40541d(0x923)]) : null; $gameTemp[_0x40541d(0x3df) + _0x40541d(0xb57)](_0x2a1092); const _0x5295a2 = VisuMZ[_0x40541d(0x6af) + 'Core']['Game_Inter' + 'preter_exe' + _0x40541d(0x687) + 'd'][_0x40541d(0x325)](this); return $gameTemp[_0x40541d(0x73e) + _0x40541d(0x4b2)](), _0x5295a2; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x6ae) + _0x2542b2(0x608) + _0x2542b2(0x9b8)] = Game_Interpreter[_0x2542b2(0x336)]['command357'], Game_Interpreter[_0x2542b2(0x336)][_0x2542b2(0x2b5)] = function (_0x358d3e) { const _0x5aeb4e = _0x2542b2; return $gameTemp[_0x5aeb4e(0x32e) + _0x5aeb4e(0x9b8) + _0x5aeb4e(0x290) + 'r'](this), VisuMZ[_0x5aeb4e(0x6af) + _0x5aeb4e(0x53e)][_0x5aeb4e(0x6ae) + _0x5aeb4e(0x608) + _0x5aeb4e(0x9b8)][_0x5aeb4e(0x325)](this, _0x358d3e); }, Game_Interpreter[_0x2542b2(0x336)]['pluginComm' + 'andCallEve' + 'nt'] = function (_0x457721) { const _0xfbe4ed = _0x2542b2, _0x424e5d = { 'Deqaw': _0xfbe4ed(0x277), 'MfghE': function (_0x4fc1f3, _0x12d67b) { return _0x4fc1f3 + _0x12d67b; }, 'Dcrtm': _0xfbe4ed(0x890) + _0xfbe4ed(0x904), 'CBWPA': _0xfbe4ed(0x632) }; this[_0xfbe4ed(0x64f) + 'Data'] = _0x457721; const _0x3875f5 = _0x424e5d['Deqaw'][_0xfbe4ed(0x2c1)](_0x457721['mapId'][_0xfbe4ed(0xb00)](-0x1ead * 0x1 + 0x2 * 0x4d5 + 0x1506)); this['_callEvent' + _0xfbe4ed(0x904)] = _0x424e5d[_0xfbe4ed(0x291)](_0x424e5d[_0xfbe4ed(0x291)](_0x424e5d[_0xfbe4ed(0x291)](_0x424e5d[_0xfbe4ed(0x46e)], Graphics[_0xfbe4ed(0x89a)]), '_'), this[_0xfbe4ed(0x478)]()), DataManager[_0xfbe4ed(0x6f7) + 'le'](this['_callEvent' + _0xfbe4ed(0x904)], _0x3875f5), window[this[_0xfbe4ed(0x64f) + 'Map']] ? this[_0xfbe4ed(0x9bc) + _0xfbe4ed(0x3c5)]() : this[_0xfbe4ed(0x845) + 'e'](_0x424e5d['CBWPA']); }, Game_Interpreter['prototype'][_0x2542b2(0x9bc) + _0x2542b2(0x3c5)] = function () { const _0x1b4969 = _0x2542b2, _0x5195f2 = { 'UGmIq': function (_0x730c80, _0xa3ad1a) { return _0x730c80 - _0xa3ad1a; } }, _0x4c799e = this[_0x1b4969(0x64f) + _0x1b4969(0xa59)], _0x530c36 = window[this[_0x1b4969(0x64f) + _0x1b4969(0x904)]], _0x2aa406 = _0x530c36['events'][_0x4c799e['eventId']]; if (_0x2aa406 && _0x2aa406[_0x1b4969(0x98b)][_0x5195f2[_0x1b4969(0x502)](_0x4c799e['pageId'], -0x1 * 0x1e25 + 0x3 * 0x922 + -0xb0 * -0x4)]) { const _0x402e94 = _0x2aa406[_0x1b4969(0x98b)][_0x5195f2[_0x1b4969(0x502)](_0x4c799e[_0x1b4969(0x6ba)], 0x1e64 + 0x3f * -0x79 + 0x34 * -0x3)][_0x1b4969(0x7a8)]; this[_0x1b4969(0xb66)](_0x402e94, this[_0x1b4969(0x478)]()); } window[this[_0x1b4969(0x64f) + _0x1b4969(0x904)]] = undefined, this[_0x1b4969(0x64f) + 'Map'] = undefined, this[_0x1b4969(0x64f) + _0x1b4969(0xa59)] = undefined; }; function Game_CPCInterpreter() { const _0x2e416f = _0x2542b2; this['initialize'][_0x2e416f(0x4b9)](this, arguments); }; Game_CPCInterpreter[_0x2542b2(0x336)] = Object['create'](Game_Interpreter['prototype']), Game_CPCInterpreter[_0x2542b2(0x336)][_0x2542b2(0x6dc) + 'r'] = Game_CPCInterpreter, Game_CPCInterpreter[_0x2542b2(0x336)]['clear'] = function () { const _0x5823be = _0x2542b2; Game_Interpreter[_0x5823be(0x336)][_0x5823be(0x9ad)][_0x5823be(0x325)](this), this[_0x5823be(0xa7c)] = ![]; }, Game_CPCInterpreter[_0x2542b2(0x336)][_0x2542b2(0x347)] = function () { const _0x37963c = _0x2542b2; while (this[_0x37963c(0x1e4)]()) { this[_0x37963c(0x76c) + _0x37963c(0x48a)](); } }, Game_CPCInterpreter[_0x2542b2(0x336)][_0x2542b2(0x76c) + _0x2542b2(0xb49)] = function (_0x10516f) { const _0x48dd51 = _0x2542b2; while (this[_0x48dd51(0x1e4)]()) { this['executeCom' + 'mandCommon' + 'Event'](_0x10516f); } }, Game_CPCInterpreter[_0x2542b2(0x336)][_0x2542b2(0x76c) + _0x2542b2(0x567) + _0x2542b2(0xac5)] = function (_0x415594) { const _0x3db7c1 = _0x2542b2, _0x14984b = _0x415594; $gameTemp[_0x3db7c1(0x3df) + _0x3db7c1(0xb57)](_0x14984b); const _0x5d955d = VisuMZ[_0x3db7c1(0x6af) + _0x3db7c1(0x53e)][_0x3db7c1(0x6ae) + _0x3db7c1(0x434) + _0x3db7c1(0x687) + 'd'][_0x3db7c1(0x325)](this); return $gameTemp['clearSelfT' + _0x3db7c1(0x4b2)](), _0x5d955d; }, Game_CPCInterpreter[_0x2542b2(0x336)][_0x2542b2(0x491)] = function (_0x4b4b28) { const _0x26ef13 = _0x2542b2; return Game_Interpreter[_0x26ef13(0x336)]['command108']['call'](this, _0x4b4b28), this[_0x26ef13(0x635)][_0x26ef13(0x415)](_0x483b3d => _0x483b3d['match'](/<(?:CONDITION|CONDITIONS) MET>/i)) && (this[_0x26ef13(0xa7c)] = !![]), !![]; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)]['Scene_Map_' + _0x2542b2(0x796) + 'nterEffect'] = Scene_Map[_0x2542b2(0x336)][_0x2542b2(0x796) + 'nterEffect'], Scene_Map[_0x2542b2(0x336)][_0x2542b2(0x796) + _0x2542b2(0x5db)] = function () { const _0xc6d87d = _0x2542b2; VisuMZ[_0xc6d87d(0x6af) + 'Core'][_0xc6d87d(0x7c4) + 'startEncou' + _0xc6d87d(0x5db)]['call'](this), this[_0xc6d87d(0x541)][_0xc6d87d(0x348) + 's'](); }, VisuMZ[_0x2542b2(0x6af) + 'Core']['Scene_Load' + _0x2542b2(0x9a1) + _0x2542b2(0x813)] = Scene_Load['prototype'][_0x2542b2(0x584) + _0x2542b2(0x5e5)], Scene_Load['prototype']['onLoadSucc' + 'ess'] = function () { const _0xc55b0b = _0x2542b2; if ($gameMap) $gameMap[_0xc55b0b(0x624) + 'Cache'](); VisuMZ[_0xc55b0b(0x6af) + _0xc55b0b(0x53e)][_0xc55b0b(0x861) + _0xc55b0b(0x9a1) + _0xc55b0b(0x813)][_0xc55b0b(0x325)](this); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Sprite_Cha' + _0x2542b2(0x91d) + _0x2542b2(0x570)] = Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x452) + 's'], Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x452) + 's'] = function () { const _0x1f334e = _0x2542b2; VisuMZ[_0x1f334e(0x6af) + 'Core'][_0x1f334e(0x2e4) + _0x1f334e(0x91d) + _0x1f334e(0x570)]['call'](this), this[_0x1f334e(0x452) + _0x1f334e(0x874) + 'eCore'](), this['createAtta' + _0x1f334e(0x9e7) + _0x1f334e(0x8c9)](), this[_0x1f334e(0xabc) + _0x1f334e(0x604)](); }, Sprite_Character[_0x2542b2(0x336)]['initMember' + 'sEventsMov' + _0x2542b2(0x65b)] = function () { const _0x28e8d1 = _0x2542b2; this[_0x28e8d1(0x75e) + 'city'] = 0x61 * -0x13 + -0x1bea * -0x1 + -0x13b8, this[_0x28e8d1(0x437) + 'erSpriteSh' + _0x28e8d1(0x8ba) + 'le'] = ![]; }, Sprite_Character[_0x2542b2(0x336)]['isSpriteVS' + _0x2542b2(0x826)] = function () { const _0x206520 = _0x2542b2; return this['_character' + 'Name'] && this[_0x206520(0xab0) + _0x206520(0x615)][_0x206520(0x4d6)](/\[VS8\]/i); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x51d) + _0x2542b2(0x2a2)] = function () { const _0x5ede2b = _0x2542b2; return this[_0x5ede2b(0x335) + _0x5ede2b(0x826)]() && VisuMZ['EventsMove' + 'Core'][_0x5ede2b(0x2cc)][_0x5ede2b(0xa70)]['AutoBuffer']; }, Sprite_Character['prototype'][_0x2542b2(0x200) + _0x2542b2(0x9e7) + _0x2542b2(0x8c9)] = function () { const _0x4f396b = _0x2542b2, _0x50b292 = { 'YhajL': _0x4f396b(0x56a) }, _0x2ba361 = _0x50b292[_0x4f396b(0x7df)][_0x4f396b(0x968)]('|'); let _0x31a263 = -0xe3c * -0x1 + -0x1442 * -0x1 + -0x227e; while (!![]) { switch (_0x2ba361[_0x31a263++]) { case '0': this[_0x4f396b(0x99f) + _0x4f396b(0x453)][_0x4f396b(0xadd)]['y'] = -0x5 * 0x313 + 0x1a85 + 0x3 * -0x3b7; continue; case '1': this['_attachPic' + _0x4f396b(0x453)] = new Sprite(); continue; case '2': this[_0x4f396b(0x67e) + _0x4f396b(0x9e7) + _0x4f396b(0x8c9)](); continue; case '3': this[_0x4f396b(0x9b3)](this['_attachPic' + _0x4f396b(0x453)]); continue; case '4': this[_0x4f396b(0x99f) + _0x4f396b(0x453)][_0x4f396b(0xadd)]['x'] = -0x2 * 0x68e + -0x3 * -0x8f2 + 0x7 * -0x1f6 + 0.5; continue; }break; } }, Sprite_Character['prototype'][_0x2542b2(0xabc) + _0x2542b2(0x604)] = function () { const _0x5d1b6c = _0x2542b2, _0x15fa8e = { 'ybnzd': _0x5d1b6c(0x8d0) + _0x5d1b6c(0xa1e), 'wDxYe': 'IconSet' }, _0x158c41 = _0x15fa8e['ybnzd']['split']('|'); let _0x357c73 = 0x2e0 + 0xa04 + 0x113 * -0xc; while (!![]) { switch (_0x158c41[_0x357c73++]) { case '0': this[_0x5d1b6c(0x474) + _0x5d1b6c(0x604)][_0x5d1b6c(0x237)](0x1abb + 0x2192 + -0x3c4d, 0x43d + 0xbd6 + -0x5 * 0x337, 0x1e93 + 0x19e9 + -0x387c, -0xda7 * 0x1 + 0x17b * 0x12 + 0x455 * -0x3); continue; case '1': this[_0x5d1b6c(0x474) + 'Sprite'][_0x5d1b6c(0x3c6)] = ImageManager[_0x5d1b6c(0x66b)](_0x15fa8e[_0x5d1b6c(0x8b8)]); continue; case '2': this[_0x5d1b6c(0x474) + _0x5d1b6c(0x604)] = new Sprite(); continue; case '3': this[_0x5d1b6c(0x474) + _0x5d1b6c(0x604)][_0x5d1b6c(0xadd)]['y'] = 0xf43 * 0x1 + -0x335 * 0x3 + -0x5a3; continue; case '4': this[_0x5d1b6c(0x9b3)](this[_0x5d1b6c(0x474) + _0x5d1b6c(0x604)]); continue; case '5': this[_0x5d1b6c(0x474) + 'Sprite'][_0x5d1b6c(0x3c6)][_0x5d1b6c(0x410)] = ![]; continue; case '6': this['_eventIcon' + 'Sprite'][_0x5d1b6c(0xadd)]['x'] = -0x26d0 + -0x8cf * -0x4 + -0x1ca * -0x2 + 0.5; continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2e4) + 'racter_upd' + _0x2542b2(0x889)] = Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x316)], Sprite_Character[_0x2542b2(0x336)]['update'] = function () { const _0x6440ff = _0x2542b2; VisuMZ[_0x6440ff(0x6af) + _0x6440ff(0x53e)]['Sprite_Cha' + _0x6440ff(0x7b5) + _0x6440ff(0x889)][_0x6440ff(0x325)](this), this['updateEven' + _0x6440ff(0x32b) + _0x6440ff(0x71d)](); }, Sprite_Character['prototype'][_0x2542b2(0xb01) + _0x2542b2(0x4ed)] = function () { const _0x5610fc = _0x2542b2; Sprite[_0x5610fc(0x336)][_0x5610fc(0xb01) + _0x5610fc(0x4ed)][_0x5610fc(0x325)](this), this['isEventsMo' + _0x5610fc(0x5f5) + _0x5610fc(0xb31)]() && (this['visible'] = ![]); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x58a) + _0x2542b2(0x5f5) + _0x2542b2(0xb31)] = function () { const _0x45e57a = _0x2542b2, _0x542fb5 = { 'FQqfa': function (_0x29d344, _0x3c8ea3) { return _0x29d344 > _0x3c8ea3; }, 'mIKhC': function (_0x2ff56a, _0x22a374) { return _0x2ff56a !== _0x22a374; } }; if (_0x542fb5['FQqfa'](this['getEventIc' + 'onIndex'](), -0x21ac + 0xef1 + 0x12bb)) return ![]; if (this[_0x45e57a(0xab0)]) { if (_0x542fb5[_0x45e57a(0x6e8)](this['_character'][_0x45e57a(0x3b9) + _0x45e57a(0xb1e) + 'e'](), '')) return ![]; } if (this[_0x45e57a(0x437) + 'erSpriteSh' + 'eetInvisib' + 'le']) return !![]; return this[_0x45e57a(0x5e8) + 'racter']() || this[_0x45e57a(0xab0)] && this[_0x45e57a(0xab0)][_0x45e57a(0x726) + 'ent'](); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x25f) + _0x2542b2(0x43a) + 'g'] = function () { const _0x1cbb98 = _0x2542b2; if (!this[_0x1cbb98(0x3c6)]) return; this[_0x1cbb98(0x3c6)][_0x1cbb98(0x410)] = !!VisuMZ[_0x1cbb98(0x6af) + _0x1cbb98(0x53e)][_0x1cbb98(0x2cc)]['Movement'][_0x1cbb98(0x581) + _0x1cbb98(0x5b5)]; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x92f) + _0x2542b2(0x32b) + 'entCore'] = function () { const _0xcc4f9 = _0x2542b2, _0x4e53b0 = { 'jKZFi': '5|3|6|4|1|' + _0xcc4f9(0x93f) }, _0x3fa061 = _0x4e53b0[_0xcc4f9(0x501)][_0xcc4f9(0x968)]('|'); let _0x2018b7 = 0x177d + 0xc4 * 0x1 + -0x1841; while (!![]) { switch (_0x3fa061[_0x2018b7++]) { case '0': this[_0xcc4f9(0x92f) + _0xcc4f9(0x403) + 'ite'](); continue; case '1': this[_0xcc4f9(0x92f) + _0xcc4f9(0x4fc)](); continue; case '2': this[_0xcc4f9(0x67e) + 'chPictureS' + _0xcc4f9(0x8c9)](); continue; case '3': this[_0xcc4f9(0x217)](); continue; case '4': this[_0xcc4f9(0x92f) + _0xcc4f9(0xb65) + 'e'](); continue; case '5': this[_0xcc4f9(0x6a0) + 'eBase'](); continue; case '6': this[_0xcc4f9(0x548) + 'ow'](); continue; }break; } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2e4) + 'racter_set' + _0x2542b2(0x6f4)] = Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x950) + _0x2542b2(0xaf6)], Sprite_Character['prototype'][_0x2542b2(0x950) + _0x2542b2(0xaf6)] = function () { const _0xd26448 = _0x2542b2; VisuMZ[_0xd26448(0x6af) + _0xd26448(0x53e)][_0xd26448(0x2e4) + _0xd26448(0xacd) + _0xd26448(0x6f4)][_0xd26448(0x325)](this), this[_0xd26448(0x3c6)][_0xd26448(0x8c3) + 'tener'](this[_0xd26448(0x25f) + _0xd26448(0x43a) + 'g'][_0xd26448(0x64e)](this)); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x7d5) + _0x2542b2(0x342)] = function () { const _0x219d9d = _0x2542b2, _0x3e84e0 = { 'qIruE': function (_0x27934b, _0x260623) { return _0x27934b * _0x260623; }, 'ReEQb': function (_0x5f5206, _0x2ccc2d) { return _0x5f5206 + _0x2ccc2d; }, 'ZIOUM': function (_0x365c46, _0xf5107e) { return _0x365c46 % _0xf5107e; }, 'OXSAy': function (_0x416f10, _0x374d8d) { return _0x416f10 / _0x374d8d; }, 'mIWZJ': function (_0x2708f2, _0x2446f8) { return _0x2708f2 % _0x2446f8; }, 'XYLil': function (_0x4ba873, _0x3334f5) { return _0x4ba873 / _0x3334f5; }, 'pdqxr': function (_0x16260d, _0x32a11a) { return _0x16260d % _0x32a11a; }, 'XezzT': function (_0x55322d, _0x2f4664) { return _0x55322d > _0x2f4664; }, 'vgYtj': function (_0x206fb5, _0x1898d7) { return _0x206fb5 * _0x1898d7; }, 'CBDPJ': function (_0x5dc1af, _0x21f224) { return _0x5dc1af * _0x21f224; }, 'uEtBP': function (_0x409332, _0x3fa1a6) { return _0x409332 > _0x3fa1a6; }, 'zFAoa': function (_0x1affab, _0x265adf) { return _0x1affab > _0x265adf; }, 'YvgCr': function (_0x47c06e, _0x4a9232) { return _0x47c06e > _0x4a9232; }, 'IDJXE': function (_0x441570, _0x2b768c) { return _0x441570 * _0x2b768c; } }, _0x180756 = this[_0x219d9d(0x7e9)], _0x1ccc8a = this['patternWid' + 'th'](), _0x55f61a = this[_0x219d9d(0x482) + _0x219d9d(0x9c3)](), _0x34d2bf = _0x3e84e0[_0x219d9d(0x852)](_0x3e84e0[_0x219d9d(0x2dd)](_0x3e84e0[_0x219d9d(0x852)](_0x3e84e0[_0x219d9d(0x74c)](Math[_0x219d9d(0xa9d)](_0x3e84e0[_0x219d9d(0x435)](_0x180756, 0x1 * -0x1aab + 0x2529 + 0x4ff * -0x2)), 0x1 * 0x13ee + -0xed8 + 0x1a * -0x32), 0x3 * 0x1bf + 0x1 * 0x11f5 + -0x172a * 0x1), _0x3e84e0[_0x219d9d(0x390)](_0x180756, 0xc1 * -0x14 + -0x2285 * -0x1 + 0x1369 * -0x1)), _0x1ccc8a), _0x5a15de = _0x3e84e0[_0x219d9d(0x852)](_0x3e84e0[_0x219d9d(0x74c)](Math[_0x219d9d(0xa9d)](_0x3e84e0[_0x219d9d(0xa94)](_0x3e84e0['pdqxr'](_0x180756, -0x2698 + 0x109d + 0x16fb), -0x1b * -0x93 + 0x12ea + -0x2263)), 0x1d40 + 0x1eed + 0x3c1d * -0x1), _0x55f61a), _0x20fc9d = this['getTileExp' + _0x219d9d(0x2f1)](); let _0x404c75 = _0x34d2bf, _0x161ec3 = _0x5a15de, _0x486b93 = _0x1ccc8a, _0x1eff11 = _0x55f61a; _0x20fc9d['up'] && _0x3e84e0[_0x219d9d(0x97b)](_0x20fc9d['up'], 0x55b + 0x24c6 + -0x2a21) && (_0x161ec3 -= _0x3e84e0[_0x219d9d(0x9da)](_0x55f61a, _0x20fc9d['up']), _0x1eff11 += _0x3e84e0[_0x219d9d(0x5ad)](_0x55f61a, _0x20fc9d['up'])), _0x20fc9d['down'] && _0x3e84e0[_0x219d9d(0x88e)](_0x20fc9d['down'], 0x6 * 0x2e6 + -0x182 + -0xfe2) && (_0x1eff11 += _0x3e84e0[_0x219d9d(0x9da)](_0x55f61a, _0x20fc9d[_0x219d9d(0x270)])), _0x20fc9d[_0x219d9d(0xa43)] && _0x3e84e0[_0x219d9d(0xab3)](_0x20fc9d[_0x219d9d(0xa43)], 0x3 * -0x90a + 0x88f * -0x1 + 0x23ad) && (_0x404c75 -= _0x3e84e0[_0x219d9d(0x5ad)](_0x1ccc8a, _0x20fc9d[_0x219d9d(0xa43)]), _0x486b93 += _0x3e84e0[_0x219d9d(0x852)](_0x1ccc8a, _0x20fc9d[_0x219d9d(0xa43)])), _0x20fc9d[_0x219d9d(0x709)] && _0x3e84e0[_0x219d9d(0x22c)](_0x20fc9d[_0x219d9d(0x709)], -0x260f * 0x1 + -0x1094 + 0x36a3) && (_0x486b93 += _0x3e84e0[_0x219d9d(0x57f)](_0x1ccc8a, _0x20fc9d['right'])), this[_0x219d9d(0x237)](_0x404c75, _0x161ec3, _0x486b93, _0x1eff11); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x988) + _0x2542b2(0x2f1)] = function () { const _0x316edf = _0x2542b2; return this[_0x316edf(0xab0)] ? this[_0x316edf(0xab0)][_0x316edf(0x42c) + 'd'] || {} : {}; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2e4) + _0x2542b2(0xacd) + _0x2542b2(0x50a) + _0x2542b2(0xa61)] = Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x4f1) + 'erBitmap'], Sprite_Character[_0x2542b2(0x336)]['setCharact' + _0x2542b2(0x920)] = function () { const _0xc9eb48 = _0x2542b2; VisuMZ[_0xc9eb48(0x6af) + 'Core'][_0xc9eb48(0x2e4) + _0xc9eb48(0xacd) + 'CharacterB' + _0xc9eb48(0xa61)][_0xc9eb48(0x325)](this), this[_0xc9eb48(0x3c6)][_0xc9eb48(0x8c3) + _0xc9eb48(0x705)](this['updateBitm' + 'apSmoothin' + 'g']['bind'](this)), this['_isCharact' + _0xc9eb48(0x6c3) + _0xc9eb48(0x8ba) + 'le'] = ImageManager[_0xc9eb48(0x503) + _0xc9eb48(0x5e1)](this['_character' + _0xc9eb48(0x615)]); }, VisuMZ['EventsMove' + 'Core']['Sprite_Cha' + _0x2542b2(0x819) + 'racterPatt' + _0x2542b2(0xb43)] = Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x4bd) + _0x2542b2(0x70d)], Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x4bd) + _0x2542b2(0x70d)] = function () { const _0x2790cd = _0x2542b2; return this['isSpriteVS' + '8dir']() ? this[_0x2790cd(0x4bd) + _0x2790cd(0x28b)]() : this['characterP' + _0x2790cd(0x59f) + 'ic'](); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x4bd) + _0x2542b2(0x28b)] = function () { const _0x1d4380 = _0x2542b2, _0x5f0db7 = { 'sVNCl': function (_0x463884, _0x2ca196) { return _0x463884 / _0x2ca196; }, 'FfTCZ': function (_0x6f3404, _0x4333b4) { return _0x6f3404 - _0x4333b4; } }, _0x3fb08c = this['_character']['direction'](); let _0x4c97c9 = [-0x6b * -0x11 + -0x2575 + 0x1e5c, -0x39 + 0xbb8 + -0xb7d, 0x1e14 + -0xbf * -0x3 + 0xac5 * -0x3, -0x1a2d + -0x2131 + 0x3b62, -0x1449 + -0x1 * -0xc61 + 0x3 * 0x2a4, 0x1a3 * -0x17 + -0x257a + 0x4b21, -0x2674 + -0x291 * -0x8 + 0x11f2, 0x1 * 0x1181 + -0x17c4 + 0x649, 0x23d9 + -0x1 * -0x19ad + -0x3d7e, -0x1 * -0xd8f + -0x1ad6 + -0xd4f * -0x1]; return this[_0x1d4380(0xab0)][_0x1d4380(0x366) + _0x1d4380(0x9b1)] && (_0x4c97c9 = [-0xfce * -0x2 + -0x1869 + -0x731, 0x1 * 0xc92 + -0x112 * 0x1 + -0x3 * 0x3d4, 0x4e9 + 0x7a9 * -0x3 + -0x1a * -0xb2, -0xb74 * -0x1 + -0x9f * -0xc + -0x12e6, 0x1c * -0xd0 + -0x1246 + 0x290c, 0xa * 0x3e3 + 0xd8d + -0x3469, 0x1ae6 + -0x1 * -0x15ed + -0x7 * 0x6f9, 0x219d + 0x115a + -0x32ef, -0x17af + 0x96 * 0x37 + -0x883, -0x4f7 + 0x1ecb + -0xce7 * 0x2]), _0x5f0db7[_0x1d4380(0x239)](_0x5f0db7[_0x1d4380(0x739)](_0x4c97c9[_0x3fb08c], 0xb26 * -0x2 + -0x248 * 0x6 + 0x10f * 0x22), -0x23d * 0xb + -0x1c8d * -0x1 + 0x1 * -0x3ec); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x4bd) + _0x2542b2(0x59f) + 'ic'] = function () { const _0x44dc1a = _0x2542b2, _0x157349 = { 'qVsuE': function (_0x3040bb, _0x550918) { return _0x3040bb === _0x550918; }, 'cUYKI': function (_0x17bd51, _0x57fd1d) { return _0x17bd51 / _0x57fd1d; }, 'SBhCo': function (_0x452dbd, _0x2ee898) { return _0x452dbd - _0x2ee898; } }; let _0x360863 = this['_character']['direction'](); if (this[_0x44dc1a(0xab0)][_0x44dc1a(0x366) + 'ite']) { if (_0x157349['qVsuE'](_0x360863, 0x2 * -0xaee + -0xe2c * -0x1 + 0x1ed * 0x4)) _0x360863 = -0x21fc + 0x1969 + -0x47 * -0x1f; else _0x157349[_0x44dc1a(0x76a)](_0x360863, 0x1 * -0x1fa2 + 0x17b + -0x203 * -0xf) && (_0x360863 = 0x1 * 0x17f4 + 0xc73 * 0x1 + -0x2463); } return _0x157349[_0x44dc1a(0x60b)](_0x157349[_0x44dc1a(0x450)](_0x360863, 0x3 * -0xc8b + 0x1680 + 0x19 * 0x9b), 0x10bc + -0x191a + 0x43 * 0x20); }, Sprite_Character['prototype'][_0x2542b2(0x6a0) + 'eBase'] = function () { const _0x304835 = _0x2542b2; this['scale']['x'] = this[_0x304835(0xab0)][_0x304835(0x973)] ?? 0xa24 + -0xcd4 + 0x2b1, this['scale']['y'] = this['_character'][_0x304835(0x465)] ?? -0xbc4 + -0x65 * 0x3a + 0x3 * 0xb8d; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x217)] = function () { const _0xe67d20 = _0x2542b2; if (!VisuMZ['EventsMove' + 'Core'][_0xe67d20(0x2cc)][_0xe67d20(0x44e)]['EnableDash' + _0xe67d20(0x3ef)]) return; this[_0xe67d20(0x4ca)] = 0x55d + 0x2097 * -0x1 + 0x1b3a; if (this[_0xe67d20(0x79a) + _0xe67d20(0x5c5)]()) { const _0x4ac836 = VisuMZ[_0xe67d20(0x6af) + _0xe67d20(0x53e)]['Settings'][_0xe67d20(0x44e)], _0x16e317 = this[_0xe67d20(0xab0)][_0xe67d20(0x7bc)](); let _0x2777a7 = -0x1b5e + -0x1 * -0x2417 + -0x8b9; if ([0x7bd + 0xe79 + -0x1635, -0x146c * 0x1 + 0x1b22 + -0x6b2, -0xd2f + 0xf10 * -0x1 + -0x5e * -0x4d][_0xe67d20(0x927)](_0x16e317)) _0x2777a7 = _0x4ac836['TiltLeft']; if ([0x1b3f + -0x11cc + -0x1 * 0x970, -0x2d * -0x1b + -0x11e1 + 0xd28, -0x1 * -0xf59 + -0x46f + -0xae1][_0xe67d20(0x927)](_0x16e317)) _0x2777a7 = _0x4ac836[_0xe67d20(0x59e)];[0x7 * 0x50f + -0x1cc1 * -0x1 + -0x4028, 0x185b + 0x1 * 0x126f + 0x34a * -0xd]['includes'](_0x16e317) && (_0x2777a7 = [-_0x4ac836[_0xe67d20(0x2ef)], 0x14f + 0x2316 + -0x2465, _0x4ac836['TiltVert']][this['_character'][_0xe67d20(0xafe)]()]); if (this[_0xe67d20(0x417) + 'n']) _0x2777a7 *= -(0x1ebe + -0x145a + 0xa63 * -0x1); this[_0xe67d20(0x4ca)] = _0x2777a7; } }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x79a) + _0x2542b2(0x5c5)] = function () { const _0x2849a4 = _0x2542b2, _0xc2e626 = { 'EcOxe': function (_0x4611ae, _0x3890e6) { return _0x4611ae === _0x3890e6; } }; if (this[_0x2849a4(0x777) + 'es']) return ![]; return this[_0x2849a4(0xab0)][_0x2849a4(0x633) + 'ndMoving']() && !this[_0x2849a4(0xab0)][_0x2849a4(0x8af)]() && !this[_0x2849a4(0xab0)][_0x2849a4(0x9a7)]() && _0xc2e626[_0x2849a4(0x84b)](this[_0x2849a4(0x78e) + _0x2849a4(0x5cc)](), 0xa7 * -0xf + -0xc7d + 0xb23 * 0x2); }, Sprite_Character[_0x2542b2(0x336)]['updateShad' + 'ow'] = function () { const _0x438fac = _0x2542b2, _0x1eb0f0 = { 'JvfoL': _0x438fac(0x8e4) + _0x438fac(0x621), 'zjcRL': function (_0x37e478, _0x27bae3) { return _0x37e478 - _0x27bae3; }, 'xgmwz': function (_0x18be40, _0x8b7a72) { return _0x18be40 !== _0x8b7a72; }, 'woDgp': function (_0x27980b, _0x2b9544) { return _0x27980b > _0x2b9544; }, 'ZrReb': function (_0x2c05f1, _0x17f1d2) { return _0x2c05f1 + _0x17f1d2; }, 'IyDAK': function (_0x248c91, _0x51c22b) { return _0x248c91 < _0x51c22b; }, 'scqQs': function (_0x1705f7, _0x376a18) { return _0x1705f7 > _0x376a18; }, 'WlFra': function (_0x1067b0, _0x44f338) { return _0x1067b0 + _0x44f338; }, 'pcqJz': function (_0x16df1b, _0x1a6ae1) { return _0x16df1b < _0x1a6ae1; } }, _0x37a462 = _0x1eb0f0[_0x438fac(0x439)][_0x438fac(0x968)]('|'); let _0xef4ef1 = -0x1971 + -0x1f * -0x99 + 0x6ea; while (!![]) { switch (_0x37a462[_0xef4ef1++]) { case '0': if (this[_0x438fac(0xab0)][_0x438fac(0x908) + _0x438fac(0x656)]()) this['_shadowSpr' + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['x'] = Math[_0x438fac(0x89c)](0x98 + -0x1 * 0xf3d + -0xa3 * -0x17, _0x1eb0f0['zjcRL'](this[_0x438fac(0x1d7) + 'ite'][_0x438fac(0x7c9)]['x'], 0x1e69 + 0x1ec1 + -0x1 * 0x3d2a + 0.1)), this[_0x438fac(0x1d7) + 'ite'][_0x438fac(0x7c9)]['y'] = Math[_0x438fac(0x89c)](0xfbc + -0x23f0 + 0x50d * 0x4, _0x1eb0f0['zjcRL'](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['y'], 0x1d02 + -0x9d * 0xf + -0x13cf + 0.1)); else { if (_0x1eb0f0[_0x438fac(0x82f)](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['scale']['x'], this[_0x438fac(0x7c9)]['x'])) { if (_0x1eb0f0[_0x438fac(0xa38)](this[_0x438fac(0x1d7) + 'ite'][_0x438fac(0x7c9)]['x'], this['scale']['x'])) this[_0x438fac(0x1d7) + 'ite']['scale']['x'] = Math[_0x438fac(0x762)](_0x1eb0f0[_0x438fac(0x2ce)](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['x'], -0x1f20 + 0x24ae + 0x2c7 * -0x2 + 0.1), this['scale']['x']); if (_0x1eb0f0[_0x438fac(0x3fa)](this[_0x438fac(0x1d7) + 'ite'][_0x438fac(0x7c9)]['x'], this['scale']['x'])) this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['x'] = Math[_0x438fac(0x89c)](_0x1eb0f0[_0x438fac(0x9ea)](this['_shadowSpr' + 'ite']['scale']['x'], -0xf3f + -0x1f * 0xe8 + 0x2b57 + 0.1), this['scale']['x']); } if (_0x1eb0f0['xgmwz'](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['scale']['y'], this[_0x438fac(0x7c9)]['y'])) { if (_0x1eb0f0[_0x438fac(0x317)](this['_shadowSpr' + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['y'], this[_0x438fac(0x7c9)]['y'])) this[_0x438fac(0x1d7) + 'ite'][_0x438fac(0x7c9)]['y'] = Math['min'](_0x1eb0f0[_0x438fac(0x7e8)](this[_0x438fac(0x1d7) + 'ite']['scale']['y'], -0xe25 + 0x1ff + -0x2 * -0x613 + 0.1), this['scale']['y']); if (_0x1eb0f0[_0x438fac(0x387)](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['y'], this['scale']['y'])) this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x7c9)]['y'] = Math[_0x438fac(0x89c)](_0x1eb0f0['zjcRL'](this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['scale']['y'], -0x4ff * -0x5 + 0x218d + -0x3a88 + 0.1), this[_0x438fac(0x7c9)]['y']); } } continue; case '1': this[_0x438fac(0x1d7) + _0x438fac(0x9b1)][_0x438fac(0x6cf)] = this[_0x438fac(0x6cf)]; continue; case '2': this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['visible'] = this[_0x438fac(0xab0)][_0x438fac(0x98f) + _0x438fac(0xb31)](); continue; case '3': this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['y'] = this['_character'][_0x438fac(0xb44)](); continue; case '4': this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]['x'] = this['_character'][_0x438fac(0x579)](); continue; case '5': if (!this[_0x438fac(0x1d7) + _0x438fac(0x9b1)]) return; continue; case '6': this['_shadowSpr' + _0x438fac(0x9b1)]['opacity'] = this[_0x438fac(0x79f)]; continue; }break; } }, Sprite_Character['prototype'][_0x2542b2(0x92f) + _0x2542b2(0xb65) + 'e'] = function () { const _0x14b607 = _0x2542b2, _0x2af6b0 = { 'tUgOb': function (_0x1dba82, _0xb32206) { return _0x1dba82 <= _0xb32206; }, 'uOVmZ': function (_0x2a2a12, _0x4d322f) { return _0x2a2a12 * _0x4d322f; }, 'aUeyc': function (_0xa5942d, _0x43fc5c) { return _0xa5942d % _0x43fc5c; }, 'yjkgw': function (_0xb29678, _0x458c97) { return _0xb29678 / _0x458c97; }, 'sufEY': function (_0x2b7990, _0x1f6758) { return _0x2b7990 + _0x1f6758; } }; if (!this[_0x14b607(0x474) + 'Sprite']) return; const _0x6b6ccb = this[_0x14b607(0x474) + 'Sprite'], _0x27c857 = this['getEventIc' + _0x14b607(0x5cc)](); if (_0x2af6b0[_0x14b607(0x4a2)](_0x27c857, -0xb0a + -0x1a3e + -0x952 * -0x4)) return _0x6b6ccb[_0x14b607(0x237)](-0x2 * 0xd03 + -0x1 * -0xd3a + 0xccc, -0x1 * 0x24b7 + 0x4c6 + -0xd * -0x275, -0x1e95 + -0x21 * -0x101 + 0xa3 * -0x4, -0x1 * -0x220f + -0x4 * 0x1a3 + -0x1b83); else { const _0x543103 = ImageManager[_0x14b607(0x531)], _0x4be9b1 = ImageManager[_0x14b607(0x8bd)], _0xd866a2 = _0x2af6b0[_0x14b607(0x757)](_0x2af6b0[_0x14b607(0x476)](_0x27c857, 0x1744 + 0x3 * 0x8e + -0x6 * 0x425), _0x543103), _0x1eb10c = _0x2af6b0['uOVmZ'](Math[_0x14b607(0xa9d)](_0x2af6b0[_0x14b607(0x249)](_0x27c857, 0x1 * 0x18d5 + -0x11 * -0xfb + -0x2970)), _0x4be9b1); _0x6b6ccb['setFrame'](_0xd866a2, _0x1eb10c, _0x543103, _0x4be9b1), this['visible'] = !![]; } const _0x56fec7 = this['_character']['getEventIc' + 'onData'](); this['isAutoBuff' + _0x14b607(0x2a2)]() ? this[_0x14b607(0x593) + 'conBuffer'](_0x6b6ccb) : (_0x6b6ccb['x'] = _0x56fec7 ? _0x56fec7[_0x14b607(0x7ee)] : -0xb * -0x1b7 + 0x42 * -0x53 + -0x1 * -0x289, _0x6b6ccb['y'] = _0x56fec7 ? _0x2af6b0[_0x14b607(0xb13)](-this[_0x14b607(0x842)], _0x56fec7[_0x14b607(0x504)]) : -0xa6d + 0x1 * 0x2655 + -0x4 * 0x6fa), _0x6b6ccb[_0x14b607(0xb5e)] = _0x56fec7 ? _0x56fec7[_0x14b607(0xb5e)] : -0xb8 + -0x174 * -0x8 + -0xae8, this[_0x14b607(0x5b9) + 'd'](_0x6b6ccb), this['addChild'](_0x6b6ccb), _0x6b6ccb[_0x14b607(0x4ca)] = -this['rotation']; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x593) + 'conBuffer'] = function (_0x2c7d4c) { const _0x4087ce = _0x2542b2, _0xfa87c4 = { 'rOCyu': function (_0x401de0, _0x551ba0) { return _0x401de0 + _0x551ba0; }, 'zEoWJ': function (_0x1aa372, _0x2df802) { return _0x1aa372 / _0x2df802; }, 'CmyFX': function (_0x1c3404, _0x1dc66d) { return _0x1c3404 * _0x1dc66d; }, 'aUFXE': function (_0x59ebd0, _0x47af83) { return _0x59ebd0 !== _0x47af83; } }; _0x2c7d4c['x'] = 0x2217 + -0x1741 * -0x1 + -0x3958, _0x2c7d4c['y'] = _0xfa87c4['rOCyu'](-this['height'], _0xfa87c4[_0x4087ce(0x801)](_0xfa87c4[_0x4087ce(0x938)](this['height'], -0xe83 * 0x2 + 0xb9 * -0x35 + -0x61f * -0xb), 0x79a + -0x120a + 0xa75)), _0xfa87c4[_0x4087ce(0x744)](this['_character'][_0x4087ce(0xafe)](), -0x103 * -0x3 + 0x2417 * 0x1 + -0x271f) && (_0x2c7d4c['y'] += 0x17e8 + -0x1b4c + -0x365 * -0x1); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x78e) + _0x2542b2(0x5cc)] = function () { const _0x25dcb6 = _0x2542b2; if (!this[_0x25dcb6(0xab0)]) return 0x1 * 0x1ca5 + 0x13 * -0x14b + -0x74 * 0x9; if (this[_0x25dcb6(0xab0)]['_erased']) return -0x166f + -0x2703 + -0x37 * -0x11e; const _0x473b30 = this[_0x25dcb6(0xab0)]['getEventIc' + _0x25dcb6(0x72e)](); return _0x473b30 ? _0x473b30[_0x25dcb6(0x72a)] || 0x3 * 0xc9a + 0x2c * -0x2 + -0x2576 : 0x8 * 0x15d + -0x1486 + -0x4cf * -0x2; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x92f) + _0x2542b2(0x4fc)] = function () { const _0x23a594 = _0x2542b2, _0x297e71 = { 'hAKZR': _0x23a594(0x706), 'CDKWG': function (_0x36ded3, _0x3fe26f) { return _0x36ded3 < _0x3fe26f; }, 'sCVkK': function (_0x1d77fa, _0x5ba7bb) { return _0x1d77fa - _0x5ba7bb; }, 'VILQL': function (_0x57f49a, _0x1d0aac) { return _0x57f49a === _0x1d0aac; }, 'TDpOs': function (_0x530f69, _0x30b1a2) { return _0x530f69 === _0x30b1a2; } }, _0x3ca315 = _0x297e71[_0x23a594(0x3fd)]['split']('|'); let _0x1ed95c = 0x2 * 0x60f + -0x159f + 0x981; while (!![]) { switch (_0x3ca315[_0x1ed95c++]) { case '0': this['_shadowSpr' + _0x23a594(0x9b1)] && (_0x297e71[_0x23a594(0xa6c)](this['z'], 0x39b * -0x2 + -0xd9 + -0x80f * -0x1) ? this[_0x23a594(0x1d7) + _0x23a594(0x9b1)]['z'] = _0x297e71[_0x23a594(0x492)](this['z'], -0x169a + -0xade + 0x2179) : this[_0x23a594(0x1d7) + _0x23a594(0x9b1)]['z'] = -0x1 * -0x5d4 + 0x1 * 0x1d81 + -0xc9 * 0x2d); continue; case '1': if (_0x297e71[_0x23a594(0x20c)](this[_0x23a594(0xab0)]['_customZ'], ![])) return; continue; case '2': if (_0x297e71[_0x23a594(0x62c)](this['_character'][_0x23a594(0x6d6)], undefined)) return; continue; case '3': this['z'] = this[_0x23a594(0xab0)]['_customZ']; continue; case '4': if (!this[_0x23a594(0xab0)]) return; continue; }break; } }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x92f) + _0x2542b2(0x403) + 'ite'] = function () { const _0x1b27aa = _0x2542b2, _0x3930c5 = { 'gOqBo': function (_0x9e9b4d, _0xca5d54) { return _0x9e9b4d * _0xca5d54; } }; if (!this[_0x1b27aa(0xab0)]) return; let _0x3afa4d = !!this[_0x1b27aa(0xab0)]['_mirrorSpr' + 'ite']; this[_0x1b27aa(0x7c9)]['x'] = _0x3930c5['gOqBo'](Math['abs'](this['scale']['x']), _0x3afa4d ? -(0x1 * -0xc5 + -0x83 * 0x38 + 0x1d6e) : -0xb07 * 0x3 + -0x16c6 + 0xdf7 * 0x4); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x67e) + 'chPictureS' + _0x2542b2(0x8c9)] = function () { const _0x591c3c = _0x2542b2; if (!this[_0x591c3c(0x99f) + _0x591c3c(0x453)]) return; if (!this[_0x591c3c(0xab0)]) return; this[_0x591c3c(0x955) + _0x591c3c(0x9f9) + _0x591c3c(0x382)](), this['updateAtta' + 'chPictureB' + 'itmap'](); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x955) + 'hPictureBi' + _0x2542b2(0x382)] = function () { const _0x201bdc = _0x2542b2, _0x28dbe2 = { 'VRVci': function (_0x10521e, _0x567246) { return _0x10521e !== _0x567246; } }; if (!this[_0x201bdc(0xad1) + _0x201bdc(0xaca) + 'date']()) return; const _0x5dd4b4 = this['_character'][_0x201bdc(0x3b9) + _0x201bdc(0x6cb) + 's'](); this[_0x201bdc(0xa7e) + _0x201bdc(0xb6b) + _0x201bdc(0x22a)] = _0x5dd4b4[_0x201bdc(0x267)], this[_0x201bdc(0xa7e) + _0x201bdc(0x370) + _0x201bdc(0x2b3)] = _0x5dd4b4[_0x201bdc(0x85a)], this[_0x201bdc(0xa7e) + _0x201bdc(0x867) + _0x201bdc(0x446)] = _0x5dd4b4[_0x201bdc(0x7c9)]; if (_0x28dbe2[_0x201bdc(0x5eb)](_0x5dd4b4[_0x201bdc(0x267)], '')) { const _0x2c38af = ImageManager[_0x201bdc(0x266) + 'e'](_0x5dd4b4[_0x201bdc(0x267)]); _0x2c38af[_0x201bdc(0x8c3) + _0x201bdc(0x705)](this[_0x201bdc(0x1fb) + _0x201bdc(0x79c)][_0x201bdc(0x64e)](this, _0x2c38af)); } else this[_0x201bdc(0x99f) + 'tureSprite'][_0x201bdc(0x3c6)] = new Bitmap(0x1bdd * 0x1 + -0x1 * -0x3 + -0x593 * 0x5, 0x1 * -0x1efd + 0x837 + 0x16c7); }, Sprite_Character['prototype'][_0x2542b2(0x67e) + _0x2542b2(0x1f2) + 'itmap'] = function () { const _0x540c37 = _0x2542b2, _0x2c4449 = this[_0x540c37(0x99f) + _0x540c37(0x453)]; _0x2c4449['x'] = this[_0x540c37(0xab0)]['attachPict' + 'ureOffsetX'](), _0x2c4449['y'] = this[_0x540c37(0xab0)][_0x540c37(0x3b9) + _0x540c37(0x397)](), _0x2c4449['blendMode'] = this['_character'][_0x540c37(0x3b9) + 'ureBlendMo' + 'de'](); }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0xad1) + _0x2542b2(0xaca) + 'date'] = function () { const _0x53588d = _0x2542b2, _0x2c6bce = { 'qASVz': function (_0x124ad2, _0x424059) { return _0x124ad2 !== _0x424059; }, 'ymNco': function (_0x3e8508, _0x13e49a) { return _0x3e8508 !== _0x13e49a; } }, _0x23e0ba = this[_0x53588d(0xab0)][_0x53588d(0x3b9) + _0x53588d(0x6cb) + 's'](); if (_0x23e0ba) { if (_0x2c6bce[_0x53588d(0x1de)](this['_lastAttac' + 'hPictureFi' + _0x53588d(0x22a)], _0x23e0ba[_0x53588d(0x267)])) return !![]; if (_0x2c6bce['ymNco'](this['_lastAttac' + 'hPictureMa' + 'xSize'], _0x23e0ba['maxSize'])) return !![]; if (_0x2c6bce[_0x53588d(0x952)](this[_0x53588d(0xa7e) + 'hPictureSc' + _0x53588d(0x446)], _0x23e0ba[_0x53588d(0x7c9)])) return !![]; } return ![]; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x1fb) + 'chPicture'] = function (_0xcd85b0) { const _0x2fca87 = _0x2542b2, _0x3fc96b = { 'kCrml': function (_0x461970, _0x2d7a49) { return _0x461970 > _0x2d7a49; }, 'gEqnK': function (_0x2898c2, _0x4f42ff) { return _0x2898c2 / _0x4f42ff; }, 'ldxSa': function (_0x385745, _0x12fbad) { return _0x385745 !== _0x12fbad; } }, _0x572ac4 = this['_attachPic' + _0x2fca87(0x453)]; _0x572ac4[_0x2fca87(0x3c6)] = _0xcd85b0; const _0x22ad3a = this['_character'][_0x2fca87(0x3b9) + _0x2fca87(0x6cb) + 's'](), _0x864f8f = _0x22ad3a[_0x2fca87(0x85a)], _0x3ff6c8 = _0x22ad3a[_0x2fca87(0x7c9)]; let _0x2b6bfd = -0xa5c + 0x1 * 0x849 + 0x1 * 0x214; if (_0x3fc96b[_0x2fca87(0xabf)](_0x864f8f, -0xf85 + 0x7 * 0xd8 + 0x99d)) { let _0x10affe = this['getAttachP' + _0x2fca87(0x962) + _0x2fca87(0x816)]() || -0x15d + -0x1c5c * -0x1 + -0x2 * 0xd7f, _0x3579a2 = this[_0x2fca87(0x5da) + _0x2fca87(0x962) + 'apHeight']() || -0x3b5 * 0xa + -0x9d9 * -0x1 + 0x1b3a; const _0x5121a2 = Math[_0x2fca87(0x89c)](-0x239c + 0xd64 + 0x1639, _0x10affe, _0x3579a2); _0x2b6bfd = _0x3fc96b[_0x2fca87(0xa17)](_0x864f8f, _0x5121a2); } _0x2b6bfd *= _0x3ff6c8, _0x3fc96b['ldxSa'](_0x2b6bfd, -0xb * 0x17 + 0x52 * -0x3d + 0x18 * 0xdb) && (this[_0x2fca87(0x99f) + _0x2fca87(0x453)][_0x2fca87(0x3c6)][_0x2fca87(0x410)] = !![]), _0x572ac4[_0x2fca87(0x7c9)]['x'] = _0x2b6bfd, _0x572ac4[_0x2fca87(0x7c9)]['y'] = _0x2b6bfd, this[_0x2fca87(0x81d)] = !![], this[_0x2fca87(0x67e) + _0x2fca87(0x1f2) + _0x2fca87(0xa61)](); }, Sprite_Character['prototype'][_0x2542b2(0x5da) + _0x2542b2(0x962) + 'apWidth'] = function () { const _0x4119da = _0x2542b2, _0x5f0556 = this['_attachPic' + _0x4119da(0x453)]; if (!_0x5f0556) return -0xf5 * -0x21 + -0x73b + -0x185a; return _0x5f0556['bitmap'][_0x4119da(0x4ff)]; }, Sprite_Character[_0x2542b2(0x336)][_0x2542b2(0x5da) + 'ictureBitm' + 'apHeight'] = function () { const _0x2537c4 = _0x2542b2, _0x7eeff7 = this['_attachPic' + _0x2537c4(0x453)]; if (!_0x7eeff7) return 0x36e + 0x67 * -0x15 + 0x505; return _0x7eeff7[_0x2537c4(0x3c6)]['height']; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x7ce) + _0x2542b2(0x6f8)] = Sprite_Balloon[_0x2542b2(0x336)]['setup'], Sprite_Balloon[_0x2542b2(0x336)][_0x2542b2(0x83c)] = function (_0xeb0335, _0x33d6fe) { const _0x2d8b25 = _0x2542b2; VisuMZ[_0x2d8b25(0x6af) + _0x2d8b25(0x53e)][_0x2d8b25(0x7ce) + _0x2d8b25(0x6f8)][_0x2d8b25(0x325)](this, _0xeb0335, _0x33d6fe), VisuMZ[_0x2d8b25(0x6af) + _0x2d8b25(0x53e)]['Settings']['VS8'][_0x2d8b25(0x78b) + 'n'] && this[_0x2d8b25(0x963)][_0x2d8b25(0xab0)][_0x2d8b25(0x8d8) + _0x2d8b25(0x97c)](_0x33d6fe, this[_0x2d8b25(0x792)]); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x7ce) + _0x2542b2(0x30a) + _0x2542b2(0x5d7)] = Sprite_Balloon[_0x2542b2(0x336)][_0x2542b2(0x341) + _0x2542b2(0x388)], Sprite_Balloon[_0x2542b2(0x336)][_0x2542b2(0x341) + _0x2542b2(0x388)] = function () { const _0x54d964 = _0x2542b2; VisuMZ[_0x54d964(0x6af) + 'Core'][_0x54d964(0x7ce) + _0x54d964(0x30a) + _0x54d964(0x5d7)][_0x54d964(0x325)](this), this['updateVS8B' + _0x54d964(0x8da) + _0x54d964(0x3ed)](); }, Sprite_Balloon[_0x2542b2(0x336)]['updateVS8B' + _0x2542b2(0x8da) + _0x2542b2(0x3ed)] = function () { const _0xac6d87 = _0x2542b2; this[_0xac6d87(0x963)][_0xac6d87(0xab0)][_0xac6d87(0x335) + _0xac6d87(0x826)]() && (this['x'] += VisuMZ[_0xac6d87(0x6af) + _0xac6d87(0x53e)][_0xac6d87(0x2cc)][_0xac6d87(0xa70)][_0xac6d87(0x436) + _0xac6d87(0x9be)], this['y'] += VisuMZ[_0xac6d87(0x6af) + _0xac6d87(0x53e)][_0xac6d87(0x2cc)]['VS8'][_0xac6d87(0x436) + _0xac6d87(0x38a)]); }, Sprite_Timer[_0x2542b2(0x336)][_0x2542b2(0x51b) + 'ap'] = function () { const _0x28b953 = _0x2542b2, _0x890150 = { 'csErc': function (_0xb4bbd4, _0x5c7610) { return _0xb4bbd4 / _0x5c7610; } }; this['bitmap'] = new Bitmap(Math[_0x28b953(0x3c7)](_0x890150[_0x28b953(0x848)](Graphics[_0x28b953(0x9ab)], -0xcd * -0xd + 0x9f6 + -0x145d)), 0x390 + 0xcfd + -0x105d), this[_0x28b953(0x3c6)][_0x28b953(0x49a)] = this[_0x28b953(0x49a)](), this['bitmap']['fontSize'] = this[_0x28b953(0x800)](), this[_0x28b953(0x3c6)][_0x28b953(0x86f) + 'or'] = ColorManager[_0x28b953(0x86f) + 'or'](); }, Sprite_Timer[_0x2542b2(0x336)]['timerText'] = function () { const _0x4b616c = _0x2542b2, _0x30c8c8 = { 'utKvZ': function (_0x2f3f1f, _0x1b5828) { return _0x2f3f1f / _0x1b5828; }, 'zxDOL': function (_0x40f50c, _0x431250) { return _0x40f50c % _0x431250; }, 'joouh': function (_0x3dae10, _0x4e94ec) { return _0x3dae10 % _0x4e94ec; }, 'rHIHK': function (_0x1326de, _0x149801) { return _0x1326de + _0x149801; }, 'xXYya': function (_0x4627e1, _0x2e6978) { return _0x4627e1 > _0x2e6978; }, 'ofsrG': _0x4b616c(0x293) }, _0x1dd455 = Math['floor'](_0x30c8c8[_0x4b616c(0xb55)](_0x30c8c8[_0x4b616c(0xb55)](this[_0x4b616c(0xb38)], -0x2478 + -0x25cc + 0x4a80), -0x33 * -0xb2 + -0x28a + -0x20b0)), _0x522e72 = _0x30c8c8['zxDOL'](Math['floor'](_0x30c8c8[_0x4b616c(0xb55)](this[_0x4b616c(0xb38)], 0x745 * -0x1 + 0x2ff + -0x2 * -0x241)), -0x1 * -0x985 + -0x723 + -0x6e * 0x5), _0x2e31e6 = _0x30c8c8[_0x4b616c(0x45c)](this['_seconds'], 0xe * 0x21d + -0x287 * -0xb + 0x1 * -0x3927); let _0x4e3829 = _0x30c8c8['rHIHK'](_0x30c8c8[_0x4b616c(0x597)](_0x522e72['padZero'](-0x1cf * -0x6 + 0x19df * 0x1 + 0xd * -0x2d3), ':'), _0x2e31e6[_0x4b616c(0xb00)](0x1 * -0xa3d + 0xbe * -0x10 + -0x1 * -0x161f)); if (_0x30c8c8[_0x4b616c(0x57a)](_0x1dd455, -0x3f6 + -0x41 * -0x3d + -0xb87)) _0x4e3829 = _0x30c8c8['ofsrG']['format'](_0x1dd455, _0x4e3829); return _0x4e3829; }; function Sprite_EventLabel() { const _0x5b3dec = _0x2542b2; this[_0x5b3dec(0x9f5)](...arguments); } function _0x5c62(_0x4bd917, _0xefaf9a) { const _0x2b0ddd = _0x4d4d(); return _0x5c62 = function (_0x4e9238, _0x20d250) { _0x4e9238 = _0x4e9238 - (0x10e9 * -0x2 + -0x20ff * -0x1 + 0x2a3); let _0x188d75 = _0x2b0ddd[_0x4e9238]; return _0x188d75; }, _0x5c62(_0x4bd917, _0xefaf9a); } Sprite_EventLabel[_0x2542b2(0x336)] = Object[_0x2542b2(0x498)](Sprite['prototype']), Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x6dc) + 'r'] = Sprite_EventLabel, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x9f5)] = function (_0x102806) { const _0x4c8697 = _0x2542b2; this[_0x4c8697(0xab5)] = _0x102806, Sprite[_0x4c8697(0x336)][_0x4c8697(0x9f5)]['call'](this), this['initMember' + 's'](), this[_0x4c8697(0x283) + 'yWindow'](); }, Sprite_EventLabel[_0x2542b2(0x336)]['initMember' + 's'] = function () { const _0x720475 = _0x2542b2; this[_0x720475(0xadd)]['x'] = 0x5 * -0x385 + 0x2b * -0xc1 + 0x3204 + 0.5, this[_0x720475(0xadd)]['y'] = -0x170e * 0x1 + 0x24c7 * 0x1 + -0x6dc * 0x2; }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x283) + 'yWindow'] = function () { const _0x1f6359 = _0x2542b2, _0x19a872 = new Rectangle(-0x12ea + 0x503 * -0x4 + -0x26f6 * -0x1, 0x16c9 + 0x117b + -0x2844, -0x157c + -0xc7a * 0x1 + 0x21f7, -0x26 * 0xca + -0x2 * -0xc2b + 0x1 * 0x5a7); this['_proxyWind' + 'ow'] = new Window_Base(_0x19a872), this[_0x1f6359(0x318) + 'ow'][_0x1f6359(0x8c6)] = -0x4 * -0x3a6 + -0x1b0a + 0xc72, this[_0x1f6359(0x79f)] = this[_0x1f6359(0x51c) + 'ible']() ? -0x1d83 + 0x1a7d + 0x405 : 0x25da + -0x24a4 + -0xa * 0x1f; }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x316)] = function () { const _0x23a810 = _0x2542b2, _0x254e79 = { 'xEXbe': _0x23a810(0xb60) + '2' }, _0x3bdd0a = _0x254e79[_0x23a810(0x2d7)]['split']('|'); let _0x5e9533 = 0x23fb + 0x841 * -0x1 + -0x1bba; while (!![]) { switch (_0x3bdd0a[_0x5e9533++]) { case '0': this[_0x23a810(0x6a0) + 'e'](); continue; case '1': this[_0x23a810(0x7ba)](); continue; case '2': this['updateHueS' + 'hift'](); continue; case '3': Sprite[_0x23a810(0x336)][_0x23a810(0x316)][_0x23a810(0x325)](this); continue; case '4': this[_0x23a810(0x341) + 'tion'](); continue; case '5': this[_0x23a810(0x2e9) + _0x23a810(0x71f)](); continue; }break; } }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x7ba)] = function () { const _0x4f2f16 = _0x2542b2, _0x3b1de8 = { 'rNVFU': function (_0x412a7a, _0x22b35e) { return _0x412a7a !== _0x22b35e; } }; _0x3b1de8[_0x4f2f16(0xb26)](this[_0x4f2f16(0xab5)][_0x4f2f16(0x735) + 'wText'](), this[_0x4f2f16(0x5d2)]) && (this[_0x4f2f16(0x5d2)] = this[_0x4f2f16(0xab5)][_0x4f2f16(0x735) + _0x4f2f16(0x43c)](), this['refresh']()); }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x4db)] = function () { const _0x4ab589 = _0x2542b2; if (!this[_0x4ab589(0x318) + 'ow']) return; this[_0x4ab589(0x281) + 'ow'](), this[_0x4ab589(0x8dc)](); }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x281) + 'ow'] = function () { const _0x57787b = _0x2542b2, _0x63ec75 = { 'AiWgW': function (_0x5647bc, _0x4cc2bb) { return _0x5647bc + _0x4cc2bb; }, 'hzkAL': function (_0x15cfc9, _0x34a9ed) { return _0x15cfc9 * _0x34a9ed; } }, _0x3d777e = this['_proxyWind' + 'ow'][_0x57787b(0xafa)](this[_0x57787b(0x5d2)]), _0x5b2217 = this[_0x57787b(0x318) + 'ow']['itemPaddin' + 'g'](), _0x5f2565 = _0x63ec75[_0x57787b(0xb22)](_0x3d777e['width'], _0x63ec75[_0x57787b(0x653)](_0x5b2217, -0xace + -0xad5 * 0x3 + -0x2b4f * -0x1)), _0x2c57b9 = _0x3d777e[_0x57787b(0x842)]; this[_0x57787b(0x318) + 'ow']['move'](0x1182 + 0x813 + -0x1995, 0x163 * -0x19 + -0x1 * 0x1123 + 0x2ba * 0x13, _0x5f2565, _0x2c57b9), this[_0x57787b(0x318) + 'ow'][_0x57787b(0x4d2) + _0x57787b(0x865)](), this['bitmap'] = this[_0x57787b(0x318) + 'ow']['contents']; }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x8dc)] = function () { const _0x369153 = _0x2542b2, _0x3a9f1c = this['_proxyWind' + 'ow'][_0x369153(0x89f) + 'g'](); this[_0x369153(0x318) + 'ow'][_0x369153(0xb4f)](this[_0x369153(0x5d2)], _0x3a9f1c, 0x19d + 0x1835 * 0x1 + -0x19d2); }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x6a0) + 'e'] = function () { const _0x1b03ea = _0x2542b2, _0x14ad8a = { 'Tjrnk': function (_0x14633c, _0x5844c7) { return _0x14633c / _0x5844c7; } }, _0x46993e = VisuMZ['EventsMove' + _0x1b03ea(0x53e)][_0x1b03ea(0x2cc)][_0x1b03ea(0xa05)][_0x1b03ea(0x36e)], _0x4e4c25 = $gameSystem[_0x1b03ea(0x3f6) + 'ze']() || -0x3 * -0x78b + 0x5 * -0x479 + -0x43; this[_0x1b03ea(0x7c9)]['x'] = this['scale']['y'] = _0x14ad8a[_0x1b03ea(0x949)](_0x46993e, _0x4e4c25); }, Sprite_EventLabel['prototype'][_0x2542b2(0x341) + _0x2542b2(0x388)] = function () { const _0x517aa8 = _0x2542b2, _0x23749d = { 'IabId': function (_0x82d230, _0x34a6b9) { return _0x82d230 - _0x34a6b9; }, 'jqgcJ': function (_0x3dcdd8, _0xbafe1b) { return _0x3dcdd8 * _0xbafe1b; }, 'fBOsD': function (_0x585726, _0x581759) { return _0x585726 * _0x581759; } }; if (!SceneManager[_0x517aa8(0x40e)]) return; if (!SceneManager[_0x517aa8(0x40e)][_0x517aa8(0x541)]) return; const _0x509f66 = SceneManager[_0x517aa8(0x40e)][_0x517aa8(0x541)][_0x517aa8(0x4e9) + 'Sprite'](this[_0x517aa8(0xab5)]); if (!_0x509f66) return; this['x'] = this[_0x517aa8(0xab5)][_0x517aa8(0x356)](), this['x'] += this[_0x517aa8(0xab5)]['_labelWind' + 'ow'][_0x517aa8(0x9b5)], this['y'] = _0x23749d[_0x517aa8(0x5c3)](this[_0x517aa8(0xab5)][_0x517aa8(0x4df)](), _0x23749d[_0x517aa8(0xb3c)](_0x509f66[_0x517aa8(0x842)], _0x509f66[_0x517aa8(0x7c9)]['y'])), this['y'] += _0x23749d[_0x517aa8(0x559)]($gameSystem[_0x517aa8(0x81e) + _0x517aa8(0xa88)](), -(-0x1cd4 + 0x57d + 0x1757 + 0.5)), this['y'] += this[_0x517aa8(0xab5)][_0x517aa8(0x807) + 'ow'][_0x517aa8(0xb51)]; }, Sprite_EventLabel['prototype'][_0x2542b2(0x2e9) + _0x2542b2(0x71f)] = function () { const _0x58a1e2 = _0x2542b2, _0x243562 = { 'jAdkx': function (_0x590a56, _0x1f0a47) { return _0x590a56 > _0x1f0a47; } }; if (this[_0x58a1e2(0x51c) + _0x58a1e2(0x9f6)]()) this[_0x58a1e2(0x79f)] += this[_0x58a1e2(0x69c) + 'ed'](); else _0x243562[_0x58a1e2(0x847)](SceneManager[_0x58a1e2(0x40e)]['_encounter' + 'EffectDura' + _0x58a1e2(0x388)], -0xb92 * 0x1 + -0x1 * 0x832 + 0x3f4 * 0x5) ? this['opacity'] = 0x7a8 + 0x2 * -0x257 + -0x2fa : this[_0x58a1e2(0x79f)] -= this[_0x58a1e2(0x69c) + 'ed'](); }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x488) + 'hift'] = function () { const _0x266974 = _0x2542b2, _0x5814ca = { 'QvAXh': function (_0x8ebc87, _0x1224b1) { return _0x8ebc87 + _0x1224b1; } }; if (this[_0x266974(0x51c) + 'ible']() && this[_0x266974(0xab5)] && this[_0x266974(0xab5)]['_labelWind' + 'ow'][_0x266974(0x6b0)]) { const _0x2b36a8 = _0x5814ca[_0x266974(0x35e)](this[_0x266974(0x4de)], this['_event']['_labelWind' + 'ow'][_0x266974(0x6b0)] || 0x4 * 0x669 + -0xd25 + -0xc7f * 0x1); this[_0x266974(0x5b1)](_0x2b36a8); } }, Sprite_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x51c) + _0x2542b2(0x9f6)] = function () { const _0x37e15b = _0x2542b2, _0x4991e8 = { 'wXLaO': function (_0xf11465, _0x1e00a0) { return _0xf11465 < _0x1e00a0; }, 'FgJpR': function (_0xb1c7c6, _0x4912b7) { return _0xb1c7c6 > _0x4912b7; }, 'bcvPT': function (_0x1186be, _0x363179) { return _0x1186be === _0x363179; }, 'UKvwK': function (_0x2840f1, _0x4c801c) { return _0x2840f1 === _0x4c801c; } }; if (!$gameSystem[_0x37e15b(0x79d) + 'sVisible']()) return ![]; if (this[_0x37e15b(0xab5)]?.[_0x37e15b(0x4e2)]) return ![]; if (this[_0x37e15b(0xab5)] && _0x4991e8[_0x37e15b(0x448)](this[_0x37e15b(0xab5)][_0x37e15b(0x33b)], 0x25 * -0x85 + -0x2 * -0xb1 + -0x1 * -0x11d7)) return ![]; if (_0x4991e8['FgJpR'](SceneManager[_0x37e15b(0x40e)][_0x37e15b(0x39b) + _0x37e15b(0x2ac) + _0x37e15b(0x388)], 0x1434 + 0x19 * 0x1f + -0x13 * 0x139)) return ![]; const _0x1f3107 = $gamePlayer['x'], _0x51e425 = $gamePlayer['y'], _0x372785 = this[_0x37e15b(0xab5)]['x'], _0x296f04 = this[_0x37e15b(0xab5)]['y']; if (_0x4991e8[_0x37e15b(0x2e0)](this[_0x37e15b(0x60a) + _0x37e15b(0x5bc)], _0x1f3107) && _0x4991e8['bcvPT'](this['_visiblePl' + _0x37e15b(0x5b4)], _0x51e425) && _0x4991e8[_0x37e15b(0x72b)](this[_0x37e15b(0x1e7) + 'entX'], _0x372785) && _0x4991e8[_0x37e15b(0x72b)](this[_0x37e15b(0x1e7) + 'entY'], _0x296f04)) return this[_0x37e15b(0x702) + _0x37e15b(0x4ed)]; this[_0x37e15b(0x60a) + _0x37e15b(0x5bc)] = $gamePlayer['x'], this['_visiblePl' + 'ayerY'] = $gamePlayer['y'], this[_0x37e15b(0x1e7) + _0x37e15b(0x1f9)] = this[_0x37e15b(0xab5)]['x'], this[_0x37e15b(0x1e7) + _0x37e15b(0xb2a)] = this[_0x37e15b(0xab5)]['y']; if (_0x4991e8[_0x37e15b(0xb5d)]($gameMap['absDistanc' + 'e'](_0x1f3107, _0x51e425, _0x372785, _0x296f04), this['_event'][_0x37e15b(0x735) + _0x37e15b(0x8eb)]())) return this[_0x37e15b(0x702) + _0x37e15b(0x4ed)] = ![], ![]; return this['_cacheVisi' + _0x37e15b(0x4ed)] = !![], !![]; }, Sprite_EventLabel['prototype'][_0x2542b2(0x69c) + 'ed'] = function () { const _0x160b8b = _0x2542b2; return VisuMZ[_0x160b8b(0x6af) + _0x160b8b(0x53e)][_0x160b8b(0x2cc)]['Label']['OpacitySpe' + 'ed']; }; function Sprite_VisuMz_MessagePopup() { const _0x248536 = _0x2542b2; this[_0x248536(0x9f5)](...arguments); } Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)] = Object[_0x2542b2(0x498)](Sprite[_0x2542b2(0x336)]), Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)]['constructo' + 'r'] = Sprite_VisuMz_MessagePopup, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)]['initialize'] = function (_0x484f27) { const _0x162694 = _0x2542b2, _0x17725a = { 'beVCf': _0x162694(0xa0b) + '3' }, _0x98d6ee = _0x17725a[_0x162694(0x5ec)][_0x162694(0x968)]('|'); let _0x487aba = -0x1 * 0x2277 + -0x8b * 0x5 + 0x252e; while (!![]) { switch (_0x98d6ee[_0x487aba++]) { case '0': this['initMember' + 's'](); continue; case '1': this[_0x162694(0x371)] = _0x484f27; continue; case '2': Sprite[_0x162694(0x336)][_0x162694(0x9f5)][_0x162694(0x325)](this); continue; case '3': this[_0x162694(0x316)](); continue; case '4': this[_0x162694(0x723) + _0x162694(0x808)](); continue; case '5': this['createText' + 'Sprite'](); continue; }break; } }, Sprite_VisuMz_MessagePopup['prototype'][_0x2542b2(0x452) + 's'] = function () { const _0x378963 = _0x2542b2, _0x305786 = { 'pzrzQ': _0x378963(0x5fb) + '|16|14|3|4' + '|7|10|18|1' + _0x378963(0x539) + _0x378963(0x768) + _0x378963(0xa33), 'WjjUu': function (_0x33e3e7, _0x39da3d) { return _0x33e3e7 > _0x39da3d; }, 'sOwXL': function (_0x34e8ee, _0x125818) { return _0x34e8ee >= _0x125818; }, 'WxlNY': function (_0x13d710, _0x41395f) { return _0x13d710 * _0x41395f; }, 'zXxKQ': function (_0xe88a24, _0x2e22b3) { return _0xe88a24 > _0x2e22b3; }, 'HXXjH': function (_0xb812bb, _0x2d8e89) { return _0xb812bb > _0x2d8e89; } }, _0x3a22b6 = _0x305786[_0x378963(0x995)][_0x378963(0x968)]('|'); let _0x3be45c = 0x8 * -0x18c + 0x3ce * -0x4 + -0x8 * -0x373; while (!![]) { switch (_0x3a22b6[_0x3be45c++]) { case '0': this[_0x378963(0x89b) + 'eY'] = this[_0x378963(0x371)][_0x378963(0x6b8)]['y']; continue; case '1': this[_0x378963(0x2b0)] = this['_settings'][_0x378963(0x227)]['x']; continue; case '2': this[_0x378963(0x468) + 'le'] = -this['_settings']['angle']['end']; continue; case '3': this['_fadeOutDu' + _0x378963(0x6e5)] = this[_0x378963(0x371)][_0x378963(0x97d) + 'on'][_0x378963(0x998)]; continue; case '4': _0x305786[_0x378963(0x256)](this['_fadeOutDu' + _0x378963(0x6e5)], 0xe5a + -0x833 * -0x1 + -0x1 * 0x168d) && _0x305786['sOwXL'](this[_0x378963(0x251) + _0x378963(0x6e5)], Math[_0x378963(0xa9d)](_0x305786['WxlNY'](this['_duration'], 0x1053 + -0x15a5 * 0x1 + -0xe3 * -0x6 + 0.48))) && (this[_0x378963(0x251) + _0x378963(0x6e5)] = Math[_0x378963(0xa9d)](_0x305786['WxlNY'](this[_0x378963(0x792)], 0x15a9 + 0x1ec2 + -0x346b + 0.48))); continue; case '5': this[_0x378963(0x73b) + 'c'] = -0x649 * 0x1 + 0x775 + 0x19 * -0xc; continue; case '6': this['_arcPeak'] = -this['_settings']['misc']['arc']; continue; case '7': this[_0x378963(0x691) + _0x378963(0x3cb)] = this[_0x378963(0x251) + 'ration']; continue; case '8': this[_0x378963(0x792)] = this[_0x378963(0x371)][_0x378963(0x2fb)]; continue; case '9': this[_0x378963(0x3a4)] = this[_0x378963(0x371)]['endOffset']['y']; continue; case '10': this[_0x378963(0x65d)] = this[_0x378963(0x371)][_0x378963(0x457) + 't']['x']; continue; case '11': this[_0x378963(0x27f)] = this[_0x378963(0x65d)]; continue; case '12': this['_offsetY'] = this['_startY']; continue; case '13': this[_0x378963(0x89b) + 'eX'] = this[_0x378963(0x371)][_0x378963(0x6b8)]['x']; continue; case '14': this[_0x378963(0x79f)] = _0x305786['zXxKQ'](this['_fadeInDur' + _0x378963(0x455)], -0x2540 + 0x25dd * -0x1 + -0x7 * -0xabb) ? 0x61b + 0x101 * 0x11 + -0x172c : 0x8e7 * 0x4 + -0x373 + -0x2 * 0xf95; continue; case '15': this[_0x378963(0x7a1) + 'e'] = -this['_settings'][_0x378963(0x52d)][_0x378963(0x357)]; continue; case '16': _0x305786[_0x378963(0x2aa)](this['_fadeInDur' + 'ation'], -0x163 + -0x1fa4 + 0x2107 * 0x1) && _0x305786[_0x378963(0x306)](this[_0x378963(0x43b) + _0x378963(0x455)], Math[_0x378963(0xa9d)](_0x305786['WxlNY'](this[_0x378963(0x792)], 0x88b + 0x518 + -0xda3 + 0.48))) && (this[_0x378963(0x43b) + 'ation'] = Math['floor'](_0x305786[_0x378963(0x98a)](this['_duration'], -0x22f3 + 0x15d4 + -0xd1f * -0x1 + 0.48))); continue; case '17': this[_0x378963(0x4c9) + _0x378963(0xaf7)] = this[_0x378963(0x371)]['endScale']['x']; continue; case '18': this[_0x378963(0x423)] = this[_0x378963(0x371)][_0x378963(0x457) + 't']['y']; continue; case '19': this[_0x378963(0x4c9) + _0x378963(0x5dd)] = this[_0x378963(0x371)][_0x378963(0x2a5)]['y']; continue; case '20': this['z'] = 0x7 * -0x540 + -0x2 * 0x10f1 + -0x98 * -0x77; continue; case '21': this[_0x378963(0x9d8) + 'tion'] = this[_0x378963(0x371)][_0x378963(0x2fb)]; continue; case '22': this[_0x378963(0x43b) + _0x378963(0x455)] = this[_0x378963(0x371)][_0x378963(0x97d) + 'on'][_0x378963(0x803)]; continue; }break; } }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)][_0x2542b2(0x723) + 'yWindow'] = function () { const _0x363c25 = _0x2542b2, _0x5e2d2a = { 'pDRfr': function (_0x2a104e, _0x36a7e1) { return _0x2a104e + _0x36a7e1; }, 'fRran': function (_0x5833bd, _0x577aa6) { return _0x5833bd * _0x577aa6; }, 'opyQn': function (_0x4cdcfa, _0x1b7f27) { return _0x4cdcfa + _0x1b7f27; } }, _0x17a9aa = this[_0x363c25(0x371)], _0x57b0a3 = new Rectangle(0xd * 0x12 + -0x237b + -0x2291 * -0x1, -0xb1b + 0x6f + 0x1 * 0xaac, Graphics['width'], Graphics[_0x363c25(0x842)]); this[_0x363c25(0x917) + 'ow'] = new Window_Base(_0x57b0a3); const _0x306a4f = this[_0x363c25(0x917) + 'ow']['textSizeEx'](_0x17a9aa['text']), _0x1ebd30 = _0x306a4f['width'], _0x5c79d8 = _0x306a4f[_0x363c25(0x842)], _0x366b58 = _0x5e2d2a[_0x363c25(0x814)](_0x1ebd30, _0x5e2d2a[_0x363c25(0x630)]($gameSystem[_0x363c25(0x81e) + _0x363c25(0xa88)](), 0x217 * -0x3 + 0x17f7 + -0x8 * 0x236)), _0x4bcaf7 = _0x5e2d2a['opyQn'](_0x5c79d8, _0x5e2d2a['fRran']($gameSystem[_0x363c25(0x81e) + 'ing'](), 0xb * 0x6 + -0x2662 + 0x2622)); this[_0x363c25(0x917) + 'ow'][_0x363c25(0x804)](-0x148 * -0x11 + 0x506 * -0x1 + -0x10c2, -0x26af + -0xa18 + -0x30c7 * -0x1, _0x366b58, _0x4bcaf7), this[_0x363c25(0x917) + 'ow'][_0x363c25(0x4d2) + _0x363c25(0x865)](), this[_0x363c25(0x917) + 'ow'][_0x363c25(0xb4f)](_0x17a9aa[_0x363c25(0x2de)], 0x1b1 * 0x7 + -0x1 * -0xbe9 + -0x17c0, -0x1 * -0x649 + -0x1 * 0xe84 + 0x7 * 0x12d); }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)][_0x2542b2(0x328) + 'Sprite'] = function () { const _0x458ba6 = _0x2542b2, _0x334420 = { 'JXogG': '4|0|1|8|7|' + '5|2|6|9|3' }, _0x2049d6 = _0x334420[_0x458ba6(0x94d)]['split']('|'); let _0x18239e = -0x4 * -0x173 + -0x1762 + 0x1196; while (!![]) { switch (_0x2049d6[_0x18239e++]) { case '0': this[_0x458ba6(0x358) + 'e']['bitmap'] = this['_dummyWind' + 'ow'][_0x458ba6(0x602)]; continue; case '1': this['_textSprit' + 'e'][_0x458ba6(0xadd)]['x'] = 0x6 * 0x583 + 0x1687 + -0x3799 + 0.5; continue; case '2': this['_textSprit' + 'e'][_0x458ba6(0x7c9)]['x'] = this[_0x458ba6(0x89b) + 'eX']; continue; case '3': this[_0x458ba6(0x9b3)](this[_0x458ba6(0x358) + 'e']); continue; case '4': this[_0x458ba6(0x358) + 'e'] = new Sprite(); continue; case '5': this[_0x458ba6(0x358) + 'e']['y'] = this[_0x458ba6(0x423)]; continue; case '6': this[_0x458ba6(0x358) + 'e']['scale']['y'] = this[_0x458ba6(0x89b) + 'eY']; continue; case '7': this['_textSprit' + 'e']['x'] = this[_0x458ba6(0x65d)]; continue; case '8': this[_0x458ba6(0x358) + 'e'][_0x458ba6(0xadd)]['y'] = -0x8f9 * -0x1 + 0x336 + -0x1 * 0xc2f + 0.5; continue; case '9': this[_0x458ba6(0x358) + 'e'][_0x458ba6(0x52d)] = this[_0x458ba6(0x7a1) + 'e']; continue; }break; } }, Sprite_VisuMz_MessagePopup['prototype'][_0x2542b2(0x316)] = function () { const _0x887513 = _0x2542b2, _0x1e22b8 = { 'BZCLR': '2|3|0|6|1|' + _0x887513(0x3d4) }, _0x247f80 = _0x1e22b8[_0x887513(0x571)][_0x887513(0x968)]('|'); let _0xe58dc6 = -0x1 * -0x208b + -0x1500 + -0x5 * 0x24f; while (!![]) { switch (_0x247f80[_0xe58dc6++]) { case '0': this['updateSpri' + _0x887513(0x466)](); continue; case '1': this[_0x887513(0x7ba) + _0x887513(0x3e7)](); continue; case '2': Sprite[_0x887513(0x336)][_0x887513(0x316)][_0x887513(0x325)](this); continue; case '3': if (!this[_0x887513(0x912)]()) return; continue; case '4': this[_0x887513(0x7ba) + _0x887513(0x53d)](); continue; case '5': this[_0x887513(0x715) + _0x887513(0x388)](); continue; case '6': this[_0x887513(0x7ba) + _0x887513(0x851)](); continue; case '7': this[_0x887513(0x2e9) + _0x887513(0x71f)](); continue; }break; } }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)][_0x2542b2(0x912)] = function () { const _0x2fdf62 = _0x2542b2; return !!this[_0x2fdf62(0x358) + 'e']; }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)][_0x2542b2(0x2a1) + _0x2542b2(0x466)] = function () { const _0x154fa3 = _0x2542b2, _0x4836d9 = { 'BDXHa': function (_0x19c133, _0x6a66cb) { return _0x19c133 + _0x6a66cb; }, 'eXVOo': function (_0x35f451, _0x219942) { return _0x35f451 * _0x219942; }, 'KIxEj': function (_0x8c90d2, _0x5b4cb7) { return _0x8c90d2 / _0x5b4cb7; }, 'JHhey': function (_0x1d5b6e, _0x22624b) { return _0x1d5b6e + _0x22624b; } }, _0x23dc61 = this['_settings']; { const _0xf96b41 = $gameMap[_0x154fa3(0x926)](), _0x2a19ba = _0x23dc61['tileCoordi' + _0x154fa3(0x831)]['x'], _0x411238 = $gameMap[_0x154fa3(0x2c4)](_0x2a19ba); this['x'] = Math[_0x154fa3(0xa9d)](_0x4836d9[_0x154fa3(0x467)](_0x4836d9[_0x154fa3(0x8c8)](_0x411238, _0xf96b41), _0x4836d9[_0x154fa3(0x55d)](_0xf96b41, 0x1 * -0x1beb + 0x1 * -0x8d7 + 0x34 * 0xb5))); } { const _0x33ee91 = $gameMap[_0x154fa3(0x471)](), _0xd9f2c2 = _0x23dc61[_0x154fa3(0x9c9) + _0x154fa3(0x831)]['y'], _0x3f8b9a = $gameMap[_0x154fa3(0xa1c)](_0xd9f2c2); this['y'] = Math[_0x154fa3(0xa9d)](_0x4836d9[_0x154fa3(0x35f)](_0x4836d9['eXVOo'](_0x3f8b9a, _0x33ee91), _0x33ee91)); } }, Sprite_VisuMz_MessagePopup['prototype'][_0x2542b2(0x7ba) + 'Position'] = function () { const _0x522e9f = _0x2542b2, _0x158abd = { 'xZkIH': function (_0x39e89d, _0x33da76) { return _0x39e89d <= _0x33da76; }, 'TjEcB': function (_0x56e1d1, _0x434f0b) { return _0x56e1d1 / _0x434f0b; }, 'hpDrB': function (_0x365c82, _0x3b7c51) { return _0x365c82 + _0x3b7c51; }, 'NgEPQ': function (_0x14ccaa, _0x433dd0) { return _0x14ccaa * _0x433dd0; }, 'faVmc': function (_0x45167f, _0x3cb58b) { return _0x45167f - _0x3cb58b; }, 'giuhP': function (_0x367f03, _0xe4003b) { return _0x367f03 * _0xe4003b; }, 'otaLX': function (_0x3fa787, _0x2d9f57) { return _0x3fa787 - _0x2d9f57; }, 'rjpHN': function (_0x314e36, _0x3e4026) { return _0x314e36 + _0x3e4026; }, 'KiCKn': function (_0x4de203, _0x38343a) { return _0x4de203 + _0x38343a; } }; if (_0x158abd[_0x522e9f(0x550)](this[_0x522e9f(0x792)], -0x1469 + 0x1c6a + -0x801)) return; const _0x4789b7 = this['_duration'], _0x553c91 = this[_0x522e9f(0x9d8) + 'tion']; { this['_offsetX'] = _0x158abd[_0x522e9f(0x864)](_0x158abd[_0x522e9f(0x58b)](_0x158abd[_0x522e9f(0xaea)](this[_0x522e9f(0x27f)], _0x158abd[_0x522e9f(0x2f9)](_0x4789b7, -0x439 * 0x2 + 0x1f3c + -0x16c9)), this[_0x522e9f(0x2b0)]), _0x4789b7), this[_0x522e9f(0x8aa)] = _0x158abd[_0x522e9f(0x864)](_0x158abd[_0x522e9f(0x58b)](_0x158abd[_0x522e9f(0xb4e)](this['_offsetY'], _0x158abd[_0x522e9f(0x6a2)](_0x4789b7, 0x10 * -0x86 + 0x6e1 + -0x2 * -0xc0)), this[_0x522e9f(0x3a4)]), _0x4789b7); } { const _0x3e3c98 = _0x158abd[_0x522e9f(0x2f9)](_0x553c91, _0x4789b7), _0x3eabb7 = _0x158abd[_0x522e9f(0x864)](_0x553c91, -0x1 * -0x1df9 + 0x9 * -0x15 + 0x3 * -0x9be), _0x38134a = this['_arcPeak'], _0x3552fe = _0x158abd[_0x522e9f(0x864)](-_0x38134a, Math[_0x522e9f(0x36a)](_0x3eabb7, 0x363 * -0xa + 0xc95 + 0x154b)); this[_0x522e9f(0x73b) + 'c'] = _0x158abd['rjpHN'](_0x158abd[_0x522e9f(0xaea)](_0x3552fe, Math['pow'](_0x158abd[_0x522e9f(0x2f9)](_0x3e3c98, _0x3eabb7), -0x711 + -0x10e0 + 0x17f3 * 0x1)), _0x38134a); } this[_0x522e9f(0x358) + 'e']['x'] = this['_offsetX'], this[_0x522e9f(0x358) + 'e']['y'] = _0x158abd[_0x522e9f(0x578)](this[_0x522e9f(0x8aa)], this[_0x522e9f(0x73b) + 'c']); }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)]['updateText' + _0x2542b2(0x3e7)] = function () { const _0x1335d5 = _0x2542b2, _0x3d605f = { 'oRmQZ': function (_0xa619f8, _0x41fe60) { return _0xa619f8 <= _0x41fe60; }, 'UfMlo': function (_0xe80e48, _0x376429) { return _0xe80e48 / _0x376429; }, 'gZIAc': function (_0x5613b1, _0x4323f4) { return _0x5613b1 + _0x4323f4; }, 'iWKmM': function (_0x5c3fc9, _0x233aa1) { return _0x5c3fc9 * _0x233aa1; }, 'Ynctu': function (_0x5d5b97, _0x379ace) { return _0x5d5b97 - _0x379ace; }, 'nfOQR': function (_0x560ede, _0x324005) { return _0x560ede - _0x324005; } }; if (_0x3d605f['oRmQZ'](this['_duration'], 0x7 * -0x38b + 0x1 * 0x14f + 0x177e)) return; const _0xb65ebc = this[_0x1335d5(0x792)]; this[_0x1335d5(0x358) + 'e'][_0x1335d5(0x7c9)]['x'] = _0x3d605f[_0x1335d5(0x377)](_0x3d605f[_0x1335d5(0x7e1)](_0x3d605f['iWKmM'](this[_0x1335d5(0x358) + 'e']['scale']['x'], _0x3d605f[_0x1335d5(0x262)](_0xb65ebc, 0x19b2 + 0xbec + -0x1 * 0x259d)), this[_0x1335d5(0x4c9) + _0x1335d5(0xaf7)]), _0xb65ebc), this[_0x1335d5(0x358) + 'e'][_0x1335d5(0x7c9)]['y'] = _0x3d605f[_0x1335d5(0x377)](_0x3d605f[_0x1335d5(0x7e1)](_0x3d605f[_0x1335d5(0x9f1)](this[_0x1335d5(0x358) + 'e'][_0x1335d5(0x7c9)]['y'], _0x3d605f[_0x1335d5(0xb4c)](_0xb65ebc, 0x972 + 0x1839 * 0x1 + -0x21aa)), this[_0x1335d5(0x4c9) + _0x1335d5(0x5dd)]), _0xb65ebc); }, Sprite_VisuMz_MessagePopup['prototype'][_0x2542b2(0x7ba) + 'Angle'] = function () { const _0xde9b6b = _0x2542b2, _0x1e6aaa = { 'yEmNO': function (_0x197462, _0x167c18) { return _0x197462 <= _0x167c18; }, 'wSXjK': function (_0x1cbe9a, _0x557db5) { return _0x1cbe9a / _0x557db5; }, 'SgEdR': function (_0x354b67, _0xcde411) { return _0x354b67 + _0xcde411; }, 'pkKOt': function (_0x1518d0, _0x149ca4) { return _0x1518d0 * _0x149ca4; }, 'EJCQF': function (_0x4a4b02, _0x5e78ff) { return _0x4a4b02 - _0x5e78ff; } }; if (_0x1e6aaa[_0xde9b6b(0x5f8)](this['_duration'], 0x3 * 0x69b + -0x1 * 0x97f + -0xa52)) return; const _0x46a6c6 = this['_duration']; this['_textSprit' + 'e']['angle'] = _0x1e6aaa[_0xde9b6b(0x765)](_0x1e6aaa['SgEdR'](_0x1e6aaa[_0xde9b6b(0x426)](this[_0xde9b6b(0x358) + 'e']['angle'], _0x1e6aaa[_0xde9b6b(0x215)](_0x46a6c6, -0x3 * 0x7bb + -0x38 * -0x26 + 0xee2)), this[_0xde9b6b(0x468) + 'le']), _0x46a6c6); }, Sprite_VisuMz_MessagePopup['prototype']['updateOpac' + _0x2542b2(0x71f)] = function () { const _0x1da5c1 = _0x2542b2; this[_0x1da5c1(0x98e) + 'In'](), this[_0x1da5c1(0x98e) + _0x1da5c1(0x94b)](); }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)]['updateFade' + 'In'] = function () { const _0x35a84b = _0x2542b2, _0x36c9cd = { 'JcpAz': function (_0x3efe41, _0x6e3b81) { return _0x3efe41 <= _0x6e3b81; }, 'qHkPG': function (_0x5a2cc1, _0x355873) { return _0x5a2cc1 / _0x355873; }, 'xwmDM': function (_0x7ba697, _0x44b794) { return _0x7ba697 + _0x44b794; }, 'oFrcY': function (_0x33b3ad, _0x5d267c) { return _0x33b3ad * _0x5d267c; }, 'PtGRZ': function (_0x1ee4eb, _0x339549) { return _0x1ee4eb - _0x339549; }, 'Fpywy': function (_0x396d22, _0x168af0) { return _0x396d22 <= _0x168af0; } }; if (_0x36c9cd[_0x35a84b(0x7ed)](this[_0x35a84b(0x43b) + _0x35a84b(0x455)], 0xb1 + -0x661 + -0x5b0 * -0x1)) return; const _0x300e2d = this[_0x35a84b(0x43b) + 'ation']; this[_0x35a84b(0x79f)] = _0x36c9cd[_0x35a84b(0x250)](_0x36c9cd[_0x35a84b(0x3db)](_0x36c9cd[_0x35a84b(0x8fd)](this[_0x35a84b(0x79f)], _0x36c9cd[_0x35a84b(0x4fa)](_0x300e2d, 0x197d + -0x871 * 0x1 + -0x110b)), -0xad * 0x1f + 0xb1b * -0x2 + 0x1614 * 0x2), _0x300e2d), this['_fadeInDur' + _0x35a84b(0x455)]--, _0x36c9cd[_0x35a84b(0x85c)](this[_0x35a84b(0x43b) + _0x35a84b(0x455)], 0x313 * 0x7 + 0x56d + -0x1af2) && (this[_0x35a84b(0x79f)] = 0x1573 + 0x13fc + 0x2 * -0x1438); }, Sprite_VisuMz_MessagePopup['prototype'][_0x2542b2(0x98e) + _0x2542b2(0x94b)] = function () { const _0x3a5c84 = _0x2542b2, _0x42191d = { 'sWHzY': function (_0x2bc73d, _0x31b3ab) { return _0x2bc73d <= _0x31b3ab; }, 'YQHUb': function (_0x840849, _0x511c8a) { return _0x840849 > _0x511c8a; }, 'kywEb': function (_0x1c11fd, _0x2bcc34) { return _0x1c11fd / _0x2bcc34; }, 'CnPcV': function (_0x13ee93, _0x3525ad) { return _0x13ee93 + _0x3525ad; }, 'jmSBE': function (_0x1035f6, _0xd4e1d1) { return _0x1035f6 * _0xd4e1d1; }, 'WNawJ': function (_0x476d87, _0xcf923e) { return _0x476d87 - _0xcf923e; }, 'ojqEB': function (_0x39749b, _0x3730d9) { return _0x39749b <= _0x3730d9; } }; if (_0x42191d[_0x3a5c84(0xb0d)](this[_0x3a5c84(0x251) + 'ration'], -0x1 * -0xe14 + -0x3 * 0x718 + 0x734)) return; if (_0x42191d[_0x3a5c84(0x87b)](this[_0x3a5c84(0x792)], this[_0x3a5c84(0x691) + _0x3a5c84(0x3cb)])) return; const _0x8f3a43 = this['_fadeOutDu' + 'ration']; this[_0x3a5c84(0x79f)] = _0x42191d[_0x3a5c84(0xa99)](_0x42191d[_0x3a5c84(0x4cc)](_0x42191d[_0x3a5c84(0x2bd)](this[_0x3a5c84(0x79f)], _0x42191d[_0x3a5c84(0x4c1)](_0x8f3a43, -0x959 * -0x3 + -0x1 * 0x15a9 + 0x661 * -0x1)), 0x1769 + 0x730 + -0x1e99), _0x8f3a43), this[_0x3a5c84(0x251) + _0x3a5c84(0x6e5)]--, _0x42191d[_0x3a5c84(0x91a)](this['_fadeOutDu' + 'ration'], -0x211d + -0x23e1 + -0x227f * -0x2) && (this[_0x3a5c84(0x79f)] = -0x1b1b + -0x680 + 0x219b); }, Sprite_VisuMz_MessagePopup[_0x2542b2(0x336)][_0x2542b2(0x715) + _0x2542b2(0x388)] = function () { const _0x427314 = _0x2542b2, _0x35b653 = { 'tatuz': function (_0x194e04, _0x2ae8b5) { return _0x194e04 <= _0x2ae8b5; } }; if (_0x35b653[_0x427314(0x9e4)](this['_duration'], 0x1231 + 0x16ee + 0x1 * -0x291f)) return; this[_0x427314(0x792)]--; if (_0x35b653['tatuz'](this['_duration'], 0x1ea2 * 0x1 + -0x34 * 0xb2 + 0x586)) { if (this[_0x427314(0x4c5)]) this['parent']['removeChil' + 'd'](this); this[_0x427314(0x358) + 'e'][_0x427314(0x3c6)] && this[_0x427314(0x358) + 'e'][_0x427314(0x3c6)][_0x427314(0x976)](); } }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Spriteset_' + _0x2542b2(0x6dd) + 'LowerLayer'] = Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0x52e) + 'rLayer'], Spriteset_Map[_0x2542b2(0x336)]['createLowe' + 'rLayer'] = function () { const _0x1d67b9 = _0x2542b2; VisuMZ[_0x1d67b9(0x6af) + _0x1d67b9(0x53e)][_0x1d67b9(0x331) + _0x1d67b9(0x6dd) + _0x1d67b9(0xb40)]['call'](this), this[_0x1d67b9(0x1e5) + _0x1d67b9(0x6b9)](); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Spriteset_' + _0x2542b2(0x6dd) + _0x2542b2(0x22b)] = Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0xb67) + 'ow'], Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0xb67) + 'ow'] = function () { const _0x4f62da = _0x2542b2; VisuMZ[_0x4f62da(0x6af) + _0x4f62da(0x53e)][_0x4f62da(0x331) + _0x4f62da(0x6dd) + _0x4f62da(0x22b)][_0x4f62da(0x325)](this), this['createShad' + _0x4f62da(0x96b)](); }, Spriteset_Map[_0x2542b2(0x336)]['createShad' + 'ows'] = function () { const _0x4780b6 = _0x2542b2; if (!VisuMZ[_0x4780b6(0x6af) + 'Core'][_0x4780b6(0x2cc)][_0x4780b6(0x44e)][_0x4780b6(0x680) + 's']) return; for (const _0x4ce991 of this[_0x4780b6(0xab0) + _0x4780b6(0x958)]) { this[_0x4780b6(0x34b) + _0x4780b6(0xa74) + 'w'](_0x4ce991); } }, Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0x34b) + _0x2542b2(0xa74) + 'w'] = function (_0x3b5dee) { const _0x2ba966 = _0x2542b2, _0x40b1bf = { 'bzgkf': '6|1|0|5|4|' + _0x2ba966(0x780) }, _0x12c096 = _0x40b1bf[_0x2ba966(0xacf)][_0x2ba966(0x968)]('|'); let _0x22ceac = -0x2667 + 0x23d5 + 0x292; while (!![]) { switch (_0x12c096[_0x22ceac++]) { case '0': _0x3b5dee[_0x2ba966(0x1d7) + 'ite'][_0x2ba966(0x3c6)] = ImageManager[_0x2ba966(0x66b)](_0x3b5dee[_0x2ba966(0x1d7) + _0x2ba966(0x9b1)][_0x2ba966(0x5ed)]); continue; case '1': _0x3b5dee['_shadowSpr' + _0x2ba966(0x9b1)]['_filename'] = _0x3b5dee[_0x2ba966(0xab0)][_0x2ba966(0x8ce) + _0x2ba966(0x51e)](); continue; case '2': this['_tilemap'][_0x2ba966(0x9b3)](_0x3b5dee[_0x2ba966(0x1d7) + _0x2ba966(0x9b1)]); continue; case '3': _0x3b5dee[_0x2ba966(0x1d7) + _0x2ba966(0x9b1)]['z'] = -0x5 * 0x757 + 0x20a6 + 0x40d; continue; case '4': _0x3b5dee[_0x2ba966(0x1d7) + 'ite'][_0x2ba966(0xadd)]['y'] = -0x203 + 0x4e9 * -0x3 + 0x595 * 0x3; continue; case '5': _0x3b5dee[_0x2ba966(0x1d7) + _0x2ba966(0x9b1)][_0x2ba966(0xadd)]['x'] = 0x2c3 * -0x3 + 0x4 * 0x124 + 0x3b9 * 0x1 + 0.5; continue; case '6': _0x3b5dee[_0x2ba966(0x1d7) + _0x2ba966(0x9b1)] = new Sprite(); continue; }break; } }, Spriteset_Map['prototype']['hideShadow' + 's'] = function () { const _0x4ccee9 = _0x2542b2; if (!VisuMZ['EventsMove' + _0x4ccee9(0x53e)]['Settings'][_0x4ccee9(0x44e)][_0x4ccee9(0x680) + 's']) return; for (const _0xfedc6e of this[_0x4ccee9(0xab0) + _0x4ccee9(0x958)]) { this['_tilemap'][_0x4ccee9(0x5b9) + 'd'](_0xfedc6e['_shadowSpr' + 'ite']); } }, Spriteset_Map[_0x2542b2(0x336)]['createLabe' + 'lWindows'] = function () { const _0x31c1b2 = _0x2542b2; this[_0x31c1b2(0x807) + _0x31c1b2(0x96b)] = []; for (const _0x165cc2 of $gameMap[_0x31c1b2(0xb16)]()) { this[_0x31c1b2(0x1e5) + _0x31c1b2(0x2df) + _0x31c1b2(0x65e)](_0x165cc2); } }, Spriteset_Map['MOBILE_EVE' + _0x2542b2(0x349)] = VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x2cc)][_0x2542b2(0xa05)][_0x2542b2(0x521) + _0x2542b2(0x6cd)] ?? !![], Spriteset_Map['prototype'][_0x2542b2(0x1e5) + _0x2542b2(0x2df) + _0x2542b2(0x65e)] = function (_0x20e4c2) { const _0x559d43 = _0x2542b2; if (!this['isTargetEv' + _0x559d43(0x60c) + _0x559d43(0x59b) + 'ow'](_0x20e4c2)) return; if (Utils[_0x559d43(0x3d3) + _0x559d43(0xa06)]()) { if (!Spriteset_Map[_0x559d43(0x977) + _0x559d43(0x349)]) return; } let _0x53d5ce; const _0x45c2e7 = VisuMZ[_0x559d43(0x6af) + _0x559d43(0x53e)][_0x559d43(0x2cc)][_0x559d43(0xa05)][_0x559d43(0x3b8) + 'd'] ?? !![]; _0x53d5ce = _0x45c2e7 ? new Sprite_EventLabel(_0x20e4c2) : new Window_EventLabel(_0x20e4c2), _0x53d5ce['z'] = -0x1e4b + -0x2624 + 0x4477, _0x53d5ce[_0x559d43(0x675)] = Sprite[_0x559d43(0x6d0)]++, this[_0x559d43(0x6fa)][_0x559d43(0x9b3)](_0x53d5ce), this[_0x559d43(0x807) + _0x559d43(0x96b)][_0x559d43(0x33d)](_0x53d5ce); }, Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0x58c) + 'entValidFo' + 'rLabelWind' + 'ow'] = function (_0x5f530b) { const _0x4b35e8 = _0x2542b2, _0xda7131 = _0x5f530b[_0x4b35e8(0x264)](); if (_0xda7131['note'][_0x4b35e8(0x4d6)](/<LABEL:[ ](.*?)>/i)) return !![]; if (_0xda7131[_0x4b35e8(0x23e)][_0x4b35e8(0x4d6)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)) return !![]; for (const _0x11c507 of _0xda7131[_0x4b35e8(0x98b)]) { let _0x5d6a6e = ''; for (const _0x1542c9 of _0x11c507['list']) { [0x25d8 + -0x1 * -0x1f5d + -0x44c9, 0x23d4 + -0x161b * -0x1 + -0x3857 * 0x1]['includes'](_0x1542c9[_0x4b35e8(0x9bb)]) && (_0x5d6a6e += _0x1542c9['parameters'][0x9 * 0x397 + 0xa3b * -0x3 + -0x1 * 0x19e]); } if (_0x5d6a6e[_0x4b35e8(0x4d6)](/<LABEL:[ ](.*?)>/i)) return !![]; if (_0x5d6a6e['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)) return !![]; } return ![]; }, Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0x5e7) + _0x2542b2(0x32a)] = function (_0x582c15) { const _0x52cfca = _0x2542b2; this[_0x52cfca(0xab0) + 'Sprites'] = this[_0x52cfca(0xab0) + 'Sprites'] || []; const _0x277b92 = new Sprite_Character(_0x582c15); this[_0x52cfca(0xab0) + _0x52cfca(0x958)][_0x52cfca(0x33d)](_0x277b92), this[_0x52cfca(0x6fa)][_0x52cfca(0x9b3)](_0x277b92), this[_0x52cfca(0x34b) + 'acterShado' + 'w'](_0x277b92), this['createLabe' + _0x52cfca(0x2df) + 'Target'](_0x582c15), _0x277b92[_0x52cfca(0x316)](); }, Spriteset_Map[_0x2542b2(0x336)][_0x2542b2(0x8a0) + _0x2542b2(0x655)] = function () { const _0x370327 = _0x2542b2; if (!this['_labelWind' + _0x370327(0x96b)]) return; for (const _0x1c0204 of this[_0x370327(0x807) + _0x370327(0x96b)]) { _0x1c0204 && (_0x1c0204[_0x370327(0x60a) + _0x370327(0x5bc)] = undefined, _0x1c0204[_0x370327(0x4db)]()); } }, Spriteset_Map['prototype'][_0x2542b2(0x76f) + _0x2542b2(0xb06) + _0x2542b2(0x46f) + 'up'] = function (_0x121126, _0x3d677e) { const _0x5f30de = _0x2542b2; if (!_0x121126) return; _0x3d677e[_0x5f30de(0x9c9) + _0x5f30de(0x831)] = { 'x': _0x121126['x'], 'y': _0x121126['y'] }, this[_0x5f30de(0x76f) + _0x5f30de(0xb06) + 'TileMessag' + _0x5f30de(0x445)](_0x3d677e); }, Spriteset_Map[_0x2542b2(0x336)]['createEven' + _0x2542b2(0xb06) + 'TileMessag' + _0x2542b2(0x445)] = function (_0x96b07c) { const _0x43f9c5 = _0x2542b2; if (!this[_0x43f9c5(0x6fa)]) return; const _0x32e434 = new Sprite_VisuMz_MessagePopup(_0x96b07c); this[_0x43f9c5(0x6fa)][_0x43f9c5(0x9b3)](_0x32e434); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x7f7) + _0x2542b2(0xa89) + _0x2542b2(0x5a7)] = Game_Message[_0x2542b2(0x336)][_0x2542b2(0x3ce) + _0x2542b2(0xa92)], Game_Message[_0x2542b2(0x336)][_0x2542b2(0x3ce) + _0x2542b2(0xa92)] = function (_0x5065da, _0x1ea9e0) { const _0x1de4e9 = _0x2542b2; this['_selfTarge' + 'tNumberInp' + 'ut'] = $gameTemp[_0x1de4e9(0x345) + 'get'](), VisuMZ[_0x1de4e9(0x6af) + 'Core'][_0x1de4e9(0x7f7) + 'ge_setNumb' + _0x1de4e9(0x5a7)][_0x1de4e9(0x325)](this, _0x5065da, _0x1ea9e0); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x23a) + _0x2542b2(0x416) + _0x2542b2(0x7e5)] = Window_NumberInput['prototype'][_0x2542b2(0x357)], Window_NumberInput['prototype']['start'] = function () { const _0x50bc1b = _0x2542b2; $gameTemp[_0x50bc1b(0x3df) + _0x50bc1b(0xb57)]($gameMessage[_0x50bc1b(0x68c) + _0x50bc1b(0x1fc) + 'ut']), VisuMZ['EventsMove' + _0x50bc1b(0x53e)][_0x50bc1b(0x23a) + _0x50bc1b(0x416) + _0x50bc1b(0x7e5)][_0x50bc1b(0x325)](this), $gameTemp[_0x50bc1b(0x73e) + _0x50bc1b(0x4b2)](); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x23a) + _0x2542b2(0x300) + _0x2542b2(0xa6a)] = Window_NumberInput['prototype']['processOk'], Window_NumberInput[_0x2542b2(0x336)]['processOk'] = function () { const _0x18b57c = _0x2542b2; $gameTemp['registerSe' + _0x18b57c(0xb57)]($gameMessage['_selfTarge' + _0x18b57c(0x1fc) + 'ut']), VisuMZ[_0x18b57c(0x6af) + _0x18b57c(0x53e)][_0x18b57c(0x23a) + _0x18b57c(0x300) + _0x18b57c(0xa6a)][_0x18b57c(0x325)](this), $gameTemp[_0x18b57c(0x73e) + 'arget'](), $gameMessage[_0x18b57c(0x68c) + _0x18b57c(0x1fc) + 'ut'] = undefined; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)]['Game_Messa' + 'ge_setItem' + _0x2542b2(0x203)] = Game_Message[_0x2542b2(0x336)][_0x2542b2(0x86c) + 'ice'], Game_Message[_0x2542b2(0x336)][_0x2542b2(0x86c) + 'ice'] = function (_0x2ec80d, _0x4f36cc) { const _0x55bee9 = _0x2542b2; this[_0x55bee9(0x68c) + _0x55bee9(0x1ec) + 'e'] = $gameTemp[_0x55bee9(0x345) + _0x55bee9(0xac6)](), VisuMZ['EventsMove' + _0x55bee9(0x53e)]['Game_Messa' + _0x55bee9(0xab7) + _0x55bee9(0x203)][_0x55bee9(0x325)](this, _0x2ec80d, _0x4f36cc); }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x32f) + _0x2542b2(0x253) + 'k'] = Window_EventItem[_0x2542b2(0x336)][_0x2542b2(0x56e)], Window_EventItem['prototype'][_0x2542b2(0x56e)] = function () { const _0x46df74 = _0x2542b2; $gameTemp[_0x46df74(0x3df) + _0x46df74(0xb57)]($gameMessage[_0x46df74(0x68c) + _0x46df74(0x1ec) + 'e']), VisuMZ[_0x46df74(0x6af) + 'Core'][_0x46df74(0x32f) + _0x46df74(0x253) + 'k'][_0x46df74(0x325)](this), $gameTemp[_0x46df74(0x73e) + 'arget'](), $gameMessage[_0x46df74(0x68c) + _0x46df74(0x1ec) + 'e'] = undefined; }, VisuMZ['EventsMove' + _0x2542b2(0x53e)][_0x2542b2(0x32f) + 'ntItem_onC' + _0x2542b2(0x1d4)] = Window_EventItem[_0x2542b2(0x336)][_0x2542b2(0x8f1)], Window_EventItem[_0x2542b2(0x336)][_0x2542b2(0x8f1)] = function () { const _0x8bf06e = _0x2542b2; $gameTemp[_0x8bf06e(0x3df) + _0x8bf06e(0xb57)]($gameMessage[_0x8bf06e(0x68c) + 'tItemChoic' + 'e']), VisuMZ[_0x8bf06e(0x6af) + _0x8bf06e(0x53e)][_0x8bf06e(0x32f) + _0x8bf06e(0xb59) + _0x8bf06e(0x1d4)][_0x8bf06e(0x325)](this), $gameTemp[_0x8bf06e(0x73e) + 'arget'](), $gameMessage[_0x8bf06e(0x68c) + 'tItemChoic' + 'e'] = undefined; }, VisuMZ[_0x2542b2(0x6af) + _0x2542b2(0x53e)][_0x2542b2(0x4c8) + _0x2542b2(0xb5f) + _0x2542b2(0x350)] = Window_Message['prototype'][_0x2542b2(0x282) + 'ge'], Window_Message[_0x2542b2(0x336)][_0x2542b2(0x282) + 'ge'] = function () { const _0x3a8f5c = _0x2542b2; $gameMessage[_0x3a8f5c(0x3df) + 'lfEvent'](), VisuMZ[_0x3a8f5c(0x6af) + 'Core'][_0x3a8f5c(0x4c8) + 'sage_start' + _0x3a8f5c(0x350)][_0x3a8f5c(0x325)](this), $gameTemp[_0x3a8f5c(0x73e) + _0x3a8f5c(0x4b2)](); }, VisuMZ[_0x2542b2(0x6af) + 'Core'][_0x2542b2(0x9b2) + _0x2542b2(0x76d) + _0x2542b2(0x7dc)] = Window_ScrollText[_0x2542b2(0x336)]['startMessa' + 'ge'], Window_ScrollText[_0x2542b2(0x336)][_0x2542b2(0x282) + 'ge'] = function () { const _0x45e033 = _0x2542b2; $gameMessage[_0x45e033(0x3df) + _0x45e033(0xa8e)](), VisuMZ[_0x45e033(0x6af) + _0x45e033(0x53e)][_0x45e033(0x9b2) + _0x45e033(0x76d) + _0x45e033(0x7dc)][_0x45e033(0x325)](this), $gameTemp[_0x45e033(0x73e) + _0x45e033(0x4b2)](); }; function Window_EventLabel() { const _0x53a747 = _0x2542b2; this[_0x53a747(0x9f5)](...arguments); } Window_EventLabel['prototype'] = Object['create'](Window_Base[_0x2542b2(0x336)]), Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x6dc) + 'r'] = Window_EventLabel, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x9f5)] = function (_0x15397c) { const _0x382fc2 = _0x2542b2, _0x31c73b = { 'DxRZq': function (_0x30f681, _0x22a9b1) { return _0x30f681 / _0x22a9b1; } }; this[_0x382fc2(0xab5)] = _0x15397c; const _0x175f67 = new Rectangle(0x3 * 0xc14 + -0x8b0 + 0x29 * -0xac, -0x1 * 0x1d3f + 0x3e1 * 0xa + -0x98b, _0x31c73b[_0x382fc2(0x781)](Graphics[_0x382fc2(0x9ab)], 0x1947 + 0xb14 + -0x15 * 0x1bb), this[_0x382fc2(0xa8f) + 'ght'](0x241e + -0x2639 + 0x21c)); this[_0x382fc2(0x452) + 's'](), Window_Base[_0x382fc2(0x336)][_0x382fc2(0x9f5)][_0x382fc2(0x325)](this, _0x175f67), this[_0x382fc2(0x83d) + _0x382fc2(0x33a)] = -0x56 * 0x68 + -0x23bb + 0x46ab, this[_0x382fc2(0x67c) + 'undType'](-0x1 * -0x996 + 0x144a + -0x1dde), this[_0x382fc2(0x5d2)] = ''; }, Window_EventLabel['prototype'][_0x2542b2(0x452) + 's'] = function () { const _0x57000e = _0x2542b2, _0x5b2982 = { 'bAMdx': _0x57000e(0x721) + _0x57000e(0xb1f) + _0x57000e(0x70a) }, _0x5474c1 = _0x5b2982[_0x57000e(0x6c9)][_0x57000e(0x968)]('|'); let _0x22bd2e = -0x1afd + -0x20a6 + 0x2d7 * 0x15; while (!![]) { switch (_0x5474c1[_0x22bd2e++]) { case '0': this['_visiblePl' + _0x57000e(0x5b4)] = $gamePlayer['y']; continue; case '1': this[_0x57000e(0x1e7) + _0x57000e(0x1f9)] = this[_0x57000e(0xab5)]['x']; continue; case '2': this[_0x57000e(0x60a) + _0x57000e(0x5bc)] = $gamePlayer['x']; continue; case '3': this[_0x57000e(0x664) + _0x57000e(0xb27)] = this['_event'][_0x57000e(0x807) + 'ow'][_0x57000e(0x9b5)]; continue; case '4': this['_cacheSyst' + _0x57000e(0x790)] = $gameSystem[_0x57000e(0x79d) + _0x57000e(0x9dc)](); continue; case '5': this[_0x57000e(0x664) + _0x57000e(0x3a9)] = this['_event'][_0x57000e(0x807) + 'ow'][_0x57000e(0xb51)]; continue; case '6': this['_eventEras' + 'ed'] = ![]; continue; case '7': this[_0x57000e(0x1e7) + _0x57000e(0xb2a)] = this[_0x57000e(0xab5)]['y']; continue; case '8': this['_cacheVisi' + _0x57000e(0x4ed)] = this[_0x57000e(0x51c) + 'ible'](); continue; case '9': this[_0x57000e(0x730) + _0x57000e(0x607)] = this['_event'][_0x57000e(0x4df)](); continue; case '10': this[_0x57000e(0x730) + 'enX'] = this[_0x57000e(0xab5)]['screenX'](); continue; case '11': this[_0x57000e(0x45b) + _0x57000e(0x383)] = this[_0x57000e(0xab5)][_0x57000e(0x33b)]; continue; case '12': this[_0x57000e(0x747) + _0x57000e(0x6d2)] = $gameScreen[_0x57000e(0x742)](); continue; }break; } }, Window_EventLabel['prototype'][_0x2542b2(0x316)] = function () { const _0x3410f8 = _0x2542b2, _0x44ddf9 = { 'IWDkW': _0x3410f8(0x572) + '1' }, _0x5e2d1c = _0x44ddf9['IWDkW']['split']('|'); let _0x12f911 = -0x24b6 + -0x116d * -0x1 + 0x1349; while (!![]) { switch (_0x5e2d1c[_0x12f911++]) { case '0': if (!this[_0x3410f8(0x3d6) + 'e']()) return; continue; case '1': this[_0x3410f8(0x2e9) + _0x3410f8(0x71f)](); continue; case '2': Window_Base['prototype']['update'][_0x3410f8(0x325)](this); continue; case '3': this[_0x3410f8(0x6a0) + 'e'](); continue; case '4': this[_0x3410f8(0x341) + _0x3410f8(0x388)](); continue; case '5': this['updateText'](); continue; }break; } }, Window_EventLabel[_0x2542b2(0x336)]['needsUpdat' + 'e'] = function () { const _0x410d62 = _0x2542b2, _0x151ad5 = { 'ylECa': _0x410d62(0x378) + '7|15|10|18' + '|17|11|0|5' + _0x410d62(0x37a) + _0x410d62(0xa53), 'RMMMA': function (_0x373890, _0x411960) { return _0x373890 !== _0x411960; }, 'atpOK': function (_0x554ee3, _0x29e20b) { return _0x554ee3 !== _0x29e20b; }, 'suRUM': function (_0x1103ed, _0x1f2d18) { return _0x1103ed < _0x1f2d18; }, 'spssD': function (_0x4ac953, _0x24432b) { return _0x4ac953 !== _0x24432b; }, 'uqqTg': function (_0x16a498, _0x1bab59) { return _0x16a498 > _0x1bab59; }, 'DVJku': function (_0x4dfc96, _0x1357d9) { return _0x4dfc96 === _0x1357d9; }, 'kEOqc': function (_0x3bb9a8, _0x415520) { return _0x3bb9a8 !== _0x415520; }, 'RGvSU': function (_0x5a147e, _0x53aff0) { return _0x5a147e !== _0x53aff0; }, 'WbIAm': function (_0x50aa0d, _0x34c995) { return _0x50aa0d > _0x34c995; }, 'UadWi': function (_0x3a92e9, _0xbf79ef) { return _0x3a92e9 !== _0xbf79ef; } }, _0x1332c5 = _0x151ad5[_0x410d62(0x3a5)][_0x410d62(0x968)]('|'); let _0x3df4f7 = -0x797 * -0x1 + 0x1157 * 0x1 + -0x2 * 0xc77; while (!![]) { switch (_0x1332c5[_0x3df4f7++]) { case '0': if (_0x151ad5[_0x410d62(0x48d)](this[_0x410d62(0x60a) + _0x410d62(0x5bc)], $gamePlayer['x'])) return !![]; continue; case '1': return ![]; case '2': if (_0x151ad5[_0x410d62(0x48d)](this[_0x410d62(0x45b) + 'Index'], this['_event'][_0x410d62(0x33b)])) return !![]; continue; case '3': if (_0x151ad5[_0x410d62(0x99c)](this[_0x410d62(0x288) + _0x410d62(0x790)], $gameSystem[_0x410d62(0x79d) + _0x410d62(0x9dc)]())) return !![]; continue; case '4': if (this[_0x410d62(0x702) + _0x410d62(0x4ed)] && _0x151ad5[_0x410d62(0x9a0)](this[_0x410d62(0x83d) + _0x410d62(0x33a)], -0x92f * 0x3 + -0x613 * 0x5 + -0x1 * -0x3aeb)) return !![]; continue; case '5': if (_0x151ad5[_0x410d62(0x6de)](this[_0x410d62(0x60a) + 'ayerY'], $gamePlayer['y'])) return !![]; continue; case '6': if (_0x151ad5['uqqTg'](SceneManager[_0x410d62(0x40e)][_0x410d62(0x39b) + _0x410d62(0x2ac) + _0x410d62(0x388)], -0xb17 + -0x1aa * -0x1 + 0x96d)) return !![]; continue; case '7': if (_0x151ad5[_0x410d62(0x879)](this[_0x410d62(0xab5)]['_labelWind' + 'ow'][_0x410d62(0x2de)], '')) return ![]; continue; case '8': if (_0x151ad5['spssD'](this[_0x410d62(0x1e7) + 'entX'], this[_0x410d62(0xab5)]['x'])) return !![]; continue; case '9': if (this[_0x410d62(0xab5)][_0x410d62(0x4e2)] && !this[_0x410d62(0xa2a) + 'ed']) return !![]; continue; case '10': if (_0x151ad5[_0x410d62(0x99c)](this[_0x410d62(0x730) + _0x410d62(0x40f)], this[_0x410d62(0xab5)][_0x410d62(0x356)]())) return !![]; continue; case '11': if (_0x151ad5['kEOqc'](this[_0x410d62(0x664) + 'lOffsetY'], this[_0x410d62(0xab5)][_0x410d62(0x807) + 'ow']['offsetY'])) return !![]; continue; case '12': if (_0x151ad5[_0x410d62(0x63d)](this['_visibleEv' + _0x410d62(0xb2a)], this[_0x410d62(0xab5)]['y'])) return !![]; continue; case '13': if (!this['_event'][_0x410d62(0x807) + 'ow']) return ![]; continue; case '14': if (!this['_cacheVisi' + _0x410d62(0x4ed)] && _0x151ad5[_0x410d62(0x659)](this[_0x410d62(0x83d) + _0x410d62(0x33a)], -0x16bd * 0x1 + -0x2 * -0x128c + -0xe5b)) return !![]; continue; case '15': if (_0x151ad5[_0x410d62(0x48d)](this[_0x410d62(0x747) + _0x410d62(0x6d2)], $gameScreen[_0x410d62(0x742)]())) return !![]; continue; case '16': if (!this['_event']) return ![]; continue; case '17': if (_0x151ad5['kEOqc'](this[_0x410d62(0x664) + _0x410d62(0xb27)], this[_0x410d62(0xab5)]['_labelWind' + 'ow'][_0x410d62(0x9b5)])) return !![]; continue; case '18': if (_0x151ad5[_0x410d62(0xaa5)](this[_0x410d62(0x730) + 'enY'], this[_0x410d62(0xab5)][_0x410d62(0x4df)]())) return !![]; continue; }break; } }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x7ba)] = function () { const _0x69d4f9 = _0x2542b2, _0x1a06fb = { 'mCHQs': function (_0x534f7c, _0x363fa1) { return _0x534f7c !== _0x363fa1; } }; _0x1a06fb[_0x69d4f9(0x96e)](this['_event'][_0x69d4f9(0x735) + _0x69d4f9(0x43c)](), this['_text']) && (this['_text'] = this['_event'][_0x69d4f9(0x735) + _0x69d4f9(0x43c)](), this[_0x69d4f9(0x4db)]()); }, Window_EventLabel['prototype'][_0x2542b2(0x6a0) + 'e'] = function () { const _0xe89b8e = _0x2542b2, _0x296860 = { 'LDUCq': function (_0x4af549, _0x2d1180) { return _0x4af549 / _0x2d1180; }, 'oYtai': function (_0x553cf6, _0x52d13a) { return _0x553cf6 / _0x52d13a; } }; this[_0xe89b8e(0x7c9)]['x'] = _0x296860[_0xe89b8e(0x9d6)](-0xe * 0x14b + -0x540 + -0x3 * -0x7c9, $gameScreen[_0xe89b8e(0x742)]()), this[_0xe89b8e(0x7c9)]['y'] = _0x296860['oYtai'](-0x16 * -0x151 + 0x7 * 0x1df + -0x2a0e, $gameScreen[_0xe89b8e(0x742)]()), this[_0xe89b8e(0x747) + _0xe89b8e(0x6d2)] = $gameScreen['zoomScale'](); }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x341) + 'tion'] = function () { const _0x580304 = _0x2542b2, _0x12bdd5 = { 'TvpZv': function (_0x8afa61, _0x348ecf) { return _0x8afa61 - _0x348ecf; }, 'HCMCq': function (_0x43e5b7, _0xc43134) { return _0x43e5b7 / _0xc43134; }, 'AuxcQ': function (_0x5b6586, _0x539f46) { return _0x5b6586 * _0x539f46; }, 'lZFss': function (_0x231f23, _0x27e11a) { return _0x231f23 - _0x27e11a; }, 'ioxFH': function (_0x52f05a, _0xbe49ed) { return _0x52f05a * _0xbe49ed; } }; if (!SceneManager[_0x580304(0x40e)]) return; if (!SceneManager[_0x580304(0x40e)][_0x580304(0x541)]) return; const _0x47261f = SceneManager['_scene'][_0x580304(0x541)][_0x580304(0x4e9) + _0x580304(0x604)](this['_event']); if (!_0x47261f) return; this['x'] = Math[_0x580304(0x3c7)](_0x12bdd5['TvpZv'](this[_0x580304(0xab5)]['screenX'](), Math[_0x580304(0xa9d)](_0x12bdd5[_0x580304(0x65f)](_0x12bdd5['AuxcQ'](this[_0x580304(0x4ff)], this[_0x580304(0x7c9)]['x']), -0x2099 * 0x1 + -0x7 * 0x55 + -0x1 * -0x22ee)))), this['x'] += this['_event'][_0x580304(0x807) + 'ow'][_0x580304(0x9b5)], this['y'] = _0x12bdd5['lZFss'](this['_event'][_0x580304(0x4df)](), _0x47261f[_0x580304(0x842)]), this['y'] += Math[_0x580304(0x3c7)](_0x12bdd5[_0x580304(0x22d)]($gameSystem[_0x580304(0x81e) + _0x580304(0xa88)](), 0x1 * 0x1143 + 0x155a * -0x1 + -0x417 * -0x1 + 0.5)), this['y'] -= Math[_0x580304(0x3c7)](_0x12bdd5[_0x580304(0xa36)](this[_0x580304(0x842)], this[_0x580304(0x7c9)]['y'])), this['y'] += this[_0x580304(0xab5)][_0x580304(0x807) + 'ow']['offsetY'], this['_eventEras' + 'ed'] = this[_0x580304(0xab5)]['_erased'], this[_0x580304(0x730) + _0x580304(0x40f)] = this[_0x580304(0xab5)][_0x580304(0x356)](), this[_0x580304(0x730) + 'enY'] = this[_0x580304(0xab5)][_0x580304(0x4df)](), this[_0x580304(0x664) + _0x580304(0xb27)] = this[_0x580304(0xab5)]['_labelWind' + 'ow'][_0x580304(0x9b5)], this['_eventLabe' + _0x580304(0x3a9)] = this['_event'][_0x580304(0x807) + 'ow'][_0x580304(0xb51)], this[_0x580304(0x45b) + _0x580304(0x383)] = this[_0x580304(0xab5)][_0x580304(0x33b)], this[_0x580304(0xa2a) + 'ed'] && (this[_0x580304(0x83d) + _0x580304(0x33a)] = 0x3ce * 0x4 + -0x189c + 0x964); }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x2e9) + _0x2542b2(0x71f)] = function () { const _0x55b0d1 = _0x2542b2, _0x332ac4 = { 'ZaLvq': function (_0x1cf0ea, _0x51f1b9) { return _0x1cf0ea > _0x51f1b9; } }; if (this[_0x55b0d1(0x51c) + 'ible']()) this[_0x55b0d1(0x83d) + _0x55b0d1(0x33a)] += this[_0x55b0d1(0x69c) + 'ed'](); else _0x332ac4[_0x55b0d1(0x254)](SceneManager[_0x55b0d1(0x40e)][_0x55b0d1(0x39b) + _0x55b0d1(0x2ac) + _0x55b0d1(0x388)], 0x17c + 0x1dfa + -0x1f76) ? this[_0x55b0d1(0x83d) + _0x55b0d1(0x33a)] = -0x81f + 0x1 * -0xcaa + 0x14c9 : this[_0x55b0d1(0x83d) + _0x55b0d1(0x33a)] -= this[_0x55b0d1(0x69c) + 'ed'](); }, Window_EventLabel['prototype']['isLabelVis' + _0x2542b2(0x9f6)] = function () { const _0x58cc9d = _0x2542b2, _0x576814 = { 'PcnEb': function (_0x4d7988, _0x26ee02) { return _0x4d7988 > _0x26ee02; }, 'sEIQw': function (_0xfc38dd, _0x15d427) { return _0xfc38dd === _0x15d427; }, 'WXTQM': function (_0x43e7ba, _0x2ade43) { return _0x43e7ba === _0x2ade43; }, 'nkLfr': function (_0x20d4f0, _0x406d48) { return _0x20d4f0 === _0x406d48; }, 'ErFFT': function (_0x1499a4, _0x45cf02) { return _0x1499a4 > _0x45cf02; } }; if (!$gameSystem[_0x58cc9d(0x79d) + _0x58cc9d(0x9dc)]()) return ![]; if (this[_0x58cc9d(0xab5)]?.[_0x58cc9d(0x4e2)]) return ![]; if (_0x576814[_0x58cc9d(0x389)](SceneManager[_0x58cc9d(0x40e)][_0x58cc9d(0x39b) + _0x58cc9d(0x2ac) + _0x58cc9d(0x388)], 0x102d + -0xe03 * -0x2 + 0x49 * -0x9b)) return ![]; const _0x515e2b = $gamePlayer['x'], _0x389baa = $gamePlayer['y'], _0x1e74cc = this['_event']['x'], _0x2fc845 = this[_0x58cc9d(0xab5)]['y']; if (_0x576814[_0x58cc9d(0xad9)](this[_0x58cc9d(0x60a) + _0x58cc9d(0x5bc)], _0x515e2b) && _0x576814[_0x58cc9d(0x354)](this[_0x58cc9d(0x60a) + 'ayerY'], _0x389baa) && _0x576814[_0x58cc9d(0x9e1)](this[_0x58cc9d(0x1e7) + 'entX'], _0x1e74cc) && _0x576814[_0x58cc9d(0x354)](this['_visibleEv' + 'entY'], _0x2fc845)) return this[_0x58cc9d(0x702) + _0x58cc9d(0x4ed)]; this[_0x58cc9d(0x60a) + 'ayerX'] = $gamePlayer['x'], this['_visiblePl' + 'ayerY'] = $gamePlayer['y'], this[_0x58cc9d(0x1e7) + _0x58cc9d(0x1f9)] = this[_0x58cc9d(0xab5)]['x'], this[_0x58cc9d(0x1e7) + _0x58cc9d(0xb2a)] = this[_0x58cc9d(0xab5)]['y']; if (_0x576814[_0x58cc9d(0x355)]($gameMap[_0x58cc9d(0x5f2) + 'e'](_0x515e2b, _0x389baa, _0x1e74cc, _0x2fc845), this['_event'][_0x58cc9d(0x735) + _0x58cc9d(0x8eb)]())) return this[_0x58cc9d(0x702) + _0x58cc9d(0x4ed)] = ![], ![]; return this['_cacheVisi' + _0x58cc9d(0x4ed)] = !![], !![]; }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x69c) + 'ed'] = function () { const _0x25b1d1 = _0x2542b2; return VisuMZ[_0x25b1d1(0x6af) + _0x25b1d1(0x53e)][_0x25b1d1(0x2cc)]['Label'][_0x25b1d1(0x3bc) + 'ed']; }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x281) + 'ow'] = function () { const _0x355fc4 = _0x2542b2, _0x5ce398 = { 'DBtlz': function (_0x1d585f, _0x12623f) { return _0x1d585f + _0x12623f; }, 'glSgK': function (_0x3b3fe2, _0x575859) { return _0x3b3fe2 * _0x575859; } }, _0x36b32e = this[_0x355fc4(0xafa)](this[_0x355fc4(0x5d2)]); this['width'] = _0x5ce398[_0x355fc4(0x79e)](_0x36b32e['width'], _0x5ce398[_0x355fc4(0x67d)](_0x5ce398['DBtlz']($gameSystem[_0x355fc4(0x81e) + _0x355fc4(0xa88)](), this[_0x355fc4(0x89f) + 'g']()), -0xd6f + 0x3b * 0x16 + 0x85f)), this['height'] = _0x5ce398['DBtlz'](Math['max'](this[_0x355fc4(0x92e)](), _0x36b32e[_0x355fc4(0x842)]), _0x5ce398[_0x355fc4(0x67d)]($gameSystem[_0x355fc4(0x81e) + _0x355fc4(0xa88)](), -0x3a4 * 0x6 + 0x3a * -0x86 + -0x1 * -0x3436)), this[_0x355fc4(0x4d2) + _0x355fc4(0x865)](); }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x92e)] = function () { const _0x264711 = _0x2542b2; return VisuMZ[_0x264711(0x6af) + 'Core']['Settings'][_0x264711(0xa05)][_0x264711(0x6aa)]; }, Window_EventLabel[_0x2542b2(0x336)]['resetFontS' + _0x2542b2(0x991)] = function () { const _0x521028 = _0x2542b2; Window_Base[_0x521028(0x336)][_0x521028(0x2a6) + 'ettings'][_0x521028(0x325)](this), this['contents'][_0x521028(0x800)] = this['defaultFon' + _0x521028(0xb19)](); }, Window_EventLabel['prototype'][_0x2542b2(0xb2f) + 'tSize'] = function () { const _0x39022a = _0x2542b2; return VisuMZ[_0x39022a(0x6af) + 'Core'][_0x39022a(0x2cc)][_0x39022a(0xa05)][_0x39022a(0x36e)]; }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x4db)] = function () { const _0x2a16fa = _0x2542b2, _0x426750 = { 'RWVCd': function (_0xb0b12a, _0x5f32bf) { return _0xb0b12a / _0x5f32bf; }, 'KEgTy': function (_0x21e491, _0x1263d1) { return _0x21e491 - _0x1263d1; } }; this[_0x2a16fa(0x281) + 'ow'](), this[_0x2a16fa(0x602)][_0x2a16fa(0x9ad)](); const _0x5a8efe = this[_0x2a16fa(0x5d2)][_0x2a16fa(0x968)](/[\r\n]+/); let _0x147eef = -0x1da3 + -0x1a6c + 0x380f; for (const _0x3b9b2c of _0x5a8efe) { const _0x4b7aba = this[_0x2a16fa(0xafa)](_0x3b9b2c), _0x52cf89 = Math[_0x2a16fa(0xa9d)](_0x426750[_0x2a16fa(0x9f3)](_0x426750['KEgTy'](this[_0x2a16fa(0x3b0)], _0x4b7aba[_0x2a16fa(0x4ff)]), 0x22e4 + -0x1140 + -0x3d * 0x4a)); this[_0x2a16fa(0xb4f)](_0x3b9b2c, _0x52cf89, _0x147eef), _0x147eef += _0x4b7aba['height']; } }, Window_EventLabel[_0x2542b2(0x336)]['processDra' + _0x2542b2(0x5d8)] = function (_0x2e49ac, _0x5173a3) { const _0x545c16 = _0x2542b2, _0x2206dd = { 'KzKep': function (_0x18874f, _0x5ef2b9) { return _0x18874f + _0x5ef2b9; }, 'EuhQi': function (_0x5a0c68, _0x4cc636) { return _0x5a0c68 + _0x4cc636; } }; _0x5173a3[_0x545c16(0x364)] && this['drawIcon'](_0x2e49ac, _0x2206dd[_0x545c16(0x892)](_0x5173a3['x'], -0x190 + -0xb84 * -0x2 + -0x1576), _0x5173a3['y']), _0x5173a3['x'] += _0x2206dd[_0x545c16(0x5a0)](Math[_0x545c16(0x762)](this[_0x545c16(0xb37)](), ImageManager[_0x545c16(0x531)]), -0x8d * 0x20 + 0x18d * 0x11 + -0x8b9); }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0x5bb)] = function (_0xbc9390, _0x4ed01d, _0x1268ef) { const _0x5fc0bc = _0x2542b2, _0x21752d = { 'tzAPY': _0x5fc0bc(0x9e6), 'xhgiX': function (_0x58bd61, _0x502787) { return _0x58bd61 * _0x502787; }, 'TNVWt': function (_0x56f2a4, _0x1bc978) { return _0x56f2a4 % _0x1bc978; }, 'ICcYh': function (_0x2d6c91, _0xb3da61) { return _0x2d6c91 / _0xb3da61; } }, _0x81e1ec = ImageManager[_0x5fc0bc(0x66b)](_0x21752d[_0x5fc0bc(0x310)]), _0x5e2fff = ImageManager[_0x5fc0bc(0x531)], _0xaa83a3 = ImageManager[_0x5fc0bc(0x8bd)], _0x364991 = _0x21752d[_0x5fc0bc(0x8c0)](_0x21752d[_0x5fc0bc(0x6d5)](_0xbc9390, 0x22c6 + 0x15c5 + -0x387b), _0x5e2fff), _0x4332e5 = _0x21752d[_0x5fc0bc(0x8c0)](Math[_0x5fc0bc(0xa9d)](_0x21752d['ICcYh'](_0xbc9390, 0x66a + 0x1 * 0x1b13 + 0x1 * -0x216d)), _0xaa83a3), _0x53d361 = Math[_0x5fc0bc(0x762)](this[_0x5fc0bc(0xb37)]()), _0x41b002 = Math[_0x5fc0bc(0x762)](this[_0x5fc0bc(0xb37)]()); this['contents'][_0x5fc0bc(0x755)](_0x81e1ec, _0x364991, _0x4332e5, _0x5e2fff, _0xaa83a3, _0x4ed01d, _0x1268ef, _0x53d361, _0x41b002); }, Window_EventLabel[_0x2542b2(0x336)][_0x2542b2(0xb37)] = function () { const _0xe45f76 = _0x2542b2; return VisuMZ[_0xe45f76(0x6af) + _0xe45f76(0x53e)][_0xe45f76(0x2cc)][_0xe45f76(0xa05)][_0xe45f76(0x592)]; };