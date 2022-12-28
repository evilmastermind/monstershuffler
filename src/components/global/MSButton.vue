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
    background-color: t($primary-700);
    border-top: 2px solid t($primary-600);
    border-left: 2px solid t($primary-600);
    border-right: 2px solid t($primary-600);
    border-bottom: 2px solid t($primary-800);
    border-image-slice: 1;
    color: t($background);
  }
}
.color-primary:hover {
  @include themed() {
    background-color: t($primary-600);
    border-top: 2px solid t($primary-500);
    border-left: 2px solid t($primary-500);
    border-right: 2px solid t($primary-500);
    border-bottom: 2px solid t($primary-700);
  }
}

.color-primary:active {
  @include themed() {
    background-color: t($primary-700);
    border-top: 2px solid t($primary-800);
    border-left: 2px solid t($primary-600);
    border-right: 2px solid t($primary-600);
    border-bottom: 2px solid t($primary-600);
  }
}

.color-complementary {
  @include themed() {
    background-color: t($complementary-700);
    border-top: 2px solid t($complementary-600);
    border-left: 2px solid t($complementary-600);
    border-right: 2px solid t($complementary-600);
    border-bottom: 2px solid t($complementary-800);
    color: t($background);
  }
}
.color-complementary:hover {
  @include themed() {
    background-color: t($complementary-600);
    border-top: 2px solid t($complementary-500);
    border-left: 2px solid t($complementary-500);
    border-right: 2px solid t($complementary-500);
    border-bottom: 2px solid t($complementary-700);

  }
}

.color-complementary:active {
  @include themed() {
    background-color: t($complementary-700);
    border-top: 2px solid t($complementary-600);
    border-left: 2px solid t($complementary-600);
    border-right: 2px solid t($complementary-600);
    border-bottom: 2px solid t($complementary-800);
  }
}

.color-light {
  @include themed() {
    background-color: t($grey-200);
    border-top: 2px solid t($grey-100);
    border-left: 2px solid t($grey-100);
    border-right: 2px solid t($grey-100);
    border-bottom: 2px solid t($grey-300);
    color: t($text);
  }
}
.color-light:hover {
  @include themed() {
    background-color: t($grey-100);
    border-top: 2px solid t($grey-50);
    border-left: 2px solid t($grey-50);
    border-right: 2px solid t($grey-50);
    border-bottom: 2px solid t($grey-200);

  }
}

.color-light:active {
  @include themed() {
    background-color: t($grey-200);
    border-top: 2px solid t($grey-300);
    border-left: 2px solid t($grey-100);
    border-right: 2px solid t($grey-100);
    border-bottom: 2px solid t($grey-100);
  }
}
.color-dark {
  @include themed() {
    background-color: t($grey-800);
    border-top: 2px solid t($grey-700);
    border-left: 2px solid t($grey-700);
    border-right: 2px solid t($grey-700);
    border-bottom: 2px solid t($grey-900);
    color: t($text-inverse);
  }
}
.color-dark:hover {
  @include themed() {
    background-color: t($grey-700);
    border-top: 2px solid t($grey-600);
    border-left: 2px solid t($grey-600);
    border-right: 2px solid t($grey-600);
    border-bottom: 2px solid t($grey-700);
  }
}
.color-dark:active {
  @include themed() {
    background-color: t($grey-800);
    border-top: 2px solid t($grey-900);
    border-left: 2px solid t($grey-700);
    border-right: 2px solid t($grey-700);
    border-bottom: 2px solid t($grey-700);
  }
}
</style>
