<template>
  <div ref="editorRef" contenteditable class="editor"></div>
</template>

<script setup lang="ts">
const p = defineProps({
  backstory: {
    type: String,
    default: undefined,
  },
});

const moral = inject("moral") as ComputedRef<string>;

const lexicalTheme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: `editor-heading-h1 ${moral.value || ""}`,
    h2: `editor-heading-h2 ${moral.value || ""}`,
    h3: `editor-heading-h3 ${moral.value || ""}`,
    h4: `editor-heading-h4 ${moral.value || ""}`,
    h5: `editor-heading-h5 ${moral.value || ""}`,
    h6: `editor-heading-h6 ${moral.value || ""}`,
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
    highlight: "editor-textHighlight",
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
};

const editorRef = ref<HTMLElement | null>(null);
const generatorStore = useGeneratorStore();
const lexical = useLexicalStore();
const isEditable = ref(false);

const { currentCharacterWithGeneratorData } = storeToRefs(generatorStore);

const chunks = computed(() => {
  return currentCharacterWithGeneratorData.value?.streamChunks || [];
});

watch(
  () => chunks.value.length,
  () => {
    lexical.appendMarkdownChunks(chunks.value);
  }
);

onMounted(() => {
  if (!editorRef.value) {
    return;
  }

  lexical.createLexicalEditor(editorRef.value, lexicalTheme);

  if (p.backstory && !currentCharacterWithGeneratorData.value?.isStreamOpen) {
    lexical.importMarkdown(p.backstory);
  }
});
</script>

<style>
/* default styles */
.editor {
  font-family: "LibreBaskerville", serif;
  font-size: 1rem;
  @apply text-text;
}
.editor:focus {
  outline: none;
}

/* paragraph */
.editor-paragraph {
  line-height: 1.6;
  @apply mt-2 mb-4;
}
.editor-paragraph + .editor-paragraph {
  text-indent: 1em;
}

/* heading */
.editor-heading-h1 {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-6 mb-4;
}
.editor-heading-h2 {
  font-size: 2rem;
  letter-spacing: 0.02em;
  font-family: "MrsEavesSmallCaps", serif;
  line-height: 1em;
  @apply mt-6 mb-4;
}
.editor-heading-h3 {
  font-size: 1.7rem;
  letter-spacing: 0.05em;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  text-decoration: underline;
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
  @apply mt-5 mb-2;
}
.editor-heading-h4 {
  font-size: 1.5rem;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-4 mb-2;
}
.editor-heading-h5 {
  font-size: 1.3rem;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-3 mb-2;
}
.editor-heading-h6 {
  font-size: 1.1rem;
  line-height: 1em;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-2 mb-2 text-text-evil;
}

/* quote */
.editor-quote {
  font-style: italic;
  quotes: "«" "»" "‹" "›";
  text-align: center;
  @apply mt-4 mb-4;
}
.editor-quote::before {
  content: open-quote;
}
.editor-quote::after {
  content: close-quote;
}

/* list */
.editor-list-ol {
  list-style-type: decimal;
  @apply mt-4 mb-4;
}
.editor-list-ul {
  list-style-type: disc;
  @apply mt-4 mb-4;
}
.editor-nested-listitem {
  margin-left: 1em;
}
.editor-listItem {
  @apply ml-6;
}

/* link */
.editor-link {
  text-decoration: underline;
  cursor: pointer;
  @apply text-text-evil;
}

/* hightlight */
.editor-textHighlight {
  @apply text-text bg-primary-200;
}
</style>
