<template>
  <div class="intro">
    <div class="intro-text text-center">
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
    <div class="intro-logo-container mt-6">
      <template v-for="(emoji, index) in currentEmojis" :key="emoji.id">
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
    name: "mdi:emoticon-angry",
    color: "text-evil-500",
    background: "bg-background-evil",
  },
]);
let id = 0;

const randomizeEmojis = setInterval(() => {
  currentEmojis.value = [];
  for (let i = 0; i < 4; i++) {
    currentEmojis.value[i] = emojis[random(0, 8)];
    id = id + 1;
    currentEmojis.value[i].id = id;
  }
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
.intro-card {
  display: grid;
  place-items: center;
  width: 40px;
  aspect-ratio: 1;
  @apply rounded border border-inset-400;
}
.intro-icon {
  font-size: 2em;
}
</style>
