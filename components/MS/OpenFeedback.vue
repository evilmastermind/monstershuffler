<template>
  <div class="feedback-container">
    <div class="feedback">
      <p class="static question">{{ question }}</p>
      <textarea
        v-model="answer.answer"
        class="ms-input-style answer mt-2"
        placeholder="Write your feedback here."
      />
      <MSButton
        class="mt-1"
        size="small"
        block
        color="dark"
        :loading
        @click="sendFeedback"
      >
        {{ $t("feedback.sendFeedback") }}
      </MSButton>
      <MSAlert
        v-if="isThankYouShown"
        type="success"
        @close="isThankYouShown = false"
      >
        <p>{{ $t("feedback.thankYou") }}</p>
      </MSAlert>
      <MSAlert v-if="isErrorShown" type="danger" @close="isErrorShown = false">
        <p>{{ $t("error.generic") }}</p>
      </MSAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Answer } from "@/types";

const user = useUserStore();

const answer = ref<Answer>({
  answer: "",
});
const isThankYouShown = ref(false);
const isErrorShown = ref(false);
const loading = ref(false);

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

async function sendFeedback() {
  if (answer.value.answer && answer.value.answer.length > 0) {
    loading.value = true;
    const response = await user.setFeedback(p.questionId, answer.value);
    loading.value = false;
    if (response === 200) {
      isThankYouShown.value = true;
      answer.value.answer = "";
    } else {
      isErrorShown.value = true;
    }
  }
}
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0;
}
.question {
  @apply text-text;
}
.answer {
  width: 100%;
  height: 100px;
  resize: none;
  @apply py-1 px-2;
}
</style>
