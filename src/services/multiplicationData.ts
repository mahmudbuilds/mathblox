// Multiplication tables 1 to 12 data, facts, memory tricks and question generator

export interface TableInfo {
  number: number;
  name: string;
  badgeName: string;
  themeColor: string;
  blockColor: string;
  trick: string;
  cheatCodeTitle: string;
  cheatCodeExplanation: string;
  cheatCodeExample: string;
  hardFacts: { factor: number; product: number; hint: string }[];
  rhyme?: string;
  skipCount: number[];
}

export const TABLE_METADATA: Record<number, TableInfo> = {
  1: {
    number: 1,
    name: "The Mirror Ones",
    badgeName: "Mirror Knight",
    themeColor: "from-blue-400 to-indigo-500",
    blockColor: "bg-blue-500",
    trick: "The Mirror Table! Anything times 1 stays exactly the same number! 1 × 7 is 7!",
    cheatCodeTitle: "The Mirror Code 🪞",
    cheatCodeExplanation: "Whatever number looks into the 1s mirror sees itself staring back! The number NEVER changes.",
    cheatCodeExample: "1 × 9 = 9  |  1 × 12 = 12",
    hardFacts: [
      { factor: 11, product: 11, hint: "1 × 11 is just 11!" },
      { factor: 12, product: 12, hint: "1 × 12 is just 12!" },
      { factor: 9, product: 9, hint: "1 × 9 is just 9!" },
    ],
    skipCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  2: {
    number: 2,
    name: "The Double Twos",
    badgeName: "Double Trouble",
    themeColor: "from-green-400 to-emerald-600",
    blockColor: "bg-emerald-500",
    trick: "Doubles Trick! Just add the number to itself. 2 × 6 is 6 + 6 = 12!",
    cheatCodeTitle: "The Double Stamp 👥",
    cheatCodeExplanation: "Multiplying by 2 is identical to adding a number to itself. Just double it!",
    cheatCodeExample: "2 × 7 = 7 + 7 = 14  |  2 × 8 = 8 + 8 = 16",
    hardFacts: [
      { factor: 7, product: 14, hint: "7 + 7 = 14" },
      { factor: 8, product: 16, hint: "8 + 8 = 16" },
      { factor: 12, product: 24, hint: "12 + 12 = 24" },
    ],
    skipCount: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  },
  3: {
    number: 3,
    name: "The Tri-Force Threes",
    badgeName: "Triple Jumper",
    themeColor: "from-cyan-400 to-teal-500",
    blockColor: "bg-cyan-500",
    trick: "Double + 1 More Group! For 3 × 7: double 7 is 14, then add 7 more to get 21!",
    cheatCodeTitle: "Double + 1 More 🔺",
    cheatCodeExplanation: "Multiply by 2 first (double it), then add just ONE more of that number!",
    cheatCodeExample: "3 × 6 = (2 × 6) + 6 = 12 + 6 = 18",
    rhyme: "3 times 8 is 24, skate on through the schoolhouse door!",
    hardFacts: [
      { factor: 7, product: 21, hint: "Double 7 is 14, plus 7 is 21!" },
      { factor: 8, product: 24, hint: "3 × 8 = 24 (Skate on the floor!)" },
      { factor: 9, product: 27, hint: "3 × 9 = 27 (Double 9 is 18 + 9 = 27)" },
    ],
    skipCount: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  },
  4: {
    number: 4,
    name: "Double-Double Fours",
    badgeName: "Speedy Four",
    themeColor: "from-amber-400 to-orange-500",
    blockColor: "bg-amber-500",
    trick: "Double-Double Trick! Double the number, then double it again! 4 × 7 -> double 7 is 14, double 14 is 28!",
    cheatCodeTitle: "The Double-Double ⚡⚡",
    cheatCodeExplanation: "Double the number once, then double the result again! Two quick doubles = 4x!",
    cheatCodeExample: "4 × 6 -> 6 doubled is 12 -> 12 doubled is 24!",
    hardFacts: [
      { factor: 7, product: 28, hint: "7 -> 14 -> 28!" },
      { factor: 8, product: 32, hint: "8 -> 16 -> 32!" },
      { factor: 12, product: 48, hint: "12 -> 24 -> 48!" },
    ],
    skipCount: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
  },
  5: {
    number: 5,
    name: "The High-Five Fives",
    badgeName: "High Five Hero",
    themeColor: "from-yellow-400 to-amber-500",
    blockColor: "bg-yellow-500",
    trick: "Clock Trick! Every 5s answer ends in 5 or 0, just like counting minutes on a clock!",
    cheatCodeTitle: "The Clock Minutes ⏰",
    cheatCodeExplanation: "Look at a clock: 5 on the clock is 25 minutes! Even numbers end in 0, odd numbers end in 5!",
    cheatCodeExample: "5 × 6 = 30 (even ends in 0)  |  5 × 7 = 35 (odd ends in 5)",
    hardFacts: [
      { factor: 7, product: 35, hint: "Odd number: ends in 5 (35)!" },
      { factor: 9, product: 45, hint: "Quarter to the hour: 45 minutes!" },
      { factor: 12, product: 60, hint: "Full hour: 60 minutes!" },
    ],
    skipCount: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
  },
  6: {
    number: 6,
    name: "The Super Sixes",
    badgeName: "Sixer Ninja",
    themeColor: "from-rose-400 to-pink-600",
    blockColor: "bg-rose-500",
    trick: "Even Rhymes & 5s+1 Trick! 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48! They all rhyme with the factor!",
    cheatCodeTitle: "The Even Rhymes 🎶",
    cheatCodeExplanation: "When multiplying 6 by an even number, the answer always ends in that same number and rhymes!",
    cheatCodeExample: "6 × 4 = 24  |  6 × 6 = 36  |  6 × 8 = 48",
    rhyme: "6 times 8 went on a date, came back as 48!",
    hardFacts: [
      { factor: 7, product: 42, hint: "6 × 7 = 42 (6 × 6 is 36 + 6 = 42!)" },
      { factor: 8, product: 48, hint: "6 × 8 = 48 (Went on a date!)" },
      { factor: 9, product: 54, hint: "6 × 9 = 54 (Digits 5 + 4 = 9!)" },
    ],
    skipCount: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72],
  },
  7: {
    number: 7,
    name: "The Lucky Sevens",
    badgeName: "Lucky Star",
    themeColor: "from-purple-400 to-violet-600",
    blockColor: "bg-purple-500",
    trick: "5, 6, 7, 8 Sequence! That spells 56 = 7 × 8! Also 7 × 7 = 49 players in the game!",
    cheatCodeTitle: "5, 6, 7, 8 Sequence 🚀",
    cheatCodeExplanation: "Just count in order: 5, 6, 7, 8! That means 56 = 7 × 8! Never forget the magic countdown.",
    cheatCodeExample: "5, 6, 7, 8  -->  56 = 7 × 8!",
    rhyme: "5, 6, 7, 8: 56 is 7 times 8!",
    hardFacts: [
      { factor: 6, product: 42, hint: "7 × 6 = 42" },
      { factor: 7, product: 49, hint: "7 × 7 = 49 (Football team in the sky!)" },
      { factor: 8, product: 56, hint: "5, 6, 7, 8! 56 is 7 × 8!" },
    ],
    skipCount: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84],
  },
  8: {
    number: 8,
    name: "The Octo-Eights",
    badgeName: "Octo Champ",
    themeColor: "from-red-400 to-red-600",
    blockColor: "bg-red-500",
    trick: "Triple-Double Trick! Double the number 3 times! (e.g. for 8 × 7: 7 -> 14 -> 28 -> 56!)",
    cheatCodeTitle: "The Triple-Double 🎪",
    cheatCodeExplanation: "Double the number three times in a row! 8 is 2 × 2 × 2, so three doubles gives the exact answer!",
    cheatCodeExample: "8 × 6 -> 6 doubled is 12 -> 24 -> 48!",
    rhyme: "8 times 8 fell on the floor, picked it up it was 64!",
    hardFacts: [
      { factor: 6, product: 48, hint: "8 × 6 = 48" },
      { factor: 7, product: 56, hint: "5, 6, 7, 8! 56 is 7 × 8!" },
      { factor: 8, product: 64, hint: "8 × 8 = 64 (Fell on the floor!)" },
    ],
    skipCount: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
  },
  9: {
    number: 9,
    name: "The Neon Nines",
    badgeName: "Neon Wizard",
    themeColor: "from-fuchsia-400 to-pink-500",
    blockColor: "bg-fuchsia-500",
    trick: "Nine Magic! Tens digit is 1 less than the factor, and the digits ALWAYS add up to 9!",
    cheatCodeTitle: "The Sums-to-9 Magic 🪄",
    cheatCodeExplanation: "Tens digit is 1 less than the number you multiply. The other digit makes it add to 9!",
    cheatCodeExample: "9 × 7 -> Tens is 7 - 1 = 6. 6 + 3 = 9 -> 63!",
    hardFacts: [
      { factor: 6, product: 54, hint: "Tens is 5, 5 + 4 = 9 -> 54!" },
      { factor: 7, product: 63, hint: "Tens is 6, 6 + 3 = 9 -> 63!" },
      { factor: 8, product: 72, hint: "Tens is 7, 7 + 2 = 9 -> 72!" },
    ],
    skipCount: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108],
  },
  10: {
    number: 10,
    name: "The Zero-Hero Tens",
    badgeName: "Zero Hero",
    themeColor: "from-sky-400 to-blue-600",
    blockColor: "bg-sky-500",
    trick: "Zero Hero Trick! Just paste a zero at the end of the number! 10 × 8 = 80!",
    cheatCodeTitle: "Paste a Zero 🦸",
    cheatCodeExplanation: "The easiest hack in mathematics! Take whatever number you multiply and stick a 0 on the end!",
    cheatCodeExample: "10 × 7 = 70  |  10 × 12 = 120",
    hardFacts: [
      { factor: 9, product: 90, hint: "Just put 0 on 9 -> 90!" },
      { factor: 11, product: 110, hint: "Put 0 on 11 -> 110!" },
      { factor: 12, product: 120, hint: "Put 0 on 12 -> 120!" },
    ],
    skipCount: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
  11: {
    number: 11,
    name: "The Twin Elevens",
    badgeName: "Twin Titan",
    themeColor: "from-emerald-400 to-teal-600",
    blockColor: "bg-teal-500",
    trick: "Twin Digits! Up to 9, just write the digit twice! 11 × 3 = 33, 11 × 7 = 77!",
    cheatCodeTitle: "The Twin Clone 👯",
    cheatCodeExplanation: "From 1 to 9, just clone the number side-by-side! For 11×11: 121, for 11×12: 132.",
    cheatCodeExample: "11 × 4 = 44  |  11 × 8 = 88",
    hardFacts: [
      { factor: 9, product: 99, hint: "Twin 9s -> 99!" },
      { factor: 11, product: 121, hint: "11 × 11 = 121 (Split and sum: 1[1+1]1)" },
      { factor: 12, product: 132, hint: "11 × 12 = 132 (Split and sum: 1[1+2]2)" },
    ],
    skipCount: [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132],
  },
  12: {
    number: 12,
    name: "The Dozen Twelves",
    badgeName: "Dozen Overlord",
    themeColor: "from-amber-400 to-yellow-600",
    blockColor: "bg-amber-400",
    trick: "10 + 2 Split! Multiply by 10 first, then add 2 more groups! 12 × 5 = (10 × 5) + (2 × 5) = 50 + 10 = 60!",
    cheatCodeTitle: "The 10 + 2 Split 📦",
    cheatCodeExplanation: "Break 12 into 10 + 2! Multiply by 10 (paste a zero), double the number, then add them together!",
    cheatCodeExample: "12 × 6 = (10 × 6) + (2 × 6) = 60 + 12 = 72!",
    hardFacts: [
      { factor: 7, product: 84, hint: "70 + 14 = 84!" },
      { factor: 8, product: 96, hint: "80 + 16 = 96!" },
      { factor: 12, product: 144, hint: "12 × 12 = 144 (The Ultimate Grand Square!)" },
    ],
    skipCount: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144],
  },
};

// Generate realistic multiple choice options (distractors)
export function generateDistractors(correctAnswer: number, factor1: number, factor2: number): number[] {
  const optionsSet = new Set<number>();
  optionsSet.add(correctAnswer);

  const potentialDistractors: number[] = [
    correctAnswer + factor1, // off by +1 group
    correctAnswer - factor1, // off by -1 group
    correctAnswer + factor2,
    correctAnswer - factor2,
    correctAnswer + 10,
    correctAnswer - 10,
    correctAnswer + 2,
    correctAnswer - 2,
    (factor1 + 1) * factor2,
    factor1 * (factor2 + 1),
  ];

  // Filter out non-positive numbers and duplicate
  const validDistractors = potentialDistractors.filter(n => n > 0 && n !== correctAnswer);
  
  // Shuffle valid distractors
  const shuffled = validDistractors.sort(() => Math.random() - 0.5);

  for (const d of shuffled) {
    if (optionsSet.size < 4) {
      optionsSet.add(d);
    }
  }

  // If still need options, add random nearby offsets
  let offset = 1;
  while (optionsSet.size < 4) {
    const candidate = correctAnswer + (offset % 2 === 0 ? offset : -offset);
    if (candidate > 0) {
      optionsSet.add(candidate);
    }
    offset++;
  }

  // Shuffle the final 4 options so correct isn't in fixed position
  return Array.from(optionsSet).sort(() => Math.random() - 0.5);
}

// Generate question for a specific table or mixed
export function generateQuestion(tableNumber?: number): {
  id: string;
  factor1: number;
  factor2: number;
  correctAnswer: number;
  options: number[];
  hint: string;
  rhyme?: string;
} {
  const factor1 = tableNumber || Math.floor(Math.random() * 12) + 1;
  const factor2 = Math.floor(Math.random() * 12) + 1;
  const correctAnswer = factor1 * factor2;
  const options = generateDistractors(correctAnswer, factor1, factor2);
  const meta = TABLE_METADATA[factor1];

  return {
    id: `${factor1}x${factor2}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    factor1,
    factor2,
    correctAnswer,
    options,
    hint: meta?.trick || `Add ${factor1} together ${factor2} times!`,
    rhyme: meta?.rhyme,
  };
}
