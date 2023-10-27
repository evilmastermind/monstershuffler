<template>
  <div>
    <input
      v-model="prompt"
      type="text"
      class="ms-input max-w-3xl w-full mb-4"
      :placeholder="$t('generator.prompt.placeholder')"
      @keyup.enter="generateNpc"
    />
  </div>
</template>

<script setup>
const generator = useGeneratorStore();

const prompt = ref("");
const { promptOptions, keywords } = storeToRefs(generator);

function generateNpc() {
  const words = prompt.value.toLowerCase().split(" ");
  if (words.length === 0) {
    return;
  }
  let i = 0;
  let word = "";
  let wordsCount = 1;
  console.clear();
  while (i < words.length) {
    if (!word) {
      word = words[i];
    }
    const exactMatch = keywords.value.find((keyword) => keyword.word === word);
    if (exactMatch) {
      // example: word was "druid" and the druid class was found
      promptOptions.value[exactMatch.type] = exactMatch.value;
      word = "";
      wordsCount = 1;
    } else {
      const partialMatch = keywords.value.filter((keyword) =>
        keyword.word.includes(word)
      );
      if (partialMatch.length === 1) {
        // example: word was "asmodeus" and "tiefling of asmodeus" was found
        promptOptions.value[exactMatch.type] = partialMatch.value;
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
  console.log(promptOptions.value);
}
</script>

<style lang="scss" scoped></style>
