<template>
  <MSMenu direction="bottomright">
    <MSIconButton
      :label="$t('monsterSheet.export')"
      icon="fa6-solid:file-export"
    />
    <template #dropdown>
      <div>Something...</div>
      <div>Something...</div>
      <div>Something...</div>
    </template>
  </MSMenu>
</template>

<script setup lang="ts"></script>

<style scoped></style>
