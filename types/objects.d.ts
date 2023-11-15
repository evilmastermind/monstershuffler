import { Variables } from "./objects.d";
import { z } from "zod";
import {
  actionObject,
  abilitiesObject,
  alignmentEthical,
  alignmentMoral,
  backgroundObject,
  bonusesObject,
  bonusObject,
  characterObject,
  descriptionPartObject,
  pageSettings,
  postRandomNpcResponse,
  raceObject,
  statisticsObject,
  statNumberStringObject,
  subtypesObject,
  tagsObject,
  variablesObject,
  variationsObject,
} from "monstershuffler-shared";

export type Action = z.infer<typeof actionObject>;
export type Abilities = z.infer<typeof abilitiesObject>;
export type AlignmentEthical = z.infer<typeof alignmentEthical>;
export type AlignmentMoral = z.infer<typeof alignmentMoral>;
export type Background = z.infer<typeof backgroundObject>;
export type Bonus = z.infer<typeof bonusObject>;
export type Bonuses = z.infer<typeof bonusesObject>;
export type Character = z.infer<typeof characterObject>;
export type DescriptionPart = z.infer<typeof descriptionPartObject>;
export type PageSettings = z.infer<typeof pageSettings>;
export type Race = z.infer<typeof raceObject>;
export type Statistics = z.infer<typeof statisticsObject>;
export type Subtypes = z.infer<typeof subtypesObject>;
export type Tags = z.infer<typeof tagsObject>;
export type Variables = z.infer<typeof variablesObject>;
export type Variations = z.infer<typeof variationsObject>;
