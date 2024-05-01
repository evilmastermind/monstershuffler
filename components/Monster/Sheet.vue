<template>
  <div class="sheet background" :class="`background-${ui.currentThemeType}`">
    <component :is="layout" :show-roleplay-stats />
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

const showRoleplayStats = computed(() => {
  const showRoleplayStats =
    character.value.character.user?.sheet?.showRoleplayStats;
  return showRoleplayStats !== undefined ? showRoleplayStats : true;
});

const layout = computed(() => {
  const layoutName =
    p.character.character?.user?.sheet?.layout || "MonsterLayoutDynamicA";
  const hasImages = !!p.character.character?.user?.sheet?.images?.length;
  if (layoutName === "MonsterLayoutDynamicA" && hasImages) {
    return resolveComponent("MonsterLayoutDynamicA");
  }
  console.log(layoutName);
  switch (layoutName) {
    case "MonsterLayoutSomething":
      return resolveComponent("MonsterLayoutSomething");
    case "MonsterLayoutDynamicNoImage":
      return resolveComponent("MonsterLayoutDynamicNoImage");
    case "MonsterLayoutDynamicA":
      return resolveComponent("MonsterLayoutDynamicA");
    case "MonsterLayoutOneColumnA":
      return resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutOneColumnB":
      return resolveComponent("MonsterLayoutOneColumnB");
    case "MonsterLayoutOneColumnC":
      return resolveComponent("MonsterLayoutOneColumnC");
    case "MonsterLayoutOneColumnD":
      return resolveComponent("MonsterLayoutOneColumnD");
    case "MonsterLayoutTwoColumnA":
      return resolveComponent("MonsterLayoutTwoColumnA");
    case "MonsterLayoutTwoColumnB":
      return resolveComponent("MonsterLayoutTwoColumnB");
    case "MonsterLayoutTwoColumnC":
      return resolveComponent("MonsterLayoutTwoColumnC");
    default:
      return resolveComponent("MonsterLayoutDynamicA");
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
