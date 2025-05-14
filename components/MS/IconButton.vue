<template>
  <UTooltip :text="label">
    <UButton
      :variant
      :color
      :aria-label="label"
      :icon
      :size
      :disabled
      :loading
      :class="`text-${color}-700`"
    />
  </UTooltip>
</template>

<script setup lang="ts">
type Color =
  | "neutral"
  | "primary"
  | "secondary"
  | "al-good"
  | "al-neutral"
  | "al-evil"
  | "info"
  | "success"
  | "warning"
  | "error"
  | undefined;
type Variant =
  | "ghost"
  | "solid"
  | "outline"
  | "soft"
  | "subtle"
  | "link"
  | undefined;
type Size = "lg" | "sm" | "xs" | "md" | "xl" | undefined;

const p = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String as PropType<Color>,
    default: "neutral",
  },
  size: {
    type: String as PropType<Size>,
    default: "sm",
  },
  variant: {
    type: String as PropType<Variant>,
    default: "ghost",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
