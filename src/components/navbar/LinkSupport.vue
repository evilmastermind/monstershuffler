<template>
  <div class="link-support-container">
    <a
      :href="link"
      class="link-support"
      :title="name"
    >
      <font-awesome-icon
        :icon="`fa-brands ${icon}`"
        class="link-support-icon"
        fixed-width 
      />
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.link-support-container {
  display:flex;
  justify-content: center;
  align-items:center;
  padding: $s-1;
  border-radius:50%;
  height:$s-4;
  width:$s-6;
  cursor: pointer;
}
.link-support-icon {
  @include themed() {
    font-size: $f-5;
    color: lighten(t($text),50);
  }
}
.link-support-icon:hover {
  @include themed() {
    color: t($text-accent);
  }
}
</style>