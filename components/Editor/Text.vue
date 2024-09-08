<template>
  <div ref="editorRef" contenteditable class="editor"></div>
</template>

<script setup lang="ts">
// TODO: remove lexical-code dependency from lexical-markdown
// @ts-expect-error something is seriously wrong with PrismJS and Lexical
import Prism from "prismjs";
import { CodeNode } from "@lexical/code";
import { createEditor } from "lexical";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import { ThrottledFunctionLock } from "@/utils";
import {
  TRANSFORMERS,
  registerMarkdownShortcuts,
  $appendMarkdownString,
  $convertFromMarkdownString,
} from "@/plugins-other/lexical-markdown";

// @ts-expect-error something is seriously wrong with PrismJS and Lexical
if (typeof globalThis.Prism === "undefined") {
  // @ts-expect-error something is seriously wrong with PrismJS and Lexical
  globalThis.Prism = Prism;
}

const p = defineProps({
  backstory: {
    type: String,
    default: undefined,
  },
});

const config = {
  namespace: "text", // TODO: does this need to be unique if multiple editors are on the same page?
  nodes: [HeadingNode, QuoteNode, CodeNode, LinkNode, ListNode, ListItemNode],
  onError: (error: Error) => {
    throw error;
  },
  theme: {
    ltr: "ltr",
    rtl: "rtl",
    paragraph: "editor-paragraph",
    quote: "editor-quote",
    heading: {
      h1: "editor-heading-h1",
      h2: "editor-heading-h2",
      h3: "editor-heading-h3",
      h4: "editor-heading-h4",
      h5: "editor-heading-h5",
      h6: "editor-heading-h6",
    },
    list: {
      nested: {
        listitem: "editor-nested-listitem",
      },
      ol: "editor-list-ol",
      ul: "editor-list-ul",
      listitem: "editor-listItem",
      listitemChecked: "editor-listItemChecked",
      listitemUnchecked: "editor-listItemUnchecked",
    },
    hashtag: "editor-hashtag",
    image: "editor-image",
    link: "editor-link",
    text: {
      bold: "editor-textBold",
      code: "editor-textCode",
      italic: "editor-textItalic",
      strikethrough: "editor-textStrikethrough",
      subscript: "editor-textSubscript",
      superscript: "editor-textSuperscript",
      underline: "editor-textUnderline",
      underlineStrikethrough: "editor-textUnderlineStrikethrough",
    },
    code: "editor-code",
    codeHighlight: {
      atrule: "editor-tokenAttr",
      attr: "editor-tokenAttr",
      boolean: "editor-tokenProperty",
      builtin: "editor-tokenSelector",
      cdata: "editor-tokenComment",
      char: "editor-tokenSelector",
      class: "editor-tokenFunction",
      "class-name": "editor-tokenFunction",
      comment: "editor-tokenComment",
      constant: "editor-tokenProperty",
      deleted: "editor-tokenProperty",
      doctype: "editor-tokenComment",
      entity: "editor-tokenOperator",
      function: "editor-tokenFunction",
      important: "editor-tokenVariable",
      inserted: "editor-tokenSelector",
      keyword: "editor-tokenAttr",
      namespace: "editor-tokenVariable",
      number: "editor-tokenProperty",
      operator: "editor-tokenOperator",
      prolog: "editor-tokenComment",
      property: "editor-tokenProperty",
      punctuation: "editor-tokenPunctuation",
      regex: "editor-tokenVariable",
      selector: "editor-tokenSelector",
      string: "editor-tokenSelector",
      symbol: "editor-tokenProperty",
      tag: "editor-tokenProperty",
      url: "editor-tokenOperator",
      variable: "editor-tokenVariable",
    },
  },
};
let currentChunk = 0;
const lock = new ThrottledFunctionLock();

const editor = createEditor(config);
const editorRef = ref<HTMLElement | null>(null);
const generatorStore = useGeneratorStore();

const { currentCharacterWithGeneratorData } = storeToRefs(generatorStore);

const chunks = computed(() => {
  return currentCharacterWithGeneratorData.value?.streamChunks || [];
});

async function appendChunks() {
  // eslint-disable-next-line require-await -- lock.run is async but my function is not
  await lock.run(async () => {
    const chunksLength = chunks.value.length;
    if (chunksLength <= currentChunk) {
      return;
    }
    const lastChunks = chunks.value.slice(currentChunk, chunksLength);
    editor.update(() => {
      $appendMarkdownString(lastChunks.join(""), TRANSFORMERS);
    });
    currentChunk = chunksLength;
  });
}

watch(
  () => chunks.value.length,
  () => {
    appendChunks();
  }
);

onMounted(() => {
  if (editorRef.value) {
    editor.setRootElement(editorRef.value);
    mergeRegister(registerRichText(editor));
    mergeRegister(registerMarkdownShortcuts(editor, TRANSFORMERS));
  }
  if (p.backstory && !currentCharacterWithGeneratorData.value?.isStreamOpen) {
    editor.update(() => {
      $convertFromMarkdownString(p.backstory || "", TRANSFORMERS);
    });
  }
});
</script>

<style>
.editor:focus {
  outline: none;
}
.editor-heading-h1 {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
}
.editor-heading-h2 {
  font-size: 2rem;
  letter-spacing: 0.02em;
  font-family: "MrsEavesSmallCaps", serif;
  line-height: 1em;
  @apply mt-6 mb-4 text-text-evil;
}
.editor-heading-h3 {
  font-size: 1.7rem;
  letter-spacing: 0.05em;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
  @apply mt-5 mb-2 text-text-evil decoration-text-evil/40;
}
.editor-paragraph {
  line-height: 1.6;
  font-size: 1rem;
  font-family: "LibreBaskerville", serif;
  @apply mt-2 mb-4;
}
.editor-paragraph + .editor-paragraph {
  text-indent: 1em;
}
</style>
