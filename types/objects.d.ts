import { enchantmentObject } from './../node_modules/monstershuffler-shared/schemas/objects/character/actions';
import { Variables } from "./objects.d";
import { z } from "zod";
import {
  abilitiesEnum,
  abilitiesObject,
  actionObject,
  actionVariantObject,
  alignmentEthical,
  alignmentMoral,
  armorObject,
  attackObject,
  backgroundObject,
  bonusesObject,
  bonusObject,
  characterObject,
  chosenActionObject,
  descriptionPartObject,
  enchantmentObject,
  imageObject,
  npcDetailsObject,
  pageSettings,
  parsedActionObject,
  parsedDice,
  parsedExpression,
  sPostRandomNpcResponse,
  raceObject,
  resourcePartObject,
  roll,
  sensesObject,
  speedsObject,
  spellObject,
  spellsObject,
  spellGroupObject,
  statisticsObject,
  statObject,
  statString,
  statStringArray,
  statStringArrayWithName,
  statStringNumber,
  statStringNumberArray,
  statStringWithName,
  tagsObject,
  tokenObject,
  userObject,
  valueDiceObject,
  valueExpressionObject,
  valueIncrProgressionObject,
  variablesObject,
  variationsObject,
  weaponObject,
} from "monstershuffler-shared";

export type Abilities = z.infer<typeof abilitiesObject>;
export type AbilitiesEnum = z.infer<typeof abilitiesEnum>;
export type Action = z.infer<typeof actionObject>;
export type ActionVariant = z.infer<typeof actionVariantObject>;
export type AlignmentEthical = z.infer<typeof alignmentEthical>;
export type AlignmentMoral = z.infer<typeof alignmentMoral>;
export type Armor = z.infer<typeof armorObject>;
export type Attack = z.infer<typeof attackObject>;
export type Background = z.infer<typeof backgroundObject>;
export type Bonus = z.infer<typeof bonusObject>;
export type Bonuses = z.infer<typeof bonusesObject>;
export type Character = z.infer<typeof characterObject>;
export type ChosenAction = z.infer<typeof chosenActionObject>;
export type Condition = z.infer<typeof userObject>;
export type DescriptionPart = z.infer<typeof descriptionPartObject>;
export type Enchantment = z.infer<typeof enchantmentObject>;
export type Image = z.infer<typeof imageObject>;
export type NpcDetails = z.infer<typeof npcDetailsObject>;
export type PageSettings = z.infer<typeof pageSettings>;
export type ParsedAction = z.infer<typeof parsedActionObject>;
export type ParsedDice = z.infer<typeof parsedDice>;
export type ParsedExpression = z.infer<typeof parsedExpression>;
export type Race = z.infer<typeof raceObject>;
export type Roll = z.infer<typeof roll>;
export type ResourcePart = z.infer<typeof resourcePartObject>;
export type Senses = z.infer<typeof sensesObject>;
export type Speeds = z.infer<typeof speedsObject>;
export type Spell = z.infer<typeof spellObject>;
export type Spells = z.infer<typeof spellsObject>;
export type SpellGroup = z.infer<typeof spellGroupObject>;
export type Stat = z.infer<typeof statObject>;
export type Statistics = z.infer<typeof statisticsObject>;
export type StatString = z.infer<typeof statString>;
export type StatStringArray = z.infer<typeof statStringArray>;
export type StatStringArrayWithName = z.infer<typeof statStringArrayWithName>;
export type StatStringNumber = z.infer<typeof statStringNumber>;
export type StatStringNumberArray = z.infer<typeof statStringNumberArray>;
export type StatStringWithName = z.infer<typeof statStringWithName>;
export type Subtypes = z.infer<typeof subtypesObject>;
export type Tags = z.infer<typeof tagsObject>;
export type Token = z.infer<typeof tokenObject>;
export type ValueDice = z.infer<typeof valueDiceObject>;
export type ValueExpression = z.infer<typeof valueExpressionObject>;
export type ValueIncrProgression = z.infer<typeof valueIncrProgressionObject>;
export type Variables = z.infer<typeof variablesObject>;
export type Variations = z.infer<typeof variationsObject>;
export type Weapon = z.infer<typeof weaponObject>;

export type ParsedHTMLTags = "p" | "li" | "ul" | "span";

export type PartsInHTMLTag = {
  tag: ParsedHTMLTags;
  parts: Parts;
};

export type Parts = (PartsInHTMLTag | DescriptionPart)[];

type NpcGeneratorData = {
  key: number;
  rating?: number;
  streamStatus?: "opening" | "open" | "closed" | "error";
  streamChunks: string[];
};

export type GeneratorCharacter = NpcDetails & NpcGeneratorData;
