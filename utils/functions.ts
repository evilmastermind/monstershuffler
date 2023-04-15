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
