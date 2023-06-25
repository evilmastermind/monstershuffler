<template>
  <div>
    <div v-if="!isRegistrationSuccessful" class="registration">
      <!-- <NuxtLink :to="localePath({ name: 'index' })">
        <div class="logo mt-4">
          <LogoStatic :size="30" class="inline" />onstershuffler
        </div>
      </NuxtLink> -->
      <h1 class="text-center mt-2">{{ $t("registration.accountCreation") }}</h1>
      <p class="text-sm mt-4 mb-6">
        {{ $t("registration.termsAndConditions1") }}
        <NuxtLink
          :to="localePath({ name: 'terms-of-service' })"
          class="underline"
        >
          {{ $t("registration.termsAndConditions2") }}
        </NuxtLink>
        {{ $t("registration.termsAndConditions3") }}
        <NuxtLink
          :to="localePath({ name: 'privacy-policy' })"
          class="underline"
        >
          {{ $t("registration.termsAndConditions4") }}
        </NuxtLink>
      </p>
      <MSButton
        v-if="mode !== 'normalAccount'"
        block
        class="mt-5"
        type="button"
        color="patreon"
        icon="fa-brands fa-patreon"
        :text="$t('registration.signUpWithPatreon')"
      />
      <MSButton
        v-if="mode !== 'normalAccount'"
        block
        class="mt-4"
        type="button"
        color="primary"
        :text="$t('registration.orCreateAccount')"
        @click="mode = 'normalAccount'"
      />
      <form
        v-if="mode === 'normalAccount'"
        class="centered"
        @submit.prevent="register"
      >
        <label class="ms-label">
          {{ $t("username") }}
          <input
            v-model="credentials.username"
            type="text"
            class="ms-input w-full"
            minlength="2"
            maxlength="21"
            required
          />
        </label>
        <label class="ms-label mt-2">
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
          :text="$t('registration.createAccount')"
          :loading="isButtonLoading"
          :disabled="isButtonDisabled"
        />
      </form>
      <div class="mt-6">
        <p class="text-center">
          {{ $t("registration.alreadyRegistered") }}
          <NuxtLink :to="localePath({ name: 'login' })" class="underline">
            {{ $t("registration.loginHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-6 text-sm">
          {{ $t("login.forgotPassword") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="underline"
          >
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-2 text-sm">
          {{ $t("login.needActivation") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="underline"
          >
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
      </div>
    </div>
    <div v-else class="centered text-center">
      <h2 class="text-primary-700">
        <font-awesome-icon icon="fa-solid fa-check" />
        {{ $t("registration.successTitle") }}
      </h2>
      <p class="mt-4 max-w-md">
        {{ $t("registration.successMessage", { email: credentials.email }) }}
      </p>
      <MSButton
        block
        class="mt-5"
        color="primary"
        :text="$t('registration.backToHome')"
        :loading="isButtonLoading"
        :disabled="isButtonDisabled"
        icon="fa-caret-left"
        to="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
useHead({
  title: "Registration - Monstershuffler.com",
});

const localePath = useLocalePath();
const { t } = useI18n();
const user = useUserStore();

const credentials = ref({
  username: "",
  email: "",
  password: "",
});
const mode = ref("choice");
const confirmPassword = ref("");
const isButtonLoading = ref(false);
const isButtonDisabled = ref(false);
const errorMessage = ref("");
const isRegistrationSuccessful = ref(false);

async function register() {
  isButtonLoading.value = true;
  if (credentials.value.password !== confirmPassword.value) {
    errorMessage.value = t("registration.passwordsDontMatch");
    isButtonLoading.value = false;
  } else {
    const res = await user.register(credentials.value);
    isButtonLoading.value = false;
    switch (res.status) {
      case 201:
        isRegistrationSuccessful.value = true;
        errorMessage.value = "";
        break;
      case 409:
        errorMessage.value = t("registration.emailAlreadyExists");
        break;
      default:
        errorMessage.value = t("registration.unknownError");
        break;
    }
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
</style>
