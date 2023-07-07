import JSPath from "jspath";
import { Character } from "@/stores/generator.d";
import { hasDefined, createKeyIfUndefined } from "@/utils/functions";

export function alignmentCalculator(character: Character) {
  const c = character.character;
  const generic = c?.generic || null;
  const typically = generic === true ? "Typically " : "";
  createKeyIfUndefined(c, "statistics");

  let alignmentNumber = 0;

  // Calculating strings if Alignment has already been defined

  if (hasDefined(c, "alignmentEthical")) {
    if (c.alignmentEthical === "Unaligned") {
      character.statistics!.alignment.push("Unaligned");
      delete c.alignmentMoral;
    } else {
      c.alignmentMoral ??= "Neutral";
      if (c.alignmentEthical === c.alignmentMoral && c.alignmentMoral === "Any") {
        character.statistics!.alignment.push("Any Alignment");
      }
      else if (c.alignmentMoral === "Any") {
        character.statistics!.alignment.push("Any",c.alignmentEthical!);
      } else if (c.alignmentEthical === "Any") {
        character.statistics!.alignment.push("Any",c.alignmentMoral);
      } else {
        if (typically) {
          character.statistics!.alignment.push(typically);
        }
        character.statistics!.alignment.push(c.alignmentEthical!, c.alignmentMoral);
      }
    }
  }

  /*

    Calculating strings if Alignment has not been defined
    Objects like races, classes, etc. might have alignment arrays,
    which indicate that a character with that object leans towards
    a certain alignment.

    [l, g, n]  (numbers indicating lawfulness, goodness, neutrality).
    The higher the number, the more the character leans towards that alignment.
    If the number is < 1 for the first two numbers, the character leans towards
    the opposite alignment, like.. chaoticness, evilness or something.

  */

  else {
    const array = [];
    let goodness = 1;
    let lawfulness = 1;
    let neutrality = 0;

    // retrieving alignment arrays from objects
    if (Object.hasOwn(c, "alignment")) {
      array.push(c.alignment);
    }
    objects.forEach((object) => {
      if (Object.hasOwn(c, object)) {
        // @ts-ignore TODO: f*** you, TypeScript
        if (Object.hasOwn(c[object], "alignment")) {
        // @ts-ignore
          array.push(c[object].alignment);
        }
      }
    });
  }
}

    let goodness = 1;
    let lawfulness = 1;

    arrayAlignment.forEach(function (array) {
      lawfulness += parseFloat(array[0]);
      goodness += parseFloat(array[1]);
    });

    // calculating "Ethical" alignment
    // if value >= 2 lawful
    // if value <= 0 chaotic
    // if value in between, default chances = 30% lawful, 30% chaotic, 40% neutral
    //    default chances are affected by the value;

    if (lawfulness >= 2) c.alignmentEthical = "Lawful";
    else if (lawfulness <= 0) c.alignmentEthical = "Chaotic";
    else {
      // default chance = 30% lawful, 30% chaotic, 40% neutral
      random100 = rand(1, 100);
      if (random100 <= 30 * lawfulness) {
        c.alignmentEthical = "Lawful";
      } else if (random100 <= 30 * lawfulness + 30 * (2 - lawfulness)) {
        c.alignmentEthical = "Chaotic";
      } else {
        c.alignmentEthical = "Neutral";
      }
    }
    // calculating "Moral" alignment
    // if value >= 2 good
    // if value <= 0 evil
    // if value in between, // default chances = 25% good, 11% evil, 64% neutral
    //    default chances are affected by the value;
    if (goodness >= 2) c.alignmentMoral = "Good";
    else if (goodness <= 0) c.alignmentMoral = "Evil";
    else {
      random100 = rand(1, 100);
      if (random100 <= 25 * goodness * goodness) {
        c.alignmentMoral = "Good";
      } else if (random100 <= 25 * goodness * goodness + 11 * (2 - goodness)) {
        c.alignmentMoral = "Evil";
      } else {
        c.alignmentMoral = "Neutral";
      }
    }

    object.statistics.Alignment =
      typically +
      c.alignmentEthical +
      (c.alignmentEthical == c.alignmentMoral ? "" : " " + c.alignmentMoral);
  }
  tags.alignment = object.statistics.Alignment;
  // alignment number
  switch (c.alignmentEthical) {
    case "Lawful":
      alignmentNumber += 1;
      break;
    case "Neutral":
      alignmentNumber += 2;
      break;
    case "Chaotic":
      alignmentNumber += 3;
      break;
  }
  switch (c.alignmentMoral) {
    case "Good":
      alignmentNumber += 0;
      break;
    case "Neutral":
      alignmentNumber += 3;
      break;
    case "Evil":
      alignmentNumber += 6;
      break;
  }
  object.statistics.AlignmentNumber = alignmentNumber;
}
