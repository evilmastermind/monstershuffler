import { fetchEventSource } from "@microsoft/fetch-event-source";
import { createStats } from "monstershuffler-shared";
import { parseError, throttle, type ApiResponse } from "@/utils";
import type {
  Keyword,
  ObjectOrVariant,
  ObjectList,
  PostFourRandomNpcsResponse,
  PostRandomNpcBody,
  GetGeneratorDataResponse,
  GeneratorCharacter,
  NPCGeneratorSettings,
  NpcDetails,
} from "@/types";

class FatalError extends Error {}

/// /////////////////////////////////////

export const useGeneratorStore = defineStore("generator", () => {
  const config = useRuntimeConfig();
  const api = config.public.apiUrl;
  ///
  const user = useUserStore();
  const toast = useToast();
  const { t } = useI18n();
  /**
   * State
   */

  const session = ref<NpcDetails[]>([]); // this is the list of npcs returned from the server
  const characters = ref<GeneratorCharacter[]>([]); // this is the list of npcs chosen by the user
  const saveTrigger = ref(0);

  const currentCharacterBitIndex = ref(-1);
  const currentCharacterIndex = ref(-1);

  // these are used to download the character sheet, stat block, and roleplay stats
  const currentSheetHTMLElement = shallowRef<HTMLElement | null>(null);
  const currentStatBlockHTMLElement = shallowRef<HTMLElement | null>(null);
  const currentRoleplayStatsHTMLElement = shallowRef<HTMLElement | null>(null);

  // npc generator data
  const racesAndVariants = shallowRef<ObjectOrVariant[]>([]);
  const classesAndVariants = shallowRef<ObjectOrVariant[]>([]);
  const backgrounds = shallowRef<ObjectList>([]);

  // npc generator options
  const primaryRaceIndex = ref(0);
  const secondaryRaceIndex = ref(0);
  const classIndex = ref(0);
  const backgroundIndex = ref(0);
  const promptOptions = ref<PostRandomNpcBody>({});
  const promptFromOtherSources = ref("");
  const keywords = shallowRef<Keyword[]>([]);
  const settings = ref<NPCGeneratorSettings>({
    characters: [],
    options: {
      primaryRacePercentage: 50,
      secondaryRacePercentage: 40,
      classType: "randomSometimes",
      backgroundType: "random",
      levelType: "randomPeasantsMostly",
      addVoice: true,
      includeChildren: false,
      includeBodyType: true,
    },
    isFormMode: false,
    layout: "MonsterLayoutDynamicA",
    showRoleplayStats: true,
  });
  const prompt = ref("");
  /**
   * Computed properties
   */

  // const currentCharacter = computed(() => {
  //   if (currentCharacterIndex.value >= 0) {
  //     return characters.value[currentCharacterIndex.value].object as Character;
  //   }
  //   return null;
  // });
  // const currentCharacterWithGeneratorData = computed(() => {
  //   if (currentCharacterIndex.value >= 0) {
  //     return characters.value[currentCharacterIndex.value];
  //   }
  //   return null;
  // });

  /**
   * Actions
   */

  // const generateNpcs = throttle(getRandomNpcs, 1000);
  // const generateNpc = throttle(getRandomNpc, 1000);

  async function getRandomNpcs(
    npcOptions: PostRandomNpcBody,
    sessionId: string | undefined,
  ): Promise<ApiResponse<PostFourRandomNpcsResponse>> {
    try {
      const response = await $fetch.raw<PostFourRandomNpcsResponse>(
        `${api}/npcs/four`,
        {
          method: "POST",
          body: { ...npcOptions, sessionId },
        },
      );

      response._data?.npcs.forEach((npc) => {
        const character = npc.object;
        createStats(character);
      });
      session.value = [];
      response._data?.npcs.forEach((npc) => {
        session.value.push(markRaw(npc));
      });
      return parseResponse<PostFourRandomNpcsResponse>(response);
    } catch (error) {
      return notifyCommonErrors(parseError<PostFourRandomNpcsResponse>(error));
    }
  }

  async function getGeneratorData(): Promise<
    ApiResponse<GetGeneratorDataResponse>
  > {
    try {
      const response = await $fetch.raw<GetGeneratorDataResponse>(
        `${api}/npcs/generator-data`,
      );
      racesAndVariants.value = prepareObjectOrVariantList(
        response._data?.races || [],
        "primaryRaceId",
        "primaryRacevariantId",
      );
      triggerRef(racesAndVariants);
      classesAndVariants.value = prepareObjectOrVariantList(
        response._data?.classes || [],
        "classId",
        "classvariantId",
      );
      triggerRef(classesAndVariants);
      backgrounds.value = response._data?.backgrounds || [];
      response._data?.backgrounds.forEach((background) => {
        keywords.value.push({
          word: background.name.toLowerCase(),
          type: "backgroundId",
          value: background.id,
        });
      });
      triggerRef(backgrounds);
      triggerRef(keywords);
      return parseResponse<GetGeneratorDataResponse>(response);
    } catch (error) {
      return notifyCommonErrors(parseError<GetGeneratorDataResponse>(error));
    }
  }

  function prepareObjectOrVariantList(
    objectWithVariants: GetGeneratorDataResponse["races"],
    type: Keyword["type"],
    typevariant: Keyword["type"],
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

  function parseSettings() {
    let index = -1;
    if (settings.value.options.primaryRaceId) {
      index = racesAndVariants.value.findIndex((race) => {
        return (
          race.id === settings.value.options.primaryRaceId &&
          race.variantId === settings.value.options.primaryRacevariantId
        );
      });
      if (index !== -1) {
        primaryRaceIndex.value = index;
      }
    } else {
      index = racesAndVariants.value.findIndex((race) =>
        race.name.includes("Human"),
      );
      if (index !== -1) {
        primaryRaceIndex.value = index;
      }
    }
    if (settings.value.options.secondaryRaceId) {
      index = racesAndVariants.value.findIndex((race) => {
        return (
          race.id === settings.value.options.secondaryRaceId &&
          race.variantId === settings.value.options.secondaryRacevariantId
        );
      });
      if (index !== -1) {
        secondaryRaceIndex.value = index;
      }
    } else {
      index = racesAndVariants.value.findIndex((race) =>
        race.variantName?.includes("Hill Dwarf"),
      );
      if (index !== -1) {
        secondaryRaceIndex.value = index;
      }
    }
    if (settings.value.options.classId) {
      index = classesAndVariants.value.findIndex((aClass) => {
        return (
          aClass.id === settings.value.options.classId &&
          aClass.variantId === settings.value.options.classvariantId
        );
      });
      if (index !== -1) {
        classIndex.value = index;
      }
    }
    if (settings.value.options.backgroundId) {
      index = backgrounds.value.findIndex(
        (background) => background.id === settings.value.options.backgroundId,
      );
      if (index !== -1) {
        backgroundIndex.value = index;
      }
    }
  }

  async function generateBackstory(
    wrapper: Ref<GeneratorCharacter>,
    hook?: number,
  ): Promise<number> {
    const controller = new AbortController();
    const { signal } = controller;

    if (wrapper.value.streamStatus) {
      // a backstory is already being generated / has already been generated
      return 200;
    }

    const c = wrapper.value.object.character;

    if (!c.user) {
      c.user = {};
    }
    if (!c.user.backstory) {
      c.user.backstory = { string: "" };
    }

    const backstory = c.user.backstory as {
      string: string;
    };
    wrapper.value.streamChunks = [];

    let contentBeingStreamed: "backstory" | "physicalAppearance" = "backstory";
    let lastEventId = "";
    const updateKeyThrottle = throttle(() => {
      wrapper.value.key++;
    }, 500);

    try {
      wrapper.value.streamStatus = "opening";
      await fetchEventSource(`${api}/npcs/backstory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Last-Event-ID": lastEventId,
        },
        body: JSON.stringify({
          id: wrapper.value.id,
          hook,
        }),
        openWhenHidden: true,
        signal,
        // eslint-disable-next-line
        async onopen(response) {
          wrapper.value.streamStatus = "open";
          wrapper.value.hook = hook;
          if (
            response.ok
            // && response.headers.get("content-type") === EventStreamContentType
          ) {
            // OK
          } else if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            // client-side errors are usually non-retriable:
            throw new FatalError();
          } else {
            throw new FatalError();
          }
        },
        onmessage(msg) {
          // if the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (msg.event === "FatalError" || msg.id === "error") {
            throw new FatalError(msg.data);
          }

          if (msg.id === "appearance_incoming") {
            contentBeingStreamed = "physicalAppearance";
            c.physicalAppearance = "";
          }

          if (msg.data) {
            try {
              const newChunk = JSON.parse(msg.data) as string;
              switch (contentBeingStreamed) {
                case "backstory":
                  backstory.string += newChunk;
                  backstory.string.replace(/\n\n/g, "\n");
                  wrapper.value.streamChunks!.push(newChunk);
                  updateKeyThrottle();
                  break;
                case "physicalAppearance":
                  c.physicalAppearance += newChunk;
                  updateKeyThrottle();
                  break;
              }
            } catch (error) {
              backstory.string += msg.data;
            }
          }

          lastEventId = msg.id;
          // triggerUpdateCharacter(currentCharacterIndex.value);
        },
        onclose() {
          wrapper.value.streamStatus = "closed";
          updateKeyThrottle();
          triggerSaveThrottle();
          controller.abort();
          return 200;
        },
        onerror(err) {
          if (!backstory.string) {
            backstory.string = `An error occurred while generating the backstory (${err}).`;
          }
          wrapper.value.streamChunks?.push(backstory.string);
          wrapper.value.streamStatus = "error";
          if (err instanceof FatalError) {
            controller.abort();
            throw err; // rethrow to stop the operation
          } else {
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        },
      });
      return 200;
    } catch (error) {
      return parseError(error).status;
    }
  }

  /**
   * Adds a new character to the list of characters, if it doesn't already exist, and returns its index.
   * Optionally, it can also select the character.
   */
  function pushNewCharacter(
    character: NpcDetails,
    selected: boolean = false,
    hook: number | undefined = undefined,
  ): number {
    let characterIndex = characters.value.findIndex(
      (char) => char.id === character.id,
    );
    if (characterIndex < 0) {
      characters.value.push({
        object: markRaw(character.object),
        id: character.id,
        key: 1,
        hook,
        streamChunks: [],
      });
      characterIndex = characters.value.length - 1;
      triggerRef(characters);
    }
    if (selected) {
      currentCharacterIndex.value = characterIndex;
    }
    return characterIndex;
  }
  function spliceCharacter(index: number) {
    if (index < 0 || index >= characters.value.length) {
      return;
    }
    let newIndex = currentCharacterIndex.value;
    if (newIndex > characters.value.length - 2) {
      newIndex = characters.value.length - 2;
    }
    if (newIndex < -1) {
      newIndex = -1;
    }
    characters.value.splice(index, 1);
    currentCharacterIndex.value = newIndex;
    triggerRef(characters);
  }
  function clearAllCharacters() {
    characters.value = [];
    currentCharacterIndex.value = -1;
    triggerRef(characters);
  }
  function setCharacter(index: number) {
    if (index < 0 || index >= characters.value.length) {
      return;
    }
    currentCharacterIndex.value = index;
  }

  function unsetCharacter() {
    currentCharacterIndex.value = -1;
  }

  type GetNpcResponse = NpcDetails & { hasBackstory: boolean };
  async function getNpc(uuid: string, hook: number | undefined) {
    try {
      const url =
        hook === undefined
          ? `${api}/npcs/${uuid}`
          : `${api}/npcs/${uuid}/${hook}`;
      const response = await $fetch.raw<GetNpcResponse>(url);
      const data = response._data;
      if (!data) {
        throw new Error("No data received");
      }
      if (!data.object.statistics) {
        createStats(data.object);
      }
      pushNewCharacter(data, true, data.hasBackstory ? hook : undefined);
      return parseResponse<GetNpcResponse>(response);
    } catch (error) {
      return notifyCommonErrors(parseError<GetNpcResponse>(error));
    }
  }

  function getCurrentNPCRating(): number {
    if (currentCharacterIndex.value < 0) {
      return 0;
    }
    return characters.value[currentCharacterIndex.value].rating || 0;
  }

  const setCurrentNPCRatingThrottle = throttle(setCurrentNPCRating, 2000);
  const triggerSaveThrottle = throttle(() => {
    saveTrigger.value += 1;
  }, 3000);

  const triggerUpdateCharacter = throttle((index: number) => {
    if (index < 0 || index >= characters.value.length) {
      return;
    }
    characters.value[index].key += 1;
  }, 200);

  async function setCurrentNPCRating(
    rating: number,
    sessionId: string | undefined,
  ): Promise<void> {
    if (currentCharacterIndex.value < 0) {
      return;
    }
    const character = characters.value[currentCharacterIndex.value];
    character.rating = rating;
    await $fetch(`${api}/npcs/rating`, {
      method: "POST",
      body: { rating, id: character.id, sessionid: sessionId },
    });
  }

  const saveSettingsThrottle = throttle(() => saveSettings(), 3000);
  function saveSettings() {
    const newSettings: NPCGeneratorSettings = {
      ...settings.value,
      characters: characters.value as GeneratorCharacter[],
    };
    user.setSettings<NPCGeneratorSettings>("npcgenerator", newSettings);
  }

  function notifyCommonErrors<T>(error: ApiResponse<T>) {
    const status = error.status;
    switch (status) {
      case 400:
        toast.add({
          description: t("error.badRequest"),
          color: "error",
        });
        break;
      case 401:
        toast.add({
          description: t("error.unauthorized"),
          color: "error",
        });
        break;
      case 403:
        toast.add({
          description: t("error.forbidden"),
          color: "error",
        });
        break;
      case 404:
        toast.add({
          description: t("error.notFound"),
          color: "error",
        });
        break;
      case 429:
        toast.add({
          description: t("error.tooManyRequests"),
          color: "error",
        });
        break;
      case 500:
        toast.add({
          description: t("error.internalServerError"),
          color: "error",
        });
        break;
      case 503:
        toast.add({
          description: t("error.serviceUnavailable"),
          color: "error",
        });
        break;
      default:
        toast.add({
          description: t("error.unknownError"),
          color: "error",
        });
        break;
    }
    // if (error.status === 429) {
    //   toast.add({
    //     description: t("error.tooManyRequests"),
    //     color: "error",
    //   });
    // } else {
    //   toast.add({
    //     description: t("error.couldntRetrieveData"),
    //     color: "error",
    //   });
    // }
    return error;
  }

  return {
    settings,
    session,
    characters,
    saveTrigger,
    currentSheetHTMLElement,
    currentStatBlockHTMLElement,
    currentRoleplayStatsHTMLElement,
    currentCharacterIndex,
    currentCharacterBitIndex,
    racesAndVariants,
    classesAndVariants,
    backgrounds,
    primaryRaceIndex,
    secondaryRaceIndex,
    classIndex,
    backgroundIndex,
    promptOptions,
    promptFromOtherSources,
    keywords,
    prompt,
    setCurrentNPCRatingThrottle,
    getRandomNpcs,
    getNpc,
    // generateNpc,
    getGeneratorData,
    parseSettings,
    generateBackstory,
    getCurrentNPCRating,
    setCurrentNPCRating,
    pushNewCharacter,
    spliceCharacter,
    setCharacter,
    clearAllCharacters,
    triggerUpdateCharacter,
    triggerSaveThrottle,
    unsetCharacter,
    saveSettingsThrottle,
  };
});
