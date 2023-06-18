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
  background-color: theme("colors.primary.700");
  color: theme("colors.background");
}
.color-primary:hover {
  background-color: theme("colors.primary.600");
}
.color-primary:active {
  background-color: theme("colors.primary.700");
}
.color-complementary {
  background-color: theme("colors.complementary.700");
  color: theme("colors.background");
}
.color-complementary:hover {
  background-color: theme("colors.complementary.600");
}
.color-complementary:active {
  background-color: theme("colors.complementary.700");
}

.color-light {
  background-color: theme("colors.grey.100");
  color: theme("colors.text");
}
.color-light:hover {
  background-color: theme("colors.grey.200");
}
.color-light:active {
  background-color: theme("colors.grey.50");
}

.color-dark {
  background-color: theme("colors.grey.800");
  color: theme("colors.text-inverse");
}
.color-dark:hover {
  background-color: theme("colors.grey.700");
}
.color-dark:active {
  background-color: theme("colors.grey.800");
}

.color-patreon {
  background-color: theme("colors.patreon");
  color: hsl(240, 0%, 3%);
}
.color-patreon:hover {
  background-color: theme("colors.patreon");
}
.color-patreon:active {
  background-color: theme("colors.patreon");
}
</style>
