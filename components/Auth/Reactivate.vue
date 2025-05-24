<template>
  <UCard class="w-full h-full rounded-none sm:w-[450px] sm:h-auto sm:rounded">
    <template #header>
      <TH3 class="text-center">{{ $t("reactivation.title") }}</TH3>
    </template>

    <UForm
      v-if="!hasRequestBeenSent"
      :schema="schema"
      :state="state"
      @submit="login"
      class="space-y-2"
    >
      <TP>
        {{ $t("reactivation.message") }}
      </TP>
      <UFormField :label="$t('email')" name="email" class="mt-4">
        <UInput
          v-model="state.email"
          type="email"
          class="w-full"
          :label="$t('email')"
          required
        />
      </UFormField>
      <UButton
        block
        type="submit"
        class="mt-6"
        color="neutral"
        :label="$t('reactivation.sendEmail')"
        :loading="isButtonLoading"
        :disabled="isButtonLoading"
      />
    </UForm>
    <div v-else>
      <TP>{{ $t("reactivation.emailSentMaybe") }}</TP>
    </div>
    <template #footer>
      <div class="flex flex-col items-center gap-2">
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

const state = ref({ email: "" });
const isButtonLoading = ref(false);
const hasRequestBeenSent = ref(false);

const schema = z.object({
  email: z
    .string()
    .email(t("login.error.emailInvalid"))
    .min(1, { message: t("error.fieldRequired") }),
});

async function login() {
  isButtonLoading.value = true;
  const response = await user.reactivate(state.value);
  isButtonLoading.value = false;
  hasRequestBeenSent.value = true;
  // TODO: show a generic error message if the response is not successful
  setTimeout(() => {
    router.push({ path: "/" });
  }, 5000);
}
</script>

<style scoped></style>
