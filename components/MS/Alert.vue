<template>
  <Teleport to="body" :disabled="inline">
    <div 
      class="alert-container"         
      :class="[
        inline ? '' : 'alert-container-fixed px-4'
      ]"
    >
      <div
        class="alert p-4"
        :class="[
          type,
          inline ? 'shadow-sm' : 'shadow-xl alert-fixed'
          ]"
        role="alert"
      >
        <div>
          <Icon v-if="computedIcon" class="icon" :name="computedIcon" aria-hidden />
        </div>
        <div class="alert-message">
          <h4 v-if="title" class="alert-title content">{{ title }}</h4>
          <slot />
        </div>
        <div class="close-button">
          <MSIconButton
            class="close ml-1"
            :label="$t('closeLabel')"
            icon="fa6-solid:xmark"
            @click.stop="e('close')"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">

type Alert = "info" | "success" | "warning" | "danger";

const e = defineEmits(["close"]);
const p = defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<Alert>,
    default: "info",
  },
  inline: {
    type: Boolean,
    default: false,
  },
  closeable: {
    type: Boolean,
    default: true,
  },
});

const computedIcon = computed(() => {
  if (p.icon) {
    return p.icon;
  }
  switch (p.type) {
    case "info":
      return "ep:info-filled";
    case "success":
      return "lets-icons:check-fill";
    case "warning":
      return "ep:warning-filled";
    case "danger":
      return "mdi:cross-circle";
  }
  return "";
});
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @apply rounded gap-4;
}
.icon {
  font-size: 1.7rem;
  @apply mt-1;
}
.info {
  @apply bg-info text-text-inverse;
}
.success {
  @apply bg-success text-text-inverse;
}
.warning {
  @apply bg-warning text-text-inverse;
}
.danger {
  @apply bg-danger text-text-inverse;
}
.alert-container-fixed {
  position: fixed;
  width: 100%;
  top: 0.5rem;
  z-index: 9999;
}
.alert-fixed{
  width: theme("screens.md");
  max-width: 100%;
  margin: 0 auto;
}
</style>
