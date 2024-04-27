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
            :label="$t('closeLabel')"
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
const { characters, currentCharacterIndex, currentCharacterFromBitsPreview } =
  storeToRefs(generator);

const p = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const hasBeenClickedOnce = ref(false);
const isTouchScreen = ref(false);
const deleteTimeout: Ref<NodeJS.Timeout | null> = ref(null);

const race = () => {
  let info = "";
  if (p.character?.character?.racevariant?.name) {
    info += p.character.character.racevariant.name;
  } else if (p.character?.character?.race?.name) {
    info += p.character.character.race.name;
  }
  return info;
};
const profession = () => {
  let info = "";
  if (p.character?.character?.class?.name) {
    info += ` ${p.character.character.class.name}`;
  }
  if (p.character?.character?.background?.name) {
    info += ` ${p.character.character.background.name}`;
  }
  return info;
};

const moral = () => {
  const alignment = p.character?.statistics?.alignment?.string || "";
  if (alignment.includes("Good")) {
    return "bg-good-800";
  } else if (alignment.includes("Evil")) {
    return "bg-evil-800";
  } else {
    return "bg-neutral-800";
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
    currentCharacterFromBitsPreview.value = p.character;
  } else {
    currentCharacterFromBitsPreview.value = undefined;
  }
}
</script>

<style scoped lang="scss">
.bit {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 1em;
  cursor: pointer;
  @apply text-text-inverse rounded shadow-sm;
  p {
    display: inline-block;
    font-size: 0.87em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100px;
    @apply text-text-inverse leading-tight m-0 p-0;
  }
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
