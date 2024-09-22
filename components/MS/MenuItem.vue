<template>
  <button class="menu-item px-4 py-2">
    <span class="icon-label">
      <Icon
        v-if="p.icon"
        size="16"
        :name="p.icon"
        aria-hidden
        class="text-text-evil mr-4"
      />
      <span>{{ p.label }}</span>
    </span>
    <Icon
      v-if="p.isSubMenu"
      size="12"
      name="fa6-solid:chevron-right"
      aria-hidden
      class="text-text-icon/60 ml-4"
    />
    <Icon
      v-else-if="p.isExternalLink"
      size="16"
      name="radix-icons:arrow-top-right"
      aria-hidden
      class="text-text-icon/60 ml-4"
    />
  </button>
</template>

<script setup lang="ts">
const p = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: undefined,
  },
  isSubMenu: {
    type: Boolean,
    default: false,
  },
  isExternalLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Menu Item */
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  width: 100%;
  overflow: visible;
  @apply text-text leading-4 text-4;
}
.menu-item:hover,
.menu-item:active {
  @apply bg-text text-text-inverse;
}
.icon-label {
  display: flex;
  align-items: center;
}
</style>
