<template>
  <div class="header">
    <div class="header__name" :class="moral">
      {{ character?.statistics?.fullName || "Creature Name" }}
    </div>
    <div class="header__meta pt-1">
      {{ character?.statistics?.surname || "Creature Name" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Character } from "@/types/objects";

const p = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
  moral: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.header__name {
  font-weight: 700;
  font-size: 34px;
  font-family: MrsEavesSmallCaps, Roboto, Helvetica, sans-serif;
  line-height: 0.8em;
  letter-spacing: 1px;
}
.header__meta {
  font-style: italic;
}
</style>
