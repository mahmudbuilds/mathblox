import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { UserProfile, GameView, Pet, HatGear, Achievement, TableProgress } from './types';
import { storageService, PET_CATALOG } from './services/storage';
import { soundService } from './services/sound';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeLobby } from './components/HomeLobby';
import { CourseMode } from './components/CourseMode';
import { StudyGrid } from './components/StudyGrid';
import { PracticeMode } from './components/PracticeMode';
import { ObbyMode } from './components/ObbyMode';
import { BossBattle } from './components/BossBattle';
import { PetShop } from './components/PetShop';
import { AchievementsModal } from './components/AchievementsModal';
import { AvatarCustomizerModal } from './components/AvatarCustomizerModal';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => storageService.load());
  const [currentView, setCurrentView] = useState<GameView>('home');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState<boolean>(false);

  // Sync sound setting on load
  useEffect(() => {
    soundService.setEnabled(profile.soundEnabled);
  }, [profile.soundEnabled]);

  // Helper to persist state
  const updateAndSaveProfile = (updater: (prev: UserProfile) => UserProfile) => {
    setProfile((prev) => {
      const next = updater(prev);
      storageService.save(next);
      return next;
    });
  };

  // Sound Toggle
  const handleToggleSound = () => {
    updateAndSaveProfile((prev) => {
      const nextEnabled = !prev.soundEnabled;
      soundService.setEnabled(nextEnabled);
      return { ...prev, soundEnabled: nextEnabled };
    });
  };

  // Check achievements helper
  const evaluateAchievements = (p: UserProfile): Achievement[] => {
    return p.achievements.map((ach) => {
      if (ach.unlocked) return ach;
      let shouldUnlock = false;

      if (ach.id === 'first_solve' && p.totalCoinsEarned > 120) shouldUnlock = true;
      if (ach.id === 'streak_5' && p.bestStreakAllTime >= 5) shouldUnlock = true;
      if (ach.id === 'streak_10' && p.bestStreakAllTime >= 10) shouldUnlock = true;
      if (ach.id === 'table_master') {
        const has3Stars = Object.values(p.tablesProgress).some((t) => t.stars >= 3);
        if (has3Stars) shouldUnlock = true;
      }
      if (ach.id === 'all_tables_touched') {
        const allTouched = Object.values(p.tablesProgress).every((t) => t.totalAnswered > 0);
        if (allTouched) shouldUnlock = true;
      }
      if (ach.id === 'level_5' && p.level >= 5) shouldUnlock = true;
      if (ach.id === 'course_master' && p.courseCompletedTables.length >= 12) shouldUnlock = true;

      if (shouldUnlock) {
        soundService.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.3 },
        });
        return {
          ...ach,
          unlocked: true,
          unlockedAt: new Date().toISOString(),
        };
      }
      return ach;
    });
  };

  // Handle Course Table Completed
  const handleCompleteCourseTable = (tableNum: number, coinsEarned: number) => {
    updateAndSaveProfile((prev) => {
      const alreadyIn = prev.courseCompletedTables.includes(tableNum);
      const updatedTables = alreadyIn
        ? prev.courseCompletedTables
        : [...prev.courseCompletedTables, tableNum];

      const updatedProfile: UserProfile = {
        ...prev,
        bloxBux: prev.bloxBux + coinsEarned,
        totalCoinsEarned: prev.totalCoinsEarned + coinsEarned,
        courseCompletedTables: updatedTables,
      };

      updatedProfile.achievements = evaluateAchievements(updatedProfile);
      return updatedProfile;
    });
  };

  // Handle scoring during practice
  const handleUpdateScore = (
    tableNum: number,
    correct: boolean,
    streak: number,
    coinsEarned: number,
    xpEarned: number
  ) => {
    updateAndSaveProfile((prev) => {
      let newXp = prev.xp + xpEarned;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;

      if (newXp >= newXpToNext) {
        newLevel += 1;
        newXp = newXp - newXpToNext;
        newXpToNext = Math.round(newXpToNext * 1.3);
        soundService.playFanfare();
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.4 },
        });
      }

      const currentTable = prev.tablesProgress[tableNum] || {
        tableNumber: tableNum,
        stars: 0,
        bestStreak: 0,
        totalAnswered: 0,
        totalCorrect: 0,
        mastered: false,
      };

      const updatedTable: TableProgress = {
        ...currentTable,
        totalAnswered: currentTable.totalAnswered + 1,
        totalCorrect: currentTable.totalCorrect + (correct ? 1 : 0),
        bestStreak: Math.max(currentTable.bestStreak, streak),
      };

      const updatedProfile: UserProfile = {
        ...prev,
        bloxBux: prev.bloxBux + coinsEarned,
        totalCoinsEarned: prev.totalCoinsEarned + coinsEarned,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNext,
        streak: streak,
        bestStreakAllTime: Math.max(prev.bestStreakAllTime, streak),
        tablesProgress: {
          ...prev.tablesProgress,
          [tableNum]: updatedTable,
        },
      };

      updatedProfile.achievements = evaluateAchievements(updatedProfile);
      return updatedProfile;
    });
  };

  // Handle finishing a 10-question practice round
  const handleFinishRound = (tableNum: number, correctCount: number) => {
    const stars = correctCount >= 10 ? 3 : correctCount >= 8 ? 2 : correctCount >= 5 ? 1 : 0;

    updateAndSaveProfile((prev) => {
      const currentTable = prev.tablesProgress[tableNum];
      if (!currentTable) return prev;

      const newStars = Math.max(currentTable.stars, stars);
      const isMastered = newStars === 3;

      const updatedProfile: UserProfile = {
        ...prev,
        tablesProgress: {
          ...prev.tablesProgress,
          [tableNum]: {
            ...currentTable,
            stars: newStars,
            mastered: isMastered,
          },
        },
      };

      updatedProfile.achievements = evaluateAchievements(updatedProfile);
      return updatedProfile;
    });
  };

  // Handle Obby Victory
  const handleObbyWin = (coinsWon: number) => {
    updateAndSaveProfile((prev) => {
      const updatedProfile: UserProfile = {
        ...prev,
        bloxBux: prev.bloxBux + coinsWon,
        totalCoinsEarned: prev.totalCoinsEarned + coinsWon,
        achievements: prev.achievements.map((ach) =>
          ach.id === 'obby_hero' ? { ...ach, unlocked: true } : ach
        ),
      };
      return updatedProfile;
    });
  };

  // Handle Boss Defeated
  const handleBossDefeated = (coinsWon: number) => {
    updateAndSaveProfile((prev) => {
      const updatedProfile: UserProfile = {
        ...prev,
        bloxBux: prev.bloxBux + coinsWon,
        totalCoinsEarned: prev.totalCoinsEarned + coinsWon,
        achievements: prev.achievements.map((ach) =>
          ach.id === 'boss_slayer' ? { ...ach, unlocked: true } : ach
        ),
      };
      return updatedProfile;
    });
  };

  // Hatch a Pet
  const handleHatchPet = (eggType: 'common' | 'rare' | 'mythic', cost: number): Pet | null => {
    if (profile.bloxBux < cost) return null;

    let candidatePets: Pet[] = [];
    const roll = Math.random() * 100;

    if (eggType === 'common') {
      if (roll < 70) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'common');
      } else if (roll < 95) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'rare');
      } else {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'epic');
      }
    } else if (eggType === 'rare') {
      if (roll < 35) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'common');
      } else if (roll < 80) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'rare');
      } else if (roll < 97) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'epic');
      } else {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'mythic');
      }
    } else {
      if (roll < 20) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'rare');
      } else if (roll < 70) {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'epic');
      } else {
        candidatePets = PET_CATALOG.filter((p) => p.rarity === 'mythic');
      }
    }

    if (candidatePets.length === 0) candidatePets = PET_CATALOG;
    const selected = candidatePets[Math.floor(Math.random() * candidatePets.length)];
    const hatchedPetInstance: Pet = {
      ...selected,
      id: `${selected.id}-${Date.now()}`,
      hatchedAt: new Date().toISOString(),
    };

    updateAndSaveProfile((prev) => {
      const updatedProfile: UserProfile = {
        ...prev,
        bloxBux: prev.bloxBux - cost,
        equippedPetId: hatchedPetInstance.id,
        inventoryPets: [hatchedPetInstance, ...prev.inventoryPets],
        achievements: prev.achievements.map((a) =>
          a.id === 'egg_hatcher' ? { ...a, unlocked: true } : a
        ),
      };
      return updatedProfile;
    });

    return hatchedPetInstance;
  };

  // Equip Pet
  const handleEquipPet = (petId: string | null) => {
    updateAndSaveProfile((prev) => ({
      ...prev,
      equippedPetId: petId,
    }));
  };

  // Buy Hat
  const handleBuyHat = (hat: HatGear): boolean => {
    if (profile.bloxBux < hat.price || profile.inventoryHats.includes(hat.id)) {
      return false;
    }
    updateAndSaveProfile((prev) => ({
      ...prev,
      bloxBux: prev.bloxBux - hat.price,
      inventoryHats: [...prev.inventoryHats, hat.id],
      avatar: {
        ...prev.avatar,
        equippedHatId: hat.id,
      },
    }));
    return true;
  };

  // Equip Hat
  const handleEquipHat = (hatId: string) => {
    updateAndSaveProfile((prev) => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        equippedHatId: hatId,
      },
    }));
  };

  // Save Avatar & Settings
  const handleSaveAvatar = (
    newAvatar: UserProfile['avatar'],
    newUsername: string,
    newInputMode: 'multiple-choice' | 'keypad'
  ) => {
    updateAndSaveProfile((prev) => ({
      ...prev,
      avatar: newAvatar,
      username: newUsername,
      inputMode: newInputMode,
    }));
  };

  // Reset Data
  const handleResetData = () => {
    const fresh = storageService.reset();
    setProfile(fresh);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Top Header Bar */}
      <Header
        profile={profile}
        onToggleSound={handleToggleSound}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Roblox-Style Navigation Bar */}
      <Navigation
        currentView={currentView}
        onSelectView={(view) => {
          if (view === 'achievements') {
            setIsAchievementsModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        unclaimedBadgesCount={
          profile.achievements.filter((a) => a.unlocked).length
        }
      />

      {/* Main Game Screen Router */}
      <main className="flex-1 py-4 sm:py-6">
        {currentView === 'home' && (
          <HomeLobby
            profile={profile}
            onNavigate={setCurrentView}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            onOpenAchievementsModal={() => setIsAchievementsModalOpen(true)}
          />
        )}

        {currentView === 'course' && (
          <CourseMode
            profile={profile}
            onCompleteCourseTable={handleCompleteCourseTable}
          />
        )}

        {currentView === 'study-grid' && <StudyGrid />}

        {currentView === 'practice' && (
          <PracticeMode
            profile={profile}
            onUpdateScore={handleUpdateScore}
            onFinishRound={handleFinishRound}
          />
        )}

        {currentView === 'obby' && (
          <ObbyMode profile={profile} onObbyWin={handleObbyWin} />
        )}

        {currentView === 'boss' && (
          <BossBattle profile={profile} onBossDefeated={handleBossDefeated} />
        )}

        {currentView === 'shop' && (
          <PetShop
            profile={profile}
            onHatchPet={handleHatchPet}
            onEquipPet={handleEquipPet}
            onBuyHat={handleBuyHat}
            onEquipHat={handleEquipHat}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t-2 border-slate-900 py-4 px-4 text-center text-xs text-slate-500 font-bold">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MathBlox &bull; Multiplication Tables 1 to 12 Mastery for Kids</span>
          <span className="text-yellow-400/80">
            💾 All game progress & pets automatically saved locally
          </span>
        </div>
      </footer>

      {/* Avatar Customizer Modal */}
      <AvatarCustomizerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        profile={profile}
        onSaveAvatar={handleSaveAvatar}
        onResetData={handleResetData}
      />

      {/* Achievements / Trophy Room Modal */}
      <AchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        achievements={profile.achievements}
      />
    </div>
  );
};

export default App;
