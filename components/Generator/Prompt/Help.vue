<template>
  <UPopover>
    <MSIconButton
      icon="i-xxx-question-mark"
      :label="$t('generator.promptHelp')"
    />
    <template #content>
      <div class="text-sm text-left max-w-[350px] p-6">
        <TH4>Prompt mode keywords:</TH4>
        <TP class="mt-2">
          e.g.
          <i>"evil male drow innkeeper rogue cr 6"</i>
        </TP>
        <ul class="list-disc list-inside break-normal py-2">
          <li>
            <b>any* race</b> or variant:
            <i>"drow"</i>
          </li>
          <li>
            <b>any* class</b> or variant:
            <i>"rogue"</i>
          </li>
          <li>
            <b>any* background</b>:
            <i>"innkeeper"</i>
          </li>
          <li>
            <b>male</b>, <b>female</b>, <b>nonbinary</b>: defines the pronouns
            used in the stat block
          </li>
          <li>
            <b>cr {number}</b>: challenge rating:
            <i>"cr 6"</i>
          </li>
          <li>
            <b>lawful</b>, <b>chaotic</b>, <b>good</b>, <b>evil</b>,
            <b>neutral</b> alignment:
            <i>"lawful evil"</i>
          </li>
        </ul>
        <p class="mt-4">
          <b>*</b>check the races, classes and backgrounds available in "form"
          mode.
        </p>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts"></script>

<style scoped></style>
