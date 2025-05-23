<template>
  <div class="relative w-full h-screen">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-no-repeat bg-center bg-cover -z-10"
      :class="{
        'bg-[url(@/assets/images/backgrounds/login.webp)]': true,
        'bg-[position:66%_center]': true,
      }"
    />

    <!-- Card container -->
    <div class="w-screen h-screen grid place-items-center">
      <UCard>
        class="w-screen h-screen sm:w-auto sm:max-w-[450px] sm:h-auto">
        <slot />
      </UCard>
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
