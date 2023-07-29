import { Character } from "@/stores/generator.d";
import { hasDefined, random } from "@/utils/functions";
import { objects } from "@/utils/constants";
import { getStatArrayFromObjects } from "@/utils/parsers/functions";

export function calculateAlignment(character: Character) {
  if (character?.statistics?.alignment?.length) {
    return;
  }
  const c = character.character;
  const generic = c?.generic || null;
  const typically = generic === true ? "Typically " : "";
  character.statistics!.alignment = [];

  const alignmentNumber = 0;

  // Calculating strings if Alignment has already been defined
  if (hasDefined(c, "alignmentEthical")) {
    if (c.alignmentEthical === "Unaligned") {
      character.statistics!.alignment.push("Unaligned");
      delete c.alignmentMoral;
    } else {
      c.alignmentMoral ??= "Neutral";
      if (
        c.alignmentEthical === c.alignmentMoral &&
        c.alignmentMoral === "Any"
      ) {
        character.statistics!.alignment.push("Any Alignment");
      } else if (c.alignmentMoral === "Any") {
        character.statistics!.alignment.push("Any", c.alignmentEthical!);
      } else if (c.alignmentEthical === "Any") {
        character.statistics!.alignment.push("Any", c.alignmentMoral);
      } else {
        if (typically) {
          character.statistics!.alignment.push(typically);
        }
        if (c.alignmentEthical === c.alignmentMoral) {
          character.statistics!.alignment.push(c.alignmentEthical!);
        } else {
          character.statistics!.alignment.push(
            c.alignmentEthical!,
            c.alignmentMoral
          );
        }
      }
    }
  } else {
    /* 
    ======================================
    ALIGNMENT CALCULATION FOR GENERATED NPCs
    ======================================
    Objects like Character, Race, Class, Template might have arrays like the following

    [[number, number, number], [number, number, number]]
    [[lawfulness, chaoticness, ethicalNeutrality], [goodness, evilness, moralNeutrality]]

    ... which make the character lean towards a certain alignment.
    The following calculations will add up all the numbers to determine the alignment.
    No matter ho much the array makes the character lean towards a certain alignment,
    there will always be at least a 5% chance of the character being of a different alignment.
    */
    type AlignmentArray = [[number, number, number], [number, number, number]];
    const array: AlignmentArray[] = getStatArrayFromObjects<AlignmentArray>(
      character,
      "alignmentModifiers"
    );

    const totalModifiers = [
      [0, 0, 0],
      [0, 0, 0],
    ];

    // distributing the numbers
    array.forEach((modifiers) => {
      modifiers.forEach((modifier, index) => {
        modifier.forEach((value, index2) => {
          totalModifiers[index][index2] += value;
        });
      });
    });

    // now that I have all modifiers, I can calculate the alignment
    let lawfulness = 5;
    let chaoticness = 5;
    // const ethicalNeutrality = 5;
    let goodness = 5;
    let evilness = 5;
    // const moralNeutrality = 5;
    const ethicalTotal =
      totalModifiers[0][0] + totalModifiers[0][1] + totalModifiers[0][2];
    if (ethicalTotal === 0) {
      lawfulness += 27;
      chaoticness += 27;
    } else {
      lawfulness +=
        totalModifiers[0][0] === 0
          ? 0
          : 85 / (totalModifiers[0][0] / ethicalTotal);
      chaoticness +=
        totalModifiers[0][1] === 0
          ? 0
          : 85 / (totalModifiers[0][1] / ethicalTotal);
    }
    const random100 = random(1, 100);
    if (random100 <= lawfulness) {
      c.alignmentEthical = "Lawful";
    } else if (random100 <= lawfulness + chaoticness) {
      c.alignmentEthical = "Chaotic";
    } else {
      c.alignmentEthical = "Neutral";
    }
    const moralTotal =
      totalModifiers[1][0] + totalModifiers[1][1] + totalModifiers[1][2];
    if (moralTotal === 0) {
      goodness += 35;
      evilness += 10; // intentionally limiting the chance of being evil (true evil is uncommon)
    } else {
      goodness +=
        totalModifiers[1][0] === 0
          ? 0
          : 85 / (totalModifiers[1][0] / moralTotal);
      evilness +=
        totalModifiers[1][1] === 0
          ? 0
          : 85 / (totalModifiers[1][1] / moralTotal);
    }
    const random1002 = random(1, 100);
    if (random1002 <= goodness) {
      c.alignmentMoral = "Good";
    } else if (random1002 <= goodness + evilness) {
      c.alignmentMoral = "Evil";
    } else {
      c.alignmentMoral = "Neutral";
    }
    if (typically) {
      character.statistics!.alignment.push(typically);
    }
    if (c.alignmentEthical === c.alignmentMoral) {
      character.statistics!.alignment.push(c.alignmentEthical!);
    } else {
      character.statistics!.alignment.push(
        c.alignmentEthical!,
        c.alignmentMoral
      );
    }
  }
}

//   tags.alignment = object.statistics.Alignment;
//   // alignment number
//   switch (c.alignmentEthical) {
//     case "Lawful":
//       alignmentNumber += 1;
//       break;
//     case "Neutral":
//       alignmentNumber += 2;
//       break;
//     case "Chaotic":
//       alignmentNumber += 3;
//       break;
//   }
//   switch (c.alignmentMoral) {
//     case "Good":
//       alignmentNumber += 0;
//       break;
//     case "Neutral":
//       alignmentNumber += 3;
//       break;
//     case "Evil":
//       alignmentNumber += 6;
//       break;
//   }
//   object.statistics.AlignmentNumber = alignmentNumber;
// }
