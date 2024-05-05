import type { Character } from "@/types";

export function getTemporaryImage(character: Character) {
  return {
    url: "palace",
    artist: "",
    artistUrl: "",
    elementHeightPx: 470,
    backgroundHeightPerc: 100,
    backgroundPositionLeftPx: 0,
    backgroundPositionTopPx: 100,
    mask: "",
    token: {
      topPx: 0,
      leftPx: 0,
      widthPx: 0,
    },
  };
}
