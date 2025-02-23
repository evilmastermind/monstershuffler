<template>
  <div>
    <h2 class="static text-left">More!</h2>
    <p class="text-center mt-2 italic text-sm">You need more? We got more!</p>
    <!-- <PresentationCardList image="/images/backgrounds/druid.webp">
      <ul class="card-list">
        <PresentationCard icon="mdi:music">
          <template #title>Music player</template>
          <template #default>
            <p class="static">
              Create playlists to set the mood for your game. Upload tracks and
              add them to notes, monsters, combats, or player characters. A
              playlist at the bottom of your screen will automatically populate
              with the tracks found in your currently opened notes.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="game-icons:dice-twenty-faces-twenty">
          <template #title>Dice roller</template>
          <template #default>
            <p class="static">
              Roll dice using a simple interface and keep track of all your
              rolls, including detailed damage types and modifiers.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="game-icons:notebook">
          <template #title>Players' notebook</template>
          <template #default>
            <p class="static">
              Share content with your players, allow them to write their own
              notes and add details to their character.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="emojione-monotone:owl">
          <template #title>VTT Support</template>
          <template #default>
            <p class="static">
              Integrate the combat manager with your favourite VTT, to quickly
              set up encounters and track initiative.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="material-symbols-light:cloud-download-rounded">
          <template #title>Downloadable</template>
          <template #default>
            <p class="static">
              Your content is yours. You can download it anytime and use it
              locally with the software of your choice.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="ri:open-source-fill">
          <template #title>Open Source</template>
          <template #default>
            <p class="static">
              Many tools, including the engine behind dynamic stat blocks, will
              be open source and freely available. APIs will also be provided to
              retrieve or generate content.
            </p>
          </template>
        </PresentationCard>
      </ul>
    </PresentationCardList> -->
    <div class="more-stuff">
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-music">
              <em>Music player</em>: Create playlists to set the mood for your
              game. Upload tracks and add them to notes, monsters, combats, or
              player characters. A playlist at the bottom of your screen will
              automatically populate with the tracks found in your currently
              opened notes.
            </li>
          </ul>
        </div>
      </div>
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-dice">
              <em>Dice roller</em>: Roll dice using a simple interface and keep
              track of all your rolls, including detailed damage types and
              modifiers.
            </li>
          </ul>
        </div>
      </div>
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-players">
              <em>Players' notebook</em>: Share content with your players, allow
              them to write their own notes and add details to their character.
            </li>
          </ul>
        </div>
      </div>
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-owl">
              <em>VTT Support</em>: integrate the combat manager with your
              favourite VTT, to quickly set up encounters and track initiative.
            </li>
          </ul>
        </div>
      </div>
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-floppy">
              <em>Downloadable</em>: Your content is yours. You can download it
              anytime and use it locally with the software of your choice.
            </li>
          </ul>
        </div>
      </div>
      <div class="notes">
        <div class="example"></div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-open">
              <em>Open Source</em>: Many tools, including the engine behind
              dynamic stat blocks, will be open source and freely available.
              APIs will also be provided to retrieve or generate content.
            </li>
          </ul>
        </div>
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
  max-width: 500px;
  @apply mx-auto rounded border border-inset-300;
}
.notes-description {
  max-width: 500px;
}
.example {
  display: none;
  place-items: center;
  width: 3rem;
  aspect-ratio: 1;
  @apply rounded-xl border-2 border-text-icon text-text bg-inset-500 shadow;
}
.example-icon {
  font-size: 2rem;
}
.more-stuff {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply gap-6 mt-6;
}
@media (min-width: theme("screens.md")) {
  .notes {
    flex-direction: row;
    @apply gap-8;
  }
  .note {
    max-width: 370px;
    min-width: 370px;
  }
  .notes-description {
    max-width: 600px;
    @apply mt-0;
  }
  .more-stuff {
    @apply gap-6 mt-2;
  }
}
.icon-notebook {
  font-size: 50px;
}
.item-music::before {
  content: "🎶";
}
.item-dice::before {
  content: "🎲";
}
.item-players::before {
  content: "👥";
}
.item-owl::before {
  content: "🦉";
}
.item-floppy::before {
  content: "💾";
}
.item-open::before {
  content: "💚";
}
</style>
