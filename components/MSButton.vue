<template>
  <button
    class="button shadow-md rounded py-2 px-4 centered"
    :class="[`color-${color}`, block ? 'is-block' : '']"
    :disabled="isDisabled"
    @click="goToURL"
  >
    <div v-if="loading" class="loading" :class="[`color-${color}`]">
      <LoadingSpinner :size="1.5" :color="color" />
    </div>
    <div class="button-content">
      <font-awesome-icon v-if="icon" :style="{ color }" :icon="`${icon}`" />
      <span class="button-text">{{ text }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useLocaleLocation } from "vue-i18n-routing";
const router = useRouter();
const localeLocation = useLocaleLocation();

const p = defineProps({
  text: {
    type: String,
    required: true,
    default: "Click",
  },
  color: {
    type: String,
    required: true,
    default: "primary",
  },
  block: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
  to: {
    type: String,
    required: false,
    default: "",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isDisabled = computed(() => p.disabled || p.loading);

function goToURL() {
  if (p.to) {
    router.push(localeLocation({ name: p.to }));
  }
}
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: inline-block;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  //@include shadow-1;
  transition: transform 0.03s;
}
.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
.button:active {
  transform: translateY(2px) scale(0.97);
}
.is-block {
  display: block;
  width: 100%;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.color-primary {
  @apply bg-primary-700 text-background;
}
.color-primary:hover {
  @apply bg-primary-600;
}
.color-primary:active {
  @apply bg-primary-700;
}
.color-complementary {
  @apply bg-complementary-700 text-background;
}
.color-complementary:hover {
  @apply bg-complementary-600;
}
.color-complementary:active {
  @apply bg-complementary-700;
}

.color-light {
  @apply bg-grey-100 text-text;
}
.color-light:hover {
  @apply bg-grey-200;
}
.color-light:active {
  @apply bg-grey-100;
}

.color-dark {
  @apply bg-grey-800 text-text-inverse;
}
.color-dark:hover {
  @apply bg-grey-700;
}
.color-dark:active {
  @apply bg-grey-800;
}

.color-patreon {
  color: hsl(240, 0%, 3%);
  @apply bg-patreon-500 text-black;
}
.color-patreon:hover {
  @apply bg-patreon-400;
}
.color-patreon:active {
  @apply bg-patreon-500;
}
.color-success {
  background-color: theme("colors.success");
  color: theme("colors.background");
  @apply bg-success text-background;
}
</style>
