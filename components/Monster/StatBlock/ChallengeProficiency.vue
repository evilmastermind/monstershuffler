<template>
  <div class="flex">
    <MonsterStatBlockStat class="mr-2">
      <template #title>
        {{ $t("statBlock.challenge") }}
      </template>
      <template #default>
        <button
          class="triangleleft hide-from-exports"
          :aria-label="$t('statBlock.lowerCR')"
          @click="callLowerCR"
        />
        <span class="cr">{{ statistics.CR.string }}</span>
        <button
          class="triangleright hide-from-exports"
          :aria-label="$t('statBlock.raiseCR')"
          @click="callRaiseCR"
        />
        ({{ statistics.XP }} {{ $t("statBlock.xp") }})
      </template>
    </MonsterStatBlockStat>
    <MonsterStatBlockStat>
      <template #title> {{ $t("statBlock.proficiencyBonus") }} </template>
      <template #default> {{ addPlusSign(statistics.proficiency) }} </template>
    </MonsterStatBlockStat>
  </div>
</template>

<script setup lang="ts">
import { lowerCR, raiseCR, addPlusSign } from "monstershuffler-shared";
import type { GeneratorCharacter, Character, Statistics } from "@/types";

const character = inject("character") as Ref<Character>;
const statistics = inject("statistics") as Ref<Statistics>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

function callRaiseCR() {
  raiseCR(character.value);
  wrapper.value.key++;
}

function callLowerCR() {
  lowerCR(character.value);
  wrapper.value.key++;
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
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
  text-align: center;
}
.cr-buttons {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
