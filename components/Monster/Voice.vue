<template>
  <font-awesome-icon
    class="audio-icon pr-1"
    :icon="`fas fa-solid fa-${audioIcon}`"
    @click.stop="toggleAudio"
  />
  <audio
    ref="audio"
    :src="`/voices/${voice.filename}.mp3`"
    type="audio/mpeg"
    @ended="audioIcon = 'volume-off'"
  />
  <span>{{ voiceString }}</span>
</template>

<script setup lang="ts">
const { t } = useI18n();

type Voice = {
  person: string;
  character?: string;
  production?: string;
  filename: string;
};

const p = defineProps({
  voice: {
    type: Object as PropType<Voice>,
    required: true,
  },
});

const audioIcon = ref("volume-off");
const audio: Ref<HTMLElement | null> = ref(null);

const voiceString = computed(() => {
  let voiceString = p.voice.person;
  if (p.voice.character) {
    voiceString = `${p.voice.character} (${voiceString})`;
  }
  if (p.voice.production) {
    voiceString = `${voiceString} ${t("monsterCard.voiceIn")} ${
      p.voice.production
    }`;
  }
  return voiceString;
});

function toggleAudio() {
  if (!audio.value) {
    return;
  }
  switch (audioIcon.value) {
    case "volume-off":
      audioIcon.value = "volume-high";
      audio.value.play();
      break;
    default:
      audioIcon.value = "volume-off";
      audio.value.pause();
      audio.value.currentTime = 0;
      break;
  }
}
</script>

<style scoped lang="scss">
.audio-icon {
  @apply cursor-pointer text-text-secondary w-[1em] text-left;
}
</style>
