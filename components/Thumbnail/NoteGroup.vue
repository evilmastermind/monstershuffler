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
        <rect width="91" height="70" transform="translate(59)" fill="#4a66ba" />
        <circle cx="72" cy="17" r="10" fill="#e1ecf7" />
        <path
          d="M88.1448 29.2L62 70H141.787L119.248 19L100.316 51.13L88.1448 29.2Z"
          fill="#383220"
        />
        <rect x="71" y="103" width="67" height="2" fill="#535353" />
        <rect x="71" y="91" width="67" height="2" fill="#535353" />
        <rect x="71" y="85" width="67" height="2" fill="#535353" />
        <rect x="71" y="97" width="67" height="2" fill="#535353" />
        <rect x="71" y="133" width="67" height="2" fill="#535353" />
        <rect x="71" y="121" width="67" height="2" fill="#535353" />
        <rect x="71" y="115" width="67" height="2" fill="#535353" />
        <rect x="71" y="127" width="67" height="2" fill="#535353" />
        <rect x="71" y="163" width="67" height="2" fill="#535353" />
        <rect x="71" y="151" width="67" height="2" fill="#535353" />
        <rect x="71" y="145" width="67" height="2" fill="#535353" />
        <rect x="71" y="157" width="67" height="2" fill="#535353" />
        <rect
          x="12.5"
          y="18.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 21)"
          stroke="#535353"
        />
        <rect
          x="12.5"
          y="34.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 37)"
          stroke="#535353"
        />
        <rect
          x="12.5"
          y="50.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 53)"
          stroke="#535353"
        />
        <rect
          x="12.5"
          y="26.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 29)"
          stroke="#535353"
        />
        <rect
          x="12.5"
          y="42.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 45)"
          stroke="#535353"
        />
        <rect
          x="12.5"
          y="58.5"
          width="38"
          height="1"
          fill="#535353"
          stroke="#535353"
        />
        <circle
          cx="2"
          cy="2"
          r="1.5"
          transform="matrix(1 0 0 -1 6 61)"
          stroke="#535353"
        />
        <rect x="6" y="8" width="36" height="3" fill="#535353" />
        <line x1="59.5" y1="210" x2="59.5" y2="2.23761e-08" stroke="#B9B9B9" />
      </svg>
      <svg
        v-else-if="currentNoteIndex === 1"
        class="note"
        viewBox="0 0 150 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="150" height="210" fill="#4a66ba" />
        <rect width="150" height="210" fill="#4a66ba" />
        <path
          d="M95.5 22.5L68.5 59.5L57.5 55.5L64 68H43.5L64 87.5L57.5 104.5H33L20 92.5L13 110.5L33 137.5H57.5V126L88 117.5L105.5 92.5L126.5 87.5L131 68L123 48.5H105.5L95.5 22.5Z"
          fill="#383220"
          stroke="#383220"
        />
        <path
          d="M110 112.5L106 125H115L122.5 130L119 117.5L110 112.5Z"
          fill="#383220"
          stroke="#383220"
        />
        <path
          d="M29 197.5L22 210H115.5L104.5 197.5L83.5 193.5L78 181V165L60 181H48.5L45.5 193.5L37 188H25L29 197.5Z"
          fill="#383220"
          stroke="#383220"
        />
        <circle cx="78" cy="99" r="3" fill="#D9D9D9" />
        <circle cx="114" cy="121" r="3" fill="#D9D9D9" />
        <circle cx="78" cy="165" r="3" fill="#D9D9D9" />
        <circle cx="60" cy="181" r="3" fill="#D9D9D9" />
        <circle cx="120" cy="49" r="3" fill="#D9D9D9" />
        <circle cx="22" cy="102" r="3" fill="#D9D9D9" />
        <rect x="69" y="105" width="18" height="3" fill="#D9D9D9" />
        <rect x="105" y="127" width="18" height="3" fill="#D9D9D9" />
        <rect x="69" y="171" width="18" height="3" fill="#D9D9D9" />
        <rect x="51" y="187" width="18" height="3" fill="#D9D9D9" />
        <rect x="111" y="55" width="18" height="3" fill="#D9D9D9" />
        <rect x="13" y="108" width="18" height="3" fill="#D9D9D9" />
      </svg>
      <svg
        v-else
        class="note"
        viewBox="0 0 150 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="150" height="210" fill="#D9D9D9" />
        <rect x="55" y="36" width="40" height="14" fill="#535353" />
        <rect x="55" y="129" width="40" height="14" fill="#535353" />
        <rect x="55" y="160" width="40" height="14" fill="#535353" />
        <rect x="85" y="67" width="40" height="14" fill="#535353" />
        <rect x="85" y="98" width="40" height="14" fill="#535353" />
        <rect x="25" y="67" width="40" height="14" fill="#535353" />
        <rect x="25" y="98" width="40" height="14" fill="#535353" />
        <circle cx="45" cy="98" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="45" cy="67" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="105" cy="67" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="75" cy="36" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="105" cy="98" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="75" cy="129" r="4.5" fill="#D9D9D9" stroke="black" />
        <circle cx="75" cy="160" r="4.5" fill="#D9D9D9" stroke="black" />
        <path d="M75 50V55M75 55H45V62M75 55H105V62" stroke="black" />
        <path d="M45 81V93" stroke="black" />
        <path d="M105 81V93" stroke="black" />
        <path d="M45 112V117H105V112" stroke="black" />
        <path d="M75 117.5V124" stroke="black" />
        <path d="M75 143V155" stroke="black" />
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
