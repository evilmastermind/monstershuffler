<template>
  <MSModal v-if="isModalOpen" @close="isModalOpen = false">
    <template #title>
      {{ $t(`share.title`) }}
    </template>
    <template #default>
      <p class="text-sm text-text-1">{{ $t("share.subtitle") }}</p>
      <div class="platforms mt-5 mb-4">
        <MSIconButton
          v-for="(platform, index) in platforms"
          :key="platform.name"
          size="32"
          :icon="platform.icon"
          :label="platform.name"
          @click="share(index)"
        />
      </div>
      <input
        type="text"
        class="ms-input-style ms-input w-full"
        disabled
        :value="p.link"
      />
      <MSButton
        block
        :color="hasCopiedToClipboard ? 'success' : 'dark'"
        class="mt-2"
        icon="fa6-solid:clipboard"
        :text="hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')"
        @click="copy"
      />
      <MSButton
        block
        class="mt-2"
        :text="$t('close')"
        @click="isModalOpen = false"
      />
    </template>
  </MSModal>
</template>

<script setup lang="ts">
const isModalOpen = defineModel({
  type: Boolean,
  required: true,
});

const p = defineProps({
  link: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const platforms = [
  {
    name: "twitter",
    icon: "logos:twitter",
    url: "https://twitter.com/intent/tweet?url={link}&text={text}",
  },
  {
    name: "reddit",
    icon: "logos:reddit-icon",
    url: "https://www.reddit.com/submit?url={link}&title={text}",
  },
  {
    name: "facebook",
    icon: "logos:facebook",
    url: "https://www.facebook.com/sharer/sharer.php?u={link}",
  },
  {
    name: "messenger",
    icon: "logos:messenger",
    url: "https://www.facebook.com/dialog/send?link={link}&redirect_uri={website}",
  },
  {
    name: "whatsapp",
    icon: "logos:whatsapp-icon",
    url: "https://api.whatsapp.com/send?text={text} {link}",
  },
  {
    name: "telegram",
    icon: "logos:telegram",
    url: "https://t.me/share/url?url={link}&text={text}",
  },
  {
    name: "email",
    icon: "el:envelope-alt",
    url: "mailto:?subject={text}&body={link}",
  },
];

const hasCopiedToClipboard = ref(false);

function copy() {
  copyToClipboard(p.link);
  hasCopiedToClipboard.value = true;
}

function share(index: number) {
  const platform = platforms[index];
  const url = platform.url
    .replace("{link}", encodeURIComponent(p.link))
    .replace("{website}", encodeURIComponent(window.location.href))
    .replace("{text}", p.text);
  window.open(url, "_blank");
}
</script>

<style scoped>
.platforms {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
