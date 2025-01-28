<template>
  <div class="choices">
    <div
      v-for="adventurer in adventurers"
      :key="adventurer.name"
      class="track choice"
      :class="{ selected: adventurer.name === 'Nyx' }"
    >
      <Icon
        v-if="adventurer.name === 'Nyx'"
        name="heroicons:speaker-wave-16-solid"
        class="playing"
      />
      <img
        :src="`images/presentation/${adventurer.image}`"
        :alt="`${adventurer.name}'s music'`"
        class="image"
      />
    </div>
    <!-- <div class="track choice">
      <Icon name="mingcute:stop-fill" />
    </div> -->
    <div class="options choice">
      <Icon name="solar:playlist-bold" />
    </div>
  </div>
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
    name: "Music 1",
    image: "music-1.webp",
  },
  {
    name: "Music 2",
    image: "music-2.webp",
  },
];
</script>

<style scoped>
.choices {
  display: flex;
  flex-direction: row;
  justify-content: center;
  @apply gap-1;
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
  position: relative;
  @apply rounded-sm;
}
.image {
  width: auto;
  height: 100%;
  object-fit: cover;
}
.playing {
  position: absolute;
  width: 100%;
  right: 0;
  @apply text-evil-300;
}
.options {
  border-radius: 50%;
}
.selected {
  border: none;
  outline: 3px solid theme("colors.text-evil");
}
</style>
