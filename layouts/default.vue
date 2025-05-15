<template>
  <div>
    <div class="min-h-svh">
      <Navigation />
      <main>
        <slot />
      </main>
    </div>
    <MSFooter class="mt-12" />
  </div>
</template>

<script setup lang="ts">
const user = useUserStore();
user.getGeneralSettings();
</script>

<style scoped></style>
