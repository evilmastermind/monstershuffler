<template>
  <div class="header">
    <div class="header__name" :class="moral">
      {{ statistics?.fullName || "Creature Name" }}
    </div>
    <div v-if="statistics?.meta?.string" class="header__meta pt-1">
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
