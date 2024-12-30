<template>
  <MSModal width="800" @close="emit('close')">
    <template #title>{{ $t("editor.layout.title") }}</template>
    <div class="mt-2" />
    <MSAlert
      v-if="isMobileAlertOpen"
      inline
      type="warning"
      :title="$t('editor.layout.warningMobileTitle')"
      persistent
      @close="closeAlert"
    >
      {{ $t("editor.layout.warningMobileDescription") }}
    </MSAlert>
    <h4 class="content mt-4">{{ $t("editor.layout.dynamic") }}</h4>
    <p class="text-sm">{{ $t("editor.layout.dynamicSubtitle") }}.</p>
    <div class="layout-group mt-4">
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutDynamicA' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutDynamicA')"
      >
        <MonsterLayoutExample1ColumnA class="example" />
        <MonsterLayoutExample2ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, description and stat block automatically
          rearranged when the stat block becomes too big.
        </span>
      </button>
      <button
        class="layout"
        :class="
          currentLayout === 'MonsterLayoutDynamicNoImage' ? 'selected' : ''
        "
        @click="chooseLayout('MonsterLayoutDynamicNoImage')"
      >
        <MonsterLayoutExampleNoImage1Column class="example" />
        <MonsterLayoutExampleNoImage2Column class="example" />
        <span class="sr-only">
          No image, description and stat block automatically rearranged when the
          stat block becomes too big.
        </span>
      </button>
    </div>
    <h4 class="content mt-4">{{ $t("editor.layout.1Column") }}</h4>
    <div class="layout-group mt-4">
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutOneColumnA' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutOneColumnA')"
      >
        <MonsterLayoutExample1ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, description on the bottom left, stat block on
          the bottom right.
        </span>
      </button>
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutOneColumnB' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutOneColumnB')"
      >
        <MonsterLayoutExample1ColumnB class="example" />
        <span class="sr-only">
          Monster's image on top, stat block on the bottom left, description on
          the bottom right.
        </span>
      </button>
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutOneColumnC' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutOneColumnC')"
      >
        <MonsterLayoutExample1ColumnC class="example" />
        <span class="sr-only">
          Monster's image on top left, description on bottom left, stat block on
          the the right side.
        </span>
      </button>
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutOneColumnD' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutOneColumnD')"
      >
        <MonsterLayoutExample1ColumnD class="example" />
        <span class="sr-only">
          Monster's image on the right side, description on the top left, stat
          block on the bottom left.
        </span>
      </button>
    </div>
    <h4 class="content mt-4">{{ $t("editor.layout.2Column") }}</h4>
    <div class="layout-group mt-4">
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutTwoColumnA' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutTwoColumnA')"
      >
        <MonsterLayoutExample2ColumnA class="example" />
        <span class="sr-only">
          Monster's image on top, stat block on bottom and the description in
          between.
        </span>
      </button>
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutTwoColumnB' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutTwoColumnB')"
      >
        <MonsterLayoutExample2ColumnB class="example" />
        <span class="sr-only">
          Monster's image on top, description on bottom and the stat block in
          between.
        </span>
      </button>
      <button
        class="layout"
        :class="currentLayout === 'MonsterLayoutTwoColumnC' ? 'selected' : ''"
        @click="chooseLayout('MonsterLayoutTwoColumnC')"
      >
        <MonsterLayoutExample2ColumnC class="example" />
        <span class="sr-only">
          Monster's image on the top left corner, description on the top side
          corner and the stat block is just below them.
        </span>
      </button>
    </div>
    <h4 class="content mt-4">{{ $t("editor.layout.otherOptions") }}</h4>
    <MSCheckbox
      v-model="showRoleplayStats"
      :label="$t('editor.layout.showRoleplayStats')"
      class="mt-4"
    />
    <div class="buttons mt-5 mb-4">
      <MSButton :text="$t('close')" @click="emit('close')" />
    </div>
  </MSModal>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";
const emit = defineEmits(["close"]);

const UI = useUiStore();
const generator = useGeneratorStore();

const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const { mdAndDown } = useScreen();
const { alertClicked } = storeToRefs(UI);
const { settings } = storeToRefs(generator);

const showRoleplayStats = ref(settings.value?.showRoleplayStats ?? true);
const isMobileAlertOpen = ref(false);

const currentLayout = computed(() => {
  return (
    character.value.character.user?.sheet?.layout ||
    settings.value?.layout ||
    "MonsterLayoutDynamicA"
  );
});

function chooseLayout(layout: string) {
  const c = character.value.character;
  if (!c.user) {
    c.user = {
      sheet: {
        images: [],
        layout,
        showRoleplayStats: showRoleplayStats.value,
      },
    };
  } else if (!c.user.sheet) {
    c.user.sheet = {
      images: [],
      layout,
      showRoleplayStats: showRoleplayStats.value,
    };
  } else {
    c.user.sheet.layout = layout;
    c.user.sheet.showRoleplayStats = showRoleplayStats.value;
  }
  wrapper.value.key++;
  if (settings.value) {
    settings.value.layout = layout;
    settings.value.showRoleplayStats = showRoleplayStats.value;
  }
  emit("close");
}

function closeAlert() {
  isMobileAlertOpen.value = false;
  alertClicked.value.layoutsMobile = true;
}

watch(showRoleplayStats, () => {
  if (
    character.value.character.user?.sheet?.showRoleplayStats === true ||
    character.value.character.user?.sheet?.showRoleplayStats === false
  ) {
    character.value.character.user.sheet.showRoleplayStats =
      showRoleplayStats.value;
  }
});

watch(mdAndDown, () => {
  isMobileAlertOpen.value = alertClicked.value?.layoutsMobile
    ? false
    : mdAndDown.value;
});

onBeforeMount(() => {
  if (character.value.character.user?.sheet?.showRoleplayStats !== undefined) {
    showRoleplayStats.value =
      character.value.character.user.sheet.showRoleplayStats;
  }
});
</script>

<style scoped>
.example {
  width: 60px;
}
@media (min-width: 480px) {
  .example {
    width: 90px;
  }
}
.layout-group {
  display: flex;
  flex-wrap: wrap;
  @apply gap-4;
}
.layout {
  display: flex;
  cursor: pointer;
  background-color: #999;
  @apply gap-2 p-2 rounded-lg shadow-md;
}
.layout:hover {
  transition: background-color 0.05s;
  outline: 2px solid theme("colors.primary.700");
}
.selected {
  outline: 2px solid theme("colors.primary.700");
}
</style>
