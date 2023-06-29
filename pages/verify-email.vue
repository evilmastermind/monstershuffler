<template>
  <div>
    <div v-if="result !== 'pending'">
      <h4 class="text-primary-700 text-center my-4">
        <font-awesome-icon icon="fa-solid fa-spinner-third" />
        {{ $t("verification.verifying") }}
      </h4>
      <LoadingSpinner :size="4" color="primary" class="mb-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
useHead({
  title: "Login - Monstershuffler.com",
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
  // router.push({ path: "/" });
}

const res = await user.verifyEmail(token);
switch (res.status) {
  case 200:
    result.value = "success";
    setTimeout(backToHomePage, 5000);
    break;
  default:
    result.value = "failure";
    setTimeout(backToHomePage, 5000);
    break;
}
</script>

<style scoped lang="scss"></style>
