export default defineNuxtPlugin(() => {
  if (import.meta.env.DEV) {
    const originalInfo = console.info;
    console.info = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("<Suspense> is an experimental feature")
      ) {
        return; // terminate msg
      }
      originalInfo(...args);
    };
  }
});
