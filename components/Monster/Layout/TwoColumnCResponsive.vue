<template>
  <Transition name="fade-quick" mode="out-in">
    <MonsterLayoutTwoColumnC v-if="width >= 800" />
    <MonsterLayoutTwoColumnA v-else />
  </Transition>
</template>

<script setup lang="ts">
const { width } = useScreen();
</script>

<style scoped>
/* .story {
  quotes: "“" "”" "‘" "’";
}
.story::before {
  content: open-quote;
  font-size: 3rem;
}
.story::after {
  content: close-quote;
  font-family: serif;
  font-size: 3rem;
}
*/
</style>
