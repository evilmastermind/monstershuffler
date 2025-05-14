import { FetchError, type FetchResponse } from "ofetch";
import type { NuxtError } from "@/types/nuxt";

export async function wait(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export class ThrottledFunctionLock {
  private isLocked = false;
  private needsReRun = false;

  async run(fn: () => Promise<void>): Promise<void> {
    if (this.isLocked) {
      this.needsReRun = true;
      return;
    }

    this.isLocked = true;
    do {
      this.needsReRun = false; // Reset before running to capture any subsequent calls
      try {
        await fn();
      } finally {
        this.isLocked = false;
      }
    } while (this.needsReRun); // Re-run if flagged
  }
}

/** Handles multiple calls to the same function: only one is called after X seconds */
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

/** Handles multiple calls to the same function: one is called immmediately and others are called after X seconds */
export function throttle<T extends any[]>(
  cb: (...args: T) => void,
  delay = 1000,
) {
  let shouldWait = false;
  let waitingArgs: T | null;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      // eslint-disable-next-line n/no-callback-literal
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: T) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    // eslint-disable-next-line n/no-callback-literal
    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

export function deleteKeyIfEmpty(object: any, key: string): void {
  if (
    Object.hasOwn(object, key) &&
    (object[key] === undefined || object[key] === null)
  ) {
    delete object[key];
  }
}

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  error?: string;
  data?: T;
};

export function parseResponse<T>(
  response: FetchResponse<T>,
  error?: string,
): ApiResponse<T> {
  return {
    ok: response.ok,
    status: response.status,
    error: error,
    data: response._data,
  };
}

export function parseError<T>(error: unknown): ApiResponse<T> {
  if (error instanceof Error) {
    return {
      ok: false,
      status: error.message.includes("404") ? 404 : 503,
      error: error.message,
    };
  } else if (error instanceof FetchError) {
    return {
      ok: false,
      status: error.status || 503,
      error: error.message,
    };
  } else {
    return {
      ok: false,
      status: 503,
      error: "Unknown error",
    };
  }
}
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDecimal(
  min: number,
  max: number,
  distribution?: "beginning" | "middle" | "end",
): number {
  let randomValue = Math.random();

  switch (distribution) {
    case "beginning":
      randomValue = Math.sqrt(randomValue);
      break;
    case "middle":
      randomValue = Math.random() * Math.random();
      break;
    case "end":
      randomValue = 1 - Math.sqrt(1 - randomValue);
      break;
    default: // This covers the undefined case where we just want a uniform distribution
      break;
  }
  return randomValue * (max - min) + min;
}

/**
 * Rounds a number to 2 decimal places.
 */
export function round2Decimals(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Toggles an item in an array. If the item is not present, it will be added. If it is present, it will be removed.
 */
export function toggle<T>(array: T[], item: T): void {
  const index = array.indexOf(item);
  if (index === -1) {
    array.push(item); // Add the item if it's not present
  } else {
    array.splice(index, 1); // Remove the item if it's already in the array
  }
}

/**
 * Removes an item from an array.
 */
export function removeItem<T>(anArray: Array<T>, anItem: T) {
  const index = anArray.indexOf(anItem);
  if (index > -1) {
    anArray.splice(index, 1);
  }
  return anArray;
}
/**
 * Adds an item to an array if it is not already present.
 */
export function addUniqueItem<T>(anArray: Array<T>, anItem: T) {
  const index = anArray.indexOf(anItem);
  if (index === -1) {
    anArray.push(anItem);
  }
  return anArray;
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function isUserOnMobile(): boolean {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) && window.innerWidth < 768
  );
}
