import { fetchEventSource } from "@microsoft/fetch-event-source";
import { createStats } from "monstershuffler-shared";
import { parseError, throttle } from "@/utils";
import type {
  Keyword,
  ObjectOrVariant,
  ObjectList,
  PostFourRandomNpcsResponse,
  PostRandomNpcBody,
  GetGeneratorDataResponse,
  GeneratorCharacter,
  Character,
  NpcDetails,
} from "@/types";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

class FatalError extends Error {}

/// /////////////////////////////////////

export const useGeneratorStore = defineStore("generator", () => {
  /**
   * State
   */

  const session = ref<NpcDetails[]>([]); // this is the list of npcs returned from the server
  const characters = ref<GeneratorCharacter[]>([]); // this is the list of npcs chosen by the user

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
  const options = ref<PostRandomNpcBody>({
    primaryRacePercentage: 50,
    secondaryRacePercentage: 40,
    classType: "randomSometimes",
    backgroundType: "random",
    levelType: "randomPeasantsMostly",
    addVoice: true,
    includeChildren: false,
    includeBodyType: false,
  });
  const promptOptions = ref<PostRandomNpcBody>({});
  const keywords = ref<Keyword[]>([]);

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
    sessionId: string | undefined
  ): Promise<number> {
    try {
      const data: PostFourRandomNpcsResponse = await $fetch(
        `${api}/npcs/four`,
        {
          method: "POST",
          body: { ...npcOptions, sessionId },
        }
      );

      data?.npcs.forEach((npc) => {
        const character = npc.object;
        if (!character.statistics) {
          createStats(character);
        }
      });
      session.value = [];
      data.npcs.forEach((npc) => {
        session.value.push(markRaw(npc));
      });
      return 200;
    } catch (error) {
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

  function parseSettings(newSettings: PostRandomNpcBody | undefined) {
    if (newSettings) {
      options.value = { ...newSettings };
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

  async function generateBackstory(
    wrapper: Ref<GeneratorCharacter>
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
        }),
        openWhenHidden: true,
        signal,
        // eslint-disable-next-line
      async onopen(response) {
          wrapper.value.streamStatus = "open";
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
                  break;
                case "physicalAppearance":
                  c.physicalAppearance += newChunk;
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
          controller.abort();
          return 200;
        },
        onerror(err) {
          backstory.string = `An error occurred while generating the backstory (${err}).`;
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
      return parseError(error).statusCode;
    }
  }

  /**
   * Adds a new character to the list of characters, if it doesn't already exist, and returns its index.
   * Optionally, it can also select the character.
   * @param character
   * @param selected
   * @returns
   */
  function pushNewCharacter(
    character: NpcDetails,
    selected: boolean = false
  ): number {
    let characterIndex = characters.value.findIndex(
      (char) => char.id === character.id
    );
    if (characterIndex < 0) {
      characters.value.push({
        object: markRaw(character.object),
        id: character.id,
        key: 1,
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
  function setCharacter(index: number) {
    if (index < 0 || index >= characters.value.length) {
      return;
    }
    currentCharacterIndex.value = index;
  }

  function unsetCharacter() {
    currentCharacterIndex.value = -1;
  }

  async function getNpc(uuid: string) {
    try {
      const data: NpcDetails = await $fetch(`${api}/npcs/${uuid}`);
      if (!data.object.statistics) {
        createStats(data.object);
      }
      pushNewCharacter(data, true);
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  function getCurrentNPCRating(): number {
    if (currentCharacterIndex.value < 0) {
      return 0;
    }
    return characters.value[currentCharacterIndex.value].rating || 0;
  }

  const setCurrentNPCRatingThrottle = throttle(setCurrentNPCRating, 2000);

  const triggerUpdateCharacter = throttle((index: number) => {
    if (index < 0 || index >= characters.value.length) {
      return;
    }
    characters.value[index].key += 1;
  }, 200);

  async function setCurrentNPCRating(
    rating: number,
    sessionId: string | undefined
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
  return {
    session,
    // settings,
    characters,
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
    options,
    promptOptions,
    keywords,
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
    setCharacter,
    triggerUpdateCharacter,
    unsetCharacter,
  };
});
