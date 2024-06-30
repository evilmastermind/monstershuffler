<template>
  <div class="backstory">
    <h1 class="name mb-2" :class="moral">{{ statistics.fullName }}</h1>
    <p class="backstory-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo
      lectus ut sapien posuere consectetur. Aliquam viverra leo tellus, eget
      semper dolor consectetur sit amet. Pellentesque malesuada varius ante, et
      egestas quam. Aliquam sit amet pellentesque arcu. Pellentesque sagittis
      aliquet quam, nec tempus lorem tincidunt non. In nec arcu condimentum,
      malesuada tellus et, malesuada justo. Vivamus porta viverra justo, in
      dapibus velit tincidunt id. Nulla luctus sit amet ante vitae lobortis.
      Donec quis odio et est varius consectetur. Nullam vehicula est et
      vestibulum porttitor. Suspendisse potenti. Fusce molestie fermentum metus,
      vitae hendrerit ex commodo a. Sed egestas ut nibh id placerat. Aliquam
      erat volutpat.
    </p>
    <p class="backstory-text">
      Nunc mollis ac nisl nec elementum. In hac habitasse platea dictumst.
      Mauris a risus nec velit mattis porta nec sed est. Donec faucibus commodo
      mi non mattis. Pellentesque habitant morbi tristique senectus et netus et
      malesuada fames ac turpis egestas. Maecenas consequat hendrerit arcu vitae
      sagittis. Integer gravida interdum magna, sagittis viverra nibh vestibulum
      eget. Nullam at orci egestas, fringilla ligula vel, vulputate neque.
      Nullam tortor neque, tristique vitae dolor eu, mattis semper nulla. Proin
      faucibus purus vitae dignissim blandit. Sed egestas consectetur magna, et
      consectetur tortor consectetur quis. Integer neque enim, sagittis quis est
      nec, volutpat posuere diam.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const generatorStore = useGeneratorStore();

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as ComputedRef<string>;
const chunks = ref<string[]>([]);

onMounted(() => {
  generatorStore.generateBackstory();
});
</script>

<style scoped>
.backstory {
}
.name {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
}
.backstory-text {
  font-family: "LibreBaskerville", serif;
  line-height: 1.5;
  @apply my-2;
}
/*
.backstory-text:first-letter {
  initial-letter: 5;
  font-family: "AngloText";
  font-weight: 400;
  @apply text-text-neutral;
}
*/
</style>
