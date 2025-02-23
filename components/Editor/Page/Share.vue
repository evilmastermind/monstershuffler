<template>
  <PresentationCardList
    image="/images/backgrounds/underdarker.webp"
    :mask-number="2"
  >
    <div class="share lg-max px-2">
      <div
        :key="currentCreation.content.name"
        class="share-example"
        :class="[background]"
      >
        <Transition name="fade" mode="out-in" appear>
          <MSNote>
            <div
              class="share-image-container"
              :style="{
                backgroundImage: `url('${currentCreation.content.image}'`,
              }"
            ></div>
            <div class="share-example-text mx-4 mb-4">
              <h3 class="share-example-title static">
                {{ currentCreation.content.name }}
              </h3>
              <p class="share-example-description">
                “{{ currentCreation.content.description }}”
              </p>
              <div class="share-example-icons mt-4">
                <div class="share-icon-container">
                  <Icon name="mdi:comment-outline" class="share-icon" />
                  <span class="sr-only">Comments:</span>
                  <span class="share-icon-text">
                    {{ currentCreation.social.comments }}
                  </span>
                </div>
                <div class="share-icon-container">
                  <Icon name="mdi:heart-outline" class="share-icon" />
                  <span class="sr-only">Likes:</span>
                  <span class="share-icon-text">
                    {{ currentCreation.social.likes }}
                  </span>
                </div>
                <div class="share-icon-container">
                  <Icon name="tabler:copy" class="share-icon" />
                  <span class="sr-only">Copied:</span>
                  <span class="share-icon-text">
                    {{ currentCreation.social.copied }}
                  </span>
                </div>
              </div>
              <div class="share-example-author mt-4">
                <div
                  class="share-author-avatar"
                  :style="{
                    backgroundImage: `url('${currentCreation.user.avatar}'`,
                  }"
                />
                <div class="share-author-text">
                  <span class="share-author">
                    {{ currentCreation.user.name }}
                  </span>
                  <!-- <span class="share-author-id">#332</span> -->
                </div>
              </div>
            </div>
          </MSNote>
        </Transition>
      </div>
      <div class="share-description">
        <h1 class="static custom-title text-center">Share your creations</h1>
        <p class="share-description-text mt-4">
          Publish monsters, notes, adventures and whole campaigns!
        </p>
        <p class="share-description-text mt-2">
          Build your adventures with a library of premade content created by
          your peers.
        </p>
      </div>
    </div>
  </PresentationCardList>
</template>

<script setup lang="ts">
const ui = useUiStore();

const creations = [
  {
    user: {
      name: "Charles Pennington",
      avatar: "/images/presentation/author3.webp",
    },
    social: {
      comments: 32,
      likes: 51,
      copied: 187,
    },
    content: {
      name: "Trouble at Io'Calioth",
      description: "An adventure for 4-6 players set in the world of Iomandra.",
      image: "/images/presentation/iomandra.webp",
    },
  },
  {
    user: {
      name: "SamDM",
      avatar: "/images/presentation/author.webp",
    },
    social: {
      comments: 12,
      likes: 42,
      copied: 23,
    },
    content: {
      name: "Hadal Tarrasque",
      description:
        "Lurking in the ocean's depths, the Hadal Tarrasque is a whispered myth.",
      image: "/images/presentation/deep-tarrasque.webp",
    },
  },
  {
    user: {
      name: "Moss",
      avatar: "/images/presentation/author4.webp",
    },
    social: {
      comments: 2,
      likes: 6,
      copied: 7,
    },
    content: {
      name: "Operation B.R.",
      description:
        "The discovery of a painting thought to be lost for centuries leads to a deadly underground dungeon.",
      image: "/images/presentation/dungeon.webp",
    },
  },
  {
    user: {
      name: "Tr0ll3r99",
      avatar: "/images/presentation/author2.webp",
    },
    social: {
      comments: 56,
      likes: 12,
      copied: 20,
    },
    content: {
      name: "Demon Queen Yomammu",
      description:
        "They say Yomammu is so fat she needs two portals to enter the material plane.",
      image: "/images/presentation/yomammu.webp",
    },
  },
];

const currentCreationIndex = ref(0);
const interval = ref<NodeJS.Timeout>();

const currentCreation = computed(() => creations[currentCreationIndex.value]);

const background = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return "background-light";
    case "dark":
      return "background-dark";
  }
});

onMounted(() => {
  interval.value = setInterval(() => {
    currentCreationIndex.value =
      (currentCreationIndex.value + 1) % creations.length;
  }, 7000);
});
</script>

<style scoped>
.share {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @apply gap-8;
}
.share-example {
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  @apply rounded-lg shadow-2xl mt-9;
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
  background-size: cover;
  mask-image: url("/images/masks/bottom-2.webp");
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
.share-example-author {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-1 text-text-3;
}
.share-author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #f0f0f0;
  background-size: cover;
  @apply border border-inset-600;
}
.share-author {
}
.share-author-id {
  font-size: 0.8em;
}
.static-custom-title {
  color: hsl(46, 47%, 97%);
}
/* Description */
.share-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-shadow: 2px 2px 0px hsl(0, 0%, 0%), 1px 1px 0px hsl(0, 0%, 0%),
    0px 0px 20px hsl(0, 0%, 0%);
  color: hsl(46, 47%, 97%);
  @apply mb-9;
}
.share-description-text {
  font-family: "OpenSans", sans-serif;
  font-size: 1.1rem;
  text-align: center;
  text-wrap: balance;
  max-width: 600px;
}

@media (min-width: theme("screens.md")) {
  .share {
    flex-direction: row;
    align-items: center;
    @apply gap-8;
  }
  .share-example {
    @apply mb-9;
  }
  .share-description {
    @apply mb-0;
  }
}
</style>
