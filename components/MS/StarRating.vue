<template>
  <div class="star-rating">
    <button
      v-for="i in stars"
      :key="i"
      class="star"
      :class="{ active: i <= rating || i <= hoverRating }"
      :style="{
        width: `${size}rem`,
        height: `${size}rem`,
      }"
      @click="setRating(i)"
      @mouseenter="hoverRating = i"
      @mouseleave="hoverRating = rating"
    >
      <span class="sr-only">{{ $t("rate") }} {{ i }}</span>
    </button>
    <div
      v-if="rating > 0 && initialRating !== rating"
      :key="rating"
      class="thanks"
    >
      <span>{{ $t("thanks") }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const e = defineEmits(["rate"]);
const p = defineProps({
  size: {
    type: Number,
    default: 1,
  },
  stars: {
    type: Number,
    default: 5,
  },
});
const rating = ref<number>(0);

const initialRating = defineModel({ type: Number, default: 0 });
const hoverRating = ref<number>(0);

function setRating(value: number) {
  rating.value = value;
  e("rate", rating.value);
}

watch(initialRating, () => {
  rating.value = initialRating.value;
});
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-flex;
}
.star {
  background-image: url("/images/ui/star-stolen-from-amazon-empty.svg");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s;
}
.star.active {
  background-image: url("/images/ui/star-stolen-from-amazon-full.svg");
}
.thanks {
  position: absolute;
  top: 100%;
  right: 0%;
  font-family: "MrsEavesSmallCaps";
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  line-height: 1;
  animation: thanks 1s forwards;
  @apply text-text-evil;
}
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
</style>
