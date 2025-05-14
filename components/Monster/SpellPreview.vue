<template>
  <span>
    <Teleport v-if="spell" to="body">
      <div
        ref="card"
        class="absolute z-[9900] w-full max-w-[700px] top-[20%] font-[ScalaSansOffc] cursor-auto md:cursor-move"
      >
        <UCard>
          <MSIconButton
            class="absolute top-0 right-0 p-2 text-muted transition-colors duration-200 ease-in-out"
            :label="$t('closeLabel')"
            icon="fa6-solid:xmark"
            @click="emit('close')"
          />
          <h1
            class="text-xl font-semibold [font-variant:small-caps] mb-4"
            :class="moral"
          >
            {{ name }}
          </h1>

          <StatBlockStat v-if="spell.level !== undefined">
            <template #title>{{ $t("spell.level") }}</template>
            <template v-if="spell.level === '0'">
              {{ $t("spell.cantrip") }}
            </template>
            <template v-else>
              {{ spell.level }}{{ addOrdinal(spell.level, language) }}
            </template>
          </StatBlockStat>

          <StatBlockStat v-if="spell.school !== undefined">
            <template #title>{{ $t("spell.school") }}</template>
            <span>{{ spell.school.trim() }}</span>
          </StatBlockStat>

          <StatBlockSeparator />

          <StatBlockStat v-if="spell.castingTime !== undefined">
            <template #title>{{ $t("spell.castingTime") }}</template>
            <span>{{ spell.castingTime }}</span>
          </StatBlockStat>

          <StatBlockStat v-if="spell.components !== undefined">
            <template #title>{{ $t("spell.components") }}</template>
            <span>{{ spell.components }}</span>
          </StatBlockStat>

          <StatBlockStat v-if="spell.ritual !== undefined">
            <template #title>{{ $t("spell.ritual") }}</template>
            <span>{{ spell.ritual ? $t("yes") : $t("no") }}</span>
          </StatBlockStat>

          <StatBlockSeparator />

          <StatBlockStat v-if="spell.duration !== undefined">
            <template #title>{{ $t("spell.duration") }}</template>
            <span>{{ spell.duration }}</span>
          </StatBlockStat>

          <StatBlockStat v-if="spell.range !== undefined">
            <template #title>{{ $t("spell.rangeArea") }}</template>
            <span>{{ spell.range }}</span>
          </StatBlockStat>

          <StatBlockSeparator />

          <div>
            <p v-html="spell.description" />
          </div>
        </UCard>
      </div>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { addOrdinal } from "monstershuffler-shared";
import type { Spell } from "@/types";
import { enableDrag, disableDrag } from "@/utils";

const { language } = storeToRefs(useUserStore());
const { width, height } = useScreen();
const tooltips = useTooltipsStore();

const moral = inject("moral") as string;

const card = ref<HTMLDivElement | null>(null);
const spell = ref<Spell | null>(null);

const emit = defineEmits(["close"]);
const p = defineProps({
  name: { type: String, required: true },
  id: { type: [Number, String], default: undefined },
  top: { type: Number, default: 0 },
});

watch(card, () => {
  if (!card.value) return;
  if (width.value >= 700) {
    card.value.style.left = `${(width.value - 700) / 2}px`;
    enableDrag(card.value);
  }
  const screenTop = window.scrollY;
  const screenBottom = screenTop + height.value;
  const rect = card.value.getBoundingClientRect();
  let newTop = p.top;
  card.value.style.top = `${p.top}px`;
  if (newTop + rect.height > screenBottom) newTop = screenBottom - rect.height;
  if (newTop < screenTop) newTop = screenTop;
  card.value.style.top = `${newTop}px`;
});

watch(width, () => {
  if (!card.value) return;
  const rect = card.value.getBoundingClientRect();
  if (rect.left + rect.width > width.value) {
    card.value.style.left = `${width.value - rect.width}px`;
  }
  if (width.value >= 700) enableDrag(card.value);
  else disableDrag(card.value);
});

onMounted(async () => {
  if (p.id) spell.value = await tooltips.getSpellDescription(p.id);
});
</script>
