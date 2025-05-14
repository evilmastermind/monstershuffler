<template>
  <UPopover>
    <MSIconButton
      icon="i-xxx-text-edit"
      :label="$t('monsterSheet.editBackstory')"
    />
    <template #content>
      <div class="text-sm text-left max-w-[350px] p-6">
        <TH4>Backstory Editor:</TH4>
        <TP class="mt-2"> Click the backstory to edit it. </TP>
        <TP>
          The following <b>Markdown shortcuts</b> are supported (more to come):
        </TP>
        <ul class="list-disc list-inside break-normal py-2">
          <li><b>#</b> Header1, <b>##</b> Header2, etc.</li>
          <li><b>-</b> unordered lists</li>
          <li><b>1.</b> ordered lists</li>
          <li><b>**bold**</b> or <b>__bold__</b></li>
          <li><i>*italic*</i> or <i>_italic_</i></li>
          <li><s>~~strikethrough~~</s></li>
          <li><mark>==highlight==</mark></li>
          <li><b>[</b>link description<b>](</b>https://www.link.meh<b>)</b></li>
          <li>
            <b>{{ ">" }}</b> quote
          </li>
        </ul>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts"></script>

<style scoped></style>
