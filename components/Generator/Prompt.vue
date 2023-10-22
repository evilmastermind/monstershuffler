<template>
  <div>
    <input
      v-model="prompt"
      type="text"
      class="ms-input max-w-3xl w-full mb-4"
      :placeholder="$t('generator.prompt.placeholder')"
    />
  </div>
</template>

<script setup>
const prompt = ref("");

/*

SPECIAL WORDS
=============
cr
male female
lawful chaotic neutral good evil

HOW DOES THE ALGORYTHM WORK?
==============================
1) I need to create an array of words. These must come from
- special words
- races
- race variants
- classes
- class variants
- backgrounds

2) I need to divide the prompt into words

3) Make a loop
example: evil archfey warlock dwarf cr 10
  a) Pick a word from the prompt
  b) find the word inside the array (exact match)
  c) if you find it, update the options object that's sent to the backend
    with the object corresponding to that word (ex: backgroundId: 6969)
  d) if you don't find it, search the word inside the array (.includes[word])
  e) if you find only one, update the options object with the object
    corresponding to that word
  f) if you find more than one, add the next word from the prompt and
    repeat from step b)
  g) if you still find more than one, add the next word from the prompt and
    repeat from step b)
  h) if you don't find any correspondence, remove the last word, and
    ... at this point I suppose you should pick one of the partially
    matching objects at random
  



*/
</script>

<style lang="scss" scoped></style>
