<template>
  <span class="description">
    <!-- <component :is="group.tag" v-for="(group, i) in partGroups" :key="i">
      <MonsterDescriptionPart
        v-for="(part, j) in group.parts"
        :key="j"
        :part="part"
      />
    </component> -->
    <MonsterDescriptionHTMLTag
      v-for="(group, i) in HTMLTags"
      :key="i"
      :parts="group"
    />
  </span>
</template>

<script setup lang="ts">
import type { DescriptionPart, PartsInHTMLTag } from "@/types";

const p = defineProps({
  parts: {
    type: Object as PropType<DescriptionPart[]>,
    required: true,
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
  partsInHTMLTag: PartsInHTMLTag[]
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
      const newPartGroup: PartsInHTMLTag = {
        tag: "p",
        parts: [],
      };
      partsInHTMLTag.push(newPartGroup);
      currentTag = newPartGroup;
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
      const newPartGroup: PartsInHTMLTag = {
        tag: "p",
        parts: [],
      };
      partsInHTMLTag.push(newPartGroup);
      currentTag = newPartGroup;
      parentTag = currentTag;
    } else {
      currentTag.parts.push(part);
    }
    i++;
  }
}

const hasPeriod = computed(() => {
  const last = p.parts[p.parts.length - 1];
  return last?.string?.trim().endsWith(".");
});
const hasColon = computed(() => {
  const last = p.parts[p.parts.length - 1];
  return last?.string?.trim().endsWith(":");
});

watch(
  () => p.parts,
  (parts) => {
    HTMLTags.value = [
      {
        tag: "p",
        parts: [],
      },
    ];
    groupParts(parts, HTMLTags.value);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.description {
  @apply whitespace-normal break-normal;
}
.dotted {
  border-bottom: 1px dotted theme("colors.text-secondary");
  cursor: help;
}
ul {
  @apply list-disc ml-4;
}
li {
  @apply ml-4;
}
</style>
