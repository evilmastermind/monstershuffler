import type {
  Credentials,
  RegistrationFields,
  LoginResponse,
  GetUserResponse,
} from "@/types";
import { parseError } from "@/utils";

const config = useRuntimeConfig();
const api = config.public.apiUrl;

/// ////////////////////////////////////////////////

export const useUserStore = defineStore("user", () => {
  const token: Ref<string> = ref("");
  const me: Ref<GetUserResponse | null> = ref(null);
  const settings = computed(() => me.value?.settings || {});
  const language = computed(() => me.value?.settings?.language || "en");

  async function login(credentials: Credentials) {
    try {
      const data: LoginResponse = await $fetch(`${api}/users/login`, {
        method: "POST",
        body: credentials,
      });
      token.value = data.accessToken;
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function register(fields: RegistrationFields) {
    try {
      await $fetch(`${api}/users`, {
        method: "POST",
        body: fields,
      });
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function verifyEmail(token: string) {
    try {
      await $fetch(`${api}/users/verify`, {
        method: "PUT",
        body: { token },
      });
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function reactivate(email: string) {
    try {
      await $fetch(`${api}/users/reactivation`, {
        method: "POST",
        body: { email },
      });
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function resetPassword(password: string, tokenpwd: string) {
    try {
      const data: LoginResponse = await $fetch(`${api}/users/pwdreset`, {
        method: "PUT",
        body: { password, token: tokenpwd },
      });
      token.value = data.accessToken;
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function getDetails() {
    if (!token.value) {
      return;
    }
    try {
      const data: GetUserResponse = await $fetch(`${api}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      me.value = data;
      return 200;
    } catch (error) {
      return parseError(error).statusCode;
    }
  }

  async function getSettings<T extends object>(
    page: string
  ): Promise<T | null> {
    if (token.value === "") {
      return getSettingsFromLocalStorage<T>(page);
    }
    try {
      const data: { page: string; object: T } = await $fetch(
        `${api}/page-settings/${page}`,
        {
          method: "GET",
        }
      );
      if (!data?.object) {
        return getSettingsFromLocalStorage<T>(page);
      }
      return data.object as T;
    } catch (error) {
      return null;
    }
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
    const data: T = await $fetch(`${api}/page-settings/${page}`, {
      method: "POST",
      body: settings as Record<string, any>,
    });
    if (!data) {
      return false;
    }
    return data as T;
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
    settings,
    language,
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
