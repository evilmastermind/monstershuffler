<template>
  <div class="page mb-4" :class="`background-${ui.currentThemeType}`">
    <button class="close px-4 pt-2" :title="$t('close')" @click="close">
      <font-awesome-icon
        aria-hidden="true"
        class="close-button"
        icon="fas fa-solid fa-times"
        fixed-width
      />
      <span class="sr-only">{{ $t("close") }}</span>
    </button>
    <div class="monster-image" />
    <MonsterStatBlock
      class="monster-stats mr-8"
      :character="currentCharacter"
    />
    <MonsterRoleplayStats :character="currentCharacter" />
  </div>
</template>

<script setup lang="ts">
const generator = useGeneratorStore();
const ui = useUiStore();
const { currentCharacterIndex, currentCharacter } = storeToRefs(generator);
function close() {
  currentCharacterIndex.value = -1;
}
</script>

<style scoped>
.page {
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.background-light {
  background-image: url("@/assets/images/monster/paper.jpg");
}
.background-dark {
  background-image: url("@/assets/images/monster/paper-dark.jpg");
}
.close {
  position: absolute;
  right: 0;
}
.monster-image {
  overflow: hidden;
  width: 100%;
  height: 700px;
  background-image: url(@/assets/images/background4.png);
  background-size: cover;
  mask-image: url(@/assets/images/monster/test-mask.png);
  mask-repeat: no-repeat;
  mask-position: bottom center;
}
.monster-stats {
  float: right;
  position: relative;
  top: -400px;
}
</style>
