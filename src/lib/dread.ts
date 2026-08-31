export type ReceiptRow = {
  label: string;
  value: string;
  tone?: "demean";
};

export type DreadReport = {
  age: number;
  caseId: string;
  mainCharacter: number;
  universeCareIndex: number;
  coffeeIndifference: number;
  remainingSunsets: number;
  significanceDust: number;
  npcScore: number;
  verdict: string;
  omens: string[];
  receipt: ReceiptRow[];
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

const timelineImpactPool = [
  "none detected",
  "statistically zero",
  "negative, somehow",
];

const cosmicRolePool = [
  "background extra",
  "set dressing",
  "crowd blur",
  "uncredited cameo",
];

const whoCaresPool = [
  "not the universe",
  "nobody. next question.",
  "see: nobody",
];

const significanceStatusPool = [
  "you are nothing",
  "none detected",
  "cosmically irrelevant",
  "void-adjacent",
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

  const npcScore = clamp(71 + rand() * 28.9, 71, 99.9);

  const rememberedIn100Years = Math.floor(rand() * 3);

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

  const receipt: ReceiptRow[] = [
    {
      label: "Estimated remaining sunsets",
      value: remainingSunsets.toLocaleString(),
    },
    {
      label: "People who will remember you in 100 years",
      value: rememberedIn100Years === 0 ? "nobody" : String(rememberedIn100Years),
      tone: "demean",
    },
    {
      label: "Times the universe thought about you today",
      value: "0",
      tone: "demean",
    },
    {
      label: "Cosmic search results for your name",
      value: "0 results (did you mean: nobody?)",
      tone: "demean",
    },
    {
      label: "NPC detection score",
      value: `${npcScore.toFixed(1)}%`,
    },
    {
      label: "Plotlines involving you",
      value: "0",
      tone: "demean",
    },
    {
      label: "Impact on the timeline",
      value: pick(timelineImpactPool, rand, 1)[0],
      tone: "demean",
    },
    {
      label: "Your cosmic role",
      value: pick(cosmicRolePool, rand, 1)[0],
      tone: "demean",
    },
    {
      label: "Share of cosmic significance allocated to you",
      value: `${significanceDust.toExponential(3)}%`,
    },
    {
      label: "Probability the void noticed you",
      value: `${(100 - mainCharacter).toFixed(2)}%`,
    },
    {
      label: "Universe response time to your manifestations",
      value: "∞ business days",
    },
    {
      label: "Who cares?",
      value: pick(whoCaresPool, rand, 1)[0],
      tone: "demean",
    },
    {
      label: "Significance status",
      value: pick(significanceStatusPool, rand, 1)[0],
      tone: "demean",
    },
  ];

  return {
    age,
    caseId,
    mainCharacter,
    universeCareIndex,
    coffeeIndifference,
    remainingSunsets,
    significanceDust,
    npcScore,
    verdict,
    omens: pick(omensPool, rand, 3),
    receipt,
    generatedAt: new Date().toLocaleString(),
  };
}
