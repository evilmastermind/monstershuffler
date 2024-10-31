<template>
  <div class="intro">
    <div class="intro-text text-center">
      <Transition name="title" appear>
        <h1 class="static">
          <span class="custom-title-small">the</span
          ><span class="custom-title gradient-title npc"
            ><span class="n">N</span>PC</span
          >
          <span class="custom-title-small ml-2">(& adventure)</span>
        </h1>
      </Transition>
      <Transition name="title" appear>
        <h1 class="static" :style="{ transitionDelay: '50ms' }">
          <span class="custom-title gradient-title generator"
            >Gen<span class="e">e</span>rator</span
          >
        </h1>
      </Transition>
      <p class="static max-width mt-7">
        Create unforgettable NPCs with unique personalities and appearances.
      </p>
      <p class="static max-width mt-2">
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
