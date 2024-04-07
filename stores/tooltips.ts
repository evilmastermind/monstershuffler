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

  async function getTraitDescription(trait: string | number) {
    const { data } = await useAsyncData<getTraitDescriptionResponseSchema>(
      "trait",
      () => $fetch(`${api}/traits/${trait}`)
    );
    if (data?.value?.description !== undefined) {
      return data.value.description;
    } else {
      return null;
    }
  }

  async function getBackgroundDescription(id: string | number) {
    const { data } = await useAsyncData<getTraitDescriptionResponseSchema>(
      "background",
      () => $fetch(`${api}/backgrounds/${id}`)
    );
    if (data?.value?.description !== undefined) {
      return data.value.description;
    } else {
      return null;
    }
  }

  async function getSpellDescription(id: string | number) {
    const { data } = await useAsyncData<GetSpellResponse>("spell", () =>
      $fetch(`${api}/spells/${id}`)
    );
    if (data?.value?.object !== undefined) {
      return data.value?.object;
    } else {
      return null;
    }
  }

  return {
    getDescription,
    getSpellDescription,
  };
});
