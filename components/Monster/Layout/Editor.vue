<template>
  <UModal v-model:open="open" :title="$t('editor.layout.title')">
    <template #body>
      <UAlert
        v-if="isMobileAlertOpen"
        inline
        color="warning"
        icon="i-xxx-warning"
        :title="$t('editor.layout.warningMobileTitle')"
        :description="$t('editor.layout.warningMobileDescription')"
        close
        @close="closeAlert"
        @update:open="isMobileAlertOpen = false"
      />
      <TH4 class="mt-4">
        {{ $t("editor.layout.dynamic") }}
      </TH4>
      <p class="text-sm">{{ $t("editor.layout.dynamicSubtitle") }}.</p>
      <MonsterLayoutExampleGroup class="mt-4">
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutDynamicA'"
          @click="chooseLayout('MonsterLayoutDynamicA')"
        >
          <MonsterLayoutExample1ColumnA class="example" />
          <MonsterLayoutExample2ColumnA class="example" />
          <span class="sr-only">
            Monster's image on top, description and stat block automatically
            rearranged when the stat block becomes too big.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutDynamicNoImage'"
          @click="chooseLayout('MonsterLayoutDynamicNoImage')"
        >
          <MonsterLayoutExampleNoImage1Column class="example" />
          <MonsterLayoutExampleNoImage2Column class="example" />
          <span class="sr-only">
            No image, description and stat block automatically rearranged when
            the stat block becomes too big.
          </span>
        </MonsterLayoutExample>
      </MonsterLayoutExampleGroup>
      <TH4 class="mt-4">{{ $t("editor.layout.1Column") }}</TH4>
      <MonsterLayoutExampleGroup class="mt-4">
        <MonsterLayoutExample
          class="layout"
          :selected="currentLayout === 'MonsterLayoutOneColumnA'"
          @click="chooseLayout('MonsterLayoutOneColumnA')"
        >
          <MonsterLayoutExample1ColumnA class="example" />
          <span class="sr-only">
            Monster's image on top, description on the bottom left, stat block
            on the bottom right.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutOneColumnB'"
          @click="chooseLayout('MonsterLayoutOneColumnB')"
        >
          <MonsterLayoutExample1ColumnB class="example" />
          <span class="sr-only">
            Monster's image on top, stat block on the bottom left, description
            on the bottom right.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutOneColumnC'"
          @click="chooseLayout('MonsterLayoutOneColumnC')"
        >
          <MonsterLayoutExample1ColumnC class="example" />
          <span class="sr-only">
            Monster's image on top left, description on bottom left, stat block
            on the the right side.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutOneColumnD'"
          @click="chooseLayout('MonsterLayoutOneColumnD')"
        >
          <MonsterLayoutExample1ColumnD class="example" />
          <span class="sr-only">
            Monster's image on the right side, description on the top left, stat
            block on the bottom left.
          </span>
        </MonsterLayoutExample>
      </MonsterLayoutExampleGroup>
      <TH4 class="mt-4">{{ $t("editor.layout.2Column") }}</TH4>
      <MonsterLayoutExampleGroup class="mt-4">
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutTwoColumnA'"
          @click="chooseLayout('MonsterLayoutTwoColumnA')"
        >
          <MonsterLayoutExample2ColumnA class="example" />
          <span class="sr-only">
            Monster's image on top, stat block on bottom and the description in
            between.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutTwoColumnB'"
          @click="chooseLayout('MonsterLayoutTwoColumnB')"
        >
          <MonsterLayoutExample2ColumnB class="example" />
          <span class="sr-only">
            Monster's image on top, description on bottom and the stat block in
            between.
          </span>
        </MonsterLayoutExample>
        <MonsterLayoutExample
          :selected="currentLayout === 'MonsterLayoutTwoColumnC'"
          @click="chooseLayout('MonsterLayoutTwoColumnC')"
        >
          <MonsterLayoutExample2ColumnC class="example" />
          <span class="sr-only">
            Monster's image on the top left corner, description on the top side
            corner and the stat block is just below them.
          </span>
        </MonsterLayoutExample>
      </MonsterLayoutExampleGroup>
      <TH4 class="mt-4">
        {{ $t("editor.layout.otherOptions") }}
      </TH4>
      <UCheckbox
        v-model="settings.showRoleplayStats"
        :label="$t('editor.layout.showRoleplayStats')"
        class="mt-4"
      />
    </template>
    <template #footer>
      <UButton color="neutral" :label="$t('close')" @click="open = false" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";
const emit = defineEmits(["close"]);

const open = defineModel("open", {
  type: Boolean,
  default: false,
});

const UI = useUiStore();
const generator = useGeneratorStore();

const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const { mdAndDown } = useScreen();
const { alertClicked } = storeToRefs(UI);
const { settings } = storeToRefs(generator);

const isMobileAlertOpen = ref(false);

const currentLayout = computed(() => {
  return (
    character.value.character.user?.sheet?.layout ||
    settings.value?.layout ||
    "MonsterLayoutDynamicA"
  );
});

function chooseLayout(layout: string) {
  settings.value.layout = layout;
  emit("close");
}

function closeAlert() {
  isMobileAlertOpen.value = false;
  alertClicked.value.layoutsMobile = true;
}

watch(mdAndDown, () => {
  isMobileAlertOpen.value = alertClicked.value?.layoutsMobile
    ? false
    : mdAndDown.value;
});
</script>

<style scoped></style>
