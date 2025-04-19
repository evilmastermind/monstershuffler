<template>
  <span>
    <button
      class="triangleleft hide-from-exports"
      :aria-label="$t('statBlock.lowerCR')"
      @click="callLowerCR"
    />
    <!-- <span class="cr" ref="refCR">{{ statistics.CR.string }}</span> -->
    <label>
      <span class="sr-only">{{ $t("statBlock.setCR") }}</span>
      <input
        ref="refCR"
        v-model="CR"
        type="text"
        class="cr"
        :v-tooltip="$t('statBlock.setCR')"
        @click="select"
        @keydown.enter="callSetCR"
        @blur="callSetCR"
      />
    </label>
    <button
      class="triangleright hide-from-exports"
      :aria-label="$t('statBlock.raiseCR')"
      @click="callRaiseCR"
    />
  </span>
</template>

<script setup lang="ts">
import { lowerCR, raiseCR, setCR, addPlusSign } from "monstershuffler-shared";
import type { GeneratorCharacter, Character, Statistics } from "@/types";

const screen = useScreen();

const character = inject("character") as Ref<Character>;
const statistics = inject("statistics") as Ref<Statistics>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;
const didLayoutShift = inject("didLayoutShift") as Ref<boolean>;

const refCR = ref<HTMLElement | null>(null);
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

<style scoped>
.triangleleft {
  display: inline;
  width: 0;
  height: 0;
  border-right: 10px solid theme("colors.danger");
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  margin: 0 5px 0 5px;
  transform: translateY(-0.3em);
}
.triangleright {
  display: inline;
  width: 0;
  height: 0;
  border-left: 10px solid theme("colors.danger");
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  margin: 0 5px 0 5px;
  transform: translateY(-0.3em);
}
.cr {
  display: inline-block;
  min-width: 1.5em;
  width: 1.5em;
  text-align: center;
  background-color: transparent;
  border: none;
}
.cr-buttons {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
