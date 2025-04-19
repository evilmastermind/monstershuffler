<template>
  <div>
    <div class="tools-container">
      <div class="tools py-2 px-3">
        <MSIconButton
          :label="$t('monsterSheet.editLayout')"
          :class="currentEditorMode === 'layout' ? 'text-primary-700' : ''"
          icon="ri:layout-6-fill"
          @click="toggleEditorMode('layout')"
        />
        <MSIconButton
          :label="$t('monsterSheet.editImages')"
          :class="currentEditorMode === 'image' ? 'text-primary-700' : ''"
          icon="fa6-solid:image"
          @click="toggleEditorMode('image')"
        />
        <MonsterSheetToolsBackstory />
        <!-- <MSIconButton
          :label="$t('monsterSheet.editBackstory')"
          :class="currentEditorMode === 'backstory' ? 'text-primary-700' : ''"
          icon="humbleicons:align-text-left"
          @click="toggleEditorMode('backstory')"
        /> -->
        <MSIconButton
          :label="$t('monsterSheet.editStatBlock')"
          icon="bi:file-text-fill"
          disabled
        />
        <MSIconButton
          :label="$t('monsterSheet.regenerateBackstory')"
          disabled
          icon="simple-icons:openai"
        />
      </div>
      <div class="tools py-2 px-3">
        <MSIconButton
          :label="$t('monsterSheet.share')"
          icon="solar:share-bold"
          @click="share?.toggle()"
        />
        <VMenu
          :triggers="['hover', 'click', 'focus', 'touch']"
          placement="bottom"
        >
          <MSIconButton
            :label="$t('monsterSheet.export')"
            icon="fa6-solid:file-export"
          />
          <template #popper="{ hide }">
            <MSMenuList>
              <VMenu
                :triggers="['hover', 'click', 'focus', 'touch']"
                placement="right"
              >
                <MSMenuItem
                  :label="$t('statBlock.export.statBlockAs')"
                  icon="bi:file-text-fill"
                  :is-sub-menu="true"
                />
                <template #popper="{ hide }">
                  <LazyMonsterSheetToolsExportStatBlock
                    v-model="statBlockExport"
                    :hide
                  />
                </template>
              </VMenu>
              <VMenu
                :triggers="['hover', 'click', 'focus', 'touch']"
                placement="right"
              >
                <MSMenuItem
                  :label="$t('monsterSheet.exportAdventureAs')"
                  icon="humbleicons:align-text-left"
                  :is-sub-menu="true"
                />
                <template #popper="{ hide }">
                  <LazyMonsterSheetToolsExportBackstory
                    v-model="statBlockExport"
                    :hide
                  />
                </template>
              </VMenu>
              <MSMenuItem
                :label="$t('monsterSheet.exportRoleplayStats')"
                icon="fa-solid:theater-masks"
                @click="copyRoleplayStats(hide)"
              />
            </MSMenuList>
          </template>
        </VMenu>
        <VMenu
          :triggers="['hover', 'click', 'focus', 'touch']"
          placement="bottom"
        >
          <MSIconButton
            :label="$t('monsterSheet.download')"
            icon="fa6-solid:download"
          />
          <template #popper="{ hide }">
            <MSMenuList>
              <LazyMonsterSheetToolsDownload :hide />
            </MSMenuList>
          </template>
        </VMenu>
        <MSIconButton
          :label="$t('monsterSheet.save')"
          icon="fa6-solid:floppy-disk"
          disabled
        />
        <MSIconButton
          class="ml-4"
          :label="$t('monsterSheet.closeSheet')"
          icon="fa6-solid:xmark"
          @click="closeMonster"
        />
      </div>
    </div>
    <MonsterLayoutEditor
      v-if="currentEditorMode === 'layout'"
      @close="currentEditorMode = ''"
    />
    <LazyMonsterSheetToolsExportModal
      v-if="statBlockExport.isModalOpen === true"
      v-model="statBlockExport"
    />
    <MonsterShareModal ref="share" :generator-character="generatorCharacter" />
  </div>
</template>

<script setup lang="ts">
import { exportRoleplayStats } from "monstershuffler-shared";
import type {
  MonsterExport,
  Character,
  GeneratorCharacter,
  MonsterEditors,
} from "@/types";

const p = defineProps({
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
});

const { t } = useI18n();
const generator = useGeneratorStore();
const editor = useMonsterEditorStore();

const { currentEditorMode } = storeToRefs(editor);
const { currentCharacterIndex, characters } = storeToRefs(generator);

const share = ref<{ toggle: Function } | null>(null);
const statBlockExport = ref<MonsterExport>({
  isModalOpen: false,
  type: "Improved Initiative",
  content: "",
});
const generatorCharacter = toRef(p, "generatorCharacter");
useProvideCharacter(generatorCharacter);

function toggleEditorMode(mode: MonsterEditors) {
  if (currentEditorMode.value === mode) {
    currentEditorMode.value = "";
  } else {
    currentEditorMode.value = mode;
  }
}

function copyRoleplayStats(hide: Function) {
  hide();
  statBlockExport.value = {
    isModalOpen: true,
    type: "Roleplay Stats",
    content: exportRoleplayStats(generatorCharacter.value.object),
  };
}

function closeMonster() {
  currentCharacterIndex.value = -1;
  currentEditorMode.value = "";
}
</script>

<style scoped>
.tools-container {
  display: flex;
  justify-content: space-between;
  @apply bg-background-300;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0;
  line-height: 1rem;
  @apply bg-background-300  text-text-icon  gap-4;
}
@media (min-width: theme("screens.sm")) {
  .tools-container {
    @apply bg-transparent;
  }
  .tools {
    border-radius: 1rem;
    line-height: 1rem;
    @apply bg-background-300 text-text-icon  gap-4;
  }
}
.tools button:not(:disabled):hover {
  @apply text-primary-700;
}
.tools button:disabled {
  @apply opacity-50;
}
</style>
