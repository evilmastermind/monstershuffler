<template>
  <AuthVerify />
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("verification.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("verification.pageTitle")} - Monstershuffler.com`,
});
</script>

<style scoped></style>
