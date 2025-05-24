<template>
  <AuthReset />
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("sResetPasswordBody.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("sResetPasswordBody.pageTitle")} - Monstershuffler.com`,
});
</script>

<style scoped></style>
