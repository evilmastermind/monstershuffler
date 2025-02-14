<template>
  <div>
    <NavbarPadding />
    <div class="background" />
    <HomeHero />
    <div class="lg-max">
      <div class="mx-4 intro">
        <HomeQuestions class="mt-4" />
        <HomeTools class="mt-6" />
      </div>
      <div class="mx-4 mt-10">
        <div class="sections">
          <LazyEditorPageNotes id="notes" class="section-max-w" />
          <LazyEditorPageNoteGroups id="note-groups" class="section-max-w" />
          <LazyEditorPageStatBlocks id="stat-blocks" class="section-max-w" />
          <LazyEditorPageCombatManagers class="section-max-w" />
          <LazyEditorPageTextGenerators
            id="text-generators"
            class="section-max-w"
          />
          <LazyEditorPageMore id="more" class="section-max-w" />
        </div>
      </div>
    </div>
    <!-- <LazyEditorPageShare class="mt-9" /> -->
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
  @apply gap-10;
}
.section-max-w {
  max-width: 1000px;
}
</style>
