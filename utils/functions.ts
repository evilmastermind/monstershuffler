import { NuxtError } from "@/types/nuxt";

export function debounce(cb: Function, delay = 1000): Function {
  let timeout: NodeJS.Timeout;
  return (...args: string[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // eslint-disable-next-line n/no-callback-literal
      cb(...args);
    }, delay);
  };
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function hasDefined(object: any, key: string): boolean {
  return (
    Object.hasOwn(object, key) &&
    object[key] !== undefined &&
    object[key] !== null &&
    object[key] !== ""
  );
}
export function createKeyIfUndefined(object: any, key: string): void {
  if (!Object.hasOwn(object, key)) {
    object[key] = {};
  }
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

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
