<template>
  <span>
    <Teleport v-if="spell" to="body">
      <div ref="card" class="spell">
        <MSCard class="m-2">
          <button
            class="close ml-1"
            :title="$t('close')"
            @click="emit('close')"
          >
            <font-awesome-icon
              aria-hidden="true"
              class="close-button"
              icon="fas fa-solid fa-times"
              size="sm"
              fixed-width
            />
            <span class="sr-only">{{ $t("close") }}</span>
          </button>
          <h1 class="spell-name" :class="moral">{{ name }}</h1>
          <MonsterStatBlockStat v-if="spell.level !== undefined">
            <template #title> {{ $t("spell.level") }} </template>
            <template v-if="spell.level === 0">
              {{ $t("spell.cantrip") }}
            </template>
            <template v-else>
              {{ spell.level }}{{ addOrdinal(spell.level, language) }}
            </template>
          </MonsterStatBlockStat>
          <MonsterStatBlockStat v-if="spell.school !== undefined">
            <template #title>{{ $t("spell.school") }}</template>
            <span>{{ spell.school.trim() }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockSeparator />
          <MonsterStatBlockStat v-if="spell.castingTime !== undefined">
            <template #title>{{ $t("spell.castingTime") }}</template>
            <span>{{ spell.castingTime }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockStat v-if="spell.components !== undefined">
            <template #title>{{ $t("spell.components") }}</template>
            <span>{{ spell.components }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockStat v-if="spell.ritual !== undefined">
            <template #title>{{ $t("spell.ritual") }}</template>
            <span>{{ spell.ritual === true ? $t("yes") : $t("no") }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockSeparator />
          <MonsterStatBlockStat v-if="spell.duration !== undefined">
            <template #title>{{ $t("spell.duration") }}</template>
            <span>{{ spell.duration }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockStat v-if="spell.range !== undefined">
            <template #title>{{ $t("spell.rangeArea") }}</template>
            <span>{{ spell.range }}</span>
          </MonsterStatBlockStat>
          <MonsterStatBlockSeparator />
          <div class="spell-description">
            <p v-html="spell.description" />
          </div>
        </MSCard>
      </div>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import type { Spell } from "@/types";
import { addOrdinal } from "@/parsers";
import { useScreen } from "@/composables/screen";
import { enableDrag, disableDrag } from "@/utils";

const { language } = storeToRefs(useUserStore());
const { width, height } = useScreen();
const tooltips = useTooltipsStore();

const moral = inject("moral") as string;

const card = ref<HTMLDivElement | null>(null);
const spell = ref<Spell | null>(null);

const emit = defineEmits(["close"]);
const p = defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: [Number, String],
    default: undefined,
  },
  top: {
    type: Number,
    default: 0,
  },
});

// Position the card in the middle of the screen and enable dragging
watch(card, () => {
  if (!card.value) {
    return;
  }
  if (width.value >= 700) {
    card.value.style.left = `${(width.value - 700) / 2}px`;
    enableDrag(card.value);
  }
  // Ensure the card is not off-screen
  const screenTop = window.scrollY;
  const screenBottom = screenTop + height.value;
  const clientRect = card.value.getBoundingClientRect();
  let newCardTop = p.top;
  card.value.style.top = `${p.top}px`;
  if (newCardTop + clientRect.height > screenBottom) {
    newCardTop = screenBottom - clientRect.height;
  }
  if (newCardTop < screenTop) {
    newCardTop = screenTop;
  }
  card.value.style.top = `${newCardTop}px`;
});

// Ensure the card stays within the screen when the window is resized
watch(width, () => {
  if (!card.value) {
    return;
  }
  const rect = card.value.getBoundingClientRect();
  if (rect.left + rect.width > width.value) {
    card.value.style.left = `${width.value - rect.width}px`;
  }
  if (width.value >= 700) {
    enableDrag(card.value);
  } else {
    disableDrag(card.value);
  }
});

onMounted(async () => {
  if (p.id) {
    spell.value = await tooltips.getSpellDescription(p.id);
  }
});
</script>

<style scoped>
.spell {
  z-index: 9900;
  position: absolute;
  top: 20%;
  width: 100%;
  max-width: 700px;
  font-family: ScalaSansOffc;
  cursor: move;
}
@media (max-width: 700px) {
  .spell {
    cursor: auto;
  }
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: var(--text);
  padding: 0.5rem;
  font-size: 1.5rem;
  transition: color 0.2s ease-in-out;
}
.close-button {
  opacity: 0.5;
}
.close-button:hover {
  opacity: 1;
}
.spell-name {
  font-size: 1.5rem;
  font-variant: small-caps;
}
</style>
