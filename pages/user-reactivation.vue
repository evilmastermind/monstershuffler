<template>
  <AuthReactivate />
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("reactivation.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("reactivation.pageTitle")} - Monstershuffler.com`,
});
</script>

<style scoped></style>
