<template>
  <label class="container">
    <input v-model="modelValue" type="checkbox" :disabled />
    <span class="label">{{ label }}</span>
    <span class="ms-input-style checkmark" />
  </label>
</template>

<script setup lang="ts">
const modelValue = defineModel();

const p = defineProps({
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
/* Customize the label (the container) */
.container {
  display: inline-block;
  width: max-content;
  max-width: 100%;
  position: relative;
  padding-left: 2em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5em;
  width: 1.5em;
}
.checkmark:disabled {
  opacity: 0.5;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
}

.container input ~ .checkmark {
  cursor: pointer;
}
.container input:disabled ~ .checkmark {
  cursor: auto;
}
.container input ~ .label {
  cursor: pointer;
}
.container input:disabled ~ .label {
  cursor: auto;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid theme("colors.text");
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  opacity: 1;
}

input:focus-visible + .checkmark {
  outline: 2px solid theme("colors.text");
  box-shadow: 0 0 0 3px theme("colors.text");
}
.label {
  display: inline-block;
  letter-spacing: 0.05em;
  line-height: 1.3em;
  font-size: 0.875rem;
  text-shadow: 0 0 20px theme("colors.text-inverse");
}
</style>
