<template>
  <div class="navbar-link">
    <NuxtLink
      class="ms-logo"
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
            <path
              fill="#fff"
              d="M0 0h222v227H0z"
            />
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
  display:flex;
  align-items: center;
  justify-content: center;
  flex-basis: $s-9;
  margin-right: $s-5;
}
@media (max-width: 700px) {
  .ms-logo {
    flex-basis: $s-7;
  }
}
@media (max-width: 575px) {
  .ms-logo {
    margin-right: 0;
  }
}
.ms-logo:hover .ms-logo-fill {
  @include themed() {
    fill: t($primary-700);
  }
}
.ms-logo:hover .ms-logo-stroke {
  @include themed() {
    stroke: t($primary-700);
  }
}
.ms-logo-icon {
  min-width: $s-6;
  width: 60%;
}
.ms-logo-fill {
  @include themed() {
    fill: t($text);
  }
}
.ms-logo-stroke {
  @include themed() {
    stroke: t($text);
  }
}

</style>
