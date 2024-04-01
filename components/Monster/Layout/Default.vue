<template>
  <div class="layout">
    <div class="stats">
      <MonsterStatBlock />
      <div class="card my-4">
        <MonsterSheetCard>
          <MonsterRoleplayStats />
        </MonsterSheetCard>
      </div>
    </div>
    <MonsterBackstory class="story" />
  </div>
</template>

<script setup lang="ts">
import type { Character, StatStringArrayWithName } from "@/types";
const character = inject("character") as Ref<Character>;

const pieces = computed(() => {
  let piecesCount = 0;
  piecesCount += getActionPiecesCount(
    character.value?.statistics?.actions || []
  );
  piecesCount += getActionPiecesCount(
    character.value?.statistics?.bonusActions || []
  );
  piecesCount += getActionPiecesCount(
    character.value?.statistics?.reactions || []
  );
  piecesCount += getActionPiecesCount(
    character.value?.statistics?.legendaryActions || []
  );
  return piecesCount;
});

function getActionPiecesCount(actions: StatStringArrayWithName[]) {
  let piecesCount = 0;
  actions.forEach((action) => {
    piecesCount += action.array.length;
  });
  return piecesCount;
}

onMounted(() => {
  console.log("pieces: ", pieces.value);
});
</script>

<style scoped>
/**
.layout {
  display: grid;
  grid-template-areas:
    "stats"
    "text";
  padding: 6%;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  justify-content: flex-start;
  align-items: flex-start;
  @apply gap-6;
}
@media (min-width: theme("screens.md")) {
  .layout {
    display: grid;
    grid-template-areas:
      "stats text"
      "stats text";
  }
}
.card {
  grid-area: card;
}
.text {
  grid-area: text;
  display: flex;
  flex-direction: column;
  @apply gap-6;
}
*/

/*
.layout {
  padding: 6%;
  column-count: 2;
  column-width: 400px;
  column-gap: 2rem;
}
*/

.layout {
  padding: 6%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.card {
  display: inline-block;
  width: 100%;
}

.stats,
.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}
</style>
