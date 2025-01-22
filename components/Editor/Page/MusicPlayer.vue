<template>
  <Teleport to="body">
    <div class="choices">
      <div
        v-for="adventurer in adventurers"
        :key="adventurer.name"
        class="track choice"
      >
        <img
          :src="`images/presentation/${adventurer.image}`"
          :alt="`${adventurer.name}'s music'`"
        />
      </div>
      <div class="track choice">
        <Icon name="mingcute:stop-fill" />
      </div>
      <div class="options choice">
        <Icon name="solar:playlist-bold" />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const adventurers = [
  {
    name: "Kalo",
    image: "kalo.webp",
  },
  {
    name: "Nyx",
    image: "nyx.webp",
  },
  {
    name: "Arkantos",
    image: "arkantos.webp",
  },
  {
    name: "Loretta",
    image: "loretta.webp",
  },
  {
    name: "Chrond",
    image: "chrond.webp",
  },
];
</script>

<style scoped>
.choices {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  @apply px-1 pb-2 gap-1;
}
.choice {
  display: grid;
  place-items: center;
  font-size: 1.3rem;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  @apply bg-inset-300 border border-inset-500 text-text-evil shadow-lg;
}
.track {
  @apply rounded-sm;
}
.options {
  border-radius: 50%;
}
</style>
