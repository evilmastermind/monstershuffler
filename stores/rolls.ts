import type { Roll } from "@/types";

export const useRollsStore = defineStore("rolls", () => {
  const diceRolls: Ref<Roll[]> = ref([]);
  return {
    diceRolls,
  };
});
