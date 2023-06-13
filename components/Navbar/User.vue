<template>
  <div class="MSButton-user-container">
    <MSButton text="Login" color="dark" to="login" />
    <MSButton text="Register" color="primary" to="registration" />
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style lang="scss" scoped>
.MSButton-user-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: $s-4;
  justify-content: space-between;
}
</style>
