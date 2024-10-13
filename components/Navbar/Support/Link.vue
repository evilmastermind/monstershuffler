<template>
  <div class="link-support-container p-1">
    <a :href="link" class="content link-support" :title="name">
      <Icon :name="icon" class="link-support-icon" aria-hidden />
      <span class="sr-only">{{ name }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.link-support-container {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  height: theme("spacing.4");
  width: theme("spacing.6");
  cursor: pointer;
}
.link-support-icon {
  font-size: theme("spacing.4");
  @apply text-text-2;
}
.link-support-icon:hover {
  color: theme("colors.primary.700");
}
</style>
