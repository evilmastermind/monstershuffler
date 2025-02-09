<template>
  <div>
    <div class="questions">
      <p class="question">
        As a Dungeon Master, do you often wish the content you incorporate into
        your adventures was <b>editable and interactive</b> instead of being
        stuck in a static PDF?
      </p>
      <p class="question">
        Do you wish you could create adventure content
        <b>in a reusable, shareable format</b> that works for player groups of
        different levels?
      </p>
    </div>
    <div class="answer mt-5">
      <p>I'm building a set of tools that give you exactly that!</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.questions {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  @apply gap-4;
}
.answer {
  text-align: center;
  @apply text-xl;
}
.question {
  text-wrap: pretty;
  @apply text-xl;
}
</style>
