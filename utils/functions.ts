import type { NuxtError } from "@/types/nuxt";

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

export function throttle<T extends any[]>(
  cb: (...args: T) => void,
  delay = 1000
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

export function randomDecimal(
  min: number,
  max: number,
  distribution?: "beginning" | "middle" | "end"
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
