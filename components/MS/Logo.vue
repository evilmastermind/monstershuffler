<template>
  <svg
    viewBox="0 0 574 519"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="navbar-link-inactive ms-logo-icon"
  >
    <rect x="209" y="315" width="164" height="55" :fill="black" />
    <path
      d="M41.0759 120.633C80.0739 412.916 233.42 433.701 290.872 433.785C349.97 433.872 505.976 428.883 526.611 119.892C529.593 75.2433 542.128 362.215 291.061 361.811C44.7435 361.415 41.0759 120.633 41.0759 120.633Z"
      :fill="white"
      :stroke="black"
      stroke-width="18"
    />
    <rect x="283" y="370" width="6" height="64" :fill="black" />
    <rect x="253" y="367" width="6" height="64" :fill="black" />
    <rect x="313" y="367" width="6" height="64" :fill="black" />
    <rect x="343" y="362" width="6" height="64" :fill="black" />
    <rect x="373" y="350" width="6" height="64" :fill="black" />
    <rect x="193" y="350" width="6" height="64" :fill="black" />
    <rect x="403" y="340" width="6" height="64" :fill="black" />
    <rect x="433" y="314" width="6" height="64" :fill="black" />
    <rect x="133" y="314" width="6" height="56" :fill="black" />
    <rect x="463" y="288" width="6" height="64" :fill="black" />
    <rect x="223" y="362" width="6" height="64" :fill="black" />
    <rect x="163" y="340" width="6" height="59" :fill="black" />
    <path
      d="M0 -0.00012207H80V8.56842V518H0V-0.00012207Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M32 56.5684L80 8.56842L88.5685 -0.000121117L343.127 254.558L286.558 311.127L32 56.5684Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M88.5685 -0.000121117L80 -0.00012207V8.56842L88.5685 -0.000121117Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M494 -0.00012207H574V518H494V8.84558V-0.00012207Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M485.154 -0.00012207L494 8.84558L541.723 56.5684L287.164 311.127L230.596 254.558L485.154 -0.00012207Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M494 -0.00012207H485.154L494 8.84558V-0.00012207Z"
      :fill="blackOrTransparent"
    />
    <path
      d="M287 311.174C160 387.174 43.5 280.174 53 79.1743L287 311.174Z"
      :fill="white"
      :stroke="black"
      stroke-width="18"
    />
    <path
      d="M287 311.174C414 387.174 530.5 280.174 521 79.1743L287 311.174Z"
      :fill="white"
      :stroke="black"
      stroke-width="18"
    />
    <path
      d="M174.841 236.495C173.776 224.204 175.378 210.921 179.825 195.059L274.014 297.796C257.669 304.282 239.058 304.082 222.884 299.268C206.48 294.385 192.663 284.783 186.249 272.706C179.777 260.518 175.926 249.004 174.841 236.495Z"
      :fill="black"
      :stroke="black"
    />
    <path
      d="M370 215.674C404 353.674 525 202.674 481 113.174L370 215.674Z"
      :fill="black"
      :stroke="black"
    />
  </svg>
</template>

<script setup lang="ts">
const { isDark } = storeToRefs(useUiStore());

const white = computed(() => {
  return isDark ? "white" : "white";
});
const black = computed(() => {
  return isDark ? "black" : "black";
});
const blackOrTransparent = computed(() => {
  return isDark ? "black" : "black";
});
</script>

<style scoped></style>
