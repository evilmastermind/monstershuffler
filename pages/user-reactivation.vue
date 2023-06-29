<template>
  <div>
    <!-- <div class="logo mt-4">
      <NuxtLink :to="localePath({ name: 'index' })">
        <div class="logo mt-4">
          <LogoStatic :size="30" class="inline" />onstershuffler
        </div>
      </NuxtLink>
    </div> -->
    <h1 class="text-center mt-5">{{ $t("reactivation.title") }}</h1>
    <p class="mt-2 mb-6 text-center">
      {{ $t("reactivation.message") }}
    </p>
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
      <MSButton
        block
        class="mt-4 mb-4"
        color="primary"
        icon="fa-envelope"
        :text="$t('reactivation.sendEmail')"
        :loading="isButtonLoading"
      />
    </form>
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

watch(
  credentials,
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
