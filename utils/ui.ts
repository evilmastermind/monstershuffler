export function scrollIntoView(
  element?: Element | HTMLElement | null,
  options?: ScrollIntoViewOptions & { scrollIfInView?: boolean }
): void {
  if (!element) {
    return;
  }
  const rect = element.getBoundingClientRect();
  if (
    rect.top < 0 ||
    rect.top > window.innerHeight ||
    options?.scrollIfInView
  ) {
    element.scrollIntoView(options);
  }
}

export function getHealthBarCss(
  currentHealth: number,
  totalHealth: number,
  currentThemeType: "light" | "dark" = "light"
) {
  let healthPercentage = currentHealth / totalHealth;
  // Ensure health percentage is between 0 and 1
  healthPercentage = Math.min(1, Math.max(0, healthPercentage));

  // Define HSL colors
  const darkGreen = { h: 120, s: 80, l: 21 }; // Dark green
  const darkRed = { h: 0, s: 90, l: 35 }; // Light red
  const lightGreen = { h: 120, s: 75, l: 66 }; // Light green
  const lightRed = { h: 0, s: 100, l: 56 }; // Dark red

  // Determine base colors based on mode
  const startColor = currentThemeType === "light" ? lightRed : darkRed;
  const endColor = currentThemeType === "light" ? lightGreen : darkGreen;

  // Interpolate HSL values
  const interpolate = (start: number, end: number, percentage: number) =>
    Math.ceil(start + (end - start) * percentage);

  const h = interpolate(startColor.h, endColor.h, healthPercentage);
  const s = interpolate(startColor.s, endColor.s, healthPercentage);
  const l = interpolate(startColor.l, endColor.l, healthPercentage);

  // Convert HSL to a CSS string
  const color = `hsl(${h}, ${s}%, ${l}%)`;

  const healthWidth = `${Math.ceil(healthPercentage * 100)}%`;

  return { width: healthWidth, backgroundColor: color };
}
