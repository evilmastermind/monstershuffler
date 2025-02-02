<template>
  <div>
    <h2 class="static text-left">More!</h2>
    <p class="static text-center mt-2">You need more? We got more!</p>
    <div class="more-stuff mt-8">
      <div class="notes">
        <div class="examples">
          <EditorPageMusicPlayer />
        </div>
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
        <div class="examples">
          <DiceHistory />
        </div>
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
        <div class="examples">
          <Icon name="twemoji:notebook" class="icon-notebook" />
        </div>
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
        <div class="examples">
          <Icon name="noto:crossed-swords" class="icon-notebook" />
        </div>
        <div class="notes-description">
          <ul class="static mt-2">
            <li class="item-owl">
              <em>VTT Support</em>: integrate the combat manager with your
              favourite VTT, to quickly set up encounters and track initiative.
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
.examples {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100%;
  @apply gap-6;
}
.examples-arrow {
  font-size: 30px;
  width: 20px;
  @apply text-text-icon;
}
.more-stuff {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply gap-8;
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
    @apply mt-0;
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
</style>
