<template>
  <div
    class="tools"
    @touchstart="handleTouch"
    @touchmove="handleTouch"
    @touchend="handleTouch"
  >
    <MonsterImagesHelp />
    <MSIconButton
      class="tool"
      :label="$t('editor.image.changeMask')"
      icon="fa6-solid:magnifying-glass-minus"
      @click.stop="e('reduce')"
      @touchstart.stop="e('reduce')"
    />
    <MSIconButton
      class="tool"
      :label="$t('editor.image.changeMask')"
      icon="fa6-solid:magnifying-glass-plus"
      @click.stop="e('enlarge')"
      @touchstart.stop="e('enlarge')"
    />
    <MSIconButton
      class="tool"
      :label="$t('editor.image.changeMask')"
      icon="fe:mask"
      :rotate="90"
      @click.stop="toggleMask"
      @touchstart.stop="toggleMask"
    />
    <!-- <MSIconButton
      :label="$t('monsterSheet.editLayout')"
      :class="currentEditorMode === 'layout' ? 'text-invert' : ''"
      icon="fa6-solid:check"
    /> -->
    <label
      class="label-icon tool"
      :title="$t('editor.image.uploadImage')"
      @touchstart.stop="uploadImage"
    >
      <input
        ref="imageUpload"
        class="image-upload"
        type="file"
        accept="image/*"
      />
      <Icon class="icon" aria-hidden name="mdi:image-add" />
      <span class="sr-only">{{ $t("editor.image.uploadImage") }}</span>
    </label>
    <MSIconButton
      :label="$t('close')"
      class="ml-4 tool"
      :class="currentEditorMode === 'layout' ? 'text-invert' : ''"
      icon="fa6-solid:check"
      @click.stop="currentEditorMode = ''"
      @touchstart.stop="currentEditorMode = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { IMG_MASKS_COUNT } from "@/utils";
import type { Image } from "@/types";

const editor = useMonsterEditorStore();

const e = defineEmits(["enlarge", "reduce"]);
const p = defineProps({
  image: {
    type: Object as PropType<Image>,
    required: true,
  },
});

const { image } = toRefs(p);
const { currentEditorMode } = storeToRefs(editor);
const imageUpload = ref<HTMLInputElement | null>(null);

function toggleMask() {
  if (!image.value.mask) {
    image.value.mask = "0";
  }
  const currentMask = parseInt(image.value.mask);
  const nextMask =
    currentMask === IMG_MASKS_COUNT ? "" : (currentMask + 1).toString();
  image.value.mask = nextMask;
}

function handleTouch(event: TouchEvent) {
  // Prevent scrolling
  event.stopPropagation();
  event.preventDefault();
}

// document.getElementById("imageUpload")?.addEventListener("change", (e) => {
//   const file = (e.target as HTMLInputElement).files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       image.value.url = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   }
// });

function uploadImage() {
  imageUpload.value?.click();
}

watch(
  imageUpload,
  () => {
    if (imageUpload.value) {
      imageUpload.value?.addEventListener("change", (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const objectURL = URL.createObjectURL(file);
          image.value.url = objectURL;
        }
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.tools {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0;
  line-height: 1rem;
  @apply text-primary-300 bg-primary-900/70  gap-4;
}
@media (min-width: theme("screens.sm")) {
  .tools-container {
    @apply bg-transparent;
  }
  .tools {
    border-radius: 1rem;
    line-height: 1rem;
  }
}
.tools button:hover {
  @apply text-primary-300;
}
.image-upload {
  width: 0;
  height: 0;
  opacity: 0;
}
.label-icon {
  display: grid;
  place-items: center;
  cursor: pointer;
}
.tool {
  z-index: 120;
}
</style>
