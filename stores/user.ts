import {
  Credentials,
  RegistrationFields,
  LoginResponseSchema,
  CreateUserResponseSchema,
  GetUserResponseSchema,
} from "./user.d";
import { handleResponse } from "@/utils/functions";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

/// ////////////////////////////////////////////////

export const useUserStore = defineStore("user", () => {
  const token: Ref<string> = ref("");
  const me: Ref<GetUserResponseSchema | null> = ref(null);

  async function login(credentials: Credentials) {
    const { data, error } = await useAsyncData<LoginResponseSchema>(
      "login",
      () =>
        $fetch(`${api}/users/login`, {
          method: "POST",
          body: credentials,
        })
    );
    if (data?.value?.accessToken) {
      token.value = data.value.accessToken;
    }
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 200);
  }

  async function register(fields: RegistrationFields) {
    const { data, error } = await useAsyncData<CreateUserResponseSchema>(
      "register",
      () =>
        $fetch(`${api}/users`, {
          method: "POST",
          body: fields,
        })
    );
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 201);
  }

  async function verifyEmail(token: string) {
    const { data, error } = await useAsyncData<LoginResponseSchema>(
      "verify",
      () =>
        $fetch(`${api}/users/verify`, {
          method: "PUT",
          body: { token },
        })
    );
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 200);
  }

  async function reactivate(email: string) {
    const { data, error } = await useAsyncData("reactivate", () =>
      $fetch(`${api}/users/reactivation`, {
        method: "POST",
        body: { email },
      })
    );
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 200);
  }

  async function resetPassword(password: string, tokenpwd: string) {
    const { data, error } = await useAsyncData<LoginResponseSchema>(
      "resetPassword",
      () =>
        $fetch(`${api}/users/pwdreset`, {
          method: "PUT",
          body: { password, token: tokenpwd },
        })
    );
    if (data?.value?.accessToken) {
      token.value = data.value.accessToken;
    }
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 200);
  }

  async function getDetails() {
    if (!token.value) {
      return;
    }
    const { data, error } = await useAsyncData<GetUserResponseSchema>(
      "getDetails",
      () =>
        $fetch(`${api}/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
    );
    if (data?.value) {
      me.value = data.value;
    }
  }

  function logout() {
    token.value = "";
    me.value = null;
    localStorage.removeItem("token");
  }

  watch(token, (newValue) => {
    if (newValue) {
      localStorage.setItem("token", newValue);
    }
  });

  return {
    token,
    me,
    login,
    logout,
    register,
    reactivate,
    verifyEmail,
    resetPassword,
    getDetails,
  };
});
