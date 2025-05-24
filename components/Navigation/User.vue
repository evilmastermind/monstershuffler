<template>
  <div v-if="!token" class="flex gap-2 h-min">
    <UButton
      :text="$t('navbar.login')"
      size="sm"
      variant="outline"
      color="neutral"
      to="/login"
    />
    <UButton
      :text="$t('navbar.register')"
      size="sm"
      variant="solid"
      color="neutral"
      to="/registration"
    />
  </div>
  <UDropdownMenu :items="userMenu" v-else class="cursor-pointer">
    <UAvatar
      aria-role="button"
      icon="i-xxx-user"
      size="md"
      :alt="me?.username || $t('navbar.userSettings')"
    />
  </UDropdownMenu>
</template>
<script setup lang="ts">
const { t } = useI18n();
const user = useUserStore();
const router = useRouter();
const localePath = useLocalePath();

const { token, me } = storeToRefs(user);

const userMenu = computed(() => {
  return [
    {
      label: t("navbar.userSettings"),
      icon: "i-xxx-cog",
      to: localePath("/settings"),
    },
    {
      label: t("navbar.logout"),
      icon: "i-xxx-user-x",
      onSelect: async () => {
        user.logout();
        router.push(localePath({ name: "index" }));
      },
    },
  ];
});

onMounted(async () => {
  if (!user.token) {
    user.token = localStorage.getItem("token") || "";
  }
  if (user.token) {
    await user.getDetails();
  }
  user.setSession();
});
</script>
<style scoped>
/*
.buttons-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: theme("spacing.4");
  justify-content: space-between;
}
.user-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: theme("spacing.2");
  justify-content: space-between;
}
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background-size: cover;
}
*/
</style>
