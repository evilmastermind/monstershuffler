<template>
  <MSGenericTooltip :max-width="350">
    <template #default>
      <slot name="default">
        <Icon class="text-text-secondary" name="fa6-solid:circle-question" />
      </slot>
    </template>
    <template #tooltip>
      <slot name="tooltip">
        <div class="text-sm">
          <h4 class="content">Prompt mode keywords:</h4>
          <p class="content">
            e.g.
            <span class="example">"evil male drow innkeeper rogue cr 6"</span>
          </p>
          <ul class="list">
            <li>
              <b>any race</b> or variant:
              <span class="example">"drow"</span>
            </li>
            <li>
              <b>any class</b> or variant:
              <span class="example">"rogue"</span>
            </li>
            <li>
              <b>any background</b>:
              <span class="example">"innkeeper"</span>
            </li>
            <li>
              <b>male</b>, <b>female</b>, <b>nonbinary</b>: defines the pronouns
              used in the stat block
            </li>
            <li>
              <b>cr {number}</b>: challenge rating:
              <span class="example">"cr 6"</span>
            </li>
            <li>
              <b>lawful</b>, <b>chaotic</b>, <b>good</b>, <b>evil</b>,
              <b>neutral</b> alignment:
              <span class="example">"lawful evil"</span>
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
