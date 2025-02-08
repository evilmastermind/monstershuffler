<template>
  <div>
    <NavbarPadding />
    <div class="background" />
    <div class="lg-max">
      <div class="mx-4 mt-8">
        <div class="centered">
          <h1 class="static custom-title gradient-title">Editors</h1>
        </div>
        <p class="content text-center mt-2">
          A new set of tools to help you create and manage your campaigns.
          <!--
          - Notes
          - Note groups
          - Combat Manager
          - Stat Blocks (Monsters, NPCs, Items, Actions, Spells, Species, Classes, Backgrounds, Templates, Traps)
          - Random text generators
          - Music Player
          - New page layout (search bar, campaign selector, player character lists)
          - Shareable
          - Plugins for VTTs
          -->
        </p>
        <div class="sections mt-9">
          <LazyEditorPageNotes class="section-max-w" />
          <LazyEditorPageNoteGroups class="section-max-w" />
          <LazyEditorPageStatBlocks class="section-max-w" />
          <LazyEditorPageCombatManagers class="section-max-w" />
          <LazyEditorPageTextGenerators class="section-max-w" />
          <LazyEditorPageMore class="section-max-w" />
          <!-- <EditorPageBar />
          <EditorPageGameSessionExample /> -->
        </div>
      </div>
    </div>
    <LazyEditorPageShare class="mt-9" />
    <!-- <ul class="content mt-12">
          <li>the search bar</li>
          <li>Campaign selector</li>
          <li>Player Character lists</li>
          <li>Stat Block Editor:</li>
          <ul class="content">
            <li>Monsters</li>
            <li>NPCs</li>
            <li>Items</li>
            <li>Actions, Spells</li>
            <li>Species, Classes, Backgrounds, Templates</li>
            <li>Traps</li>
          </ul>
          <li>Notes</li>
          <li>Note Groups:</li>
          <ul class="content">
            <li>Archive (OneNote)</li>
            <li>Map</li>
            <li>Timeline</li>
            <li>Game Session</li>
            <ul class="content">
              <li>Game Session templates (structures)</li>
            </ul>
          </ul>
          <li>Random text generators</li>
          <ul class="content">
            <li>Polygen</li>
            <li>AI</li>
          </ul>
          <li>Combat Manager</li>
          <li>Music Player</li>
          <li>All of this is Shareable</li>
        </ul> -->
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
// const pollQuestion = {
//   id: "6d80c61a-00e2-4c36-83d0-1f870aad8295",
//   question: {
//     question: "Which tool are you looking forward to using the most?",
//     type: "poll",
//     options: [
//       "Notes",
//       "Note Groups",
//       "Stat Block Editor v2",
//       "Combat Manager",
//       "Random Text Generators",
//     ],
//   },
// };
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    theme("colors.background.0") 0,
    theme("colors.background.100") 10em
  );
  z-index: -2;
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
