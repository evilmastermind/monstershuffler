<template>
  <li class="todo"><MSCheckbox v-model="isChecked" :label disabled /></li>
</template>

<script setup lang="ts">
const p = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
});

const isChecked = ref(p.checked);
</script>

<style scoped>
.todo {
  max-width: 100%;
}
</style>
