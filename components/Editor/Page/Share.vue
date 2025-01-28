<template>
  <PresentationCardList image="/images/backgrounds/barracks2.webp">
    <div class="share lg-max px-2">
      <div class="share-example my-8" :class="[background]">
        <MSNote>
          <div class="share-image-container">
            <img
              class="share-image"
              src="/images/presentation/yomammu.webp"
              alt="Share Example"
            />
          </div>
          <div class="share-example-text mx-4 mb-4">
            <h3 class="share-example-title static">Demon Queen Yomammu</h3>
            <p class="share-example-description">
              “They say Yomammu is so fat she needs two portals to enter the
              material plane.”
            </p>
            <div class="share-example-icons mt-4">
              <div
                v-for="icon in exampleIcons"
                :key="icon.name"
                class="share-icon-container"
              >
                <Icon :name="icon.name" class="share-icon" />
                <span class="sr-only">{{ icon.alt }}:</span>
                <span class="share-icon-text">{{ icon.number }}</span>
              </div>
            </div>
          </div>
        </MSNote>
      </div>
      <div class="share-description">
        <h1 class="static custom-title text-white">Share your creations</h1>
        <p class="share-description-text">
          Publish monsters, notes, adventures and whole campaigns!
        </p>
        <p class="share-description-text">The more you share the</p>
      </div>
    </div>
  </PresentationCardList>
</template>

<script setup lang="ts">
const ui = useUiStore();

const exampleIcons = [
  {
    name: "mdi:comment-outline",
    alt: "Comments",
    number: 12,
  },
  {
    name: "mdi:heart-outline",
    alt: "Likes",
    number: 42,
  },
  {
    name: "tabler:copy",
    alt: "Copied",
    number: 23,
  },
];

const background = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return "background-light";
    case "dark":
      return "background-dark";
  }
});
</script>

<style scoped>
.share {
  position: relative;
  display: flex;
  flex-direction: row;
  z-index: 2;
  @apply gap-8;
}
.share-example {
  max-width: 400px;
  overflow: hidden;
  @apply rounded-lg shadow-2xl;
}
.share-example-title {
  @apply text-center text-text-evil;
}
.share-example-description {
  font-family: "LibreBaskerville", serif;
  font-style: italic;
  @apply text-center text-sm;
}
.share-image-container {
  height: 350px;
  overflow: hidden;
  mask-image: url("/images/masks/bottom-1.webp");
  mask-repeat: repeat-x;
  mask-position: bottom;
}
.share-image {
  object-fit: cover;
}
.share-example-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-6;
}
.share-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-1 text-text-3;
}
.share-icon {
  font-size: 1.4em;
  width: 1.4em;
}
.share-icon-text {
  font-size: 1em;
}
/* Description */
.share-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @apply text-white;
}
</style>
