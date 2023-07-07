<template>
  <div></div>
</template>

<script setup lang="ts">
const user = useUserStore();

onMounted(() => {
  user.token = "";
  localStorage.removeItem("token");
});
</script>

<style scoped></style>
