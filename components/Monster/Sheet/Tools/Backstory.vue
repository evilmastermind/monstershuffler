<template>
  <MSGenericTooltip :max-width="350">
    <template #default>
      <slot name="default">
        <MSIconButton
          :label="$t('monsterSheet.editBackstory')"
          icon="humbleicons:align-text-left"
        />
      </slot>
    </template>
    <template #tooltip>
      <slot name="tooltip">
        <div class="text-sm">
          <h4 class="content">Backstory Editor:</h4>
          <p class="content">Click the backstory to edit it.</p>
          <p class="content">
            The new text editor, based on
            <a class="content" href="https://playground.lexical.dev/"
              >Lexical</a
            >
            by Meta, is still a work in progress. The following
            <b>Markdown shortcuts</b> are supported:
          </p>
          <ul class="list">
            <li><b>#</b> Header1, <b>##</b> Header2, etc.</li>
            <li><b>-</b> unordered lists</li>
            <li><b>1.</b> ordered lists</li>
            <li><b>**bold**</b> or <b>__bold__</b></li>
            <li><i>*italic*</i> or <i>_italic_</i></li>
            <li><s>~~strikethrough~~</s></li>
            <li><mark>==highlight==</mark></li>
            <li>
              <b>[</b>link description<b>](</b>https://www.link.meh<b>)</b>
            </li>
            <li>
              <b>{{ ">" }}</b> quote
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
  @apply text-text-2 italic;
}
.list {
  @apply list-disc list-inside;
}
</style>
