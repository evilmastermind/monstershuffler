export type Point = {
  x: number;
  y: number;
};

export type UIColors = "monstershuffler" | "primary" | "complementary" | "light" | "dark" | "patreon" | "success" | "warning" | "danger" | "";

export type ImageRules = {
  width: "full" | "manual";
  height: "full" | "manual";
  maxWidth?: number;
  mask: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export type MonsterExport = {
  type: "VTT Foundry" | "Improved Initiative" | "GM Binder" | "Homebrewery V3" | "HTML" | "markdown" | "Roleplay Stats" | "Monstershuffler";
  content: string;
  isModalOpen?: boolean;
};

export type Alert = "info" | "success" | "warning" | "danger";
export type AlertMessage = {
  message: string;
  type: Alert;
};
