<template>
  <PresentationThumbnail>
    <Transition name="auto-fade">
      <svg
        v-if="currentNoteIndex === 0"
        class="note"
        viewBox="0 0 150 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="150" height="210" fill="#D9D9D9" />
        <rect width="150" height="70" fill="#d18c45" />
        <circle cx="42" cy="17" r="10" fill="#ffff96" />
        <path
          d="M58.1448 29.2L32 70H111.787L89.2481 19L70.3156 51.13L58.1448 29.2Z"
          fill="#485240"
        />
        <rect x="79" y="65" width="56" height="85" fill="#E9E9E9" />
        <rect x="75" y="61" width="64" height="4" fill="#B9B9B9" />
        <rect x="86" y="70" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="76" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="82" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="88" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="94" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="118" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="106" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="124" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="136" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="112" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="130" width="42" height="2" fill="#B9B9B9" />
        <rect x="86" y="142" width="42" height="2" fill="#B9B9B9" />
        <rect x="75" y="150" width="64" height="4" fill="#B9B9B9" />
        <rect x="13" y="100" width="53" height="2" fill="#535353" />
        <rect x="13" y="88" width="53" height="2" fill="#535353" />
        <rect x="13" y="82" width="53" height="2" fill="#535353" />
        <rect x="13" y="94" width="53" height="2" fill="#535353" />
        <rect x="13" y="130" width="53" height="2" fill="#535353" />
        <rect x="13" y="118" width="53" height="2" fill="#535353" />
        <rect x="13" y="112" width="53" height="2" fill="#535353" />
        <rect x="13" y="124" width="53" height="2" fill="#535353" />
      </svg>
      <svg
        v-else-if="currentNoteIndex === 1"
        class="note"
        viewBox="0 0 150 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="150" height="210" fill="#D9D9D9" />
        <rect x="19" y="115" width="112" height="85" fill="#E9E9E9" />
        <rect x="78" y="120" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="126" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="132" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="138" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="144" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="168" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="156" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="174" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="186" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="162" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="180" width="46" height="2" fill="#B9B9B9" />
        <rect x="78" y="192" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="120" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="126" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="132" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="138" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="144" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="168" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="156" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="174" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="186" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="162" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="180" width="46" height="2" fill="#B9B9B9" />
        <rect x="26" y="192" width="46" height="2" fill="#B9B9B9" />
        <rect x="15" y="200" width="120" height="4" fill="#B9B9B9" />
        <rect x="15" y="111" width="120" height="4" fill="#B9B9B9" />
        <rect x="82" y="99" width="53" height="2" fill="#535353" />
        <rect x="82" y="87" width="53" height="2" fill="#535353" />
        <rect x="82" y="81" width="53" height="2" fill="#535353" />
        <rect x="82" y="93" width="53" height="2" fill="#535353" />
        <rect x="15" y="99" width="53" height="2" fill="#535353" />
        <rect x="15" y="87" width="53" height="2" fill="#535353" />
        <rect x="15" y="81" width="53" height="2" fill="#535353" />
        <rect x="15" y="93" width="53" height="2" fill="#535353" />
        <rect width="150" height="70" fill="#d18c45" />
        <circle cx="42" cy="17" r="10" fill="#ffff96" />
        <path
          d="M58.1448 29.2L32 70H111.787L89.2481 19L70.3156 51.13L58.1448 29.2Z"
          fill="#485240"
        />
      </svg>
      <svg
        v-else-if="currentNoteIndex === 2"
        class="note"
        viewBox="0 0 150 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="150" height="210" fill="#D9D9D9" />
        <g clip-path="url(#clip1_264_47)">
          <rect
            width="75"
            height="210"
            transform="translate(75)"
            fill="#d18c45"
          />
          <circle cx="80" cy="87" r="10" fill="#ffff96" />
          <path
            d="M96.1448 169.2L70 210H149.787L127.248 159L108.316 191.13L96.1448 169.2Z"
            fill="#485240"
          />
        </g>
        <rect x="11" y="32" width="53" height="2" fill="#535353" />
        <rect x="11" y="20" width="53" height="2" fill="#535353" />
        <rect x="11" y="14" width="53" height="2" fill="#535353" />
        <rect x="11" y="26" width="53" height="2" fill="#535353" />
        <rect x="11" y="62" width="53" height="2" fill="#535353" />
        <rect x="11" y="50" width="53" height="2" fill="#535353" />
        <rect x="11" y="44" width="53" height="2" fill="#535353" />
        <rect x="11" y="56" width="53" height="2" fill="#535353" />
        <rect x="10" y="78" width="56" height="85" fill="#E9E9E9" />
        <rect x="6" y="74" width="64" height="4" fill="#B9B9B9" />
        <rect x="6" y="163" width="64" height="4" fill="#B9B9B9" />
        <rect x="17" y="83" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="89" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="95" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="101" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="107" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="131" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="119" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="137" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="149" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="125" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="143" width="42" height="2" fill="#B9B9B9" />
        <rect x="17" y="155" width="42" height="2" fill="#B9B9B9" />
        <defs>
          <clipPath id="clip0_264_47">
            <rect width="150" height="210" rx="10" fill="white" />
          </clipPath>
          <clipPath id="clip1_264_47">
            <rect
              width="75"
              height="210"
              fill="white"
              transform="translate(75)"
            />
          </clipPath>
        </defs>
      </svg>
    </Transition>
  </PresentationThumbnail>
</template>

<script setup lang="ts">
const currentNoteIndex = ref(0);
const interval = ref<NodeJS.Timeout>();

onMounted(() => {
  interval.value = setInterval(() => {
    currentNoteIndex.value = (currentNoteIndex.value + 1) % 3;
  }, 3000);
});

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>

<style scoped>
.notes {
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 140px;
  @apply rounded shadow-md;
}
.note {
  width: 100px;
}
</style>
