<template>
  <div class="mx-4">
    {{ bigObject.nested.key }}
    <TempReactivityTestChild :key="bigObject.i" :big-object="bigObject" />
    <MSButton text="change" @click="changeNestedKey" />
  </div>
</template>

<script setup lang="ts">
const bigObject = shallowRef({
  i: 0,
  nested: {
    key: "hello",
  },
});

function doSomeTriggerin() {
  bigObject.value.i++;
  console.log("doSomeTriggerin", bigObject.value.i);
  triggerRef(bigObject);
}

function changeNestedKey() {
  bigObject.value.nested.key = random(1, 10).toString();
  doSomeTriggerin();
}
</script>

<style scoped></style>
