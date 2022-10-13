<template>
  <div class="test">
    <p>Oh hi there, this is a {{ $t("website") }}.</p>
  </div>
</template>
<script setup lang="ts">
const hello = "";
console.log(hello);
</script>

<style scoped lang="scss">
  .test {
  @include theme('color', $secondary-text-color);
  @include theme('background-color', $general-background);
  /*... other rules ...*/
}
</style>
