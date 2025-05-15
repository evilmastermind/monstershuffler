<template>
  <template v-if="!token" class="flex gap-2 h-min">
    <!-- <UButton
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
    /> -->
  </template>
  <NuxtLink
    v-else-if="me"
    class="user-flex"
    :to="localePath({ name: 'user-settings' })"
  >
    <p class="content">
      {{ me.username }}
    </p>
    <div
      class="avatar"
      :style="{
        backgroundImage: `url(${me.avatar || '/images/avatar.jpg'})`,
      }"
    ></div>
  </NuxtLink>
</template>
<script setup lang="ts">
const user = useUserStore();
const localePath = useLocalePath();

const { token, me } = storeToRefs(user);

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
