<template>
  <div class="prompt-container">
    <input
      v-model="prompt"
      type="text"
      class="ms-input w-full prompt pr-6"
      :placeholder="$t('generator.prompt.placeholder')"
      @keyup.enter="generateNpcsThrottle"
    />
    <MSIconButton
      v-if="!isLoading"
      class="generate-button text-primary-700 px-2 text-2xl"
      :label="$t('generator.form.generate')"
      icon="fa6-solid:shuffle"
      @click="generateNpcsThrottle"
    />
    <LoadingSpinner
      v-else
      color="primary"
      :size="1.3"
      class="generate-button mx-2 pr-2"
    />
    <MSAlert
      v-if="tooManyRequests"
      type="danger"
      @close="tooManyRequests = false"
    >
      <p>{{ $t("error.tooManyRequests") }}</p>
    </MSAlert>
  </div>
</template>

<script setup lang="ts">
import { getChallengeNumber } from "monstershuffler-shared";

const generator = useGeneratorStore();
const user = useUserStore();

const { promptOptions, keywords, settings } = storeToRefs(generator);
const prompt = ref("");

const isLoading = ref(false);
const tooManyRequests = ref(false);

const generateNpcsThrottle = throttle(() => generateNpcs(), 1000);

async function generateNpcs() {
  isLoading.value = true;
  promptOptions.value = {};
  const words = prompt.value.trim().toLowerCase().split(" ");
  let i = 0;
  let word = "";
  let wordsCount = 1;

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
        keyword.word.includes(word)
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
      i = i - wordsCount + 1;
      wordsCount = 1;
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
  promptOptions.value.addVoice = settings.value?.addVoice || true;
  promptOptions.value.includeChildren =
    settings.value?.includeChildren || false;
  promptOptions.value.levelType =
    settings.value?.levelType || "randomPeasantsMostly";

  const reply = await generator.getRandomNpcs(
    promptOptions.value,
    user.sessionId
  );
  if (reply === 429) {
    tooManyRequests.value = true;
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.prompt-container {
  position: relative;
}
.generate-button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
}
</style>
