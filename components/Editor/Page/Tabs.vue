<template>
  <div class="lg-max">
    <div class="flex mx-4">
      <MSTour
        placement="bottom"
        title="Tabs"
        description="Open Notes and Note Groups will be added to a tab list or displayed as a pop-up, depending on the context or your preference."
      >
        <div class="flex">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            :class="tab.selected ? 'tab-selected' : 'tab-unselected'"
          >
            {{ tab.name }}
          </div>
        </div>
      </MSTour>
      <div class="grow border-b border-b-background-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { name: "Game Session Example", selected: true },
  { name: "Trouble at the Market", selected: false },
  { name: "5.5e Grappling rules", selected: false },
  { name: "Spell: Dominate Monster", selected: false },
];
</script>

<style scoped>
.tab {
  letter-spacing: 0.05em;
  @apply cursor-pointer text-sm min-w-[200px] px-4 py-1;
}
.tab-selected {
  background: linear-gradient(
    to bottom,
    theme("colors.background.200"),
    transparent
  );
  @apply text-text-1 border-t border-t-background-400 rounded-t border-l border-l-background-400 border-r border-r-background-400;
}
.tab-unselected {
  @apply text-text-3 border-b border-b-background-400;
}
</style>
