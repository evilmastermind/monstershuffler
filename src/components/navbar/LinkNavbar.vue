<template>
  <div class="navbar-link-container">
    <router-link
      class="navbar-link"
      :class="currentRoute == route ? 'navbar-link-active' : 'navbar-link-inactive'"
      :to="{ name: route }"
    >
      <font-awesome-icon
        :icon="`fas fa-solid ${icon}`"
        fixed-width
        class="navbar-icon"
      />
      <span class="navbar-link-name">{{ name }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
  return router.currentRoute.value.name;
});
console.log(currentRoute.value);
</script>

<style lang="scss">
.navbar-link-container {
  display: inline-block;
  overflow: hidden;
  //flex-basis: 100px;
  flex-grow: 0;
  flex-shrink: 0;
}
.navbar-link-inactive {
  @include themed() {
    color: t($text);
  }
}
.navbar-link-active,
.navbar-link:hover {
  @include themed() {
    color: t($text-accent);
  }
}
.navbar-icon {
  margin-right: $s-1;
}
.navbar-link {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.navbar-link-name {
  font-weight: 600;
  // text-transform: uppercase;
}
</style>
