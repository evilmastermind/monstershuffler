<template>
  <MSModal width="800" @close="emit('close')">
    <template #title>{{ $t("editor.layout.title") }}</template>
    <h4 class="content mt-4">{{ $t("editor.layout.dynamic") }}</h4>
    <p class="subtitle">{{ $t("editor.layout.dynamicSubtitle") }}.</p>
    <div class="layout-group mt-4">
      <div class="layout">
        <MonsterLayoutExampleDynamic1 class="example" />
        <MonsterLayoutExampleDynamic2 class="example" />
      </div>
    </div>
  </MSModal>
</template>

<script setup lang="ts">
import type { Character } from "@/types";
const emit = defineEmits(["close"]);
const character = inject("character") as Ref<Character>;
</script>

<style scoped>
.example {
  width: 100px;
}
.layout-group {
  display: flex;
  flex-wrap: wrap;
  @apply gap-4;
}
.layout {
  display: flex;
  cursor: pointer;
  @apply gap-2 p-2 rounded-xl bg-text-inverse shadow;
}
.layout:hover {
  @apply outline-background-evil outline-2;
}
</style>
