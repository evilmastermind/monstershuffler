<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    fill="none"
    class="navbar-link-inactive ms-logo-icon"
    viewBox="0 0 222 227"
  >
    <title>M</title>
    <g clip-path="url(#a)">
      <path
        class="ms-logo-stroke"
        stroke-width="30"
        d="M11 227V27l100 100L211 27v200"
      />
      <path
        class="ms-logo-stroke"
        stroke="#000"
        stroke-width="10"
        d="M108.758 138c-69.5 35.5-111-7.5-100-100M109 138c69.5 35.5 111-7.5 100-100"
      />
      <path
        class="ms-logo-fill"
        fill="#000"
        d="M90 110c0 11.598-9.402 21-21 21s-21-9.402-21-21 9.402-21
      21-21 21 9.402 21 21Zm85.5 0c0 11.598-9.402 21-21 21s-21-9.402-21-21
      9.402-21 21-21 21 9.402 21 21Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h222v227H0z" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
const p = defineProps({
  size: {
    type: Number,
    default: 50,
  },
});
</script>

<style scoped lang="scss">
.ms-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: theme("spacing.9");
  margin-right: theme("spacing.5");
}
@media (max-width: 700px) {
  .ms-logo {
    flex-basis: theme("spacing.7");
  }
}
@media (max-width: 575px) {
  .ms-logo {
    margin-right: theme("spacing.0");
  }
}
.ms-logo-fill {
  fill: theme("colors.text");
}
.ms-logo-stroke {
  stroke: theme("colors.text");
}
</style>
