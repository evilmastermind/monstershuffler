import { NuxtError } from "@/types/nuxt";

export function debounce(cb: Function, delay = 1000): Function {
  let timeout: NodeJS.Timeout;
  return (...args: string[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function handleResponse<T>(
  data: T,
  error: NuxtError | null,
  status: number
) {
  if (error) {
    return {
      data: null,
      status: error.statusCode,
    };
  } else {
    return {
      data,
      status,
    };
  }
}
