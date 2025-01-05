<template>
  <div>
    <h2 class="static">Note Groups</h2>
    <div class="notegroups mt-5">
      <Carousel
        :items-to-show="1"
        wrap-around
        :autoplay
        pause-autoplay-on-hover
        class="carousel"
      >
        <Slide v-for="image in images" :key="image.title">
          <div class="slide">
            <img
              class="image carousel__item"
              :src="image.src"
              alt="image.description"
            />
            <div class="image-title pb-6">
              <p class="font-bold text-center">
                {{ image.title }}
              </p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <div class="notegroups-description">
        <p class="static">
          Note groups offer ways to structure and organize your notes:
        </p>
        <ul class="static mt-5">
          <li>
            <em>Archives:</em>
            Think of these as OneNote Notebooks: lists of notes organized into
            Notebooks and Sections (or folders). Perfect for managing lore-rich
            campaigns and rulesets.
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
          One of the core ideas behind note groups is
          <b class="font-bold">simplicity</b>: they're designed to be quick and
          easy to set up, with no tedious forms to fill out or unnecessary
          details to add.
          <b class="font-bold">The focus is on building content</b>, allowing
          you to add the details you need directly within your notes.
        </p>
        <p class="static mt-5">
          Each group can also contain other groups or reference notes from
          different groups, and any changes made to a note are reflected
          everywhere it's used, giving you complete freedom to organize your
          content however you like.
        </p>
      </div>
    </div>
    <!-- <EditorPageGameSessionExample class="mt-12" /> -->
  </div>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

const autoplay = ref(5000);

const images = [
  {
    title: "Archives",
    src: "/images/presentation/archives.webp",
    description:
      "An image depicting a library of notes related to an adventure or campaign.",
  },
  {
    title: "Maps (concept image)",
    src: "/images/presentation/maps.webp",
    description:
      "An image of a map with markers and labels, showing a world or dungeon.",
  },
  {
    title: "Timelines (concept image)",
    src: "/images/presentation/timelines.webp",
    description:
      "An image of a timeline with branching paths, showing the steps of an adventure.",
  },
  {
    title: "Game Sessions",
    src: "/images/presentation/game-sessions.webp",
    description:
      "An image of a game session note, with lists of notes on its sides.",
  },
];
</script>

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
  max-width: 400px;
  @apply rounded-2xl border border-inset-300;
}
.slide {
  font-family: "MrsEavesSmallCaps", serif;
  letter-spacing: 0.05em;
  @apply bg-text text-text-inverse;
}
.image {
  display: block;
  width: 100%;
  aspect-ratio: 10 / 11;
  mask-image: url("/images/masks/bottom-2.webp");
  mask-size: 200% auto;
  mask-repeat: repeat-x;
  mask-position: bottom center;
}
@media (min-width: theme("screens.md")) {
  .notegroups {
    flex-direction: row;
    @apply gap-6;
  }
}
</style>
<style>
@import "@/assets/css/carousel.css";
</style>
