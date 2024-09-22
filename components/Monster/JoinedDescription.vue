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
import type {
  DescriptionPart,
  StatStringNumberArray,
  PartsInHTMLTag,
  ParsedHTMLTags,
} from "@/types";

const p = defineProps({
  stats: {
    type: Object as PropType<StatStringNumberArray[]>,
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
const parts = ref<DescriptionPart[]>([]);
/**
 * Group parts into paragraphs and lists
 */
function groupParts(
  stats: StatStringNumberArray[],
  partsInHTMLTag: PartsInHTMLTag[]
) {
  let i = 0;
  if (!partsInHTMLTag.length) {
    partsInHTMLTag.push({ tag: "p", parts: [] });
  }
  parts.value = [];
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    if (i > 0) {
      parts.value.push({ string: ", " });
    }
    if (stat.array.length) {
      parts.value.push(...stat.array);
    }
  }
  let currentTag = partsInHTMLTag[partsInHTMLTag.length - 1];
  let parentTag = currentTag;
  while (i < parts.value.length) {
    const part = parts.value[i];
    if (part.type === "listStart") {
      const newPartGroup: PartsInHTMLTag = {
        tag: "ul",
        parts: [],
      };
      partsInHTMLTag.push(newPartGroup);
      currentTag = newPartGroup;
      parentTag = currentTag;
    } else if (part.type === "listEnd") {
      if (i < parts.value.length - 2) {
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
      if (i < parts.value.length - 2) {
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
  const last = parts.value[parts.value.length - 1]?.string?.trim();
  return !last?.length || last?.endsWith(".");
});
const hasColon = computed(() => {
  const last = parts.value[parts.value.length - 1]?.string?.trim();
  return !last?.length || last?.endsWith(":");
});

watch(
  () => p.stats,
  (newValue) => {
    HTMLTags.value = [
      {
        tag: p.tag,
        parts: [],
      },
    ];
    groupParts(newValue, HTMLTags.value);
  },
  { immediate: true }
);
</script>

<style scoped>
.description {
  @apply whitespace-normal break-normal;
}

ul {
  @apply list-disc ml-4;
}
li {
  @apply ml-4;
}
</style>
