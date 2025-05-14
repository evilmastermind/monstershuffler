<template>
  <UModal
    v-model:open="isModalOpen"
    @close="isModalOpen = false"
    :title="$t(`share.title`)"
    :description="$t('share.subtitle')"
  >
    <template #body>
      <div class="flex justify-center flex-wrap items-center gap-1 mb-4">
        <MSIconButton
          v-for="(platform, index) in platforms"
          :key="platform.name"
          size="xl"
          variant="outline"
          :icon="platform.icon"
          :label="platform.name"
          @click="share(index)"
        />
      </div>
      <UInput type="text" class="w-full" disabled :value="p.link" />
    </template>
    <template #footer>
      <UButton
        variant="outline"
        color="neutral"
        class="mt-2"
        :label="$t('close')"
        :aria-label="$t('close')"
        @click="isModalOpen = false"
      />
      <UButton
        :color="hasCopiedToClipboard ? 'success' : 'neutral'"
        class="mt-2"
        icon="i-xxx-clipboard"
        :label="hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')"
        :aria-label="
          hasCopiedToClipboard ? $t('copied') : $t('copyToClipboard')
        "
        @click="copy"
      />
    </template>
  </UModal>
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

<style scoped></style>
