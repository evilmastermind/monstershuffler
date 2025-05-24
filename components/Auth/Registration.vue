<template>
  <UCard
    v-if="!isRegistrationSuccessful"
    class="w-full h-full rounded-none sm:w-[450px] sm:h-auto sm:rounded"
  >
    <template #header>
      <TH3 class="text-center">{{ $t("registration.accountCreation") }}</TH3>
      <div class="text-center text-sm mt-2">
        <TQ>
          {{ welcome }}
        </TQ>
      </div>
    </template>
    <div class="grid place-items-center">
      <p class="text-center text-sm max-w-[300px]">
        {{ $t("registration.termsAndConditions1") }}
        <NuxtLink
          :to="localePath({ name: 'terms-of-service' })"
          class="font-bold underline"
        >
          {{ $t("registration.termsAndConditions2") }}
        </NuxtLink>
        {{ $t("registration.termsAndConditions3") }}
        <NuxtLink
          :to="localePath({ name: 'privacy-policy' })"
          class="font-bold underline"
        >
          {{ $t("registration.termsAndConditions4") }}
        </NuxtLink>
      </p>
    </div>
    <UButton
      block
      type="button"
      color="al-evil"
      class="mt-6"
      :variant="mode !== 'normalAccount' ? 'solid' : 'soft'"
      icon="fa6-brands:patreon"
      :label="$t('registration.signUpWithPatreon')"
    />
    <UButton
      v-if="mode !== 'normalAccount'"
      block
      type="button"
      color="neutral"
      class="mt-2"
      :label="$t('registration.orCreateAccount')"
      @click="mode = 'normalAccount'"
    />
    <div v-else>
      <UForm
        :schema="schema"
        :state="state"
        @submit="registration"
        class="space-y-2 mt-8"
      >
        <UFormField :label="$t('username')" name="username">
          <UInput
            v-model="state.username"
            type="text"
            class="w-full"
            :label="$t('username')"
            minlength="2"
            maxlength="21"
            required
          />
        </UFormField>
        <UFormField :label="$t('email')" name="email">
          <UInput
            v-model="state.email"
            type="email"
            class="w-full"
            :label="$t('email')"
            required
          />
        </UFormField>
        <UFormField :label="$t('password')" name="password">
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
            :label="$t('password')"
            required
          />
        </UFormField>
        <UFormField :label="$t('confirmPassword')" name="confirmPassword">
          <UInput
            v-model="state.confirmPassword"
            type="password"
            class="w-full"
            :label="$t('confirmPassword')"
            required
          />
        </UFormField>
        <UButton
          block
          type="submit"
          class="mt-6"
          color="neutral"
          :label="$t('registration.createAccount')"
          :loading="isButtonLoading"
          :disabled="isButtonLoading"
        />
      </UForm>
    </div>
    <template #footer>
      <div class="flex flex-col items-center gap-2">
        <p class="text-center text-sm">
          {{ $t("registration.alreadyRegistered") }}
          <NuxtLink
            :to="localePath({ name: 'login' })"
            class="font-bold underline"
          >
            {{ $t("registration.loginHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-4 text-sm">
          {{ $t("login.forgotPassword") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="font-bold underline"
          >
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
        <p class="text-center text-sm">
          {{ $t("login.needActivation") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="font-bold underline"
          >
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
        <NuxtLink :to="localePath({ name: 'index' })">
          <span class="sr-only">
            {{ $t("back") }}
          </span>
          <NavigationLogo class="mt-6" />
        </NuxtLink>
      </div>
    </template>
  </UCard>
  <UCard
    v-else
    class="w-screen h-screen rounded-none sm:w-[450px] sm:h-auto sm:rounded"
  >
    <template #header>
      <TH3 class="text-center">
        {{ $t("registration.successTitle") }}
      </TH3>
    </template>
    <TP class="content max-w-sm">
      {{ $t("registration.successMessage", { email: state.email }) }}
    </TP>
    <template #footer>
      <UButton
        block
        color="neutral"
        :text="$t('registration.backToHome')"
        icon="fa6-solid:caret-left"
        :to="localePath({ name: 'index' })"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { z } from "zod";

const { t } = useI18n();
const user = useUserStore();
const localePath = useLocalePath();
const router = useRouter();
const toast = useToast();

const welcome = t(`registration.welcome${Math.ceil(Math.random() * 15)}`);
const state = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const mode = ref<"choice" | "normalAccount">("choice");
const isButtonLoading = ref(false);
const isRegistrationSuccessful = ref(false);

const schema = z
  .object({
    username: z.string().min(1, { message: t("error.fieldRequired") }),
    email: z
      .string()
      .email(t("login.error.emailInvalid"))
      .min(1, { message: t("error.fieldRequired") }),
    password: z.string().min(1, { message: t("error.fieldRequired") }),
    confirmPassword: z.string().min(1, { message: t("error.fieldRequired") }),
  })
  .refine((dataUser) => dataUser.password === dataUser.confirmPassword, {
    message: t("registration.passwordsDontMatch"),
    path: ["confirmPassword"],
  });

async function registration() {
  isButtonLoading.value = true;
  const response = await user.register(state.value);
  isButtonLoading.value = false;
  console.log("Registration response:", response);
  switch (response.status) {
    case 201:
      isRegistrationSuccessful.value = true;
      break;
    case 409:
      toast.add({
        description: t("registration.emailAlreadyExists"),
        color: "error",
      });
      break;
    default:
      toast.add({
        description: t("registration.unknownError"),
        color: "error",
      });
  }
}
</script>

<style scoped></style>
