<template>
  <div>
    <Transition name="fade" appear mode="out-in">
      <div
        class="relative h-full flex flex-col leading-none cursor-pointer text-inverted shadow rounded select-none"
        :class="[moral()]"
        :style="{
          transitionDelay: `${0.02 * index}s`,
          transitionProperty: 'opacity, transform',
        }"
        @touchstart="isTouchScreen = true"
        @mouseenter="setBitPreview(true)"
        @mouseleave="setBitPreview(false)"
      >
        <div class="relative w-full flex justify-between items-center">
          <p
            class="inline-block text-inverted leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] text-[0.87em] m-0 p-1 font-[MrsEavesSmallCaps]"
          >
            {{ character?.character?.name }}
          </p>
          <UTooltip :text="$t('clickTwiceToDelete')">
            <UButton
              class="relative text-inverted z-10 ml-1"
              :class="hasBeenClickedOnce ? 'rainbow' : ''"
              :aria-label="$t('clickTwiceToDelete')"
              size="sm"
              variant="ghost"
              icon="i-xxx-close"
              @click.stop="deleteThisCharacter()"
              @mousedown.stop
            />
          </UTooltip>
        </div>
        <p
          class="content inline-block text-text-inverse leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] text-[0.87em] m-0 px-1"
        >
          {{ race() }}
        </p>
        <p
          class="content inline-block text-text-inverse leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px] text-[0.87em] px-1 pb-1"
        >
          {{ profession() }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentCharacterBitIndex } =
  storeToRefs(generator);

const e = defineEmits(["deleted"]);
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
    return "bg-al-good";
  } else if (alignment.includes("Evil")) {
    return "bg-al-evil";
  } else {
    return "bg-al-neutral";
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
  e("deleted");
}

function setBitPreview(bool: boolean) {
  if (!isTouchScreen.value && bool) {
    currentCharacterBitIndex.value = p.index;
  } else {
    currentCharacterBitIndex.value = -1;
  }
}
</script>
