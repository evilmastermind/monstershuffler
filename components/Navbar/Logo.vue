<template>
  <div class="navbar-link">
    <NuxtLink
      class="ms-logo basis-9 max-[700px]:basis-7 max-[575px]:mr-0"
      :to="localePath('/')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="none"
        class="navbar-link-inactive ms-logo-icon"
        viewBox="0 0 222 227"
      >
        <g clip-path="url(#a)">
          <path
            class="ms-logo-stroke stroke-text"
            stroke-width="30"
            stroke="#000"
            d="M11 227V27l100 100L211 27v200"
          />
          <path
            class="ms-logo-stroke stroke-text"
            stroke="#000"
            stroke-width="10"
            d="M108.758 138c-69.5 35.5-111-7.5-100-100M109 138c69.5 35.5 111-7.5 100-100"
          />
          <path
            class="ms-logo-fill fill-text"
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
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>
<style scoped lang="scss">
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
  min-width: theme("spacing.6");
  width: 60%;
}
</style>
