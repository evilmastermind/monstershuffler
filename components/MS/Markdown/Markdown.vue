<template>
  <div ref="test" contenteditable="true">
    TEST DI QUALCOSA
    <component
      :is="getLineType(line.text)"
      v-for="(line, index) in lines"
      :key="index"
      @input="handleInput"
      @keydown.enter="handleInput"
    >
      {{ line.text }}
    </component>
  </div>
</template>

<script setup lang="ts">
import { useMutationObserver } from "@vueuse/core";

const text = defineModel({ type: String });

const lines = ref<{ text: string }[]>([]);
const test = ref(null);
console.log(test);

function getLineType(line: string) {
  if (line.startsWith("#")) {
    // count how many # there are
    // if there are more than 6, return "p"
    const count = line.match(/#/g)?.length;
    if (count && count <= 6) {
      return "h" + count;
    }
    return "p";
  }
  return "p";
}

function handleInput(event) {
  const newText = event.target.innerText;
  console.log("Content changed:", newText);
}

/**
 *
 * 1) the original text is passed a string with two-way binding (defineModel);
 * - defineModel
 * 2) in the main component, the text is parsed into lines and converted into an array;
 * - watch(text)
 * - split("\n")
 * 3) when a line changes, the original text is updated;
 * - watch(lines) deep:true
 * - join("\n")
 * 4) each line needs also to be parsed for markdown. In order to make this efficient, each line
 *    needs to be a separate component. Inside this component, we will have a <component> element
 *    and try to dynamically set it as an HTML element (or another custom vue component)
 * - Line.vue
 * - getLineType()
 * 5) The line should show the rendered text, without the markdown syntax. This means that,
 *    at this level (or maybe at an inner level), we should introduce objects that will define
 *    what the line should look like.
 *     {
 *      type: "h1",
 *      parsedtext: "This is a title",
 *      originalTextBefore: "# "
 *      originalTextAfter: ""
 *     }
 * 6) The line should be editable. There has to be a pointer variable somewhere, that tells
 *    where the cursor is. This variable should be updated when the user clicks on a line.
 *    To understand which character of the line the user clicked on, we can use mouse events.
 *    To avoid having the text shift when reintroducting Markdown syntax, we can
 * - convert the text into originalTextBefore + parsedtext + originalTextAfter
 * - when the user clicks on a line, we can determine the position of the cursor with parsedTextOnly
 * - after we determine the position we convert the line into a text input and add originalTextBefore
 *   and originalTextAfter
 *
 * 7) in order for this to work, we need to add another layer of abstraction after line, in order to
 *    parse elements like <b>, <i>, <a>, <img>, etc.
 *
 *
 * tests:
 *
 * # This is a title
 *
 * => line => (h1) => of one element, which can be rendered as text
 *
 * This is a paragraph
 *
 * => line => (p) => of one element => (no element?)
 *
 * Blimey, *Harry*!
 *
 * => line => of two elements => p
 *
 */

useMutationObserver(
  test,
  (mutations) => {
    console.log("Mutations observed");
    if (mutations[0]) console.log(mutations[0].attributeName);
  },
  { attributes: true, childList: true, subtree: true, characterData: true }
);

watch(
  text,
  (value) => {
    if (!value) {
      return;
    }
    lines.value = [];
    value.split("\n").forEach((line) => lines.value.push({ text: line }));
  },
  { immediate: true }
);
</script>

<style scoped></style>
