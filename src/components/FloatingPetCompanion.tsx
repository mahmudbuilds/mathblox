import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Apple, Zap, MessageCircle, X } from 'lucide-react';
import type { UserProfile, Pet } from '../types';
import { soundService } from '../services/sound';
import { PetSvg } from './PetSvg';
import { getPetReactionProfile } from '../services/petReactions';

interface FloatingPetCompanionProps {
  profile: UserProfile;
  onFeedPet: (xpGained: number) => void;
  onPetTrick: (coinsGained: number) => void;
}

export const FloatingPetCompanion: React.FC<FloatingPetCompanionProps> = ({
  profile,
  onFeedPet,
  onPetTrick,
}) => {
  const [speechText, setSpeechText] = useState<string>('');
  const [actionLabel, setActionLabel] = useState<string>('');
  const [showSpeech, setShowSpeech] = useState<boolean>(false);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [heartsCount, setHeartsCount] = useState<number>(0);

  const equippedPet: Pet | undefined = profile.inventoryPets.find(
    (p) => p.id === profile.equippedPetId
  );

  // If no pet equipped, don't display
  if (!equippedPet) return null;

  const reaction = getPetReactionProfile(equippedPet.id);

  const triggerPetReaction = () => {
    // Unique synthesized sound for this pet!
    reaction.triggerSound();

    // Trigger pet-specific reaction motion
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 750);

    // Spawn pet-themed confetti colors
    confetti({
      particleCount: 28,
      spread: 50,
      origin: { x: 0.9, y: 0.82 },
      colors: reaction.particleColors,
    });

    setHeartsCount((prev) => prev + 1);

    // Pick random characteristic dialogue for this pet
    const randomQuote = reaction.dialogues[Math.floor(Math.random() * reaction.dialogues.length)];
    setSpeechText(randomQuote);
    setActionLabel(`${equippedPet.name} ${reaction.actionLabel}`);
    setShowSpeech(true);
  };

  const handleFeed = () => {
    soundService.playPetFeed();
    onFeedPet(15);
    setSpeechText(`Yummy! That was delicious! +15 XP! 🍎💖`);
    setActionLabel(`${equippedPet.name} munches happily!`);
    setShowSpeech(true);
    setShowMenu(false);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: 0.9, y: 0.8 },
      colors: ['#ef4444', '#f97316', '#22c55e'],
    });
  };

  const handleTrick = () => {
    reaction.triggerSound();
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 800);
    onPetTrick(10);
    setSpeechText(`Ta-da! Found +10 Blox Bux! ${reaction.soundEffectLabel} 🤸💰`);
    setActionLabel(`${equippedPet.name} performed a signature trick!`);
    setShowSpeech(true);
    setShowMenu(false);
  };

  const handleAskTip = () => {
    soundService.playClick();
    const quote = reaction.dialogues[Math.floor(Math.random() * reaction.dialogues.length)];
    setSpeechText(quote);
    setActionLabel(`${equippedPet.name} shared a secret tip!`);
    setShowSpeech(true);
    setShowMenu(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none pointer-events-auto">
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="mb-3 max-w-xs bg-slate-900/95 border-3 border-yellow-400 p-3.5 rounded-2xl shadow-2xl text-xs font-bold text-slate-100 relative animate-in fade-in slide-in-from-bottom-2">
          <button
            onClick={() => setShowSpeech(false)}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-600 text-[10px]"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="space-y-1">
            {actionLabel && (
              <div className="text-[10px] text-yellow-400/90 font-black uppercase tracking-wider">
                * {actionLabel} *
              </div>
            )}
            <div className="flex items-start gap-1.5">
              <span className="text-yellow-400 text-sm">💬</span>
              <p className="leading-snug text-slate-100">{speechText}</p>
            </div>
          </div>
          {/* Bubble tail pointing to pet */}
          <div className="absolute -bottom-2 right-10 w-3 h-3 bg-slate-900 border-r-3 border-b-3 border-yellow-400 transform rotate-45"></div>
        </div>
      )}

      {/* Mini Interaction Action Menu */}
      {showMenu && (
        <div className="mb-3 bg-slate-950/95 border-2 border-indigo-500/80 p-2.5 rounded-2xl shadow-2xl flex flex-col gap-1.5 animate-in zoom-in-95">
          <div className="text-[10px] font-black text-indigo-300 uppercase px-2 py-0.5 border-b border-slate-800 flex items-center justify-between">
            <span>Interact with {equippedPet.name}</span>
            <span className="text-yellow-400">{equippedPet.coinMultiplier}x</span>
          </div>
          <button
            onClick={handleFeed}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-emerald-700 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left cursor-pointer"
          >
            <Apple className="w-3.5 h-3.5 text-red-400" />
            <span>Feed Math Apple (+15 XP)</span>
          </button>
          <button
            onClick={handleTrick}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Perform Pet Trick (+10 Bux)</span>
          </button>
          <button
            onClick={handleAskTip}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-purple-700 text-slate-200 hover:text-white font-blox text-xs transition-colors text-left cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Secret Math Fact</span>
          </button>
        </div>
      )}

      {/* Floating Free-Standing Full-Body Pet Container (NO CROPPED BOX!) */}
      <div className="flex items-end gap-2">
        {/* Toggle Interaction Menu Button */}
        <button
          onClick={() => {
            soundService.playClick();
            setShowMenu(!showMenu);
          }}
          className="w-9 h-9 rounded-full bg-slate-900/90 hover:bg-slate-800 text-yellow-400 border-2 border-slate-700 hover:border-yellow-400 flex items-center justify-center shadow-lg transition-all cursor-pointer mb-2"
          title="Pet Options Menu"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Free-Standing Full-Body SVG Pet with Unique Touch Reaction */}
        <div
          onClick={triggerPetReaction}
          className="cursor-pointer group relative flex flex-col items-center transition-all duration-300 transform hover:scale-105"
          title={`Touch ${equippedPet.name} to see its unique reaction!`}
        >
          {/* Floating Reaction Hearts / Sparkles Indicator */}
          {heartsCount > 0 && (
            <div className="absolute -top-3 -right-1 text-xs animate-ping pointer-events-none">
              💖
            </div>
          )}

          {/* Full-Body Vector SVG Companion */}
          <div className="relative flex items-center justify-center">
            <PetSvg
              petId={equippedPet.id}
              size="lg"
              isReacting={isReacting}
              showGroundShadow={true}
            />

            {/* Multiplier Tag Badge */}
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-zinc-950 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-black shadow-md flex items-center gap-0.5">
              <span>{equippedPet.coinMultiplier}x</span>
            </div>
          </div>

          {/* Pet Name Pill with touch prompt */}
          <div className="bg-slate-900/95 border border-slate-700 group-hover:border-yellow-400 px-2.5 py-0.5 rounded-md mt-1 shadow-md flex items-center gap-1 transition-colors">
            <span className="text-[11px] font-black text-white whitespace-nowrap">
              {equippedPet.name}
            </span>
            <span className="text-[9px] text-yellow-400 font-bold opacity-80 group-hover:opacity-100">
              (Touch me!)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
