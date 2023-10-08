import { get } from "http";
import { getTraitDescriptionResponseSchema } from "./tooltips.d";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

export const useTooltipsStore = defineStore("tooltips", () => {
  async function getDescription(word: string, type: string) {
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

  async function getTraitDescription(trait: string) {
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

  return {
    getDescription,
  };
});
