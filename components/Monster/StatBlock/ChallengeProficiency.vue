<template>
  <div class="flex">
    <MonsterStatBlockStat class="mr-2">
      <template #title>
        {{ $t("statBlock.challenge") }}
      </template>
      <template #default>
        <button
          class="triangleleft"
          :aria-label="$t('statBlock.lowerCR')"
          @click="lowerCR(character)"
        />
        <span class="cr">{{ statistics.CR.string }}</span>
        <button
          class="triangleright"
          :aria-label="$t('statBlock.raiseCR')"
          @click="raiseCR(character)"
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
import type { Character, Statistics } from "@/types";

const character = inject("character") as Character;
const statistics = inject("statistics") as ComputedRef<Statistics>;
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
