<template>
  <component :is="theme" :columns-count />
</template>

<script setup lang="ts">
type Columns = 1 | 2;

const p = defineProps({
  columns: {
    type: Number as PropType<Columns>,
    default: () => 2,
  },
});

const columnsFromActions = inject("columns") as Ref<number>;

const generator = useGeneratorStore();
const user = useUserStore();

const { currentStatBlockHTMLElement } = storeToRefs(generator);
const statBlock = ref<HTMLElement | null>(null);

function scrollIntoView() {
  if (statBlock.value) {
    statBlock.value.scrollIntoView({ behavior: "smooth" });
  }
}

const columnsCount = computed(() => {
  if (p.columns) {
    return p.columns;
  }
  return columnsFromActions.value;
});
const theme = computed(() => {
  switch (user.settings.statBlocks) {
    case "5.5e":
      return resolveComponent("StatBlock5.5e");
    default:
      return resolveComponent("StatBlock5e");
  }
});

watch([columnsCount, columnsFromActions, () => p.columns], () => {
  scrollIntoView();
});

onMounted(() => {
  if (statBlock.value) {
    currentStatBlockHTMLElement.value = statBlock.value;
  }
});
</script>
