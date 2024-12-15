<template>
  <div ref="container" class="container">
    <div :class="[borders.top]">
      <div :class="[borders.topAngleLeft]" />
      <div :class="[borders.topCenter]" />
      <div :class="[borders.topAngleRight]" />
    </div>
    <div class="content" :class="moralBackground">
      <slot />
    </div>
    <div :class="[borders.bottom]">
      <div :class="[borders.bottomAngleLeft]" />
      <div :class="[borders.bottomCenter]" />
      <div :class="[borders.bottomAngleRight]" />
    </div>
  </div>
</template>

<script setup lang="ts">
const moralBackground = inject("moralBackground") as Ref<string>;

const ui = useUiStore();
const generator = useGeneratorStore();

const { currentRoleplayStatsHTMLElement } = storeToRefs(generator);
const container = ref<HTMLElement | null>(null);

const borders = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return {
        top: "border-top-light",
        topAngleLeft: "border-top-angle-left-light",
        topCenter: "border-top-center-light",
        topAngleRight: "border-top-angle-right-light",
        bottom: "border-bottom-light",
        bottomAngleLeft: "border-bottom-angle-left-light",
        bottomCenter: "border-bottom-center-light",
        bottomAngleRight: "border-bottom-angle-right-light",
      };
    case "dark":
      return {
        top: "border-top-dark",
        topAngleLeft: "border-top-angle-left-dark",
        topCenter: "border-top-center-dark",
        topAngleRight: "border-top-angle-right-dark",
        bottom: "border-bottom-dark",
        bottomAngleLeft: "border-bottom-angle-left-dark",
        bottomCenter: "border-bottom-center-dark",
        bottomAngleRight: "border-bottom-angle-right-dark",
      };
  }
});

onMounted(() => {
  if (!container.value) {
    return;
  }
  currentRoleplayStatsHTMLElement.value = container.value;
});
</script>

<style scoped>
.container {
  --triangle-width: 0.5rem;
  --triangle-height: 0.22rem;
  --border-width: 2px;
}
.content {
  font-family: "ScalaSansOffc";
  @apply px-4 py-4;
}
.name {
  font-weight: 600;
  font-size: 1.3rem;
  font-variant: small-caps;
  letter-spacing: 0.05em;
}
dt {
  float: left;
  clear: left;
  @apply font-bold mr-2;
}
dt::after {
  content: ":";
  font-weight: 400;
}
.dotted {
  border-bottom: 1px dotted theme("colors.text-2");
  cursor: help;
}
.border-top-light {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-top-angle-left-light {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid black;
  border-bottom: var(--triangle-height) solid black;
  border-top: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-top-center-light {
  border-bottom: var(--border-width) solid black;
}
.border-top-angle-right-light {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid black;
  border-bottom: var(--triangle-height) solid black;
  border-top: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
.border-bottom-light {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-bottom-angle-left-light {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid black;
  border-top: var(--triangle-height) solid black;
  border-bottom: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-bottom-center-light {
  border-top: var(--border-width) solid black;
}
.border-bottom-angle-right-light {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid black;
  border-top: var(--triangle-height) solid black;
  border-bottom: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
.border-top-dark {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-top-angle-left-dark {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid #555;
  border-bottom: var(--triangle-height) solid #555;
  border-top: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-top-center-dark {
  border-bottom: var(--border-width) solid #555;
}
.border-top-angle-right-dark {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid #555;
  border-bottom: var(--triangle-height) solid #555;
  border-top: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
.border-bottom-dark {
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto min-content;
}
.border-bottom-angle-left-dark {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-right: var(--triangle-width) solid #555;
  border-top: var(--triangle-height) solid #555;
  border-bottom: var(--triangle-height) solid transparent;
  border-left: var(--triangle-width) solid transparent;
}
.border-bottom-center-dark {
  border-top: var(--border-width) solid #555;
}
.border-bottom-angle-right-dark {
  width: var(--triangle-width);
  height: var(--triangle-height);
  border-left: var(--triangle-width) solid #555;
  border-top: var(--triangle-height) solid #555;
  border-bottom: var(--triangle-height) solid transparent;
  border-right: var(--triangle-width) solid transparent;
}
</style>
