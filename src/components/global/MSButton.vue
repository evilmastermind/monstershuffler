<template>
  <button
    class="button"
    :class="`color-${color}`"
  >
    <span class="button-text">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: "Click",
  },
  color: {
    type: String,
    required: true,
    default: "complementary",
  },
});
</script>

<style lang="scss">
.button {
  display: inline-block;
  padding: $s-2 $s-4;
  border-radius: $s-1;
  cursor: pointer;
  font-weight: bold;
  @include shadow-2;
  //@include shadow-1;
  transition: transform 0.03s;
}
.button:active {
  transform: translateY(2px) scale(0.97);
}
.color-primary {
  @include themed() {
    background-color: t($primary-750);
    border-top: 2px solid t($primary-700);
    border-left: 2px solid t($primary-700);
    border-right: 2px solid t($primary-700);
    border-bottom: 2px solid t($primary-800);
    border-image-slice: 1;
    color: t($background);
  }
}
.color-primary:hover {
  @include themed() {
    background-color: t($primary-700);
  }
}

.color-primary:active {
  @include themed() {
    background-color: t($primary-750);
    border-top: 2px solid t($primary-800);
    border-left: 2px solid t($primary-700);
    border-right: 2px solid t($primary-700);
    border-bottom: 2px solid t($primary-700);
  }
}

.color-complementary {
  @include themed() {
    background-color: t($complementary-750);
    border-top: 2px solid t($complementary-700);
    border-left: 2px solid t($complementary-700);
    border-right: 2px solid t($complementary-700);
    border-bottom: 2px solid t($complementary-800);
    color: t($background);
  }
}
.color-complementary:hover {
  @include themed() {
    background-color: t($complementary-700);
  }
}

.color-complementary:active {
  @include themed() {
    background-color: t($complementary-750);
    border-top: 2px solid t($complementary-800);
    border-left: 2px solid t($complementary-700);
    border-right: 2px solid t($complementary-700);
    border-bottom: 2px solid t($complementary-700);
  }
}

.color-light {
  @include themed() {
    background-color: t($background);
    border: 1px solid darken(t($background), 40);
    color: t($text);
  }
}
.color-light:hover,
.color-light:active {
  @include themed() {
    background-color: lighten(t($background-light), 40);
    border: 1px solid darken(t($background-light), 40);
  }
}
.color-dark {
  @include themed() {
    background-color: t($text);
    border: 1px solid darken(t($text), 40);
    color: t($background);
  }
}
.color-dark:hover,
.color-dark:active {
  @include themed() {
    background-color: lighten(t($text-2), 20);
    border: 1px solid darken(t($text-2), 40);
  }
}
</style>
