import type { Character, StatStringNumberArray } from "@/types";
import { random } from "@/utils";
import { getStatArrayFromObjects, createPart } from "@/parsers/functions";

export function calculateAlignment(character: Character) {
  const c = character.character;
  const generic = c?.generic || null;
  const typically = generic === true ? "Typically" : "";
  const alignment: StatStringNumberArray = {
    number: 0,
    string: "",
    array: [],
  };

  // alignments that have already been defined
  if (c.alignmentEthical === "Unaligned") {
    alignment.array!.push(createPart("Unaligned", "alignment"));
    return;
  }
  if (c.alignmentEthical === c.alignmentMoral && c.alignmentMoral === "Any") {
    alignment.array!.push(createPart("Any Alignment", "alignment"));
    return;
  }
  if (c.alignmentEthical === "Any" && c.alignmentMoral) {
    alignment.array!.push(createPart("Any", "alignment"));
    alignment.array!.push(createPart(" "));
  }
  if (c.alignmentMoral === "Any" && c.alignmentEthical) {
    alignment.array!.push(createPart("Any", "alignment"));
    alignment.array!.push(createPart(" "));
    return;
  }
  if (typically) {
    alignment.array!.unshift(createPart(" ", "text"));
    alignment.array!.unshift(createPart(typically, "alignment"));
  }
  if (c.alignmentEthical && c.alignmentMoral) {
    // neutral
    if (c.alignmentEthical === c.alignmentMoral) {
      alignment.array!.push(createPart(c.alignmentEthical, "alignment"));
    } else {
      // any other defined alignment
      alignment.array!.push(createPart(c.alignmentEthical, "alignment"));
      alignment.array!.push(createPart(" "));
      alignment.array!.push(createPart(c.alignmentMoral, "alignment"));
    }
    return;
  }

  /* 
  ======================================
  ALIGNMENT CALCULATION FOR GENERATED NPCs
  ======================================
  Objects like Character, Race, Class, Template might include arrays called 'alignmentModifiers'
  that look like this:

  [[number, number, number], [number, number, number]]
  [[lawfulness, ethicalNeutrality, chaoticness], [goodness, moralNeutrality, evilness]]

  The values inside those arrays make a character lean towards a certain alignment.
  The following calculations will add up all the numbers to determine the alignment.
  No matter how much the array makes the character lean towards a certain alignment,
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
      totalModifiers[0][2] === 0
        ? 0
        : 85 / (totalModifiers[0][1] / ethicalTotal);
  }
  let random100 = random(1, 100);
  if (random100 <= lawfulness) {
    c.alignmentEthical ??= "Lawful";
  } else if (random100 <= lawfulness + chaoticness) {
    c.alignmentEthical ??= "Chaotic";
  } else {
    c.alignmentEthical ??= "Neutral";
  }
  const moralTotal =
    totalModifiers[1][0] + totalModifiers[1][1] + totalModifiers[1][2];
  if (moralTotal === 0) {
    goodness += 35;
    evilness += 10; // intentionally limiting the chance of being evil (true evil is uncommon)
  } else {
    goodness +=
      totalModifiers[1][0] === 0 ? 0 : 85 / (totalModifiers[1][0] / moralTotal);
    evilness +=
      totalModifiers[1][2] === 0 ? 0 : 85 / (totalModifiers[1][1] / moralTotal);
  }
  random100 = random(1, 100);
  if (random100 <= goodness) {
    c.alignmentMoral ??= "Good";
  } else if (random100 <= goodness + evilness) {
    c.alignmentMoral ??= "Evil";
  } else {
    c.alignmentMoral ??= "Neutral";
  }
  if (typically) {
    alignment.array!.unshift(createPart(" ", "text"));
    alignment.array!.unshift(createPart(typically, "translatableText"));
  }
  if (c.alignmentEthical === c.alignmentMoral) {
    alignment.array!.push(createPart(c.alignmentEthical, "translatableText"));
  } else {
    alignment.array!.push(createPart(c.alignmentEthical, "translatableText"));
    alignment.array!.push(createPart(" "));
    alignment.array!.push(createPart(c.alignmentMoral, "translatableText"));
  }

  let alignmentNumber = 0;
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
      alignmentNumber += 10;
      break;
    case "Neutral":
      alignmentNumber += 20;
      break;
    case "Evil":
      alignmentNumber += 30;
      break;
  }
  alignment.number = alignmentNumber;
  character.statistics!.alignment = alignment;
  character.statistics!.alignment.string = alignment.array!.reduce(
    (acc, obj) => acc + obj.string,
    ""
  );
}
