<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card {
  padding: $s-5 $s-5;
  border-radius: 0px;

  @include themed {
    background: t($background);
  }
  // @include blurred();
  @include shadow-2;
}
</style>
