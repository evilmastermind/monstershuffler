<template>
  <div class="border-b border-muted">
    <UContainer>
      <div class="top-bar items-center whitespace-nowrap h-12 gap-4">
        <!-- Info section -->
        <div class="top-bar-info flex justify-between items-center">
          <!-- Breadcrumbs / Back button -->
          <div v-if="isSheetOpen" class="flex items-center truncate">
            <UButton
              class="mr-4 md:mr-6"
              variant="ghost"
              color="neutral"
              icon="i-xxx-arrow-left"
              :aria-label="$t('back')"
              @click="closeSheet"
            />
            <TBreadcrumb
              v-if="isSheetOpen && characters[currentCharacterIndex]"
            >
              {{
                characters[currentCharacterIndex].object.statistics?.fullName
              }}
            </TBreadcrumb>
          </div>
          <!-- Page title -->
          <TBreadcrumb v-else class="hidden md:block">
            {{ $t("generator.title") }}
          </TBreadcrumb>
          <!-- Mobile settings toggle -->
          <UButton
            v-if="settings.isFormMode && !isSheetOpen"
            class="block md:hidden"
            color="neutral"
            variant="ghost"
            :aria-label="$t('generator.options')"
            icon="i-xxx-cog"
            @click="isFormOpen = !isFormOpen"
          />
          <!-- Prompt help -->
          <GeneratorPromptHelp
            v-else-if="!settings.isFormMode && !isSheetOpen"
            class="col-start-2"
          />
        </div>

        <!-- Generate button (mobile only) -->
        <div
          v-if="settings.isFormMode && !isSheetOpen"
          class="generate-button flex justify-start items-center gap-4 md:hidden"
        >
          <UButton
            variant="soft"
            color="neutral"
            size="sm"
            :label="$t('generator.form.generate')"
            :loading="isButtonLoading"
            :disabled="isButtonLoading"
            @click="generateNpcsThrottle"
          />
        </div>

        <!-- Generator prompt (desktop) -->
        <GeneratorPrompt
          v-show="!settings.isFormMode && !isSheetOpen"
          class="prompt max-w-[400px] md:max-w-none"
        />

        <!-- Mode switch -->
        <div v-if="!isSheetOpen" class="top-bar-options flex justify-end gap-1">
          <UButton
            color="neutral"
            size="sm"
            :variant="settings.isFormMode === true ? 'soft' : 'outline'"
            @click="settings.isFormMode = true"
          >
            Form
          </UButton>
          <UButton
            color="neutral"
            :variant="!settings.isFormMode ? 'soft' : 'outline'"
            size="sm"
            @click="settings.isFormMode = false"
          >
            Prompt
          </UButton>
          <!-- <USwitch
            v-model="settings.isFormMode"
            :label="settings.isFormMode ? 'Form' : 'Prompt'"
          /> -->
        </div>
      </div>

      <!-- Generator form (mobile) -->
      <GeneratorForm
        v-if="isFormOpen"
        class="md:hidden mb-4"
        @close="isFormOpen = false"
      />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { UContainer } from "#components";

const isFormOpen = ref(false);

const p = defineProps({
  isButtonLoading: {
    type: Boolean,
    default: false,
  },
  generateNpcsThrottle: {
    type: Function as PropType<() => void>,
    default: null,
  },
});

const generator = useGeneratorStore();
const editor = useMonsterEditorStore();

const { currentCharacterIndex, characters, settings } = storeToRefs(generator);

const isSheetOpen = computed(() => currentCharacterIndex.value > -1);

function closeSheet() {
  currentCharacterIndex.value = -1;
  editor.closeEditors();
}
</script>
<style scoped>
.top-bar {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas: "info input options";
  align-items: center;
}
.top-bar-info {
  grid-area: info;
}

.top-bar-options {
  grid-area: options;
}
.generate-button {
  grid-area: input;
}
.prompt {
  max-width: 400px;
}
@media (min-width: 48rem) {
  .top-bar {
    grid-template-columns: 1fr 50% 1fr;
    grid-template-areas: "info input options";
  }
  .prompt {
    max-width: none;
  }
}
</style>
