<template>
  <button
    class="button rounded px-4 centered"
    :class="[
      `color-${color}`,
      block ? 'is-block' : '',
      size === 'small' ? 'small py-1' : 'medium py-2',
    ]"
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
      <span v-if="text" class="button-text">{{ text }}</span>
      <slot v-else />
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
    default: "",
  },
  color: {
    type: String as PropType<UIColors>,
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
  size: {
    type: String as PropType<"small" | "medium">,
    default: "medium",
  },
});

const isDisabled = computed(() => p.disabled || p.loading);

function goToURL() {
  if (p.to) {
    router.push(localePath({ name: p.to }));
  }
}
</script>

<style scoped>
.button {
  position: relative;
  display: inline-block;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: transform 0.1s, box-shadow 0.1s, background-color 0.1s;
  @apply shadow-md;
}
.medium {
  letter-spacing: 0.05em;
  @apply text-sm;
}
.small {
  letter-spacing: 0.05em;
  @apply text-xs;
}
.button:disabled {
  cursor: auto;
}
.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  @apply gap-4;
}
.button-text {
  text-overflow: ellipsis;
  white-space: nowrap;
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
.color-monstershuffler {
  color: hsl(240, 0%, 93%);
  @apply bg-monstershuffler;
}
.color-monstershuffler:hover {
  @apply bg-monstershuffler;
}
.color-monstershuffler:active {
  @apply bg-monstershuffler/95;
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
  @apply bg-light text-text;
}
.color-light:hover {
  @apply bg-background-50;
}
.color-light:active {
  @apply bg-background-100;
}

.color-dark {
  @apply bg-dark text-text-inverse;
}
.color-dark:hover {
  @apply bg-grey-900;
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
  @apply bg-success text-background-100;
}
.color-success:hover {
  @apply bg-success/90;
}
.color-success:active {
  @apply bg-success/90;
}

.button:focus-visible {
  outline: 2px solid theme("colors.text");
  box-shadow: 0 0 0 3px theme("colors.text-inverse");
}
</style>
