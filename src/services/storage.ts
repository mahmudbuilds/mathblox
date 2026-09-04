import type { UserProfile, Pet, HatGear, Achievement, TableProgress } from '../types';

const STORAGE_KEY = 'mathblox_user_profile_v1';

export const PET_CATALOG: Pet[] = [
  // Common
  {
    id: 'starter-doge',
    name: 'Blox Doge',
    rarity: 'common',
    icon: '🐶',
    color: 'bg-amber-400',
    coinMultiplier: 1.1,
    description: '+10% Bonus Blox Bux on correct answers!',
  },
  {
    id: 'pixel-cat',
    name: 'Pixel Kitty',
    rarity: 'common',
    icon: '🐱',
    color: 'bg-orange-300',
    coinMultiplier: 1.15,
    description: '+15% Bonus Blox Bux!',
  },
  {
    id: 'chunky-piggy',
    name: 'Blocky Piggy',
    rarity: 'common',
    icon: '🐷',
    color: 'bg-pink-300',
    coinMultiplier: 1.1,
    description: '+10% Bonus Blox Bux!',
  },
  // Rare
  {
    id: 'cyber-bunny',
    name: 'Neon Bunny',
    rarity: 'rare',
    icon: '🐰',
    color: 'bg-cyan-400',
    coinMultiplier: 1.3,
    description: '+30% Bonus Blox Bux!',
  },
  {
    id: 'speedy-cheetah',
    name: 'Robo Cheetah',
    rarity: 'rare',
    icon: '🐆',
    color: 'bg-yellow-400',
    coinMultiplier: 1.35,
    description: '+35% Bonus Blox Bux!',
  },
  {
    id: 'panda-monk',
    name: 'Panda Sensei',
    rarity: 'rare',
    icon: '🐼',
    color: 'bg-slate-300',
    coinMultiplier: 1.4,
    description: '+40% Bonus Blox Bux!',
  },
  // Epic
  {
    id: 'golden-lion',
    name: 'Golden Lion',
    rarity: 'epic',
    icon: '🦁',
    color: 'bg-yellow-500',
    coinMultiplier: 1.6,
    description: '+60% Bonus Blox Bux!',
  },
  {
    id: 'cyber-dragon',
    name: 'Mecha Dragon',
    rarity: 'epic',
    icon: '🐲',
    color: 'bg-emerald-400',
    coinMultiplier: 1.75,
    description: '+75% Bonus Blox Bux!',
  },
  // Mythic
  {
    id: 'rainbow-unicorn',
    name: 'Cosmic Unicorn',
    rarity: 'mythic',
    icon: '🦄',
    color: 'bg-fuchsia-400',
    coinMultiplier: 2.0,
    description: 'DOUBLE Blox Bux (2.0x Multiplier)!',
  },
  {
    id: 'phoenix-fire',
    name: 'Sun Phoenix',
    rarity: 'mythic',
    icon: '🦅',
    color: 'bg-rose-500',
    coinMultiplier: 2.2,
    description: '+120% Mega Coin Boost (2.2x)!',
  },
];

export const HAT_CATALOG: HatGear[] = [
  { id: 'none', name: 'No Hat', icon: '👤', type: 'hat', price: 0, color: 'transparent', unlocked: true },
  { id: 'propeller', name: 'Propeller Cap', icon: '🧢', type: 'hat', price: 60, color: 'bg-red-500', unlocked: false },
  { id: 'ninja', name: 'Ninja Headband', icon: '🥷', type: 'hat', price: 100, color: 'bg-zinc-800', unlocked: false },
  { id: 'crown', name: 'King Crown', icon: '👑', type: 'hat', price: 200, color: 'bg-amber-400', unlocked: false },
  { id: 'cowboy', name: 'Sheriff Hat', icon: '🤠', type: 'hat', price: 120, color: 'bg-amber-800', unlocked: false },
  { id: 'shades', name: 'Cool Shades', icon: '🕶️', type: 'face', price: 80, color: 'bg-blue-600', unlocked: false },
  { id: 'gamer-headset', name: 'Gamer Headset', icon: '🎧', type: 'hat', price: 150, color: 'bg-purple-600', unlocked: false },
  { id: 'party-hat', name: 'Party Cone', icon: '🎉', type: 'hat', price: 90, color: 'bg-pink-500', unlocked: false },
  { id: 'dominus', name: 'Blox Dominus Hood', icon: '🔮', type: 'hat', price: 500, color: 'bg-violet-900', unlocked: false },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_solve', title: 'First Math Blox', description: 'Solve your very first multiplication problem!', icon: '⭐', unlocked: false, rewardCoins: 20 },
  { id: 'streak_5', title: 'On Fire!', description: 'Reach a streak of 5 correct answers in a row', icon: '🔥', unlocked: false, rewardCoins: 30 },
  { id: 'streak_10', title: 'Unstoppable!', description: 'Reach an epic streak of 10 in a row', icon: '⚡', unlocked: false, rewardCoins: 60 },
  { id: 'table_master', title: 'Table Master', description: 'Earn 3 stars on any multiplication table', icon: '🏅', unlocked: false, rewardCoins: 50 },
  { id: 'all_tables_touched', title: 'All Explorer', description: 'Practice every table from 1 to 12 at least once', icon: '🗺️', unlocked: false, rewardCoins: 100 },
  { id: 'obby_hero', title: 'Obby Champion', description: 'Reach the finish line of the Obby without falling!', icon: '🏆', unlocked: false, rewardCoins: 80 },
  { id: 'boss_slayer', title: 'Glitch Crusher', description: 'Defeat the Boss Monster in a battle!', icon: '👾', unlocked: false, rewardCoins: 100 },
  { id: 'egg_hatcher', title: 'Pet Breeder', description: 'Hatch your first egg from the Pet Shop!', icon: '🥚', unlocked: false, rewardCoins: 40 },
  { id: 'level_5', title: 'Rising Legend', description: 'Reach Level 5 Bloxer!', icon: '🚀', unlocked: false, rewardCoins: 100 },
  { id: 'course_master', title: 'Blox Academy Graduate', description: 'Complete all 12 tables in the step-by-step Course!', icon: '🎓', unlocked: false, rewardCoins: 150 },
];

export function getInitialTables(): Record<number, TableProgress> {
  const tables: Record<number, TableProgress> = {};
  for (let i = 1; i <= 12; i++) {
    tables[i] = {
      tableNumber: i,
      stars: 0,
      bestStreak: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      mastered: false,
    };
  }
  return tables;
}

export const DEFAULT_PROFILE: UserProfile = {
  username: 'SuperBloxer',
  bloxBux: 120,
  totalCoinsEarned: 120,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  bestStreakAllTime: 0,
  avatar: {
    skinColor: '#FEE12B',
    shirtColor: '#00A2FF',
    pantsColor: '#27AE60',
    equippedHatId: 'none',
    faceExpression: 'happy',
  },
  equippedPetId: 'starter-doge',
  inventoryPets: [PET_CATALOG[0]],
  inventoryHats: ['none'],
  tablesProgress: getInitialTables(),
  courseCompletedTables: [],
  achievements: INITIAL_ACHIEVEMENTS,
  soundEnabled: true,
  inputMode: 'multiple-choice',
};

class StorageService {
  public load(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_PROFILE;
      const parsed = JSON.parse(data);
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        avatar: { ...DEFAULT_PROFILE.avatar, ...(parsed.avatar || {}) },
        tablesProgress: { ...DEFAULT_PROFILE.tablesProgress, ...(parsed.tablesProgress || {}) },
        courseCompletedTables: parsed.courseCompletedTables || [],
        achievements: DEFAULT_PROFILE.achievements.map((defAch) => {
          const found = parsed.achievements?.find((a: Achievement) => a.id === defAch.id);
          return found || defAch;
        }),
      };
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  public save(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  public reset(): UserProfile {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  }
}

export const storageService = new StorageService();
