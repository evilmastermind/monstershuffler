<template>
  <div
    class="flex justify-evenly items-center overflow-hidden rounded-full gap-1 px-1 text-(--ui-bg) bg-inverted/70"
    @touchstart="handleTouch"
    @touchmove="handleTouch"
    @touchend="handleTouch"
  >
    <MonsterImagesHelp />
    <MSIconButton
      :label="$t('zoomOut')"
      icon="i-xxx-magnifying-glass-minus"
      @click.stop="e('reduce')"
      @touchstart.stop="e('reduce')"
    />
    <MSIconButton
      :label="$t('zoomIn')"
      icon="i-xxx-magnifying-glass-plus"
      @click.stop="e('enlarge')"
      @touchstart.stop="e('enlarge')"
    />
    <MSIconButton
      :label="$t('editor.image.changeMask')"
      icon="i-xxx-mask"
      @click.stop="toggleMask"
      @touchstart.stop="toggleMask"
    />
    <UTooltip :text="$t('editor.image.uploadImage')">
      <label
        class="grid place-items-center cursor-pointer"
        @touchstart.stop="uploadImage"
      >
        <input
          ref="imageUpload"
          type="file"
          accept="image/*"
          class="w-0 h-0 opacity-0"
        />
        <Icon class="icon" aria-hidden name="mdi:image-add" />
        <span class="sr-only">{{ $t("editor.image.uploadImage") }}</span>
      </label>
    </UTooltip>
    <MSIconButton
      class="ml-4 z-[120]"
      :label="$t('close')"
      icon="i-xxx-check"
      @click.stop="editor.closeEditors"
      @touchstart.stop="editor.closeEditors"
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
  },
);
</script>

<style scoped></style>
