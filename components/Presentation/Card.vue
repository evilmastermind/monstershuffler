<template>
  <li class="card">
    <Icon aria-hidden class="card-icon" :name="icon" />
    <div>
      <h3 v-if="$slots.title" class="static">
        <slot name="title" />
      </h3>
      <div v-if="$slots.default" class="card-text">
        <slot />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const p = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.card {
  min-height: 100%;
  border-radius: theme("spacing.1");
  background-color: theme("colors.background.200");
  border-top: 1px solid theme("colors.background.500");
  border-left: 1px solid theme("colors.background.500");
  border-right: 1px solid theme("colors.background.500");
  border-bottom: 1px solid theme("colors.background.400");
  color: theme("colors.text");
  transition: outline 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
  max-width: 600px;
  gap: 20%;
  @apply bg-background-100 p-6 rounded-lg outline-transparent shadow-sm;
}

.card-icon {
  min-width: 2.5rem;
  max-width: 2.5rem;
  font-size: 2.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
  @apply text-evil-700;
}
.card:hover .card-icon {
  transform: scale(1.1);
  @apply text-evil-500;
}
.card ul {
  list-style-type: disc;
  font-size: inherit;
  padding-left: 1rem;
  letter-spacing: 0.05em;
  @apply text-sm;
}
.card ul li {
  @apply mt-1;
}
.card ul li::marker {
  @apply text-evil-700;
}
</style>
