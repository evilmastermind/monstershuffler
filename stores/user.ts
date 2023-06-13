import { Credentials, LoginResponseSchema } from "./user.d";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

export const useUserStore = defineStore("user", () => {
  const token: Ref<String> = ref("");

  async function login(credentials: Credentials) {
    const { data, pending, error } = await useAsyncData<LoginResponseSchema>(
      "login",
      () =>
        $fetch(`${api}/users/login`, {
          method: "POST",
          body: credentials,
        })
    );

    if (data?.value?.accessToken) {
      token.value = data.value.accessToken;
      return true;
    } else {
      return false;
    }
  }

  return {
    login,
  };
});
