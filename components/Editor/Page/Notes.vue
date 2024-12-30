<template>
  <div>
    <h2 class="static">Notes</h2>
    <div class="notes mt-5">
      <ClientOnly fallback-tag="p">
        <MSNote rounded has-shadow class="note mt-2">
          <MonsterLayoutOneColumnA>
            <template #images="{ rules }">
              <MonsterImages :rules />
            </template>
            <template #backstory>
              <MonsterBackstory :has-rating="false" />
            </template>
          </MonsterLayoutOneColumnA>
        </MSNote>
        <template #fallback>
          <p>Loading note example...</p>
        </template>
      </ClientOnly>
      <div class="notes-description">
        <p class="static">
          Imagine OneNote or Obsidian, but crafted specifically for Dungeon
          Masters.
        </p>
        <p class="static mt-2">
          Whether it's a sprawling chapter or a quick Post-it-style reminder,
          Monstershuffler's notes adapt to your needs. They can be as richly
          detailed as a page from an official D&D book or as minimalistic as
          plain text.
        </p>
        <p class="static mt-2">
          Use them to write the lore behind your campaign, to create a new set
          of combat rules, or to prepare your game session.
        </p>
        <h3 class="static mt-6 mb-2">Key Features of Monstershuffler Notes:</h3>
        <ul class="static">
          <li>
            <em>Speed:</em> Prepare content quickly with a clean,
            distraction-free interface.
          </li>
          <li>
            <em>Markdown Support:</em> Format your text quickly and efficiently.
          </li>
          <li>
            <em>Custom Layout Tools:</em> Use shortcuts to seamlessly integrate
            layout features inspired by official D&D books, like images,
            sidenotes, stat blocks, and more.
          </li>

          <li>
            <em>Linked Notes</em>: Effortlessly create links between notes for
            quick navigation and better organization.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GeneratorCharacter } from "@/types";
import characterObject from "@/assets/other/character-example.json";

const character = ref<GeneratorCharacter>(
  // @ts-expect-error this IS a GeneratorCharacter, dammit!
  characterObject as GeneratorCharacter
);

useProvideCharacter(character);
</script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @apply gap-2;
}
@media (min-width: theme("screens.md")) {
  .note {
    max-width: 400px;
    min-width: 300px;
  }
  .notes {
    flex-direction: row;
    @apply gap-6;
  }
}
</style>
