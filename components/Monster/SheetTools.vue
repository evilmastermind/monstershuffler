<template>
  <div class="tools-container my-2">
    <div class="tools py-2 px-3">
      <MSIconButton
        :label="$t('monsterSheet.editLayout')"
        icon="ri:layout-6-fill"
      />
      <MSIconButton
        :label="$t('monsterSheet.editBackstory')"
        icon="humbleicons:align-text-left"
      />
      <MSIconButton
        :label="$t('monsterSheet.editImages')"
        icon="fa6-solid:image"
      />
      <MSIconButton
        class="ml-2"
        :label="$t('monsterSheet.editImages')"
        icon="fa6-solid:xmark"
        @click="currentCharacterIndex = -1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { currentCharacterIndex } = storeToRefs(generator);
</script>

<style scoped>
.tools-container {
  display: flex;
  justify-content: flex-end;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1rem;
  line-height: 1rem;
  @apply bg-background-evil text-text-inverse gap-4;
}
</style>
