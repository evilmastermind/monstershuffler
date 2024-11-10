<template>
  <div class="intro">
    <div class="intro-text text-center">
      <Transition name="title" appear>
        <h1 class="static custom-title gradient-title">The NPC Improvisator</h1>
      </Transition>
      <p class="static max-width mt-6">
        Create unforgettable NPCs with unique personalities and appearances.
      </p>
      <p class="static max-width mt-1">
        Effortlessly improvise NPCs on the fly, or be inspired by AI-generated
        adventures to add new side quests in your campaign.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const boolean = ref(false);
</script>

<style scoped>
.intro {
  position: relative;
  display: grid;
  place-items: center;
}
.intro-text {
  position: relative;
  z-index: 1;
}
</style>
