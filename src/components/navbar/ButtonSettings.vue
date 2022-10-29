<template>
  <DropdownMenu
    :hover="true"
    direction="bottomleft"
    class="navbar-link-container"
  >
    <div>
      <div
        class="navbar-link navbar-link-inactive"
      >
        <font-awesome-icon
          icon="fas fa-solid fa-cog"
          fixed-width
          class="navbar-icon"
        />
        <span class="navbar-link-name">Settings</span>
      </div>
    </div>
    <template #dropdown>
      <a href="#something"><span>Span</span> Do something</a>
      <a href="#something">Something else</a>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from "@/components/global/Menu.vue";
</script>