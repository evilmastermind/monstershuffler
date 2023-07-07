import {
  Character,
  ObjectOrVariant,
  getRaceWithVariantsListResponseSchema,
  getClassWithVariantsListResponseSchema,
  getProfessionListResponseSchema,
  createRandomNpcInputSchema,
  createFourRandomNpcsResponseSchema,
} from "@/stores/generator.d";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

export const useGeneratorStore = defineStore("generator", () => {
  const session: Ref<Character[][]> = ref([]);

  async function getRandomNpcs(object: createRandomNpcInputSchema) {
    const {
      data,
      // pending,
      // error,
      // refresh,
    } = await useAsyncData<createFourRandomNpcsResponseSchema>("npc", () =>
      $fetch(`${api}/npcs/four`, {
        method: "POST",
        body: object,
      })
    );

    if (data?.value?.npcs) {
      session.value.push(data.value.npcs);
      return true;
    } else {
      return false;
    }
  }

  async function getRacesWithVariants() {
    const {
      data: races,
      // pending,
      // error,
      // refresh,
    } = await useAsyncData<getRaceWithVariantsListResponseSchema>("races", () =>
      $fetch(`${api}/races/withvariants`)
    );

    const raceList: ObjectOrVariant[] = [];

    races.value?.list.forEach((race) => {
      if (
        Object.hasOwn(race, "other_objects") &&
        race.other_objects.length > 0
      ) {
        race.other_objects.forEach((otherObject) => {
          raceList.push({
            id: race.id,
            name: race.name,
            userId: race.userid,
            variantId: otherObject.id,
            variantName: otherObject.name,
            variantUserId: otherObject.userid,
          });
        });
      } else {
        raceList.push({
          id: race.id,
          name: race.name,
          userId: race.userid,
        });
      }
    });
    return raceList;
  }

  async function getClassesWithVariants() {
    const {
      data: classes,
      // pending,
      // error,
      // refresh,
    } = await useAsyncData<getClassWithVariantsListResponseSchema>(
      "classes",
      () => $fetch(`${api}/classes/withvariants`)
    );

    const classList: ObjectOrVariant[] = [];

    classes.value?.list.forEach((aClass) => {
      if (
        Object.hasOwn(aClass, "other_objects") &&
        aClass.other_objects.length > 0
      ) {
        aClass.other_objects.forEach((otherObject) => {
          classList.push({
            id: aClass.id,
            name: aClass.name,
            userId: aClass.userid,
            variantId: otherObject.id,
            variantName: otherObject.name,
            variantUserId: otherObject.userid,
          });
        });
      } else {
        classList.push({
          id: aClass.id,
          name: aClass.name,
          userId: aClass.userid,
        });
      }
    });
    return classList;
  }

  async function getProfessions() {
    const {
      data: professions,
      // pending,
      // error,
      // refresh,
    } = await useAsyncData<getProfessionListResponseSchema>("professions", () =>
      $fetch(`${api}/professions`)
    );

    return professions.value?.list || [];
  }

  return {
    session,
    getRacesWithVariants,
    getClassesWithVariants,
    getProfessions,
    getRandomNpcs,
  };
});
