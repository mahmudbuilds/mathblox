import React from 'react';
import { Volume2, VolumeX, Flame, User, Menu } from 'lucide-react';
import type { UserProfile } from '../types';
import { soundService } from '../services/sound';

interface HeaderProps {
  profile: UserProfile;
  onToggleSound: () => void;
  onOpenAvatarModal: () => void;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onToggleSound,
  onOpenAvatarModal,
  onOpenSidebar,
}) => {
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.xpToNextLevel) * 100));

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b-4 border-slate-800 px-2 sm:px-6 py-2 sm:py-2.5 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Sidebar Toggle & Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Quick Access Sidebar Toggle Button */}
          <button
            onClick={() => {
              soundService.playClick();
              onOpenSidebar();
            }}
            className="p-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-yellow-400 hover:text-yellow-300 border-2 border-slate-700 hover:border-yellow-400/80 shadow-md flex items-center gap-1.5 transition-all cursor-pointer group"
            title="Open Quick Access Sidebar Menu"
            aria-label="Open Sidebar Menu"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            <span className="font-blox text-xs text-white hidden md:inline tracking-wide">Menu</span>
          </button>

          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg border border-white/20 transform hover:rotate-6 transition-transform">
            <span className="font-blox text-base sm:text-2xl font-black">✖</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-blox text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 drop-shadow-md tracking-tight sm:tracking-normal">
                MATHBLOX
              </span>
              <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-black uppercase px-1 sm:px-1.5 py-0.2 rounded border border-black shadow-xs">
                12x12
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold hidden sm:block">
              Multiplication Academy
            </p>
          </div>
        </div>

        {/* Center: XP Level & Streak */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Level Progress */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/80 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border border-slate-700 shadow-inner">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-blox text-[11px] sm:text-sm shadow border border-indigo-300 shrink-0">
              {profile.level}
            </div>
            <div className="hidden sm:flex w-20 md:w-28 flex-col">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-300">
                <span>LVL {profile.level}</span>
                <span>{profile.xp}/{profile.xpToNextLevel} XP</span>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-amber-500/10 border border-amber-500/40 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-amber-400 font-extrabold text-xs sm:text-sm">
            <Flame className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${profile.streak > 0 ? 'text-orange-400 animate-bounce' : 'text-slate-500'}`} />
            <span>{profile.streak}</span>
          </div>
        </div>

        {/* Right: Blox Bux (Currency) & Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Currency Display */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/60 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl shadow-inner">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 font-black text-[10px] sm:text-xs shadow-md border border-amber-200 shrink-0">
              R$
            </div>
            <span className="font-blox text-xs sm:text-base text-yellow-300">
              {profile.bloxBux}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundService.playClick();
              onToggleSound();
            }}
            title={profile.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 active:scale-95 transition-all"
            aria-label="Toggle Sound"
          >
            {profile.soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />}
          </button>

          {/* Customize Avatar Button */}
          <button
            onClick={() => {
              soundService.playClick();
              onOpenAvatarModal();
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs border-b-2 sm:border-b-3 border-indigo-800 active:translate-y-0.5 active:border-b-0 transition-all shadow"
            title="Customize Avatar"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Avatar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
