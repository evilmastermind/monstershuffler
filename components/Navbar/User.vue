<template>
  <div v-if="!token" class="buttons-flex">
    <MSButton text="Login" color="dark" to="login" />
    <MSButton text="Register" color="primary" to="registration" />
  </div>
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
<style lang="scss" scoped>
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
  // border: 1px solid theme("colors.text-secondary");
  overflow: hidden;
  display: grid;
  place-items: center;
  background-size: cover;
}
</style>
