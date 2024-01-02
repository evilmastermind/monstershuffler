import { createPart } from "./statistics";
import { ActionVariant, Character, DescriptionPart } from "@/types";

export function replaceTags(
  string: string,
  character: Character,
  variant: ActionVariant | undefined = undefined
) {
  const s = character.statistics!;
  const v = character.variables!;

  const parts: DescriptionPart[] = [];
  const tags = character.tags!;
  let stringSize = string.length;
  let position = 0;
  let j = 0;
  let startingPoint = 0;
  let word = "";
  let wordSize = 0;
  let newWord = "";
  let newWordSize = 0;

  while (position < stringSize) {
    const i = position;
    position++;
    // ---------------------------------------------------------
    // replacing tags between [ ] like [name]
    // ---------------------------------------------------------
    if (string.charAt(i) === "[") {
      parts.push(createPart(string.substring(startingPoint, i)));
      startingPoint = i;
      j = i + 1;
      while (string.charAt(j) !== "]" && j < stringSize) {
        j++;
      }
      if (j <= i + 1) {
        continue;
      }
      word = string.substring(i + 1, j);
      wordSize = word.length;
      newWord = word;
      // solving random choices
      if (newWord.includes("|")) {
        newWord = resolveRandomName(newWord);
      }
      if (Object.hasOwn(tags, newWord)) {
        // word found between [] is a tag
        newWord = tags[newWord] || "";
        parts.push(createPart(newWord, "tag"));
      } else if (newWord.substring(0, 6) === "spell:") {
        // TODO: spell preview
        parts.push(createPart(newWord.replace("spell:", "").trim(), "spell"));
      } else {
        // word found between [] is not recognizable
        parts.push(createPart(newWord));
      }
      position = position + (wordSize + 1);
    } else if (string.charAt(i) === "{") {
      // ---------------------------------------------------------
      // replacing variables between { } that contain expressions,
      // dice rolls and attacks
      // ---------------------------------------------------------
      j = i + 1;
      while (string.charAt(j) !== "}" && j < stringSize) {
        j++;
      }
      if (j <= i + 1) {
        continue;
      }
      word = string.substring(i + 1, j);
      // TODO: firstPart is added here for the new syntax, ex: {attack 1d6 bludgeoning}
      const firstPart = word.split(" ")[0];
      wordSize = word.length;
      newWord = "";

      const value = variant?.values?.find((v) => v.name === firstPart);
      if (value) {
        calculateValue(value, v);
        continue;
      }

      const attack = variant?.attacks?.find((a) => a.name === firstPart);
      if (attack) {
        calculateAttack(attack, v);
        continue;
      }

      // here I should parse the new syntax

      newWordSize = [...newWord].length;
      string = string.slice(0, i) + newWord + string.slice(j + 1);
      position = position + (newWordSize - 1);
      stringSize = stringSize - wordSize - 2 + newWordSize;
    }
  }

  return string;
}

// ---------------------------------------------------------------------------
// RANDOM TEXT MANAGEMENT
// ---------------------------------------------------------------------------

export function resolveRandomName(name = "") {
  if (!name) return "Name";
  const possibleNames = name.split("|") || null;
  if (possibleNames?.length <= 1) return name;

  const randomName = random(0, possibleNames.length - 1);
  return possibleNames[randomName];
}

// /// //////////////////////////////////
// // finding the variable in "values"
// let variableInfo = JSPath.apply(
//   '.values..{.name=="' + word + '"}',
//   object
// );
// if (variableInfo.length != 0) {
//   variableInfo = variableInfo[0];

//   const newString = {
//     totalValue: 0,
//     textValue: "",
//   };
//   // resolving dice
//   if (find(variableInfo, "dice"))
//     resolveDice(variableInfo.dice, newString, variables);
//   // resolving expression
//   if (find(variableInfo, "expression"))
//     resolveExpression(variableInfo.expression, newString, variables);
//   // resolving incremental progression
//   if (find(variableInfo, "incrProgression"))
//     resolveIncrProgression(
//       variableInfo.incrProgression,
//       newString,
//       variables
//     );

//   if (newString.textValue.length > 0) {
//     // merging value and text only if dices were found
//     if (find(variableInfo, "dice"))
//       newWord = newString.totalValue + " " + newString.textValue + ")";
//     else {
//       newWord = newString.totalValue.toString();
//       if (find(object, "type") === "multiattack") {
//         newWord = toWords(newWord);
//       }
//     }
//     newWord = addType(
//       newWord,
//       newString.totalValue,
//       find(variableInfo, "type")
//     );
//   }
// } else {
//   variableInfo = JSPath.apply(
//     '.attacks..{.name=="' + word + '"}',
//     object
//   );
//   if (variableInfo.length != 0) {
//     // resolving attack
//     let lowerDice = false;
//     if (find(object, "tag") == "profession") {
//       if (
//         find(object, "name") != find(variableInfo[0].attributes, "name")
//       )
//         lowerDice = true;
//     }
//     newWord = resolveAttack(
//       character,
//       variableInfo,
//       find(object, "ability"),
//       variables,
//       lowerDice
//     );
//   }
// }
