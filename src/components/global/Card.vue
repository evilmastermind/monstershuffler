<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.card {
  padding: $s-4 $s-4 $s-5 $s-4;
  border-radius: $s-4;
  backdrop-filter: blur(5px);
  @include themed {
    //background-color: rgb(t($background-light),0.9) ;
    background: rgb(t($background-light), 0.7);
  }
  @include shadow-2;
}
</style>
