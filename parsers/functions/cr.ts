import { createStats } from "../character";
import type { Character } from "@/types";

export function raiseCR(character: Character) {
  character.variations!.currentCR!++;
  adjustLevel(character);
  if (character.variations!.currentHD! <= character.statistics!.level) {
    character.variations!.currentHD!++;
  }
  if (character.variations!.currentHD! <= 0) {
    character.variations!.currentHD = 1;
  }
  createStats(character);
}

export function lowerCR(character: Character) {
  if (character.variations!.currentHD! <= 1) {
    return;
  }
  character.variations!.currentCR!--;
  if (character.variations!.currentCR! < -3) {
    character.variations!.currentCR = -3;
  }

  adjustLevel(character);
  if (character.variations!.currentHD! >= character.statistics!.level) {
    character.variations!.currentHD!--;
  }
  if (character.variations!.currentHD! <= 0) {
    character.variations!.currentHD = 1;
  }
  createStats(character);
}

export function adjustLevel(character: Character) {
  if (character?.character?.CRCalculation?.name === "automatic") {
    return;
  }
  const CR = character.variations!.currentCR!;
  if (character?.character?.CRCalculation?.name === "twopoints") {
    const x1 = parseFloat(character.character?.CRCalculation?.x1);
    const y1 = parseFloat(character.character?.CRCalculation?.y1);
    const x2 = parseFloat(character.character?.CRCalculation?.x2);
    const y2 = parseFloat(character.character?.CRCalculation?.y2);

    character.variations!.currentHD = Math.round(
      ((CR - y1) * (x2 - x1)) / (y2 - y1) + x1
    );
  }
  if (character?.character?.CRCalculation?.name === "npcstandard") {
    if (CR === -3) character.variations!.currentHD = 1;
    else if (CR === -2) character.variations!.currentHD = 1;
    else if (CR === -1) character.variations!.currentHD = 1;
    else if (CR === 0) character.variations!.currentHD = 2;
    else if (CR === 1) character.variations!.currentHD = 3;
    else character.variations!.currentHD = Math.ceil((CR / 3) * 5);
  }
}
