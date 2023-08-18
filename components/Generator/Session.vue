<template>
  <div class="session">
    <TransitionGroup name="slidetransition" appear>
      <div
        v-for="(characters, generation) in session"
        :key="generation"
        class="generation"
      >
        <template v-for="(character, index) in characters" :key="index">
          <Transition name="fade-scroll-slow" appear>
            <MonsterCard
              :monster="character"
              :style="{ transitionDelay: `${0.15 * index}s` }"
            />
          </Transition>
        </template>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();

const { session } = storeToRefs(generator);
</script>

<style scoped lang="scss">
.session {
  overflow-y: auto;
  @apply flex flex-col-reverse gap-6 w-full;
}
.generation {
  @apply grid grid-cols-1 gap-x-2 gap-y-2;
  @media (min-width: theme("screens.sm")) {
    @apply grid-cols-2;
  }
}
</style>
