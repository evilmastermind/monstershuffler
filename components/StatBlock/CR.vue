<template>
  <span>
    <button
      @click="callLowerCR"
      :aria-label="$t('statBlock.lowerCR')"
      class="inline cursor-pointer border-r-[10px] border-r-al-evil-700 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent mx-[5px] -translate-y-[0.3em] transform hide-from-exports"
    />
    <label>
      <span class="sr-only">{{ $t("statBlock.setCR") }}</span>
      <input
        ref="refCR"
        v-model="CR"
        type="text"
        class="inline-block min-w-[1.5em] w-[1.5em] text-center bg-transparent border-none focus:outline-none"
        :v-tooltip="$t('statBlock.setCR')"
        @click="select"
        @keydown.enter="callSetCR"
        @blur="callSetCR"
      />
    </label>
    <button
      @click="callRaiseCR"
      :aria-label="$t('statBlock.raiseCR')"
      class="inline cursor-pointer border-l-[10px] border-l-al-evil-700 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent mx-[5px] -translate-y-[0.3em] transform hide-from-exports"
    />
  </span>
</template>

<script setup lang="ts">
import { lowerCR, raiseCR, setCR } from "monstershuffler-shared";
import type { GeneratorCharacter, Character, Statistics } from "@/types";

const screen = useScreen();

const character = inject("character") as Ref<Character>;
const statistics = inject("statistics") as Ref<Statistics>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;
const didLayoutShift = inject("didLayoutShift") as Ref<boolean>;

const refCR = ref<HTMLInputElement | null>(null);
const CR = ref<string>(statistics.value.CR.string);

function callRaiseCR() {
  raiseCR(character.value);
  wrapper.value.key++;
}

function callLowerCR() {
  lowerCR(character.value);
  wrapper.value.key++;
}

function callSetCR() {
  setCR(character.value, CR.value);
  wrapper.value.key++;
}

function select(event: MouseEvent) {
  const target = event.target as HTMLInputElement;
  target.select();
}

onMounted(async () => {
  if (didLayoutShift.value && refCR.value && screen.smAndUp) {
    await wait(50);
    scrollIntoView(refCR.value, {
      behavior: "auto",
      block: "center",
      scrollIfInView: false,
    });
    didLayoutShift.value = false;
  }
});
</script>
