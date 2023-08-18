import { Character } from "@/types/objects";

export function replaceTags(string: string, character: Character) {
  const tags = character.tags!;
  let stringSize = string.length;
  let i = 0;
  let j = 0;
  let word = "";
  let wordSize = 0;
  let newWord = "";
  let newWordSize = 0;

  while (i < stringSize) {
    // replacing tags between [ ] like [name]
    if (string.charAt(i) === "[") {
      j = i + 1;
      while (string.charAt(j) !== "]" && j < stringSize) {
        j++;
      }
      if (j > i + 1) {
        word = string.substring(i + 1, j);
        wordSize = word.length;
        newWord = "";
        // solving random choices
        if (word.includes("|")) {
          word = newWord = resolveRandomName(word);
        }
        if (Object.hasOwn(tags, word)) {
          // word found between [] is a tag
          newWord = tags[word] || "";
        }
        // TODO: handle spell previews inside descriptions
        // else if (word.substr(0, 6) == "spell:") {
        //   newWord = addSpellHTML(word.replace("spell:", "").trim());
        // }
        // replacing tag
        if (newWord) {
          newWordSize = newWord.length;
          string = string.slice(0, i) + newWord + string.slice(j + 1);
          i = i + (newWordSize - 1);
          stringSize = stringSize - wordSize - 2 + newWordSize;
        }
      }
    }
    // TODO: attacks and variables
    // replacing variables between { } that contain expressions,
    // dice rolls and attacks
    // if (string.charAt(i) == "{") {
    //   j = i + 1;
    //   while (string.charAt(j) != "}" && j < stringSize) {
    //     j++;
    //   }
    //   if (j > i + 1) {
    //     word = string.substring(i + 1, j);
    //     wordSize = [...word].length;
    //     newWord = "";

    //     // finding the variable in "values"
    //     let variableInfo = JSPath.apply(
    //       '.values..{.name=="' + word + '"}',
    //       object
    //     );
    //     if (variableInfo.length != 0) {
    //       variableInfo = variableInfo[0];

    //       const newString = {
    //         totalValue: 0,
    //         textValue: "",
    //       };
    //       // resolving dice
    //       if (find(variableInfo, "dice"))
    //         resolveDice(variableInfo.dice, newString, variables);
    //       // resolving expression
    //       if (find(variableInfo, "expression"))
    //         resolveExpression(variableInfo.expression, newString, variables);
    //       // resolving incremental progression
    //       if (find(variableInfo, "incrProgression"))
    //         resolveIncrProgression(
    //           variableInfo.incrProgression,
    //           newString,
    //           variables
    //         );

    //       if (newString.textValue.length > 0) {
    //         // merging value and text only if dices were found
    //         if (find(variableInfo, "dice"))
    //           newWord = newString.totalValue + " " + newString.textValue + ")";
    //         else {
    //           newWord = newString.totalValue.toString();
    //           if (find(object, "type") === "multiattack") {
    //             newWord = toWords(newWord);
    //           }
    //         }
    //         newWord = addType(
    //           newWord,
    //           newString.totalValue,
    //           find(variableInfo, "type")
    //         );
    //       }
    //     } else {
    //       variableInfo = JSPath.apply(
    //         '.attacks..{.name=="' + word + '"}',
    //         object
    //       );
    //       if (variableInfo.length != 0) {
    //         // resolving attack
    //         let lowerDice = false;
    //         if (find(object, "tag") == "profession") {
    //           if (
    //             find(object, "name") != find(variableInfo[0].attributes, "name")
    //           )
    //             lowerDice = true;
    //         }
    //         newWord = resolveAttack(
    //           character,
    //           variableInfo,
    //           find(object, "ability"),
    //           variables,
    //           lowerDice
    //         );
    //       }
    //     }

    //     newWordSize = [...newWord].length;
    //     string = string.slice(0, i) + newWord + string.slice(j + 1);
    //     i = i + (newWordSize - 1);
    //     stringSize = stringSize - wordSize - 2 + newWordSize;
    //   }
    // }
    i++;
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
