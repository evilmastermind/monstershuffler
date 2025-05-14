<template>
  <div>
    <div
      :class="[
        moral,
        'font-[MrsEavesSmallCaps] font-bold text-[34px] leading-[0.8em] tracking-[1px]',
      ]"
    >
      {{ statistics?.fullName || "Creature Name" }}
    </div>
    <div v-if="statistics?.meta?.string" class="italic pt-1">
      {{ statistics.meta.string }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Statistics;
const moral = inject("moral") as string;
</script>
