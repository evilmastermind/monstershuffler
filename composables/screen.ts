export function useScreen() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const small = ref(0);
  const medium = ref(0);
  const large = ref(0);
  const xLarge = ref(0);
  const updateDebounce = debounce(() => update(), 20);

  const smAndDown = computed(() => width.value <= small.value);
  const smAndUp = computed(() => width.value >= small.value);
  const mdAndDown = computed(() => width.value <= medium.value);
  const mdAndUp = computed(() => width.value >= medium.value);
  const lgAndDown = computed(() => width.value <= large.value);
  const lgAndUp = computed(() => width.value >= large.value);
  const xlAndDown = computed(() => width.value <= xLarge.value);
  const xlAndUp = computed(() => width.value >= xLarge.value);

  function update() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  function callUpdateDebounce() {
    updateDebounce();
  }

  function readCssVariable(variableName: string) {
    const variable = getComputedStyle(
      document.documentElement
    ).getPropertyValue(variableName);
    return variable ? parseInt(variable.replace(/px$/, "")) : 0;
  }

  onMounted(() => {
    window.addEventListener("resize", callUpdateDebounce);
    small.value = 480;
    medium.value = 1000;
    large.value = 1200;
    xLarge.value = 1600;
  });
  onUnmounted(() => window.removeEventListener("resize", update));

  return {
    width,
    height,
    small,
    medium,
    large,
    smAndDown,
    smAndUp,
    mdAndDown,
    mdAndUp,
    lgAndDown,
    lgAndUp,
    xlAndDown,
    xlAndUp,
  };
}
