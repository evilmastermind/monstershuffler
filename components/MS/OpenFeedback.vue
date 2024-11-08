<template>
  <div class="feedback-container">
    <div class="feedback">
      <p class="static question">{{ question }}</p>
      <textarea
        v-model="answer.answer"
        class="ms-input-style answer mt-2"
        :placeholder="$t('yourAnswerHere')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Answer } from "@/types";

const answer = ref<Answer>({
  answer: "",
});

const p = defineProps({
  questionId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.feedback {
  max-width: theme("screens.nav");
}
.question {
  font-weight: bold;
}
.answer {
  width: 100%;
  height: 100px;
  resize: none;
  @apply py-1 px-2;
}
</style>
