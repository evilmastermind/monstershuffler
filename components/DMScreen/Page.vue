<template>
  <div>
    <NavbarPadding />
    <div class="background" />
    <EditorPageBar class="mt-2" />
    <EditorPageGameSessionExample />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  @apply bg-background-100;
}
</style>
