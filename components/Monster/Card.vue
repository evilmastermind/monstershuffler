<template>
  <MonsterCardBackground :alignment="statistics.alignment" selectable>
    <div v-if="statistics && tags" class="card p-2">
      <div class="title">
        <span class="title-name" :class="ethical">
          {{ statistics.fullName }}
        </span>
        <span v-if="about" class="title-about">{{ `, ${about}` }}</span>
      </div>
      <MonsterDescription
        v-if="statistics.characterHook"
        :character-hook="statistics.characterHook"
        class="mt-2"
      />
      <dl class="mt-2">
        <template v-if="character.age">
          <dt :class="ethical">{{ $t("monsterCard.age") }}</dt>
          <dd>
            {{ $t(`monsterCard.${character.age.string}`) }}
            ({{ $t("monsterCard.ageNumber", { age: character.age.number }) }})
          </dd>
        </template>
        <template v-if="statistics?.alignment.length">
          <dt :class="ethical">{{ $t("monsterCard.alignment") }}</dt>
          <dd>{{ statistics.alignment.join(" ") }}</dd>
        </template>
        <template v-if="character.trait">
          <dt :class="ethical">{{ $t("monsterCard.personality") }}</dt>
          <dd>{{ character.trait }}</dd>
        </template>
        <template v-if="character.voice">
          <dt :class="ethical">{{ $t("monsterCard.voice") }}</dt>
          <dd><MonsterVoice :voice="character.voice" /></dd>
        </template>
      </dl>
    </div>
  </MonsterCardBackground>
</template>

<script setup lang="ts">
import { Character } from "@/stores/generator.d";

const p = defineProps({
  monster: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const statistics = computed(() => p.monster.statistics!);
const tags = computed(() => p.monster.tags!);
const character = computed(() => p.monster.character!);
const about = computed(() => {
  let string = "";
  if (tags && statistics) {
    if (["male", "female"].includes(statistics.value.pronouns || "")) {
      string += `${statistics.value.pronouns} `;
    }
    string += tags.value.race;
  }
  // TODO: alignment
  return string;
});
const ethical = computed(() => {
  if (statistics.value.alignment.includes("Good")) {
    return "good";
  } else if (statistics.value.alignment.includes("Evil")) {
    return "evil";
  } else {
    return "neutral";
  }
});
const moral = computed(() => {
  if (statistics.value.alignment.includes("Lawful")) {
    return "lawful";
  } else if (statistics.value.alignment.includes("Chaotic")) {
    return "chaotic";
  } else {
    return "neutral";
  }
});
</script>

<style scoped lang="scss">
.card {
  font-family: ScalaSansOffc;
  font-size: 1.1em;
  max-width: 100%;
}
.title-name {
  font-family: MrsEavesSmallCaps;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.05em;
}
dt {
  float: left;
  clear: left;
  @apply font-bold mr-2;
}
dt::after {
  content: ":";
}
.evil {
  @apply text-evil-500;
}
.good {
  @apply text-good-500;
}
.neutral {
  @apply text-neutral-500;
}
</style>
