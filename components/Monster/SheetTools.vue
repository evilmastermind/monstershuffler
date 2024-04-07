<template>
  <div class="tools-container my-2">
    <div class="tools p-2">
      <button :title="$t('monsterSheet.editImages')">
        <font-awesome-icon aria-hidden="true" icon="image" />
        <span class="sr-only">{{ $t("monsterSheet.editImages") }}</span>
      </button>
      <button :title="$t('monsterSheet.editImages')">
        <font-awesome-icon aria-hidden="true" icon="image" />
        <span class="sr-only">{{ $t("monsterSheet.editImages") }}</span>
      </button>
      <button :title="$t('monsterSheet.editImages')">
        <font-awesome-icon aria-hidden="true" icon="image" />
        <span class="sr-only">{{ $t("monsterSheet.editImages") }}</span>
      </button>
      <button :title="$t('monsterSheet.closeMonster')" class="pl-2">
        <font-awesome-icon aria-hidden="true" icon="xmark" />
        <span class="sr-only">{{ $t("monsterSheet.closeMonster") }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.tools-container {
  display: flex;
  justify-content: flex-end;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1rem;
  line-height: 1rem;
  @apply bg-background-evil text-text-inverse gap-4;
}
</style>
