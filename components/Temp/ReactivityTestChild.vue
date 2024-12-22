<template>
  <span class="mx-2 text-red-600">{{ bigObject.nested.key }}</span>
</template>

<script setup lang="ts">
const p = defineProps<{
  bigObject: {
    i: number;
    nested: {
      key: string;
    };
  };
}>();

const key = ref(p.bigObject.nested.key);

watch(
  () => p.bigObject.i,
  () => {
    key.value = p.bigObject.nested.key;
  },
  { immediate: true }
);
</script>

<style scoped></style>
