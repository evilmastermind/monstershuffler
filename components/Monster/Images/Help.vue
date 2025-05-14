<template>
  <UPopover>
    <MSIconButton icon="i-xxx-question-mark" :label="$t('guide')" />
    <template #content>
      <div class="text-sm text-left max-w-[350px] p-6">
        <TH4>{{ $t("editor.image.placement") }}</TH4>
        <TP class="mt-2">
          <b>{{ $t("editor.image.tokenCircle") }}</b
          >: {{ $t("editor.image.tokenCircleHelp") }}
        </TP>
        <TP class="mt-2">
          <b>{{ $t("keys.keys") }}</b
          >:
        </TP>
        <ul class="list-disc list-inside break-normal py-2">
          <li>
            <b>{{ $t("keys.mouseWheelUp") }}/{{ $t("keys.mouseWheelDown") }}</b
            >: {{ $t("editor.image.toZoom") }}
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts"></script>

<style scoped></style>
