<template>
  <div>
    <p>
      <span
        class="font-[MrsEavesSmallCaps] font-semibold small-caps text-xl tracking-wider"
        :class="moral"
        >{{ statistics.fullName }}</span
      >
      <span v-if="about" class="about">{{ `, ${about}` }}</span>
    </p>
    <p v-if="statistics.characterHook?.length" class="italic mt-1">
      <MonsterDescription :parts="statistics.characterHook" period />
    </p>
    <dl class="mt-2">
      <template v-if="character.character.age">
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.age")
        }}</MonsterRoleplayDt>
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
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.alignment")
        }}</MonsterRoleplayDt>
        <dd>{{ statistics.alignment.string }}</dd>
      </template>
      <template v-if="character.character.trait">
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.personality")
        }}</MonsterRoleplayDt>
        <dd>
          <TDotted
            @mouseover.stop="showTraitDescription = true"
            @mouseleave.stop="showTraitDescription = false"
          >
            <MSTooltip
              :word="character.character.trait.name"
              :description="character.character.trait.description"
              source="traits"
            />
          </TDotted>
        </dd>
      </template>
      <template v-if="character.character.height">
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.height")
        }}</MonsterRoleplayDt>
        <dd>{{ convertHeight(character.character.height) }}</dd>
      </template>
      <template v-if="character.character.weight">
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.bodyType")
        }}</MonsterRoleplayDt>
        <dd>
          {{ capitalizeFirst($t(`monsterCard.${character.character.weight}`)) }}
        </dd>
      </template>
      <template v-if="character.character.voice">
        <MonsterRoleplayDt :class="moral">{{
          $t("monsterCard.voice")
        }}</MonsterRoleplayDt>
        <dd>
          <MonsterVoice :voice="character.character.voice" />
        </dd>
      </template>
      <p v-if="!hidePhysicalAppearance" :key="wrapper.key" class="mt-2">
        {{ character.character.physicalAppearance }}
      </p>
    </dl>
  </div>
</template>

<script setup lang="ts">
import {
  feetDecimalToFeetInches,
  feetDecimalToMeters,
} from "monstershuffler-shared";
import type { Statistics, Character, GeneratorCharacter } from "@/types";

const p = defineProps({
  hidePhysicalAppearance: {
    type: Boolean,
    default: false,
  },
});

const user = useUserStore();

const statistics = inject("statistics") as Ref<Statistics>;
const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;
const moral = inject("moral") as Ref<string>;

const showTraitDescription = ref(false);

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
</script>

<style scoped></style>
