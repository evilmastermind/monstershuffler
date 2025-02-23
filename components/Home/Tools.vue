<template>
  <div class="tools">
    <a class="tool" href="#notes">
      <ThumbnailNote />
      <span class="tool-title">Notes</span>
    </a>
    <a class="tool" href="#note-groups">
      <ThumbnailNoteGroup />
      <span class="tool-title">Note Groups</span>
    </a>
    <a class="tool" href="#stat-blocks">
      <ThumbnailStatBlock />
      <span class="tool-title">Stat Blocks</span>
    </a>
    <a class="tool" href="#combat-manager">
      <ThumbnailCombatManager />
      <span class="tool-title">Combat Manager</span>
    </a>
    <a class="tool" href="#text-generators">
      <ThumbnailRandomText />
      <span class="tool-title">Text Generators</span>
    </a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tools {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @apply gap-y-7 gap-x-4;
}
@media (min-width: theme("screens.md")) {
  .tools {
    @apply gap-7;
  }
}
.tool {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 150px;
  flex-shrink: 0;
  perspective: 300px;
  @apply gap-3;
}
.tool-title {
  font-family: "LibreBaskerville", sans-serif;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
}
</style>
