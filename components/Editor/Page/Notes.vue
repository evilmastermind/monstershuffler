<template>
  <div>
    <h2 class="static text-left">Notes</h2>
    <div class="notes mt-6">
      <ClientOnly fallback-tag="p">
        <MSNote class="note">
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
        <h3 class="static mt-6 mb-2">Key Features:</h3>
        <ul class="static">
          <li class="item-speed">
            <em>Speed:</em> Prepare content quickly with a clean,
            distraction-free interface.
          </li>
          <li class="item-custom">
            <em>Custom Layout Tools:</em> Use shortcuts to seamlessly integrate
            layout features inspired by official D&D books, like images,
            sidenotes, stat blocks, and more.
          </li>

          <li class="item-linked">
            <em>Linked Notes</em>: Effortlessly create links between notes for
            quick navigation and better organization.
          </li>
          <!-- <li class="item-cr">
            <em>Special Variables</em>: Use variables to make values adjust
            automatically based on the Challenge Rating of the adventure you're
            writing.
          </li> -->
        </ul>
        <p class="static mt-6">
          <EditorPageAction>
            The <a class="static" href="/monsters/generator">NPC Generator</a>'s
            backstory sheet is an editable note. Go ahead and try it out!
          </EditorPageAction>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply gap-2;
}
.note {
  width: 100%;
  max-width: 400px;
  @apply mx-auto border border-inset-500 rounded-xl shadow-lg;
}
.notes-description {
  max-width: 500px;
  @apply mt-6;
}
@media (min-width: theme("screens.md")) {
  .notes {
    flex-direction: row;
    @apply gap-8;
  }
  .note {
    max-width: 400px;
    min-width: 400px;
  }
  .notes-description {
    @apply mt-0;
  }
}
.item-speed::before {
  content: "⚡️";
}
.item-custom::before {
  content: "📖";
}
.item-linked::before {
  content: "🔗";
}
.item-cr::before {
  content: "📈";
}
</style>
