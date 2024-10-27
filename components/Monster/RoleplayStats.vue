<template>
  <div>
    <p>
      <button
        v-tooltip="$t('rename')"
        class="name"
        :class="moral"
        @click.stop="toggleRenameModal"
      >
        {{ statistics.fullName }}
      </button>
      <span v-if="about" class="about">{{ `, ${about}` }}</span>
    </p>
    <p v-if="statistics.characterHook?.length" class="hook mt-1">
      <MonsterDescription :parts="statistics.characterHook" period />
    </p>
    <dl class="mt-2">
      <template v-if="character.character.age">
        <dt :class="moral">{{ $t("monsterCard.age") }}</dt>
        <dd>
          {{
            capitalizeFirst($t(`monsterCard.${character.character.age.string}`))
          }}
          ({{
            $t("monsterCard.ageNumber", {
              age: character.character.age.number,
            })
          }})
        </dd>
      </template>
      <template v-if="statistics?.alignment?.string">
        <dt :class="moral">{{ $t("monsterCard.alignment") }}</dt>
        <dd>{{ statistics.alignment.string }}</dd>
      </template>
      <template v-if="character.character.trait">
        <dt :class="moral">{{ $t("monsterCard.personality") }}</dt>
        <dd>
          <span
            class="dotted"
            @mouseover.stop="showTraitDescription = true"
            @mouseleave.stop="showTraitDescription = false"
          >
            <MSTooltip
              :word="character.character.trait.name"
              :description="character.character.trait.description"
              source="traits"
            />
          </span>
        </dd>
      </template>
      <template v-if="character.character.height">
        <dt :class="moral">{{ $t("monsterCard.height") }}</dt>
        <dd>{{ convertHeight(character.character.height) }}</dd>
      </template>
      <template v-if="character.character.weight">
        <dt :class="moral">{{ $t("monsterCard.bodyType") }}</dt>
        <dd>
          {{ capitalizeFirst($t(`monsterCard.${character.character.weight}`)) }}
        </dd>
      </template>
      <template v-if="character.character.voice">
        <dt :class="moral">{{ $t("monsterCard.voice") }}</dt>
        <dd>
          <MonsterVoice :voice="character.character.voice" />
        </dd>
      </template>
      <template
        v-if="character.character.physicalAppearance && !hidePhysicalAppearance"
      >
        <p class="mt-2">{{ character.character.physicalAppearance }}</p>
      </template>
    </dl>
    <MonsterRenameModal
      v-if="isRenameModalOpen"
      v-model="character"
      @close="isRenameModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import {
  feetDecimalToFeetInches,
  feetDecimalToMeters,
} from "monstershuffler-shared";
import type { Statistics, Character } from "@/types";

const p = defineProps({
  hidePhysicalAppearance: {
    type: Boolean,
    default: false,
  },
});

const user = useUserStore();

const statistics = inject("statistics") as Ref<Statistics>;
const character = inject("character") as Ref<Character>;
const moral = inject("moral") as Ref<string>;

const showTraitDescription = ref(false);
const isRenameModalOpen = ref(false);

const tags = computed(() => character.value.tags);
const unit = computed(() => user.me?.settings?.stats?.heightUnit || "feet");
const about = computed(() => {
  let string = "";
  if (tags.value && statistics) {
    if (["male", "female"].includes(statistics.value.pronouns || "")) {
      string += `${statistics.value.pronouns} `;
    }
    string += tags.value.race;
  }
  return string;
});

function convertHeight(height: number) {
  if (unit.value === "meters") {
    return feetDecimalToMeters(height);
  }
  return feetDecimalToFeetInches(height);
}

function toggleRenameModal() {
  isRenameModalOpen.value = !isRenameModalOpen.value;
}
</script>

<style scoped>
.name {
  font-family: "MrsEavesSmallCaps", sans;
  font-weight: 600;
  font-size: 1.3rem;
  font-variant: small-caps;
  letter-spacing: 0.05em;
  cursor: text;
}
.name:hover {
  text-decoration: underline;
}
.hook {
  @apply italic;
}
dt {
  float: left;
  clear: left;
  letter-spacing: 0.02em;
  @apply font-bold mr-2;
}

.dotted {
  border-bottom: 1px dotted theme("colors.text-2");
  cursor: help;
}
</style>
