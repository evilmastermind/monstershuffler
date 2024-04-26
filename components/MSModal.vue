<template>
  <Teleport to="body">
    <dialog class="modal" open>
      <div class="card" :style="{ maxWidth: `${p.width}px` }">
        <MSIconButton
          class="close ml-1 text-text-secondary"
          :label="$t('closeLabel')"
          icon="fa6-solid:xmark"
          @click="emit('close')"
        />
        <h3 class="content">
          <slot name="title" />
        </h3>
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const p = defineProps({
  width: {
    type: String,
    default: "400",
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.card {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  @apply shadow-xl p-4 sm:p-5 bg-background-100;
}
@media (min-width: theme("screens.sm")) {
  .modal {
    @apply p-4;
  }
  .card {
    height: auto;
    margin: 10vh auto;
    backdrop-filter: blur(4px);
    @apply shadow-xl rounded p-4 sm:p-5 bg-background-100;
  }
}
.close {
  float: right;
}
</style>
