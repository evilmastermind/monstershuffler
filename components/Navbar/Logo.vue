<template>
  <div class="navbar-link">
    <NuxtLink
      class="content ms-logo basis-9 max-[700px]:basis-7 max-[575px]:mr-0"
      :to="localePath('/')"
    >
      <span class="sr-only">{{ $t("navbar.menu.home") }}</span>
      <svg
        viewBox="0 0 549 501"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="navbar-link-inactive ms-logo-icon"
      >
        <path
          d="M26.0759 102.633C65.0739 394.916 218.42 415.701 275.872 415.785C334.97 415.872 490.976 410.883 511.611 101.892C514.593 57.2433 527.128 344.215 276.061 343.811C29.7435 343.415 26.0759 102.633 26.0759 102.633Z"
          :fill="white"
          :stroke="black"
          stroke-width="18"
        />
        <rect x="268" y="352" width="4" height="64" :fill="black" />
        <rect x="238" y="349" width="4" height="64" :fill="black" />
        <rect x="298" y="349" width="4" height="64" :fill="black" />
        <rect x="328" y="344" width="4" height="64" :fill="black" />
        <rect x="358" y="332" width="4" height="64" :fill="black" />
        <rect x="178" y="332" width="4" height="64" :fill="black" />
        <rect x="388" y="322" width="4" height="64" :fill="black" />
        <rect x="418" y="296" width="4" height="64" :fill="black" />
        <rect x="118" y="296" width="4" height="56" :fill="black" />
        <rect x="448" y="270" width="4" height="64" :fill="black" />
        <rect x="208" y="344" width="4" height="64" :fill="black" />
        <rect x="148" y="322" width="4" height="59" :fill="black" />
        <rect width="65" height="500" :fill="blackOrTransparent" />
        <rect x="484" width="65" height="500" :fill="blackOrTransparent" />
        <rect
          x="19"
          y="45.9619"
          width="65"
          height="339.307"
          transform="rotate(-45 19 45.9619)"
          :fill="blackOrTransparent"
        />
        <rect
          x="484.154"
          width="65"
          height="362.257"
          transform="rotate(45 484.154 0)"
          :fill="blackOrTransparent"
        />
        <path
          d="M272 293.174C145 369.174 28.5 262.174 38 61.1743L272 293.174Z"
          :fill="white"
          :stroke="black"
          stroke-width="18"
        />
        <path
          d="M272 293.174C399 369.174 515.5 262.174 506 61.1743L272 293.174Z"
          :fill="white"
          :stroke="black"
          stroke-width="18"
        />
        <path
          d="M159.841 218.495C158.776 206.204 160.378 192.921 164.825 177.059L259.014 279.796C242.669 286.282 224.058 286.082 207.884 281.268C191.48 276.385 177.663 266.783 171.249 254.706C164.777 242.518 160.926 231.004 159.841 218.495Z"
          :fill="black"
          :stroke="black"
        />
        <path
          d="M355 197.674C389 335.674 510 184.674 466 95.1743L355 197.674Z"
          :fill="black"
          :stroke="black"
        />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { currentThemeType } = storeToRefs(useUiStore());

const white = computed(() => {
  return currentThemeType.value === "light" ? "white" : "white";
});
const black = computed(() => {
  return currentThemeType.value === "light" ? "black" : "black";
});
const blackOrTransparent = computed(() => {
  return currentThemeType.value === "light" ? "black" : "transparent";
});
</script>
<style scoped>
.ms-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ms-logo:hover .ms-logo-fill {
  fill: theme("colors.primary.700");
}
.ms-logo:hover .ms-logo-stroke {
  stroke: theme("colors.primary.700");
}
.ms-logo-icon {
  overflow: visible;
  min-width: theme("spacing.6");
  width: 43 px;
}
</style>
