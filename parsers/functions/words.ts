export function getFirstWord(str: string, apostrophe = false) {
  const match = apostrophe
    ? str.match(/^\s*\b([\w']+)\b/)
    : str.match(/^\s*\b(\w+)\b/);
  return match ? match[1] : "";
}

// This was "inspired by" (copied from)
// https://github.com/tandrewnichols/conjugate by Andrew Nichols
export function thirdToFirstPerson(verb: string) {
  const patterns = [
    {
      pattern: /^is$/,
      process: (_: string) => "are",
    },
    {
      pattern: /^has$/,
      process: (_: string) => "have",
    },
    {
      pattern: /^(can|could|should|may)$/,
      process: (verb: string) => verb,
    },
    {
      pattern: /(oes|sses|shes|ches|zes|jes|xes)$/,
      process: (verb: string) => {
        return verb.slice(0, -2);
      },
    },
    {
      pattern: /^ies$/,
      process: (verb: string) => {
        return verb.slice(0, -3) + "y";
      },
    },
    {
      pattern: /s$/,
      process: (verb: string) => {
        return verb.slice(0, -1);
      },
    },
  ];

  for (const { pattern, process } of patterns) {
    if (pattern.test(verb)) {
      return process(verb);
    }
  }
  return verb;
}
