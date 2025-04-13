<template>
  <DMScreenPage />
</template>

<script setup lang="ts">
const { t } = useI18n();
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("dmScreen.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("dmScreen.pageTitle")} - Monstershuffler.com`,
  description: t("dmScreen.pageDescription"),
  ogDescription: t("dmScreen.pageDescription"),
});
</script>

<style scoped></style>
