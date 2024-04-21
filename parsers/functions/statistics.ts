import JSPath from "jspath";
import { parseExpressionNumeric } from "./expressions";
import type { Character, Bonus, DescriptionPart } from "@/types";
import { objects, random } from "@/utils";
import { type Challenge, challengeTable } from "@/parsers/stats";

export function createPart(
  string: string,
  type: DescriptionPart["type"] | undefined = undefined,
  format: DescriptionPart["format"] = [],
  id: number | undefined = undefined
) {
  const part: DescriptionPart = {
    string,
  };
  if (type) {
    part.type = type;
  }
  if (format.length) {
    part.format = format;
  }
  if (id) {
    part.id = id;
  }
  return part;
}

export function addPlusSign(number: number) {
  if (number > 0) {
    return `+${number}`;
  }
  return number.toString();
}

const characterObjects = (character: Character) => {
  const c = character.character as any;
  let objectsFound: any[] = [];
  objects.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(c, raceOrClassEtc)) {
      objectsFound.push(c[raceOrClassEtc]);
    }
  });
  if (Object.hasOwn(c, "conditions")) {
    objectsFound = [...objectsFound, ...c.conditions];
  }
  return objectsFound as any[];
};

export function sortObject(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  return Object.keys(obj)
    .sort()
    .reduce((sortedObj, key) => {
      sortedObj[key] = obj[key];
      return sortedObj;
    }, {} as { [key: string]: any });
}

export function isNumber(stat: string) {
  return !isNaN(parseFloat(stat)) && isFinite(Number(stat));
}

export function getCurrentStatLimit(character: Character) {
  if (character?.character?.CRCalculation?.name === "automatic") {
    return character?.statistics?.CR.number || -3;
  } else {
    return character?.statistics?.level || 0;
  }
}

export function getStatArrayFromObjects<T>(character: Character, stat: string) {
  const c = character.character;
  const array: T[] = [];
  // checking if the stat exists in the main character object
  if (Object.hasOwn(c, stat)) {
    // @ts-ignore
    array.push(c[stat]);
  }
  // checking if the stat exists in any of the other secondary objects,
  // like races, classes, etc.
  const objectsFound = characterObjects(character);
  objectsFound.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(raceOrClassEtc, stat)) {
      array.push(raceOrClassEtc[stat] as T);
    }
  });
  return array;
}

export function getBonusesForOneStatistic(
  character: Character,
  stat: string
): Bonus[] {
  const bonuses: Bonus[] = [];
  const objectsFound = characterObjects(character);

  objectsFound.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(raceOrClassEtc, "bonuses")) {
      if (Object.hasOwn(raceOrClassEtc.bonuses, `${stat}Bonus`)) {
        bonuses.push(raceOrClassEtc.bonuses[`${stat}Bonus`]);
      }
    }
  });

  return bonuses;
}

export function getBonus(character: Character, stat: string): number {
  const bonuses = getBonusesForOneStatistic(character, stat);
  let bonus = 0;
  bonuses.forEach((b) => {
    bonus += parseExpressionNumeric(b.value, character);
  });
  return bonus;
}

export function getBonusAndInfo(character: Character, stat: string) {
  const bonuses = getBonusesForOneStatistic(character, stat);
  const bonus = {
    value: 0,
    hadExpressions: false,
  };
  bonuses.forEach((b) => {
    if (!isNumber(b.value)) {
      bonus.hadExpressions = true;
    }
    bonus.value += parseExpressionNumeric(b.value, character);
  });

  return bonus;
}

export function getPrioritizedStatistic<T>(character: Character, key: string) {
  const objectsFound = characterObjects(character);

  for (let i = 0; i < objectsFound.length; i++) {
    if (Object.hasOwn(objectsFound[i], key)) {
      return objectsFound[i][key] as T;
    }
  }
  const c = character.character as any;
  if (Object.hasOwn(c, key)) {
    return c[key] as T;
  }
}

export function getPrioritizedStatisticFromPath<T>(
  character: Character,
  key: string
) {
  const c = character.character;
  const objectsFound = characterObjects(character);
  for (let i = 0; i < objectsFound.length; i++) {
    const result = JSPath.apply(`${key}`, objectsFound[i]);
    if (result.length > 0) {
      return result[0] as T;
    }
  }
}

/**
 *  C A L I B R A T E   S T A T I S T I C
 * ---------------------------------------
 * This function recalculates a statistic when the CR changes.
 *
 * Stat Value [New CR] = ( Stat Value Chosen [Original CR] / Stat Value Average [Original CR]) * Stat Value Average [New CR]
 *
 * Example:
 * Zombie: CR 1/4, AC 8
 * Average AC for a CR 1/4 creature is 13
 * Average AC for a CR 10 creature is 16
 * The AC for a Zombie at CR 10 would be: (8/13)*16 = 9.846 => 10
 *
 *
 * I call ( Stat Value Chosen [Original CR] / Stat Value Average [Original CR]) the calibration factor.
 * It is the factor by which the original statistic value is multiplied to get the new statistic value.
 * If the difference between the original CR and the new CR is too big, the calibration factor is reduced (see below).
 *
 * Stat value averages were calculated by Surfarcher
 * https://surfarcher.blogspot.com/2015/07/d-5e-monsters-part-11-construction.html
 *
 */

export function calibrateStatistic(
  character: Character,
  statValue: number,
  statName: keyof Challenge
): number {
  // @ts-expect-error There can be multiple types of Challenge Calculations
  const originalCR = character.character?.CRCalculation?.CR;
  const newCR = character?.variables?.CR;
  if (originalCR === undefined || newCR === undefined || originalCR === newCR) {
    return statValue;
  }

  const calibrationFactor = calculateCalibrationFactor(
    originalCR,
    newCR,
    statName,
    statValue
  );

  const statValueAvgAtNewCR =
    newCR > 30
      ? getAvgStatisticHigherThan30(newCR, statName)
      : challengeTable[newCR.toString()][statName];
  const result = Math.round(calibrationFactor * statValueAvgAtNewCR);

  return result;
}

function calculateCalibrationFactor(
  originalCR: number,
  newCR: number,
  statName: keyof Challenge,
  statValue: number
) {
  let statValueAvg: number;
  if (originalCR > 30) {
    statValueAvg = getAvgStatisticHigherThan30(originalCR, statName);
  } else {
    statValueAvg = challengeTable[originalCR.toString()][statName];
  }
  const calibrationFactor = Math.abs(statValue / statValueAvg);

  if (originalCR >= newCR || statName !== "HP") {
    return calibrationFactor;
  } else {
    // At higher CRs, statistics tend to lean towards the average
    // so I'm reducing the calibration factor by 50% for every 12 CRs of difference
    // between the original CR and the new CR
    const newCalibrationFactor = calibrateTheCalibrationFactor(
      originalCR,
      newCR,
      calibrationFactor
    );
    return newCalibrationFactor;
  }
}

function getAvgStatisticHigherThan30(
  originalCR: number,
  statName: keyof Challenge
) {
  const increaseFactor =
    challengeTable["30"][statName] / challengeTable["29"][statName];
  const CRDifference = originalCR - 30;
  return challengeTable["30"][statName] * increaseFactor ** CRDifference;
}

function calibrateTheCalibrationFactor(
  originalCR: number,
  newCr: number,
  calibrationFactor: number
) {
  const CRDifference = Math.abs(originalCR - newCr);
  if (CRDifference === 0) {
    return calibrationFactor;
  }
  let newCalibrationFactor: number;
  const reductionFactor = 1 + CRDifference / 30;
  if (calibrationFactor > 1) {
    newCalibrationFactor = (calibrationFactor - 1) / reductionFactor + 1;
  } else {
    newCalibrationFactor = 1 - (1 - calibrationFactor) / reductionFactor;
  }
  return newCalibrationFactor;
}

export function addCommaIfNotEmpty(array: DescriptionPart[]) {
  if (array.length) {
    array.push(createPart(", "));
  }
}

export function pushWithComma(originalString: string, string2: string) {
  if (originalString) {
    originalString += ", ";
  }
  originalString += string2;
  return originalString;
}

export function numberToSignedString(number: number) {
  if (number >= 0) {
    return `+${number}`;
  }
  return number.toString();
}

export function unshiftWithComma(originalString: string, string2: string) {
  if (originalString) {
    originalString = ", " + originalString;
  }
  originalString = string2 + originalString;
  return originalString;
}

export function feetToOtherUnit(feet: number, unit = "feet") {
  let meters = 0;
  switch (unit) {
    case "meters":
      meters = feet * 0.3048;
      return parseFloat((meters - (meters % 1.5)).toFixed(1));
    case "squares":
      return feet / 5;
    default:
      return feet;
  }
}

export function feetDecimalToFeetInches(decimalFeet: number) {
  const feet = Math.floor(decimalFeet);
  const inches = Math.round((decimalFeet - feet) * 12);
  return `${feet}'${inches}"`;
}

export function feetDecimalToMeters(decimalFeet: number) {
  const meters = decimalFeet * 0.3048;
  return `${meters.toFixed(2)} m`;
}

export function getUnitSymbol(unit = "feet") {
  switch (unit) {
    case "feet":
      return "ft";
    case "meters":
      return "m";
    case "squares":
      return "sq";
  }
}

export function parseNameChoices(name = "") {
  if (!name) {
    return "Name";
  }
  const possibleNames = name.split("|") || null;
  if (possibleNames?.length <= 1) {
    return name;
  }

  const randomName = random(0, possibleNames.length - 1);
  return possibleNames[randomName];
}
