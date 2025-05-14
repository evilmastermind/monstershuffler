<template>
  <UPopover v-model:open="open" :items>
    <MSIconButton
      icon="i-xxx-colors"
      :label="$t('navbar.menu.settings')"
      size="lg"
    />
    <template #content>
      <div class="flex flex-col gap-3 p-4">
        <UFormField :label="$t('navbar.settings.statBlockStyle')" size="xs">
          <NavBarStatBlockTheme />
        </UFormField>
        <UFormField :label="$t('navbar.settings.uiTheme')" size="xs">
          <NavBarUITheme />
        </UFormField>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const open = ref(false);

const items = [
  {
    slot: "ui",
  },
];
</script>

<style scoped></style>
