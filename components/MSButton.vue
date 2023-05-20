<template>
  <button class="button" :class="[`color-${color}`, block ? 'is-block' : '']">
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
  block: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss">
.button {
  display: inline-block;
  padding: $s-2 $s-4;
  border: none;
  border-radius: $s-1;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;

  @include shadow-2;
  //@include shadow-1;
  transition: transform 0.03s;
}
.button:active {
  transform: translateY(2px) scale(0.97);
}
.is-block {
  display: block;
  width: 100%;
}

.color-primary {
  @include themed() {
    background-color: t($primary-700);
    color: t($background);
  }
}
.color-primary:hover {
  @include themed() {
    background-color: t($primary-600);
  }
}
.color-primary:active {
  @include themed() {
    background-color: t($primary-700);
  }
}

.color-complementary {
  @include themed() {
    background-color: t($complementary-700);
    color: t($background);
  }
}
.color-complementary:hover {
  @include themed() {
    background-color: t($complementary-600);
  }
}
.color-complementary:active {
  @include themed() {
    background-color: t($complementary-700);
  }
}

.color-light {
  @include themed() {
    background-color: t($grey-100);
    color: t($text);
  }
}
.color-light:hover {
  @include themed() {
    background-color: t($grey-200);
  }
}
.color-light:active {
  @include themed() {
    background-color: t($grey-50);
  }
}

.color-dark {
  @include themed() {
    background-color: t($grey-800);
    color: t($text-inverse);
  }
}
.color-dark:hover {
  @include themed() {
    background-color: t($grey-700);
  }
}
.color-dark:active {
  @include themed() {
    background-color: t($grey-800);
  }
}
</style>
