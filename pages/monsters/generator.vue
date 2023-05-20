<template>
  <div>
    <!-- <BackgroundDice /> -->
    <div class="background" />
    <NavbarPadding />
    <div class="lg-max overflow-hidden">
      <h1 class="mb-4 text-shadow">
        {{ $t("generator.title") }}
      </h1>
      <div class="options centered mt-6 my-4">
        <label class="cursor-pointer">
          <MSSlider2 v-model:is-enabled="modeBoolean" />
          <h4 class="ml-2 inline">{{ $t(`generator.${mode}ModeTitle`) }}</h4>
        </label>
        <button
          v-if="mode === 'form'"
          class="button-show-settings cursor-pointer"
          @click="isFormShownOnMobile = !isFormShownOnMobile"
        >
          <font-awesome-icon icon="fas fa-solid fa-cog" fixed-width />
          {{ $t("generator.showSettings") }}
        </button>
        <!-- <p>{{ $t(`generator.${mode}ModeDescription`)  }}</p> -->
      </div>
      <div class="grid">
        <Transition name="scroll-right" mode="out-in">
          <GeneratorForm
            v-if="mode === 'form'"
            v-model="isFormShownOnMobile"
            class="form mb-4"
          />
          <GeneratorPrompt v-else class="prompt text-max mb-4" />
        </Transition>
        <div class="npcs">
          <GeneratorIntro />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const isFormShownOnMobile = ref(true);
const modeBoolean = ref(true);
const mode = computed(() => (modeBoolean.value ? "form" : "prompt"));
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @include themed() {
    background: linear-gradient(
        to bottom,
        t($primary-200) 0,
        t($background) 10em,
        rgba(t($background), 0.5) 100%
      ),
      url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
    // background-color: t($background2);
    // background: rgba(t($background2), 0.7)
    //   url("@/assets/images/generator-bg-1.jpg") no-repeat center center/cover;
    // background-blend-mode: t($background-blend-mode);
  }
  //  ;
  z-index: -2;
}
.form {
  float: left;
  max-width: 300px;
}
.options {
  display: flex;
  justify-content: center;
  gap: $s-6;
}
.overflow-hidden {
  overflow: hidden;
}
.button-show-settings {
  display: block;
  font-weight: bold;
  @include md {
    display: none;
  }
}
</style>
