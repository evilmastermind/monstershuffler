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
    border-top: 2px solid lighten(t($primary-700),25);
    border-left: 2px solid lighten(t($primary-700),15);
    border-right: 2px solid lighten(t($primary-700),15);
    border-bottom: 2px solid darken(t($primary-700),25);
    border-image-slice: 1;
    color: t($background);
  }
}
.color-primary:hover {
  @include themed() {
    background-color: t($primary-600);
    border-top: 2px solid lighten(t($primary-600),25);
    border-left: 2px solid lighten(t($primary-600),15);
    border-right: 2px solid lighten(t($primary-600),15);
    border-bottom: 2px solid darken(t($primary-600),25);
  }
}

.color-primary:active {
  @include themed() {
    background-color: t($primary-700);
    border-top: 2px solid darken(t($primary-700),25);
    border-left: 2px solid lighten(t($primary-700),15);
    border-right: 2px solid lighten(t($primary-700),15);
    border-bottom: 2px solid lighten(t($primary-700),25);
  }
}

.color-complementary {
  @include themed() {
    background-color: t($complementary-700);
    border-top: 2px solid lighten(t($complementary-700),25);
    border-left: 2px solid lighten(t($complementary-700),15);
    border-right: 2px solid lighten(t($complementary-700),15);
    border-bottom: 2px solid darken(t($complementary-700),25);
    color: t($background);
  }
}
.color-complementary:hover {
  @include themed() {
    background-color: t($complementary-600);
    border-top: 2px solid lighten(t($complementary-600),25);
    border-left: 2px solid lighten(t($complementary-600),15);
    border-right: 2px solid lighten(t($complementary-600),15);
    border-bottom: 2px solid darken(t($complementary-600),25);

  }
}

.color-complementary:active {
  @include themed() {
    background-color: t($complementary-700);
    border-top: 2px solid darken(t($complementary-700),25);
    border-left: 2px solid lighten(t($complementary-700),15);
    border-right: 2px solid lighten(t($complementary-700),15);
    border-bottom: 2px solid lighten(t($complementary-700),25);
  }
}

.color-light {
  @include themed() {
    background-color: t($grey-50);
    border-top: 2px solid lighten(t($grey-50), 5);
    border-left: 2px solid lighten(t($grey-50), 5);
    border-right: 2px solid lighten(t($grey-50), 5);
    border-bottom: 2px solid darken(t($grey-50), 5);
    color: t($text);
  }
}
.color-light:hover {
  @include themed() {
    border-top: 2px solid lighten(t($grey-100), 10);
    border-left: 2px solid lighten(t($grey-100), 10);
    border-right: 2px solid lighten(t($grey-100), 10);
    border-bottom: 2px solid darken(t($grey-100), 5);
  }
}

.color-light:active {
  @include themed() {
    background-color: t($grey-50);
    border-top: 2px solid darken(t($grey-50), 5);
    border-left: 2px solid lighten(t($grey-50), 5);
    border-right: 2px solid lighten(t($grey-50), 5);
    border-bottom: 2px solid lighten(t($grey-50), 5);
  }
}
.color-dark {
  @include themed() {
    background-color: t($grey-800);
    border-top: 2px solid lighten(t($grey-800),5);
    border-left: 2px solid lighten(t($grey-800),5);
    border-right: 2px solid lighten(t($grey-800),5);
    border-bottom: 2px solid darken(t($grey-800),5);
    color: t($text-inverse);
  }
}
.color-dark:hover {
  @include themed() {
    background-color: t($grey-700);
    border-top: 2px solid lighten(t($grey-700),5);
    border-left: 2px solid lighten(t($grey-700),5);
    border-right: 2px solid lighten(t($grey-700),5);
    border-bottom: 2px solid darken(t($grey-700),5);
  }
}
.color-dark:active {
  @include themed() {
    background-color: t($grey-800);
    border-top: 2px solid darken(t($grey-800),5);
    border-left: 2px solid lighten(t($grey-800),5);
    border-right: 2px solid lighten(t($grey-800),5);
    border-bottom: 2px solid lighten(t($grey-800),5);
  }
}
</style>
