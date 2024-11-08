<template>
  <MSButton color="primary" to="https://kickstarter.com">
    <NavbarSupportKickstarter class="kickstarter" />
  </MSButton>
</template>

<script setup lang="ts"></script>

<style scoped>
.kickstarter {
  font-size: 0.875rem;
}
@media (min-width: theme("screens.md")) {
  .kickstarter {
    font-size: 1rem;
  }
}
</style>
