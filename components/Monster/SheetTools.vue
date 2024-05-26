<template>
  <div>
    <div class="tools-container">
      <div class="tools py-2 px-3">
        <MSIconButton
          :label="$t('monsterSheet.editLayout')"
          icon="ri:layout-6-fill"
          @click="isLayoutEditorOpen = !isLayoutEditorOpen"
        />
        <MSIconButton
          :label="$t('monsterSheet.editImages')"
          icon="fa6-solid:image"
          @click="toggleEditorMode('image')"
        />
        <MSIconButton
          :label="$t('monsterSheet.editBackstory')"
          icon="humbleicons:align-text-left"
        />
        <MSIconButton
          :label="$t('monsterSheet.regenerateBackstory')"
          icon="simple-icons:openai"
        />
      </div>
      <div class="tools py-2 px-3">
        <MSIconButton
          :label="$t('monsterSheet.export')"
          icon="fa6-solid:file-export"
        />
        <MSIconButton
          :label="$t('monsterSheet.download')"
          icon="fa6-solid:download"
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
      v-if="isLayoutEditorOpen"
      @close="isLayoutEditorOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
// TODO: create a store variable that indicates which
// tool is currently enabled, so that you can set it to
// null when the user changes character, disabling
// the currently enabled tool
import type { Character, MonsterEditors } from "@/types";

const p = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const character = toRef(p, "character");
const generator = useGeneratorStore();
const editor = useMonsterEditorStore();

const { currentEditorMode } = storeToRefs(editor);
const { currentCharacterIndex } = storeToRefs(generator);
useProvideCharacter(character);

const isLayoutEditorOpen = ref(false);

function toggleEditorMode(mode: MonsterEditors) {
  if (currentEditorMode.value === mode) {
    currentEditorMode.value = "";
  } else {
    currentEditorMode.value = mode;
  }
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
  @apply bg-background-evil;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0;
  line-height: 1rem;
  @apply bg-background-evil text-text-inverse gap-4;
}
@media (min-width: theme("screens.sm")) {
  .tools-container {
    @apply bg-transparent;
  }
  .tools {
    border-radius: 1rem;
    line-height: 1rem;
    @apply bg-background-evil shadow-md text-text-inverse gap-4;
  }
}
</style>
