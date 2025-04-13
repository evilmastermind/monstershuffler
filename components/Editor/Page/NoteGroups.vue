<template>
  <div>
    <h2 class="static">Note Groups</h2>
    <div class="notegroups mt-6">
      <div class="carousel">
        <div
          v-for="(image, index) in images"
          :key="image.title"
          class="relative"
        >
          <Transition name="auto-slide-right" mode="out-in">
            <div v-if="index === currentImageIndex" class="slide">
              <div class="image-container">
                <img class="image" :src="image.src" alt="image.description" />
              </div>
              <div class="image-title">
                <p class="font-bold text-center">
                  {{ image.title }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div class="notegroups-description">
        <p class="static">
          Note groups offer ways to structure and organize your notes:
        </p>
        <ul class="static mt-5">
          <li class="list-archives">
            <em>Archives:</em>
            Think of these as OneNote Notebooks (or Obsidian valuts): lists of
            notes organized into Notebooks and Sections (or folders). Perfect
            for managing lore-rich campaigns and rulesets.
          </li>
          <li class="list-maps">
            <em>Maps:</em>
            Interactive images where you can add markers and labels. Each marker
            or label links to a note or even another note group. Use maps to
            define worlds, locations, and dungeons with ease.
          </li>
          <li class="list-timelines">
            <em>Timelines:</em>
            Plan the steps of a campaign or adventure with visual timelines. Add
            branching paths for multiple choices or track the inevitable chaos
            when your players derail your plans.
          </li>
          <li class="list-sessions">
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
        <EditorPageAction>
          A prototype "Game Session" note group is visible on the
          <a class="static" href="/dm-screen">DM Screen example page</a>.
        </EditorPageAction>
      </div>
    </div>
    <!-- <EditorPageGameSessionExample class="mt-12" /> -->
  </div>
</template>

<script setup lang="ts">
const currentImageIndex = ref(0);
let interval: NodeJS.Timeout | undefined;

const currentImage = computed(() => images[currentImageIndex.value]);

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

onMounted(() => {
  interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.notegroups {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
  @apply gap-2;
}
.carousel {
  width: 100%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  @apply border border-inset-500 rounded-xl shadow-lg mx-4;
}
.slide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  font-family: "LibreBaskerville", sans-serif;
  font-size: 1.1rem;
  overflow: hidden;
  background-image: url("/images/backgrounds/druid.webp");
  @apply text-stone-50;
}
.image-container {
  height: 440px;
}
.image {
  width: 100%;
  height: 440px;
  object-fit: cover;
  mask-image: url("/images/masks/bottom-1.webp");
  mask-size: 200% auto;
  mask-repeat: repeat-x;
  mask-position: bottom center;
}
.image-title {
  @apply pb-5;
}
.notegroups-description {
  max-width: 500px;
  @apply mt-6;
}

@media (min-width: theme("screens.md")) {
  .notegroups {
    flex-direction: row;
    @apply gap-8;
  }
  .notegroups-description {
    @apply mt-0;
  }
  .carousel {
    width: 400px;
  }
  .image {
    width: 400px;
  }
}
.list-archives::before {
  content: "📚";
}
.list-maps::before {
  content: "🌎";
}
.list-timelines::before {
  content: "⏳️";
}
.list-sessions::before {
  content: "🎲";
}
</style>
