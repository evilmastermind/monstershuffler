<template>
  <Teleport to="body">
    <Transition name="fade-swift" appear>
      <dialog class="modal" open @click="emit('close')">
        <div class="card" :style="{ maxWidth: `${p.width}px` }" @click.stop>
          <MSIconButton
            class="close ml-1 text-text-2"
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
    </Transition>
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
  @apply text-text bg-background-100;
}
.card {
  position: relative;
  backdrop-filter: blur(4px);
  @apply p-4 sm:p-5 bg-background-100;
}
@media (min-width: theme("screens.sm")) {
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    @apply p-4;
  }
  .card {
    height: auto;
    margin: 0.5rem auto;
    backdrop-filter: blur(4px);
    @apply shadow-xl rounded p-4 sm:p-5 bg-background-100;
  }
}
.close {
  float: right;
}
</style>
