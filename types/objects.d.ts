import { Variables } from "./objects.d";
import { z } from "zod";
import {
  actionObject,
  actionVariantObject,
  abilitiesObject,
  alignmentEthical,
  alignmentMoral,
  armorObject,
  backgroundObject,
  bonusesObject,
  bonusObject,
  characterObject,
  chosenActionObject,
  descriptionPartObject,
  parsedActionObject,
  pageSettings,
  postRandomNpcResponse,
  raceObject,
  sensesObject,
  speedObject,
  statisticsObject,
  statString,
  statStringNumber,
  statStringWithName,
  statObject,
  tagsObject,
  variablesObject,
  variationsObject,
  userObject,
} from "monstershuffler-shared";

export type Action = z.infer<typeof actionObject>;
export type ActionVariant = z.infer<typeof actionVariantObject>;
export type Abilities = z.infer<typeof abilitiesObject>;
export type AlignmentEthical = z.infer<typeof alignmentEthical>;
export type AlignmentMoral = z.infer<typeof alignmentMoral>;
export type Armor = z.infer<typeof armorObject>;
export type Background = z.infer<typeof backgroundObject>;
export type Bonus = z.infer<typeof bonusObject>;
export type Bonuses = z.infer<typeof bonusesObject>;
export type Character = z.infer<typeof characterObject>;
export type ChosenAction = z.infer<typeof chosenActionObject>;
export type DescriptionPart = z.infer<typeof descriptionPartObject>;
export type PageSettings = z.infer<typeof pageSettings>;
export type ParsedAction = z.infer<typeof parsedActionObject>;
export type Race = z.infer<typeof raceObject>;
export type Senses = z.infer<typeof sensesObject>;
export type Speed = z.infer<typeof speedObject>;
export type Statistics = z.infer<typeof statisticsObject>;
export type StatStringNumber = z.infer<typeof statStringNumber>;
export type StatString = z.infer<typeof statString>;
export type StatStringWithName = z.infer<typeof statStringWithName>;
export type Stat = z.infer<typeof statObject>;
export type Subtypes = z.infer<typeof subtypesObject>;
export type Tags = z.infer<typeof tagsObject>;
export type Variables = z.infer<typeof variablesObject>;
export type Variations = z.infer<typeof variationsObject>;
export type Condition = z.infer<typeof userObject>;
