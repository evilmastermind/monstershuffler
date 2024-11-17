<template>
  <div class="intro">
    <div class="intro-logo-container">
      <template v-for="(emoji, index) in currentEmojis" :key="emoji.id">
        <div class="intro-card-placeholder">
          <div v-for="n in 4" :key="n" class="intro-card-skeleton" />
        </div>
        <Transition name="fade-scroll-slow" appear>
          <div
            class="intro-card"
            :class="emoji.background"
            :style="{
              transitionDelay: `${0.15 * index}s`,
              transitionProperty: 'opacity, transform',
            }"
          >
            <Icon class="intro-icon" :class="emoji.color" :name="emoji.name" />
          </div>
        </Transition>
      </template>
    </div>
    <div class="intro-text text-center mt-6">
      <Transition name="title" appear>
        <h1 class="static custom-title gradient-title">The NPC Improvisator</h1>
      </Transition>
      <p class="static max-width mt-6">
        Create unforgettable NPCs with unique personalities and appearances.
      </p>
      <p class="static max-width mt-1">
        Effortlessly improvise NPCs on the fly, or be inspired by AI-generated
        adventures to add new side quests in your campaign.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const boolean = ref(false);

type Emoji = {
  id?: number;
  name: string;
  color: string;
  background: string;
};

const emojis: Emoji[] = [
  {
    name: "mdi:emoticon-excited",
    color: "text-good-500",
    background: "bg-background-good",
  },
  {
    name: "mdi:emoticon-wink",
    color: "text-good-500",
    background: "bg-background-good",
  },
  {
    name: "mdi:emoticon-happy",
    color: "text-good-500",
    background: "bg-background-good",
  },
  {
    name: "mdi:emoticon-sad",
    color: "text-neutral-500",
    background: "bg-background-neutral",
  },
  {
    name: "mdi:emoticon-neutral",
    color: "text-neutral-500",
    background: "bg-background-neutral",
  },
  {
    name: "mdi:emoticon-cool",
    color: "text-neutral-500",
    background: "bg-background-neutral",
  },
  {
    name: "mdi:emoticon-angry",
    color: "text-evil-500",
    background: "bg-background-evil",
  },
  {
    name: "mdi:emoticon-devil",
    color: "text-evil-500",
    background: "bg-background-evil",
  },
  {
    name: "mdi:emoticon",
    color: "text-evil-500",
    background: "bg-background-evil",
  },
];

const currentEmojis = ref<Emoji[]>([
  {
    name: "mdi:emoticon-excited",
    color: "text-good-500",
    background: "bg-background-good",
    id: 0,
  },
  {
    name: "mdi:emoticon-sad",
    color: "text-neutral-500",
    background: "bg-background-neutral",
    id: 1,
  },
  {
    name: "mdi:emoticon-neutral",
    color: "text-neutral-500",
    background: "bg-background-neutral",
    id: 2,
  },
  {
    name: "mdi:emoticon-angry",
    color: "text-evil-500",
    background: "bg-background-evil",
    id: 3,
  },
]);
let id = 4;

const randomizeEmojis = setInterval(() => {
  const newEmojis: Emoji[] = [];
  for (let i = 0; i < 4; i++) {
    const newEmoji: Emoji = { ...emojis[random(0, 8)] };
    newEmoji.id = ++id;
    newEmojis.push(newEmoji);
  }
  currentEmojis.value = newEmojis;
}, 3000);

onUnmounted(() => {
  clearInterval(randomizeEmojis);
});
</script>

<style scoped>
.intro {
  position: relative;
  display: grid;
  place-items: center;
}
.intro-text {
  position: relative;
  z-index: 1;
}
.intro-logo-container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  justify-content: center;
  align-content: center;
  @apply gap-1;
}
.intro-card-placeholder {
  position: absolute;
  display: grid;
  grid-template-columns: repeat(2, min-content);
  justify-content: center;
  align-content: center;
  @apply gap-1;
}
.intro-card-skeleton {
  width: 40px;
  aspect-ratio: 1;
  @apply rounded bg-inset-300;
}
.intro-card {
  display: grid;
  place-items: center;
  width: 40px;
  aspect-ratio: 1;
  z-index: 1;
  @apply rounded;
}
.intro-icon {
  font-size: 2em;
}
</style>
