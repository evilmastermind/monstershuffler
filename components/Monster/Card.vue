<template>
  <div
    class="rounded-md bg-default ring ring-accented hover:shadow hover:ring-primary/30 divide-y divide-default p-6"
  >
    <div class="relative h-full" :class="selectable ? 'selectable' : ''">
      <div class="absolute flex gap-1 top-[-1rem] right-[-1rem]">
        <UTooltip :text="$t('copyToClipboard')">
          <UButton
            v-if="selectable"
            class="text-dimmed/50 hover:text-toned p-1"
            size="sm"
            variant="ghost"
            color="neutral"
            icon="i-xxx-clipboard"
            :aria-label="$t('copyToClipboard')"
            @click.stop="copyToClipboard"
          />
        </UTooltip>
        <UTooltip :text="$t('pin')">
          <UButton
            v-if="selectable"
            class="text-dimmed/50 hover:text-toned p-1"
            size="sm"
            color="neutral"
            variant="ghost"
            icon="i-xxx-pin"
            :aria-label="$t('pin')"
            @click.stop="pinCharacter"
          />
        </UTooltip>
      </div>
      <div class="flex flex-col justify-between w-full h-full pt-2">
        <MonsterRoleplay hide-physical-appearance />
        <UButton
          block
          v-if="selectable"
          class="mt-6"
          variant="outline"
          color="neutral"
          @click="openCharacterSheet"
        >
          {{ $t("generator.generateStats") }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { exportRoleplayStats } from "monstershuffler-shared";
import type { NpcDetails } from "monstershuffler-shared";
import type { GeneratorCharacter } from "@/types";

const p = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
  index: {
    type: Number,
    default: undefined,
  },
});

const ui = useUiStore();
const generator = useGeneratorStore();

const refGeneratorCharacter = toRef(p, "generatorCharacter");
const { session } = storeToRefs(generator);

useProvideCharacter(refGeneratorCharacter);

function openCharacterSheet() {
  if (p.index === undefined) {
    return;
  }
  const npc = session.value[p.index];
  generator.pushNewCharacter(npc as NpcDetails, true);
}

function pinCharacter() {
  if (p.index === undefined) {
    return;
  }
  const npc = session.value[p.index];
  generator.pushNewCharacter(npc as NpcDetails, false);
}

function copyToClipboard() {
  const content = exportRoleplayStats(refGeneratorCharacter.value.object);
  navigator.clipboard.writeText(content);
}
</script>

<style scoped></style>
