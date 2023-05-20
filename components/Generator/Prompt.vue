<template>
  <div>
    <input
      v-model="prompt"
      type="text"
      class="ms-input w-100 mb-4"
      :placeholder="t('generator.prompt.placeholder')"
    />
  </div>
</template>

<script setup>
const { t } = useI18n();

const prompt = ref("");
</script>

<style lang="scss" scoped></style>
