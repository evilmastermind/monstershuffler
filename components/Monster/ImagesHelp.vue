<template>
  <MSGenericTooltip :max-width="350">
    <template #default>
      <slot name="default">
        <Icon name="fa6-solid:circle-question" />
      </slot>
    </template>
    <template #tooltip>
      <slot name="tooltip">
        <div class="text-sm">
          <h4 class="content">{{ $t("editor.image.placement") }}</h4>
          <p class="mt-2">
            <b>{{ $t("editor.image.tokenCircle") }}</b
            >: {{ $t("editor.image.tokenCircleHelp") }}
          </p>
          <p class="mt-2">
            <b>{{ $t("keys.keys") }}</b
            >:
          </p>
          <ul class="list">
            <li>
              <b
                >{{ $t("keys.mouseWheelUp") }}/{{
                  $t("keys.mouseWheelDown")
                }}</b
              >: {{ $t("editor.image.toZoom") }}
            </li>
          </ul>
        </div>
      </slot>
    </template>
  </MSGenericTooltip>
</template>

<script setup lang="ts"></script>

<style scoped>
b {
  @apply font-bold;
}
.example {
  @apply text-text-secondary italic;
}
.list {
  @apply list-disc list-inside;
}
</style>
