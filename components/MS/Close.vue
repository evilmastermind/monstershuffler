<template>
  <UTooltip :text="$t('closeLabel')">
    <UButton
      class="absolute top-0 right-0 p-2 cursor-pointer"
      variant="ghost"
      color="neutral"
      :aria-label="$t('closeLabel')"
      icon="i-xxx-close"
    />
  </UTooltip>
</template>

<script setup lang="ts"></script>
