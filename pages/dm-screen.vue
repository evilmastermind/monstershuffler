<template>
  <DMScreenPage />
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: `${t("dmScreen.pageTitle")} - Monstershuffler.com`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("dmScreen.pageDescription"),
    },
  ],
});
</script>

<style scoped></style>
