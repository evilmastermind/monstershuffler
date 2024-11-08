<template>
  <PresentationFooter>
    <template #feedback>
      <div class="feedback">
        <MSOpenFeedback
          :question-id="randomQuestion.id"
          :question="randomQuestion.question"
        />
      </div>
    </template>
  </PresentationFooter>
</template>

<script setup lang="ts">
/**
 * ('019306e3-f9eb-7dba-a650-ace9b2ecb3f7', 'npcgenerator_new_ideas', '{"question": "Are there any features you would like to see added to the NPC generator?"}'),
 * ('019306e4-1f06-7bd1-a875-df052189d19f', 'npcgenerator_improvements', '{"question": "Is there anything you don't like, or that could be improved about the NPC generator?"}');,
 */

const questions = [
  {
    id: "019306e3-f9eb-7dba-a650-ace9b2ecb3f7",
    question:
      "Are there any features you would like to see added to the NPC Generator?",
  },
  {
    id: "019306e4-1f06-7bd1-a875-df052189d19f",
    question:
      "Is there anything you don't like, or that could be improved about the NPC Generator?",
  },
];

const randomQuestion = computed(() => {
  return questions[Math.floor(Math.random() * questions.length)];
});
</script>

<style scoped>
.feedback {
}
</style>
