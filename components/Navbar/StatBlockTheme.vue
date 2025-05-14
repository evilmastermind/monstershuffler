<template>
  <ClientOnly>
    <div class="grid grid-cols-2 gap-1">
      <UButton
        color="neutral"
        size="sm"
        :variant="user.settings.statBlocks === '5e' ? 'soft' : 'outline'"
        @click="user.settings.statBlocks = '5e'"
      >
        {{ 2014 }}
      </UButton>
      <UButton
        color="neutral"
        size="sm"
        :variant="user.settings.statBlocks === '5.5e' ? 'soft' : 'outline'"
        @click="user.settings.statBlocks = '5.5e'"
      >
        {{ 2024 }}
      </UButton>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const user = useUserStore();
</script>

<style scoped></style>
