<template>
  <div class="flex items-center">
    <UTooltip text="Reddit">
      <UButton
        to="https://reddit.com/r/monstershuffler"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-xxx-reddit"
        target="_blank"
        square
        rel="noopener noreferrer"
      />
    </UTooltip>
    <UTooltip text="GitHub">
      <UButton
        to="https://github.com/evilmastermind/monstershuffler"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-xxx-github"
        target="_blank"
        square
        rel="noopener noreferrer"
      />
    </UTooltip>
    <UTooltip text="Patreon">
      <UButton
        to="https://patreon.com/monstershuffler"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-xxx-patreon"
        target="_blank"
        square
        rel="noopener noreferrer"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
