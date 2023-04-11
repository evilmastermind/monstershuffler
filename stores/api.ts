const config = useRuntimeConfig();

const api = config.public.apiUrl;

export const useApiStore = defineStore("api", () => {
  async function getClasses() {
    const {
      data: classes,
      // pending,
      // error,
      // refresh,
    } = await useAsyncData("classes", () => $fetch(`${api}/classes`));
    return classes.value?.list || [];
  }

  return {
    getClasses,
  };
});
