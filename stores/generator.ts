import { parseError } from "@/utils";
import type {
  Keyword,
  CharacterChanges,
  ObjectOrVariant,
  ObjectList,
  PostFourRandomNpcsResponse,
  // PostRandomNpcResponse,
  PostRandomNpcInput,
  GetGeneratorDataResponse,
  Character,
} from "@/types";
import { createStats, adjustLevel } from "@/parsers";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

/// /////////////////////////////////////

export const useGeneratorStore = defineStore("generator", () => {
  /**
   * State
   */

  const session = ref<Character[]>([]);
  const settings = ref<PostRandomNpcInput>();
  const characters = ref<Character[]>([]);
  const currentCharacterIndex = ref(-1);
  const currentCharacterFromBitsPreview = ref<Character>();
  const racesAndVariants = ref<ObjectOrVariant[]>([]);
  const classesAndVariants = ref<ObjectOrVariant[]>([]);
  const backgrounds = ref<ObjectList>([]);
  //
  const primaryRaceIndex = ref(0);
  const secondaryRaceIndex = ref(0);
  const classIndex = ref(0);
  const backgroundIndex = ref(0);
  const options = ref<PostRandomNpcInput>({
    primaryRacePercentage: 50,
    secondaryRacePercentage: 40,
    classType: "randomSometimes",
    backgroundType: "random",
    levelType: "randomPeasantsMostly",
    addVoice: true,
    includeChildren: false,
    includeBodyType: false,
  });
  const promptOptions = ref<PostRandomNpcInput>({});
  const keywords = ref<Keyword[]>([]);

  /**
   * Computed properties
   */

  const currentCharacter = computed(() => {
    return characters.value[currentCharacterIndex.value] as Character;
  });

  /**
   * Actions
   */

  // const generateNpcs = throttle(getRandomNpcs, 1000);
  // const generateNpc = throttle(getRandomNpc, 1000);

  async function getRandomNpcs(
    npcOptions: PostRandomNpcInput,
    changes: CharacterChanges = {}
  ): Promise<number> {
    try {
      const data: PostFourRandomNpcsResponse = await $fetch(
        `${api}/npcs/four`,
        {
          method: "POST",
          body: npcOptions,
        }
      );

      data?.npcs.forEach((npc) => {
        if (changes.alignmentEthical) {
          npc.character.alignmentEthical = changes.alignmentEthical;
        }
        if (changes.alignmentMoral) {
          npc.character.alignmentMoral = changes.alignmentMoral;
        }
        if (changes.CR) {
          if (!npc.variations) {
            npc.variations = {};
          }
          npc.variations.currentCR = changes.CR;
          adjustLevel(npc);
        }
        createStats(npc);
      });
      session.value = [];
      session.value = data.npcs;
      return 200;
    } catch (error) {
      console.log("error", error);
      return parseError(error).statusCode;
    }
  }

  async function getGeneratorData(): Promise<number> {
    try {
      const data: GetGeneratorDataResponse = await $fetch(
        `${api}/npcs/generator-data`
      );
      racesAndVariants.value = prepareObjectOrVariantList(
        data.races || [],
        "primaryRaceId",
        "primaryRacevariantId"
      );
      classesAndVariants.value = prepareObjectOrVariantList(
        data.classes || [],
        "classId",
        "classvariantId"
      );
      backgrounds.value = data.backgrounds || [];
      data.backgrounds.forEach((background) => {
        keywords.value.push({
          word: background.name.toLowerCase(),
          type: "backgroundId",
          value: background.id,
        });
      });
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  function prepareObjectOrVariantList(
    objectWithVariants: GetGeneratorDataResponse["races"],
    type: Keyword["type"],
    typevariant: Keyword["type"]
  ) {
    const objectOrVariantList: ObjectOrVariant[] = [];
    objectWithVariants.forEach((object) => {
      keywords.value.push({
        word: object.name.toLowerCase(),
        type,
        value: object.id,
      });
      if (
        Object.hasOwn(object, "other_objects") &&
        object.other_objects.length > 0
      ) {
        object.other_objects.forEach((otherObject) => {
          objectOrVariantList.push({
            id: object.id,
            name: object.name,
            userId: object.userid,
            variantId: otherObject.id,
            variantName: otherObject.name,
            variantUserId: otherObject.userid,
          });
          keywords.value.push({
            word: otherObject.name.toLowerCase(),
            type: typevariant,
            value: otherObject.id,
            variantOf: object.id,
            variantOfType: type,
          });
        });
      } else {
        objectOrVariantList.push({
          id: object.id,
          name: object.name,
          userId: object.userid,
        });
      }
    });
    return objectOrVariantList;
  }

  function parseSettings(settings: PostRandomNpcInput) {
    if (settings) {
      options.value = { ...settings };
      let index = -1;
      if (options.value.primaryRaceId) {
        index = racesAndVariants.value.findIndex((race) => {
          return (
            race.id === options.value.primaryRaceId &&
            race.variantId === options.value.primaryRacevariantId
          );
        });
        if (index !== -1) {
          primaryRaceIndex.value = index;
        }
      }
      if (options.value.secondaryRaceId) {
        index = racesAndVariants.value.findIndex((race) => {
          return (
            race.id === options.value.secondaryRaceId &&
            race.variantId === options.value.secondaryRacevariantId
          );
        });
        if (index !== -1) {
          secondaryRaceIndex.value = index;
        }
      }
      if (options.value.classId) {
        index = classesAndVariants.value.findIndex((aClass) => {
          return (
            aClass.id === options.value.classId &&
            aClass.variantId === options.value.classvariantId
          );
        });
        if (index !== -1) {
          classIndex.value = index;
        }
      }
      if (options.value.backgroundId) {
        index = backgrounds.value.findIndex(
          (background) => background.id === options.value.backgroundId
        );
        if (index !== -1) {
          backgroundIndex.value = index;
        }
      }
    } else {
      // TODO: you will have to change this in the future, if you decide to support multiple languages
      let index = racesAndVariants.value.findIndex((race) =>
        race.name.includes("Human")
      );
      if (index !== -1) {
        primaryRaceIndex.value = index;
      }
      index = racesAndVariants.value.findIndex((race) =>
        race.variantName?.includes("Hill Dwarf")
      );
      if (index !== -1) {
        secondaryRaceIndex.value = index;
      }
    }
  }

  return {
    session,
    settings,
    characters,
    currentCharacter,
    currentCharacterIndex,
    currentCharacterFromBitsPreview,
    racesAndVariants,
    classesAndVariants,
    backgrounds,
    primaryRaceIndex,
    secondaryRaceIndex,
    classIndex,
    backgroundIndex,
    options,
    promptOptions,
    keywords,
    getRandomNpcs,
    // generateNpc,
    getGeneratorData,
    parseSettings,
  };
});
