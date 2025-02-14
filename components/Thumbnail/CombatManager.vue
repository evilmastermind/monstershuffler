<template>
  <PresentationThumbnail>
    <svg
      class="note"
      viewBox="0 0 150 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="210" fill="#D9D9D9" />
      <rect
        x="10"
        y="62"
        width="130"
        height="24"
        rx="3"
        :fill="currentPlayerIndex === 1 ? '#D9D9D9' : '#B9B9B9'"
        class="player"
      />
      <rect x="10" y="62" width="24" height="24" fill="#4a66ba" />
      <ellipse
        cx="21.7001"
        cy="73.275"
        rx="6.46667"
        ry="7.275"
        fill="#DBDBDB"
      />
      <path d="M21.7 70.85L25.9002 85.4H17.4998L21.7 70.85Z" fill="#DBDBDB" />
      <ellipse cx="21.7" cy="85.4" rx="9.7" ry="4.85" fill="#DBDBDB" />
      <path
        d="M127 65.75L120.25 68.75V73.25C120.25 77.4125 123.13 81.305 127 82.25C130.87 81.305 133.75 77.4125 133.75 73.25V68.75L127 65.75Z"
        fill="#535353"
      />
      <rect
        x="9.5"
        y="61.5"
        width="131"
        height="25"
        rx="3.5"
        stroke="#535353"
      />
      <rect
        x="10"
        y="93"
        width="130"
        height="24"
        rx="3"
        :fill="currentPlayerIndex === 2 ? '#D9D9D9' : '#B9B9B9'"
        class="player"
      />
      <rect x="10" y="93" width="24" height="24" fill="#4a66ba" />
      <ellipse
        cx="21.7001"
        cy="104.275"
        rx="6.46667"
        ry="7.275"
        fill="#DBDBDB"
      />
      <path
        d="M21.7 101.85L25.9002 116.4H17.4998L21.7 101.85Z"
        fill="#DBDBDB"
      />
      <ellipse cx="21.7" cy="116.4" rx="9.7" ry="4.85" fill="#DBDBDB" />
      <path
        d="M127 96.75L120.25 99.75V104.25C120.25 108.413 123.13 112.305 127 113.25C130.87 112.305 133.75 108.413 133.75 104.25V99.75L127 96.75Z"
        fill="#535353"
      />
      <rect
        x="9.5"
        y="92.5"
        width="131"
        height="25"
        rx="3.5"
        stroke="#535353"
      />
      <rect
        x="10"
        y="124"
        width="130"
        height="24"
        rx="3"
        :fill="currentPlayerIndex === 3 ? '#D9D9D9' : '#B9B9B9'"
        class="player"
      />
      <rect x="10" y="124" width="24" height="24" fill="#4a66ba" />
      <ellipse
        cx="21.7001"
        cy="135.275"
        rx="6.46667"
        ry="7.275"
        fill="#DBDBDB"
      />
      <path
        d="M21.7 132.85L25.9002 147.4H17.4998L21.7 132.85Z"
        fill="#DBDBDB"
      />
      <ellipse cx="21.7" cy="147.4" rx="9.7" ry="4.85" fill="#DBDBDB" />
      <path
        d="M127 127.75L120.25 130.75V135.25C120.25 139.413 123.13 143.305 127 144.25C130.87 143.305 133.75 139.413 133.75 135.25V130.75L127 127.75Z"
        fill="#535353"
      />
      <rect
        x="9.5"
        y="123.5"
        width="131"
        height="25"
        rx="3.5"
        stroke="#535353"
      />
      <rect
        x="10"
        y="155"
        width="130"
        height="24"
        rx="3"
        :fill="currentPlayerIndex === 4 ? '#D9D9D9' : '#B9B9B9'"
        class="player"
      />
      <rect x="10" y="155" width="24" height="24" fill="#4a66ba" />
      <ellipse
        cx="21.7001"
        cy="166.275"
        rx="6.46667"
        ry="7.275"
        fill="#DBDBDB"
      />
      <path
        d="M21.7 163.85L25.9002 178.4H17.4998L21.7 163.85Z"
        fill="#DBDBDB"
      />
      <ellipse cx="21.7" cy="178.4" rx="9.7" ry="4.85" fill="#DBDBDB" />
      <path
        d="M127 158.75L120.25 161.75V166.25C120.25 170.413 123.13 174.305 127 175.25C130.87 174.305 133.75 170.413 133.75 166.25V161.75L127 158.75Z"
        fill="#535353"
      />
      <rect
        x="9.5"
        y="154.5"
        width="131"
        height="25"
        rx="3.5"
        stroke="#535353"
      />
      <rect
        x="10"
        y="31"
        width="130"
        height="24"
        rx="3"
        :fill="currentPlayerIndex === 0 ? '#D9D9D9' : '#B9B9B9'"
        class="player"
      />
      <rect x="10" y="31" width="24" height="24" fill="#d18c45" />
      <path
        d="M127 34.75L120.25 37.75V42.25C120.25 46.4125 123.13 50.305 127 51.25C130.87 50.305 133.75 46.4125 133.75 42.25V37.75L127 34.75Z"
        fill="#535353"
      />
      <path
        d="M28.9986 39.8329C28.9986 36.0743 26.1417 33 21.3805 33C16.6193 33 14 36.0743 14 39.8329C14 43.5915 15.048 43.1091 15.048 45.2303C15.048 46.0258 14.2857 45.6401 14.2857 47.3515C14.2857 49.2301 16.8806 48.9657 17.6429 49.7357C18.4037 50.5072 18.332 51.9296 18.332 51.9296C18.332 51.9296 18.4755 52.5071 18.7375 52.3378C18.7375 52.3378 18.9041 52.7475 19.095 52.5064C19.095 52.5064 19.2852 52.9154 19.4754 52.579C19.4754 52.579 19.6664 53.0367 19.9757 52.6996C19.9757 52.6996 20.2844 53.1573 20.6433 52.7962C20.6433 52.7962 21.0474 53.1812 21.4996 52.8928C21.9519 53.1812 22.3567 52.7962 22.3567 52.7962C22.7135 53.1573 23.0243 52.6996 23.0243 52.6996C23.3329 53.0374 23.5224 52.579 23.5224 52.579C23.7148 52.9161 23.9029 52.5064 23.9029 52.5064C24.0945 52.7475 24.2618 52.3378 24.2618 52.3378C24.523 52.5064 24.6659 51.9288 24.6659 51.9288C24.6659 51.9288 24.5941 50.5079 25.3564 49.7365C26.1187 48.9664 28.7129 49.2308 28.7129 47.3515C28.7129 45.6408 27.952 46.0258 27.952 45.2303C27.952 43.1091 29 43.5915 29 39.8329H28.9986ZM17.7907 46.9898C16.5109 47.1968 15.9316 46.8336 15.7916 45.9059C15.427 43.4883 17.6256 43.0975 18.7203 43.2305C19.2443 43.2944 20.1487 43.8566 20.1487 44.5562C20.1487 46.4355 18.9816 46.7973 17.7907 46.9898ZM22.1895 50.1207C21.9526 50.1207 21.5721 49.8084 21.5477 49.2301C21.524 49.8084 21.0955 50.1215 20.8586 50.1215C20.6196 50.1215 20.2629 49.8817 20.2385 49.3028C20.2148 48.7245 20.9764 46.3876 21.5248 46.3876C22.0717 46.3876 22.834 48.7245 22.8096 49.3028C22.7852 49.881 22.4292 50.1215 22.1902 50.1215L22.1895 50.1207ZM27.1423 45.9059C27.0031 46.8336 26.4224 47.1968 25.1425 46.9898C23.9524 46.7965 22.786 46.4355 22.786 44.5562C22.786 43.8566 23.6904 43.2944 24.2144 43.2305C25.309 43.0975 27.5084 43.4883 27.1423 45.9059Z"
        fill="#ffff96"
      />
      <rect
        x="34"
        y="30"
        :width="healthCss.width"
        height="26"
        :fill="healthCss.backgroundColor"
        class="health-bar"
      />
      <rect
        x="9.5"
        y="30.5"
        width="131"
        height="25"
        rx="3.5"
        stroke="#535353"
      />
    </svg>
  </PresentationThumbnail>
</template>

<script setup lang="ts">
const currentPlayerIndex = ref(0);
const interval = ref<NodeJS.Timeout>();

const maxHealth = 100;
const maxWidth = 80;

const healthCss = computed(() => {
  const css = getHealthBarCss(
    maxHealth - (maxHealth / 5) * currentPlayerIndex.value,
    maxHealth,
    "light"
  );
  return {
    width: parseInt(css.width.split("%")[0]) * (maxWidth / 100),
    backgroundColor: css.backgroundColor,
  };
});

onMounted(() => {
  interval.value = setInterval(() => {
    currentPlayerIndex.value = (currentPlayerIndex.value + 1) % 5;
  }, 1500);
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
.health-bar {
  transition: width 0.5s ease;
}
.player {
  transition: fill 0.2s ease;
}
</style>
