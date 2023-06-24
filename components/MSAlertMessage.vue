<template>
  <div class="modal centered">
    <MSCard>
      <div class="content">
        <h4 v-if="title" class="mt-4">{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
      <div class="buttons mb-4">
        <MSButton
          block
          class="mt-6"
          color="primary"
          :text="$t('login.login')"
        />
        <MSButton
          block
          class="mt-4 mb-4"
          type="button"
          color="light"
          :text="$t('login.loginWithPatreon')"
        />
      </div>
    </MSCard>
  </div>
</template>

<script setup lang="ts">
const e = defineEmits(["ok", "cancel"]);
const p = defineProps({
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.7);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
