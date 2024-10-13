<template>
  <div class="intro">
    <div class="intro-text text-center">
      <Transiton name="title" appear>
        <h1 class="custom-title-h1">
          <span class="custom-title-small">the</span
          ><span class="custom-title npc"><span class="n">N</span>PC</span>
          <span class="custom-title-small ml-2">(& adventure)</span>
        </h1>
      </Transiton>
      <Transiton name="title" appear>
        <h1 class="custom-title-h1">
          <span class="custom-title generator"
            >Gen<span class="e">e</span>rator</span
          >
        </h1>
      </Transiton>
      <p class="custom-subtitle mt-7">
        Create NPCs with unique personalities and appearances.
      </p>
      <p class="custom-subtitle mt-2">
        Be inspired by an AI-generated adventure built around each NPC,<br
          class="br-subtitle"
        />and adjust their Challenge Rating to fit your own stories.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const boolean = ref(false);
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
.custom-title-h1 {
  background: linear-gradient(theme("colors.text"), theme("colors.text-evil"));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.custom-title-small {
  font-family: "OpenSans", sans-serif;
  font-weight: 700;
  letter-spacing: -0.09em;
  font-size: 1rem;
  @apply text-evil-700;
}
.custom-title {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 4rem;
  letter-spacing: -0.09em;
  line-height: 0.7em;
}
.custom-subtitle {
  font-family: "OpenSans", sans-serif;
  font-weight: 300;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}
.br-subtitle {
  display: none;
}
@media (min-width: theme("screens.sm")) {
  .br-subtitle {
    display: block;
  }
}
@media (min-width: theme("screens.md")) {
  .custom-title {
    font-size: 6rem;
  }
  .custom-title-small {
    font-size: 1.5rem;
  }
  .custom-subtitle {
    letter-spacing: 0;
    font-size: 1.25rem;
  }
}
.custom-title-h2 {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: -0.09em;
  text-align: center;
}
.card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: theme("screens.md")) {
  .card-list {
    grid-template-columns: 1fr 1fr;
  }
}
.card {
  min-height: 100%;
  border-radius: theme("spacing.1");
  background-color: theme("colors.background.200");
  border-top: 1px solid theme("colors.background.500");
  border-left: 1px solid theme("colors.background.500");
  border-right: 1px solid theme("colors.background.500");
  border-bottom: 1px solid theme("colors.background.400");
  color: theme("colors.text");
  transition: outline 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20%;
  @apply bg-background-100 p-6 rounded-lg outline-transparent shadow-sm;
}

.card-icon {
  min-width: 2.5rem;
  max-width: 2.5rem;
  font-size: 2.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
  @apply text-evil-700;
}
.card:hover .card-icon {
  transform: scale(1.1);
  @apply text-evil-500;
}
.card-text {
  letter-spacing: 0.05em;
  @apply text-sm;
}
/* make consecutive p elements have a margin-top */
.card-text + .card-text {
  @apply mt-2;
}
.card ul {
  list-style-type: disc;
  font-size: inherit;
  padding-left: 1rem;
  letter-spacing: 0.05em;
  @apply text-sm;
}
.card ul li {
  @apply mt-2;
}
.card ul li::marker {
  @apply text-evil-700;
}
</style>
