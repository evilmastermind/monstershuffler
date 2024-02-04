import {
  getPrioritizedStatistic,
  getStatArrayFromObjects,
  parseExpressionNumeric,
  addOrdinal,
  createPart,
} from "../functions";
import { abilityNames } from "../stats";
import type {
  Character,
  Spells,
  SpellGroup,
  Stat,
  DescriptionPart,
  StatStringArrayWithName,
} from "@/types";

export function calculateSpells(character: Character) {
  const spells = getStatArrayFromObjects<Spells>(character, "spells");
  const prioritizedSpells = getPrioritizedStatistic<Spells>(
    character,
    "spells"
  );

  const s = character.statistics!;
  const t = character.tags!;
  const v = character.variables!;

  const groups: SpellGroup[] = [];
  const tagsArray: string[] = [];
  const hasSlots = prioritizedSpells?.hasSlots || false;
  let tagsNumber = 1;

  // removing groups that are not available for the current level/CR
  // and giving a unique tag to each group
  for (let i = 0; i < spells.length; i++) {
    const limit =
      spells[i].availableUnit === "cr"
        ? character.variations?.currentCR || -3
        : character.variations?.currentHD || 0;

    if (!spells[i].groups) {
      continue;
    }
    for (let j = 0; j < spells[i].groups!.length; j++) {
      const group = spells[i].groups![j];
      if (group.availableAt !== undefined && limit < group.availableAt) {
        continue;
      }
      if (!group.tag) {
        group.tag = `group ${spells[i].availableUnit}${group.availableAt}`;
      }
      while (tagsArray.includes(group.tag)) {
        group.tag = `${group.tag}${tagsNumber}`;
        tagsNumber++;
      }
      tagsArray.push(group.tag);
      groups.push(group);
    }
  }

  let spellsPerUses: Record<
    string,
    { slots?: number; tag: string; spells: Stat[] }
  > = {};
  if (!hasSlots) {
    // --------------------------------------------------
    // USES/DAY
    // grouping spells by uses/day (or slots, or at will)
    // --------------------------------------------------
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const times = getSpellTimesOrSlots(group, character);
      const uses = times.toString();

      if (!(uses in spellsPerUses)) {
        spellsPerUses[uses] = { spells: [], tag: group.tag };
      }
      const spells = group.spells as Stat[];
      spellsPerUses[uses].spells = spellsPerUses[uses].spells.concat(spells);
    }
  } else {
    // --------------------------------------------------
    // LEVEL (SLOTS)
    // creating levels/slots in the spellsPerUses object
    // not all groups will have levels/slots, so I first need to find those that do
    // --------------------------------------------------
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      if (group.level === undefined) {
        continue;
      }
      const level = group.level.toString();
      if (!(level in spellsPerUses)) {
        const times = getSpellTimesOrSlots(group, character);
        spellsPerUses[level] = { slots: times, tag: group.tag, spells: [] };
      }
    }
    // now I can add the spells to the correct level/slot
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const spellsList = group.spells as Stat[];
      // there could be groups without level, not intended to be used as slots
      // (from a template, race, class, etc added to the character)
      if (group.level === undefined) {
        for (let j = 0; j < spellsList.length; j++) {
          const spellLevel = spellsList[j].properties?.level || 0;
          if (!(spellLevel in spellsPerUses)) {
            const times = getSpellTimesOrSlots(group, character);
            spellsPerUses[spellLevel] = {
              slots: times,
              tag: group.tag,
              spells: [],
            };
          }
          spellsPerUses[spellLevel].spells.push(spellsList[j]);
        }
      } else {
        spellsPerUses[group.level.toString()].spells =
          spellsPerUses[group.level.toString()].spells.concat(spellsList);
      }
    }
  }

  // sorting spells by uses
  spellsPerUses = Object.keys(spellsPerUses)
    .sort()
    .reduce((obj: typeof spellsPerUses, key) => {
      obj[key] = spellsPerUses[key];
      return obj;
    }, {});

  const spellcastingAbility = prioritizedSpells?.ability || "CHA";
  const spellSaveDC = 8 + v.PROF + v[spellcastingAbility];
  const spellToHit = v.PROF + v[spellcastingAbility];
  const spellToHitString =
    spellToHit >= 0 ? `+${spellToHit}` : spellToHit.toString();

  // --------------------------------------------------
  // SPELLCASTING DESCRIPTION
  // --------------------------------------------------
  const spellcasting: DescriptionPart[] = [];
  spellcasting.push({
    string: `${t.Name} casts one of the following spells, using ${abilityNames[spellcastingAbility]} as the spellcasting ability (spell save DC ${spellSaveDC}, `,
    type: "translatableText",
    translationKey: "spellcastingDescription",
    translationVariables: {
      name: t.Name,
      ability: abilityNames[spellcastingAbility],
      dc: spellSaveDC.toString(),
    },
  });
  spellcasting.push({
    string: `${spellToHitString} to hit`,
    type: "translatableText",
    translationKey: "toHit",
    translationVariables: {
      toHit: spellToHitString,
    },
  });
  spellcasting.push({
    string: " with spell attacks):",
    type: "translatableText",
    translationKey: "spellcastingDescription2",
  });
  s.spellcasting = spellcasting;

  // --------------------------------------------------
  // SPELL GROUPS/SLOTS
  // --------------------------------------------------
  let cantrips: StatStringArrayWithName | undefined;
  s.spells = [];
  for (const uses in spellsPerUses) {
    if (spellsPerUses[uses].spells.length === 0) {
      continue;
    }

    // removing duplicates
    spellsPerUses[uses].spells = spellsPerUses[uses].spells.filter(
      (spell, index, self) => index === self.findIndex((s) => s.id === spell.id)
    );
    // sorting spells by level (descending) and name (ascending)
    spellsPerUses[uses].spells.sort((a, b) => {
      const levelA =
        typeof a.properties?.level === "number"
          ? a.properties?.level
          : parseInt(a.properties?.level || "0");
      const levelB =
        typeof b.properties?.level === "number"
          ? b.properties?.level
          : parseInt(b.properties?.level || "0");
      if (levelA === levelB) {
        return a.value.localeCompare(b.value);
      }
      return levelB - levelA;
    });

    const group = spellsPerUses[uses];
    const parsedGroup: StatStringArrayWithName = {
      priority: 0,
      tag: group.tag,
      string: "",
      name: "",
      nameArray: [],
      array: [],
    };
    // spell names
    if (hasSlots) {
      // spell slots
      group.slots ??= 1;
      parsedGroup.charges = group.slots;
      parsedGroup.recharge = "spellSlot";
      if (uses === "0") {
        parsedGroup.name = "Cantrips (at will)";
        parsedGroup.nameArray.push({
          string: "Cantrips (at will)",
          type: "translatableText",
          translationKey: "cantripsAtWill",
        });
      } else {
        const level = `${uses}${addOrdinal(uses)} level`;
        const slots = `${group.slots} slots`;
        parsedGroup.name = `${level} (${slots})`;
        parsedGroup.nameArray.push({
          string: `${uses}${addOrdinal(uses)}`,
          number: parseInt(uses),
          type: "ordinal",
        });
        parsedGroup.nameArray.push(createPart(" "));
        parsedGroup.nameArray.push({
          string: "level",
          type: "translatableText",
        });
        parsedGroup.nameArray.push(createPart(" ("));
        parsedGroup.nameArray.push({
          string: slots,
          type: "translatableText",
          translationKey: "slotSpells",
          translationVariables: {
            n: group.slots.toString(),
          },
        });
        parsedGroup.nameArray.push(createPart(")"));
      }
    } else {
      // spell groups
      parsedGroup.charges = parseInt(uses);
      parsedGroup.recharge = "spellGroup";
      if (uses === "0") {
        parsedGroup.name = "At will";
        parsedGroup.nameArray.push({
          string: "At will",
          type: "translatableText",
        });
      } else {
        const name = `${uses}/day each`;
        parsedGroup.name = name;
        parsedGroup.nameArray.push({
          string: name,
          type: "translatableText",
          translationKey: "dayEach",
          translationVariables: {
            times: uses,
          },
        });
      }
    }

    // spell list
    for (let i = 0; i < group.spells.length; i++) {
      if (i > 0) {
        parsedGroup.string += ", ";
        parsedGroup.array.push(createPart(", "));
      }
      parsedGroup.string += group.spells[i].value;
      parsedGroup.array.push({
        string: group.spells[i].value,
        format: ["italic"],
        type: "spell",
        id: group.spells[i].id,
      });
    }

    if (uses === "0") {
      cantrips = parsedGroup;
    } else if (hasSlots) {
      // slots are ordered from lower to higher level
      s.spells.push(parsedGroup);
    } else {
      // uses/day are ordered from higher uses/day to lower
      s.spells.unshift(parsedGroup);
    }
  }

  if (cantrips) {
    // adding at will spells (or cantrips) at the beginning of the spells array
    s.spells.unshift(cantrips);
  }
}

/**
 * returns the number of times/day or slots for a spell group
 */
function getSpellTimesOrSlots(group: SpellGroup, character: Character) {
  let times = group.times || "0";
  let timesMax = group.timesMax || "0";
  // users are trying to write "at will" inside times/day and times/day max, and they're probably right to do so
  if (
    times
      .toString()
      .toLowerCase()
      .replace(/[^a-z]/g, "") === "atwill"
  ) {
    times = "0";
  }
  if (
    timesMax
      .toString()
      .toLowerCase()
      .replace(/[^a-z]/g, "") === "atwill"
  ) {
    timesMax = "9";
  }
  if (isNaN(parseInt(timesMax))) {
    timesMax = "9";
  }

  // timesDay can be an expression
  let timesNumber = parseExpressionNumeric(times, character);
  const timesMaxNumber = parseInt(timesMax);

  if (timesNumber > timesMaxNumber) {
    timesNumber = timesMaxNumber;
  }
  return timesNumber;
}
