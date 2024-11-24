<template>
  <div class="sheet background" :class="`background-${ui.currentThemeType}`">
    <component
      :is="layout"
      v-show="isLoaded"
      :key="key"
      :show-roleplay-stats
      @load="isLoaded = true"
    >
      <template #backstory>
        <MonsterBackstory v-show="isLoaded" />
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { GeneratorCharacter, Character } from "@/types";

const e = defineEmits(["loaded"]);
const p = defineProps({
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
});

const ui = useUiStore();

const generatorCharacter = toRef(p, "generatorCharacter");
const { columns } = useProvideCharacter(generatorCharacter);
const isLoaded = ref(false);
const layoutName = ref("MonsterLayoutOneColumnA");
const key = ref(0);

const showRoleplayStats = computed(() => {
  const showRoleplayStats =
    generatorCharacter.value.object.character.user?.sheet?.showRoleplayStats;
  return showRoleplayStats !== undefined ? showRoleplayStats : true;
});

const layout = computed(() => {
  switch (layoutName.value) {
    case "MonsterLayoutDynamicNoImage":
      return columns.value === 1
        ? resolveComponent("MonsterLayoutNoImageOneColumn")
        : resolveComponent("MonsterLayoutNoImageTwoColumn");
    case "MonsterLayoutDynamicA":
      return columns.value === 1
        ? resolveComponent("MonsterLayoutOneColumnA")
        : resolveComponent("MonsterLayoutTwoColumnA");
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
  }
  return columns.value === 1
    ? resolveComponent("MonsterLayoutOneColumnA")
    : resolveComponent("MonsterLayoutTwoColumnA");
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
    return defaultLayout;
  }
  return c.user.sheet.layout || defaultLayout;
}

watch(isLoaded, () => {
  key.value += 1;
});

watch(
  () => generatorCharacter.value.key,
  () => {
    layoutName.value = getLayout(generatorCharacter.value.object);
    e("loaded");
  }
);

onBeforeMount(() => {
  layoutName.value = getLayout(generatorCharacter.value.object);
});

onMounted(() => {
  e("loaded");
});
</script>

<style scoped>
.background {
  position: relative;
}
.background-light {
  background-image: url("@/assets/images/monster/paper.webp");
  @apply bg-background-200;
}
.background-dark {
  background-image: url("@/assets/images/monster/paper-dark.webp");
  @apply bg-background-200;
}
.close {
  position: absolute;
  right: 0;
  z-index: 1;
  @apply shadow-background-200;
}
.loading-container {
  transition: padding 0.3s ease-in-out;
}
</style>
