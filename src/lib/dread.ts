export type DreadReport = {
  age: number;
  caseId: string;
  mainCharacter: number;
  universeCareIndex: number;
  coffeeIndifference: number;
  remainingSunsets: number;
  significanceDust: number;
  verdict: string;
  omens: string[];
  generatedAt: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number, count: number): T[] {
  const copy = [...arr];
  const out: T[] = [];

  while (out.length < count && copy.length) {
    const index = Math.floor(rand() * copy.length);
    out.push(copy.splice(index, 1)[0]);
  }

  return out;
}

const omensPool = [
  "A houseplant near you is quietly judging your life choices.",
  "Your childhood bedroom has already forgotten your posters.",
  "The algorithm will not save you.",
  "Somewhere, a barista will misspell your name and the universe will not intervene.",
  "Your screen time report has been classified as speculative fiction.",
  "A pigeon just looked at you and felt nothing.",
  "The moon has seen better protagonists.",
  "Your search history suggests ambition, but the stars remain unconvinced.",
  "An old charger in a drawer still believes in you. That is it.",
  "Your horoscope was written by a tired intern named Kyle.",
];

export function generateDread(age: number): DreadReport {
  const rand = mulberry32(Math.floor(age * 1337.42 + 7));

  const mainCharacter = clamp(
    94 - age * 0.66 + Math.sin(age / 4.2) * 17 + rand() * 12,
    0.3,
    99.6
  );

  const universeCareIndex = clamp(
    100 - mainCharacter * 0.92 + rand() * 8,
    0.0004,
    100
  );

  const coffeeIndifference = clamp(
    99.99998 - rand() * 0.00003,
    99.99901,
    99.999999
  );

  const remainingSunsets = Math.max(
    0,
    Math.round((83.2 - age) * 365.25 * (0.82 + rand() * 0.3))
  );

  const significanceDust = Math.max(0.00004, rand() * 0.018);

  const caseId = `COS-${age.toString().padStart(2, "0")}-${Math.floor(rand() * 9999)
    .toString()
    .padStart(4, "0")}`;

  let verdict = "";

  if (mainCharacter > 82) {
    verdict =
      "Applicant still believes they are the protagonist. Recommend letting them enjoy it while it lasts.";
  } else if (mainCharacter > 58) {
    verdict =
      "Applicant is probably a side character with occasional plot relevance.";
  } else if (mainCharacter > 32) {
    verdict =
      "Applicant appears to be background atmosphere in somebody else’s flashback.";
  } else {
    verdict =
      "Applicant has achieved a rare level of cosmic irrelevance. The void sends its regards.";
  }

  return {
    age,
    caseId,
    mainCharacter,
    universeCareIndex,
    coffeeIndifference,
    remainingSunsets,
    significanceDust,
    verdict,
    omens: pick(omensPool, rand, 3),
    generatedAt: new Date().toLocaleString(),
  };
}
