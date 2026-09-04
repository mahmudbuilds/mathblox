import React from 'react';
import { Target, LayoutGrid, Flame, Skull, Egg, Award, Sparkles, Star, ArrowRight, GraduationCap } from 'lucide-react';
import type { UserProfile, GameView } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { soundService } from '../services/sound';

interface HomeLobbyProps {
  profile: UserProfile;
  onNavigate: (view: GameView) => void;
  onOpenAvatarModal: () => void;
  onOpenAchievementsModal: () => void;
}

export const HomeLobby: React.FC<HomeLobbyProps> = ({
  profile,
  onNavigate,
  onOpenAvatarModal,
  onOpenAchievementsModal,
}) => {
  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);

  // Total stars calculated across all 12 tables
  const totalStars = Object.values(profile.tablesProgress).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );

  const completedCourseTables = profile.courseCompletedTables.length;

  const gameModes = [
    {
      id: 'course' as GameView,
      title: 'Academy Course',
      subtitle: 'Step-by-Step Learning',
      desc: 'Master secrets, chant skip-counting rhythms, and pass checkpoints to earn course diplomas!',
      badge: `${completedCourseTables}/12 Certified`,
      icon: <GraduationCap className="w-8 h-8 text-yellow-400" />,
      btnColor: 'blox-button-yellow text-zinc-950',
      borderGlow: 'border-yellow-500/50 hover:border-yellow-400',
    },
    {
      id: 'practice' as GameView,
      title: 'Table Practice',
      subtitle: 'Tables 1 to 12 & Mixed Mode',
      desc: 'Master each table, earn 3 stars ⭐, and rack up Blox Bux combos!',
      badge: `${totalStars}/36 Stars`,
      icon: <Target className="w-8 h-8 text-purple-400" />,
      btnColor: 'blox-button-purple text-white',
      borderGlow: 'border-purple-500/50 hover:border-purple-400',
    },
    {
      id: 'obby' as GameView,
      title: 'Lava Obby Run',
      subtitle: 'Platform Obstacle Course',
      desc: 'Jump across 10 floating stones above boiling lava to reach the gold chest!',
      badge: 'Win 150 Bux',
      icon: <Flame className="w-8 h-8 text-amber-400" />,
      btnColor: 'blox-button-yellow text-zinc-950',
      borderGlow: 'border-amber-500/50 hover:border-amber-400',
    },
    {
      id: 'boss' as GameView,
      title: 'Glitch Boss Battle',
      subtitle: 'Beat the Bacon Monster',
      desc: 'Unleash math rocket attacks to knock out the Boss before time runs out!',
      badge: 'Boss Bounty: 200 Bux',
      icon: <Skull className="w-8 h-8 text-rose-400" />,
      btnColor: 'blox-button-red text-white',
      borderGlow: 'border-rose-500/50 hover:border-rose-400',
    },
    {
      id: 'study-grid' as GameView,
      title: '12x12 Matrix Visualizer',
      subtitle: 'Learn & Discover Blocks',
      desc: 'Tap any cell in the 12x12 grid to see Roblox block arrays, repeated addition, & memory rhymes!',
      badge: 'Study Tool',
      icon: <LayoutGrid className="w-8 h-8 text-cyan-400" />,
      btnColor: 'blox-button-blue text-white',
      borderGlow: 'border-cyan-500/50 hover:border-cyan-400',
    },
    {
      id: 'shop' as GameView,
      title: 'Pet & Gear Shop',
      subtitle: 'Hatch Eggs & Buy Hats',
      desc: 'Spend Blox Bux to hatch pets that boost your coins up to 2.2x multiplier!',
      badge: `${profile.inventoryPets.length} Pets Owned`,
      icon: <Egg className="w-8 h-8 text-pink-400" />,
      btnColor: 'blox-button-green text-white',
      borderGlow: 'border-pink-500/50 hover:border-pink-400',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-purple-950/80 border-4 border-indigo-500/50 p-5 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left: Avatar Showcase */}
        <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
          <div
            onClick={onOpenAvatarModal}
            className="cursor-pointer group relative p-4 rounded-2xl bg-slate-900/80 border-2 border-slate-700 hover:border-yellow-400 transition-all shadow-inner"
            title="Click to customize avatar"
          >
            <AvatarDisplay
              avatar={profile.avatar}
              equippedPet={equippedPet}
              size="lg"
              showPet={true}
            />
            <div className="mt-2 text-center">
              <span className="text-[11px] font-bold text-yellow-400 group-hover:underline">
                Edit Avatar ✏️
              </span>
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 px-2.5 py-0.5 rounded-full text-xs font-black uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Welcome Bloxer!
            </div>
            <h1 className="font-blox text-3xl sm:text-4xl text-white tracking-wide">
              {profile.username}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Ready to crush the multiplication tables from 1 to 12 today? Let's earn some Blox Bux!
            </p>

            <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
              <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-yellow-300">
                <GraduationCap className="w-4 h-4 text-yellow-400" />
                <span>{completedCourseTables}/12 Course Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-yellow-300">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{totalStars} / 36 Stars</span>
              </div>
              <button
                onClick={onOpenAchievementsModal}
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-cyan-300 transition-colors"
              >
                <Award className="w-4 h-4 text-cyan-400" />
                <span>
                  {profile.achievements.filter((a) => a.unlocked).length} Badges
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Launch */}
        <div className="z-10 flex flex-col items-center sm:items-end gap-2">
          <button
            onClick={() => {
              soundService.playClick();
              onNavigate('course');
            }}
            className="blox-button-yellow text-zinc-950 font-blox text-lg px-8 py-4 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce"
          >
            <span>START COURSE</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <span className="text-[11px] text-slate-400 font-medium">
            Step-by-step guided learning!
          </span>
        </div>
      </div>

      {/* Game Modes Grid */}
      <div className="space-y-3">
        <h3 className="font-blox text-xl text-yellow-300 flex items-center gap-2">
          <span>🎮</span> Game Modes & Adventures
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameModes.map((mode) => (
            <div
              key={mode.id}
              className={`blox-card p-5 flex flex-col justify-between space-y-4 border-2 transition-all ${mode.borderGlow} group`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 shadow">
                  {mode.icon}
                </div>
                <span className="text-[11px] font-black uppercase text-yellow-400 bg-yellow-950/60 border border-yellow-500/40 px-2.5 py-1 rounded-full">
                  {mode.badge}
                </span>
              </div>

              <div>
                <h4 className="font-blox text-xl text-white group-hover:text-yellow-300 transition-colors">
                  {mode.title}
                </h4>
                <div className="text-xs text-indigo-300 font-bold">{mode.subtitle}</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                  {mode.desc}
                </p>
              </div>

              <button
                onClick={() => {
                  soundService.playClick();
                  onNavigate(mode.id);
                }}
                className={`w-full py-2.5 rounded-xl font-blox text-sm shadow cursor-pointer transition-all ${mode.btnColor} flex items-center justify-center`}
              >
                {mode.id === 'course' && 'Enter Academy Course'}
                {mode.id === 'practice' && 'Practice Tables'}
                {mode.id === 'obby' && 'Run Lava Obby'}
                {mode.id === 'boss' && 'Battle Glitch Boss'}
                {mode.id === 'study-grid' && 'Open 12x12 Visualizer'}
                {mode.id === 'shop' && 'Open Pet Emporium'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Secret Math Trick of the Day */}
      <div className="bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-slate-900/60 border-2 border-amber-500/40 p-4 rounded-2xl flex items-center gap-3">
        <div className="text-3xl">💡</div>
        <div className="space-y-0.5">
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
            Daily Blox Secret Trick
          </span>
          <p className="text-xs sm:text-sm text-slate-200 font-medium">
            Remember: <strong>5, 6, 7, 8</strong>! That tells you that{' '}
            <span className="text-yellow-300 font-black">56 = 7 × 8</span>! You will never forget it again!
          </p>
        </div>
      </div>
    </div>
  );
};
