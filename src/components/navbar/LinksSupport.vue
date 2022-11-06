<template>
  <div
    class="flex-row justify-center column-gap-s1"
  >
    <LinkSupport
      name="Patreon"
      link="https://www.patreon.com/monstershuffler"
      icon="fa-patreon"
    />
    <LinkSupport
      name="Github"
      link="https://github.com/evilmastermind/monstershuffler"
      icon="fa-github"
    />
    <LinkSupport
      name="Reddit"
      link="https://www.reddit.com/r/monstershuffler/"
      icon="fa-reddit-alien"
    />
  </div>
</template>

<script setup lang="ts">
import LinkSupport from "@/components/navbar/LinkSupport.vue";

</script>

<style scoped>

</style>