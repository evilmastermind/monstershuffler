<template>
  <div class="generator">
    <!-- <BackgroundDice /> -->
    <div class="background" />
    <NavbarPadding />
    <div class="lg-max max-h-100 overflow-hidden">
      <h1 class="mb-4 text-shadow">
        {{ $t("generator.title") }}
      </h1>
      <div class="options centered mt-6 my-4">
        <label class="cursor-pointer">
          <MSSlider
            v-model:is-enabled="modeBoolean"
            :label="$t(`generator.${mode}ModeTitle`)"
          />
          <span class="bold ml-2 inline">
            {{ $t(`generator.${mode}ModeTitle`) }}
          </span>
        </label>
        <button
          v-if="mode === 'form'"
          class="button-show-settings md:hidden cursor-pointer"
          @click="isFormShownOnMobile = !isFormShownOnMobile"
        >
          <font-awesome-icon icon="fas fa-solid fa-cog" fixed-width />
          {{ $t("generator.options") }}
        </button>
        <!-- <p>{{ $t(`generator.${mode}ModeDescription`)  }}</p> -->
      </div>
      <div>
        <Transition name="scroll-left" appear>
          <GeneratorForm
            v-show="mode === 'form' && isFormShownOnMobile"
            ref="form"
            class="form mb-4 md:mr-6"
            :generate="generate"
            @close="isFormShownOnMobile = false"
          />
        </Transition>
        <GeneratorPrompt
          v-show="mode === 'prompt'"
          class="prompt text-max mb-4 w-full"
        />
        <div class="generate-button text-center my-6">
          <MSButton
            color="primary"
            :text="t('generator.form.generate')"
            @click.prevent="generate = !generate"
          />
        </div>
        <div class="npcs centered pt-4">
          <GeneratorIntro v-if="!session.length" />
          <GeneratorSession v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScreen } from "@/composables/screen";

const { t } = useI18n();
const generator = useGeneratorStore();

useHead({
  title: `${t("generator.pageTitle")} - Monstershuffler.com`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("generator.pageDescription"),
    },
  ],
});

const { width, medium } = useScreen();
const { session } = storeToRefs(generator);
const form = ref(null);

const isFormShownOnMobile = ref(true);
const modeBoolean = ref(true);
const mode = computed(() => (modeBoolean.value ? "form" : "prompt"));
const generate = ref(false);

watch(width, (newWidth, oldWidth) => {
  if (newWidth >= medium.value && oldWidth < medium.value) {
    isFormShownOnMobile.value = true;
  } else if (newWidth < medium.value && oldWidth >= medium.value) {
    isFormShownOnMobile.value = false;
  }
});

watch(
  medium,
  (newMedium) => {
    if (width.value) {
      if (width.value >= newMedium) {
        isFormShownOnMobile.value = true;
      } else if (width.value < newMedium) {
        isFormShownOnMobile.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to bottom,
      theme("colors.background2") 0,
      theme("colors.background") 10em,
      rgba(var(--colors-background), 0.5) 100%
    ),
    url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-color: t($background2);
  // background: rgba(t($background2), 0.7)
  //   url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
  // background-blend-mode: t($background-blend-mode);
  //  ;
  z-index: -2;
}

.generator {
  max-height: 100svh;
}
.form {
  float: left;
  @media (min-width: theme("screens.md")) {
    float: left;
    max-width: 300px;
  }
}
.options {
  display: flex;
  justify-content: center;
  gap: theme("spacing.6");
}
.overflow-hidden {
  overflow: hidden;
}
.button-show-settings {
  display: block;
  font-weight: bold;
  @media (min-width: theme("screens.md")) {
    display: none;
  }
}
.generate-button {
  display: block;
  @media (min-width: theme("screens.md")) {
    display: none;
  }
}
.npcs {
  max-height: 100%;
}
</style>
