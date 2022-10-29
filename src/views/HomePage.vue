<template>
  <div class="test">
    <div class="title">
      The most powerful monster editor in the world
    </div>
    <img
      class="image"
      src="@/assets/images/pony.png"
    >
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.test {
  display: flex;
  align-items: center;
  padding-top: 10rem;
  justify-content: space-between;
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
  margin: 2em;
}
</style>