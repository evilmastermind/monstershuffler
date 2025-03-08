<template>
  <StatBlockActionType
    v-if="titled && statistics?.traits?.length"
    type="traits"
  />
  <MonsterDescription
    v-for="(action, index) in statistics?.traits"
    :key="index"
    class="action"
    :parts="action.array"
    :name="action.nameArray"
    period
  />
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const p = defineProps({
  titled: {
    type: Boolean,
    default: false,
  },
});

const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
