<template>
  <div class="logo mt-4">
    <NuxtLink :to="localePath({ name: 'index' })" class="content">
      <div class="logo mt-4">
        <LogoStatic :size="30" class="logo-static" />onstershuffler
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  gap: 0.125em;
  line-height: 1;
}
.logo-static {
  @apply inline;
}
</style>
