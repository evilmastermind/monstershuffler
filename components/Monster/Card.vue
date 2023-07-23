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
      <ul>
        <li v-if="alignment">{{ alignment }}</li>
      </ul>
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
  if (race.value !== undefined) {
    if (["male", "female"].includes(character.value.pronouns || "")) {
      string += `${character.value.pronouns} `;
    }
    string += race.value.name;
  }
  // TODO: alignment
  return string;
});
const alignment = computed(() => {
  if (p.monster.statistics?.alignment) {
    return p.monster.statistics.alignment.join(" ");
  }
});
</script>

<style scoped lang="scss">
.bordered {
  border-style: solid;
  border-image: url("@/assets/images/card.png") 17 fill / 17px repeat;
  padding: 1em;
}
.bordered:hover {
  @apply text-text-secondary;
}
.title-name {
  font-family: MrsEavesSmallCaps;
  font-size: 1.15rem;
  font-weight: bold;
}
</style>
