<template>
  <h3
    :class="[
      moral,
      'mt-4 mb-2 leading-none border-b border-solid text-2xl font-medium [font-variant:small-caps] tracking-[0.02em]',
    ]"
  >
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
