<template>
  <div class="sheet background" :class="`background-${ui.currentThemeType}`">
    <component :is="layout" />
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const p = defineProps({
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const ui = useUiStore();
const character = toRef(p, "character");
useProvideCharacter(character);

const layout = computed(() => {
  const layoutName =
    p.character.character?.user?.sheet?.layout || "DefaultImage";
  const hasImages = !!p.character.character?.user?.sheet?.images?.length;
  if (layoutName === "Default" && hasImages) {
    return resolveComponent("MonsterLayoutDefaultImage");
  }
  switch (layoutName) {
    case "Something":
      return resolveComponent("MonsterLayoutSomething");
    case "Default":
      return resolveComponent("MonsterLayoutDefault");
    case "DefaultImage":
      return resolveComponent("MonsterLayoutDefaultImage");
    default:
      return resolveComponent("MonsterLayoutDefault");
  }
});
</script>

<style scoped>
.background {
  position: relative;
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
  z-index: 1;
  @apply shadow-background-card;
}
.sheet {
}
</style>
