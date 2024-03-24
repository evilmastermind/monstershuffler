<template>
  <div class="container">
    <div class="border-top">
      <div class="border-top-angle-left" />
      <div class="border-top-center" />
      <div class="border-top-angle-right" />
    </div>
    <div class="content">
      <p>
        <span class="name"> {{ statistics.fullName }} </span>
        <span v-if="about" class="title-about">{{ `, ${about}` }}</span>
      </p>
      <MonsterDescription
        v-if="statistics.characterHook?.length"
        :parts="statistics.characterHook"
        period
        class="mt-1 italic"
      />
      <dl class="mt-2">
        <template v-if="character.character.age">
          <dt>{{ $t("monsterCard.age") }}</dt>
          <dd>
            {{ $t(`monsterCard.${character.character.age.string}`) }}
            ({{
              $t("monsterCard.ageNumber", {
                age: character.character.age.number,
              })
            }})
          </dd>
        </template>
        <template v-if="statistics?.alignment?.string">
          <dt>{{ $t("monsterCard.alignment") }}</dt>
          <dd>{{ statistics.alignment.string }}</dd>
        </template>
        <template v-if="character.character.trait">
          <dt>{{ $t("monsterCard.personality") }}</dt>
          <dd>
            <span
              class="dotted"
              @mouseover.stop="showTraitDescription = true"
              @mouseleave.stop="showTraitDescription = false"
            >
              <MSTooltip :word="character.character.trait" source="traits" />
            </span>
          </dd>
        </template>
        <template v-if="character.character.weight">
          <dt>{{ $t("monsterCard.weight") }}</dt>
          <dd>
            {{
              capitalizeFirst($t(`monsterCard.${character.character.weight}`))
            }}
          </dd>
        </template>
        <template v-if="character.character.voice">
          <dt>{{ $t("monsterCard.voice") }}</dt>
          <dd>
            <MonsterVoice :voice="character.character.voice" />
          </dd>
        </template>
      </dl>
    </div>
    <div class="border-bottom">
      <div class="border-bottom-angle-left" />
      <div class="border-bottom-center" />
      <div class="border-bottom-angle-right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Statistics, Character } from "@/types";

const statistics = inject("statistics") as Ref<Statistics>;
const character = inject("character") as Ref<Character>;

const showTraitDescription = ref(false);

const tags = computed(() => character.value.tags);

const about = computed(() => {
  let string = "";
  if (tags.value && statistics) {
    if (["male", "female"].includes(statistics.value.pronouns || "")) {
      string += `${statistics.value.pronouns} `;
    }
    string += tags.value.race;
  }
  return string;
});
</script>

<style scoped>
.container {
  --triangle-width: 0.5rem;
  --triangle-height: 0.22rem;
}
.content {
  font-family: "ScalaSansOffc";
  @apply bg-background-details shadow-xl px-4 py-1;
}
.name {
  font-weight: 600;
  font-size: 1.3rem;
  font-variant: small-caps;
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
.border-top {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-top-angle-left {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid black;
  border-bottom: var(--triangle-height) solid black;
  border-top: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-top-center {
  border-bottom: 3px solid black;
}
.border-top-angle-right {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid black;
  border-bottom: var(--triangle-height) solid black;
  border-top: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
.border-bottom {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-bottom-angle-left {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid black;
  border-top: var(--triangle-height) solid black;
  border-bottom: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-bottom-center {
  border-top: 3px solid black;
}
.border-bottom-angle-right {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid black;
  border-top: var(--triangle-height) solid black;
  border-bottom: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
</style>
