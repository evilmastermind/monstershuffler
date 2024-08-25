<template>
  <div class="m-4">
    <div ref="editorRef" class="test p-4" contenteditable>THIS IS CONTENT</div>
    <MSButton class="mt-4" text="Print markdown" @click="printMarkdown" />
    <div>
      {{ markdown }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { createEditor } from "lexical";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
  registerMarkdownShortcuts,
} from "@lexical/markdown";

const config = {
  namespace: "Obsidian.md Wannabe Editor",
  nodes: [HeadingNode, QuoteNode, CodeNode, LinkNode, ListNode, ListItemNode],
  onError: (error: Error) => {
    throw error;
  },
  theme: {
    // Adding styling to Quote node, see styles.css
    quote: "PlaygroundEditorTheme__quote",
  },
};

const editor = createEditor(config);
const editorRef = ref<HTMLElement | null>(null);
const markdown = ref("");

function printMarkdown() {
  editor.update(() => {
    markdown.value = $convertToMarkdownString(TRANSFORMERS);
  });
}

onMounted(() => {
  if (!editorRef.value || !editor) {
    console.log("Editor root element is not available");
  }
  // editor.update(() => {
  //   const markdown = $convertToMarkdownString(TRANSFORMERS);
  //   $convertFromMarkdownString(markdown, TRANSFORMERS);
  // });

  editor.setRootElement(editorRef.value);
  mergeRegister(registerRichText(editor));
  mergeRegister(registerMarkdownShortcuts(editor, TRANSFORMERS));
});
</script>
<style scoped lang="scss">
.test {
  background-color: #fff;
}
.test:focus {
  outline: none;
}
</style>
