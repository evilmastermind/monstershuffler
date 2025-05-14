<template>
  <div
    ref="editorRef"
    contenteditable
    class="text-default font-[LibreBaskerville] focus:outline-none"
    @focus="isFocused = true"
    @blur="isFocused = false"
  ></div>
</template>

<script setup lang="ts">
import { throttle } from "monstershuffler-shared";
import type { StreamStatus } from "@/types";

const e = defineEmits(["text-updated"]);
const p = defineProps({
  text: { type: String, default: "" },
  streamChunks: { type: Array as PropType<string[]>, default: () => [] },
  streamStatus: { type: String as PropType<StreamStatus>, default: undefined },
});

const moral = inject("moral") as ComputedRef<string>;
const key = ref(0);
const isFocused = ref(false);

const updateKeyThrottle = throttle(() => key.value++, 500);

// Dynamic class map, used when creating the Lexical editor:
const lexicalTheme = reactive({
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "mt-1 mb-4 leading-6",
  quote: "mt-6 mb-4 italic text-center",
  heading: {
    h1: `mt-6 mb-4 text-5xl leading-none tracking-wide font-medium font-[MrsEavesSmallCaps]  ${moral.value || ""}`,
    h2: `mt-6 text-4xl leading-none tracking-[0.02em] font-[MrsEavesSmallCaps]  ${moral.value || ""}`,
    h3: `mt-5 text-3xl leading-[0.9] tracking-[0.05em] font-[MrsEavesSmallCaps] border-b-3 border-al-neutral-500 underline-offset-2 decoration-[1.5px]  ${moral.value || ""}`,
    h4: `mt-4 mb-2 text-lg leading-tight font-[MrsEavesSmallCaps]  ${moral.value || ""}`,
    h5: `mt-3 mb-2 text-base leading-tight font-[MrsEavesSmallCaps]  ${moral.value || ""}`,
    h6: `mt-2 mb-2 text-sm leading-tight font-[MrsEavesSmallCaps] text-text-evil  ${moral.value || ""}`,
  },
  list: {
    ol: "mt-4 mb-4 list-decimal pl-6",
    ul: "mt-4 mb-4 list-disc pl-6",
    nested: { listitem: "ml-4" },
    listitem: "ml-6",
  },
  link: "underline text-text-evil cursor-pointer",
  hashtag: "",
  image: "",
  code: "font-mono bg-muted p-1 rounded",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "font-mono bg-muted p-1 rounded",
    highlight: "bg(--ui-bg-al-neutral)",
    subscript: "align-sub",
    superscript: "align-super",
  },
  codeHighlight: {}, // leave prism defaults
});

const lexical = useLexicalStore();
const editorRef = ref<HTMLElement | null>(null);

function onUpdated(md: string) {
  e("text-updated", md);
}

watch(
  () => p.streamChunks.length,
  () => {
    lexical.appendMarkdownChunks(p.streamChunks);
    updateKeyThrottle();
  },
);

onMounted(() => {
  if (!editorRef.value) return;
  lexical.createLexicalEditor(editorRef.value, lexicalTheme, onUpdated);
  if (p.text && ["closed", undefined].includes(p.streamStatus)) {
    lexical.importMarkdown(p.text);
  }
});
</script>
