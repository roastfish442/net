//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.45;

//=============================================================================
/*:
* @target MZ
* @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.45] [SkillsStatesCore]
* @author VisuStella
* @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
* @orderAfter VisuMZ_0_CoreEngine
*
* @help
* ============================================================================
* Introduction
* ============================================================================
*
* The Skills & States Core plugin extends and builds upon the functionality of
* RPG Maker MZ's inherent skill, state, and buff functionalities and allows
* game devs to customize its various aspects.
*
* Features include all (but not limited to) the following:
* 
* * Assigning multiple Skill Types to Skills.
* * Making custom Skill Cost Types (such as HP, Gold, and Items).
* * Allowing Skill Costs to become percentile-based or dynamic either directly
*   through the Skills themselves or through trait-like notetags.
* * Replacing gauges for different classes to display different types of
*   Skill Cost Type resources.
* * Hiding/Showing and enabling/disabling skills based on switches, learned
*   skills, and code.
* * Setting rulings for states, including if they're cleared upon death, how
*   reapplying the state affects their turn count, and more.
* * Allowing states to be categorized and affected by categories, too.
* * Displaying turn counts on states drawn in the window or on sprites.
* * Manipulation of state, buff, and debuff turns through skill and item
*   effect notetags.
* * Create custom damage over time state calculations through notetags.
* * Allow database objects to apply passive states to its user.
* * Passive states can have conditions before they become active as well.
* * Updated Skill Menu Scene layout to fit more modern appearances.
* * Added bonus if Items & Equips Core is installed to utilize the Shop Status
*   Window to display skill data inside the Skill Menu.
* * Control over various aspects of the Skill Menu Scene.
*
* ============================================================================
* Requirements
* ============================================================================
*
* This plugin is made for RPG Maker MZ. This will not work in other iterations
* of RPG Maker.
*
* ------ Tier 1 ------
*
* This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
* value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
* that your plugins will have the best compatibility with the rest of the
* VisuStella MZ library.
*
* ============================================================================
* Major Changes
* ============================================================================
*
* This plugin adds some new hard-coded features to RPG Maker MZ's functions.
* The following is a list of them.
*
* ---
* 
* Action End Removal for States
* 
* - If your Plugin Parameter settings for "Action End Update" are enabled,
* then "Action End" has been updated so that it actually applies per action
* used instead of just being at the start of a battler's action set.
* 
* - However, there are side effects to this: if a state has the "Cannot Move"
* restriction along with the "Action End" removal timing, then unsurprisingly,
* the state will never wear off because it's now based on actual actions
* ending. To offset this and remove confusion, "Action End" auto-removal
* timings for states with "Cannot Move" restrictions will be turned into
* "Turn End" auto-removal timings while the "Action End Update" is enabled.
* 
* - This automatic change won't make it behave like an "Action End" removal
* timing would, but it's better than completely softlocking a battler.
* 
* ---
*
* Buff & Debuff Level Management
*
* - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
* the buff modifier level up or down. This plugin will add an extra change to
* the mechanic by making it so that once the buff modifier level reaches a
* neutral point, the buff or debuff is removed altogether and resets the buff
* and debuff turn counter for better accuracy.
*
* ---
*
* Skill Costs
*
* - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
* Types are now moved to the Plugin Parameters, including MP and TP. This
* means that from payment to checking for them, it's all done through the
* options available.
*
* - By default in RPG Maker MZ, displayed skill costs would only display only
* one type: TP if available, then MP. If a skill costs both TP and MP, then
* only TP was displayed. This plugin changes that aspect by displaying all the
* cost types available in order of the Plugin Parameter Skill Cost Types.
*
* - By default in RPG Maker MZ, displayed skill costs were only color-coded.
* This plugin changes that aspect by displaying the Skill Cost Type's name
* alongside the cost. This is to help color-blind players distinguish what
* costs a skill has.
*
* ---
*
* Sprite Gauges
*
* - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
* HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
* to be customized through the use of Plugin Parameters under the Skill Cost
* Types and their related-JavaScript entries.
*
* ---
* 
* State Displays
* 
* - To put values onto states and display them separately from the state turns
* you can use the following script calls.
* 
*   battler.getStateDisplay(stateId)
*   - This returns whatever value is stored for the specified battler under
*     that specific state value.
*   - If there is no value to be returned it will return an empty string.
* 
*   battler.setStateDisplay(stateId, value)
*   - This sets the display for the battler's specific state to whatever you
*     declared as the value.
*   - The value is best used as a number or a string.
* 
*   battler.clearStateDisplay(stateId)
*   - This clears the display for the battler's specific state.
*   - In short, this sets the stored display value to an empty string.
* 
* ---
*
* Window Functions Moved
*
* - Some functions found in RPG Maker MZ's default code for Window_StatusBase
* and Window_SkillList are now moved to Window_Base to make the functions
* available throughout all windows for usage.
*
* ---
*
* ============================================================================
* Slip Damage Popup Clarification
* ============================================================================
* 
* Slip Damage popups only show one popup for HP, MP, and TP each and it is the
* grand total of all the states and effects combined regardless of the number
* of states and effects on a battler. This is how it is in vanilla RPG Maker
* MZ and this is how we intend for it to be with the VisuStella MZ library.
* 
* This is NOT a bug!
* 
* The reason we are not changing this is because it does not properly relay
* information to the player accurately. When multiple popups appear, players
* only have roughly a second and a half to calculate it all for any form of
* information takeaway. We feel it is better suited for the player's overall
* convenience to show a cummulative change and steer the experience towards a
* more positive one.
*
* ============================================================================
* Passive State Clarification
* ============================================================================
* 
* This section will explain various misconceptions regarding passive states.
* No, passive states do not work the same way as states code-wise. Yes, they
* use the same effects as states mechanically, but there are differences.
* 
* ---
* 
* For those using the code "a.isStateAffected(10)" to check if a target is
* affected by a state or not, this does NOT check passive states. This only
* checks for states that were directly applied to the target.
* 
* This is NOT a bug.
* 
* Instead, use "a.states().includes($dataStates[10])" to check for them. This
* code will search for both directly applied states and passive states alike.
*
* ---
* 
* As passive states are NOT considered directly applied to, they do NOT match
* a Conditional Branch's state check as well. The Conditional Branch effect
* checks for an affected state.
* 
* ---
* 
* Because passive states are NOT directly applied to a battler, the functions
* of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
* passive states either. This means that any of the related JS notetags tied
* to those functions will not occur either.
* 
* ---
* 
* Why are passive states not considered affected by? Let's look at it
* differently. There are two ways to grant skills to actors. They can acquire
* skills by levels/items/events or they can equip gear that temporarily grants
* the skill in question.
* 
* Learning the skill is direct. Temporarily granting the skill is indirect.
* These two factors have mechanical importance and require differentiation.
* 
* Regular states and passive states are the same way. Regular states are
* directly applied, therefore, need to be distinguished in order for things
* like state turns and steps, removal conditionals, and similar to matter at
* all. Passive states are indirect and are therefore, unaffected by state
* turns, steps, and removal conditions. These mechanical differences are
* important for how RPG Maker works.
* 
* ---
* 
* Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
* check if a target has a passive state will return false.
* 
* ---
*
* ============================================================================
* Notetags
* ============================================================================
*
* The following are notetags that have been added through this plugin. These
* notetags will not work with your game if this plugin is OFF or not present.
*
* === General Skill Notetags ===
*
* The following are general notetags that are skill-related.
*
* ---
*
* <Skill Type: x>
* <Skill Types: x,x,x>
*
* <Skill Type: name>
* <Skill Types: name, name, name>
*
* - Used for: Skill Notetags
* - Marks the skill to have multiple Skill Types, meaning they would appear
*   under different skill types without needing to create duplicate skills.
* - Replace 'x' with a number value representing the Skill Type's ID.
* - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
*   name desired to be added.
*
* ---
* 
* <List Name: name>
* 
* - Used for: Skill Notetags
* - Makes the name of the skill appear different when show in the skill list.
* - Using \V[x] as a part of the name will display that variable.
* 
* ---
*
* === Skill Cost Notetags ===
*
* The following are notetags that can be used to adjust skill costs. Some of
* these notetags are added through the Plugin Parameter: Skill Cost Types and
* can be altered there. This also means that some of these notetags can have
* their functionality altered and/or removed.
*
* ---
*
* <type Cost: x>
* <type Cost: x%>
*
* - Used for: Skill Notetags
* - These notetags are used to designate costs of custom or already existing
*   types that cannot be made by the Database Editor.
* - Replace 'type' with a resource type. Existing ones found in the Plugin
*   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
* - Replace 'x' with a number value to determine the exact type cost value.
*   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
* - The 'x%' version is replaced with a percentile value to determine a cost
*   equal to a % of the type's maximum quantity limit.
* - Functionality for these notetags can be altered in the Plugin Parameters.
*
* Examples:
*   <HP Cost: 500>
*   <MP Cost: 25%>
*   <Gold Cost: 3000>
*   <Potion Cost: 5>
*
* ---
*
* <type Cost Max: x>
* <type Cost Min: x>
*
* - Used for: Skill Notetags
* - These notetags are used to ensure conditional and % costs don't become too
*   large or too small.
* - Replace 'type' with a resource type. Existing ones found in the Plugin
*   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
* - Replace 'x' with a number value to determine the maximum or minimum values
*   that the cost can be.
* - Functionality for these notetags can be altered in the Plugin Parameters.
*
* Examples:
*   <HP Cost Max: 1500>
*   <MP Cost Min: 5>
*   <Gold Cost Max: 10000>
*   <Potion Cost Min: 3>
*
* ---
*
* <type Cost: +x>
* <type Cost: -x>
*
* <type Cost: x%>
*
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - The related actor will raise/lower the cost of any skill that uses the
*   'type' cost by a specified amount.
* - Replace 'type' with a resource type. Existing ones found in the Plugin
*   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
* - For % notetag variant: Replace 'x' with a number value to determine the
*   rate to adjust the Skill Cost Type by as a rate value. This is applied
*   before <type Cost: +x> and <type Cost: -x> notetags.
* - For + and - notetag variants: Replace 'x' with a number value to determine
*   how much to adjust the Skill Cost Type by as a flat value. This is applied
*   after <type Cost: x%> notetags.
* - Functionality for these notetags can be altered in the Plugin Parameters.
*
* Examples:
*   <HP Cost: +20>
*   <MP Cost: -10>
*   <Gold Cost: 50%>
*   <Potion Cost: 200%>
*
* ---
*
* <Custom Cost Text>
*  text
* </Custom Cost Text>
*
* - Used for: Skill Notetags
* - Allows you to insert custom text into the skill's cost area towards the
*   end of the costs.
* - Replace 'text' with the text you wish to display.
* - Text codes may be used.
*
* ---
*
* === JavaScript Notetags: Skill Costs ===
*
* The following are notetags made for users with JavaScript knowledge to
* determine any dynamic Skill Cost Types used for particular skills.
*
* ---
*
* <JS type Cost>
*  code
*  code
*  cost = code;
* </JS type Cost>
*
* - Used for: Skill Notetags
* - Replace 'type' with a resource type. Existing ones found in the Plugin
*   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
* - Replace 'code' to determine the type 'cost' of the skill.
* - Insert the final type cost into the 'cost' variable.
* - The 'user' variable refers to the user about to perform the skill.
* - The 'skill' variable refers to the skill being used.
* - Functionality for the notetag can be altered in the Plugin Parameters.
*
* ---
*
* === Gauge Replacement Notetags ===
*
* Certain classes can have their gauges swapped out for other Skill Cost
* Types. This is especially helpful for the classes that don't utilize those
* Skill Cost Types. You can mix and match them however you want.
*
* ---
*
* <Replace HP Gauge: type>
* <Replace MP Gauge: type>
* <Replace TP Gauge: type>
*
* - Used for: Class Notetags
* - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
*   Cost Type.
* - Replace 'type' with a resource type. Existing ones found in the Plugin
*   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
*   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
* - Replace 'type' with 'none' to not display any gauges there.
* - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
*   to be on in the Database > System 1 tab.
* - Functionality for the notetags can be altered by changes made to the
*   Skill & States Core Plugin Parameters.
*
* ---
* 
* === Item Cost-Related Notetags ===
* 
* ---
* 
* <Item Cost: x name>
* <Weapon Cost: x name>
* <Armor Cost: x name>
* 
* - Used for: Skill Notetags
* - The skill will consume items, weapons, and/or armors in order to be used.
*   - Even non-consumable items will be consumed.
* - Replace 'x' with a number representing the respective item cost.
* - Replace 'name' with text representing the respective item, weapon, or
*   armor to be consumed.
* - Insert multiples of this notetag to consume multiple items, weapons,
*   and/or armors.
* - Functionality for these notetags can be altered in the Plugin Parameters.
* 
* Examples:
* 
*   <Item Cost: 5 Magic Water>
*   <Item Cost: 2 Antidote>
*   <Weapon Cost: 1 Short Sword>
*   <Armor Cost: 3 Cloth Armor>
* 
* ---
*
* <Item Cost Max: x name>
* <Item Cost Min: x name>
*
* <Weapon Cost Max: x name>
* <Weapon Cost Min: x name>
*
* <Armor Cost Max: x name>
* <Armor Cost Min: x name>
* 
* - Used for: Skill Notetags
* - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
* - Replace 'x' with a number representing the maximum or minimum cost.
* - Replace 'name' with text representing the respective item, weapon, or
*   armor to be consumed.
* 
* Examples:
* 
*   <Item Cost Max: 10 Magic Water>
*   <Item Cost Min: 2 Antidote>
*   <Weapon Cost Max: 3 Short Sword>
*   <Armor Cost Min: 1 Cloth Armor>
* 
* ---
*
* <Item Cost: +x name>
* <Item Cost: -x name>
*
* <Weapon Cost: +x name>
* <Weapon Cost: -x name>
*
* <Armor Cost: +x name>
* <Armor Cost: -x name>
* 
* <Item Cost: x% name>
* <Weapon Cost: x% name>
* <Armor Cost: x% name>
* 
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - The related actor will raise/lower the item, weapon, and/or armor costs of
*   any skill that costs those items, weapons, and/or armors by x%.
* - For % notetag variant: Replace 'x' with a number value to determine the
*   rate to adjust the Skill Cost Type by as a rate value. This is applied
*   before <type Cost: +x> and <type Cost: -x> notetags.
* - For + and - notetag variants: Replace 'x' with a number value to determine
*   how much to adjust the Skill Cost Type by as a flat value. This is applied
*   after <type Cost: x%> notetags.
* - Replace 'name' with text representing the respective item, weapon, or
*   armor to be consumed.
* - Insert multiples of this notetag to consume multiple items, weapons,
*   and/or armors.
* - Functionality for these notetags can be altered in the Plugin Parameters.
* 
* Examples:
* 
*   <Item Cost: +1 Magic Water>
*   <Item Cost: -2 Antidote>
*   <Weapon Cost: 50% Short Sword>
*   <Armor Cost: 200% Cloth Armor>
* 
* ---
* 
* <Replace Item name1 Cost: name2>
* <Replace Weapon name1 Cost: name2>
* <Replace Armor name1 Cost: name2>
* 
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - The related actor will not consume 'name1' items, weapons, or armors.
*   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
*   - Even non-consumable items will be consumed.
* - Replace 'name1' with text representing the respective item, weapon, or
*   armor that is the original cost type.
* - Replace 'name2' with text representing the respective item, weapon, or
*   armor that will be consumed instead.
* 
* Examples:
* 
*   <Replace Item Magic Water Cost: Potion>
*   <Replace Item Antidote Cost: Dispel Herb>
*   <Replace Weapon Short Sword Cost: Falchion>
*   <Replace Armor Cloth Armor Cost: Leather Armor>
* 
* ---
*
* === Skill Accessibility Notetags ===
*
* Sometimes, you don't want all skills to be visible whether it be to hide
* menu-only skills during battle, until certain switches are turned ON/OFF, or
* until certain skills have been learned.
*
* ---
*
* <Hide in Battle>
* <Hide outside Battle>
*
* - Used for: Skill Notetags
* - Makes the specific skill visible or hidden depending on whether or not the
*   player is currently in battle.
*
* ---
*
* <Show Switch: x>
*
* <Show All Switches: x,x,x>
* <Show Any Switches: x,x,x>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on switches.
* - Replace 'x' with the switch ID to determine the skill's visibility.
* - If 'All' notetag variant is used, skill will be hidden until all switches
*   are ON. Then, it would be shown.
* - If 'Any' notetag variant is used, skill will be shown if any of the
*   switches are ON. Otherwise, it would be hidden.
*
* ---
*
* <Hide Switch: x>
*
* <Hide All Switches: x,x,x>
* <Hide Any Switches: x,x,x>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on switches.
* - Replace 'x' with the switch ID to determine the skill's visibility.
* - If 'All' notetag variant is used, skill will be shown until all switches
*   are ON. Then, it would be hidden.
* - If 'Any' notetag variant is used, skill will be hidden if any of the
*   switches are ON. Otherwise, it would be shown.
*
* ---
*
* <Show if learned Skill: x>
*
* <Show if learned All Skills: x,x,x>
* <Show if learned Any Skills: x,x,x>
*
* <Show if learned Skill: name>
*
* <Show if learned All Skills: name, name, name>
* <Show if learned Any Skills: name, name, name>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on skills learned.
* - This does not apply to skills added by traits on actors, classes, any
*   equipment, or states. These are not considered learned skills. They are
*   considered temporary skills.
* - Replace 'x' with the skill ID to determine the skill's visibility.
* - If 'name' notetag viarant is used, replace 'name' with the skill's name to
*   be checked for the notetag.
* - If 'All' notetag variant is used, skill will be hidden until all skills
*   are learned. Then, it would be shown.
* - If 'Any' notetag variant is used, skill will be shown if any of the skills
*   are learned. Otherwise, it would be hidden.
*
* ---
*
* <Hide if learned Skill: x>
*
* <Hide if learned All Skills: x,x,x>
* <Hide if learned Any Skills: x,x,x>
*
* <Hide if learned Skill: name>
*
* <Hide if learned All Skills: name, name, name>
* <Hide if learned Any Skills: name, name, name>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on skills learned.
* - This does not apply to skills added by traits on actors, classes, any
*   equipment, or states. These are not considered learned skills. They are
*   considered temporary skills.
* - Replace 'x' with the skill ID to determine the skill's visibility.
* - If 'name' notetag viarant is used, replace 'name' with the skill's name to
*   be checked for the notetag.
* - If 'All' notetag variant is used, skill will be shown until all skills
*   are learned. Then, it would be hidden.
* - If 'Any' notetag variant is used, skill will be hidden if any of the
*   skills are learned. Otherwise, it would be shown.
*
* ---
*
* <Show if has Skill: x>
*
* <Show if have All Skills: x,x,x>
* <Show if have Any Skills: x,x,x>
*
* <Show if has Skill: name>
*
* <Show if have All Skills: name, name, name>
* <Show if have Any Skills: name, name, name>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on skills available.
* - This applies to both skills that have been learned and/or temporarily
*   added through traits on actors, classes, equipment, or states.
* - Replace 'x' with the skill ID to determine the skill's visibility.
* - If 'name' notetag viarant is used, replace 'name' with the skill's name to
*   be checked for the notetag.
* - If 'All' notetag variant is used, skill will be hidden until all skills
*   are learned. Then, it would be shown.
* - If 'Any' notetag variant is used, skill will be shown if any of the skills
*   are learned. Otherwise, it would be hidden.
*
* ---
*
* <Hide if has Skill: x>
*
* <Hide if have All Skills: x,x,x>
* <Hide if have Any Skills: x,x,x>
*
* <Hide if has Skill: name>
*
* <Hide if have All Skills: name, name, name>
* <Hide if have Any Skills: name, name, name>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on skills available.
* - This applies to both skills that have been learned and/or temporarily
*   added through traits on actors, classes, equipment, or states.
* - Replace 'x' with the skill ID to determine the skill's visibility.
* - If 'name' notetag viarant is used, replace 'name' with the skill's name to
*   be checked for the notetag.
* - If 'All' notetag variant is used, skill will be shown until all skills
*   are learned. Then, it would be hidden.
* - If 'Any' notetag variant is used, skill will be hidden if any of the
*   skills are learned. Otherwise, it would be shown.
*
* ---
*
* <Enable Switch: x>
*
* <Enable All Switches: x,x,x>
* <Enable Any Switches: x,x,x>
*
* - Used for: Skill Notetags
* - Determines the enabled status of the skill based on switches.
* - Replace 'x' with the switch ID to determine the skill's enabled status.
* - If 'All' notetag variant is used, skill will be disabled until all
*   switches are ON. Then, it would be enabled.
* - If 'Any' notetag variant is used, skill will be enabled if any of the
*   switches are ON. Otherwise, it would be disabled.
*
* ---
*
* <Disable Switch: x>
*
* <Disable All Switches: x,x,x>
* <Disable Any Switches: x,x,x>
*
* - Used for: Skill Notetags
* - Determines the enabled status of the skill based on switches.
* - Replace 'x' with the switch ID to determine the skill's enabled status.
* - If 'All' notetag variant is used, skill will be enabled until all switches
*   are ON. Then, it would be disabled.
* - If 'Any' notetag variant is used, skill will be disabled if any of the
*   switches are ON. Otherwise, it would be enabled.
*
* ---
*
* === JavaScript Notetags: Skill Accessibility ===
*
* The following are notetags made for users with JavaScript knowledge to
* determine if a skill can be accessible visibly or through usage.
*
* ---
*
* <JS Skill Visible>
*  code
*  code
*  visible = code;
* </JS Skill Visible>
*
* - Used for: Skill Notetags
* - Determines the visibility of the skill based on JavaScript code.
* - Replace 'code' to determine the type visibility of the skill.
* - The 'visible' variable returns a boolean (true/false) to determine if the
*   skill will be visible or not.
* - The 'user' variable refers to the user with the skill.
* - The 'skill' variable refers to the skill being checked.
* - All other visibility conditions must be met for this code to count.
*
* ---
*
* <JS Skill Enable>
*  code
*  code
*  enabled = code;
* </JS Skill Enable>
*
* - Used for: Skill Notetags
* - Determines the enabled status of the skill based on JavaScript code.
* - Replace 'code' to determine the type enabled status of the skill.
* - The 'enabled' variable returns a boolean (true/false) to determine if the
*   skill will be enabled or not.
* - The 'user' variable refers to the user with the skill.
* - The 'skill' variable refers to the skill being checked.
* - All other skill conditions must be met in order for this to code to count.
*
* ---
*
* === General State-Related Notetags ===
*
* The following notetags are centered around states, such as how their turn
* counts are displayed, items and skills that affect state turns, if the state
* can avoid removal by death state, etc.
*
* ---
*
* <No Death Clear>
*
* - Used for: State Notetags
* - Prevents this state from being cleared upon death.
* - This allows this state to be added to an already dead battler, too.
*
* ---
*
* <No Recover All Clear>
*
* - Used for: State Notetags
* - Prevents this state from being cleared upon using the Recover All command.
*
* ---
*
* <Group Defeat>
*
* - Used for: State Notetags
* - If an entire party is affected by states with the <Group Defeat> notetag,
*   they are considered defeated.
* - Usage for this includes party-wide petrification, frozen, etc.
*
* ---
*
* <Reapply Rules: Ignore>
* <Reapply Rules: Reset>
* <Reapply Rules: Greater>
* <Reapply Rules: Add>
*
* - Used for: State Notetags
* - Choose what kind of rules this state follows if the state is being applied
*   to a target that already has the state. This affects turns specifically.
* - 'Ignore' will bypass any turn changes.
* - 'Reset' will recalculate the state's turns.
* - 'Greater' will choose to either keep the current turn count if it's higher
*   than the reset amount or reset it if the current turn count is lower.
* - 'Add' will add the state's turn count to the applied amount.
* - If this notetag isn't used, it will use the rules set in the States >
*   Plugin Parameters.
*
* ---
*
* <Positive State>
* <Negative State>
*
* - Used for: State Notetags
* - Marks the state as a positive state or negative state, also altering the
*   state's turn count color to match the Plugin Parameter settings.
* - This also puts the state into either the 'Positive' category or
*   'Negative' category.
*
* ---
*
* <Category: name>
* <Category: name, name, name>
*
* - Used for: State Notetags
* - Arranges states into certain/multiple categories.
* - Replace 'name' with a category name to mark this state as.
* - Insert multiples of this to mark the state with  multiple categories.
*
* ---
*
* <Categories>
*  name
*  name
* </Categories>
*
* - Used for: State Notetags
* - Arranges states into certain/multiple categories.
* - Replace each 'name' with a category name to mark this state as.
*
* ---
* 
* <Resist State Category: name>
* <Resist State Categories: name, name, name>
* 
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Causes the affected battler resist the listed categories.
* - Replace each 'name' with a category name to resist.
*   - Insert multiple 'name' entries to add more categories.
* - This works exactly like how state resistances work in-game. If a battler
*   who was originally NOT resistant to "Poison" before gaining a
*   poison-resistant trait, the "Poison" state will remain because it was
*   applied before poison-resistance as enabled.
* 
* ---
* 
* <Resist State Categories>
*  name
*  name
*  name
* </Resist State Categories>
* 
* - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
* - Causes the affected battler resist the listed categories.
* - Replace each 'name' with a category name to resist.
*   - Insert multiple 'name' entries to add more categories.
* - This works exactly like how state resistances work in-game. If a battler
*   who was originally NOT resistant to "Poison" before gaining a
*   poison-resistant trait, the "Poison" state will remain because it was
*   applied before poison-resistance as enabled.
* 
* ---
*
* <State x Category Remove: y>
* 
* <State x Category Remove: All>
*
* - Used for: Skill, Item Notetags
* - Allows the skill/item to remove 'y' states from specific category 'x'.
* - Replace 'x' with a category name to remove from.
* - Replace 'y' with the number of times to remove from that category.
* - Use the 'All' variant to remove all of the states of that category.
* - Insert multiples of this to remove different types of categories.
*
* ---
* 
* <Remove Other x States>
* 
* - Used for: State Notetags
* - When the state with this notetag is added, remove other 'x' category
*   states from the battler (except for the state being added).
* - Replace 'x' with a category name to remove from.
* - Insert multiples of this to remove different types of categories.
* - Useful for thing state types like stances and forms that there is usually
*   only one active at a time.
* 
* ---
*
* <Hide State Turns>
*
* - Used for: State Notetags
* - Hides the state turns from being shown at all.
* - This will by pass any Plugin Parameter settings.
*
* ---
*
* <Turn Color: x>
* <Turn Color: #rrggbb>
*
* - Used for: State Notetags
* - Hides the state turns from being shown at all.
* - Determines the color of the state's turn count.
* - Replace 'x' with a number value depicting a window text color.
* - Replace 'rrggbb' with a hex color code for a more custom color.
*
* ---
* 
* <Max Turns: x>
* 
* - Used for: State Notetags
* - Determines the upper limit on the maximum number of turns for this state.
* - Replace 'x' with a number representing the maximum number of turns used
*   for this state.
* - If no notetag is used, refer to the default setting found in the Plugin
*   Parameters under "State Settings".
* 
* ---
*
* <State id Turns: +x>
* <State id Turns: -x>
*
* <Set State id Turns: x>
*
* <State name Turns: +x>
* <State name Turns: -x>
*
* <Set State name Turns: x>
*
* - Used for: Skill, Item Notetags
* - If the target is affected by state 'id' or state 'name', change the state
*   turn duration for target.
* - For 'id' variant, replace 'id' with the ID of the state to modify.
* - For 'name' variant, replace 'name' with the name of the state to modify.
* - Replace 'x' with the value you wish to increase, decrease, or set to.
* - Insert multiples of this notetag to affect multiple states at once.
*
* ---
*
* <param Buff Turns: +x>
* <param Buff Turns: -x>
*
* <Set param Buff Turns: x>
*
* - Used for: Skill, Item Notetags
* - If the target is affected by a 'param' buff, change that buff's turn
*   duration for target.
* - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
*   or 'LUK' to determine which parameter buff to modify.
* - Replace 'x' with the value you wish to increase, decrease, or set to.
* - Insert multiples of this notetag to affect multiple parameters at once.
*
* ---
*
* <param Debuff Turns: +x>
* <param Debuff Turns: -x>
*
* <Set param Debuff Turns: x>
*
* - Used for: Skill, Item Notetags
* - If the target is affected by a 'param' debuff, change that debuff's turn
*   duration for target.
* - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
*   or 'LUK' to determine which parameter debuff to modify.
* - Replace 'x' with the value you wish to increase, decrease, or set to.
* - Insert multiples of this notetag to affect multiple parameters at once.
*
* ---
*
* === JavaScript Notetags: On Add/Erase/Expire ===
*
* Using JavaScript code, you can use create custom effects that occur when a
* state has bee added, erased, or expired.
* 
* ---
*
* <JS On Add State>
*  code
*  code
* </JS On Add State>
*
* - Used for: State Notetags
* - When a state is added, run the code added by this notetag.
* - The 'user' variable refers to the current active battler.
* - The 'target' variable refers to the battler affected by this state.
* - The 'origin' variable refers to the one who applied this state.
* - The 'state' variable refers to the current state being affected.
*
* ---
*
* <JS On Erase State>
*  code
*  code
* </JS On Erase State>
*
* - Used for: State Notetags
* - When a state is erased, run the code added by this notetag.
* - The 'user' variable refers to the current active battler.
* - The 'target' variable refers to the battler affected by this state.
* - The 'origin' variable refers to the one who applied this state.
* - The 'state' variable refers to the current state being affected.
*
* ---
*
* <JS On Expire State>
*  code
*  code
* </JS On Expire State>
*
* - Used for: State Notetags
* - When a state has expired, run the code added by this notetag.
* - The 'user' variable refers to the current active battler.
* - The 'target' variable refers to the battler affected by this state.
* - The 'origin' variable refers to the one who applied this state.
* - The 'state' variable refers to the current state being affected.
*
* ---
*
* === JavaScript Notetags: Slip Damage/Healing ===
*
* Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
* following notetags allow you to perform custom slip damage/healing.
*
* ---
*
* <JS type Slip Damage>
*  code
*  code
*  damage = code;
* </JS type Slip Damage>
*
* - Used for: State Notetags
* - Code used to determine how much slip damage is dealt to the affected unit
*   during each regeneration phase.
* - Replace 'type' with 'HP', 'MP', or 'TP'.
* - Replace 'code' with the calculations on what to determine slip damage.
* - The 'user' variable refers to the origin of the state.
* - The 'target' variable refers to the affected unit receiving the damage.
* - The 'state' variable refers to the current state being affected.
* - The 'damage' variable is the finalized slip damage to be dealt.
* - When these states are applied via action effects, the slip calculations
*   are one time calculations made upon applying and the damage is cached to
*   be used for future on regeneration calculations.
* - For that reason, do not include game mechanics here such as adding states,
*   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
*   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
*   notetags for game mechanics instead.
* - Passive states and states with the <JS Slip Refresh> notetag are exempt
*   from the one time calculation and recalculated each regeneration phase.
*
* ---
*
* <JS type Slip Heal>
*  code
*  code
*  heal = code;
* </JS type Slip Heal>
*
* - Used for: State Notetags
* - Code used to determine how much slip healing is dealt to the affected unit
*   during each regeneration phase.
* - Replace 'type' with 'HP', 'MP', or 'TP'.
* - Replace 'code' with the calculations on what to determine slip healing.
* - The 'user' variable refers to the origin of the state.
* - The 'target' variable refers to the affected unit receiving the healing.
* - The 'state' variable refers to the current state being affected.
* - The 'heal' variable is the finalized slip healing to be recovered.
* - When these states are applied via action effects, the slip calculations
*   are one time calculations made upon applying and the damage is cached to
*   be used for future on regeneration calculations.
* - For that reason, do not include game mechanics here such as adding states,
*   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
*   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
*   notetags for game mechanics instead.
* - Passive states and states with the <JS Slip Refresh> notetag are exempt
*   from the one time calculation and recalculated each regeneration phase.
*
* ---
* 
* <JS Slip Refresh>
* 
* - Used for: State Notetags
* - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
*   start of each regeneration phase to allow for dynamic damage ranges.
* 
* ---
*
* === Passive State Notetags ===
*
* Passive States are states that are always applied to actors and enemies
* provided that their conditions have been met. These can be granted through
* database objects or through the Passive States Plugin Parameters.
* 
* ---
* 
* For those using the code "a.isStateAffected(10)" to check if a target is
* affected by a state or not, this does NOT check passive states. This only
* checks for states that were directly applied to the target.
* 
* This is NOT a bug.
* 
* Instead, use "a.states().includes($dataStates[10])" to check for them. This
* code will search for both directly applied states and passive states alike.
*
* ---
* 
* As passive states are NOT considered directly applied to, they do NOT match
* a Conditional Branch's state check as well. The Conditional Branch effect
* checks for an affected state.
* 
* ---
* 
* Because passive states are NOT directly applied to a battler, the functions
* of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
* passive states either. This means that any of the related JS notetags tied
* to those functions will not occur either.
* 
* ---
* 
* Why are passive states not considered affected by? Let's look at it
* differently. There are two ways to grant skills to actors. They can acquire
* skills by levels/items/events or they can equip gear that temporarily grants
* the skill in question.
* 
* Learning the skill is direct. Temporarily granting the skill is indirect.
* These two factors have mechanical importance and require differentiation.
* 
* Regular states and passive states are the same way. Regular states are
* directly applied, therefore, need to be distinguished in order for things
* like state turns and steps, removal conditionals, and similar to matter at
* all. Passive states are indirect and are therefore, unaffected by state
* turns, steps, and removal conditions. These mechanical differences are
* important for how RPG Maker works.
* 
* ---
* 
* Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
* check if a target has a passive state will return false.
* 
* ---
*
* <Passive State: x>
* <Passive States: x,x,x>
*
* <Passive State: name>
* <Passive States: name, name, name>
*
* - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
* - Adds passive state(s) x to trait object, applying it to related actor or
*   enemy unit(s).
* - Replace 'x' with a number to determine which state to add as a passive.
* - If using 'name' notetag variant, replace 'name' with the name of the
*   state(s) to add as a passive.
* - Note: If you plan on applying a passive state through a skill, it must be
*   through a skill that has been learned by the target and not a skill that
*   is given through a trait.
*
* ---
*
* <Passive Stackable>
*
* - Used for: State Notetags
* - Makes it possible for this passive state to be added multiple times.
* - Otherwise, only one instance of the passive state can be available.
*
* ---
*
* <Passive Condition Class: id>
* <Passive Condition Classes: id, id, id>
*
* <Passive Condition Class: name>
* <Passive Condition Classes: name, name, name>
*
* - Used for: State Notetags
* - Determines the passive condition of the passive state based on the actor's
*   current class. As long as the actor's current class matches one of the
*   data entries, the passive condition is considered passed.
* - For 'id' variant, replace 'id' with a number representing class's ID.
* - For 'name' variant, replace 'name' with the class's name.
*
* ---
*
* <Passive Condition Multiclass: id>
* <Passive Condition Multiclass: id, id, id>
*
* <Passive Condition Multiclass: name>
* <Passive Condition Multiclass: name, name, name>
*
* - Used for: State Notetags
* - Requires VisuMZ_2_ClassChangeSystem!
* - Determines the passive condition of the passive state based on the actor's
*   multiclasses. As long as the actor has any of the matching classes
*   assigned as a multiclass, the passive condition is considered passed.
* - For 'id' variant, replace 'id' with a number representing class's ID.
* - For 'name' variant, replace 'name' with the class's name.
*
* ---
*
* <Passive Condition Switch ON: x>
*
* <Passive Condition All Switches ON: x,x,x>
* <Passive Condition Any Switch ON: x,x,x>
*
* - Used for: State Notetags
* - Determines the passive condition of the passive state based on switches.
* - Replace 'x' with the switch ID to determine the state's passive condition.
* - If 'All' notetag variant is used, conditions will not be met until all
*   switches are ON. Then, it would be met.
* - If 'Any' notetag variant is used, conditions will be met if any of the
*   switches are ON. Otherwise, it would not be met.
*
* ---
*
* <Passive Condition Switch OFF: x>
*
* <Passive Condition All Switches OFF: x,x,x>
* <Passive Condition Any Switch OFF: x,x,x>
*
* - Used for: State Notetags
* - Determines the passive condition of the passive state based on switches.
* - Replace 'x' with the switch ID to determine the state's passive condition.
* - If 'All' notetag variant is used, conditions will not be met until all
*   switches are OFF. Then, it would be met.
* - If 'Any' notetag variant is used, conditions will be met if any of the
*   switches are OFF. Otherwise, it would not be met.
*
* ---
*
* === JavaScript Notetags: Passive State ===
*
* The following is a notetag made for users with JavaScript knowledge to
* determine if a passive state's condition can be met.
*
* ---
*
* <JS Passive Condition>
*  code
*  code
*  condition = code;
* </JS Passive Condition>
*
* - Used for: State Notetags
* - Determines the passive condition of the state based on JavaScript code.
* - Replace 'code' to determine if a passive state's condition has been met.
* - The 'condition' variable returns a boolean (true/false) to determine if
*   the passive state's condition is met or not.
* - The 'user' variable refers to the user affected by the passive state.
* - The 'state' variable refers to the passive state being checked.
* - All other passive conditions must be met for this code to count.
* 
* **NOTE** Not everything can be used as a custom JS Passive Condition due to
* limitations of the code. There are failsafe checks to prevent infinite loops
* and some passive conditions will not register for this reason and the
* conditional checks will behave as if the passive states have NOT been
* applied for this reason. Such examples include the following:
* 
* - A passive state that requires another passive state
* - A passive state that requires a trait effect from another state
* - A passive state that requires a parameter value altered by another state
* - A passive state that requires equipment to be worn but its equipment type
*   access is provided by another state.
* - Anything else that is similar in style.
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
* === Skill Cost Plugin Commands ===
* 
* ---
* 
* Skill Cost: Emulate Actor Pay
* - Target actor(s) emulates paying for skill cost.
* - 
* 
*   Actor ID(s):
*   - Select which Actor ID(s) will pay skill cost.
* 
*   Skill ID:
*   - What is the ID of the skill to emulate paying the skill cost for?
* 
* ---
* 
* Skill Cost: Emulate Enemy Pay
* - Target enemy(s) emulates paying for skill cost.
* - 
* 
*   Enemy Index(es):
*   - Select which enemy index(es) will pay skill cost.
* 
*   Skill ID:
*   - What is the ID of the skill to emulate paying the skill cost for?
* 
* ---
* 
* === State Turns Plugin Commands ===
* 
* ---
* 
* State Turns: Actor State Turns Change By
* - Changes actor(s) state turns by an amount.
* - Only works on states that can have turns.
* 
*   Actor ID(s):
*   - Select which Actor ID(s) to affect.
* 
*   State ID:
*   - What is the ID of the state you wish to change turns for?
*   - Only works on states that can have turns.
* 
*   Change Turns By:
*   - How many turns should the state be changed to?
*   - You may use JavaScript code.
* 
*   Auto-Add State?:
*   - Automatically adds state if actor(s) does not have it applied?
* 
* ---
* 
* State Turns: Actor State Turns Change To
* - Changes actor(s) state turns to a specific value.
* - Only works on states that can have turns.
* 
*   Actor ID(s):
*   - Select which Actor ID(s) to affect.
* 
*   State ID:
*   - What is the ID of the state you wish to change turns for?
*   - Only works on states that can have turns.
* 
*   Change Turns To:
*   - How many turns should the state be changed to?
*   - You may use JavaScript code.
* 
*   Auto-Add State?:
*   - Automatically adds state if actor(s) does not have it applied?
* 
* ---
* 
* State Turns: Enemy State Turns Change By
* - Changes enemy(s) state turns by an amount.
* - Only works on states that can have turns.
* 
*   Enemy Index(es):
*   - Select which enemy index(es) to affect.
* 
*   State ID:
*   - What is the ID of the state you wish to change turns for?
*   - Only works on states that can have turns.
* 
*   Change Turns By:
*   - How many turns should the state be changed to?
*   - You may use JavaScript code.
* 
*   Auto-Add State?:
*   - Automatically adds state if actor(s) does not have it applied?
* 
* ---
* 
* State Turns: Enemy State Turns Change To
* - Changes enemy(s) state turns to a specific value.
* - Only works on states that can have turns.
* 
*   Enemy Index(es):
*   - Select which enemy index(es) to affect.
* 
*   State ID:
*   - What is the ID of the state you wish to change turns for?
*   - Only works on states that can have turns.
* 
*   Change Turns To:
*   - How many turns should the state be changed to?
*   - You may use JavaScript code.
* 
*   Auto-Add State?:
*   - Automatically adds state if actor(s) does not have it applied?
* 
* ---
* 
*
* ============================================================================
* Plugin Parameters: General Skill Settings
* ============================================================================
*
* These Plugin Parameters adjust various aspects of the game regarding skills
* from the custom Skill Menu Layout to global custom effects made in code.
*
* ---
*
* General
* 
*   Use Updated Layout:
*   - Use the Updated Skill Menu Layout provided by this plugin?
*   - This will automatically enable the Status Window.
*   - This will override the Core Engine windows settings.
*
*   Layout Style:
*   - If using an updated layout, how do you want to style the menu scene?
*     - Upper Help, Left Input
*     - Upper Help, Right Input
*     - Lower Help, Left Input
*     - Lower Help, Right Input
*
* ---
*
* Skill Type Window
* 
*   Style:
*   - How do you wish to draw commands in the Skill Type Window?
*   - Text Only: Display only the text.
*   - Icon Only: Display only the icon.
*   - Icon + Text: Display the icon first, then the text.
*   - Auto: Determine which is better to use based on the size of the cell.
* 
*   Text Align:
*   - Text alignment for the Skill Type Window.
* 
*   Window Width:
*   - What is the desired pixel width of this window?
*   - Default: 240
*
* ---
*
* List Window
* 
*   Columns:
*   - Number of maximum columns.
*
* ---
*
* Shop Status Window
* 
*   Show in Skill Menu?:
*   - Show the Shop Status Window in the Skill Menu?
*   - This is enabled if the Updated Layout is on.
* 
*   Adjust List Window?:
*   - Automatically adjust the Skill List Window in the Skill Menu if using
*     the Shop Status Window?
* 
*   Background Type:
*   - Select background type for this window.
*     - 0 - Window
*     - 1 - Dim
*     - 2 - Transparent
* 
*   JS: X, Y, W, H:
*   - Code used to determine the dimensions for this Shop Status Window in the
*     Skill Menu.
*
* ---
*
* Skill Types
* 
*   Hidden Skill Types:
*   - Insert the ID's of the Skill Types you want hidden from view ingame.
* 
*   Hidden During Battle:
*   - Insert the ID's of the Skill Types you want hidden during battle only.
* 
*   Icon: Normal Type:
*   - Icon used for normal skill types that aren't assigned any icons.
*   - To assign icons to skill types, simply insert \I[x] into the
*     skill type's name in the Database > Types tab.
* 
*   Icon: Magic Type:
*   - Icon used for magic skill types that aren't assigned any icons.
*   - To assign icons to skill types, simply insert \I[x] into the
*     skill type's name in the Database > Types tab.
*
* ---
*
* Global JS Effects
* 
*   JS: Skill Conditions:
*   - JavaScript code for a global-wide skill condition check.
*
* ---
*
* ============================================================================
* Plugin Parameters: Skill Cost Types
* ============================================================================
*
* Skill Cost Types are the resources that are used for your skills. These can
* range from the default MP and TP resources to the newly added HP, Gold, and
* Potion resources.
*
* ---
*
* Settings
* 
*   Name:
*   - A name for this Skill Cost Type.
* 
*   Icon:
*   - Icon used for this Skill Cost Type.
*   - Use 0 for no icon.
* 
*   Font Color:
*   - Text Color used to display this cost.
*   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
* 
*   Font Size:
*   - Font size used to display this cost.
*
* ---
*
* Cost Processing
* 
*   JS: Cost Calculation:
*   - Code on how to calculate this resource cost for the skill.
* 
*   JS: Can Pay Cost?:
*   - Code on calculating whether or not the user is able to pay the cost.
* 
*   JS: Paying Cost:
*   - Code for if met, this is the actual process of paying of the cost.
*
* ---
*
* Window Display
* 
*   JS: Show Cost?:
*   - Code for determining if the cost is shown or not.
* 
*   JS: Cost Text:
*   - Code to determine the text (with Text Code support) used for the
*     displayed cost.
*
* ---
*
* Gauge Display
* 
*   JS: Maximum Value:
*   - Code to determine the maximum value used for this Skill Cost resource
*     for gauges.
* 
*   JS: Current Value:
*   - Code to determine the current value used for this Skill Cost resource
*     for gauges.
* 
*   JS: Draw Gauge:
*   - Code to determine how to draw the Skill Cost resource for this 
*     gauge type.
*
* ---
*
* ============================================================================
* Plugin Parameters: Gauge Settings
* ============================================================================
*
* Settings in regards to how skill cost gauges function and appear.
*
* ---
*
* Labels
* 
*   Font Type:
*   - Which font type should be used for labels?
* 
*   Match Label Color:
*   - Match the label color to the Gauge Color being used?
* 
*     Match: Gauge # ?:
*     - Which Gauge Color should be matched?
* 
*     Preset: Gauge Color:
*     - Use #rrggbb for custom colors or regular numbers for text colors from
*       the Window Skin.
* 
*   Solid Outline:
*   - Make the label outline a solid black color?
* 
*   Outline Width:
*   - What width do you wish to use for your outline?
*   - Use 0 to not use an outline.
*
* ---
*
* Values
* 
*   Font Type:
*   - Which font type should be used for values?
* 
*   Solid Outline:
*   - Make the value outline a solid black color?
* 
*   Outline Width:
*   - What width do you wish to use for your outline?
*   - Use 0 to not use an outline.
*
* ---
*
* ============================================================================
* Plugin Parameters: General State Settings
* ============================================================================
*
* These are general settings regarding RPG Maker MZ's state-related aspects
* from how turns are reapplied to custom code that's ran whenever states are
* added, erased, or expired.
*
* ---
*
* General
* 
*   Reapply Rules:
*   - These are the rules when reapplying states.
*   - Ignore: State doesn't get added.
*   - Reset: Turns get reset.
*   - Greater: Turns take greater value (current vs reset).
*   - Add: Turns add upon existing turns.
* 
*   Maximum Turns:
*   - Maximum number of turns to let states go up to.
*   - This can be changed with the <Max Turns: x> notetag.
* 
*   Action End Update:
*   - States with "Action End" auto-removal will also update turns at the end
*     of each action instead of all actions.
* 
*   Turn End on Map:
*   - Update any state and buff turns on the map after this many steps.
*   - Use 0 to disable.
*
* ---
*
* Turn Display
* 
*   Show Turns?:
*   - Display state turns on top of window icons and sprites?
* 
*   Turn Font Size:
*   - Font size used for displaying turns.
* 
*   Offset X:
*   - Offset the X position of the turn display.
* 
*   Offset Y:
*   - Offset the Y position of the turn display.
* 
*   Turn Font Size:
*   - Font size used for displaying turns.
* 
*   Turn Color: Neutral:
*   - Use #rrggbb for custom colors or regular numbers for text colors from
*     the Window Skin.
* 
*   Turn Color: Positive:
*   - Use #rrggbb for custom colors or regular numbers for text colors from
*     the Window Skin.
* 
*   Turn Color: Negative:
*   - Use #rrggbb for custom colors or regular numbers for text colors from
*     the Window Skin.
*
* ---
*
* Data Display
* 
*   Show Data?:
*   - Display state data on top of window icons and sprites?
* 
*   Data Font Size:
*   - Font size used for displaying state data.
* 
*   Offset X:
*   - Offset the X position of the state data display.
* 
*   Offset Y:
*   - Offset the Y position of the state data display.
*
* ---
*
* Global JS Effects
* 
*   JS: On Add State:
*   - JavaScript code for a global-wide custom effect whenever a state
*     is added.
* 
*   JS: On Erase State:
*   - JavaScript code for a global-wide custom effect whenever a state
*     is erased.
* 
*   JS: On Expire State:
*   - JavaScript code for a global-wide custom effect whenever a state
*     has expired.
*
* ---
*
* ============================================================================
* Plugin Parameters: General Buff/Debuff Settings
* ============================================================================
*
* Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
* they do function close enough for them to be added to this plugin for
* adjusting. Change these settings to make buffs and debuffs work to your
* game's needs.
*
* ---
*
* General
* 
*   Reapply Rules:
*   - These are the rules when reapplying buffs/debuffs.
*   - Ignore: Buff/Debuff doesn't get added.
*   - Reset: Turns get reset.
*   - Greater: Turns take greater value (current vs reset).
*   - Add: Turns add upon existing turns.
* 
*   Maximum Turns:
*   - Maximum number of turns to let buffs and debuffs go up to.
*
* ---
*
* Stacking
* 
*   Max Stacks: Buff:
*   - Maximum number of stacks for buffs.
* 
*   Max Stacks: Debuff:
*   - Maximum number of stacks for debuffs.
* 
*   JS: Buff/Debuff Rate:
*   - Code to determine how much buffs and debuffs affect parameters.
*
* ---
*
* Turn Display
* 
*   Show Turns?:
*   - Display buff and debuff turns on top of window icons and sprites?
* 
*   Turn Font Size:
*   - Font size used for displaying turns.
* 
*   Offset X:
*   - Offset the X position of the turn display.
* 
*   Offset Y:
*   - Offset the Y position of the turn display.
* 
*   Turn Color: Buffs:
*   - Use #rrggbb for custom colors or regular numbers for text colors from
*     the Window Skin.
* 
*   Turn Color: Debuffs:
*   - Use #rrggbb for custom colors or regular numbers for text colors from
*     the Window Skin.
*
* ---
*
* Rate Display
* 
*   Show Rate?:
*   - Display buff and debuff rate on top of window icons and sprites?
* 
*   Rate Font Size:
*   - Font size used for displaying rate.
* 
*   Offset X:
*   - Offset the X position of the rate display.
* 
*   Offset Y:
*   - Offset the Y position of the rate display.
*
* ---
*
* Global JS Effects
* 
*   JS: On Add Buff:
*   - JavaScript code for a global-wide custom effect whenever a
*     buff is added.
* 
*   JS: On Add Debuff:
*   - JavaScript code for a global-wide custom effect whenever a
*     debuff is added.
* 
*   JS: On Erase Buff:
*   - JavaScript code for a global-wide custom effect whenever a
*     buff is added.
* 
*   JS: On Erase Debuff:
*   - JavaScript code for a global-wide custom effect whenever a
*     debuff is added.
* 
*   JS: On Expire Buff:
*   - JavaScript code for a global-wide custom effect whenever a
*     buff is added.
* 
*   JS: On Expire Debuff:
*   - JavaScript code for a global-wide custom effect whenever a
*     debuff is added.
*
* ---
*
* ============================================================================
* Plugin Parameters: Passive State Settings
* ============================================================================
*
* These Plugin Parameters adjust passive states that can affect all actors and
* enemies as well as have global conditions.
* 
* ---
* 
* For those using the code "a.isStateAffected(10)" to check if a target is
* affected by a state or not, this does NOT check passive states. This only
* checks for states that were directly applied to the target.
* 
* This is NOT a bug.
* 
* Instead, use "a.states().includes($dataStates[10])" to check for them. This
* code will search for both directly applied states and passive states alike.
*
* ---
* 
* As passive states are NOT considered directly applied to, they do NOT match
* a Conditional Branch's state check as well. The Conditional Branch effect
* checks for an affected state.
* 
* ---
* 
* Because passive states are NOT directly applied to a battler, the functions
* of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
* passive states either. This means that any of the related JS notetags tied
* to those functions will not occur either.
* 
* ---
* 
* Why are passive states not considered affected by? Let's look at it
* differently. There are two ways to grant skills to actors. They can acquire
* skills by levels/items/events or they can equip gear that temporarily grants
* the skill in question.
* 
* Learning the skill is direct. Temporarily granting the skill is indirect.
* These two factors have mechanical importance and require differentiation.
* 
* Regular states and passive states are the same way. Regular states are
* directly applied, therefore, need to be distinguished in order for things
* like state turns and steps, removal conditionals, and similar to matter at
* all. Passive states are indirect and are therefore, unaffected by state
* turns, steps, and removal conditions. These mechanical differences are
* important for how RPG Maker works.
* 
* ---
* 
* Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
* check if a target has a passive state will return false.
* 
* ---
*
* List
* 
*   Global Passives:
*   - A list of passive states to affect actors and enemies.
* 
*   Actor-Only Passives:
*   - A list of passive states to affect actors only.
* 
*   Enemy Passives:
*   - A list of passive states to affect enemies only.
*
* ---
* 
* Cache
* 
*   Switch Refresh?:
*   - Refresh all battle members when switches are changed in battle?
*   - This is primarily used for passive state conditions involve parameters
*     that do not update due to cached data until a refresh occurs.
*   - If this is on, do not spam Switch changes during battle in order to
*     prevent lag spikes.
* 
*   Variable Refresh?:
*   - Refresh all battle members when variables are changed in battle?
*   - This is primarily used for passive state conditions involve parameters
*     that do not update due to cached data until a refresh occurs.
*   - If this is on, do not spam Variable changes during battle in order to
*     prevent lag spikes.
* 
* ---
*
* Global JS Effects
* 
*   JS: Condition Check:
*   - JavaScript code for a global-wide passive condition check.
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
* - Yanfly
* - Arisu
* - Olivia
* - Irina
*
* ============================================================================
* Changelog
* ============================================================================
* 
* Version 1.45: May 16, 2024
* * Bug Fixes!
* ** Fixed a problem with passive state conditional notetags not working
*    properly. Fix made by Irina.
* 
* Version 1.44: April 18, 2024
* * Bug Fixes!
* ** Fixed a bug where passive states would not appear. Fix made by Olivia.
* ** Fixed a bug where a crash would occur if certain plugins cleared the
*    passive state cache midway through trying to register it. Fix by Olivia.
* * Optimization Update!
* ** Plugin should run more optimized.
* ** States with lots and lots of text data within their notes will no longer
*    cause FPS drops.
* 
* Version 1.43: January 18, 2024
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Commands added by Arisu!
* *** Skill Cost: Emulate Actor Pay
* *** Skill Cost: Emulate Enemy Pay
* **** Target actor(s)/enemy(s) emulates paying for skill cost.
* *** State Turns: Actor State Turns Change By
* *** State Turns: Actor State Turns Change To
* *** State Turns: Enemy State Turns Change By
* *** State Turns: Enemy State Turns Change To
* **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
* **** Only works on states that can have turns.
* 
* Version 1.42: November 16, 2023
* * Bug Fixes!
* ** 'origin' variable was not working properly for <JS On Expire State>
*    JavaScript notetag. Should now be working properly. Fix made by Irina.
* 
* Version 1.41: September 14, 2023
* * Bug Fixes!
* ** Fixed a bug that prevented <Max Turns: x> for states from working due to
*    one of the recent updates. Fix made by Arisu.
* * Compatibility Update!
* ** Added compatibility functionality for future plugins.
* * Documentation Update!
* ** Apparently, we never put <Max Turns: x> in the help notetag section.
*    Woops... It's there now.
* 
* Version 1.40: August 17, 2023
* * Bug Fixes!
* ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
*    Parameters when involving consumable items.
* *** If you want to acquire these settings for an already-existing project,
*     do either of the following:
* **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
*      list and install the newest version.
* **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
*      then copy over the "Item Cost" plugin parameters found in the "Skill
*      Cost Types" plugin parameter settings to your current project.
* 
* Version 1.39: July 13, 2023
* * Feature Update!
* ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
*    no longer consume items that are key items or nonconsumable.
* *** If you want to acquire these settings for an already-existing project,
*     do either of the following:
* **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
*      list and install the newest version.
* **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
*      then copy over the "Item Cost" plugin parameters found in the "Skill
*      Cost Types" plugin parameter settings to your current project.
* 
* Version 1.38: March 16, 2023
* * Documentation Update!
* ** Help file updated for new features.
* ** Added segment to <Replace x Gauge: type> in documentation:
* *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
* * New Features!
* ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
* *** <Item Cost: x name>
* *** <Weapon Cost: x name>
* *** <Armor Cost: x name>
* **** The skill will consume items, weapons, and/or armors in order to be
*      used. Even non-consumable items will be consumed.
* *** <Item Cost Max/Min: x name>
* *** <Weapon Cost Max/Min: x name>
* *** <Armor Cost Max/Min: x name>
* **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
* *** <Item Cost: x% name>
* *** <Weapon Cost: x% name>
* *** <Armor Cost: x% name>
* **** Alters cost rate of skills that would consume item, weapon, or armor.
* *** <Item Cost: +/-x name>
* *** <Weapon Cost: +/-x name>
* *** <Armor Cost: +/-x name>
* **** Alters flat costs of skills that would consume item, weapon, or armor.
* *** <Replace Item name1 Cost: name2>
* *** <Replace Weapon name1 Cost: name2>
* *** <Replace Armor name1 Cost: name2>
* **** Replaces item, weapon, or armor to be consumed for another type.
* *** Projects with the Skills and States Core already installed will not have
*     this update, but you can copy over the settings from a new project with
*     the following steps:
* **** Create a new project. Install Skills and States Core. Open up the new
*      project's 'Skill Cost Types'.
* **** Right click the 'Item Cost' option(s) and click copy.
* **** Go to the target project's Skills and States Core's 'Skill Cost Types'
*      plugin parameter. Paste the command where you want it to go.
* **** Only 'Item Cost' is needed as it encompasses all three types for item,
*      weapon, and armor costs.
* 
* Version 1.38: February 16, 2023
* * Compatibility Update!
* ** Added compatibility functionality for future plugins.
* 
* Version 1.37: January 20, 2023
* * Bug Fixes!
* ** Fixed a bug that caused equipment to unequip if the needed equipment
*    traits came from passive states upon learning new skills. Fix by Irina.
* 
* Version 1.36: December 15, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** When enemies are defeated with their entire party having a state with the
*    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
*    before when they wouldn't. Update made by Irina.
* * New Features!
* ** New Plugin Parameter added by Irina!
* *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
* **** What is the desired pixel width of this window? Default: 240
* 
* Verison 1.35: October 13, 2022
* * Feature Update!
* ** Default values for Passive States > Cache > Switch Refresh? and Variable
*    Refresh? are now set to "false" in order to prevent sudden lag spikes for
*    those who are unfamiliar with how this setting works.
* ** Update made by Irina.
* 
* Version 1.34: September 29, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameters added by Irina and sponsored by AndyL:
* *** Plugin Parameters > Gauge Settings
* **** These settings allow you to make minor tweaks to how the gauges look
*      ranging from the color used for the labels to the outline types used
*      for the values.
* 
* Version 1.33: August 11, 2022
* * Bug Fixes!
* ** Fixed a crash that occurs when performing a custom action sequence
*    without a skill attached to it. Fix made by Olivia.
* 
* Version 1.32: June 16, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * New Features!
* ** New Plugin Parameters added by Arisu:
* *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
* *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
* **** Refresh all battle members when switches/variables are changed in
*      battle?
* **** This is primarily used for passive state conditions involve parameters
*      that do not update due to cached data until a refresh occurs.
* **** If this is on, do not spam Switch/Variable changes during battle in
*      order to prevent lag spikes.
* 
* Version 1.31: April 28, 2022
* * Bug Fixes!
* ** Custom Slip Damage JS is now totalled correctly into regular slip damage
*    totals for damage popups. Fix made by Olivia.
* 
* Version 1.30: April 14, 2022
* * Feature Update!
* ** Changed the state data removal timing to be after JS notetag effects
*    take place in order for data such as origin data to remain intact. Update
*    made by Irina.
* 
* Version 1.29: March 31, 2022
* * Bug Fixes!
* ** Fixed an error with <State x Category Remove: y> not countaing correctly
*    unless the state count matched the exact amount. The notetag effect
*    should work properly now. Fix made by Olivia.
* 
* Version 1.28: March 10, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** <State x Category Remove: All> updated to allow multiple cases in a
*    single notebox. Updated by Arisu.
* * New Features!
* ** New Notetag added by Arisu and sponsored by Archeia!
* *** <Remove Other x States>
* **** When the state with this notetag is added, remove other 'x' category
*      states from the battler (except for the state being added).
* **** Useful for thing state types like stances and forms that there is
*      usually only one active at a time.
* 
* Version 1.27: January 27, 2022
* * Bug Fixes!
* ** Custom JS Slip Damage/Healing values should now be recalculated on
*    demand. Fix made by Olivia.
* 
* Version 1.26: January 20, 2022
* * Documentation Update!
* ** Help file updated for new features.
* * Feature Update!
* ** Conditional Passive Bypass check is now stronger to prevent even more
*    infinite loops from happening. Update made by Olivia.
* * New Features!
* ** New Plugin Parameter added by Olivia:
* *** Plugin Parameters > State Settings > General > Turn End on Map
* **** Update any state and buff turns on the map after this many steps.
* **** Use 0 to disable.
* 
* Version 1.25: November 11, 2021
* * Bug Fixes!
* ** Hidden skill notetags should no longer crash upon not detecting actors
*    for learned skills. Fix made by Olivia.
* 
* Version 1.24: November 4, 2021
* * Documentation Update!
* ** Added section: "Slip Damage Popup Clarification"
* *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
*     the grand total of all the states and effects combined regardless of the
*     number of states and effects on a battler. This is how it is in vanilla
*     RPG Maker MZ and this is how we intend for it to be with the VisuStella
*     MZ library.
* *** This is NOT a bug!
* *** The reason we are not changing this is because it does not properly
*     relay information to the player accurately. When multiple popups appear,
*     players only have roughly a second and a half to calculate it all for
*     any form of information takeaway. We feel it is better suited for the
*     player's overall convenience to show a cummulative change and steer the
*     experience towards a more positive one.
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.23: September 17, 2021
* * Compatibility Update!
* ** RPG Maker MZ 1.3.3 compatibility.
* *** Updated how gauges are drawn.
* *** Skill Cost Types Plugin Parameters need to be updated for those who want
*     the updated gauges. This can be done easily with the following steps:
* **** Step 1: Create a new project.
* **** Step 2: Install Skills and States Core version 1.23 into it.
* **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
* **** Step 4: Return back to your original project.
* **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
* 
* Version 1.22: August 6, 2021
* * Documentation Update!
* ** "Action End Removal for States" under Major Updates is changed to:
* *** If your Plugin Parameter settings for "Action End Update" are enabled,
*     then "Action End" has been updated so that it actually applies per
*     action used instead of just being at the start of a battler's action
*     set.
* *** However, there are side effects to this: if a state has the "Cannot
*     Move" restriction along with the "Action End" removal timing, then
*     unsurprisingly, the state will never wear off because it's now based on
*     actual actions ending. To offset this and remove confusion, "Action End"
*     auto-removal timings for states with "Cannot Move" restrictions will be
*     turned into "Turn End" auto-removal timings while the "Action End
*     Update" is enabled.
* *** This automatic change won't make it behave like an "Action End" removal
*     timing would, but it's better than completely softlocking a battler.
* * Feature Update!
* ** Those using "Cannot Move" states with "Action End" auto-removal will now
*    have be automatically converted into "Turn End" auto-removal if the
*    plugin parameter "Action End Update" is set to true. Update by Irina.
* 
* Version 1.21: July 30, 2021
* * Documentation Update!
* ** Expanded "Action End Removal for States" section in Major Changes.
* *** These changes have been in effect since Version 1.07 but have not been
*     explained in excess detail in the documentation since.
* **** Action End has been updated so that it actually applies per action used
*      instead of just being at the start of a battler's action set. However,
*      there are side effects to this: if a state has the "Cannot Move"
*      restriction along with the "Action End" removal timing, then
*      unsurprisingly, the state will never wear off because it's now based on
*      actual actions ending. There are two solutions to this:
* **** Don't make "Cannot Move" restriction states with "Action End". This is
*      not a workaround. This is how the state removal is intended to work
*      under the new change.
* **** Go to the Skills & States Core Plugin Parameters, go to State
*      Setttings, look for "Action End Update", and set it to false. You now
*      reverted the removal timing system back to how it originally was in RPG
*      Maker MZ's default battle system where it only updates based on an
*      action set rather than per actual action ending.
* 
* Version 1.20: June 18, 2021
* * Feature Update!
* ** Updated automatic caching for conditional passive states to update more
*    efficiently. Update made by Arisu.
* 
* Version 1.19: June 4, 2021
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.18: May 21, 2021
* * Documentation Update
* ** Added "Passive State Clarification" section.
* *** As there is a lot of confusion regarding how passive states work and how
*     people still miss the explanations found in the "Passive State Notetags"
*     section AND the "Plugin Parameters: Passive State Settings", we are
*     adding a third section to explain how they work.
* *** All three sections will contain the full detailed explanation of how
*     passive states work to clear common misconceptions about them.
* 
* Version 1.17: May 7, 2021
* * Bug Fixes
* ** State category removal is now usable outside of battle. Fix by Irina.
* 
* Version 1.16: April 30, 2021
* * Bug Fixes!
* ** When states with step removal have the <No Recover All Clear> or
*    <No Death Clear> notetags, their step counter is no longer reset either.
*    Fix made by Irina.
* * New Features!
* ** New notetag added by Arisu!
* *** <List Name: name>
* **** Makes the name of the skill appear different when show in the skill
*      list. Using \V[x] as a part of the name will display that variable.
* 
* Version 1.15: March 19, 2021
* * Compatibility Update
* ** Added compatibility functionality for future plugins.
* 
* Version 1.14: March 12, 2021
* * Bug Fixes!
* ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
* * Documentation Update!
* ** For the <JS Passive Condition>, we've added documentation on the
*    limitations of passive conditions since they have been reported as bug
*    reports, when in reality, they are failsafes to prevent infinite loops.
*    Such limitations include the following:
* *** A passive state that requires another passive state
* *** A passive state that requires a trait effect from another state
* *** A passive state that requires a parameter value altered by another state
* *** A passive state that requires equipment to be worn but its equipment
*     type access is provided by another state.
* *** Anything else that is similar in style.
* 
* Version 1.13: February 26, 2021
* * Documentation Update!
* ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
*    following notes:
* *** When these states are applied via action effects, the slip calculations
*     are one time calculations made upon applying and the damage is cached to
*     be used for future on regeneration calculations.
* *** For that reason, do not include game mechanics here such as adding
*     states, buffs, debuffs, etc. as this notetag is meant for calculations
*     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
*     <JS Post-Regenerate> notetags for game mechanics instead.
* *** Passive states and states with the <JS Slip Refresh> notetag are exempt
*     from the one time calculation and recalculated each regeneration phase.
* * Feature Update!
* ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
*    extra clarity. Update made by Olivia.
* 
* Version 1.12: February 19, 2021
* * Feature Update
* ** Changed the way passive state infinite stacking as a blanket coverage.
*    Update made by Olivia.
* 
* Version 1.11: February 12, 2021
* * Bug Fixes!
* ** Added a check to prevent passive states from infinitely stacking. Fix
*    made by Olivia.
* 
* Version 1.10: January 15, 2021
* * Documentation Update!
* ** Help file updated for new features.
* * New Feature!
* ** New Plugin Parameters added
* *** Plugin Parameters > Skill Settings > Background Type
* 
* Version 1.09: January 1, 2021
* * Bug Fixes!
* ** Custom JS TP slip damage and healing should now work properly.
*    Fix made by Yanfly.
* 
* Version 1.08: December 25, 2020
* * Bug Fixes!
* ** <JS On Add State> should no longer trigger multiple times for the death
*    state. Fix made by Yanfly.
* * Documentation Update!
* ** Added documentation for updated feature(s)!
* * Feature Update!
* ** <No Death Clear> can now allow the affected state to be added to an
*    already dead battler. Update made by Yanfly.
* 
* Version 1.07: December 18, 2020
* * Documentation Update!
* ** Added documentation for new feature(s)!
* * New Features!
* ** New notetags added by Yanfly:
* *** <Passive Condition Multiclass: id>
* *** <Passive Condition Multiclass: id, id, id>
* *** <Passive Condition Multiclass: name>
* *** <Passive Condition Multiclass: name, name, name>
* ** New Plugin Parameter added by Yanfly.
* *** Plugin Parameters > States > General > Action End Update
* **** States with "Action End" auto-removal will also update turns at the end
*      of each action instead of all actions.
* ***** Turn this off if you wish for state turn updates to function like they
*       do by default for "Action End".
* 
* Version 1.06: December 4, 2020
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.05: November 15, 2020
* * Bug Fixes!
* ** The alignment of the Skill Type Window is now fixed and will reflect upon
*    the default settings. Fix made by Yanfly.
* * Documentation Update!
* ** Added documentation for new feature(s)!
* * New Features!
* ** <State x Category Remove: All> notetag added by Yanfly.
* * Optimization Update!
* ** Plugin should run more optimized.
* 
* Version 1.04: September 27, 2020
* * Documentation Update
* ** "Use Updated Layout" plugin parameters now have the added clause:
*    "This will override the Core Engine windows settings." to reduce
*    confusion. Added by Irina.
* 
* Version 1.03: September 13, 2020
* * Bug Fixes!
* ** <JS type Slip Damage> custom notetags now work for passive states. Fix
*    made by Olivia.
* ** Setting the Command Window style to "Text Only" will no longer add in
*    the icon text codes. Bug fixed by Yanfly.
* 
* Version 1.02: August 30, 2020
* * Bug Fixes!
* ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
*    by Yanfly.
* * Documentation Update!
* ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
*    the following added to their descriptions:
* *** This does not apply to skills added by traits on actors, classes, any
*     equipment, or states. These are not considered learned skills. They are
*     considered temporary skills.
* * New Features!
* ** Notetags added by Yanfly:
* *** <Show if has Skill: x>
* *** <Show if have All Skills: x,x,x>
* *** <Show if have Any Skills: x,x,x>
* *** <Show if has Skill: name>
* *** <Show if have All Skills: name, name, name>
* *** <Show if have Any Skills: name, name, name>
* *** <Hide if has Skill: x>
* *** <Hide if have All Skills: x,x,x>
* *** <Hide if have Any Skills: x,x,x>
* *** <Hide if has Skill: name>
* *** <Hide if have All Skills: name, name, name>
* *** <Hide if have Any Skills: name, name, name>
* *** These have been added to remove the confusion regarding learned skills
*     as skills added through trait effects are not considered learned skills
*     by RPG Maker MZ.
* 
* Version 1.01: August 23, 2020
* * Bug Fixes!
* ** Passive states from Elements & Status Menu Core are now functional.
*    Fix made by Olivia.
* * Compatibility Update
* ** Extended functions to allow for better compatibility.
* * Updated documentation
* ** Explains that passive states are not directly applied and are therefore
*    not affected by code such as "a.isStateAffected(10)".
* ** Instead, use "a.states().includes($dataStates[10])"
* ** "Use #rrggbb for a hex color." lines now replaced with
*    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
* @command SkillActorPaySkillCost
* @text Skill Cost: Emulate Actor Pay
* @desc Target actor(s) emulates paying for skill cost.
*
* @arg ActorIDs:arraynum
* @text Actor ID(s)
* @type actor[]
* @desc Select which Actor ID(s) will pay skill cost.
* @default ["1"]
*
* @arg SkillID:num
* @text Skill ID
* @type skill
* @desc What is the ID of the skill to emulate paying the skill cost for?
* @default 99
*
* @ --------------------------------------------------------------------------
*
* @command SkillEnemyPaySkillCost
* @text Skill Cost: Emulate Enemy Pay
* @desc Target enemy(s) emulates paying for skill cost.
*
* @arg EnemyIndex:arraynum
* @text Enemy Index(es)
* @type actr[]
* @desc Select which enemy index(es) will pay skill cost.
* @default ["1"]
*
* @arg SkillID:num
* @text Skill ID
* @type skill
* @desc What is the ID of the skill to emulate paying the skill cost for?
* @default 99
*
* @ --------------------------------------------------------------------------
*
* @command Separator_StateTurns
* @text -
* @desc -
*
* @ --------------------------------------------------------------------------
*
* @command StateTurnsActorChangeBy
* @text State Turns: Actor State Turns Change By
* @desc Changes actor(s) state turns by an amount.
* Only works on states that can have turns.
*
* @arg ActorIDs:arraynum
* @text Actor ID(s)
* @type actor[]
* @desc Select which Actor ID(s) to affect.
* @default ["1"]
*
* @arg StateID:num
* @text State ID
* @type state
* @desc What is the ID of the state you wish to change turns for?
* Only works on states that can have turns.
* @default 5
*
* @arg Turns:eval
* @text Change Turns By
* @desc How many turns should the state be changed to?
* You may use JavaScript code.
* @default +1
*
* @arg AutoAddState:eval
* @text Auto-Add State?
* @type boolean
* @on Auto-Add
* @off Don't Add
* @desc Automatically adds state if actor(s) does not have it applied?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command StateTurnsActorChangeTo
* @text State Turns: Actor State Turns Change To
* @desc Changes actor(s) state turns to a specific value.
* Only works on states that can have turns.
*
* @arg ActorIDs:arraynum
* @text Actor ID(s)
* @type actor[]
* @desc Select which Actor ID(s) to affect.
* @default ["1"]
*
* @arg StateID:num
* @text State ID
* @type state
* @desc What is the ID of the state you wish to change turns for?
* Only works on states that can have turns.
* @default 5
*
* @arg Turns:eval
* @text Change Turns To
* @desc How many turns should the state be changed to?
* You may use JavaScript code.
* @default 10
*
* @arg AutoAddState:eval
* @text Auto-Add State?
* @type boolean
* @on Auto-Add
* @off Don't Add
* @desc Automatically adds state if actor(s) does not have it applied?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command StateTurnsEnemyChangeBy
* @text State Turns: Enemy State Turns Change By
* @desc Changes enemy(s) state turns by an amount.
* Only works on states that can have turns.
*
* @arg EnemyIndex:arraynum
* @text Enemy Index(es)
* @type actr[]
* @desc Select which enemy index(es) to affect.
* @default ["1"]
*
* @arg StateID:num
* @text State ID
* @type state
* @desc What is the ID of the state you wish to change turns for?
* Only works on states that can have turns.
* @default 5
*
* @arg Turns:eval
* @text Change Turns By
* @desc How many turns should the state be changed to?
* You may use JavaScript code.
* @default +1
*
* @arg AutoAddState:eval
* @text Auto-Add State?
* @type boolean
* @on Auto-Add
* @off Don't Add
* @desc Automatically adds state if enemy(s) does not have it applied?
* @default true
*
* @ --------------------------------------------------------------------------
*
* @command StateTurnsEnemyChangeTo
* @text State Turns: Enemy State Turns Change To
* @desc Changes enemy(s) state turns to a specific value.
* Only works on states that can have turns.
*
* @arg EnemyIndex:arraynum
* @text Enemy Index(es)
* @type actr[]
* @desc Select which enemy index(es) to affect.
* @default ["1"]
*
* @arg StateID:num
* @text State ID
* @type state
* @desc What is the ID of the state you wish to change turns for?
* Only works on states that can have turns.
* @default 5
*
* @arg Turns:eval
* @text Change Turns To
* @desc How many turns should the state be changed to?
* You may use JavaScript code.
* @default 10
*
* @arg AutoAddState:eval
* @text Auto-Add State?
* @type boolean
* @on Auto-Add
* @off Don't Add
* @desc Automatically adds state if enemy(s) does not have it applied?
* @default true
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
* @param SkillsStatesCore
* @default Plugin Parameters
*
* @param ATTENTION
* @default READ THE HELP FILE
*
* @param BreakSettings
* @text --------------------------
* @default ----------------------------------
*
* @param Skills:struct
* @text 技能设置
* @type struct<Skills>
* @desc 在这里调整通用技能设置。
* @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
*
* @param Costs:arraystruct
* @text 技能消耗类型
* @parent Skills:struct
* @type struct<Cost>[]
* @desc 此插件添加的所有技能消耗类型列表
* 以及控制它们的游戏内代码。
* @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
*
* @param Gauge:struct
* @text 计量条设置
* @parent Skills:struct
* @type struct<Gauge>
* @desc 有关技能消耗计量条的功能和外观的设置。
* @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
*
* @param BreakSkills
* @text --------------------------
* @default ----------------------------------
*
* @param States:struct
* @text 状态设置
* @type struct<States>
* @desc 在此调整常规状态设置。
* @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
*
* @param Buffs:struct
* @text 增益/减益设置
* @parent States:struct
* @type struct<Buffs>
* @desc 在这里调整常规增益/减益设置。
* @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
*
* @param PassiveStates:struct
* @text 被动状态
* @parent States:struct
* @type struct<PassiveStates>
* @desc 在这里调整被动状态设置。
* @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
*
* @param BreakEnd1
* @text --------------------------
* @default ----------------------------------
*
* @param End Of
* @default Plugin Parameters
*
* @param BreakEnd2
* @text --------------------------
* @default ----------------------------------
*
*/
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
* @param EnableLayout:eval
* @text 使用更新的布局
* @parent General
* @type boolean
* @on 使用
* @off 不使用
* @desc 是否使用此插件提供的更新技能菜单布局？
* 这将覆盖核心引擎的窗口设置。
* @default true
*
* @param LayoutStyle:str
* @text 布局样式
* @parent General
* @type select
* @option 上方帮助，左侧输入
* @value upper/left
* @option 上方帮助，右侧输入
* @value upper/right
* @option 下方帮助，左侧输入
* @value lower/left
* @option 下方帮助，右侧输入
* @value lower/right
* @desc 如果使用更新的布局，如何设置菜单场景布局样式？
* @default upper/left
*
* @param SkillTypeWindow
* @text 技能类型窗口
*
* @param CmdStyle:str
* @text 样式
* @parent SkillTypeWindow
* @type select
* @option 仅文本
* @value text
* @option 仅图标
* @value icon
* @option 图标+文本
* @value iconText
* @option 自动
* @value auto
* @desc 在技能类型窗口中如何绘制命令？
* @default auto
*
* @param CmdTextAlign:str
* @text 文本对齐
* @parent SkillTypeWindow
* @type combo
* @option 左对齐
* @value left
* @option 居中对齐
* @value center
* @option 右对齐
* @value right
* @desc 技能类型窗口的文本对齐方式。
* @default left
* 
* @param CmdWidth:num
* @text 窗口宽度
* @parent SkillTypeWindow
* @type number
* @min 1
* @desc 此窗口的期望像素宽度是多少？
* 默认：240
* @default 240
*
* @param ListWindow
* @text 列表窗口
*
* @param ListWindowCols:num
* @text 列数
* @parent ListWindow
* @type number
* @min 1
* @desc 最大列数。
* @default 1
*
* @param ShopStatusWindow
* @text 商店状态窗口
*
* @param ShowShopStatus:eval
* @text 在技能菜单中显示？
* @parent ShopStatusWindow
* @type boolean
* @on 显示
* @off 不显示
* @desc 是否在技能菜单中显示商店状态窗口？
* 如果启用了更新布局，则启用此功能。
* @default true
*
* @param SkillSceneAdjustSkillList:eval
* @text 调整列表窗口？
* @parent ShopStatusWindow
* @type boolean
* @on 调整
* @off 不调整
* @desc 如果使用商店状态窗口，是否自动调整技能菜单中的技能列表窗口？
* @default true
*
* @param SkillSceneStatusBgType:num
* @text 背景类型
* @parent ShopStatusWindow
* @type select
* @option 0 - 窗口
* @value 0
* @option 1 - 昏暗
* @value 1
* @option 2 - 透明
* @value 2
* @desc 选择此窗口的背景类型。
* @default 0
*
* @param SkillMenuStatusRect:func
* @text JS: X, Y, W, H
* @parent ShopStatusWindow
* @type note
* @desc 用于确定技能菜单中商店状态窗口尺寸的代码。
* @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
*
* @param SkillTypes
* @text 技能类型
*
* @param HiddenSkillTypes:arraynum
* @text 隐藏技能类型
* @parent SkillTypes
* @type number[]
* @min 1
* @max 99
* @desc 输入你想要在游戏中隐藏的技能类型ID。
* @default []
*
* @param BattleHiddenSkillTypes:arraynum
* @text 战斗中隐藏
* @parent SkillTypes
* @type number[]
* @min 1
* @max 99
* @desc 输入你想要仅在战斗中隐藏的技能类型ID。
* @default []
*
* @param IconStypeNorm:num
* @text 图标：普通类型
* @parent SkillTypes
* @desc 未分配任何图标的普通技能类型使用的图标。
* @default 78
*
* @param IconStypeMagic:num
* @text 图标：魔法类型
* @parent SkillTypes
* @desc 未分配任何图标的魔法技能类型使用的图标。
* @default 79
*
* @param CustomJS
* @text 全局JS效果
*
* @param SkillConditionJS:func
* @text JS: 技能条件
* @parent CustomJS
* @type note
* @desc 用于全局技能条件检查的JavaScript代码。
* @default "// 声明变量\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// 执行检查\n\n\n// 返回布尔值\nreturn enabled;"

/* ----------------------------------------------------------------------------
 * 技能消耗设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text 名称
 * @desc 这个技能消耗类型的名称。
 * @default 未命名
 *
 * @param Settings
 *
 * @param Icon:num
 * @text 图标
 * @parent Settings
 * @desc 此技能消耗类型使用的图标。
 * 使用 0 表示无图标。
 * @default 0
 *
 * @param FontColor:str
 * @text 字体颜色
 * @parent Settings
 * @desc 显示此消耗时使用的文本颜色。
 * 对于十六进制颜色，请使用 #rrggbb 格式，需 VisuMZ_1_MessageCore 插件支持。
 * @default 0
 *
 * @param FontSize:num
 * @text 字体大小
 * @parent Settings
 * @type number
 * @min 1
 * @desc 显示此消耗时使用的字体大小。
 * @default 22
 *
 * @param Cost
 * @text 消耗处理
 *
 * @param CalcJS:func
 * @text JS: 消耗计算
 * @parent Cost
 * @type note
 * @desc 计算此技能消耗资源的代码。
 * @default "// 声明变量\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// 返回消耗值\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: 能支付消耗吗？
 * @parent Cost
 * @type note
 * @desc 计算用户是否能够支付消耗的代码。
 * @default "// 声明变量\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// 返回布尔值\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: 支付消耗
 * @parent Cost
 * @type note
 * @desc 当满足条件时，实际支付消耗的代码。
 * @default "// 声明变量\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// 执行支付\n"
 *
 * @param Windows
 * @text 窗口显示
 *
 * @param ShowJS:func
 * @text JS: 显示消耗？
 * @parent  Windows
 * @type note
 * @desc 决定是否显示消耗的代码。
 * @default "// 声明变量\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// 返回布尔值\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: 消耗文本
 * @parent  Windows
 * @type note
 * @desc 用于决定显示消耗的文本（支持文本代码）的代码。
 * @default "// 声明变量\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// 文本：更改字体大小\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// 文本：添加颜色\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// 文本：添加消耗\ntext += '%1 %2'.format(cost, name);\n\n// 文本：添加图标\nif (icon > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// 返回文本\nreturn text;"
 *
 * @param Gauges
 * @text 计量条显示
 *
 * @param GaugeMaxJS:func
 * @text JS: 最大值
 * @parent  Gauges
 * @type note
 * @desc 用于确定此技能消耗资源的计量条最大值的代码。
 * @default "// 声明变量\nconst user = this;\n\n// 返回值\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: 当前值
 * @parent  Gauges
 * @type note
 * @desc 用于确定此技能消耗资源的计量条当前值的代码。
 * @default "// 声明变量\nconst user = this;\n\n// 返回值\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: 绘制计量条
 * @parent  Gauges
 * @type note
 * @desc 用于决定如何绘制此计量条类型的技能消耗资源的代码。
 * @default "// 声明变量\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// 绘制计量条\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// 绘制标签\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// 绘制值\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */

/* ----------------------------------------------------------------------------
 * 计量条设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text 标签字体类型
 * @parent Labels
 * @type select
 * @option 主要
 * @option 数字
 * @desc 用于标签的字体类型是哪种？
 * @default 主要
 *
 * @param MatchLabelColor:eval
 * @text 匹配标签颜色
 * @parent Labels
 * @type boolean
 * @on 匹配
 * @off 预设
 * @desc 将标签颜色与使用的计量条颜色匹配？
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text 匹配：计量条 #？
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc 应匹配哪种计量条颜色？
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text 预设：计量条颜色
 * @parent MatchLabelColor:eval
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text 实线轮廓
 * @parent Labels
 * @type boolean
 * @on 实线
 * @off 半透明
 * @desc 让标签轮廓成为实线黑色？
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text 轮廓宽度
 * @parent Labels
 * @type number
 * @min 0
 * @desc 您希望使用的轮廓宽度是多少？使用 0 表示不使用轮廓。
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text 字体类型
 * @parent Values
 * @type select
 * @option 主要
 * @option 数字
 * @desc 用于数值的字体类型是哪种？
 * @default 数字
 *
 * @param ValueOutlineSolid:eval
 * @text 实线轮廓
 * @parent Values
 * @type boolean
 * @on 实线
 * @off 半透明
 * @desc 让数值轮廓成为实线黑色？
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text 轮廓宽度
 * @parent Values
 * @type number
 * @min 0
 * @desc 您希望使用的轮廓宽度是多少？使用 0 表示不使用轮廓。
 * @default 3
 *
 */

/* ----------------------------------------------------------------------------
 * 常规状态设置
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text 重新应用规则
 * @parent General
 * @type select
 * @option 忽略：状态不被添加。
 * @value ignore
 * @option 重置：回合数重置。
 * @value reset
 * @option 更大：采用较大值（当前与重置）。
 * @value greater
 * @option 添加：回合数添加到现有回合数。
 * @value add
 * @desc 当重新应用状态时的规则。
 * @default greater
 *
 * @param MaxTurns:num
 * @text 最大回合数
 * @parent General
 * @type number
 * @min 1
 * @desc 状态可以持续的最大回合数。
 * 可以使用 <Max Turns: x> 标签进行更改。
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text 动作结束更新
 * @parent General
 * @type boolean
 * @on 每次动作更新
 * @off 不更改
 * @desc “动作结束”自动移除的状态也会在每次动作结束时更新回合数，而不是所有动作结束时。
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text 地图上的回合结束
 * @parent General
 * @type number
 * @desc 在地图上行走多少步后更新任何状态和增益的回合数。使用 0 禁用。
 * @default 20
 *
 * @param Turns
 * @text 回合显示
 *
 * @param ShowTurns:eval
 * @text 显示回合？
 * @parent Turns
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在窗口图标和精灵顶部显示状态回合数？
 * @default true
 *
 * @param TurnFontSize:num
 * @text 回合字体大小
 * @parent Turns
 * @type number
 * @min 1
 * @desc 用于显示回合数的字体大小。
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text X偏移量
 * @parent Turns
 * @desc 调整回合显示的X位置。
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Y偏移量
 * @parent Turns
 * @desc 调整回合显示的Y位置。
 * @default -6
 *
 * @param ColorNeutral:str
 * @text 回合颜色：中性
 * @parent Turns
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 0
 *
 * @param ColorPositive:str
 * @text 回合颜色：正数
 * @parent Turns
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 24
 *
 * @param ColorNegative:str
 * @text 回合颜色：负数
 * @parent Turns
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 27
 *
 * @param Data
 * @text 数据显示
 *
 * @param ShowData:eval
 * @text 显示数据？
 * @parent Data
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在窗口图标和精灵顶部显示状态数据？
 * @default true
 *
 * @param DataFontSize:num
 * @text 数据字体大小
 * @parent Data
 * @type number
 * @min 1
 * @desc 用于显示状态数据的字体大小。
 * @default 12
 *
 * @param DataOffsetX:num
 * @text X偏移量
 * @parent Data
 * @desc 调整状态数据显示的X位置。
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Y偏移量
 * @parent Data
 * @desc 调整状态数据显示的Y位置。
 * @default 8
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param onAddStateJS:func
 * @text JS：添加状态时
 * @parent CustomJS
 * @type note
 * @desc 当添加状态时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onEraseStateJS:func
 * @text JS：删除状态时
 * @parent CustomJS
 * @type note
 * @desc 当删除状态时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onExpireStateJS:func
 * @text JS：状态到期时
 * @parent CustomJS
 * @type note
 * @desc 当状态到期时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 */

/* ----------------------------------------------------------------------------
 * 常规增益/减益设置
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text 重新应用规则
 * @parent General
 * @type select
 * @option 忽略：增益/减益不被添加。
 * @value ignore
 * @option 重置：回合数重置。
 * @value reset
 * @option 更大：采用较大值（当前与重置）。
 * @value greater
 * @option 添加：回合数添加到现有回合数。
 * @value add
 * @desc 当重新应用增益/减益时的规则。
 * @default greater
 *
 * @param MaxTurns:num
 * @text 最大回合数
 * @parent General
 * @type number
 * @min 1
 * @desc 增益和减益可以持续的最大回合数。
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text 最大叠加层数：增益
 * @parent Stacking
 * @type number
 * @min 1
 * @desc 增益的最大叠加层数。
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text 最大叠加层数：减益
 * @parent Stacking
 * @type number
 * @min 1
 * @desc 减益的最大叠加层数。
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS：增益/减益比率
 * @parent Stacking
 * @type note
 * @desc 决定增益和减益对参数影响的代码。
 * @default "// 声明变量\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// 执行计算\nrate += buffLevel * 0.25;\n\n// 返回比率\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text 回合显示
 *
 * @param ShowTurns:eval
 * @text 显示回合？
 * @parent Turns
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在窗口图标和精灵顶部显示增益和减益的回合数？
 * @default true
 *
 * @param TurnFontSize:num
 * @text 回合字体大小
 * @parent Turns
 * @type number
 * @min 1
 * @desc 用于显示回合数的字体大小。
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text X偏移量
 * @parent Turns
 * @desc 调整回合显示的X位置。
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Y偏移量
 * @parent Turns
 * @desc 调整回合显示的Y位置。
 * @default -6
 *
 * @param ColorBuff:str
 * @text 回合颜色：增益
 * @parent Turns
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 24
 *
 * @param ColorDebuff:str
 * @text 回合颜色：减益
 * @parent Turns
 * @desc 使用 #rrggbb 自定义颜色或从窗口皮肤中选择文本颜色的常规数字。
 * @default 27
 *
 * @param Data
 * @text 比率显示
 *
 * @param ShowData:eval
 * @text 显示比率？
 * @parent Data
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 在窗口图标和精灵顶部显示增益和减益的比率？
 * @default false
 *
 * @param DataFontSize:num
 * @text 比率字体大小
 * @parent Data
 * @type number
 * @min 1
 * @desc 用于显示比率的字体大小。
 * @default 12
 *
 * @param DataOffsetX:num
 * @text X偏移量
 * @parent Data
 * @desc 调整比率显示的X位置。
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Y偏移量
 * @parent Data
 * @desc 调整比率显示的Y位置。
 * @default 8
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param onAddBuffJS:func
 * @text JS：添加增益时
 * @parent CustomJS
 * @type note
 * @desc 当添加增益时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onAddDebuffJS:func
 * @text JS：添加减益时
 * @parent CustomJS
 * @type note
 * @desc 当添加减益时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onEraseBuffJS:func
 * @text JS：删除增益时
 * @parent CustomJS
 * @type note
 * @desc 当删除增益时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS：删除减益时
 * @parent CustomJS
 * @type note
 * @desc 当删除减益时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onExpireBuffJS:func
 * @text JS：增益到期时
 * @parent CustomJS
 * @type note
 * @desc 当增益到期时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS：减益到期时
 * @parent CustomJS
 * @type note
 * @desc 当减益到期时的全局自定义效果的JavaScript代码。
 * @default "// 声明变量\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// 执行动作\n"
 *
 */

/* ----------------------------------------------------------------------------
 * 被动状态设置
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text 全局被动状态
 * @parent List
 * @type state[]
 * @desc 影响角色和敌人的被动状态列表。
 * @default []
 *
 * @param Actor:arraynum
 * @text 仅角色被动状态
 * @parent List
 * @type state[]
 * @desc 仅影响角色的被动状态列表。
 * @default []
 *
 * @param Enemy:arraynum
 * @text 仅敌人被动状态
 * @parent List
 * @type state[]
 * @desc 仅影响敌人的被动状态列表。
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text 开关刷新？
 * @parent Cache
 * @type boolean
 * @on 刷新
 * @off 无更改
 * @desc 战斗中开关变化时是否刷新所有战斗成员？
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text 变量刷新？
 * @parent Cache
 * @type boolean
 * @on 刷新
 * @off 无更改
 * @desc 战斗中变量变化时是否刷新所有战斗成员？
 * @default false
 *
 * @param CustomJS
 * @text 全局JS效果
 *
 * @param PassiveConditionJS:func
 * @text JS：条件检查
 * @parent CustomJS
 * @type note
 * @desc 全局被动状态条件检查的JavaScript代码。
 * @default "// 声明变量\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// 执行检查\n\n\n// 返回布尔值\nreturn condition;"
 *
 */

//=============================================================================

function _0x3350() { const _0xb6738a = ['getStateOrigin', 'removeOtherStatesOfSameCategory', 'onExpireBuffJS', 'buffTurns', 'onEraseStateCustomJS', 'Game_Battler_addState', '_phase', 'commandStyle', 'addChild', '_shopStatusWindow', 'boxWidth', 'getStateOriginByKey', '<actor-%1>', 'Game_Troop_setup', 'log', 'WMuZZ', 'onChange', 'traitsSet', 'vHOrV', 'MatchLabelGaugeColor', '_states', 'isSkillUsableForAutoBattle', 'EnableLayout', 'SkillsStatesCore', 'dPfsC', 'GFxmy', 'parse', 'cMPfI', 'redraw', 'buff', 'GaugeDrawJS', 'onExpireBuffGlobalJS', 'VFJVc', 'pAzOn', 'statusWindowRect', 'colSpacing', 'rxiDc', 'setStateRetainType', '%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.', 'setupSkillsStatesCore', '_stateMaxTurns', 'RefreshCacheVar', 'gaugeRate', 'stateEraseJS', 'pgOVO', 'LBToX', 'currentValue', '_buffTurns', 'greater', '_skills', 'learnSkill', 'iIiOi', 'onExpireStateGlobalJS', 'createSkillCostText', 'Game_BattlerBase_buffIconIndex', 'Game_BattlerBase_eraseState', 'Game_BattlerBase_resetStateCounts', 'includesSkillsStatesCore', 'isPartyAllAffectedByGroupDefeatStates', '8093160BIEqYR', 'totalStateCategoryAffected', 'meetsPassiveStateConditions', 'StgQI', 'Sprite_Gauge_setup', 'DataOffsetX', 'lTUGH', 'wMUHG', 'fontFace', 'Window_SkillList_updateHelp', 'stypeId', 'call', 'drawExtendedParameter', 'createPassiveStatesCache', 'onAddBuffGlobalJS', 'MZhuI', 'vLSNO', 'trim', 'isCommandEnabled', 'initialize', 'eraseState', 'applyBuffTurnManipulationEffects', 'skillTypeWindowRect', 'itemAt', 'onExpireState', 'drawItem', 'itemLineRect', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'stateAddJS', 'isAllDead', 'PayJS', 'getSkillTypes', 'clear', 'passiveStates', '2968856btktvA', 'skillMpCost', 'LabelFontMainType', 'YHSRG', 'MArMH', 'calcWindowHeight', 'Parse_Notetags_Skill_JS', 'isStateRemoved', 'slipMp', 'Scene_Boot_onDatabaseLoaded', 'getStateData', 'SkillConditionJS', 'width', 'enemy', 'ActionEndUpdate', 'Scene_Skill_statusWindowRect', 'fjdHq', 'helpWindowRect', 'PsKgO', 'sPBvt', 'DjJzt', 'nKrjy', 'setStateOrigin', 'numberFontFace', 'isStateAddable', 'eyGTF', 'BattleHiddenSkillTypes', 'Actor', 'untitled', 'shift', 'drawIcon', 'getStypeIdWithName', '_stateTurns', 'xvpyx', 'onAddStateJS', '_commandNameWindow', 'convertTargetToStateOriginKey', 'addPassiveStatesByNotetag', 'aliveMembers', 'Game_BattlerBase_meetsSkillConditions', 'NZFdc', 'buttonAssistSwitch', 'statesByCategory', 'gainHp', '%1\x20%2\x20%3', 'AbFkt', 'ValueFontMainType', 'onEraseBuffJS', '_colorCache', 'pcOFU', 'NZfCj', 'iuNQq', 'hUIAT', 'max', 'sort', 'statePassiveConditionJS', 'LUK', '_stypeIDs', 'textColor', 'LMDrd', 'initMembers', 'retrieveStateColor', 'restriction', 'canClearState', 'windowPadding', 'SbUjr', 'Sprite_StateIcon_loadBitmap', 'SkillActorPaySkillCost', '_stored_state-%1-color', 'GFAPE', 'drawItemStyleIcon', 'GaugeMaxJS', 'onAddDebuff', 'CalcJS', 'ColorNegative', 'AeMZm', 'recoverAll', 'uGsgo', 'isStateCategoryAffected', 'shopStatusWindowRect', 'addStateTurns', 'dzgey', 'isBuffOrDebuffAffected', 'LayoutStyle', 'Game_Battler_addBuff', 'zrixc', 'bitmap', 'sfade', '6904640oWNxRi', 'WehwA', 'uiOxg', 'Hdpqg', 'ReapplyRules', '_scene', 'slipHp', 'makeResistedStateCategories', 'jcEAb', 'totalStateCategory', 'hasState', '_result', 'jaANq', 'Window_SkillList_includes', 'drawSkillCost', 'stateExpireJS', 'toLowerCase', '_passiveStateResults', 'isPassiveStateStackable', 'vgEBd', 'aucEi', 'members', 'Scene_Skill_createItemWindow', 'qLwMj', 'stateTurns', 'mainCommandWidth', 'Enemy', 'stateMaximumTurns', 'setBuffTurns', 'addState', 'itemWindowRect', 'checkSkillConditionsNotetags', '2376018YuDLio', 'ignore', 'Game_Battler_addDebuff', 'iconHeight', 'Game_BattlerBase_refresh', 'onExpireStateCustomJS', 'allSwitchOn', 'shopStatusWindowRectSkillsStatesCore', '_cache_getPassiveStateConditionSwitchData', 'addCommand', 'setStateData', 'gainSilentTp', 'actions', 'Armor-%1-%2', 'addBuff', 'stateHpSlipHealJS', '_costSettings', 'Global', 'Window_SkillList_setActor', 'process_VisuMZ_SkillsStatesCore_State_Notetags', 'IflQe', '_stored_buffColor', 'XnuXm', 'createCommandNameWindow', 'Game_BattlerBase_decreaseBuff', 'removeStatesAuto', 'MatchLabelColor', 'NLrmm', 'addPassiveStatesByPluginParameters', 'Game_Battler_onBattleEnd', 'heal', 'increaseBuff', 'magicSkills', 'LabelOutlineWidth', 'Zccll', 'Sprite_StateIcon_updateFrame', 'isSkillHidden', 'ColorBuff', 'wNFFj', 'TurnOffsetX', 'VRzes', '_subject', 'auto', 'AbnGn', 'EnemyIndex', 'inBattle', 'iwIqd', 'lLxsp', 'setStypeId', 'meetsSkillConditionsGlobalJS', 'pbOMK', 'fontBold', 'CheckVisibleBattleNotetags', 'drawTextEx', '_cache_getPassiveStateConditionClassesData', 'round', 'SkillSceneAdjustSkillList', 'ShowData', 'concat', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20', '_lastStatesActionEndFrameCount', 'onAddBuffJS', 'hCiWz', 'commandName', 'description', 'tobMW', 'zeRTZ', 'onAddStateCustomJS', 'GLaxD', 'drawActorIcons', '_actor', '<enemy-%1>', 'RMIPd', 'ARRAYNUM', 'convertGaugeTypeSkillsStatesCore', 'drawText', 'Parse_Notetags_State_PassiveJS', 'setDebuffTurns', 'stateColor', 'StackDebuffMax', 'currentValueSkillsStatesCore', 'currentMaxValue', 'valueFontFace', 'length', 'makeCommandList', 'ITWod', 'ColorPositive', 'PusZk', 'NLFwU', 'mainAreaHeight', 'buffLength', '1258516ehpdhf', 'CoreEngine', 'prototype', '_hidden', 'createItemWindow', 'lineHeight', 'setup', 'CpgRt', 'MAT', 'zObvO', 'add', 'kNGLa', 'buffColor', 'getStateRetainType', 'NEGATIVE', 'getColor', '_battler', 'stateId', 'uiMenuStyle', 'KmVbE', 'EqOFK', 'CanPayJS', 'FUNC', 'action', 'oOUVP', 'testSkillStatesCoreNotetags', 'OYLZX', 'nIjUE', 'die', 'Skill-%1-%2', '_itemWindow', '_turnDisplaySprite', 'test', 'DbxWJ', '_checkingPassiveStates', 'setStateTurns', 'pyssx', 'SkillMenuStatusRect', 'isBuffAffected', 'Window_SkillList_maxCols', 'TduuF', '_stored_debuffColor', 'Kavwd', 'allowCreateShopStatusWindow', 'mvHGQ', 'MAXMP', 'nuxfm', 'dQiUC', 'valueFontSize', 'StackBuffMax', 'cVdQJ', 'ParseStateNotetags', 'brbuW', 'Parse_Notetags_Skill_Cost', 'stateTpSlipHealJS', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20', 'labelOutlineWidth', 'Sprite_Gauge_currentValue', 'SkillEnemyPaySkillCost', 'VjTEk', 'buttonAssistText1', 'labelFontSize', 'createShopStatusWindow', 'itemWindowRectSkillsStatesCore', 'vfDTS', 'valueOutlineColor', 'isBottomHelpMode', 'Game_BattlerBase_skillMpCost', 'seFbv', 'onEraseBuff', 'SkillID', 'VisuMZ_1_ElementStatusCore', 'clearStateData', 'Window_StatusBase_drawActorIcons', 'passiveStateObjects', 'stateData', 'DisplayedParams', 'IbQKA', 'version', 'fillRect', 'Game_Unit_deadMembers', 'Game_BattlerBase_increaseBuff', 'rGyAR', 'process_VisuMZ_SkillsStatesCore_Notetags', 'UJJYM', 'stateHpSlipDamageJS', 'DEF', 'stateMpSlipDamageJS', 'maxSlipDamage', 'createTurnDisplaySprite', 'clamp', 'Game_BattlerBase_initMembers', 'GOnjM', 'remove', 'CheckVisibleSkillNotetags', 'idoRy', '_currentActor', 'redrawSkillsStatesCore', 'meetsSkillConditionsEnableJS', 'helpWindowRectSkillsStatesCore', 'CheckIncompatibleStates', 'includes', 'addPassiveStatesFromOtherPlugins', 'OEIvm', 'yASpU', 'makeSuccess', 'getPassiveStateConditionClassesData', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20', 'ggtBh', 'center', 'skillCostSeparator', 'checkSkillConditionsSwitchNotetags', 'anchor', 'split', 'multiclasses', 'setActor', 'resetTextColor', 'DnaZn', 'fOBqE', 'xujjh', 'loadBitmap', 'updateHelp', 'GQFXZ', 'DrGcC', 'useDigitGrouping', 'AXONq', 'updateCommandNameWindow', 'NNkyk', 'changeOutlineColor', 'value', 'Game_BattlerBase_recoverAll', 'onEraseDebuffGlobalJS', 'createKeyJS', 'placeGauge', 'JGMlO', 'valueOutlineWidth', '_animationIndex', 'MAXHP', 'Game_BattlerBase_isStateResist', 'checkCacheKey', 'labelColor', '_currentTroopUniqueID', '_tempBattler', 'categories', 'skillTypes', 'VisuMZ_1_ItemsEquipsCore', '_categoryWindow', 'TurnOffsetY', 'AFTRj', 'isDebuffAffected', 'createAllSkillCostText', 'hCDvw', 'FOrFA', 'isStateAffected', 'amWsh', 'Game_Actor_forgetSkill', 'onRegenerateCustomStateDamageOverTime', 'hirPt', '_checkingVisuMzPassiveStateObjects', 'MowCo', 'iconWidth', 'name', 'isUseSkillsStatesCoreUpdatedLayout', 'rgba(0,\x200,\x200,\x201)', 'tHRDN', 'autoRemovalTiming', 'gaugeBackColor', 'addPassiveStates', 'damage', 'drawParamText', 'Game_Variables_onChange', 'setStatusWindow', 'icon', '_stypeId', '\x5cI[%1]%2', 'OmbUs', 'Parse_Notetags_State_SlipEffectJS', 'ewRpr', 'slipTp', 'updateVisibility', 'removeBuff', 'RAXlA', 'onDatabaseLoaded', 'applyDebuffTurnManipulationEffects', 'isMaxDebuffAffected', 'debuffTurns', 'note', 'Game_BattlerBase_skillTpCost', 'helpAreaTop', '_tempActor', 'BdnHx', 'paramValueByName', 'eakHs', 'isBuffExpired', 'mpDamage', 'index', 'MDF', 'Game_Switches_onChange', 'ALL', 'getCurrentStateOriginKey', 'format', 'SkillSceneStatusBgType', 'yVtsC', 'stateCategoriesResisted', 'aACdM', 'changeTextColor', 'user', '_cache_getPassiveStatesFromObj', 'statusWindowRectSkillsStatesCore', 'map', 'Yewwl', 'VisuMZ_2_ClassChangeSystem', 'hpDamage', 'traitObjects', 'YxUnj', '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20', 'ARRAYFUNC', 'buffIconIndex', 'allSwitchOff', 'callUpdateHelp', 'mpCost', '_skillIDs', 'setPassiveStateSlipDamageJS', 'ActorIDs', 'rgba(0,\x200,\x200,\x200)', 'overwriteBuffTurns', 'isRightInputMode', 'multiClass', 'removeStatesByCategoryAll', 'getCurrentTroopUniqueID', 'ParseSkillNotetags', 'Parse_Notetags_State_Category', 'Name', 'makeCurrentTroopUniqueID', 'prepareResetStateCounts', '_checkingTraitsSetSkillsStatesCore', 'mQgwB', 'Param', 'itemTextAlign', 'VisuMZ_0_CoreEngine', 'drawFullGauge', 'StateTurnsActorChangeBy', 'ARRAYJSON', 'Zdyev', 'updateTurnDisplaySprite', 'Game_Actor_learnSkill', 'endAction', 'ValueOutlineWidth', 'replace', 'skillEnableJS', 'skillTpCost', '_statusWindow', '_classIDs', 'onAddDebuffGlobalJS', 'isSkillTypeMatchForUse', 'resetStateCounts', 'regenerateAll', 'IYPhq', 'Game_BattlerBase_states', 'krJPy', 'usableSkills', 'ShowTurns', 'parameters', 'RlPDj', '_stateOrigin', 'Scene_Skill_helpWindowRect', 'uwHWC', '_cache', 'actor', 'BRZOn', 'priority', 'addWindow', 'ColorNeutral', '_stateSteps', 'WZnrm', 'XKqKr', 'QMSGW', 'clearStateRetainType', 'TextJS', 'onAddState', 'ListWindowCols', '5LdLvVd', 'skillId', 'isActor', 'keys', 'resetFontSettings', 'reset', 'meetsPassiveStateGlobalConditionJS', 'vuLgU', 'updatedLayoutStyle', 'futwN', 'anySwitchOff', 'Game_BattlerBase_overwriteBuffTurns', 'forgetSkill', 'stepsForTurn', 'Lcqbj', 'commandStyleCheck', 'drawActorIconsAllTurnCounters', 'onEraseBuffGlobalJS', 'StateTurnsActorChangeTo', 'fIaSY', 'placeExactGauge', '<member-%1>', 'Game_Action_applyItemUserEffect', 'Costs', 'PresetLabelGaugeColor', 'drawActorBuffRates', 'recover\x20all', 'allBattleMembers', 'right', 'enemyId', 'meetsStateCondition', 'RefreshCacheSwitch', 'active', 'makeAdditionalSkillCostText', 'POjDp', 'HdxJz', 'oWruu', 'Gauge', 'isUseModernControls', 'gNumG', 'floor', 'ZYMFu', 'uiInputPosition', 'DataOffsetY', 'addDebuffTurns', 'kfjSj', 'hasSkill', 'Settings', 'isLearnedSkill', 'Window_SkillType_initialize', 'rSiMP', 'ARRAYSTR', 'canPaySkillCost', 'BuzLF', 'indexOf', 'onExpireStateJS', 'Window_SkillStatus_refresh', 'alterSkillName', 'item', 'gaugeLineHeight', 'vbJay', 'clearAllStateOrigins', 'success', 'Scene_Skill_skillTypeWindowRect', 'nehDC', 'testApply', 'refresh', 'setBackgroundType', 'slice', 'opacity', 'removeState', 'onAddDebuffJS', 'applySkillsStatesCoreEffects', 'paySkillCost', 'debuffColor', 'meetsPassiveStateConditionSwitches', 'UXMHa', 'Game_BattlerBase_die', 'orrvx', 'push', 'commandNameWindowDrawBackground', 'nxyqi', 'IrADV', 'drawActorStateData', 'States', 'height', 'tCokm', '_stateRetainType', 'text', '3625524LBLjHy', 'MgHKE', 'gRxKx', 'number', 'recalculateSlipDamageJS', 'ceil', 'onAddStateGlobalJS', 'IconStypeMagic', 'GdLRc', 'frameCount', 'nVTsC', 'onEraseStateJS', 'tRMFG', 'skills', 'ParseClassIDs', 'mYhHu', 'clearStateDisplay', 'OEwKe', 'getColorDataFromPluginParameters', 'cCkmg', '331402gtxZwr', 'skillTypeWindowRectSkillsStatesCore', 'PQjLT', 'wLZHC', '_stateData', 'EVAL', 'Parse_Notetags_State_ApplyRemoveLeaveJS', 'filter', 'decreaseBuff', 'onExpireDebuffGlobalJS', 'onExpireBuff', 'toUpperCase', 'checkShowHideJS', 'Game_BattlerBase_traitsSet', 'onEraseStateGlobalJS', 'scrollTo', 'clearStatesWithStateRetain', 'AGI', 'groupDefeat', 'getSkillIdWithName', 'gtzsl', 'stateMpSlipHealJS', 'contents', '_skillTypeWindow', 'deadMembers', 'Window_StatusBase_placeGauge', 'clearStates', 'applyStateTurnManipulationEffects', 'GroupDigits', 'Game_Actor_skillTypes', '%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.', 'sDktG', 'Game_Battler_isStateAddable', 'isMaxBuffAffected', 'skillVisibleJS', 'StateID', 'tNBel', 'updateStatesActionEnd', 'stateTpSlipDamageJS', 'ZznUK', 'isPlaytest', 'checkSkillTypeMatch', 'skill', 'shopStatusWidth', 'vTcAR', 'onRemoveState', 'constructor', 'ROfCz', 'mainFontSize', 'regenerateAllSkillsStatesCore', 'NUM', 'IGmui', 'isStateResist', 'Sprite_Gauge_initMembers', 'onAddStateMakeCustomSlipValues', 'tpCost', 'gaugeColor2', 'currentClass', 'StateTurnsEnemyChangeBy', 'PassiveConditionJS', 'ATK', 'bGwpZ', 'outlineColor', 'Game_BattlerBase_clearStates', 'Turns', 'PassiveStates', 'PcMXt', 'normalColor', 'updateFrame', 'eraseBuff', 'helpAreaHeight', 'drawActorBuffTurns', 'commandNameWindowCenter', 'MRNro', 'getStateReapplyRulings', 'iconIndex', 'AutoAddState', 'HFFVG', '_buffs', 'Sprite_Gauge_currentMaxValue', 'canUse', 'IQZNs', 'JMbzX', '_stateDisplay', 'registerCommand', 'pynBz', 'initMembersSkillsStatesCore', 'fontSize', 'hide', 'exit', 'maxCols', 'Enemy-%1-%2', 'iconText', 'Buffs', 'getCurrentStateActiveUser', 'getStateDisplay', '%1%', 'nqNGL', 'Game_Unit_isAllDead', 'NEfwE', 'isGroupDefeatStateAffected', 'passiveStateIDs', '8ecWmWn', 'mainFontFace', 'meetsSkillConditions', 'meetsPassiveStateConditionClasses', 'AJQYX', 'isSkillCostShown', 'drawItemStyleIconText', 'TurnFontSize', 'MultiplierJS', 'dLQPf', 'ConvertParams', 'Class-%1-%2', 'meetsPassiveStateConditionJS', 'naIzB', 'getStateIdWithName', 'hasStateCategory', 'death', 'commandNameWindowDrawText', 'drawActorStateTurns', 'dmiwY', 'uiHelpPosition', 'process_VisuMZ_SkillsStatesCore_Skill_Notetags', 'status', 'states', 'Sprite_Gauge_redraw', 'PAJHu', '<troop-%1>', 'addDebuff', 'kFsQd', 'isStateCategoryResisted', 'state', 'applyStateCategoryRemovalEffects', 'setItem', '_stateIDs', 'ParseAllNotetags', 'gaugeColor1', 'Game_Action_testApply', 'convertPassiveStates', 'CheckVisibleSwitchNotetags', 'getPassiveStateConditionSwitchData', 'addBuffTurns', 'CmdWidth', 'textSizeEx', '#%1', 'LWRUJ', 'isStateExpired', 'vUgZP', 'removeStatesByCategory', 'adjustSkillCost', 'onExpireDebuff', 'anySwitchOn', 'BnlKK', 'DataFontSize', 'Skills', 'onAddBuff', 'drawExtendedSkillsStatesCoreStatus', 'Weapon-%1-%2', 'maxItems', 'match', 'addPassiveStatesTraitSets', 'lOJyH', 'makeCommandName', 'onEraseDebuff', 'igAPC', 'innerWidth', 'getClassIdWithName', 'OKcuf', 'ARRAYSTRUCT', 'BattleManager_endAction', 'MaxTurns', 'paramBuffRate']; _0x3350 = function () { return _0xb6738a; }; return _0x3350(); } function _0x43aa(_0x2fd0d9, _0x30fba3) { const _0x335063 = _0x3350(); return _0x43aa = function (_0x43aa2c, _0x1d33ea) { _0x43aa2c = _0x43aa2c - 0x1b4; let _0x40f6d0 = _0x335063[_0x43aa2c]; return _0x40f6d0; }, _0x43aa(_0x2fd0d9, _0x30fba3); } const _0x183653 = _0x43aa; (function (_0x554fe8, _0x31a4fe) { const _0x56d5fb = _0x43aa, _0x1fc607 = _0x554fe8(); while (!![]) { try { const _0x2252b7 = -parseInt(_0x56d5fb(0x327)) / 0x1 * (-parseInt(_0x56d5fb(0x38d)) / 0x2) + -parseInt(_0x56d5fb(0x4a9)) / 0x3 + -parseInt(_0x56d5fb(0x431)) / 0x4 * (-parseInt(_0x56d5fb(0x2ba)) / 0x5) + -parseInt(_0x56d5fb(0x313)) / 0x6 + parseInt(_0x56d5fb(0x504)) / 0x7 + parseInt(_0x56d5fb(0x489)) / 0x8 + -parseInt(_0x56d5fb(0x40f)) / 0x9; if (_0x2252b7 === _0x31a4fe) break; else _0x1fc607['push'](_0x1fc607['shift']()); } catch (_0x31d957) { _0x1fc607['push'](_0x1fc607['shift']()); } } }(_0x3350, 0xc7056)); var label = 'SkillsStatesCore', tier = tier || 0x0, dependencies = [], pluginData = $plugins[_0x183653(0x32e)](function (_0x493a59) { const _0x33fbcc = _0x183653; return _0x493a59[_0x33fbcc(0x3a3)] && _0x493a59[_0x33fbcc(0x4e9)][_0x33fbcc(0x206)]('[' + label + ']'); })[0x0]; VisuMZ[label][_0x183653(0x2e9)] = VisuMZ[label][_0x183653(0x2e9)] || {}, VisuMZ[_0x183653(0x397)] = function (_0x2ef1f9, _0x5ae6ed) { const _0x27753c = _0x183653; for (const _0x45ad2a in _0x5ae6ed) { if (_0x45ad2a['match'](/(.*):(.*)/i)) { if (_0x27753c(0x273) !== _0x27753c(0x273)) return _0x2e49ae[_0x29b35f['id']][_0x27753c(0x41a)](this, _0x2a03a1); else { const _0x3b3671 = String(RegExp['$1']), _0x3ea90c = String(RegExp['$2'])[_0x27753c(0x332)]()[_0x27753c(0x420)](); let _0x2d0d4a, _0xc2fdfc, _0x394b09; switch (_0x3ea90c) { case _0x27753c(0x359): _0x2d0d4a = _0x5ae6ed[_0x45ad2a] !== '' ? Number(_0x5ae6ed[_0x45ad2a]) : 0x0; break; case _0x27753c(0x4f2): _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON['parse'](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0x36d702 => Number(_0x36d702)); break; case _0x27753c(0x32c): _0x2d0d4a = _0x5ae6ed[_0x45ad2a] !== '' ? eval(_0x5ae6ed[_0x45ad2a]) : null; break; case 'ARRAYEVAL': _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0x551ff2 => eval(_0x551ff2)); break; case 'JSON': _0x2d0d4a = _0x5ae6ed[_0x45ad2a] !== '' ? JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a]) : ''; break; case _0x27753c(0x293): _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0x4f7717 => JSON[_0x27753c(0x3ee)](_0x4f7717)); break; case _0x27753c(0x1b7): _0x2d0d4a = _0x5ae6ed[_0x45ad2a] !== '' ? new Function(JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a])) : new Function('return\x200'); break; case _0x27753c(0x279): _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON['parse'](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0xe71589 => new Function(JSON[_0x27753c(0x3ee)](_0xe71589))); break; case 'STR': _0x2d0d4a = _0x5ae6ed[_0x45ad2a] !== '' ? String(_0x5ae6ed[_0x45ad2a]) : ''; break; case _0x27753c(0x2ed): _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0xae127e => String(_0xae127e)); break; case 'STRUCT': _0x394b09 = _0x5ae6ed[_0x45ad2a] !== '' ? JSON['parse'](_0x5ae6ed[_0x45ad2a]) : {}, _0x2ef1f9[_0x3b3671] = {}, VisuMZ['ConvertParams'](_0x2ef1f9[_0x3b3671], _0x394b09); continue; case _0x27753c(0x3d0): _0xc2fdfc = _0x5ae6ed[_0x45ad2a] !== '' ? JSON[_0x27753c(0x3ee)](_0x5ae6ed[_0x45ad2a]) : [], _0x2d0d4a = _0xc2fdfc[_0x27753c(0x272)](_0x3ab568 => VisuMZ[_0x27753c(0x397)]({}, JSON['parse'](_0x3ab568))); break; default: continue; }_0x2ef1f9[_0x3b3671] = _0x2d0d4a; } } } return _0x2ef1f9; }, (_0x187690 => { const _0x29568d = _0x183653, _0x24f6b5 = _0x187690['name']; for (const _0x25816d of dependencies) { if (!Imported[_0x25816d]) { alert(_0x29568d(0x3fa)[_0x29568d(0x269)](_0x24f6b5, _0x25816d)), SceneManager[_0x29568d(0x380)](); break; } } const _0x4cfef1 = _0x187690[_0x29568d(0x4e9)]; if (_0x4cfef1[_0x29568d(0x3c7)](/\[Version[ ](.*?)\]/i)) { const _0x5ea457 = Number(RegExp['$1']); _0x5ea457 !== VisuMZ[label][_0x29568d(0x1ef)] && (alert(_0x29568d(0x345)['format'](_0x24f6b5, _0x5ea457)), SceneManager[_0x29568d(0x380)]()); } if (_0x4cfef1[_0x29568d(0x3c7)](/\[Tier[ ](\d+)\]/i)) { if ('XRPEF' === 'YDlUs') { if (this[_0x29568d(0x25e)] || this[_0x29568d(0x22f)]) return; try { _0x25a99c[_0x29568d(0x3eb)][_0x29568d(0x2e9)][_0x29568d(0x30e)][_0x29568d(0x453)]['call'](this, _0x3c5fe8); } catch (_0x3c1535) { if (_0xe64cc7[_0x29568d(0x34f)]()) _0x438d87['log'](_0x3c1535); } } else { const _0x65b04a = Number(RegExp['$1']); if (_0x65b04a < tier) alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x24f6b5, _0x65b04a, tier)), SceneManager[_0x29568d(0x380)](); else { if (_0x29568d(0x41f) !== _0x29568d(0x41f)) { const _0x9cbca8 = _0x4487a6(_0x2b40aa['$1']), _0x549abc = _0x2010e5[_0x29568d(0x269)](_0x9cbca8); _0x23b7b6['SkillsStatesCore']['stateAddJS'][_0x1183c4['id']] = new _0x2d9164(_0x29568d(0x515), _0x549abc); } else tier = Math[_0x29568d(0x466)](_0x65b04a, tier); } } } VisuMZ[_0x29568d(0x397)](VisuMZ[label][_0x29568d(0x2e9)], _0x187690[_0x29568d(0x2a7)]); })(pluginData), PluginManager['registerCommand'](pluginData['name'], _0x183653(0x474), _0x3cf1fa => { const _0x357e84 = _0x183653; VisuMZ['ConvertParams'](_0x3cf1fa, _0x3cf1fa); const _0x4dc06c = _0x3cf1fa[_0x357e84(0x280)] || [], _0x476a1b = Number(_0x3cf1fa[_0x357e84(0x1e7)]), _0x1ebbb3 = $dataSkills[_0x476a1b]; if (!_0x1ebbb3) return; for (const _0x533368 of _0x4dc06c) { const _0x3ff2a5 = $gameActors[_0x357e84(0x2ad)](_0x533368); if (!_0x3ff2a5) continue; _0x3ff2a5['paySkillCost'](_0x1ebbb3); } }), PluginManager[_0x183653(0x37b)](pluginData[_0x183653(0x242)], _0x183653(0x1db), _0x2f0711 => { const _0x33c2d1 = _0x183653; VisuMZ[_0x33c2d1(0x397)](_0x2f0711, _0x2f0711); const _0x3e3046 = _0x2f0711[_0x33c2d1(0x4d5)] || [], _0x3f8c79 = Number(_0x2f0711[_0x33c2d1(0x1e7)]), _0x4139af = $dataSkills[_0x3f8c79]; if (!_0x4139af) return; for (const _0x29e3cc of _0x3e3046) { const _0x3fb338 = $gameTroop[_0x33c2d1(0x49e)]()[_0x29e3cc]; if (!_0x3fb338) continue; _0x3fb338['paySkillCost'](_0x4139af); } }), PluginManager[_0x183653(0x37b)](pluginData[_0x183653(0x242)], _0x183653(0x292), _0xbf2284 => { const _0x89d376 = _0x183653; VisuMZ[_0x89d376(0x397)](_0xbf2284, _0xbf2284); const _0x38caff = _0xbf2284['ActorIDs'] || [], _0x51e58f = Number(_0xbf2284['StateID']), _0x15e4cd = Number(_0xbf2284['Turns']), _0x294cf2 = _0xbf2284[_0x89d376(0x373)]; for (const _0x53df3e of _0x38caff) { const _0x2cf152 = $gameActors[_0x89d376(0x2ad)](_0x53df3e); if (!_0x2cf152) continue; _0x294cf2 && !_0x2cf152[_0x89d376(0x23a)](_0x51e58f) ? (_0x2cf152['addState'](_0x51e58f), _0x2cf152['setStateTurns'](_0x51e58f, _0x15e4cd)) : _0x2cf152[_0x89d376(0x481)](_0x51e58f, _0x15e4cd); } }), PluginManager['registerCommand'](pluginData['name'], _0x183653(0x2cc), _0x21c580 => { const _0x54ae9e = _0x183653; VisuMZ['ConvertParams'](_0x21c580, _0x21c580); const _0x4c1bdb = _0x21c580[_0x54ae9e(0x280)] || [], _0x2ba12c = Number(_0x21c580['StateID']), _0x15b0c0 = Math[_0x54ae9e(0x466)](Number(_0x21c580[_0x54ae9e(0x367)]), 0x0), _0x21c2aa = _0x21c580[_0x54ae9e(0x373)]; for (const _0x1af6e1 of _0x4c1bdb) { if (_0x54ae9e(0x322) === _0x54ae9e(0x322)) { const _0x3b6b8b = $gameActors['actor'](_0x1af6e1); if (!_0x3b6b8b) continue; if (_0x21c2aa && !_0x3b6b8b[_0x54ae9e(0x23a)](_0x2ba12c)) { if ('oynqQ' !== _0x54ae9e(0x48a)) _0x3b6b8b[_0x54ae9e(0x4a6)](_0x2ba12c); else { this[_0x54ae9e(0x28c)] = !![]; let _0x4c31c4 = _0x21ce8c['SkillsStatesCore'][_0x54ae9e(0x334)][_0x54ae9e(0x41a)](this, _0x5404b7); return this[_0x54ae9e(0x28c)] = _0x34bf97, _0x4c31c4; } } _0x3b6b8b[_0x54ae9e(0x1c4)](_0x2ba12c, _0x15b0c0); } else this[_0x54ae9e(0x393)](_0x391b2b); } }), PluginManager[_0x183653(0x37b)](pluginData[_0x183653(0x242)], _0x183653(0x361), _0xdc3251 => { const _0xf3cf7c = _0x183653; if (!$gameParty[_0xf3cf7c(0x4d6)]()) return; VisuMZ[_0xf3cf7c(0x397)](_0xdc3251, _0xdc3251); const _0x2ce2e8 = _0xdc3251['EnemyIndex'] || [], _0xc6cbaf = Number(_0xdc3251['StateID']), _0x467bf7 = Number(_0xdc3251[_0xf3cf7c(0x367)]), _0x155d56 = _0xdc3251[_0xf3cf7c(0x373)]; for (const _0x342973 of _0x2ce2e8) { const _0x1e66fa = $gameTroop[_0xf3cf7c(0x49e)]()[_0x342973]; if (!_0x1e66fa) continue; if (_0x155d56 && !_0x1e66fa[_0xf3cf7c(0x23a)](_0xc6cbaf)) _0x1e66fa[_0xf3cf7c(0x4a6)](_0xc6cbaf), _0x1e66fa[_0xf3cf7c(0x1c4)](_0xc6cbaf, _0x467bf7); else { if (_0xf3cf7c(0x4bd) === _0xf3cf7c(0x4bd)) _0x1e66fa[_0xf3cf7c(0x481)](_0xc6cbaf, _0x467bf7); else return !![]; } } }), PluginManager[_0x183653(0x37b)](pluginData[_0x183653(0x242)], 'StateTurnsEnemyChangeTo', _0x1ac79b => { const _0x5a6d9c = _0x183653; if (!$gameParty['inBattle']()) return; VisuMZ[_0x5a6d9c(0x397)](_0x1ac79b, _0x1ac79b); const _0x139c4f = _0x1ac79b['EnemyIndex'] || [], _0x54b8a2 = Number(_0x1ac79b[_0x5a6d9c(0x34a)]), _0x481880 = Math[_0x5a6d9c(0x466)](Number(_0x1ac79b[_0x5a6d9c(0x367)]), 0x0), _0x91b504 = _0x1ac79b[_0x5a6d9c(0x373)]; for (const _0x2530c9 of _0x139c4f) { if ('BuzLF' !== _0x5a6d9c(0x2ef)) { if (typeof _0x53c066 !== _0x5a6d9c(0x316)) _0x3ae2dd = _0x196cd5['id']; return this[_0x5a6d9c(0x32b)] = this[_0x5a6d9c(0x32b)] || {}, this[_0x5a6d9c(0x32b)][_0x1746a5] = this['_stateData'][_0x2ed23e] || {}, this[_0x5a6d9c(0x32b)][_0x59dc03]; } else { const _0x47421a = $gameTroop[_0x5a6d9c(0x49e)]()[_0x2530c9]; if (!_0x47421a) continue; _0x91b504 && !_0x47421a[_0x5a6d9c(0x23a)](_0x54b8a2) && _0x47421a[_0x5a6d9c(0x4a6)](_0x54b8a2), _0x47421a[_0x5a6d9c(0x1c4)](_0x54b8a2, _0x481880); } } }), VisuMZ[_0x183653(0x3eb)][_0x183653(0x43a)] = Scene_Boot['prototype'][_0x183653(0x257)], Scene_Boot['prototype']['onDatabaseLoaded'] = function () { const _0x39a438 = _0x183653; VisuMZ[_0x39a438(0x3eb)][_0x39a438(0x43a)][_0x39a438(0x41a)](this), this[_0x39a438(0x1f4)](), VisuMZ[_0x39a438(0x3eb)][_0x39a438(0x205)](); }, Scene_Boot[_0x183653(0x506)][_0x183653(0x1f4)] = function () { const _0x35c327 = _0x183653; if (VisuMZ[_0x35c327(0x3af)]) return; this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](), this[_0x35c327(0x4bc)](); }, Scene_Boot[_0x183653(0x506)][_0x183653(0x3a2)] = function () { const _0x137d5f = _0x183653; for (const _0x3ed640 of $dataSkills) { if (_0x137d5f(0x48b) === _0x137d5f(0x35a)) { if (!_0x17925f) return ![]; if (!_0x5f456d[_0x137d5f(0x3eb)][_0x137d5f(0x458)][_0x137d5f(0x41a)](this, _0x4d3c41)) return ![]; if (!this[_0x137d5f(0x4a8)](_0xc770dd)) return ![]; if (!this[_0x137d5f(0x203)](_0x5a397e)) return ![]; if (!this[_0x137d5f(0x4da)](_0x878d54)) return ![]; return !![]; } else { if (!_0x3ed640) continue; VisuMZ['SkillsStatesCore'][_0x137d5f(0x1d6)](_0x3ed640), VisuMZ[_0x137d5f(0x3eb)]['Parse_Notetags_Skill_JS'](_0x3ed640); } } }, Scene_Boot[_0x183653(0x506)][_0x183653(0x4bc)] = function () { const _0x431130 = _0x183653; for (const _0x540abb of $dataStates) { if (!_0x540abb) continue; VisuMZ[_0x431130(0x3eb)][_0x431130(0x288)](_0x540abb), VisuMZ[_0x431130(0x3eb)][_0x431130(0x4f5)](_0x540abb), VisuMZ[_0x431130(0x3eb)][_0x431130(0x251)](_0x540abb), VisuMZ['SkillsStatesCore'][_0x431130(0x32d)](_0x540abb); } }, VisuMZ['SkillsStatesCore'][_0x183653(0x287)] = VisuMZ['ParseSkillNotetags'], VisuMZ[_0x183653(0x287)] = function (_0x6078eb) { const _0x555b45 = _0x183653; VisuMZ[_0x555b45(0x3eb)][_0x555b45(0x287)][_0x555b45(0x41a)](this, _0x6078eb), VisuMZ[_0x555b45(0x3eb)][_0x555b45(0x1d6)](_0x6078eb), VisuMZ[_0x555b45(0x3eb)][_0x555b45(0x437)](_0x6078eb); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1d4)] = VisuMZ[_0x183653(0x1d4)], VisuMZ[_0x183653(0x1d4)] = function (_0x5a056d) { const _0xd35b6c = _0x183653; VisuMZ[_0xd35b6c(0x3eb)]['ParseStateNotetags'][_0xd35b6c(0x41a)](this, _0x5a056d), VisuMZ[_0xd35b6c(0x3eb)]['Parse_Notetags_State_Category'](_0x5a056d), VisuMZ[_0xd35b6c(0x3eb)]['Parse_Notetags_State_PassiveJS'](_0x5a056d), VisuMZ[_0xd35b6c(0x3eb)][_0xd35b6c(0x251)](_0x5a056d), VisuMZ['SkillsStatesCore'][_0xd35b6c(0x32d)](_0x5a056d); }, VisuMZ['SkillsStatesCore'][_0x183653(0x1d6)] = function (_0x4c51d7) { const _0x592e17 = _0x183653, _0x13ffcf = _0x4c51d7['note']; _0x13ffcf['match'](/<MP COST:[ ](\d+)>/i) && (_0x4c51d7[_0x592e17(0x27d)] = Number(RegExp['$1'])); if (_0x13ffcf[_0x592e17(0x3c7)](/<TP COST:[ ](\d+)>/i)) { if ('jaANq' !== _0x592e17(0x495)) { const _0x2da026 = _0x592e17(0x4f0)['format'](_0x3e5852[_0x592e17(0x2d7)]()), _0x555243 = _0x592e17(0x2cf)['format'](_0x54a2af[_0x592e17(0x264)]()), _0x489a6f = _0x592e17(0x3a7)[_0x592e17(0x269)](_0x5bef7b['getCurrentTroopUniqueID']()); return _0x592e17(0x45d)[_0x592e17(0x269)](_0x2da026, _0x555243, _0x489a6f); } else _0x4c51d7[_0x592e17(0x35e)] = Number(RegExp['$1']); } }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x29a)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x349)] = {}, VisuMZ[_0x183653(0x3eb)]['Parse_Notetags_Skill_JS'] = function (_0x726736) { const _0x33f502 = _0x183653, _0x25ab99 = _0x726736[_0x33f502(0x25b)]; if (_0x25ab99[_0x33f502(0x3c7)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)) { const _0x44c338 = String(RegExp['$1']), _0x4f3aaf = _0x33f502(0x42a)[_0x33f502(0x269)](_0x44c338); VisuMZ[_0x33f502(0x3eb)][_0x33f502(0x29a)][_0x726736['id']] = new Function(_0x33f502(0x351), _0x4f3aaf); } if (_0x25ab99[_0x33f502(0x3c7)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)) { if (_0x33f502(0x3c0) !== _0x33f502(0x3c0)) { const _0x768ea7 = _0x43fa91[_0x33f502(0x506)][_0x33f502(0x509)](); this[_0x33f502(0x1c0)] = new _0x263e60(), this[_0x33f502(0x1c0)]['bitmap'] = new _0x2f85ff(_0x4ab600[_0x33f502(0x241)], _0x768ea7), this['_turnDisplaySprite'][_0x33f502(0x211)]['x'] = this[_0x33f502(0x211)]['x'], this['_turnDisplaySprite'][_0x33f502(0x211)]['y'] = this[_0x33f502(0x211)]['y'], this[_0x33f502(0x3dc)](this[_0x33f502(0x1c0)]), this['contents'] = this[_0x33f502(0x1c0)]['bitmap']; } else { const _0x4ea267 = String(RegExp['$1']), _0x559fb2 = _0x33f502(0x4e4)[_0x33f502(0x269)](_0x4ea267); VisuMZ[_0x33f502(0x3eb)][_0x33f502(0x349)][_0x726736['id']] = new Function(_0x33f502(0x351), _0x559fb2); } } }, VisuMZ['SkillsStatesCore']['Parse_Notetags_State_Category'] = function (_0x13cd69) { const _0x4b3495 = _0x183653; _0x13cd69[_0x4b3495(0x230)] = [_0x4b3495(0x267), 'ANY']; const _0x18540d = _0x13cd69[_0x4b3495(0x25b)], _0x14cd48 = _0x18540d['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi); if (_0x14cd48) for (const _0x5ecce6 of _0x14cd48) { if (_0x4b3495(0x31d) !== 'nVTsC') { const _0x885bca = this['getStateRetainType'](); if (_0x885bca !== '') { const _0x238fc3 = _0x5d84c6[_0x4b3495(0x25b)]; if (_0x885bca === _0x4b3495(0x39d) && _0x238fc3[_0x4b3495(0x3c7)](/<NO DEATH CLEAR>/i)) return ![]; if (_0x885bca === _0x4b3495(0x2d4) && _0x238fc3[_0x4b3495(0x3c7)](/<NO RECOVER ALL CLEAR>/i)) return ![]; } return this[_0x4b3495(0x23a)](_0x1be6e8['id']); } else { _0x5ecce6['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi); const _0x54adc0 = String(RegExp['$1'])['toUpperCase']()[_0x4b3495(0x420)]()['split'](','); for (const _0x3006a8 of _0x54adc0) { _0x13cd69[_0x4b3495(0x230)][_0x4b3495(0x309)](_0x3006a8[_0x4b3495(0x420)]()); } } } if (_0x18540d[_0x4b3495(0x3c7)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)) { if (_0x4b3495(0x4d7) !== _0x4b3495(0x1ee)) { const _0x2332b6 = RegExp['$1'][_0x4b3495(0x212)](/[\r\n]+/); for (const _0xc5a1c of _0x2332b6) { _0x13cd69[_0x4b3495(0x230)][_0x4b3495(0x309)](_0xc5a1c[_0x4b3495(0x332)]()[_0x4b3495(0x420)]()); } } else { if (_0x1bc09c) _0x3c93de[_0x4b3495(0x2fc)](); } } _0x18540d['match'](/<POSITIVE STATE>/i) && _0x13cd69[_0x4b3495(0x230)]['push']('POSITIVE'), _0x18540d[_0x4b3495(0x3c7)](/<NEGATIVE STATE>/i) && _0x13cd69['categories'][_0x4b3495(0x309)](_0x4b3495(0x512)); }, VisuMZ['SkillsStatesCore'][_0x183653(0x468)] = {}, VisuMZ['SkillsStatesCore'][_0x183653(0x4f5)] = function (_0xceec89) { const _0x120f17 = _0x183653, _0x266256 = _0xceec89[_0x120f17(0x25b)]; if (_0x266256[_0x120f17(0x3c7)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)) { const _0x5ad97f = String(RegExp['$1']), _0x12a464 = _0x120f17(0x278)[_0x120f17(0x269)](_0x5ad97f); VisuMZ['SkillsStatesCore'][_0x120f17(0x468)][_0xceec89['id']] = new Function(_0x120f17(0x3ab), _0x12a464); } }, VisuMZ['SkillsStatesCore']['stateHpSlipDamageJS'] = {}, VisuMZ['SkillsStatesCore'][_0x183653(0x4b8)] = {}, VisuMZ[_0x183653(0x3eb)]['stateMpSlipDamageJS'] = {}, VisuMZ['SkillsStatesCore'][_0x183653(0x33c)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x34d)] = {}, VisuMZ['SkillsStatesCore'][_0x183653(0x1d7)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x251)] = function (_0x39b6a4) { const _0x57f0bc = _0x183653, _0x3f78e8 = _0x39b6a4[_0x57f0bc(0x25b)], _0x22b625 = _0x57f0bc(0x20c); if (_0x3f78e8['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)) { const _0x45dbaf = String(RegExp['$1']), _0x29140f = _0x22b625['format'](_0x45dbaf, _0x57f0bc(0x249), -0x1, _0x57f0bc(0x48f)); VisuMZ[_0x57f0bc(0x3eb)][_0x57f0bc(0x1f6)][_0x39b6a4['id']] = new Function(_0x57f0bc(0x515), _0x29140f); } else { if (_0x3f78e8[_0x57f0bc(0x3c7)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)) { if ('JxCMi' === _0x57f0bc(0x501)) this['onAddBuffGlobalJS'](_0x26d4fa, _0xf3ce7); else { const _0x512405 = String(RegExp['$1']), _0x3abf33 = _0x22b625[_0x57f0bc(0x269)](_0x512405, _0x57f0bc(0x4c7), 0x1, _0x57f0bc(0x48f)); VisuMZ[_0x57f0bc(0x3eb)]['stateHpSlipHealJS'][_0x39b6a4['id']] = new Function('stateId', _0x3abf33); } } } if (_0x3f78e8[_0x57f0bc(0x3c7)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)) { if (_0x57f0bc(0x1fd) !== _0x57f0bc(0x1fd)) { const _0x4dc442 = _0x100767[_0x2a96c6]; if (!_0x4dc442) return; const _0x50bc2d = _0x4dc442[_0x57f0bc(0x25b)] || '', _0x4fce4b = _0x50bc2d[_0x57f0bc(0x3c7)](/<REMOVE OTHER (.*) STATES>/gi); if (_0x4fce4b) { const _0x59b58f = [_0x4dc442]; for (const _0x3adc97 of _0x4fce4b) { _0x3adc97[_0x57f0bc(0x3c7)](/<REMOVE OTHER (.*) STATES>/i); const _0x4eb511 = _0x51ab43(_0x2d453c['$1']); this['removeStatesByCategoryAll'](_0x4eb511, _0x59b58f); } } } else { const _0x34ec51 = String(RegExp['$1']), _0x3761ab = _0x22b625['format'](_0x34ec51, _0x57f0bc(0x249), -0x1, _0x57f0bc(0x439)); VisuMZ[_0x57f0bc(0x3eb)][_0x57f0bc(0x1f8)][_0x39b6a4['id']] = new Function('stateId', _0x3761ab); } } else { if (_0x3f78e8[_0x57f0bc(0x3c7)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)) { const _0x119778 = String(RegExp['$1']), _0x18129b = _0x22b625[_0x57f0bc(0x269)](_0x119778, _0x57f0bc(0x4c7), 0x1, 'slipMp'); VisuMZ['SkillsStatesCore'][_0x57f0bc(0x33c)][_0x39b6a4['id']] = new Function('stateId', _0x18129b); } } if (_0x3f78e8[_0x57f0bc(0x3c7)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)) { if (_0x57f0bc(0x2b3) === _0x57f0bc(0x2b3)) { const _0x1db0bb = String(RegExp['$1']), _0x5dfdca = _0x22b625['format'](_0x1db0bb, _0x57f0bc(0x249), -0x1, 'slipTp'); VisuMZ['SkillsStatesCore'][_0x57f0bc(0x34d)][_0x39b6a4['id']] = new Function('stateId', _0x5dfdca); } else { const _0x116ce4 = this[_0x57f0bc(0x4ef)] !== _0x2f1aa0; _0x44b654['SkillsStatesCore'][_0x57f0bc(0x4bb)][_0x57f0bc(0x41a)](this, _0x279d83), _0x116ce4 && (this[_0x57f0bc(0x29c)] && this[_0x57f0bc(0x29c)][_0x57f0bc(0x355)] === _0x2f6151 && this['_statusWindow'][_0x57f0bc(0x3ad)](this[_0x57f0bc(0x426)](0x0))); } } else { if (_0x3f78e8[_0x57f0bc(0x3c7)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)) { const _0x584dd6 = String(RegExp['$1']), _0x5dc771 = _0x22b625[_0x57f0bc(0x269)](_0x584dd6, _0x57f0bc(0x4c7), 0x1, 'slipTp'); VisuMZ[_0x57f0bc(0x3eb)][_0x57f0bc(0x1d7)][_0x39b6a4['id']] = new Function(_0x57f0bc(0x515), _0x5dc771); } } }, VisuMZ['SkillsStatesCore'][_0x183653(0x42b)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3ff)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x498)] = {}, VisuMZ[_0x183653(0x3eb)][_0x183653(0x32d)] = function (_0x133071) { const _0x181bdf = _0x183653, _0x493bf3 = _0x133071['note'], _0x245a9d = _0x181bdf(0x1d8); if (_0x493bf3[_0x181bdf(0x3c7)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)) { if (_0x181bdf(0x227) === _0x181bdf(0x2b4)) { const _0x1d3fa4 = _0x34a025[_0x181bdf(0x3ee)]('[' + _0x1ca2d6['$1'][_0x181bdf(0x3c7)](/\d+/g) + ']'); for (const _0x15e68b of _0x1d3fa4) { if (!_0x27952a[_0x181bdf(0x2e8)](_0x15e68b)) return ![]; } return !![]; } else { const _0x5df6d3 = String(RegExp['$1']), _0x1521a8 = _0x245a9d[_0x181bdf(0x269)](_0x5df6d3); VisuMZ[_0x181bdf(0x3eb)][_0x181bdf(0x42b)][_0x133071['id']] = new Function(_0x181bdf(0x515), _0x1521a8); } } if (_0x493bf3[_0x181bdf(0x3c7)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)) { if ('KTcjr' !== _0x181bdf(0x46c)) { const _0x494fd5 = String(RegExp['$1']), _0x1bbd45 = _0x245a9d[_0x181bdf(0x269)](_0x494fd5); VisuMZ[_0x181bdf(0x3eb)][_0x181bdf(0x3ff)][_0x133071['id']] = new Function(_0x181bdf(0x515), _0x1bbd45); } else { const _0x15888b = _0x38b08d[_0x181bdf(0x3ee)]('[' + _0x39fcca['$1'][_0x181bdf(0x3c7)](/\d+/g) + ']'); for (const _0x4b7bf2 of _0x15888b) { if (!_0x190866[_0x181bdf(0x222)](_0x4b7bf2)) return !![]; } return ![]; } } if (_0x493bf3[_0x181bdf(0x3c7)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)) { if ('DnaZn' !== _0x181bdf(0x216)) return this[_0x181bdf(0x4df)][_0x1b5dba['id']]; else { const _0x2627ce = String(RegExp['$1']), _0x5960ab = _0x245a9d[_0x181bdf(0x269)](_0x2627ce); VisuMZ[_0x181bdf(0x3eb)][_0x181bdf(0x498)][_0x133071['id']] = new Function(_0x181bdf(0x515), _0x5960ab); } } }, VisuMZ[_0x183653(0x3eb)]['CheckIncompatibleStates'] = function () { const _0xc465d8 = _0x183653; if (!VisuMZ[_0xc465d8(0x3eb)][_0xc465d8(0x2e9)][_0xc465d8(0x30e)][_0xc465d8(0x43f)]) return; for (const _0x457b8b of $dataStates) { if (_0xc465d8(0x369) !== _0xc465d8(0x1c5)) { if (!_0x457b8b) continue; if (_0x457b8b[_0xc465d8(0x46f)] === 0x4 && _0x457b8b[_0xc465d8(0x246)] === 0x1) { if (_0xc465d8(0x412) !== _0xc465d8(0x4cf)) _0x457b8b[_0xc465d8(0x246)] = 0x2; else { const _0x233489 = _0x2d9794(_0x324a60['$1']); _0x233489 !== _0x50865f[_0x2bd38b]['version'] && (_0x46491f('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xc465d8(0x269)](_0x4fceaa, _0x233489)), _0x59d351['exit']()); } } } else return this[_0xc465d8(0x1e0)](); } }, DataManager[_0x183653(0x3ce)] = function (_0x120d1e) { const _0x11606f = _0x183653; _0x120d1e = _0x120d1e[_0x11606f(0x332)]()[_0x11606f(0x420)](), this['_classIDs'] = this[_0x11606f(0x29d)] || {}; if (this['_classIDs'][_0x120d1e]) return this[_0x11606f(0x29d)][_0x120d1e]; for (const _0x4eeb34 of $dataClasses) { if (!_0x4eeb34) continue; let _0x5258a4 = _0x4eeb34[_0x11606f(0x242)]; _0x5258a4 = _0x5258a4[_0x11606f(0x299)](/\x1I\[(\d+)\]/gi, ''), _0x5258a4 = _0x5258a4[_0x11606f(0x299)](/\\I\[(\d+)\]/gi, ''), this['_classIDs'][_0x5258a4[_0x11606f(0x332)]()[_0x11606f(0x420)]()] = _0x4eeb34['id']; } return this[_0x11606f(0x29d)][_0x120d1e] || 0x0; }, DataManager['getSkillTypes'] = function (_0x591164) { const _0x4f3d23 = _0x183653; this['_stypeIDs'] = this[_0x4f3d23(0x46a)] || {}; if (this[_0x4f3d23(0x46a)][_0x591164['id']]) return this['_stypeIDs'][_0x591164['id']]; this[_0x4f3d23(0x46a)][_0x591164['id']] = [_0x591164[_0x4f3d23(0x419)]]; if (_0x591164[_0x4f3d23(0x25b)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0x4f3d23(0x1f5) === _0x4f3d23(0x1f5)) { const _0x1e833b = JSON[_0x4f3d23(0x3ee)]('[' + RegExp['$1'][_0x4f3d23(0x3c7)](/\d+/g) + ']'); this['_stypeIDs'][_0x591164['id']] = this[_0x4f3d23(0x46a)][_0x591164['id']]['concat'](_0x1e833b); } else { const _0x34f0d9 = this['createAllSkillCostText'](_0x222fb5, _0x23aa91), _0x5eafdc = this[_0x4f3d23(0x3b7)](_0x34f0d9, _0xce327c, _0x3040f3, _0x3630b0), _0x464448 = _0x350730 + _0x5962b3 - _0x5eafdc[_0x4f3d23(0x43d)]; this[_0x4f3d23(0x4de)](_0x34f0d9, _0x464448, _0x344149, _0x48b71e), this[_0x4f3d23(0x2be)](); } } else { if (_0x591164[_0x4f3d23(0x25b)][_0x4f3d23(0x3c7)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)) { if (_0x4f3d23(0x310) === 'WzhFM') { if (typeof _0x288cf0 !== _0x4f3d23(0x316)) _0x44546b = _0x107248['id']; if (this[_0x4f3d23(0x23a)](_0x1f5237)) { const _0x399a9a = _0x3fe650['stateMaximumTurns'](_0x4bd284); this[_0x4f3d23(0x451)][_0x2d83fc] = _0x2965d1['clamp'](0x0, _0x399a9a); if (this['_stateTurns'][_0x47d7dc] <= 0x0) this['removeState'](_0x20b4f0); } } else { const _0x5d69c9 = RegExp['$1']['split'](','); for (const _0x23205f of _0x5d69c9) { const _0x214c90 = DataManager[_0x4f3d23(0x450)](_0x23205f); if (_0x214c90) this[_0x4f3d23(0x46a)][_0x591164['id']]['push'](_0x214c90); } } } } return this[_0x4f3d23(0x46a)][_0x591164['id']]; }, DataManager[_0x183653(0x450)] = function (_0x3379f6) { const _0x118651 = _0x183653; _0x3379f6 = _0x3379f6[_0x118651(0x332)]()[_0x118651(0x420)](), this['_stypeIDs'] = this['_stypeIDs'] || {}; if (this[_0x118651(0x46a)][_0x3379f6]) return this[_0x118651(0x46a)][_0x3379f6]; for (let _0x2d590f = 0x1; _0x2d590f < 0x64; _0x2d590f++) { if (!$dataSystem[_0x118651(0x231)][_0x2d590f]) continue; let _0x107944 = $dataSystem['skillTypes'][_0x2d590f][_0x118651(0x332)]()[_0x118651(0x420)](); _0x107944 = _0x107944[_0x118651(0x299)](/\x1I\[(\d+)\]/gi, ''), _0x107944 = _0x107944[_0x118651(0x299)](/\\I\[(\d+)\]/gi, ''), this[_0x118651(0x46a)][_0x107944] = _0x2d590f; } return this['_stypeIDs'][_0x3379f6] || 0x0; }, DataManager[_0x183653(0x33a)] = function (_0x3b6d51) { const _0x9dcf8a = _0x183653; _0x3b6d51 = _0x3b6d51[_0x9dcf8a(0x332)]()[_0x9dcf8a(0x420)](), this[_0x9dcf8a(0x27e)] = this[_0x9dcf8a(0x27e)] || {}; if (this['_skillIDs'][_0x3b6d51]) return this[_0x9dcf8a(0x27e)][_0x3b6d51]; for (const _0x519cdb of $dataSkills) { if (!_0x519cdb) continue; this[_0x9dcf8a(0x27e)][_0x519cdb[_0x9dcf8a(0x242)]['toUpperCase']()[_0x9dcf8a(0x420)]()] = _0x519cdb['id']; } return this[_0x9dcf8a(0x27e)][_0x3b6d51] || 0x0; }, DataManager[_0x183653(0x39b)] = function (_0x8334a9) { const _0x5db42a = _0x183653; _0x8334a9 = _0x8334a9['toUpperCase']()[_0x5db42a(0x420)](), this[_0x5db42a(0x3ae)] = this['_stateIDs'] || {}; if (this[_0x5db42a(0x3ae)][_0x8334a9]) return this[_0x5db42a(0x3ae)][_0x8334a9]; for (const _0x35c999 of $dataStates) { if (!_0x35c999) continue; this[_0x5db42a(0x3ae)][_0x35c999[_0x5db42a(0x242)][_0x5db42a(0x332)]()[_0x5db42a(0x420)]()] = _0x35c999['id']; } return this[_0x5db42a(0x3ae)][_0x8334a9] || 0x0; }, DataManager[_0x183653(0x4a4)] = function (_0x5a294d) { const _0x176d28 = _0x183653; this[_0x176d28(0x3fc)] = this['_stateMaxTurns'] || {}; if (this[_0x176d28(0x3fc)][_0x5a294d]) return this[_0x176d28(0x3fc)][_0x5a294d]; return $dataStates[_0x5a294d][_0x176d28(0x25b)][_0x176d28(0x3c7)](/<MAX TURNS:[ ](\d+)>/i) ? this[_0x176d28(0x3fc)][_0x5a294d] = Number(RegExp['$1']) : this[_0x176d28(0x3fc)][_0x5a294d] = VisuMZ[_0x176d28(0x3eb)][_0x176d28(0x2e9)][_0x176d28(0x30e)][_0x176d28(0x3d2)], this[_0x176d28(0x3fc)][_0x5a294d]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x225)] = function (_0x3d5c0b, _0x17a492) { const _0x202f79 = _0x183653; if (VisuMZ['createKeyJS']) return VisuMZ[_0x202f79(0x225)](_0x3d5c0b, _0x17a492); let _0x3b111f = ''; if ($dataActors[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = 'Actor-%1-%2'[_0x202f79(0x269)](_0x3d5c0b['id'], _0x17a492); if ($dataClasses[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = _0x202f79(0x398)['format'](_0x3d5c0b['id'], _0x17a492); if ($dataSkills[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = _0x202f79(0x1be)[_0x202f79(0x269)](_0x3d5c0b['id'], _0x17a492); if ($dataItems[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = 'Item-%1-%2'[_0x202f79(0x269)](_0x3d5c0b['id'], _0x17a492); if ($dataWeapons[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = _0x202f79(0x3c5)[_0x202f79(0x269)](_0x3d5c0b['id'], _0x17a492); if ($dataArmors[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = _0x202f79(0x4b6)['format'](_0x3d5c0b['id'], _0x17a492); if ($dataEnemies['includes'](_0x3d5c0b)) _0x3b111f = _0x202f79(0x382)[_0x202f79(0x269)](_0x3d5c0b['id'], _0x17a492); if ($dataStates[_0x202f79(0x206)](_0x3d5c0b)) _0x3b111f = 'State-%1-%2'['format'](_0x3d5c0b['id'], _0x17a492); return _0x3b111f; }, ColorManager['getColorDataFromPluginParameters'] = function (_0x414afc, _0x4e947a) { const _0x157ad9 = _0x183653; return _0x4e947a = String(_0x4e947a), this[_0x157ad9(0x461)] = this[_0x157ad9(0x461)] || {}, _0x4e947a[_0x157ad9(0x3c7)](/#(.*)/i) ? _0x157ad9(0x1e5) === _0x157ad9(0x37c) ? this[_0x157ad9(0x29e)](_0x18301d, _0x1c871f) : this[_0x157ad9(0x461)][_0x414afc] = _0x157ad9(0x3b8)['format'](String(RegExp['$1'])) : this['_colorCache'][_0x414afc] = this[_0x157ad9(0x46b)](Number(_0x4e947a)), this['_colorCache'][_0x414afc]; }, ColorManager[_0x183653(0x513)] = function (_0x1958eb) { const _0x438ec1 = _0x183653; return _0x1958eb = String(_0x1958eb), _0x1958eb[_0x438ec1(0x3c7)](/#(.*)/i) ? _0x438ec1(0x3b8)['format'](String(RegExp['$1'])) : this['textColor'](Number(_0x1958eb)); }, ColorManager[_0x183653(0x4f7)] = function (_0x42c048) { const _0x1fb9a9 = _0x183653; if (typeof _0x42c048 === _0x1fb9a9(0x316)) _0x42c048 = $dataStates[_0x42c048]; const _0x50f6b6 = _0x1fb9a9(0x475)[_0x1fb9a9(0x269)](_0x42c048['id']); this[_0x1fb9a9(0x461)] = this[_0x1fb9a9(0x461)] || {}; if (this['_colorCache'][_0x50f6b6]) return this[_0x1fb9a9(0x461)][_0x50f6b6]; const _0x445310 = this[_0x1fb9a9(0x46e)](_0x42c048); return this[_0x1fb9a9(0x325)](_0x50f6b6, _0x445310); }, ColorManager[_0x183653(0x46e)] = function (_0x2d9ddc) { const _0x283616 = _0x183653, _0x3ec0aa = _0x2d9ddc[_0x283616(0x25b)]; if (_0x3ec0aa['match'](/<TURN COLOR:[ ](.*)>/i)) return String(RegExp['$1']); else { if (_0x3ec0aa['match'](/<POSITIVE STATE>/i)) return VisuMZ[_0x283616(0x3eb)]['Settings'][_0x283616(0x30e)][_0x283616(0x4ff)]; else { if (_0x3ec0aa[_0x283616(0x3c7)](/<NEGATIVE STATE>/i)) { if (_0x283616(0x2e1) !== _0x283616(0x356)) return VisuMZ[_0x283616(0x3eb)][_0x283616(0x2e9)][_0x283616(0x30e)][_0x283616(0x47b)]; else _0x3fac1a[_0x283616(0x506)][_0x283616(0x428)][_0x283616(0x41a)](this, _0x543090); } else return VisuMZ[_0x283616(0x3eb)][_0x283616(0x2e9)][_0x283616(0x30e)][_0x283616(0x2b1)]; } } }, ColorManager[_0x183653(0x510)] = function () { const _0x532e30 = _0x183653, _0x15e128 = _0x532e30(0x4be); this['_colorCache'] = this['_colorCache'] || {}; if (this[_0x532e30(0x461)][_0x15e128]) return this[_0x532e30(0x461)][_0x15e128]; const _0xf0efff = VisuMZ['SkillsStatesCore']['Settings'][_0x532e30(0x384)][_0x532e30(0x4ce)]; return this['getColorDataFromPluginParameters'](_0x15e128, _0xf0efff); }, ColorManager[_0x183653(0x304)] = function () { const _0x12f481 = _0x183653, _0x45df8b = _0x12f481(0x1ca); this[_0x12f481(0x461)] = this[_0x12f481(0x461)] || {}; if (this[_0x12f481(0x461)][_0x45df8b]) return this[_0x12f481(0x461)][_0x45df8b]; const _0x319377 = VisuMZ[_0x12f481(0x3eb)][_0x12f481(0x2e9)][_0x12f481(0x384)]['ColorDebuff']; return this['getColorDataFromPluginParameters'](_0x45df8b, _0x319377); }, SceneManager['isSceneBattle'] = function () { const _0x2175e0 = _0x183653; return this['_scene'] && this['_scene'][_0x2175e0(0x355)] === Scene_Battle; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3d1)] = BattleManager['endAction'], BattleManager[_0x183653(0x297)] = function () { const _0x3f5367 = _0x183653; this[_0x3f5367(0x34c)](), VisuMZ[_0x3f5367(0x3eb)][_0x3f5367(0x3d1)][_0x3f5367(0x41a)](this); }, BattleManager[_0x183653(0x34c)] = function () { const _0x48ee6e = _0x183653, _0x4d4624 = VisuMZ['SkillsStatesCore'][_0x48ee6e(0x2e9)][_0x48ee6e(0x30e)]; if (!_0x4d4624) return; if (_0x4d4624[_0x48ee6e(0x43f)] === ![]) return; if (!this[_0x48ee6e(0x4d2)]) return; this['_subject'][_0x48ee6e(0x34c)](); }, Game_Battler['prototype'][_0x183653(0x34c)] = function () { const _0x38e99e = _0x183653; if (BattleManager[_0x38e99e(0x3da)] !== _0x38e99e(0x1b8)) return; if (this['_lastStatesActionEndFrameCount'] === Graphics['frameCount']) return; this[_0x38e99e(0x4e5)] = Graphics['frameCount']; for (const _0x4a9a07 of this[_0x38e99e(0x3e8)]) { if (_0x38e99e(0x435) === 'lOosU') return _0x14e98a[_0x38e99e(0x3eb)]['Settings'][_0x38e99e(0x3c2)]['ListWindowCols']; else { const _0xe5a44 = $dataStates[_0x4a9a07]; if (!_0xe5a44) continue; if (_0xe5a44[_0x38e99e(0x246)] !== 0x1) continue; this[_0x38e99e(0x451)][_0x4a9a07] > 0x0 && this[_0x38e99e(0x451)][_0x4a9a07]--; } } this[_0x38e99e(0x4c2)](0x1); }, Game_BattlerBase['prototype']['updateStateTurns'] = function () { const _0x267231 = _0x183653, _0x4797f2 = VisuMZ[_0x267231(0x3eb)][_0x267231(0x2e9)][_0x267231(0x30e)]; for (const _0x29b384 of this[_0x267231(0x3e8)]) { const _0x31fdc8 = $dataStates[_0x29b384]; if (_0x4797f2 && _0x4797f2[_0x267231(0x43f)] !== ![]) { if (_0x267231(0x3c9) !== _0x267231(0x3c9)) { const _0x526022 = _0x2ef006[_0x324543]; if (_0x526022 && _0x526022['categories'][_0x267231(0x4fc)] > 0x0) for (const _0x47f6cb of _0x526022['categories']) { if (this[_0x267231(0x3aa)](_0x47f6cb)) return !![]; } return _0x2f69df['SkillsStatesCore'][_0x267231(0x22b)]['call'](this, _0x238917); } else { if (_0x31fdc8 && _0x31fdc8[_0x267231(0x246)] === 0x1) continue; } } this[_0x267231(0x451)][_0x29b384] > 0x0 && this['_stateTurns'][_0x29b384]--; } }, VisuMZ[_0x183653(0x3eb)]['Game_Switches_onChange'] = Game_Switches['prototype'][_0x183653(0x3e4)], Game_Switches[_0x183653(0x506)]['onChange'] = function () { const _0x34e03a = _0x183653; VisuMZ[_0x34e03a(0x3eb)][_0x34e03a(0x266)][_0x34e03a(0x41a)](this); const _0x25a365 = VisuMZ[_0x34e03a(0x3eb)]['Settings'][_0x34e03a(0x368)][_0x34e03a(0x2d9)] ?? !![]; if (!_0x25a365) return; if (SceneManager['isSceneBattle']()) for (const _0x2c74f1 of BattleManager[_0x34e03a(0x2d5)]()) { if (_0x2c74f1) _0x2c74f1[_0x34e03a(0x2fc)](); } }, VisuMZ[_0x183653(0x3eb)]['Game_Variables_onChange'] = Game_Variables[_0x183653(0x506)][_0x183653(0x3e4)], Game_Variables[_0x183653(0x506)][_0x183653(0x3e4)] = function () { const _0x24fe88 = _0x183653; VisuMZ[_0x24fe88(0x3eb)][_0x24fe88(0x24b)][_0x24fe88(0x41a)](this); const _0x8cc8d3 = VisuMZ[_0x24fe88(0x3eb)][_0x24fe88(0x2e9)][_0x24fe88(0x368)][_0x24fe88(0x3fd)] ?? !![]; if (!_0x8cc8d3) return; if (SceneManager['isSceneBattle']()) { if (_0x24fe88(0x1cb) !== _0x24fe88(0x50b)) for (const _0x328cbc of BattleManager[_0x24fe88(0x2d5)]()) { if (_0x328cbc) _0x328cbc[_0x24fe88(0x2fc)](); } else { if (!_0x2f50d3[_0x24fe88(0x2e8)](_0x118240)) return ![]; } } }, VisuMZ[_0x183653(0x3eb)]['Game_Action_applyItemUserEffect'] = Game_Action[_0x183653(0x506)]['applyItemUserEffect'], Game_Action['prototype']['applyItemUserEffect'] = function (_0x587dad) { const _0x3e4177 = _0x183653; VisuMZ[_0x3e4177(0x3eb)][_0x3e4177(0x2d0)]['call'](this, _0x587dad), this[_0x3e4177(0x302)](_0x587dad); }, Game_Action['prototype']['applySkillsStatesCoreEffects'] = function (_0x5ea8a5) { const _0x29ecb6 = _0x183653; this['applyStateCategoryRemovalEffects'](_0x5ea8a5), this[_0x29ecb6(0x342)](_0x5ea8a5), this[_0x29ecb6(0x424)](_0x5ea8a5), this[_0x29ecb6(0x258)](_0x5ea8a5); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3b1)] = Game_Action[_0x183653(0x506)][_0x183653(0x2fb)], Game_Action['prototype'][_0x183653(0x2fb)] = function (_0x42ec97) { const _0x1a0de1 = _0x183653; if (this[_0x1a0de1(0x1ba)](_0x42ec97)) return !![]; return VisuMZ[_0x1a0de1(0x3eb)][_0x1a0de1(0x3b1)][_0x1a0de1(0x41a)](this, _0x42ec97); }, Game_Action[_0x183653(0x506)][_0x183653(0x1ba)] = function (_0x40e64a) { const _0x1c3e8a = _0x183653; if (!this[_0x1c3e8a(0x2f4)]()) return; const _0x389ab5 = this[_0x1c3e8a(0x2f4)]()['note']; if (_0x389ab5[_0x1c3e8a(0x3c7)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)) { const _0x312491 = String(RegExp['$1']); if (_0x40e64a[_0x1c3e8a(0x47f)](_0x312491)) return !![]; } if (_0x389ab5['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)) { const _0x1136a5 = Number(RegExp['$1']); if (_0x40e64a[_0x1c3e8a(0x23a)](_0x1136a5)) return !![]; } else { if (_0x389ab5['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)) { const _0x318cb0 = DataManager[_0x1c3e8a(0x39b)](RegExp['$1']); if (_0x40e64a[_0x1c3e8a(0x23a)](_0x318cb0)) return !![]; } } return ![]; }, Game_Action[_0x183653(0x506)][_0x183653(0x3ac)] = function (_0x42be55) { const _0x2f3fe3 = _0x183653; if (_0x42be55[_0x2f3fe3(0x3a4)]()[_0x2f3fe3(0x4fc)] <= 0x0) return; const _0x3e763c = this[_0x2f3fe3(0x2f4)]()[_0x2f3fe3(0x25b)]; { if ('oOUVP' !== _0x2f3fe3(0x1b9)) { this['onAddState'](_0x244b09);; } else { const _0x130bd4 = _0x3e763c[_0x2f3fe3(0x3c7)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi); if (_0x130bd4) for (const _0x1e4d21 of _0x130bd4) { _0x1e4d21['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i); const _0x36a759 = String(RegExp['$1']); _0x42be55[_0x2f3fe3(0x285)](_0x36a759); } } } { const _0x2f2c6f = _0x3e763c[_0x2f3fe3(0x3c7)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi); if (_0x2f2c6f) for (const _0x4f243e of _0x2f2c6f) { _0x4f243e[_0x2f3fe3(0x3c7)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i); const _0x1d050b = String(RegExp['$1']), _0x4d1ae0 = Number(RegExp['$2']); _0x42be55['removeStatesByCategory'](_0x1d050b, _0x4d1ae0); } } }, Game_Action['prototype'][_0x183653(0x342)] = function (_0x4813cd) { const _0x2e8860 = _0x183653, _0x3f4380 = this[_0x2e8860(0x2f4)]()[_0x2e8860(0x25b)], _0x3fab78 = _0x3f4380['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi); if (_0x3fab78) { if (_0x2e8860(0x400) !== 'pgOVO') return '\x20'; else for (const _0x1cc79b of _0x3fab78) { let _0x19e342 = 0x0, _0x5c5d9b = 0x0; if (_0x1cc79b[_0x2e8860(0x3c7)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)) { if (_0x2e8860(0x1bc) !== _0x2e8860(0x30b)) _0x19e342 = Number(RegExp['$1']), _0x5c5d9b = Number(RegExp['$2']); else { const _0x1f674c = _0x5a8b58(_0x3975b2['$1']), _0x191ccb = _0x494ea8[_0x2e8860(0x269)](_0x1f674c); _0x5d777a[_0x2e8860(0x3eb)]['stateEraseJS'][_0x5cf76d['id']] = new _0x81904c(_0x2e8860(0x515), _0x191ccb); } } else _0x1cc79b[_0x2e8860(0x3c7)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i) && (_0x19e342 = DataManager[_0x2e8860(0x39b)](RegExp['$1']), _0x5c5d9b = Number(RegExp['$2'])); _0x4813cd[_0x2e8860(0x1c4)](_0x19e342, _0x5c5d9b), this[_0x2e8860(0x20a)](_0x4813cd); } } const _0x163dee = _0x3f4380[_0x2e8860(0x3c7)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi); if (_0x163dee) { if (_0x2e8860(0x486) === _0x2e8860(0x486)) for (const _0x2e9fa3 of _0x163dee) { let _0x488356 = 0x0, _0x40c72b = 0x0; if (_0x2e9fa3['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)) _0x2e8860(0x3a0) !== _0x2e8860(0x3a0) ? this['drawTextEx'](_0x3f214a, _0xacd05a['x'] + _0x59ade9[_0x2e8860(0x43d)] - _0x25b12d, _0x4e923b['y'], _0x2150c4) : (_0x488356 = Number(RegExp['$1']), _0x40c72b = Number(RegExp['$2'])); else _0x2e9fa3[_0x2e8860(0x3c7)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i) && (_0x2e8860(0x1b4) === _0x2e8860(0x48c) ? (this[_0x2e8860(0x3d8)](_0x2d2244), this[_0x2e8860(0x335)](_0x3db0e8), _0x5df360[_0x2e8860(0x506)][_0x2e8860(0x354)]['call'](this, _0x52787e)) : (_0x488356 = DataManager[_0x2e8860(0x39b)](RegExp['$1']), _0x40c72b = Number(RegExp['$2']))); _0x4813cd[_0x2e8860(0x481)](_0x488356, _0x40c72b), this[_0x2e8860(0x20a)](_0x4813cd); } else this[_0x2e8860(0x3fb)](_0x33d8db, _0x5c972a), _0x5a2538 = _0x20f143[_0x2e8860(0x499)](), _0x4413cd['SkillsStatesCore'][_0x2e8860(0x413)][_0x2e8860(0x41a)](this, _0x2eaa47, _0x2cbd50); } }, Game_Action[_0x183653(0x506)]['applyBuffTurnManipulationEffects'] = function (_0x28b3dd) { const _0x7004d0 = _0x183653, _0x5f4944 = [_0x7004d0(0x22a), _0x7004d0(0x1ce), _0x7004d0(0x363), _0x7004d0(0x1f7), _0x7004d0(0x50c), _0x7004d0(0x265), _0x7004d0(0x338), _0x7004d0(0x469)], _0x1b8f80 = this[_0x7004d0(0x2f4)]()['note'], _0x19ad1b = _0x1b8f80[_0x7004d0(0x3c7)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi); if (_0x19ad1b) for (const _0x3ae68d of _0x19ad1b) { _0x3ae68d['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i); const _0x2eab36 = _0x5f4944[_0x7004d0(0x2f0)](String(RegExp['$1'])[_0x7004d0(0x332)]()), _0x31c636 = Number(RegExp['$2']); _0x2eab36 >= 0x0 && (_0x28b3dd[_0x7004d0(0x4a5)](_0x2eab36, _0x31c636), this[_0x7004d0(0x20a)](_0x28b3dd)); } const _0x1f1dc5 = _0x1b8f80[_0x7004d0(0x3c7)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi); if (_0x1f1dc5) { if (_0x7004d0(0x3e6) === _0x7004d0(0x47e)) return _0x9fa663[_0x7004d0(0x357)]() - 0x6; else for (const _0x1b96a7 of _0x19ad1b) { _0x1b96a7[_0x7004d0(0x3c7)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i); const _0x1acaf4 = _0x5f4944['indexOf'](String(RegExp['$1'])[_0x7004d0(0x332)]()), _0x306ea4 = Number(RegExp['$2']); _0x1acaf4 >= 0x0 && (_0x28b3dd[_0x7004d0(0x3b5)](_0x1acaf4, _0x306ea4), this[_0x7004d0(0x20a)](_0x28b3dd)); } } }, Game_Action['prototype'][_0x183653(0x258)] = function (_0x41dad7) { const _0x425327 = _0x183653, _0x55d099 = ['MAXHP', _0x425327(0x1ce), _0x425327(0x363), _0x425327(0x1f7), _0x425327(0x50c), 'MDF', 'AGI', 'LUK'], _0x1b3508 = this[_0x425327(0x2f4)]()[_0x425327(0x25b)], _0x5e65c1 = _0x1b3508[_0x425327(0x3c7)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi); if (_0x5e65c1) { if (_0x425327(0x379) === _0x425327(0x379)) for (const _0xeea13b of _0x5e65c1) { if (_0x425327(0x34e) === _0x425327(0x34e)) { _0xeea13b[_0x425327(0x3c7)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i); const _0x572c4f = _0x55d099['indexOf'](String(RegExp['$1'])[_0x425327(0x332)]()), _0x27841c = Number(RegExp['$2']); if (_0x572c4f >= 0x0) { if (_0x425327(0x4eb) === _0x425327(0x4eb)) _0x41dad7[_0x425327(0x4f6)](_0x572c4f, _0x27841c), this[_0x425327(0x20a)](_0x41dad7); else { const _0x4e5d0e = this[_0x425327(0x480)](); this[_0x425327(0x3dd)] = new _0x16b425(_0x4e5d0e), this['addWindow'](this[_0x425327(0x3dd)]), this[_0x425327(0x1bf)]['setStatusWindow'](this['_shopStatusWindow']); const _0x198440 = _0x35ee0e['SkillsStatesCore'][_0x425327(0x2e9)][_0x425327(0x3c2)][_0x425327(0x26a)]; this[_0x425327(0x3dd)][_0x425327(0x2fd)](_0x198440 || 0x0); } } } else { const _0x41a0a6 = this[_0x425327(0x449)](_0x54b813); _0x4e190b['SkillsStatesCore'][_0x425327(0x3d9)]['call'](this, _0x3ccd91); if (_0x41a0a6 && this['hasState'](_0x279e25[_0x2b3a0f])) { this['onAddState'](_0x1bfd97);; } } } else { let _0x1b4067 = _0x26491b['SkillsStatesCore'][_0x425327(0x1f1)]['call'](this); return _0x422753['_endingBattle'] && (_0x1b4067 = _0x1b4067[_0x425327(0x4e3)](this[_0x425327(0x49e)]()[_0x425327(0x32e)](_0x55e27d => _0x55e27d[_0x425327(0x38b)]()))), _0x1b4067; } } const _0x259f50 = _0x1b3508[_0x425327(0x3c7)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi); if (_0x259f50) { if (_0x425327(0x47c) === _0x425327(0x2ab)) { if (typeof _0x559912 !== 'number') _0x4cbb63 = _0x8822b4['id']; this[_0x425327(0x37a)] = this[_0x425327(0x37a)] || {}, this['_stateDisplay'][_0x51571c] = ''; } else for (const _0xabdee0 of _0x5e65c1) { if ('RAXlA' === _0x425327(0x256)) { _0xabdee0[_0x425327(0x3c7)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i); const _0x51fe94 = _0x55d099[_0x425327(0x2f0)](String(RegExp['$1'])[_0x425327(0x332)]()), _0x56d7d7 = Number(RegExp['$2']); if (_0x51fe94 >= 0x0) { if (_0x425327(0x3bb) !== _0x425327(0x364)) _0x41dad7['addDebuffTurns'](_0x51fe94, _0x56d7d7), this[_0x425327(0x20a)](_0x41dad7); else return this[_0x425327(0x328)](); } } else return _0x3b0267[_0x425327(0x3eb)]['Sprite_Gauge_currentValue']['call'](this); } } }, VisuMZ[_0x183653(0x3eb)]['Game_BattlerBase_initMembers'] = Game_BattlerBase['prototype'][_0x183653(0x46d)], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x46d)] = function () { const _0x268368 = _0x183653; this[_0x268368(0x2ac)] = {}, this[_0x268368(0x37d)](), VisuMZ['SkillsStatesCore'][_0x268368(0x1fc)][_0x268368(0x41a)](this); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x37d)] = function () { const _0x391a7b = _0x183653; this[_0x391a7b(0x311)] = '', this[_0x391a7b(0x32b)] = {}, this[_0x391a7b(0x37a)] = {}, this[_0x391a7b(0x2a9)] = {}; }, Game_BattlerBase[_0x183653(0x506)]['checkCacheKey'] = function (_0x5d288a) { const _0x224af7 = _0x183653; return this[_0x224af7(0x2ac)] = this[_0x224af7(0x2ac)] || {}, this[_0x224af7(0x2ac)][_0x5d288a] !== undefined; }, VisuMZ['SkillsStatesCore'][_0x183653(0x4ad)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2fc)], Game_BattlerBase[_0x183653(0x506)]['refresh'] = function () { const _0xb39996 = _0x183653; this['_cache'] = {}, VisuMZ['SkillsStatesCore'][_0xb39996(0x4ad)]['call'](this); }, VisuMZ['SkillsStatesCore'][_0x183653(0x40b)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x423)], Game_BattlerBase[_0x183653(0x506)]['eraseState'] = function (_0x114420) { const _0x3fd08b = _0x183653; let _0x5abef0 = this[_0x3fd08b(0x23a)](_0x114420); VisuMZ[_0x3fd08b(0x3eb)][_0x3fd08b(0x40b)]['call'](this, _0x114420); if (_0x5abef0 && !this['isStateAffected'](_0x114420)) this[_0x3fd08b(0x354)](_0x114420); }, Game_BattlerBase[_0x183653(0x506)]['onRemoveState'] = function (_0x2feab8) { const _0x4202ea = _0x183653; this[_0x4202ea(0x1e9)](_0x2feab8), this[_0x4202ea(0x323)](_0x2feab8); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x4c6)] = Game_Battler[_0x183653(0x506)]['onBattleEnd'], Game_Battler[_0x183653(0x506)]['onBattleEnd'] = function () { const _0x4d07db = _0x183653; VisuMZ[_0x4d07db(0x3eb)][_0x4d07db(0x4c6)][_0x4d07db(0x41a)](this), this[_0x4d07db(0x2f7)](); }, VisuMZ[_0x183653(0x3eb)]['Game_BattlerBase_resetStateCounts'] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2a0)], Game_BattlerBase[_0x183653(0x506)]['resetStateCounts'] = function (_0x47618c) { const _0x49a8d1 = _0x183653, _0x3ae6ce = $dataStates[_0x47618c], _0x22d37b = this[_0x49a8d1(0x4a1)](_0x47618c), _0x12a58d = this[_0x49a8d1(0x371)](_0x3ae6ce)[_0x49a8d1(0x499)]()['trim'](); switch (_0x12a58d) { case _0x49a8d1(0x4aa): if (_0x22d37b <= 0x0) this[_0x49a8d1(0x28b)](_0x47618c); break; case _0x49a8d1(0x2bf): this[_0x49a8d1(0x28b)](_0x47618c); break; case _0x49a8d1(0x404): this[_0x49a8d1(0x28b)](_0x47618c), this[_0x49a8d1(0x451)][_0x47618c] = Math[_0x49a8d1(0x466)](this[_0x49a8d1(0x451)][_0x47618c], _0x22d37b); break; case _0x49a8d1(0x50e): this[_0x49a8d1(0x28b)](_0x47618c), this['_stateTurns'][_0x47618c] += _0x22d37b; break; default: this[_0x49a8d1(0x28b)](_0x47618c); break; }if (this[_0x49a8d1(0x23a)](_0x47618c)) { const _0x5531c7 = DataManager[_0x49a8d1(0x4a4)](_0x47618c); this[_0x49a8d1(0x451)][_0x47618c] = this[_0x49a8d1(0x451)][_0x47618c][_0x49a8d1(0x1fb)](0x0, _0x5531c7); } }, Game_BattlerBase['prototype'][_0x183653(0x28b)] = function (_0x5666b9) { const _0x1ce0c7 = _0x183653; VisuMZ['SkillsStatesCore'][_0x1ce0c7(0x40c)][_0x1ce0c7(0x41a)](this, _0x5666b9); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x371)] = function (_0x5837f3) { const _0x3a84d7 = _0x183653, _0x54594b = _0x5837f3[_0x3a84d7(0x25b)]; if (_0x54594b[_0x3a84d7(0x3c7)](/<REAPPLY RULES:[ ](.*)>/i)) { if ('MTOci' !== _0x3a84d7(0x31b)) return String(RegExp['$1']); else { const _0x1a2bea = _0x54fb7c[_0x3a84d7(0x2af)], _0x2e9596 = _0x1598b1[_0x3a84d7(0x2af)]; if (_0x1a2bea !== _0x2e9596) return _0x2e9596 - _0x1a2bea; return _0x48bde6 - _0x2d5dda; } } else return VisuMZ[_0x3a84d7(0x3eb)]['Settings'][_0x3a84d7(0x30e)]['ReapplyRules']; }, VisuMZ['SkillsStatesCore'][_0x183653(0x2c5)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x282)], Game_BattlerBase[_0x183653(0x506)]['overwriteBuffTurns'] = function (_0x2db877, _0x4a017f) { const _0x3c9943 = _0x183653, _0x1591c2 = VisuMZ[_0x3c9943(0x3eb)][_0x3c9943(0x2e9)][_0x3c9943(0x384)][_0x3c9943(0x48d)], _0x1a4f57 = this[_0x3c9943(0x3d7)](_0x2db877); switch (_0x1591c2) { case 'ignore': if (_0x1a4f57 <= 0x0) this[_0x3c9943(0x403)][_0x2db877] = _0x4a017f; break; case _0x3c9943(0x2bf): this['_buffTurns'][_0x2db877] = _0x4a017f; break; case _0x3c9943(0x404): this['_buffTurns'][_0x2db877] = Math[_0x3c9943(0x466)](_0x1a4f57, _0x4a017f); break; case _0x3c9943(0x50e): this[_0x3c9943(0x403)][_0x2db877] += _0x4a017f; break; default: VisuMZ[_0x3c9943(0x3eb)][_0x3c9943(0x2c5)]['call'](this, _0x2db877, _0x4a017f); break; }const _0x3ff7d8 = VisuMZ[_0x3c9943(0x3eb)][_0x3c9943(0x2e9)][_0x3c9943(0x384)][_0x3c9943(0x3d2)]; this[_0x3c9943(0x403)][_0x2db877] = this[_0x3c9943(0x403)][_0x2db877][_0x3c9943(0x1fb)](0x0, _0x3ff7d8); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x38b)] = function () { const _0x15b385 = _0x183653; if (this[_0x15b385(0x2ac)][_0x15b385(0x339)] !== undefined) return this['_cache'][_0x15b385(0x339)]; this[_0x15b385(0x2ac)]['groupDefeat'] = ![]; const _0x4df34d = this['states'](); for (const _0x4d68da of _0x4df34d) { if ('cCkmg' !== _0x15b385(0x326)) { if (!_0x2e60ab[_0x15b385(0x232)]) return ![]; else return this['isUseSkillsStatesCoreUpdatedLayout']() ? !![] : _0x4377ac[_0x15b385(0x3eb)]['Settings'][_0x15b385(0x3c2)]['ShowShopStatus']; } else { if (!_0x4d68da) continue; if (_0x4d68da[_0x15b385(0x25b)]['match'](/<GROUP DEFEAT>/i)) { if (_0x15b385(0x294) === _0x15b385(0x308)) { const _0xd9bdb8 = _0x2bd55e[_0x15b385(0x3ee)]('[' + _0x271805['$1'][_0x15b385(0x3c7)](/\d+/g) + ']'); for (const _0x1a4921 of _0xd9bdb8) { if (_0x437337['value'](_0x1a4921)) return ![]; } return !![]; } else { this[_0x15b385(0x2ac)]['groupDefeat'] = !![]; break; } } } } return this['_cache'][_0x15b385(0x339)]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1f1)] = Game_Unit[_0x183653(0x506)][_0x183653(0x33f)], Game_Unit[_0x183653(0x506)][_0x183653(0x33f)] = function () { const _0x4377a4 = _0x183653; let _0x147aca = VisuMZ[_0x4377a4(0x3eb)][_0x4377a4(0x1f1)][_0x4377a4(0x41a)](this); return BattleManager['_endingBattle'] && (_0x147aca = _0x147aca[_0x4377a4(0x4e3)](this[_0x4377a4(0x49e)]()[_0x4377a4(0x32e)](_0x2962af => _0x2962af[_0x4377a4(0x38b)]()))), _0x147aca; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x366)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x341)], Game_BattlerBase['prototype'][_0x183653(0x341)] = function () { const _0x3eaca8 = _0x183653; this['getStateRetainType']() !== '' ? _0x3eaca8(0x353) === _0x3eaca8(0x21c) ? this[_0x3eaca8(0x3c3)](_0xd8255e, _0x16ee3c) : this[_0x3eaca8(0x337)]() : (VisuMZ['SkillsStatesCore'][_0x3eaca8(0x366)][_0x3eaca8(0x41a)](this), this[_0x3eaca8(0x37d)]()); }, Game_Actor[_0x183653(0x506)][_0x183653(0x341)] = function () { const _0x21a0be = _0x183653; this[_0x21a0be(0x2b2)] = this[_0x21a0be(0x2b2)] || {}, Game_Battler[_0x21a0be(0x506)][_0x21a0be(0x341)][_0x21a0be(0x41a)](this); }, Game_BattlerBase[_0x183653(0x506)]['clearStatesWithStateRetain'] = function () { const _0x4135a4 = _0x183653, _0x442bd3 = this[_0x4135a4(0x3a4)](); for (const _0x364782 of _0x442bd3) { if (_0x364782 && this[_0x4135a4(0x470)](_0x364782)) this['eraseState'](_0x364782['id']); } this[_0x4135a4(0x2ac)] = {}; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x470)] = function (_0xe01539) { const _0x3e52fe = _0x183653, _0x173048 = this[_0x3e52fe(0x511)](); if (_0x173048 !== '') { const _0x1bc3fc = _0xe01539[_0x3e52fe(0x25b)]; if (_0x173048 === _0x3e52fe(0x39d) && _0x1bc3fc['match'](/<NO DEATH CLEAR>/i)) return ![]; if (_0x173048 === _0x3e52fe(0x2d4) && _0x1bc3fc[_0x3e52fe(0x3c7)](/<NO RECOVER ALL CLEAR>/i)) return ![]; } return this[_0x3e52fe(0x23a)](_0xe01539['id']); }, Game_BattlerBase['prototype']['getStateRetainType'] = function () { const _0x3f688c = _0x183653; return this[_0x3f688c(0x311)]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x3f9)] = function (_0xc00b9e) { const _0x35d809 = _0x183653; this[_0x35d809(0x311)] = _0xc00b9e; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2b6)] = function () { const _0x22b6b4 = _0x183653; this[_0x22b6b4(0x311)] = ''; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x307)] = Game_BattlerBase['prototype'][_0x183653(0x1bd)], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x1bd)] = function () { const _0xf58a2 = _0x183653; this['setStateRetainType'](_0xf58a2(0x39d)), VisuMZ[_0xf58a2(0x3eb)][_0xf58a2(0x307)][_0xf58a2(0x41a)](this), this[_0xf58a2(0x2b6)](); }, VisuMZ['SkillsStatesCore'][_0x183653(0x223)] = Game_BattlerBase['prototype'][_0x183653(0x47d)], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x47d)] = function () { const _0x38a981 = _0x183653; this[_0x38a981(0x3f9)](_0x38a981(0x2d4)), VisuMZ['SkillsStatesCore'][_0x38a981(0x223)][_0x38a981(0x41a)](this), this[_0x38a981(0x2b6)](); }, Game_BattlerBase['prototype'][_0x183653(0x3bd)] = function (_0x2217c5, _0x5c55d2, _0x2ae163) { return _0x5c55d2; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2ee)] = function (_0x5f2e52) { const _0x3bb9ec = _0x183653; for (settings of VisuMZ[_0x3bb9ec(0x3eb)]['Settings'][_0x3bb9ec(0x2d1)]) { if (_0x3bb9ec(0x21e) !== _0x3bb9ec(0x21e)) return _0x38b312[_0x3bb9ec(0x3eb)][_0x3bb9ec(0x2e9)][_0x3bb9ec(0x2df)]['LabelOutlineWidth'] || 0x0; else { let _0x5ec68b = settings['CalcJS'][_0x3bb9ec(0x41a)](this, _0x5f2e52); _0x5ec68b = this[_0x3bb9ec(0x3bd)](_0x5f2e52, _0x5ec68b, settings); if (!settings[_0x3bb9ec(0x1b6)][_0x3bb9ec(0x41a)](this, _0x5f2e52, _0x5ec68b)) return ![]; } } return !![]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x303)] = function (_0x1e006e) { const _0x13c64f = _0x183653; for (settings of VisuMZ[_0x13c64f(0x3eb)][_0x13c64f(0x2e9)][_0x13c64f(0x2d1)]) { if (_0x13c64f(0x3e3) !== 'WMuZZ') { const _0x9f9e0d = _0x4f9a20[_0x13c64f(0x3eb)][_0x13c64f(0x2e9)]['Buffs']['MaxTurns']; this[_0x13c64f(0x403)][_0x86333a] = _0x177658[_0x13c64f(0x1fb)](0x0, _0x9f9e0d); } else { let _0x19c3eb = settings[_0x13c64f(0x47a)]['call'](this, _0x1e006e); _0x19c3eb = this[_0x13c64f(0x3bd)](_0x1e006e, _0x19c3eb, settings), settings['PayJS'][_0x13c64f(0x41a)](this, _0x1e006e, _0x19c3eb); } } }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x458)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x38f)], Game_BattlerBase[_0x183653(0x506)]['meetsSkillConditions'] = function (_0x15b4b8) { const _0x49011f = _0x183653; if (!_0x15b4b8) return ![]; if (!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions']['call'](this, _0x15b4b8)) return ![]; if (!this['checkSkillConditionsNotetags'](_0x15b4b8)) return ![]; if (!this[_0x49011f(0x203)](_0x15b4b8)) return ![]; if (!this[_0x49011f(0x4da)](_0x15b4b8)) return ![]; return !![]; }, Game_BattlerBase['prototype'][_0x183653(0x4a8)] = function (_0x2f3e6f) { const _0x1bc145 = _0x183653; if (!this[_0x1bc145(0x210)](_0x2f3e6f)) return ![]; return !![]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x210)] = function (_0x3670bc) { const _0x3f09f3 = _0x183653, _0x2c9c18 = _0x3670bc[_0x3f09f3(0x25b)]; if (_0x2c9c18[_0x3f09f3(0x3c7)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if ('PQjLT' !== _0x3f09f3(0x329)) _0x319b79['SkillsStatesCore'][_0x3f09f3(0x485)]['call'](this, _0x54f9fd, _0x2ab249), this[_0x3f09f3(0x1c7)](_0x51ac26) && this[_0x3f09f3(0x3c3)](_0x725ba5, _0x4c6f7c); else { const _0x2d6c4c = JSON['parse']('[' + RegExp['$1'][_0x3f09f3(0x3c7)](/\d+/g) + ']'); for (const _0x141989 of _0x2d6c4c) { if (!$gameSwitches[_0x3f09f3(0x222)](_0x141989)) return ![]; } return !![]; } } if (_0x2c9c18[_0x3f09f3(0x3c7)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x453213 = JSON[_0x3f09f3(0x3ee)]('[' + RegExp['$1']['match'](/\d+/g) + ']'); for (const _0x1758cd of _0x453213) { if (!$gameSwitches[_0x3f09f3(0x222)](_0x1758cd)) return ![]; } return !![]; } if (_0x2c9c18[_0x3f09f3(0x3c7)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x5a6d8c = JSON['parse']('[' + RegExp['$1']['match'](/\d+/g) + ']'); for (const _0xb33eb2 of _0x5a6d8c) { if ($gameSwitches[_0x3f09f3(0x222)](_0xb33eb2)) return !![]; } return ![]; } if (_0x2c9c18[_0x3f09f3(0x3c7)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x257d87 = JSON[_0x3f09f3(0x3ee)]('[' + RegExp['$1'][_0x3f09f3(0x3c7)](/\d+/g) + ']'); for (const _0x45b5fc of _0x257d87) { if ('iqMPr' !== _0x3f09f3(0x3b9)) { if (!$gameSwitches[_0x3f09f3(0x222)](_0x45b5fc)) return !![]; } else { const _0x32e24a = _0x1705f3[_0x3f09f3(0x3eb)][_0x3f09f3(0x2e9)][_0x3f09f3(0x368)][_0x3f09f3(0x4ba)]; this[_0x3f09f3(0x2ac)][_0x3f09f3(0x430)] = this[_0x3f09f3(0x2ac)][_0x3f09f3(0x430)][_0x3f09f3(0x4e3)](_0x32e24a); } } return ![]; } if (_0x2c9c18['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x25a3fc = JSON[_0x3f09f3(0x3ee)]('[' + RegExp['$1'][_0x3f09f3(0x3c7)](/\d+/g) + ']'); for (const _0x2f6375 of _0x25a3fc) { if (_0x3f09f3(0x4d4) !== _0x3f09f3(0x4d4)) return !this[_0x3f09f3(0x35b)](_0x8e021e) && !this['isStateRestrict'](_0x42bdd3) && !this[_0x3f09f3(0x494)]['isStateRemoved'](_0x3b1f9f); else { if (!$gameSwitches[_0x3f09f3(0x222)](_0x2f6375)) return !![]; } } return ![]; } if (_0x2c9c18[_0x3f09f3(0x3c7)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x488b66 = JSON['parse']('[' + RegExp['$1']['match'](/\d+/g) + ']'); for (const _0x273112 of _0x488b66) { if ($gameSwitches[_0x3f09f3(0x222)](_0x273112)) return ![]; } return !![]; } return !![]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x203)] = function (_0x548137) { const _0x44b2bd = _0x183653, _0x23b901 = _0x548137[_0x44b2bd(0x25b)], _0x323c38 = VisuMZ[_0x44b2bd(0x3eb)][_0x44b2bd(0x29a)]; return _0x323c38[_0x548137['id']] ? _0x323c38[_0x548137['id']]['call'](this, _0x548137) : !![]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x4da)] = function (_0x164116) { const _0x49bc41 = _0x183653; return VisuMZ[_0x49bc41(0x3eb)]['Settings'][_0x49bc41(0x3c2)][_0x49bc41(0x43c)][_0x49bc41(0x41a)](this, _0x164116); }, VisuMZ[_0x183653(0x3eb)]['Game_BattlerBase_skillMpCost'] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x432)], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x432)] = function (_0xd78c34) { const _0x4a71a6 = _0x183653; for (settings of VisuMZ['SkillsStatesCore']['Settings']['Costs']) { if (settings[_0x4a71a6(0x289)][_0x4a71a6(0x332)]() === 'MP') { let _0x4a9e58 = settings[_0x4a71a6(0x47a)]['call'](this, _0xd78c34); return _0x4a9e58 = this[_0x4a71a6(0x3bd)](_0xd78c34, _0x4a9e58, settings), _0x4a9e58; } } return VisuMZ['SkillsStatesCore'][_0x4a71a6(0x1e4)][_0x4a71a6(0x41a)](this, _0xd78c34); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x25c)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x29b)], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x29b)] = function (_0x5e9964) { const _0x31265c = _0x183653; for (settings of VisuMZ['SkillsStatesCore'][_0x31265c(0x2e9)]['Costs']) { if (settings['Name']['toUpperCase']() === 'TP') { let _0x46b7a0 = settings[_0x31265c(0x47a)][_0x31265c(0x41a)](this, _0x5e9964); return _0x46b7a0 = this[_0x31265c(0x3bd)](_0x5e9964, _0x46b7a0, settings), _0x46b7a0; } } return VisuMZ[_0x31265c(0x3eb)][_0x31265c(0x25c)][_0x31265c(0x41a)](this, _0x5e9964); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x493)] = function (_0xbd00b) { const _0x458571 = _0x183653; if (typeof _0xbd00b === 'number') _0xbd00b = $dataStates[_0xbd00b]; return this[_0x458571(0x3a4)]()[_0x458571(0x206)](_0xbd00b); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x2a3)] = Game_BattlerBase['prototype']['states'], Game_BattlerBase[_0x183653(0x506)]['states'] = function () { const _0x40f2cf = _0x183653; let _0x5f3163 = VisuMZ[_0x40f2cf(0x3eb)][_0x40f2cf(0x2a3)][_0x40f2cf(0x41a)](this); if ($gameTemp[_0x40f2cf(0x1c3)]) return _0x5f3163; return $gameTemp[_0x40f2cf(0x1c3)] = !![], this[_0x40f2cf(0x248)](_0x5f3163), $gameTemp[_0x40f2cf(0x1c3)] = undefined, _0x5f3163; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x248)] = function (_0x359d4b) { const _0x38bff5 = _0x183653, _0x191025 = this[_0x38bff5(0x430)](); for (state of _0x191025) { if (!state) continue; if (!this[_0x38bff5(0x49b)](state) && _0x359d4b[_0x38bff5(0x206)](state)) continue; _0x359d4b[_0x38bff5(0x309)](state); } if (_0x191025[_0x38bff5(0x4fc)] > 0x0) { if (_0x38bff5(0x220) !== _0x38bff5(0x220)) { const _0x49f94b = _0x25f986(_0x2a6183['$1']), _0x267e1e = _0x38bff5(0x278)['format'](_0x49f94b); _0x16c8ea[_0x38bff5(0x3eb)][_0x38bff5(0x468)][_0x5d7a7f['id']] = new _0x3322ba(_0x38bff5(0x3ab), _0x267e1e); } else _0x359d4b[_0x38bff5(0x467)]((_0x9d4481, _0x20c0b9) => { const _0x3f76f0 = _0x38bff5, _0x545423 = _0x9d4481[_0x3f76f0(0x2af)], _0x28ab86 = _0x20c0b9[_0x3f76f0(0x2af)]; if (_0x545423 !== _0x28ab86) return _0x28ab86 - _0x545423; return _0x9d4481 - _0x20c0b9; }); } }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x49b)] = function (_0x26d627) { const _0x15dc10 = _0x183653; return _0x26d627[_0x15dc10(0x25b)][_0x15dc10(0x3c7)](/<PASSIVE STACKABLE>/i); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x334)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x3e5)], Game_BattlerBase['prototype'][_0x183653(0x3e5)] = function (_0x3f8058) { const _0x4bbebe = _0x183653; this[_0x4bbebe(0x28c)] = !![]; let _0x561be7 = VisuMZ[_0x4bbebe(0x3eb)][_0x4bbebe(0x334)][_0x4bbebe(0x41a)](this, _0x3f8058); return this[_0x4bbebe(0x28c)] = undefined, _0x561be7; }, Game_BattlerBase[_0x183653(0x506)]['convertPassiveStates'] = function () { const _0x913f7b = _0x183653; let _0x10c40b = []; this[_0x913f7b(0x49a)] = this['_passiveStateResults'] || {}; for (; ;) { _0x10c40b = []; let _0x412af2 = !![]; for (const _0x4e22c0 of this['_cache'][_0x913f7b(0x430)]) { if (_0x913f7b(0x388) !== 'uzTBW') { const _0x55d8f3 = $dataStates[_0x4e22c0]; if (!_0x55d8f3) continue; let _0x18b5f3 = this[_0x913f7b(0x411)](_0x55d8f3); this[_0x913f7b(0x49a)][_0x4e22c0] !== _0x18b5f3 && (_0x412af2 = ![], this[_0x913f7b(0x49a)][_0x4e22c0] = _0x18b5f3); if (!_0x18b5f3) continue; _0x10c40b[_0x913f7b(0x309)](_0x55d8f3); } else return _0x913f7b(0x281); } if (_0x412af2) { if ('OEwKe' === _0x913f7b(0x324)) break; else this[_0x913f7b(0x33d)][_0x913f7b(0x417)] = _0x31c704[_0x913f7b(0x38e)](), this[_0x913f7b(0x33d)][_0x913f7b(0x37e)] = _0x138ea2['mainFontSize'](), this[_0x913f7b(0x215)](); } else { if (_0x913f7b(0x4d8) !== _0x913f7b(0x434)) { if (!this['_checkingTraitsSetSkillsStatesCore']) this['refresh'](); this[_0x913f7b(0x41c)](); } else this['isStateExpired'](_0x35624c['id']) && _0xc2e807[_0x913f7b(0x246)] === _0x3ae9db && (this[_0x913f7b(0x300)](_0x39c569['id']), this['onExpireState'](_0x74c618['id']), this[_0x913f7b(0x408)](_0x4240c8['id'])); } } return _0x10c40b; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x411)] = function (_0x1e1804) { const _0x2b4b3a = _0x183653; if (!this[_0x2b4b3a(0x390)](_0x1e1804)) return ![]; if (!this[_0x2b4b3a(0x305)](_0x1e1804)) return ![]; if (!this[_0x2b4b3a(0x399)](_0x1e1804)) return ![]; if (!this[_0x2b4b3a(0x2c0)](_0x1e1804)) return ![]; return !![]; }, Game_BattlerBase['prototype'][_0x183653(0x390)] = function (_0x3172e0) { return !![]; }, Game_Actor[_0x183653(0x506)][_0x183653(0x390)] = function (_0x14df33) { const _0x4dddbc = _0x183653, _0x3b0aa8 = DataManager[_0x4dddbc(0x20b)](_0x14df33); if (_0x3b0aa8[_0x4dddbc(0x360)][_0x4dddbc(0x4fc)] > 0x0) { const _0x3f510a = _0x3b0aa8['currentClass']; if (!_0x3f510a[_0x4dddbc(0x206)](this[_0x4dddbc(0x360)]())) return ![]; } if (_0x3b0aa8[_0x4dddbc(0x284)][_0x4dddbc(0x4fc)] > 0x0) { const _0x150ce5 = _0x3b0aa8[_0x4dddbc(0x284)]; let _0x323f69 = [this['currentClass']()]; Imported[_0x4dddbc(0x274)] && this[_0x4dddbc(0x213)] && (_0x323f69 = this[_0x4dddbc(0x213)]()); if (_0x150ce5['filter'](_0x336a5 => _0x323f69[_0x4dddbc(0x206)](_0x336a5))['length'] <= 0x0) return ![]; } return Game_BattlerBase[_0x4dddbc(0x506)][_0x4dddbc(0x390)][_0x4dddbc(0x41a)](this, _0x14df33); }, DataManager['getPassiveStateConditionClassesData'] = function (_0x29ff5b) { const _0x21d2c8 = _0x183653, _0x531459 = { 'currentClass': [], 'multiClass': [] }; if (!_0x29ff5b) return _0x531459; this[_0x21d2c8(0x4df)] = this[_0x21d2c8(0x4df)] || {}; if (this[_0x21d2c8(0x4df)][_0x29ff5b['id']] !== undefined) { if (_0x21d2c8(0x1d0) === _0x21d2c8(0x1d0)) return this[_0x21d2c8(0x4df)][_0x29ff5b['id']]; else _0x54ecab[_0x21d2c8(0x3eb)][_0x21d2c8(0x366)][_0x21d2c8(0x41a)](this), this[_0x21d2c8(0x37d)](); } const _0x5b9942 = _0x29ff5b[_0x21d2c8(0x25b)] || ''; if (_0x5b9942['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)) { if (_0x21d2c8(0x482) !== _0x21d2c8(0x482)) this['applyStateCategoryRemovalEffects'](_0xf01726), this[_0x21d2c8(0x342)](_0x55860f), this[_0x21d2c8(0x424)](_0x27c88a), this[_0x21d2c8(0x258)](_0x35d303); else { const _0x2525b7 = String(RegExp['$1'])['split'](',')['map'](_0x4fd082 => _0x4fd082[_0x21d2c8(0x420)]()); _0x531459[_0x21d2c8(0x360)] = VisuMZ[_0x21d2c8(0x3eb)][_0x21d2c8(0x321)](_0x2525b7); } } if (_0x5b9942[_0x21d2c8(0x3c7)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)) { const _0x45eaed = String(RegExp['$1'])[_0x21d2c8(0x212)](',')[_0x21d2c8(0x272)](_0x4a8cbf => _0x4a8cbf[_0x21d2c8(0x420)]()); _0x531459[_0x21d2c8(0x284)] = VisuMZ[_0x21d2c8(0x3eb)][_0x21d2c8(0x321)](_0x45eaed); } return this[_0x21d2c8(0x4df)][_0x29ff5b['id']] = _0x531459, this[_0x21d2c8(0x4df)][_0x29ff5b['id']]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x321)] = function (_0x442999) { const _0xe27cb = _0x183653, _0x57e04c = []; for (let _0x3b2f50 of _0x442999) { _0x3b2f50 = (String(_0x3b2f50) || '')['trim'](); const _0x58fbf9 = /^\d+$/[_0xe27cb(0x1c1)](_0x3b2f50); if (_0x58fbf9) _0x57e04c['push'](Number(_0x3b2f50)); else { if (_0xe27cb(0x21b) === _0xe27cb(0x21b)) _0x57e04c[_0xe27cb(0x309)](DataManager['getClassIdWithName'](_0x3b2f50)); else { if (!this['checkSkillConditionsSwitchNotetags'](_0x5f14da)) return ![]; return !![]; } } } return _0x57e04c[_0xe27cb(0x272)](_0x4820c1 => $dataClasses[Number(_0x4820c1)])[_0xe27cb(0x1fe)](null); }, Game_BattlerBase['prototype'][_0x183653(0x305)] = function (_0x26dc94) { const _0x9e6e85 = _0x183653, _0x52a785 = DataManager[_0x9e6e85(0x3b4)](_0x26dc94); if (_0x52a785['allSwitchOn'] && _0x52a785['allSwitchOn'][_0x9e6e85(0x4fc)] > 0x0) { if ('DdEmn' === _0x9e6e85(0x446)) { const _0x12942e = this[_0x9e6e85(0x375)][_0x2b8ca8]; this[_0x9e6e85(0x255)](_0xd22323); if (_0x12942e > 0x0) this[_0x9e6e85(0x331)](_0x2a79a7); if (_0x12942e < 0x0) this[_0x9e6e85(0x3be)](_0x53daff); } else { const _0x17fd74 = _0x52a785[_0x9e6e85(0x4af)]; for (const _0xc7b2c1 of _0x17fd74) { if (!$gameSwitches[_0x9e6e85(0x222)](_0xc7b2c1)) return ![]; } } } if (_0x52a785[_0x9e6e85(0x3bf)] && _0x52a785[_0x9e6e85(0x3bf)][_0x9e6e85(0x4fc)] > 0x0) { const _0x19673a = _0x52a785['anySwitchOn']; let _0x4ac14d = !![]; for (const _0x5d332d of _0x19673a) { if ($gameSwitches[_0x9e6e85(0x222)](_0x5d332d)) { _0x4ac14d = ![]; break; } } if (_0x4ac14d) return ![]; } if (_0x52a785[_0x9e6e85(0x27b)] && _0x52a785['allSwitchOff']['length'] > 0x0) { const _0x192e3b = _0x52a785['allSwitchOff']; for (const _0x3aec48 of _0x192e3b) { if (_0x9e6e85(0x306) === _0x9e6e85(0x306)) { if ($gameSwitches[_0x9e6e85(0x222)](_0x3aec48)) return ![]; } else return _0x81858['SkillsStatesCore']['Settings'][_0x9e6e85(0x30e)]['ColorNegative']; } } if (_0x52a785['anySwitchOff'] && _0x52a785[_0x9e6e85(0x2c4)][_0x9e6e85(0x4fc)] > 0x0) { const _0x17b608 = _0x52a785['anySwitchOff']; let _0x374f33 = !![]; for (const _0x4283f1 of _0x17b608) { if (_0x9e6e85(0x252) !== _0x9e6e85(0x4ed)) { if (!$gameSwitches[_0x9e6e85(0x222)](_0x4283f1)) { _0x374f33 = ![]; break; } } else { if (!_0x1c834d[_0x9e6e85(0x222)](_0x21c22c)) return !![]; } } if (_0x374f33) return ![]; } return !![]; }, DataManager[_0x183653(0x3b4)] = function (_0x72dd08) { const _0x212dcc = _0x183653; let _0x2fae19 = { 'allSwitchOn': [], 'anySwitchOn': [], 'allSwitchOff': [], 'anySwitchOff': [] }; if (!_0x72dd08) return _0x2fae19; const _0x52d45d = _0x72dd08['id']; this[_0x212dcc(0x4b1)] = this[_0x212dcc(0x4b1)] || {}; if (this[_0x212dcc(0x4b1)][_0x52d45d] !== undefined) return this['_cache_getPassiveStateConditionSwitchData'][_0x52d45d]; const _0x4521ee = _0x72dd08[_0x212dcc(0x25b)] || ''; _0x4521ee['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i) && (_0x2fae19['allSwitchOn'] = String(RegExp['$1'])[_0x212dcc(0x212)](',')[_0x212dcc(0x272)](_0x1c5e5e => Number(_0x1c5e5e))); if (_0x4521ee['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)) { if (_0x212dcc(0x277) === _0x212dcc(0x277)) _0x2fae19[_0x212dcc(0x3bf)] = String(RegExp['$1'])[_0x212dcc(0x212)](',')['map'](_0x25b90f => Number(_0x25b90f)); else { const _0xd477c5 = _0x136a19[_0x212dcc(0x39b)](_0x47c773['$1']); if (_0xd74b7[_0x212dcc(0x23a)](_0xd477c5)) return !![]; } } return _0x4521ee[_0x212dcc(0x3c7)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i) && (_0x2fae19[_0x212dcc(0x27b)] = String(RegExp['$1'])[_0x212dcc(0x212)](',')['map'](_0x3d1640 => Number(_0x3d1640))), _0x4521ee[_0x212dcc(0x3c7)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i) && (_0x212dcc(0x441) === _0x212dcc(0x441) ? _0x2fae19[_0x212dcc(0x2c4)] = String(RegExp['$1'])[_0x212dcc(0x212)](',')[_0x212dcc(0x272)](_0x595c7f => Number(_0x595c7f)) : (_0xad61b5 = _0x4d5387(_0x303f79['$1']), _0x5c13f8 = _0x52f39f(_0x35353c['$2']))), this[_0x212dcc(0x4b1)][_0x52d45d] = _0x2fae19, this[_0x212dcc(0x4b1)][_0x52d45d]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x399)] = function (_0x1af7a6) { const _0x1144e9 = _0x183653, _0x4d79f6 = VisuMZ[_0x1144e9(0x3eb)][_0x1144e9(0x468)]; if (_0x4d79f6[_0x1af7a6['id']] && !_0x4d79f6[_0x1af7a6['id']]['call'](this, _0x1af7a6)) return ![]; return !![]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2c0)] = function (_0x45db85) { const _0x2347ca = _0x183653; return VisuMZ[_0x2347ca(0x3eb)][_0x2347ca(0x2e9)][_0x2347ca(0x368)][_0x2347ca(0x362)]['call'](this, _0x45db85); }, Game_BattlerBase['prototype'][_0x183653(0x430)] = function () { const _0x496c03 = _0x183653; if (this['checkCacheKey'](_0x496c03(0x430))) return this[_0x496c03(0x3b2)](); if (this[_0x496c03(0x23f)]) return []; return this[_0x496c03(0x23f)] = !![], this[_0x496c03(0x41c)](), this[_0x496c03(0x23f)] = undefined, this[_0x496c03(0x3b2)](); }, Game_BattlerBase[_0x183653(0x506)]['createPassiveStatesCache'] = function () { const _0x1227ab = _0x183653; this[_0x1227ab(0x23f)] = !![], this[_0x1227ab(0x2ac)][_0x1227ab(0x430)] = [], this[_0x1227ab(0x207)](), this[_0x1227ab(0x456)](), this[_0x1227ab(0x4c5)](), this[_0x1227ab(0x2ac)][_0x1227ab(0x430)] = this[_0x1227ab(0x2ac)]['passiveStates']['sort']((_0xb123b5, _0x4e9fdc) => _0xb123b5 - _0x4e9fdc), this['_checkingVisuMzPassiveStateObjects'] = undefined; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x207)] = function () { const _0x3f426d = _0x183653; if (Imported[_0x3f426d(0x1e8)]) this[_0x3f426d(0x3c8)](); }, Game_BattlerBase['prototype']['passiveStateObjects'] = function () { return []; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x456)] = function () { const _0x439bf3 = _0x183653, _0x548e48 = this[_0x439bf3(0x2ac)][_0x439bf3(0x430)] || [], _0x37e628 = this[_0x439bf3(0x1eb)](); this[_0x439bf3(0x2ac)][_0x439bf3(0x430)] = _0x548e48 || []; for (const _0x9a7cc9 of _0x37e628) { if (!_0x9a7cc9) continue; const _0x4e0edd = DataManager['getPassiveStatesFromObj'](_0x9a7cc9); for (const _0x4374b1 of _0x4e0edd) { if (_0x439bf3(0x2a2) !== _0x439bf3(0x218)) this[_0x439bf3(0x2ac)][_0x439bf3(0x430)][_0x439bf3(0x309)](_0x4374b1); else { const _0x5dc118 = _0x330629['parse']('[' + _0x3e1ca6['$1'][_0x439bf3(0x3c7)](/\d+/g) + ']'); for (const _0x342951 of _0x5dc118) { if (!_0x1555a9[_0x439bf3(0x2e8)](_0x342951)) return !![]; } return ![]; } } } }, DataManager['getPassiveStatesFromObj'] = function (_0x5dfc66) { const _0x5cfc0b = _0x183653; if (!_0x5dfc66) return []; const _0x1f31e2 = VisuMZ[_0x5cfc0b(0x3eb)]['createKeyJS'](_0x5dfc66, _0x5cfc0b(0x38c)); this[_0x5cfc0b(0x270)] = this[_0x5cfc0b(0x270)] || {}; if (this[_0x5cfc0b(0x270)][_0x1f31e2] !== undefined) return this['_cache_getPassiveStatesFromObj'][_0x1f31e2]; const _0x4e6c0e = [], _0x23175c = _0x5dfc66['note'] || '', _0x3838f4 = /<PASSIVE (?:STATE|STATES):[ ](.*)>/gi, _0x78dcf8 = _0x23175c[_0x5cfc0b(0x3c7)](_0x3838f4); if (_0x78dcf8) for (const _0x38f26e of _0x78dcf8) { if ('UVQAm' === 'UVQAm') { _0x38f26e[_0x5cfc0b(0x3c7)](_0x3838f4); const _0x1a0c97 = String(RegExp['$1'])['split'](',')[_0x5cfc0b(0x272)](_0x36afac => _0x36afac[_0x5cfc0b(0x420)]()); for (const _0x4ff80e of _0x1a0c97) { const _0x362062 = /^\d+$/[_0x5cfc0b(0x1c1)](_0x4ff80e); let _0x2a9706 = 0x0; if (_0x362062) { if (_0x5cfc0b(0x1e1) === _0x5cfc0b(0x1c9)) { const _0x27088d = _0x5cfc0b(0x4be); this[_0x5cfc0b(0x461)] = this[_0x5cfc0b(0x461)] || {}; if (this[_0x5cfc0b(0x461)][_0x27088d]) return this[_0x5cfc0b(0x461)][_0x27088d]; const _0xea62f5 = _0x1c441f[_0x5cfc0b(0x3eb)][_0x5cfc0b(0x2e9)][_0x5cfc0b(0x384)][_0x5cfc0b(0x4ce)]; return this[_0x5cfc0b(0x325)](_0x27088d, _0xea62f5); } else _0x2a9706 = Number(_0x4ff80e); } else { if (_0x5cfc0b(0x4cb) !== _0x5cfc0b(0x4cb)) return this['textColor'](_0x4efed2(_0x2e56f4)); else _0x2a9706 = DataManager['getStateIdWithName'](_0x4ff80e); } _0x2a9706 && _0x4e6c0e[_0x5cfc0b(0x309)](_0x2a9706); } } else return this[_0x5cfc0b(0x4b9)]['GaugeCurrentJS']['call'](this['_battler']); } return this[_0x5cfc0b(0x270)][_0x1f31e2] = _0x4e6c0e, this[_0x5cfc0b(0x270)][_0x1f31e2]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x4c5)] = function () { const _0x39bc69 = _0x183653, _0xd1c3be = VisuMZ[_0x39bc69(0x3eb)][_0x39bc69(0x2e9)]['PassiveStates']['Global']; this[_0x39bc69(0x2ac)][_0x39bc69(0x430)] = this[_0x39bc69(0x2ac)]['passiveStates'][_0x39bc69(0x4e3)](_0xd1c3be); }, Game_BattlerBase['prototype'][_0x183653(0x4a1)] = function (_0x3c1e06) { const _0x3bfe7d = _0x183653; if (typeof _0x3c1e06 !== _0x3bfe7d(0x316)) _0x3c1e06 = _0x3c1e06['id']; return this[_0x3bfe7d(0x451)][_0x3c1e06] || 0x0; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x1c4)] = function (_0x191d27, _0x49e022) { const _0x1072c2 = _0x183653; if (typeof _0x191d27 !== _0x1072c2(0x316)) _0x191d27 = _0x191d27['id']; if (this['isStateAffected'](_0x191d27)) { const _0x7ac104 = DataManager[_0x1072c2(0x4a4)](_0x191d27); this[_0x1072c2(0x451)][_0x191d27] = _0x49e022[_0x1072c2(0x1fb)](0x0, _0x7ac104); if (this[_0x1072c2(0x451)][_0x191d27] <= 0x0) this[_0x1072c2(0x300)](_0x191d27); } }, Game_BattlerBase['prototype']['addStateTurns'] = function (_0x5f41f1, _0x22daab) { const _0x4f7b50 = _0x183653; if (typeof _0x5f41f1 !== 'number') _0x5f41f1 = _0x5f41f1['id']; this[_0x4f7b50(0x23a)](_0x5f41f1) && (_0x22daab += this[_0x4f7b50(0x4a1)](_0x5f41f1), this[_0x4f7b50(0x1c4)](_0x5f41f1, _0x22daab)); }, VisuMZ[_0x183653(0x3eb)]['Game_BattlerBase_eraseBuff'] = Game_BattlerBase['prototype'][_0x183653(0x36c)], Game_BattlerBase[_0x183653(0x506)]['eraseBuff'] = function (_0x1773a2) { const _0x2d540e = _0x183653, _0x15946e = this[_0x2d540e(0x375)][_0x1773a2]; VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff'][_0x2d540e(0x41a)](this, _0x1773a2); if (_0x15946e > 0x0) this[_0x2d540e(0x1e6)](_0x1773a2); if (_0x15946e < 0x0) this[_0x2d540e(0x3cb)](_0x1773a2); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1f2)] = Game_BattlerBase[_0x183653(0x506)][_0x183653(0x4c8)], Game_BattlerBase['prototype'][_0x183653(0x4c8)] = function (_0x3004ff) { const _0x1626f5 = _0x183653; VisuMZ[_0x1626f5(0x3eb)][_0x1626f5(0x1f2)][_0x1626f5(0x41a)](this, _0x3004ff); if (!this[_0x1626f5(0x483)](_0x3004ff)) this['eraseBuff'](_0x3004ff); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x4c1)] = Game_BattlerBase[_0x183653(0x506)]['decreaseBuff'], Game_BattlerBase['prototype'][_0x183653(0x32f)] = function (_0x892cad) { const _0x10ab03 = _0x183653; VisuMZ[_0x10ab03(0x3eb)]['Game_BattlerBase_decreaseBuff']['call'](this, _0x892cad); if (!this['isBuffOrDebuffAffected'](_0x892cad)) this[_0x10ab03(0x36c)](_0x892cad); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x1e6)] = function (_0x3173d6) { }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x3cb)] = function (_0x2ae556) { }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x348)] = function (_0x4b7b75) { const _0x254bfb = _0x183653; return this[_0x254bfb(0x375)][_0x4b7b75] === VisuMZ[_0x254bfb(0x3eb)]['Settings'][_0x254bfb(0x384)][_0x254bfb(0x1d2)]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x259)] = function (_0x4da469) { const _0x4865b3 = _0x183653; return this[_0x4865b3(0x375)][_0x4da469] === -VisuMZ[_0x4865b3(0x3eb)][_0x4865b3(0x2e9)]['Buffs'][_0x4865b3(0x4f8)]; }, VisuMZ[_0x183653(0x3eb)]['Game_BattlerBase_buffIconIndex'] = Game_BattlerBase['prototype']['buffIconIndex'], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x27a)] = function (_0x3c04ef, _0x1db0d0) { const _0x518d22 = _0x183653; return _0x3c04ef = _0x3c04ef[_0x518d22(0x1fb)](-0x2, 0x2), VisuMZ[_0x518d22(0x3eb)][_0x518d22(0x40a)][_0x518d22(0x41a)](this, _0x3c04ef, _0x1db0d0); }, Game_BattlerBase[_0x183653(0x506)]['paramBuffRate'] = function (_0x2b81e7) { const _0xa9e9c = _0x183653, _0x1773bc = this[_0xa9e9c(0x375)][_0x2b81e7]; return VisuMZ['SkillsStatesCore'][_0xa9e9c(0x2e9)][_0xa9e9c(0x384)][_0xa9e9c(0x395)][_0xa9e9c(0x41a)](this, _0x2b81e7, _0x1773bc); }, Game_BattlerBase['prototype'][_0x183653(0x3d7)] = function (_0x44ffa5) { const _0x20adf3 = _0x183653; return this[_0x20adf3(0x403)][_0x44ffa5] || 0x0; }, Game_BattlerBase['prototype'][_0x183653(0x25a)] = function (_0x3b39bb) { const _0xd5f649 = _0x183653; return this[_0xd5f649(0x3d7)](_0x3b39bb); }, Game_BattlerBase['prototype'][_0x183653(0x4a5)] = function (_0xc0040f, _0x255576) { const _0x237648 = _0x183653; if (this[_0x237648(0x1c7)](_0xc0040f)) { const _0x2b36a9 = VisuMZ[_0x237648(0x3eb)]['Settings'][_0x237648(0x384)]['MaxTurns']; this[_0x237648(0x403)][_0xc0040f] = _0x255576[_0x237648(0x1fb)](0x0, _0x2b36a9); } }, Game_BattlerBase['prototype'][_0x183653(0x3b5)] = function (_0x15b0af, _0x4d7700) { const _0x41047c = _0x183653; this[_0x41047c(0x1c7)](_0x15b0af) && (_0x4d7700 += this[_0x41047c(0x3d7)](stateId), this[_0x41047c(0x4a5)](_0x15b0af, _0x4d7700)); }, Game_BattlerBase[_0x183653(0x506)]['setDebuffTurns'] = function (_0x4a3aec, _0x30076b) { const _0x2261be = _0x183653; if (this[_0x2261be(0x236)](_0x4a3aec)) { const _0x54bdb2 = VisuMZ[_0x2261be(0x3eb)][_0x2261be(0x2e9)]['Buffs'][_0x2261be(0x3d2)]; this[_0x2261be(0x403)][_0x4a3aec] = _0x30076b[_0x2261be(0x1fb)](0x0, _0x54bdb2); } }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2e6)] = function (_0x199bd4, _0x45f1b5) { this['isDebuffAffected'](_0x199bd4) && (_0x45f1b5 += this['buffTurns'](stateId), this['setDebuffTurns'](_0x199bd4, _0x45f1b5)); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x1ec)] = function (_0x2963ad) { const _0x61db6d = _0x183653; if (typeof _0x2963ad !== _0x61db6d(0x316)) _0x2963ad = _0x2963ad['id']; return this['_stateData'] = this[_0x61db6d(0x32b)] || {}, this[_0x61db6d(0x32b)][_0x2963ad] = this[_0x61db6d(0x32b)][_0x2963ad] || {}, this[_0x61db6d(0x32b)][_0x2963ad]; }, Game_BattlerBase['prototype'][_0x183653(0x43b)] = function (_0x40ac86, _0x30e371) { const _0x300de2 = _0x183653; if (typeof _0x40ac86 !== _0x300de2(0x316)) _0x40ac86 = _0x40ac86['id']; const _0x49e3ae = this[_0x300de2(0x1ec)](_0x40ac86); return _0x49e3ae[_0x30e371]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x4b3)] = function (_0x220f24, _0x5668bd, _0x239978) { const _0x4d79ae = _0x183653; if (typeof _0x220f24 !== 'number') _0x220f24 = _0x220f24['id']; const _0x22be6c = this[_0x4d79ae(0x1ec)](_0x220f24); _0x22be6c[_0x5668bd] = _0x239978; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x1e9)] = function (_0x26cbb9) { const _0x4ba097 = _0x183653; if (typeof _0x26cbb9 !== _0x4ba097(0x316)) _0x26cbb9 = _0x26cbb9['id']; this[_0x4ba097(0x32b)] = this[_0x4ba097(0x32b)] || {}, this[_0x4ba097(0x32b)][_0x26cbb9] = {}; }, Game_BattlerBase['prototype'][_0x183653(0x386)] = function (_0x295d62) { const _0x356c59 = _0x183653; if (typeof _0x295d62 !== _0x356c59(0x316)) _0x295d62 = _0x295d62['id']; return this[_0x356c59(0x37a)] = this['_stateDisplay'] || {}, this[_0x356c59(0x37a)][_0x295d62] === undefined && (this[_0x356c59(0x37a)][_0x295d62] = ''), this[_0x356c59(0x37a)][_0x295d62]; }, Game_BattlerBase[_0x183653(0x506)]['setStateDisplay'] = function (_0x439a00, _0x153d60) { const _0x3a0c3b = _0x183653; if (typeof _0x439a00 !== _0x3a0c3b(0x316)) _0x439a00 = _0x439a00['id']; this[_0x3a0c3b(0x37a)] = this[_0x3a0c3b(0x37a)] || {}, this[_0x3a0c3b(0x37a)][_0x439a00] = _0x153d60; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x323)] = function (_0x24b406) { const _0x2628b4 = _0x183653; if (typeof _0x24b406 !== _0x2628b4(0x316)) _0x24b406 = _0x24b406['id']; this['_stateDisplay'] = this[_0x2628b4(0x37a)] || {}, this[_0x2628b4(0x37a)][_0x24b406] = ''; }, Game_BattlerBase['prototype'][_0x183653(0x3d4)] = function (_0x162a8e) { const _0x3a5223 = _0x183653; if (typeof _0x162a8e !== _0x3a5223(0x316)) _0x162a8e = _0x162a8e['id']; this[_0x3a5223(0x2a9)] = this[_0x3a5223(0x2a9)] || {}, this[_0x3a5223(0x2a9)][_0x162a8e] = this[_0x3a5223(0x2a9)][_0x162a8e] || _0x3a5223(0x26f); const _0x19be44 = this['_stateOrigin'][_0x162a8e]; return this['getStateOriginByKey'](_0x19be44); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x447)] = function (_0x293c89, _0x238896) { const _0x1b74c0 = _0x183653; this['_stateOrigin'] = this[_0x1b74c0(0x2a9)] || {}; const _0x42c5af = _0x238896 ? this[_0x1b74c0(0x455)](_0x238896) : this[_0x1b74c0(0x268)](); this[_0x1b74c0(0x2a9)][_0x293c89] = _0x42c5af; }, Game_BattlerBase[_0x183653(0x506)]['clearStateOrigin'] = function (_0xc7aaae) { const _0x4b7999 = _0x183653; this[_0x4b7999(0x2a9)] = this[_0x4b7999(0x2a9)] || {}, delete this[_0x4b7999(0x2a9)][_0xc7aaae]; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x2f7)] = function () { const _0x84789 = _0x183653; this[_0x84789(0x2a9)] = {}; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x268)] = function () { const _0x213bba = _0x183653, _0x1ba3bc = this[_0x213bba(0x385)](); return this[_0x213bba(0x455)](_0x1ba3bc); }, Game_BattlerBase['prototype']['getCurrentStateActiveUser'] = function () { const _0x2eeb3d = _0x183653; if ($gameParty[_0x2eeb3d(0x4d6)]()) { if (_0x2eeb3d(0x50d) !== 'zObvO') _0x494526[_0x2eeb3d(0x242)] = _0x231ba0[_0x2eeb3d(0x242)][_0x2eeb3d(0x299)](/\\V\[(\d+)\]/gi, (_0x371a47, _0x3f4d7a) => _0x35e2c2[_0x2eeb3d(0x222)](_0xd3169a(_0x3f4d7a))); else { if (BattleManager[_0x2eeb3d(0x4d2)]) { if (_0x2eeb3d(0x50f) !== _0x2eeb3d(0x41e)) return BattleManager[_0x2eeb3d(0x4d2)]; else { const _0x300621 = this[_0x2eeb3d(0x352)](), _0x52aabe = this[_0x2eeb3d(0x1bf)][_0x2eeb3d(0x30f)], _0x44b390 = this[_0x2eeb3d(0x283)]() ? 0x0 : _0x3642b2['boxWidth'] - this[_0x2eeb3d(0x352)](), _0x1698e0 = this['_itemWindow']['y']; return new _0x20fe73(_0x44b390, _0x1698e0, _0x300621, _0x52aabe); } } else { if (BattleManager['_currentActor']) return BattleManager[_0x2eeb3d(0x201)]; } } } else { const _0x2b0f1a = SceneManager[_0x2eeb3d(0x48e)]; if (![Scene_Map, Scene_Item]['includes'](_0x2b0f1a[_0x2eeb3d(0x355)])) return $gameParty['menuActor'](); } return this; }, Game_BattlerBase[_0x183653(0x506)]['convertTargetToStateOriginKey'] = function (_0x4adfd1) { const _0x2ef10c = _0x183653; if (!_0x4adfd1) return _0x2ef10c(0x26f); if (_0x4adfd1[_0x2ef10c(0x2bc)]()) return _0x2ef10c(0x3e0)['format'](_0x4adfd1['actorId']()); else { const _0x11682a = _0x2ef10c(0x4f0)[_0x2ef10c(0x269)](_0x4adfd1[_0x2ef10c(0x2d7)]()), _0x2035b2 = _0x2ef10c(0x2cf)['format'](_0x4adfd1['index']()), _0x1f7438 = '<troop-%1>'[_0x2ef10c(0x269)]($gameTroop['getCurrentTroopUniqueID']()); return _0x2ef10c(0x45d)['format'](_0x11682a, _0x2035b2, _0x1f7438); } return _0x2ef10c(0x26f); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x3df)] = function (_0x51fabe) { const _0x45b565 = _0x183653; if (_0x51fabe === _0x45b565(0x26f)) return this; else { if (_0x51fabe[_0x45b565(0x3c7)](/<actor-(\d+)>/i)) return $gameActors['actor'](Number(RegExp['$1'])); else { if (_0x45b565(0x459) === 'YkRYH') { const _0x126538 = { 'currentClass': [], 'multiClass': [] }; if (!_0x428538) return _0x126538; this['_cache_getPassiveStateConditionClassesData'] = this[_0x45b565(0x4df)] || {}; if (this[_0x45b565(0x4df)][_0x313cd2['id']] !== _0xc393c9) return this['_cache_getPassiveStateConditionClassesData'][_0x284cc2['id']]; const _0x15c051 = _0xd6cedd[_0x45b565(0x25b)] || ''; if (_0x15c051[_0x45b565(0x3c7)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)) { const _0x1978aa = _0x2dd0b6(_0xd8924a['$1'])[_0x45b565(0x212)](',')[_0x45b565(0x272)](_0x8c719d => _0x8c719d['trim']()); _0x126538[_0x45b565(0x360)] = _0x1d8232[_0x45b565(0x3eb)][_0x45b565(0x321)](_0x1978aa); } if (_0x15c051['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)) { const _0x125fea = _0x53cc7f(_0x380bb9['$1'])[_0x45b565(0x212)](',')[_0x45b565(0x272)](_0x2877f0 => _0x2877f0[_0x45b565(0x420)]()); _0x126538[_0x45b565(0x284)] = _0x5b3738[_0x45b565(0x3eb)]['ParseClassIDs'](_0x125fea); } return this[_0x45b565(0x4df)][_0x45a114['id']] = _0x126538, this[_0x45b565(0x4df)][_0x146499['id']]; } else { if ($gameParty[_0x45b565(0x4d6)]() && _0x51fabe['match'](/<troop-(\d+)>/i)) { const _0x4f7b7b = Number(RegExp['$1']); if (_0x4f7b7b === $gameTroop[_0x45b565(0x286)]()) { if (_0x51fabe[_0x45b565(0x3c7)](/<member-(\d+)>/i)) return $gameTroop['members']()[Number(RegExp['$1'])]; } } if (_0x51fabe[_0x45b565(0x3c7)](/<enemy-(\d+)>/i)) { if ('dPfsC' === _0x45b565(0x3ec)) return new Game_Enemy(Number(RegExp['$1']), -0x1f4, -0x1f4); else _0x18ed9f[_0x45b565(0x481)](_0x5cafe5, _0x38f92b); } } } } return this; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3d9)] = Game_Battler[_0x183653(0x506)][_0x183653(0x4a6)], Game_Battler[_0x183653(0x506)]['addState'] = function (_0x55db49) { const _0x432474 = _0x183653, _0x473f45 = this[_0x432474(0x449)](_0x55db49); VisuMZ['SkillsStatesCore'][_0x432474(0x3d9)][_0x432474(0x41a)](this, _0x55db49); if (_0x473f45 && this['hasState']($dataStates[_0x55db49])) { this[_0x432474(0x2b8)](_0x55db49);; } }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x347)] = Game_Battler['prototype'][_0x183653(0x449)], Game_Battler[_0x183653(0x506)][_0x183653(0x449)] = function (_0x1608e4) { const _0x74780a = _0x183653, _0x1fff92 = $dataStates[_0x1608e4]; if (_0x1fff92 && _0x1fff92[_0x74780a(0x25b)][_0x74780a(0x3c7)](/<NO DEATH CLEAR>/i)) return !this[_0x74780a(0x35b)](_0x1608e4) && !this['isStateRestrict'](_0x1608e4) && !this['_result'][_0x74780a(0x438)](_0x1608e4); return VisuMZ[_0x74780a(0x3eb)][_0x74780a(0x347)][_0x74780a(0x41a)](this, _0x1608e4); }, Game_Battler[_0x183653(0x506)]['onAddState'] = function (_0x18ff8b) { const _0x3e3af8 = _0x183653; this[_0x3e3af8(0x447)](_0x18ff8b), this[_0x3e3af8(0x3d5)](_0x18ff8b), this['onAddStateMakeCustomSlipValues'](_0x18ff8b), this['onAddStateCustomJS'](_0x18ff8b), this[_0x3e3af8(0x319)](_0x18ff8b); }, Game_Battler[_0x183653(0x506)][_0x183653(0x354)] = function (_0x367821) { const _0x2bd06d = _0x183653; this[_0x2bd06d(0x3d8)](_0x367821), this[_0x2bd06d(0x335)](_0x367821), Game_BattlerBase[_0x2bd06d(0x506)][_0x2bd06d(0x354)][_0x2bd06d(0x41a)](this, _0x367821); }, Game_Battler[_0x183653(0x506)][_0x183653(0x4c2)] = function (_0xb7c4b6) { const _0x44cfb5 = _0x183653; for (const _0x98206a of this[_0x44cfb5(0x3a4)]()) { this[_0x44cfb5(0x3ba)](_0x98206a['id']) && _0x98206a[_0x44cfb5(0x246)] === _0xb7c4b6 && (this[_0x44cfb5(0x300)](_0x98206a['id']), this[_0x44cfb5(0x427)](_0x98206a['id']), this[_0x44cfb5(0x408)](_0x98206a['id'])); } }, Game_Battler[_0x183653(0x506)][_0x183653(0x427)] = function (_0x321d37) { const _0x4c5e0a = _0x183653; this[_0x4c5e0a(0x4ae)](_0x321d37); }, Game_Battler[_0x183653(0x506)][_0x183653(0x4ec)] = function (_0x3f2dc0) { const _0x4c1ff9 = _0x183653; if (this[_0x4c1ff9(0x25e)] || this[_0x4c1ff9(0x22f)]) return; const _0x3728ac = VisuMZ[_0x4c1ff9(0x3eb)][_0x4c1ff9(0x42b)]; if (_0x3728ac[_0x3f2dc0]) _0x3728ac[_0x3f2dc0]['call'](this, _0x3f2dc0); }, Game_Battler[_0x183653(0x506)][_0x183653(0x3d8)] = function (_0x28b6c0) { const _0x3e120d = _0x183653; if (this[_0x3e120d(0x25e)] || this[_0x3e120d(0x22f)]) return; const _0x369e13 = VisuMZ[_0x3e120d(0x3eb)]['stateEraseJS']; if (_0x369e13[_0x28b6c0]) _0x369e13[_0x28b6c0][_0x3e120d(0x41a)](this, _0x28b6c0); }, Game_Battler['prototype']['onExpireStateCustomJS'] = function (_0x1470de) { const _0x4e42e3 = _0x183653; if (this[_0x4e42e3(0x25e)] || this['_tempBattler']) return; const _0x25cb2c = VisuMZ[_0x4e42e3(0x3eb)][_0x4e42e3(0x498)]; if (_0x25cb2c[_0x1470de]) _0x25cb2c[_0x1470de]['call'](this, _0x1470de); }, Game_Battler[_0x183653(0x506)][_0x183653(0x319)] = function (_0x3cb7fd) { const _0x3240da = _0x183653; if (this[_0x3240da(0x25e)] || this[_0x3240da(0x22f)]) return; try { VisuMZ[_0x3240da(0x3eb)][_0x3240da(0x2e9)][_0x3240da(0x30e)][_0x3240da(0x453)]['call'](this, _0x3cb7fd); } catch (_0x327c9c) { if (_0x3240da(0x378) === _0x3240da(0x30c)) { const _0x3ca2fd = _0x37b7ba[_0x3240da(0x3ee)]('[' + _0x5277d5['$1'][_0x3240da(0x3c7)](/\d+/g) + ']'); for (const _0xe67503 of _0x3ca2fd) { if (!_0x4f8e8e[_0x3240da(0x2ea)](_0xe67503)) return ![]; } return !![]; } else { if ($gameTemp['isPlaytest']()) console[_0x3240da(0x3e2)](_0x327c9c); } } }, Game_Battler[_0x183653(0x506)][_0x183653(0x335)] = function (_0x592700) { const _0xfbd423 = _0x183653; if (this[_0xfbd423(0x25e)] || this[_0xfbd423(0x22f)]) return; try { VisuMZ[_0xfbd423(0x3eb)]['Settings'][_0xfbd423(0x30e)][_0xfbd423(0x31e)]['call'](this, _0x592700); } catch (_0x3c08f7) { if ($gameTemp[_0xfbd423(0x34f)]()) console[_0xfbd423(0x3e2)](_0x3c08f7); } }, Game_Battler[_0x183653(0x506)][_0x183653(0x408)] = function (_0x52c0a0) { const _0x4b428d = _0x183653; if (this[_0x4b428d(0x25e)] || this[_0x4b428d(0x22f)]) return; try { VisuMZ[_0x4b428d(0x3eb)][_0x4b428d(0x2e9)][_0x4b428d(0x30e)][_0x4b428d(0x2f1)]['call'](this, _0x52c0a0); } catch (_0x13e1df) { if ('PAJHu' === _0x4b428d(0x3a6)) { if ($gameTemp['isPlaytest']()) console['log'](_0x13e1df); } else { if (typeof _0x350c19 !== _0x4b428d(0x316)) _0x5f520a = _0x568186['id']; return this['_stateTurns'][_0x1eaa3f] || 0x0; } } }, Game_Battler['prototype']['statesByCategory'] = function (_0x493520) { const _0x38cbc3 = _0x183653; return _0x493520 = _0x493520[_0x38cbc3(0x332)]()[_0x38cbc3(0x420)](), this['states']()[_0x38cbc3(0x32e)](_0x47d62e => _0x47d62e[_0x38cbc3(0x230)][_0x38cbc3(0x206)](_0x493520)); }, Game_Battler['prototype'][_0x183653(0x3bc)] = function (_0x1773f9, _0x1d37c8) { const _0x5d0b2d = _0x183653; _0x1773f9 = _0x1773f9[_0x5d0b2d(0x332)]()['trim'](), _0x1d37c8 = _0x1d37c8 || 0x0; const _0x17147b = this[_0x5d0b2d(0x45b)](_0x1773f9), _0x1718c8 = []; for (const _0x4823dd of _0x17147b) { if ('QVcAK' !== 'QVcAK') { const _0x1415ca = _0x172763[_0x5d0b2d(0x25b)]; _0x1415ca[_0x5d0b2d(0x3c7)](/<MP COST:[ ](\d+)>/i) && (_0x23d63c[_0x5d0b2d(0x27d)] = _0x5d18af(_0x31df51['$1'])), _0x1415ca[_0x5d0b2d(0x3c7)](/<TP COST:[ ](\d+)>/i) && (_0x36a250[_0x5d0b2d(0x35e)] = _0x4d2838(_0x439cb7['$1'])); } else { if (!_0x4823dd) continue; if (_0x1d37c8 <= 0x0) break; _0x1718c8[_0x5d0b2d(0x309)](_0x4823dd['id']), this[_0x5d0b2d(0x494)][_0x5d0b2d(0x2f8)] = !![], _0x1d37c8--; } } while (_0x1718c8[_0x5d0b2d(0x4fc)] > 0x0) { this[_0x5d0b2d(0x300)](_0x1718c8[_0x5d0b2d(0x44e)]()); } }, Game_Battler[_0x183653(0x506)]['removeStatesByCategoryAll'] = function (_0xa2b7dd, _0x37e80a) { const _0x1f031d = _0x183653; _0xa2b7dd = _0xa2b7dd['toUpperCase']()['trim'](), _0x37e80a = _0x37e80a || []; const _0x4f9d75 = this[_0x1f031d(0x45b)](_0xa2b7dd), _0x1f51c2 = []; for (const _0x4ec083 of _0x4f9d75) { if (!_0x4ec083) continue; if (_0x37e80a[_0x1f031d(0x206)](_0x4ec083)) continue; _0x1f51c2[_0x1f031d(0x309)](_0x4ec083['id']), this['_result'][_0x1f031d(0x2f8)] = !![]; } while (_0x1f51c2[_0x1f031d(0x4fc)] > 0x0) { this[_0x1f031d(0x300)](_0x1f51c2[_0x1f031d(0x44e)]()); } }, Game_Battler[_0x183653(0x506)][_0x183653(0x47f)] = function (_0x1be120) { const _0x2f7cf6 = _0x183653; return this[_0x2f7cf6(0x410)](_0x1be120) > 0x0; }, Game_Battler['prototype'][_0x183653(0x39c)] = function (_0x3a6ff9) { const _0x2ef28e = _0x183653; return this[_0x2ef28e(0x492)](_0x3a6ff9) > 0x0; }, Game_Battler[_0x183653(0x506)][_0x183653(0x410)] = function (_0x5711ce) { const _0x86e85 = _0x183653, _0x42f9ba = this[_0x86e85(0x45b)](_0x5711ce)[_0x86e85(0x32e)](_0x3fd55c => this[_0x86e85(0x23a)](_0x3fd55c['id'])); return _0x42f9ba[_0x86e85(0x4fc)]; }, Game_Battler[_0x183653(0x506)][_0x183653(0x492)] = function (_0x2f37e9) { const _0x2e5178 = _0x183653, _0x513cc6 = this['statesByCategory'](_0x2f37e9); return _0x513cc6[_0x2e5178(0x4fc)]; }, VisuMZ['SkillsStatesCore'][_0x183653(0x22b)] = Game_BattlerBase[_0x183653(0x506)]['isStateResist'], Game_BattlerBase[_0x183653(0x506)][_0x183653(0x35b)] = function (_0x326cc2) { const _0x2549dc = _0x183653, _0x255dd8 = $dataStates[_0x326cc2]; if (_0x255dd8 && _0x255dd8['categories'][_0x2549dc(0x4fc)] > 0x0) for (const _0x3f3475 of _0x255dd8[_0x2549dc(0x230)]) { if (this[_0x2549dc(0x3aa)](_0x3f3475)) return !![]; } return VisuMZ[_0x2549dc(0x3eb)][_0x2549dc(0x22b)][_0x2549dc(0x41a)](this, _0x326cc2); }, Game_BattlerBase[_0x183653(0x506)]['isStateCategoryResisted'] = function (_0x446727) { const _0x10b25d = _0x183653; let _0x4b6df7 = _0x10b25d(0x26c); if (this[_0x10b25d(0x22c)](_0x4b6df7)) return this['_cache'][_0x4b6df7][_0x10b25d(0x206)](_0x446727); return this[_0x10b25d(0x2ac)][_0x4b6df7] = this['makeResistedStateCategories'](), this['_cache'][_0x4b6df7]['includes'](_0x446727); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x490)] = function () { const _0x33ad12 = _0x183653, _0x362fb = /<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi, _0x51e960 = /<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i; let _0x3c3971 = []; for (const _0x489721 of this[_0x33ad12(0x276)]()) { if ('KnTFb' !== _0x33ad12(0x314)) { if (!_0x489721) continue; const _0x10a0d5 = _0x489721['note'], _0x156563 = _0x10a0d5[_0x33ad12(0x3c7)](_0x362fb); if (_0x156563) { if (_0x33ad12(0x44a) === _0x33ad12(0x44a)) for (const _0x1581c6 of _0x156563) { _0x1581c6[_0x33ad12(0x3c7)](_0x362fb); const _0x51ff2f = String(RegExp['$1'])['split'](',')[_0x33ad12(0x272)](_0x20842c => String(_0x20842c)[_0x33ad12(0x332)]()[_0x33ad12(0x420)]()); _0x3c3971 = _0x3c3971[_0x33ad12(0x4e3)](_0x51ff2f); } else { if (_0x4b65fa[_0x33ad12(0x2ea)](_0x4a22ff)) return !![]; } } if (_0x10a0d5[_0x33ad12(0x3c7)](_0x51e960)) { if (_0x33ad12(0x465) === 'xQfnE') { if (this['isBuffExpired'](_0x4e8b31)) { const _0x3b2700 = this[_0x33ad12(0x375)][_0x5efc27]; this[_0x33ad12(0x255)](_0x55d5b0); if (_0x3b2700 > 0x0) this[_0x33ad12(0x331)](_0x4a2a05); if (_0x3b2700 < 0x0) this['onExpireDebuff'](_0x31f467); } } else { const _0x47d68b = String(RegExp['$1'])[_0x33ad12(0x212)](/[\r\n]+/)['map'](_0x98b038 => String(_0x98b038)[_0x33ad12(0x332)]()[_0x33ad12(0x420)]()); _0x3c3971 = _0x3c3971[_0x33ad12(0x4e3)](_0x47d68b); } } } else { if (this['_tempActor'] || this['_tempBattler']) return; try { _0x5ec1de[_0x33ad12(0x3eb)][_0x33ad12(0x2e9)]['States'][_0x33ad12(0x2f1)][_0x33ad12(0x41a)](this, _0x38095d); } catch (_0xc4970) { if (_0x3ea6d6['isPlaytest']()) _0x3c5fa4['log'](_0xc4970); } } } return _0x3c3971; }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x3d5)] = function (_0x20eb9d) { const _0xa38233 = _0x183653, _0x21993c = $dataStates[_0x20eb9d]; if (!_0x21993c) return; const _0x52b06c = _0x21993c[_0xa38233(0x25b)] || '', _0x52f8ae = _0x52b06c['match'](/<REMOVE OTHER (.*) STATES>/gi); if (_0x52f8ae) { const _0x1cea6b = [_0x21993c]; for (const _0x3e6096 of _0x52f8ae) { _0x3e6096[_0xa38233(0x3c7)](/<REMOVE OTHER (.*) STATES>/i); const _0x53afc5 = String(RegExp['$1']); this[_0xa38233(0x285)](_0x53afc5, _0x1cea6b); } } }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x485)] = Game_Battler['prototype'][_0x183653(0x4b7)], Game_Battler[_0x183653(0x506)]['addBuff'] = function (_0x13d98c, _0x58e707) { const _0x514a25 = _0x183653; VisuMZ['SkillsStatesCore'][_0x514a25(0x485)]['call'](this, _0x13d98c, _0x58e707); if (this[_0x514a25(0x1c7)](_0x13d98c)) { if ('DULXM' !== _0x514a25(0x370)) this[_0x514a25(0x3c3)](_0x13d98c, _0x58e707); else { const _0x5445d8 = this['commandName'](_0x1ed5d5); if (_0x5445d8['match'](/\\I\[(\d+)\]/i)) { const _0x30d353 = this[_0x514a25(0x429)](_0xaae64f), _0x43d7fe = this[_0x514a25(0x3b7)](_0x5445d8)['width']; return _0x43d7fe <= _0x30d353[_0x514a25(0x43d)] ? 'iconText' : _0x514a25(0x24d); } } } }, Game_Battler['prototype']['isBuffPrevented'] = function (_0x389483) { }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x4ab)] = Game_Battler['prototype'][_0x183653(0x3a8)], Game_Battler[_0x183653(0x506)][_0x183653(0x3a8)] = function (_0x5d96b7, _0x67b642) { const _0x2f8981 = _0x183653; VisuMZ[_0x2f8981(0x3eb)]['Game_Battler_addDebuff'][_0x2f8981(0x41a)](this, _0x5d96b7, _0x67b642), this[_0x2f8981(0x236)](_0x5d96b7) && this['onAddDebuff'](_0x5d96b7, _0x67b642); }, Game_Battler['prototype']['removeBuffsAuto'] = function () { const _0x231de4 = _0x183653; for (let _0xb641db = 0x0; _0xb641db < this[_0x231de4(0x503)](); _0xb641db++) { if (this[_0x231de4(0x262)](_0xb641db)) { const _0x18c6c1 = this[_0x231de4(0x375)][_0xb641db]; this[_0x231de4(0x255)](_0xb641db); if (_0x18c6c1 > 0x0) this['onExpireBuff'](_0xb641db); if (_0x18c6c1 < 0x0) this['onExpireDebuff'](_0xb641db); } } }, Game_Battler[_0x183653(0x506)]['onAddBuff'] = function (_0x94e837, _0x4ee8ac) { this['onAddBuffGlobalJS'](_0x94e837, _0x4ee8ac); }, Game_Battler['prototype'][_0x183653(0x479)] = function (_0xa8d225, _0x226573) { const _0xeea51b = _0x183653; this[_0xeea51b(0x29e)](_0xa8d225, _0x226573); }, Game_Battler[_0x183653(0x506)]['onEraseBuff'] = function (_0x10d970) { const _0x45953d = _0x183653; Game_BattlerBase['prototype'][_0x45953d(0x1e6)][_0x45953d(0x41a)](this, _0x10d970), this[_0x45953d(0x2cb)](_0x10d970); }, Game_Battler[_0x183653(0x506)][_0x183653(0x3cb)] = function (_0x4a53b5) { const _0x298bd5 = _0x183653; Game_BattlerBase['prototype']['onEraseDebuff'][_0x298bd5(0x41a)](this, _0x4a53b5), this[_0x298bd5(0x224)](_0x4a53b5); }, Game_Battler[_0x183653(0x506)][_0x183653(0x331)] = function (_0x21ee60) { this['onExpireBuffGlobalJS'](_0x21ee60); }, Game_Battler['prototype']['onExpireDebuff'] = function (_0x4b933b) { const _0x128505 = _0x183653; this[_0x128505(0x330)](_0x4b933b); }, Game_Battler['prototype'][_0x183653(0x41d)] = function (_0xf04bb7, _0xa727c5) { const _0x30f71e = _0x183653; VisuMZ[_0x30f71e(0x3eb)][_0x30f71e(0x2e9)][_0x30f71e(0x384)][_0x30f71e(0x4e6)][_0x30f71e(0x41a)](this, _0xf04bb7, _0xa727c5); }, Game_Battler[_0x183653(0x506)]['onAddDebuffGlobalJS'] = function (_0x2193e8, _0x30de59) { const _0x5babac = _0x183653; VisuMZ[_0x5babac(0x3eb)][_0x5babac(0x2e9)][_0x5babac(0x384)]['onAddDebuffJS'][_0x5babac(0x41a)](this, _0x2193e8, _0x30de59); }, Game_BattlerBase[_0x183653(0x506)]['onEraseBuffGlobalJS'] = function (_0x1fed8a) { const _0xa3542a = _0x183653; VisuMZ[_0xa3542a(0x3eb)][_0xa3542a(0x2e9)][_0xa3542a(0x384)][_0xa3542a(0x460)][_0xa3542a(0x41a)](this, _0x1fed8a); }, Game_BattlerBase[_0x183653(0x506)][_0x183653(0x224)] = function (_0x4e347b) { const _0x30da3a = _0x183653; VisuMZ[_0x30da3a(0x3eb)][_0x30da3a(0x2e9)][_0x30da3a(0x384)]['onEraseDebuffJS'][_0x30da3a(0x41a)](this, _0x4e347b); }, Game_Battler[_0x183653(0x506)][_0x183653(0x3f3)] = function (_0x598b50) { const _0x4390c9 = _0x183653; VisuMZ['SkillsStatesCore'][_0x4390c9(0x2e9)][_0x4390c9(0x384)][_0x4390c9(0x3d6)][_0x4390c9(0x41a)](this, _0x598b50); }, Game_Battler[_0x183653(0x506)]['onExpireDebuffGlobalJS'] = function (_0x236266) { const _0xe72ab0 = _0x183653; VisuMZ[_0xe72ab0(0x3eb)][_0xe72ab0(0x2e9)]['Buffs']['onExpireDebuffJS']['call'](this, _0x236266); }, Game_Battler[_0x183653(0x506)][_0x183653(0x35d)] = function (_0xc7a265) { const _0x27ca6c = _0x183653, _0x59620c = VisuMZ[_0x27ca6c(0x3eb)], _0x6a0c5a = [_0x27ca6c(0x1f6), _0x27ca6c(0x4b8), 'stateMpSlipDamageJS', _0x27ca6c(0x33c), _0x27ca6c(0x34d), _0x27ca6c(0x1d7)]; for (const _0x488d7d of _0x6a0c5a) { _0x27ca6c(0x3cf) === _0x27ca6c(0x1b5) ? _0x5dbedc[_0x27ca6c(0x27b)] = _0x2948d2(_0x5d8e71['$1'])[_0x27ca6c(0x212)](',')['map'](_0x2753dd => _0x3f19d7(_0x2753dd)) : _0x59620c[_0x488d7d][_0xc7a265] && _0x59620c[_0x488d7d][_0xc7a265][_0x27ca6c(0x41a)](this, _0xc7a265); } }, VisuMZ[_0x183653(0x3eb)]['Game_Battler_regenerateAll'] = Game_Battler['prototype'][_0x183653(0x2a1)], Game_Battler[_0x183653(0x506)]['regenerateAll'] = function () { const _0x30eb26 = _0x183653; this[_0x30eb26(0x317)](), VisuMZ[_0x30eb26(0x3eb)]['Game_Battler_regenerateAll'][_0x30eb26(0x41a)](this), this['setPassiveStateSlipDamageJS'](), this[_0x30eb26(0x358)](); }, Game_Battler[_0x183653(0x506)][_0x183653(0x27f)] = function () { const _0x6da511 = _0x183653; for (const _0x46f665 of this[_0x6da511(0x430)]()) { if (!_0x46f665) continue; this['onAddStateMakeCustomSlipValues'](_0x46f665['id']); } }, Game_Battler[_0x183653(0x506)][_0x183653(0x317)] = function () { const _0x164dad = _0x183653; for (const _0x6f0c3f of this['states']()) { if (!_0x6f0c3f) continue; _0x6f0c3f['note'][_0x164dad(0x3c7)](/<JS SLIP REFRESH>/i) && this[_0x164dad(0x35d)](_0x6f0c3f['id']); } }, Game_Battler['prototype'][_0x183653(0x358)] = function () { const _0x4db1d1 = _0x183653; if (!this['isAlive']()) return; const _0x4664bf = this[_0x4db1d1(0x3a4)](); for (const _0x302322 of _0x4664bf) { if (!_0x302322) continue; this['onRegenerateCustomStateDamageOverTime'](_0x302322); } }, Game_Battler[_0x183653(0x506)][_0x183653(0x23d)] = function (_0x1b81c0) { const _0x141df2 = _0x183653, _0x53d83f = this[_0x141df2(0x43b)](_0x1b81c0['id'], _0x141df2(0x48f)) || 0x0, _0x416609 = -this[_0x141df2(0x1f9)](), _0x183a47 = Math[_0x141df2(0x466)](_0x53d83f, _0x416609); if (_0x183a47 !== 0x0) { if (_0x141df2(0x443) === _0x141df2(0x208)) _0x917078['SkillsStatesCore'][_0x141df2(0x1d4)][_0x141df2(0x41a)](this, _0x2498dd), _0x329c7a['SkillsStatesCore'][_0x141df2(0x288)](_0x3318a5), _0x4e1685['SkillsStatesCore'][_0x141df2(0x4f5)](_0x1e36c4), _0x47cc15[_0x141df2(0x3eb)][_0x141df2(0x251)](_0x4950eb), _0x2a4f62[_0x141df2(0x3eb)][_0x141df2(0x32d)](_0x565c4c); else { const _0x17ba79 = this[_0x141df2(0x494)][_0x141df2(0x275)] || 0x0; this[_0x141df2(0x45c)](_0x183a47), this[_0x141df2(0x494)][_0x141df2(0x275)] += _0x17ba79; } } const _0x56a218 = this[_0x141df2(0x43b)](_0x1b81c0['id'], 'slipMp') || 0x0; if (_0x56a218 !== 0x0) { const _0x5d4dde = this[_0x141df2(0x494)][_0x141df2(0x263)] || 0x0; this['gainMp'](_0x56a218), this[_0x141df2(0x494)][_0x141df2(0x263)] += _0x5d4dde; } const _0x40fca2 = this[_0x141df2(0x43b)](_0x1b81c0['id'], _0x141df2(0x253)) || 0x0; _0x40fca2 !== 0x0 && this[_0x141df2(0x4b4)](_0x40fca2); }, VisuMZ['SkillsStatesCore'][_0x183653(0x344)] = Game_Actor[_0x183653(0x506)][_0x183653(0x231)], Game_Actor[_0x183653(0x506)]['skillTypes'] = function () { const _0x32ebd0 = _0x183653, _0x4a2f9e = VisuMZ[_0x32ebd0(0x3eb)][_0x32ebd0(0x344)]['call'](this), _0x17fb6e = VisuMZ['SkillsStatesCore'][_0x32ebd0(0x2e9)][_0x32ebd0(0x3c2)]; let _0x3aee5e = _0x17fb6e['HiddenSkillTypes']; return $gameParty[_0x32ebd0(0x4d6)]() && (_0x3aee5e = _0x3aee5e[_0x32ebd0(0x4e3)](_0x17fb6e[_0x32ebd0(0x44b)])), _0x4a2f9e['filter'](_0x2a64ff => !_0x3aee5e[_0x32ebd0(0x206)](_0x2a64ff)); }, Game_Actor[_0x183653(0x506)][_0x183653(0x2a5)] = function () { return this['skills']()['filter'](_0x23d9ca => this['isSkillUsableForAutoBattle'](_0x23d9ca)); }, Game_Actor[_0x183653(0x506)][_0x183653(0x3e9)] = function (_0x40b8c9) { const _0x22e516 = _0x183653; if (!this[_0x22e516(0x377)](_0x40b8c9)) return ![]; if (!_0x40b8c9) return ![]; if (!this[_0x22e516(0x29f)](_0x40b8c9)) return ![]; if (this[_0x22e516(0x4cd)](_0x40b8c9)) return ![]; return !![]; }, Game_Actor[_0x183653(0x506)][_0x183653(0x29f)] = function (_0x30ebae) { const _0x522b5c = _0x183653, _0x5efe94 = this[_0x522b5c(0x231)](), _0x179cf0 = DataManager[_0x522b5c(0x42e)](_0x30ebae), _0x4a60f4 = _0x5efe94[_0x522b5c(0x32e)](_0x1b53a6 => _0x179cf0[_0x522b5c(0x206)](_0x1b53a6)); return _0x4a60f4[_0x522b5c(0x4fc)] > 0x0; }, Game_Actor['prototype'][_0x183653(0x4cd)] = function (_0x3591fd) { const _0x55fae0 = _0x183653; if (!VisuMZ[_0x55fae0(0x3eb)][_0x55fae0(0x4dd)](this, _0x3591fd)) return !![]; if (!VisuMZ[_0x55fae0(0x3eb)][_0x55fae0(0x3b3)](this, _0x3591fd)) return !![]; if (!VisuMZ[_0x55fae0(0x3eb)][_0x55fae0(0x1ff)](this, _0x3591fd)) return !![]; return ![]; }, Game_Actor[_0x183653(0x506)][_0x183653(0x1eb)] = function () { const _0x5515b0 = _0x183653; let _0x37dcf4 = [this['actor'](), this[_0x5515b0(0x360)]()]; _0x37dcf4 = _0x37dcf4['concat'](this['equips']()[_0x5515b0(0x32e)](_0x1e19a5 => _0x1e19a5)); for (const _0x41b64b of this[_0x5515b0(0x405)]) { const _0x3c590c = $dataSkills[_0x41b64b]; if (_0x3c590c) _0x37dcf4[_0x5515b0(0x309)](_0x3c590c); } return _0x37dcf4; }, Game_Actor['prototype'][_0x183653(0x4c5)] = function () { const _0x4860b6 = _0x183653; Game_Battler[_0x4860b6(0x506)][_0x4860b6(0x4c5)]['call'](this); const _0x13c019 = VisuMZ[_0x4860b6(0x3eb)][_0x4860b6(0x2e9)]['PassiveStates'][_0x4860b6(0x44c)]; this[_0x4860b6(0x2ac)]['passiveStates'] = this['_cache']['passiveStates'][_0x4860b6(0x4e3)](_0x13c019); }, VisuMZ['SkillsStatesCore'][_0x183653(0x296)] = Game_Actor['prototype']['learnSkill'], Game_Actor[_0x183653(0x506)][_0x183653(0x406)] = function (_0x143385) { const _0x5ceb28 = _0x183653; VisuMZ[_0x5ceb28(0x3eb)][_0x5ceb28(0x296)][_0x5ceb28(0x41a)](this, _0x143385), this[_0x5ceb28(0x2ac)] = {}, this[_0x5ceb28(0x430)](); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x23c)] = Game_Actor[_0x183653(0x506)][_0x183653(0x2c6)], Game_Actor[_0x183653(0x506)][_0x183653(0x2c6)] = function (_0x3fd4d6) { const _0x5d680b = _0x183653; VisuMZ[_0x5d680b(0x3eb)]['Game_Actor_forgetSkill']['call'](this, _0x3fd4d6), this[_0x5d680b(0x2ac)] = {}, this[_0x5d680b(0x430)](); }, Game_Actor[_0x183653(0x506)][_0x183653(0x2c7)] = function () { const _0x62cae8 = _0x183653; return VisuMZ[_0x62cae8(0x3eb)]['Settings'][_0x62cae8(0x30e)]['TurnEndOnMap'] ?? 0x14; }, Game_Enemy[_0x183653(0x506)][_0x183653(0x1eb)] = function () { const _0x114715 = _0x183653; let _0x199468 = [this[_0x114715(0x43e)]()]; return _0x199468[_0x114715(0x4e3)](this[_0x114715(0x320)]()); }, Game_Enemy[_0x183653(0x506)][_0x183653(0x4c5)] = function () { const _0x43bb03 = _0x183653; Game_Battler[_0x43bb03(0x506)][_0x43bb03(0x4c5)][_0x43bb03(0x41a)](this); const _0x5b36c7 = VisuMZ['SkillsStatesCore']['Settings'][_0x43bb03(0x368)][_0x43bb03(0x4a3)]; this[_0x43bb03(0x2ac)][_0x43bb03(0x430)] = this[_0x43bb03(0x2ac)][_0x43bb03(0x430)][_0x43bb03(0x4e3)](_0x5b36c7); }, Game_Enemy[_0x183653(0x506)][_0x183653(0x320)] = function () { const _0x336ace = _0x183653, _0x1d7b62 = []; for (const _0x500b39 of this[_0x336ace(0x43e)]()[_0x336ace(0x4b5)]) { if ('hyKqa' === 'hyKqa') { const _0x1b0d9d = $dataSkills[_0x500b39[_0x336ace(0x2bb)]]; if (_0x1b0d9d && !_0x1d7b62[_0x336ace(0x206)](_0x1b0d9d)) _0x1d7b62['push'](_0x1b0d9d); } else _0x2b9fcb = _0x2f03d6[_0x336ace(0x39b)](_0x16495b); } return _0x1d7b62; }, Game_Enemy[_0x183653(0x506)][_0x183653(0x2d8)] = function (_0x50c382) { const _0x3337ff = _0x183653; return this[_0x3337ff(0x493)]($dataStates[_0x50c382]); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x389)] = Game_Unit['prototype'][_0x183653(0x42c)], Game_Unit[_0x183653(0x506)]['isAllDead'] = function () { const _0x1acb56 = _0x183653; if (this['isPartyAllAffectedByGroupDefeatStates']()) return !![]; return VisuMZ[_0x1acb56(0x3eb)][_0x1acb56(0x389)][_0x1acb56(0x41a)](this); }, Game_Unit[_0x183653(0x506)][_0x183653(0x40e)] = function () { const _0x30af61 = _0x183653, _0x5ca798 = this[_0x30af61(0x457)](); for (const _0xae9ab of _0x5ca798) { if ('XlNLd' === 'UQchL') return _0x1d6aeb[_0x30af61(0x506)][_0x30af61(0x283)][_0x30af61(0x41a)](this); else { if (!_0xae9ab[_0x30af61(0x38b)]()) return ![]; } } return !![]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3e1)] = Game_Troop['prototype']['setup'], Game_Troop[_0x183653(0x506)][_0x183653(0x50a)] = function (_0x497728) { const _0x1bf847 = _0x183653; VisuMZ[_0x1bf847(0x3eb)]['Game_Troop_setup'][_0x1bf847(0x41a)](this, _0x497728), this[_0x1bf847(0x28a)](); }, Game_Troop[_0x183653(0x506)][_0x183653(0x28a)] = function () { const _0x5192bc = _0x183653; this[_0x5192bc(0x22e)] = Graphics['frameCount']; }, Game_Troop['prototype'][_0x183653(0x286)] = function () { const _0x2f6b79 = _0x183653; return this[_0x2f6b79(0x22e)] = this[_0x2f6b79(0x22e)] || Graphics[_0x2f6b79(0x31c)], this[_0x2f6b79(0x22e)]; }, Scene_Skill['prototype'][_0x183653(0x1e3)] = function () { const _0x25363d = _0x183653; if (ConfigManager[_0x25363d(0x516)] && ConfigManager[_0x25363d(0x3a1)] !== undefined) return ConfigManager['uiHelpPosition']; else { if (this[_0x25363d(0x243)]()) return this[_0x25363d(0x2c2)]()[_0x25363d(0x3c7)](/LOWER/i); else { if (_0x25363d(0x500) === _0x25363d(0x488)) { const _0x4dd253 = _0x30424b[_0x25363d(0x3eb)]['Settings']['Gauge']; if (_0x4dd253[_0x25363d(0x4c3)]) { if (_0x4dd253[_0x25363d(0x3e7)] === 0x1) return this[_0x25363d(0x3b0)](); else { if (_0x4dd253['MatchLabelGaugeColor'] === 0x2) return this[_0x25363d(0x35f)](); } } const _0x3af88a = _0x4dd253[_0x25363d(0x2d2)]; return _0x302ed4[_0x25363d(0x513)](_0x3af88a); } else Scene_ItemBase['prototype'][_0x25363d(0x283)][_0x25363d(0x41a)](this); } } }, Scene_Skill[_0x183653(0x506)][_0x183653(0x283)] = function () { const _0x401750 = _0x183653; if (ConfigManager[_0x401750(0x516)] && ConfigManager[_0x401750(0x2e4)] !== undefined) return ConfigManager[_0x401750(0x2e4)]; else { if (this[_0x401750(0x243)]()) return this[_0x401750(0x2c2)]()[_0x401750(0x3c7)](/RIGHT/i); else { if ('AeJKh' !== 'sEQal') return Scene_ItemBase[_0x401750(0x506)]['isRightInputMode']['call'](this); else { const _0x901ecc = _0x2c6ee6(_0x2dc536['$1'])['split'](/[\r\n]+/)[_0x401750(0x272)](_0x3662e6 => _0x41b1ec(_0x3662e6)[_0x401750(0x332)]()[_0x401750(0x420)]()); _0x9387ea = _0x355bd0[_0x401750(0x4e3)](_0x901ecc); } } } }, Scene_Skill['prototype'][_0x183653(0x2c2)] = function () { const _0x2bcdbb = _0x183653; return VisuMZ[_0x2bcdbb(0x3eb)][_0x2bcdbb(0x2e9)][_0x2bcdbb(0x3c2)][_0x2bcdbb(0x484)]; }, Scene_Skill['prototype'][_0x183653(0x2e0)] = function () { const _0x39395d = _0x183653; return this['_categoryWindow'] && this[_0x39395d(0x233)]['isUseModernControls'](); }, Scene_Skill[_0x183653(0x506)][_0x183653(0x243)] = function () { const _0x394a2e = _0x183653; return VisuMZ[_0x394a2e(0x3eb)][_0x394a2e(0x2e9)]['Skills'][_0x394a2e(0x3ea)]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x2aa)] = Scene_Skill[_0x183653(0x506)][_0x183653(0x442)], Scene_Skill['prototype'][_0x183653(0x442)] = function () { const _0x1213ba = _0x183653; return this[_0x1213ba(0x243)]() ? this[_0x1213ba(0x204)]() : _0x1213ba(0x2ec) === _0x1213ba(0x2fa) ? this[_0x1213ba(0x243)]() ? this[_0x1213ba(0x271)]() : _0x1a0703[_0x1213ba(0x3eb)][_0x1213ba(0x440)]['call'](this) : VisuMZ[_0x1213ba(0x3eb)][_0x1213ba(0x2aa)][_0x1213ba(0x41a)](this); }, Scene_Skill['prototype'][_0x183653(0x204)] = function () { const _0x24f89b = _0x183653, _0x1c3451 = 0x0, _0x4ba119 = this[_0x24f89b(0x25d)](), _0x1d4e82 = Graphics['boxWidth'], _0x13d88e = this[_0x24f89b(0x36d)](); return new Rectangle(_0x1c3451, _0x4ba119, _0x1d4e82, _0x13d88e); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x2f9)] = Scene_Skill['prototype'][_0x183653(0x425)], Scene_Skill[_0x183653(0x506)][_0x183653(0x425)] = function () { const _0x9acd38 = _0x183653; if (this['isUseSkillsStatesCoreUpdatedLayout']()) { if (_0x9acd38(0x462) !== _0x9acd38(0x3cc)) return this['skillTypeWindowRectSkillsStatesCore'](); else _0x227763[_0x9acd38(0x506)]['drawSkillCost'][_0x9acd38(0x41a)](this, this[_0x9acd38(0x4ef)], _0x505182, _0x5606c7, _0x1e6e39, _0x4fb394); } else return VisuMZ[_0x9acd38(0x3eb)][_0x9acd38(0x2f9)][_0x9acd38(0x41a)](this); }, Scene_Skill[_0x183653(0x506)]['mainCommandWidth'] = function () { const _0x1b3534 = _0x183653; return VisuMZ[_0x1b3534(0x3eb)][_0x1b3534(0x2e9)][_0x1b3534(0x3c2)][_0x1b3534(0x3b6)] ?? Scene_MenuBase['prototype'][_0x1b3534(0x4a2)][_0x1b3534(0x41a)](this); }, Scene_Skill[_0x183653(0x506)][_0x183653(0x328)] = function () { const _0x2103c2 = _0x183653, _0x43f462 = this[_0x2103c2(0x4a2)](), _0x17bb80 = this[_0x2103c2(0x436)](0x3, !![]), _0x5d9521 = this[_0x2103c2(0x283)]() ? Graphics[_0x2103c2(0x3de)] - _0x43f462 : 0x0, _0x582971 = this['mainAreaTop'](); return new Rectangle(_0x5d9521, _0x582971, _0x43f462, _0x17bb80); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x440)] = Scene_Skill['prototype'][_0x183653(0x3f6)], Scene_Skill[_0x183653(0x506)][_0x183653(0x3f6)] = function () { const _0x49f425 = _0x183653; if (this['isUseSkillsStatesCoreUpdatedLayout']()) return this[_0x49f425(0x271)](); else { if ('AFTRj' !== _0x49f425(0x235)) { const _0x2cbd67 = _0x4db80c[_0x49f425(0x3ee)]('[' + _0x24d3b1['$1']['match'](/\d+/g) + ']'); for (const _0x41ac33 of _0x2cbd67) { if (!_0x1b9110['value'](_0x41ac33)) return ![]; } return !![]; } else return VisuMZ[_0x49f425(0x3eb)][_0x49f425(0x440)][_0x49f425(0x41a)](this); } }, Scene_Skill[_0x183653(0x506)][_0x183653(0x271)] = function () { const _0x4d2096 = _0x183653, _0x2ae25a = Graphics[_0x4d2096(0x3de)] - this[_0x4d2096(0x4a2)](), _0x21d036 = this[_0x4d2096(0x33e)][_0x4d2096(0x30f)], _0x25c1e7 = this[_0x4d2096(0x283)]() ? 0x0 : Graphics[_0x4d2096(0x3de)] - _0x2ae25a, _0x464cba = this['mainAreaTop'](); return new Rectangle(_0x25c1e7, _0x464cba, _0x2ae25a, _0x21d036); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x49f)] = Scene_Skill[_0x183653(0x506)][_0x183653(0x508)], Scene_Skill[_0x183653(0x506)][_0x183653(0x508)] = function () { const _0x8b225c = _0x183653; VisuMZ[_0x8b225c(0x3eb)]['Scene_Skill_createItemWindow']['call'](this), this[_0x8b225c(0x1cc)]() && this[_0x8b225c(0x1df)](); }, VisuMZ[_0x183653(0x3eb)]['Scene_Skill_itemWindowRect'] = Scene_Skill[_0x183653(0x506)][_0x183653(0x4a7)], Scene_Skill[_0x183653(0x506)][_0x183653(0x4a7)] = function () { const _0x5b84d9 = _0x183653; if (this[_0x5b84d9(0x243)]()) return this[_0x5b84d9(0x1e0)](); else { const _0xbc8c8e = VisuMZ[_0x5b84d9(0x3eb)]['Scene_Skill_itemWindowRect'][_0x5b84d9(0x41a)](this); return this[_0x5b84d9(0x1cc)]() && this['adjustItemWidthByShopStatus']() && (_0xbc8c8e[_0x5b84d9(0x43d)] -= this[_0x5b84d9(0x352)]()), _0xbc8c8e; } }, Scene_Skill[_0x183653(0x506)][_0x183653(0x1e0)] = function () { const _0x44f1f7 = _0x183653, _0x5d2e55 = Graphics[_0x44f1f7(0x3de)] - this[_0x44f1f7(0x352)](), _0x14d8d5 = this[_0x44f1f7(0x502)]() - this[_0x44f1f7(0x29c)][_0x44f1f7(0x30f)], _0xdd0a9f = this[_0x44f1f7(0x283)]() ? Graphics[_0x44f1f7(0x3de)] - _0x5d2e55 : 0x0, _0x44c317 = this[_0x44f1f7(0x29c)]['y'] + this[_0x44f1f7(0x29c)]['height']; return new Rectangle(_0xdd0a9f, _0x44c317, _0x5d2e55, _0x14d8d5); }, Scene_Skill[_0x183653(0x506)][_0x183653(0x1cc)] = function () { const _0x121472 = _0x183653; if (!Imported[_0x121472(0x232)]) { if (_0x121472(0x4e7) !== 'hCiWz') { let _0x1256b4 = 0x0, _0x1eab87 = 0x0; if (_0x25df9a[_0x121472(0x3c7)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)) _0x1256b4 = _0x19aef9(_0x5eafae['$1']), _0x1eab87 = _0x216f97(_0x54287e['$2']); else _0x389cdb[_0x121472(0x3c7)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i) && (_0x1256b4 = _0x2acebc['getStateIdWithName'](_0x1e9eea['$1']), _0x1eab87 = _0x822f93(_0x1f3b9e['$2'])); _0x3b53fe['addStateTurns'](_0x1256b4, _0x1eab87), this[_0x121472(0x20a)](_0x5493a9); } else return ![]; } else return this[_0x121472(0x243)]() ? !![] : VisuMZ['SkillsStatesCore'][_0x121472(0x2e9)]['Skills']['ShowShopStatus']; }, Scene_Skill[_0x183653(0x506)]['adjustItemWidthByShopStatus'] = function () { const _0x199b91 = _0x183653; return VisuMZ[_0x199b91(0x3eb)][_0x199b91(0x2e9)][_0x199b91(0x3c2)][_0x199b91(0x4e1)]; }, Scene_Skill[_0x183653(0x506)][_0x183653(0x1df)] = function () { const _0x442e29 = _0x183653, _0x32e9a6 = this['shopStatusWindowRect'](); this[_0x442e29(0x3dd)] = new Window_ShopStatus(_0x32e9a6), this[_0x442e29(0x2b0)](this[_0x442e29(0x3dd)]), this['_itemWindow'][_0x442e29(0x24c)](this[_0x442e29(0x3dd)]); const _0x3788b1 = VisuMZ[_0x442e29(0x3eb)][_0x442e29(0x2e9)][_0x442e29(0x3c2)][_0x442e29(0x26a)]; this[_0x442e29(0x3dd)]['setBackgroundType'](_0x3788b1 || 0x0); }, Scene_Skill[_0x183653(0x506)][_0x183653(0x480)] = function () { const _0x251c5d = _0x183653; if (this[_0x251c5d(0x243)]()) return this[_0x251c5d(0x4b0)](); else { if (_0x251c5d(0x2cd) === 'fIaSY') return VisuMZ[_0x251c5d(0x3eb)][_0x251c5d(0x2e9)][_0x251c5d(0x3c2)][_0x251c5d(0x1c6)]['call'](this); else { const _0x164440 = _0x42feb6[_0x251c5d(0x3ee)]('[' + _0xa1520b['$1'][_0x251c5d(0x3c7)](/\d+/g) + ']'); for (const _0x13509e of _0x164440) { if (!_0x5ab2bb[_0x251c5d(0x222)](_0x13509e)) return !![]; } return ![]; } } }, Scene_Skill[_0x183653(0x506)][_0x183653(0x4b0)] = function () { const _0x467634 = _0x183653, _0x687a7 = this[_0x467634(0x352)](), _0x944999 = this[_0x467634(0x1bf)]['height'], _0x46b472 = this[_0x467634(0x283)]() ? 0x0 : Graphics['boxWidth'] - this[_0x467634(0x352)](), _0xf2401c = this[_0x467634(0x1bf)]['y']; return new Rectangle(_0x46b472, _0xf2401c, _0x687a7, _0x944999); }, Scene_Skill[_0x183653(0x506)][_0x183653(0x352)] = function () { const _0x24f9f0 = _0x183653; return Imported[_0x24f9f0(0x232)] ? 'ggtBh' === _0x24f9f0(0x20d) ? Scene_Shop[_0x24f9f0(0x506)]['statusWidth']() : _0x2b892d[_0x24f9f0(0x3eb)][_0x24f9f0(0x440)]['call'](this) : 0x0; }, Scene_Skill[_0x183653(0x506)][_0x183653(0x1dd)] = function () { const _0x3bd163 = _0x183653; if (this[_0x3bd163(0x33e)] && this[_0x3bd163(0x33e)][_0x3bd163(0x2da)]) { if (_0x3bd163(0x4f1) !== 'ZeiMI') return TextManager[_0x3bd163(0x45a)]; else { if (_0x2e45b4[_0x3bd163(0x2e8)](_0x40d101)) return ![]; } } else return ''; }, VisuMZ[_0x183653(0x3eb)]['Sprite_Gauge_initMembers'] = Sprite_Gauge['prototype'][_0x183653(0x46d)], Sprite_Gauge[_0x183653(0x506)]['initMembers'] = function () { const _0x11e791 = _0x183653; VisuMZ['SkillsStatesCore'][_0x11e791(0x35c)][_0x11e791(0x41a)](this), this['_costSettings'] = null; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x413)] = Sprite_Gauge[_0x183653(0x506)]['setup'], Sprite_Gauge['prototype'][_0x183653(0x50a)] = function (_0x2e6d61, _0x3a4258) { const _0x4efc45 = _0x183653; this[_0x4efc45(0x3fb)](_0x2e6d61, _0x3a4258), _0x3a4258 = _0x3a4258[_0x4efc45(0x499)](), VisuMZ[_0x4efc45(0x3eb)]['Sprite_Gauge_setup'][_0x4efc45(0x41a)](this, _0x2e6d61, _0x3a4258); }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x3fb)] = function (_0x36f876, _0x4047b6) { const _0x5c1f41 = _0x183653, _0xcf31c0 = VisuMZ[_0x5c1f41(0x3eb)][_0x5c1f41(0x2e9)][_0x5c1f41(0x2d1)][_0x5c1f41(0x32e)](_0x543fee => _0x543fee['Name'][_0x5c1f41(0x332)]() === _0x4047b6[_0x5c1f41(0x332)]()); _0xcf31c0[_0x5c1f41(0x4fc)] >= 0x1 ? this[_0x5c1f41(0x4b9)] = _0xcf31c0[0x0] : this[_0x5c1f41(0x4b9)] = null; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1da)] = Sprite_Gauge['prototype']['currentValue'], Sprite_Gauge['prototype']['currentValue'] = function () { const _0x44de33 = _0x183653; if (this[_0x44de33(0x514)] && this['_costSettings']) return this['currentValueSkillsStatesCore'](); else { if (_0x44de33(0x374) === _0x44de33(0x2a4)) _0x9f50ef[_0x44de33(0x309)](_0xbf336a[_0x44de33(0x3ce)](_0x507c25)); else return VisuMZ[_0x44de33(0x3eb)]['Sprite_Gauge_currentValue'][_0x44de33(0x41a)](this); } }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x4f9)] = function () { const _0xef081e = _0x183653; return this['_costSettings']['GaugeCurrentJS'][_0xef081e(0x41a)](this[_0xef081e(0x514)]); }, VisuMZ['SkillsStatesCore'][_0x183653(0x376)] = Sprite_Gauge['prototype']['currentMaxValue'], Sprite_Gauge[_0x183653(0x506)][_0x183653(0x4fa)] = function () { const _0x231826 = _0x183653; if (this[_0x231826(0x514)] && this[_0x231826(0x4b9)]) { if (_0x231826(0x2dd) !== _0x231826(0x45e)) return this['currentMaxValueSkillsStatesCore'](); else { if (this[_0x231826(0x236)](_0x478d9a)) { const _0x3734d2 = _0x507970[_0x231826(0x3eb)][_0x231826(0x2e9)][_0x231826(0x384)]['MaxTurns']; this[_0x231826(0x403)][_0x5cfd21] = _0x4950c9[_0x231826(0x1fb)](0x0, _0x3734d2); } } } else return _0x231826(0x3f4) === _0x231826(0x3f8) ? !![] : VisuMZ[_0x231826(0x3eb)][_0x231826(0x376)]['call'](this); }, Sprite_Gauge[_0x183653(0x506)]['currentMaxValueSkillsStatesCore'] = function () { const _0x3a2b90 = _0x183653; return this[_0x3a2b90(0x4b9)][_0x3a2b90(0x478)][_0x3a2b90(0x41a)](this[_0x3a2b90(0x514)]); }, VisuMZ[_0x183653(0x3eb)]['Sprite_Gauge_gaugeRate'] = Sprite_Gauge[_0x183653(0x506)]['gaugeRate'], Sprite_Gauge[_0x183653(0x506)][_0x183653(0x3fe)] = function () { const _0xd073b0 = _0x183653, _0x5f4f2e = VisuMZ[_0xd073b0(0x3eb)]['Sprite_Gauge_gaugeRate'][_0xd073b0(0x41a)](this); return _0x5f4f2e[_0xd073b0(0x1fb)](0x0, 0x1); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x3a5)] = Sprite_Gauge[_0x183653(0x506)][_0x183653(0x3f0)], Sprite_Gauge[_0x183653(0x506)][_0x183653(0x3f0)] = function () { const _0x2edbf2 = _0x183653; if (this[_0x2edbf2(0x514)] && this[_0x2edbf2(0x4b9)]) { if (_0x2edbf2(0x2e7) !== _0x2edbf2(0x2e7)) { if (!_0xe54b90[_0x2edbf2(0x3eb)][_0x2edbf2(0x4dd)](this, _0x5cb2ba)) return !![]; if (!_0x35376c['SkillsStatesCore']['CheckVisibleSwitchNotetags'](this, _0x5608b6)) return !![]; if (!_0x1e57b2[_0x2edbf2(0x3eb)][_0x2edbf2(0x1ff)](this, _0xe2068e)) return !![]; return ![]; } else this[_0x2edbf2(0x487)][_0x2edbf2(0x42f)](), this[_0x2edbf2(0x202)](); } else { if (_0x2edbf2(0x491) !== _0x2edbf2(0x4db)) VisuMZ[_0x2edbf2(0x3eb)][_0x2edbf2(0x3a5)][_0x2edbf2(0x41a)](this); else for (_0x4af6c6 of _0x30ebe3[_0x2edbf2(0x3eb)][_0x2edbf2(0x2e9)][_0x2edbf2(0x2d1)]) { let _0x1d1e86 = _0x17a461[_0x2edbf2(0x47a)][_0x2edbf2(0x41a)](this, _0xe46405); _0x1d1e86 = this[_0x2edbf2(0x3bd)](_0x4687c6, _0x1d1e86, _0x2c7cfe), _0xf58aa4['PayJS'][_0x2edbf2(0x41a)](this, _0x5a2ab1, _0x1d1e86); } } }, Sprite_Gauge[_0x183653(0x506)]['currentDisplayedValue'] = function () { const _0x155592 = _0x183653; let _0x290a54 = this[_0x155592(0x402)](); return Imported[_0x155592(0x290)] && this[_0x155592(0x21d)]() && (_0x290a54 = VisuMZ[_0x155592(0x343)](_0x290a54)), _0x290a54; }, Sprite_Gauge['prototype'][_0x183653(0x202)] = function () { const _0x2a7610 = _0x183653; this[_0x2a7610(0x487)][_0x2a7610(0x42f)](), this[_0x2a7610(0x4b9)][_0x2a7610(0x3f2)][_0x2a7610(0x41a)](this); }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x291)] = function (_0x58eb3f, _0x5d5e0d, _0x5a5565, _0x4140e9, _0x45e29c, _0x2ffebf) { const _0x3683f1 = _0x183653, _0x5464a1 = this[_0x3683f1(0x3fe)](), _0x3ab7b5 = Math[_0x3683f1(0x2e2)]((_0x45e29c - 0x2) * _0x5464a1), _0x22d819 = _0x2ffebf - 0x2, _0x572677 = this[_0x3683f1(0x247)](); this[_0x3683f1(0x487)][_0x3683f1(0x1f0)](_0x5a5565, _0x4140e9, _0x45e29c, _0x2ffebf, _0x572677), this['bitmap']['gradientFillRect'](_0x5a5565 + 0x1, _0x4140e9 + 0x1, _0x3ab7b5, _0x22d819, _0x58eb3f, _0x5d5e0d); }, Sprite_Gauge[_0x183653(0x506)]['labelFontFace'] = function () { const _0x2e91c9 = _0x183653, _0x350f00 = VisuMZ[_0x2e91c9(0x3eb)]['Settings'][_0x2e91c9(0x2df)]; if (_0x350f00[_0x2e91c9(0x433)] === _0x2e91c9(0x316)) { if (_0x2e91c9(0x3a9) !== _0x2e91c9(0x217)) return $gameSystem[_0x2e91c9(0x448)](); else { const _0x6f8f23 = _0x32efe2[_0x2e91c9(0x3eb)][_0x2e91c9(0x2e9)]['Gauge']; if (this[_0x2e91c9(0x1d9)]() <= 0x0) return 'rgba(0,\x200,\x200,\x200)'; else return _0x6f8f23['LabelOutlineSolid'] ? _0x2e91c9(0x244) : _0x2338ad[_0x2e91c9(0x365)](); } } else { if (_0x2e91c9(0x444) === 'sPBvt') return $gameSystem[_0x2e91c9(0x38e)](); else { if (typeof _0x414686 !== 'number') _0x289c44 = _0x1aab53['id']; this[_0x2e91c9(0x23a)](_0x3b6c10) && (_0x36052d += this[_0x2e91c9(0x4a1)](_0x50315a), this['setStateTurns'](_0x33fcc2, _0x1db7a0)); } } }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x1de)] = function () { const _0x3f61cf = _0x183653, _0x448246 = VisuMZ[_0x3f61cf(0x3eb)][_0x3f61cf(0x2e9)][_0x3f61cf(0x2df)]; if (_0x448246[_0x3f61cf(0x433)] === _0x3f61cf(0x316)) return $gameSystem[_0x3f61cf(0x357)]() - 0x6; else { if (_0x3f61cf(0x245) !== _0x3f61cf(0x200)) return $gameSystem['mainFontSize']() - 0x2; else { const _0x239d49 = []; for (let _0x497d48 of _0x8afbcc) { _0x497d48 = (_0x599966(_0x497d48) || '')[_0x3f61cf(0x420)](); const _0x31f507 = /^\d+$/['test'](_0x497d48); _0x31f507 ? _0x239d49['push'](_0x2856cd(_0x497d48)) : _0x239d49[_0x3f61cf(0x309)](_0x1d4b6a['getClassIdWithName'](_0x497d48)); } return _0x239d49[_0x3f61cf(0x272)](_0x43ecdc => _0x5a4d6e[_0x209e7f(_0x43ecdc)])[_0x3f61cf(0x1fe)](null); } } }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x4fb)] = function () { const _0x2a0c24 = _0x183653, _0x4df738 = VisuMZ[_0x2a0c24(0x3eb)][_0x2a0c24(0x2e9)][_0x2a0c24(0x2df)]; if (_0x4df738['ValueFontMainType'] === 'number') { if (_0x2a0c24(0x26d) !== _0x2a0c24(0x26d)) this[_0x2a0c24(0x29c)] = _0x5b9f29, this['callUpdateHelp'](); else return $gameSystem[_0x2a0c24(0x448)](); } else return $gameSystem['mainFontFace'](); }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x1d1)] = function () { const _0x155a5c = _0x183653, _0x48f440 = VisuMZ[_0x155a5c(0x3eb)]['Settings'][_0x155a5c(0x2df)]; return _0x48f440[_0x155a5c(0x45f)] === _0x155a5c(0x316) ? $gameSystem[_0x155a5c(0x357)]() - 0x6 : $gameSystem[_0x155a5c(0x357)]() - 0x2; }, Sprite_Gauge['prototype'][_0x183653(0x22d)] = function () { const _0x3fad77 = _0x183653, _0x443f39 = VisuMZ['SkillsStatesCore']['Settings'][_0x3fad77(0x2df)]; if (_0x443f39[_0x3fad77(0x4c3)]) { if ('GbjXN' === _0x3fad77(0x391)) return _0x41f8f3['_subject']; else { if (_0x443f39['MatchLabelGaugeColor'] === 0x1) { if (_0x3fad77(0x39a) === _0x3fad77(0x1cd)) { if (!_0x2ffe07[_0x3fad77(0x2ea)](_0x1664e2)) return ![]; } else return this[_0x3fad77(0x3b0)](); } else { if (_0x443f39['MatchLabelGaugeColor'] === 0x2) { if (_0x3fad77(0x25f) !== 'mluBe') return this[_0x3fad77(0x35f)](); else _0x273378[_0x7a0acb][_0x55cda9] && _0x2e8d5b[_0xee2b2e][_0x7ae269][_0x3fad77(0x41a)](this, _0x5380f4); } } } } const _0x16dee4 = _0x443f39[_0x3fad77(0x2d2)]; return ColorManager[_0x3fad77(0x513)](_0x16dee4); }, Sprite_Gauge[_0x183653(0x506)]['labelOutlineColor'] = function () { const _0x185277 = _0x183653, _0x4d5e16 = VisuMZ['SkillsStatesCore'][_0x185277(0x2e9)][_0x185277(0x2df)]; if (this[_0x185277(0x1d9)]() <= 0x0) { if ('vbJay' !== _0x185277(0x2f6)) for (const _0x166612 of _0x11524c) { _0x166612[_0x185277(0x3c7)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i); const _0x2d32af = _0x314960(_0x4a85f1['$1']); _0x5a8657[_0x185277(0x285)](_0x2d32af); } else return _0x185277(0x281); } else { if (_0x4d5e16['LabelOutlineSolid']) return _0x185277(0x244); else { if (_0x185277(0x1f3) === _0x185277(0x1f3)) return ColorManager[_0x185277(0x365)](); else this[_0x185277(0x1df)](); } } }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x1d9)] = function () { const _0x499c2c = _0x183653; return VisuMZ[_0x499c2c(0x3eb)]['Settings'][_0x499c2c(0x2df)][_0x499c2c(0x4ca)] || 0x0; }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x1e2)] = function () { const _0x525e7c = _0x183653, _0x430bd1 = VisuMZ['SkillsStatesCore'][_0x525e7c(0x2e9)]['Gauge']; if (this[_0x525e7c(0x228)]() <= 0x0) return _0x525e7c(0x281); else { if (_0x430bd1['ValueOutlineSolid']) { if ('ZmWPx' === _0x525e7c(0x2b5)) { const _0x24a8d5 = _0x4e00a9(_0x145ca7['$1']), _0x2656a2 = _0x567d70['format'](_0x24a8d5, _0x525e7c(0x249), -0x1, _0x525e7c(0x439)); _0x4a0258[_0x525e7c(0x3eb)][_0x525e7c(0x1f8)][_0x422a1d['id']] = new _0x1b45ae('stateId', _0x2656a2); } else return _0x525e7c(0x244); } else return ColorManager[_0x525e7c(0x365)](); } }, Sprite_Gauge[_0x183653(0x506)][_0x183653(0x228)] = function () { const _0xe87795 = _0x183653; return VisuMZ[_0xe87795(0x3eb)][_0xe87795(0x2e9)][_0xe87795(0x2df)][_0xe87795(0x298)] || 0x0; }, VisuMZ[_0x183653(0x3eb)]['Sprite_StateIcon_loadBitmap'] = Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x219)], Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x219)] = function () { const _0x3d84eb = _0x183653; VisuMZ[_0x3d84eb(0x3eb)][_0x3d84eb(0x473)][_0x3d84eb(0x41a)](this), this[_0x3d84eb(0x1fa)](); }, Sprite_StateIcon[_0x183653(0x506)]['createTurnDisplaySprite'] = function () { const _0x5e61de = _0x183653, _0x316a31 = Window_Base[_0x5e61de(0x506)][_0x5e61de(0x509)](); this[_0x5e61de(0x1c0)] = new Sprite(), this[_0x5e61de(0x1c0)][_0x5e61de(0x487)] = new Bitmap(ImageManager[_0x5e61de(0x241)], _0x316a31), this[_0x5e61de(0x1c0)]['anchor']['x'] = this[_0x5e61de(0x211)]['x'], this[_0x5e61de(0x1c0)][_0x5e61de(0x211)]['y'] = this[_0x5e61de(0x211)]['y'], this['addChild'](this[_0x5e61de(0x1c0)]), this[_0x5e61de(0x33d)] = this[_0x5e61de(0x1c0)][_0x5e61de(0x487)]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x4cc)] = Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x36b)], Sprite_StateIcon[_0x183653(0x506)]['updateFrame'] = function () { const _0x2c375c = _0x183653; VisuMZ[_0x2c375c(0x3eb)][_0x2c375c(0x4cc)]['call'](this), this['updateTurnDisplaySprite'](); }, Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x4f4)] = function (_0x2bffd0, _0x22c89a, _0x552cef, _0x4a16f5, _0x45a616) { const _0x50a42c = _0x183653; this[_0x50a42c(0x33d)][_0x50a42c(0x4f4)](_0x2bffd0, _0x22c89a, _0x552cef, _0x4a16f5, this[_0x50a42c(0x33d)]['height'], _0x45a616); }, Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x295)] = function () { const _0x188138 = _0x183653; this['resetFontSettings'](), this[_0x188138(0x33d)]['clear'](); const _0x4ecfc5 = this['_battler']; if (!_0x4ecfc5) return; const _0x89cd72 = _0x4ecfc5[_0x188138(0x3a4)]()[_0x188138(0x32e)](_0x525f31 => _0x525f31[_0x188138(0x372)] > 0x0), _0x2be1b8 = [...Array(0x8)['keys']()][_0x188138(0x32e)](_0x4383d6 => _0x4ecfc5[_0x188138(0x3f1)](_0x4383d6) !== 0x0), _0x5bf986 = this[_0x188138(0x229)], _0x5cf31e = _0x89cd72[_0x5bf986]; if (_0x5cf31e) Window_Base[_0x188138(0x506)][_0x188138(0x39f)][_0x188138(0x41a)](this, _0x4ecfc5, _0x5cf31e, 0x0, 0x0), Window_Base['prototype'][_0x188138(0x30d)][_0x188138(0x41a)](this, _0x4ecfc5, _0x5cf31e, 0x0, 0x0); else { const _0x39c27b = _0x2be1b8[_0x5bf986 - _0x89cd72['length']]; if (_0x39c27b === undefined) return; Window_Base[_0x188138(0x506)][_0x188138(0x36e)][_0x188138(0x41a)](this, _0x4ecfc5, _0x39c27b, 0x0, 0x0), Window_Base['prototype'][_0x188138(0x2d3)][_0x188138(0x41a)](this, _0x4ecfc5, _0x39c27b, 0x0, 0x0); } }, Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x2be)] = function () { const _0x1fb231 = _0x183653; this[_0x1fb231(0x33d)][_0x1fb231(0x417)] = $gameSystem[_0x1fb231(0x38e)](), this[_0x1fb231(0x33d)]['fontSize'] = $gameSystem['mainFontSize'](), this['resetTextColor'](); }, Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x215)] = function () { const _0x5df56b = _0x183653; this['changeTextColor'](ColorManager[_0x5df56b(0x36a)]()), this['changeOutlineColor'](ColorManager[_0x5df56b(0x365)]()); }, Sprite_StateIcon[_0x183653(0x506)]['changeTextColor'] = function (_0x345e91) { const _0x40aee7 = _0x183653; this['contents'][_0x40aee7(0x46b)] = _0x345e91; }, Sprite_StateIcon[_0x183653(0x506)]['changeOutlineColor'] = function (_0x2ebd9d) { const _0x746c37 = _0x183653; this[_0x746c37(0x33d)][_0x746c37(0x365)] = _0x2ebd9d; }, Sprite_StateIcon[_0x183653(0x506)][_0x183653(0x37f)] = function () { const _0x1a1a89 = _0x183653; this[_0x1a1a89(0x507)] = !![], this[_0x1a1a89(0x254)](); }, Window_Base[_0x183653(0x506)]['drawSkillCost'] = function (_0x2e33b9, _0x2608a6, _0x18d102, _0x567790, _0x34da7e) { const _0x323fd1 = _0x183653, _0x1ebaeb = this['createAllSkillCostText'](_0x2e33b9, _0x2608a6), _0x5f425b = this[_0x323fd1(0x3b7)](_0x1ebaeb, _0x18d102, _0x567790, _0x34da7e), _0x3559c3 = _0x18d102 + _0x34da7e - _0x5f425b['width']; this[_0x323fd1(0x4de)](_0x1ebaeb, _0x3559c3, _0x567790, _0x34da7e), this[_0x323fd1(0x2be)](); }, Window_Base[_0x183653(0x506)][_0x183653(0x237)] = function (_0x4e02f3, _0x2189eb) { const _0x47ad88 = _0x183653; let _0x2f9a4d = ''; for (settings of VisuMZ[_0x47ad88(0x3eb)]['Settings'][_0x47ad88(0x2d1)]) { if (!this[_0x47ad88(0x392)](_0x4e02f3, _0x2189eb, settings)) continue; if (_0x2f9a4d[_0x47ad88(0x4fc)] > 0x0) _0x2f9a4d += this[_0x47ad88(0x20f)](); _0x2f9a4d += this[_0x47ad88(0x409)](_0x4e02f3, _0x2189eb, settings); } _0x2f9a4d = this[_0x47ad88(0x2db)](_0x4e02f3, _0x2189eb, _0x2f9a4d); if (_0x2189eb[_0x47ad88(0x25b)][_0x47ad88(0x3c7)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)) { if (_0x47ad88(0x261) === 'ssmHP') _0x4c66b5[_0x47ad88(0x230)][_0x47ad88(0x309)](_0x1997fa[_0x47ad88(0x420)]()); else { if (_0x2f9a4d[_0x47ad88(0x4fc)] > 0x0) _0x2f9a4d += this[_0x47ad88(0x20f)](); _0x2f9a4d += String(RegExp['$1']); } } return _0x2f9a4d; }, Window_Base[_0x183653(0x506)][_0x183653(0x2db)] = function (_0x4e8803, _0x4888f6, _0x37dd25) { return _0x37dd25; }, Window_Base[_0x183653(0x506)]['isSkillCostShown'] = function (_0x5525de, _0xd0472f, _0x5036f6) { const _0x3b6ae1 = _0x183653; let _0x488087 = _0x5036f6[_0x3b6ae1(0x47a)][_0x3b6ae1(0x41a)](_0x5525de, _0xd0472f); return _0x488087 = _0x5525de['adjustSkillCost'](_0xd0472f, _0x488087, _0x5036f6), _0x5036f6['ShowJS']['call'](_0x5525de, _0xd0472f, _0x488087, _0x5036f6); }, Window_Base[_0x183653(0x506)][_0x183653(0x409)] = function (_0x19f0bd, _0x1b0d66, _0x3e2162) { const _0x23e045 = _0x183653; let _0x321088 = _0x3e2162[_0x23e045(0x47a)][_0x23e045(0x41a)](_0x19f0bd, _0x1b0d66); return _0x321088 = _0x19f0bd[_0x23e045(0x3bd)](_0x1b0d66, _0x321088, _0x3e2162), _0x3e2162[_0x23e045(0x2b7)][_0x23e045(0x41a)](_0x19f0bd, _0x1b0d66, _0x321088, _0x3e2162); }, Window_Base['prototype'][_0x183653(0x20f)] = function () { return '\x20'; }, Window_Base[_0x183653(0x506)][_0x183653(0x4ee)] = function (_0x5c09ff, _0x1584f1, _0x4e2949, _0x47389b) { const _0x38c704 = _0x183653; if (!_0x5c09ff) return; VisuMZ[_0x38c704(0x3eb)][_0x38c704(0x1ea)][_0x38c704(0x41a)](this, _0x5c09ff, _0x1584f1, _0x4e2949, _0x47389b), this[_0x38c704(0x2ca)](_0x5c09ff, _0x1584f1, _0x4e2949, _0x47389b); }, Window_Base['prototype'][_0x183653(0x2ca)] = function (_0x3a0536, _0x204502, _0x13467b, _0x541806) { const _0x2372c7 = _0x183653; _0x541806 = _0x541806 || 0x90; const _0x512c28 = ImageManager[_0x2372c7(0x241)], _0x58a647 = _0x3a0536['allIcons']()[_0x2372c7(0x2fe)](0x0, Math[_0x2372c7(0x2e2)](_0x541806 / _0x512c28)), _0x46f327 = _0x3a0536[_0x2372c7(0x3a4)]()[_0x2372c7(0x32e)](_0x50d56c => _0x50d56c[_0x2372c7(0x372)] > 0x0), _0x27463e = [...Array(0x8)[_0x2372c7(0x2bd)]()]['filter'](_0x50e60f => _0x3a0536[_0x2372c7(0x3f1)](_0x50e60f) !== 0x0), _0x3fb5a5 = []; let _0x1d0260 = _0x204502; for (let _0x3ad78c = 0x0; _0x3ad78c < _0x58a647['length']; _0x3ad78c++) { if (_0x2372c7(0x23e) === _0x2372c7(0x315)) { if (!_0x1247d0[_0x2372c7(0x2e8)](_0x4c899a)) return !![]; } else { this[_0x2372c7(0x2be)](); const _0x51ea19 = _0x46f327[_0x3ad78c]; if (_0x51ea19) !_0x3fb5a5['includes'](_0x51ea19) && this[_0x2372c7(0x39f)](_0x3a0536, _0x51ea19, _0x1d0260, _0x13467b), this[_0x2372c7(0x30d)](_0x3a0536, _0x51ea19, _0x1d0260, _0x13467b), _0x3fb5a5['push'](_0x51ea19); else { const _0x448357 = _0x27463e[_0x3ad78c - _0x46f327['length']]; this[_0x2372c7(0x36e)](_0x3a0536, _0x448357, _0x1d0260, _0x13467b), this[_0x2372c7(0x2d3)](_0x3a0536, _0x448357, _0x1d0260, _0x13467b); } _0x1d0260 += _0x512c28; } } }, Window_Base[_0x183653(0x506)]['drawActorStateTurns'] = function (_0x23727b, _0xc0636b, _0x437087, _0x2bc539) { const _0x37e895 = _0x183653; if (!VisuMZ[_0x37e895(0x3eb)][_0x37e895(0x2e9)][_0x37e895(0x30e)]['ShowTurns']) return; if (!_0x23727b[_0x37e895(0x23a)](_0xc0636b['id'])) return; if (_0xc0636b['autoRemovalTiming'] === 0x0) return; if (_0xc0636b[_0x37e895(0x25b)][_0x37e895(0x3c7)](/<HIDE STATE TURNS>/i)) return; const _0x121870 = _0x23727b[_0x37e895(0x4a1)](_0xc0636b['id']), _0xfb50cc = ImageManager[_0x37e895(0x241)], _0x523205 = ColorManager[_0x37e895(0x4f7)](_0xc0636b); this[_0x37e895(0x26e)](_0x523205), this[_0x37e895(0x221)]('rgba(0,\x200,\x200,\x201)'), this[_0x37e895(0x33d)]['fontBold'] = !![], this[_0x37e895(0x33d)][_0x37e895(0x37e)] = VisuMZ[_0x37e895(0x3eb)][_0x37e895(0x2e9)][_0x37e895(0x30e)][_0x37e895(0x394)], _0x437087 += VisuMZ[_0x37e895(0x3eb)]['Settings'][_0x37e895(0x30e)][_0x37e895(0x4d0)], _0x2bc539 += VisuMZ['SkillsStatesCore'][_0x37e895(0x2e9)][_0x37e895(0x30e)][_0x37e895(0x234)], this['drawText'](_0x121870, _0x437087, _0x2bc539, _0xfb50cc, _0x37e895(0x2d6)), this[_0x37e895(0x33d)][_0x37e895(0x4dc)] = ![], this[_0x37e895(0x2be)](); }, Window_Base[_0x183653(0x506)][_0x183653(0x30d)] = function (_0x1b1c34, _0xc4f89f, _0x2bcf3d, _0x19c15f) { const _0x44125c = _0x183653; if (!VisuMZ['SkillsStatesCore']['Settings']['States'][_0x44125c(0x4e2)]) return; const _0x1cec3c = ImageManager[_0x44125c(0x241)], _0x1a330f = ImageManager[_0x44125c(0x4ac)] / 0x2, _0x439326 = ColorManager[_0x44125c(0x36a)](); this[_0x44125c(0x26e)](_0x439326), this[_0x44125c(0x221)]('rgba(0,\x200,\x200,\x201)'), this[_0x44125c(0x33d)][_0x44125c(0x4dc)] = !![], this[_0x44125c(0x33d)]['fontSize'] = VisuMZ[_0x44125c(0x3eb)][_0x44125c(0x2e9)][_0x44125c(0x30e)]['DataFontSize'], _0x2bcf3d += VisuMZ[_0x44125c(0x3eb)][_0x44125c(0x2e9)][_0x44125c(0x30e)][_0x44125c(0x414)], _0x19c15f += VisuMZ['SkillsStatesCore'][_0x44125c(0x2e9)]['States'][_0x44125c(0x2e5)]; const _0x3bf10f = String(_0x1b1c34[_0x44125c(0x386)](_0xc4f89f['id'])); this[_0x44125c(0x4f4)](_0x3bf10f, _0x2bcf3d, _0x19c15f, _0x1cec3c, 'center'), this['contents'][_0x44125c(0x4dc)] = ![], this[_0x44125c(0x2be)](); }, Window_Base[_0x183653(0x506)]['drawActorBuffTurns'] = function (_0x5334b3, _0xac175e, _0xdacc3a, _0x1fee76) { const _0xcb18f5 = _0x183653; if (!VisuMZ['SkillsStatesCore'][_0xcb18f5(0x2e9)][_0xcb18f5(0x384)][_0xcb18f5(0x2a6)]) return; const _0x16c4be = _0x5334b3[_0xcb18f5(0x3f1)](_0xac175e); if (_0x16c4be === 0x0) return; const _0x18957e = _0x5334b3[_0xcb18f5(0x3d7)](_0xac175e), _0xb0427a = ImageManager[_0xcb18f5(0x241)], _0x2f8e80 = _0x16c4be > 0x0 ? ColorManager[_0xcb18f5(0x510)]() : ColorManager[_0xcb18f5(0x304)](); this['changeTextColor'](_0x2f8e80), this['changeOutlineColor'](_0xcb18f5(0x244)), this[_0xcb18f5(0x33d)]['fontBold'] = !![], this['contents'][_0xcb18f5(0x37e)] = VisuMZ['SkillsStatesCore'][_0xcb18f5(0x2e9)]['Buffs'][_0xcb18f5(0x394)], _0xdacc3a += VisuMZ[_0xcb18f5(0x3eb)][_0xcb18f5(0x2e9)][_0xcb18f5(0x384)]['TurnOffsetX'], _0x1fee76 += VisuMZ[_0xcb18f5(0x3eb)]['Settings'][_0xcb18f5(0x384)][_0xcb18f5(0x234)], this[_0xcb18f5(0x4f4)](_0x18957e, _0xdacc3a, _0x1fee76, _0xb0427a, _0xcb18f5(0x2d6)), this[_0xcb18f5(0x33d)]['fontBold'] = ![], this[_0xcb18f5(0x2be)](); }, Window_Base[_0x183653(0x506)]['drawActorBuffRates'] = function (_0x2970f5, _0x2ed077, _0x22bb09, _0x207dbf) { const _0x362a55 = _0x183653; if (!VisuMZ[_0x362a55(0x3eb)]['Settings'][_0x362a55(0x384)]['ShowData']) return; const _0x8bd5ab = _0x2970f5[_0x362a55(0x3d3)](_0x2ed077), _0x195453 = _0x2970f5[_0x362a55(0x3f1)](_0x2ed077), _0x56cfa0 = ImageManager[_0x362a55(0x241)], _0x460bce = ImageManager['iconHeight'] / 0x2, _0x34ea96 = _0x195453 > 0x0 ? ColorManager['buffColor']() : ColorManager['debuffColor'](); this[_0x362a55(0x26e)](_0x34ea96), this['changeOutlineColor'](_0x362a55(0x244)), this[_0x362a55(0x33d)][_0x362a55(0x4dc)] = !![], this['contents'][_0x362a55(0x37e)] = VisuMZ[_0x362a55(0x3eb)][_0x362a55(0x2e9)]['Buffs'][_0x362a55(0x3c1)], _0x22bb09 += VisuMZ[_0x362a55(0x3eb)][_0x362a55(0x2e9)][_0x362a55(0x384)][_0x362a55(0x414)], _0x207dbf += VisuMZ[_0x362a55(0x3eb)][_0x362a55(0x2e9)][_0x362a55(0x384)][_0x362a55(0x2e5)]; const _0x46b2eb = _0x362a55(0x387)[_0x362a55(0x269)](Math[_0x362a55(0x4e0)](_0x8bd5ab * 0x64)); this[_0x362a55(0x4f4)](_0x46b2eb, _0x22bb09, _0x207dbf, _0x56cfa0, _0x362a55(0x20e)), this[_0x362a55(0x33d)][_0x362a55(0x4dc)] = ![], this['resetFontSettings'](); }, VisuMZ['SkillsStatesCore'][_0x183653(0x340)] = Window_StatusBase['prototype']['placeGauge'], Window_StatusBase['prototype'][_0x183653(0x226)] = function (_0x41baec, _0x83bce, _0x5136cf, _0xb97549) { const _0x344261 = _0x183653; if (_0x41baec[_0x344261(0x2bc)]()) _0x83bce = this['convertGaugeTypeSkillsStatesCore'](_0x41baec, _0x83bce); this[_0x344261(0x2ce)](_0x41baec, _0x83bce, _0x5136cf, _0xb97549); }, Window_StatusBase[_0x183653(0x506)]['placeExactGauge'] = function (_0x22ed2e, _0x5aca51, _0x27a03d, _0x5bbc84) { const _0x128a9c = _0x183653; if (['none', _0x128a9c(0x44d)][_0x128a9c(0x206)](_0x5aca51[_0x128a9c(0x499)]())) return; VisuMZ[_0x128a9c(0x3eb)][_0x128a9c(0x340)][_0x128a9c(0x41a)](this, _0x22ed2e, _0x5aca51, _0x27a03d, _0x5bbc84); }, Window_StatusBase[_0x183653(0x506)][_0x183653(0x4f3)] = function (_0x24899b, _0x162250) { const _0x45daa3 = _0x183653, _0x592791 = _0x24899b[_0x45daa3(0x360)]()[_0x45daa3(0x25b)]; if (_0x162250 === 'hp' && _0x592791[_0x45daa3(0x3c7)](/<REPLACE HP GAUGE:[ ](.*)>/i)) return String(RegExp['$1']); else { if (_0x162250 === 'mp' && _0x592791['match'](/<REPLACE MP GAUGE:[ ](.*)>/i)) { if (_0x45daa3(0x415) === _0x45daa3(0x415)) return String(RegExp['$1']); else { const _0x43d3ef = this['skillTypes'](), _0x5a025f = _0x13b06f['getSkillTypes'](_0x38f5dd), _0x3fbd38 = _0x43d3ef[_0x45daa3(0x32e)](_0x766069 => _0x5a025f[_0x45daa3(0x206)](_0x766069)); return _0x3fbd38['length'] > 0x0; } } else return _0x162250 === 'tp' && _0x592791[_0x45daa3(0x3c7)](/<REPLACE TP GAUGE:[ ](.*)>/i) ? String(RegExp['$1']) : _0x162250; } }, VisuMZ['SkillsStatesCore'][_0x183653(0x1ea)] = Window_StatusBase['prototype']['drawActorIcons'], Window_StatusBase['prototype'][_0x183653(0x4ee)] = function (_0x537cd3, _0x1d4e7c, _0x645df0, _0x111f44) { const _0xedce32 = _0x183653; if (!_0x537cd3) return; Window_Base[_0xedce32(0x506)]['drawActorIcons'][_0xedce32(0x41a)](this, _0x537cd3, _0x1d4e7c, _0x645df0, _0x111f44); }, VisuMZ['SkillsStatesCore']['Window_SkillType_initialize'] = Window_SkillType[_0x183653(0x506)][_0x183653(0x422)], Window_SkillType['prototype'][_0x183653(0x422)] = function (_0x35919c) { const _0x549612 = _0x183653; VisuMZ['SkillsStatesCore'][_0x549612(0x2eb)][_0x549612(0x41a)](this, _0x35919c), this[_0x549612(0x4c0)](_0x35919c); }, Window_SkillType['prototype'][_0x183653(0x4c0)] = function (_0x17c723) { const _0x3ede22 = _0x183653, _0x373341 = new Rectangle(0x0, 0x0, _0x17c723[_0x3ede22(0x43d)], _0x17c723[_0x3ede22(0x30f)]); this[_0x3ede22(0x454)] = new Window_Base(_0x373341), this[_0x3ede22(0x454)][_0x3ede22(0x2ff)] = 0x0, this[_0x3ede22(0x3dc)](this[_0x3ede22(0x454)]), this['updateCommandNameWindow'](); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x27c)] = function () { const _0x362ee9 = _0x183653; Window_Command['prototype'][_0x362ee9(0x27c)][_0x362ee9(0x41a)](this); if (this['_commandNameWindow']) this[_0x362ee9(0x21f)](); }, Window_SkillType['prototype'][_0x183653(0x21f)] = function () { const _0x57e650 = _0x183653, _0x3af35c = this[_0x57e650(0x454)]; _0x3af35c[_0x57e650(0x33d)][_0x57e650(0x42f)](); const _0xa0a27 = this['commandStyleCheck'](this[_0x57e650(0x264)]()); if (_0xa0a27 === _0x57e650(0x24d) && this[_0x57e650(0x3c6)]() > 0x0) { const _0x3efc0b = this[_0x57e650(0x429)](this['index']()); let _0x2f2d12 = this[_0x57e650(0x4e8)](this[_0x57e650(0x264)]()); _0x2f2d12 = _0x2f2d12[_0x57e650(0x299)](/\\I\[(\d+)\]/gi, ''), _0x3af35c[_0x57e650(0x2be)](), this[_0x57e650(0x30a)](_0x2f2d12, _0x3efc0b), this['commandNameWindowDrawText'](_0x2f2d12, _0x3efc0b), this[_0x57e650(0x36f)](_0x2f2d12, _0x3efc0b); } }, Window_SkillType[_0x183653(0x506)][_0x183653(0x30a)] = function (_0x88df5, _0x10a541) { }, Window_SkillType[_0x183653(0x506)][_0x183653(0x39e)] = function (_0x3d457f, _0x2a03c1) { const _0x216c2c = _0x183653, _0x3bbfe8 = this['_commandNameWindow']; _0x3bbfe8[_0x216c2c(0x4f4)](_0x3d457f, 0x0, _0x2a03c1['y'], _0x3bbfe8[_0x216c2c(0x3cd)], _0x216c2c(0x20e)); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x36f)] = function (_0x3adeef, _0x28f588) { const _0x12ead0 = _0x183653, _0x1a6a70 = this[_0x12ead0(0x454)], _0x848154 = $gameSystem[_0x12ead0(0x471)](), _0x47b759 = _0x28f588['x'] + Math[_0x12ead0(0x2e2)](_0x28f588[_0x12ead0(0x43d)] / 0x2) + _0x848154; _0x1a6a70['x'] = _0x1a6a70[_0x12ead0(0x43d)] / -0x2 + _0x47b759, _0x1a6a70['y'] = Math[_0x12ead0(0x2e2)](_0x28f588[_0x12ead0(0x30f)] / 0x2); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x2e0)] = function () { const _0x5a78b8 = _0x183653; return Imported[_0x5a78b8(0x290)] && Window_Command[_0x5a78b8(0x506)][_0x5a78b8(0x2e0)][_0x5a78b8(0x41a)](this); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x4fd)] = function () { const _0x10da9c = _0x183653; if (!this[_0x10da9c(0x4ef)]) return; const _0x4ff070 = this['_actor']['skillTypes'](); for (const _0x59d25b of _0x4ff070) { const _0x485158 = this[_0x10da9c(0x3ca)](_0x59d25b); this[_0x10da9c(0x4b2)](_0x485158, _0x10da9c(0x351), !![], _0x59d25b); } }, Window_SkillType[_0x183653(0x506)][_0x183653(0x3ca)] = function (_0x316130) { const _0xc75c4e = _0x183653; let _0xf06170 = $dataSystem[_0xc75c4e(0x231)][_0x316130]; if (_0xf06170[_0xc75c4e(0x3c7)](/\\I\[(\d+)\]/i)) return _0xf06170; if (this[_0xc75c4e(0x3db)]() === _0xc75c4e(0x312)) return _0xf06170; const _0x15b92b = VisuMZ['SkillsStatesCore'][_0xc75c4e(0x2e9)][_0xc75c4e(0x3c2)], _0x4a26cf = $dataSystem[_0xc75c4e(0x4c9)][_0xc75c4e(0x206)](_0x316130), _0x1c3c41 = _0x4a26cf ? _0x15b92b[_0xc75c4e(0x31a)] : _0x15b92b['IconStypeNorm']; return _0xc75c4e(0x24f)[_0xc75c4e(0x269)](_0x1c3c41, _0xf06170); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x28f)] = function () { const _0x1356ff = _0x183653; return VisuMZ[_0x1356ff(0x3eb)][_0x1356ff(0x2e9)]['Skills']['CmdTextAlign']; }, Window_SkillType[_0x183653(0x506)][_0x183653(0x428)] = function (_0x23c7b9) { const _0x5106f3 = _0x183653, _0x389af3 = this['commandStyleCheck'](_0x23c7b9); if (_0x389af3 === _0x5106f3(0x383)) { if (_0x5106f3(0x463) !== _0x5106f3(0x463)) { if (_0x19c50c['uiMenuStyle'] && _0x307829[_0x5106f3(0x3a1)] !== _0x4d1495) return _0x5162a3[_0x5106f3(0x3a1)]; else { if (this[_0x5106f3(0x243)]()) return this[_0x5106f3(0x2c2)]()['match'](/LOWER/i); else _0x5c2c37[_0x5106f3(0x506)][_0x5106f3(0x283)]['call'](this); } } else this[_0x5106f3(0x393)](_0x23c7b9); } else _0x389af3 === _0x5106f3(0x24d) ? this[_0x5106f3(0x477)](_0x23c7b9) : Window_Command[_0x5106f3(0x506)][_0x5106f3(0x428)][_0x5106f3(0x41a)](this, _0x23c7b9); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x3db)] = function () { const _0x9fa01f = _0x183653; return VisuMZ[_0x9fa01f(0x3eb)][_0x9fa01f(0x2e9)][_0x9fa01f(0x3c2)]['CmdStyle']; }, Window_SkillType[_0x183653(0x506)][_0x183653(0x2c9)] = function (_0x4dd11c) { const _0x13b1fc = _0x183653; if (_0x4dd11c < 0x0) return _0x13b1fc(0x312); const _0x33fc74 = this[_0x13b1fc(0x3db)](); if (_0x33fc74 !== _0x13b1fc(0x4d3)) return _0x33fc74; else { if (this[_0x13b1fc(0x3c6)]() > 0x0) { if (_0x13b1fc(0x2de) !== _0x13b1fc(0x49d)) { const _0x1fe3a7 = this[_0x13b1fc(0x4e8)](_0x4dd11c); if (_0x1fe3a7[_0x13b1fc(0x3c7)](/\\I\[(\d+)\]/i)) { if (_0x13b1fc(0x452) === _0x13b1fc(0x464)) this[_0x13b1fc(0x311)] = ''; else { const _0x597d25 = this[_0x13b1fc(0x429)](_0x4dd11c), _0x507993 = this['textSizeEx'](_0x1fe3a7)[_0x13b1fc(0x43d)]; return _0x507993 <= _0x597d25[_0x13b1fc(0x43d)] ? 'iconText' : _0x13b1fc(0x24d); } } } else { const _0x17ac87 = _0x24e68d[_0x13b1fc(0x48e)]; if (![_0x4a6f34, _0xd1f74b][_0x13b1fc(0x206)](_0x17ac87[_0x13b1fc(0x355)])) return _0x3dd63c['menuActor'](); } } } return _0x13b1fc(0x312); }, Window_SkillType[_0x183653(0x506)][_0x183653(0x393)] = function (_0x3ad660) { const _0x2f3e11 = _0x183653, _0x4afcf4 = this['itemLineRect'](_0x3ad660), _0x35399e = this['commandName'](_0x3ad660), _0x1511e7 = this[_0x2f3e11(0x3b7)](_0x35399e)[_0x2f3e11(0x43d)]; this['changePaintOpacity'](this[_0x2f3e11(0x421)](_0x3ad660)); const _0x55d56d = this[_0x2f3e11(0x28f)](); if (_0x55d56d === 'right') this[_0x2f3e11(0x4de)](_0x35399e, _0x4afcf4['x'] + _0x4afcf4[_0x2f3e11(0x43d)] - _0x1511e7, _0x4afcf4['y'], _0x1511e7); else { if (_0x55d56d === _0x2f3e11(0x20e)) { if (_0x2f3e11(0x238) === _0x2f3e11(0x2c8)) return _0x29a4c9 = _0x350a6c(_0x1de1a4), _0x715a9b[_0x2f3e11(0x3c7)](/#(.*)/i) ? _0x2f3e11(0x3b8)[_0x2f3e11(0x269)](_0x40f398(_0x779722['$1'])) : this[_0x2f3e11(0x46b)](_0x176f26(_0xd9cb87)); else { const _0x51e8cd = _0x4afcf4['x'] + Math['floor']((_0x4afcf4['width'] - _0x1511e7) / 0x2); this[_0x2f3e11(0x4de)](_0x35399e, _0x51e8cd, _0x4afcf4['y'], _0x1511e7); } } else { if (_0x2f3e11(0x1c2) === _0x2f3e11(0x1c2)) this[_0x2f3e11(0x4de)](_0x35399e, _0x4afcf4['x'], _0x4afcf4['y'], _0x1511e7); else { const _0x520838 = _0x1abcb1(_0x4696a0['$1']); if (_0x496137[_0x2f3e11(0x47f)](_0x520838)) return !![]; } } } }, Window_SkillType['prototype'][_0x183653(0x477)] = function (_0x188ec4) { const _0x4faf14 = _0x183653; this[_0x4faf14(0x4e8)](_0x188ec4)[_0x4faf14(0x3c7)](/\\I\[(\d+)\]/i); const _0x5c1548 = Number(RegExp['$1']) || 0x0, _0x433855 = this['itemLineRect'](_0x188ec4), _0x39cc18 = _0x433855['x'] + Math[_0x4faf14(0x2e2)]((_0x433855['width'] - ImageManager[_0x4faf14(0x241)]) / 0x2), _0x5627d7 = _0x433855['y'] + (_0x433855[_0x4faf14(0x30f)] - ImageManager[_0x4faf14(0x4ac)]) / 0x2; this[_0x4faf14(0x44f)](_0x5c1548, _0x39cc18, _0x5627d7); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x2f2)] = Window_SkillStatus[_0x183653(0x506)][_0x183653(0x2fc)], Window_SkillStatus[_0x183653(0x506)][_0x183653(0x2fc)] = function () { const _0x45b64a = _0x183653; VisuMZ[_0x45b64a(0x3eb)]['Window_SkillStatus_refresh'][_0x45b64a(0x41a)](this); if (this[_0x45b64a(0x4ef)]) this[_0x45b64a(0x3c4)](); }, Window_SkillStatus['prototype'][_0x183653(0x3c4)] = function () { const _0x4c3bfc = _0x183653; if (!Imported[_0x4c3bfc(0x290)]) return; if (!Imported['VisuMZ_1_MainMenuCore']) return; const _0x173205 = this[_0x4c3bfc(0x2f5)](); let _0x112e04 = this[_0x4c3bfc(0x3f7)]() / 0x2 + 0xb4 + 0xb4 + 0xb4, _0x2ba21c = this[_0x4c3bfc(0x3cd)] - _0x112e04 - 0x2; if (_0x2ba21c >= 0x12c) { const _0x29a41f = VisuMZ[_0x4c3bfc(0x505)][_0x4c3bfc(0x2e9)][_0x4c3bfc(0x28e)][_0x4c3bfc(0x1ed)], _0x20f7bf = Math[_0x4c3bfc(0x2e2)](_0x2ba21c / 0x2) - 0x18; let _0x2366a4 = _0x112e04, _0x9508bd = Math['floor']((this['innerHeight'] - Math[_0x4c3bfc(0x318)](_0x29a41f[_0x4c3bfc(0x4fc)] / 0x2) * _0x173205) / 0x2), _0x147d9e = 0x0; for (const _0x467452 of _0x29a41f) { if ('futwN' === _0x4c3bfc(0x2c3)) this[_0x4c3bfc(0x41b)](_0x2366a4, _0x9508bd, _0x20f7bf, _0x467452), _0x147d9e++, _0x147d9e % 0x2 === 0x0 ? (_0x2366a4 = _0x112e04, _0x9508bd += _0x173205) : _0x2366a4 += _0x20f7bf + 0x18; else { const _0x2cc46a = _0xdc6f92(_0x5dce92['$1']); if (_0x14b419['isStateAffected'](_0x2cc46a)) return !![]; } } } this[_0x4c3bfc(0x2be)](); }, Window_SkillStatus['prototype'][_0x183653(0x41b)] = function (_0x5e9f76, _0x3aeb1c, _0x587af9, _0x2af51b) { const _0x5b2c04 = _0x183653, _0x59f3eb = this[_0x5b2c04(0x2f5)](); this[_0x5b2c04(0x2be)](), this[_0x5b2c04(0x24a)](_0x5e9f76, _0x3aeb1c, _0x587af9, _0x2af51b, !![]), this['resetTextColor'](), this[_0x5b2c04(0x33d)]['fontSize'] -= 0x8; const _0x43815b = this['_actor'][_0x5b2c04(0x260)](_0x2af51b, !![]); this[_0x5b2c04(0x33d)]['drawText'](_0x43815b, _0x5e9f76, _0x3aeb1c, _0x587af9, _0x59f3eb, _0x5b2c04(0x2d6)); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x496)] = Window_SkillList['prototype']['includes'], Window_SkillList[_0x183653(0x506)]['includes'] = function (_0x2fc36c) { return this['includesSkillsStatesCore'](_0x2fc36c); }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1c8)] = Window_SkillList['prototype'][_0x183653(0x381)], Window_SkillList['prototype'][_0x183653(0x381)] = function () { const _0x2c68cf = _0x183653; if (SceneManager[_0x2c68cf(0x48e)][_0x2c68cf(0x355)] === Scene_Battle) return VisuMZ['SkillsStatesCore'][_0x2c68cf(0x1c8)][_0x2c68cf(0x41a)](this); else { if (_0x2c68cf(0x239) !== 'FOrFA') { if (_0x235c55['hasSkill'](_0x4f94b4)) return !![]; } else return VisuMZ[_0x2c68cf(0x3eb)]['Settings'][_0x2c68cf(0x3c2)][_0x2c68cf(0x2b9)]; } }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x4bb)] = Window_SkillList[_0x183653(0x506)][_0x183653(0x214)], Window_SkillList[_0x183653(0x506)][_0x183653(0x214)] = function (_0x501649) { const _0xc13fb1 = _0x183653, _0x2f1a55 = this[_0xc13fb1(0x4ef)] !== _0x501649; VisuMZ[_0xc13fb1(0x3eb)][_0xc13fb1(0x4bb)][_0xc13fb1(0x41a)](this, _0x501649), _0x2f1a55 && (this[_0xc13fb1(0x29c)] && this['_statusWindow']['constructor'] === Window_ShopStatus && this[_0xc13fb1(0x29c)][_0xc13fb1(0x3ad)](this[_0xc13fb1(0x426)](0x0))); }, Window_SkillList[_0x183653(0x506)][_0x183653(0x4d9)] = function (_0x2e09b5) { const _0x43285e = _0x183653; if (this[_0x43285e(0x24e)] === _0x2e09b5) return; this[_0x43285e(0x24e)] = _0x2e09b5, this[_0x43285e(0x2fc)](), this[_0x43285e(0x336)](0x0, 0x0), this[_0x43285e(0x29c)] && this[_0x43285e(0x29c)][_0x43285e(0x355)] === Window_ShopStatus && (_0x43285e(0x2c1) !== 'QQQrg' ? this[_0x43285e(0x29c)][_0x43285e(0x3ad)](this[_0x43285e(0x426)](0x0)) : _0x1f0f34[_0x43285e(0x309)](_0x19ff2e)); }, Window_SkillList[_0x183653(0x506)][_0x183653(0x40d)] = function (_0xa41fd5) { const _0x57b917 = _0x183653; if (!_0xa41fd5) return VisuMZ[_0x57b917(0x3eb)][_0x57b917(0x496)][_0x57b917(0x41a)](this, _0xa41fd5); if (!this[_0x57b917(0x350)](_0xa41fd5)) return ![]; if (!this['checkShowHideNotetags'](_0xa41fd5)) return ![]; if (!this['checkShowHideJS'](_0xa41fd5)) return ![]; return !![]; }, Window_SkillList[_0x183653(0x506)][_0x183653(0x350)] = function (_0x24540e) { const _0x227645 = _0x183653; return DataManager[_0x227645(0x42e)](_0x24540e)[_0x227645(0x206)](this[_0x227645(0x24e)]); }, Window_SkillList[_0x183653(0x506)]['checkShowHideNotetags'] = function (_0x1cb7b2) { const _0x6de22a = _0x183653; if (!VisuMZ['SkillsStatesCore'][_0x6de22a(0x4dd)](this[_0x6de22a(0x4ef)], _0x1cb7b2)) return ![]; if (!VisuMZ[_0x6de22a(0x3eb)][_0x6de22a(0x3b3)](this[_0x6de22a(0x4ef)], _0x1cb7b2)) return ![]; if (!VisuMZ[_0x6de22a(0x3eb)][_0x6de22a(0x1ff)](this['_actor'], _0x1cb7b2)) return ![]; return !![]; }, VisuMZ['SkillsStatesCore'][_0x183653(0x4dd)] = function (_0x362fdd, _0x563501) { const _0x2f0dbd = _0x183653, _0x1b1702 = _0x563501[_0x2f0dbd(0x25b)]; if (_0x1b1702[_0x2f0dbd(0x3c7)](/<HIDE IN BATTLE>/i) && $gameParty[_0x2f0dbd(0x4d6)]()) return ![]; else { if (_0x1b1702[_0x2f0dbd(0x3c7)](/<HIDE OUTSIDE BATTLE>/i) && !$gameParty[_0x2f0dbd(0x4d6)]()) return 'RZjAA' !== _0x2f0dbd(0x4c4) ? ![] : _0x21bdc1['mainFontFace'](); else { if (_0x2f0dbd(0x1dc) === _0x2f0dbd(0x1dc)) return !![]; else this['_stateTurns'][_0x4782e8]--; } } }, VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags'] = function (_0x121170, _0x224548) { const _0x1e92ef = _0x183653, _0x4e77b5 = _0x224548[_0x1e92ef(0x25b)]; if (_0x4e77b5[_0x1e92ef(0x3c7)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x5c0b83 = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x29dae2 of _0x5c0b83) { if ('qhDsI' === 'nqPdj') return this['gaugeColor1'](); else { if (!$gameSwitches[_0x1e92ef(0x222)](_0x29dae2)) return ![]; } } return !![]; } if (_0x4e77b5[_0x1e92ef(0x3c7)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x59f248 = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1']['match'](/\d+/g) + ']'); for (const _0x3883c0 of _0x59f248) { if (!$gameSwitches[_0x1e92ef(0x222)](_0x3883c0)) return ![]; } return !![]; } if (_0x4e77b5[_0x1e92ef(0x3c7)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0xcaaa21 = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x4526d5 of _0xcaaa21) { if ($gameSwitches[_0x1e92ef(0x222)](_0x4526d5)) return !![]; } return ![]; } if (_0x4e77b5[_0x1e92ef(0x3c7)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x7d019 = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x4098c2 of _0x7d019) { if (!$gameSwitches[_0x1e92ef(0x222)](_0x4098c2)) return !![]; } return ![]; } if (_0x4e77b5[_0x1e92ef(0x3c7)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x17d0be = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x27a437 of _0x17d0be) { if ('GFAPE' !== _0x1e92ef(0x476)) { const _0x5181d0 = _0x1f405a[_0x1e92ef(0x3ee)]('[' + _0x2ccb49['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x544adf of _0x5181d0) { if (_0x2b9edc['hasSkill'](_0x544adf)) return !![]; } return ![]; } else { if (!$gameSwitches['value'](_0x27a437)) return !![]; } } return ![]; } if (_0x4e77b5[_0x1e92ef(0x3c7)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0x1e92ef(0x1cf) === _0x1e92ef(0x31f)) { const _0x1988b6 = []; for (const _0x51bf59 of this[_0x1e92ef(0x43e)]()[_0x1e92ef(0x4b5)]) { const _0xe2a39e = _0x57bccf[_0x51bf59[_0x1e92ef(0x2bb)]]; if (_0xe2a39e && !_0x1988b6[_0x1e92ef(0x206)](_0xe2a39e)) _0x1988b6['push'](_0xe2a39e); } return _0x1988b6; } else { const _0x240924 = JSON[_0x1e92ef(0x3ee)]('[' + RegExp['$1'][_0x1e92ef(0x3c7)](/\d+/g) + ']'); for (const _0x506eb3 of _0x240924) { if ($gameSwitches[_0x1e92ef(0x222)](_0x506eb3)) return ![]; } return !![]; } } return !![]; }, VisuMZ[_0x183653(0x3eb)][_0x183653(0x1ff)] = function (_0x26017d, _0x187fb8) { const _0xb958b0 = _0x183653, _0x203711 = _0x187fb8[_0xb958b0(0x25b)]; if (_0x203711['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if ('MuTxY' !== _0xb958b0(0x33b)) { const _0x343076 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0xaef936 of _0x343076) { if (!_0x26017d['isLearnedSkill'](_0xaef936)) return ![]; } return !![]; } else { let _0x5af028 = _0x1a9bf8[_0xb958b0(0x47a)][_0xb958b0(0x41a)](this, _0x1308f4); _0x5af028 = this[_0xb958b0(0x3bd)](_0x4e2c7b, _0x5af028, _0x5c30f6), _0x137387[_0xb958b0(0x42d)][_0xb958b0(0x41a)](this, _0x3b8647, _0x5af028); } } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x3ef) === _0xb958b0(0x4a0)) this['_statusWindow'][_0xb958b0(0x3ad)](this['item']()); else { const _0x1c67a6 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x415987 of _0x1c67a6) { const _0xe407fc = DataManager[_0xb958b0(0x33a)](_0x415987); if (!_0xe407fc) continue; if (!_0x26017d['isLearnedSkill'](_0xe407fc)) return ![]; } return !![]; } } } if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x5089b1 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x504227 of _0x5089b1) { if (_0xb958b0(0x2dc) === _0xb958b0(0x209)) this[_0xb958b0(0x477)](_0x5a3472); else { if (!_0x26017d[_0xb958b0(0x2ea)](_0x504227)) return ![]; } } return !![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { const _0x46c2e0 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0xa96e7d of _0x46c2e0) { if (_0xb958b0(0x240) === _0xb958b0(0x1bb)) { if (_0x270e66['uiMenuStyle'] && _0x58c07c['uiInputPosition'] !== _0xe2b2e) return _0x7e0406[_0xb958b0(0x2e4)]; else return this[_0xb958b0(0x243)]() ? this['updatedLayoutStyle']()[_0xb958b0(0x3c7)](/RIGHT/i) : _0x2f024b[_0xb958b0(0x506)][_0xb958b0(0x283)][_0xb958b0(0x41a)](this); } else { const _0x4ac741 = DataManager[_0xb958b0(0x33a)](_0xa96e7d); if (!_0x4ac741) continue; if (!_0x26017d['isLearnedSkill'](_0x4ac741)) return ![]; } } return !![]; } } if (_0x203711['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x28255c = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1']['match'](/\d+/g) + ']'); for (const _0x3d2101 of _0x28255c) { if (_0xb958b0(0x407) !== 'iIiOi') _0x9e7dce[_0xb958b0(0x230)][_0xb958b0(0x309)]('POSITIVE'); else { if (_0x26017d['isLearnedSkill'](_0x3d2101)) return !![]; } } return ![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x445) !== _0xb958b0(0x445)) { const _0x3870b7 = _0xccb64c[_0xb958b0(0x450)](_0x103d54); if (_0x3870b7) this[_0xb958b0(0x46a)][_0x5b4668['id']][_0xb958b0(0x309)](_0x3870b7); } else { const _0x2adbf4 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x3fc25a of _0x2adbf4) { if (_0xb958b0(0x26b) !== _0xb958b0(0x26b)) return _0x1e1102[_0xb958b0(0x448)](); else { const _0x2b44a1 = DataManager['getSkillIdWithName'](_0x3fc25a); if (!_0x2b44a1) continue; if (_0x26017d[_0xb958b0(0x2ea)](_0x2b44a1)) return !![]; } } return ![]; } } } if (_0x203711['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0xb958b0(0x346) === _0xb958b0(0x346)) { const _0x505b11 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x3a886f of _0x505b11) { if (!_0x26017d[_0xb958b0(0x2ea)](_0x3a886f)) return !![]; } return ![]; } else { const _0x78aada = _0xa3a67d['parse']('[' + _0x4fd058['$1']['match'](/\d+/g) + ']'); for (const _0x2531f8 of _0x78aada) { if (!_0x2d9692['hasSkill'](_0x2531f8)) return !![]; } return ![]; } } else { if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x3f5) === _0xb958b0(0x416)) this[_0xb958b0(0x29c)][_0xb958b0(0x3ad)](this[_0xb958b0(0x426)](0x0)); else { const _0x346709 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x479de9 of _0x346709) { const _0xc6d0a = DataManager[_0xb958b0(0x33a)](_0x479de9); if (!_0xc6d0a) continue; if (!_0x26017d['isLearnedSkill'](_0xc6d0a)) return !![]; } return ![]; } } } if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x57fa6e = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x533b01 of _0x57fa6e) { if (!_0x26017d[_0xb958b0(0x2ea)](_0x533b01)) return !![]; } return ![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x4d1) !== 'VRzes') { const _0x2f9129 = _0x3a85cf(_0x53610b['$1']), _0x383164 = _0x4fe354[_0xb958b0(0x269)](_0x2f9129, 'damage', -0x1, _0xb958b0(0x48f)); _0x1d942a[_0xb958b0(0x3eb)]['stateHpSlipDamageJS'][_0x112e2e['id']] = new _0x2ad60e(_0xb958b0(0x515), _0x383164); } else { const _0x16038d = RegExp['$1']['split'](','); for (const _0x12422a of _0x16038d) { if (_0xb958b0(0x4bf) === _0xb958b0(0x49c)) this[_0xb958b0(0x4b9)] = _0x47e701[0x0]; else { const _0x5bcece = DataManager['getSkillIdWithName'](_0x12422a); if (!_0x5bcece) continue; if (!_0x26017d[_0xb958b0(0x2ea)](_0x5bcece)) return !![]; } } return ![]; } } } if (_0x203711['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0xb958b0(0x2ae) === _0xb958b0(0x2ae)) { const _0x52e0d6 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x5397c8 of _0x52e0d6) { if (_0x26017d[_0xb958b0(0x2ea)](_0x5397c8)) return ![]; } return !![]; } else { const _0x362a95 = _0x334ac3['note']; return _0x362a95[_0xb958b0(0x3c7)](/<REAPPLY RULES:[ ](.*)>/i) ? _0x96094f(_0x51f2b8['$1']) : _0x5a1847['SkillsStatesCore'][_0xb958b0(0x2e9)][_0xb958b0(0x30e)][_0xb958b0(0x48d)]; } } else { if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x250) === _0xb958b0(0x250)) { const _0xb8de07 = RegExp['$1']['split'](','); for (const _0x52e370 of _0xb8de07) { const _0x11a243 = DataManager[_0xb958b0(0x33a)](_0x52e370); if (!_0x11a243) continue; if (_0x26017d[_0xb958b0(0x2ea)](_0x11a243)) return ![]; } return !![]; } else _0x3899cd = _0x2169d0[_0xb958b0(0x343)](_0x1fdb23); } } if (_0x203711['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x18112c = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x3e98b3 of _0x18112c) { if (_0xb958b0(0x23b) !== _0xb958b0(0x23b)) { const _0x1281aa = _0x1d50dd[_0xb958b0(0x3ee)]('[' + _0x5979d8['$1']['match'](/\d+/g) + ']'); for (const _0x38efaf of _0x1281aa) { if (!_0x1ff75b[_0xb958b0(0x222)](_0x38efaf)) return ![]; } return !![]; } else { if (!_0x26017d[_0xb958b0(0x2e8)](_0x3e98b3)) return ![]; } } return !![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { const _0xbbab0d = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x35fbe2 of _0xbbab0d) { if (_0xb958b0(0x472) !== _0xb958b0(0x472)) _0x378604['SkillsStatesCore'][_0xb958b0(0x2e9)]['Buffs'][_0xb958b0(0x301)][_0xb958b0(0x41a)](this, _0x2ff36d, _0x17a6a4); else { const _0x219ccd = DataManager[_0xb958b0(0x33a)](_0x35fbe2); if (!_0x219ccd) continue; if (!_0x26017d[_0xb958b0(0x2e8)](_0x219ccd)) return ![]; } } return !![]; } } if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x6d9bd7 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x11b280 of _0x6d9bd7) { if ('gdHZL' !== 'gdHZL') { const _0x348914 = _0x5b8a69[_0xb958b0(0x3ee)]('[' + _0x2755e5['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x407b93 of _0x348914) { if (!_0x59a56e[_0xb958b0(0x2ea)](_0x407b93)) return !![]; } return ![]; } else { if (!_0x26017d['hasSkill'](_0x11b280)) return ![]; } } return !![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if (_0xb958b0(0x34b) === _0xb958b0(0x4fe)) this['_currentTroopUniqueID'] = _0x30ae9c[_0xb958b0(0x31c)]; else { const _0x34a6c8 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x57c6d5 of _0x34a6c8) { if (_0xb958b0(0x32a) === 'PQZYz') return _0xb958b0(0x244); else { const _0x309825 = DataManager[_0xb958b0(0x33a)](_0x57c6d5); if (!_0x309825) continue; if (!_0x26017d[_0xb958b0(0x2e8)](_0x309825)) return ![]; } } return !![]; } } } if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0x40368a = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x599fbc of _0x40368a) { if (_0x26017d[_0xb958b0(0x2e8)](_0x599fbc)) return !![]; } return ![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { const _0x2e7647 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x2bf869 of _0x2e7647) { const _0x10f9be = DataManager['getSkillIdWithName'](_0x2bf869); if (!_0x10f9be) continue; if (_0x26017d[_0xb958b0(0x2e8)](_0x10f9be)) return !![]; } return ![]; } } if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { const _0xea06ec = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0xe3a16e of _0xea06ec) { if (_0xb958b0(0x28d) !== _0xb958b0(0x28d)) { const _0x15f609 = _0x568eee[_0x48691b - _0xb3ce9d[_0xb958b0(0x4fc)]]; if (_0x15f609 === _0x331bcf) return; _0xe3121b[_0xb958b0(0x506)][_0xb958b0(0x36e)]['call'](this, _0x2730c5, _0x15f609, 0x0, 0x0), _0x76ab32[_0xb958b0(0x506)][_0xb958b0(0x2d3)][_0xb958b0(0x41a)](this, _0x391cf5, _0x15f609, 0x0, 0x0); } else { if (!_0x26017d['hasSkill'](_0xe3a16e)) return !![]; } } return ![]; } else { if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { const _0x5ae5c8 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x517a47 of _0x5ae5c8) { const _0x2b02b5 = DataManager[_0xb958b0(0x33a)](_0x517a47); if (!_0x2b02b5) continue; if (!_0x26017d[_0xb958b0(0x2e8)](_0x2b02b5)) return !![]; } return ![]; } } if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0xb958b0(0x38a) === _0xb958b0(0x38a)) { const _0x1267f9 = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x59900b of _0x1267f9) { if (!_0x26017d[_0xb958b0(0x2e8)](_0x59900b)) return !![]; } return ![]; } else return _0xba5f61; } else { if (_0x203711['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { if ('gmlye' !== _0xb958b0(0x396)) { const _0x16d88d = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x32fea3 of _0x16d88d) { if (_0xb958b0(0x3ed) === _0xb958b0(0x3ed)) { const _0x396039 = DataManager[_0xb958b0(0x33a)](_0x32fea3); if (!_0x396039) continue; if (!_0x26017d[_0xb958b0(0x2e8)](_0x396039)) return !![]; } else { if (!_0x29119b['value'](_0x89baa9)) return ![]; } } return ![]; } else { if (!_0x7cf9a0[_0xb958b0(0x222)](_0x2e8b9c)) return ![]; } } } if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) { if (_0xb958b0(0x401) === _0xb958b0(0x401)) { const _0x41eddd = JSON[_0xb958b0(0x3ee)]('[' + RegExp['$1'][_0xb958b0(0x3c7)](/\d+/g) + ']'); for (const _0x252560 of _0x41eddd) { if (_0x26017d[_0xb958b0(0x2e8)](_0x252560)) return ![]; } return !![]; } else return ''; } else { if (_0x203711[_0xb958b0(0x3c7)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)) { const _0xd19149 = RegExp['$1'][_0xb958b0(0x212)](','); for (const _0x30caae of _0xd19149) { const _0xb108f1 = DataManager['getSkillIdWithName'](_0x30caae); if (!_0xb108f1) continue; if (_0x26017d['hasSkill'](_0xb108f1)) return ![]; } return !![]; } } return !![]; }, Window_SkillList[_0x183653(0x506)][_0x183653(0x333)] = function (_0x2de606) { const _0x3ccdfd = _0x183653, _0x11b801 = _0x2de606[_0x3ccdfd(0x25b)], _0x4e833d = VisuMZ['SkillsStatesCore'][_0x3ccdfd(0x349)]; return _0x4e833d[_0x2de606['id']] ? _0x4e833d[_0x2de606['id']]['call'](this, _0x2de606) : _0x3ccdfd(0x4ea) === _0x3ccdfd(0x2e3) ? _0x4fcb5d(_0x3431e8['$1']) : !![]; }, VisuMZ[_0x183653(0x3eb)]['Window_SkillList_drawItem'] = Window_SkillList['prototype'][_0x183653(0x428)], Window_SkillList['prototype'][_0x183653(0x428)] = function (_0x4eb527) { const _0x335d2c = _0x183653, _0x175db3 = this[_0x335d2c(0x426)](_0x4eb527), _0x42060a = _0x175db3 ? _0x175db3['name'] : ''; if (_0x175db3) this[_0x335d2c(0x2f3)](_0x175db3); VisuMZ[_0x335d2c(0x3eb)]['Window_SkillList_drawItem']['call'](this, _0x4eb527); if (_0x175db3) _0x175db3[_0x335d2c(0x242)] = _0x42060a; }, Window_SkillList[_0x183653(0x506)][_0x183653(0x2f3)] = function (_0x1bbb1d) { const _0x3cc723 = _0x183653; if (_0x1bbb1d && _0x1bbb1d[_0x3cc723(0x25b)][_0x3cc723(0x3c7)](/<LIST NAME:[ ](.*)>/i)) { if ('SfCku' === 'DhwbW') { const _0x3433e3 = this[_0x3cc723(0x454)]; _0x3433e3['drawText'](_0x38adb3, 0x0, _0x4ef3b5['y'], _0x3433e3[_0x3cc723(0x3cd)], _0x3cc723(0x20e)); } else { _0x1bbb1d[_0x3cc723(0x242)] = String(RegExp['$1'])[_0x3cc723(0x420)](); for (; ;) { if (_0x3cc723(0x1d5) !== _0x3cc723(0x1d5)) { if (_0x4cf9d7[_0x3cc723(0x34f)]()) _0x92b01c[_0x3cc723(0x3e2)](_0x35da44); } else { if (_0x1bbb1d[_0x3cc723(0x242)]['match'](/\\V\[(\d+)\]/gi)) { if (_0x3cc723(0x2a8) !== 'jqUwa') _0x1bbb1d[_0x3cc723(0x242)] = _0x1bbb1d[_0x3cc723(0x242)][_0x3cc723(0x299)](/\\V\[(\d+)\]/gi, (_0x3551c1, _0x1b810b) => $gameVariables[_0x3cc723(0x222)](parseInt(_0x1b810b))); else return []; } else break; } } } } }, Window_SkillList[_0x183653(0x506)][_0x183653(0x497)] = function (_0x1ac6cd, _0x552d51, _0x10e284, _0x25a754) { const _0x1191f0 = _0x183653; Window_Base[_0x1191f0(0x506)]['drawSkillCost'][_0x1191f0(0x41a)](this, this[_0x1191f0(0x4ef)], _0x1ac6cd, _0x552d51, _0x10e284, _0x25a754); }, Window_SkillList[_0x183653(0x506)][_0x183653(0x24c)] = function (_0x3a7b7f) { const _0x167569 = _0x183653; this['_statusWindow'] = _0x3a7b7f, this[_0x167569(0x27c)](); }, VisuMZ['SkillsStatesCore'][_0x183653(0x418)] = Window_SkillList[_0x183653(0x506)][_0x183653(0x21a)], Window_SkillList[_0x183653(0x506)][_0x183653(0x21a)] = function () { const _0x30f49d = _0x183653; VisuMZ['SkillsStatesCore'][_0x30f49d(0x418)]['call'](this), this[_0x30f49d(0x29c)] && this[_0x30f49d(0x29c)][_0x30f49d(0x355)] === Window_ShopStatus && (_0x30f49d(0x1d3) !== 'cVdQJ' ? _0x5ece05['SkillsStatesCore'][_0x30f49d(0x40c)]['call'](this, _0x532ae1) : this[_0x30f49d(0x29c)]['setItem'](this[_0x30f49d(0x2f4)]())); };