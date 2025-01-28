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
          <EditorPageNotes class="section-max-w" />
          <EditorPageNoteGroups class="section-max-w" />
          <EditorPageStatBlocks class="section-max-w" />
          <EditorPageCombatManagers class="section-max-w" />
          <EditorPageTextGenerators class="section-max-w" />
          <EditorPageMore class="section-max-w" />
          <!-- <EditorPageBar />
          <EditorPageGameSessionExample /> -->
        </div>
      </div>
    </div>
    <EditorPageShare class="mt-9" />
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
  </div>
  <PresentationFooter />
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
