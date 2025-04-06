<template>
  <div>
    <StatBlockStat class="mr-2">
      <template #title>
        {{ $t("statBlock.cr") }}
      </template>
      <template #default>
        <StatBlockCR />
        ({{ $t("statBlock.xp") }} {{ statistics.XP }}; {{ $t("statBlock.pb") }}
        {{ addPlusSign(statistics.proficiency) }})
      </template>
    </StatBlockStat>
  </div>
</template>

<script setup lang="ts">
import { addPlusSign } from "monstershuffler-shared";
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Ref<Statistics>;
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
