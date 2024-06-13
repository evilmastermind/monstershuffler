<template>
  <div class="tools">
    <MSIconButton
      :label="$t('monsterSheet.editLayout')"
      icon="fe:mask"
      :rotate="90"
      @click="toggleMask"
    />
    <!-- <MSIconButton
      :label="$t('monsterSheet.editLayout')"
      :class="currentEditorMode === 'layout' ? 'text-invert' : ''"
      icon="fa6-solid:check"
    /> -->
    <label class="label-icon">
      <input
        ref="imageUpload"
        class="image-upload"
        type="file"
        accept="image/*"
      />
      <Icon class="icon" aria-hidden name="mdi:image-add" />
      <span class="sr-only">{{ $t("monsterSheet.editLayout") }}</span>
    </label>
    <MSIconButton
      :label="$t('close')"
      class="ml-4"
      :class="currentEditorMode === 'layout' ? 'text-invert' : ''"
      icon="fa6-solid:check"
      @click="currentEditorMode = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { IMG_MASKS_COUNT } from "@/utils";
import type { Image } from "@/types";

const editor = useMonsterEditorStore();

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
    image.value.mask = "1";
  }
  const currentMask = parseInt(image.value.mask);
  const nextMask = currentMask === IMG_MASKS_COUNT ? 1 : currentMask + 1;
  image.value.mask = nextMask.toString();
}

// document.getElementById("imageUpload")?.addEventListener("change", (e) => {
//   const file = (e.target as HTMLInputElement).files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       console.log(e.target?.result);
//       image.value.url = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   }
// });

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
</style>
