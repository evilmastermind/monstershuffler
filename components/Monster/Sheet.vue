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
  const layoutName = p.character.character?.user?.sheet?.layout || "DynamicA";
  const hasImages = !!p.character.character?.user?.sheet?.images?.length;
  if (layoutName === "Default" && hasImages) {
    return resolveComponent("MonsterLayoutDynamicA");
  }
  switch (layoutName) {
    case "Something":
      return resolveComponent("MonsterLayoutSomething");
    case "DynamicNoImage":
      return resolveComponent("MonsterLayoutDynamicNoImage");
    case "DynamicA":
      return resolveComponent("MonsterLayoutDynamicA");
    case "OneColumnA":
      return resolveComponent("MonsterLayoutOneColumnA");
    case "OneColumnB":
      return resolveComponent("MonsterLayoutOneColumnB");
    case "OneColumnC":
      return resolveComponent("MonsterLayoutOneColumnC");
    case "OneColumnD":
      return resolveComponent("MonsterLayoutOneColumnD");
    case "TwoColumnA":
      return resolveComponent("MonsterLayoutTwoColumnA");
    case "TwoColumnB":
      return resolveComponent("MonsterLayoutTwoColumnB");
    case "TwoColumnC":
      return resolveComponent("MonsterLayoutTwoColumnC");
    default:
      return resolveComponent("MonsterLayoutDynamicNoImage");
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
