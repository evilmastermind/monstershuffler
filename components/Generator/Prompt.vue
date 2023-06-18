<template>
  <div>
    <input
      v-model="prompt"
      type="text"
      class="ms-input max-w-3xl w-full mb-4"
      :placeholder="t('generator.prompt.placeholder')"
    />
  </div>
</template>

<script setup>
const { t } = useI18n();

const prompt = ref("");
</script>

<style lang="scss" scoped></style>
