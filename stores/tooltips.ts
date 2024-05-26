import type {
  getTraitDescriptionResponseSchema,
  GetSpellResponse,
} from "@/types";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

export const useTooltipsStore = defineStore("tooltips", () => {
  async function getDescription(word: string | number, type: string) {
    switch (type) {
      case "traits":
        return await getTraitDescription(word);
        break;
      case "backgrounds":
        return await getBackgroundDescription(word);
        break;
      default:
        return "";
    }
  }

  async function getTraitDescription(
    trait: string | number
  ): Promise<string | null> {
    try {
      const data: getTraitDescriptionResponseSchema = await $fetch(
        `${api}/traits/${trait}`
      );
      return data.description;
    } catch (error) {
      return null;
    }
  }

  async function getBackgroundDescription(id: string | number) {
    try {
      const data: getTraitDescriptionResponseSchema = await $fetch(
        `${api}/backgrounds/${id}`
      );
      return data.description;
    } catch (error) {
      return null;
    }
  }

  async function getSpellDescription(id: string | number) {
    try {
      const data: GetSpellResponse = await $fetch(`${api}/spells/${id}`);
      return data.object;
    } catch (error) {
      return null;
    }
  }

  return {
    getDescription,
    getSpellDescription,
  };
});
