export type Point = {
  x: number;
  y: number;
};

export type UIColors = "primary" | "complementary" | "light" | "dark" | "patreon" | "";

export type ImageRules = {
  height: "full" | "manual";
  width: "full" | "manual";
  mask: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
};
