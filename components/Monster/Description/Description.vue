<template>
  <MonsterDescriptionHTMLTag
    v-for="(group, i) in HTMLTags"
    :key="i"
    :parts="group"
    :class="p.class.split(' ')"
  >
    <template v-if="i === 0 && name">
      <MonsterDescription
        :parts="name"
        :tag="'span'"
        :period="period"
      />&nbsp;</template
    >
  </MonsterDescriptionHTMLTag>
</template>

<script setup lang="ts">
import type { DescriptionPart, PartsInHTMLTag, ParsedHTMLTags } from "@/types";

const p = defineProps({
  parts: {
    type: Object as PropType<DescriptionPart[]>,
    required: true,
  },
  name: {
    type: Object as PropType<DescriptionPart[] | null>,
    default: null,
  },
  tag: {
    type: String as () => ParsedHTMLTags,
    default: "p",
  },
  class: {
    type: String,
    default: "",
  },
  period: {
    type: Boolean,
    default: false,
  },
  colon: {
    type: Boolean,
    default: false,
  },
});

const HTMLTags = ref<PartsInHTMLTag[]>();
/**
 * Group parts into paragraphs and lists
 */
function groupParts(
  parts: DescriptionPart[],
  partsInHTMLTag: PartsInHTMLTag[],
) {
  let i = 0;
  if (!partsInHTMLTag.length) {
    partsInHTMLTag.push({ tag: "p", parts: [] });
  }
  let currentTag = partsInHTMLTag[partsInHTMLTag.length - 1];
  let parentTag = currentTag;
  while (i < parts.length) {
    const part = parts[i];
    if (part.type === "listStart") {
      const newPartGroup: PartsInHTMLTag = {
        tag: "ul",
        parts: [],
      };
      partsInHTMLTag.push(newPartGroup);
      currentTag = newPartGroup;
      parentTag = currentTag;
    } else if (part.type === "listEnd") {
      if (i < parts.length - 2) {
        const newPartGroup: PartsInHTMLTag = {
          tag: "p",
          parts: [],
        };
        partsInHTMLTag.push(newPartGroup);
        currentTag = newPartGroup;
      }
    } else if (part.type === "listItemStart") {
      const newPartGroup: PartsInHTMLTag = {
        tag: "li",
        parts: [],
      };
      currentTag.parts.push(newPartGroup);
      parentTag = currentTag;
      currentTag = newPartGroup;
    } else if (part.type === "listItemEnd") {
      currentTag = parentTag;
    } else if (part.type === "paragraphEnd") {
      if (i < parts.length - 2) {
        const newPartGroup: PartsInHTMLTag = {
          tag: "p",
          parts: [],
        };
        partsInHTMLTag.push(newPartGroup);
        currentTag = newPartGroup;
        parentTag = currentTag;
      }
    } else {
      currentTag.parts.push(part);
    }
    i++;
  }
  if (p.period && !hasPeriod.value) {
    const last = partsInHTMLTag[partsInHTMLTag.length - 1];
    last.parts.push({ string: "." });
  }
  if (p.colon && !hasColon.value) {
    const last = partsInHTMLTag[partsInHTMLTag.length - 1];
    last.parts.push({ string: ":" });
  }
}

const hasPeriod = computed(() => {
  const last = p.parts[p.parts.length - 1].string?.trim();
  return !last?.length || last?.endsWith(".");
});
const hasColon = computed(() => {
  const last = p.parts[p.parts.length - 1].string?.trim();
  return !last?.length || last?.endsWith(":");
});

watch(
  () => p.parts,
  (parts) => {
    HTMLTags.value = [
      {
        tag: p.tag,
        parts: [],
      },
    ];
    groupParts(parts, HTMLTags.value);
  },
  { immediate: true },
);
</script>

<style scoped></style>
