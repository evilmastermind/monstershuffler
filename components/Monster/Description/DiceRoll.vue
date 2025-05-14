<template>
  <span
    role="button"
    tabindex="0"
    @click.stop="rollDice"
    @keydown.stop="rollDice"
    :class="[
      moralDecoration,
      'relative inline-block select-none leading-[inherit] hover:cursor-pointer',
    ]"
  >
    {{ translatedDiceRoll }}
    <TransitionGroup name="roll">
      <DiceRoll
        v-for="roll in rolls"
        :key="roll.id.toISOString()"
        :part="part"
      />
    </TransitionGroup>
  </span>
</template>

<script setup lang="ts">
/**
 * This component is used to display a dice roll in its text format,
 * and an animation for a brief period of time when the text is clicked.
 * Check DiceRoll.vue for the actual dice roll component.
 */
import { diceObject } from "monstershuffler-shared";
import type { DescriptionPart } from "@/types";

type Roll = {
  id: Date;
};

const p = defineProps({
  part: {
    type: Object as PropType<DescriptionPart>,
    required: true,
  },
});

const { t } = useI18n();
const moralDecoration = inject("moralDecoration") as string;
const rolls = ref<Roll[]>([]);

const translatedDiceRoll = computed(() => {
  if (p.part.type === "diceRoll" && p.part.roll?.dice.length) {
    let translation = "";
    p.part.roll.dice.forEach((diceGroup) => {
      if (translation) {
        translation += ` ${t("statBlock.plus")} `;
      }
      translation += t(
        `statBlock.value.${diceGroup.type || "value"}`,
        {
          n: "string" in diceGroup ? diceGroup.string : diceGroup.value,
        },
        diceGroup.value,
      );
    });
    return translation;
  }
  return p.part.string;
});

function rollDice(event: KeyboardEvent | MouseEvent | undefined = undefined) {
  if (
    event &&
    "key" in event &&
    !(event.key === "Enter" || event.key === " ")
  ) {
    return;
  }
  const id = new Date();
  rolls.value.push({ id });
  setTimeout(() => {
    removeRoll(id);
  }, 1000);
}

function removeRoll(id: Date) {
  const index = rolls.value.findIndex((roll) => roll.id === id);
  if (index === -1) {
    return;
  }
  rolls.value.splice(index, 1);
}
</script>
