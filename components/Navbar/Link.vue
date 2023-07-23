<template>
  <div class="navbar-link-container">
    <NuxtLink
      class="navbar-link"
      :class="
        currentRoute == route ? 'navbar-link-active' : 'navbar-link-inactive'
      "
      :to="localePath({ name: route })"
    >
      <font-awesome-icon
        :icon="`fas fa-solid ${icon}`"
        fixed-width
        class="navbar-icon mr-2"
      />
      <span class="navbar-link-name">{{ name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const nuxtRoute = useRoute();
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const currentRoute = computed(() => {
  return nuxtRoute.name;
});
</script>
<style lang="scss">
.navbar-link-container {
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;
}
.navbar-link-inactive {
  color: theme("colors.text");
}
.navbar-link-active,
.navbar-link:hover {
  color: theme("colors.primary.700");
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
  font-weight: 400;
  // text-transform: uppercase;
}
@media (max-width: 700px) {
  .navbar-icon {
    font-size: theme("spacing.5");
    margin-right: 0;
  }
  .navbar-link {
    flex-flow: column nowrap;
  }
}
@media (max-width: theme("screens.nav")) {
  .navbar-icon {
    display: inline-block;
  }
  .navbar-link-name {
    display: none;
  }
}
</style>
