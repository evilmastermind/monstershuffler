export type Point = {
  x: number;
  y: number;
};

export type UIColors = "primary" | "complementary" | "light" | "dark" | "patreon" | "";

export type ImageRules = {
  width: "full" | "manual";
  height: "full" | "manual";
  maxWidth?: number;
  mask: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
};
