<template>
  <GeneratorPage />
</template>

<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("generator.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("generator.pageTitle")} - Monstershuffler.com`,
  description: t("generator.pageDescription"),
  ogDescription: t("generator.pageDescription"),
});
</script>

<style scoped></style>
