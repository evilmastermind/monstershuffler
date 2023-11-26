import {
  getStatArrayFromObjects,
  getCurrentStatLimit,
} from "@/parsers/functions";
import { Character, Stat } from "@/types";

export function calculateDamageVulnerabilities(character: Character) {
  const s = character.statistics!;

  const vulnerabilities = getStatArrayFromObjects<Stat[]>(
    character,
    "vulnerabilities"
  );
  s.vulnerabilities = [];

  const limit = getCurrentStatLimit(character);

  for (let i = 0; i < vulnerabilities.length; i++) {
    for (let j = 0; j < vulnerabilities[i].length; j++) {
      if (!limit || limit >= (vulnerabilities[i][j].availableAt || 0)) {
        const vulnerability = vulnerabilities[i][j].value;
        s.vulnerabilities.push({
          string: vulnerability,
          type: "vulnerability",
        });
      }
    }
  }
}
