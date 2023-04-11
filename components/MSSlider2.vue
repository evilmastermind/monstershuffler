<template>
  <label class="switch">
    <div class="slider-container">
      <input type="checkbox" v-model="currentValue" @change="emit('update:isEnabled', currentValue)">
      <span class="slider round"></span>
    </div>
  </label>
</template>

<script setup>
const emit = defineEmits(["update:isEnabled"]);
const p = defineProps({
  isEnabled: {
    type: Boolean,
    default: false,
  }
});

let currentValue = $ref(false);


onMounted(() => {
  currentValue = p.isEnabled;
});

watch(() => p.isEnabled, () => {
  currentValue = p.isEnabled;
});


</script>

<style lang="scss" scoped>

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
  -webkit-transition: .4s;
  transition: .4s;
  @include themed() {
    background-color: desaturate(lighten(t($primary-700),30),100);
  }
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 4px;
  bottom: -4px;
  border-radius: 4px;
  -webkit-transition: ease-out .2s;
  transition: ease-out .15s;
  @include themed() {
    background: desaturate(t($primary-700),100);
  }
}

input:checked + .slider {
  @include themed() {
    background-color: lighten(t($primary-700),10);
  }
}
input:checked + .slider:before {
  @include themed() {
    background: t($primary-700);
  }
}

input:focus + .slider {
  @include themed() {
    box-shadow: 0 0 1px lighten(t($primary-700),10);
  }
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
