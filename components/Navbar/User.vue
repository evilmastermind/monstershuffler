<template>
  <div class="MSButton-user-container">
    <MSButton text="Login" color="dark" to="login" />
    <MSButton text="Register" color="primary" to="registration" />
  </div>
</template>
<style lang="scss" scoped>
.MSButton-user-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: theme("spacing.4");
  justify-content: space-between;
}
</style>
