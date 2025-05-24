<template>
  <div class="relative min-w-screen w-full min-h-screen h-full">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-no-repeat bg-center bg-cover -z-10"
      :class="{
        'bg-[url(@/assets/images/backgrounds/login.webp)]': true,
        'bg-[position:66%_center]': true,
      }"
    />

    <!-- Card container -->
    <div
      class="min-w-screen w-full min-h-screen h-full grid place-items-center sm:p-4"
    >
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
