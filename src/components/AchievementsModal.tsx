import React from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import type { Achievement } from '../types';
import { soundService } from '../services/sound';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="blox-card w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-amber-500/60">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-2.5">
            <Award className="w-7 h-7 text-yellow-400" />
            <div>
              <h3 className="font-blox text-xl sm:text-2xl text-yellow-300">
                Roblox Trophy Room
              </h3>
              <p className="text-xs text-slate-400">
                Unlocked {unlockedCount} of {achievements.length} Badges
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                ach.unlocked
                  ? 'bg-amber-950/30 border-amber-500/60 shadow'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 shadow ${
                    ach.unlocked
                      ? 'bg-yellow-400 border-yellow-200 text-zinc-950'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}
                >
                  {ach.icon}
                </div>
                <div>
                  <h4 className="font-blox text-base text-white flex items-center gap-1.5">
                    {ach.title}
                    {ach.unlocked && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">{ach.description}</p>
                </div>
              </div>

              {/* Reward pill */}
              <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-amber-500/40 text-yellow-400 font-blox text-xs whitespace-nowrap">
                <span>R$</span>
                <span>+{ach.rewardCoins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
