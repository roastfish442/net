//=============================================================================
// VisuStella MZ - Elements & Status Menu Core
// VisuMZ_1_ElementStatusCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ElementStatusCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ElementStatusCore = VisuMZ.ElementStatusCore || {};
VisuMZ.ElementStatusCore.version = 1.24;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.24] [ElementStatusCore]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Elements_and_Status_Menu_Core_VisuStella_MZ
* @orderAfter VisuMZ_0_CoreEngine
*
* @help
* ============================================================================
* 介绍
* ============================================================================
*
* 元素与状态菜单核心插件为您提供更多控制游戏内元素率计算的选项，提供特征集以简化为角色和敌人分配元素，并更新状态菜单以正确显示所有信息。
*
* 其特性包括但不限于以下内容：
* 
* * 目标方和使用者方的元素率控制。
* * 添加了元素吸收和元素反射。
* * 分配物品和技能具有多个元素。
* * 元素率可以通过附加和乘法式注释标签进行调整。
* * 强制元素率和取消元素属性。
* * 特征集用于通过注释标签批量分配特征。
* * 特征集用于分配元素、亚元素、性别、种族、性质、阵营、祝福、诅咒、星座和变体。
* * 带有权重的随机特征集，使敌人更具动态性。
* * 通过插件命令在游戏中途更改特征的能力。
* * 更新的状态菜单布局以显示所有这些新信息。
* * 控制状态菜单中的信息类别选项卡。
* * 通过插件命令在游戏中途更改角色传记。
*
* ============================================================================
* 要求
* ============================================================================
*
* 该插件适用于 RPG Maker MZ。不适用于其他版本的 RPG Maker。
*
* ------ Tier 1 ------
*
* 该插件是一个一级插件。请将其放置在插件管理器列表中较低层次值的其他插件下方（例如：0、1、2、3、4、5）。这样可以确保您的插件与 VisuStella MZ 库的其他部分兼容性最佳。
*
* ============================================================================
* 主要变更
* ============================================================================
*
* 该插件向 RPG Maker MZ 的功能添加了一些新的硬编码特性。以下是它们的列表。
*
* ---
*
* 元素伤害计算
*
* - 在 RPG Maker MZ 中，元素伤害计算方式非常特定：获取目标的元素抗性，然后将伤害应用于该率。此插件通过更多方式扩展了目标的元素伤害率，引入了攻击者的元素额外伤害。
*
* ---
*
* 多元素计算
*
* - 在 RPG Maker MZ 中，默认情况下，如果一个动作分配了多个元素，则取具有最高率的元素。该插件允许您决定如何处理：使用默认的最大率、最小率、乘法积、加法和、或所有元素率的平均值。
*
* ---
*
* ============================================================================
* 注释标签
* ============================================================================
*
* 以下是通过此插件添加的注释标签。如果未启用或未安装此插件，则这些注释标签将不起作用。
*
* === 与元素相关的注释标签 ===
*
* 以下是与元素相关的注释标签。
*
* ---
*
* <多元素: x>
* <多元素: x,x,x>
*
* <多元素: name>
* <多元素: name, name, name>
*
* - 用于：技能、物品注释标签
* - 在计算伤害时，使此动作拥有额外的元素（与伤害元素并存）。
* - 将“x”替换为数据库 > 类型中元素的ID。
* - 对于“name”变体的注释标签，请将“name”替换为元素的名称。在“name”替换中删除任何 \I[x]。
* - 可插入多个此类注释标签以允许单位分配更多元素。
*
* ---
*
* <多元素规则: 最大>
* <多元素规则: 最小>
* <多元素规则: 乘法>
* <多元素规则: 加法>
* <多元素规则: 平均>
*
* - 用于：技能、物品注释标签
* - 将此动作的多元素规则更改为“最大”、“最小”、“乘法”、“加法”或“平均”。
* - 如果未使用此注释标签，则参考插件参数设置的默认规则。
*
* ---
*
* <强制动作元素: 空>
*
* <强制动作元素: x>
* <强制动作元素: x,x,x>
*
* <强制动作元素: name>
* <强制动作元素: name, name, name>
*
* - 用于：角色、职业、武器、防具、敌人、状态注释标签
* - 强制此单位执行的任何动作具有特定的元素。
* - 将“x”替换为数据库 > 类型中元素的ID。
* - 对于“name”变体的注释标签，请将“name”替换为元素的名称。在“name”替换中删除任何 \I[x]。
* - 如果在各种数据库对象上找到了多个此类注释标签，则优先级将按照状态、角色、敌人、类、装备的顺序执行。
*
* ---
*
* <强制接收元素 id 率: x%>
* <强制接收元素 id 率: x.x>
*
* <强制接收元素 name 率: x%>
* <强制接收元素 name 率: x.x>
*
* - 用于：角色、职业、武器、防具、敌人、状态注释标签
* - 强制单位以 x 倍接收元素伤害。
* - 将“id”替换为元素的ID。
* - 对于“name”变体的注释标签，请将“name”替换为元素的名称。在“name”替换中删除任何 \I[x]。
* - 可插入多个此类注释标签以允许单位分配更多元素。

* ---
*
* <Received Element id Plus: +x%>
* <Received Element id Plus: +x.x>
*
* <Received Element name Plus: +x%>
* <Received Element name Plus: +x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage additively before applying rates and
*   flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
* - This does not add on flat bonus damages after calculating elemental rates.
*   This merely adds onto it at the end after applying rates if the formula
*   from above is unchanged.
*
* ---
*
* <Received Element id Rate: x%>
* <Received Element id Rate: x.x>
*
* <Received Element name Rate: x%>
* <Received Element name Rate: x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage multiplicatively after applying plus
*   and before applying flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
*
* ---
*
* <Received Element id Flat: +x%>
* <Received Element id Flat: +x.x>
*
* <Received Element name Flat: +x%>
* <Received Element name Flat: +x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage additively after applying rates and
*   plus bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
* - This does not add on flat bonus damages after calculating elemental rates.
*   This merely adds onto it at the end after applying rates if the formula
*   from above is unchanged.
*
* ---
*
* <Dealt Element id Plus: +x%>
* <Dealt Element id Plus: +x.x>
*
* <Dealt Element name Plus: +x%>
* <Dealt Element name Plus: +x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage additively before applying rates and
*   flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
* - This does not add on flat bonus damages after calculating elemental rates.
*   This merely adds onto it at the end after applying rates if the formula
*   from above is unchanged.
*
* ---
*
* <Dealt Element id Rate: x%>
* <Dealt Element id Rate: x.x>
*
* <Dealt Element name Rate: x%>
* <Dealt Element name Rate: x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage multiplicatively after applying plus and
*   before applying flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
*
* ---
*
* <Dealt Element id Flat: +x%>
* <Dealt Element id Flat: +x.x>
*
* <Dealt Element name Flat: +x%>
* <Dealt Element name Flat: +x.x>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage additively after applying rates and
*   plus bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to assign more elements.
* - Formula works as follows: (base + plus) * rate + flat
* - Formula may vary if changed up in the Plugin Parameters.
* - This does not add on flat bonus damages after calculating elemental rates.
*   This merely adds onto it at the end after applying rates if the formula
*   from above is unchanged.
*
* ---
*
* <Element Absorb: x>
* <Element Absorb: x,x,x>
*
* <Element Absorb: name>
* <Element Absorb: name, name, name>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Gives the unit the ability to absorb damage from element.
* - Replace 'x' with the ID of the element from Database > Types.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to absorb more elements.
* - Absorption is calculated after all other element rates have been made.
*
* ---
*
* <Element Reflect: x>
* <Element Reflect: x,x,x>
*
* <Element Reflect: name>
* <Element Reflect: name, name, name>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Gives the unit the ability to reflect damage from element.
* - Replace 'x' with the ID of the element from Database > Types.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to reflect more elements.
* - Reflection occurs before any damage is calculated and dealt.
* - Elemental Reflection will take priority over Magic Reflection.
*
* ---
*
* <Bypass Element Reflect>
*
* - Used for: Skill, Item Notetags
* - Makes this skill/item unable to be reflected by Element Reflect effect.
*
* ---
* 
* <Element Pierce: x>
* <Element Pierce: x,x,x>
* 
* <Element Pierce: name>
* <Element Pierce: name, name, name>
* 
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Gives the unit the ability to attack with the element and bypass any kinds
*   of damage immunities, reflections, and absorptions.
*   - Actions can still miss or be countered, however.
* - If an action has multiple elements, as long as one element has pierce, the
*   action will go through.
* - Replace 'x' with the ID of the element from Database > Types.
* - For 'name' notetag variant, replace 'name' with the element's name.
*   Remove any \I[x] in the 'name' replacement.
* - Insert multiples of this notetag to allow unit to reflect more elements.
* 
* ---
*
* <Element Pierce>
*
* - Used for: Skill, Item Notetags
* - Makes this skill/item bypass any kinds of damage immunities, reflections,
*   and absorptions.
*   - Action can still miss or be countered, however.
*
* ---
*
* === JavaScript Notetags: Element-Related ===
*
* The following are notetags made for users with JavaScript knowledge to
* determine dynamic element-related effects.
*
* ---
*
* <JS Force Received Element id Rate: code>
* <JS Force Received Element name Rate: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Forces the unit to receive elemental damage at a code-determined rate.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Received Element id Plus: code>
* <JS Received Element name Plus: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage additively before applying rates and
*   flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Received Element id Rate: code>
* <JS Received Element name Rate: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage additively after applying plus and
*   before applying flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Received Element id Flat: code>
* <JS Received Element name Flat: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the received elemental damage additively after applying rates and
*   plus bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Dealt Element id Plus: code>
* <JS Dealt Element name Plus: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage additively before applying rates and
*   flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Dealt Element id Rate: code>
* <JS Dealt Element name Rate: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage additively after applying plus and
*   before applying flat bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* <JS Dealt Element id Flat: code>
* <JS Dealt Element name Flat: code>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Alters the dealt elemental damage additively after applying rates and
*   plus bonuses.
* - Replace 'id' with the ID of the element.
* - For 'name' notetag variant, replace 'name' with the element's name.
* - Replace 'code' with JavaScript code to determine the change.
* - Insert multiples of this notetag to allow unit to assign more elements.
*
* ---
*
* === Trait Set Notetags ===
*
* Trait Sets are used to apply various properties to actor and enemy units as
* a whole depending on what the trait set is. Use the following notetags to
* determine how to properly assign the desired Trait Set.
*
* WARNING: Trait Sets only work if they are enabled in the Plugin Parameters:
* ElementStatusCore => General Trait Set Settings => Enable Trait Sets?
*
* ---
*
* <Element: name>
* <SubElement: name>
* <Gender: name>
* <Race: name>
* <Nature: name>
* <Alignment: name>
* <Blessing: name>
* <Curse: name>
* <Zodiac: name>
* <Variant: name>
*
* - Used for: Actor, Enemy Notetags
* - Determines the specific Trait Set(s) for the actor or enemy unit.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - If any of these notetags are unused, the Trait Set will default to the one
*   determined in the Plugin Parameters.
*
* Examples:
*
* <Element: Fire>
* <SubElement: Thunder>
* <Gender: Male>
* <Nature: Jolly>
* <Alignment: Chaotic Good>
* <Zodiac: Aries>
*
* ---
*
* <Trait Sets>
*  Element:    name
*  SubElement: name
*  Gender:     name
*  Race:       name
*  Nature:     name
*  Alignment:  name
*  Blessing:   name
*  Curse:      name
*  Zodiac:     name
*  Variant:    name
* </Trait Sets>
*
* - Used for: Actor, Enemy Notetags
* - Determines the Trait Set(s) for the actor or enemy unit.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - You may remove the Trait Set types (ie. Blessing and Curse) that you don't
*   want to assign anything to from the list.
* - If any of these sets are unused, the Trait Set will default to the one
*   determined in the Plugin Parameters.
*
* Example:
*
* <Trait Sets>
*  Element:    Fire
*  SubElement: Thunder
*  Gender:     Male
*  Nature:     Jolly
*  Alignment:  Chaotic Good
*  Zodiac:     Aries
* </Trait Sets>
*
* ---
*
* <Random type>
*  name: weight
*  name: weight
*  name: weight
* </Random type>
*
* - Used for: Actor, Enemy Notetags
* - Assigns a random Trait Set for this Trait Set 'type'.
* - Replace 'type' with 'Element', 'SubElement', 'Gender', 'Race', 'Nature',
*   'Alignment', 'Blessing', 'Curse', 'Zodiac', or 'Variant' depending on
*   which you're trying to randomize.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Replace 'weight' with a number value representing how often the 'name'
*   would come up. The higher the weight, the more often. You may omit this
*   and the colon(:) and just type in the 'name' instead.
* - This would bypass the innate settings determined in the Plugin Parameters.
*
* Examples:
*
* <Random Gender>
*  Male: 75
*  Female: 25
* </Random Gender>
* 
* <Random Variant>
*  Mighty: 10
*  Major: 20
*  Greater: 60
*  Normal: 200
*  Lesser: 10
*  Minor
*  Puny
* </Random Variant>
*
* ---
*
* <No Random Trait Sets>
*
* - Used for: Actor, Enemy Notetags
* - Prevents random Trait Sets from being assigned to this actor/enemy unit.
*
* ---
*
* <Trait Set Name Format>
*  text
* </Trait Set Name Format>
*
* - Used for: Enemy Notetags
* - Enemy names can be affected by the Trait Sets they have. Replace 'text'
*   with the format you wish to see them have.
* - Insert [Name] into 'text' to determine where the enemy's name goes.
* - Insert [Letter] into 'text' to determine where the enemy's letter goes.
* - Insert [Element] into 'text' to determine where the format text goes.
* - Insert [SubElement] into 'text' to determine where the format text goes.
* - Insert [Gender] into 'text' to determine where the format text goes.
* - Insert [Race] into 'text' to determine where the format text goes.
* - Insert [Nature] into 'text' to determine where the format text goes.
* - Insert [Alignment] into 'text' to determine where the format text goes.
* - Insert [Blessing] into 'text' to determine where the format text goes.
* - Insert [Curse] into 'text' to determine where the format text goes.
* - Insert [Zodiac] into 'text' to determine where the format text goes.
* - Insert [Variant] into 'text' to determine where the format text goes.
* 
* Example:
*
* <Trait Set Name Format>
*  [Alignment] [Nature] [Element] [Name][Gender] [Letter]
* </Trait Set Name Format>
*
* ---
*
* <traitname Battler Name: filename>
*
* <traitname Battler Names>
*  filename: weight
*  filename: weight
*  filename: weight
* </traitname Battler Names>
*
* - Used for: Enemy Notetags
* - Allows certain Trait Sets to cause battlers to have a unique appearance.
* - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
* - Replace 'filename' with the battler graphic to associate with that
* - Replace 'weight' with a number value representing how often the 'name'
*   would come up. The higher the weight, the more often. You may omit this
*   and the colon(:) and just type in the 'name' instead.
*   Trait Set.
*
* Examples:
*
* <Male Battler Name: Spider1>
* <Female Battler Name: Spider2>
*
* <Male Battler Names>
*  Rogue: 25
*  Fighter: 10
*  Warrior
* </Male Battler Names>
*
* ---
*
* <traitname Battler Hue: x>
*
* <traitname Battler Hues>
*  x: weight
*  x: weight
*  x: weight
* </traitname Battler Hues>
*
* - Used for: Enemy Notetags
* - Allows certain Trait Sets to cause battlers to use a different hue.
* - Replace 'traitname' with the name of the Trait Set (ie. Male, Female).
* - Replace 'x' with a number from 0 to 360 depicting the hue to become.
* - Replace 'weight' with a number value representing how often the 'name'
*   would come up. The higher the weight, the more often. You may omit this
*   and the colon(:) and just type in the 'name' instead.
*
* Examples:
*
* <Male Battler Hue: 160>
* <Female Battler Hue: 275>
*
* <Female Battler Hues>
*  275: 10
*  325: 5
*  345
* </Female Battler Hues>
*
* ---
* 
* <Equip Trait Requirement: name>
* <Equip Trait Requirement: name, name, name>
* 
* - Used for: Weapon, Armor Notetags
* - Makes this piece of equipment equippable by only actors with those traits.
* - If there are multiple traits required, all of them have to be met.
* - If multiple trait types share the same trait name, the listed name will
*   count for all of them.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Changing trait sets mid-game will remove unmatched traits.
* - Usage Example: <Equip Trait Requirement: Female> makes the item only
*   equippable by female actors as long as they are tagged as female.
* 
* ---
* 
* <Damage VS name Trait: x%>
* 
* - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
* - If used on a skill or item, the action will perform 'x%' damage versus any
*   targets with 'name' trait sets (any of them).
* - If present in an actor, class, weapon, armor, enemy, or state's notebox,
*   all damage types will be multiplied by 'x%' versus targets with 'name'
*   trait sets (any of them).
* - This notetag does not affect healing.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Replace 'x' with a number representing a percentage value to augment
*   damage by.
* - Use multiple notetags to affect multiple trait types. If multiple effects
*   manage to stack, they will stack multiplicatively.
* 
* ---
* 
* <Healing VS name Trait: x%>
* 
* - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
* - If used on a skill or item, the action will perform 'x%' heals versus any
*   targets with 'name' trait sets (any of them).
* - If present in an actor, class, weapon, armor, enemy, or state's notebox,
*   all heal types will be multiplied by 'x%' versus targets with 'name'
*   trait sets (any of them).
* - This notetag does not affect damage.
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Replace 'x' with a number representing a percentage value to augment
*   heals by.
* - Use multiple notetags to affect multiple trait types. If multiple effects
*   manage to stack, they will stack multiplicatively.
* 
* ---
* 
* <Accuracy VS name Trait: x%>
* <Accuracy VS name Trait: +x%>
* <Accuracy VS name Trait: -x%>
* 
* - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
* - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
*   accuracy against any targets with 'name' trait sets (any of them).
* - If present in an actor, class, weapon, armor, enemy, or state's notebox,
*   all actions will have 'x%', '+x%', or '-x%' accuracy against any targets
*   with 'name' trait sets (any of them).
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Replace 'x' respectively for percentile or additive/subtractive values.
*   - 'x%' means an action with an accuracy rate of 20% will be (20% * x%).
*   - '+x%' means an action with an accuracy rate of 20% will be (20% + x%).
*   - '-x%' means an action with an accuracy rate of 20% will be (20% - x%).
* - Multiple 'x%' notetags will stack multiplicatively.
* - Multiple '+x' and '-x' notetags will stack additively.
* 
* ---
* 
* <Critical VS name Trait: x%>
* <Critical VS name Trait: +x%>
* <Critical VS name Trait: -x%>
* 
* - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
* - If used on a skill or item, the action will have 'x%', '+x%', or '-x%'
*   crtical rate against any targets with 'name' trait sets (any of them).
* - If present in an actor, class, weapon, armor, enemy, or state's notebox,
*   all actions will have 'x%', '+x%', or '-x%' crtical rate against any
*   targets with 'name' trait sets (any of them).
* - Replace 'name' with the name of an associated Trait Set type found in the
*   Plugin Parameters.
* - Replace 'x' respectively for percentile or additive/subtractive values.
*   - 'x%' means an action with a critical rate of 20% will be (20% * x%).
*   - '+x%' means an action with a critical rate of 20% will be (20% + x%).
*   - '-x%' means an action with a critical rate of 20% will be (20% - x%).
* - Multiple 'x%' notetags will stack multiplicatively.
* - Multiple '+x' and '-x' notetags will stack additively.
* 
* ---
*
* === Actor Biography Notetag ===
*
* The following notetag is used for the Status Menu if the updated Status Menu
* Layout option has been enabled from the Plugin Parameters.
*
* ---
*
* <Biography>
*  text
*  text
*  text
* </Biography>
*
* - Used for: Actor Notetags
* - Determines the actor's biography shown in the Status Menu.
* - Replace 'text' with the text intended.
* - Text Codes are allowed.
* - The biography can be changed mid-game through Plugin Commands.
* - If this notetag isn't used, then the actor's profile message is displayed
*   as the biography.
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
* === Actor Plugin Commands ===
* 
* ---
*
* Actor: Change Biography (Group)
* Actor: Change Biography (Range)
* Actor: Change Biography (JS)
* - Changes the biography of the selected actor(s).
* - Each version has a different means of selecting Actor ID's.
* 
*   Step 1: Target ID
*   - Select which Actor ID(s) to affect.
*
*   Step 2: Biography
*   - Change the biography for target actor(s) to this.
*   - Text codes allowed. 
*   - %1 - Actor's name.
*
* ---
*
* Actor: Change Trait Sets (Group)
* Actor: Change Trait Sets (Range)
* Actor: Change Trait Sets (JS)
* - Changes the Trait Set(s) of the selected actor(s).
* - Each version has a different means of selecting Actor ID's.
*
*   Step 1: Target ID
*   - Select which Actor ID(s) to affect.
*
*   Step 2: Change Trait Set
*   - Element
*   - SubElement
*   - Gender
*   - Race
*   - Nature
*   - Alignment
*   - Blessing
*   - Curse
*   - Zodiac
*   - Variant
*     - Change to the name of the Trait Set to switch actor(s) to.
*     - "Unchanged" to leave alone.
*     - "Random" to randomize.
*       - Random will use the random pool dictated by the Plugin Parameters
*         and the Trait Set weights determined there as well.
*
* ---
* 
* === Enemy Plugin Commands ===
* 
* ---
*
* Enemy: Change Trait Sets (Group)
* Enemy: Change Trait Sets (Range)
* Enemy: Change Trait Sets (JS)
* - Changes the Trait Set(s) of the selected enemy(ies).
* - Each version has a different means of selecting Enemy Indexes.
*
*   Step 1: Target ID
*   - Select which Enemy Index(es) to affect.
*
*   Step 2: Change Trait Set
*   - Element
*   - SubElement
*   - Gender
*   - Race
*   - Nature
*   - Alignment
*   - Blessing
*   - Curse
*   - Zodiac
*   - Variant
*     - Change to the name of the Trait Set to switch target(s) to.
*     - "Unchanged" to leave alone.
*     - "Random" to randomize.
*       - Random will use the random pool dictated by the Plugin Parameters
*         and the Trait Set weights determined there as well.
*
* ---
*
* ============================================================================
* Script Calls
* ============================================================================
*
* The following are Script Calls that can be used with this plugin. These are
* made for JavaScript proficient users. We are not responsible if you use them
* incorrectly or for unintended usage.
*
* ---
* 
* === Trait Set-Related Script Calls ===
* 
* ---
*
* battler.hasTraitSet(typeName)
* 
* - Returns a 'true' or 'false' value if the battler has a specific trait set.
* - This will check all 10 trait set categories (elements, subelements,
*   gender, race, nature, alignment, blessing, curse, zodiac, variant) and if
*   any of them match, this will return 'true'. If not, returns 'false'.
* - 'battler' references a Game_Actor or Game_Enemy.
* - Replace 'typeName' with a string representing the trait set key name
*   (ie. 'male' or 'female' or 'goblin' or 'human').
* 
* Examples:
* 
*   $gameActors.actor(1).hasTraitSet('male')
*   $gameParty.leader().hasTraitSet('female')
*   $gameTroop.members()[0].hasTraitSet('goblin')
*
* ---
*
* ============================================================================
* Plugin Parameters: Element Rulings
* ============================================================================
*
* These Plugin Parameters control the rulings for Element-related mechanics.
* These play an important part in determine what to do when multiple elements
* are present, how to calculate the elemental rates, and 
*
* ---
*
* Rulings
* 
*   Multi-Element Ruling:
*   - Ruling on how to calculate element rate when there are  multiple
*     elements used for damage calculation.
*     - Maximum (largest rate of all elements)
*     - Minimum (smallest rate of all elements)
*     - Multiplicative (product of all elements used)
*     - Additive (sum of all elements used)
*     - Average (of all the elements used)
* 
*   JS: Maximum Rate:
*   - Determine how maximum element rate is calculated.
* 
*   JS: Minimum Rate:
*   - Determine how minimum element rate is calculated.
* 
*   JS: Multiply Rate:
*   - Determine how a multiplied element rate is calculated.
* 
*   JS: Additive Rate:
*   - Determine how an additive element rate is calculated.
* 
*   JS: Average Rate:
*   - Determine how an average element rate is calculated.
*
* ---
*
* Formulas
* 
*   JS: Received Rate:
*   - Determine how the element rate for the receiving target is calculated.
* 
*   JS: Finalize Rate:
*   - Determine how the finalized element rate before damage is calculated.
*
* ---
*
* ============================================================================
* Plugin Parameters: Status Menu Settings
* ============================================================================
*
* The Status Menu Settings determine how the Status Menu appears and the
* various objects that exist within it. The option to update it to a more
* updated menu also exists, too.
*
* ---
*
* General
* 
*   Use Updated Layout:
*   - Use the Updated Status Menu Layout provided by this plugin?
*   - This will override the Core Engine windows settings.
* 
*   Layout Style:
*   - If using an updated layout, how do you want to style the
*     menu scene layout?
*     - Upper Help, Top Category
*     - Upper Help, Bottom Category
*     - Lower Help, Top Category
*     - Lower Help, Bottom Category
* 
*   Trait Set Font Size:
*   - The font size used for Trait Set Descriptions.
* 
*   Show Back Rectangles?:
*   - Show back rectangles of darker colors to display information better?
* 
*     Back Rectangle Color:
*     - Use #rrggbb for custom colors or regular numbers for text colors
*       from the Window Skin.
*
* ---
*
* Category Window
* 
*   Style:
*   - How do you wish to draw commands in the Category Window?
*   - Text Only: Display only the text.
*   - Icon Only: Display only the icon.
*   - Icon + Text: Display the icon first, then the text.
*   - Auto: Determine which is better to use based on the size of the cell.
* 
*   Text Align:
*   - Text alignment for the Category Window.
*
* ---
*
* Displayed Parameters
* 
*   Column 1:
*   Column 2:
*   Column 3:
*   - A list of the parameters that will be displayed in column 1.
*   - Basic Parameters (ie. MaxHP, ATK, LUK)
*   - X Parameters (ie. HIT, EVA, CRI)
*   - S Parameters (ie. PDR, MDR, EXR)
*
* ---
*
* Elements
* 
*   Excluded Elements:
*   - These element ID's are excluded from the Status Menu list.
* 
*   IDs: Column 1:
*   IDs: Column 2:
*   - The list of element ID's to show in column 1/2.
*   - If neither column has ID's, list all elements.
*
* ---
*
* Vocabulary
* 
*   Biography:
*   - Vocabulary for 'Biography'.
* 
*   Damage: Absorb:
*   - Vocabulary for 'Damage: Absorb'.
* 
*   Damage: Received:
*   - Vocabulary for 'Damage: Received'.
* 
*   Damage: Dealt:
*   - Vocabulary for 'Damage: Dealt'.
* 
*   Skill Types:
*   - Vocabulary for 'Skill Types'.
* 
*   Weapon Types:
*   - Vocabulary for 'Weapon Types'.
* 
*   Armor Types:
*   - Vocabulary for 'Armor Types'.
*
* ---
*
* ============================================================================
* Plugin Parameters: Status Menu Categories
* ============================================================================
*
* These Plugin Parameters allow you, the game dev, to add new categories to
* the Status Menu as you please, and change up how the information is found
* and displayed within the Status Menu. This will only apply if the Updated
* Status Menu Layout is enabled.
*
* ---
*
* Category
* 
*   Symbol:
*   - Symbol used for this category.
* 
*   Icon:
*   - Icon used for this category.
*   - Use 0 for no icon.
* 
*   Text:
*   - Text name used for this category.
* 
*   JS: Draw Data:
*   - Code used to determine what appears in the data window.
*
* ---
*
* ============================================================================
* Plugin Parameters: General Trait Set Settings
* ============================================================================
*
* Trait Sets are new properties added to RPG Maker MZ through this plugin.
* They're used to streamline the process of applying traits to actors and
* enemies through the database.
*
* Instead of having to manually adjust the elemental rate of each enemy,
* you can now assign them to a Trait Set (through the Plugin Parameters) and
* then assign that Trait Set to an enemy or batch of enemies instead. This
* means that all enemies with <Element: Fire> would be weak and resistance to
* the same elements determined by the Elemental Fire Trait Set.
*
* These Plugin Parameters adjust how Trait Sets are handled on a general scale
* within your game.
*
* ---
*
* General
* 
*   Enable Trait Sets?:
*   - Enable Trait Sets? This must be enabled for Trait Sets to have any kind
*     of effect on battlers.
* 
*   Enemy Name Format:
*   - Enemy name format on how Trait Sets affect how enemy names appear.
*   - Choose from the list or customize it.
*     - [name] [letter]
*     - [element] [name] [letter]
*     - [element] [subelement] [name] [letter]
*     - [name][gender] [letter]
*     - [race] [name][gender] [letter]
*     - [alignment] [name][gender] [letter]
*     - [blessing] [name][gender] [letter]
*     - [curse] [name][gender] [letter]
*     - [name][gender]([zodiac]) [letter]
*     - [variant] [name][gender] [letter]
*     - [variant] [nature] [name][gender] [letter]
*     - [variant] [nature] [element] [name][gender] [letter]
*     - [alignment] [variant] [nature] [element] [name][gender] [letter]
*     - ...and more...
*
* ---
*
* Trait Columns
*
*   Column 1 Traits:
*   Column 2 Traits:
*   - List of the traits that appear in this column.
*   - Used by default in the Properties category.
*
* ---
*
* ============================================================================
* Plugin Parameters: Trait Set Types
* ============================================================================
*
* Trait Sets are new properties added to RPG Maker MZ through this plugin.
* They're used to streamline the process of applying traits to actors and
* enemies through the database.
*
* Instead of having to manually adjust the elemental rate of each enemy,
* you can now assign them to a Trait Set (through the Plugin Parameters) and
* then assign that Trait Set to an enemy or batch of enemies instead. This
* means that all enemies with <Element: Fire> would be weak and resistance to
* the same elements determined by the Elemental Fire Trait Set.
*
* There are 10 different types of Trait Set Types out there that you can
* assign to actors and enemies and they all work the same way, just under
* different categories.
*
* ---
*
* Element
* SubElement
* Gender
* Race
* Nature
* Alignment
* Blessing
* Curse
* Zodiac
* Variant
* 
*   Name:
*   - Name of this Trait Set. Also used as a reference key
* 
*   Display Text:
*   - How the Trait Set is displayed in game when selected.
*   - Text codes are allowed.
* 
*   Help Description:
*   - Help description for this Trait Set if required.
* 
*   Format Text:
*   - The text that's added onto an enemy's name if this Trait Set is used.
* 
*   Valid for Random?:
*   - Is this Trait Set valid for random selection?
* 
*   Random Weight:
*   - Default weight of this Trait Set if valid for random.
* 
*   Traits:
* 
*   Element Rates:
*   - The elemental damage rates received for this Trait Set.
*   - The modifiers are multiplicative.
* 
*   Basic Parameters:
*   - The basic parameter rates altered by this Trait set.
*   - The modifiers are multiplicative.
* 
*   X Parameters:
*   - The X parameter rates altered by this Trait set.
*   - The modifiers are additive.
* 
*   S Parameters:
*   - The S parameter rates altered by this Trait set.
*   - The modifiers are multiplicative.
* 
*   Passive States:
*   - Passive states that are applied to this Trait Set.
*   - Requires VisuMZ_1_SkillsStatesCore.
*   - Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
* 
*   Equipment:
* 
*   Weapon Types:
*   - Additional weapon types usable by this Trait Set.
* 
*   Armor Types:
*   - Additional armor types usable by this Trait Set.
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
* Version 1.24: May 16, 2024
* * Bug Fixes!
* ** Fixed a bug where if enemies transformed, their trait sets did not.
*    Fix made by Irina.
* 
* Version 1.23: November 16, 2023
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New notetags added by Arisu:
* *** <Damage vs name Trait: x%>
* *** <Healing vs name Trait: x%>
* *** <Accuracy VS name Trait: x%>
* *** <Critical VS name Trait: x%>
* **** New notetags that enhance actions and trait objects to augment damage,
*      healing, accuracy, and critical hit rates against targets with specific
*      trait sets.
* ** New script calls added by Arisu:
* *** battler.hasTraitSet(typeName)
* **** This will check all 10 trait set categories (elements, subelements,
*      gender, race, nature, alignment, blessing, curse, zodiac, variant) and
*      if any of them match, this will return 'true'. If not, returns 'false'.
* 
* Version 1.22: May 18, 2023
* * Bug Fixes!
* ** Fixed a bug that prevented "max" element rate rulings to disable element
*    absorption. Fix made by Arisu.
* 
* Version 1.21: March 16, 2023
* * Compatibility Update!
* ** Added compatibility functionality for future plugins.
* 
* Version 1.20: February 16, 2023
* * Compatibility Update!
* ** Added compatibility functionality for future plugins.
* 
* Version 1.19: January 20, 2023
* * Documentation Update!
* ** Help file updated for new features.
* * New Notetags added by Olivia and sponsored by Anon:
* ** Trait Object Notetag: <Element Pierce: x,x,x>
* *** Gives the unit the ability to attack with the element and bypass any
*     kinds of damage immunities, reflections, and absorptions. Actions can
*     still miss or be countered, however.
* ** Action Object Notetag: <Element Pierce>
* *** Makes this skill/item bypass any kinds of damage immunities,
*     reflections, and absorptions. Action can still miss or be countered.
* 
* Version 1.18: August 18, 2022
* * Feature Update!
* ** When enemy traits are changed, their visuals will reflect the change.
*    Update made by Arisu.
* 
* Version 1.17: April 28, 2022
* * Bug Fixes!
* ** Fixed a problem with certain trait affinities ignoring zero values.
*    Fix made by Olivia.
* 
* Version 1.16: October 14, 2021
* * Compatibility Update!
* ** Those using the updated layout of the Status Menu will now have the
*    windows inherit the background type of the previous layout's Status
*    Window Background Type from the Core Engine settings. Update by Irina.
* 
* Version 1.15: July 23, 2021
* * Bug Fixes!
* ** Fixed trait blessing calculations for X Parameters to make more sense and
*    not snuff out if the base value is 0%.
*    Fix made by Arisu.
* 
* Version 1.14: May 28, 2021
* * Bug Fixes!
* ** Added fail safe to prevent passive state melding from traits to crash the
*    game when cache fails to collect data. Fix by Irina.
* 
* Version 1.13: May 21, 2021
* * Documentation Update
* ** Added for Trait "Passive States" section:
* *** Refer to VisuMZ_1_SkillsStatesCore's documentation for more details.
* 
* Version 1.12: April 30, 2021
* * Bug Fixes!
* ** When changing traits to a random value, load up any passive states and
*    other effects that may have changed. Fix made by Arisu.
* 
* Version 1.11: February 26, 2021
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.10: January 29, 2021
* * Bug Fixes!
* ** <Multi-Element: x> notetags should now work properly. Fix made by Olivia.
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New notetag added by Irina:
* *** <Equip Trait Requirement: name>
* **** Makes this piece of equipment equippable by only actors with those
*      traits. If there are multiple traits required, all of them have to be
*      met. If multiple trait types share the same trait name, the listed name
*      will count for all of them.
* **** Usage Example: <Equip Trait Requirement: Female> makes the item only
*      equippable by female actors as long as they are tagged as female.
* ** New Plugin Parameters added by Irina and sponsored by AndyL.
* *** Status Menu Settings > Elements > IDs: Column 1 added
* *** Status Menu Settings > Elements > IDs: Column 2 added
* **** The list of element ID's to show in column 1/2.
* **** If neither column has ID's, list all elements.
* ***** If you do not update the drawn JS found in the Status Menu Categories
*       Plugin Parameters, these new settings won't do anything.
* * Feature Update!
* ** Plugin Parameter updates made by Irina and sponsored by AndyL.
* *** Status Menu Categories > Parameters updated
* **** Default draw options now have a slightly thicker padding to make the
*      parameter values easier to read.
* *** Status Menu Categories > Elements updated
* **** Default draw options now factor in multiple columns as applied by the
*      new plugin parameters above.
* *** Status Menu Categories > Access updated
* **** Skill Types, Weapon Types, and Armor Types are now centered in the
*      various data columns to allow for better reading.
* ** Default settings have been added to the Plugin Parameters. If you want to
*    acquire these settings for an already-existing project, do either of the
*    following:
* *** Delete the existing VisuMZ_1_ElementStatusCore.js in the Plugin Manager
*     list and install the newest version.
* *** Or create a new project, install VisuMZ_1_ElementStatusCore.js there,
*     then copy over the "Status Menu Categories" parameters found in the
*     Plugin Parameters to your current project.
*
* Version 1.09: January 8, 2021
* * Bug Fixes!
* ** Default "JS: Draw Data" code for Plugin Parameters > Status Menu
*    Categories > Elements has been updated to account for Trait Type
*    visibility for both Element and Sub-Element. This won't update normally
*    as it is a part of the Plugin Parameters. You will need to either delete
*    the reinstall the plugin into the Plugin Manager list or copy and paste
*    the Status Menu Categories plugin parameters from a fresh install. Fix
*    made by Irina.
* 
* Version 1.08: November 29, 2020
* * Bug Fixes!
* ** Trait Set bonuses for X Parameters and S Parameters no longer increase
*    exponentially with each other. Fix made by Arisu.
* 
* Version 1.07: November 8, 2020
* * Compatibility Update!
* ** Plugins should be more compatible with one another.
*
* Version 1.06: October 18, 2020
* * Compatibility Update!
* ** Plugins should be more compatible with one another.
* * Documentation Update
* ** "Use Updated Layout" plugin parameters now have the added clause:
*    "This will override the Core Engine windows settings." to reduce
*    confusion. Added by Yanfly.
*
* Version 1.05: October 4, 2020
* * Bug Fixes!
* ** Main Menu Portraits are now forced to pre-load prior to entering the
*    Status Menu scene to ensure images will properly appear.
*    Fix made by Irina.
* 
* Version 1.04: September 20, 2020
* * Bug Fixes!
* ** The "Column 1 and 2 Traits" plugin parameters for "General Trait Set"
*    should now work. You will need to readjust them again. Fix by Arisu.
* ** The "Elements" Status Menu Categories tab has its "JS: Draw Data"
*    updated to display the percentages properly for Dealt Damage bonuses.
*    This won't update normally as it's a part of the plugin parameters. You
*    would need to do either a fresh install, copy from the sample project,
*    or change the code bit yourself. To change to code bit, look for this:
*      let dealtText = '%1%'.format(dealt);
*    and change it to:
*      let dealtText = '%1%'.format(Math.round(dealt * 100));
*    Fix made by Irina.
* 
* Version 1.03: September 6, 2020
* * Documentation Update!
* ** <Dealt Element id Flat: +x%> notetag gets a more indepth explanation.
* *** This does not add on flat bonus damages after calculating elemental
*     rates. This merely adds onto it at the end after applying rates if
*     the formula from above is unchanged.
* * New Features!
* ** New Plugin Parameters added in Status Menu Settings for disabling the
*    back rectangles and/or changing their colors.
* 
* Version 1.02: August 30, 2020
* * Bug Fixes!
* ** Trait Set bonuses for X Parameters and S Parameters now show up properly
*    in the Status Menu. Fix made by Yanfly.
* ** Trait Set Sideview Battler Solo Weapon and Solo Motion notetags are now
*    fixed to register properly with Battle Core. Fix made by Shaz.
* 
* Version 1.01: August 23, 2020
* * Bug Fixes!
* ** Passive states now work with Skills & States Core. Fix made by Yanfly.
* ** Fixed S parameters not working. Fix made by Yanfly.
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
* @command Separator_Begin
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeBiographyGroup
* @text Actor: Change Biography (Group)
* @desc Changes the biography of the selected actor(s).
* Select from a group of actor ID's to change.
*
* @arg Step1:arraynum
* @text Step 1: Target ID(s)
* @type actor[]
* @desc Select which Actor ID(s) to affect.
* @default ["1"]
*
* @arg Biography:json
* @text Step 2: Biography
* @type note
* @desc Change the biography for target actor(s) to this.
* Text codes allowed. %1 - Actor's name.
* @default "This is %1's new biography."
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeBiographyRange
* @text Actor: Change Biography (Range)
* @desc Changes the biography of the selected actor(s).
* Select from a range of actor ID's to change.
*
* @arg Step1
* @text Step 1: ID Range
*
* @arg Step1Start:num
* @text Range Start
* @parent Step1
* @type actor
* @desc Select which Actor ID to start from.
* @default 1
*
* @arg Step1End:num
* @text Range End
* @parent Step1
* @type actor
* @desc Select which Actor ID to end at.
* @default 4
*
* @arg Biography:json
* @text Step 2: Biography
* @type note
* @desc Change the biography for target actor(s) to this.
* Text codes allowed. %1 - Actor's name.
* @default "This is %1's new biography."
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeBiographyJS
* @text Actor: Change Biography (JS)
* @desc Changes the biography of the selected actor(s).
* Select from a group of actor ID's using JavaScript.
*
* @arg Step1:arrayeval
* @text Step 1: Target ID(s)
* @type string[]
* @desc Enter which Actor ID(s) to affect.
* You may use JavaScript code.
* @default ["$gameVariables.value(1)"]
*
* @arg Biography:json
* @text Step 2: Biography
* @type note
* @desc Change the biography for target actor(s) to this.
* Text codes allowed. %1 - Actor's name.
* @default "This is %1's new biography."
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeTraitSetsGroup
* @text Actor: Change Trait Sets (Group)
* @desc Changes the Trait Set(s) of the selected actor(s).
* Select from a group of actor ID's to change.
*
* @arg Step1:arraynum
* @text Step 1: Target ID(s)
* @type actor[]
* @desc Select which Actor ID(s) to affect.
* @default ["1"]
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeTraitSetsRange
* @text Actor: Change Trait Sets (Range)
* @desc Changes the Trait Set(s) of the selected actor(s).
* Select from a range of actor ID's to change.
*
* @arg Step1
* @text Step 1: ID Range
*
* @arg Step1Start:num
* @text Range Start
* @parent Step1
* @type actor
* @desc Select which Actor ID to start from.
* @default 1
*
* @arg Step1End:num
* @text Range End
* @parent Step1
* @type actor
* @desc Select which Actor ID to end at.
* @default 4
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @ --------------------------------------------------------------------------
*
* @command ActorChangeTraitSetsJS
* @text Actor: Change Trait Sets (JS)
* @desc Changes the Trait Set(s) of the selected actor(s).
* Select from a group of actor ID's using JavaScript.
*
* @arg Step1:arrayeval
* @text Step 1: Target ID(s)
* @type string[]
* @desc Enter which Actor ID(s) to affect.
* You may use JavaScript code.
* @default ["$gameVariables.value(1)"]
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of the Trait Set to switch actor(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @ --------------------------------------------------------------------------
*
* @command Separator_Enemy
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command EnemyChangeTraitSetsGroup
* @text Enemy: Change Trait Sets (Group)
* @desc Changes the Trait Set(s) of the selected enemy(ies).
* Select from a group of enemy indexes to change.
*
* @arg Step1:arraynum
* @text Step 1: Target ID(s)
* @type number[]
* @desc Select which Enemy Index(es) to affect.
* @default ["1"]
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @ --------------------------------------------------------------------------
*
* @command EnemyChangeTraitSetsRange
* @text Enemy: Change Trait Sets (Range)
* @desc Changes the Trait Set(s) of the selected enemy(ies).
* Select from a range of enemy indexes to change.
*
* @arg Step1
* @text Step 1: ID Range
*
* @arg Step1Start:num
* @text Range Start
* @parent Step1
* @type number
* @desc Select which Enemy Index to start from.
* @default 0
*
* @arg Step1End:num
* @text Range End
* @parent Step1
* @type number
* @desc Select which Index to end at.
* @default 7
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @ --------------------------------------------------------------------------
*
* @command EnemyChangeTraitSetsJS
* @text Enemy: Change Trait Sets (JS)
* @desc Changes the Trait Set(s) of the selected enemy(ies).
* Select from a group of enemy indexes using JavaScript.
*
* @arg Step1:arrayeval
* @text Step 1: Target ID(s)
* @type string[]
* @desc Enter which Enemy Indexes to affect.
* You may use JavaScript code.
* @default ["$gameVariables.value(1)"]
*
* @arg Step2
* @text Step 2: Change Trait Set
*
* @arg Element:str
* @text - Element
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg SubElement:str
* @text - SubElement
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Gender:str
* @text - Gender
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Race:str
* @text - Race
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Nature:str
* @text - Nature
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Alignment:str
* @text - Alignment
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Blessing:str
* @text - Blessing
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Curse:str
* @text - Curse
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Zodiac:str
* @text - Zodiac
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
*
* @arg Variant:str
* @text - Variant
* @parent Step2
* @desc Change to the name of Trait Set to switch target(s) to.
* "Unchanged" to leave alone. "Random" to randomize.
* @default Unchanged
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
* @param ElementStatusCore
* @default Plugin Parameters
*
* @param ATTENTION
* @default READ THE HELP FILE
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------
*
* @param ElementRules:struct
* @text 元素规则
* @type struct<ElementRules>
* @desc 与元素相关的机制规则。

* @default {"Rulings":"","MultiRule:str":"multiply","RuleMaxCalcJSa:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet max = -1000;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    max = Math.max(max, target.elementRate(elementId) * sign);\\n}\\nreturn max;\"","RuleMinCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet min = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    min = Math.min(min, target.elementRate(elementId) * sign);\\n}\\nreturn min;\"","RuleMultiplyCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 1;\\nlet sign = 1;\\nfor (const elementId of elements) {\\n    if (absorbed.includes(elementId)) sign = -1;\\n    rate *= target.elementRate(elementId);\\n}\\nreturn rate * sign;\"","RuleAdditiveCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\\nlet rate = 0;\\nfor (const elementId of elements) {\\n    const sign = absorbed.includes(elementId) ? -1 : 1;\\n    rate += target.elementRate(elementId) * sign;\\n}\\nreturn rate;\"","RuleAverageCalcJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst elements = arguments[1];\\nconst action = this;\\n\\n// Determine Return Value\\nconst rate = action.elementsRateSum(target, elements);\\nreturn rate / elements.length;\"","Formulas":"","ReceivedRateJS:func":"\"// Declare Constants\\nconst elementId = arguments[0];\\nconst target = this;\\nconst base = 1;\\nconst plus = target.getReceiveElementPlus(elementId);\\nconst rate = target.getReceiveElementRate(elementId);\\nconst flat = target.getReceiveElementFlat(elementId);\\n\\n// Determine Return Value\\nreturn Math.max(0, (base + plus) * rate + flat);\"","FinalizeRateJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst action = this;\\nconst elements = action.elements();\\nconst targetRate = action.calcTargetElementRate(target, elements);\\nconst sign = targetRate >= 0 ? 1 : -1;\\nconst base = Math.abs(targetRate);\\nconst plus = action.calcUserElementDamagePlus(target, elements);\\nconst rate = action.calcUserElementDamageRate(target, elements);\\nconst flat = action.calcUserElementDamageFlat(target, elements);\\n\\n// Determine Return Value\\nreturn sign * Math.max((base + plus) * rate + flat, 0);;\""}
*
* @param StatusMenu:struct
* @text 状态菜单设置
* @type struct<StatusMenu>
* @desc 状态菜单场景的设置。

* @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/top","TraitDescriptionFontSize:num":"18","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"icon","CmdTextAlign:str":"center","Parameters":"","Col1:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","Col2:arraystr":"[\"HIT\",\"EVA\",\"CRI\",\"CEV\",\"MEV\",\"MRF\",\"CNT\",\"HRG\",\"MRG\",\"TRG\"]","Col3:arraystr":"[\"TGR\",\"GRD\",\"REC\",\"PHA\",\"MCR\",\"TCR\",\"PDR\",\"MDR\",\"FDR\",\"EXR\"]","Elements":"","ExcludeElements:arraynum":"[]","ElementsCol1:arraynum":"[]","ElementsCol2:arraynum":"[]","Vocabulary":"","VocabBiography:str":"Biography","VocabDmgAbsorb:str":"Absorbs %1%","VocabDmgReceive:str":"Elemental Resistance","VocabDmgDealt:str":"Bonus Damage","VocabStype:str":"Skill Types","VocabWtype:str":"Weapon Types","VocabAtype:str":"Armor Types"}
*
* @param StatusMenuList:arraystruct
* @text 状态菜单分类
* @parent StatusMenu:struct
* @type struct<StatusCategory>[]
* @desc 在状态菜单场景中显示的分类列表。

* @default ["{\"Symbol:str\":\"general\",\"Icon:num\":\"84\",\"Text:str\":\"General\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst maxExp = '-------';\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = lineHeight * 6.5;\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst halfWidth = this.innerWidth / 2;\\\\nlet rect = new Rectangle(0, 0, halfWidth, this.innerHeight);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Smaller Data Area\\\\nlet sx = rect.x;\\\\nlet sy = Math.max(rect.y, rect.y + (rect.height - basicDataHeight));\\\\nlet sw = rect.width;\\\\nlet sh = rect.y + rect.height - sy;\\\\n\\\\n// Draw Actor Name\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight, 2);\\\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\\\n\\\\n// Draw Actor Level\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorLevel(actor, sx, sy);\\\\n\\\\n// Draw Actor Class\\\\nconst className = actor.currentClass().name;\\\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawTextEx(className, sx, sy, sw);\\\\n\\\\n// Draw Actor Icons\\\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, lineHeight);\\\\nthis.drawActorIcons(actor, sx, sy);\\\\n\\\\n// Draw Gauges\\\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\\\nsy += lineHeight;\\\\nthis.drawItemDarkRect(0, sy, sw, this.innerHeight - sy);\\\\nthis.placeGauge(actor, \\\\\\\"hp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nthis.placeGauge(actor, \\\\\\\"mp\\\\\\\", sx, sy);\\\\nsy += gaugeLineHeight;\\\\nif ($dataSystem.optDisplayTp) {\\\\n    this.placeGauge(actor, \\\\\\\"tp\\\\\\\", sx, sy);\\\\n}\\\\n\\\\n// Declare Second Half\\\\nrect = new Rectangle(halfWidth, 0, halfWidth, this.innerHeight);\\\\n\\\\n// Draw EXP\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, rect.y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.exp, rect.x, rect.y, rect.width, 'center');\\\\nconst expHeight = lineHeight * 5;\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 1, rect.width, lineHeight * 2);\\\\nthis.drawItemDarkRect(rect.x, rect.y + lineHeight * 3, rect.width, lineHeight * 2);\\\\nconst expTotal = TextManager.expTotal.format(TextManager.exp);\\\\nconst expNext = TextManager.expNext.format(TextManager.level);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(expTotal, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2);\\\\nthis.drawText(expNext, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2);\\\\nthis.resetTextColor();\\\\nconst expTotalValue = actor.currentExp();\\\\nconst expNextValue = actor.isMaxLevel() ? maxExp : actor.nextRequiredExp();\\\\nthis.drawText(expTotalValue, rect.x + padding, rect.y + lineHeight * 1, rect.width - padding * 2, 'right');\\\\nthis.drawText(expNextValue, rect.x + padding, rect.y + lineHeight * 3, rect.width - padding * 2, 'right');\\\\n\\\\n// Write Actor Biography\\\\ny = rect.y + expHeight;\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, lineHeight, 2);\\\\nthis.drawText(TextManager.statusMenuBiography, rect.x, y, rect.width, 'center');\\\\nthis.resetTextColor();\\\\ny += lineHeight;\\\\nconst bioText = actor.getBiography();\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\nthis.drawTextEx(bioText, rect.x + padding, y, rect.width - padding * 2);\\\"\"}","{\"Symbol:str\":\"parameters\",\"Icon:num\":\"87\",\"Text:str\":\"Parameters\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst gaugeLineHeight = this.gaugeLineHeight();\\\\nconst basicDataHeight = this.basicDataHeight();\\\\nconst padding = this.itemPadding() * 2;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet paramWidth = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Declare Parameters\\\\nconst params1 = this.getParameterList(1);\\\\nconst params2 = this.getParameterList(2);\\\\nconst params3 = this.getParameterList(3);\\\\nconst maxLength = Math.max(params1.length, params2.length, params3.length);\\\\nconst nameWidth = rect.width - padding * 2 - this.textWidth('88888');\\\\nconst topY = Math.max((this.innerHeight - (maxLength * lineHeight)) / 2, 0);\\\\n\\\\n// Draw Parameters 1\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params1) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 2\\\\nrect.x += rect.width;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params2) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Parameters 3\\\\nrect.x += rect.width;\\\\nrect.width = this.innerWidth - rect.x;\\\\nx = rect.x + padding;\\\\ny = topY;\\\\nparamWidth = rect.width - (padding * 2);\\\\nif (y !== 0) this.drawItemDarkRect(rect.x, 0, rect.width, y);\\\\nfor (const paramId of params3) {\\\\n    this.drawItemDarkRect(rect.x, y, rect.width, lineHeight);\\\\n    this.drawParamName(paramId, x, y, nameWidth);\\\\n    this.drawParamValue(paramId, x, y, paramWidth);\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(rect.x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"properties\",\"Icon:num\":\"83\",\"Text:str\":\"Properties\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst traitCol1 = Window_StatusData.traitCol1;\\\\nconst traitCol2 = Window_StatusData.traitCol2;\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst traitHeight = (this.innerHeight / Math.max(traitCol1.length, traitCol2.length)) - lineHeight;\\\\nconst width = this.innerWidth / 2;\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Trait Set 1\\\\nfor (const type of traitCol1) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(0, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(0, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(0, y, width, this.innerHeight - y);\\\\n}\\\\n\\\\n// Draw Trait Set 2\\\\ny = 0;\\\\nfor (const type of traitCol2) {\\\\n    const traitType = DataManager.traitSetType(type);\\\\n    const traitSet = actor.traitSet(type);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    const labelText = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2'.format(traitType.Label, traitSet.Display);\\\\n    this.drawTextEx(labelText, width + padding, y, width - padding * 2);\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    this.drawTextEx(traitSet.Description, width + padding, y, width - padding * 2);\\\\n    y += traitHeight;\\\\n    this.resetDescriptionFontSize();\\\\n}\\\\n\\\\n// Draw Filler Rect 1\\\\nif (this.innerHeight - y > 0) {\\\\n    this.drawItemDarkRect(width, y, width, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"elements\",\"Icon:num\":\"64\",\"Text:str\":\"Elements\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst padding = this.itemPadding();\\\\nconst labelFmt = '\\\\\\\\\\\\\\\\C[16]%1: \\\\\\\\\\\\\\\\C[0]%2';\\\\nconst traitType1 = DataManager.traitSetType('Element');\\\\nconst traitSet1 = actor.traitSet('Element');\\\\nconst traitType2 = DataManager.traitSetType('SubElement');\\\\nconst traitSet2 = actor.traitSet('SubElement');\\\\nconst traitHeight = (this.innerHeight / Math.max(Window_StatusData.traitCol1.length, Window_StatusData.traitCol2.length)) - lineHeight;\\\\nlet x = 0;\\\\nlet y = 0;\\\\nlet width = this.innerWidth / 2;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, width);\\\\n\\\\n// Draw Element Trait Sets\\\\nif (traitType1.Visible || traitType2.Visible) {\\\\n    this.drawItemDarkRect(x, y, width, lineHeight, 2);\\\\n    this.drawItemDarkRect(width, y, width, lineHeight, 2);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType1.Label, traitSet1.Display), padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(labelFmt.format(traitType2.Label, traitSet2.Display), width + padding, y, width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n    this.setDescriptionFontSizeToTraitSet();\\\\n    this.drawItemDarkRect(x, y, width, traitHeight);\\\\n    this.drawItemDarkRect(width, y, width, traitHeight);\\\\n    if (traitType1.Visible) {\\\\n        this.drawTextEx(traitSet1.Description, padding, y, width - padding * 2);\\\\n    }\\\\n    if (traitType2.Visible) {\\\\n        this.drawTextEx(traitSet2.Description, width + padding, y, width - padding * 2);\\\\n    }\\\\n    this.resetDescriptionFontSize();\\\\n    this.resetFontSettings();\\\\n    y += traitHeight;\\\\n}\\\\nconst topY = y;\\\\n\\\\n// Prepare Elemental Data\\\\nconst elementCol1 = this.getElementIDsCol1();\\\\nconst elementCol2 = this.getElementIDsCol2();\\\\nlet columnData;\\\\nif (elementCol2.length > 0) {\\\\n    columnData = ['Resist','Resist','Bonus','Bonus'];\\\\n} else {\\\\n    columnData = ['Resist','Bonus'];\\\\n}\\\\nconst dataRows = Math.max(elementCol1.length, elementCol2.length, 1);\\\\nconst dataCols = columnData.length;\\\\n\\\\n// Draw Elemental Data\\\\nthis.drawItemDarkRect(width * 0, y, width, lineHeight, 2);\\\\nthis.drawItemDarkRect(width * 1, y, width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuDmgReceive, width * 0, y, width, 'center');\\\\nthis.drawText(TextManager.statusMenuDmgDealt, width * 1, y, width, 'center');\\\\ny += lineHeight;\\\\nthis.setDescriptionFontSizeToTraitSet();\\\\nconst smallLineHeight = this.textSizeEx(' ').height;\\\\n\\\\n// Draw Elemental Table\\\\nfor (let i = 0; i < dataRows; i++) {\\\\n    for (let j = 0; j < dataCols; j++) {\\\\n        // Draw Dark Rect\\\\n        const colWidth = this.innerWidth / dataCols;\\\\n        this.drawItemDarkRect(colWidth * j, y, colWidth, smallLineHeight);\\\\n\\\\n        // Draw Element Name\\\\n        let elementID = elementCol1[i];\\\\n        if (dataCols === 4) {\\\\n            elementID = (j % 2 === 0) ? elementCol1[i] : elementCol2[i];\\\\n        }\\\\n        if (!elementID) continue;\\\\n        const name = $dataSystem.elements[elementID];\\\\n        this.drawTextEx(name, colWidth * (j + 1/3) + padding, y, colWidth*2/3);\\\\n        const type = columnData[j];\\\\n\\\\n        // Draw Resistance Data\\\\n        this.resetFontSettings();\\\\n        let drawText = '';\\\\n        if (type === 'Resist') {\\\\n            const rate = actor.elementRate(elementID);\\\\n            const flippedRate = (rate - 1) * -1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(flippedRate));\\\\n            drawText = '%1%'.format(Math.round(flippedRate * 100));\\\\n            if (actor.getAbsorbedElements().includes(elementID)) {\\\\n                this.changeTextColor(ColorManager.powerUpColor());\\\\n                drawText = TextManager.statusMenuDmgAbsorb.format(Math.round(rate * 100));\\\\n            } else if (rate > 1) {\\\\n                drawText = '%1'.format(drawText);\\\\n            } else if (rate <= 1) {\\\\n                drawText = '+%1'.format(drawText);\\\\n            }\\\\n\\\\n        // Draw Bonus Damage Data\\\\n        } else if (type === 'Bonus') {\\\\n            const dealtPlus = actor.getDealtElementPlus(elementID);\\\\n            const dealtRate = actor.getDealtElementRate(elementID);\\\\n            const dealtFlat = actor.getDealtElementFlat(elementID);\\\\n            const dealt = ((1 + dealtPlus) * dealtRate + dealtFlat) - 1;\\\\n            this.changeTextColor(ColorManager.paramchangeTextColor(dealt));\\\\n            drawText = '%1%'.format(Math.round(dealt * 100));\\\\n            if (dealt >= 0) drawText = '+%1'.format(drawText);\\\\n        }\\\\n\\\\n        // Draw Value\\\\n        this.contents.drawText(drawText, colWidth * j, y, (colWidth/3) - padding, smallLineHeight, 'right');\\\\n    }\\\\n    y += smallLineHeight;\\\\n}\\\\n\\\\n// Closing the Table\\\\nfor (let j = 0; j < dataCols; j++) {\\\\n    const colWidth = this.innerWidth / dataCols;\\\\n    this.drawItemDarkRect(colWidth * j, y, colWidth, this.innerHeight - y);\\\\n}\\\"\"}","{\"Symbol:str\":\"access\",\"Icon:num\":\"137\",\"Text:str\":\"Access\",\"DrawJS:func\":\"\\\"// Declare Constants\\\\nconst lineHeight = this.lineHeight();\\\\nconst actor = this._actor;\\\\nconst thirdWidth = Math.floor(this.innerWidth / 3);\\\\nlet x = 0;\\\\nlet y = 0;\\\\n\\\\n// Draw Actor Graphic\\\\nthis.drawActorGraphic(0, this.innerWidth / 2);\\\\n\\\\n// Declare Parameter Rect\\\\nlet rect = new Rectangle(0, 0, thirdWidth, this.innerHeight);\\\\n\\\\n// Draw Skill Types\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuStype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const stypeId of actor.skillTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (stypeId > 0) {\\\\n        const text = $dataSystem.skillTypes[stypeId];\\\\n        const padding = Math.round((rect.width - this.stypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Weapon Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuWtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const wtypeId of actor.weaponTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (wtypeId > 0) {\\\\n        const text = $dataSystem.weaponTypes[wtypeId];\\\\n        const padding = Math.round((rect.width - this.wtypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\\n\\\\n// Draw Armor Types\\\\nrect.x += rect.width;\\\\nx = rect.x;\\\\ny = 0;\\\\nrect.width = this.innerWidth - rect.x;\\\\nthis.resetFontSettings();\\\\nthis.drawItemDarkRect(x, y, rect.width, lineHeight, 2);\\\\nthis.changeTextColor(ColorManager.systemColor());\\\\nthis.drawText(TextManager.statusMenuAtype, x, y, rect.width, 'center');\\\\ny += lineHeight;\\\\nfor (const atypeId of actor.armorTypes()) {\\\\n    this.drawItemDarkRect(x, y, rect.width, lineHeight);\\\\n    if (atypeId > 0) {\\\\n        const text = $dataSystem.armorTypes[atypeId];\\\\n        const padding = Math.round((rect.width - this.atypeWidth()) / 2);\\\\n        this.drawTextEx(text, x + padding, y, rect.width - padding * 2);\\\\n    }\\\\n    y += lineHeight;\\\\n}\\\\nthis.drawItemDarkRect(x, y, rect.width, this.innerHeight - y);\\\"\"}","{\"Symbol:str\":\"cancel\",\"Icon:num\":\"82\",\"Text:str\":\"Finish\",\"DrawJS:func\":\"\\\"this.drawFirstCategoryData();\\\"\"}"]
*
* @param TraitBreak
* @text --------------------------
* @default ----------------------------------
*
* @param TraitSetSettings:struct
* @text 通用特征集设置
* @type struct<TraitSetSettings>
* @desc 整体特征集的设置。

* @default {"General":"","Enable:eval":"true","EnemyNameFmt:str":"[variant] [name][gender] [letter]","TraitColumns":"","TraitCol1:arraystr":"[\"Gender\",\"Nature\",\"Blessing\",\"Zodiac\"]","TraitCol2:arraystr":"[\"Race\",\"Alignment\",\"Curse\",\"Variant\"]"}
*
* @param Element:struct
* @text 主要元素设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Element","Label:str":"Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\i[160]Neutral\",\"Description:json\":\"\\\"No strengths or weaknesses.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"2.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param SubElement:struct
* @text Sub Element Sets
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc The settings for the Main Element Trait Set Type.
* @default {"Name:str":"Sub-Element","Label:str":"Sub-Element","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"-\",\"Display:str\":\"-\",\"Description:json\":\"\\\"\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"8\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Fire\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[64]Fire\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire and \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Flame\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ice\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[65]Ice\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[65]Ice and \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Frost\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Thunder\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[66]Thunder\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[66]Thunder and \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Electric\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Water\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[67]Water\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water and \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Aqua\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Earth\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[68]Earth\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[68]Earth and \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Stone\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wind\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[69]Wind\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[69]Wind and \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Air\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Light\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Light\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bright\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Darkness\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Darkness\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Shadow\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.75\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Gender:struct
* @text Gender Sets
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc The settings for the Main Element Trait Set Type.
* @default {"Name:str":"Gender","Label:str":"Gender","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"Uncertain to this unit's gender.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Male\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[165]Male\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger physical attributes.\\\\\\\\nThis unit has weaker magical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♂\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.95\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Female\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[162]Female\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has stronger magical attributes.\\\\\\\\nThis unit has weaker physical attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♀\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"50\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Both\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[84]Both\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⚥\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Race:struct
* @text 种族设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 种族特征集类型的设置。

* @default {"Name:str":"Race","Label:str":"Race","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Uncategorized\",\"Display:str\":\"\\\\I[16]Uncategorized\",\"Description:json\":\"\\\"This race's attributes have not been determined.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Human\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[82]Human\\\",\\\"Description:json\\\":\\\"\\\\\\\"This race has neutral attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Human\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"High Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[101]High Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"High Elves have more MaxMP and less MaxHP.\\\\\\\\nHigh Elves can equip Canes and Magic Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"High Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wood Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[102]Wood Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wood Elves have more AGI and less DEF.\\\\\\\\nWood Elves can equip Bows and Crossbows.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wood Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"7\\\\\\\",\\\\\\\"8\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dark Elf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Dark Elf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dark Elves have more ATK and less MAT.\\\\\\\\nDark Elves can equip Daggers and Swords.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dark Elven\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\",\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dwarf\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[223]Dwarf\\\",\\\"Description:json\\\":\\\"\\\\\\\"Dwarves have more MaxHP and less AGI.\\\\\\\\nDwarves can equip Flails and Heavy Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dwarvin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gnome\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[140]Gnome\\\",\\\"Description:json\\\":\\\"\\\\\\\"Gnomes have more AGI and less DEF.\\\\\\\\nGnomes can equip Daggers and Light Armor.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gnomish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"1\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"3\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Halfling\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[142]Halfling\\\",\\\"Description:json\\\":\\\"\\\\\\\"Halflings have more LUK and less MaxMP.\\\\\\\\nHalflings can equip Sword and Small Shields.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hafling\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"2\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\"]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Wolfkin\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[105]Wolfkin\\\",\\\"Description:json\\\":\\\"\\\\\\\"Wolfkin have more ATK and less MAT.\\\\\\\\nWolfkin can equip Claws and Gloves.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Wolfkin\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"10\\\\\\\",\\\\\\\"11\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Felyne\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[100]Felyne\\\",\\\"Description:json\\\":\\\"\\\\\\\"Felyne have more MAT and less ATK.\\\\\\\\nFelyne can equip Whips and Canes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Felyne\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"5\\\\\\\",\\\\\\\"6\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lizardman\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[99]Lizardman\\\",\\\"Description:json\\\":\\\"\\\\\\\"Lizardmen have more DEF and less LUK.\\\\\\\\nLizardmen can equip Axes and Spears.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lizardman\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[\\\\\\\"4\\\\\\\",\\\\\\\"12\\\\\\\"]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Nature:struct
* @text 性质设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Nature","Label:str":"Nature","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Chill\",\"Display:str\":\"\\\\I[84]Chill\",\"Description:json\":\"\\\"This unit has neutral parameters.\\\"\",\"FmtText:str\":\"Chill\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Hardy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[50]Hardy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hardy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lonely\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[51]Lonely\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lonely\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Adamant\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[52]Adamant\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Adamant\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naughty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[53]Naughty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naughty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Brave\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[34]\\\\\\\\I[54]Brave\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more ATK and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Brave\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bold\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[50]Bold\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bold\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Docile\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[51]Docile\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Docile\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impish\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[52]Impish\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impish\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lax\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[53]Lax\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lax\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Relaxed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[35]\\\\\\\\I[54]Relaxed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more DEF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Relaxed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Modest\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[50]Modest\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Modest\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Mild\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[51]Mild\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mild\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Bashful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[52]Bashful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Bashful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Rash\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[53]Rash\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Rash\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quiet\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[36]\\\\\\\\I[54]Quiet\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MAT and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quiet\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Calm\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[50]Calm\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Calm\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gentle\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[51]Gentle\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Gentle\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Careful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[52]Careful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Careful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Quirky\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[53]Quirky\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Quirky\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sassy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[37]\\\\\\\\I[54]Sassy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more MDF and less AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Sassy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Timid\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[50]Timid\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Timid\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Hasty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[51]Hasty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Hasty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Jolly\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[52]Jolly\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Jolly\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Naive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[53]Naive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has more AGI and less MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Naive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Serious\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[38]\\\\\\\\I[54]Serious\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has neutral parameters.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Serious\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Alignment:struct
* @text 对齐设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Alignment","Label:str":"Alignment","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Neutral\",\"Display:str\":\"\\\\I[160]Neutral\",\"Description:json\":\"\\\"This unit's alignment is completely neutral.\\\"\",\"FmtText:str\":\"Neutral\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Lawful Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Lawful Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Neutral Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Good\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[70]Chaotic Good\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Good\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Lawful Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Neutral\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[160]Chaotic Neutral\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[64]Fire, \\\\\\\\\\\\\\\\I[65]Ice, \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[67]Water, \\\\\\\\\\\\\\\\I[68]Earth, \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Neutral\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Lawful Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Lawful Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Neutral Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Neutral Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Chaotic Evil\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[71]Chaotic Evil\\\",\\\"Description:json\\\":\\\"\\\\\\\"Strong against \\\\\\\\\\\\\\\\I[71]Darkness.\\\\\\\\nWeak against \\\\\\\\\\\\\\\\I[70]Light.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Evil\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Blessing:struct
* @text 祝福设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Blessing","Label:str":"Blessing","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Blessing\",\"Display:str\":\"\\\\I[160]No Blessing\",\"Description:json\":\"\\\"This unit has not received a blessing.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Dextrous\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Dextrous\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dextrous\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Elusive\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Elusive\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Elusive\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Impact\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Impact\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Impactful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.20\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Healthy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Healthy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate HP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Healthy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Focused\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Focused\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate MP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Focused\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Energetic\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[164]Energetic\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has innate TP Regeneration.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Energetic\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.05\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Curse:struct
* @text 诅咒设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Curse","Label:str":"Curse","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"No Curse\",\"Display:str\":\"\\\\I[160]No Curse\",\"Description:json\":\"\\\"This unit has not been cursed.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"6\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Clumsy\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Clumsy\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less HIT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Clumsy\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Dazed\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Dazed\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less EVA.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Dazed\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Fitful\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Fitful\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has less CRI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Fitful\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{\\\\\\\"XParam0:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam1:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam2:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"XParam3:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam4:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam5:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam6:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam7:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam8:num\\\\\\\":\\\\\\\"0.00\\\\\\\",\\\\\\\"XParam9:num\\\\\\\":\\\\\\\"0.00\\\\\\\"}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Drained\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Drained\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit receives less healing.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Drained\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Inefficient\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Inefficient\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit uses more MP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Inefficient\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Unmotivated\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[170]Unmotivated\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit gaines less TP.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Unmotivated\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{\\\\\\\"SParam0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"SParam6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"SParam9:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Zodiac:struct
* @text 十二生肖设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Zodiac","Label:str":"Zodiac","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Unknown\",\"Display:str\":\"\\\\I[160]Unknown\",\"Description:json\":\"\\\"This unit's Zodiac is unknown.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"false\",\"RandomWeight:num\":\"1\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Aries\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aries\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to ATK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♈\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Taurus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Taurus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[68]Earth.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Gemini\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Gemini\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to AGI.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♊\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Cancer\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Cancer\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to DEF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♋\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Leo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Leo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[64]Fire.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♌\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Virgo\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Virgo\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MAT.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♍\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Libra\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Libra\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to MDF.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♎\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.05\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Scorpio\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Scorpio\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[66]Thunder.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♏\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Sagittarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Sagittarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight increase to LUK.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♐\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.05\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Capricorn\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Capricorn\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[69]Wind.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♑\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Aquarius\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Aquarius\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[67]Water.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♒\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Pisces\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Pisces\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has a slight resistance to \\\\\\\\\\\\\\\\I[65]Ice.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"♓\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{\\\\\\\"Element1:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element2:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element3:num\\\\\\\":\\\\\\\"0.95\\\\\\\",\\\\\\\"Element4:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element5:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element6:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element7:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element8:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element9:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element10:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element11:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element12:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element13:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element14:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element15:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element16:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element17:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element18:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element19:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element20:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element21:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element22:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element23:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element24:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element25:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element26:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element27:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element28:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element29:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element30:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element31:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element32:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element33:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element34:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element35:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element36:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element37:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element38:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element39:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element40:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element41:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element42:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element43:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element44:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element45:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element46:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element47:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element48:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element49:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element50:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element51:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element52:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element53:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element54:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element55:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element56:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element57:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element58:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element59:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element60:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element61:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element62:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element63:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element64:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element65:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element66:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element67:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element68:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element69:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element70:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element71:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element72:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element73:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element74:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element75:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element76:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element77:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element78:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element79:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element80:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element81:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element82:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element83:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element84:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element85:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element86:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element87:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element88:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element89:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element90:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element91:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element92:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element93:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element94:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element95:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element96:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element97:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element98:num\\\\\\\":\\\\\\\"1.00\\\\\\\",\\\\\\\"Element99:num\\\\\\\":\\\\\\\"1.00\\\\\\\"}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Ophiuchus\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[88]Ophiuchus\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit is the rare Ophiuchus zodiac.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"⛎\\\",\\\"RandomValid:eval\\\":\\\"false\\\",\\\"RandomWeight:num\\\":\\\"1\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.00\\\",\\\"GoldRate:num\\\":\\\"1.00\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param Variant:struct
* @text 变体设置
* @parent TraitSetSettings:struct
* @type struct<TraitSetType>
* @desc 主要元素特征集类型的设置。

* @default {"Name:str":"Variant","Label:str":"Variant","Visible:eval":"true","RandomizeActor:eval":"false","RandomizeEnemy:eval":"false","Default:struct":"{\"Name:str\":\"Normal\",\"Display:str\":\"\\\\I[160]Normal\",\"Description:json\":\"\\\"This is your average unit.\\\"\",\"FmtText:str\":\"\",\"RandomValid:eval\":\"true\",\"RandomWeight:num\":\"100\",\"Traits\":\"\",\"ElementRate:struct\":\"{}\",\"Params:struct\":\"{}\",\"XParams:struct\":\"{}\",\"SParams:struct\":\"{}\",\"PassiveStates:arraynum\":\"[]\",\"Equipment\":\"\",\"Wtypes:arraynum\":\"[]\",\"Atypes:arraynum\":\"[]\",\"EnemyRewards\":\"\",\"EXPRate:num\":\"1.00\",\"GoldRate:num\":\"1.00\",\"DropRate:num\":\"1.00\"}","List:arraystruct":"[\"{\\\"Name:str\\\":\\\"Mighty\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Mighty\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Mighty\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.30\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.30\\\",\\\"GoldRate:num\\\":\\\"1.50\\\",\\\"DropRate:num\\\":\\\"2.00\\\"}\",\"{\\\"Name:str\\\":\\\"Major\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Major\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Major\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.20\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.20\\\",\\\"GoldRate:num\\\":\\\"1.25\\\",\\\"DropRate:num\\\":\\\"1.50\\\"}\",\"{\\\"Name:str\\\":\\\"Greater\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Greater\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has increased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Greater\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"1.10\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"1.10\\\",\\\"GoldRate:num\\\":\\\"1.15\\\",\\\"DropRate:num\\\":\\\"1.25\\\"}\",\"{\\\"Name:str\\\":\\\"Lesser\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Lesser\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Lesser\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"20\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.90\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.90\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.90\\\",\\\"GoldRate:num\\\":\\\"0.95\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Minor\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Minor\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Minor\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"10\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.80\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.80\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.80\\\",\\\"GoldRate:num\\\":\\\"0.90\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\",\"{\\\"Name:str\\\":\\\"Puny\\\",\\\"Display:str\\\":\\\"\\\\\\\\I[73]Puny\\\",\\\"Description:json\\\":\\\"\\\\\\\"This unit has decreased attributes.\\\\\\\"\\\",\\\"FmtText:str\\\":\\\"Puny\\\",\\\"RandomValid:eval\\\":\\\"true\\\",\\\"RandomWeight:num\\\":\\\"5\\\",\\\"Traits\\\":\\\"\\\",\\\"ElementRate:struct\\\":\\\"{}\\\",\\\"Params:struct\\\":\\\"{\\\\\\\"Param0:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param1:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param2:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param3:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param4:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param5:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param6:num\\\\\\\":\\\\\\\"0.70\\\\\\\",\\\\\\\"Param7:num\\\\\\\":\\\\\\\"0.70\\\\\\\"}\\\",\\\"XParams:struct\\\":\\\"{}\\\",\\\"SParams:struct\\\":\\\"{}\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Equipment\\\":\\\"\\\",\\\"Wtypes:arraynum\\\":\\\"[]\\\",\\\"Atypes:arraynum\\\":\\\"[]\\\",\\\"EnemyRewards\\\":\\\"\\\",\\\"EXPRate:num\\\":\\\"0.70\\\",\\\"GoldRate:num\\\":\\\"0.85\\\",\\\"DropRate:num\\\":\\\"1.00\\\"}\"]"}
*
* @param BreakEnd1
* @text --------------------------
* @default ----------------------------------
*
*/
/* ----------------------------------------------------------------------------
 * Element Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~ElementRules:
 *
 * @param Rulings
 * @text 规则
 *
 * @param MultiRule:str
 * @text 多重元素规则
 * @parent Rulings
 * @type select
 * @option 最大值（所有元素中的最大比率）
 * @value max
 * @option 最小值（所有元素中的最小比率）
 * @value min
 * @option 乘法（所有元素的乘积）
 * @value multiply
 * @option 加法（所有元素的总和）
 * @value additive
 * @option 平均值（所有元素的平均比率）
 * @value average
 * @desc 多个元素用于伤害计算时如何计算元素比率的规则。
 * @default multiply
 *
 * @param RuleMaxCalcJSa:func
 * @text JS：最大比率
 * @parent Rulings
 * @type note
 * @desc 确定如何计算最大元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// 确定返回值\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet max = -1000;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    max = Math.max(max, target.elementRate(elementId) * sign);\n}\nreturn max;"
 *
 * @param RuleMinCalcJS:func
 * @text JS：最小比率
 * @parent Rulings
 * @type note
 * @desc 确定如何计算最小元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// 确定返回值\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet min = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    min = Math.min(min, target.elementRate(elementId) * sign);\n}\nreturn min;"
 *
 * @param RuleMultiplyCalcJS:func
 * @text JS：乘法比率
 * @parent Rulings
 * @type note
 * @desc 确定如何计算乘法元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// 确定返回值\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 1;\nlet sign = 1;\nfor (const elementId of elements) {\n    if (absorbed.includes(elementId)) sign = -1;\n    rate *= target.elementRate(elementId);\n}\nreturn rate * sign;"
 *
 * @param RuleAdditiveCalcJS:func
 * @text JS：加法比率
 * @parent Rulings
 * @type note
 * @desc 确定如何计算加法元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// 确定返回值\nconst absorbed = action.isRecover() ? [] : target.getAbsorbedElements();\nlet rate = 0;\nfor (const elementId of elements) {\n    const sign = absorbed.includes(elementId) ? -1 : 1;\n    rate += target.elementRate(elementId) * sign;\n}\nreturn rate;"
 *
 * @param RuleAverageCalcJS:func
 * @text JS：平均比率
 * @parent Rulings
 * @type note
 * @desc 确定如何计算平均元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst elements = arguments[1];\nconst action = this;\n\n// 确定返回值\nconst rate = action.elementsRateSum(target, elements);\nreturn rate / elements.length;"
 *
 * @param Formulas
 * @text 公式
 *
 * @param ReceivedRateJS:func
 * @text JS：接收比率
 * @parent Formulas
 * @type note
 * @desc 确定接收目标的元素比率如何计算。
 * @default "// 声明常量\nconst elementId = arguments[0];\nconst target = this;\nconst base = 1;\nconst plus = target.getReceiveElementPlus(elementId);\nconst rate = target.getReceiveElementRate(elementId);\nconst flat = target.getReceiveElementFlat(elementId);\n\n// 确定返回值\nreturn Math.max(0, (base + plus) * rate + flat);"
 *
 * @param FinalizeRateJS:func
 * @text JS：最终比率
 * @parent Formulas
 * @type note
 * @desc 确定在造成伤害前如何计算最终元素比率。
 * @default "// 声明常量\nconst target = arguments[0];\nconst action = this;\nconst elements = action.elements();\nconst targetRate = action.calcTargetElementRate(target, elements);\nconst sign = targetRate >= 0 ? 1 : -1;\nconst base = Math.abs(targetRate);\nconst plus = action.calcUserElementDamagePlus(target, elements);\nconst rate = action.calcUserElementDamageRate(target, elements);\nconst flat = action.calcUserElementDamageFlat(target, elements);\n\n// 确定返回值\nreturn sign * Math.max((base + plus) * rate + flat, 0);;"
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param General
 * @text 常规
 *
 * @param EnableLayout:eval
 * @text 使用更新的布局
 * @parent General
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc 是否使用此插件提供的更新的状态菜单布局？
 * @default true
 *
 * @param LayoutStyle:str
 * @text 布局样式
 * @parent General
 * @type select
 * @option 上部帮助，顶部分类
 * @value upper/top
 * @option 上部帮助，底部分类
 * @value upper/bottom
 * @option 下部帮助，顶部分类
 * @value lower/top
 * @option 下部帮助，底部分类
 * @value lower/bottom
 * @desc 如果使用更新的布局，您希望如何设计菜单场景布局？
 * @default upper/top
 *
 * @param TraitDescriptionFontSize:num
 * @text 特征集字体大小
 * @parent General
 * @type number
 * @min 1
 * @desc 用于特征集描述的字体大小。
 * @default 18
 *
 * @param DrawBackRect:eval
 * @text 显示背景矩形？
 * @parent General
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 是否显示较深颜色的背景矩形以更好地显示信息？
 * @default true
 *
 * @param BackRectColor:str
 * @text 背景矩形颜色
 * @parent DrawBackRect:eval
 * @desc 使用 #rrggbb 自定义颜色或窗口皮肤中的常规数字。
 * @default 19
 *
 * @param Command
 * @text 类别窗口
 *
 * @param CmdStyle:str
 * @text 样式
 * @parent Command
 * @type select
 * @option 仅文本
 * @value text
 * @option 仅图标
 * @value icon
 * @option 图标 + 文本
 * @value iconText
 * @option 自动
 * @value auto
 * @desc 您希望在类别窗口中如何绘制命令？
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text 文本对齐
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc 类别窗口中的文本对齐方式。
 * @default center
 *
 * @param Parameters
 * @text 显示的参数
 * 
 * @param Col1:arraystr
 * @text 第一列
 * @parent Parameters
 * @type combo[]
 * @option 最大HP
 * @option 最大MP
 * @option 攻击力
 * @option 防御力
 * @option 魔法力
 * @option 魔法防御
 * @option 敏捷性
 * @option 幸运值
 * @option 命中率
 * @option 闪避率
 * @option 暴击率
 * @option 暴击回避率
 * @option 魔法闪避率
 * @option 魔法反射率
 * @option 反击率
 * @option HP回复率
 * @option MP回复率
 * @option TP回复率
 * @option 目标回避率
 * @option 防御效果率
 * @option 闪避效果率
 * @option 反射效果率
 * @option 元素效果率
 * @option 物理躲避率
 * @option 魔法躲避率
 * @option 固定物理躲避
 * @option 固定魔法躲避
 * @option 经验倍率
 * @desc 第一列中将显示的参数列表。
 * @default ["最大HP","最大MP","攻击力","防御力","魔法力","魔法防御","敏捷性","幸运值"]
 *
 * @param Col2:arraystr
 * @text 第二列
 * @parent Parameters
 * @type combo[]
 * @option 最大HP
 * @option 最大MP
 * @option 攻击力
 * @option 防御力
 * @option 魔法力
 * @option 魔法防御
 * @option 敏捷性
 * @option 幸运值
 * @option 命中率
 * @option 闪避率
 * @option 暴击率
 * @option 暴击回避率
 * @option 魔法闪避率
 * @option 魔法反射率
 * @option 反击率
 * @option HP回复率
 * @option MP回复率
 * @option TP回复率
 * @option 目标回避率
 * @option 防御效果率
 * @option 闪避效果率
 * @option 反射效果率
 * @option 元素效果率
 * @option 物理躲避率
 * @option 魔法躲避率
 * @option 固定物理躲避
 * @option 固定魔法躲避
 * @option 经验倍率
 * @desc 第二列中将显示的参数列表。
 * @default ["命中率","闪避率","暴击率","暴击回避率","魔法闪避率","魔法反射率","反击率","HP回复率","MP回复率","TP回复率"]
 *
 * @param Col3:arraystr
 * @text 第三列
 * @parent Parameters
 * @type combo[]
 * @option 最大HP
 * @option 最大MP
 * @option 攻击力
 * @option 防御力
 * @option 魔法力
 * @option 魔法防御
 * @option 敏捷性
 * @option 幸运值
 * @option 命中率
 * @option 闪避率
 * @option 暴击率
 * @option 暴击回避率
 * @option 魔法闪避率
 * @option 魔法反射率
 * @option 反击率
 * @option HP回复率
 * @option MP回复率
 * @option TP回复率
 * @option 目标回避率
 * @option 防御效果率
 * @option 闪避效果率
 * @option 反射效果率
 * @option 元素效果率
 * @option 物理躲避率
 * @option 魔法躲避率
 * @option 固定物理躲避
 * @option 固定魔法躲避
 * @option 经验倍率
 * @desc 第三列中将显示的参数列表。
 * @default ["目标回避率","防御效果率","闪避效果率","反射效果率","元素效果率","物理躲避率","魔法躲避率","固定物理躲避","固定魔法躲避","经验倍率"]
 *
 * @param Elements
 * @text 元素
 *
 * @param ExcludeElements:arraynum
 * @text 排除的元素
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc 在状态菜单列表中排除这些元素ID。
 * @default []
 *
 * @param ElementsCol1:arraynum
 * @text ID：第一列
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc 在第一列中显示的元素ID列表。
 * 如果两列都没有ID，则列出所有元素。
 * @default []
 *
 * @param ElementsCol2:arraynum
 * @text ID：第二列
 * @parent Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc 在第二列中显示的元素ID列表。
 * 如果两列都没有ID，则列出所有元素。
 * @default []
 *
 * @param Vocabulary
 * @text 词汇
 *
 * @param VocabBiography:str
 * @text 传记
 * @parent Vocabulary
 * @desc “传记” 的词汇。
 * @default 传记
 *
 * @param VocabDmgAbsorb:str
 * @text 伤害：吸收
 * @parent Vocabulary
 * @desc “伤害：吸收” 的词汇。
 * @default 吸收 %1%
 *
 * @param VocabDmgReceive:str
 * @text 伤害：接收
 * @parent Vocabulary
 * @desc “伤害：接收” 的词汇。
 * @default 元素抵抗
 *
 * @param VocabDmgDealt:str
 * @text 伤害：造成
 * @parent Vocabulary
 * @desc “伤害：造成” 的词汇。
 * @default 奖励伤害
 *
 * @param VocabStype:str
 * @text 技能类型
 * @parent Vocabulary
 * @desc “技能类型”的词汇。
 * @default 技能类型
 *
 * @param VocabWtype:str
 * @text 武器类型
 * @parent Vocabulary
 * @desc “武器类型”的词汇。
 * @default 武器类型
 *
 * @param VocabAtype:str
 * @text 防具类型
 * @parent Vocabulary
 * @desc “防具类型”的词汇。
 * @default 防具类型
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusCategory:
 *
 * @param Symbol:str
 * @text 符号
 * @desc 此类别使用的符号。
 * @default 符号
 *
 * @param Icon:num
 * @text 图标
 * @desc 此类别使用的图标。
 * 使用 0 表示无图标。
 * @default 0
 *
 * @param Text:str
 * @text 文本
 * @desc 此类别使用的文本名称。
 * @default 未命名
 *
 * @param DrawJS:func
 * @text JS：绘制数据
 * @type note
 * @desc 用于确定数据窗口中显示内容的代码。
 * @default ""
 */

/* ----------------------------------------------------------------------------
 * 通用特征集设置
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetSettings:
 *
 * @param General
 * @text 通用
 *
 * @param Enable:eval
 * @text 启用特征集？
 * @parent General
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 是否启用特征集？必须启用才能使特征集对战斗者产生任何影响。
 * @default false
 *
 * @param EnemyNameFmt:str
 * @text 敌人名称格式
 * @parent General
 * @type combo
 * @option [名称] [字母]
 * @option [元素] [名称] [字母]
 * @option [元素] [子元素] [名称] [字母]
 * @option [名称][性别] [字母]
 * @option [种族] [名称][性别] [字母]
 * @option [属性] [名称][性别] [字母]
 * @option [祝福] [名称][性别] [字母]
 * @option [诅咒] [名称][性别] [字母]
 * @option [名称][性别]（[星座]） [字母]
 * @option [变体] [名称][性别] [字母]
 * @option [变体] [性质] [名称][性别] [字母]
 * @option [变体] [性质] [元素] [名称][性别] [字母]
 * @option [属性] [变体] [性质] [元素] [名称][性别] [字母]
 * @option [属性] [变体] [性质] [祝福] [元素] [名称][性别] [字母]
 * @option [属性] [变体] [性质] [诅咒] [元素] [名称][性别] [字母]
 * @desc 特征集对敌人名称产生影响的格式。从列表中选择或自定义。
 * @default [变体] [名称][性别] [字母]
 *
 * @param TraitColumns
 * @text 特征列
 *
 * @param TraitCol1:arraystr
 * @text 列 1 特征
 * @parent TraitColumns
 * @type select[]
 * @option 主要元素
 * @value Element
 * @option 子元素
 * @value SubElement
 * @option 性别
 * @value Gender
 * @option 种族
 * @value Race
 * @option 性质
 * @value Nature
 * @option 属性
 * @value Alignment
 * @option 祝福
 * @value Blessing
 * @option 诅咒
 * @value Curse
 * @option 星座
 * @value Zodiac
 * @option 变体
 * @value Variant
 * @desc 在此列中显示的特征列表。
 * 默认用于“属性”类别。
 * @default ["性别","性质","祝福","星座"]
 *
 * @param TraitCol2:arraystr
 * @text 列 2 特征
 * @parent TraitColumns
 * @type select[]
 * @option 主要元素
 * @value Element
 * @option 子元素
 * @value SubElement
 * @option 性别
 * @value Gender
 * @option 种族
 * @value Race
 * @option 性质
 * @value Nature
 * @option 属性
 * @value Alignment
 * @option 祝福
 * @value Blessing
 * @option 诅咒
 * @value Curse
 * @option 星座
 * @value Zodiac
 * @option 变体
 * @value Variant
 * @desc 在此列中显示的特征列表。
 * 默认用于“属性”类别。
 * @default ["种族","属性","诅咒","变体"]
 *
 */
/* ----------------------------------------------------------------------------
 * 特征集类型设置
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSetType:
 *
 * @param Name:str
 * @text 名称
 * @desc 此特征集类型的名称。
 * @default 未命名
 *
 * @param Label:str
 * @text 标签
 * @desc 在状态菜单中如何标记此特征集类型。可以使用文本代码。
 * @default 未命名
 *
 * @param Visible:eval
 * @text 可见
 * @type boolean
 * @on 可见
 * @off 隐藏
 * @desc 此特征集类型在状态菜单中是否可见？
 * @default true
 *
 * @param RandomizeActor:eval
 * @text 角色随机化？
 * @type boolean
 * @on 随机化
 * @off 默认
 * @desc 在创建角色时，从此列表中随机获取一个特征集？
 * @default false
 *
 * @param RandomizeEnemy:eval
 * @text 敌人随机化？
 * @type boolean
 * @on 随机化
 * @off 默认
 * @desc 在创建敌人时，从此列表中随机获取一个特征集？
 * @default false
 *
 * @param Default:struct
 * @text 默认特征集
 * @type struct<TraitSet>
 * @desc 如果未通过注释标签声明特征集，则使用此特征集作为默认值。
 * @default {}
 *
 * @param List:arraystruct
 * @text 特征集列表
 * @type struct<TraitSet>[]
 * @desc 此特征集类型可用的所有特征集列表。
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * 特征集设置
 * ----------------------------------------------------------------------------
 */
/*~struct~TraitSet:
 *
 * @param Name:str
 * @text 名称
 * @desc 此特征集的名称。也用作引用键。
 * @default 未命名
 *
 * @param Display:str
 * @text 显示文本
 * @desc 在游戏中选择时，特征集的显示文本。允许使用文本代码。
 * @default 未命名
 *
 * @param Description:json
 * @text 帮助描述
 * @type note
 * @desc 如有必要，特征集的帮助描述。
 * @default ""
 *
 * @param FmtText:str
 * @text 格式文本
 * @desc 如果使用此特征集，将添加到敌人名称中的文本。
 * @default 
 *
 * @param RandomValid:eval
 * @text 随机有效？
 * @type boolean
 * @on 有效
 * @off 忽略
 * @desc 此特征集是否有效用于随机选择？
 * @default true
 *
 * @param RandomWeight:num
 * @text 随机权重
 * @type number
 * @desc 如果有效用于随机选择，则此特征集的默认权重。
 * @default 1
 *
 * @param Traits
 * @text 特征
 *
 * @param ElementRate:struct
 * @text 元素比率
 * @parent Traits
 * @type struct<ElementChanges>
 * @desc 此特征集接收的元素伤害比率。
 * 修饰符为乘法。
 * @default {}
 *
 * @param Params:struct
 * @text 基本参数
 * @parent Traits
 * @type struct<Params>
 * @desc 此特征集改变的基本参数率。
 * 修饰符为乘法。
 * @default {}
 *
 * @param XParams:struct
 * @text X参数
 * @parent Traits
 * @type struct<XParams>
 * @desc 此特征集改变的X参数率。
 * 修饰符为加法。
 * @default {}
 *
 * @param SParams:struct
 * @text S参数
 * @parent Traits
 * @type struct<SParams>
 * @desc 此特征集改变的S参数率。
 * 修饰符为乘法。
 * @default {}
 *
 * @param PassiveStates:arraynum
 * @text 被动状态
 * @parent Traits
 * @type state[]
 * @desc 应用于此特征集的被动状态。
 * 需要 VisuMZ_1_SkillsStatesCore 插件。
 * @default []
 *
 * @param Equipment
 * @text 装备
 *
 * @param Wtypes:arraynum
 * @text 武器类型
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc 此特征集可使用的额外武器类型。
 * @default []
 *
 * @param Atypes:arraynum
 * @text 防具类型
 * @parent Equipment
 * @type number[]
 * @min 1
 * @max 99
 * @desc 此特征集可使用的额外防具类型。
 * @default []
 *
 * @param EnemyRewards
 * @text 敌人奖励
 *
 * @param EXPRate:num
 * @text EXP 比率
 * @parent EnemyRewards
 * @desc 带有此特征集的敌人被击败后给予的经验值比率。
 * @default 1.00
 *
 * @param GoldRate:num
 * @text 金钱比率
 * @parent EnemyRewards
 * @desc 带有此特征集的敌人被击败后给予的金钱比率。
 * @default 1.00
 *
 * @param DropRate:num
 * @text 掉落率
 * @parent EnemyRewards
 * @desc 带有此特征集的敌人被击败后给予的掉落率。
 * @default 1.00
 *
 */

/* ----------------------------------------------------------------------------

元素变化
/
/structElementChanges:
*

@param Element1
@text 元素1 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element2
@text 元素2 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element3
@text 元素3 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element4
@text 元素4 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element5
@text 元素5 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element6
@text 元素6 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element7
@text 元素7 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element8
@text 元素8 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element9
@text 元素9 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element10
@text 元素10 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element11
@text 元素11 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element12
@text 元素12 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element13
@text 元素13 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element14
@text 元素14 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element15
@text 元素15 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element16
@text 元素16 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element17
@text 元素17 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element18
@text 元素18 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element19
@text 元素19 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element20
@text 元素20 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element21
@text 元素21 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element22
@text 元素22 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element23
@text 元素23 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element24
@text 元素24 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element25
@text 元素25 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element26
@text 元素26 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element27
@text 元素27 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element28
@text 元素28 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element29
@text 元素29 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element30
@text 元素30 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element31
@text 元素31 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element32
@text 元素32 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element33
@text 元素33 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element34
@text 元素34 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element35
@text 元素35 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element36
@text 元素36 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element37
@text 元素37 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element38
@text 元素38 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element39
@text 元素39 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element40
@text 元素40 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element41
@text 元素41 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element42
@text 元素42 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element43
@text 元素43 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element44
@text 元素44 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element45
@text 元素45 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element46
@text 元素46 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element47
@text 元素47 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element48
@text 元素48 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element49
@text 元素49 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element50
@text 元素50 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element51
@text 元素51 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element52
@text 元素52 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element53
@text 元素53 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element54
@text 元素54 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element55
@text 元素55 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element56
@text 元素56 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element57
@text 元素57 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element58
@text 元素58 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element59
@text 元素59 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element60
@text 元素60 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element61
@text 元素61 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element62
@text 元素62 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element63
@text 元素63 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element64
@text 元素64 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element65
@text 元素65 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element66
@text 元素66 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element67
@text 元素67 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element68
@text 元素68 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element69
@text 元素69 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element70
@text 元素70 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element71
@text 元素71 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element72
@text 元素72 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element73
@text 元素73 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element74
@text 元素74 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element75
@text 元素75 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element76
@text 元素76 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element77
@text 元素77 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element78
@text 元素78 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element79
@text 元素79 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element80
@text 元素80 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element81
@text 元素81 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element82
@text 元素82 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element83
@text 元素83 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element84
@text 元素84 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element85
@text 元素85 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element86
@text 元素86 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element87
@text 元素87 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element88
@text 元素88 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element89
@text 元素89 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element90
@text 元素90 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element91
@text 元素91 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element92
@text 元素92 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element93
@text 元素93 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element94
@text 元素94 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element95
@text 元素95 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element96
@text 元素96 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element97
@text 元素97 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element98
@text 元素98 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
@param Element99
@text 元素99 变化
@desc 数据应用于数据库 > 类型 标签中的此元素。
@default 1.00
*/
/* ----------------------------------------------------------------------------
 * Basic Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~Params:
 *
 * @param Param0:num
 * @text 最大HP比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param1:num
 * @text 最大MP比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param2:num
 * @text 攻击力比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param3:num
 * @text 防御力比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param4:num
 * @text 魔法攻击力比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param5:num
 * @text 魔法防御力比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param6:num
 * @text 敏捷度比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param Param7:num
 * @text 幸运值比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 */

/* ----------------------------------------------------------------------------
 * X Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~XParams:
 *
 * @param XParam0:num
 * @text 命中率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam1:num
 * @text 闪避率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam2:num
 * @text 暴击率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam3:num
 * @text 暴抗率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam4:num
 * @text 魔法闪避率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam5:num
 * @text 魔法反射率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam6:num
 * @text 反击率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam7:num
 * @text 恢复率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam8:num
 * @text 魔法恢复率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 * @param XParam9:num
 * @text 物理反击率
 * @desc 此参数的百分比比率修改。
 * @default 0.00
 *
 */

/* ----------------------------------------------------------------------------
 * S Parameters
 * ----------------------------------------------------------------------------
 */
/*~struct~SParams:
 *
 * @param SParam0:num
 * @text TGR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam1:num
 * @text GRD 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam2:num
 * @text REC 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam3:num
 * @text PHA 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam4:num
 * @text MCR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam5:num
 * @text TCR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam6:num
 * @text PDR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam7:num
 * @text MDR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam8:num
 * @text FDR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 * @param SParam9:num
 * @text EXR 比率
 * @desc 此参数的百分比比率修改。
 * @default 1.00
 *
 */

//=============================================================================

const _0x54e01f = _0x3428; (function (_0x5b41f7, _0x4df4d5) { const _0x46fcb0 = _0x3428, _0x505c3e = _0x5b41f7(); while (!![]) { try { const _0x933600 = -parseInt(_0x46fcb0(0x244)) / (-0x85f + -0xd * 0x53 + 0xc97) * (-parseInt(_0x46fcb0(0x1b0)) / (0x15d1 + 0x9 * 0x9d + 0xd4 * -0x21)) + -parseInt(_0x46fcb0(0x229)) / (-0x298 * 0x5 + -0x15db + 0xb6 * 0x31) * (parseInt(_0x46fcb0(0x253)) / (0xb * -0x1f3 + 0x25a8 + -0x1033)) + parseInt(_0x46fcb0(0x563)) / (0x2 * -0x67 + -0x1341 + 0x1414) + -parseInt(_0x46fcb0(0x38d)) / (-0x3 * -0x9b1 + 0x10a5 + -0x2db2) * (-parseInt(_0x46fcb0(0x3c1)) / (0x631 * 0x4 + 0x1638 + -0x2ef5)) + parseInt(_0x46fcb0(0x12c)) / (0x1 * 0x1841 + -0xe5 + -0x1754) * (parseInt(_0x46fcb0(0x347)) / (-0xb0a * 0x2 + 0x58e + 0x108f)) + -parseInt(_0x46fcb0(0x2f5)) / (-0x77e + -0x46b + 0xbf3) + -parseInt(_0x46fcb0(0x174)) / (-0x1486 + 0xccf + 0x7c2 * 0x1) * (parseInt(_0x46fcb0(0x553)) / (0x19c9 + -0x21f4 + 0x837)); if (_0x933600 === _0x4df4d5) break; else _0x505c3e['push'](_0x505c3e['shift']()); } catch (_0x5751a0) { _0x505c3e['push'](_0x505c3e['shift']()); } } }(_0x1cfe, 0x28ab * 0x2b + -0x31ffc * -0x1 + 0x2 * -0x1c559)); var label = _0x54e01f(0x3a0) + 'tusCore', tier = tier || -0xce1 + -0x3fb * -0x6 + -0xb01, dependencies = [], pluginData = $plugins[_0x54e01f(0x4d9)](function (_0x539be6) { const _0x43de7a = _0x54e01f, _0x52d4c1 = { 'XTaan': function (_0x48e10d, _0x3caf63) { return _0x48e10d + _0x3caf63; } }; return _0x539be6[_0x43de7a(0x14b)] && _0x539be6[_0x43de7a(0x218) + 'n']['includes'](_0x52d4c1[_0x43de7a(0x21a)](_0x52d4c1['XTaan']('[', label), ']')); })[0x49a * -0x6 + 0x2143 + 0x1 * -0x5a7]; VisuMZ[label]['Settings'] = VisuMZ[label][_0x54e01f(0x3b8)] || {}, VisuMZ['ConvertPar' + _0x54e01f(0xf3)] = function (_0x484ff3, _0x1f913e) { const _0x3d6437 = _0x54e01f, _0x1f2177 = { 'Ddwpe': function (_0x44f65c, _0x24ffc3) { return _0x44f65c(_0x24ffc3); }, 'OHopo': _0x3d6437(0x53a), 'Ggwbe': function (_0x3c4fcd, _0xed37c1) { return _0x3c4fcd !== _0xed37c1; }, 'DFQTb': _0x3d6437(0x2e0), 'OBThx': _0x3d6437(0x403), 'XJZix': function (_0x5a39ef, _0x2d18a5) { return _0x5a39ef !== _0x2d18a5; }, 'ONIEK': function (_0x2522b7, _0x334185) { return _0x2522b7(_0x334185); }, 'BhEiv': _0x3d6437(0x4cd), 'RTZYc': _0x3d6437(0x227), 'LXwlk': function (_0x569043, _0x22eaef) { return _0x569043 !== _0x22eaef; }, 'QCVFw': _0x3d6437(0x1f7), 'KrZbf': function (_0x19758e, _0x4d36bd) { return _0x19758e !== _0x4d36bd; }, 'dFHNM': 'FUNC', 'NnGAp': 'return\x200', 'ndKtX': _0x3d6437(0x3d7), 'ZybVk': _0x3d6437(0x11e), 'jzrhN': _0x3d6437(0x3ea), 'FUTiX': function (_0x1673d7, _0x2defdc) { return _0x1673d7 !== _0x2defdc; }, 'RrbCc': _0x3d6437(0x4fb), 'ZoumG': _0x3d6437(0x4a0) + 'T', 'rkyUn': function (_0x45adf9, _0x4175b4) { return _0x45adf9 !== _0x4175b4; } }; for (const _0x9444f1 in _0x1f913e) { if (_0x9444f1[_0x3d6437(0x2af)](/(.*):(.*)/i)) { const _0x78964a = _0x1f2177['Ddwpe'](String, RegExp['$1']), _0x54bf1a = _0x1f2177[_0x3d6437(0x3b9)](String, RegExp['$2'])[_0x3d6437(0x27e) + 'e']()[_0x3d6437(0xef)](); let _0x318bd7, _0x3ec4b2, _0x5e7958; switch (_0x54bf1a) { case _0x1f2177['OHopo']: _0x318bd7 = _0x1f2177[_0x3d6437(0x49b)](_0x1f913e[_0x9444f1], '') ? _0x1f2177[_0x3d6437(0x3b9)](Number, _0x1f913e[_0x9444f1]) : 0x148 + -0x1ec6 + -0x1 * -0x1d7e; break; case _0x1f2177[_0x3d6437(0x293)]: _0x3ec4b2 = _0x1f2177[_0x3d6437(0x49b)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2[_0x3d6437(0x15c)](_0x5de053 => Number(_0x5de053)); break; case _0x1f2177[_0x3d6437(0x4d5)]: _0x318bd7 = _0x1f2177[_0x3d6437(0x43c)](_0x1f913e[_0x9444f1], '') ? _0x1f2177[_0x3d6437(0x226)](eval, _0x1f913e[_0x9444f1]) : null; break; case _0x1f2177[_0x3d6437(0x3d2)]: _0x3ec4b2 = _0x1f2177[_0x3d6437(0x43c)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2[_0x3d6437(0x15c)](_0x53f7c5 => eval(_0x53f7c5)); break; case _0x1f2177['RTZYc']: _0x318bd7 = _0x1f2177[_0x3d6437(0xf2)](_0x1f913e[_0x9444f1], '') ? JSON['parse'](_0x1f913e[_0x9444f1]) : ''; break; case _0x1f2177[_0x3d6437(0x44d)]: _0x3ec4b2 = _0x1f2177[_0x3d6437(0x1ae)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2['map'](_0x11ba40 => JSON[_0x3d6437(0x446)](_0x11ba40)); break; case _0x1f2177[_0x3d6437(0x231)]: _0x318bd7 = _0x1f2177['LXwlk'](_0x1f913e[_0x9444f1], '') ? new Function(JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1])) : new Function(_0x1f2177['NnGAp']); break; case _0x1f2177['ndKtX']: _0x3ec4b2 = _0x1f2177[_0x3d6437(0xf2)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2[_0x3d6437(0x15c)](_0x3ae624 => new Function(JSON[_0x3d6437(0x446)](_0x3ae624))); break; case _0x1f2177[_0x3d6437(0x4b5)]: _0x318bd7 = _0x1f2177['LXwlk'](_0x1f913e[_0x9444f1], '') ? _0x1f2177['ONIEK'](String, _0x1f913e[_0x9444f1]) : ''; break; case _0x1f2177['jzrhN']: _0x3ec4b2 = _0x1f2177[_0x3d6437(0x285)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2['map'](_0x9259c1 => String(_0x9259c1)); break; case _0x1f2177['RrbCc']: _0x5e7958 = _0x1f2177[_0x3d6437(0x49b)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : {}, _0x484ff3[_0x78964a] = {}, VisuMZ[_0x3d6437(0x2ad) + 'ams'](_0x484ff3[_0x78964a], _0x5e7958); continue; case _0x1f2177[_0x3d6437(0x4a3)]: _0x3ec4b2 = _0x1f2177[_0x3d6437(0x1e0)](_0x1f913e[_0x9444f1], '') ? JSON[_0x3d6437(0x446)](_0x1f913e[_0x9444f1]) : [], _0x318bd7 = _0x3ec4b2[_0x3d6437(0x15c)](_0x3d9b14 => VisuMZ['ConvertPar' + _0x3d6437(0xf3)]({}, JSON['parse'](_0x3d9b14))); break; default: continue; }_0x484ff3[_0x78964a] = _0x318bd7; } } return _0x484ff3; }, (_0x591e70 => { const _0x12dd7a = _0x54e01f, _0x445524 = { 'KyDFR': function (_0x50bed5, _0x9895e1) { return _0x50bed5(_0x9895e1); }, 'eVLkb': _0x12dd7a(0xf6) + _0x12dd7a(0xd1) + 'ired\x20plugi' + 'n.\x0aPlease\x20' + 'install\x20%2' + _0x12dd7a(0x497) + _0x12dd7a(0x47d) + 'ager.', 'bHUBk': function (_0x231ab9, _0x1de206) { return _0x231ab9 !== _0x1de206; }, 'WGrzw': function (_0x1e0e55, _0x3fb927) { return _0x1e0e55(_0x3fb927); }, 'hTWSX': _0x12dd7a(0x11f) + _0x12dd7a(0x479) + _0x12dd7a(0x352) + _0x12dd7a(0x180) + _0x12dd7a(0x38c) + _0x12dd7a(0x153) + 'e\x20Plugin\x20M' + 'anager.', 'bVghy': function (_0x2ee500, _0x4c3417) { return _0x2ee500 < _0x4c3417; }, 'VwZRB': _0x12dd7a(0x1c7) + _0x12dd7a(0x1bc) + _0x12dd7a(0x396) + _0x12dd7a(0x4ba) + _0x12dd7a(0x49f) + _0x12dd7a(0x4d0) + '\x20plugin\x20pl' + _0x12dd7a(0x232) + _0x12dd7a(0x298) + '\x20%3\x20plugin' + _0x12dd7a(0x51f) + 'reorder\x20th' + 'e\x20plugin\x20l' + _0x12dd7a(0x149) + _0x12dd7a(0x3a5) + _0x12dd7a(0x391) + _0x12dd7a(0x4da) + 's.' }, _0xd3f837 = _0x591e70[_0x12dd7a(0x4cf)]; for (const _0x325205 of dependencies) { if (!Imported[_0x325205]) { _0x445524[_0x12dd7a(0x529)](alert, _0x445524[_0x12dd7a(0x474)][_0x12dd7a(0x143)](_0xd3f837, _0x325205)), SceneManager['exit'](); break; } } const _0x2c2df7 = _0x591e70['descriptio' + 'n']; if (_0x2c2df7[_0x12dd7a(0x2af)](/\[Version[ ](.*?)\]/i)) { const _0x27894c = _0x445524[_0x12dd7a(0x529)](Number, RegExp['$1']); _0x445524[_0x12dd7a(0x314)](_0x27894c, VisuMZ[label]['version']) && (_0x445524[_0x12dd7a(0x107)](alert, _0x445524[_0x12dd7a(0x16a)]['format'](_0xd3f837, _0x27894c)), SceneManager[_0x12dd7a(0x16e)]()); } if (_0x2c2df7[_0x12dd7a(0x2af)](/\[Tier[ ](\d+)\]/i)) { const _0x4aee6b = _0x445524[_0x12dd7a(0x529)](Number, RegExp['$1']); _0x445524[_0x12dd7a(0x126)](_0x4aee6b, tier) ? (_0x445524[_0x12dd7a(0x529)](alert, _0x445524['VwZRB'][_0x12dd7a(0x143)](_0xd3f837, _0x4aee6b, tier)), SceneManager[_0x12dd7a(0x16e)]()) : tier = Math[_0x12dd7a(0x1b2)](_0x4aee6b, tier); } VisuMZ[_0x12dd7a(0x2ad) + _0x12dd7a(0xf3)](VisuMZ[label][_0x12dd7a(0x3b8)], _0x591e70[_0x12dd7a(0x47b)]); })(pluginData), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData['name'], _0x54e01f(0x290) + _0x54e01f(0x3b1) + _0x54e01f(0x488), _0x827788 => { const _0x5b2fe8 = _0x54e01f, _0x578a2a = { 'PBJEW': _0x5b2fe8(0x2c0) }; VisuMZ[_0x5b2fe8(0x2ad) + _0x5b2fe8(0xf3)](_0x827788, _0x827788); const _0x1bd475 = _0x827788['Step1']; for (const _0x18f4fa of _0x1bd475) { const _0x40ae19 = $gameActors['actor'](_0x18f4fa); if (!_0x40ae19) continue; _0x40ae19['setBiograp' + 'hy'](_0x827788['Biography'][_0x5b2fe8(0x143)](_0x578a2a['PBJEW'][_0x5b2fe8(0x143)](_0x40ae19[_0x5b2fe8(0x30f)]()))); } }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData['name'], _0x54e01f(0x290) + _0x54e01f(0x3b1) + 'Range', _0x5da84c => { const _0x10af90 = _0x54e01f, _0x4724cc = { 'JjVkG': function (_0x2e7dce, _0x2e4606) { return _0x2e7dce >= _0x2e4606; }, 'ulScB': function (_0x1972c1, _0x1e5f97) { return _0x1972c1 >= _0x1e5f97; }, 'FzhvG': function (_0x44d0c8, _0x35aaa2) { return _0x44d0c8(_0x35aaa2); }, 'tLZXR': function (_0x26ddfd, _0x11296f) { return _0x26ddfd + _0x11296f; }, 'KnPgA': function (_0x57e84b, _0x170263) { return _0x57e84b - _0x170263; }, 'BMvkN': _0x10af90(0x2c0) }; VisuMZ[_0x10af90(0x2ad) + 'ams'](_0x5da84c, _0x5da84c); const _0x30f326 = _0x4724cc['JjVkG'](_0x5da84c[_0x10af90(0x268)], _0x5da84c[_0x10af90(0x16b)]) ? _0x5da84c[_0x10af90(0x16b)] : _0x5da84c[_0x10af90(0x268)], _0x1e77b1 = _0x4724cc[_0x10af90(0x2dc)](_0x5da84c[_0x10af90(0x268)], _0x5da84c[_0x10af90(0x16b)]) ? _0x5da84c[_0x10af90(0x268)] : _0x5da84c['Step1Start'], _0x634c2c = _0x4724cc[_0x10af90(0x2d4)](Array, _0x4724cc['tLZXR'](_0x4724cc[_0x10af90(0x2b6)](_0x1e77b1, _0x30f326), 0x818 + 0xdb * -0x3 + -0x586))['fill']()[_0x10af90(0x15c)]((_0x59e1d8, _0xcfe869) => _0x30f326 + _0xcfe869); for (const _0x319442 of _0x634c2c) { const _0x1275a4 = $gameActors[_0x10af90(0x27d)](_0x319442); if (!_0x1275a4) continue; _0x1275a4[_0x10af90(0x152) + 'hy'](_0x5da84c['Biography'][_0x10af90(0x143)](_0x4724cc[_0x10af90(0x46e)][_0x10af90(0x143)](_0x1275a4[_0x10af90(0x30f)]()))); } }), PluginManager['registerCo' + _0x54e01f(0x4ab)](pluginData[_0x54e01f(0x4cf)], _0x54e01f(0x290) + _0x54e01f(0x3b1) + 'JS', _0x20cbc1 => { const _0x49d4b7 = _0x54e01f, _0x50fddf = { 'doIVu': function (_0xbcb22c, _0x32722b) { return _0xbcb22c > _0x32722b; }, 'YMArW': '\x5cN[%1]' }; VisuMZ[_0x49d4b7(0x2ad) + _0x49d4b7(0xf3)](_0x20cbc1, _0x20cbc1); const _0x3f4b95 = _0x20cbc1[_0x49d4b7(0x55d)]; let _0x2c9222 = []; while (_0x50fddf[_0x49d4b7(0x57f)](_0x3f4b95['length'], 0x145 * -0x7 + 0x825 + 0xbe)) { const _0x544917 = _0x3f4b95[_0x49d4b7(0x574)](); Array[_0x49d4b7(0x13d)](_0x544917) ? _0x2c9222 = _0x2c9222[_0x49d4b7(0x1aa)](_0x544917) : _0x2c9222[_0x49d4b7(0x3da)](_0x544917); } for (const _0x53c1a5 of _0x2c9222) { const _0x1c6939 = $gameActors[_0x49d4b7(0x27d)](_0x53c1a5); if (!_0x1c6939) continue; _0x1c6939['setBiograp' + 'hy'](_0x20cbc1['Biography'][_0x49d4b7(0x143)](_0x50fddf[_0x49d4b7(0x1a0)][_0x49d4b7(0x143)](_0x1c6939['actorId']()))); } }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData[_0x54e01f(0x4cf)], _0x54e01f(0x290) + 'eTraitSets' + _0x54e01f(0x488), _0x3c85dd => { const _0x371c4c = _0x54e01f; VisuMZ[_0x371c4c(0x2ad) + _0x371c4c(0xf3)](_0x3c85dd, _0x3c85dd); const _0x4af7ad = _0x3c85dd[_0x371c4c(0x55d)], _0x44ddf6 = Game_BattlerBase[_0x371c4c(0x353)][_0x371c4c(0x36a) + _0x371c4c(0x1ac)](); for (const _0xaa01d3 of _0x4af7ad) { const _0x35f83a = $gameActors['actor'](_0xaa01d3); if (!_0x35f83a) continue; for (const _0x4425af of _0x44ddf6) { if (!_0x3c85dd[_0x4425af]) continue; if (_0x3c85dd[_0x4425af][_0x371c4c(0x2af)](/UNCHANGED/i)) continue; _0x3c85dd[_0x4425af][_0x371c4c(0x2af)](/RANDOM/i) ? _0x35f83a[_0x371c4c(0x28b) + 'omTraitSet'](_0x4425af) : _0x35f83a[_0x371c4c(0x26f) + 't'](_0x4425af, _0x3c85dd[_0x4425af]); } } }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData['name'], _0x54e01f(0x290) + _0x54e01f(0x2e5) + 'Range', _0x611c4e => { const _0x8c5a2 = _0x54e01f, _0x2b417b = { 'maGvx': function (_0x49c046, _0x2c9382) { return _0x49c046 >= _0x2c9382; }, 'DNXcj': function (_0x17aea8, _0x54af63) { return _0x17aea8(_0x54af63); }, 'CFsDS': function (_0x1f143c, _0x2e7e08) { return _0x1f143c + _0x2e7e08; }, 'XKORv': function (_0x37e1d7, _0x40ac53) { return _0x37e1d7 - _0x40ac53; } }; VisuMZ['ConvertPar' + _0x8c5a2(0xf3)](_0x611c4e, _0x611c4e); const _0x4376f3 = _0x2b417b[_0x8c5a2(0x343)](_0x611c4e['Step1End'], _0x611c4e[_0x8c5a2(0x16b)]) ? _0x611c4e['Step1Start'] : _0x611c4e[_0x8c5a2(0x268)], _0x4c5860 = _0x2b417b[_0x8c5a2(0x343)](_0x611c4e[_0x8c5a2(0x268)], _0x611c4e[_0x8c5a2(0x16b)]) ? _0x611c4e[_0x8c5a2(0x268)] : _0x611c4e[_0x8c5a2(0x16b)], _0x5d9932 = _0x2b417b[_0x8c5a2(0x4b6)](Array, _0x2b417b[_0x8c5a2(0x225)](_0x2b417b[_0x8c5a2(0x1f4)](_0x4c5860, _0x4376f3), 0xfb2 * 0x1 + 0x6f * -0x4 + -0x3 * 0x4a7))[_0x8c5a2(0x1c2)]()['map']((_0x5d4d65, _0x25ef73) => _0x4376f3 + _0x25ef73), _0x2e52cf = Game_BattlerBase[_0x8c5a2(0x353)][_0x8c5a2(0x36a) + _0x8c5a2(0x1ac)](); for (const _0x58720d of _0x5d9932) { const _0x4bb1d9 = $gameActors[_0x8c5a2(0x27d)](_0x58720d); if (!_0x4bb1d9) continue; for (const _0x567c6c of _0x2e52cf) { if (!_0x611c4e[_0x567c6c]) continue; if (_0x611c4e[_0x567c6c]['match'](/UNCHANGED/i)) continue; _0x611c4e[_0x567c6c]['match'](/RANDOM/i) ? _0x4bb1d9[_0x8c5a2(0x28b) + _0x8c5a2(0x26e)](_0x567c6c) : _0x4bb1d9[_0x8c5a2(0x26f) + 't'](_0x567c6c, _0x611c4e[_0x567c6c]); } } }), PluginManager[_0x54e01f(0x10c) + 'mmand'](pluginData[_0x54e01f(0x4cf)], 'ActorChang' + 'eTraitSets' + 'JS', _0x15076d => { const _0x47c04f = _0x54e01f, _0x382f97 = { 'skssk': function (_0x238ea0, _0x49f0e9) { return _0x238ea0 > _0x49f0e9; } }; VisuMZ['ConvertPar' + _0x47c04f(0xf3)](_0x15076d, _0x15076d); const _0x126cac = _0x15076d[_0x47c04f(0x55d)]; let _0xd37085 = []; while (_0x382f97['skssk'](_0x126cac['length'], -0x5bf + -0xc + 0x5cb)) { const _0x453f40 = _0x126cac['shift'](); Array[_0x47c04f(0x13d)](_0x453f40) ? _0xd37085 = _0xd37085[_0x47c04f(0x1aa)](_0x453f40) : _0xd37085[_0x47c04f(0x3da)](_0x453f40); } const _0x536f4e = Game_BattlerBase['prototype'][_0x47c04f(0x36a) + _0x47c04f(0x1ac)](); for (const _0x4bd6eb of _0xd37085) { const _0x1c70ee = $gameActors[_0x47c04f(0x27d)](_0x4bd6eb); if (!_0x1c70ee) continue; for (const _0x455c87 of _0x536f4e) { if (!_0x15076d[_0x455c87]) continue; if (_0x15076d[_0x455c87][_0x47c04f(0x2af)](/UNCHANGED/i)) continue; _0x15076d[_0x455c87][_0x47c04f(0x2af)](/RANDOM/i) ? _0x1c70ee['createRand' + _0x47c04f(0x26e)](_0x455c87) : _0x1c70ee[_0x47c04f(0x26f) + 't'](_0x455c87, _0x15076d[_0x455c87]); } } }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData[_0x54e01f(0x4cf)], _0x54e01f(0x166) + _0x54e01f(0x2e5) + _0x54e01f(0x488), _0x5e62f0 => { const _0x38d21d = _0x54e01f; if (!$gameParty[_0x38d21d(0x339)]()) return; VisuMZ['ConvertPar' + _0x38d21d(0xf3)](_0x5e62f0, _0x5e62f0); const _0x371630 = _0x5e62f0[_0x38d21d(0x55d)], _0x37d7da = Game_BattlerBase[_0x38d21d(0x353)][_0x38d21d(0x36a) + _0x38d21d(0x1ac)](); for (const _0x347821 of _0x371630) { const _0x5c6fc2 = $gameTroop[_0x38d21d(0x397)]()[_0x347821]; if (!_0x5c6fc2) continue; for (const _0x35d7f7 of _0x37d7da) { if (!_0x5e62f0[_0x35d7f7]) continue; if (_0x5e62f0[_0x35d7f7][_0x38d21d(0x2af)](/UNCHANGED/i)) continue; _0x5e62f0[_0x35d7f7]['match'](/RANDOM/i) ? _0x5c6fc2[_0x38d21d(0x28b) + _0x38d21d(0x26e)](_0x35d7f7) : _0x5c6fc2[_0x38d21d(0x26f) + 't'](_0x35d7f7, _0x5e62f0[_0x35d7f7]); } } $gameTroop[_0x38d21d(0x4df) + 'emyTraits'](); }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData['name'], _0x54e01f(0x166) + _0x54e01f(0x2e5) + _0x54e01f(0x4e7), _0x4a21c8 => { const _0x2debf0 = _0x54e01f, _0x402626 = { 'Ilwme': function (_0x26b8c4, _0x2f194a) { return _0x26b8c4 >= _0x2f194a; }, 'euzRM': function (_0xc4a10b, _0x499485) { return _0xc4a10b(_0x499485); }, 'biDEJ': function (_0x5e36cf, _0x4aef03) { return _0x5e36cf + _0x4aef03; }, 'kpKIE': function (_0x12e09b, _0x2d5aa6) { return _0x12e09b - _0x2d5aa6; } }; if (!$gameParty[_0x2debf0(0x339)]()) return; VisuMZ[_0x2debf0(0x2ad) + _0x2debf0(0xf3)](_0x4a21c8, _0x4a21c8); const _0x18e263 = _0x402626[_0x2debf0(0x438)](_0x4a21c8[_0x2debf0(0x268)], _0x4a21c8[_0x2debf0(0x16b)]) ? _0x4a21c8['Step1Start'] : _0x4a21c8['Step1End'], _0x267c99 = _0x402626[_0x2debf0(0x438)](_0x4a21c8['Step1End'], _0x4a21c8[_0x2debf0(0x16b)]) ? _0x4a21c8[_0x2debf0(0x268)] : _0x4a21c8[_0x2debf0(0x16b)], _0x486d8d = _0x402626[_0x2debf0(0x515)](Array, _0x402626[_0x2debf0(0x2ee)](_0x402626[_0x2debf0(0x55b)](_0x267c99, _0x18e263), -0xf3f + -0x26ca + 0x360a))[_0x2debf0(0x1c2)]()[_0x2debf0(0x15c)]((_0x5637bc, _0x5d48b6) => _0x18e263 + _0x5d48b6), _0x360a65 = Game_BattlerBase[_0x2debf0(0x353)]['getTraitSe' + 'tKeys'](); for (const _0x370a5c of _0x486d8d) { const _0xc86388 = $gameTroop[_0x2debf0(0x397)]()[_0x370a5c]; if (!_0xc86388) continue; for (const _0x4289cb of _0x360a65) { if (!_0x4a21c8[_0x4289cb]) continue; if (_0x4a21c8[_0x4289cb][_0x2debf0(0x2af)](/UNCHANGED/i)) continue; _0x4a21c8[_0x4289cb][_0x2debf0(0x2af)](/RANDOM/i) ? _0xc86388[_0x2debf0(0x28b) + _0x2debf0(0x26e)](_0x4289cb) : _0xc86388[_0x2debf0(0x26f) + 't'](_0x4289cb, _0x4a21c8[_0x4289cb]); } } $gameTroop[_0x2debf0(0x4df) + _0x2debf0(0x50b)](); }), PluginManager[_0x54e01f(0x10c) + _0x54e01f(0x4ab)](pluginData[_0x54e01f(0x4cf)], 'EnemyChang' + _0x54e01f(0x2e5) + 'JS', _0x52dfae => { const _0x53866d = _0x54e01f, _0x5e3d14 = { 'sDmav': function (_0x477d46, _0x5e7cdb) { return _0x477d46 > _0x5e7cdb; } }; if (!$gameParty['inBattle']()) return; VisuMZ['ConvertPar' + _0x53866d(0xf3)](_0x52dfae, _0x52dfae); const _0x4f2a6b = _0x52dfae[_0x53866d(0x55d)]; let _0x3dcf77 = []; while (_0x5e3d14['sDmav'](_0x4f2a6b['length'], -0x247 * -0x2 + -0x17 * -0x3 + -0x1 * 0x4d3)) { const _0x2fcbec = _0x4f2a6b['shift'](); Array[_0x53866d(0x13d)](_0x2fcbec) ? _0x3dcf77 = _0x3dcf77['concat'](_0x2fcbec) : _0x3dcf77[_0x53866d(0x3da)](_0x2fcbec); } const _0x6e5cbc = Game_BattlerBase[_0x53866d(0x353)][_0x53866d(0x36a) + _0x53866d(0x1ac)](); for (const _0x552248 of _0x3dcf77) { const _0x40f484 = $gameTroop[_0x53866d(0x397)]()[_0x552248]; if (!_0x40f484) continue; for (const _0x3d5386 of _0x6e5cbc) { if (!_0x52dfae[_0x3d5386]) continue; if (_0x52dfae[_0x3d5386][_0x53866d(0x2af)](/UNCHANGED/i)) continue; _0x52dfae[_0x3d5386][_0x53866d(0x2af)](/RANDOM/i) ? _0x40f484[_0x53866d(0x28b) + _0x53866d(0x26e)](_0x3d5386) : _0x40f484[_0x53866d(0x26f) + 't'](_0x3d5386, _0x52dfae[_0x3d5386]); } } $gameTroop['onChangeEn' + 'emyTraits'](); }), VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Scene_Boot' + _0x54e01f(0x1f1) + _0x54e01f(0x2c1)] = Scene_Boot[_0x54e01f(0x353)]['onDatabase' + 'Loaded'], Scene_Boot['prototype'][_0x54e01f(0x334) + _0x54e01f(0x4e3)] = function () { const _0xe63037 = _0x54e01f, _0x3e850a = { 'YgaOS': _0xe63037(0x4ca) + '0' }, _0x4a3515 = _0x3e850a[_0xe63037(0x199)][_0xe63037(0x349)]('|'); let _0x1fd077 = 0x21fa + 0x13bb + -0x35b5; while (!![]) { switch (_0x4a3515[_0x1fd077++]) { case '0': this['process_Vi' + _0xe63037(0x447) + _0xe63037(0x197) + _0xe63037(0xc5) + 'ble_RegExp'](); continue; case '1': this['process_Vi' + _0xe63037(0x447) + 'ntStatusCo' + _0xe63037(0x530)](); continue; case '2': this[_0xe63037(0x2e8) + _0xe63037(0x447) + _0xe63037(0x197) + _0xe63037(0x1b9) + 'ts'](); continue; case '3': this[_0xe63037(0x2e8) + 'suMZ_Eleme' + _0xe63037(0x197) + 're_Battler' + '_RegExp'](); continue; case '4': this[_0xe63037(0x2e8) + _0xe63037(0x447) + 'ntStatusCo' + _0xe63037(0x1fc) + 'ers'](); continue; case '5': VisuMZ['ElementSta' + 'tusCore']['Scene_Boot' + _0xe63037(0x1f1) + 'eLoaded'][_0xe63037(0x3bf)](this); continue; }break; } }, Scene_Boot['prototype'][_0x54e01f(0x2e8) + _0x54e01f(0x447) + _0x54e01f(0x197) + _0x54e01f(0x1fc) + _0x54e01f(0x3e0)] = function () { const _0x5bef1d = _0x54e01f, _0x54d4ff = VisuMZ[_0x5bef1d(0x3a0) + _0x5bef1d(0x122)][_0x5bef1d(0x3b8)]['TraitSetSe' + 'ttings']; Window_StatusData[_0x5bef1d(0x500)] = (_0x54d4ff['TraitCol1'] || Window_StatusData[_0x5bef1d(0x500)])[_0x5bef1d(0x4d9)](_0x5dbab1 => { const _0x3a944e = _0x5bef1d, _0x4cee86 = DataManager[_0x3a944e(0x3f4) + 'pe'](_0x5dbab1); return _0x4cee86 && _0x4cee86[_0x3a944e(0x25a)]; }), Window_StatusData[_0x5bef1d(0x3cf)] = (_0x54d4ff['TraitCol2'] || Window_StatusData[_0x5bef1d(0x3cf)])[_0x5bef1d(0x4d9)](_0x5f24a3 => { const _0x370027 = _0x5bef1d, _0x2e3bf7 = DataManager[_0x370027(0x3f4) + 'pe'](_0x5f24a3); return _0x2e3bf7 && _0x2e3bf7[_0x370027(0x25a)]; }); }, Scene_Boot[_0x54e01f(0x353)][_0x54e01f(0x2e8) + _0x54e01f(0x447) + 'ntStatusCo' + _0x54e01f(0x1b9) + 'ts'] = function () { const _0x26827c = _0x54e01f, _0x48391d = { 'xiDRs': 'DEFAULT' }, _0x16f0be = VisuMZ[_0x26827c(0x3a0) + _0x26827c(0x122)][_0x26827c(0x3b8)], _0x26ee82 = Game_BattlerBase[_0x26827c(0x353)][_0x26827c(0x36a) + _0x26827c(0x1ac)](); DataManager['_traitSets'] = {}; for (const _0x42c549 of _0x26ee82) { const _0x50c60b = _0x42c549[_0x26827c(0x27e) + 'e']()[_0x26827c(0xef)](); DataManager[_0x26827c(0x465)][_0x50c60b] = {}, DataManager['_traitSets'][_0x50c60b][_0x48391d[_0x26827c(0x254)]] = _0x16f0be[_0x42c549]['Default']; const _0x1fe99c = _0x16f0be[_0x42c549][_0x26827c(0x196)][_0x26827c(0x240)][_0x26827c(0x27e) + 'e']()[_0x26827c(0xef)](); DataManager[_0x26827c(0x465)][_0x50c60b][_0x1fe99c] = _0x16f0be[_0x42c549][_0x26827c(0x196)]; const _0x290b85 = _0x16f0be[_0x42c549]['List']; for (const _0x3200d8 of _0x290b85) { const _0x6479e9 = _0x3200d8['Name'][_0x26827c(0x27e) + 'e']()[_0x26827c(0xef)](); DataManager['_traitSets'][_0x50c60b][_0x6479e9] = _0x3200d8; } } }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x537)] = {}, Scene_Boot[_0x54e01f(0x353)][_0x54e01f(0x2e8) + _0x54e01f(0x447) + 'ntStatusCo' + _0x54e01f(0x530)] = function () { const _0x1d0670 = _0x54e01f, _0x4f160a = { 'RganI': _0x1d0670(0x1d4) + _0x1d0670(0x1a5) + _0x1d0670(0x19d) + '4>', 'MMvuu': _0x1d0670(0xf9) + 'LEMENT\x20%2\x20' + '%3:[\x20]%4>', 'fWzIf': _0x1d0670(0x146) + ')', 'Blwje': _0x1d0670(0x1f6) + ')', 'ufXHe': '([\x5c+\x5c-]\x5cd+' + _0x1d0670(0x42e), 'HSesZ': _0x1d0670(0x194) + _0x1d0670(0x4bb), 'wKKVx': _0x1d0670(0x4f8), 'UQANU': _0x1d0670(0x345), 'fiysh': _0x1d0670(0x3c0), 'mIwVY': _0x1d0670(0x4c7), 'SjLFF': _0x1d0670(0x573), 'fmpbq': _0x1d0670(0x3b6), 'INkek': _0x1d0670(0x4e8), 'PfuiY': _0x1d0670(0x2c4), 'heoyH': _0x1d0670(0x204) + 'ECEIVED\x20EL' + _0x1d0670(0xd2) + _0x1d0670(0x52c) + _0x1d0670(0x441), 'DOZnY': function (_0x25d0d1, _0x1ee039) { return _0x25d0d1 < _0x1ee039; }, 'TXsAq': _0x1d0670(0x3a9), 'FsjMq': function (_0x3d08a8, _0x3e2c4a) { return _0x3d08a8 === _0x3e2c4a; }, 'eGqMk': _0x1d0670(0x2de), 'BHtSn': _0x1d0670(0x407) }, _0x4a10c0 = VisuMZ['ElementSta' + _0x1d0670(0x122)][_0x1d0670(0x537)], _0x1ffdeb = $dataSystem[_0x1d0670(0x11d)], _0x281570 = _0x4f160a[_0x1d0670(0x4b3)], _0xaae249 = _0x4f160a[_0x1d0670(0x3d5)], _0x3516f7 = _0x4f160a[_0x1d0670(0x1cb)], _0x29196f = _0x4f160a[_0x1d0670(0x522)], _0x5c9285 = _0x4f160a[_0x1d0670(0x1f3)], _0x29a40a = _0x4f160a[_0x1d0670(0x3f9)], _0x3753b7 = _0x4f160a[_0x1d0670(0x26d)], _0xfdd325 = [_0x4f160a[_0x1d0670(0x14c)], _0x4f160a[_0x1d0670(0x518)]], _0x562fe7 = [_0x4f160a[_0x1d0670(0x324)], _0x4f160a[_0x1d0670(0x46f)], _0x4f160a[_0x1d0670(0x15f)]], _0x20146f = [_0x4f160a[_0x1d0670(0x2a0)], _0x4f160a[_0x1d0670(0x3e6)], 'JS'], _0xedd770 = [_0x5c9285, _0x29a40a, _0x3753b7], _0x380b5d = [_0x3516f7, _0x29196f, _0x3753b7], _0x3cf921 = _0x4f160a[_0x1d0670(0x389)]; _0x4a10c0[_0x1d0670(0x176) + 'r'] = [], _0x4a10c0['EleForceFl' + 't'] = [], _0x4a10c0[_0x1d0670(0x142)] = []; for (let _0xff297b = 0x297 * -0x7 + 0x4 * -0x4fa + -0x5b * -0x6b; _0x4f160a['DOZnY'](_0xff297b, _0x1ffdeb['length']); _0xff297b++) { let _0x212a8b = _0x1ffdeb[_0xff297b][_0x1d0670(0x27e) + 'e']()[_0x1d0670(0xef)](); _0x212a8b = _0x212a8b[_0x1d0670(0x365)](/\x1I\[(\d+)\]/gi, ''), _0x212a8b = _0x212a8b[_0x1d0670(0x365)](/\\I\[(\d+)\]/gi, ''); for (const _0x2f47b6 of _0xfdd325) { for (const _0x1fb60c of _0x562fe7) { for (const _0x4336ba of _0x20146f) { const _0x40856e = _0x4f160a[_0x1d0670(0x1ea)][_0x1d0670(0x143)](_0x2f47b6, _0x1fb60c, _0x4336ba); _0x4a10c0[_0x40856e] = _0x4a10c0[_0x40856e] || []; const _0x3222f8 = _0x4f160a['FsjMq'](_0x2f47b6, _0x4f160a[_0x1d0670(0x14c)]) ? _0x281570 : _0xaae249, _0x16573f = _0x4336ba[_0x1d0670(0x2af)](/JS/i) ? _0x4f160a[_0x1d0670(0x1a1)] : '', _0x277ba3 = _0x4f160a[_0x1d0670(0x485)][_0x1d0670(0x143)](_0x212a8b, _0xff297b), _0x35c629 = _0x1fb60c[_0x1d0670(0x27e) + 'e'](), _0x1d05c2 = _0x1fb60c['match'](/RATE/i) ? _0x380b5d : _0xedd770, _0x3da706 = _0x1d05c2[_0x20146f[_0x1d0670(0x245)](_0x4336ba)]; _0x4a10c0[_0x40856e][_0xff297b] = new RegExp(_0x3222f8[_0x1d0670(0x143)](_0x16573f, _0x277ba3, _0x35c629, _0x3da706), 'i'); } } } _0x4a10c0[_0x1d0670(0x176) + 'r'][_0xff297b] = new RegExp(_0x3cf921[_0x1d0670(0x143)]('', _0x212a8b, _0xff297b, _0x3516f7), 'i'), _0x4a10c0['EleForceFl' + 't'][_0xff297b] = new RegExp(_0x3cf921['format']('', _0x212a8b, _0xff297b, _0x29196f), 'i'), _0x4a10c0['EleForceJS'][_0xff297b] = new RegExp(_0x3cf921[_0x1d0670(0x143)](_0x4f160a[_0x1d0670(0x1a1)], _0x212a8b, _0xff297b, _0x3753b7), 'i'); } }, Scene_Boot[_0x54e01f(0x353)]['process_Vi' + _0x54e01f(0x447) + _0x54e01f(0x197) + _0x54e01f(0x2cc) + '_RegExp'] = function () { const _0x332a12 = _0x54e01f, _0x2c43c1 = { 'mRFcO': _0x332a12(0x121) + _0x332a12(0xd9) + '*)>', 'qWPrm': _0x332a12(0x121) + _0x332a12(0x33a) + _0x332a12(0x3dd), 'jgdQJ': '<%1\x20BATTLE' + _0x332a12(0x2a1) + _0x332a12(0xba) + _0x332a12(0x3d6) + 'ATTLER\x20NAM' + _0x332a12(0x54a), 'iHiKm': _0x332a12(0x121) + _0x332a12(0x483) + _0x332a12(0x211) + _0x332a12(0x3e1) + _0x332a12(0x27c) + '>', 'dLRFF': _0x332a12(0x52e) + _0x332a12(0x51d) + '2', 'MMvLs': _0x332a12(0x117) + _0x332a12(0x138), 'rDtoK': 'BattlerNam' + _0x332a12(0x2b3) + '2', 'momEo': _0x332a12(0x117) + _0x332a12(0x4db) }, _0x12b922 = Game_BattlerBase[_0x332a12(0x353)][_0x332a12(0x36a) + 'tKeys'](), _0x4468b0 = _0x2c43c1[_0x332a12(0x3a3)], _0x47f621 = _0x2c43c1[_0x332a12(0x57a)], _0x3c4f9d = _0x2c43c1['jgdQJ'], _0x18536d = _0x2c43c1[_0x332a12(0x1d3)]; for (const _0x42c76a of _0x12b922) { const _0x21e98a = _0x42c76a[_0x332a12(0x27e) + 'e']()[_0x332a12(0xef)](); for (const _0x15bff3 in DataManager[_0x332a12(0x465)][_0x21e98a]) { const _0x3e0a0d = _0x2c43c1[_0x332a12(0x496)][_0x332a12(0x143)](_0x21e98a, _0x15bff3); VisuMZ[_0x332a12(0x3a0) + _0x332a12(0x122)][_0x332a12(0x537)][_0x3e0a0d] = new RegExp(_0x4468b0[_0x332a12(0x143)](_0x15bff3), 'i'); const _0x456912 = _0x2c43c1[_0x332a12(0x598)]['format'](_0x21e98a, _0x15bff3); VisuMZ[_0x332a12(0x3a0) + _0x332a12(0x122)][_0x332a12(0x537)][_0x456912] = new RegExp(_0x47f621[_0x332a12(0x143)](_0x15bff3), 'i'); const _0x23cf11 = _0x2c43c1[_0x332a12(0x54b)]['format'](_0x21e98a, _0x15bff3); VisuMZ['ElementSta' + _0x332a12(0x122)][_0x332a12(0x537)][_0x23cf11] = new RegExp(_0x3c4f9d[_0x332a12(0x143)](_0x15bff3), 'i'); const _0x488ad7 = _0x2c43c1['momEo'][_0x332a12(0x143)](_0x21e98a, _0x15bff3); VisuMZ['ElementSta' + _0x332a12(0x122)][_0x332a12(0x537)][_0x488ad7] = new RegExp(_0x18536d[_0x332a12(0x143)](_0x15bff3), 'i'); } } }, Scene_Boot[_0x54e01f(0x353)][_0x54e01f(0x2e8) + _0x54e01f(0x447) + _0x54e01f(0x197) + 're_Compati' + 'ble_RegExp'] = function () { const _0x531e35 = _0x54e01f, _0x2e2426 = { 'lVfdN': '<%1\x20SIDEVI' + 'EW\x20BATTLER' + _0x531e35(0x259), 'ZXwym': _0x531e35(0x1e2) + 'EW\x20WEAPON:' + _0x531e35(0x28d), 'QkRrW': _0x531e35(0x1e2) + 'EW\x20IDLE\x20MO' + 'TION:\x20(.*)' + '>', 'rPDdO': '<%1\x20SIDEVI' + _0x531e35(0x236) + _0x531e35(0x388) + 'S]*)\x5cs*<\x5c/' + _0x531e35(0x420) + _0x531e35(0x127) + '>', 'Gvvsn': _0x531e35(0x1e2) + 'EW\x20WEAPONS' + _0x531e35(0x494) + _0x531e35(0x19f) + _0x531e35(0x32b) + _0x531e35(0x41e), 'wsesQ': _0x531e35(0x1e2) + _0x531e35(0x3f8) + _0x531e35(0x27f) + _0x531e35(0x37c) + _0x531e35(0x257) + 'EVIEW\x20IDLE' + _0x531e35(0x38b), 'WYFpg': 'SvBattlerS' + 'olo-%1-%2', 'xeNqI': _0x531e35(0x31c) + _0x531e35(0x4cc), 'hhNHx': _0x531e35(0x599) + _0x531e35(0x56e) + '%2', 'akydx': _0x531e35(0x29d) + 'ass-%1-%2', 'vvNPZ': _0x531e35(0x190) + _0x531e35(0x506), 'HxGvz': _0x531e35(0x599) + _0x531e35(0x35c) + '%2' }, _0x1ab32b = Game_BattlerBase[_0x531e35(0x353)][_0x531e35(0x36a) + _0x531e35(0x1ac)](); if (Imported[_0x531e35(0xd5) + _0x531e35(0x20f)]) { const _0x4b0372 = _0x2e2426[_0x531e35(0x1e3)], _0x2e8227 = _0x2e2426['ZXwym'], _0x2d3bc8 = _0x2e2426['QkRrW'], _0x1ff6da = _0x2e2426['rPDdO'], _0x3b97a7 = _0x2e2426[_0x531e35(0x3a7)], _0x3665c4 = _0x2e2426[_0x531e35(0x50c)]; for (const _0x50e7f1 of _0x1ab32b) { const _0x29de0c = _0x50e7f1['toUpperCas' + 'e']()[_0x531e35(0xef)](); for (const _0x28b246 in DataManager[_0x531e35(0x465)][_0x29de0c]) { const _0x53976b = _0x2e2426[_0x531e35(0x36d)][_0x531e35(0x143)](_0x29de0c, _0x28b246); VisuMZ['ElementSta' + _0x531e35(0x122)][_0x531e35(0x537)][_0x53976b] = new RegExp(_0x4b0372[_0x531e35(0x143)](_0x28b246), 'i'); const _0xfe7c9f = _0x2e2426[_0x531e35(0x536)]['format'](_0x29de0c, _0x28b246); VisuMZ['ElementSta' + _0x531e35(0x122)][_0x531e35(0x537)][_0xfe7c9f] = new RegExp(_0x2e8227[_0x531e35(0x143)](_0x28b246), 'i'); const _0xe2b6c = _0x2e2426[_0x531e35(0x583)][_0x531e35(0x143)](_0x29de0c, _0x28b246); VisuMZ['ElementSta' + 'tusCore'][_0x531e35(0x537)][_0xe2b6c] = new RegExp(_0x2d3bc8[_0x531e35(0x143)](_0x28b246), 'i'); const _0x4e09f0 = _0x2e2426[_0x531e35(0x442)][_0x531e35(0x143)](_0x29de0c, _0x28b246); VisuMZ['ElementSta' + _0x531e35(0x122)]['RegExp'][_0x4e09f0] = new RegExp(_0x1ff6da[_0x531e35(0x143)](_0x28b246), 'i'); const _0xe24156 = _0x2e2426[_0x531e35(0xf5)]['format'](_0x29de0c, _0x28b246); VisuMZ['ElementSta' + _0x531e35(0x122)]['RegExp'][_0xe24156] = new RegExp(_0x3b97a7[_0x531e35(0x143)](_0x28b246), 'i'); const _0x4482f8 = _0x2e2426[_0x531e35(0x551)][_0x531e35(0x143)](_0x29de0c, _0x28b246); VisuMZ[_0x531e35(0x3a0) + _0x531e35(0x122)][_0x531e35(0x537)][_0x4482f8] = new RegExp(_0x3665c4[_0x531e35(0x143)](_0x28b246), 'i'); } } } }, DataManager[_0x54e01f(0x1e7) + _0x54e01f(0xc7)] = function () { const _0x48def7 = _0x54e01f; return VisuMZ['ElementSta' + _0x48def7(0x122)][_0x48def7(0x3b8)]['TraitSetSe' + _0x48def7(0x562)][_0x48def7(0x364)]; }, DataManager['traitSetTy' + 'pe'] = function (_0x42314c) { const _0x5645e0 = _0x54e01f; return VisuMZ['ElementSta' + 'tusCore'][_0x5645e0(0x3b8)][_0x42314c]; }, DataManager[_0x54e01f(0x4a7)] = function (_0xe40e83, _0x362e27) { const _0x1f31d8 = _0x54e01f, _0x6b3cd8 = { 'iCXEL': _0x1f31d8(0x473) }; return _0xe40e83 = _0xe40e83[_0x1f31d8(0x27e) + 'e']()[_0x1f31d8(0xef)](), _0x362e27 = _0x362e27[_0x1f31d8(0x27e) + 'e']()[_0x1f31d8(0xef)](), this['_traitSets'][_0xe40e83][_0x362e27] ? this[_0x1f31d8(0x465)][_0xe40e83][_0x362e27] : this['_traitSets'][_0xe40e83][_0x6b3cd8['iCXEL']]; }, DataManager[_0x54e01f(0x586) + 'etFromNote' + 'tags'] = function (_0x38d5dd, _0x130637) { const _0xfb0b88 = _0x54e01f; if (!_0x130637) return; this[_0xfb0b88(0xe7) + _0xfb0b88(0x4d6) + _0xfb0b88(0xde)](_0x38d5dd, _0x130637), this[_0xfb0b88(0x326) + 'arTraitSet' + 'FromNoteta' + 'gs'](_0x38d5dd, _0x130637), this['makeRandom' + _0xfb0b88(0x1a8) + _0xfb0b88(0x4d6) + 'Notetags'](_0x38d5dd, _0x130637); }, DataManager[_0x54e01f(0x34d) + _0x54e01f(0x48e) + _0x54e01f(0x409)] = function (_0xe22b84) { const _0x3e6f19 = _0x54e01f; return data = _0xe22b84[_0x3e6f19(0x349)](','), data[Math[_0x3e6f19(0x17c)](data[_0x3e6f19(0x49c)])][_0x3e6f19(0xef)](); }, DataManager[_0x54e01f(0xe7) + 'aitSetFrom' + 'Notetags'] = function (_0x5efcdd, _0x2d1ae8) { const _0x26ca67 = _0x54e01f, _0x46ed8e = { 'jzEGW': _0x26ca67(0x512), 'XRyFr': _0x26ca67(0x104), 'qOLSC': 'Gender', 'dRIvD': 'Race', 'JPXrt': _0x26ca67(0x538), 'ZdHsp': _0x26ca67(0x208), 'BnqID': 'Blessing', 'PIFYq': _0x26ca67(0x4a5), 'bhnaL': _0x26ca67(0x25f), 'JZNMi': 'Variant', 'WmQNR': function (_0x431030, _0x29cba5) { return _0x431030(_0x29cba5); }, 'eDjKm': function (_0x14b4a7, _0x24a244) { return _0x14b4a7(_0x24a244); } }, _0x114532 = { 'ELEMENT': _0x46ed8e[_0x26ca67(0xe5)], 'SUBELEMENT': _0x46ed8e[_0x26ca67(0x230)], 'GENDER': _0x46ed8e[_0x26ca67(0x22d)], 'RACE': _0x46ed8e[_0x26ca67(0x3ba)], 'NATURE': _0x46ed8e['JPXrt'], 'ALIGNMENT': _0x46ed8e[_0x26ca67(0x233)], 'BLESSING': _0x46ed8e[_0x26ca67(0x223)], 'CURSE': _0x46ed8e[_0x26ca67(0x184)], 'ZODIAC': _0x46ed8e[_0x26ca67(0xcb)], 'VARIANT': _0x46ed8e[_0x26ca67(0x195)] }, _0x4a770a = _0x2d1ae8[_0x26ca67(0x2a6)]; if (_0x4a770a[_0x26ca67(0x2af)](/<TRAIT SETS>\s*([\s\S]*)\s*<\/TRAIT SETS>/i)) { const _0x3b46e8 = _0x46ed8e[_0x26ca67(0x11b)](String, RegExp['$1'])[_0x26ca67(0x349)](/[\r\n]+/); for (const _0x3aea9f of _0x3b46e8) { if (_0x3aea9f[_0x26ca67(0x2af)](/(.*):[ ](.*)/i)) { const _0x5e5dd4 = _0x46ed8e['eDjKm'](String, RegExp['$1'])[_0x26ca67(0x27e) + 'e']()['trim'](), _0x2099f9 = _0x46ed8e[_0x26ca67(0x120)](String, RegExp['$2']), _0x373e32 = _0x114532[_0x5e5dd4]; _0x373e32 && (_0x5efcdd[_0x373e32] = this[_0x26ca67(0x34d) + _0x26ca67(0x48e) + _0x26ca67(0x409)](_0x2099f9)); } } } }, DataManager[_0x54e01f(0x326) + _0x54e01f(0x344) + _0x54e01f(0x45c) + 'gs'] = function (_0x3e273d, _0x1a652d) { const _0x1534dd = _0x54e01f, _0x3fdfe2 = { 'PWEXK': _0x1534dd(0x512), 'LufIL': function (_0x4cddb0, _0xc4605f) { return _0x4cddb0(_0xc4605f); }, 'ypoQg': _0x1534dd(0x104), 'FpLCh': function (_0x586085, _0x1455da) { return _0x586085(_0x1455da); } }, _0x30ee8c = _0x1a652d[_0x1534dd(0x2a6)], _0x201e55 = { 'Element': /<ELEMENT:[ ](.*)>/i, 'SubElement': /<SUBELEMENT:[ ](.*)>/i, 'Gender': /<GENDER:[ ](.*)>/i, 'Race': /<RACE:[ ](.*)>/i, 'Nature': /<NATURE:[ ](.*)>/i, 'Alignment': /<ALIGNMENT:[ ](.*)>/i, 'Blessing': /<BLESSING:[ ](.*)>/i, 'Curse': /<CURSE:[ ](.*)>/i, 'Zodiac': /<ZODIAC:[ ](.*)>/i, 'Variant': /<VARIANT:[ ](.*)>/i }; for (const _0x32889f in _0x201e55) { const _0x2990d7 = _0x201e55[_0x32889f]; _0x30ee8c[_0x1534dd(0x2af)](_0x2990d7) && (_0x3e273d[_0x32889f] = this['getRandomT' + 'raitSetFro' + 'mString'](RegExp['$1'])); } _0x30ee8c['match'](/<ELEMENT:[ ](.*)\/(.*)>/i) && (_0x3e273d[_0x3fdfe2['PWEXK']] = _0x3fdfe2[_0x1534dd(0x2a4)](String, RegExp['$1'])['trim'](), _0x3e273d[_0x3fdfe2['ypoQg']] = _0x3fdfe2[_0x1534dd(0x578)](String, RegExp['$2'])['trim']()); }, DataManager[_0x54e01f(0x589) + 'SingularTr' + _0x54e01f(0x4d6) + _0x54e01f(0xde)] = function (_0x5dc6c7, _0x3032ea) { const _0xc20c81 = _0x54e01f, _0x14edf9 = { 'AIkIW': function (_0x1aa4ad, _0x18419c) { return _0x1aa4ad(_0x18419c); } }, _0xedd440 = _0x3032ea[_0xc20c81(0x2a6)], _0x26299f = { 'Element': /<RANDOM ELEMENT>\s*([\s\S]*)\s*<\/RANDOM ELEMENT>/i, 'SubElement': /<RANDOM SUBELEMENT>\s*([\s\S]*)\s*<\/RANDOM SUBELEMENT>/i, 'Gender': /<RANDOM GENDER>\s*([\s\S]*)\s*<\/RANDOM GENDER>/i, 'Race': /<RANDOM RACE>\s*([\s\S]*)\s*<\/RANDOM RACE>/i, 'Nature': /<RANDOM NATURE>\s*([\s\S]*)\s*<\/RANDOM NATURE>/i, 'Alignment': /<RANDOM ALIGNMENT>\s*([\s\S]*)\s*<\/RANDOM ALIGNMENT>/i, 'Blessing': /<RANDOM BLESSING>\s*([\s\S]*)\s*<\/RANDOM BLESSING>/i, 'Curse': /<RANDOM CURSE>\s*([\s\S]*)\s*<\/RANDOM CURSE>/i, 'Zodiac': /<RANDOM ZODIAC>\s*([\s\S]*)\s*<\/RANDOM ZODIAC>/i, 'Variant': /<RANDOM VARIANT>\s*([\s\S]*)\s*<\/RANDOM VARIANT>/i }; for (const _0x3d8efa in _0x26299f) { const _0x308f04 = _0x26299f[_0x3d8efa]; if (_0xedd440[_0xc20c81(0x2af)](_0x308f04)) { const _0x1deeb1 = _0x14edf9['AIkIW'](String, RegExp['$1'])[_0xc20c81(0x349)](/[\r\n]+/)[_0xc20c81(0x3f3)](''); _0x5dc6c7[_0x3d8efa] = this[_0xc20c81(0x202) + _0xc20c81(0x19b) + 'a'](_0x1deeb1); } } }, DataManager[_0x54e01f(0x202) + _0x54e01f(0x19b) + 'a'] = function (_0x12be68) { const _0x10829e = _0x54e01f, _0x45683d = { 'IQhkV': function (_0x31a51b, _0x5bbd2b) { return _0x31a51b(_0x5bbd2b); }, 'vSQIj': function (_0x2f87b2, _0x25b78a) { return _0x2f87b2(_0x25b78a); }, 'yEJyT': function (_0x4f1343, _0x5e0732) { return _0x4f1343 !== _0x5e0732; }, 'ivyXD': function (_0x54f9fe, _0x2f7f34) { return _0x54f9fe <= _0x2f7f34; }, 'HuKzT': function (_0x2f8467, _0x162cc4) { return _0x2f8467 * _0x162cc4; } }; let _0x33363d = 0x1bdf + 0x2334 + -0x3f13; const _0x214732 = {}; for (const _0x118d42 of _0x12be68) { if (_0x118d42[_0x10829e(0x2af)](/(.*):[ ](\d+)/i)) { const _0x199362 = _0x45683d[_0x10829e(0x301)](String, RegExp['$1'])['trim'](), _0x344504 = _0x45683d[_0x10829e(0x311)](Number, RegExp['$2']); _0x214732[_0x199362] = _0x344504, _0x33363d += _0x344504; } else { if (_0x118d42[_0x10829e(0x2af)](/(.*):[ ](\d+\.?\d+)/i)) { const _0x487f76 = _0x45683d['IQhkV'](String, RegExp['$1'])[_0x10829e(0xef)](), _0x557d54 = _0x45683d[_0x10829e(0x301)](Number, RegExp['$2']); _0x214732[_0x487f76] = _0x557d54, _0x33363d += _0x557d54; } else _0x45683d[_0x10829e(0x386)](_0x118d42, '') && (_0x214732[_0x118d42] = -0x5 * 0x1bd + 0x4b * 0x2f + 0x1b1 * -0x3, _0x33363d++); } } if (_0x45683d[_0x10829e(0x3d9)](_0x33363d, -0x20 + 0xf29 * 0x1 + -0xf09)) return ''; let _0x927008 = _0x45683d['HuKzT'](Math[_0x10829e(0x305)](), _0x33363d); for (const _0x53861e in _0x214732) { _0x927008 -= _0x214732[_0x53861e]; if (_0x45683d[_0x10829e(0x3d9)](_0x927008, 0x2f9 + 0x21cb + -0x24c4)) return _0x53861e; } return ''; }, DataManager[_0x54e01f(0x34d) + _0x54e01f(0x48e) + 'mList'] = function (_0x4b9a21) { const _0x2bf8a7 = _0x54e01f, _0x4ed205 = { 'Nzumy': function (_0x5c1dca, _0x143ae4) { return _0x5c1dca <= _0x143ae4; }, 'FbVhy': function (_0x28d23e, _0x5d0d22) { return _0x28d23e * _0x5d0d22; } }; let _0x5e8347 = [], _0x4e4115 = -0x219d + -0x59 * -0x59 + -0x24 * -0x13; _0x4b9a21 = _0x4b9a21[_0x2bf8a7(0x27e) + 'e']()['trim'](); const _0x374849 = this['_traitSets'][_0x4b9a21]; for (const _0x14a1c9 in _0x374849) { const _0x375c55 = _0x374849[_0x14a1c9]; _0x375c55[_0x2bf8a7(0x3f2) + 'd'] && (_0x5e8347[_0x2bf8a7(0x3da)](_0x14a1c9), _0x4e4115 += _0x375c55[_0x2bf8a7(0x459) + 'ht']); } if (_0x4ed205[_0x2bf8a7(0x141)](_0x4e4115, -0xb4 * -0x4 + -0x1e3d * 0x1 + -0x1b6d * -0x1)) return ''; let _0x787d81 = _0x4ed205[_0x2bf8a7(0x400)](Math[_0x2bf8a7(0x305)](), _0x4e4115); for (const _0x457201 of _0x5e8347) { _0x787d81 -= _0x374849[_0x457201][_0x2bf8a7(0x459) + 'ht']; if (_0x4ed205['Nzumy'](_0x787d81, -0x1 * -0x164b + 0x1db5 + -0x3400)) return _0x457201; } return ''; }, DataManager[_0x54e01f(0x3a2) + 'IdWithName'] = function (_0x5521d5) { const _0x4819f4 = _0x54e01f; _0x5521d5 = _0x5521d5[_0x4819f4(0x27e) + 'e']()[_0x4819f4(0xef)](), this[_0x4819f4(0x45f) + 's'] = this['_elementID' + 's'] || {}; if (this[_0x4819f4(0x45f) + 's'][_0x5521d5]) return this[_0x4819f4(0x45f) + 's'][_0x5521d5]; let _0x1362b2 = 0x121a * 0x2 + -0x2107 + -0x32c; for (const _0x205168 of $dataSystem[_0x4819f4(0x11d)]) { if (!_0x205168) continue; let _0x6a5e04 = _0x205168[_0x4819f4(0x27e) + 'e'](); _0x6a5e04 = _0x6a5e04[_0x4819f4(0x365)](/\x1I\[(\d+)\]/gi, ''), _0x6a5e04 = _0x6a5e04['replace'](/\\I\[(\d+)\]/gi, ''), this[_0x4819f4(0x45f) + 's'][_0x6a5e04] = _0x1362b2, _0x1362b2++; } return this[_0x4819f4(0x45f) + 's'][_0x5521d5] || -0x63 * 0x22 + 0x15c7 + -0x8a1; }, DataManager[_0x54e01f(0x32a) + _0x54e01f(0x410) + _0x54e01f(0x422)] = function (_0x396bec) { const _0x4237cd = _0x54e01f, _0x591a46 = { 'TSrdE': function (_0x1cef94, _0x35d997) { return _0x1cef94(_0x35d997); } }; let _0x59c832 = []; const _0x528d87 = _0x396bec['note'][_0x4237cd(0x2af)](/<MULTI-ELEMENT:[ ](.*)>/gi); if (_0x528d87) for (const _0x447505 of _0x528d87) { _0x447505[_0x4237cd(0x2af)](/<MULTI-ELEMENT:[ ](.*)>/gi); const _0x505c98 = _0x591a46[_0x4237cd(0x40e)](String, RegExp['$1'])['split'](',')['map'](_0x24717e => _0x24717e[_0x4237cd(0xef)]()); for (const _0xbffa25 of _0x505c98) { const _0x72914c = /^\d+$/[_0x4237cd(0x36f)](_0xbffa25); if (_0x72914c) _0x59c832[_0x4237cd(0x3da)](_0x591a46[_0x4237cd(0x40e)](Number, _0xbffa25)); else { const _0x39dd9b = this[_0x4237cd(0x3a2) + _0x4237cd(0x3c3)](_0xbffa25); if (_0x39dd9b) _0x59c832[_0x4237cd(0x3da)](_0x39dd9b); } } } return _0x59c832; }, TextManager[_0x54e01f(0x172) + _0x54e01f(0x10d)] = VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Settings'][_0x54e01f(0x1b3)][_0x54e01f(0x1dd) + _0x54e01f(0x35b)], TextManager[_0x54e01f(0x172) + _0x54e01f(0x283)] = VisuMZ[_0x54e01f(0x3a0) + 'tusCore'][_0x54e01f(0x3b8)][_0x54e01f(0x1b3)][_0x54e01f(0x464) + _0x54e01f(0x4c3)], TextManager['statusMenu' + _0x54e01f(0x4fc)] = VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Settings'][_0x54e01f(0x1b3)][_0x54e01f(0x383) + _0x54e01f(0x452)], TextManager[_0x54e01f(0x172) + _0x54e01f(0x29a)] = VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3b8)][_0x54e01f(0x1b3)]['VocabDmgDe' + _0x54e01f(0x1bd)], TextManager[_0x54e01f(0x172) + _0x54e01f(0x3c5)] = VisuMZ['ElementSta' + _0x54e01f(0x122)]['Settings'][_0x54e01f(0x1b3)]['VocabStype'], TextManager['statusMenu' + _0x54e01f(0x4e6)] = VisuMZ['ElementSta' + 'tusCore'][_0x54e01f(0x3b8)][_0x54e01f(0x1b3)][_0x54e01f(0x15b)], TextManager[_0x54e01f(0x172) + _0x54e01f(0x593)] = VisuMZ['ElementSta' + 'tusCore']['Settings'][_0x54e01f(0x1b3)]['VocabAtype'], ColorManager[_0x54e01f(0x498)] = function (_0x374267) { const _0x3fc339 = _0x54e01f, _0x9acd1d = { 'pWELp': function (_0x238c8e, _0x519de5) { return _0x238c8e(_0x519de5); }, 'SZbjF': _0x3fc339(0x2ea), 'yDmFr': function (_0x1d2f5c, _0x350bac) { return _0x1d2f5c(_0x350bac); }, 'BaHGy': function (_0x350de3, _0x511a39) { return _0x350de3(_0x511a39); } }; return _0x374267 = _0x9acd1d[_0x3fc339(0x2a9)](String, _0x374267), _0x374267[_0x3fc339(0x2af)](/#(.*)/i) ? _0x9acd1d['SZbjF']['format'](_0x9acd1d[_0x3fc339(0x3f7)](String, RegExp['$1'])) : this[_0x3fc339(0x541)](_0x9acd1d['BaHGy'](Number, _0x374267)); }, VisuMZ[_0x54e01f(0x3a0) + 'tusCore']['Game_Actio' + 'n_clear'] = Game_Action[_0x54e01f(0x353)]['clear'], Game_Action[_0x54e01f(0x353)][_0x54e01f(0x555)] = function () { const _0x3654fc = _0x54e01f; VisuMZ['ElementSta' + _0x3654fc(0x122)]['Game_Actio' + 'n_clear'][_0x3654fc(0x3bf)](this), this[_0x3654fc(0x4c2) + _0x3654fc(0x360)](); }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x4c2) + 'ntChanges'] = function () { const _0x2ca39b = _0x54e01f; this[_0x2ca39b(0x12a) + _0x2ca39b(0x1d7)] = ![], this[_0x2ca39b(0x12a) + _0x2ca39b(0x3ae) + _0x2ca39b(0x1f0)] = [], this[_0x2ca39b(0x12a) + _0x2ca39b(0x145) + _0x2ca39b(0xe0)] = []; }, Game_Action[_0x54e01f(0x353)]['elements'] = function () { const _0x5b29ce = _0x54e01f, _0xb36135 = { 'VONuR': function (_0x3ce022, _0xefbee7) { return _0x3ce022 > _0xefbee7; }, 'OgSiB': function (_0x1b6b3f, _0x5e1254) { return _0x1b6b3f < _0x5e1254; } }; if (!this['item']()) return []; if (this[_0x5b29ce(0x1c9)]()['isElementN' + _0x5b29ce(0x502)]()) return []; if (this['_battleCor' + _0x5b29ce(0x1d7)]) return []; if (_0xb36135['VONuR'](this[_0x5b29ce(0x12a) + 'eForcedEle' + _0x5b29ce(0x1f0)][_0x5b29ce(0x49c)], -0x15f * -0x1 + 0xcec + -0xe4b)) return this[_0x5b29ce(0x12a) + _0x5b29ce(0x3ae) + 'ments']; const _0x5a6d00 = this['subject']()[_0x5b29ce(0x3cd) + _0x5b29ce(0x24b) + 'nt'](); if (_0xb36135['VONuR'](_0x5a6d00[_0x5b29ce(0x49c)], 0x1b3d + -0x936 + -0x1207)) return _0x5a6d00; let _0x173596 = []; const _0x37c24a = this[_0x5b29ce(0x42b)]()[_0x5b29ce(0x340)][_0x5b29ce(0xc1)]; return _0xb36135[_0x5b29ce(0x33f)](_0x37c24a, -0x1 * -0xabb + 0xbc * 0x14 + 0x196b * -0x1) ? _0x173596 = _0x173596[_0x5b29ce(0x1aa)](this['subject']()[_0x5b29ce(0x50a) + _0x5b29ce(0xe0)]()) : _0x173596[_0x5b29ce(0x3da)](_0x37c24a), _0x173596 = _0x173596[_0x5b29ce(0x1aa)](this[_0x5b29ce(0x12a) + 'eAddedElem' + _0x5b29ce(0xe0)]), _0x173596 = _0x173596[_0x5b29ce(0x1aa)](DataManager['getActionO' + _0x5b29ce(0x410) + _0x5b29ce(0x422)](this['item']())), _0x173596[_0x5b29ce(0x4d9)]((_0x597f47, _0x1ebcff, _0x2a5c72) => _0x2a5c72['indexOf'](_0x597f47) === _0x1ebcff); }, VisuMZ[_0x54e01f(0x3a0) + 'tusCore']['Game_Actio' + _0x54e01f(0x4d4)] = Game_Action['prototype'][_0x54e01f(0x58c)], Game_Action[_0x54e01f(0x353)][_0x54e01f(0x58c)] = function (_0x16c45b) { const _0x40f24c = _0x54e01f, _0x4e2dfa = { 'ygOxk': function (_0x5a87ef, _0x25c8e1) { return _0x5a87ef > _0x25c8e1; } }; if (this[_0x40f24c(0x16c) + _0x40f24c(0x187)]()) return -0x6c9 + 0x2cd * -0x3 + 0xf30; const _0x1fb98a = _0x16c45b[_0x40f24c(0x45b) + 'edElements'](); if (_0x4e2dfa[_0x40f24c(0x509)](this[_0x40f24c(0x11d)]()[_0x40f24c(0x4d9)](_0x406103 => _0x1fb98a[_0x40f24c(0x4c6)](_0x406103))['length'], -0x1c98 + -0x20b * -0x1 + -0x7 * -0x3cb)) { const _0x204c91 = this['subject']() ? this[_0x40f24c(0x1c9)]()['getPierced' + _0x40f24c(0x1d5)]() : []; if (_0x1fb98a['some'](_0x1b1b04 => _0x204c91[_0x40f24c(0x4c6)](_0x1b1b04))) return -0x4f * 0x1f + -0x6b * -0x36 + -0xd01; if (this[_0x40f24c(0x1d1) + _0x40f24c(0xd8) + _0x40f24c(0x128)]()) return -0x1 * -0xdc9 + 0xa * -0xe3 + 0x4eb * -0x1; return -0x258b + -0x2008 + 0x124 * 0x3d; } return VisuMZ[_0x40f24c(0x3a0) + _0x40f24c(0x122)]['Game_Actio' + _0x40f24c(0x4d4)][_0x40f24c(0x3bf)](this, _0x16c45b); }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x379) + _0x54e01f(0x50f)] = function (_0x275ef2) { const _0x177cbf = _0x54e01f; let _0x3a6277 = VisuMZ[_0x177cbf(0x3a0) + _0x177cbf(0x122)]['Settings'][_0x177cbf(0x33d) + 'es'][_0x177cbf(0x275) + _0x177cbf(0x371)][_0x177cbf(0x3bf)](this, _0x275ef2); const _0x25e2b3 = this[_0x177cbf(0x1c9)]() ? this[_0x177cbf(0x1c9)]()[_0x177cbf(0x368) + _0x177cbf(0x1d5)]() : []; return this[_0x177cbf(0x11d)]()['some'](_0x442e15 => _0x25e2b3[_0x177cbf(0x4c6)](_0x442e15)) && (_0x3a6277 = Math[_0x177cbf(0x1b2)](-0x121f * -0x1 + -0x2168 + 0xf4a, _0x3a6277)), this[_0x177cbf(0x16c) + _0x177cbf(0x187)]() && (_0x3a6277 = Math['max'](0xfdd + 0x5e + -0x1 * 0x103a, _0x3a6277)), _0x3a6277; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x487) + _0x54e01f(0x3dc) + 'e'] = function (_0x1d568f, _0x197e41) { const _0x11a716 = _0x54e01f, _0x34f376 = { 'Zlthn': 'min', 'dehdV': _0x11a716(0x4a6), 'TJBQC': 'additive', 'NwdcB': _0x11a716(0x38a) }, _0x287074 = this[_0x11a716(0x4f5) + _0x11a716(0x3b5)](); switch (_0x287074) { case _0x34f376['Zlthn']: return this[_0x11a716(0x2ba) + 'nRate'](_0x1d568f, _0x197e41); break; case _0x34f376['dehdV']: return this['elementsRa' + 'teProduct'](_0x1d568f, _0x197e41); break; case _0x34f376[_0x11a716(0x15d)]: return this[_0x11a716(0x200) + _0x11a716(0x582)](_0x1d568f, _0x197e41); break; case _0x34f376[_0x11a716(0x3a4)]: return this[_0x11a716(0x10b) + _0x11a716(0x4ad)](_0x1d568f, _0x197e41); break; default: return this[_0x11a716(0x248) + _0x11a716(0x3c7)](_0x1d568f, _0x197e41); break; } }, Game_Action[_0x54e01f(0x353)]['elementRat' + _0x54e01f(0x3b5)] = function () { const _0xe14745 = _0x54e01f, _0x2848d0 = { 'WWtTv': function (_0x4499bc, _0x223962) { return _0x4499bc(_0x223962); }, 'NjZXa': _0xe14745(0x1b2), 'pdLEW': 'maximum', 'WUUjB': _0xe14745(0xf7), 'hcjNe': _0xe14745(0x1db), 'YUsnq': _0xe14745(0x2f7), 'SPDyR': _0xe14745(0x2b7), 'QKfVj': _0xe14745(0x4a6), 'ZCzeZ': _0xe14745(0x228) + _0xe14745(0x3f5), 'HkiuT': 'product', 'tsKgG': _0xe14745(0x1c8), 'RZMtn': _0xe14745(0x45d), 'YESHj': _0xe14745(0x112), 'hTSGy': 'average', 'RPqcZ': _0xe14745(0x35e) }; if (this['item']()[_0xe14745(0x2a6)]['match'](/<MULTI-ELEMENT RULE:[ ](.*)>/i)) { const _0x321733 = _0x2848d0[_0xe14745(0x336)](String, RegExp['$1'])['trim']()[_0xe14745(0x4f4) + 'e'](); switch (_0x321733) { case _0x2848d0[_0xe14745(0x354)]: case _0x2848d0[_0xe14745(0x22b)]: case _0x2848d0[_0xe14745(0x3bd)]: return _0x2848d0[_0xe14745(0x354)]; break; case _0x2848d0[_0xe14745(0xeb)]: case _0x2848d0[_0xe14745(0x4bd)]: case _0x2848d0[_0xe14745(0x51b)]: return _0x2848d0[_0xe14745(0xeb)]; break; case _0x2848d0[_0xe14745(0x4bc)]: case _0x2848d0[_0xe14745(0x472)]: case _0x2848d0[_0xe14745(0x105)]: return _0x2848d0[_0xe14745(0x4bc)]; break; case _0x2848d0[_0xe14745(0xc9)]: case _0x2848d0[_0xe14745(0xcc)]: case _0x2848d0[_0xe14745(0x3ce)]: return _0x2848d0[_0xe14745(0xc9)]; break; case _0x2848d0['hTSGy']: case _0x2848d0[_0xe14745(0x390)]: return _0x2848d0[_0xe14745(0x2d0)]; break; } } return VisuMZ[_0xe14745(0x3a0) + _0xe14745(0x122)][_0xe14745(0x3b8)]['ElementRul' + 'es']['MultiRule']; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x248) + 'xRate'] = function (_0x1c55d9, _0xd48bf8) { const _0x1bc641 = _0x54e01f, _0x5ce8cc = { 'EZbas': function (_0x13ae96, _0x268715) { return _0x13ae96 > _0x268715; }, 'jAIeo': function (_0x15356e, _0x5e3096) { return _0x15356e * _0x5e3096; } }; if (_0x5ce8cc[_0x1bc641(0x18a)](_0xd48bf8[_0x1bc641(0x49c)], 0x17 * 0x182 + -0x26d6 + 0x428)) { if (VisuMZ[_0x1bc641(0x3a0) + _0x1bc641(0x122)][_0x1bc641(0x3b8)][_0x1bc641(0x33d) + 'es'][_0x1bc641(0x31e) + _0x1bc641(0x2f1)]) return VisuMZ[_0x1bc641(0x3a0) + _0x1bc641(0x122)]['Settings'][_0x1bc641(0x33d) + 'es'][_0x1bc641(0x31e) + _0x1bc641(0x2f1)]['call'](this, _0x1c55d9, _0xd48bf8); const _0x320f44 = this['isRecover']() ? [] : _0x1c55d9[_0x1bc641(0x3c8) + _0x1bc641(0x528)](); let _0x1e435d = -(-0x1a2 * 0x1 + -0x40e + 0x998); for (const _0x3a2d5c of _0xd48bf8) { const _0x5619b0 = _0x320f44[_0x1bc641(0x4c6)](_0x3a2d5c) ? -(0x167 * 0x8 + 0x19 * -0xca + 0x883) : -0x1e89 + -0x19 * 0xe + 0x4 * 0x7fa; _0x1e435d = Math['max'](_0x1e435d, _0x5ce8cc[_0x1bc641(0x56d)](_0x1c55d9[_0x1bc641(0x4f5) + 'e'](_0x3a2d5c), _0x5619b0)); } return _0x1e435d; } else return -0x1277 + 0x1 * -0x20d2 + 0x5 * 0xa42; }, Game_Action['prototype'][_0x54e01f(0x2ba) + _0x54e01f(0x554)] = function (_0x29dbaa, _0x39381d) { const _0x45cdc2 = _0x54e01f, _0xfca68d = { 'gyRBa': function (_0x37e4e1, _0x3834e8) { return _0x37e4e1 > _0x3834e8; } }; return _0xfca68d[_0x45cdc2(0x32d)](_0x39381d[_0x45cdc2(0x49c)], 0xb2 * 0x1 + 0x1290 * 0x2 + -0x25d2) ? VisuMZ[_0x45cdc2(0x3a0) + _0x45cdc2(0x122)][_0x45cdc2(0x3b8)][_0x45cdc2(0x33d) + 'es']['RuleMinCal' + 'cJS'][_0x45cdc2(0x3bf)](this, _0x29dbaa, _0x39381d) : 0xda2 + 0x49 * 0x13 + -0x986 * 0x2; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x200) + _0x54e01f(0x525)] = function (_0x464e1f, _0x166dcb) { const _0xf4ceef = _0x54e01f, _0x574cd9 = { 'UgcIF': function (_0x379db3, _0x12cef7) { return _0x379db3 > _0x12cef7; } }; return _0x574cd9[_0xf4ceef(0x4ae)](_0x166dcb['length'], -0x14 * -0x17d + 0x1f67 * -0x1 + 0x1a3) ? VisuMZ[_0xf4ceef(0x3a0) + _0xf4ceef(0x122)][_0xf4ceef(0x3b8)][_0xf4ceef(0x33d) + 'es']['RuleMultip' + 'lyCalcJS'][_0xf4ceef(0x3bf)](this, _0x464e1f, _0x166dcb) : 0x120a * -0x2 + 0x182d + 0xbe8; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x200) + _0x54e01f(0x582)] = function (_0x11a28a, _0x25cca9) { const _0x1f4036 = _0x54e01f, _0x51bd60 = { 'PCFgP': function (_0x3aff2c, _0x144d3e) { return _0x3aff2c > _0x144d3e; } }; return _0x51bd60[_0x1f4036(0x235)](_0x25cca9[_0x1f4036(0x49c)], 0x1ee9 + -0x21 * -0x36 + -0x25df) ? VisuMZ['ElementSta' + _0x1f4036(0x122)][_0x1f4036(0x3b8)][_0x1f4036(0x33d) + 'es'][_0x1f4036(0xdc) + _0x1f4036(0x367)]['call'](this, _0x11a28a, _0x25cca9) : -0x1e50 + 0x245 * -0xf + 0x405c; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x10b) + _0x54e01f(0x4ad)] = function (_0x5e38a4, _0x160786) { const _0x4289c2 = _0x54e01f, _0x5e7b40 = { 'cnZkx': function (_0x378e97, _0x33e425) { return _0x378e97 > _0x33e425; } }; return _0x5e7b40[_0x4289c2(0x2e9)](_0x160786['length'], -0x1 * -0xbcf + 0x1 * 0x934 + -0x1503) ? VisuMZ['ElementSta' + _0x4289c2(0x122)][_0x4289c2(0x3b8)][_0x4289c2(0x33d) + 'es'][_0x4289c2(0x47f) + _0x4289c2(0x193)][_0x4289c2(0x3bf)](this, _0x5e38a4, _0x160786) : -0x3a2 + 0x1 * 0x1393 + -0xff0; }, Game_Action['prototype'][_0x54e01f(0x58b) + _0x54e01f(0x42d) + _0x54e01f(0x481)] = function (_0x2ed1b3, _0x2d79ac) { const _0x1c86da = _0x54e01f, _0x5c6134 = { 'mIImm': function (_0x519feb, _0x62a389) { return _0x519feb <= _0x62a389; } }; if (_0x5c6134[_0x1c86da(0x1ba)](_0x2d79ac['length'], -0x3 * -0x499 + 0x142 + -0xf0d)) return 0xc03 + 0x1 * -0x1bef + -0x7f6 * -0x2; return _0x2d79ac[_0x1c86da(0x1ef)]((_0x52ff62, _0x4196fe) => _0x52ff62 + this[_0x1c86da(0x1c9)]()[_0x1c86da(0x12e) + _0x1c86da(0x222)](_0x4196fe), -0x1f99 + 0x2275 + -0x2dc); }, Game_Action[_0x54e01f(0x353)]['calcUserEl' + _0x54e01f(0x42d) + _0x54e01f(0x3d0)] = function (_0x1f5c57, _0xe9d1cb) { const _0x2942a7 = _0x54e01f, _0x2bd6f4 = { 'vYIfT': function (_0x2e6c36, _0x3ea624) { return _0x2e6c36 <= _0x3ea624; } }; if (_0x2bd6f4[_0x2942a7(0x3f0)](_0xe9d1cb[_0x2942a7(0x49c)], 0x97f + 0x17a0 + -0x211f)) return 0x1e77 * 0x1 + 0x1 * -0x2570 + -0x6fa * -0x1; return _0xe9d1cb[_0x2942a7(0x1ef)]((_0x4d020a, _0x531a6c) => _0x4d020a * this[_0x2942a7(0x1c9)]()[_0x2942a7(0x12e) + 'ementRate'](_0x531a6c), -0x96b + 0xee * -0x14 + 0x1c04); }, Game_Action[_0x54e01f(0x353)]['calcUserEl' + _0x54e01f(0x42d) + _0x54e01f(0x3e8)] = function (_0x144009, _0x20a297) { const _0x39ad2a = _0x54e01f, _0x131030 = { 'jXOEm': function (_0x28881e, _0x7c1c2d) { return _0x28881e <= _0x7c1c2d; } }; if (_0x131030[_0x39ad2a(0x52b)](_0x20a297[_0x39ad2a(0x49c)], -0x2 * 0x799 + -0xd * 0xa9 + -0x17c7 * -0x1)) return -0x268b + -0x1b * 0x11c + 0x447f; return _0x20a297[_0x39ad2a(0x1ef)]((_0x558708, _0x1ef555) => _0x558708 + this['subject']()[_0x39ad2a(0x12e) + _0x39ad2a(0x16d)](_0x1ef555), 0xe83 + -0x180e + 0x98b); }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x1d1) + _0x54e01f(0xd8) + _0x54e01f(0x128)] = function () { const _0x233be9 = _0x54e01f; if (!this[_0x233be9(0x42b)]()) return ![]; if (!this[_0x233be9(0x42b)]()[_0x233be9(0x2a6)]) return ![]; return this[_0x233be9(0x42b)]()[_0x233be9(0x2a6)][_0x233be9(0x2af)](/<BYPASS ELEMENT REFLECT>/i); }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x16c) + _0x54e01f(0x187)] = function () { const _0x384aae = _0x54e01f; if (!this['item']()) return ![]; if (!this[_0x384aae(0x42b)]()[_0x384aae(0x2a6)]) return ![]; return this['item']()[_0x384aae(0x2a6)][_0x384aae(0x2af)](/<(?:ELEMENT |)PIERCE>/i); }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x1bf) + _0x54e01f(0x402)] = Game_Action[_0x54e01f(0x353)][_0x54e01f(0x429)], Game_Action['prototype']['itemHit'] = function (_0x5f5880) { const _0x3a08fc = _0x54e01f, _0x515408 = { 'FsSpX': function (_0x1d45f5, _0x3d9832) { return _0x1d45f5 / _0x3d9832; }, 'vlEIc': function (_0x239d79, _0x54aba8) { return _0x239d79(_0x54aba8); } }; let _0x5dc298 = VisuMZ[_0x3a08fc(0x3a0) + 'tusCore'][_0x3a08fc(0x1bf) + _0x3a08fc(0x402)]['call'](this, _0x5f5880); if (Imported[_0x3a08fc(0xd5) + _0x3a08fc(0x20f)]) { const _0x3449ce = this[_0x3a08fc(0x42b)]()['note'] || ''; if (_0x3449ce[_0x3a08fc(0x2af)](/<ALWAYS HIT>/i)) return 0x20cf * -0x1 + 0xbfb + -0x14d5 * -0x1; if (_0x3449ce[_0x3a08fc(0x2af)](/<ALWAYS HIT RATE: (\d+)([%％])>/i)) return _0x515408[_0x3a08fc(0x24d)](_0x515408['vlEIc'](Number, RegExp['$1']), 0x22a1 + 0xb53 * 0x3 + -0x4436); } return _0x5dc298 *= this[_0x3a08fc(0x49a) + 'teMultipli' + _0x3a08fc(0x318)](_0x5f5880), _0x5dc298 *= this[_0x3a08fc(0x1c9)]()[_0x3a08fc(0x49a) + _0x3a08fc(0x32e) + _0x3a08fc(0x318)](_0x5f5880), _0x5dc298 += this['traitHitPl' + _0x3a08fc(0x40c) + _0x3a08fc(0x318)](_0x5f5880), _0x5dc298 += this[_0x3a08fc(0x1c9)]()[_0x3a08fc(0x111) + _0x3a08fc(0x40c) + _0x3a08fc(0x318)](_0x5f5880), _0x5dc298; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x1bf) + 'n_itemCri'] = Game_Action[_0x54e01f(0x353)][_0x54e01f(0x535)], Game_Action[_0x54e01f(0x353)]['itemCri'] = function (_0x303d54) { const _0x487530 = _0x54e01f; let _0x30c2ee = VisuMZ[_0x487530(0x3a0) + _0x487530(0x122)]['Game_Actio' + _0x487530(0x46a)][_0x487530(0x3bf)](this, _0x303d54); if (!this[_0x487530(0x42b)]()['damage'][_0x487530(0x13a)]) return _0x30c2ee; if (Imported[_0x487530(0xd5) + _0x487530(0x20f)]) { const _0x2c6dd9 = this[_0x487530(0x42b)]()['note'] || ''; if (_0x2c6dd9[_0x487530(0x2af)](/<ALWAYS CRITICAL>/i)) return 0x1 * -0x1124 + -0x4db + 0x1600; } return _0x30c2ee *= this[_0x487530(0x1ad) + 'calRateMul' + _0x487530(0x272)](_0x303d54), _0x30c2ee *= this[_0x487530(0x1c9)]()[_0x487530(0x1ad) + _0x487530(0x2ae) + _0x487530(0x272)](_0x303d54), _0x30c2ee += this[_0x487530(0x1ad) + _0x487530(0x22e) + _0x487530(0x272)](_0x303d54), _0x30c2ee += this[_0x487530(0x1c9)]()[_0x487530(0x1ad) + _0x487530(0x22e) + 'tipliersVs'](_0x303d54), _0x30c2ee; }, VisuMZ['ElementSta' + _0x54e01f(0x122)]['Game_Actio' + _0x54e01f(0xfb) + 'amage'] = Game_Action[_0x54e01f(0x353)][_0x54e01f(0x3d8) + _0x54e01f(0x273)], Game_Action[_0x54e01f(0x353)][_0x54e01f(0x3d8) + 'age'] = function (_0x381e78, _0x30e86f) { const _0x34ee01 = _0x54e01f, _0x45bad6 = { 'mmAlT': function (_0x3a92e6, _0x3fa12d) { return _0x3a92e6 > _0x3fa12d; }, 'qHtGn': function (_0x34ee12, _0x10e296) { return _0x34ee12 < _0x10e296; } }; if (_0x45bad6[_0x34ee01(0x424)](_0x30e86f, -0x2328 + 0x12b2 + 0x1076)) _0x30e86f *= this[_0x34ee01(0x207) + _0x34ee01(0x585) + 's'](_0x381e78), _0x30e86f *= this[_0x34ee01(0x1c9)]()[_0x34ee01(0x207) + _0x34ee01(0x585) + 's'](_0x381e78), _0x30e86f = Math[_0x34ee01(0x322)](_0x30e86f); else _0x45bad6['qHtGn'](_0x30e86f, -0x3ef * 0x8 + -0x3 * -0x99f + -0x17 * -0x1d) && (_0x30e86f *= this[_0x34ee01(0x1d8) + _0x34ee01(0x29b) + 'Vs'](_0x381e78), _0x30e86f *= this[_0x34ee01(0x1c9)]()[_0x34ee01(0x1d8) + _0x34ee01(0x29b) + 'Vs'](_0x381e78), _0x30e86f = Math[_0x34ee01(0x322)](_0x30e86f)); return VisuMZ[_0x34ee01(0x3a0) + _0x34ee01(0x122)]['Game_Actio' + 'n_executeD' + _0x34ee01(0x261)][_0x34ee01(0x3bf)](this, _0x381e78, _0x30e86f); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['TraitCheck' + _0x54e01f(0x219) + 'e'] = function (_0x429792, _0x5b8571, _0x4e2576) { const _0x293b0a = _0x54e01f, _0xf4ec04 = { 'RUtTp': function (_0x4855d1, _0x24a55e) { return _0x4855d1(_0x24a55e); }, 'pAqLQ': function (_0x5069d5, _0x15927a) { return _0x5069d5 * _0x15927a; }, 'PvrJX': function (_0x14c755, _0x30c84c) { return _0x14c755(_0x30c84c); } }; let _0x301c13 = 0x9d3 + 0xd * -0x223 + 0x11f5; if (!_0x5b8571) return _0x301c13; const _0xed145b = _0x5b8571['note'] || '', _0x1979c5 = _0xed145b['match'](_0x4e2576); if (_0x1979c5) for (const _0x27e8ae of _0x1979c5) { _0x27e8ae[_0x293b0a(0x2af)](_0x4e2576); const _0x54881d = _0xf4ec04[_0x293b0a(0x476)](String, RegExp['$1']), _0xc6bf27 = _0xf4ec04[_0x293b0a(0x20e)](_0xf4ec04[_0x293b0a(0x425)](Number, RegExp['$2']), 0x1618 + 0x264e + -0x1422 * 0x3 + 0.01); _0x429792[_0x293b0a(0x4a9) + 't'](_0x54881d) && (_0x301c13 *= _0xc6bf27); } return _0x301c13; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['TraitCheck' + 'NotetagPlu' + 's'] = function (_0x7390e3, _0x78a66f, _0x1c58a7) { const _0x552aa6 = _0x54e01f, _0xec564b = { 'aptNE': function (_0x235a4e, _0x3c24b1) { return _0x235a4e(_0x3c24b1); }, 'hjbnN': function (_0x10e35a, _0x46e96f) { return _0x10e35a * _0x46e96f; }, 'dZwrQ': function (_0x13f2db, _0x53f26c) { return _0x13f2db(_0x53f26c); } }; let _0x5e540e = 0x1562 + -0xb71 + -0x9f1; if (!_0x78a66f) return _0x5e540e; const _0x11ab0b = _0x78a66f[_0x552aa6(0x2a6)] || '', _0x2b5550 = _0x11ab0b['match'](_0x1c58a7); if (_0x2b5550) for (const _0x3b050b of _0x2b5550) { _0x3b050b['match'](_0x1c58a7); const _0x7565b9 = _0xec564b[_0x552aa6(0x26c)](String, RegExp['$1']), _0x9a37d1 = _0xec564b[_0x552aa6(0x357)](_0xec564b[_0x552aa6(0x3de)](Number, RegExp['$2']), 0x22bd * 0x1 + -0x1 * 0x149b + -0xe22 + 0.01); _0x7390e3[_0x552aa6(0x4a9) + 't'](_0x7565b9) && (_0x5e540e += _0x9a37d1); } return _0x5e540e; }, Game_Action[_0x54e01f(0x353)]['traitDmgMu' + _0x54e01f(0x585) + 's'] = function (_0x8300db) { const _0x3e9ae5 = _0x54e01f; let _0x3f08cc = -0x74 * 0x17 + -0xe * -0x121 + -0x561; if (!_0x8300db) return _0x3f08cc; const _0x5a9547 = /<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi; return VisuMZ['ElementSta' + _0x3e9ae5(0x122)]['TraitCheck' + 'NotetagRat' + 'e'](_0x8300db, this[_0x3e9ae5(0x42b)](), _0x5a9547); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x207) + _0x54e01f(0x585) + 's'] = function (_0x36ec24) { const _0x402a1b = _0x54e01f; let _0x731f7b = -0x1 * 0x14c9 + 0x1a9a + -0x5d0; if (!_0x36ec24) return _0x731f7b; const _0x4ca43c = /<DAMAGE VS (.*) TRAIT:[ ](\d+)([%％])>/gi, _0x4ba432 = this['traitObjec' + 'ts'](); for (const _0x2ff3a7 of _0x4ba432) { _0x731f7b *= VisuMZ[_0x402a1b(0x3a0) + _0x402a1b(0x122)][_0x402a1b(0xc4) + _0x402a1b(0x219) + 'e'](_0x36ec24, _0x2ff3a7, _0x4ca43c); } return _0x731f7b; }, Game_Action['prototype'][_0x54e01f(0x1d8) + 'ultipliers' + 'Vs'] = function (_0x3123b7) { const _0x1b309d = _0x54e01f; let _0x15c25a = -0x1 * -0x1763 + 0x1 * -0x7d3 + -0x239 * 0x7; if (!_0x3123b7) return _0x15c25a; const _0x54a737 = /<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi; return VisuMZ['ElementSta' + _0x1b309d(0x122)][_0x1b309d(0xc4) + 'NotetagRat' + 'e'](_0x3123b7, this[_0x1b309d(0x42b)](), _0x54a737); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x1d8) + 'ultipliers' + 'Vs'] = function (_0x4c3e60) { const _0x432652 = _0x54e01f; let _0x1a82c7 = -0xc * 0x335 + 0xc * 0x92 + 0x1 * 0x1fa5; if (!_0x4c3e60) return _0x1a82c7; const _0x178a84 = /<HEALING VS (.*) TRAIT:[ ](\d+)([%％])>/gi, _0x28c5f6 = this[_0x432652(0x299) + 'ts'](); for (const _0x5d3912 of _0x28c5f6) { _0x1a82c7 *= VisuMZ[_0x432652(0x3a0) + _0x432652(0x122)][_0x432652(0xc4) + _0x432652(0x219) + 'e'](_0x4c3e60, _0x5d3912, _0x178a84); } return _0x1a82c7; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x49a) + _0x54e01f(0x32e) + _0x54e01f(0x318)] = function (_0xc124b2) { const _0x21367f = _0x54e01f; let _0x72462f = -0x9 * -0x9d + 0xdcd + -0x1351; if (!_0xc124b2) return _0x72462f; const _0x33901e = /<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi; return VisuMZ[_0x21367f(0x3a0) + _0x21367f(0x122)][_0x21367f(0xc4) + _0x21367f(0x219) + 'e'](_0xc124b2, this[_0x21367f(0x42b)](), _0x33901e); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x49a) + _0x54e01f(0x32e) + _0x54e01f(0x318)] = function (_0x56685c) { const _0x4b95d5 = _0x54e01f; let _0xe97c40 = 0x2438 + 0x9 * -0x1b6 + 0x49 * -0x49; if (!_0x56685c) return _0xe97c40; const _0x4f0bec = /<ACCURACY VS (.*) TRAIT:[ ](\d+)([%％])>/gi, _0x282c72 = this[_0x4b95d5(0x299) + 'ts'](); for (const _0xffe664 of _0x282c72) { _0xe97c40 *= VisuMZ[_0x4b95d5(0x3a0) + 'tusCore'][_0x4b95d5(0xc4) + _0x4b95d5(0x219) + 'e'](_0x56685c, _0xffe664, _0x4f0bec); } return _0xe97c40; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x111) + 'usMultipli' + 'ersVs'] = function (_0x520129) { const _0x3adeb2 = _0x54e01f; let _0x115906 = -0x1486 + 0x1a2e + -0x5a8; if (!_0x520129) return _0x115906; const _0x236d23 = /<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi; return VisuMZ[_0x3adeb2(0x3a0) + _0x3adeb2(0x122)][_0x3adeb2(0xc4) + 'NotetagPlu' + 's'](_0x520129, this[_0x3adeb2(0x42b)](), _0x236d23); }, Game_BattlerBase[_0x54e01f(0x353)]['traitHitPl' + _0x54e01f(0x40c) + _0x54e01f(0x318)] = function (_0x3adbf0) { const _0x165b77 = _0x54e01f; let _0x15e50c = -0x1360 + -0x8d2 + 0x1c32; if (!_0x3adbf0) return _0x15e50c; const _0x5749cf = /<ACCURACY VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi, _0x77d30d = this[_0x165b77(0x299) + 'ts'](); for (const _0x14f76c of _0x77d30d) { _0x15e50c += VisuMZ['ElementSta' + _0x165b77(0x122)][_0x165b77(0xc4) + _0x165b77(0x48a) + 's'](_0x3adbf0, _0x14f76c, _0x5749cf); } return _0x15e50c; }, Game_Action['prototype'][_0x54e01f(0x1ad) + _0x54e01f(0x2ae) + _0x54e01f(0x272)] = function (_0x5f2c9c) { const _0x230f62 = _0x54e01f; let _0x813581 = 0x747 + 0x135 * -0x1c + 0x1a86; if (!_0x5f2c9c) return _0x813581; const _0x48eee8 = /<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi; return VisuMZ[_0x230f62(0x3a0) + _0x230f62(0x122)]['TraitCheck' + _0x230f62(0x219) + 'e'](_0x5f2c9c, this[_0x230f62(0x42b)](), _0x48eee8); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x1ad) + _0x54e01f(0x2ae) + _0x54e01f(0x272)] = function (_0x59a2f9) { const _0x386b2f = _0x54e01f; let _0x48fb93 = -0x1 * -0x1017 + 0x958 + -0x196e; if (!_0x59a2f9) return _0x48fb93; const _0x329271 = /<CRITICAL VS (.*) TRAIT:[ ](\d+)([%％])>/gi, _0x37da6c = this[_0x386b2f(0x299) + 'ts'](); for (const _0x275709 of _0x37da6c) { _0x48fb93 *= VisuMZ['ElementSta' + _0x386b2f(0x122)][_0x386b2f(0xc4) + _0x386b2f(0x219) + 'e'](_0x59a2f9, _0x275709, _0x329271); } return _0x48fb93; }, Game_Action[_0x54e01f(0x353)][_0x54e01f(0x1ad) + _0x54e01f(0x22e) + _0x54e01f(0x272)] = function (_0x5a3919) { const _0x512164 = _0x54e01f; let _0x73c9f9 = 0xb30 * -0x1 + 0xfeb * 0x1 + -0x4bb; if (!_0x5a3919) return _0x73c9f9; const _0x589990 = /<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi; return VisuMZ['ElementSta' + _0x512164(0x122)][_0x512164(0xc4) + _0x512164(0x48a) + 's'](_0x5a3919, this[_0x512164(0x42b)](), _0x589990); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x1ad) + 'calPlusMul' + _0x54e01f(0x272)] = function (_0x494355) { const _0x42358f = _0x54e01f; let _0x4b0b3a = 0x8a3 * -0x3 + -0xdfa + 0x1 * 0x27e3; if (!_0x494355) return _0x4b0b3a; const _0x52c68c = /<CRITICAL VS (.*) TRAIT:[ ]([\+\-]\d+)([%％])>/gi, _0xa06c58 = this[_0x42358f(0x299) + 'ts'](); for (const _0x15c57f of _0xa06c58) { _0x4b0b3a += VisuMZ[_0x42358f(0x3a0) + _0x42358f(0x122)][_0x42358f(0xc4) + _0x42358f(0x48a) + 's'](_0x494355, _0x15c57f, _0x52c68c); } return _0x4b0b3a; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3fb) + 'erBase_ini' + _0x54e01f(0xed)] = Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x4c0) + 's'], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x4c0) + 's'] = function () { const _0x653af1 = _0x54e01f; this['_cache'] = {}, VisuMZ[_0x653af1(0x3a0) + _0x653af1(0x122)][_0x653af1(0x3fb) + 'erBase_ini' + 'tMembers'][_0x653af1(0x3bf)](this); }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x3fb) + 'erBase_ref' + _0x54e01f(0x426)] = Game_BattlerBase['prototype'][_0x54e01f(0x1a4)], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x1a4)] = function () { const _0x1c1e2e = _0x54e01f; this[_0x1c1e2e(0x258)] = {}, this['_tp'] = this[_0x1c1e2e(0xff)]['clamp'](0x395 * -0x1 + -0x610 + -0x3 * -0x337, this[_0x1c1e2e(0x29c)]()), VisuMZ[_0x1c1e2e(0x3a0) + _0x1c1e2e(0x122)][_0x1c1e2e(0x3fb) + _0x1c1e2e(0x418) + 'resh']['call'](this); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x12b) + _0x54e01f(0x309)] = function (_0x5b625c) { const _0x2875f9 = _0x54e01f, _0x3d0ff0 = { 'nXszu': function (_0x11d858, _0x3939a2) { return _0x11d858 !== _0x3939a2; } }; return this[_0x2875f9(0x258)] = this['_cache'] || {}, _0x3d0ff0[_0x2875f9(0x10a)](this[_0x2875f9(0x258)][_0x5b625c], undefined); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x2f9) + _0x54e01f(0x23d) + 'e'] = function () { const _0xf4dcb0 = _0x54e01f; this[_0xf4dcb0(0x465)] = {}; const _0x35dba5 = this[_0xf4dcb0(0x36a) + _0xf4dcb0(0x1ac)](); for (const _0x16709f of _0x35dba5) { this[_0xf4dcb0(0x465)][_0x16709f] = ''; } this['applyRando' + _0xf4dcb0(0x1a3)](), this[_0xf4dcb0(0x564) + _0xf4dcb0(0x28e) + 'ctNotetag'](); }, Game_BattlerBase['prototype'][_0x54e01f(0x435) + _0x54e01f(0x1a3)] = function () { }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x564) + _0x54e01f(0x28e) + _0x54e01f(0x1d9)] = function () { const _0x2a547e = _0x54e01f, _0xeaa106 = this[_0x2a547e(0x36a) + _0x2a547e(0x114)](); DataManager[_0x2a547e(0x586) + _0x2a547e(0x2ac) + _0x2a547e(0x51c)](this[_0x2a547e(0x465)], _0xeaa106); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x36a) + 'tObject'] = function () { return null; }, Game_BattlerBase[_0x54e01f(0x353)]['getTraitSe' + 'tKeys'] = function () { const _0x13cc20 = _0x54e01f, _0x2a3604 = { 'vrCoD': _0x13cc20(0x512), 'PtZCO': _0x13cc20(0x104), 'pdiDH': _0x13cc20(0x42a), 'gMNrj': _0x13cc20(0x286), 'OVKmJ': _0x13cc20(0x538), 'zIkPr': 'Alignment', 'RKfNJ': 'Blessing', 'WukIz': _0x13cc20(0x4a5), 'ooZli': _0x13cc20(0x25f), 'Jnjec': _0x13cc20(0x25c) }; return [_0x2a3604['vrCoD'], _0x2a3604[_0x13cc20(0x157)], _0x2a3604[_0x13cc20(0x182)], _0x2a3604[_0x13cc20(0x335)], _0x2a3604['OVKmJ'], _0x2a3604[_0x13cc20(0xe8)], _0x2a3604[_0x13cc20(0x31d)], _0x2a3604[_0x13cc20(0x3b3)], _0x2a3604['ooZli'], _0x2a3604[_0x13cc20(0x25b)]]; }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x36a) + 't'] = function (_0x3aeeb9) { const _0xc70a5d = _0x54e01f, _0x4688ee = { 'BYnGN': function (_0x428727, _0x5ecfe6) { return _0x428727 === _0x5ecfe6; }, 'ztYfw': function (_0x26791d, _0x37920a) { return _0x26791d === _0x37920a; } }; if (_0x4688ee[_0xc70a5d(0x3d3)](this[_0xc70a5d(0x465)], undefined)) this['initElemen' + _0xc70a5d(0x23d) + 'e'](); if (_0x4688ee[_0xc70a5d(0x39f)](this[_0xc70a5d(0x465)][_0x3aeeb9], undefined)) this[_0xc70a5d(0x2f9) + _0xc70a5d(0x23d) + 'e'](); return this[_0xc70a5d(0x465)][_0x3aeeb9]; }, Game_BattlerBase[_0x54e01f(0x353)]['setTraitSe' + 't'] = function (_0x29d709, _0x2857ff) { const _0x196a63 = _0x54e01f, _0x577925 = { 'dIkMP': function (_0x4b9708, _0x883b14) { return _0x4b9708 === _0x883b14; }, 'RpSig': function (_0x581ec5, _0x2d7cfc) { return _0x581ec5 === _0x2d7cfc; } }; if (_0x577925[_0x196a63(0x11a)](this[_0x196a63(0x465)], undefined)) this[_0x196a63(0x2f9) + _0x196a63(0x23d) + 'e'](); if (_0x577925[_0x196a63(0x137)](this[_0x196a63(0x465)][_0x29d709], undefined)) this[_0x196a63(0x2f9) + _0x196a63(0x23d) + 'e'](); this[_0x196a63(0x465)][_0x29d709] = _0x2857ff, this['refresh'](); }, Game_BattlerBase['prototype'][_0x54e01f(0x4a7)] = function (_0x235aed) { const _0x5f3a97 = _0x54e01f, _0x29fcc7 = { 'EEwEt': function (_0x24ea2f, _0x1cf72d) { return _0x24ea2f === _0x1cf72d; } }; if (_0x29fcc7[_0x5f3a97(0x161)](this[_0x5f3a97(0x465)], undefined)) this['initElemen' + 'tStatusCor' + 'e'](); if (_0x29fcc7[_0x5f3a97(0x161)](this[_0x5f3a97(0x465)][_0x235aed], undefined)) this['initElemen' + 'tStatusCor' + 'e'](); const _0x2800e5 = this[_0x5f3a97(0x465)][_0x235aed]; return DataManager[_0x5f3a97(0x4a7)](_0x235aed, _0x2800e5); }, Game_BattlerBase[_0x54e01f(0x353)]['logTraitSe' + 'ts'] = function () { const _0x552e74 = _0x54e01f, _0xa6d137 = { 'Wnpzo': '===\x20%1\x27s\x20T' + _0x552e74(0x427) + '===', 'eymuX': _0x552e74(0x2f4), 'FONXt': _0x552e74(0x571) + _0x552e74(0x571) + _0x552e74(0x468) }; if ($gameTemp[_0x552e74(0x294)]()) { console[_0x552e74(0x134)](_0xa6d137['Wnpzo']['format'](this[_0x552e74(0x4cf)]())); for (const _0x10383d in this[_0x552e74(0x465)]) { console[_0x552e74(0x134)](_0xa6d137['eymuX'][_0x552e74(0x143)](_0x10383d, this[_0x552e74(0x465)][_0x10383d])); } console[_0x552e74(0x134)](_0xa6d137['FONXt']); } }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x28b) + _0x54e01f(0x26e)] = function (_0x6db131) { const _0x530774 = _0x54e01f; this[_0x530774(0x465)][_0x6db131] = DataManager['getRandomT' + _0x530774(0x48e) + _0x530774(0x280)](_0x6db131), !this['_addingPas' + _0x530774(0x291) + _0x530774(0x30a)] && this[_0x530774(0x1a4)](); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3fb) + _0x54e01f(0x2f6) + 'Equip'] = Game_BattlerBase[_0x54e01f(0x353)]['canEquip'], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x3b4)] = function (_0x27c29d) { const _0x4562ea = _0x54e01f; return VisuMZ['ElementSta' + _0x4562ea(0x122)][_0x4562ea(0x3fb) + _0x4562ea(0x2f6) + _0x4562ea(0x250)]['call'](this, _0x27c29d) && this[_0x4562ea(0x178) + _0x4562ea(0x32c) + _0x4562ea(0x460)](_0x27c29d); }, Game_BattlerBase[_0x54e01f(0x353)]['meetsEquip' + _0x54e01f(0x32c) + _0x54e01f(0x460)] = function (_0x3afc8b) { const _0x49030f = _0x54e01f, _0x43ae49 = { 'koFgr': function (_0x2bd83c, _0x5dfd22) { return _0x2bd83c(_0x5dfd22); } }; if (!_0x3afc8b) return !![]; if (_0x3afc8b[_0x49030f(0x2a6)][_0x49030f(0x2af)](/<EQUIP TRAIT (?:REQUIREMENT|REQUIREMENTS):[ ](.*)>/i)) { const _0x301997 = this[_0x49030f(0x36a) + _0x49030f(0x1ac)](), _0x6a8461 = _0x43ae49[_0x49030f(0x3b2)](String, RegExp['$1'])[_0x49030f(0x349)](',')[_0x49030f(0x15c)](_0x2aed64 => _0x2aed64[_0x49030f(0x27e) + 'e']()[_0x49030f(0xef)]()); for (const _0x5a29a0 of _0x6a8461) { if (_0x301997['some'](_0x177b5f => this[_0x49030f(0x36a) + 't'](_0x177b5f)['toUpperCas' + 'e']()[_0x49030f(0xef)]() === _0x5a29a0)) continue; return ![]; } } return !![]; }, Game_BattlerBase[_0x54e01f(0x353)]['hasTraitSe' + 't'] = function (_0x146ab6) { const _0x5863f6 = _0x54e01f; _0x146ab6 = _0x146ab6['toUpperCas' + 'e'](); const _0x3522fc = this[_0x5863f6(0x36a) + _0x5863f6(0x1ac)](); return _0x3522fc[_0x5863f6(0x21f)](_0x2dbb91 => this['getTraitSe' + 't'](_0x2dbb91)[_0x5863f6(0x27e) + 'e']()[_0x5863f6(0xef)]() === _0x146ab6); }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x3fb) + _0x54e01f(0x1ab) + 'mentRate'] = Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x4f5) + 'e'], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x4f5) + 'e'] = function (_0x2c80ec) { const _0x162cd5 = _0x54e01f, _0x4f02da = { 'MvEBF': function (_0x181e7f, _0x3d2bce) { return _0x181e7f <= _0x3d2bce; }, 'UlglM': _0x162cd5(0x212), 'IUjpy': function (_0xa1edc4, _0x431488) { return _0xa1edc4 === _0x431488; } }; if (_0x4f02da[_0x162cd5(0x380)](_0x2c80ec, 0x128c + 0x1c53 + -0x2edf)) return 0x1ae1 + -0x2054 + 0x1 * 0x574; const _0x17d2d0 = _0x4f02da['UlglM'][_0x162cd5(0x143)](_0x2c80ec); if (this[_0x162cd5(0x12b) + _0x162cd5(0x309)](_0x17d2d0)) return this[_0x162cd5(0x258)][_0x17d2d0]; const _0x1d6c0c = this['getForceRe' + 'ceivedElem' + 'entRate'](_0x2c80ec); return _0x4f02da[_0x162cd5(0x53f)](_0x1d6c0c, ![]) ? this[_0x162cd5(0x258)][_0x17d2d0] = VisuMZ[_0x162cd5(0x3a0) + _0x162cd5(0x122)][_0x162cd5(0x3b8)]['ElementRul' + 'es'][_0x162cd5(0x24e) + 'teJS'][_0x162cd5(0x3bf)](this, _0x2c80ec) : this[_0x162cd5(0x258)][_0x17d2d0] = _0x1d6c0c, this['_cache'][_0x17d2d0]; }, Game_BattlerBase[_0x54e01f(0x353)]['getForceRe' + _0x54e01f(0x158) + _0x54e01f(0x2ca)] = function (_0x3d7d89) { const _0x17e06b = _0x54e01f, _0x96dbd0 = { 'CTTKH': function (_0x2203dc, _0x7ce723) { return _0x2203dc / _0x7ce723; }, 'zZvHJ': function (_0x2b2716, _0x4e9771) { return _0x2b2716(_0x4e9771); }, 'WRtOQ': function (_0x2c85aa, _0xa8a2c9) { return _0x2c85aa(_0xa8a2c9); } }, _0x181e63 = VisuMZ['ElementSta' + _0x17e06b(0x122)]['RegExp']; for (const _0x460677 of this[_0x17e06b(0x299) + 'ts']()) { if (!_0x460677) continue; const _0x13b4ef = _0x460677[_0x17e06b(0x2a6)]; if (_0x13b4ef[_0x17e06b(0x2af)](_0x181e63[_0x17e06b(0x176) + 'r'][_0x3d7d89])) return _0x96dbd0[_0x17e06b(0x34b)](_0x96dbd0[_0x17e06b(0x30b)](Number, RegExp['$1']), -0x44f * -0x6 + 0x23ff + -0x1 * 0x3d75); else { if (_0x13b4ef['match'](_0x181e63[_0x17e06b(0x3ca) + 't'][_0x3d7d89])) _0x96dbd0[_0x17e06b(0x30b)](Number, RegExp['$1']); else { if (_0x13b4ef['match'](_0x181e63[_0x17e06b(0x142)][_0x3d7d89])) { var _0x1b40df = _0x96dbd0['zZvHJ'](String, RegExp['$1']); try { return _0x96dbd0[_0x17e06b(0x262)](eval, _0x1b40df); } catch (_0x5535f8) { if ($gameTemp[_0x17e06b(0x294)]()) console[_0x17e06b(0x134)](_0x5535f8); return ![]; } } } } } return ![]; }, Game_BattlerBase['prototype'][_0x54e01f(0x3ee) + _0x54e01f(0x31b) + 's'] = function (_0x12841e) { const _0x54295b = _0x54e01f, _0x2bd2e9 = { 'jsTgf': function (_0x258424, _0x214c86) { return _0x258424 / _0x214c86; }, 'QdPkM': function (_0x35f6de, _0x4f81f3) { return _0x35f6de(_0x4f81f3); }, 'qMTfz': function (_0x51c478, _0x176a66) { return _0x51c478(_0x176a66); }, 'JSbUJ': function (_0x234b2e, _0x2b74db) { return _0x234b2e(_0x2b74db); } }, _0x54c7de = VisuMZ[_0x54295b(0x3a0) + _0x54295b(0x122)][_0x54295b(0x537)], _0x6b4a4c = (_0x24af49, _0x19b324) => { const _0x1532c7 = _0x54295b; if (!_0x19b324) return _0x24af49; const _0x4e64a9 = _0x19b324[_0x1532c7(0x2a6)]; if (_0x4e64a9[_0x1532c7(0x2af)](_0x54c7de['EleRecPlus' + _0x1532c7(0x4e8)][_0x12841e])) { var _0x4d8a6 = _0x2bd2e9[_0x1532c7(0x2a5)](_0x2bd2e9[_0x1532c7(0x2c7)](Number, RegExp['$1']), 0x21e8 + 0x1ece + -0x4052); _0x24af49 += _0x4d8a6; } if (_0x4e64a9[_0x1532c7(0x2af)](_0x54c7de[_0x1532c7(0x559) + _0x1532c7(0x2c4)][_0x12841e])) { var _0x4d8a6 = _0x2bd2e9['qMTfz'](Number, RegExp['$1']); _0x24af49 += _0x4d8a6; } if (_0x4e64a9[_0x1532c7(0x2af)](_0x54c7de['EleRecPlus' + 'JS'][_0x12841e])) { var _0x226604 = _0x2bd2e9[_0x1532c7(0x449)](String, RegExp['$1']); try { _0x24af49 += _0x2bd2e9['JSbUJ'](eval, _0x226604); } catch (_0xec0cf5) { if ($gameTemp['isPlaytest']()) console[_0x1532c7(0x134)](_0xec0cf5); } } return _0x24af49; }; return this[_0x54295b(0x299) + 'ts']()[_0x54295b(0x1ef)](_0x6b4a4c, -0x1403 + -0x1 * 0x2214 + 0x3617); }, Game_BattlerBase['prototype']['getReceive' + _0x54e01f(0x3dc) + 'e'] = function (_0x3d910c) { const _0x2f176c = _0x54e01f, _0x3a3a49 = { 'NevHe': function (_0x543b2a, _0x51c2f8) { return _0x543b2a / _0x51c2f8; }, 'UywrZ': function (_0x268ed5, _0x46e12c) { return _0x268ed5(_0x46e12c); }, 'tULsm': function (_0x4f2fd6, _0x5f8fc2) { return _0x4f2fd6(_0x5f8fc2); }, 'YBRyA': _0x2f176c(0x2c5) }; let _0x1b4dcd = VisuMZ[_0x2f176c(0x3a0) + _0x2f176c(0x122)]['Game_Battl' + _0x2f176c(0x1ab) + _0x2f176c(0x1bb)]['call'](this, _0x3d910c); const _0x525255 = this[_0x2f176c(0x36a) + _0x2f176c(0x1ac)](), _0x45fee6 = _0x3a3a49['YBRyA'][_0x2f176c(0x143)](_0x3d910c); for (const _0xcc6c89 of _0x525255) { const _0x4377a8 = this[_0x2f176c(0x36a) + 't'](_0xcc6c89), _0x4d6441 = DataManager[_0x2f176c(0x4a7)](_0xcc6c89, _0x4377a8); _0x1b4dcd *= _0x4d6441[_0x2f176c(0x3dc) + 'e'][_0x45fee6] ?? 0xdc9 + 0x18b4 + -0x267c; } const _0xa7de47 = VisuMZ[_0x2f176c(0x3a0) + _0x2f176c(0x122)][_0x2f176c(0x537)], _0x49f78f = (_0x1e35bf, _0x1ee37f) => { const _0x4278f0 = _0x2f176c; if (!_0x1ee37f) return _0x1e35bf; const _0x3fd610 = _0x1ee37f[_0x4278f0(0x2a6)]; if (_0x3fd610['match'](_0xa7de47['EleRecRate' + _0x4278f0(0x4e8)][_0x3d910c])) { var _0xc26626 = _0x3a3a49[_0x4278f0(0x4f7)](_0x3a3a49['UywrZ'](Number, RegExp['$1']), 0x23c1 + 0x483 + -0x27e0); _0x1e35bf *= _0xc26626; } if (_0x3fd610[_0x4278f0(0x2af)](_0xa7de47[_0x4278f0(0x14d) + 'Flt'][_0x3d910c])) { var _0xc26626 = _0x3a3a49[_0x4278f0(0x325)](Number, RegExp['$1']); _0x1e35bf *= _0xc26626; } if (_0x3fd610[_0x4278f0(0x2af)](_0xa7de47['EleRecRate' + 'JS'][_0x3d910c])) { var _0x4e972e = _0x3a3a49[_0x4278f0(0x325)](String, RegExp['$1']); try { _0x1e35bf *= _0x3a3a49[_0x4278f0(0x10e)](eval, _0x4e972e); } catch (_0x355bc6) { if ($gameTemp[_0x4278f0(0x294)]()) console[_0x4278f0(0x134)](_0x355bc6); } } return _0x1e35bf; }; return this['traitObjec' + 'ts']()[_0x2f176c(0x1ef)](_0x49f78f, _0x1b4dcd); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x3ee) + 'ElementFla' + 't'] = function (_0x403158) { const _0x2e52e5 = _0x54e01f, _0x69d6d = { 'iWCmV': function (_0x4b40dc, _0x3c108b) { return _0x4b40dc / _0x3c108b; }, 'nClmA': function (_0x411cee, _0x1c1dd8) { return _0x411cee(_0x1c1dd8); }, 'SmSCN': function (_0x3dbb1d, _0x3cf0b4) { return _0x3dbb1d(_0x3cf0b4); } }, _0x5ce7f6 = VisuMZ[_0x2e52e5(0x3a0) + _0x2e52e5(0x122)][_0x2e52e5(0x537)], _0xb3975a = (_0x589571, _0x28d259) => { const _0x154fdc = _0x2e52e5; if (!_0x28d259) return _0x589571; const _0xa64e1b = _0x28d259[_0x154fdc(0x2a6)]; if (_0xa64e1b[_0x154fdc(0x2af)](_0x5ce7f6['EleRecFlat' + _0x154fdc(0x4e8)][_0x403158])) { var _0x1eb646 = _0x69d6d['iWCmV'](_0x69d6d['nClmA'](Number, RegExp['$1']), 0x1 * -0x246b + -0x1 * -0x17e5 + 0x2 * 0x675); _0x589571 += _0x1eb646; } if (_0xa64e1b[_0x154fdc(0x2af)](_0x5ce7f6['EleRecFlat' + _0x154fdc(0x2c4)][_0x403158])) { var _0x1eb646 = _0x69d6d[_0x154fdc(0x355)](Number, RegExp['$1']); _0x589571 += _0x1eb646; } if (_0xa64e1b[_0x154fdc(0x2af)](_0x5ce7f6[_0x154fdc(0x41f) + 'JS'][_0x403158])) { var _0xda231f = _0x69d6d['SmSCN'](String, RegExp['$1']); try { _0x589571 += _0x69d6d['nClmA'](eval, _0xda231f); } catch (_0x25ca1b) { if ($gameTemp[_0x154fdc(0x294)]()) console[_0x154fdc(0x134)](_0x25ca1b); } } return _0x589571; }; return this[_0x2e52e5(0x299) + 'ts']()[_0x2e52e5(0x1ef)](_0xb3975a, -0x5 * 0x349 + 0x938 * 0x2 + -0x5 * 0x67); }, Game_BattlerBase[_0x54e01f(0x353)]['getDealtEl' + 'ementPlus'] = function (_0x1ccd62) { const _0x5e6db5 = _0x54e01f, _0x4cbee3 = { 'eIbtl': function (_0x516a24, _0x7e6383) { return _0x516a24 / _0x7e6383; }, 'SIpln': function (_0x5b2862, _0x228e17) { return _0x5b2862(_0x228e17); }, 'UZgzm': function (_0xc5035a, _0x2d8c1e) { return _0xc5035a(_0x2d8c1e); }, 'QGmVy': function (_0x5d1564, _0x2da6ba) { return _0x5d1564(_0x2da6ba); } }, _0x38a5e7 = VisuMZ['ElementSta' + _0x5e6db5(0x122)][_0x5e6db5(0x537)], _0x7d4686 = (_0x484ca9, _0x3bb373) => { const _0x404b73 = _0x5e6db5; if (!_0x3bb373) return _0x484ca9; const _0x39dd60 = _0x3bb373[_0x404b73(0x2a6)]; if (_0x39dd60[_0x404b73(0x2af)](_0x38a5e7[_0x404b73(0x21e) + 'Per'][_0x1ccd62])) { var _0x1c7427 = _0x4cbee3[_0x404b73(0x548)](_0x4cbee3[_0x404b73(0x2cb)](Number, RegExp['$1']), -0x25 * -0x25 + 0x4c3 * -0x1 + -0x32 * 0x1); _0x484ca9 += _0x1c7427; } if (_0x39dd60[_0x404b73(0x2af)](_0x38a5e7['EleDmgPlus' + _0x404b73(0x2c4)][_0x1ccd62])) { var _0x1c7427 = _0x4cbee3[_0x404b73(0x2cb)](Number, RegExp['$1']); console[_0x404b73(0x134)](_0x38a5e7['EleDmgPlus' + _0x404b73(0x2c4)][_0x1ccd62], _0x1c7427), _0x484ca9 += _0x1c7427; } if (_0x39dd60[_0x404b73(0x2af)](_0x38a5e7[_0x404b73(0x21e) + 'JS'][_0x1ccd62])) { var _0x41582c = _0x4cbee3['UZgzm'](String, RegExp['$1']); try { _0x484ca9 += _0x4cbee3[_0x404b73(0x332)](eval, _0x41582c); } catch (_0x4f5de0) { if ($gameTemp[_0x404b73(0x294)]()) console[_0x404b73(0x134)](_0x4f5de0); } } return _0x484ca9; }; return this[_0x5e6db5(0x299) + 'ts']()[_0x5e6db5(0x1ef)](_0x7d4686, -0x1 * 0x148a + -0x1bbf + 0x3049); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x12e) + _0x54e01f(0x4dc)] = function (_0x4a7f09) { const _0x6e1995 = _0x54e01f, _0x247c7a = { 'glgEm': function (_0xf6613, _0x296232) { return _0xf6613 / _0x296232; }, 'fdzYQ': function (_0x4e7ac7, _0x8a632f) { return _0x4e7ac7(_0x8a632f); }, 'JKBRW': function (_0x3351f2, _0x7a6871) { return _0x3351f2(_0x7a6871); } }, _0x4d62bd = VisuMZ[_0x6e1995(0x3a0) + _0x6e1995(0x122)][_0x6e1995(0x537)], _0x469dfa = (_0x1b1813, _0x35b9f6) => { const _0x4eab1a = _0x6e1995; if (!_0x35b9f6) return _0x1b1813; const _0x3879b7 = _0x35b9f6[_0x4eab1a(0x2a6)]; if (_0x3879b7[_0x4eab1a(0x2af)](_0x4d62bd['EleDmgRate' + 'Per'][_0x4a7f09])) { var _0x444c08 = _0x247c7a[_0x4eab1a(0x514)](_0x247c7a[_0x4eab1a(0x144)](Number, RegExp['$1']), 0x397 * -0x1 + 0x2413 + 0x34 * -0x9e); _0x1b1813 *= _0x444c08; } if (_0x3879b7['match'](_0x4d62bd[_0x4eab1a(0x1ff) + _0x4eab1a(0x2c4)][_0x4a7f09])) { var _0x444c08 = _0x247c7a[_0x4eab1a(0x32f)](Number, RegExp['$1']); _0x1b1813 *= _0x444c08; } if (_0x3879b7[_0x4eab1a(0x2af)](_0x4d62bd[_0x4eab1a(0x1ff) + 'JS'][_0x4a7f09])) { var _0x553d3a = _0x247c7a[_0x4eab1a(0x144)](String, RegExp['$1']); try { _0x1b1813 *= _0x247c7a[_0x4eab1a(0x32f)](eval, _0x553d3a); } catch (_0x1ee438) { if ($gameTemp[_0x4eab1a(0x294)]()) console[_0x4eab1a(0x134)](_0x1ee438); } } return _0x1b1813; }; return this[_0x6e1995(0x299) + 'ts']()[_0x6e1995(0x1ef)](_0x469dfa, 0x3f4 * 0x2 + 0xf4 + 0x8db * -0x1); }, Game_BattlerBase['prototype'][_0x54e01f(0x12e) + _0x54e01f(0x16d)] = function (_0x4d294a) { const _0x5ccc73 = _0x54e01f, _0x406fee = { 'KksCk': function (_0x47fcf3, _0x5904c2) { return _0x47fcf3 / _0x5904c2; }, 'gHuAm': function (_0x22d434, _0x30b82d) { return _0x22d434(_0x30b82d); }, 'EeMnK': function (_0x1aa12d, _0x3abbd6) { return _0x1aa12d(_0x3abbd6); } }, _0xdfeac3 = VisuMZ[_0x5ccc73(0x3a0) + _0x5ccc73(0x122)][_0x5ccc73(0x537)], _0x4d0284 = (_0xc244ca, _0x3c02db) => { const _0x56f849 = _0x5ccc73; if (!_0x3c02db) return _0xc244ca; const _0x5f4d77 = _0x3c02db[_0x56f849(0x2a6)]; if (_0x5f4d77['match'](_0xdfeac3[_0x56f849(0x221) + 'Per'][_0x4d294a])) { var _0x43f5e1 = _0x406fee[_0x56f849(0x329)](_0x406fee[_0x56f849(0x57b)](Number, RegExp['$1']), 0x189d * 0x1 + -0x235b + -0x13 * -0x96); _0xc244ca += _0x43f5e1; } if (_0x5f4d77[_0x56f849(0x2af)](_0xdfeac3['EleDmgFlat' + 'Flt'][_0x4d294a])) { var _0x43f5e1 = _0x406fee[_0x56f849(0x4cb)](Number, RegExp['$1']); _0xc244ca += _0x43f5e1; } if (_0x5f4d77[_0x56f849(0x2af)](_0xdfeac3[_0x56f849(0x221) + 'JS'][_0x4d294a])) { var _0x1e6705 = _0x406fee[_0x56f849(0x4cb)](String, RegExp['$1']); try { _0xc244ca += _0x406fee[_0x56f849(0x57b)](eval, _0x1e6705); } catch (_0x3a6f61) { if ($gameTemp[_0x56f849(0x294)]()) console[_0x56f849(0x134)](_0x3a6f61); } } return _0xc244ca; }; return this[_0x5ccc73(0x299) + 'ts']()[_0x5ccc73(0x1ef)](_0x4d0284, -0x1ee4 + 0x73e + -0x3 * -0x7e2); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x3c8) + _0x54e01f(0x528)] = function () { const _0x460b70 = _0x54e01f, _0x57ab85 = { 'ugpmo': function (_0x1afb65, _0x4717a4) { return _0x1afb65 + _0x4717a4; }, 'elsnv': function (_0x39f4fd, _0x4b58b8) { return _0x39f4fd + _0x4b58b8; } }; let _0x4f2cb3 = []; for (const _0x3f242e of this[_0x460b70(0x299) + 'ts']()) { if (!_0x3f242e) continue; const _0x308eb4 = _0x3f242e[_0x460b70(0x2a6)][_0x460b70(0x2af)](/<ELEMENT ABSORB:[ ](.*)>/gi); if (_0x308eb4) for (const _0x2951e1 of _0x308eb4) { _0x2951e1[_0x460b70(0x2af)](/<ELEMENT ABSORB:[ ](.*)>/i); const _0x16a28f = RegExp['$1']; if (_0x16a28f[_0x460b70(0x2af)](/(\d+(?:\s*,\s*\d+)*)/i)) { const _0x3b8071 = JSON['parse'](_0x57ab85[_0x460b70(0x2cd)](_0x57ab85[_0x460b70(0xea)]('[', RegExp['$1'][_0x460b70(0x2af)](/\d+/g)), ']')); _0x4f2cb3 = _0x4f2cb3['concat'](_0x3b8071); } else { const _0x2222c2 = _0x16a28f[_0x460b70(0x349)](','); for (const _0x435e1c of _0x2222c2) { const _0x4986db = DataManager['getElement' + 'IdWithName'](_0x435e1c); if (_0x4986db) _0x4f2cb3[_0x460b70(0x3da)](_0x4986db); } } } } return _0x4f2cb3; }, Game_BattlerBase['prototype']['getReflect' + 'edElements'] = function () { const _0x4741f2 = _0x54e01f, _0x132aa9 = { 'zvhCA': function (_0x23d0c8, _0x86bb3) { return _0x23d0c8 + _0x86bb3; }, 'SEVTz': function (_0x3aed6d, _0x2c7e29) { return _0x3aed6d + _0x2c7e29; } }; let _0x229203 = []; for (const _0x1413b7 of this[_0x4741f2(0x299) + 'ts']()) { if (!_0x1413b7) continue; const _0x45f3bc = _0x1413b7[_0x4741f2(0x2a6)][_0x4741f2(0x2af)](/<ELEMENT REFLECT:[ ](.*)>/gi); if (_0x45f3bc) for (const _0x41fbb6 of _0x45f3bc) { _0x41fbb6[_0x4741f2(0x2af)](/<ELEMENT REFLECT:[ ](.*)>/i); const _0x47a833 = RegExp['$1']; if (_0x47a833[_0x4741f2(0x2af)](/(\d+(?:\s*,\s*\d+)*)/i)) { const _0x3795c3 = JSON['parse'](_0x132aa9[_0x4741f2(0xb9)](_0x132aa9[_0x4741f2(0x569)]('[', RegExp['$1'][_0x4741f2(0x2af)](/\d+/g)), ']')); _0x229203 = _0x229203[_0x4741f2(0x1aa)](_0x3795c3); } else { const _0x135c93 = _0x47a833[_0x4741f2(0x349)](','); for (const _0x46091c of _0x135c93) { const _0x330ff4 = DataManager['getElement' + _0x4741f2(0x3c3)](_0x46091c); if (_0x330ff4) _0x229203[_0x4741f2(0x3da)](_0x330ff4); } } } } return _0x229203; }, Game_BattlerBase['prototype'][_0x54e01f(0x368) + _0x54e01f(0x1d5)] = function () { const _0x508d65 = _0x54e01f, _0x2da859 = { 'SUnDD': function (_0x35e4d9, _0x1744e9) { return _0x35e4d9 + _0x1744e9; }, 'TEqWn': function (_0x25727a, _0x50375e) { return _0x25727a + _0x50375e; } }; let _0x515fcf = []; for (const _0xd867cf of this[_0x508d65(0x299) + 'ts']()) { if (!_0xd867cf) continue; const _0x4b1cf1 = _0xd867cf['note'][_0x508d65(0x2af)](/<ELEMENT PIERCE:[ ](.*)>/gi); if (_0x4b1cf1) for (const _0x5712fb of _0x4b1cf1) { _0x5712fb['match'](/<ELEMENT PIERCE:[ ](.*)>/i); const _0x21cecd = RegExp['$1']; if (_0x21cecd['match'](/(\d+(?:\s*,\s*\d+)*)/i)) { const _0xb4d40b = JSON[_0x508d65(0x446)](_0x2da859['SUnDD'](_0x2da859[_0x508d65(0x508)]('[', RegExp['$1'][_0x508d65(0x2af)](/\d+/g)), ']')); _0x515fcf = _0x515fcf[_0x508d65(0x1aa)](_0xb4d40b); } else { const _0x539a1d = _0x21cecd[_0x508d65(0x349)](','); for (const _0xdb6fad of _0x539a1d) { const _0x4166d2 = DataManager[_0x508d65(0x3a2) + _0x508d65(0x3c3)](_0xdb6fad); if (_0x4166d2) _0x515fcf[_0x508d65(0x3da)](_0x4166d2); } } } } return _0x515fcf; }, Game_BattlerBase[_0x54e01f(0x353)]['isElementN' + _0x54e01f(0x502)] = function () { const _0x7787f2 = _0x54e01f; for (const _0x1974c1 of this[_0x7787f2(0x299) + 'ts']()) { if (!_0x1974c1) continue; if (_0x1974c1['note'][_0x7787f2(0x2af)](/<FORCE ACTION ELEMENT:[ ]NULL>/i)) return !![]; } return ![]; }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x3cd) + _0x54e01f(0x24b) + 'nt'] = function () { const _0x77f6ec = _0x54e01f, _0x3edf40 = { 'afDPt': function (_0x283ea7, _0xe028e5) { return _0x283ea7 + _0xe028e5; }, 'ZFvPj': function (_0x2a341d, _0x59c983) { return _0x2a341d + _0x59c983; } }; for (const _0x1db2d3 of this['traitObjec' + 'ts']()) { if (!_0x1db2d3) continue; if (_0x1db2d3[_0x77f6ec(0x2a6)][_0x77f6ec(0x2af)](/<FORCE ACTION ELEMENT:[ ](.*)>/i)) { const _0x227079 = RegExp['$1']; if (_0x227079[_0x77f6ec(0x2af)](/(\d+(?:\s*,\s*\d+)*)/i)) return JSON['parse'](_0x3edf40[_0x77f6ec(0x395)](_0x3edf40['ZFvPj']('[', RegExp['$1'][_0x77f6ec(0x2af)](/\d+/g)), ']')); else { const _0x4441fd = _0x227079[_0x77f6ec(0x349)](','); let _0x1649ae = []; for (const _0x66b4cc of _0x4441fd) { const _0x52802c = DataManager['getElement' + _0x77f6ec(0x3c3)](_0x66b4cc); if (_0x52802c) _0x1649ae[_0x77f6ec(0x3da)](_0x52802c); } return _0x1649ae; } } } return []; }, VisuMZ['ElementSta' + 'tusCore'][_0x54e01f(0x3fb) + 'erBase_par' + 'amRate'] = Game_BattlerBase[_0x54e01f(0x353)]['paramRate'], Game_BattlerBase[_0x54e01f(0x353)]['paramRate'] = function (_0x222178) { const _0x31b0d3 = _0x54e01f; let _0x2d3f79 = VisuMZ['ElementSta' + _0x31b0d3(0x122)][_0x31b0d3(0x3fb) + _0x31b0d3(0x2da) + _0x31b0d3(0x247)][_0x31b0d3(0x3bf)](this, _0x222178); return this[_0x31b0d3(0x2f3) + _0x31b0d3(0x30a)](_0x222178, _0x2d3f79); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x2f3) + _0x54e01f(0x30a)] = function (_0x581559, _0x5325a9) { const _0x66f65e = _0x54e01f, _0x59ac6a = { 'lUGOh': _0x66f65e(0x470) }; if (!DataManager[_0x66f65e(0x1e7) + 'nabled']()) return _0x5325a9; const _0x560c71 = this['getTraitSe' + _0x66f65e(0x1ac)](), _0x35db5f = _0x59ac6a[_0x66f65e(0x151)][_0x66f65e(0x143)](_0x581559); for (const _0x3a3c35 of _0x560c71) { const _0x5f308b = this[_0x66f65e(0x36a) + 't'](_0x3a3c35), _0x5ec2c6 = DataManager[_0x66f65e(0x4a7)](_0x3a3c35, _0x5f308b); _0x5325a9 *= _0x5ec2c6[_0x66f65e(0x2bb)][_0x35db5f] ?? -0xc88 + 0x1df7 + -0x116e; } return _0x5325a9; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3fb) + _0x54e01f(0x249) + _0x54e01f(0x14f)] = Game_BattlerBase['prototype'][_0x54e01f(0x24c)], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x24c)] = function (_0x5cbf6b) { const _0x5578db = _0x54e01f; let _0x5bad05 = VisuMZ[_0x5578db(0x3a0) + _0x5578db(0x122)][_0x5578db(0x3fb) + _0x5578db(0x249) + _0x5578db(0x14f)]['call'](this, _0x5cbf6b); if (Imported['VisuMZ_0_C' + _0x5578db(0x2ce)]) return _0x5bad05; return this[_0x5578db(0x171) + _0x5578db(0x119)](_0x5cbf6b, _0x5bad05); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x171) + _0x54e01f(0x119)] = function (_0x558bdd, _0x61cce8) { const _0x38cd41 = _0x54e01f, _0x1b9187 = { 'QwrKA': _0x38cd41(0x186) }; if (!DataManager[_0x38cd41(0x1e7) + 'nabled']()) return _0x61cce8; const _0x2a7119 = this[_0x38cd41(0x36a) + _0x38cd41(0x1ac)](), _0xdbbe44 = _0x1b9187['QwrKA'][_0x38cd41(0x143)](_0x558bdd); for (const _0x1f6852 of _0x2a7119) { const _0x40f060 = this['getTraitSe' + 't'](_0x1f6852), _0x3c8c3d = DataManager[_0x38cd41(0x4a7)](_0x1f6852, _0x40f060); _0x61cce8 += _0x3c8c3d[_0x38cd41(0x23f)][_0xdbbe44] || -0x15fa + -0x1 * -0x10a2 + 0x4 * 0x156; } return _0x61cce8; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Game_Battl' + _0x54e01f(0x434) + _0x54e01f(0x14f)] = Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x489)], Game_BattlerBase['prototype'][_0x54e01f(0x489)] = function (_0x32a91f) { const _0xb71c75 = _0x54e01f; let _0x3a65e1 = VisuMZ[_0xb71c75(0x3a0) + _0xb71c75(0x122)][_0xb71c75(0x3fb) + 'erBase_spa' + 'ram'][_0xb71c75(0x3bf)](this, _0x32a91f); if (Imported['VisuMZ_0_C' + _0xb71c75(0x2ce)]) return _0x3a65e1; return this[_0xb71c75(0x428) + _0xb71c75(0x119)](_0x32a91f, _0x3a65e1); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x428) + _0x54e01f(0x119)] = function (_0x20fca9, _0x1ed242) { const _0x5ee845 = _0x54e01f, _0x1fb03e = { 'vsZHr': _0x5ee845(0x433) }; if (!DataManager['traitSetsE' + 'nabled']()) return _0x1ed242; const _0x148e86 = this[_0x5ee845(0x36a) + _0x5ee845(0x1ac)](), _0x9dfe72 = _0x1fb03e['vsZHr'][_0x5ee845(0x143)](_0x20fca9); for (const _0x2e227a of _0x148e86) { const _0x2b4c8f = this[_0x5ee845(0x36a) + 't'](_0x2e227a), _0x1fe9ab = DataManager[_0x5ee845(0x4a7)](_0x2e227a, _0x2b4c8f); _0x1ed242 *= _0x1fe9ab[_0x5ee845(0x58f)][_0x9dfe72] ?? 0x1f20 + 0x9 * 0x2ce + -0x385d; } return _0x1ed242; }; Imported['VisuMZ_0_C' + _0x54e01f(0x2ce)] && (VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3fb) + 'erBase_xpa' + _0x54e01f(0x482)] = Game_BattlerBase[_0x54e01f(0x353)]['xparamPlus'], Game_BattlerBase[_0x54e01f(0x353)]['xparamPlus'] = function (_0x1d15f4) { const _0x1c51f6 = _0x54e01f; let _0x4a5737 = VisuMZ['ElementSta' + 'tusCore'][_0x1c51f6(0x3fb) + _0x1c51f6(0x249) + _0x1c51f6(0x482)][_0x1c51f6(0x3bf)](this, _0x1d15f4); return _0x4a5737 = this[_0x1c51f6(0x171) + _0x1c51f6(0x119)](_0x1d15f4, _0x4a5737), _0x4a5737; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3fb) + _0x54e01f(0x434) + 'ramRate'] = Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x428)], Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x428)] = function (_0x29d932) { const _0x2a6f80 = _0x54e01f; let _0x1e18b6 = VisuMZ['ElementSta' + 'tusCore']['Game_Battl' + 'erBase_spa' + _0x2a6f80(0x321)]['call'](this, _0x29d932); return _0x1e18b6 = this['sparamRate' + _0x2a6f80(0x119)](_0x29d932, _0x1e18b6), _0x1e18b6; });; Game_BattlerBase['prototype'][_0x54e01f(0x524) + _0x54e01f(0x330)] = function (_0x4a3c31) { const _0x3b2329 = _0x54e01f, _0x78804b = { 'pRlbT': _0x3b2329(0x20d) }, _0x372cc4 = _0x78804b[_0x3b2329(0x237)]; if (this['checkCache' + _0x3b2329(0x309)](_0x372cc4)) return this[_0x3b2329(0x258)][_0x372cc4]['includes'](_0x4a3c31); const _0x54035d = this[_0x3b2329(0xec)](Game_BattlerBase[_0x3b2329(0x51a) + _0x3b2329(0x43e)]), _0x1c871c = this[_0x3b2329(0x56f) + 'itSets'](); return this[_0x3b2329(0x258)][_0x372cc4] = _0x54035d[_0x3b2329(0x1aa)](_0x1c871c), this['_cache'][_0x372cc4][_0x3b2329(0x4c6)](_0x4a3c31); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x56f) + _0x54e01f(0x33b)] = function () { const _0x136e61 = _0x54e01f; if (!DataManager[_0x136e61(0x1e7) + 'nabled']()) return []; let _0x8e6f15 = []; const _0x4a87c2 = this[_0x136e61(0x36a) + 'tKeys'](); for (const _0x148255 of _0x4a87c2) { const _0x127bb9 = this[_0x136e61(0x36a) + 't'](_0x148255), _0x12130b = DataManager[_0x136e61(0x4a7)](_0x148255, _0x127bb9); _0x8e6f15 = _0x8e6f15[_0x136e61(0x1aa)](_0x12130b['Wtypes']); } return _0x8e6f15; }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x4d1) + _0x54e01f(0x330)] = function (_0x467346) { const _0x16fc8d = _0x54e01f, _0x1e737e = { 'wZXbO': _0x16fc8d(0x1b6) }, _0x1b5186 = _0x1e737e[_0x16fc8d(0x1c3)]; if (this[_0x16fc8d(0x12b) + _0x16fc8d(0x309)](_0x1b5186)) return this[_0x16fc8d(0x258)][_0x1b5186]['includes'](_0x467346); return this[_0x16fc8d(0x258)][_0x1b5186] = this['traitsSet'](Game_BattlerBase['TRAIT_EQUI' + _0x16fc8d(0x3ef)]), this[_0x16fc8d(0x258)][_0x1b5186] = this[_0x16fc8d(0x258)][_0x1b5186][_0x16fc8d(0x1aa)](this[_0x16fc8d(0x28f) + _0x16fc8d(0x33b)]()), this['_cache'][_0x1b5186]['includes'](_0x467346); }, Game_BattlerBase[_0x54e01f(0x353)][_0x54e01f(0x28f) + 'itSets'] = function () { const _0x295b16 = _0x54e01f; if (!DataManager[_0x295b16(0x1e7) + _0x295b16(0xc7)]()) return []; let _0x4ad115 = []; const _0x40c996 = this[_0x295b16(0x36a) + _0x295b16(0x1ac)](); for (const _0x84f3f of _0x40c996) { const _0x573eff = this['getTraitSe' + 't'](_0x84f3f), _0x3e0dad = DataManager[_0x295b16(0x4a7)](_0x84f3f, _0x573eff); _0x4ad115 = _0x4ad115[_0x295b16(0x1aa)](_0x3e0dad['Atypes']); } return _0x4ad115; }, Game_BattlerBase[_0x54e01f(0x353)]['addPassive' + 'StatesTrai' + _0x54e01f(0x239)] = function () { const _0x2ab399 = _0x54e01f, _0x236db3 = { 'UmamZ': _0x2ab399(0x21c) + _0x2ab399(0x513) }; if (!DataManager[_0x2ab399(0x1e7) + _0x2ab399(0xc7)]()) return []; this[_0x2ab399(0x2ec) + 'siveStateT' + _0x2ab399(0x30a)] = !![], this[_0x2ab399(0x258)][_0x236db3[_0x2ab399(0x3aa)]] = this[_0x2ab399(0x258)][_0x236db3['UmamZ']] || []; const _0x4fde16 = this[_0x2ab399(0x36a) + 'tKeys'](); for (const _0x207d3f of _0x4fde16) { const _0x457b95 = this['getTraitSe' + 't'](_0x207d3f), _0x31d65a = DataManager[_0x2ab399(0x4a7)](_0x207d3f, _0x457b95); this[_0x2ab399(0x258)][_0x236db3[_0x2ab399(0x3aa)]] = this[_0x2ab399(0x258)][_0x236db3['UmamZ']][_0x2ab399(0x1aa)](_0x31d65a[_0x2ab399(0x3c9) + 'tes']); } this['_addingPas' + _0x2ab399(0x291) + _0x2ab399(0x30a)] = undefined; }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x36a) + _0x54e01f(0x114)] = function () { const _0x2d61f5 = _0x54e01f; return this[_0x2d61f5(0x27d)](); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x1b5) + '_setup'] = Game_Actor[_0x54e01f(0x353)]['setup'], Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x2c2)] = function (_0x540c58) { const _0x450072 = _0x54e01f; VisuMZ[_0x450072(0x3a0) + _0x450072(0x122)][_0x450072(0x1b5) + '_setup'][_0x450072(0x3bf)](this, _0x540c58), this[_0x450072(0x2f9) + _0x450072(0x23d) + 'e'](), this[_0x450072(0x56a)](); }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x2f9) + _0x54e01f(0x23d) + 'e'] = function () { const _0x33c44b = _0x54e01f; Game_Battler['prototype'][_0x33c44b(0x2f9) + _0x33c44b(0x23d) + 'e'][_0x33c44b(0x3bf)](this), this[_0x33c44b(0x4fe) + _0x33c44b(0x289)](); }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x435) + _0x54e01f(0x1a3)] = function () { const _0x508952 = _0x54e01f; if (this[_0x508952(0x27d)]()[_0x508952(0x2a6)][_0x508952(0x2af)](/<NO RANDOM TRAIT SETS>/i)) return; const _0x4ac8e7 = this['getTraitSe' + _0x508952(0x1ac)](), _0x5b4f03 = VisuMZ[_0x508952(0x3a0) + _0x508952(0x122)]['Settings']; for (const _0x22a22b of _0x4ac8e7) { _0x5b4f03[_0x508952(0x1e5) + 'ctor'] && this['createRand' + _0x508952(0x26e)](_0x22a22b); } }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x4fe) + _0x54e01f(0x289)] = function () { const _0xb7f001 = _0x54e01f; this[_0xb7f001(0x333)] = this[_0xb7f001(0x1b4)](), this[_0xb7f001(0x27d)]()[_0xb7f001(0x2a6)][_0xb7f001(0x2af)](/<BIOGRAPHY>\s*([\s\S]*)\s*<\/BIOGRAPHY>/i) && this[_0xb7f001(0x152) + 'hy'](RegExp['$1']); }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x2dd) + 'hy'] = function () { const _0x43ebf1 = _0x54e01f, _0x380b76 = { 'Xukzr': function (_0x9e767e, _0x3aae93) { return _0x9e767e === _0x3aae93; } }; if (_0x380b76[_0x43ebf1(0x37f)](this[_0x43ebf1(0x333)], undefined)) this[_0x43ebf1(0x4fe) + 'phy'](); return this[_0x43ebf1(0x333)]; }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x152) + 'hy'] = function (_0x3453f5) { const _0x3c7496 = _0x54e01f, _0x581219 = { 'PyIOF': function (_0x16d71d, _0x5d0b2c) { return _0x16d71d === _0x5d0b2c; } }; if (_0x581219[_0x3c7496(0x1c0)](this['_biography'], undefined)) this['initBiogra' + 'phy'](); this[_0x3c7496(0x333)] = _0x3453f5; }, Game_Actor[_0x54e01f(0x353)][_0x54e01f(0x201) + 's'] = function () { const _0x2fb5c3 = _0x54e01f, _0x541551 = this[_0x2fb5c3(0xec)](Game_BattlerBase[_0x2fb5c3(0x51a) + _0x2fb5c3(0x43e)])[_0x2fb5c3(0xe9)]((_0x35cf80, _0x16ac53) => _0x35cf80 - _0x16ac53); return _0x541551[_0x2fb5c3(0x4d9)]((_0xb28f7a, _0x54789c, _0x1159ee) => _0x1159ee[_0x2fb5c3(0x245)](_0xb28f7a) === _0x54789c); }, Game_Actor[_0x54e01f(0x353)]['armorTypes'] = function () { const _0x3223da = _0x54e01f, _0x4d8502 = this[_0x3223da(0xec)](Game_BattlerBase['TRAIT_EQUI' + _0x3223da(0x3ef)])[_0x3223da(0xe9)]((_0x3e66f8, _0x404117) => _0x3e66f8 - _0x404117); return _0x4d8502[_0x3223da(0x4d9)]((_0x251719, _0x32fed7, _0x266403) => _0x266403[_0x3223da(0x245)](_0x251719) === _0x32fed7); }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x36a) + _0x54e01f(0x114)] = function () { const _0x518624 = _0x54e01f; return this[_0x518624(0x387)](); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Game_Enemy' + _0x54e01f(0x2e7)] = Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x2c2)], Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x2c2)] = function (_0x1019bd, _0x5a5a2c, _0x518184) { const _0x532556 = _0x54e01f; VisuMZ[_0x532556(0x3a0) + _0x532556(0x122)][_0x532556(0x40b) + _0x532556(0x2e7)]['call'](this, _0x1019bd, _0x5a5a2c, _0x518184), !Imported[_0x532556(0xd5) + _0x532556(0x20f)] && this[_0x532556(0x2f9) + _0x532556(0x23d) + 'e'](), this[_0x532556(0x1a4)](), this[_0x532556(0x56a)](); }, Game_Enemy['prototype'][_0x54e01f(0x2f9) + 'tStatusCor' + 'e'] = function () { const _0x32a0a3 = _0x54e01f; Game_Battler['prototype']['initElemen' + _0x32a0a3(0x23d) + 'e'][_0x32a0a3(0x3bf)](this), this['createSpec' + _0x32a0a3(0x4e5) + 's'](); }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x435) + _0x54e01f(0x1a3)] = function () { const _0xd0d29b = _0x54e01f; if (this[_0xd0d29b(0x387)]()[_0xd0d29b(0x2a6)][_0xd0d29b(0x2af)](/<NO RANDOM TRAIT SETS>/i)) return; const _0x12a94a = this[_0xd0d29b(0x36a) + _0xd0d29b(0x1ac)](), _0x8e8a57 = VisuMZ[_0xd0d29b(0x3a0) + _0xd0d29b(0x122)][_0xd0d29b(0x3b8)]; for (const _0xd4f41 of _0x12a94a) { _0x8e8a57[_0xd4f41][_0xd0d29b(0x31f) + 'nemy'] && this[_0xd0d29b(0x28b) + _0xd0d29b(0x26e)](_0xd4f41); } }, VisuMZ['ElementSta' + _0x54e01f(0x122)]['Game_Enemy' + _0x54e01f(0x13e)] = Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x4cf)], Game_Enemy[_0x54e01f(0x353)]['name'] = function () { const _0xe5d4f7 = _0x54e01f; return DataManager[_0xe5d4f7(0x1e7) + _0xe5d4f7(0xc7)]() ? this[_0xe5d4f7(0x2fa) + _0xe5d4f7(0x23d) + 'e']() : VisuMZ[_0xe5d4f7(0x3a0) + _0xe5d4f7(0x122)][_0xe5d4f7(0x40b) + _0xe5d4f7(0x13e)]['call'](this); }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x2fa) + _0x54e01f(0x23d) + 'e'] = function () { const _0x154626 = _0x54e01f, _0xc173a0 = { 'ldvmD': _0x154626(0x4cf), 'GVDmN': _0x154626(0x512), 'qrdnl': _0x154626(0x104), 'ZCFSr': _0x154626(0x42a), 'OGDax': _0x154626(0x286), 'vcLSq': _0x154626(0x538), 'CRdNu': _0x154626(0x208), 'tLzrd': _0x154626(0x437), 'lmlYU': _0x154626(0x4a5), 'uwRyN': 'Zodiac', 'wchNQ': _0x154626(0x25c) }, _0x142659 = _0xc173a0[_0x154626(0x382)]; if (this[_0x154626(0x12b) + _0x154626(0x309)](_0x142659)) return this['_cache'][_0x142659]; const _0x1af885 = this[_0x154626(0xe3)](); return _0x1af885[_0x154626(0x143)](this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x39c)])['FmtText'] || '', this['traitSet'](_0xc173a0[_0x154626(0x416)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x55c)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0['OGDax'])[_0x154626(0x533)] || '', this['traitSet'](_0xc173a0[_0x154626(0x1da)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x277)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x313)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x23e)])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0['uwRyN'])[_0x154626(0x533)] || '', this[_0x154626(0x4a7)](_0xc173a0[_0x154626(0x106)])[_0x154626(0x533)] || '', this[_0x154626(0x41c) + 'me'](), this['_plural'] ? this['_letter'] : '')[_0x154626(0x365)](/[\s\n\r]+/g, '\x20')[_0x154626(0xef)](); }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0xe3)] = function () { const _0x2c5de8 = _0x54e01f, _0x3c6a0e = { 'TptTt': function (_0x57e16b, _0x3e5f03) { return _0x57e16b(_0x3e5f03); }, 'xRVrw': _0x2c5de8(0x480), 'XYGUf': _0x2c5de8(0x2c9), 'dSYje': _0x2c5de8(0x30d) }; let _0x486e50 = VisuMZ[_0x2c5de8(0x3a0) + _0x2c5de8(0x122)]['Settings']['TraitSetSe' + _0x2c5de8(0x562)]['EnemyNameF' + 'mt']; return this[_0x2c5de8(0x387)]()['note'][_0x2c5de8(0x2af)](/<TRAIT SET NAME FORMAT>\s*([\s\S]*)\s*<\/TRAIT SET NAME FORMAT>/i) && (_0x486e50 = _0x3c6a0e['TptTt'](String, RegExp['$1'])), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[ELEMENT\]/gi, '%1'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[SUBELEMENT\]/gi, '%2'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[GENDER\]/gi, '%3'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[RACE\]/gi, '%4'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[NATURE\]/gi, '%5'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[ALIGNMENT\]/gi, '%6'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[BLESSING\]/gi, '%7'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[CURSE\]/gi, '%8'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[ZODIAC\]/gi, '%9'), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[VARIANT\]/gi, _0x3c6a0e[_0x2c5de8(0x57c)]), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[NAME\]/gi, _0x3c6a0e[_0x2c5de8(0x406)]), _0x486e50 = _0x486e50[_0x2c5de8(0x365)](/\[LETTER\]/gi, _0x3c6a0e[_0x2c5de8(0x4f6)]), _0x486e50; }, VisuMZ['ElementSta' + 'tusCore'][_0x54e01f(0x40b) + _0x54e01f(0x43f)] = Game_Enemy[_0x54e01f(0x353)]['setLetter'], Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x3c2)] = function (_0x33b55a) { const _0x4fe87f = _0x54e01f; this['_cache'] = {}, VisuMZ['ElementSta' + 'tusCore'][_0x4fe87f(0x40b) + _0x4fe87f(0x43f)][_0x4fe87f(0x3bf)](this, _0x33b55a); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x40b) + '_setPlural'] = Game_Enemy[_0x54e01f(0x353)]['setPlural'], Game_Enemy[_0x54e01f(0x353)]['setPlural'] = function (_0xae2216) { const _0x4e67d5 = _0x54e01f; this[_0x4e67d5(0x258)] = {}, VisuMZ[_0x4e67d5(0x3a0) + 'tusCore'][_0x4e67d5(0x40b) + _0x4e67d5(0x361)][_0x4e67d5(0x3bf)](this, _0xae2216); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x40b) + _0x54e01f(0x419)] = Game_Enemy['prototype'][_0x54e01f(0x168)], Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x168)] = function () { const _0xeec8f = _0x54e01f; let _0x3040d6 = VisuMZ[_0xeec8f(0x3a0) + _0xeec8f(0x122)][_0xeec8f(0x40b) + _0xeec8f(0x419)][_0xeec8f(0x3bf)](this); return this[_0xeec8f(0x2d3) + 'ts'](_0x3040d6); }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x40b) + '_gold'] = Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x251)], Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x251)] = function () { const _0x25b63f = _0x54e01f; let _0x2e9c7c = VisuMZ[_0x25b63f(0x3a0) + 'tusCore'][_0x25b63f(0x40b) + _0x25b63f(0x13b)][_0x25b63f(0x3bf)](this); return this[_0x25b63f(0x2d1) + _0x25b63f(0xe6)](_0x2e9c7c); }, VisuMZ['ElementSta' + _0x54e01f(0x122)]['Game_Enemy' + _0x54e01f(0x191) + _0x54e01f(0x234)] = Game_Enemy['prototype'][_0x54e01f(0x220) + 'te'], Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x220) + 'te'] = function () { const _0x4f751c = _0x54e01f; let _0x28aa31 = VisuMZ[_0x4f751c(0x3a0) + _0x4f751c(0x122)][_0x4f751c(0x40b) + '_dropItemR' + 'ate'][_0x4f751c(0x3bf)](this); return this[_0x4f751c(0x220) + _0x4f751c(0x440) + 's'](_0x28aa31); }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x2d3) + 'ts'] = function (_0x781d96) { const _0x1d825d = _0x54e01f, _0x5130d7 = { 'AnpiI': function (_0x35c32b, _0x3a58a0) { return _0x35c32b !== _0x3a58a0; } }; if (!DataManager['traitSetsE' + _0x1d825d(0xc7)]()) return _0x781d96; const _0x4dd10b = this[_0x1d825d(0x36a) + _0x1d825d(0x1ac)](); for (const _0x4e3ea9 of _0x4dd10b) { const _0x2824aa = this[_0x1d825d(0x36a) + 't'](_0x4e3ea9), _0x58306b = DataManager[_0x1d825d(0x4a7)](_0x4e3ea9, _0x2824aa); _0x781d96 *= _0x5130d7[_0x1d825d(0x297)](_0x58306b['EXPRate'], undefined) ? _0x58306b[_0x1d825d(0xdd)] : 0x80f * 0x4 + -0x1f76 + 0x1 * -0xc5; } return Math[_0x1d825d(0x322)](_0x781d96); }, Game_Enemy['prototype'][_0x54e01f(0x2d1) + 'ets'] = function (_0x2a591b) { const _0xc941b5 = _0x54e01f, _0x1fb817 = { 'RDrSY': function (_0x11caf9, _0x1a55aa) { return _0x11caf9 !== _0x1a55aa; } }; if (!DataManager[_0xc941b5(0x1e7) + _0xc941b5(0xc7)]()) return _0x2a591b; const _0x33dfcd = this['getTraitSe' + _0xc941b5(0x1ac)](); for (const _0x5b0241 of _0x33dfcd) { const _0xeb8f26 = this[_0xc941b5(0x36a) + 't'](_0x5b0241), _0x1ea8c9 = DataManager[_0xc941b5(0x4a7)](_0x5b0241, _0xeb8f26); _0x2a591b *= _0x1fb817[_0xc941b5(0x131)](_0x1ea8c9[_0xc941b5(0x331)], undefined) ? _0x1ea8c9[_0xc941b5(0x331)] : 0x3d * -0x63 + 0x1 * 0x174b + -0x4d * -0x1; } return Math[_0xc941b5(0x322)](_0x2a591b); }, Game_Enemy[_0x54e01f(0x353)]['dropItemRa' + 'teTraitSet' + 's'] = function (_0x32707c) { const _0x478352 = _0x54e01f, _0x10d756 = { 'gCveg': function (_0x4b3247, _0x55eec1) { return _0x4b3247 !== _0x55eec1; } }; if (!DataManager['traitSetsE' + _0x478352(0xc7)]()) return _0x32707c; const _0x527b1c = this['getTraitSe' + _0x478352(0x1ac)](); for (const _0x216b23 of _0x527b1c) { const _0x34e6c8 = this['getTraitSe' + 't'](_0x216b23), _0x5ae3f6 = DataManager['traitSet'](_0x216b23, _0x34e6c8); _0x32707c *= _0x10d756[_0x478352(0x4e1)](_0x5ae3f6['DropRate'], undefined) ? _0x5ae3f6[_0x478352(0x4e2)] : 0x262f + -0xffe + -0x1630; } return _0x32707c; }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x252) + 'ialBattler' + 's'] = function () { const _0x11194a = _0x54e01f, _0x6a96d9 = { 'BYPHx': _0x11194a(0x52e) + _0x11194a(0x51d) + '2', 'maVKd': function (_0x51ac97, _0x36013b) { return _0x51ac97(_0x36013b); }, 'rkFbi': _0x11194a(0x52e) + _0x11194a(0x2b3) + '2', 'OAfbR': function (_0x52efe2, _0x9f3896) { return _0x52efe2(_0x9f3896); }, 'taDun': _0x11194a(0x117) + _0x11194a(0x138), 'mrpsX': _0x11194a(0x117) + _0x11194a(0x4db), 'uNEIn': function (_0xbc5c9e, _0xba49c1) { return _0xbc5c9e(_0xba49c1); }, 'HIFvl': function (_0x27f09b, _0x55ae90) { return _0x27f09b(_0x55ae90); } }; this['_specialBa' + _0x11194a(0xfe)] = { 'name': this['enemy']()[_0x11194a(0x1fa) + 'e'], 'hue': this[_0x11194a(0x387)]()[_0x11194a(0x4dd)] }; const _0x2a9e6f = this['enemy']()[_0x11194a(0x2a6)], _0x2b644a = this['getTraitSe' + _0x11194a(0x1ac)](); for (const _0x50e334 of _0x2b644a) { const _0x4dff85 = this['traitSet'](_0x50e334)[_0x11194a(0x240)][_0x11194a(0x27e) + 'e']()['trim'](), _0x4d77bd = _0x50e334[_0x11194a(0x27e) + 'e']()[_0x11194a(0xef)](); if (_0x2a9e6f[_0x11194a(0x2af)](VisuMZ[_0x11194a(0x3a0) + _0x11194a(0x122)][_0x11194a(0x537)][_0x6a96d9['BYPHx']['format'](_0x4d77bd, _0x4dff85)])) this[_0x11194a(0x466) + 'ttler'][_0x11194a(0x4cf)] = _0x6a96d9['maVKd'](String, RegExp['$1']); else { if (_0x2a9e6f[_0x11194a(0x2af)](VisuMZ[_0x11194a(0x3a0) + _0x11194a(0x122)]['RegExp'][_0x6a96d9[_0x11194a(0x51e)]['format'](_0x4d77bd, _0x4dff85)])) { const _0x444036 = _0x6a96d9[_0x11194a(0x359)](String, RegExp['$1'])[_0x11194a(0x349)](/[\r\n]+/)[_0x11194a(0x3f3)](''); this[_0x11194a(0x466) + _0x11194a(0xfe)][_0x11194a(0x4cf)] = DataManager[_0x11194a(0x202) + _0x11194a(0x19b) + 'a'](_0x444036); } } if (_0x2a9e6f[_0x11194a(0x2af)](VisuMZ['ElementSta' + _0x11194a(0x122)][_0x11194a(0x537)][_0x6a96d9['taDun'][_0x11194a(0x143)](_0x4d77bd, _0x4dff85)])) this[_0x11194a(0x466) + _0x11194a(0xfe)][_0x11194a(0x118)] = _0x6a96d9[_0x11194a(0x55e)](Number, RegExp['$1'])[_0x11194a(0x23a)](0x1 * 0x2692 + -0xa20 + -0xb * 0x296, -0x1a8b + -0x15 * 0x1bc + 0x405f); else { if (_0x2a9e6f['match'](VisuMZ[_0x11194a(0x3a0) + _0x11194a(0x122)]['RegExp'][_0x6a96d9['mrpsX'][_0x11194a(0x143)](_0x4d77bd, _0x4dff85)])) { const _0x2e4e8c = _0x6a96d9[_0x11194a(0x156)](String, RegExp['$1'])[_0x11194a(0x349)](/[\r\n]+/)[_0x11194a(0x3f3)](''); this['_specialBa' + _0x11194a(0xfe)][_0x11194a(0x118)] = _0x6a96d9[_0x11194a(0x2b8)](Number, DataManager[_0x11194a(0x202) + 'domizedDat' + 'a'](_0x2e4e8c))['clamp'](0x1d0e + 0xb7 * -0x2d + 0x31d, 0xbbc + -0xcef + 0x29b * 0x1); } } } }, Game_Enemy['prototype'][_0x54e01f(0x3e7) + _0x54e01f(0x4e5) + 's'] = function () { const _0x132b80 = _0x54e01f, _0x121623 = { 'TvFpX': _0x132b80(0x4ff) + 'olo-%1-%2', 'jYGcE': function (_0x311565, _0x251874) { return _0x311565(_0x251874); }, 'iJmtW': _0x132b80(0x29d) + _0x132b80(0x1a7), 'UIQFu': _0x132b80(0x31c) + _0x132b80(0x4cc), 'OEBOO': _0x132b80(0x190) + 'ss-%1-%2', 'WrBZm': function (_0x3f31a4, _0x81d913) { return _0x3f31a4(_0x81d913); }, 'xDbnS': _0x132b80(0x599) + 'leSolo-%1-' + '%2', 'HonAU': _0x132b80(0x599) + _0x132b80(0x35c) + '%2' }; this[_0x132b80(0x252) + 'ialBattler' + 's'](); if (!Imported[_0x132b80(0xd5) + 'attleCore']) return; this['_svBattler' + _0x132b80(0x217)] = this['_svBattler' + _0x132b80(0x217)] || { 'name': '', 'wtypeId': settings[_0x132b80(0x588)], 'collapse': settings[_0x132b80(0x224) + _0x132b80(0x3b7)], 'motionIdle': settings[_0x132b80(0x3af)], 'width': settings[_0x132b80(0x572)] || 0x2521 * -0x1 + -0x15b0 + 0x3b11 * 0x1, 'height': settings[_0x132b80(0x304)] || -0xd1d + -0x205d * -0x1 + -0x8 * 0x260, 'anchorX': settings['AnchorX'] || -0x1e4a + -0x50 * 0xb + -0x21ba * -0x1, 'anchorY': settings[_0x132b80(0x490)] || -0x20c5 + -0x25ab + 0x4670, 'shadow': settings['Shadow'] }; const _0x14f1ef = this[_0x132b80(0x579) + _0x132b80(0x217)], _0x221ca6 = this['enemy']()[_0x132b80(0x2a6)], _0x1f2236 = this[_0x132b80(0x36a) + 'tKeys'](); for (const _0x48e3f1 of _0x1f2236) { const _0x32ce04 = this[_0x132b80(0x4a7)](_0x48e3f1)[_0x132b80(0x240)]['toUpperCas' + 'e']()[_0x132b80(0xef)](), _0x1d4225 = _0x48e3f1[_0x132b80(0x27e) + 'e']()[_0x132b80(0xef)](); if (_0x221ca6[_0x132b80(0x2af)](VisuMZ[_0x132b80(0x3a0) + _0x132b80(0x122)][_0x132b80(0x537)][_0x121623[_0x132b80(0x4af)]['format'](_0x1d4225, _0x32ce04)])) _0x14f1ef[_0x132b80(0x4cf)] = _0x121623['jYGcE'](String, RegExp['$1']); else { if (_0x221ca6[_0x132b80(0x2af)](VisuMZ['ElementSta' + _0x132b80(0x122)]['RegExp'][_0x121623[_0x132b80(0x34e)][_0x132b80(0x143)](_0x1d4225, _0x32ce04)])) { const _0x53851d = _0x121623['jYGcE'](String, RegExp['$1'])[_0x132b80(0x349)](/[\r\n]+/)[_0x132b80(0x3f3)](''); _0x14f1ef[_0x132b80(0x4cf)] = DataManager[_0x132b80(0x202) + _0x132b80(0x19b) + 'a'](_0x53851d), console['log'](_0x14f1ef[_0x132b80(0x4cf)]); } } if (_0x221ca6[_0x132b80(0x2af)](VisuMZ['ElementSta' + 'tusCore'][_0x132b80(0x537)][_0x121623['UIQFu'][_0x132b80(0x143)](_0x1d4225, _0x32ce04)])) _0x14f1ef['wtypeId'] = DataManager[_0x132b80(0x4be) + _0x132b80(0xf8)](RegExp['$1']); else { if (_0x221ca6['match'](VisuMZ[_0x132b80(0x3a0) + _0x132b80(0x122)][_0x132b80(0x537)][_0x121623['OEBOO'][_0x132b80(0x143)](_0x1d4225, _0x32ce04)])) { const _0x4e7ca5 = _0x121623['WrBZm'](String, RegExp['$1'])[_0x132b80(0x349)](/[\r\n]+/)[_0x132b80(0x3f3)](''), _0x211c44 = DataManager[_0x132b80(0x202) + 'domizedDat' + 'a'](_0x4e7ca5); _0x14f1ef[_0x132b80(0x23b)] = DataManager[_0x132b80(0x4be) + 'WithName'](_0x211c44); } } if (_0x221ca6[_0x132b80(0x2af)](VisuMZ[_0x132b80(0x3a0) + 'tusCore']['RegExp'][_0x121623[_0x132b80(0x3b0)]['format'](_0x1d4225, _0x32ce04)])) _0x14f1ef[_0x132b80(0x13c)] = _0x121623[_0x132b80(0x44a)](String, RegExp['$1'])[_0x132b80(0x4f4) + 'e']()['trim'](); else { if (_0x221ca6[_0x132b80(0x2af)](VisuMZ['ElementSta' + _0x132b80(0x122)][_0x132b80(0x537)][_0x121623[_0x132b80(0x4b0)][_0x132b80(0x143)](_0x1d4225, _0x32ce04)])) { const _0x37cd0a = _0x121623[_0x132b80(0x44a)](String, RegExp['$1'])[_0x132b80(0x349)](/[\r\n]+/)[_0x132b80(0x3f3)](''); _0x14f1ef[_0x132b80(0x13c)] = DataManager[_0x132b80(0x202) + _0x132b80(0x19b) + 'a'](_0x37cd0a); } } } }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x1fa) + 'e'] = function () { const _0x5224fd = _0x54e01f; if (!this[_0x5224fd(0x466) + _0x5224fd(0xfe)]) this[_0x5224fd(0x252) + _0x5224fd(0x4e5) + 's'](); return this[_0x5224fd(0x466) + _0x5224fd(0xfe)]['name']; }, Game_Enemy[_0x54e01f(0x353)][_0x54e01f(0x4dd)] = function () { const _0x45d044 = _0x54e01f; if (!this['_specialBa' + _0x45d044(0xfe)]) this[_0x45d044(0x252) + 'ialBattler' + 's'](); return this['_specialBa' + _0x45d044(0xfe)][_0x45d044(0x118)]; }, VisuMZ['ElementSta' + 'tusCore']['Game_Enemy' + _0x54e01f(0x577)] = Game_Enemy[_0x54e01f(0x353)]['transform'], Game_Enemy['prototype'][_0x54e01f(0x21b)] = function (_0x4aa0ce) { const _0x4ce41c = _0x54e01f; VisuMZ[_0x4ce41c(0x3a0) + _0x4ce41c(0x122)]['Game_Enemy' + '_transform']['call'](this, _0x4aa0ce), this[_0x4ce41c(0x2f9) + 'tStatusCor' + 'e'](), this[_0x4ce41c(0x252) + 'ialBattler' + 's'](), this[_0x4ce41c(0x1a4)](); }, Game_Troop[_0x54e01f(0x353)][_0x54e01f(0x4df) + _0x54e01f(0x50b)] = function () { const _0x2cf367 = _0x54e01f; for (const _0x5afed5 of this[_0x2cf367(0x397)]()) { _0x5afed5 && (_0x5afed5[_0x2cf367(0x456)] = '', _0x5afed5['_plural'] = ![], _0x5afed5['updateSpec' + _0x2cf367(0x4e5) + 's']()); } this[_0x2cf367(0x444) + 't'] = {}, this[_0x2cf367(0x350) + 'Names'](); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0xfd) + _0x54e01f(0x1ca)] = function () { const _0x153313 = _0x54e01f, _0x1bfb4a = { 'PtkEB': function (_0x588443, _0x3daa18) { return _0x588443 !== _0x3daa18; } }; if (ConfigManager[_0x153313(0x22c) + 'e'] && _0x1bfb4a[_0x153313(0x2fc)](ConfigManager['uiHelpPosi' + 'tion'], undefined)) return ConfigManager[_0x153313(0x183) + _0x153313(0x501)]; else { if (this[_0x153313(0x4e0) + _0x153313(0x197) + _0x153313(0x308) + _0x153313(0x375)]()) return this[_0x153313(0x1ee) + _0x153313(0xbc)]()[_0x153313(0x2af)](/LOWER/i); else Scene_MenuBase[_0x153313(0x353)][_0x153313(0x372) + _0x153313(0x2d6)][_0x153313(0x3bf)](this); } }, Scene_Status[_0x54e01f(0x353)]['updatedLay' + _0x54e01f(0xbc)] = function () { const _0x2f4973 = _0x54e01f; return VisuMZ['ElementSta' + _0x2f4973(0x122)][_0x2f4973(0x3b8)][_0x2f4973(0x1b3)]['LayoutStyl' + 'e']; }, Scene_Status['prototype'][_0x54e01f(0x4e0) + _0x54e01f(0x197) + 'reUpdatedL' + _0x54e01f(0x375)] = function () { const _0x462570 = _0x54e01f; return VisuMZ[_0x462570(0x3a0) + _0x462570(0x122)][_0x462570(0x3b8)][_0x462570(0x1b3)][_0x462570(0x575) + 'ut']; }, VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)]['Scene_Stat' + _0x54e01f(0x469)] = Scene_Status['prototype']['create'], Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x56c)] = function () { const _0x41bdc0 = _0x54e01f; this[_0x41bdc0(0x4e0) + _0x41bdc0(0x197) + _0x41bdc0(0x308) + _0x41bdc0(0x375)]() ? (this['createElem' + _0x41bdc0(0x37e) + _0x41bdc0(0x4bf)](), this[_0x41bdc0(0x55f) + _0x41bdc0(0x37e) + 'oreWindowB' + 'g']()) : VisuMZ[_0x41bdc0(0x3a0) + _0x41bdc0(0x122)]['Scene_Stat' + _0x41bdc0(0x469)][_0x41bdc0(0x3bf)](this); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x216) + _0x54e01f(0x37e) + _0x54e01f(0x4bf)] = function () { const _0x153f80 = _0x54e01f; Scene_MenuBase[_0x153f80(0x353)][_0x153f80(0x56c)][_0x153f80(0x3bf)](this), this[_0x153f80(0x108) + 'Window'](), this[_0x153f80(0x2fe) + _0x153f80(0x385)](), this['createData' + 'Window'](); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x55f) + _0x54e01f(0x37e) + 'oreWindowB' + 'g'] = function () { const _0x16fa24 = _0x54e01f; if (!Imported[_0x16fa24(0x516) + _0x16fa24(0x2ce)]) return; const _0x25ce96 = Scene_Status['layoutSett' + _0x16fa24(0x54d)][_0x16fa24(0x267) + 'pe']; this[_0x16fa24(0x2f0) + 'w']['setBackgro' + _0x16fa24(0x27b)](_0x25ce96), this[_0x16fa24(0x129) + 'indow']['setBackgro' + 'undType'](_0x25ce96), this[_0x16fa24(0x39e) + 'w'][_0x16fa24(0x113) + _0x16fa24(0x27b)](_0x25ce96); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0xbe) + _0x54e01f(0x439)] = function () { const _0xbb7cdb = _0x54e01f; return this[_0xbb7cdb(0x4e0) + _0xbb7cdb(0x197) + _0xbb7cdb(0x308) + 'ayout']() ? Scene_MenuBase[_0xbb7cdb(0x353)][_0xbb7cdb(0xbe) + 'ight'][_0xbb7cdb(0x3bf)](this) : 0x347 * 0x3 + -0x431 * 0x2 + -0x173; }, Scene_Status[_0x54e01f(0x353)]['helpWindow' + 'Rect'] = function () { const _0xa6aa53 = _0x54e01f; return this[_0xa6aa53(0x4e0) + _0xa6aa53(0x197) + _0xa6aa53(0x308) + _0xa6aa53(0x375)]() ? this[_0xa6aa53(0x155) + _0xa6aa53(0x2d8) + _0xa6aa53(0x23d) + 'e']() : Scene_MenuBase['prototype']['helpWindow' + _0xa6aa53(0x274)][_0xa6aa53(0x3bf)](this); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x155) + 'RectElemen' + 'tStatusCor' + 'e'] = function () { const _0x3150e3 = _0x54e01f, _0x25f515 = 0xc1 * -0x31 + -0x47 * -0x42 + 0x12a3, _0x274126 = this[_0x3150e3(0x177) + 'p'](), _0x44068d = Graphics[_0x3150e3(0xd0)], _0x4b6b91 = this[_0x3150e3(0xbe) + _0x3150e3(0x439)](); return new Rectangle(_0x25f515, _0x274126, _0x44068d, _0x4b6b91); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x2fe) + _0x54e01f(0x385)] = function () { const _0x1b2112 = _0x54e01f, _0x4da6a7 = { 'IfHAy': 'cancel', 'dOBrx': _0x1b2112(0x214), 'GVMIW': _0x1b2112(0x2e3) }, _0x580fd9 = this[_0x1b2112(0x3d1) + _0x1b2112(0x4d8)](); this[_0x1b2112(0x129) + _0x1b2112(0x2a2)] = new Window_StatusCategory(_0x580fd9), this[_0x1b2112(0x129) + 'indow'][_0x1b2112(0x3ec)](_0x4da6a7[_0x1b2112(0x300)], this[_0x1b2112(0x2a8)]['bind'](this)), this[_0x1b2112(0x129) + _0x1b2112(0x2a2)][_0x1b2112(0x3ec)](_0x4da6a7['dOBrx'], this[_0x1b2112(0x503)][_0x1b2112(0x19c)](this)), this[_0x1b2112(0x129) + _0x1b2112(0x2a2)]['setHandler'](_0x4da6a7['GVMIW'], this[_0x1b2112(0x103) + _0x1b2112(0x1a9)][_0x1b2112(0x19c)](this)), this[_0x1b2112(0x30e)](this[_0x1b2112(0x129) + _0x1b2112(0x2a2)]); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x3d1) + _0x54e01f(0x4d8)] = function () { const _0x2ab7c8 = _0x54e01f, _0x4c892c = { 'cqSKv': function (_0x20c373, _0x2326f5) { return _0x20c373 - _0x2326f5; } }, _0x5d615a = Graphics[_0x2ab7c8(0xd0)], _0x4bde33 = this[_0x2ab7c8(0x510) + _0x2ab7c8(0x304)](0x1 * -0x1047 + 0x8e8 + -0x760 * -0x1, !![]), _0x28900b = -0x1fb3 + -0x138b * 0x1 + -0x7 * -0x752; let _0x2adf3a = -0x1a * -0xd + 0x8f5 * 0x3 + 0x1 * -0x1c31; return this[_0x2ab7c8(0x1ee) + _0x2ab7c8(0xbc)]()[_0x2ab7c8(0x2af)](/TOP/i) ? _0x2adf3a = this[_0x2ab7c8(0x561) + 'p']() : _0x2adf3a = _0x4c892c[_0x2ab7c8(0x363)](this[_0x2ab7c8(0x123) + 'ttom'](), _0x4bde33), new Rectangle(_0x28900b, _0x2adf3a, _0x5d615a, _0x4bde33); }, Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x147) + _0x54e01f(0x33c)] = function () { const _0x545685 = _0x54e01f, _0x493070 = this['dataWindow' + 'Rect'](); this[_0x545685(0x39e) + 'w'] = new Window_StatusData(_0x493070), this[_0x545685(0x30e)](this[_0x545685(0x39e) + 'w']), this[_0x545685(0x129) + 'indow'][_0x545685(0x414) + _0x545685(0x3e3)](this['_dataWindo' + 'w']); }, Scene_Status['prototype'][_0x54e01f(0x1f9) + 'Rect'] = function () { const _0x45efa8 = _0x54e01f, _0x34da39 = { 'vPVlb': function (_0x4004ff, _0x521236) { return _0x4004ff - _0x521236; }, 'drtFY': function (_0x2ddd0c, _0x3f4cd1) { return _0x2ddd0c + _0x3f4cd1; } }, _0x32f7a1 = Graphics[_0x45efa8(0xd0)], _0x5c929a = _0x34da39[_0x45efa8(0xdb)](this[_0x45efa8(0x2fb) + _0x45efa8(0x439)](), this[_0x45efa8(0x129) + _0x45efa8(0x2a2)]['height']), _0x497cd0 = 0x947 + 0x199 * -0x5 + -0x14a; let _0x3bf030 = 0x1 * 0xce5 + 0x12aa + 0x3 * -0xa85; return this[_0x45efa8(0x1ee) + 'outStyle']()[_0x45efa8(0x2af)](/TOP/i) ? _0x3bf030 = _0x34da39[_0x45efa8(0x53e)](this[_0x45efa8(0x129) + 'indow']['y'], this[_0x45efa8(0x129) + 'indow']['height']) : _0x3bf030 = this[_0x45efa8(0x561) + 'p'](), new Rectangle(_0x497cd0, _0x3bf030, _0x32f7a1, _0x5c929a); }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x1f5) + _0x54e01f(0x1e4) + _0x54e01f(0x2df)] = Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x4c5) + 'or'], Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x4c5) + 'or'] = function () { const _0x196212 = _0x54e01f; this[_0x196212(0x4e0) + _0x196212(0x197) + _0x196212(0x308) + _0x196212(0x375)]() ? this[_0x196212(0x4c5) + _0x196212(0x584) + _0x196212(0xe1)]() : VisuMZ[_0x196212(0x3a0) + _0x196212(0x122)]['Scene_Stat' + _0x196212(0x1e4) + _0x196212(0x2df)][_0x196212(0x3bf)](this); }, Scene_Status['prototype'][_0x54e01f(0x4c5) + _0x54e01f(0x584) + 'tatusCore'] = function () { const _0x4e9603 = _0x54e01f, _0x5b1285 = this[_0x4e9603(0x27d)](); this[_0x4e9603(0x2f0) + 'w'][_0x4e9603(0xce)](_0x5b1285['profile']()), this['_dataWindo' + 'w'][_0x4e9603(0x19e)](_0x5b1285); }, VisuMZ['ElementSta' + _0x54e01f(0x122)][_0x54e01f(0x1f5) + 'us_onActor' + _0x54e01f(0x209)] = Scene_Status[_0x54e01f(0x353)][_0x54e01f(0x3cb) + 'nge'], Scene_Status['prototype']['onActorCha' + _0x54e01f(0x467)] = function () { const _0x1d929b = _0x54e01f; this['isUseEleme' + _0x1d929b(0x197) + _0x1d929b(0x308) + 'ayout']() ? this[_0x1d929b(0x3cb) + _0x1d929b(0x54e) + 'StatusCore']() : VisuMZ[_0x1d929b(0x3a0) + _0x1d929b(0x122)]['Scene_Stat' + _0x1d929b(0x35f) + _0x1d929b(0x209)][_0x1d929b(0x3bf)](this); }, Scene_Status[_0x54e01f(0x353)]['onActorCha' + 'ngeElement' + _0x54e01f(0x4fd)] = function () { const _0x3939c2 = _0x54e01f; Scene_MenuBase[_0x3939c2(0x353)][_0x3939c2(0x3cb) + 'nge'][_0x3939c2(0x3bf)](this), this[_0x3939c2(0x4c5) + 'or'](), this[_0x3939c2(0x129) + _0x3939c2(0x2a2)]['activate'](); }, Window_Base['prototype'][_0x54e01f(0x3be) + _0x54e01f(0x323)] = function (_0x11316f, _0x569a84, _0x5cced8, _0x4dd7c8, _0x219b9c) { const _0x347280 = _0x54e01f, _0x13c8d4 = { 'KhMMy': function (_0x42c421, _0x120df2) { return _0x42c421 || _0x120df2; }, 'UBunA': function (_0x5e111f, _0x53f58c) { return _0x5e111f + _0x53f58c; }, 'jjbJD': function (_0x5b7abc, _0x18f45a) { return _0x5b7abc + _0x18f45a; }, 'TggHe': function (_0x40a116, _0x25f69f) { return _0x40a116 - _0x25f69f; }, 'zMLzo': function (_0x310157, _0x98c66d) { return _0x310157 - _0x98c66d; } }; _0x219b9c = Math[_0x347280(0x1b2)](_0x13c8d4[_0x347280(0x276)](_0x219b9c, -0x7 * -0x2ab + 0x1d * -0x2f + -0x1 * 0xd59), 0x6ba + -0x891 + 0x1d8); while (_0x219b9c--) { _0x4dd7c8 = _0x4dd7c8 || this['lineHeight'](), this[_0x347280(0x4f0) + 'ck'][_0x347280(0x295) + 'ty'] = -0x1 * 0x17c2 + 0x1ed5 + -0x673; const _0x52f372 = ColorManager['gaugeBackC' + _0x347280(0x165)](); this[_0x347280(0x4f0) + 'ck']['fillRect'](_0x13c8d4[_0x347280(0x362)](_0x11316f, -0x2 * 0xa2d + -0x1c9 * -0x13 + -0xd90), _0x13c8d4[_0x347280(0x1eb)](_0x569a84, 0x2506 + -0xc58 + -0x18ad * 0x1), _0x13c8d4[_0x347280(0x53c)](_0x5cced8, -0x1478 + 0x1fa3 + -0x1 * 0xb29), _0x13c8d4[_0x347280(0x41b)](_0x4dd7c8, -0x4 * -0x6a3 + -0x15cf * -0x1 + -0x3059 * 0x1), _0x52f372), this[_0x347280(0x4f0) + 'ck'][_0x347280(0x295) + 'ty'] = 0x23e4 + -0xc66 + -0x1 * 0x167f; } }; function _0x1cfe() { const _0x256134 = ['RandomWeig', 'ATK', 'getReflect', 'FromNoteta', 'add', 'powerUpCol', '_elementID', 'rements', 'XIGaA', 'xPdcQ', 'aqqVi', 'VocabDmgAb', '_traitSets', '_specialBa', 'nge', '====', 'us_create', 'n_itemCri', 'updateComm', 'IDs', 'MaQkq', 'BMvkN', 'SjLFF', 'Param%1', 'EXXkn', 'ZCzeZ', 'DEFAULT', 'eVLkb', 'JKjEo', 'RUtTp', 'VQITT', 'EVA', 'on\x20does\x20no', 'TuSjH', 'parameters', 'lor', 'Plugin\x20Man', 'SsPmG', 'RuleAverag', '%10', 'ePlus', 'ramPlus', 'R\x20HUES>\x5cs*', 'qnuOW', 'BHtSn', 'DsDPa', 'calcTarget', 'Group', 'sparam', 'NotetagPlu', 'callUpdate', 'DJejU', 'drawParamV', 'raitSetFro', 'currentCla', 'AnchorY', 'nofxn', 'xoBCL', 'MbFwD', '>\x5cs*([\x5cs\x5cS', 'ohYZK', 'dLRFF', '\x20into\x20the\x20', 'getColor', 'HhPET', 'traitHitRa', 'Ggwbe', 'length', 'ategoryDat', 'OzKDc', 'ist.\x0aIt\x20is', 'ARRAYSTRUC', 'getParamVa', 'YwnaN', 'ZoumG', '\x5cI[%1]%2', 'Curse', 'multiply', 'traitSet', 'processDra', 'hasTraitSe', 'AGI', 'mmand', 'andNameWin', 'erageRate', 'UgcIF', 'TvFpX', 'HonAU', 'ASTLD', 'ing', 'RganI', 'opacity', 'ZybVk', 'DNXcj', 'IconSet', 'cqgtz', 'iptionFont', 'e\x20plugin\x20l', '\x5c.?\x5cd+)', 'QKfVj', 'YUsnq', 'getWtypeId', 'ore', 'initMember', 'getMenuIma', 'clearEleme', 'sorb', 'resetTextC', 'refreshAct', 'includes', 'Plus', 'FsXvM', 'ZZfNR', '5|4|2|1|3|', 'EeMnK', 'lo-%1-%2', 'ARRAYEVAL', 'jorRJ', 'name', '\x20a\x20Tier\x20%2', 'isEquipAty', 'drawParamT', '_atypeWidt', 'n_itemMrf', 'OBThx', 'aitSetFrom', 'gnpqu', 'ndowRect', 'filter', 'ier\x20number', 'Mass-%1-%2', 'ementRate', 'battlerHue', 'LNSvB', 'onChangeEn', 'isUseEleme', 'gCveg', 'DropRate', 'Loaded', '_resetFont', 'ialBattler', 'Wtype', 'Range', 'Per', '\x5cC[16]%1:\x20', 'MRF', 'LVbXS', 'MDF', '\x5cC[0]%2', 'lable', 'cbTqb', 'contentsBa', 'ZSnWK', 'qIoSy', 'PNeUj', 'toLowerCas', 'elementRat', 'dSYje', 'NevHe', '(.*)', 'OkUvl', 'constructo', 'STRUCT', 'DmgReceive', 'StatusCore', 'initBiogra', 'SvBattlerS', 'traitCol1', 'tion', 'ull', 'nextActor', 'WIACC', 'Egnud', 'ss-%1-%2', 'rqCiM', 'TEqWn', 'ygOxk', 'attackElem', 'emyTraits', 'wsesQ', 'gaugeLineH', 'eight', 'tRate', 'calcWindow', 'eoYkM', 'Element', 'tes', 'glgEm', 'euzRM', 'VisuMZ_0_C', 'jPOeb', 'fiysh', 'uOAon', 'TRAIT_EQUI', 'SPDyR', 'tags', 'eSolo-%1-%', 'rkFbi', 's.\x0aPlease\x20', 'XFvnu', 'xPNrS', 'Blwje', 'ZtSnn', 'isEquipWty', 'teProduct', 'LFhtT', 'Nnnpm', 'dElements', 'KyDFR', 'RiDau', 'jXOEm', '2|%3)\x20RATE', 'dth', 'BattlerNam', '10|2|0|7', 're_RegExp', 'pSqCg', 'hkram', 'FmtText', 'blt', 'itemCri', 'xeNqI', 'RegExp', 'Nature', 'NJjFH', 'NUM', 'BlgDL', 'TggHe', 'Bonus', 'drtFY', 'IUjpy', 'l%1', 'textColor', 'dvHMP', 'ZCHJZ', 'ZHxmG', 'npBWA', 'fontSize', 'height', 'eIbtl', 'right', 'ES>', 'rDtoK', 'resetWordW', 'ings', 'ngeElement', 'ElementsCo', 'index', 'HxGvz', 'changePain', '5421996oRwXVB', 'nRate', 'clear', 'Symbol', 'TRG', 'CHkYp', 'EleRecPlus', 'innerHeigh', 'kpKIE', 'ZCFSr', 'Step1', 'maVKd', 'updateElem', 'PpSqy', 'mainAreaTo', 'ttings', '176550hnwAWu', 'applyTrait', 'itemTextAl', 'atypeWidth', 'iVqdr', 'zZXFe', 'SEVTz', 'recoverAll', 'iconHeight', 'create', 'jAIeo', 'leSolo-%1-', 'wtypeOkTra', 'GKTJd', '==========', 'Width', 'Rate', 'shift', 'EnableLayo', 'FkdHV', '_transform', 'FpLCh', '_svBattler', 'qWPrm', 'gHuAm', 'xRVrw', 'yOOsd', 'bFyfr', 'doIVu', 'rVSUi', 'tionFontSi', 'teSum', 'hhNHx', 'orElementS', 'ltipliersV', 'makeTraitS', 'leCheck', 'WtypeId', 'makeRandom', 'Ssqbe', 'calcUserEl', 'itemMrf', 'REIWc', 'lineHeight', 'SParams', 'AsReG', 'NJPyv', 'width', 'Atype', 'kXnYD', 'AytTE', 'YPVZP', 'param', 'MMvLs', 'SvMotionId', 'zvhCA', '*([\x5cs\x5cS]*)', 'mYoSX', 'outStyle', 'wBackgroun', 'helpAreaHe', 'NNCLm', 'currentExt', 'elementId', 'LPHBC', 'EXR', 'TraitCheck', 're_Compati', 'LGRLN', 'nabled', 'eWindowCen', 'tsKgG', 'getParamNa', 'bhnaL', 'RZMtn', 'zSEAZ', 'setText', 'jViPd', 'boxWidth', 'ing\x20a\x20requ', 'EMENT\x20(?:%', 'LyUcB', 'rWavJ', 'VisuMZ_1_B', 'ter', 'BooOq', 'lementRefl', 'R\x20NAME:\x20(.', 'pMgcz', 'vPVlb', 'RuleAdditi', 'EXPRate', 'Notetags', 'tVVDw', 'ents', 'tatusCore', 'PHA', 'nameFormat', 'dONnI', 'jzEGW', 'ets', 'makeMassTr', 'zIkPr', 'sort', 'elsnv', 'hcjNe', 'traitsSet', 'tMembers', 'ties', 'trim', 'drawFirstC', 'ReTQI', 'LXwlk', 'ams', 'torMenuIma', 'vvNPZ', '%1\x20is\x20miss', 'highest', 'WithName', '<%1DEALT\x20E', 'setWordWra', 'n_executeD', '_commandNa', 'isBottomHe', 'ttler', '_tp', 'currentExp', 'Help', 'changeText', 'previousAc', 'SubElement', 'HkiuT', 'wchNQ', 'WGrzw', 'createHelp', 'itemPaddin', 'nXszu', 'elementsAv', 'registerCo', 'Biography', 'tULsm', 'HIT', 'OmELV', 'traitHitPl', 'sum', 'setBackgro', 'tObject', 'JdwsH', 'lvdFp', 'BattlerHue', 'hue', 'TraitSets', 'dIkMP', 'WmQNR', 'FyHvd', 'elements', 'STR', '%1\x27s\x20versi', 'eDjKm', '<%1\x20BATTLE', 'tusCore', 'mainAreaBo', 'drawItemAc', 'OmwLK', 'bVghy', 'W\x20BATTLERS', 'ect', '_categoryW', '_battleCor', 'checkCache', '8eLAgZH', 'TZote', 'getDealtEl', 'getExclude', 'LCmyZ', 'RDrSY', 'Display', 'MDR', 'log', 'TyvcD', 'Descriptio', 'RpSig', 'Solo-%1-%2', 'yleIcon', 'critical', '_gold', 'motionIdle', 'isArray', '_name', 'yleIconTex', 'WpWNa', 'Nzumy', 'EleForceJS', 'format', 'fdzYQ', 'eAddedElem', '(\x5cd+)([%％]', 'createData', 'IDsCol2', 'ist\x20from\x20s', 'update', 'status', 'UQANU', 'EleRecRate', 'Label', 'ram', 'innerWidth', 'lUGOh', 'setBiograp', 'e\x20it\x20in\x20th', 'KceEq', 'helpWindow', 'uNEIn', 'PtZCO', 'ceivedElem', 'TCR', 'enuImage', 'VocabWtype', 'map', 'TJBQC', 'NojVB', 'fmpbq', 'acJjq', 'EEwEt', 'hdidU', 'lue', 'optDisplay', 'olor', 'EnemyChang', 'resetDescr', 'exp', 'tener', 'hTWSX', 'Step1Start', 'canPierceE', 'ementFlat', 'exit', 'drawElemen', 'DvTAA', 'xparamRate', 'statusMenu', 'setDescrip', '11YyLgVz', 'aJHXj', 'EleForcePe', 'helpAreaTo', 'meetsEquip', 'drawItemSt', 'eSghQ', 'drawGenera', 'randomInt', 'windowPadd', 'SXtmP', 'rWIaW', 'ugin\x27s.\x20Pl', 'iconWidth', 'pdiDH', 'uiHelpPosi', 'PIFYq', 'xQBus', 'XParam%1', 'lement', 'ErMNe', 'IDsColRaw', 'EZbas', 'MAXMP', 'loadFace', 'drawParamN', 'IsKlr', 'edExp', 'SvWeaponMa', '_dropItemR', 'drawParame', 'eCalcJS', '([\x5c+\x5c-]\x5cd+', 'JZNMi', 'Default', 'ntStatusCo', 'placeGauge', 'YgaOS', 'text', 'domizedDat', 'bind', '%2\x20%3:[\x20]%', 'setActor', ']*)\x5cs*<\x5c/%', 'YMArW', 'eGqMk', 'getDataSys', 'mTraitSets', 'refresh', 'D\x20ELEMENT\x20', 'soFtm', 'ass-%1-%2', 'SingularTr', 'tor', 'concat', 'erBase_ele', 'tKeys', 'traitCriti', 'KrZbf', 'nextRequir', '1748egOFsL', 'CUFWY', 'max', 'StatusMenu', 'profile', 'Game_Actor', 'AtypeOk', 'fontSizeRa', 'drawIcon', 're_TraitSe', 'mIImm', 'mentRate', 'rrectly\x20pl', 'alt', 'commandSty', 'Game_Actio', 'PyIOF', 'GRD', 'fill', 'wZXbO', 'DGVoX', 'EnwOJ', 'PDR', '%1\x20is\x20inco', 'additive', 'subject', 'lpMode', 'fWzIf', 'REC', 'dmCss', 'CNT', 'WZWUY', 'wsHVm', 'canBypassE', 'rKFNL', 'iHiKm', '<%1RECEIVE', 'Elements', 'DEF', 'eNoElement', 'traitHealM', 'ctNotetag', 'vcLSq', 'min', 'CEV', 'VocabBiogr', 'AaxlN', 'AsdaR', 'rkyUn', 'SbsFM', '<%1\x20SIDEVI', 'lVfdN', 'us_refresh', 'RandomizeA', 'EHChG', 'traitSetsE', 'drawTextEx', 'List', 'TXsAq', 'jjbJD', 'DrawJS', 'vrZXS', 'updatedLay', 'reduce', 'ments', '_onDatabas', 'taVbS', 'ufXHe', 'XKORv', 'Scene_Stat', '(\x5cd+\x5c.?\x5cd+', 'ARRAYJSON', 'Dumvm', 'dataWindow', 'battlerNam', 'zeToTraitS', 're_Paramet', 'ign', 'rcKSp', 'EleDmgRate', 'elementsRa', 'weaponType', 'processRan', 'ceil', '<%1FORCE\x20R', 'uImageAvai', 'SsniM', 'traitDmgMu', 'Alignment', 'Change', 'CalxF', 'tkvQB', 'ters', 'WtypeOk', 'pAqLQ', 'attleCore', 'Color', '([\x5cs\x5cS]*)\x5c', 'Element-%1', 'skillTypes', 'pagedown', 'LAhXy', 'createElem', 'Data', 'descriptio', 'NotetagRat', 'XTaan', 'transform', 'passiveSta', 'Fbhjo', 'EleDmgPlus', 'some', 'dropItemRa', 'EleDmgFlat', 'ementPlus', 'BnqID', 'AllowColla', 'CFsDS', 'ONIEK', 'JSON', 'multiplica', '3luPFSK', 'drawActorF', 'pdLEW', 'uiMenuStyl', 'qOLSC', 'calPlusMul', 'WlxFw', 'XRyFr', 'dFHNM', 'aced\x20over\x20', 'ZdHsp', 'ate', 'PCFgP', 'EW\x20BATTLER', 'pRlbT', 'XusUN', 'tSets', 'clamp', 'wtypeId', 'expTotal', 'tStatusCor', 'lmlYU', 'XParams', 'Name', 'esYkF', 'XquJP', 'textSizeEx', '415JlQNaU', 'indexOf', 'eTextColor', 'amRate', 'elementsMa', 'erBase_xpa', 'nbcfl', 'ctionEleme', 'xparam', 'FsSpX', 'ReceivedRa', 'keys', 'Equip', 'gold', 'createSpec', '2451364prlNva', 'xiDRs', 'itemLineRe', 'XWJgI', '*<\x5c/%1\x20SID', '_cache', ':\x20(.*)>', 'Visible', 'Jnjec', 'Variant', 'jBiBm', 'Tktxk', 'Zodiac', 'LUK', 'amage', 'WRtOQ', 'YqTcS', 'ItemActorM', 'CmdTextAli', 'Text', 'StatusBgTy', 'Step1End', 'BmIVP', 'oJNAp', 'drawActorG', 'aptNE', 'wKKVx', 'omTraitSet', 'setTraitSe', 'PZzQH', 'YuWIb', 'tipliersVs', 'age', 'Rect', 'FinalizeRa', 'KhMMy', 'CRdNu', 'VuQfo', '_stypeWidt', 'wDHyt', 'undType', 'TTLER\x20HUES', 'actor', 'toUpperCas', 'TIONS>\x5cs*(', 'mList', 'OTQNh', 'vVnfH', 'DmgAbsorb', 'initialize', 'FUTiX', 'Race', 'addLoadLis', 'ZgjJw', 'phy', 'naqEa', 'createRand', 'RmAEg', '\x20(.*)>', 'SetsByObje', 'atypeOkTra', 'ActorChang', 'siveStateT', '_actor', 'DFQTb', 'isPlaytest', 'paintOpaci', 'ORooN', 'AnpiI', 'other\x20Tier', 'traitObjec', 'DmgDealt', 'ultipliers', 'maxTp', 'SvBattlerM', 'OkNov', 'OAUtq', 'INkek', 'R\x20NAMES>\x5cs', 'indow', 'kxMXG', 'LufIL', 'jsTgf', 'note', 'aMCuB', 'popScene', 'pWELp', 'JFXPG', 'getParamet', 'etFromNote', 'ConvertPar', 'calRateMul', 'match', 'BSjpU', 'dElementID', 'systemColo', 'eMass-%1-%', 'znYci', 'textWidth', 'KnPgA', 'lowest', 'HIFvl', 'createComm', 'elementsMi', 'Params', 'tOpacity', 'makeComman', 'tOBpG', 'BackRectCo', '\x5cN[%1]', 'eLoaded', 'setup', 'raphic', 'Flt', 'Element%1', 'UKsAA', 'QdPkM', 'RHRTt', '%11', 'entRate', 'SIpln', 're_Battler', 'ugpmo', 'oreEngine', 'gRuth', 'hTSGy', 'goldTraitS', 'center', 'expTraitSe', 'FzhvG', 'drawText', 'utMode', '%1%', 'RectElemen', '_commandLi', 'erBase_par', 'faceHeight', 'ulScB', 'getBiograp', 'JS\x20', 'Actor', 'ARRAYNUM', 'erList', 'UFBea', 'pageup', 'YeLfh', 'eTraitSets', 'FGKjV', '_setup', 'process_Vi', 'cnZkx', '#%1', 'drawActorI', '_addingPas', 'essageCore', 'biDEJ', 'hsSXm', '_helpWindo', 'cJSa', 'ByName', 'paramRateT', '%1:\x20%2', '1242960gxEDIT', 'erBase_can', 'minimum', 'Dlbsn', 'initElemen', 'nameElemen', 'mainAreaHe', 'PtkEB', 'Epflc', 'createCate', 'FFEme', 'IfHAy', 'IQhkV', 'eWindowDra', 'lJAFu', 'Height', 'random', '_drawData', 'drawing', 'reUpdatedL', 'Key', 'raitSets', 'zZvHJ', 'temTypesWi', '%12', 'addWindow', 'actorId', 'tTICe', 'vSQIj', 'kJKQQ', 'tLzrd', 'bHUBk', 'setDrawDat', '-------', 'FDR', 'ersVs', 'FWrks', 'ainMenuCor', 'ElementPlu', 'SvWeaponSo', 'RKfNJ', 'RuleMaxCal', 'RandomizeE', 'FBQmF', 'ramRate', 'round', 'rkRect', 'mIwVY', 'UywrZ', 'makeSingul', 'faceWidth', 'drawProper', 'KksCk', 'getActionO', '1\x20SIDEVIEW', 'TraitRequi', 'gyRBa', 'teMultipli', 'JKBRW', 'peOk', 'GoldRate', 'QGmVy', '_biography', 'onDatabase', 'gMNrj', 'WWtTv', '_wtypeWidt', 'AAMCe', 'inBattle', 'R\x20HUE:\x20(\x5cd', 'itSets', 'Window', 'ElementRul', 'EcpIn', 'OgSiB', 'damage', 'MAT', 'UzORe', 'maGvx', 'arTraitSet', 'EleRec', 'HLqOv', '3499029AYERfm', 'meWindow', 'split', 'GUFxS', 'CTTKH', 'Resist', 'getRandomT', 'iJmtW', 'ettings', 'makeUnique', 'IfbUt', 't\x20match\x20pl', 'prototype', 'NjZXa', 'nClmA', 'icon', 'hjbnN', 'nEpyd', 'OAfbR', 'usFLk', 'aphy', 'leMass-%1-', 'bgxhA', 'avg', 'us_onActor', 'ntChanges', '_setPlural', 'UBunA', 'cqSKv', 'Enable', 'replace', 'aceBack', 'veCalcJS', 'getPierced', 'FIGjG', 'getTraitSe', 'IDsCol1', 'LVgxY', 'WYFpg', 'stypeWidth', 'test', 'uscty', 'teJS', 'isRightInp', 'DrawBackRe', 'NxhnC', 'ayout', 'TraitDescr', 'QmUGG', 'ByjDd', 'calcElemen', 'CRI', 'contents', '[\x5cs\x5cS]*)\x5cs', 'kytpG', 'entStatusC', 'Xukzr', 'MvEBF', 'yQhmI', 'ldvmD', 'VocabDmgRe', 'hMGUU', 'goryWindow', 'yEJyT', 'enemy', 'S>\x5cs*([\x5cs\x5c', 'heoyH', 'average', '\x20MOTIONS>', 'ease\x20updat', '40452UNiaFz', 'vduDI', 'resetFontS', 'RPqcZ', '\x20largest\x20t', 'TfZMQ', 'BEnkT', 'jhQra', 'afDPt', 'aced\x20on\x20th', 'members', 'dVesD', 'HRG', 'gJTeW', 'OQMSQ', 'GVDmN', 'GMmce', '_dataWindo', 'ztYfw', 'ElementSta', '+%1', 'getElement', 'mRFcO', 'NwdcB', 'mallest\x20to', 'gDxGQ', 'Gvvsn', 'expNext', '%1%2%3', 'UmamZ', 'wText', 'ame', 'drawItem', 'eForcedEle', 'MotionIdle', 'xDbnS', 'eBiography', 'koFgr', 'WukIz', 'canEquip', 'eRuling', 'Flat', 'pse', 'Settings', 'Ddwpe', 'dRIvD', 'PsopL', 'SxEwu', 'WUUjB', 'drawItemDa', 'call', 'EleDmg', '854cxxTMI', 'setLetter', 'IdWithName', 'kQnga', 'Stype', 'rlWTa', 'xRate', 'getAbsorbe', 'PassiveSta', 'EleForceFl', 'onActorCha', 'lQNpa', 'getForcedA', 'YESHj', 'traitCol2', 'eRate', 'categoryWi', 'BhEiv', 'BYnGN', 'VfpQB', 'MMvuu', '\x5cs*<\x5c/%1\x20B', 'ARRAYFUNC', 'executeDam', 'ivyXD', 'push', 'addCommand', 'ElementRat', '+)>', 'dZwrQ', 'uVeJW', 'ers', 's*<\x5c/%1\x20BA', 'ILogR', 'dow', 'crppV', 'ext', 'PfuiY', 'updateSpec', 'eFlat', 'EMFrJ', 'ARRAYSTR', 'WhTlr', 'setHandler', 'mainFontSi', 'getReceive', 'P_ATYPE', 'vYIfT', 'isMaxLevel', 'RandomVali', 'remove', 'traitSetTy', 'tive', 'IUFSB', 'yDmFr', 'EW\x20IDLE\x20MO', 'HSesZ', 'isActorMen', 'Game_Battl', 'Col%1', '9|3|6|5|12', 'MEV', 'level', 'FbVhy', 'TGR', 'n_itemHit', 'EVAL', 'maxItems', 'drawActorL', 'XYGUf', '(?:%1|%2)', 'Size', 'mString', 'alue', 'Game_Enemy', 'usMultipli', 'AZSJL', 'TSrdE', 'zUSmY', 'bjectEleme', 'tio', 'sqGId', 'onLoadDraw', 'setItemWin', 'yadFc', 'qrdnl', 'TbfTo', 'erBase_ref', '_exp', 'gToti', 'zMLzo', 'originalNa', 'loadSystem', '\x20WEAPONS>', 'EleRecFlat', '%1\x20SIDEVIE', '_itemWindo', 'nts', 'fillRect', 'mmAlT', 'PvrJX', 'resh', 'rait\x20Sets\x20', 'sparamRate', 'itemHit', 'Gender', 'item', 'iKWpV', 'ementDamag', ')([%％])', 'MAXHP', 'RTxVV', 'basicDataH', 'rtbkn', 'SParam%1', 'erBase_spa', 'applyRando', 'kBiwk', 'Blessing', 'Ilwme', 'ight', 'VisuMZ_1_M', 'PzstL', 'XJZix', 'commandNam', 'P_WTYPE', '_setLetter', 'teTraitSet', ':[\x20]%4>', 'akydx', 'DSAQy', '_namesCoun', 'ivoUp', 'parse', 'suMZ_Eleme', 'YixgK', 'qMTfz', 'jYGcE', 'paramchang', '0|1|2|3|4', 'QCVFw', 'KwkhD', 'isCommandE', 'CrWSd', 'iconText', 'ceive', 'mfYiw', 'YumZU', 'PwGxe', '_letter', 'rap', 'floor']; _0x1cfe = function () { return _0x256134; }; return _0x1cfe(); } function Window_StatusCategory() { const _0x42281c = _0x54e01f; this[_0x42281c(0x284)](...arguments); } Window_StatusCategory[_0x54e01f(0x2d9) + 'st'] = VisuMZ[_0x54e01f(0x3a0) + _0x54e01f(0x122)][_0x54e01f(0x3b8)][_0x54e01f(0x1b3) + 'List'], Window_StatusCategory[_0x54e01f(0x353)] = Object[_0x54e01f(0x56c)](Window_HorzCommand[_0x54e01f(0x353)]), Window_StatusCategory[_0x54e01f(0x353)]['constructo' + 'r'] = Window_StatusCategory, Window_StatusCategory['prototype'][_0x54e01f(0x284)] = function (_0x148d24) { const _0x335178 = _0x54e01f; Window_HorzCommand[_0x335178(0x353)][_0x335178(0x284)][_0x335178(0x3bf)](this, _0x148d24), this[_0x335178(0x2b9) + _0x335178(0x4ac) + _0x335178(0x3e3)](_0x148d24); }, Window_StatusCategory['prototype'][_0x54e01f(0x2b9) + 'andNameWin' + _0x54e01f(0x3e3)] = function (_0x43b513) { const _0x47ef80 = _0x54e01f, _0x48b5c6 = new Rectangle(0x2ba + 0x31a * 0x7 + -0x1870, 0x1 * -0x59f + -0x72 + 0x611, _0x43b513[_0x47ef80(0x592)], _0x43b513[_0x47ef80(0x547)]); this['_commandNa' + _0x47ef80(0x348)] = new Window_Base(_0x48b5c6), this['_commandNa' + 'meWindow'][_0x47ef80(0x4b4)] = -0xde + -0x2 * -0x77 + -0x10 * 0x1, this['addChild'](this[_0x47ef80(0xfc) + 'meWindow']), this[_0x47ef80(0x46b) + _0x47ef80(0x4ac) + _0x47ef80(0x3e3)](); }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x48b) + _0x54e01f(0x101)] = function () { const _0x782e07 = _0x54e01f; Window_HorzCommand[_0x782e07(0x353)][_0x782e07(0x48b) + _0x782e07(0x101)]['call'](this); if (this[_0x782e07(0xfc) + _0x782e07(0x348)]) this[_0x782e07(0x46b) + _0x782e07(0x4ac) + _0x782e07(0x3e3)](); }, Window_StatusCategory['prototype'][_0x54e01f(0x46b) + 'andNameWin' + _0x54e01f(0x3e3)] = function () { const _0x5e3f38 = _0x54e01f, _0x2d4e94 = { 'VuQfo': function (_0x3fc7de, _0x479e0d) { return _0x3fc7de === _0x479e0d; }, 'MaQkq': _0x5e3f38(0x356) }, _0x2b5db3 = this[_0x5e3f38(0xfc) + _0x5e3f38(0x348)]; _0x2b5db3['contents'][_0x5e3f38(0x555)](); const _0x36ae43 = this[_0x5e3f38(0x1be) + _0x5e3f38(0x587)](this[_0x5e3f38(0x550)]()); if (_0x2d4e94[_0x5e3f38(0x278)](_0x36ae43, _0x2d4e94[_0x5e3f38(0x46d)])) { const _0x57cf4e = this[_0x5e3f38(0x255) + 'ct'](this['index']()); let _0x4a5278 = this[_0x5e3f38(0x43d) + 'e'](this[_0x5e3f38(0x550)]()); _0x4a5278 = _0x4a5278[_0x5e3f38(0x365)](/\\I\[(\d+)\]/gi, ''), _0x2b5db3[_0x5e3f38(0x38f) + _0x5e3f38(0x34f)](), this[_0x5e3f38(0x43d) + _0x5e3f38(0x302) + _0x5e3f38(0xbd) + 'd'](_0x4a5278, _0x57cf4e), this[_0x5e3f38(0x43d) + 'eWindowDra' + _0x5e3f38(0x3ab)](_0x4a5278, _0x57cf4e), this[_0x5e3f38(0x43d) + _0x5e3f38(0xc8) + _0x5e3f38(0xd6)](_0x4a5278, _0x57cf4e); } }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x43d) + _0x54e01f(0x302) + _0x54e01f(0xbd) + 'd'] = function (_0x262b8, _0x134959) { }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x43d) + 'eWindowDra' + 'wText'] = function (_0x3bedfb, _0x2b6b1b) { const _0x3b4529 = _0x54e01f, _0x4c987b = { 'BmIVP': _0x3b4529(0x2d2) }, _0xfde964 = this[_0x3b4529(0xfc) + _0x3b4529(0x348)]; _0xfde964[_0x3b4529(0x2d5)](_0x3bedfb, 0x116a + 0x6d1 * -0x1 + -0xa99, _0x2b6b1b['y'], _0xfde964['innerWidth'], _0x4c987b[_0x3b4529(0x269)]); }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x43d) + _0x54e01f(0xc8) + _0x54e01f(0xd6)] = function (_0x3b5eb5, _0x9865d6) { const _0x57bc80 = _0x54e01f, _0x469936 = { 'AaxlN': function (_0x17955c, _0x280d82) { return _0x17955c + _0x280d82; }, 'BooOq': function (_0x3e13d3, _0x4d1c67) { return _0x3e13d3 + _0x4d1c67; }, 'Ssqbe': function (_0x42fa72, _0x531ed9) { return _0x42fa72 / _0x531ed9; } }, _0x165c84 = this[_0x57bc80(0xfc) + _0x57bc80(0x348)], _0x48d66d = $gameSystem[_0x57bc80(0x17d) + _0x57bc80(0x4b2)](), _0x48c405 = _0x469936[_0x57bc80(0x1de)](_0x469936[_0x57bc80(0xd7)](_0x9865d6['x'], Math['floor'](_0x469936[_0x57bc80(0x58a)](_0x9865d6[_0x57bc80(0x592)], 0xf * 0x7a + 0x28d + -0x9b1))), _0x48d66d); _0x165c84['x'] = _0x469936[_0x57bc80(0xd7)](_0x469936[_0x57bc80(0x58a)](_0x165c84[_0x57bc80(0x592)], -(0x1 * -0x1f49 + 0x39e + 0x221 * 0xd)), _0x48c405), _0x165c84['y'] = Math[_0x57bc80(0x458)](_0x469936['Ssqbe'](_0x9865d6[_0x57bc80(0x547)], -0x168f + -0x743 + 0x2 * 0xeea)); }, Window_StatusCategory[_0x54e01f(0x353)]['maxCols'] = function () { const _0x55e2bd = _0x54e01f; return VisuMZ[_0x55e2bd(0x3a0) + 'tusCore'][_0x55e2bd(0x3b8)][_0x55e2bd(0x1b3) + _0x55e2bd(0x1e9)][_0x55e2bd(0x49c)]; }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x14a)] = function () { const _0x3cf9e8 = _0x54e01f; Window_HorzCommand[_0x3cf9e8(0x353)][_0x3cf9e8(0x14a)][_0x3cf9e8(0x3bf)](this), this[_0x3cf9e8(0x421) + 'w'] && this[_0x3cf9e8(0x421) + 'w'][_0x3cf9e8(0x315) + 'a'](this[_0x3cf9e8(0xc0)]()); }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x414) + 'dow'] = function (_0x489bde) { const _0x491295 = _0x54e01f; this[_0x491295(0x421) + 'w'] = _0x489bde; }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x2bd) + 'dList'] = function () { const _0x4329a8 = _0x54e01f, _0x111ff6 = { 'taVbS': 'Untitled', 'esYkF': function (_0x190e1e, _0x4bba73) { return _0x190e1e > _0x4bba73; }, 'WpWNa': function (_0x4b3ae1, _0x335f48) { return _0x4b3ae1 !== _0x335f48; }, 'LVbXS': _0x4329a8(0x19a), 'ZSnWK': _0x4329a8(0x4a4) }; for (const _0x105aff of Window_StatusCategory[_0x4329a8(0x2d9) + 'st']) { const _0x400f34 = _0x105aff[_0x4329a8(0x556)], _0xec10 = _0x105aff['Icon']; let _0x523f02 = _0x105aff[_0x4329a8(0x266)]; if (['', _0x111ff6[_0x4329a8(0x1f2)]][_0x4329a8(0x4c6)](_0x523f02)) continue; _0x111ff6[_0x4329a8(0x241)](_0xec10, 0x12ea + 0x1c1 * -0x13 + 0xe69) && _0x111ff6[_0x4329a8(0x140)](this[_0x4329a8(0x1be) + 'le'](), _0x111ff6[_0x4329a8(0x4eb)]) && (_0x523f02 = _0x111ff6[_0x4329a8(0x4f1)][_0x4329a8(0x143)](_0xec10, _0x523f02)); const _0x1420a1 = _0x105aff[_0x4329a8(0x1ec)]; this[_0x4329a8(0x3db)](_0x523f02, _0x400f34, !![], _0x1420a1); } }, Window_StatusCategory[_0x54e01f(0x353)]['itemTextAl' + _0x54e01f(0x1fd)] = function () { const _0x33a71d = _0x54e01f; return VisuMZ[_0x33a71d(0x3a0) + 'tusCore'][_0x33a71d(0x3b8)]['StatusMenu'][_0x33a71d(0x265) + 'gn']; }, Window_StatusCategory['prototype'][_0x54e01f(0x3ad)] = function (_0x9b96f2) { const _0x3eacfc = _0x54e01f, _0x28e550 = { 'hdidU': function (_0x51a490, _0x4917de) { return _0x51a490 === _0x4917de; }, 'uscty': _0x3eacfc(0x451), 'HhPET': 'icon' }, _0x24f1c6 = this[_0x3eacfc(0x1be) + _0x3eacfc(0x587)](_0x9b96f2); if (_0x28e550[_0x3eacfc(0x162)](_0x24f1c6, _0x28e550[_0x3eacfc(0x370)])) this[_0x3eacfc(0x179) + _0x3eacfc(0x13f) + 't'](_0x9b96f2); else _0x28e550['hdidU'](_0x24f1c6, _0x28e550[_0x3eacfc(0x499)]) ? this[_0x3eacfc(0x179) + 'yleIcon'](_0x9b96f2) : Window_HorzCommand[_0x3eacfc(0x353)]['drawItem'][_0x3eacfc(0x3bf)](this, _0x9b96f2); }, Window_StatusCategory['prototype'][_0x54e01f(0x1be) + 'le'] = function () { const _0x582b59 = _0x54e01f; return VisuMZ['ElementSta' + 'tusCore'][_0x582b59(0x3b8)][_0x582b59(0x1b3)]['CmdStyle']; }, Window_StatusCategory[_0x54e01f(0x353)]['commandSty' + 'leCheck'] = function (_0x896961) { const _0x5180aa = _0x54e01f, _0x28d19b = { 'zdEaG': function (_0xce6b63, _0x4255f3) { return _0xce6b63 < _0x4255f3; }, 'CrWSd': _0x5180aa(0x19a), 'NJPyv': function (_0x10583e, _0x2089e8) { return _0x10583e !== _0x2089e8; }, 'BSjpU': 'auto', 'acJjq': function (_0x1f1c8d, _0x13e98b) { return _0x1f1c8d > _0x13e98b; }, 'kJKQQ': function (_0x4f9da1, _0x47e1e3) { return _0x4f9da1 <= _0x47e1e3; }, 'HLqOv': 'iconText', 'LFhtT': _0x5180aa(0x356) }; if (_0x28d19b['zdEaG'](_0x896961, -0x1847 + 0x261 + 0x1 * 0x15e6)) return _0x28d19b[_0x5180aa(0x450)]; const _0x5af354 = this[_0x5180aa(0x1be) + 'le'](); if (_0x28d19b[_0x5180aa(0x591)](_0x5af354, _0x28d19b[_0x5180aa(0x2b0)])) return _0x5af354; else { if (_0x28d19b[_0x5180aa(0x160)](this[_0x5180aa(0x404)](), -0x1389 + -0x157c + 0x1 * 0x2905)) { const _0x5d53eb = this['commandNam' + 'e'](_0x896961); if (_0x5d53eb[_0x5180aa(0x2af)](/\\I\[(\d+)\]/i)) { const _0x35d808 = this[_0x5180aa(0x255) + 'ct'](_0x896961), _0x323585 = this[_0x5180aa(0x243)](_0x5d53eb)[_0x5180aa(0x592)]; return _0x28d19b[_0x5180aa(0x312)](_0x323585, _0x35d808['width']) ? _0x28d19b[_0x5180aa(0x346)] : _0x28d19b[_0x5180aa(0x526)]; } } } return _0x28d19b[_0x5180aa(0x450)]; }, Window_StatusCategory[_0x54e01f(0x353)][_0x54e01f(0x179) + 'yleIconTex' + 't'] = function (_0x147015) { const _0x2ffe48 = _0x54e01f, _0x49baa7 = { 'MRNbL': function (_0x5838fa, _0x484a34) { return _0x5838fa === _0x484a34; }, 'gnpqu': 'right', 'RHRTt': function (_0x403c47, _0x396422) { return _0x403c47 - _0x396422; }, 'NJjFH': function (_0x31f498, _0x281b1f) { return _0x31f498 + _0x281b1f; }, 'pSqCg': _0x2ffe48(0x2d2), 'AsReG': function (_0x314ba1, _0x4be296) { return _0x314ba1 / _0x4be296; } }, _0x275923 = this[_0x2ffe48(0x255) + 'ct'](_0x147015), _0x26cd6b = this[_0x2ffe48(0x43d) + 'e'](_0x147015), _0x5b4213 = this[_0x2ffe48(0x243)](_0x26cd6b)[_0x2ffe48(0x592)]; this[_0x2ffe48(0x552) + _0x2ffe48(0x2bc)](this[_0x2ffe48(0x44f) + 'nabled'](_0x147015)); const _0x2f4267 = this[_0x2ffe48(0x565) + _0x2ffe48(0x1fd)](); if (_0x49baa7['MRNbL'](_0x2f4267, _0x49baa7[_0x2ffe48(0x4d7)])) this['drawTextEx'](_0x26cd6b, _0x49baa7[_0x2ffe48(0x2c8)](_0x49baa7[_0x2ffe48(0x539)](_0x275923['x'], _0x275923[_0x2ffe48(0x592)]), _0x5b4213), _0x275923['y'], _0x5b4213); else { if (_0x49baa7['MRNbL'](_0x2f4267, _0x49baa7[_0x2ffe48(0x531)])) { const _0x2a9470 = _0x49baa7['NJjFH'](_0x275923['x'], Math[_0x2ffe48(0x458)](_0x49baa7[_0x2ffe48(0x590)](_0x49baa7[_0x2ffe48(0x2c8)](_0x275923[_0x2ffe48(0x592)], _0x5b4213), -0x3c9 * -0x1 + -0x180 * 0x7 + -0x1 * -0x6b9))); this['drawTextEx'](_0x26cd6b, _0x2a9470, _0x275923['y'], _0x5b4213); } else this[_0x2ffe48(0x1e8)](_0x26cd6b, _0x275923['x'], _0x275923['y'], _0x5b4213); } }, Window_StatusCategory['prototype'][_0x54e01f(0x179) + _0x54e01f(0x139)] = function (_0x2cca60) { const _0x12f7be = _0x54e01f, _0x3426be = { 'ZtSnn': function (_0xd63f68, _0x5b6a97) { return _0xd63f68(_0x5b6a97); }, 'jBiBm': function (_0x295471, _0x5285e7) { return _0x295471 + _0x5285e7; }, 'yadFc': function (_0x5a0d92, _0x29a516) { return _0x5a0d92 / _0x29a516; }, 'tOBpG': function (_0x86aa57, _0x55043d) { return _0x86aa57 - _0x55043d; }, 'VfpQB': function (_0x36a29b, _0x12326a) { return _0x36a29b - _0x12326a; } }; this[_0x12f7be(0x43d) + 'e'](_0x2cca60)[_0x12f7be(0x2af)](/\\I\[(\d+)\]/i); const _0x594b96 = _0x3426be[_0x12f7be(0x523)](Number, RegExp['$1']) || 0x1915 * 0x1 + 0x2565 + -0x3e7a, _0x35ddb7 = this[_0x12f7be(0x255) + 'ct'](_0x2cca60), _0x2c46f1 = _0x3426be[_0x12f7be(0x25d)](_0x35ddb7['x'], Math[_0x12f7be(0x458)](_0x3426be[_0x12f7be(0x415)](_0x3426be[_0x12f7be(0x2be)](_0x35ddb7[_0x12f7be(0x592)], ImageManager[_0x12f7be(0x181)]), 0x58e * -0x2 + 0x8 * -0x324 + 0x243e))), _0x8c0964 = _0x3426be['jBiBm'](_0x35ddb7['y'], _0x3426be[_0x12f7be(0x415)](_0x3426be[_0x12f7be(0x3d4)](_0x35ddb7[_0x12f7be(0x547)], ImageManager[_0x12f7be(0x56b)]), 0xa0 * 0x11 + -0x11b0 + 0x16a * 0x5)); this[_0x12f7be(0x1b8)](_0x594b96, _0x2c46f1, _0x8c0964); }; function _0x3428(_0x4bb215, _0x501c4f) { const _0x46f163 = _0x1cfe(); return _0x3428 = function (_0x49c650, _0xfe554d) { _0x49c650 = _0x49c650 - (0x6c1 + 0x6ed * 0x4 + -0x7f * 0x44); let _0x31bfc1 = _0x46f163[_0x49c650]; return _0x31bfc1; }, _0x3428(_0x4bb215, _0x501c4f); } function Window_StatusData() { const _0x4b2954 = _0x54e01f; this[_0x4b2954(0x284)](...arguments); } Window_StatusData[_0x54e01f(0x353)] = Object[_0x54e01f(0x56c)](Window_StatusBase[_0x54e01f(0x353)]), Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x4fa) + 'r'] = Window_MenuStatus, Window_StatusData[_0x54e01f(0x500)] = ['Gender', _0x54e01f(0x538), 'Blessing', _0x54e01f(0x25f)][_0x54e01f(0x4d9)](_0x3faeee => { const _0x25dbb4 = _0x54e01f, _0x3ebd91 = DataManager[_0x25dbb4(0x3f4) + 'pe'](_0x3faeee); return _0x3ebd91 && _0x3ebd91[_0x25dbb4(0x25a)]; }), Window_StatusData[_0x54e01f(0x3cf)] = ['Race', _0x54e01f(0x208), _0x54e01f(0x4a5), 'Variant']['filter'](_0x4164a0 => { const _0x34e128 = _0x54e01f, _0x5e0bd5 = DataManager[_0x34e128(0x3f4) + 'pe'](_0x4164a0); return _0x5e0bd5 && _0x5e0bd5[_0x34e128(0x25a)]; }), Window_StatusData['prototype'][_0x54e01f(0x284)] = function (_0xc6be2c) { const _0x4c753b = _0x54e01f; this[_0x4c753b(0x4e4) + _0x4c753b(0x408)] = $gameSystem['mainFontSi' + 'ze'](), Window_StatusBase[_0x4c753b(0x353)]['initialize'][_0x4c753b(0x3bf)](this, _0xc6be2c), this[_0x4c753b(0x292)] = null, this[_0x4c753b(0x306)] = null; }, Window_StatusData[_0x54e01f(0x353)]['resetFontS' + _0x54e01f(0x34f)] = function () { const _0x3c4d07 = _0x54e01f; Window_StatusBase[_0x3c4d07(0x353)][_0x3c4d07(0x38f) + _0x3c4d07(0x34f)][_0x3c4d07(0x3bf)](this), this['contents'][_0x3c4d07(0x546)] = this[_0x3c4d07(0x4e4) + _0x3c4d07(0x408)]; }, Window_StatusData[_0x54e01f(0x353)]['fontSizeRa' + 'tio'] = function () { const _0x211f9b = _0x54e01f, _0x58851e = { 'KwkhD': function (_0x1f0d26, _0x568a32) { return _0x1f0d26 / _0x568a32; } }; return _0x58851e[_0x211f9b(0x44e)](this['contents']['fontSize'], $gameSystem[_0x211f9b(0x3ed) + 'ze']()); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x1b8)] = function (_0x5c84a1, _0x52d036, _0x914d29) { const _0x25f878 = _0x54e01f, _0x2f443b = { 'pYLQP': _0x25f878(0x4b7), 'JuFlh': function (_0x506045, _0x5bcff0) { return _0x506045 * _0x5bcff0; }, 'wDHyt': function (_0x48fafc, _0x2affd3) { return _0x48fafc % _0x2affd3; }, 'tVVDw': function (_0x49c679, _0x52a4cf) { return _0x49c679 * _0x52a4cf; }, 'GTVEl': function (_0x422f5e, _0x3533cc) { return _0x422f5e / _0x3533cc; }, 'lJAFu': function (_0x1448a9, _0x4d8fd1) { return _0x1448a9 * _0x4d8fd1; } }, _0x622f2f = ImageManager[_0x25f878(0x41d)](_0x2f443b['pYLQP']), _0x525310 = ImageManager['iconWidth'], _0x21e484 = ImageManager[_0x25f878(0x56b)], _0x47bad0 = _0x2f443b['JuFlh'](_0x2f443b[_0x25f878(0x27a)](_0x5c84a1, 0x81a + -0x3d6 * 0x4 + -0xaa * -0xb), _0x525310), _0x3b812c = _0x2f443b[_0x25f878(0xdf)](Math[_0x25f878(0x458)](_0x2f443b['GTVEl'](_0x5c84a1, -0x9ee + 0x23e + -0x1f * -0x40)), _0x21e484), _0x45f8c5 = Math[_0x25f878(0x203)](_0x2f443b[_0x25f878(0x303)](_0x525310, this['fontSizeRa' + _0x25f878(0x411)]())), _0x2f04bc = Math['ceil'](_0x2f443b['JuFlh'](_0x21e484, this[_0x25f878(0x1b7) + 'tio']())); this['contents']['blt'](_0x622f2f, _0x47bad0, _0x3b812c, _0x525310, _0x21e484, _0x52d036, _0x914d29, _0x45f8c5, _0x2f04bc); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x4a8) + 'wIcon'] = function (_0x4dcd79, _0x2a7584) { const _0xd93d62 = _0x54e01f, _0x1d82c3 = { 'scPLV': function (_0x24b893, _0x4e959e) { return _0x24b893 + _0x4e959e; }, 'naqEa': function (_0x58e256, _0xfe280e) { return _0x58e256 * _0xfe280e; }, 'rqCiM': function (_0x4cbaaf, _0xda2183) { return _0x4cbaaf === _0xda2183; } }; _0x2a7584[_0xd93d62(0x307)] && this[_0xd93d62(0x1b8)](_0x4dcd79, _0x2a7584['x'], _0x1d82c3['scPLV'](_0x2a7584['y'], -0x83b * -0x1 + 0x1787 * 0x1 + -0x1fc0)); _0x2a7584['x'] += Math['ceil'](_0x1d82c3[_0xd93d62(0x28a)](ImageManager[_0xd93d62(0x181)], this[_0xd93d62(0x1b7) + _0xd93d62(0x411)]())); if (_0x1d82c3[_0xd93d62(0x507)](this[_0xd93d62(0x1b7) + 'tio'](), 0xf77 + 0xd53 * 0x2 + -0x2a1c)) _0x2a7584['x'] += -0x4 * -0x5f2 + 0x15d2 + -0x1e * 0x185; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x19e)] = function (_0x242b18) { const _0x413108 = _0x54e01f, _0x2c3b36 = { 'nDWED': function (_0x321450, _0x45cec7) { return _0x321450 !== _0x45cec7; } }; _0x2c3b36['nDWED'](this['_actor'], _0x242b18) && (this[_0x413108(0x292)] = _0x242b18, this[_0x413108(0x1a4)]()); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x315) + 'a'] = function (_0x35d41d) { const _0x4a1681 = _0x54e01f, _0x19280b = { 'qIoSy': function (_0x4e85fd, _0x7982b3) { return _0x4e85fd !== _0x7982b3; } }; _0x19280b[_0x4a1681(0x4f2)](this[_0x4a1681(0x306)], _0x35d41d) && (this[_0x4a1681(0x306)] = _0x35d41d, this['refresh']()); }, Window_StatusData['prototype']['setWordWra' + 'p'] = function (_0x1fa179) { const _0x12ef36 = _0x54e01f; if (Imported['VisuMZ_1_M' + _0x12ef36(0x2ed)]) Window_Base[_0x12ef36(0x353)][_0x12ef36(0xfa) + 'p'][_0x12ef36(0x3bf)](this, _0x1fa179); return ''; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x54c) + _0x54e01f(0x457)] = function () { const _0x4e6c97 = _0x54e01f; if (Imported[_0x4e6c97(0x43a) + _0x4e6c97(0x2ed)]) Window_StatusBase['prototype'][_0x4e6c97(0x54c) + _0x4e6c97(0x457)][_0x4e6c97(0x3bf)](this); }, Window_StatusData[_0x54e01f(0x353)]['drawTextEx'] = function (_0xc5593d, _0xa77055, _0x1fe4ef, _0x122362) { const _0x44f3a0 = _0x54e01f, _0x50768c = Window_StatusBase[_0x44f3a0(0x353)][_0x44f3a0(0x1e8)]['call'](this, _0xc5593d, _0xa77055, _0x1fe4ef, _0x122362); return this[_0x44f3a0(0x54c) + _0x44f3a0(0x457)](), _0x50768c; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x1a4)] = function () { const _0x490ae9 = _0x54e01f, _0x2a064c = { 'LCmyZ': _0x490ae9(0x44c) }, _0x3e8a8e = _0x2a064c[_0x490ae9(0x130)][_0x490ae9(0x349)]('|'); let _0x49f939 = 0x4b5 * -0x4 + -0x363 + 0x1637; while (!![]) { switch (_0x3e8a8e[_0x49f939++]) { case '0': Window_StatusBase[_0x490ae9(0x353)][_0x490ae9(0x1a4)][_0x490ae9(0x3bf)](this); continue; case '1': this[_0x490ae9(0x167) + _0x490ae9(0x4b9) + _0x490ae9(0x408)](); continue; case '2': this[_0x490ae9(0x38f) + _0x490ae9(0x34f)](); continue; case '3': this['resetWordW' + 'rap'](); continue; case '4': if (this['_actor'] && this[_0x490ae9(0x306)]) this['_drawData']['call'](this); continue; }break; } }, Window_StatusData['prototype'][_0x54e01f(0x3fa) + _0x54e01f(0x205) + _0x54e01f(0x4ee)] = function () { const _0x297210 = _0x54e01f, _0x266885 = { 'kxMXG': function (_0x174e89, _0x1581ee) { return _0x174e89 !== _0x1581ee; } }; return Imported[_0x297210(0x43a) + _0x297210(0x31a) + 'e'] && _0x266885[_0x297210(0x2a3)](this[_0x297210(0x292)][_0x297210(0x4c1) + 'ge'](), ''); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x124) + _0x54e01f(0xf4) + 'ge'] = function (_0x4c1b47, _0x826602, _0x113d46, _0x424a8b, _0x4d2618) { const _0x31f1a0 = _0x54e01f, _0x182fe0 = ImageManager['loadPictur' + 'e'](_0x4c1b47[_0x31f1a0(0x4c1) + 'ge']()); _0x182fe0[_0x31f1a0(0x287) + _0x31f1a0(0x169)](this['onLoadDraw' + _0x31f1a0(0x264) + _0x31f1a0(0x15a)][_0x31f1a0(0x19c)](this, _0x182fe0, _0x4c1b47, _0x826602, _0x113d46, _0x424a8b, _0x4d2618)); }, Window_StatusData['prototype'][_0x54e01f(0x413) + _0x54e01f(0x264) + _0x54e01f(0x15a)] = function (_0x424f7a, _0xca4bbc, _0x33b053, _0x22645e, _0x44646f, _0x505d2f) { const _0x203b9e = _0x54e01f, _0x5b1bce = { 'YixgK': function (_0x6c4232, _0x2c0b93) { return _0x6c4232 - _0x2c0b93; }, 'XIGaA': function (_0x54c673, _0x13c7d1) { return _0x54c673 / _0x13c7d1; }, 'FGKjV': function (_0x28c8dc, _0xb9c5d8) { return _0x28c8dc < _0xb9c5d8; }, 'AytTE': function (_0x364bdf, _0x452988) { return _0x364bdf - _0x452988; }, 'EnwOJ': function (_0x51c853, _0x4102b1) { return _0x51c853 + _0x4102b1; }, 'NxhnC': function (_0x373bd4, _0x126217) { return _0x373bd4 + _0x126217; }, 'Tktxk': function (_0x6daa66, _0x44ad4f) { return _0x6daa66 / _0x44ad4f; }, 'eSghQ': function (_0x1ca915, _0x4d48fa) { return _0x1ca915 + _0x4d48fa; }, 'tkvQB': function (_0x494804, _0x10c729) { return _0x494804 + _0x10c729; }, 'FWrks': function (_0xa75b78, _0x2b3ac9) { return _0xa75b78 - _0x2b3ac9; } }, _0x501f30 = _0x5b1bce['YixgK'](_0x44646f, _0x424f7a[_0x203b9e(0x592)]); _0x33b053 += _0x5b1bce[_0x203b9e(0x461)](_0x501f30, 0x76 * 0x6 + 0x8ed + -0x3 * 0x3e5); if (_0x5b1bce[_0x203b9e(0x2e6)](_0x501f30, 0x202 * -0xd + 0x7f * -0x18 + -0x79a * -0x5)) _0x44646f -= _0x501f30; _0x44646f = _0x5b1bce[_0x203b9e(0x448)](_0x44646f || ImageManager[_0x203b9e(0x327)], -0x2503 + 0x66 + 0x249f), _0x505d2f = _0x5b1bce['AytTE'](_0x505d2f || ImageManager[_0x203b9e(0x2db)], -0x1d6f + -0x13db + -0x5 * -0x9dc); const _0x631b5e = _0x424f7a['width'], _0x558901 = _0x424f7a['height'], _0x1e55d0 = _0x44646f, _0x436703 = _0x5b1bce[_0x203b9e(0x595)](_0x505d2f, -0x51 * 0x2f + 0x40 * 0x4f + -0x4df), _0x369592 = _0x5b1bce[_0x203b9e(0x1c5)](_0x33b053, Math['floor'](_0x5b1bce['XIGaA'](_0x1e55d0, 0x6cd * -0x4 + 0x131 * -0xc + 0x2982))), _0xb80780 = _0x5b1bce[_0x203b9e(0x374)](_0x22645e, Math[_0x203b9e(0x203)](_0x5b1bce[_0x203b9e(0x25e)](_0x5b1bce[_0x203b9e(0x374)](_0x505d2f, _0x558901), -0x644 + -0x20eb * 0x1 + 0x2731))), _0x1a38e8 = Math[_0x203b9e(0x1db)](_0x44646f, _0x631b5e), _0x3d1b18 = Math[_0x203b9e(0x1db)](_0x505d2f, _0x558901), _0xdefb9c = _0x5b1bce[_0x203b9e(0x17a)](_0x33b053, 0x17e * 0xb + -0x10f3 * -0x1 + -0x46 * 0x7a), _0x43f425 = Math[_0x203b9e(0x1b2)](_0x5b1bce[_0x203b9e(0x20b)](_0x22645e, -0x1 * 0x52d + -0x1 * -0x218e + 0x8 * -0x38c), _0x5b1bce['tkvQB'](_0x5b1bce[_0x203b9e(0x319)](_0x5b1bce[_0x203b9e(0x1c5)](_0x22645e, _0x436703), _0x558901), -0x1e93 + -0x868 + 0x26fe)), _0x576fa0 = _0x5b1bce['XIGaA'](_0x5b1bce['YixgK'](_0x631b5e, _0x1a38e8), 0x9 * -0x15b + -0x26 * 0xcd + 0x2aa3), _0x1f99d7 = _0x5b1bce[_0x203b9e(0x461)](_0x5b1bce['FWrks'](_0x558901, _0x3d1b18), 0x651 + 0x6 * 0x2cd + -0x171d); this[_0x203b9e(0x4f0) + 'ck'][_0x203b9e(0x534)](_0x424f7a, _0x576fa0, _0x1f99d7, _0x1a38e8, _0x3d1b18, _0xdefb9c, _0x43f425); }, Window_StatusData['prototype'][_0x54e01f(0x431) + _0x54e01f(0x50e)] = function () { const _0x55da01 = _0x54e01f, _0x5765df = { 'jViPd': function (_0x19fa20, _0x2732cd) { return _0x19fa20 < _0x2732cd; }, 'ILogR': function (_0x5acfc0, _0x1c0df9) { return _0x5acfc0 - _0x1c0df9; }, 'PpSqy': function (_0x2907ba, _0x196d8c) { return _0x2907ba * _0x196d8c; }, 'FBQmF': function (_0x36cd7e, _0x14fdda) { return _0x36cd7e * _0x14fdda; }, 'cONyq': function (_0xe2f815, _0x4daf62) { return _0xe2f815 - _0x4daf62; }, 'llLjy': function (_0x187d70, _0x1537d7) { return _0x187d70 * _0x1537d7; } }; let _0x5549f8 = 0x24e2 + 0x7a6 + -0x2c83; return _0x5765df[_0x55da01(0xcf)](_0x5765df[_0x55da01(0x3e2)](this['innerHeigh' + 't'], _0x5765df[_0x55da01(0x560)](this[_0x55da01(0x58e)](), 0x185 + 0x1 * 0x85f + -0x9df)), _0x5765df[_0x55da01(0x320)](this['lineHeight'](), 0x15eb * 0x1 + -0x162 + -0x1 * 0x1483)) && (_0x5549f8 = -0xc2d + 0x9c2 + 0x26f), _0x5765df['cONyq'](this[_0x55da01(0x55a) + 't'], _0x5765df['llLjy'](this[_0x55da01(0x58e)](), _0x5549f8)); }, Window_StatusData[_0x54e01f(0x353)]['drawActorG' + 'raphic'] = function (_0x55b293, _0x5ecfc6) { const _0x1cd6ad = _0x54e01f, _0x4628c5 = { 'zZXFe': function (_0x32c685, _0x16a499) { return _0x32c685 + _0x16a499; }, 'Dzblj': function (_0x2fe460, _0x220128) { return _0x2fe460 / _0x220128; }, 'DJejU': function (_0x1fbd4d, _0x4a8522) { return _0x1fbd4d - _0x4a8522; }, 'goqnL': function (_0x2aa816, _0x4cfe6f) { return _0x2aa816 / _0x4cfe6f; }, 'hMGUU': function (_0x339bb2, _0x1e7c8e) { return _0x339bb2 - _0x1e7c8e; } }, _0x2da3ee = this[_0x1cd6ad(0x292)], _0x497cb0 = new Rectangle(_0x55b293, 0x1bc0 + 0x97 * 0x1d + -0x2cdb, _0x5ecfc6, this['innerHeigh' + 't']), _0x12b968 = this[_0x1cd6ad(0x431) + 'eight'](); if (this[_0x1cd6ad(0x3fa) + 'uImageAvai' + 'lable']()) { const _0x4403a0 = _0x497cb0[_0x1cd6ad(0x592)], _0x43c8c3 = _0x497cb0[_0x1cd6ad(0x547)], _0x44fe2c = _0x497cb0['x'], _0x57b3ca = _0x497cb0['y']; this['drawItemAc' + _0x1cd6ad(0xf4) + 'ge'](_0x2da3ee, _0x44fe2c, _0x57b3ca, _0x4403a0, _0x43c8c3); } else { const _0x2cf91b = ImageManager[_0x1cd6ad(0x327)], _0x3607ac = ImageManager['faceHeight'], _0x4df83e = _0x4628c5['zZXFe'](_0x497cb0['x'], Math[_0x1cd6ad(0x458)](_0x4628c5['Dzblj'](_0x4628c5[_0x1cd6ad(0x48c)](_0x497cb0[_0x1cd6ad(0x592)], _0x2cf91b), 0x1 * 0x1385 + -0x19 * -0xdb + -0x28e6 * 0x1))), _0x45ad3a = _0x4628c5[_0x1cd6ad(0x568)](_0x497cb0['y'], Math['floor'](_0x4628c5['goqnL'](_0x4628c5[_0x1cd6ad(0x48c)](_0x4628c5[_0x1cd6ad(0x384)](this['innerHeigh' + 't'], _0x12b968), _0x3607ac), -0x57e + -0xbfb * 0x1 + 0x117b))); this['drawActorF' + 'aceBack'](_0x2da3ee, _0x4df83e, _0x45ad3a, _0x2cf91b, _0x3607ac); } }, Window_Base[_0x54e01f(0x353)][_0x54e01f(0x22a) + _0x54e01f(0x366)] = function (_0x265763, _0x24e7c3, _0x5988f0, _0x45259c, _0x4b0ecd) { const _0x3e9f2a = _0x54e01f, _0x4809af = { 'kytpG': function (_0x145dce, _0x3a9766) { return _0x145dce + _0x3a9766; }, 'PZmdt': function (_0x63fd75, _0x1c87c0) { return _0x63fd75 / _0x1c87c0; }, 'jorRJ': function (_0xb2fca9, _0x1b6011) { return _0xb2fca9 - _0x1b6011; }, 'Nnnpm': function (_0x251a09, _0x515a7d) { return _0x251a09 + _0x515a7d; }, 'rtbkn': function (_0x4a369d, _0x478410) { return _0x4a369d / _0x478410; }, 'rWavJ': function (_0x3f7b53, _0x3f36fa) { return _0x3f7b53 + _0x3f36fa; }, 'sqGId': function (_0x513a76, _0x2adedb) { return _0x513a76 * _0x2adedb; }, 'HwPRQ': function (_0x2982e3, _0x4a766e) { return _0x2982e3 % _0x4a766e; }, 'MbFwD': function (_0x1b61ef, _0x3c49b2) { return _0x1b61ef / _0x3c49b2; } }, _0x38d3d4 = _0x265763['faceName'](), _0x59a1ec = _0x265763['faceIndex'](); _0x45259c = _0x45259c || ImageManager[_0x3e9f2a(0x327)], _0x4b0ecd = _0x4b0ecd || ImageManager[_0x3e9f2a(0x2db)]; const _0x5d7050 = ImageManager[_0x3e9f2a(0x18c)](_0x38d3d4), _0x4b7739 = ImageManager[_0x3e9f2a(0x327)], _0x1ab90d = ImageManager[_0x3e9f2a(0x2db)], _0x12b236 = Math['min'](_0x45259c, _0x4b7739), _0x30795b = Math[_0x3e9f2a(0x1db)](_0x4b0ecd, _0x1ab90d), _0x52d816 = Math[_0x3e9f2a(0x458)](_0x4809af[_0x3e9f2a(0x37d)](_0x24e7c3, _0x4809af['PZmdt'](Math[_0x3e9f2a(0x1b2)](_0x4809af['jorRJ'](_0x45259c, _0x4b7739), -0x1b54 + -0x23e0 + 0x3f34), 0x3 * -0x241 + -0xf * -0x13 + 0x5a8))), _0x1cffd6 = Math[_0x3e9f2a(0x458)](_0x4809af[_0x3e9f2a(0x527)](_0x5988f0, _0x4809af[_0x3e9f2a(0x432)](Math[_0x3e9f2a(0x1b2)](_0x4809af[_0x3e9f2a(0x4ce)](_0x4b0ecd, _0x1ab90d), 0x22ad * 0x1 + 0xb * -0x5b + -0x1ec4), 0x1 * -0xc2e + -0x1 * -0x178f + -0x47 * 0x29))), _0x885db3 = _0x4809af[_0x3e9f2a(0xd4)](_0x4809af[_0x3e9f2a(0x412)](_0x4809af['HwPRQ'](_0x59a1ec, -0x1 * -0x21a3 + -0x304 * -0x2 + -0x27a7 * 0x1), _0x4b7739), _0x4809af[_0x3e9f2a(0x493)](_0x4809af[_0x3e9f2a(0x4ce)](_0x4b7739, _0x12b236), -0x10bb + -0xd13 + -0x8 * -0x3ba)), _0x251994 = _0x4809af[_0x3e9f2a(0xd4)](_0x4809af[_0x3e9f2a(0x412)](Math['floor'](_0x4809af[_0x3e9f2a(0x493)](_0x59a1ec, -0x20f4 + -0x9c * 0x28 + 0x3958)), _0x1ab90d), _0x4809af[_0x3e9f2a(0x432)](_0x4809af['jorRJ'](_0x1ab90d, _0x30795b), 0x5 * 0x4f6 + -0x43f + -0x148d)); this[_0x3e9f2a(0x4f0) + 'ck'][_0x3e9f2a(0x534)](_0x5d7050, _0x885db3, _0x251994, _0x12b236, _0x30795b, _0x52d816, _0x1cffd6); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x2ab) + _0x54e01f(0x2e1)] = function (_0x5eb645) { const _0x2a53d5 = _0x54e01f, _0xb43d1c = { 'usFLk': _0x2a53d5(0x3fc) }, _0x5511fb = _0xb43d1c[_0x2a53d5(0x35a)][_0x2a53d5(0x143)](_0x5eb645); return VisuMZ[_0x2a53d5(0x3a0) + _0x2a53d5(0x122)][_0x2a53d5(0x3b8)]['StatusMenu'][_0x5511fb]; }, Window_StatusData['prototype'][_0x54e01f(0x18d) + _0x54e01f(0x3ac)] = function (_0x13f2fb, _0x17fbe9, _0x3db929, _0x154401) { const _0x204cc8 = _0x54e01f, _0x5d8911 = { 'SbsFM': function (_0x4b79b4, _0x28b4aa) { return _0x4b79b4 * _0x28b4aa; }, 'YumZU': function (_0x17c4e1, _0x3a85b4) { return _0x17c4e1 + _0x3a85b4; } }, _0x4b6269 = this[_0x204cc8(0x109) + 'g'](); _0x154401 -= _0x5d8911[_0x204cc8(0x1e1)](_0x4b6269, 0x1d56 + -0x547 * 0x5 + -0x2f1); if (Imported[_0x204cc8(0x516) + _0x204cc8(0x2ce)]) this[_0x204cc8(0x4d2) + _0x204cc8(0x3e5)](_0x5d8911['YumZU'](_0x17fbe9, _0x4b6269), _0x3db929, _0x154401, _0x13f2fb, ![]); else { const _0x4f430c = this[_0x204cc8(0xca) + 'me'](_0x13f2fb); this['changeText' + _0x204cc8(0x210)](ColorManager[_0x204cc8(0x2b2) + 'r']()), this[_0x204cc8(0x2d5)](_0x4f430c, _0x5d8911[_0x204cc8(0x454)](_0x17fbe9, _0x4b6269), _0x3db929, _0x154401); } }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0xca) + 'me'] = function (_0x372c0b) { const _0x1ab4d0 = _0x54e01f, _0x54307a = { 'FXNPV': _0x1ab4d0(0x42f), 'IsKlr': _0x1ab4d0(0x18b), 'gRuth': 'ATK', 'hsSXm': _0x1ab4d0(0x1d6), 'PsopL': _0x1ab4d0(0x341), 'kQnga': 'MDF', 'hkram': _0x1ab4d0(0x4aa), 'FyHvd': _0x1ab4d0(0x260), 'wsHVm': 'HIT', 'XNrHJ': _0x1ab4d0(0x478), 'JJVWy': _0x1ab4d0(0x37a), 'kBiwk': 'CEV', 'CalxF': _0x1ab4d0(0x3fe), 'ZgjJw': _0x1ab4d0(0x4ea), 'OTQNh': _0x1ab4d0(0x1ce), 'Fbhjo': _0x1ab4d0(0x399), 'zSEAZ': 'MRG', 'PMEUV': 'TRG', 'TZote': _0x1ab4d0(0x401), 'znYci': _0x1ab4d0(0x1c1), 'XuePQ': _0x1ab4d0(0x1cc), 'GUFxS': 'PHA', 'ZCHJZ': 'MCR', 'PzstL': _0x1ab4d0(0x159), 'rcKSp': _0x1ab4d0(0x1c6), 'DsDPa': _0x1ab4d0(0x133), 'AsdaR': 'FDR', 'rWIaW': 'EXR' }; _0x372c0b = _0x372c0b[_0x1ab4d0(0x27e) + 'e']()[_0x1ab4d0(0xef)](); const _0x4391f8 = [_0x54307a['FXNPV'], _0x54307a[_0x1ab4d0(0x18e)], _0x54307a[_0x1ab4d0(0x2cf)], _0x54307a[_0x1ab4d0(0x2ef)], _0x54307a[_0x1ab4d0(0x3bb)], _0x54307a[_0x1ab4d0(0x3c4)], _0x54307a[_0x1ab4d0(0x532)], _0x54307a[_0x1ab4d0(0x11c)]], _0xebff17 = [_0x54307a[_0x1ab4d0(0x1d0)], _0x54307a['XNrHJ'], _0x54307a['JJVWy'], _0x54307a[_0x1ab4d0(0x436)], _0x54307a[_0x1ab4d0(0x20a)], _0x54307a[_0x1ab4d0(0x288)], _0x54307a[_0x1ab4d0(0x281)], _0x54307a[_0x1ab4d0(0x21d)], _0x54307a[_0x1ab4d0(0xcd)], _0x54307a['PMEUV']], _0x249bd4 = [_0x54307a[_0x1ab4d0(0x12d)], _0x54307a[_0x1ab4d0(0x2b4)], _0x54307a['XuePQ'], _0x54307a[_0x1ab4d0(0x34a)], _0x54307a[_0x1ab4d0(0x543)], _0x54307a[_0x1ab4d0(0x43b)], _0x54307a[_0x1ab4d0(0x1fe)], _0x54307a[_0x1ab4d0(0x486)], _0x54307a[_0x1ab4d0(0x1df)], _0x54307a[_0x1ab4d0(0x17f)]]; if (_0x4391f8[_0x1ab4d0(0x4c6)](_0x372c0b)) return TextManager[_0x1ab4d0(0x597)](_0x4391f8[_0x1ab4d0(0x245)](_0x372c0b)); return _0x372c0b; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x48d) + _0x54e01f(0x40a)] = function (_0x83fde1, _0x35cc10, _0x170940, _0x37fe07) { const _0x40b651 = _0x54e01f, _0x3ee03a = { 'SsniM': function (_0x5e3251, _0x5108ce) { return _0x5e3251 + _0x5108ce; }, 'RtDlh': function (_0x22e154, _0x38fd05) { return _0x22e154 - _0x38fd05; }, 'yQhmI': function (_0x28639c, _0xf8068e) { return _0x28639c * _0xf8068e; }, 'IUFSB': _0x40b651(0x549) }; this['resetFontS' + _0x40b651(0x34f)](); const _0x3c5b9c = this[_0x40b651(0x109) + 'g'](), _0x21e584 = this['getParamVa' + _0x40b651(0x163)](_0x83fde1); this[_0x40b651(0x2d5)](_0x21e584, _0x3ee03a[_0x40b651(0x206)](_0x35cc10, _0x3c5b9c), _0x170940, _0x3ee03a['RtDlh'](_0x37fe07, _0x3ee03a[_0x40b651(0x381)](_0x3c5b9c, -0x133a + 0x247 * 0x7 + -0x119 * -0x3)), _0x3ee03a[_0x40b651(0x3f6)]); }, Window_StatusData['prototype'][_0x54e01f(0x4a1) + 'lue'] = function (_0x35fe0e) { const _0x3572f7 = _0x54e01f, _0x3917bb = { 'gDxGQ': _0x3572f7(0x42f), 'AAMCe': 'MAXMP', 'bFyfr': _0x3572f7(0x45a), 'GMmce': _0x3572f7(0x1d6), 'LSwYF': 'MAT', 'rVSUi': _0x3572f7(0x4ec), 'LyUcB': 'AGI', 'cbTqb': 'LUK', 'LVgxY': _0x3572f7(0x10f), 'OAUtq': _0x3572f7(0x478), 'VQITT': _0x3572f7(0x37a), 'dvHMP': _0x3572f7(0x1dc), 'OmwLK': _0x3572f7(0x3fe), 'REIWc': 'MRF', 'aMCuB': _0x3572f7(0x1ce), 'ZZfNR': _0x3572f7(0x399), 'xPdcQ': 'MRG', 'uVeJW': _0x3572f7(0x557), 'wvRXf': _0x3572f7(0x401), 'EMFrJ': _0x3572f7(0x1c1), 'npBWA': _0x3572f7(0x1cc), 'TyvcD': _0x3572f7(0xe2), 'TfZMQ': 'MCR', 'Dlbsn': _0x3572f7(0x159), 'upNLr': _0x3572f7(0x1c6), 'aqqVi': 'MDR', 'iKWpV': _0x3572f7(0x317), 'cqgtz': _0x3572f7(0xc3), 'qnuOW': '%1%', 'aJHXj': function (_0x5dd2c2, _0x2c7293) { return _0x5dd2c2 * _0x2c7293; } }; _0x35fe0e = _0x35fe0e[_0x3572f7(0x27e) + 'e']()[_0x3572f7(0xef)](); const _0x24ab64 = this[_0x3572f7(0x292)]; if (Imported[_0x3572f7(0x516) + _0x3572f7(0x2ce)]) return _0x24ab64['paramValue' + _0x3572f7(0x2f2)](_0x35fe0e, !![]); else { const _0x25c358 = [_0x3917bb[_0x3572f7(0x3a6)], _0x3917bb[_0x3572f7(0x338)], _0x3917bb[_0x3572f7(0x57e)], _0x3917bb[_0x3572f7(0x39d)], _0x3917bb['LSwYF'], _0x3917bb[_0x3572f7(0x580)], _0x3917bb[_0x3572f7(0xd3)], _0x3917bb[_0x3572f7(0x4ef)]], _0x1de448 = [_0x3917bb[_0x3572f7(0x36c)], _0x3917bb[_0x3572f7(0x29f)], _0x3917bb[_0x3572f7(0x477)], _0x3917bb[_0x3572f7(0x542)], _0x3917bb[_0x3572f7(0x125)], _0x3917bb[_0x3572f7(0x58d)], _0x3917bb[_0x3572f7(0x2a7)], _0x3917bb[_0x3572f7(0x4c9)], _0x3917bb[_0x3572f7(0x462)], _0x3917bb[_0x3572f7(0x3df)]], _0x307df7 = [_0x3917bb['wvRXf'], _0x3917bb[_0x3572f7(0x3e9)], _0x3917bb[_0x3572f7(0x545)], _0x3917bb[_0x3572f7(0x135)], _0x3917bb[_0x3572f7(0x392)], _0x3917bb[_0x3572f7(0x2f8)], _0x3917bb['upNLr'], _0x3917bb[_0x3572f7(0x463)], _0x3917bb[_0x3572f7(0x42c)], _0x3917bb[_0x3572f7(0x4b8)]]; if (_0x25c358[_0x3572f7(0x4c6)](_0x35fe0e)) return _0x24ab64[_0x3572f7(0x597)](_0x25c358[_0x3572f7(0x245)](_0x35fe0e)); else { if (_0x1de448[_0x3572f7(0x4c6)](_0x35fe0e)) { const _0x54ec0f = _0x24ab64[_0x3572f7(0x24c)](_0x1de448[_0x3572f7(0x245)](_0x35fe0e)); return _0x3917bb[_0x3572f7(0x484)]['format'](Math[_0x3572f7(0x322)](_0x3917bb['aJHXj'](_0x54ec0f, 0x4ff * 0x5 + -0x12f8 + -0x59f * 0x1))); } else { if (_0x307df7[_0x3572f7(0x4c6)](_0x35fe0e)) { const _0x11eeb6 = _0x24ab64['sparam'](_0x307df7[_0x3572f7(0x245)](_0x35fe0e)); return _0x3917bb[_0x3572f7(0x484)]['format'](Math[_0x3572f7(0x322)](_0x3917bb[_0x3572f7(0x175)](_0x11eeb6, 0x1865 + 0x9a7 * -0x3 + 0x4 * 0x13d))); } } } } }, Window_StatusData['prototype'][_0x54e01f(0xf0) + _0x54e01f(0x49d) + 'a'] = function () { const _0x4858fb = _0x54e01f; VisuMZ['ElementSta' + _0x4858fb(0x122)][_0x4858fb(0x3b8)][_0x4858fb(0x1b3) + _0x4858fb(0x1e9)][0x1d0d + 0x88b + -0x2 * 0x12cc][_0x4858fb(0x1ec)][_0x4858fb(0x3bf)](this); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x173) + _0x54e01f(0x581) + _0x54e01f(0x1fb) + 'et'] = function () { const _0x17c802 = _0x54e01f; this[_0x17c802(0x4e4) + 'Size'] = VisuMZ[_0x17c802(0x3a0) + _0x17c802(0x122)][_0x17c802(0x3b8)][_0x17c802(0x1b3)][_0x17c802(0x376) + _0x17c802(0x4b9) + _0x17c802(0x408)]; }, Window_StatusData['prototype'][_0x54e01f(0x167) + _0x54e01f(0x4b9) + 'Size'] = function () { const _0xc6bd2c = _0x54e01f; this['_resetFont' + _0xc6bd2c(0x408)] = $gameSystem[_0xc6bd2c(0x3ed) + 'ze'](); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x3be) + _0x54e01f(0x323)] = function (_0x226a2d, _0x12100d, _0x3c96d1, _0x81d56c, _0x1bb176) { const _0x2051fa = _0x54e01f, _0x4d4703 = { 'nofxn': function (_0x288012, _0x373a31) { return _0x288012 === _0x373a31; }, 'YqTcS': function (_0x424f9c, _0x363ae4) { return _0x424f9c || _0x363ae4; }, 'WsZCU': function (_0x4cedff, _0x20aafe) { return _0x4cedff + _0x20aafe; }, 'gLkZo': function (_0x34255a, _0x2379f4) { return _0x34255a + _0x2379f4; }, 'JdwsH': function (_0x25f1fb, _0x25d66f) { return _0x25f1fb - _0x25d66f; } }; if (_0x4d4703[_0x2051fa(0x491)](VisuMZ[_0x2051fa(0x3a0) + 'tusCore'][_0x2051fa(0x3b8)][_0x2051fa(0x1b3)][_0x2051fa(0x373) + 'ct'], ![])) return; _0x1bb176 = Math[_0x2051fa(0x1b2)](_0x4d4703[_0x2051fa(0x263)](_0x1bb176, 0x2234 + -0x116d * -0x1 + 0x10 * -0x33a), -0xec4 + 0x118e + -0x2c9); while (_0x1bb176--) { _0x81d56c = _0x81d56c || this[_0x2051fa(0x58e)](), this['contents'][_0x2051fa(0x295) + 'ty'] = 0x2221 + 0x2243 + -0x1 * 0x43c4; const _0x1577d0 = ColorManager[_0x2051fa(0x3a2) + _0x2051fa(0x4fd) + 'BackColor'](); this[_0x2051fa(0x37b)][_0x2051fa(0x423)](_0x4d4703['WsZCU'](_0x226a2d, -0x1a38 + -0x1394 + 0x2dcd), _0x4d4703['gLkZo'](_0x12100d, -0xc54 + -0x1c97 + 0x28ec), _0x4d4703[_0x2051fa(0x115)](_0x3c96d1, -0x1733 + -0x7b7 + 0x1eec * 0x1), _0x4d4703[_0x2051fa(0x115)](_0x81d56c, -0x2e * 0x1a + 0x3 * -0x9ef + -0x1 * -0x227b), _0x1577d0), this[_0x2051fa(0x37b)][_0x2051fa(0x295) + 'ty'] = 0x1e90 + 0x104f * 0x1 + -0x2de0; } }, ColorManager[_0x54e01f(0x3a2) + _0x54e01f(0x4fd) + 'BackColor'] = function () { const _0x4603c1 = _0x54e01f, _0xda6bb9 = { 'BPLrG': function (_0x233ec0, _0x4eb922) { return _0x233ec0 !== _0x4eb922; } }, _0x3fc345 = VisuMZ[_0x4603c1(0x3a0) + _0x4603c1(0x122)][_0x4603c1(0x3b8)][_0x4603c1(0x1b3)]; let _0x281766 = _0xda6bb9['BPLrG'](_0x3fc345[_0x4603c1(0x2bf) + _0x4603c1(0x47c)], undefined) ? _0x3fc345[_0x4603c1(0x2bf) + _0x4603c1(0x47c)] : 0xc * 0x11b + -0x2617 + 0x18e6; return ColorManager['getColor'](_0x281766); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x17b) + 'l'] = function () { const _0x5f298e = _0x54e01f, _0xd45459 = { 'Ivukh': _0x5f298e(0x316), 'NNCLm': function (_0x3f1300, _0xc925c1) { return _0x3f1300 / _0xc925c1; }, 'QmUGG': function (_0x5661eb, _0x5b5efd) { return _0x5661eb + _0x5b5efd; }, 'UzORe': function (_0x3cac40, _0x43abf2) { return _0x3cac40 - _0x43abf2; }, 'nyzzM': function (_0x2cc8fa, _0x15f4a2) { return _0x2cc8fa + _0x15f4a2; }, 'AZSJL': _0x5f298e(0x2d2), 'lQNpa': function (_0x4367c0, _0xb16b6c) { return _0x4367c0 + _0xb16b6c; }, 'ZJalO': function (_0x2c1578, _0x36d625) { return _0x2c1578 / _0x36d625; }, 'RiDau': function (_0x105137, _0x368b8d) { return _0x105137 / _0x368b8d; }, 'LAhXy': function (_0x2b63bd, _0x167c8d) { return _0x2b63bd - _0x167c8d; }, 'PZzQH': function (_0x5cab67, _0x14738d) { return _0x5cab67 / _0x14738d; }, 'ohYZK': function (_0x3b1da4, _0x4b480a) { return _0x3b1da4 / _0x4b480a; }, 'neWrp': function (_0x1fd4cd, _0x3bb524) { return _0x1fd4cd - _0x3bb524; }, 'LGRLN': function (_0x2d76ef, _0x5dcfc8) { return _0x2d76ef - _0x5dcfc8; }, 'APbzU': function (_0x363f27, _0x44e289) { return _0x363f27 * _0x44e289; }, 'SXtmP': function (_0x482302, _0x582ab6) { return _0x482302 + _0x582ab6; }, 'PwGxe': function (_0x3f2a25, _0x3fecba) { return _0x3f2a25 * _0x3fecba; }, 'OkNov': function (_0x57e921, _0x456433) { return _0x57e921 * _0x456433; }, 'XFvnu': function (_0x44c231, _0x172c36) { return _0x44c231 * _0x172c36; }, 'TuSjH': function (_0xdee216, _0x1c82b7) { return _0xdee216 * _0x1c82b7; }, 'nbcfl': function (_0x1c7290, _0x44725c) { return _0x1c7290 + _0x44725c; }, 'mYoSX': function (_0x21b9cd, _0x368bfa) { return _0x21b9cd + _0x368bfa; }, 'KceEq': function (_0x577d87, _0x457eb6) { return _0x577d87 * _0x457eb6; }, 'BEnkT': function (_0x44e494, _0x3b93b1) { return _0x44e494 + _0x3b93b1; }, 'JTwMl': function (_0x11a62c, _0x2aea13) { return _0x11a62c + _0x2aea13; }, 'qNxsp': function (_0x15c084, _0x5f33d1) { return _0x15c084 * _0x5f33d1; }, 'JKjEo': function (_0x106f8b, _0x10a3ac) { return _0x106f8b - _0x10a3ac; }, 'PNeUj': function (_0x1cc77a, _0x132cc3) { return _0x1cc77a * _0x132cc3; }, 'BlgDL': 'right', 'NojVB': function (_0x35ff8e, _0x479bfc) { return _0x35ff8e + _0x479bfc; }, 'ASTLD': function (_0x3c555b, _0x47ead8) { return _0x3c555b * _0x47ead8; } }, _0x3fd5fe = _0xd45459['Ivukh'], _0x2ebb55 = this[_0x5f298e(0x58e)](), _0x439060 = this[_0x5f298e(0x50d) + 'eight'](), _0x5cf012 = this['basicDataH' + 'eight'](), _0x30d7bc = this['_actor'], _0x6bf17d = this[_0x5f298e(0x109) + 'g'](), _0x2580cb = _0xd45459[_0x5f298e(0xbf)](this[_0x5f298e(0x150)], 0xa7 * 0x1 + 0x2de + -0x383); let _0x267b24 = new Rectangle(0x110e * -0x1 + 0x257e + -0x2 * 0xa38, -0xd * 0xc5 + 0x142d * -0x1 + 0x1e2e, _0x2580cb, this[_0x5f298e(0x55a) + 't']), _0x1b0005 = -0x1ecf + 0x2203 + -0x334, _0x3c46ab = -0xbb * -0x7 + -0xe1c + 0x1 * 0x8ff; this[_0x5f298e(0x26b) + 'raphic'](0xb7b * 0x3 + 0xf0 * 0xd + -0x2ea1, _0xd45459[_0x5f298e(0xbf)](this[_0x5f298e(0x150)], 0x1939 + -0x15c2 + -0x5 * 0xb1)); let _0x49ca74 = _0x267b24['x'], _0x356701 = Math[_0x5f298e(0x1b2)](_0x267b24['y'], _0xd45459['QmUGG'](_0x267b24['y'], _0xd45459[_0x5f298e(0x342)](_0x267b24[_0x5f298e(0x547)], _0x5cf012))), _0x1afa4b = _0x267b24['width'], _0xc2f944 = _0xd45459[_0x5f298e(0x342)](_0xd45459['nyzzM'](_0x267b24['y'], _0x267b24['height']), _0x356701); this[_0x5f298e(0x3be) + _0x5f298e(0x323)](0x305 * -0xa + -0x91e * -0x3 + 0x2d8, _0x356701, _0x1afa4b, _0x2ebb55, -0x1c39 + -0x11a4 + 0x2ddf), this[_0x5f298e(0x2d5)](_0x30d7bc[_0x5f298e(0x4cf)](), _0x49ca74, _0x356701, _0x1afa4b, _0xd45459[_0x5f298e(0x40d)]), _0x49ca74 = _0xd45459[_0x5f298e(0x3cc)](_0x267b24['x'], Math['round'](_0xd45459['ZJalO'](_0xd45459[_0x5f298e(0x342)](_0x267b24[_0x5f298e(0x592)], -0x2419 + 0xb86 * 0x2 + 0xd8d), -0x1ced + -0x16b + -0x2 * -0xf2d))), _0x356701 += _0x2ebb55, this[_0x5f298e(0x3be) + 'rkRect'](0x2b * -0x89 + 0xd3e + 0x9c5, _0x356701, _0x1afa4b, _0x2ebb55), this[_0x5f298e(0x405) + 'evel'](_0x30d7bc, _0x49ca74, _0x356701); const _0x27ff0a = _0x30d7bc[_0x5f298e(0x48f) + 'ss']()['name']; _0x49ca74 = _0xd45459[_0x5f298e(0x3cc)](_0x267b24['x'], Math[_0x5f298e(0x322)](_0xd45459[_0x5f298e(0x52a)](_0xd45459['LAhXy'](_0x267b24['width'], this[_0x5f298e(0x243)](_0x27ff0a)[_0x5f298e(0x592)]), -0x1 * 0x7ed + 0x2 * -0x99b + 0x1 * 0x1b25))), _0x356701 += _0x2ebb55, this[_0x5f298e(0x3be) + 'rkRect'](-0x1b91 + 0x441 + 0x1750, _0x356701, _0x1afa4b, _0x2ebb55), this[_0x5f298e(0x1e8)](_0x27ff0a, _0x49ca74, _0x356701, _0x1afa4b), _0x49ca74 = _0xd45459[_0x5f298e(0x3cc)](_0x267b24['x'], Math['round'](_0xd45459[_0x5f298e(0x270)](_0xd45459[_0x5f298e(0x215)](_0x267b24['width'], -0x7 * -0x436 + 0x1 * -0x2af + -0x1a3b), -0xe5 * -0x22 + 0x1 * -0xe5 + 0x5 * -0x5e7))), _0x356701 += _0x2ebb55, this[_0x5f298e(0x3be) + _0x5f298e(0x323)](-0x747 * -0x1 + 0x1595 + -0x1cdc, _0x356701, _0x1afa4b, _0x2ebb55), this[_0x5f298e(0x2eb) + 'cons'](_0x30d7bc, _0x49ca74, _0x356701), _0x49ca74 = _0xd45459['nyzzM'](_0x267b24['x'], Math['round'](_0xd45459[_0x5f298e(0x495)](_0xd45459['neWrp'](_0x267b24[_0x5f298e(0x592)], -0x2031 + 0xdbe + 0x12f3), -0x265 * -0xf + 0x924 + -0x2d0d))), _0x356701 += _0x2ebb55, this[_0x5f298e(0x3be) + _0x5f298e(0x323)](0xd5b + 0x4 * -0x766 + -0x103d * -0x1, _0x356701, _0x1afa4b, _0xd45459[_0x5f298e(0xc6)](this[_0x5f298e(0x55a) + 't'], _0x356701)), this[_0x5f298e(0x198)](_0x30d7bc, 'hp', _0x49ca74, _0x356701), _0x356701 += _0x439060, this[_0x5f298e(0x198)](_0x30d7bc, 'mp', _0x49ca74, _0x356701), _0x356701 += _0x439060; $dataSystem[_0x5f298e(0x164) + 'Tp'] && this[_0x5f298e(0x198)](_0x30d7bc, 'tp', _0x49ca74, _0x356701); _0x267b24 = new Rectangle(_0x2580cb, -0xc * -0x9c + -0x10b0 + 0x28 * 0x3c, _0x2580cb, this['innerHeigh' + 't']), this['changeText' + _0x5f298e(0x210)](ColorManager[_0x5f298e(0x2b2) + 'r']()), this[_0x5f298e(0x3be) + 'rkRect'](_0x267b24['x'], _0x267b24['y'], _0x267b24[_0x5f298e(0x592)], _0x2ebb55, -0x29 * -0x8f + -0xd62 * 0x1 + 0x1e7 * -0x5), this[_0x5f298e(0x2d5)](TextManager['exp'], _0x267b24['x'], _0x267b24['y'], _0x267b24[_0x5f298e(0x592)], _0xd45459[_0x5f298e(0x40d)]); const _0x3e8574 = _0xd45459['APbzU'](_0x2ebb55, -0x1835 + 0x1 * -0x1354 + 0x2b8e); this[_0x5f298e(0x3be) + _0x5f298e(0x323)](_0x267b24['x'], _0xd45459[_0x5f298e(0x17e)](_0x267b24['y'], _0xd45459[_0x5f298e(0x455)](_0x2ebb55, 0x728 * 0x3 + -0xe3b * -0x1 + 0x11d9 * -0x2)), _0x267b24[_0x5f298e(0x592)], _0xd45459[_0x5f298e(0x29e)](_0x2ebb55, 0x13bc + 0x40c + 0xbe3 * -0x2)), this['drawItemDa' + _0x5f298e(0x323)](_0x267b24['x'], _0xd45459['QmUGG'](_0x267b24['y'], _0xd45459[_0x5f298e(0x520)](_0x2ebb55, 0xf5e + -0x135e + 0x403)), _0x267b24['width'], _0xd45459[_0x5f298e(0x47a)](_0x2ebb55, -0x2249 + -0xf81 + 0x31cc)); const _0x50e891 = TextManager[_0x5f298e(0x23c)][_0x5f298e(0x143)](TextManager[_0x5f298e(0x168)]), _0x27e8ef = TextManager[_0x5f298e(0x3a8)]['format'](TextManager[_0x5f298e(0x3ff)]); this[_0x5f298e(0x102) + _0x5f298e(0x210)](ColorManager[_0x5f298e(0x2b2) + 'r']()), this[_0x5f298e(0x2d5)](_0x50e891, _0xd45459[_0x5f298e(0x24a)](_0x267b24['x'], _0x6bf17d), _0xd45459[_0x5f298e(0xbb)](_0x267b24['y'], _0xd45459[_0x5f298e(0x154)](_0x2ebb55, -0x2336 + -0x97e + 0x2cb5)), _0xd45459['UzORe'](_0x267b24['width'], _0xd45459[_0x5f298e(0x47a)](_0x6bf17d, -0xe * -0x2b4 + -0x84e + -0x1d88))), this[_0x5f298e(0x2d5)](_0x27e8ef, _0xd45459[_0x5f298e(0x393)](_0x267b24['x'], _0x6bf17d), _0xd45459['JTwMl'](_0x267b24['y'], _0xd45459['XFvnu'](_0x2ebb55, 0x3 * 0x859 + 0x703 + -0x200b)), _0xd45459[_0x5f298e(0x342)](_0x267b24['width'], _0xd45459['qNxsp'](_0x6bf17d, 0x35 * -0x1d + -0x2 * 0xdb7 + 0x2171))), this[_0x5f298e(0x4c4) + _0x5f298e(0x165)](); const _0x5ae5d7 = _0x30d7bc[_0x5f298e(0x100)](), _0x5861e7 = _0x30d7bc[_0x5f298e(0x3f1)]() ? _0x3fd5fe : _0x30d7bc[_0x5f298e(0x1af) + _0x5f298e(0x18f)](); this[_0x5f298e(0x2d5)](_0x5ae5d7, _0xd45459[_0x5f298e(0xbb)](_0x267b24['x'], _0x6bf17d), _0xd45459['QmUGG'](_0x267b24['y'], _0xd45459['PwGxe'](_0x2ebb55, -0x1be1 + -0x1d * 0xe + 0x1d78)), _0xd45459[_0x5f298e(0x475)](_0x267b24[_0x5f298e(0x592)], _0xd45459[_0x5f298e(0x4f3)](_0x6bf17d, -0x24ef + -0x35 * -0x63 + 0x1072)), _0xd45459[_0x5f298e(0x53b)]), this['drawText'](_0x5861e7, _0xd45459[_0x5f298e(0x377)](_0x267b24['x'], _0x6bf17d), _0xd45459[_0x5f298e(0x15e)](_0x267b24['y'], _0xd45459[_0x5f298e(0x4f3)](_0x2ebb55, 0x8df * 0x1 + -0xed9 + -0x15 * -0x49)), _0xd45459[_0x5f298e(0x342)](_0x267b24['width'], _0xd45459[_0x5f298e(0x4b1)](_0x6bf17d, 0x40a + 0x263e + -0x2a46)), _0xd45459[_0x5f298e(0x53b)]), _0x3c46ab = _0xd45459['SXtmP'](_0x267b24['y'], _0x3e8574), this[_0x5f298e(0x102) + 'Color'](ColorManager[_0x5f298e(0x2b2) + 'r']()), this['drawItemDa' + _0x5f298e(0x323)](_0x267b24['x'], _0x3c46ab, _0x267b24[_0x5f298e(0x592)], _0x2ebb55, -0x1dcb + 0x212 * 0xb + -0x7 * -0x101), this[_0x5f298e(0x2d5)](TextManager[_0x5f298e(0x172) + 'Biography'], _0x267b24['x'], _0x3c46ab, _0x267b24[_0x5f298e(0x592)], _0xd45459[_0x5f298e(0x40d)]), this['resetTextC' + _0x5f298e(0x165)](), _0x3c46ab += _0x2ebb55; const _0x4e7d09 = _0x30d7bc[_0x5f298e(0x2dd) + 'hy'](); this[_0x5f298e(0x3be) + _0x5f298e(0x323)](_0x267b24['x'], _0x3c46ab, _0x267b24[_0x5f298e(0x592)], _0xd45459[_0x5f298e(0xc6)](this[_0x5f298e(0x55a) + 't'], _0x3c46ab)), this[_0x5f298e(0x1e8)](_0x4e7d09, _0xd45459[_0x5f298e(0x377)](_0x267b24['x'], _0x6bf17d), _0x3c46ab, _0xd45459[_0x5f298e(0xc6)](_0x267b24[_0x5f298e(0x592)], _0xd45459['XFvnu'](_0x6bf17d, -0x16d1 + 0x1ea7 + -0x3ea * 0x2))); }, Window_StatusData['prototype'][_0x54e01f(0x192) + _0x54e01f(0x20c)] = function () { const _0x2cdd69 = _0x54e01f, _0xb9bdf0 = { 'pMgcz': function (_0x31d40d, _0x180e5a) { return _0x31d40d * _0x180e5a; }, 'YeLfh': function (_0x431c22, _0x357654) { return _0x431c22 / _0x357654; }, 'FsXvM': function (_0x4c3f78, _0x5ee41d) { return _0x4c3f78 / _0x5ee41d; }, 'UKsAA': function (_0x14ff74, _0x126e2c) { return _0x14ff74 - _0x126e2c; }, 'WhTlr': '88888', 'CUFWY': function (_0x329f8a, _0x5b1531) { return _0x329f8a / _0x5b1531; }, 'UuvQR': function (_0x42deb6, _0x29d0d0) { return _0x42deb6 * _0x29d0d0; }, 'UFBea': function (_0x97426f, _0x318c43) { return _0x97426f + _0x318c43; }, 'LPHBC': function (_0x164115, _0x164e3a) { return _0x164115 - _0x164e3a; }, 'EHChG': function (_0x2546cf, _0x55fae9) { return _0x2546cf !== _0x55fae9; }, 'XquJP': function (_0x38f92e, _0x19f3bc) { return _0x38f92e - _0x19f3bc; }, 'xQBus': function (_0x586439, _0x11a350) { return _0x586439 * _0x11a350; }, 'bAwoE': function (_0xadad6c, _0x5e534f) { return _0xadad6c !== _0x5e534f; }, 'kXnYD': function (_0x42d6b0, _0x402b28) { return _0x42d6b0 - _0x402b28; }, 'XusUN': function (_0x248b22, _0x962a9b) { return _0x248b22 + _0x962a9b; }, 'SxEwu': function (_0x1cbfcc, _0x19ad17) { return _0x1cbfcc * _0x19ad17; } }, _0x169ef0 = this['lineHeight'](), _0x26fd8c = this[_0x2cdd69(0x50d) + _0x2cdd69(0x50e)](), _0x92856a = this[_0x2cdd69(0x431) + _0x2cdd69(0x50e)](), _0x5099e3 = _0xb9bdf0['pMgcz'](this[_0x2cdd69(0x109) + 'g'](), -0x19e7 + 0x706 + 0x12e3), _0x3b2b89 = Math['floor'](_0xb9bdf0[_0x2cdd69(0x2e4)](this[_0x2cdd69(0x150)], -0x15e4 + -0x1626 + 0x2c0d)); let _0x4a8ca0 = 0x10e4 + 0x1c0a + -0x2cee, _0x102658 = -0xde7 + 0xd8d + 0x5a, _0x1fbe33 = -0x1 * 0x10be + 0x23 * 0x107 + -0x1 * 0x1337; this['drawActorG' + _0x2cdd69(0x2c3)](-0x2180 + 0xbb7 + 0x15c9, _0xb9bdf0[_0x2cdd69(0x4c8)](this[_0x2cdd69(0x150)], 0x16db + 0xb * -0x1e2 + -0x1 * 0x223)); let _0x570d16 = new Rectangle(0xd6b + -0xb * 0xf2 + -0x305, -0xfb9 + 0xfab * -0x1 + 0x1f64, _0x3b2b89, this['innerHeigh' + 't']); const _0x128144 = this['getParamet' + _0x2cdd69(0x2e1)](0x55 * -0x32 + -0xd14 + 0x1daf), _0x39ef2b = this[_0x2cdd69(0x2ab) + _0x2cdd69(0x2e1)](0xe73 + -0x8a3 + 0x2 * -0x2e7), _0x156314 = this[_0x2cdd69(0x2ab) + 'erList'](0x1d69 + 0x1ad2 + -0x3838), _0x2164f1 = Math[_0x2cdd69(0x1b2)](_0x128144['length'], _0x39ef2b[_0x2cdd69(0x49c)], _0x156314['length']), _0x27f2a4 = _0xb9bdf0[_0x2cdd69(0x2c6)](_0xb9bdf0['UKsAA'](_0x570d16[_0x2cdd69(0x592)], _0xb9bdf0['pMgcz'](_0x5099e3, 0x13d5 + 0x7b0 + -0x1b83)), this[_0x2cdd69(0x2b5)](_0xb9bdf0[_0x2cdd69(0x3eb)])), _0x1a0f61 = Math['max'](_0xb9bdf0[_0x2cdd69(0x1b1)](_0xb9bdf0[_0x2cdd69(0x2c6)](this[_0x2cdd69(0x55a) + 't'], _0xb9bdf0['UuvQR'](_0x2164f1, _0x169ef0)), 0x2 * 0x301 + 0x10b0 + -0x79 * 0x30), -0x14c6 + 0xc16 + 0x8b0 * 0x1); _0x4a8ca0 = _0xb9bdf0[_0x2cdd69(0x2e2)](_0x570d16['x'], _0x5099e3), _0x102658 = _0x1a0f61, _0x1fbe33 = _0xb9bdf0['LPHBC'](_0x570d16[_0x2cdd69(0x592)], _0xb9bdf0[_0x2cdd69(0xda)](_0x5099e3, -0x3a3 * 0x3 + -0x136c + -0x35f * -0x9)); if (_0xb9bdf0['EHChG'](_0x102658, 0x1222 + 0x471 + -0x1 * 0x1693)) this[_0x2cdd69(0x3be) + 'rkRect'](_0x570d16['x'], 0x36f * 0x1 + -0xe87 + 0x163 * 0x8, _0x570d16['width'], _0x102658); for (const _0x4ae030 of _0x128144) { this[_0x2cdd69(0x3be) + 'rkRect'](_0x570d16['x'], _0x102658, _0x570d16[_0x2cdd69(0x592)], _0x169ef0), this['drawParamN' + _0x2cdd69(0x3ac)](_0x4ae030, _0x4a8ca0, _0x102658, _0x27f2a4), this[_0x2cdd69(0x48d) + _0x2cdd69(0x40a)](_0x4ae030, _0x4a8ca0, _0x102658, _0x1fbe33), _0x102658 += _0x169ef0; } this[_0x2cdd69(0x3be) + _0x2cdd69(0x323)](_0x570d16['x'], _0x102658, _0x570d16[_0x2cdd69(0x592)], _0xb9bdf0[_0x2cdd69(0x242)](this[_0x2cdd69(0x55a) + 't'], _0x102658)), _0x570d16['x'] += _0x570d16[_0x2cdd69(0x592)], _0x4a8ca0 = _0xb9bdf0['UFBea'](_0x570d16['x'], _0x5099e3), _0x102658 = _0x1a0f61, _0x1fbe33 = _0xb9bdf0['LPHBC'](_0x570d16[_0x2cdd69(0x592)], _0xb9bdf0[_0x2cdd69(0x185)](_0x5099e3, 0x14b3 + -0x1d42 + 0x891 * 0x1)); if (_0xb9bdf0['bAwoE'](_0x102658, 0xda * -0x1f + -0x23 * 0xf3 + -0x3b9f * -0x1)) this[_0x2cdd69(0x3be) + _0x2cdd69(0x323)](_0x570d16['x'], -0x859 + 0xae2 + 0xb * -0x3b, _0x570d16[_0x2cdd69(0x592)], _0x102658); for (const _0x39f61a of _0x39ef2b) { this['drawItemDa' + _0x2cdd69(0x323)](_0x570d16['x'], _0x102658, _0x570d16[_0x2cdd69(0x592)], _0x169ef0), this[_0x2cdd69(0x18d) + _0x2cdd69(0x3ac)](_0x39f61a, _0x4a8ca0, _0x102658, _0x27f2a4), this[_0x2cdd69(0x48d) + _0x2cdd69(0x40a)](_0x39f61a, _0x4a8ca0, _0x102658, _0x1fbe33), _0x102658 += _0x169ef0; } this[_0x2cdd69(0x3be) + _0x2cdd69(0x323)](_0x570d16['x'], _0x102658, _0x570d16[_0x2cdd69(0x592)], _0xb9bdf0[_0x2cdd69(0x2c6)](this['innerHeigh' + 't'], _0x102658)), _0x570d16['x'] += _0x570d16[_0x2cdd69(0x592)], _0x570d16['width'] = _0xb9bdf0[_0x2cdd69(0x594)](this[_0x2cdd69(0x150)], _0x570d16['x']), _0x4a8ca0 = _0xb9bdf0[_0x2cdd69(0x238)](_0x570d16['x'], _0x5099e3), _0x102658 = _0x1a0f61, _0x1fbe33 = _0xb9bdf0[_0x2cdd69(0xc2)](_0x570d16['width'], _0xb9bdf0[_0x2cdd69(0x3bc)](_0x5099e3, -0x2a * -0x97 + -0xbf1 + 0x31 * -0x43)); if (_0xb9bdf0[_0x2cdd69(0x1e6)](_0x102658, -0xc8e * -0x1 + 0x121 * 0x8 + -0x1596)) this['drawItemDa' + 'rkRect'](_0x570d16['x'], 0x1 * 0xbdf + -0x57 * -0x53 + -0x21c * 0x13, _0x570d16[_0x2cdd69(0x592)], _0x102658); for (const _0x5d3712 of _0x156314) { this[_0x2cdd69(0x3be) + _0x2cdd69(0x323)](_0x570d16['x'], _0x102658, _0x570d16[_0x2cdd69(0x592)], _0x169ef0), this[_0x2cdd69(0x18d) + 'ame'](_0x5d3712, _0x4a8ca0, _0x102658, _0x27f2a4), this['drawParamV' + 'alue'](_0x5d3712, _0x4a8ca0, _0x102658, _0x1fbe33), _0x102658 += _0x169ef0; } this['drawItemDa' + _0x2cdd69(0x323)](_0x570d16['x'], _0x102658, _0x570d16['width'], _0xb9bdf0[_0x2cdd69(0x242)](this[_0x2cdd69(0x55a) + 't'], _0x102658)); }, Window_StatusData['prototype'][_0x54e01f(0x328) + _0x54e01f(0xee)] = function () { const _0x2279d1 = _0x54e01f, _0x347b77 = { 'WIACC': function (_0x2e29bc, _0x446cfd) { return _0x2e29bc - _0x446cfd; }, 'OzKDc': function (_0x1e446b, _0x8bb97) { return _0x1e446b / _0x8bb97; }, 'bgxhA': function (_0x3c9d8f, _0x4a3f5e) { return _0x3c9d8f / _0x4a3f5e; }, 'mHUwf': _0x2279d1(0x4e9) + _0x2279d1(0x4ed), 'WlxFw': function (_0x46fe20, _0xff29a9) { return _0x46fe20 - _0xff29a9; }, 'tTICe': function (_0x4f7bfd, _0x5f0339) { return _0x4f7bfd * _0x5f0339; }, 'PAqVQ': function (_0x146887, _0x3195c8) { return _0x146887 - _0x3195c8; }, 'zIRMv': function (_0x6686b8, _0x1d1abb) { return _0x6686b8 > _0x1d1abb; }, 'RTxVV': function (_0xbfd123, _0x1333bf) { return _0xbfd123 + _0x1333bf; }, 'ZHxmG': function (_0x435b52, _0x1a5b88) { return _0x435b52 - _0x1a5b88; }, 'UiUNb': function (_0x59d289, _0x2cd6bb) { return _0x59d289 * _0x2cd6bb; }, 'JFXPG': function (_0x40de80, _0x464237) { return _0x40de80 * _0x464237; }, 'YPVZP': function (_0x9c8ab4, _0x2a245b) { return _0x9c8ab4 > _0x2a245b; }, 'cdrTR': function (_0xe50011, _0x4ecb37) { return _0xe50011 - _0x4ecb37; } }, _0x14f772 = Window_StatusData[_0x2279d1(0x500)], _0x58eb30 = Window_StatusData[_0x2279d1(0x3cf)], _0x2b4af7 = this[_0x2279d1(0x58e)](), _0x2d8423 = this[_0x2279d1(0x292)], _0x500779 = this['itemPaddin' + 'g'](), _0x42a03b = _0x347b77[_0x2279d1(0x504)](_0x347b77[_0x2279d1(0x49e)](this[_0x2279d1(0x55a) + 't'], Math[_0x2279d1(0x1b2)](_0x14f772[_0x2279d1(0x49c)], _0x58eb30[_0x2279d1(0x49c)])), _0x2b4af7), _0x3ecbf8 = _0x347b77[_0x2279d1(0x35d)](this[_0x2279d1(0x150)], -0x17eb + -0x1075 + 0x2862); let _0x5e3c57 = -0x1 * -0x124f + -0x19b + -0x10b4, _0x3946ad = -0x899 + -0x8de * -0x4 + 0x8f5 * -0x3; this[_0x2279d1(0x26b) + _0x2279d1(0x2c3)](-0x2258 + 0x31c + 0x1f3c, _0x3ecbf8); for (const _0x347d85 of _0x14f772) { const _0x4a059b = DataManager[_0x2279d1(0x3f4) + 'pe'](_0x347d85), _0x343905 = _0x2d8423[_0x2279d1(0x4a7)](_0x347d85); this[_0x2279d1(0x3be) + 'rkRect'](-0x2133 + -0x5bb + 0x3 * 0xcfa, _0x3946ad, _0x3ecbf8, _0x2b4af7, 0x1d32 + -0x1282 * -0x1 + 0xf * -0x32e); const _0x2e7717 = _0x347b77['mHUwf'][_0x2279d1(0x143)](_0x4a059b[_0x2279d1(0x14e)], _0x343905['Display']); this['drawTextEx'](_0x2e7717, _0x500779, _0x3946ad, _0x347b77[_0x2279d1(0x22f)](_0x3ecbf8, _0x347b77[_0x2279d1(0x310)](_0x500779, -0x5 * -0x677 + 0x18eb + 0x29a * -0x16))), _0x3946ad += _0x2b4af7, this['setDescrip' + _0x2279d1(0x581) + _0x2279d1(0x1fb) + 'et'](), this[_0x2279d1(0x3be) + 'rkRect'](0x20b * 0x1 + -0x24b5 + 0x22aa, _0x3946ad, _0x3ecbf8, _0x42a03b), this['drawTextEx'](_0x343905['Descriptio' + 'n'], _0x500779, _0x3946ad, _0x347b77['PAqVQ'](_0x3ecbf8, _0x347b77['tTICe'](_0x500779, -0x64f + 0x2164 + -0x1b13))), _0x3946ad += _0x42a03b, this[_0x2279d1(0x167) + _0x2279d1(0x4b9) + _0x2279d1(0x408)](); } _0x347b77['zIRMv'](_0x347b77[_0x2279d1(0x504)](this[_0x2279d1(0x55a) + 't'], _0x3946ad), 0x1 * 0x1bf7 + 0x11 * -0x247 + -0x1 * -0xac0) && this[_0x2279d1(0x3be) + 'rkRect'](-0xd * 0x147 + -0x13 * 0x7f + 0x1a08, _0x3946ad, _0x3ecbf8, _0x347b77[_0x2279d1(0x22f)](this[_0x2279d1(0x55a) + 't'], _0x3946ad)); _0x3946ad = 0x2701 + -0x1198 * -0x2 + -0x4a31; for (const _0x1f39d0 of _0x58eb30) { const _0x3e19b4 = DataManager[_0x2279d1(0x3f4) + 'pe'](_0x1f39d0), _0x3939e7 = _0x2d8423[_0x2279d1(0x4a7)](_0x1f39d0); this['drawItemDa' + _0x2279d1(0x323)](_0x3ecbf8, _0x3946ad, _0x3ecbf8, _0x2b4af7, 0xa72 + 0x28 * -0x85 + 0xa58); const _0x33b1ac = _0x347b77['mHUwf'][_0x2279d1(0x143)](_0x3e19b4[_0x2279d1(0x14e)], _0x3939e7[_0x2279d1(0x132)]); this[_0x2279d1(0x1e8)](_0x33b1ac, _0x347b77[_0x2279d1(0x430)](_0x3ecbf8, _0x500779), _0x3946ad, _0x347b77[_0x2279d1(0x544)](_0x3ecbf8, _0x347b77['UiUNb'](_0x500779, 0x163c + 0x122f + -0x2869))), _0x3946ad += _0x2b4af7, this[_0x2279d1(0x173) + _0x2279d1(0x581) + _0x2279d1(0x1fb) + 'et'](), this[_0x2279d1(0x3be) + _0x2279d1(0x323)](_0x3ecbf8, _0x3946ad, _0x3ecbf8, _0x42a03b), this[_0x2279d1(0x1e8)](_0x3939e7['Descriptio' + 'n'], _0x347b77[_0x2279d1(0x430)](_0x3ecbf8, _0x500779), _0x3946ad, _0x347b77['WIACC'](_0x3ecbf8, _0x347b77[_0x2279d1(0x2aa)](_0x500779, 0x123f + -0x1b1e + 0x1 * 0x8e1))), _0x3946ad += _0x42a03b, this[_0x2279d1(0x167) + _0x2279d1(0x4b9) + _0x2279d1(0x408)](); } _0x347b77[_0x2279d1(0x596)](_0x347b77['cdrTR'](this[_0x2279d1(0x55a) + 't'], _0x3946ad), 0x4bb + -0x1def + 0x1934) && this[_0x2279d1(0x3be) + _0x2279d1(0x323)](_0x3ecbf8, _0x3946ad, _0x3ecbf8, _0x347b77['WlxFw'](this[_0x2279d1(0x55a) + 't'], _0x3946ad)); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x3a2) + 'IDs'] = function () { const _0x51fade = _0x54e01f, _0x3fc5b3 = { 'uOAon': function (_0x329496, _0x562822) { return _0x329496(_0x562822); } }, _0x4350a6 = [0x43 * 0x8e + 0x2615 + -0x1915 * 0x3][_0x51fade(0x1aa)](this['getExclude' + _0x51fade(0x2b1) + 's']()); return [..._0x3fc5b3[_0x51fade(0x519)](Array, $dataSystem[_0x51fade(0x11d)][_0x51fade(0x49c)])[_0x51fade(0x24f)]()][_0x51fade(0x4d9)](_0x4fc74f => !_0x4350a6[_0x51fade(0x4c6)](_0x4fc74f)); }, Window_StatusData[_0x54e01f(0x353)]['getExclude' + _0x54e01f(0x2b1) + 's'] = function () { const _0x11f62b = _0x54e01f; return [-0x812 * 0x1 + 0x1581 * -0x1 + 0x1d93][_0x11f62b(0x1aa)](VisuMZ[_0x11f62b(0x3a0) + _0x11f62b(0x122)][_0x11f62b(0x3b8)][_0x11f62b(0x1b3)]['ExcludeEle' + _0x11f62b(0x1f0)]); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x3a2) + _0x54e01f(0x36b)] = function () { const _0x39862c = _0x54e01f, _0x18bca7 = { 'zUSmY': function (_0xdbeab7, _0x351fca) { return _0xdbeab7 <= _0x351fca; } }, _0x6a0353 = [-0x14d2 + -0x27b * 0xd + 0x3511][_0x39862c(0x1aa)](this['getExclude' + _0x39862c(0x2b1) + 's']()); let _0x6ea626 = this[_0x39862c(0x3a2) + _0x39862c(0x189)](-0x1 * -0x1985 + -0x1cd4 + 0x6a * 0x8); return _0x18bca7[_0x39862c(0x40f)](_0x6ea626[_0x39862c(0x49c)], 0x14ee + -0x2376 + 0xe88) && (_0x6ea626 = this[_0x39862c(0x3a2) + _0x39862c(0x189)](-0x2 * -0x883 + -0x54 * 0x2e + -0x4 * 0x7b), _0x18bca7[_0x39862c(0x40f)](_0x6ea626['length'], -0x2 * 0xc3d + -0x970 + 0x5a7 * 0x6) && (_0x6ea626 = this[_0x39862c(0x3a2) + _0x39862c(0x46c)]())), _0x6ea626[_0x39862c(0x4d9)](_0x3fa034 => !_0x6a0353[_0x39862c(0x4c6)](_0x3fa034)); }, Window_StatusData[_0x54e01f(0x353)]['getElement' + _0x54e01f(0x148)] = function () { const _0x1d5122 = _0x54e01f, _0xef1358 = [0x1bae + 0x2de + -0x1e8c]['concat'](this[_0x1d5122(0x12f) + _0x1d5122(0x2b1) + 's']()); let _0x58f3ef = this[_0x1d5122(0x3a2) + _0x1d5122(0x189)](0x1d32 + 0xb75 + -0x5 * 0x821); return _0x58f3ef[_0x1d5122(0x4d9)](_0xccab38 => !_0xef1358['includes'](_0xccab38)); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x3a2) + _0x54e01f(0x189)] = function (_0x30d725) { const _0x20891d = _0x54e01f, _0x132a91 = { 'FkdHV': _0x20891d(0x54f) + _0x20891d(0x540) }, _0x3868f1 = [0x3 * -0x1d3 + 0x62 * -0x3a + -0x221 * -0xd][_0x20891d(0x1aa)](this[_0x20891d(0x12f) + _0x20891d(0x2b1) + 's']()); let _0x2a5e52 = VisuMZ[_0x20891d(0x3a0) + _0x20891d(0x122)]['Settings'][_0x20891d(0x1b3)][_0x132a91[_0x20891d(0x576)][_0x20891d(0x143)](_0x30d725)] ?? []; return _0x2a5e52[_0x20891d(0x4d9)](_0x43c2a6 => !_0x3868f1[_0x20891d(0x4c6)](_0x43c2a6)); }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x16f) + 'ts'] = function () { const _0x179c54 = _0x54e01f, _0x38cdb9 = { 'YuWIb': '\x5cC[16]%1:\x20' + _0x179c54(0x4ed), 'SsPmG': _0x179c54(0x512), 'vrZXS': _0x179c54(0x104), 'mfYiw': function (_0x45d4a1, _0xa4340b) { return _0x45d4a1 - _0xa4340b; }, 'OQMSQ': function (_0x46a38a, _0x59b68e) { return _0x46a38a / _0x59b68e; }, 'ORooN': function (_0x587f76, _0xef70e1) { return _0x587f76 / _0xef70e1; }, 'Egnud': _0x179c54(0x3fd) + '|4|1|8|11|' + _0x179c54(0x52f), 'OmELV': function (_0xab78c9, _0x25e05a) { return _0xab78c9 + _0x25e05a; }, 'ByjDd': function (_0x333214, _0x478283) { return _0x333214 - _0x478283; }, 'XWJgI': function (_0x20e214, _0x171290) { return _0x20e214 * _0x171290; }, 'WZWUY': function (_0x545a1b, _0x478b85) { return _0x545a1b * _0x478b85; }, 'DOiOL': function (_0x40200a, _0x546e40) { return _0x40200a * _0x546e40; }, 'EcpIn': function (_0x65fbbe, _0x5defb0) { return _0x65fbbe - _0x5defb0; }, 'DvTAA': function (_0x4aa30e, _0x51d8a8) { return _0x4aa30e > _0x51d8a8; }, 'DSAQy': _0x179c54(0x34c), 'soFtm': _0x179c54(0x53d), 'ReTQI': function (_0x1eddb6, _0x20fff9) { return _0x1eddb6 * _0x20fff9; }, 'vduDI': _0x179c54(0x2d2), 'LNSvB': function (_0x23ee35, _0x49eccd) { return _0x23ee35 * _0x49eccd; }, 'jPOeb': function (_0xb3a800, _0x4805da) { return _0xb3a800 < _0x4805da; }, 'EXXkn': function (_0x3dce24, _0x3ad058) { return _0x3dce24 < _0x3ad058; }, 'rlWTa': function (_0x387420, _0x1251a7) { return _0x387420 / _0x1251a7; }, 'MDjNw': function (_0x25e455, _0x875047) { return _0x25e455 === _0x875047; }, 'vVnfH': function (_0x2d835a, _0x153fc4) { return _0x2d835a === _0x153fc4; }, 'ZXMQt': function (_0x4889e9, _0x45cbc6) { return _0x4889e9 % _0x45cbc6; }, 'OkUvl': function (_0x29495b, _0xeaa9aa) { return _0x29495b + _0xeaa9aa; }, 'DGVoX': function (_0x312c02, _0xfc9f23) { return _0x312c02 + _0xfc9f23; }, 'kRVYE': function (_0x245d38, _0x4cdf90) { return _0x245d38 / _0x4cdf90; }, 'Dumvm': function (_0x2c542c, _0x5c5207) { return _0x2c542c * _0x5c5207; }, 'CHkYp': _0x179c54(0x2d7), 'xoBCL': function (_0x43950e, _0x58afeb) { return _0x43950e * _0x58afeb; }, 'RmAEg': function (_0x4ef25b, _0x2087b7) { return _0x4ef25b > _0x2087b7; }, 'IfbUt': function (_0x115746, _0x343187) { return _0x115746 <= _0x343187; }, 'mKgfj': _0x179c54(0x3a1), 'ivoUp': function (_0x45b3a7, _0x105f26) { return _0x45b3a7 === _0x105f26; }, 'crppV': function (_0x572b51, _0x870238) { return _0x572b51 * _0x870238; }, 'gJTeW': function (_0x473f3b, _0x37b08c) { return _0x473f3b >= _0x37b08c; }, 'FIGjG': function (_0x51e427, _0x59f74e) { return _0x51e427 / _0x59f74e; }, 'NHDQW': _0x179c54(0x549), 'nEpyd': function (_0x5e3ad6, _0x1acb02) { return _0x5e3ad6 - _0x1acb02; } }, _0x4a8dd1 = this['lineHeight'](), _0x174942 = this[_0x179c54(0x292)], _0x4eff45 = this[_0x179c54(0x109) + 'g'](), _0x1c5ec7 = _0x38cdb9[_0x179c54(0x271)], _0x353658 = DataManager[_0x179c54(0x3f4) + 'pe'](_0x38cdb9['SsPmG']), _0x5c4fb7 = _0x174942['traitSet'](_0x38cdb9[_0x179c54(0x47e)]), _0x36454f = DataManager['traitSetTy' + 'pe'](_0x38cdb9[_0x179c54(0x1ed)]), _0x5d85ac = _0x174942[_0x179c54(0x4a7)](_0x38cdb9['vrZXS']), _0x2c0e5c = _0x38cdb9[_0x179c54(0x453)](_0x38cdb9[_0x179c54(0x39b)](this[_0x179c54(0x55a) + 't'], Math['max'](Window_StatusData['traitCol1'][_0x179c54(0x49c)], Window_StatusData[_0x179c54(0x3cf)][_0x179c54(0x49c)])), _0x4a8dd1); let _0x2af7e6 = -0x50 * -0x6e + -0x8 * 0x481 + 0x1a8, _0x5f47a0 = 0xb04 + -0x9f5 + -0x10f, _0xec044 = _0x38cdb9[_0x179c54(0x296)](this['innerWidth'], -0x9f * -0x1 + -0x509 * 0x5 + 0x1890); this[_0x179c54(0x26b) + _0x179c54(0x2c3)](0xcb * -0xa + 0x3 * -0xca + 0xa4c, _0xec044); if (_0x353658[_0x179c54(0x25a)] || _0x36454f[_0x179c54(0x25a)]) { const _0xdcad7 = _0x38cdb9[_0x179c54(0x505)]['split']('|'); let _0x37c734 = -0x947 + 0x2493 + -0x1b4c; while (!![]) { switch (_0xdcad7[_0x37c734++]) { case '0': this[_0x179c54(0x38f) + _0x179c54(0x34f)](); continue; case '1': this['drawItemDa' + _0x179c54(0x323)](_0x2af7e6, _0x5f47a0, _0xec044, _0x2c0e5c); continue; case '2': this[_0x179c54(0x167) + _0x179c54(0x4b9) + 'Size'](); continue; case '3': this['drawItemDa' + _0x179c54(0x323)](_0xec044, _0x5f47a0, _0xec044, _0x4a8dd1, -0x245f + -0x328 * 0x7 + 0x3a79); continue; case '4': this['setDescrip' + _0x179c54(0x581) + _0x179c54(0x1fb) + 'et'](); continue; case '5': _0x36454f[_0x179c54(0x25a)] && this['drawTextEx'](_0x1c5ec7['format'](_0x36454f[_0x179c54(0x14e)], _0x5d85ac[_0x179c54(0x132)]), _0x38cdb9[_0x179c54(0x110)](_0xec044, _0x4eff45), _0x5f47a0, _0x38cdb9[_0x179c54(0x378)](_0xec044, _0x38cdb9[_0x179c54(0x256)](_0x4eff45, 0x2 * -0x10e8 + -0x1ae3 + 0x3cb5))); continue; case '6': _0x353658[_0x179c54(0x25a)] && this[_0x179c54(0x1e8)](_0x1c5ec7[_0x179c54(0x143)](_0x353658[_0x179c54(0x14e)], _0x5c4fb7[_0x179c54(0x132)]), _0x4eff45, _0x5f47a0, _0x38cdb9[_0x179c54(0x378)](_0xec044, _0x38cdb9['WZWUY'](_0x4eff45, 0x10ed * 0x2 + 0x248f + 0x43 * -0x10d))); continue; case '7': _0x5f47a0 += _0x2c0e5c; continue; case '8': this[_0x179c54(0x3be) + _0x179c54(0x323)](_0xec044, _0x5f47a0, _0xec044, _0x2c0e5c); continue; case '9': this['drawItemDa' + _0x179c54(0x323)](_0x2af7e6, _0x5f47a0, _0xec044, _0x4a8dd1, 0x555 + -0x3 * -0x33e + -0xf0d); continue; case '10': _0x36454f['Visible'] && this[_0x179c54(0x1e8)](_0x5d85ac[_0x179c54(0x136) + 'n'], _0x38cdb9['OmELV'](_0xec044, _0x4eff45), _0x5f47a0, _0x38cdb9[_0x179c54(0x378)](_0xec044, _0x38cdb9['DOiOL'](_0x4eff45, -0x10e9 + 0xd7c * 0x2 + -0xa0d))); continue; case '11': _0x353658[_0x179c54(0x25a)] && this['drawTextEx'](_0x5c4fb7[_0x179c54(0x136) + 'n'], _0x4eff45, _0x5f47a0, _0x38cdb9[_0x179c54(0x33e)](_0xec044, _0x38cdb9[_0x179c54(0x1cf)](_0x4eff45, 0x2256 + 0x7 * 0x1e9 + -0x2fb3))); continue; case '12': _0x5f47a0 += _0x4a8dd1; continue; }break; } } const _0xf75155 = _0x5f47a0, _0xe19bd6 = this['getElement' + _0x179c54(0x36b)](), _0x558471 = this[_0x179c54(0x3a2) + 'IDsCol2'](); let _0x264cc3; _0x38cdb9[_0x179c54(0x170)](_0x558471[_0x179c54(0x49c)], -0x38 * 0x31 + 0x4d0 * 0x6 + -0x1228) ? _0x264cc3 = [_0x38cdb9[_0x179c54(0x443)], _0x38cdb9['DSAQy'], _0x38cdb9[_0x179c54(0x1a6)], _0x38cdb9[_0x179c54(0x1a6)]] : _0x264cc3 = [_0x38cdb9[_0x179c54(0x443)], _0x38cdb9['soFtm']]; const _0x3f2c1a = Math['max'](_0xe19bd6['length'], _0x558471['length'], 0x2b6 * -0x7 + -0x1d32 * -0x1 + -0xa37), _0x2ae032 = _0x264cc3[_0x179c54(0x49c)]; this[_0x179c54(0x3be) + 'rkRect'](_0x38cdb9['ReTQI'](_0xec044, -0x1 * -0x1884 + -0x1be1 + 0x35d), _0x5f47a0, _0xec044, _0x4a8dd1, 0x1ffd * 0x1 + 0x4f * -0x1a + 0x17f5 * -0x1), this[_0x179c54(0x3be) + _0x179c54(0x323)](_0x38cdb9[_0x179c54(0x1cf)](_0xec044, -0x193 * -0xb + 0x4b1 * -0x7 + 0xf87), _0x5f47a0, _0xec044, _0x4a8dd1, 0x1625 + -0xc * 0xf4 + -0xab3), this[_0x179c54(0x102) + 'Color'](ColorManager[_0x179c54(0x2b2) + 'r']()), this[_0x179c54(0x2d5)](TextManager[_0x179c54(0x172) + 'DmgReceive'], _0x38cdb9[_0x179c54(0xf1)](_0xec044, -0xf8a * -0x2 + -0x43 * 0x13 + -0x1a1b), _0x5f47a0, _0xec044, _0x38cdb9[_0x179c54(0x38e)]), this['drawText'](TextManager['statusMenu' + 'DmgDealt'], _0x38cdb9[_0x179c54(0x4de)](_0xec044, 0x1 * 0x237c + 0xd0e + -0x3089), _0x5f47a0, _0xec044, _0x38cdb9[_0x179c54(0x38e)]), _0x5f47a0 += _0x4a8dd1, this[_0x179c54(0x173) + _0x179c54(0x581) + _0x179c54(0x1fb) + 'et'](); const _0x2f0cca = this[_0x179c54(0x243)]('\x20')[_0x179c54(0x547)]; for (let _0x37f520 = -0x109 * 0x17 + -0x1 * 0x1a93 + -0x2 * -0x1931; _0x38cdb9[_0x179c54(0x517)](_0x37f520, _0x3f2c1a); _0x37f520++) { for (let _0x2e9970 = -0xfa8 + -0x2e3 * -0x2 + 0x9e2; _0x38cdb9[_0x179c54(0x471)](_0x2e9970, _0x2ae032); _0x2e9970++) { const _0x3145b1 = _0x38cdb9[_0x179c54(0x3c6)](this['innerWidth'], _0x2ae032); this[_0x179c54(0x3be) + 'rkRect'](_0x38cdb9['LNSvB'](_0x3145b1, _0x2e9970), _0x5f47a0, _0x3145b1, _0x2f0cca); let _0x2e31d0 = _0xe19bd6[_0x37f520]; _0x38cdb9['MDjNw'](_0x2ae032, -0x103f + -0x1 * 0x17f + 0x11c2) && (_0x2e31d0 = _0x38cdb9['vVnfH'](_0x38cdb9['ZXMQt'](_0x2e9970, -0x13 * -0xc9 + -0x274 + -0xc75), 0x3 * -0xd6 + 0xc9f + -0x35f * 0x3) ? _0xe19bd6[_0x37f520] : _0x558471[_0x37f520]); if (!_0x2e31d0) continue; const _0x4f814b = $dataSystem[_0x179c54(0x11d)][_0x2e31d0]; this['drawTextEx'](_0x4f814b, _0x38cdb9['OkUvl'](_0x38cdb9[_0x179c54(0x4de)](_0x3145b1, _0x38cdb9[_0x179c54(0x1c4)](_0x2e9970, _0x38cdb9[_0x179c54(0x39b)](0x1d93 + -0x259f + 0xe5 * 0x9, 0x1949 * 0x1 + -0x2430 + 0xaea))), _0x4eff45), _0x5f47a0, _0x38cdb9['kRVYE'](_0x38cdb9['ReTQI'](_0x3145b1, -0x3e7 + 0xef1 + -0xb08), -0x1cd6 * -0x1 + 0x1 * -0x8dd + 0x46 * -0x49)); const _0x332e2f = _0x264cc3[_0x2e9970]; this[_0x179c54(0x38f) + _0x179c54(0x34f)](); let _0x1c4349 = ''; if (_0x38cdb9[_0x179c54(0x282)](_0x332e2f, _0x38cdb9[_0x179c54(0x443)])) { const _0x46b70d = _0x174942[_0x179c54(0x4f5) + 'e'](_0x2e31d0), _0x43e1d3 = _0x38cdb9[_0x179c54(0x1f8)](_0x38cdb9[_0x179c54(0x453)](_0x46b70d, -0x24af + 0x1e * -0x132 + -0x2 * -0x2446), -(-0xf0e + -0x8 * 0x4b3 + 0x34a7)); this['changeText' + _0x179c54(0x210)](ColorManager[_0x179c54(0x44b) + _0x179c54(0x246)](_0x43e1d3)), _0x1c4349 = _0x38cdb9[_0x179c54(0x558)][_0x179c54(0x143)](Math[_0x179c54(0x322)](_0x38cdb9[_0x179c54(0x492)](_0x43e1d3, 0x745 * -0x2 + 0x1 * -0x1823 + -0x1 * -0x2711))); if (_0x174942['getAbsorbe' + _0x179c54(0x528)]()['includes'](_0x2e31d0)) this[_0x179c54(0x102) + 'Color'](ColorManager[_0x179c54(0x45e) + 'or']()), _0x1c4349 = TextManager['statusMenu' + 'DmgAbsorb'][_0x179c54(0x143)](Math[_0x179c54(0x322)](_0x38cdb9[_0x179c54(0x4de)](_0x46b70d, 0x29 * 0x9a + -0x121a + 0x9e * -0xa))); else { if (_0x38cdb9[_0x179c54(0x28c)](_0x46b70d, -0xe * -0xad + -0x49 * -0x76 + -0x2b1b)) _0x1c4349 = '%1'['format'](_0x1c4349); else _0x38cdb9[_0x179c54(0x351)](_0x46b70d, 0x2 * 0xa + 0x11c * 0x9 + -0xa0f) && (_0x1c4349 = _0x38cdb9['mKgfj'][_0x179c54(0x143)](_0x1c4349)); } } else { if (_0x38cdb9[_0x179c54(0x445)](_0x332e2f, _0x38cdb9['soFtm'])) { const _0x1e6683 = _0x174942['getDealtEl' + _0x179c54(0x222)](_0x2e31d0), _0x2e6266 = _0x174942[_0x179c54(0x12e) + _0x179c54(0x4dc)](_0x2e31d0), _0x14a4ba = _0x174942[_0x179c54(0x12e) + _0x179c54(0x16d)](_0x2e31d0), _0x43c642 = _0x38cdb9[_0x179c54(0x33e)](_0x38cdb9['OmELV'](_0x38cdb9[_0x179c54(0x492)](_0x38cdb9[_0x179c54(0x4f9)](-0x2 * -0x11f5 + 0x73 * -0x17 + -0x4 * 0x665, _0x1e6683), _0x2e6266), _0x14a4ba), 0x15ff * -0x1 + -0x146 * 0xe + 0x1 * 0x27d4); this[_0x179c54(0x102) + _0x179c54(0x210)](ColorManager['paramchang' + _0x179c54(0x246)](_0x43c642)), _0x1c4349 = _0x38cdb9[_0x179c54(0x558)][_0x179c54(0x143)](Math[_0x179c54(0x322)](_0x38cdb9[_0x179c54(0x3e4)](_0x43c642, 0x218 * -0xb + 0x9d * 0x27 + 0x1 * -0x7f))); if (_0x38cdb9[_0x179c54(0x39a)](_0x43c642, -0x120f + 0x482 + 0xd8d)) _0x1c4349 = _0x38cdb9['mKgfj'][_0x179c54(0x143)](_0x1c4349); } } this['contents'][_0x179c54(0x2d5)](_0x1c4349, _0x38cdb9['xoBCL'](_0x3145b1, _0x2e9970), _0x5f47a0, _0x38cdb9[_0x179c54(0x33e)](_0x38cdb9[_0x179c54(0x369)](_0x3145b1, -0x11d5 + -0x1 * 0x909 + 0x1ae1), _0x4eff45), _0x2f0cca, _0x38cdb9['NHDQW']); } _0x5f47a0 += _0x2f0cca; } for (let _0x2d4211 = 0x3 * -0x91 + 0x8c6 + -0x713; _0x38cdb9['EXXkn'](_0x2d4211, _0x2ae032); _0x2d4211++) { const _0x457363 = _0x38cdb9[_0x179c54(0x296)](this['innerWidth'], _0x2ae032); this[_0x179c54(0x3be) + _0x179c54(0x323)](_0x38cdb9[_0x179c54(0x1f8)](_0x457363, _0x2d4211), _0x5f47a0, _0x457363, _0x38cdb9[_0x179c54(0x358)](this['innerHeigh' + 't'], _0x5f47a0)); } }, Window_StatusData['prototype'][_0x54e01f(0x1a2) + _0x54e01f(0x30c) + _0x54e01f(0x52d)] = function (_0x47bde3) { const _0x457a27 = _0x54e01f, _0x224b2b = { 'oJNAp': function (_0x1d4b03, _0x2ab170) { return _0x1d4b03 === _0x2ab170; } }; this[_0x457a27(0x38f) + _0x457a27(0x34f)](); let _0x582786 = 0x5 * 0x287 + -0x21aa + -0x1 * -0x1507; for (const _0x58543b of _0x47bde3) { if (!_0x58543b) continue; if (_0x224b2b[_0x457a27(0x26a)](_0x58543b['trim'](), '')) continue; if (_0x58543b[_0x457a27(0x2af)](/-----/i)) continue; _0x582786 = Math['max'](_0x582786, this[_0x457a27(0x243)](_0x58543b['trim']())[_0x457a27(0x592)]); } return _0x582786; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x36e)] = function () { const _0x23f560 = _0x54e01f; if (this[_0x23f560(0x279) + 'h']) return this[_0x23f560(0x279) + 'h']; return this['_stypeWidt' + 'h'] = this['getDataSys' + _0x23f560(0x30c) + _0x23f560(0x52d)]($dataSystem[_0x23f560(0x213)]), this[_0x23f560(0x279) + 'h']; }, Window_StatusData[_0x54e01f(0x353)]['wtypeWidth'] = function () { const _0x30b94b = _0x54e01f; if (this[_0x30b94b(0x337) + 'h']) return this[_0x30b94b(0x337) + 'h']; return this[_0x30b94b(0x337) + 'h'] = this['getDataSys' + _0x30b94b(0x30c) + _0x30b94b(0x52d)]($dataSystem[_0x30b94b(0x201) + 's']), this[_0x30b94b(0x337) + 'h']; }, Window_StatusData[_0x54e01f(0x353)][_0x54e01f(0x566)] = function () { const _0x14d82f = _0x54e01f; if (this[_0x14d82f(0x4d3) + 'h']) return this['_atypeWidt' + 'h']; return this[_0x14d82f(0x4d3) + 'h'] = this[_0x14d82f(0x1a2) + _0x14d82f(0x30c) + _0x14d82f(0x52d)]($dataSystem['armorTypes']), this['_atypeWidt' + 'h']; }, Window_StatusData['prototype']['drawAccess'] = function () { const _0x34977b = _0x54e01f, _0x5c6145 = { 'FFEme': function (_0x5e7629, _0x7d09d8) { return _0x5e7629 / _0x7d09d8; }, 'Epflc': function (_0xcfac81, _0x1cc158) { return _0xcfac81 / _0x1cc158; }, 'xPNrS': _0x34977b(0x2d2), 'dVesD': function (_0x1ba3b9, _0x656727) { return _0x1ba3b9 > _0x656727; }, 'YwnaN': function (_0x3ca9c5, _0x112493) { return _0x3ca9c5 - _0x112493; }, 'yOOsd': function (_0x2f0280, _0x468b18) { return _0x2f0280 + _0x468b18; }, 'iVqdr': function (_0x56a824, _0x275d7a) { return _0x56a824 - _0x275d7a; }, 'rKFNL': function (_0x5d38cf, _0x585cc0) { return _0x5d38cf * _0x585cc0; }, 'dONnI': function (_0x57d75a, _0x330ee1) { return _0x57d75a - _0x330ee1; }, 'TbfTo': function (_0x2e5082, _0x45b02c) { return _0x2e5082 > _0x45b02c; }, 'lvdFp': function (_0x4d079b, _0x10d8ed) { return _0x4d079b / _0x10d8ed; }, 'dmCss': function (_0x29dfa6, _0x3a9de1) { return _0x29dfa6 + _0x3a9de1; }, 'eoYkM': function (_0xbd2a9b, _0x2adea5) { return _0xbd2a9b * _0x2adea5; }, 'jhQra': function (_0x3b926e, _0x40d7e4) { return _0x3b926e - _0x40d7e4; }, 'GKTJd': function (_0x36d9df, _0x4414d8) { return _0x36d9df - _0x4414d8; }, 'ErMNe': function (_0x69a3ba, _0x166c83) { return _0x69a3ba - _0x166c83; }, 'gToti': function (_0x333c29, _0x551c0a) { return _0x333c29 * _0x551c0a; } }, _0x25114e = this[_0x34977b(0x58e)](), _0x35a913 = this[_0x34977b(0x292)], _0x79d46a = Math[_0x34977b(0x458)](_0x5c6145[_0x34977b(0x2ff)](this[_0x34977b(0x150)], -0x1d * 0x44 + -0x5c4 + 0xd7b)); let _0x58b2e0 = 0xb * 0x4b + 0x268 * -0x4 + -0xb * -0x95, _0x288c0f = -0xf7d + -0x2064 * -0x1 + -0x10e7; this[_0x34977b(0x26b) + _0x34977b(0x2c3)](0xa05 + 0xad6 + 0x14db * -0x1, _0x5c6145[_0x34977b(0x2fd)](this['innerWidth'], -0x1c * -0x13c + -0x3 * -0x207 + -0x28a3)); let _0x3472af = new Rectangle(0xf0c + 0xc5e * 0x3 + -0x96 * 0x59, -0x528 + -0xa33 * -0x2 + -0x2 * 0x79f, _0x79d46a, this[_0x34977b(0x55a) + 't']); _0x58b2e0 = _0x3472af['x'], _0x288c0f = 0x89 * -0x31 + -0x1 * -0x21af + -0xa * 0xbf, this[_0x34977b(0x38f) + 'ettings'](), this['drawItemDa' + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e, 0x1ac4 * 0x1 + -0xff5 + -0xacd), this['changeText' + 'Color'](ColorManager[_0x34977b(0x2b2) + 'r']()), this['drawText'](TextManager[_0x34977b(0x172) + _0x34977b(0x3c5)], _0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x5c6145[_0x34977b(0x521)]), _0x288c0f += _0x25114e; for (const _0x2c3c65 of _0x35a913[_0x34977b(0x213)]()) { this[_0x34977b(0x3be) + 'rkRect'](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e); if (_0x5c6145[_0x34977b(0x398)](_0x2c3c65, -0x6b3 + -0xa07 * 0x2 + 0x1ac1)) { const _0x3392df = $dataSystem['skillTypes'][_0x2c3c65], _0x1af7d8 = Math[_0x34977b(0x322)](_0x5c6145[_0x34977b(0x2ff)](_0x5c6145[_0x34977b(0x4a2)](_0x3472af[_0x34977b(0x592)], this[_0x34977b(0x36e)]()), 0x2e * 0x1 + 0x3b * 0xb + 0x4d * -0x9)); this[_0x34977b(0x1e8)](_0x3392df, _0x5c6145[_0x34977b(0x57d)](_0x58b2e0, _0x1af7d8), _0x288c0f, _0x5c6145[_0x34977b(0x567)](_0x3472af['width'], _0x5c6145[_0x34977b(0x1d2)](_0x1af7d8, -0x1b7 * 0xf + 0xb76 * -0x3 + -0xb * -0x577))); } _0x288c0f += _0x25114e; } this['drawItemDa' + 'rkRect'](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x5c6145[_0x34977b(0xe4)](this[_0x34977b(0x55a) + 't'], _0x288c0f)), _0x3472af['x'] += _0x3472af[_0x34977b(0x592)], _0x58b2e0 = _0x3472af['x'], _0x288c0f = -0x61 + -0xaf + 0x110, this[_0x34977b(0x38f) + 'ettings'](), this['drawItemDa' + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e, 0x1d7d + 0x216d + -0x3ee8), this[_0x34977b(0x102) + _0x34977b(0x210)](ColorManager[_0x34977b(0x2b2) + 'r']()), this[_0x34977b(0x2d5)](TextManager[_0x34977b(0x172) + _0x34977b(0x4e6)], _0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x5c6145['xPNrS']), _0x288c0f += _0x25114e; for (const _0x2b44e7 of _0x35a913[_0x34977b(0x201) + 's']()) { this['drawItemDa' + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e); if (_0x5c6145[_0x34977b(0x417)](_0x2b44e7, 0x1 * 0x20e3 + 0x6d * 0x26 + -0x3111)) { const _0x5e8b37 = $dataSystem['weaponType' + 's'][_0x2b44e7], _0x428931 = Math['round'](_0x5c6145[_0x34977b(0x116)](_0x5c6145['YwnaN'](_0x3472af[_0x34977b(0x592)], this['wtypeWidth']()), -0xe15 + 0x59 * 0x28 + 0x2f)); this['drawTextEx'](_0x5e8b37, _0x5c6145[_0x34977b(0x1cd)](_0x58b2e0, _0x428931), _0x288c0f, _0x5c6145['YwnaN'](_0x3472af[_0x34977b(0x592)], _0x5c6145[_0x34977b(0x511)](_0x428931, -0x1 * -0x6d9 + 0x130 * 0x1b + -0x26e7))); } _0x288c0f += _0x25114e; } this[_0x34977b(0x3be) + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af['width'], _0x5c6145[_0x34977b(0xe4)](this[_0x34977b(0x55a) + 't'], _0x288c0f)), _0x3472af['x'] += _0x3472af['width'], _0x58b2e0 = _0x3472af['x'], _0x288c0f = 0xad9 + -0x18a1 + 0xdc8, _0x3472af[_0x34977b(0x592)] = _0x5c6145[_0x34977b(0x394)](this[_0x34977b(0x150)], _0x3472af['x']), this[_0x34977b(0x38f) + _0x34977b(0x34f)](), this['drawItemDa' + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e, 0x206c + -0x719 + -0x1951), this[_0x34977b(0x102) + _0x34977b(0x210)](ColorManager[_0x34977b(0x2b2) + 'r']()), this['drawText'](TextManager[_0x34977b(0x172) + _0x34977b(0x593)], _0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x5c6145[_0x34977b(0x521)]), _0x288c0f += _0x25114e; for (const _0x4b557f of _0x35a913['armorTypes']()) { this[_0x34977b(0x3be) + 'rkRect'](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x25114e); if (_0x5c6145[_0x34977b(0x398)](_0x4b557f, 0x2042 + -0xe4a + 0xe6 * -0x14)) { const _0x52cd90 = $dataSystem['armorTypes'][_0x4b557f], _0x3a378f = Math[_0x34977b(0x322)](_0x5c6145[_0x34977b(0x2fd)](_0x5c6145[_0x34977b(0x570)](_0x3472af['width'], this['atypeWidth']()), 0x175c + 0x4 * -0x1d6 + -0x2 * 0x801)); this['drawTextEx'](_0x52cd90, _0x5c6145[_0x34977b(0x57d)](_0x58b2e0, _0x3a378f), _0x288c0f, _0x5c6145[_0x34977b(0x188)](_0x3472af['width'], _0x5c6145[_0x34977b(0x41a)](_0x3a378f, -0x1dab + 0x256a + -0x7bd))); } _0x288c0f += _0x25114e; } this[_0x34977b(0x3be) + _0x34977b(0x323)](_0x58b2e0, _0x288c0f, _0x3472af[_0x34977b(0x592)], _0x5c6145['dONnI'](this[_0x34977b(0x55a) + 't'], _0x288c0f)); };