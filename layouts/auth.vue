<template>
  <div class="relative min-h-screen">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-no-repeat bg-center bg-cover -z-10"
      :class="{
        'bg-[url(@/assets/images/backgrounds/login-3-dark.jpg)]': true,
        'bg-[position:66%_center]': true,
      }"
    />
    <MSTestWarning />

    <!-- Card container -->
    <div class="bg-muted-10 min-h-screen grid place-items-center sm:p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defaultDescription } from "@/utils";
const { locale } = useI18n();

useSeoMeta({
  description: defaultDescription,
});
</script>
