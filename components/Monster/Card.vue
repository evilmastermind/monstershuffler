<template>
  <div
    class="background"
    :class="
      !selectable ? `background-${ui.currentThemeType}` : 'bg-background-card'
    "
  >
    <!-- <div class="background-before" :class="[`bg-${ethical}-100`]" /> -->
    <div class="content p-4" :class="selectable ? 'selectable' : ''">
      <MonsterRoleplayStats />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const ui = useUiStore();

const p = defineProps({
  selectable: {
    type: Boolean,
    default: false,
  },
  character: {
    type: Object as PropType<Character>,
    required: true,
  },
});

const refCharacter = toRef(p, "character");

useProvideCharacter(refCharacter);
</script>

<style scoped lang="scss">
.background {
  position: relative;
  @apply rounded-xl;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), inset 0 0 55px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.background-light {
  background: url("@/assets/images/monster/paper.jpg");
}
.background-dark {
  background-image: url("@/assets/images/monster/paper-texture-dark.png");
}
.content {
  height: 100%;
  font-family: "ScalaSansOffc", serif;
}
.selectable {
  @apply cursor-pointer rounded-xl;
  transition: background-color 0.09s ease-in-out;
}
.selectable:hover {
  @apply bg-background-100;
}
.ethical-symbol {
  position: absolute;
  bottom: -100px;
  right: -200px;
  width: 500px;
}
.good {
  filter: hue-rotate(-120deg);
}
.evil {
}
.neutral {
  filter: hue-rotate(60deg);
}
// .background {
//   @apply relative;
// }
// .background-before,
// .background-after {
//   position: absolute;
//   display: block;
//   content: "";
//   width: 100%;
//   height: 6px;
// }
// .background::after {
//   bottom: 0;
// }
// .content {
//   height: 100%;
//   width: calc(100% - 6px);
//   @apply bg-background-card mx-auto;
// }
</style>
