<template>
  <div class="w-full">
    <div class="header__name border-b-2 pb-1" :class="moral">
      {{ statistics?.fullName || "Creature Name" }}
    </div>
    <div v-if="statistics?.meta?.string" class="italic text-text-2 pt-1">
      {{ statistics.meta.string }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Statistics;
const moral = inject("moral") as string;
</script>

<style scoped>
.header__name {
  font-weight: 800;
  font-size: 34px;
  font-variant: small-caps;
  line-height: 0.8em;
  letter-spacing: 1px;
}
</style>
