<template>
  <Transition name="fade-quick" mode="out-in">
    <MonsterLayoutNoImageOneColumn v-if="columns === 1" />
    <MonsterLayoutNoImageTwoColumn v-else />
  </Transition>
</template>

<script setup lang="ts">
const e = defineEmits(["load"]);
const columns = inject("columns") as Ref<number>;

onMounted(() => {
  e("load");
});
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
