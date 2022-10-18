<template>
  <div class="navbar-link-container">
    <router-link
      class="navbar-link"
      :class="currentRoute == route ? 'navbar-link-active' : 'navbar-link-inactive'"
      :to="{ name: route }"
    >
      <font-awesome-icon :icon="`fas fa-solid ${icon}`" />
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
  active: {
    type: Boolean,
    default: false,
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
  flex-basis: 100px;
  flex-grow: 0;
  flex-shrink: 0;
}
.navbar-link-inactive {
  @include themed() {
    color: desaturate(t($primary-400),90);
  }
}
.navbar-link-active,
.navbar-link:hover {
  @include themed() {
    color: t($primary-750);
  }
}
.navbar-link {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: $s-7;
  text-decoration: none;
}
.navbar-link-name {
  font-size: $s-4;
  // text-transform: uppercase;
}
</style>
