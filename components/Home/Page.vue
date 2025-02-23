<template>
  <div>
    <NavbarPadding />
    <div class="background" />
    <HomeHero />
    <div class="lg-max">
      <div class="mx-4 intro">
        <HomeQuestions class="my-4 mb-6" />
        <HomeSeparator icon="mdi:tools" />
        <HomeTools class="my-6" />
        <HomeSeparator icon="bxs:user-pin" />
        <HomeMe />
      </div>
      <div class="mx-4 mt-10">
        <div class="sections">
          <LazyEditorPageNotes id="notes" class="section-max-w" />
          <HomeSeparator icon="wpf:books" />
          <LazyEditorPageNoteGroups id="note-groups" class="section-max-w" />
          <HomeSeparator icon="bi:file-text-fill" />
          <LazyEditorPageStatBlocks id="stat-blocks" class="section-max-w" />
          <HomeSeparator />
          <LazyEditorPageCombatManagers class="section-max-w" />
          <HomeSeparator icon="fa6-solid:shuffle" />
          <LazyEditorPageTextGenerators
            id="text-generators"
            class="section-max-w"
          />
          <HomeSeparator icon="heroicons:squares-plus-20-solid" />
          <LazyEditorPageMore />
        </div>
      </div>
    </div>
    <LazyEditorPageShare class="mt-9" />
    <div class="mt-8">
      <PresentationFooter>
        <template #feedback>
          <div class="feedback">
            <MSOpenFeedback
              :question-id="openQuestion.id"
              :question="openQuestion.question.question"
            />
          </div>
        </template>
      </PresentationFooter>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createStats } from "monstershuffler-shared";
import type { GeneratorCharacter } from "@/types";
import characterObject from "@/assets/other/character-example.json";
const character = ref<GeneratorCharacter>(
  // @ts-expect-error this IS a GeneratorCharacter, dammit!
  characterObject as GeneratorCharacter
);

createStats(character.value.object);
useProvideCharacter(character);

const openQuestion = {
  id: "464a22a2-0896-4d61-8280-2c750b0d5c09",
  question: {
    question:
      "Are there any other tools or features you would like to see added to the final version?",
  },
};
</script>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @apply gap-6;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  @apply bg-background-100;
}

.sections {
  display: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  @apply gap-9;
}
.section-max-w {
  max-width: 1000px;
}
.footer {
  max-width: 500px;
}
</style>
