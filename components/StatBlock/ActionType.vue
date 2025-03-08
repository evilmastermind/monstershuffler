<template>
  <h3 class="action__type mt-4 mb-2" :class="moral">
    {{ $t(`statBlock.${type}`) }}
  </h3>
</template>

<script setup lang="ts">
const moral = inject("moral") as string;
const p = defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.action__type {
  line-height: 1em;
  border-bottom: 1px solid;
  font-size: 24px;
  font-weight: 500;
  font-variant: small-caps;
  letter-spacing: 0.02em;
}
</style>
