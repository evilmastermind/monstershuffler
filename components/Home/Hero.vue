<template>
  <div class="lg-max">
    <NavbarPadding />
    <div class="lexical-test">
      <ClientOnly>
        <LazyHomeLexicalTest />
      </ClientOnly>
    </div>
    <!-- <div class="mx-4">
      <Markdown v-model="text" />
    </div> -->
    <!-- <div class="background-color background-color-dark">
    <div class="bg-max">
      <div class="background-image" />
    </div>
  </div> -->
  </div>
</template>

<script setup lang="ts">
const text = ref(`
# Welcome to Monster Shuffler!
This is an example of a markdown file that can be displayed on the website.
- This is a list item
- This is another list item
- This is a third list item
And here is a [link to the website](https://monstershuffler.com).
`);
</script>

<style scoped lang="scss">
.background-color {
  z-index: -2;
  width: 100%;
}
.background-color-dark {
  background-color: #000;
}
.background-image {
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url("@/assets/images/background.jpg");
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
