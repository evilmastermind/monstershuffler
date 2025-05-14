<template>
  <div class="relative">
    <label for="npc-prompt" class="sr-only">
      {{ $t("generator.prompt.label") }}
    </label>
    <UButtonGroup class="w-full">
      <UInput
        id="npc-prompt"
        class="w-full"
        v-model="prompt"
        color="neutral"
        variant="outline"
        :placeholder="$t(`generator.prompt.placeholder.${placeholder}`)"
        loading-icon="i-xxx-loading"
        @keyup.enter="generateNpcsThrottle"
        @input="resetWordsNotFound"
      >
        <template #trailing>
          <UKbd value="enter" />
        </template>
      </UInput>
      <UButton
        color="primary"
        variant="subtle"
        size="sm"
        :loading="isLoading"
        @click="generateNpcsThrottle"
        icon="i-xxx-random"
      />
    </UButtonGroup>
    <p
      v-if="promptOptions.wordsNotFound?.length"
      class="absolute z-10 text-xs tracking-wider flex items-center flex-wrap gap-1"
    >
      <span class="sr-only">
        {{ $t("error.notFound") }}
      </span>
      <s
        v-for="word in promptOptions.wordsNotFound"
        :key="word"
        class="word-not-found bg-primary text-inverted rounded-sm px-1"
      >
        {{ word }}
      </s>
    </p>
  </div>
</template>

<script setup lang="ts">
import { getChallengeNumber } from "monstershuffler-shared";

const generator = useGeneratorStore();
const user = useUserStore();

const { promptOptions, keywords, settings, prompt, promptFromOtherSources } =
  storeToRefs(generator);

const isLoading = ref(false);
const placeholder = ref(random(1, 3));

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);

async function generateNpcs() {
  localStorage.setItem("generator.prompt.hasGeneratedOnce", "true");
  isLoading.value = true;
  promptOptions.value = {};
  const words = prompt.value.trim().toLowerCase().split(" ");
  let i = 0;
  let word = "";
  let wordsCount = 1;
  const wordsNotFound: string[] = [];

  while (i < words.length) {
    if (!word) {
      word = words[i];
    }
    // SPECIAL KEYWORDS - challenge rating
    if (word === "cr" && i + 1 < words.length) {
      const nextWord = words[i + 1];
      if (!isNaN(parseInt(nextWord))) {
        promptOptions.value.CRChosen = getChallengeNumber(nextWord);
        word = "";
        i++;
      }
      // SPECIAL KEYWORDS - alignment and pronouns
    } else {
      switch (word) {
        case "lawful":
          promptOptions.value.alignmentEthicalChosen = "Lawful";
          word = "";
          break;
        case "chaotic":
          promptOptions.value.alignmentEthicalChosen = "Chaotic";
          word = "";
          break;
        case "good":
          promptOptions.value.alignmentMoralChosen = "Good";
          word = "";
          break;
        case "evil":
          promptOptions.value.alignmentMoralChosen = "Evil";
          word = "";
          break;
        case "neutral":
          promptOptions.value.alignmentEthicalChosen =
            promptOptions.value.alignmentEthicalChosen || "Neutral";
          promptOptions.value.alignmentMoralChosen =
            promptOptions.value.alignmentMoralChosen || "Neutral";
          word = "";
          break;
        case "female":
          promptOptions.value.pronounsChosen = "female";
          word = "";
          break;
        case "male":
          promptOptions.value.pronounsChosen = "male";
          word = "";
          break;
        case "nonbinary":
          promptOptions.value.pronounsChosen = "neutral";
          word = "";
          break;
      }
    }
    if (!word) {
      i++;
      continue;
    }
    // OBJECT KEYWORDS (classes, races, backgrounds)
    const exactMatch = keywords.value.find((keyword) => keyword.word === word);
    if (exactMatch) {
      // example: word was "druid" and the druid class was found
      (promptOptions.value[exactMatch.type] as number) = exactMatch.value;
      if ("variantOfType" in exactMatch) {
        (promptOptions.value[exactMatch.variantOfType] as number) =
          exactMatch.variantOf;
      }
      word = "";
      wordsCount = 1;
    } else {
      const partialMatch = keywords.value.filter((keyword) =>
        keyword.word.includes(word),
      );
      if (partialMatch.length === 1) {
        // example: word was "asmodeus" and "tiefling of asmodeus" was found
        (promptOptions.value[partialMatch[0].type] as number) =
          partialMatch[0].value;
        if ("variantOfType" in partialMatch[0]) {
          (promptOptions.value[partialMatch[0].variantOfType] as number) =
            partialMatch[0].variantOf;
        }
        // example: word was "caravan", the background "caravan leader" was found,
        // we need to skip the next word ("leader") otherwise the
        // background "leader" will be picked instead on the next loop
        const indexOfOccurrence = partialMatch[0].word.indexOf(word);
        if (indexOfOccurrence + word.length < partialMatch[0].word.length) {
          const remainingWords = partialMatch[0].word
            .substring(indexOfOccurrence + word.length + 1)
            .trim()
            .split(" ");
          remainingWords.forEach((remainingWord) => {
            if (remainingWord === words[i + 1]) {
              i++;
            }
          });
        }
        word = "";
        wordsCount = 1;
      } else if (i + 1 < words.length) {
        // example: word was "of", next word is "asmodeus", we try now to search for "of asmodeus"
        word += " " + words[i + 1];
        wordsCount++;
      }
    }
    if (wordsCount > 1 && i === words.length - 1) {
      // we tried to match a list of words, adding word after word until the end of the prompt, but failed,
      // so we discard the first word of that list and start again from the second word of the list
      // example: words were "abcdefg druid cr 5", we discard "abcdefg" and start again with "druid"
      wordsNotFound.push(words[i - wordsCount + 1]);
      i = i - wordsCount + 1;
      wordsCount = 1;
      word = "";
    } else if (wordsCount === 1 && i === words.length - 1) {
      wordsNotFound.push(word);
      word = "";
    }
    i++;
  }
  // adding additional keywords
  if (promptOptions.value.primaryRaceId) {
    promptOptions.value.primaryRacePercentage = 100;
  }
  if (promptOptions.value.classId) {
    promptOptions.value.classType = "specific";
  } else {
    promptOptions.value.classType = "none";
  }
  if (promptOptions.value.backgroundId) {
    promptOptions.value.backgroundType = "specific";
  } else if (
    words.length === 1 &&
    (words[0] === "" || promptOptions.value.primaryRaceId)
  ) {
    promptOptions.value.backgroundType = "random";
  } else {
    promptOptions.value.backgroundType = "none";
  }
  promptOptions.value.addVoice = settings.value.options?.addVoice || true;
  promptOptions.value.includeChildren =
    settings.value.options?.includeChildren || false;
  promptOptions.value.levelType =
    settings.value.options?.levelType || "randomPeasantsMostly";
  promptOptions.value.includeBodyType =
    settings.value.options?.includeBodyType || false;

  promptOptions.value.wordsNotFound = [...new Set(wordsNotFound)].filter(
    (word) => word.length > 0,
  );

  const reply = await generator.getRandomNpcs(
    promptOptions.value,
    user.sessionId,
  );
  isLoading.value = false;
}

function resetWordsNotFound() {
  promptOptions.value.wordsNotFound = [];
}

watch(promptFromOtherSources, () => {
  prompt.value = promptFromOtherSources.value;
  generateNpcsThrottle();
});

onMounted(() => {
  resetWordsNotFound();
  // promptElement.value?.focus();
});
</script>
<style scoped>
.word-not-found {
  animation: disappear 3s forwards;
}
@keyframes disappear {
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  5% {
    opacity: 1;
    transform: translateY(0);
  }
  95% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%);
  }
}
</style>
