<template>
  <component
    :is="getLineType(line.text)"
    v-for="(line, index) in lines"
    :key="index"
    @input="handleInput"
    @keydown.enter="handleInput"
  >
    {{ line.text }}
  </component>
</template>

<script setup lang="ts">
const p = defineProps({
  fragment: {
    type: String,
    required: true,
  },
});

function getLineType(line: string) {
  if (line.startsWith("#")) {
    // count how many # there are
    // if there are more than 6, return "p"
    const count = line.match(/#/g)?.length;
    if (count && count <= 6) {
      return "h" + count;
    }
    return "p";
  }
  return "p";
}
</script>

<style scoped></style>
