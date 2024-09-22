<template>
  <HomeHero />
</template>

<script setup>
const { t } = useI18n();
useHead({
  title: `${t("home.pageTitle")} - Monstershuffler.com`,
  meta: [...defaultHead, ...defaultDescription],
});
</script>

<style scoped></style>
