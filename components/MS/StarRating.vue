<template>
  <div class="relative inline-flex">
    <button
      v-for="i in stars"
      :key="i"
      @click="setRating(i)"
      @mouseenter="hoverRating = i"
      @mouseleave="hoverRating = rating"
      :style="{ width: `${size}rem`, height: `${size}rem` }"
      class="star bg-[length:contain] bg-no-repeat cursor-pointer transition-transform duration-200"
      :class="
        i <= rating || i <= hoverRating
          ? 'bg-[url(/images/ui/star-stolen-from-amazon-full.svg)]'
          : 'bg-[url(/images/ui/star-stolen-from-amazon-empty.svg)]'
      "
    >
      <span class="sr-only">{{ $t("rate") }} {{ i }}</span>
    </button>
    <div
      v-if="rating > 0 && initialRating !== rating"
      :key="rating"
      class="absolute top-full right-0 font-[MrsEavesSmallCaps] font-bold text-[0.9rem] tracking-wider leading-none text-al-evil animate-thanks"
    >
      <span>{{ $t("thanks") }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const e = defineEmits(["rate"]);
const p = defineProps({
  size: { type: Number, default: 1 },
  stars: { type: Number, default: 5 },
});
const rating = ref(0);
const initialRating = defineModel({ type: Number, default: 0 });
const hoverRating = ref(0);

function setRating(value: number) {
  rating.value = value;
  e("rate", rating.value);
}

watch(initialRating, () => {
  rating.value = initialRating.value;
});
</script>

<style scoped>
@keyframes thanks {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.animate-thanks {
  animation: thanks 1s forwards;
}
</style>
