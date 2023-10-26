import {
  Background,
  Character,
  createFourRandomNpcsResponseSchema,
  createRandomNpcInputSchema,
  getGeneratorDataResponseSchema,
  Keyword,
  ObjectOrVariant,
} from "@/stores/generator.d";
import { createStats } from "@/utils/parsers";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

/// /////////////////////////////////////

export const useGeneratorStore = defineStore("generator", () => {
  const session: Ref<Character[]> = ref([]);
  const settings: Ref<createRandomNpcInputSchema | null> = ref(null);
  const characters: Ref<Character[]> = ref([]);
  const currentCharacterIndex = ref(-1);
  const currentCharacterFromBitsPreview = ref<Character | null>(null);
  const racesAndVariants: Ref<ObjectOrVariant[]> = ref([]);
  const classesAndVariants: Ref<ObjectOrVariant[]> = ref([]);
  const backgrounds: Ref<Background[]> = ref([]);
  ///
  const primaryRaceIndex = ref(0);
  const secondaryRaceIndex = ref(0);
  const classIndex = ref(0);
  const backgroundIndex = ref(0);
  const options = ref<createRandomNpcInputSchema>({
    primaryRacePercentage: 50,
    secondaryRacePercentage: 40,
    classType: "randomSometimes",
    backgroundType: "random",
    levelType: "randomPeasantsMostly",
    addVoice: true,
    includeChildren: false,
  });
  const promptOptions = ref<createRandomNpcInputSchema>({});
  const keywords = ref<Keyword[]>([]);

  const generateNpcs = throttle(getRandomNpcs, 1000);

  async function getRandomNpcs() {
    const { data } = await useAsyncData<createFourRandomNpcsResponseSchema>(
      "npc",
      () =>
        $fetch(`${api}/npcs/four`, {
          method: "POST",
          body: options.value,
        })
    );

    if (data?.value?.npcs) {
      data?.value?.npcs.forEach((npc) => createStats(npc));
      session.value = [];
      session.value = data.value.npcs;
      return true;
    } else {
      return false;
    }
  }

  async function getGeneratorData() {
    const { data } = await useAsyncData<getGeneratorDataResponseSchema>(
      "generatorData",
      () => $fetch(`${api}/npcs/generator-data`)
    );
    racesAndVariants.value = prepareObjectOrVariantList(
      data.value?.races || [],
      "primaryRaceId",
      "primaryRacevariantId"
    );
    classesAndVariants.value = prepareObjectOrVariantList(
      data.value?.classes || [],
      "classId",
      "classvariantId"
    );
    backgrounds.value = data.value?.backgrounds || [];
    data.value?.backgrounds.forEach((background) => {
      keywords.value.push({
        word: background.name.toLowerCase(),
        type: "backgroundId",
        value: background.id,
      });
    });
  }

  function prepareObjectOrVariantList(
    objectWithVariants: getGeneratorDataResponseSchema["races"],
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

  function parseSettings(settings: createRandomNpcInputSchema) {
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
    generateNpcs,
    getGeneratorData,
    parseSettings,
  };
});
