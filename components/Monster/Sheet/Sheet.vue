<template>
  <MSNote>
    <component
      :is="layout"
      v-show="isLoaded"
      :key="key"
      :show-roleplay-stats
      @load="isLoaded = true"
    >
      <template #images="{ rules }">
        <MonsterImages :rules @load="isLoaded = true" />
      </template>
      <template #backstory>
        <MonsterBackstory v-show="isLoaded" />
      </template>
      <template #stats="{ columns: layoutColumns }">
        <MonsterStatBlock :columns="layoutColumns" />
      </template>
      <template #card>
        <MonsterSheetCard>
          <MonsterRoleplayStats />
        </MonsterSheetCard>
      </template>
    </component>
  </MSNote>
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

const generator = useGeneratorStore();
const { width } = useScreen();

const { settings } = storeToRefs(generator);
const generatorCharacter = toRef(p, "generatorCharacter");
const { columns, character } = useProvideCharacter(generatorCharacter);
const isLoaded = ref(false);
const layoutName = ref(settings.value?.layout || "MonsterLayoutDynamicA");
const key = ref(0);

const showRoleplayStats = computed(() => {
  console.log(
    "(computed) showRoleplayStats",
    generatorCharacter.value.object.character.user?.sheet?.showRoleplayStats ??
      settings.value?.showRoleplayStats ??
      true
  );
  return (
    generatorCharacter.value.object.character.user?.sheet?.showRoleplayStats ??
    settings.value?.showRoleplayStats ??
    true
  );
});

watch(generatorCharacter.value, () => {
  console.log("generatorCharacter.value changed", generatorCharacter.value);
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
      return width.value >= 800
        ? resolveComponent("MonsterLayoutOneColumnC")
        : resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutOneColumnD":
      return width.value >= 800
        ? resolveComponent("MonsterLayoutOneColumnD")
        : resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutTwoColumnA":
      return resolveComponent("MonsterLayoutTwoColumnA");
    case "MonsterLayoutTwoColumnB":
      return resolveComponent("MonsterLayoutTwoColumnB");
    case "MonsterLayoutTwoColumnC":
      return width.value >= 800
        ? resolveComponent("MonsterLayoutTwoColumnC")
        : resolveComponent("MonsterLayoutTwoColumnA");
  }
  return columns.value === 1
    ? resolveComponent("MonsterLayoutOneColumnA")
    : resolveComponent("MonsterLayoutTwoColumnA");
});

function getLayout(
  character: Character,
  defaultLayout = settings.value?.layout || "MonsterLayoutDynamicA",
  showRoleplayStats = settings.value?.showRoleplayStats ?? true
) {
  const c = character.character;
  if (!c?.user) {
    c.user = {};
  }
  if (!c?.user?.sheet) {
    c.user.sheet = {
      layout: defaultLayout,
      showRoleplayStats,
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
