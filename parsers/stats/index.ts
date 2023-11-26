export type Ability = "STR" | "DEX" | "CON" | "INT" | "WIS" | "CHA";

export const abilities: Ability[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const speedTypes = ["walk", "burrow", "climb", "fly", "hover", "swim"];

type SkillsList = Record<string, Ability>;

export const skillTypes: SkillsList = {
  Acrobatics: "DEX",
  "Animal Handling": "WIS",
  Arcana: "INT",
  Athletics: "STR",
  Deception: "CHA",
  History: "INT",
  Insight: "WIS",
  Intimidation: "CHA",
  Investigation: "INT",
  Medicine: "WIS",
  Nature: "INT",
  Perception: "WIS",
  Performance: "CHA",
  Persuasion: "CHA",
  Religion: "INT",
  "Sleight of Hand": "DEX",
  Stealth: "DEX",
  Survival: "WIS",
};

export const sensesList = [
  "blindsight",
  "darkvision",
  "tremorsense",
  "truesight",
];

export const challengeStats = {
  "0": { xp: 10, proficiency: 2 },
  "1/8": { xp: 25, proficiency: 2 },
  "1/4": { xp: 50, proficiency: 2 },
  "1/2": { xp: 100, proficiency: 2 },
  "1": { xp: 200, proficiency: 2 },
  "2": { xp: 450, proficiency: 2 },
  "3": { xp: 700, proficiency: 2 },
  "4": { xp: 1100, proficiency: 2 },
  "5": { xp: 1800, proficiency: 3 },
  "6": { xp: 2300, proficiency: 3 },
  "7": { xp: 2900, proficiency: 3 },
  "8": { xp: 3900, proficiency: 3 },
  "9": { xp: 5000, proficiency: 4 },
  "10": { xp: 5900, proficiency: 4 },
  "11": { xp: 7200, proficiency: 4 },
  "12": { xp: 8400, proficiency: 4 },
  "13": { xp: 10000, proficiency: 5 },
  "14": { xp: 11500, proficiency: 5 },
  "15": { xp: 13000, proficiency: 5 },
  "16": { xp: 15000, proficiency: 5 },
  "17": { xp: 18000, proficiency: 6 },
  "18": { xp: 20000, proficiency: 6 },
  "19": { xp: 22000, proficiency: 6 },
  "20": { xp: 25000, proficiency: 6 },
  "21": { xp: 33000, proficiency: 7 },
  "22": { xp: 41000, proficiency: 7 },
  "23": { xp: 50000, proficiency: 7 },
  "24": { xp: 62000, proficiency: 7 },
  "25": { xp: 75000, proficiency: 8 },
  "26": { xp: 90000, proficiency: 8 },
  "27": { xp: 105000, proficiency: 8 },
  "28": { xp: 120000, proficiency: 8 },
  "29": { xp: 135000, proficiency: 9 },
  "30": { xp: 155000, proficiency: 9 },
};

export function getChallengeString(CR: number) {
  if (CR <= -2.5) return "0";
  if (CR <= -1.5) return "1/8";
  if (CR <= -0.5) return "1/4";
  if (CR <= 0.5) return "1/2";
  else return Math.round(CR).toString();
}

export function getChallengeNumber(CR: string) {
  if (CR === "0") return -3;
  if (CR === "1/8") return -2;
  if (CR === "1/4") return -1;
  if (CR === "1/2") return 0;
  else return parseInt(CR);
}

export type Size = "1" | "2" | "3" | "4" | "5" | "6";

export type SizeStats = {
  [key in Size]: {
    name: string;
    space: number;
    squares: number;
    hitDice: number;
  };
};

export const sizeStats: SizeStats = {
  "1": { name: "Tiny", space: 2.5, squares: 0.5, hitDice: 4 },
  "2": { name: "Small", space: 5, squares: 1, hitDice: 6 },
  "3": { name: "Medium", space: 5, squares: 1, hitDice: 8 },
  "4": { name: "Large", space: 10, squares: 4, hitDice: 10 },
  "5": { name: "Huge", space: 15, squares: 9, hitDice: 12 },
  "6": { name: "Gargantuan", space: 20, squares: 16, hitDice: 20 },
};

export function typeToNumber(type: string | null | undefined = null) {
  switch (type?.toLowerCase()) {
    case "aberration":
      return 1;
      break;
    case "beast":
      return 2;
      break;
    case "celestial":
      return 3;
      break;
    case "construct":
      return 4;
      break;
    case "dragon":
      return 5;
      break;
    case "elemental":
      return 6;
      break;
    case "fey":
      return 7;
      break;
    case "fiend":
      return 8;
      break;
    case "giant":
      return 9;
      break;
    case "humanoid":
      return 10;
      break;
    case "monstrosity":
      return 11;
      break;
    case "ooze":
      return 12;
      break;
    case "plant":
      return 13;
      break;
    case "undead":
      return 14;
      break;
    default:
      return 0;
      break;
  }
}

export function numberToType(number = 0) {
  switch (number) {
    case 1:
      return "aberration";
      break;
    case 2:
      return "beast";
      break;
    case 3:
      return "celestial";
      break;
    case 4:
      return "construct";
      break;
    case 5:
      return "dragon";
      break;
    case 6:
      return "elemental";
      break;
    case 7:
      return "fey";
      break;
    case 8:
      return "fiend";
      break;
    case 9:
      return "giant";
      break;
    case 10:
      return "humanoid";
      break;
    case 11:
      return "monstrosity";
      break;
    case 12:
      return "ooze";
      break;
    case 13:
      return "plant";
      break;
    case 14:
      return "undead";
      break;
    default:
      return "unknown";
      break;
  }
}

export type Challenge = {
  CR: number;
  CI: number;
  abilityScoresAvg: number;
  abilityScoresMax: number;
  AC: number;
  HP: number;
  attack: number;
  damage: number;
  traits: number;
  actions: number;
  miscStats: number;
};

export type ChallengeTable = {
  [key: string]: Challenge;
};

export const challengeTable: ChallengeTable = {
  "-3": {
    CR: 0,
    CI: 5,
    abilityScoresAvg: 8,
    abilityScoresMax: 13,
    AC: 13,
    HP: 8,
    attack: 3,
    damage: 1,
    traits: 1,
    actions: 1,
    miscStats: 1,
  },
  "-2": {
    CR: 0.125,
    CI: 8,
    abilityScoresAvg: 9,
    abilityScoresMax: 14,
    AC: 13,
    HP: 11,
    attack: 4,
    damage: 2,
    traits: 1,
    actions: 1,
    miscStats: 1,
  },
  "-1": {
    CR: 0.25,
    CI: 11,
    abilityScoresAvg: 10,
    abilityScoresMax: 15,
    AC: 13,
    HP: 13,
    attack: 4,
    damage: 3,
    traits: 1,
    actions: 2,
    miscStats: 2,
  },
  "0": {
    CR: 0.5,
    CI: 17,
    abilityScoresAvg: 10,
    abilityScoresMax: 15,
    AC: 13,
    HP: 18,
    attack: 4,
    damage: 4,
    traits: 1,
    actions: 2,
    miscStats: 2,
  },
  "1": {
    CR: 1,
    CI: 23,
    abilityScoresAvg: 11,
    abilityScoresMax: 16,
    AC: 13,
    HP: 28,
    attack: 4,
    damage: 7,
    traits: 2,
    actions: 2,
    miscStats: 3,
  },
  "2": {
    CR: 2,
    CI: 38,
    abilityScoresAvg: 11,
    abilityScoresMax: 16,
    AC: 13,
    HP: 48,
    attack: 5,
    damage: 13,
    traits: 2,
    actions: 2,
    miscStats: 3,
  },
  "3": {
    CR: 3,
    CI: 54,
    abilityScoresAvg: 12,
    abilityScoresMax: 17,
    AC: 13,
    HP: 68,
    attack: 5,
    damage: 19,
    traits: 2,
    actions: 2,
    miscStats: 3,
  },
  "4": {
    CR: 4,
    CI: 69,
    abilityScoresAvg: 12,
    abilityScoresMax: 17,
    AC: 14,
    HP: 88,
    attack: 6,
    damage: 25,
    traits: 2,
    actions: 2,
    miscStats: 4,
  },
  "5": {
    CR: 5,
    CI: 84,
    abilityScoresAvg: 13,
    abilityScoresMax: 18,
    AC: 14,
    HP: 108,
    attack: 6,
    damage: 31,
    traits: 2,
    actions: 2,
    miscStats: 4,
  },
  "6": {
    CR: 6,
    CI: 100,
    abilityScoresAvg: 13,
    abilityScoresMax: 18,
    AC: 14,
    HP: 128,
    attack: 7,
    damage: 37,
    traits: 2,
    actions: 2,
    miscStats: 4,
  },
  "7": {
    CR: 7,
    CI: 115,
    abilityScoresAvg: 14,
    abilityScoresMax: 19,
    AC: 15,
    HP: 148,
    attack: 7,
    damage: 43,
    traits: 2,
    actions: 3,
    miscStats: 4,
  },
  "8": {
    CR: 8,
    CI: 130,
    abilityScoresAvg: 14,
    abilityScoresMax: 19,
    AC: 15,
    HP: 168,
    attack: 8,
    damage: 49,
    traits: 2,
    actions: 3,
    miscStats: 4,
  },
  "9": {
    CR: 9,
    CI: 145,
    abilityScoresAvg: 15,
    abilityScoresMax: 20,
    AC: 15,
    HP: 188,
    attack: 8,
    damage: 55,
    traits: 2,
    actions: 3,
    miscStats: 5,
  },
  "10": {
    CR: 10,
    CI: 161,
    abilityScoresAvg: 15,
    abilityScoresMax: 20,
    AC: 16,
    HP: 208,
    attack: 9,
    damage: 61,
    traits: 2,
    actions: 3,
    miscStats: 5,
  },
  "11": {
    CR: 11,
    CI: 176,
    abilityScoresAvg: 16,
    abilityScoresMax: 21,
    AC: 16,
    HP: 228,
    attack: 9,
    damage: 67,
    traits: 2,
    actions: 3,
    miscStats: 5,
  },
  "12": {
    CR: 12,
    CI: 191,
    abilityScoresAvg: 16,
    abilityScoresMax: 21,
    AC: 16,
    HP: 248,
    attack: 10,
    damage: 73,
    traits: 2,
    actions: 4,
    miscStats: 5,
  },
  "13": {
    CR: 13,
    CI: 207,
    abilityScoresAvg: 17,
    abilityScoresMax: 22,
    AC: 17,
    HP: 268,
    attack: 10,
    damage: 79,
    traits: 2,
    actions: 4,
    miscStats: 5,
  },
  "14": {
    CR: 14,
    CI: 222,
    abilityScoresAvg: 17,
    abilityScoresMax: 22,
    AC: 17,
    HP: 288,
    attack: 11,
    damage: 85,
    traits: 2,
    actions: 4,
    miscStats: 6,
  },
  "15": {
    CR: 15,
    CI: 237,
    abilityScoresAvg: 18,
    abilityScoresMax: 23,
    AC: 17,
    HP: 308,
    attack: 11,
    damage: 91,
    traits: 2,
    actions: 4,
    miscStats: 6,
  },
  "16": {
    CR: 16,
    CI: 253,
    abilityScoresAvg: 18,
    abilityScoresMax: 23,
    AC: 18,
    HP: 328,
    attack: 12,
    damage: 97,
    traits: 3,
    actions: 4,
    miscStats: 6,
  },
  "17": {
    CR: 17,
    CI: 268,
    abilityScoresAvg: 19,
    abilityScoresMax: 24,
    AC: 18,
    HP: 348,
    attack: 13,
    damage: 103,
    traits: 3,
    actions: 4,
    miscStats: 6,
  },
  "18": {
    CR: 18,
    CI: 283,
    abilityScoresAvg: 19,
    abilityScoresMax: 24,
    AC: 18,
    HP: 368,
    attack: 13,
    damage: 109,
    traits: 3,
    actions: 5,
    miscStats: 6,
  },
  "19": {
    CR: 19,
    CI: 298,
    abilityScoresAvg: 20,
    abilityScoresMax: 25,
    AC: 19,
    HP: 388,
    attack: 14,
    damage: 115,
    traits: 3,
    actions: 5,
    miscStats: 7,
  },
  "20": {
    CR: 20,
    CI: 314,
    abilityScoresAvg: 20,
    abilityScoresMax: 25,
    AC: 19,
    HP: 408,
    attack: 14,
    damage: 121,
    traits: 3,
    actions: 5,
    miscStats: 7,
  },
  "21": {
    CR: 21,
    CI: 329,
    abilityScoresAvg: 21,
    abilityScoresMax: 26,
    AC: 19,
    HP: 428,
    attack: 15,
    damage: 127,
    traits: 3,
    actions: 5,
    miscStats: 7,
  },
  "22": {
    CR: 22,
    CI: 344,
    abilityScoresAvg: 21,
    abilityScoresMax: 26,
    AC: 20,
    HP: 448,
    attack: 15,
    damage: 133,
    traits: 3,
    actions: 5,
    miscStats: 7,
  },
  "23": {
    CR: 23,
    CI: 360,
    abilityScoresAvg: 22,
    abilityScoresMax: 27,
    AC: 20,
    HP: 468,
    attack: 16,
    damage: 139,
    traits: 3,
    actions: 5,
    miscStats: 7,
  },
  "24": {
    CR: 24,
    CI: 375,
    abilityScoresAvg: 22,
    abilityScoresMax: 27,
    AC: 20,
    HP: 488,
    attack: 16,
    damage: 145,
    traits: 3,
    actions: 6,
    miscStats: 8,
  },
  "25": {
    CR: 25,
    CI: 390,
    abilityScoresAvg: 23,
    abilityScoresMax: 28,
    AC: 21,
    HP: 508,
    attack: 17,
    damage: 151,
    traits: 3,
    actions: 6,
    miscStats: 8,
  },
  "26": {
    CR: 26,
    CI: 406,
    abilityScoresAvg: 23,
    abilityScoresMax: 28,
    AC: 21,
    HP: 528,
    attack: 17,
    damage: 157,
    traits: 3,
    actions: 6,
    miscStats: 8,
  },
  "27": {
    CR: 27,
    CI: 421,
    abilityScoresAvg: 24,
    abilityScoresMax: 29,
    AC: 21,
    HP: 548,
    attack: 18,
    damage: 163,
    traits: 3,
    actions: 6,
    miscStats: 8,
  },
  "28": {
    CR: 28,
    CI: 436,
    abilityScoresAvg: 24,
    abilityScoresMax: 29,
    AC: 21,
    HP: 568,
    attack: 18,
    damage: 169,
    traits: 3,
    actions: 6,
    miscStats: 8,
  },
  "29": {
    CR: 29,
    CI: 451,
    abilityScoresAvg: 25,
    abilityScoresMax: 30,
    AC: 22,
    HP: 588,
    attack: 19,
    damage: 175,
    traits: 3,
    actions: 6,
    miscStats: 9,
  },
  "30": {
    CR: 30,
    CI: 467,
    abilityScoresAvg: 25,
    abilityScoresMax: 30,
    AC: 22,
    HP: 608,
    attack: 19,
    damage: 181,
    traits: 4,
    actions: 7,
    miscStats: 9,
  },
};
