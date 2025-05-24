<template>
  <HomeTerms />
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("home.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("home.pageTitle")} - Monstershuffler.com`,
});
</script>

<style scoped></style>
