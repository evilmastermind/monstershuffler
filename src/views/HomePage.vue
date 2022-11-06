<template>
  <div class="test">
    <!-- <div class="lg-max flexo">
      <div class="title">
        Some catchy phrase. 
      </div>
      <img
        class="image"
        src="@/assets/images/pony.png"
      >
    </div> -->
    <div class="gradient" />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.flexo {
  display: flex;
  align-items: center;
  padding-top: 10rem;
  justify-content: space-between;
}
.test {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 90vh;
  background-image: url("@/assets/images/background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  color: #FFF;
  margin-top: 2em;
  font-size: 5em;
}
.image {
  max-width: 450px; 
}
// test gradient at the bottom of the image
// .gradient {
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 6rem;
//   @include themed() {
//     background: linear-gradient(180deg,transparent 0,t($background) 100%);
//   }
// }
</style>