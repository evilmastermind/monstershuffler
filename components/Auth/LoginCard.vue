<template>
  <MSCard>
    <div class="logo mt-4">
      <LogoStatic :size="30" class="logo-m" />onstershuffler
    </div>
    <div class="my-5 text-center">
      <q>{{ greetings }}</q>
    </div>
    <h4 class="text-center">{{ $t("login.login") }}</h4>
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
      <p v-if="hasLoginFailed" class="text-danger">{{ $t("login.failed") }}</p>
      <MSButton
        block
        class="mt-6"
        color="primary"
        :text="t('login.login')"
        :loading="isButtonLoading"
      />
      <MSButton
        block
        class="mt-4 mb-4"
        type="button"
        color="patreon"
        icon="fa-brands fa-patreon"
        :text="t('login.loginWithPatreon')"
      />
    </form>
  </MSCard>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const router = useRouter();
const user = useUserStore();

const credentials = ref({ email: "", password: "" });
const greetings = t(`login.greetings${Math.ceil(Math.random() * 15)}`);
const isButtonLoading = ref(false);
const hasLoginFailed = ref(false);

async function login() {
  isButtonLoading.value = true;
  const res = await user.login(credentials.value);
  isButtonLoading.value = false;
  if (res) {
    hasLoginFailed.value = false;
    router.push({ path: "/" });
  } else {
    hasLoginFailed.value = true;
  }
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  gap: 0.125em;
  line-height: 1;
}
.logo-m {
  display: inline;
}
</style>
