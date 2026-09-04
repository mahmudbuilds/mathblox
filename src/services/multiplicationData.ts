// Multiplication tables 1 to 12 data, facts, memory tricks and question generator

export interface TableInfo {
  number: number;
  name: string;
  badgeName: string;
  themeColor: string;
  trick: string;
  rhyme?: string;
  skipCount: number[];
}

export const TABLE_METADATA: Record<number, TableInfo> = {
  1: {
    number: 1,
    name: "The Mirror Ones",
    badgeName: "Mirror Knight",
    themeColor: "from-blue-400 to-indigo-500",
    trick: "The Mirror Table! Anything times 1 stays exactly the same number! 1 × 7 is 7!",
    skipCount: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  2: {
    number: 2,
    name: "The Double Twos",
    badgeName: "Double Trouble",
    themeColor: "from-green-400 to-emerald-600",
    trick: "Doubles Trick! Just add the number to itself. 2 × 6 is 6 + 6 = 12!",
    skipCount: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
  },
  3: {
    number: 3,
    name: "The Tri-Force Threes",
    badgeName: "Triple Jumper",
    themeColor: "from-cyan-400 to-teal-500",
    trick: "Skip count by 3s: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36!",
    rhyme: "3 times 8 is 24, skate on through the schoolhouse door!",
    skipCount: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  },
  4: {
    number: 4,
    name: "Double-Double Fours",
    badgeName: "Speedy Four",
    themeColor: "from-amber-400 to-orange-500",
    trick: "Double-Double Trick! Double the number, then double it again! 4 × 7 -> double 7 is 14, double 14 is 28!",
    skipCount: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
  },
  5: {
    number: 5,
    name: "The High-Five Fives",
    badgeName: "High Five Hero",
    themeColor: "from-yellow-400 to-amber-500",
    trick: "Clock Trick! Every 5s answer ends in 5 or 0, just like counting minutes on a clock!",
    skipCount: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
  },
  6: {
    number: 6,
    name: "The Super Sixes",
    badgeName: "Sixer Ninja",
    themeColor: "from-rose-400 to-pink-600",
    trick: "Rhyme Trick for evens: 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48! They all rhyme!",
    rhyme: "6 times 8 went on a date, came back as 48!",
    skipCount: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72],
  },
  7: {
    number: 7,
    name: "The Lucky Sevens",
    badgeName: "Lucky Star",
    themeColor: "from-purple-400 to-violet-600",
    trick: "Count 5, 6, 7, 8! That means 56 = 7 × 8! Also 7 × 7 is 49 rovers in the sky!",
    rhyme: "5, 6, 7, 8: 56 is 7 times 8!",
    skipCount: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84],
  },
  8: {
    number: 8,
    name: "The Octo-Eights",
    badgeName: "Octo Champ",
    themeColor: "from-red-400 to-red-600",
    trick: "Triple-Double Trick! Double it three times! 8 × 5: 5 -> 10 -> 20 -> 40!",
    rhyme: "8 times 8 fell on the floor, picked it up it was 64!",
    skipCount: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96],
  },
  9: {
    number: 9,
    name: "The Neon Nines",
    badgeName: "Neon Wizard",
    themeColor: "from-fuchsia-400 to-pink-500",
    trick: "Nine Magic! The digits of every answer add up to 9! E.g., 9 × 4 = 36 (3 + 6 = 9)! The tens digit is always 1 less than the other number!",
    skipCount: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108],
  },
  10: {
    number: 10,
    name: "The Zero-Hero Tens",
    badgeName: "Zero Hero",
    themeColor: "from-sky-400 to-blue-600",
    trick: "Zero Hero Trick! Just paste a zero at the end of the number! 10 × 8 = 80!",
    skipCount: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
  11: {
    number: 11,
    name: "The Twin Elevens",
    badgeName: "Twin Titan",
    themeColor: "from-emerald-400 to-teal-600",
    trick: "Twin Digits! Up to 9, just write the digit twice! 11 × 3 = 33, 11 × 7 = 77!",
    skipCount: [11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132],
  },
  12: {
    number: 12,
    name: "The Dozen Twelves",
    badgeName: "Dozen Overlord",
    themeColor: "from-amber-400 to-yellow-600",
    trick: "10 + 2 Trick! Multiply by 10 first, then add 2 more groups! 12 × 5 = (10 × 5) + (2 × 5) = 50 + 10 = 60!",
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
