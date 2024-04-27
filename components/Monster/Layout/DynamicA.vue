<template>
  <Transition name="fade-quick" mode="out-in">
    <MonsterLayoutOneColumnA v-if="columns === 1" />
    <MonsterLayoutTwoColumnA v-else />
  </Transition>
</template>

<script setup lang="ts">
const columns = inject("columns") as Ref<number>;
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
