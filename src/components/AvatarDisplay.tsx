import React from 'react';
import type { UserProfile, Pet } from '../types';
import { HAT_CATALOG } from '../services/storage';

interface AvatarDisplayProps {
  avatar: UserProfile['avatar'];
  equippedPet?: Pet | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPet?: boolean;
  animate?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatar,
  equippedPet,
  size = 'md',
  showPet = true,
  animate = true,
}) => {
  const currentHat = HAT_CATALOG.find((h) => h.id === avatar.equippedHatId);

  // Scales
  const scaleMap = {
    sm: 'scale-75',
    md: 'scale-95',
    lg: 'scale-110',
    xl: 'scale-125',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${scaleMap[size]} transition-transform`}>
      {/* Floating Pet Companion */}
      {showPet && equippedPet && (
        <div
          className={`absolute -right-14 -top-2 flex flex-col items-center z-30 ${
            animate ? 'animate-bounce duration-1000' : ''
          }`}
        >
          <div className="relative group">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border-2 border-white/80 ${
                equippedPet.rarity === 'mythic'
                  ? 'bg-gradient-to-tr from-fuchsia-500 to-pink-500 ring-2 ring-yellow-300'
                  : equippedPet.rarity === 'epic'
                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 ring-2 ring-amber-300'
                  : equippedPet.rarity === 'rare'
                  ? 'bg-gradient-to-tr from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-tr from-green-400 to-emerald-500'
              }`}
            >
              {equippedPet.icon}
            </div>
            {/* Multiplier Badge */}
            <div className="absolute -bottom-2 -right-1 bg-yellow-400 text-zinc-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full border border-black shadow">
              {equippedPet.coinMultiplier}x
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-800 bg-white/90 px-1.5 py-0.5 rounded-md mt-1 shadow-sm border border-slate-200 whitespace-nowrap">
            {equippedPet.name}
          </span>
        </div>
      )}

      {/* Blocky Roblox Character Container */}
      <div className="relative flex flex-col items-center">
        {/* Hat / Head Accessory Layer */}
        {currentHat && currentHat.id !== 'none' && (
          <div className="absolute -top-7 z-20 flex items-center justify-center">
            {currentHat.id === 'propeller' && (
              <div className="relative flex flex-col items-center">
                <div className="w-8 h-1 bg-yellow-400 rounded-full animate-spin"></div>
                <div className="w-3 h-2 bg-slate-700"></div>
                <div className="w-16 h-4 bg-red-500 rounded-t-full border border-red-700 -mt-1"></div>
              </div>
            )}
            {currentHat.id === 'ninja' && (
              <div className="relative w-16 flex items-center justify-center">
                <div className="w-16 h-4 bg-zinc-900 rounded-sm border border-black flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                </div>
                <div className="absolute -right-3 top-1 w-3 h-6 bg-zinc-900 rotate-12 rounded-sm border-r border-black"></div>
              </div>
            )}
            {currentHat.id === 'crown' && (
              <div className="text-3xl filter drop-shadow-md animate-pulse">👑</div>
            )}
            {currentHat.id === 'cowboy' && (
              <div className="text-3xl filter drop-shadow-md">🤠</div>
            )}
            {currentHat.id === 'gamer-headset' && (
              <div className="relative w-20 flex justify-between items-center -mt-1">
                <div className="w-3 h-8 bg-purple-600 rounded-lg border-2 border-black"></div>
                <div className="w-14 h-3 bg-zinc-800 rounded-t-lg border-t-2 border-black -mt-4"></div>
                <div className="w-3 h-8 bg-purple-600 rounded-lg border-2 border-black"></div>
              </div>
            )}
            {currentHat.id === 'party-hat' && (
              <div className="text-3xl filter drop-shadow-md -mt-2">🎉</div>
            )}
            {currentHat.id === 'dominus' && (
              <div className="w-16 h-10 bg-violet-950 rounded-t-2xl border-2 border-yellow-400 flex items-center justify-center shadow-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Head Block */}
        <div
          className="w-14 h-12 rounded-lg border-3 border-black shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] flex flex-col items-center justify-center relative z-10"
          style={{ backgroundColor: avatar.skinColor || '#FEE12B' }}
        >
          {/* Shades face accessory */}
          {currentHat?.id === 'shades' ? (
            <div className="w-11 h-4 bg-zinc-900 border border-zinc-700 rounded-sm flex items-center justify-center shadow">
              <div className="w-3 h-2 bg-cyan-400 opacity-60 rounded-xs -mr-1"></div>
            </div>
          ) : (
            /* Face Expression */
            <div className="flex flex-col items-center justify-center space-y-1 mt-1">
              {/* Eyes */}
              <div className="flex space-x-3 items-center">
                {avatar.faceExpression === 'wink' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
                    <div className="w-2.5 h-1 border-b-2 border-zinc-900 rounded-full"></div>
                  </>
                ) : avatar.faceExpression === 'star-eyes' ? (
                  <>
                    <span className="text-[10px] leading-none">⭐</span>
                    <span className="text-[10px] leading-none">⭐</span>
                  </>
                ) : avatar.faceExpression === 'cool' ? (
                  <>
                    <div className="w-2.5 h-1.5 bg-zinc-900 rounded-xs"></div>
                    <div className="w-2.5 h-1.5 bg-zinc-900 rounded-xs"></div>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2.5 rounded-full bg-zinc-900"></div>
                    <div className="w-2 h-2.5 rounded-full bg-zinc-900"></div>
                  </>
                )}
              </div>

              {/* Mouth */}
              {avatar.faceExpression === 'silly' ? (
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-1.5 border-b-2 border-zinc-900 rounded-full"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-b-full -mt-0.5 border border-pink-700"></div>
                </div>
              ) : avatar.faceExpression === 'cool' ? (
                <div className="w-3 h-1 border-b-2 border-zinc-900 rounded-r-md ml-1"></div>
              ) : (
                <div className="w-4 h-2 border-b-2 border-zinc-900 rounded-full"></div>
              )}
            </div>
          )}
        </div>

        {/* Torso & Arms Block */}
        <div className="flex items-start -mt-0.5 z-0">
          {/* Left Arm */}
          <div
            className="w-4 h-12 rounded-l-md border-3 border-black -mr-0.5 shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: avatar.skinColor || '#FEE12B' }}
          ></div>

          {/* Torso */}
          <div
            className="w-16 h-14 rounded-md border-3 border-black shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] flex flex-col items-center justify-center text-white font-black text-xs relative overflow-hidden"
            style={{ backgroundColor: avatar.shirtColor || '#00A2FF' }}
          >
            {/* Roblox R / Math Sign Insignia */}
            <div className="bg-white/20 px-2 py-0.5 rounded-md border border-white/40 flex items-center gap-0.5">
              <span className="text-[11px] font-black tracking-tighter">✖️</span>
              <span className="text-[10px] font-extrabold">12</span>
            </div>
          </div>

          {/* Right Arm */}
          <div
            className="w-4 h-12 rounded-r-md border-3 border-black -ml-0.5 shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: avatar.skinColor || '#FEE12B' }}
          ></div>
        </div>

        {/* Legs Block */}
        <div className="flex -mt-0.5 z-0">
          <div
            className="w-7 h-11 rounded-bl-md border-3 border-black border-r-2 shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: avatar.pantsColor || '#27AE60' }}
          ></div>
          <div
            className="w-7 h-11 rounded-br-md border-3 border-black border-l-1 shadow-[inset_0_-4px_0_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: avatar.pantsColor || '#27AE60' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
