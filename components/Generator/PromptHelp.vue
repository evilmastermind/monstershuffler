<template>
  <MSGenericTooltip :max-width="350">
    <template #default>
      <slot name="default">
        <font-awesome-icon
          class="text-text-secondary"
          icon="fa-fw fas fa-circle-question"
        />
      </slot>
    </template>
    <template #tooltip>
      <slot name="tooltip">
        <div class="text-sm">
          <h4 class="content">Prompt mode keywords:</h4>
          <p class="content">
            ex:
            <span class="example">"evil male drow innkeeper rogue cr 6"</span>
          </p>
          <ul class="list">
            <li>
              <b>any race</b> or variant: ex:
              <span class="example">"drow"</span>
            </li>
            <li>
              <b>any class</b> or variant: ex:
              <span class="example">"rogue"</span>
            </li>
            <li>
              <b>any background</b>: ex:
              <span class="example">"innkeeper"</span>
            </li>
            <li>
              <b>male</b>, <b>female</b>, <b>nonbinary</b>: defines the pronouns
              used in the stat block
            </li>
            <li>
              <b>cr {number}</b>: challenge rating, ex:
              <span class="example">"cr 6"</span>
            </li>
            <li>
              <b>lawful</b>, <b>chaotic</b>, <b>good</b>, <b>evil</b>,
              <b>neutral</b>: alignment, ex:
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
