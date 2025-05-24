<template>
  <AuthLogin />
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("login.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("login.pageTitle")} - Monstershuffler.com`,
});
</script>

<style scoped></style>
