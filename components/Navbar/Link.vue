<template>
  <div class="navbar-link-container">
    <NuxtLink
      class="navbar-link"
      :class="
        currentRoute === `${route}___${locale}`
          ? 'navbar-link-active'
          : 'navbar-link-inactive'
      "
      :to="localePath({ name: route })"
    >
      <span class="navbar-link-name">{{ name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
});

const localePath = useLocalePath();
const { locale } = useI18n();
const nuxtRoute = useRoute();

const currentRoute = computed(() => {
  return nuxtRoute.name;
});
</script>
<style>
.navbar-link-container {
  flex-grow: 0;
  flex-shrink: 0;
}
.navbar-link-inactive {
  color: theme("colors.text");
}
.navbar-link-active,
.navbar-link:hover {
  color: theme("colors.text-evil");
}
.navbar-icon {
  font-size: theme("spacing.4");
  display: none;
}
.navbar-link {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.navbar-link-name {
}

.navbar-link:focus-visible {
  outline: 2px solid theme("colors.text");
  box-shadow: 0 0 0 3px theme("colors.text-inverse");
}
</style>
