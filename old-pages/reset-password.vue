<template>
  <div>
    <h1 class="content text-center mt-2">
      {{ $t("sResetPasswordBody.title") }}
    </h1>
    <div v-if="!isPasswordResetSuccessful">
      <form class="centered" @submit.prevent="sResetPasswordBody">
        <label class="ms-label mt-2">
          {{ $t("password") }}
          <input
            v-model="credentials.password"
            type="password"
            class="ms-input-style ms-input w-full"
            minlength="8"
            required
          />
        </label>
        <label class="ms-label mt-2">
          {{ $t("confirmPassword") }}
          <input
            v-model="confirmPassword"
            type="password"
            class="ms-input-style ms-input w-full"
            minlength="8"
            required
          />
        </label>
        <p v-if="errorMessage" class="content text-danger text-center mt-6">
          {{ errorMessage }}
        </p>
        <UButton
          block
          class="mt-6"
          color="primary"
          icon="fa6-solid:key"
          :text="$t('sResetPasswordBody.changePassword')"
          :loading="isButtonLoading"
          :disabled="isButtonDisabled"
        />
      </form>
    </div>
    <div v-else>
      <p class="content text-center mt-6">
        {{ $t("sResetPasswordBody.success") }}
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
useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("sResetPasswordBody.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("sResetPasswordBody.pageTitle")} - Monstershuffler.com`,
});

const user = useUserStore();
const route = useRoute();
const router = useRouter();

const credentials = ref({
  password: "",
  token: route.query.token as string,
});
const confirmPassword = ref("");
const isButtonLoading = ref(false);
const isButtonDisabled = ref(false);
const errorMessage = ref("");
const isPasswordResetSuccessful = ref(false);

async function sResetPasswordBody() {
  isButtonLoading.value = true;
  if (credentials.value.password !== confirmPassword.value) {
    errorMessage.value = t("registration.passwordsDontMatch");
    isButtonLoading.value = false;
    return;
  }
  const statusCode = await user.sResetPasswordBody(
    credentials.value.password,
    credentials.value.token,
  );
  isButtonLoading.value = false;
  switch (statusCode) {
    case 200:
      isPasswordResetSuccessful.value = true;
      errorMessage.value = "";
      // go back to home after 5 seconds
      setTimeout(() => {
        router.push("/");
      }, 5000);
      break;
    case 404:
      errorMessage.value = t("sResetPasswordBody.tokenNotFound");
      break;
    default:
      errorMessage.value = t("sResetPasswordBody.unknownError");
      break;
  }
}

watch(
  [credentials, confirmPassword],
  () => {
    errorMessage.value = "";
  },
  { deep: true },
);
</script>

<style scoped></style>
