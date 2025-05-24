<template>
  <UCard
    class="w-screen h-screen rounded-none sm:w-auto sm:w-[450px] sm:h-auto sm:rounded bg-muted/85 backdrop-blur-xs"
  >
    <template #header>
      <TH3 class="text-center">{{ $t("login.login") }}</TH3>
      <div class="text-center text-sm mt-2">
        <TQ>
          {{ greetings }}
        </TQ>
      </div>
    </template>
    <UForm :schema="schema" :state="state" @submit="login" class="space-y-4">
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
      <UButton
        block
        class="mt-6"
        color="neutral"
        :label="$t('login.login')"
        :loading="isButtonLoading"
      />
      <UButton
        block
        type="button"
        icon="fa6-brands:patreon"
        :label="$t('login.loginWithPatreon')"
      />
    </UForm>
    <template #footer>
      <div class="mt-6">
        <p class="text-center">
          {{ $t("login.notRegisteredYet") }}
          <NuxtLink :to="localePath({ name: 'registration' })">
            {{ $t("login.registerHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-6 text-sm">
          {{ $t("login.forgotPassword") }}
          <NuxtLink :to="localePath({ name: 'user-reactivation' })" class="">
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-2 text-sm">
          {{ $t("login.needActivation") }}
          <NuxtLink :to="localePath({ name: 'user-reactivation' })" class="">
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { z } from "zod";

const { t } = useI18n();
const localePath = useLocalePath();

const greetings = t(`login.greetings${Math.ceil(Math.random() * 15)}`);
const state = ref({ email: "", password: "" });
const isButtonLoading = ref(false);

const schema = z.object({
  email: z
    .string()
    .email(t("login.error.emailInvalid"))
    .min(1, { message: t("error.fieldRequired") }),
  password: z.string().min(1, { message: t("error.fieldRequired") }),
});

function login() {}
</script>

<style scoped></style>
