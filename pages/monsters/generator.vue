<template>
  <GeneratorPage />
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: `${t("generator.pageTitle")} - Monstershuffler.com`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("generator.pageDescription"),
    },
  ],
});
</script>

<style scoped></style>
