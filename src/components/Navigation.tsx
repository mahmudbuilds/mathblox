import React from 'react';
import { LayoutGrid, Target, Flame, Skull, Egg, Award, Home, GraduationCap } from 'lucide-react';
import type { GameView } from '../types';
import { soundService } from '../services/sound';

interface NavigationProps {
  currentView: GameView;
  onSelectView: (view: GameView) => void;
  unclaimedBadgesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onSelectView,
  unclaimedBadgesCount,
}) => {
  const navItems: { id: GameView; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'home', label: 'Lobby', icon: <Home className="w-5 h-5" />, color: 'hover:bg-blue-600' },
    { id: 'course', label: 'Course', icon: <GraduationCap className="w-5 h-5 text-yellow-400" />, color: 'hover:bg-indigo-600' },
    { id: 'study-grid', label: '12x12 Matrix', icon: <LayoutGrid className="w-5 h-5" />, color: 'hover:bg-emerald-600' },
    { id: 'practice', label: 'Practice', icon: <Target className="w-5 h-5" />, color: 'hover:bg-purple-600' },
    { id: 'obby', label: 'Obby Jump', icon: <Flame className="w-5 h-5" />, color: 'hover:bg-amber-600' },
    { id: 'boss', label: 'Boss Battle', icon: <Skull className="w-5 h-5" />, color: 'hover:bg-rose-600' },
    { id: 'shop', label: 'Pet Shop', icon: <Egg className="w-5 h-5" />, color: 'hover:bg-pink-600' },
    { id: 'achievements', label: 'Badges', icon: <Award className="w-5 h-5" />, color: 'hover:bg-yellow-600' },
  ];

  return (
    <nav className="w-full bg-slate-950/90 border-b-2 border-slate-800 px-2 py-1.5 sm:py-2 overflow-x-auto overscroll-x-contain touch-pan-x select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max px-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundService.playClick();
                onSelectView(item.id);
              }}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 min-h-[42px] sm:min-h-[44px] rounded-xl font-blox text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-700 text-white border-b-4 border-indigo-900 shadow-md translate-y-[-1px]'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border-b-2 border-slate-700 hover:border-slate-600 active:bg-slate-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>

              {item.id === 'achievements' && unclaimedBadgesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-ping">
                  !
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
