<template>
  <dialog class="modal" open>
    <slot />
  </dialog>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: transparent;
}
</style>
