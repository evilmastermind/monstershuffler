<template>
  <a
    class="grid place-items-center"
    href="https://www.kickstarter.com/projects/evilmastermind/masterminds-an-all-in-one-toolkit-for-5e-dungeon-masters"
  >
    <MSButton color="primary">
      <NavbarSupportKickstarter class="kickstarter" />
    </MSButton>
  </a>
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
