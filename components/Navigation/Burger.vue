<template>
  <UDropdownMenu v-model:open="open" :items>
    <MSIconButton
      icon="i-xxx-burger"
      size="lg"
      :label="$t('navbar.menuTitle')"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const open = ref(false);

const items = [
  [
    {
      label: t("navbar.menu.home"),
      icon: "i-xxx-home",
      to: localePath({ name: "index" }),
    },
    {
      label: t("navbar.menu.npcGenerator"),
      icon: "i-xxx-random",
      to: localePath({ name: "monsters-generator" }),
    },
    // {
    //   label: t("navbar.menu.editors"),
    //   icon: "i-xxx-editor",
    //   to: localePath({ name: "monsters-editors" }),
    // },
    // {
    //   label: t("navbar.menu.communityCreations"),
    //   icon: "i-xxx-monster",
    //   to: localePath({ name: "monsters-community-creations" }),
    // },
  ],
  [
    {
      icon: "i-xxx-reddit",
      label: "Reddit",
      to: "https://reddit.com/r/monstershuffler",
      target: "_blank",
    },
    {
      icon: "i-xxx-github",
      label: "GitHub",
      to: "https://github.com/evilmastermind/monstershuffler",
      target: "_blank",
    },
    {
      icon: "i-xxx-patreon",
      label: "Patreon",
      to: "https://patreon.com/monstershuffler",
      target: "_blank",
    },
  ],
  [
    {
      label: t("navbar.login"),
      icon: "i-xxx-login",
      to: localePath({ name: "login" }),
    },
    {
      label: t("navbar.register"),
      color: "primary",
      icon: "i-xxx-user-plus",
      to: localePath({ name: "registration" }),
    },
  ],
];
</script>

<style scoped></style>
