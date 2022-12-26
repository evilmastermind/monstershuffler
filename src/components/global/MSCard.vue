<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.card {
  padding: $s-3 $s-4;
  border-radius: $s-1;
  
  @include themed {
    background: rgb(t($background), 0.7);
  }
  @include blurred();
  @include shadow-2;
}
</style>
