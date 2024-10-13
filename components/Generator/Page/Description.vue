<template>
  <div class="description">
    <h2 class="custom-title-h2">Designed for maximum choice</h2>
    <div class="card-list-container">
      <div class="card-list-background" />
      <div class="lg-max">
        <ul class="card-list py-8 mx-4">
          <li class="card">
            <Icon
              aria-hidden
              class="card-icon"
              name="streamline:input-box-solid"
            />
            <div>
              <p class="card-text">Create the right NPC for your story:</p>
              <ul>
                <li>
                  <b class="content">Form mode</b> gives you more control over
                  your NPC creation, ideal for game session preparation
                </li>
                <li>
                  <b class="content">Prompt mode</b> lets you quickly type your
                  needs for an improvised NPC on the fly
                </li>
              </ul>
            </div>
          </li>
          <li class="card">
            <Icon aria-hidden class="card-icon" name="ph:squares-four-fill" />
            <div>
              <p class="card-text">
                Choose one of the four generated NPCs. Consider their
                background, character hook, and personality, as these will help
                <b>shape an adventure around them</b>.
              </p>
              <p class="card-text">
                Feel free to use the adventure for inspiration or ignore it
                completely!
              </p>
            </div>
          </li>
          <li class="card">
            <Icon aria-hidden class="card-icon" name="fa-solid:edit" />
            <div>
              <p class="card-text">Make a few adjustments:</p>
              <ul>
                <li>
                  <b>Increase the NPC's Challenge Rating</b> to unlock new
                  powerful abilities
                </li>
                <li><s>Edit the Stat Block</s> (coming soon!)</li>
                <li>
                  Modify the adventure using available Markdown shortcuts.
                </li>
                <li>Import an image and change the NPC sheet layout</li>
              </ul>
            </div>
          </li>
          <li class="card">
            <Icon aria-hidden class="card-icon" name="fa6-solid:file-export" />
            <div>
              <p class="card-text">
                Export the adventure or Stat Block in various formats, with more
                options coming soon.
              </p>
              <p class="card-text">
                If you're not satisfied with the NPC or adventure, go back and
                <b>generate new ones!</b>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <h2 class="custom-title-h2 mt-8">
      Made to <span class="text-evil-700">level up</span> your Dungeon Master
      skills
    </h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-title-h1 {
}
.custom-title-small {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  letter-spacing: -0.09em;
  font-size: 1.5rem;
  @apply text-evil-700;
}
.custom-title {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 6rem;
  letter-spacing: -0.09em;
  line-height: 0.7em;
}
.custom-title-h2 {
  font-family: "OpenSans", sans-serif;
  font-weight: 800;
  font-size: 2rem;
  letter-spacing: -0.09em;
  text-align: center;
}
.custom-subtitle {
  font-family: "OpenSans", sans-serif;
  font-weight: 300;
  font-size: 1.25rem;
  text-align: center;
}
.card-list {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  z-index: 1;
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
/* ---------------------------------- */
.description {
  clear: both;
}
.card-list-container {
  position: relative;
}
.card-list-background {
  position: absolute;
  inset: 0;
  background-image: url("/images/backgrounds/druid.webp");
  background-position: center;
  background-size: cover;
  mask-image: url("/images/masks/top-2.png"), url("/images/masks/bottom-2.webp");
  mask-composite: intersect;
  mask-repeat: repeat-x;
  mask-position: top, bottom;
}
</style>
