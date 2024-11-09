<template>
  <div>
    <h1 class="content text-center mt-2">{{ $t("reactivation.title") }}</h1>

    <form
      v-if="!hasRequestBeenSent"
      class="centered"
      @submit.prevent="reactivate"
    >
      <p class="content mt-2 mb-6 text-center">
        {{ $t("reactivation.message") }}
      </p>
      <label class="ms-label">
        {{ $t("email") }}
        <input
          v-model="credentials.email"
          type="email"
          class="ms-input-style ms-input w-full"
          required
        />
      </label>
      <MSButton
        block
        class="mt-4 mb-4"
        color="primary"
        icon="fa6-solid:envelope"
        :text="$t('reactivation.sendEmail')"
        :loading="isButtonLoading"
      />
    </form>
    <div v-else class="mt-6 mb-6 text-center">
      <p class="content">{{ $t("reactivation.emailSentMaybe") }}</p>
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
  title: `${t("reactivation.pageTitle")} - Monstershuffler.com`,
});

const router = useRouter();
const user = useUserStore();

const credentials = ref({ email: "" });
const isButtonLoading = ref(false);
const errorMessage = ref("");
const hasRequestBeenSent = ref(false);

async function reactivate() {
  isButtonLoading.value = true;
  await user.reactivate(credentials.value.email);
  isButtonLoading.value = false;
  hasRequestBeenSent.value = true;
  setTimeout(() => {
    router.push({ path: "/" });
  }, 5000);
}

watch(
  credentials,
  () => {
    errorMessage.value = "";
  },
  { deep: true }
);
</script>

<style scoped></style>
