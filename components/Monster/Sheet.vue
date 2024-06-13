<template>
  <div class="sheet background" :class="`background-${ui.currentThemeType}`">
    <component
      :is="layout"
      v-show="isLoaded"
      :key
      :show-roleplay-stats
      @load="isLoaded = true"
    />
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
const isLoaded = ref(false);
const key = ref(0);
useProvideCharacter(character);

const showRoleplayStats = computed(() => {
  const showRoleplayStats =
    character.value.character.user?.sheet?.showRoleplayStats;
  return showRoleplayStats !== undefined ? showRoleplayStats : true;
});

const layout = computed(() => {
  const layoutName = getLayout(p.character);
  const hasImages = !!p.character.character?.user?.sheet?.images?.length;
  if (layoutName === "MonsterLayoutDynamicA" && hasImages) {
    return resolveComponent("MonsterLayoutDynamicA");
  }
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
      return resolveComponent("MonsterLayoutOneColumnCResponsive");
    case "MonsterLayoutOneColumnD":
      return resolveComponent("MonsterLayoutOneColumnDResponsive");
    case "MonsterLayoutTwoColumnA":
      return resolveComponent("MonsterLayoutTwoColumnA");
    case "MonsterLayoutTwoColumnB":
      return resolveComponent("MonsterLayoutTwoColumnB");
    case "MonsterLayoutTwoColumnC":
      return resolveComponent("MonsterLayoutTwoColumnCResponsive");
    default:
      return resolveComponent("MonsterLayoutDynamicA");
  }
});

function getLayout(
  character: Character,
  defaultLayout = "MonsterLayoutDynamicA"
) {
  const c = character.character;
  if (!c?.user) {
    c.user = {};
  }
  if (!c?.user?.sheet) {
    c.user.sheet = {
      layout: defaultLayout,
      showRoleplayStats: true,
      images: [],
    };
    return layout;
  }
  return c.user.sheet.layout;
}

watch(isLoaded, () => {
  key.value += 1;
});
</script>

<style scoped>
.background {
  position: relative;
}
.background-light {
  background-image: url("@/assets/images/monster/paper.webp");
  @apply bg-background-card;
}
.background-dark {
  background-image: url("@/assets/images/monster/paper-dark.webp");
  @apply bg-background-card;
}
.close {
  position: absolute;
  right: 0;
  z-index: 1;
  @apply shadow-background-card;
}
.loading-container {
  transition: padding 0.3s ease-in-out;
}
</style>
