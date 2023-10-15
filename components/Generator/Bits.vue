<template>
  <div class="bits p-2">
    <div
      v-for="(character, index) in characters"
      :key="index"
      class="bit p-1"
      :class="moral(index)"
    >
      <div class="name-container">
        <p class="name">{{ character?.character?.name }}</p>
        <button>
          <font-awesome-icon
            class="close-button ml-1"
            icon="fas fa-solid fa-times"
            fixed-width
          />
        </button>
      </div>
      <p>{{ race(index) }}</p>
      <p>{{ profession(index) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const { characters, currentCharacterIndex } = storeToRefs(generator);

const race = (index: number) => {
  const character = characters.value[index];
  let info = "";
  if (character?.character?.racevariant?.name) {
    info += character.character.racevariant.name;
  } else if (character?.character?.race?.name) {
    info += character.character.race.name;
  }
  return info;
};
const profession = (index: number) => {
  const character = characters.value[index];
  let info = "";
  if (character?.character?.class?.name) {
    info += ` ${character.character.class.name}`;
  }
  if (character?.character?.background?.name) {
    info += ` ${character.character.background.name}`;
  }
  return info;
};

const moral = (index: number) => {
  const character = characters.value[index];
  if (character?.statistics?.alignment?.includes("Good")) {
    return "bg-good-800";
  } else if (character?.statistics?.alignment?.includes("Evil")) {
    return "bg-evil-800";
  } else {
    return "bg-neutral-800";
  }
};
</script>

<style scoped>
.bits {
  display: flex;
  gap: 0.25rem;
  overflow: hidden;
  flex-wrap: wrap;
}
.bit {
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 1em;
  @apply text-text-inverse rounded;
  p {
    display: inline-block;
    font-size: 0.87em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100px;
    @apply leading-tight m-0 p-0;
  }
}
.name {
  font-family: MrsEavesSmallCaps;
}
.name-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-button {
}
</style>
