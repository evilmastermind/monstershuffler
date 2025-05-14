<template>
  <div id="character-page-scroll" class="min-h-[100svh]">
    <div
      v-if="currentCharacterIndex > -1"
      :key="characters[currentCharacterIndex].id"
    >
      <Transition name="fade-quick" appear>
        <LazyMonsterSheetToolBar
          :generator-character="
            characters[currentCharacterIndex] as GeneratorCharacter
          "
          class="mt-5 sm:mt-0 px-0"
        />
      </Transition>
      <Transition name="fade-quick" appear>
        <div
          v-show="isLoaded"
          ref="sheet"
          class="overflow-hidden border border-accented bg-block-50 sm:rounded-lg mt-0 sm:mt-2"
        >
          <LazyMonsterSheet
            :key="currentCharacterIndex"
            :generator-character="
              characters[currentCharacterIndex] as GeneratorCharacter
            "
            @close="close"
            @loaded="setIsLoaded"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GeneratorCharacter } from "@/types";

const e = defineEmits(["loading", "loaded"]);

const generator = useGeneratorStore();
const { characters, currentCharacterIndex, currentSheetHTMLElement } =
  storeToRefs(generator);

const sheet = ref<HTMLElement | null>(null);
const isLoaded = ref(false);

function close() {
  generator.unsetCharacter();
}

function setIsLoaded() {
  isLoaded.value = true;
  e("loaded");
}

onBeforeMount(() => {
  isLoaded.value = false;
  e("loading");
});

onMounted(() => {
  if (sheet.value) {
    currentSheetHTMLElement.value = sheet.value;
    const element = document.querySelector("#character-page-scroll");
    scrollIntoView(element, {
      behavior: "auto",
      block: "start",
      scrollIfInView: false,
    });
  }
});
</script>
