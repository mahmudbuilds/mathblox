export type Difficulty = 'easy' | 'medium' | 'hard';

export interface MultiplicationFact {
  factor1: number;
  factor2: number;
  product: number;
  hint?: string;
  rhyme?: string;
}

export interface Question {
  id: string;
  factor1: number;
  factor2: number;
  correctAnswer: number;
  options: number[];
  hint: string;
  rhyme?: string;
}

export interface TableProgress {
  tableNumber: number; // 1 to 12
  stars: number; // 0 to 3
  bestStreak: number;
  totalAnswered: number;
  totalCorrect: number;
  mastered: boolean;
}

export type PetRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface Pet {
  id: string;
  name: string;
  rarity: PetRarity;
  icon: string;
  color: string;
  coinMultiplier: number;
  description: string;
  hatchedAt?: string;
}

export interface HatGear {
  id: string;
  name: string;
  icon: string;
  type: 'hat' | 'face' | 'shirt';
  price: number;
  color: string;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rewardCoins: number;
}

export interface UserProfile {
  username: string;
  bloxBux: number;
  totalCoinsEarned: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  bestStreakAllTime: number;
  avatar: {
    skinColor: string;
    shirtColor: string;
    pantsColor: string;
    equippedHatId: string;
    faceExpression: 'happy' | 'cool' | 'wink' | 'star-eyes' | 'silly';
  };
  equippedPetId: string | null;
  inventoryPets: Pet[];
  inventoryHats: string[];
  tablesProgress: Record<number, TableProgress>;
  courseCompletedTables: number[]; // Table numbers completed in Academy Course
  achievements: Achievement[];
  soundEnabled: boolean;
  inputMode: 'multiple-choice' | 'keypad';
}

export type GameView = 
  | 'home'
  | 'course'
  | 'study-grid'
  | 'practice'
  | 'obby'
  | 'boss'
  | 'shop'
  | 'achievements';
