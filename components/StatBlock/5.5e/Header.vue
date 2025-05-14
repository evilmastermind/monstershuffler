<template>
  <div class="w-full">
    <div
      :class="[
        moral,
        'font-extrabold text-[34px] leading-[0.8em] tracking-[1px] border-b-2 pb-1 [font-variant:small-caps]',
      ]"
    >
      {{ statistics?.fullName || "Creature Name" }}
    </div>
    <div v-if="statistics?.meta?.string" class="italic text-muted pt-1">
      {{ statistics.meta.string }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as Statistics;
const moral = inject("moral") as string;
</script>
