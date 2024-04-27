<template>
  <MSModal width="800" @close="emit('close')">
    <template #title>{{ $t("editor.layout.title") }}</template>
    <h4 class="content mt-4">{{ $t("editor.layout.dynamic") }}</h4>
    <p class="subtitle">{{ $t("editor.layout.dynamicSubtitle") }}.</p>
    <div class="layout-group mt-4">
      <button class="layout" @click="chooseLayout('DynamicA')">
        <MonsterLayoutExample1ColumnA class="example" />
        <MonsterLayoutExample2ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, description and stat block automatically
          rearranged when the stat block becomes too big.
        </span>
      </button>
    </div>
    <h4 class="content mt-4">{{ $t("editor.layout.1Column") }}</h4>
    <div class="layout-group mt-4">
      <button class="layout" @click="chooseLayout('OneColumnA')">
        <MonsterLayoutExample1ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, description on the bottom left, stat block on
          the bottom right.
        </span>
      </button>
      <button class="layout" @click="chooseLayout('OneColumnB')">
        <MonsterLayoutExample1ColumnB class="example" />
        <span class="sr-only">
          Monster's image on top, stat block on the bottom left, description on
          the bottom right.
        </span>
      </button>
      <button class="layout" @click="chooseLayout('OneColumnC')">
        <MonsterLayoutExample1ColumnD class="example" />
        <span class="sr-only">
          Monster's image on top left, description on bottom left, stat block on
          the the right side.
        </span>
      </button>
      <button class="layout" @click="chooseLayout('OneColumnD')">
        <MonsterLayoutExample1ColumnC class="example" />
        <span class="sr-only">
          Monster's image on the right side, description on the top left, stat
          block on the bottom left.
        </span>
      </button>
    </div>
    <h4 class="content mt-4">{{ $t("editor.layout.2Column") }}</h4>
    <div class="layout-group mt-4">
      <button class="layout" @click="chooseLayout('TwoColumnA')">
        <MonsterLayoutExample2ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, stat block on bottom and the description in
          between.
        </span>
      </button>
      <button class="layout" @click="chooseLayout('TwoColumnB')">
        <MonsterLayoutExample2ColumnB class="example" />
        <span class="sr-only">
          Monster's image on top, description on bottom and the stat block in
          between.
        </span>
      </button>
      <button class="layout" @click="chooseLayout('TwoColumnC')">
        <MonsterLayoutExample2ColumnC class="example" />
        <span class="sr-only">
          Monster's image on the top left corner, description on the top side
          corner and the stat block is just below them.
        </span>
      </button>
    </div>
  </MSModal>
</template>

<script setup lang="ts">
import type { Character } from "@/types";
const emit = defineEmits(["close"]);
const character = inject("character") as Ref<Character>;

function chooseLayout(layout: string) {
  const c = character.value.character;
  if (!c.user) {
    c.user = {
      sheet: {
        images: [],
        layout,
      },
    };
  } else if (!c.user.sheet) {
    c.user.sheet = {
      images: [],
      layout,
    };
  } else {
    c.user.sheet.layout = layout;
  }
  emit("close");
}
</script>

<style scoped>
.example {
  width: 90px;
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
  transition: background-color 0.05s;
  @apply bg-background-evil outline-2;
}
</style>
