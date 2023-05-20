<template>
  <div class="MSButton-user-container">
    <MSButton text="Login" color="dark" />
    <MSButton text="Register" color="primary" />
  </div>
</template>

<style lang="scss" scoped>
.MSButton-user-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: $s-4;
  justify-content: space-between;
}
</style>
