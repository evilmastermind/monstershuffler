import { get } from "http";
import {
  Credentials,
  RegistrationFields,
  LoginResponseSchema,
  CreateUserResponseSchema,
  GetUserResponseSchema,
} from "./user.d";
import { PageSettings } from "@/types";
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

  async function getSettings<T extends object>(
    page: string
  ): Promise<T | null> {
    if (token.value === "") {
      return getSettingsFromLocalStorage<T>(page);
    }
    const { data, error } = await useAsyncData<{ page: string; object: T }>(
      `getSettings-${page}`,
      () =>
        $fetch(`${api}/page-settings/${page}`, {
          method: "GET",
        })
    );
    if (!data?.value?.object) {
      return getSettingsFromLocalStorage<T>(page);
    }
    return data.value.object as T;
  }

  function getSettingsFromLocalStorage<T extends object>(
    page: string
  ): T | null {
    try {
      const settingsString = localStorage.getItem(`settings-${page}`);
      if (!settingsString) {
        return null;
      }
      return JSON.parse(settingsString) as T;
    } catch (e) {
      return null;
    }
  }

  async function setSettings<T extends object>(
    page: string,
    settings: T
  ): Promise<T | false> {
    if (token.value === "") {
      return setSettingsInLocalStorage<T>(page, settings);
    }
    const { data, error } = await useAsyncData<T>(`saveSettings-${page}`, () =>
      $fetch(`${api}/page-settings/${page}`, {
        method: "POST",
        body: settings as Record<string, any>,
      })
    );
    if (!data?.value) {
      return false;
    }
    return data.value as T;
  }

  function setSettingsInLocalStorage<T extends object>(
    page: string,
    settings: T
  ): T | false {
    try {
      localStorage.setItem(`settings-${page}`, JSON.stringify(settings));
      return settings;
    } catch (e) {
      return false;
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
    getSettings,
    setSettings,
  };
});
