<template>
<label class="switch">
    <input
      class="slider-checkbox"
      type="checkbox"
    />
    <span class="slider round" />
</label>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
//----------------------------------
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 14px;
}

/* Hide default HTML checkbox */
.switch .slider-checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The3slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  @include themed() {
    background-color: t($background-card);
  }
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider-checkbox:checked + .slider {
  background-color: #2196f3;
}

.slider-checkbox:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

.slider-checkbox:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.section-text {
  max-width: 800px;
  margin: $s-8 auto;
}
</style>
