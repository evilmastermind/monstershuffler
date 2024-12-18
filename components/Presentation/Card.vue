<template>
  <li class="ms-input-style card">
    <Icon aria-hidden class="card-icon" :name="icon" />
    <div>
      <h3 v-if="$slots.title" class="static">
        <slot name="title" />
      </h3>
      <div v-if="$slots.default" class="card-text mt-1">
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
  transition: outline 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;
  max-width: 600px;
  gap: 20%;
  @apply p-6 rounded outline-transparent shadow-sm;
}

.card-icon {
  min-width: 2.5rem;
  max-width: 2.5rem;
  font-size: 2.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
  @apply text-background-evil;
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
