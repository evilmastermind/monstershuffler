<template>
  <div>
    <Transition name="fade" appear mode="out-in">
      <div
        class="bit p-1 noselect"
        :class="moral()"
        :style="{
          transitionDelay: `${0.02 * index}s`,
          transitionProperty: 'opacity, transform',
        }"
        @touchstart="isTouchScreen = true"
        @mouseenter="setBitPreview(true)"
        @mouseleave="setBitPreview(false)"
      >
        <div class="name-container">
          <p class="content name">{{ character?.character?.name }}</p>
          <MSIconButton
            class="close ml-1"
            :class="hasBeenClickedOnce ? 'rainbow' : ''"
            :label="$t('clickTwiceToDelete')"
            icon="fa6-solid:xmark"
            @click.stop="deleteThisCharacter()"
          />
        </div>
        <p class="content">{{ race() }}</p>
        <p class="content">{{ profession() }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentCharacterBitIndex } =
  storeToRefs(generator);

const p = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const hasBeenClickedOnce = ref(false);
const isTouchScreen = ref(false);
const deleteTimeout: Ref<NodeJS.Timeout | null> = ref(null);
const character = ref(characters.value[p.index].object);

const race = () => {
  let info = "";
  if (character.value?.character?.racevariant?.name) {
    info += character.value.character.racevariant.name;
  } else if (character.value?.character?.race?.name) {
    info += character.value.character.race.name;
  }
  return info;
};
const profession = () => {
  let info = "";
  if (character.value?.character?.class?.name) {
    info += ` ${character.value.character.class.name}`;
  }
  if (character.value?.character?.background?.name) {
    info += ` ${character.value.character.background.name}`;
  }
  return info;
};

const moral = () => {
  const alignment = character.value?.statistics?.alignment?.string || "";
  if (alignment.includes("Good")) {
    return "bg-background-good";
  } else if (alignment.includes("Evil")) {
    return "bg-background-evil";
  } else {
    return "bg-background-neutral";
  }
};

function deleteThisCharacter() {
  if (!hasBeenClickedOnce.value) {
    hasBeenClickedOnce.value = true;
    deleteTimeout.value = setTimeout(() => {
      hasBeenClickedOnce.value = false;
    }, 1000);
    return;
  }
  if (p.index >= characters.value.length) {
    return;
  }
  hasBeenClickedOnce.value = false;
  if (deleteTimeout.value) {
    clearTimeout(deleteTimeout.value);
  }
  characters.value.splice(p.index, 1);
  if (currentCharacterIndex.value > -1) {
    currentCharacterIndex.value = characters.value.length - 1;
  }
}

function setBitPreview(bool: boolean) {
  if (!isTouchScreen.value && bool) {
    currentCharacterBitIndex.value = p.index;
  } else {
    currentCharacterBitIndex.value = -1;
  }
}
</script>

<style scoped>
.bit {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1em;
  cursor: pointer;
  @apply text-text-inverse shadow rounded;
}
.bit p {
  display: inline-block;
  font-size: 0.87em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100px;
  @apply text-text-inverse leading-tight m-0 p-0;
}
.name {
  font-family: MrsEavesSmallCaps;
  @apply text-text-inverse;
}
.name-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
