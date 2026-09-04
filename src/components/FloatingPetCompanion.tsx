import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Apple, Zap, MessageCircle, X } from 'lucide-react';
import type { UserProfile, Pet } from '../types';
import { soundService } from '../services/sound';

interface FloatingPetCompanionProps {
  profile: UserProfile;
  onFeedPet: (xpGained: number) => void;
  onPetTrick: (coinsGained: number) => void;
}

const PET_TIPS = [
  "Remember the 5s trick! They always end in 5 or 0, like clock minutes! ⏰",
  "5, 6, 7, 8: 56 is 7 times 8! Never forget it! 🌟",
  "Double-Double! For 4s, just double it, then double it again! 🚀",
  "9s Magic! 9 × 6 = 54, and 5 + 4 = 9! The digits always add up to 9! ✨",
  "The Mirror Table! Anything times 1 is just the same number! 🪞",
  "Zero Hero! 10 × 7 = 70. Just paste a 0 at the end! 🦸",
  "I'm giving you a coin multiplier bonus on every problem! 💰",
  "You're an awesome Roblox math champ! Keep going! 🏆",
];

export const FloatingPetCompanion: React.FC<FloatingPetCompanionProps> = ({
  profile,
  onFeedPet,
  onPetTrick,
}) => {
  const [speechText, setSpeechText] = useState<string>('');
  const [showSpeech, setShowSpeech] = useState<boolean>(false);
  const [isDoingTrick, setIsDoingTrick] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [heartsCount, setHeartsCount] = useState<number>(0);

  const equippedPet: Pet | undefined = profile.inventoryPets.find(
    (p) => p.id === profile.equippedPetId
  );

  // If no pet equipped, don't display
  if (!equippedPet) return null;

  const triggerPetReaction = () => {
    soundService.playPetHappy();
    setIsDoingTrick(true);
    setTimeout(() => setIsDoingTrick(false), 600);

    // Spawn heart confetti
    confetti({
      particleCount: 20,
      spread: 45,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#ff69b4', '#ffd700', '#00ffff'],
    });

    setHeartsCount((prev) => prev + 1);

    // Pick random friendly quote
    const randomTip = PET_TIPS[Math.floor(Math.random() * PET_TIPS.length)];
    setSpeechText(randomTip);
    setShowSpeech(true);
  };

  const handleFeed = () => {
    soundService.playPetFeed();
    onFeedPet(15);
    setSpeechText(`Yummy! That was delicious! +15 XP! 🍎💖`);
    setShowSpeech(true);
    setShowMenu(false);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: 0.9, y: 0.8 },
    });
  };

  const handleTrick = () => {
    soundService.playPetTrick();
    setIsDoingTrick(true);
    setTimeout(() => setIsDoingTrick(false), 800);
    onPetTrick(10);
    setSpeechText(`Ta-da! Look at my backflip! Found +10 Blox Bux! 🤸💰`);
    setShowSpeech(true);
    setShowMenu(false);
  };

  const handleAskTip = () => {
    soundService.playClick();
    const tip = PET_TIPS[Math.floor(Math.random() * PET_TIPS.length)];
    setSpeechText(tip);
    setShowSpeech(true);
    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none pointer-events-auto">
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="mb-2 max-w-xs bg-slate-900/95 border-3 border-yellow-400 p-3 rounded-2xl shadow-2xl text-xs font-bold text-slate-100 relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowSpeech(false)}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 text-[10px]"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-start gap-1.5">
            <span className="text-yellow-400">💬</span>
            <p className="leading-snug">{speechText}</p>
          </div>
          {/* Bubble tail pointing to pet */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-slate-900 border-r-3 border-b-3 border-yellow-400 transform rotate-45"></div>
        </div>
      )}

      {/* Mini Interaction Action Menu */}
      {showMenu && (
        <div className="mb-2 bg-slate-950/95 border-2 border-indigo-500/80 p-2 rounded-2xl shadow-2xl flex flex-col gap-1.5 animate-in zoom-in-95">
          <div className="text-[10px] font-black text-slate-400 uppercase px-2 py-0.5 border-b border-slate-800">
            Interact with {equippedPet.name}
          </div>
          <button
            onClick={handleFeed}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left"
          >
            <Apple className="w-3.5 h-3.5 text-red-400" />
            <span>Feed Math Apple (+15 XP)</span>
          </button>
          <button
            onClick={handleTrick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Do Backflip (+10 Bux)</span>
          </button>
          <button
            onClick={handleAskTip}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-purple-700 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Secret Math Tip</span>
          </button>
        </div>
      )}

      {/* The Floating Interactive Pet Container */}
      <div className="flex items-center gap-2">
        {/* Toggle Interaction Menu Button */}
        <button
          onClick={() => {
            soundService.playClick();
            setShowMenu(!showMenu);
          }}
          className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-yellow-400 border-2 border-slate-700 hover:border-yellow-400 flex items-center justify-center shadow-lg transition-all"
          title="Pet Options"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Pet Avatar Icon with Bounce & Spin Trick Animation */}
        <div
          onClick={triggerPetReaction}
          className={`cursor-pointer group relative flex flex-col items-center transition-all duration-300 ${
            isDoingTrick ? 'rotate-[360deg] scale-125' : 'hover:scale-110 animate-bounce duration-1000'
          }`}
          title={`Click to pet ${equippedPet.name}!`}
        >
          {/* Floating Hearts Indicator */}
          {heartsCount > 0 && (
            <div className="absolute -top-3 -right-1 text-xs animate-ping">
              💖
            </div>
          )}

          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-2xl border-3 border-white/90 relative ${
              equippedPet.rarity === 'mythic'
                ? 'bg-gradient-to-tr from-fuchsia-500 to-pink-500 ring-4 ring-yellow-300'
                : equippedPet.rarity === 'legendary'
                ? 'bg-gradient-to-tr from-yellow-400 to-amber-500 ring-4 ring-cyan-300'
                : equippedPet.rarity === 'epic'
                ? 'bg-gradient-to-tr from-amber-500 to-purple-600 ring-2 ring-amber-300'
                : equippedPet.rarity === 'rare'
                ? 'bg-gradient-to-tr from-cyan-400 to-blue-600'
                : 'bg-gradient-to-tr from-green-400 to-emerald-500'
            }`}
          >
            {equippedPet.icon}

            {/* Multiplier Badge */}
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-zinc-950 font-black text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full border border-black shadow">
              {equippedPet.coinMultiplier}x
            </div>
          </div>

          {/* Pet Name Pill */}
          <span className="text-[10px] font-black text-zinc-900 bg-white/95 px-2 py-0.5 rounded-md mt-1 shadow-md border border-slate-300 whitespace-nowrap">
            {equippedPet.name}
          </span>
        </div>
      </div>
    </div>
  );
};
