<template>
  <div class="me">
    <h3 class="static text-center">About me</h3>
    <div class="me-content">
      <div class="avatar" />
      <div>
        Hi, I'm Ismael, a web developer and Dungeon Master for more than 10
        years. In 2022, I created
        <a class="content" href="monstershuffler.com">Monstershuffler</a>, a
        stat block editor for building D&D monsters with dynamic challenge
        ratings. Now, I'm expanding it into a full suite of tools to help
        Dungeon Masters create, organize, and share their worlds.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.me {
  max-width: 800px;
}
.avatar {
  min-width: 100px;
  min-height: 100px;
  max-width: 100px;
  max-height: 100px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: url("/images/presentation/me.webp");
  background-size: cover;
  @apply border-2 border-background-600;
}
.me-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @apply gap-5 pt-4;
}
@media (min-width: theme("screens.sm")) {
  .me-content {
    flex-direction: row;
    @apply pt-4;
  }
}
</style>
