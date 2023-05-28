// import { ref, onMounted, onUnmounted } from "vue";

export function useScreen() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const small = ref(0);
  const medium = ref(0);
  const large = ref(0);

  function update() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  function readCssVariable(variableName: string) {
    const variable = getComputedStyle(
      document.documentElement
    ).getPropertyValue(variableName);
    return variable ? parseInt(variable.replace(/px$/, "")) : 0;
  }

  onMounted(() => {
    window.addEventListener("resize", update);
    small.value = readCssVariable("--screen-small");
    medium.value = readCssVariable("--screen-medium");
    large.value = readCssVariable("--screen-large");
  });
  onUnmounted(() => window.removeEventListener("resize", update));

  return { width, height, small, medium, large };
}
