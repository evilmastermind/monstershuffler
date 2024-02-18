import type { ParsedDice, ParsedExpression } from "@/types";

export const useActionsStore = defineStore("actions", () => {
  const diceRolls: Ref<DiceRoll[]> = ref([]);
  return {
    diceRolls,
  };
});
