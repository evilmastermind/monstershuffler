<template>
  <div>
    <h1 class="text-center mt-2">{{ $t("resetPassword.title") }}</h1>
    <div v-if="!isPasswordResetSuccessful">
      <form class="centered" @submit.prevent="resetPassword">
        <label class="ms-label mt-2">
          {{ $t("password") }}
          <input
            v-model="credentials.password"
            type="password"
            class="ms-input w-full"
            minlength="8"
            required
          />
        </label>
        <label class="ms-label mt-2">
          {{ $t("confirmPassword") }}
          <input
            v-model="confirmPassword"
            type="password"
            class="ms-input w-full"
            minlength="8"
            required
          />
        </label>
        <p v-if="errorMessage" class="text-danger text-center mt-6">
          {{ errorMessage }}
        </p>
        <MSButton
          block
          class="mt-6"
          color="primary"
          icon="fa-key"
          :text="$t('resetPassword.changePassword')"
          :loading="isButtonLoading"
          :disabled="isButtonDisabled"
        />
      </form>
    </div>
    <div v-else>
      <p class="text-center mt-6">
        {{ $t("resetPassword.success") }}
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
  title: `${t("resetPassword.pageTitle")} - Monstershuffler.com`,
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

async function resetPassword() {
  isButtonLoading.value = true;
  if (credentials.value.password !== confirmPassword.value) {
    errorMessage.value = t("registration.passwordsDontMatch");
    isButtonLoading.value = false;
    return;
  }
  const res = await user.resetPassword(
    credentials.value.password,
    credentials.value.token
  );
  isButtonLoading.value = false;
  switch (res.status) {
    case 200:
      isPasswordResetSuccessful.value = true;
      errorMessage.value = "";
      // go back to home after 5 seconds
      setTimeout(() => {
        router.push("/");
      }, 5000);
      break;
    case 404:
      errorMessage.value = t("resetPassword.tokenNotFound");
      break;
    default:
      errorMessage.value = t("resetPassword.unknownError");
      break;
  }
}

watch(
  [credentials, confirmPassword],
  () => {
    errorMessage.value = "";
  },
  { deep: true }
);
</script>

<style scoped lang="scss"></style>
