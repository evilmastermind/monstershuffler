<template>
  <MSShareModal
    v-model="isShareModalOpen"
    :link
    :text="
      generatorCharacter.object?.statistics?.fullName ||
      'Monstershuffler\'s NPC'
    "
  />
</template>

<script setup lang="ts">
import type { GeneratorCharacter } from "@/types";

const p = defineProps({
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
});

const isShareModalOpen = ref(false);
const generatorCharacter = toRef(p, "generatorCharacter");

useProvideCharacter(generatorCharacter);

const link = computed(() => {
  const characterUuid = generatorCharacter.value.id;
  const hook = generatorCharacter.value.hook;
  const url = hook === undefined ? characterUuid : `${characterUuid}/${hook}`;
  return characterUuid
    ? `${window.location.origin}/monsters/generator/${url}`
    : "";
});

defineExpose({
  toggle: () => {
    if (isUserOnMobile() && navigator.share) {
      navigator.share({
        title:
          generatorCharacter.value.object?.statistics?.fullName ||
          "Monstershuffler's NPC",
        text:
          generatorCharacter.value.object?.statistics?.fullName ||
          "Monstershuffler's NPC",
        url: link.value,
      });
    } else {
      isShareModalOpen.value = true;
    }
  },
});
</script>

<style scoped></style>
