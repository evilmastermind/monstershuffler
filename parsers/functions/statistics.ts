import JSPath from "jspath";
import { parseExpressionNumeric } from "./expressions";
import { Character, Bonus } from "@/types";
import { objects } from "@/utils";
import { Challenge, challengeTable } from "@/parsers/stats";

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
    return character?.variations?.currentCR || null;
  } else {
    return character?.variations?.currentHD || null;
  }
}

export function getStatArrayFromObjects<T>(character: Character, stat: string) {
  const c = character.character;
  const array: T[] = [];
  // retrieving alignment arrays from objects
  if (Object.hasOwn(c, stat)) {
    // @ts-ignore
    array.push(c[stat]);
  }
  objects.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(c, raceOrClassEtc)) {
      // @ts-ignore TODO: f*** you, TypeScript
      if (Object.hasOwn(c[raceOrClassEtc], stat)) {
        // @ts-ignore
        array.push(c[raceOrClassEtc][stat]);
      }
    }
  });
  return array;
}

export function getBonusesForOneStatistic(
  character: Character,
  stat: string
): Bonus[] {
  const c = character.character;
  const bonuses: Bonus[] = [];
  objects.forEach((raceOrClassEtc) => {
    if (Object.hasOwn(c, raceOrClassEtc)) {
      // @ts-ignore TODO: f*** you, TypeScript
      if (Object.hasOwn(c[raceOrClassEtc], "bonuses")) {
        // @ts-ignore
        if (Object.hasOwn(c[raceOrClassEtc].bonuses, `${stat}Bonus`)) {
          // @ts-ignore
          bonuses.push(c[raceOrClassEtc].bonuses[`${stat}Bonus`]);
        }
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

export function getPrioritizedStatistic<T>(character: Character, key: string) {
  const c = character.character;
  for (let i = 0; i < objects.length; i++) {
    if (Object.hasOwn(c, objects[i])) {
      // @ts-ignore
      if (Object.hasOwn(c[objects[i]], key)) {
        // @ts-ignore
        return c[objects[i]][key] as T;
      }
    }
  }
  if (Object.hasOwn(c, key)) {
    // @ts-ignore
    return c[key] as T;
  }
}

export function getPrioritizedStatisticFromPath<T>(
  character: Character,
  key: string
) {
  const c = character.character;
  for (let i = 0; i < objects.length; i++) {
    if (Object.hasOwn(c, objects[i])) {
      // @ts-ignore
      const result = JSPath.apply(`${key}`, c[objects[i]]);
      if (result.length > 0) {
        // @ts-ignore
        return result[0] as T;
      }
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
  const originalCR = character.character?.CRCalculation?.CR || undefined;
  const newCR = character?.variables?.CR || undefined;
  if (!originalCR || !newCR) {
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

  return calibrationFactor * statValueAvgAtNewCR;
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
  const calibrationFactor = statValue / statValueAvg;
  if (originalCR >= newCR) {
    return calibrationFactor;
  } else {
    // At higher CRs, statistics tend to lean towards the average
    // so I'm reducing the calibration factor by 50% for every 12 CRs of difference
    // between the original CR and the new CR
    return calibrateTheCalibrationFactor(originalCR, newCR, calibrationFactor);
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
  const CRDifference = originalCR - newCr;
  if (CRDifference === 0) {
    return calibrationFactor;
  }
  const reductionFactor = 0.5 ** (CRDifference / 12);
  let newCalibrationFactor: number;
  if (Math.abs(calibrationFactor) > 1) {
    newCalibrationFactor = (calibrationFactor - 1) * reductionFactor + 1;
  } else {
    newCalibrationFactor =
      (1 - calibrationFactor) * reductionFactor + calibrationFactor;
  }
  return newCalibrationFactor;
}

export function pushWithComma(originalString: string, string2: string) {
  if (originalString) {
    originalString += ", ";
  }
  originalString += string2;
  return originalString;
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
