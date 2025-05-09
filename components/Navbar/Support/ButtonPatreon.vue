<template>
  <a
    class="grid place-items-center"
    href="https://www.patreon.com/c/monstershuffler"
  >
    <MSButton color="primary">
      <NavbarSupportPatreon class="patreon" />
      <span class="sr-only">
        {{ $t("navbar.patreon") }}
      </span>
    </MSButton>
  </a>
</template>

<script setup lang="ts"></script>

<style scoped>
.patreon {
  font-size: 0.875rem;
}
@media (min-width: theme("screens.md")) {
  .patreon {
    font-size: 1rem;
  }
}
</style>
