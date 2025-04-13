<template>
  <div>
    <h1 class="content">{{ $t("verification.title") }}</h1>
    <div v-if="result === 'pending'">
      <h4 class="text-primary-700 text-center my-4">
        <LoadingSpinner />
        {{ $t("verification.verifying") }}
      </h4>
      <LoadingSpinner :size="4" color="primary" class="mb-8" />
    </div>
    <div v-if="result === 'success'">
      <h4 class="text-primary-700 text-center my-4">
        <Icon name="fa-solid:check" class="mr-2" aria-hidden />
        {{ $t("verification.success") }}
      </h4>
    </div>
    <div v-else>
      <h4 class="text-danger text-center my-4">
        <Icon name="fa-solid:times" class="mr-2" aria-hidden />
        {{ $t("verification.failure") }}
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  ...defaultSeoMeta,
  title: `${t("verification.pageTitle")} - Monstershuffler.com`,
  ogTitle: `${t("verification.pageTitle")} - Monstershuffler.com`,
});

const route = useRoute();
const router = useRouter();
const user = useUserStore();
const result: Ref<"pending" | "success" | "failure"> = ref("pending");

const token = route?.query?.token;
if (!token) {
  backToHomePage();
}

function backToHomePage() {
  router.push({ path: "/" });
}

const statusCode = await user.verifyEmail(token);
switch (statusCode) {
  case 200:
    result.value = "success";
    setTimeout(backToHomePage, 4000);
    break;
  default:
    result.value = "failure";
    break;
}
</script>

<style scoped></style>
