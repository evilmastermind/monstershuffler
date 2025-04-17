<template>
  <div>
    <NavbarPadding />
    <div class="background" />
    <div class="lg-max">
      <div v-if="isAlertOpen" class="mt-4 mx-4">
        <MSAlert
          inline
          type="info"
          title="DM Screen"
          persistent
          @close="isAlertOpen = false"
        >
          This is a mockup of the DM Screen's design, currently only optimized
          for desktop. Hover over or click on any feature below to see a tooltip
          explaining its purpose.
        </MSAlert>
      </div>
    </div>
    <div class="overflow-x-auto">
      <div class="min-w-[1000px]">
        <EditorPageBar class="mt-4" />
        <EditorPageTabs class="mt-4" />
        <EditorPageGameSessionExample class="pt-4" />
      </div>
    </div>
    <div>
      <PresentationFooter />
    </div>
    <MSFixedTools>
      <DiceHistory />
      <MSTour
        placement="top"
        title="Music Player"
        description="Playlists and music, automatically retrieved from your open notes, or manually added."
      >
        <EditorPageMusicPlayer class="z-" />
      </MSTour>
    </MSFixedTools>
  </div>
</template>

<script setup lang="ts">
const isAlertOpen = ref(true);
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    theme("colors.background.0") 0,
    theme("colors.background.100") 10em
  );
  z-index: -2;
}
</style>
