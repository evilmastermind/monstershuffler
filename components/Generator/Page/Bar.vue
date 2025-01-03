<template>
  <div class="top-bar-container">
    <div class="top-bar lg-max max-h-100 px-4">
      <div class="top-bar-info">
        <div v-if="isSheetOpen" class="top-bar-breadcrumbs">
          <button class="mr-4 md:mr-6" @click="closeSheet">
            <Icon name="pajamas:arrow-left" size="24" class="text-text-icon" />
            <span class="sr-only">{{ $t("back") }}</span>
          </button>
          <span v-if="isSheetOpen" class="top-bar-character-name">
            {{ characters[currentCharacterIndex].object.statistics?.fullName }}
          </span>
        </div>
        <h1 v-else class="top-bar-page-title">
          {{ $t("generator.title") }}
        </h1>
        <MSIconButton
          v-if="isFormMode && !isSheetOpen"
          class="button-show-settings md:hidden text-text-2"
          :label="$t('generator.options')"
          size="20"
          icon="fa-solid:cog"
          @click="isFormOpen = !isFormOpen"
        />
        <GeneratorPromptHelp
          v-else-if="!isFormMode && !isSheetOpen"
          class="top-bar-input"
        />
      </div>
      <div v-if="isFormMode && !isSheetOpen" class="generate-button">
        <MSButton
          color="primary"
          size="small"
          :text="$t('generator.form.generate')"
          :loading="isButtonLoading"
          :disabled="isButtonLoading"
          @click.prevent="generateNpcsThrottle"
        />
      </div>
      <GeneratorPrompt v-else-if="!isFormMode && !isSheetOpen" class="prompt" />
      <div class="top-bar-options">
        <MSSwitchWords
          v-model="isFormMode"
          checked="Form"
          unchecked="Prompt"
          :size="mdAndDown ? 'small' : 'medium'"
        />
      </div>
    </div>
    <GeneratorForm v-if="isFormOpen" class="form" @close="isFormOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isFormMode = defineModel("mode", { type: Boolean });
const isFormOpen = ref(false);

const p = defineProps({
  isButtonLoading: {
    type: Boolean,
    default: false,
  },
  generateNpcsThrottle: {
    type: Function as PropType<() => void>,
    required: true,
  },
});

const { mdAndDown } = useScreen();
const generator = useGeneratorStore();
const editor = useMonsterEditorStore();

const { currentEditorMode } = storeToRefs(editor);
const { currentCharacterIndex, characters } = storeToRefs(generator);

const isSheetOpen = computed(() => currentCharacterIndex.value > -1);

function closeSheet() {
  currentCharacterIndex.value = -1;
  currentEditorMode.value = "";
}
</script>

<style scoped>
.top-bar-container {
  @apply bg-background-100 border-b border-b-background-200;
}
.top-bar {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas: "info input options";
  align-items: center;
  white-space: nowrap;
  height: 3rem;
  @apply gap-4;
}
.top-bar-info {
  grid-area: info;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-bar-breadcrumbs {
  display: inline;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top-bar-page-title {
  display: none;
  font-family: "LibreBaskerville", serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  white-space: nowrap;
  line-height: 1em;
  @apply text-text-evil;
}
.top-bar-character-name {
  font-family: "LibreBaskerville", serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  @apply text-text-evil;
}
.button-show-settings {
  display: block;
}
.top-bar-input {
  grid-area: input;
}
.top-bar-options {
  grid-area: options;
  display: flex;
  justify-content: flex-end;
  @apply gap-4;
}
.generate-button {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @apply gap-4;
}
.prompt {
  max-width: 400px;
}

@media (min-width: theme("screens.md")) {
  .generate-button {
    display: none;
  }
  .button-show-settings {
    display: none;
  }
  .top-bar {
    grid-template-columns: 1fr 50% 1fr;
    grid-template-areas: "info input options";
  }
  .top-bar-page-title {
    display: block;
  }
  .prompt {
    max-width: none;
  }
  .form {
    display: none;
  }
}
.prompt-container {
  display: flex;
  @apply gap-4;
}
</style>
