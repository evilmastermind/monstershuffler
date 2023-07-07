<template>
  <div class="card-container bordered">
    <div class="card p-2">
      <div class="title">
        <span class="title-name">
          <span>{{ character.name }}</span>
          <span v-if="character.surname">
            {{ ` ${character.surname}` }}
          </span>
        </span>
        <span v-if="about" class="title-about">{{ `, ${about}` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from "@/stores/generator.d";

const p = defineProps({
  monster: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const character = computed(() => p.monster.character);
const race = computed(() => p.monster.character.race);
const about = computed(() => {
  let string = "";
  if (["male", "female"].includes(character.value.pronouns || "")) {
    string += `${character.value.pronouns} `;
  }
  if (race.value !== undefined) {
    string += race.value.name;
  }
  // TODO: alignment
  return string;
});
</script>

<style scoped lang="scss">
.bordered {
  border-style: solid;
  border-image-source: url("@/assets/images/border.gif");
  border-image-slice: 3 8;
  border-image-width: 3px 8px;
  border-image-repeat: repeat;
  box-sizing: border-box;
  padding: 0px 7px;
  background-clip: content-box;
  @apply bg-background;
}
.title-name {
  font-family: MrsEavesSmallCaps;
  font-size: 1.15rem;
  font-weight: bold;
}
</style>
