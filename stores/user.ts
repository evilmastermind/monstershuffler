import {
  Credentials,
  RegistrationFields,
  LoginResponseSchema,
  CreateUserResponseSchema,
} from "./user.d";
import { NuxtError } from "@/types/nuxt";
import { handleResponse } from "@/utils/functions";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

export const useUserStore = defineStore("user", () => {
  const token: Ref<String> = ref("");
  const test: Ref<String> = ref("");

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
    }
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 201);
  }

  async function register(fields: RegistrationFields) {
    const { data, pending, error } =
      await useAsyncData<CreateUserResponseSchema>("register", () =>
        $fetch(`${api}/users`, {
          method: "POST",
          body: fields,
        })
      );
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 201);
  }

  async function verifyEmail(token: string) {
    const { data, pending, error } = await useAsyncData("verify", () =>
      $fetch(`${api}/users/verify`, {
        method: "GET",
        body: { token },
      })
    );
    // @ts-ignore: TODO: (nuxt bug?) error is not actually of type Error, and I can't access error.statusCode
    return handleResponse(data.value, error.value, 200);
  }

  return {
    test,
    login,
    register,
    verifyEmail,
  };
});
