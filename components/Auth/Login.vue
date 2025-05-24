<template>
  <UCard
    class="w-screen h-screen rounded-none sm:w-[450px] sm:h-auto sm:rounded sm:bg-muted/85 sm:backdrop-blur-xs"
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
        type="submit"
        class="mt-6"
        color="neutral"
        :label="$t('login.login')"
        :loading="isButtonLoading"
      />
      <UButton
        block
        type="button"
        color="al-evil"
        icon="fa6-brands:patreon"
        :label="$t('login.loginWithPatreon')"
      />
    </UForm>
    <template #footer>
      <div class="flex flex-col items-center gap-2">
        <p class="text-center">
          {{ $t("login.notRegisteredYet") }}
          <NuxtLink
            :to="localePath({ name: 'registration' })"
            class="font-bold"
          >
            {{ $t("login.registerHere") }}
          </NuxtLink>
        </p>
        <p class="text-center mt-4 text-sm">
          {{ $t("login.forgotPassword") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="font-bold"
          >
            {{ $t("login.clickHere") }}
          </NuxtLink>
        </p>
        <p class="text-center text-sm">
          {{ $t("login.needActivation") }}
          <NuxtLink
            :to="localePath({ name: 'user-reactivation' })"
            class="font-bold"
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
</template>

<script setup lang="ts">
import { z } from "zod";

const { t } = useI18n();
const user = useUserStore();
const localePath = useLocalePath();
const router = useRouter();
const toast = useToast();

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

async function login() {
  isButtonLoading.value = true;
  const response = await user.login(state.value);
  isButtonLoading.value = false;

  switch (response.status) {
    case 200:
      router.push(localePath({ name: "index" }));
      break;
    case 403:
      toast.add({
        description: t("login.notYetActivated"),
        color: "error",
      });
      break;
    default:
      toast.add({
        description: t("login.failed"),
        color: "error",
      });
  }
}
</script>

<style scoped></style>
