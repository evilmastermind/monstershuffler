<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.card {
  padding: $s-5 $s-5;
  border-radius: $s-1;
  
  @include themed {
    background: t($background-card);
  }
  @include blurred();
  @include shadow-2;
}
</style>
