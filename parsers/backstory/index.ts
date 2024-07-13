import { replaceTags } from "../functions";
import type { Character, Statistics } from "@/types";
import { random } from "@/utils";

export function getAlignmentDescription(alignment: string) {
  switch (alignment) {
    case "Lawful Good":
      return "[Name] is a paragon of virtue, and [he] always tries to do the right thing";
    case "Neutral Good":
      return "[Name] is a good person, but [he] doesn't let [his] morals get in the way of doing what's right";
    case "Chaotic Good":
      return "[Name] is a rebel who fights against tyranny and oppression, no matter the cost";
    case "Lawful Neutral":
      return "[Name] follows the law to the letter, no matter what";
    case "Neutral":
      return "[Name] is a pragmatist who does whatever it takes to get the job done";
    case "Chaotic Neutral":
      return "[Name] is a free spirit who follows [his] own whims, with disregard for the law";
    case "Lawful Evil":
      return "[Name] seeks power and control, and will hurt others to get it. [He] follows a strict code of conduct";
    case "Neutral Evil":
      return "[Name] does whatever it takes to get what [he] wants, no matter who gets hurt";
    case "Chaotic Evil":
      return "[Name] acts according to whatever [his] greed, hatred, and lust for destruction drives [him] to do";
    case "Alignment":
      return "[Name] can fit into any alignment, depending on the situation";
    case "Unaligned":
      return "[Name] doesn't feel strongly one way or the other about morality";
    case "Any Good":
    case "Good":
      return "[Name] is a force for good in the world";
    case "Any Evil":
    case "Evil":
      return "[Name] is a force for evil in the world";
    case "Any Lawful":
    case "Lawful":
      return "[Name] believes in order and structure";
    case "Any Chaotic":
    case "Chaotic":
      return "[Name] believes in personal freedom and self-expression";
    case "Any Neutral":
      return "[Name] is a neutral force in the world";
    default:
      return "";
  }
}

export function getAlignmentDescriptionSimple(alignment: string) {
  switch (alignment) {
    case "Lawful Good":
      return "good and honourable";
    case "Neutral Good":
      return "good";
    case "Chaotic Good":
      return "good and unpredictable";
    case "Lawful Neutral":
      return "lawful";
    case "Neutral":
      return "neutral";
    case "Chaotic Neutral":
      return "unpredictable";
    case "Lawful Evil":
      return "evil but honourable";
    case "Neutral Evil":
      return "evil";
    case "Chaotic Evil":
      return "evil and unpredictable";
    case "Alignment":
      return "adaptable";
    case "Unaligned":
      return "";
    case "Any Good":
    case "Good":
      return "good";
    case "Any Evil":
    case "Evil":
      return "evil";
    case "Any Lawful":
    case "Lawful":
      return "lawful";
    case "Any Chaotic":
    case "Chaotic":
      return "chaotic";
    case "Any Neutral":
      return "neutral";
    default:
      return "";
  }
}

export function getArchetypeDescription(archetype: string) {
  switch (archetype) {
    case "Beast":
      return "[Name] is a reckless warrior who enrages in battle, transforming into a beastly form to gain power";
    case "Berserker":
      return "[Name] is a reckless warrior who enrages in battle";
    case "Hurler":
      return "[Name] is a warrior who hurls objects at [his] enemies with deadly accuracy";
    case "College of Lore":
      return "[Name] is a bard who uses [his] magic, knowledge and wit to outsmart [his] enemies";
    case "College of Whispers":
      return "[Name] is a bard who uses [his] knowledge and magic to uncover secrets and turn them against others through extortion and threats";
    case "Death Domain":
      return "[Name] is an armored warrior who is concerned with the forces that cause death. [His] deity has granted [him] divine powers that harm others through necrotic and negative energy";
    case "Life Domain":
      return "[Name] is an armored warrior who is concerned with the vibrant positive energy that sustains all life. [His] deity has granted [him] divine powers that heal and protect others";
    case "War Domain":
      return "[Name] is an armored warrior who is concerned with the art of war. [His] deity has granted [him] divine powers that help [him] and [his] allies in battle";
    case "Arctic":
      return "[Name] is a protector of frozen lands and the creatures that live there. [He] can transform into one of the beasts of the arctic, or cast powerful spells attuned the cold lands [he] calls home";
    case "Forest":
      return "[Name] is a protector of the forest and the creatures that live there. [He] can transform into one of the beasts of the forest, or cast powerful spells attuned to the natural world [he] calls home";
    case "Underdark":
      return "[Name] is a protector of the underdark and the creatures that live there. [He] can transform into one of the beasts of the underdark, or cast powerful spells attuned to the dark lands [he] calls home";
    case "Dexterous":
      return "[Name] is a skilled warrior who uses [his] agility and speed to outmaneuver [his] enemies";
    case "Tank":
      return "[Name] is a heavily armored warrior who can take a lot of damage and protect [his] allies";
    case "Two-Handed Weapons":
      return "[Name] is a warrior who wields a massive weapon with deadly precision";
    case "Four Elements":
      return "[Name] is a monk who has mastered the elements, using [his] ki to harness the power of fire, water, earth, and air";
    case "Way of the Open Hand":
      return "[Name] is a monk who uses [his] ki to heal and protect [his] allies, and to strike down [his] enemies with deadly precision";
    case "Oath of Devotion":
      return "[Name] is an armored fighter wielding divine magic, who has sworn an oath to uphold the values of [his] deity";
    case "Oath of Vengeance":
      return "[Name] is an armored fighter wielding divine magic, who has sworn an oath to destroy [his] enemies";
    case "Archer":
      return "[Name] is a skilled archer who wanders the land, and can cast spells attuned to the natural world [he] calls home";
    case "Dual Wielder":
      return "[Name] is a skilled warrior who wanders the land. [He] fights with two deadly weapons, and can cast spells attuned to the natural world [he] calls home";
    case "Protector":
      return "[Name] is a skilled warrior who wanders the land. [He] can cast spells attuned to the natural world [he] calls home, and can use [his] weapons and shield to protect [his] allies";
    case "Assassin":
      return "[Name] is a skilled killer who uses stealth and cunning to take down [his] enemies";
    case "Thief":
      return "[Name] is a skilled thief who uses stealth and cunning to get what [he] wants";
    case "Aberrant Mind":
      return "[Name] is a sorcerer who has been touched by the far realm, and can cast spells that warp reality and the minds of others";
    case "Draconic Bloodline":
      return "[Name] is a sorcerer who has inherited the power of dragons, and can cast spells that harness the power of the elements";
    case "Archfey Patron":
      return "[Name] is a warlock who has made a pact with a powerful archfey, and can cast spells that manipulate the forces of nature";
    case "Fiend Patron":
      return "[Name] is a warlock who has made a pact with a powerful fiend, and can cast spells that harness the power of the lower planes";
    case "Great Old One Patron":
      return "[Name] is a warlock who has made a pact with a powerful great old one, and can cast spells that warp reality and the minds of others";
    case "Abjurer":
      return "[Name] is a wizard who specializes in protective magic, and can cast spells that shield [him] and [his] allies from harm";
    case "Conjurer":
      return "[Name] is a wizard who specializes in summoning magic, and can cast spells that call forth creatures and objects to aid [him] in battle";
    case "Diviner":
      return "[Name] is a wizard who specializes in divination magic, and can cast spells that reveal secrets and predict the future";
  }
  return "";
}

export function parseRoleplayStats(character: Character) {
  const s = character.statistics!;
  const name = `${s.fullName}`;
  let gender = "";
  if (s.pronouns === "neutral") {
    gender = "nonbinary";
  } else if (s.pronouns === "thing") {
    gender = "No gender (the character is a thing)";
  } else {
    gender = s.pronouns;
  }
  const race = s.race || "";
  let characterHook = "";
  if ("characterHook" in s && s.characterHook) {
    characterHook = s.characterHook.map((hook) => hook.string).join("");
  }
  let professionDetails = "";
  if (character.character.classvariant) {
    professionDetails = getArchetypeDescription(
      character.character.classvariant?.name
    );
  }
  const age = `${s.age || "unspecified"}`;
  const alignment = `${getAlignmentDescriptionSimple(s.alignment.string)}`;
  const personality = s.personality || "";
  const voice = s.voice || "";
  return {
    name,
    gender,
    race,
    characterHook,
    professionDetails,
    age,
    alignment,
    personality,
    voice,
  };
}

// function testPolygenCapabilities(character: Character) {
//   return `
//     S ::= ("Write a poem" |
//     "Explain fission in layman's terms" | "Write a short story") ;
//   `;
// }

export function getBackstory(character: Character) {
  const backstoryType = random(1, 3);
  let backstory = "";
  switch (backstoryType) {
    case 1:
    case 2:
    default:
      backstory = getTabloidPrompt(character);
  }
  return backstory;
}

function getTabloidPrompt(character: Character) {
  const stats = parseRoleplayStats(character);
  const backstory = `S ::=
"Write an excerpt from an imaginary fantasy medieval gossip tabloid."
"- do not write any title
- start with ... a truncated sentence, as if the excerpt was extracted randomly from the article
- also end with a truncated sentence... or a cliffhanger
- only write the excerpt, no other text must be included (no title, no author, no ending line, etc.)
- write in the style of a Fox News special report
- make the excerpt at least 200 words long
- Imagine this excerpt to be extracted from an article that talks about a character
- This character is defined, by the community, by the following character hook: ${stats.characterHook}
- the tabloid will speculate about why people think that way about the character
- provide one possible cause, and give proof of it in the excerpt
- do not mention the character hook directly,
or the character's traits but hint at them, just be inspired by them
- additional details about the character: 
[His] name is ${stats.name}, 
[He] is a ${stats.age} ${stats.gender} ${stats.race}.
[His] defining personality trait is '${stats.personality}', and ${stats.alignment}. ";
`;
  return parsePromptTags(backstory, character);
}

function getExcerptPrompt(character: Character) {
  const stats = parseRoleplayStats(character);
  const backstory = `
  Write an excerpt from an imaginary fantasy novel.
  - do not write any title
  - start with ... a truncated sentence, as if the excerpt was extracted randomly from the novel
  - also end with a truncated sentence...
  - only write the excerpt, no other text must be included (no title, no author, no ending line, etc.)
  - make the excerpt at least 200 words long
  - this excerpt comes from a chapter in which a character of 
the book has an ordinary boring moment in their life
  - This moment, and the character, are defined by the following character hook: ${stats.characterHook}
  - do not mention the character hook directly,
  or the character's traits, but hint at them, just be inspired by them
  - additional details about the character: 
  [His] name is ${stats.name}, 
  [He] is a ${stats.age} ${stats.gender} ${stats.race}.
  [His] defining personality trait is "${stats.personality}", and ${stats.alignment}.
  `;
  return parsePromptTags(backstory, character);
}

/*

`
  Write an excerpt from an imaginary fantasy novel.
  - do not write any title
  - start with ... a truncated sentence, as if the excerpt was extracted randomly from the novel
  - also end with a truncated sentence...
  - only write the excerpt, no other text must be included (no title, no author, no ending line, etc.)
  - write in the style of H. P. Lovecraft
  - make the excerpt at least 200 words long
  - this excerpt comes from a chapter in which a character of 
the book has their most iconic moment
  - This moment, and the character, are defined by the following character hook: ${stats.characterHook}
  - do not mention the character hook directly,
  or the character's traits, but hint at them, just be inspired by them
  - additional details about the character: 
  [His] name is ${stats.name}, 
  [He] is a ${stats.age} ${stats.gender} ${stats.race}.
  [His] defining personality trait is "${stats.personality}", and ${stats.alignment}.
  `;

*/

function parsePromptTags(prompt: string, character: Character) {
  return replaceTags(prompt, character)
    .map((part) => part.string)
    .join("");
}
