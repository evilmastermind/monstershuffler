<template>
  <button
    class="button rounded py-2 px-4 centered"
    :class="[`color-${color}`, block ? 'is-block' : '']"
    :disabled="isDisabled"
    @click="goToURL"
  >
    <Transition name="fade">
      <div v-if="loading" class="loading" :class="[`color-${color}`]">
        <LoadingSpinner :size="1.5" :background="color" />
      </div>
    </Transition>
    <div class="button-content">
      <Icon v-if="icon" :name="icon" :style="{ color }" />
      <span class="button-text">{{ text }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { UIColors } from "@/types";

const router = useRouter();
const localePath = useLocalePath();

const p = defineProps({
  text: {
    type: String,
    required: true,
    default: "Click",
  },
  color: {
    type: String as PropType<UIColors>,
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
    router.push(localePath({ name: p.to }));
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
  transition: transform 0.1s, box-shadow 0.1s, background-color 0.1s;
  @apply shadow-md;
}
.button:disabled {
  cursor: auto;
}
.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
}
.button:active {
  transform: translateY(2px) scale(0.99);
  @apply shadow-sm;
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
  @apply bg-primary-700 text-background-100;
}
.color-primary:hover {
  @apply bg-primary-600;
}
.color-primary:active {
  @apply bg-primary-700;
}
.color-complementary {
  @apply bg-complementary-700 text-background-100;
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
  color: theme("colors.background.100");
  @apply bg-success text-background-100;
}

.button:focus-visible {
  outline: 2px solid theme("colors.text");
  box-shadow: 0 0 0 3px theme("colors.text-inverse");
}
</style>
