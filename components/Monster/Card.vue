<template>
  <MonsterCardBackground
    :ethical="ethical"
    :moral="moral"
    :selectable="selectable"
  >
    <div v-if="statistics && tags" class="card p-2">
      <div class="title">
        <span class="title-name" :class="moral">
          {{ statistics.fullName }}
        </span>
        <span v-if="about" class="title-about">{{ `, ${about}` }}</span>
      </div>
      <MonsterDescription
        v-if="statistics.characterHook?.length"
        :parts="statistics.characterHook"
        period
        class="mt-2 italic"
      />
      <dl class="mt-2">
        <template v-if="character.age">
          <dt :class="moral">{{ $t("monsterCard.age") }}</dt>
          <dd>
            {{ $t(`monsterCard.${character.age.string}`) }}
            ({{ $t("monsterCard.ageNumber", { age: character.age.number }) }})
          </dd>
        </template>
        <template v-if="statistics?.alignment?.string">
          <dt :class="moral">{{ $t("monsterCard.alignment") }}</dt>
          <dd>{{ statistics.alignment.string }}</dd>
        </template>
        <template v-if="character.trait">
          <dt :class="moral">{{ $t("monsterCard.personality") }}</dt>
          <dd>
            <span
              class="dotted"
              @mouseover.stop="showTraitDescription = true"
              @mouseleave.stop="showTraitDescription = false"
            >
              <MSTooltip :word="character.trait" source="traits" />
            </span>
          </dd>
        </template>
        <template v-if="character.voice">
          <dt :class="moral">{{ $t("monsterCard.voice") }}</dt>
          <dd>
            <MonsterVoice :voice="character.voice" />
          </dd>
        </template>
      </dl>
    </div>
  </MonsterCardBackground>
</template>

<script setup lang="ts">
import type { Character } from "@/types";
import { useTooltipsStore } from "@/stores/tooltips";

const tooltips = useTooltipsStore();

const p = defineProps({
  monster: {
    type: Object as PropType<Character>,
    required: true,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
});
const showTraitDescription = ref(false);

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
const moral = computed(() => {
  const alignment = statistics.value?.alignment?.string || "";
  if (alignment.includes("Good")) {
    return "good";
  } else if (alignment.includes("Evil")) {
    return "evil";
  } else {
    return "neutral";
  }
});
const ethical = computed(() => {
  const alignment = statistics.value?.alignment?.string || "";
  if (alignment.includes("Lawful")) {
    return "lawful";
  } else if (alignment.includes("Chaotic")) {
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
.dotted {
  border-bottom: 1px dotted theme("colors.text-secondary");
  cursor: help;
}
</style>
