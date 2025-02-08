<template>
  <div>
    <h2 class="static text-left">Random Text Generators</h2>
    <div class="notes mt-6">
      <div class="examples">
        <PresentationTool>
          <template #image>
            <EditorPageRandomExample />
          </template>
        </PresentationTool>
        <Icon name="iconamoon:arrow-right-1-bold" class="examples-arrow" />
        <PresentationTool>
          <template #image>
            <EditorPageRandomPrompt />
          </template>
        </PresentationTool>
        <Icon name="iconamoon:arrow-right-1-bold" class="examples-arrow" />
        <PresentationTool>
          <template #image>
            <EditorPageRandomGeneration />
          </template>
        </PresentationTool>
      </div>
      <div class="notes-description">
        <p class="static">
          Use random text generators to quickly create content for your games.
        </p>
        <ul class="static mt-2">
          <li class="item-grammar">
            <em>Grammar</em>: A
            <span class="static-mono"
              ><span class="symbol">(+</span>simple
              <span class="symbol">|</span> easy
              <span class="symbol">|</span> intuitive<span class="symbol"
                >)
              </span>
              <span class="symbol">[</span>but powerful<span class="symbol"
                >]</span
              ></span
            >
            grammar defines the structure of your output.
          </li>
          <li class="item-ai">
            <em>AI Generation</em>: Use the output as is, or feed it to an AI as
            a prompt to get even more randomness.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @apply gap-2;
}
.note {
  width: 100%;
  max-width: 500px;
  @apply mx-auto rounded border border-inset-300;
}
.notes-description {
  max-width: 500px;
  @apply mt-6;
}
.examples {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @apply gap-1;
}
.examples-arrow {
  font-size: 30px;
  width: 20px;
  @apply text-text-icon;
}
@media (min-width: theme("screens.md")) {
  .notes {
    flex-direction: row;
    @apply gap-8;
  }
  .note {
    max-width: 370px;
    min-width: 370px;
  }
  .notes-description {
    @apply mt-0;
  }
}
.item-grammar::before {
  content: "🔤";
}
.item-ai::before {
  content: "🤖";
}
</style>
