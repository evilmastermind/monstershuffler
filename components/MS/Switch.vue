<template>
  <label class="switch">
    <div class="slider-container">
      <input v-model="model" type="checkbox" />
      <span class="slider round"></span>
    </div>
  </label>
</template>

<script setup>
const model = defineModel({ type: Boolean, required: true });
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  cursor: pointer;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider-container {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 6px;
  bottom: -9px;
}

/* The slider */
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  @apply bg-grey-500;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: -4px;
  border-radius: 4px;
  -webkit-transition: ease-out 0.2s;
  transition: ease-out 0.15s;
  @apply bg-grey-700;
}

input:checked + .slider {
  @apply bg-primary-500;
}
input:checked + .slider:before {
  @apply bg-primary-700;
}

input:focus-visible + .slider {
  outline: 2px solid theme("colors.text");
  box-shadow: 0 0 0 3px theme("colors.text-inverse");
}

input:checked + .slider:before {
  -webkit-transform: translateX(17px);
  -ms-transform: translateX(17px);
  transform: translateX(17px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
