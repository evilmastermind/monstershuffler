import type {
  Credentials,
  RegistrationFields,
  LoginResponse,
  GetUserResponse,
  Answer,
  PostAnswerBody,
} from "@/types";
import { parseError } from "@/utils";

/// ////////////////////////////////////////////////

type GeneralSettings = {
  language: "en";
  stats: {
    lengthUnit: "feet" | "meters" | "squares";
    heightUnit: "feet" | "meters";
  };
  statBlocks: "5e" | "5.5e";
};

const defaultGeneralSettings: GeneralSettings = {
  language: "en",
  stats: {
    lengthUnit: "feet",
    heightUnit: "feet",
  },
  statBlocks: "5e",
};

export const useUserStore = defineStore("user", () => {
  const config = useRuntimeConfig();
  const api = config.public.apiUrl;

  const token = ref("");
  const sessionId = ref<string | undefined>();
  const me = ref<GetUserResponse | null>(null);
  // TODO: replace this with an actual ref, and a watcher that saves settings to the server
  const settings = ref<GeneralSettings>({ ...defaultGeneralSettings });
  const language = computed(() => me.value?.settings?.language || "en");

  const setSettingsThrottle = throttle(setSettings, 1000);

  async function login(credentials: Credentials) {
    try {
      const response = await $fetch.raw<LoginResponse>(`${api}/users/login`, {
        method: "POST",
        body: credentials,
      });
      if (response._data?.accessToken) {
        token.value = response._data?.accessToken;
      } else {
        throw new Error("No access token");
      }
      sessionId.value = undefined;
      return parseResponse<LoginResponse>(response);
    } catch (error) {
      return parseError<LoginResponse>(error);
    }
  }

  async function register(fields: RegistrationFields) {
    try {
      const response = await $fetch.raw(`${api}/users`, {
        method: "POST",
        body: fields,
      });
      return parseResponse(response);
    } catch (error) {
      return parseError(error);
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
      return parseError(error).status;
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
      return parseError(error).status;
    }
  }

  async function sResetPasswordBody(password: string, tokenpwd: string) {
    try {
      const data: LoginResponse = await $fetch(`${api}/users/pwdreset`, {
        method: "PUT",
        body: { password, token: tokenpwd },
      });
      token.value = data.accessToken;
      return 200;
    } catch (error) {
      return parseError(error).status;
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
      return parseError(error).status;
    }
  }

  async function getSettings<T extends object>(
    page: string,
  ): Promise<T | null> {
    if (token.value === "") {
      return getSettingsFromLocalStorage<T>(page);
    }
    try {
      const data: { page: string; object: T } = await $fetch(
        `${api}/page-settings/${page}`,
        {
          method: "GET",
        },
      );
      if (!data?.object) {
        return getSettingsFromLocalStorage<T>(page);
      }
      return data.object as T;
    } catch (_) {
      return null;
    }
  }

  function getSettingsFromLocalStorage<T extends object>(
    page: string,
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
    settings: T,
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
    settings: T,
  ): T | false {
    try {
      localStorage.setItem(`settings-${page}`, JSON.stringify(settings));
      return settings;
    } catch (e) {
      return false;
    }
  }

  function setSession() {
    if (token.value) {
      sessionId.value = undefined;
      return;
    }
    const sessionIdStorage = localStorage.getItem("sessionId");
    if (sessionIdStorage) {
      sessionId.value = sessionIdStorage;
    } else {
      sessionId.value = crypto
        .getRandomValues(new Uint8Array(16))
        .reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");
      localStorage.setItem("sessionId", sessionId.value);
    }
  }

  async function setFeedback(questionid: string, answer: Answer) {
    try {
      const body: PostAnswerBody = {
        questionid,
        answer,
        sessionid: sessionId.value,
        userid: me.value?.id,
      };
      await $fetch(`${api}/feedback/answers`, {
        method: "POST",
        body,
      });
      return 200;
    } catch (error) {
      return parseError(error).status;
    }
  }

  function logout() {
    token.value = "";
    me.value = null;
    localStorage.removeItem("token");
    setSession();
  }

  async function getGeneralSettings() {
    const retrievedSettings = await getSettings<GeneralSettings>("general");
    if (retrievedSettings) {
      settings.value = {
        ...defaultGeneralSettings,
        ...retrievedSettings,
      };
    }
  }

  watch(token, (newValue) => {
    if (newValue) {
      localStorage.setItem("token", newValue);
    }
  });

  watch(
    settings,
    (newValue) => {
      setSettingsThrottle("general", newValue);
    },
    { deep: true },
  );

  return {
    token,
    sessionId,
    me,
    settings,
    language,
    login,
    logout,
    register,
    reactivate,
    verifyEmail,
    sResetPasswordBody,
    getDetails,
    getSettings,
    setSettings,
    setSession,
    setFeedback,
    getGeneralSettings,
  };
});
