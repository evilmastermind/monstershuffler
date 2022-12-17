<template>
  <div class="button-user-container">
    <Button
      text="Login"
      color="dark"
    />
    <Button
      text="Register"
      color="primary"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/global/MSButton.vue";
</script>

<style lang="scss" scoped>
.button-user-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 1rem;
  justify-content: space-between;
}
</style>