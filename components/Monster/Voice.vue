<template>
  <div class="relative inline-block w-6 h-4 pr-2">
    <UTooltip :text="t('monsterCard.playVoice')">
      <UButton
        class="absolute text-muted bottom-[-45%] left-[-15%] cursor-pointer hide-from-exports"
        variant="ghost"
        color="neutral"
        size="xs"
        :aria-label="t('monsterCard.playVoice')"
        :icon="audioIcon"
        @click.stop="toggleAudio"
      />
    </UTooltip>
    <audio
      ref="audio"
      :src="`/voices/${voice.filename}.mp3`"
      type="audio/mpeg"
      @ended="audioIcon = PAUSE"
    />
  </div>
  <span>{{ voiceString }}</span>
</template>

<script setup lang="ts">
const { t } = useI18n();

const PLAY = "i-xxx-volume-high";
const PAUSE = "i-xxx-volume-off";

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

const audioIcon = ref(PAUSE);
const audio: Ref<HTMLAudioElement | null> = ref(null);

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
    case PAUSE:
      audioIcon.value = PLAY;
      audio.value.play();
      break;
    default:
      audioIcon.value = PAUSE;
      audio.value.pause();
      audio.value.currentTime = 0;
      break;
  }
}
</script>

<style scoped></style>
