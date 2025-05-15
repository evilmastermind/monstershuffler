<template>
  <div class="navbar-link-container">
    <NuxtLink
      class="hover:text-primary text-sm leading-none"
      :class="
        currentRoute === `${route}___${locale}`
          ? 'current-route text-primary'
          : 'text-toned'
      "
      :to="localePath({ name: route })"
    >
      <TSmall>{{ name }}</TSmall>
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
.navbar-link {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
</style>
