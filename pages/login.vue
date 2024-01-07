<template>
  <div>
    <h1 class="content text-center mt-2">{{ $t("login.login") }}</h1>
    <div class="mt-2 mb-6 text-center">
      <q class="content">{{ greetings }}</q>
    </div>
    <form class="centered" @submit.prevent="login">
      <label class="ms-label">
        {{ $t("email") }}
        <input
          v-model="credentials.email"
          type="email"
          class="ms-input w-full"
          required
        />
      </label>
      <label class="ms-label mt-2">
        {{ $t("password") }}
        <input
          v-model="credentials.password"
          type="password"
          class="ms-input w-full"
          required
        />
      </label>
      <p v-if="errorMessage" class="content text-danger text-center mt-6">
        {{ errorMessage }}
      </p>
      <MSButton
        block
        class="mt-6"
        color="primary"
        :text="$t('login.login')"
        :loading="isButtonLoading"
      />
      <MSButton
        block
        class="mt-4 mb-4"
        type="button"
        color="patreon"
        icon="fa-brands fa-patreon"
        :text="$t('login.loginWithPatreon')"
      />
    </form>
    <div class="mt-6">
      <p class="content text-center">
        {{ $t("login.notRegisteredYet") }}
        <NuxtLink :to="localePath({ name: 'registration' })" class="content">
          {{ $t("login.registerHere") }}
        </NuxtLink>
      </p>
      <p class="content text-center mt-6 text-sm">
        {{ $t("login.forgotPassword") }}
        <NuxtLink
          :to="localePath({ name: 'user-reactivation' })"
          class="content"
        >
          {{ $t("login.clickHere") }}
        </NuxtLink>
      </p>
      <p class="content text-center mt-2 text-sm">
        {{ $t("login.needActivation") }}
        <NuxtLink
          :to="localePath({ name: 'user-reactivation' })"
          class="content"
        >
          {{ $t("login.clickHere") }}
        </NuxtLink>
      </p>
    </div>
    <AuthLogoFooter />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});
useHead({
  title: `${t("login.pageTitle")} - Monstershuffler.com`,
});

const localePath = useLocalePath();
const router = useRouter();
const user = useUserStore();

const credentials = ref({ email: "", password: "" });
const greetings = t(`login.greetings${Math.ceil(Math.random() * 15)}`);
const isButtonLoading = ref(false);
const errorMessage = ref("");

async function login() {
  isButtonLoading.value = true;
  const res = await user.login(credentials.value);
  isButtonLoading.value = false;
  switch (res.status) {
    case 200:
      router.push({ path: "/" });
      break;
    case 403:
      errorMessage.value = t("login.notYetActivated");
      break;
    default:
      errorMessage.value = t("login.failed");
      break;
  }
}
</script>

<style scoped lang="scss"></style>
