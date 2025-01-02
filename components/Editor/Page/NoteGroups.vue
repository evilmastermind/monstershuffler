<template>
  <div>
    <h2 class="static">Note Groups</h2>
    <div class="notegroups mt-5">
      <div class="carousel rounded shadow">
        <image
          class="carousel-image"
          src="/images/presentation/archives.webp"
          alt="Maps help you group notes related to a specific zone, world or dungeon."
        />
      </div>
      <div class="notegroups-description">
        <p class="static">
          Note groups offer ways to structure and organize your notes:
        </p>
        <ul class="static mt-5">
          <li>
            <em>Archive:</em>
            Think of these as OneNote Notebooks: lists of notes organized into
            Notebooks and Sections. Perfect for managing lore-rich campaigns and
            rulesets.
          </li>
          <li>
            <em>Maps:</em>
            Interactive images where you can add markers and labels. Each marker
            or label links to a note or even another note group. Use maps to
            define worlds, locations, and dungeons with ease.
          </li>
          <li>
            <em>Timelines:</em>
            Plan the steps of a campaign or adventure with visual timelines. Add
            branching paths for multiple choices or track the inevitable chaos
            when your players derail your plans.
          </li>
          <li>
            <em>Game Sessions:</em>
            Inspired by
            <a
              class="static"
              href="https://shop.slyflourish.com/products/return-of-the-lazy-dungeon-master"
              >The Lazy Dungeon Master by Michael E. Shea</a
            >, this note group is built for practical gameplay. Create
            customizable lists of notes for quick links (scenes, locations,
            NPCs, etc.), and use the central outline note (or chain of notes) to
            guide your session or take notes mid-game.
          </li>
        </ul>
        <p class="static mt-5">
          Each group can also contain other groups or reference notes from
          different groups, and any changes made to a note are reflected
          everywhere it's used, giving you complete freedom to organize your
          content however you like.
        </p>
      </div>
    </div>
    <EditorPageGameSessionExample class="mt-12" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.notegroups {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @apply gap-2;
}
.carousel {
  height: min-content;
  overflow: hidden;
}
.carousel {
  min-width: 400px;
  min-height: min-content;
}
@media (min-width: theme("screens.md")) {
  .notegroups {
    flex-direction: row;
    @apply gap-6;
  }
}
</style>
