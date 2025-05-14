<template>
  <div>
    <div class="flex justify-between bg-elevated sm:bg-transparent">
      <MonsterSheetToolGroup>
        <MSIconButton
          v-model="isLayoutEditorOpen"
          :label="$t('monsterSheet.editLayout')"
          icon="i-xxx-layout"
          @click="openLayoutEditor"
        />
        <MSIconButton
          :label="$t('monsterSheet.editImages')"
          icon="i-xxx-image"
          @click="toggleImageEditor"
        />
        <MonsterSheetToolBackstoryHelp />
        <MSIconButton
          :label="$t('monsterSheet.editStatBlock')"
          icon="i-xxx-stat-block"
          disabled
        />
        <MSIconButton
          :label="$t('monsterSheet.regenerateBackstory')"
          disabled
          icon="simple-icons:openai"
        />
      </MonsterSheetToolGroup>
      <MonsterSheetToolGroup>
        <MSIconButton
          :label="$t('monsterSheet.share')"
          icon="i-xxx-share"
          @click="share?.toggle()"
        />
        <UDropdownMenu :items="exportOptions">
          <MSIconButton
            :label="$t('monsterSheet.export')"
            icon="i-xxx-export"
          />
        </UDropdownMenu>
        <UDropdownMenu :items="downloadOptions">
          <MSIconButton
            :label="$t('monsterSheet.download')"
            icon="i-xxx-download"
          />
        </UDropdownMenu>
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
      </MonsterSheetToolGroup>
    </div>
    <LazyMonsterLayoutEditor v-model:open="isLayoutEditorOpen" />
    <LazyMonsterSheetToolExportModal
      v-model:open="isStatBlockExportModalOpen"
      :stat-block-export="statBlockExport"
    />
    <GeneratorShareModal
      ref="share"
      :generator-character="generatorCharacter"
    />
  </div>
</template>

<script setup lang="ts">
import {
  exportRoleplayStats,
  exportCharacterToGmBinder,
  exportCharacterToHomebreweryV3,
  exportCharacterToImprovedInitiative,
  exportCharacterToVTTFoundry,
} from "monstershuffler-shared";
import {
  downloadStatBlock,
  downloadSheet,
  downloadRoleplayStats,
} from "@/utils";

import type { DropdownMenuItem } from "@nuxt/ui";
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
const lexical = useLexicalStore();

const { isLayoutEditorOpen, isImageEditorOpen } = storeToRefs(editor);
const {
  currentCharacterIndex,
  currentSheetHTMLElement,
  currentStatBlockHTMLElement,
  currentRoleplayStatsHTMLElement,
} = storeToRefs(generator);

const share = ref<{ toggle: Function } | null>(null);
const statBlockExport = ref<MonsterExport>({
  type: "Improved Initiative",
  content: "",
});
const isStatBlockExportModalOpen = ref(false);
const generatorCharacter = toRef(p, "generatorCharacter");
useProvideCharacter(generatorCharacter);

const characterName = computed(() => {
  if (generatorCharacter.value) {
    return (
      generatorCharacter.value.object.statistics?.fullName
        ?.replace(/ /g, "_")
        .toLowerCase() || "character"
    );
  }
  return "";
});

function openLayoutEditor() {
  isImageEditorOpen.value = false;
  isLayoutEditorOpen.value = true;
}

function toggleImageEditor() {
  isLayoutEditorOpen.value = false;
  isImageEditorOpen.value = !isImageEditorOpen.value;
}

function closeMonster() {
  currentCharacterIndex.value = -1;
  editor.closeEditors();
}

const downloadOptions = computed(() => {
  return [
    [
      {
        label: t("monsterSheet.downloadStatBlockAsImage"),
        icon: "i-xxx-image",
        onSelect: () =>
          downloadStatBlock(
            currentStatBlockHTMLElement.value,
            characterName.value,
          ),
      },
      {
        label: t("monsterSheet.downloadSheetAsImage"),
        icon: "i-xxx-image",
        onSelect: () =>
          downloadSheet(currentSheetHTMLElement.value, characterName.value),
      },
      {
        label: t("monsterSheet.downloadRoleplayStatsAsImage"),
        icon: "i-xxx-image",
        onSelect: () =>
          downloadRoleplayStats(
            currentRoleplayStatsHTMLElement.value,
            characterName.value,
          ),
      },
      {
        label: t("monsterSheet.downloadSheetAsPdf"),
        disabled: true,
        icon: "i-xxx-pdf",
      },
      {
        label: t("monsterSheet.createToken"),
        disabled: true,
        icon: "i-xxx-person-circle",
      },
    ],
  ];
});

const exportOptions = computed(() => {
  return [
    [
      {
        label: t("statBlock.export.statBlockAs"),
        icon: "i-xxx-stat-block",
        children: [
          {
            label: t("statBlock.export.vtt"),
            onSelect: () =>
              setStatBlockExport(
                "VTT Foundry",
                exportCharacterToVTTFoundry(generatorCharacter.value.object),
              ),
          },
          {
            label: t("statBlock.export.improvedInitiative"),
            onSelect: () =>
              setStatBlockExport(
                "Improved Initiative",
                exportCharacterToImprovedInitiative(
                  generatorCharacter.value.object,
                ),
              ),
          },
          {
            label: t("statBlock.export.gmBinder"),
            onSelect: () =>
              setStatBlockExport(
                "GM Binder",
                exportCharacterToGmBinder(generatorCharacter.value.object),
              ),
          },
          {
            label: t("statBlock.export.homebrewery"),
            onSelect: () =>
              setStatBlockExport(
                "Homebrewery V3",
                exportCharacterToHomebreweryV3(generatorCharacter.value.object),
              ),
          },
          {
            label: t("statBlock.export.monstershuffler"),
            onSelect: () =>
              setStatBlockExport(
                "Monstershuffler",
                JSON.stringify(generatorCharacter.value.object, null, 2),
              ),
          },
        ],
      },
      {
        label: t("monsterSheet.exportAdventureAs"),
        icon: "i-xxx-text",
        children: [
          {
            label: t("HTML"),
            onSelect() {
              setStatBlockExport("HTML", lexical.toHTML());
            },
          },
          {
            label: t("markdown"),
            onSelect() {
              setStatBlockExportAsync("Markdown", lexical.toMarkdown);
            },
          },
        ],
      },
      {
        label: t("monsterSheet.exportRoleplayStats"),
        icon: "i-xxx-roleplay",
        onSelect() {
          setStatBlockExport(
            "Roleplay Stats",
            exportRoleplayStats(generatorCharacter.value.object),
          );
        },
      },
    ],
  ];
});

function setStatBlockExport(type: string, content: string) {
  statBlockExport.value = {
    type,
    content,
  };
}

async function setStatBlockExportAsync(
  type: string,
  fun: (...args: any[]) => Promise<any>,
) {
  statBlockExport.value = {
    type,
    content: await fun(),
  };
}

watch(statBlockExport, () => {
  isStatBlockExportModalOpen.value = true;
});
</script>

<style scoped></style>
