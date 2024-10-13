<template>
  <div ref="container" class="container">
    <div :class="`border-top-${ui.currentThemeType}`">
      <div :class="`border-top-angle-left-${ui.currentThemeType}`" />
      <div :class="`border-top-center-${ui.currentThemeType}`" />
      <div :class="`border-top-angle-right-${ui.currentThemeType}`" />
    </div>
    <div class="content" :class="moralBackground">
      <slot />
    </div>
    <div :class="`border-bottom-${ui.currentThemeType}`">
      <div :class="`border-bottom-angle-left-${ui.currentThemeType}`" />
      <div :class="`border-bottom-center-${ui.currentThemeType}`" />
      <div :class="`border-bottom-angle-right-${ui.currentThemeType}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
const moralBackground = inject("moralBackground") as Ref<string>;

const ui = useUiStore();
const generator = useGeneratorStore();

const { currentRoleplayStatsHTMLElement } = storeToRefs(generator);
const container = ref<HTMLElement | null>(null);

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
