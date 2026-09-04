import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Egg, Sparkles } from 'lucide-react';
import type { UserProfile, Pet, HatGear } from '../types';
import { HAT_CATALOG } from '../services/storage';
import { soundService } from '../services/sound';
import { PetSvg } from './PetSvg';
import { getPetReactionProfile } from '../services/petReactions';

interface PetShopProps {
  profile: UserProfile;
  onHatchPet: (eggType: 'common' | 'rare' | 'legendary' | 'mythic', cost: number) => Pet | null;
  onEquipPet: (petId: string | null) => void;
  onBuyHat: (hat: HatGear) => boolean;
  onEquipHat: (hatId: string) => void;
}

interface EggConfig {
  type: 'common' | 'rare' | 'legendary' | 'mythic';
  name: string;
  cost: number;
  icon: string;
  color: string;
  description: string;
}

const EGGS: EggConfig[] = [
  {
    type: 'common',
    name: 'Starter Egg',
    cost: 50,
    icon: '🥚',
    color: 'from-emerald-600 to-teal-500 border-emerald-400',
    description: 'Hatch Doge, Kitty, Piggy, Dino & more (+10% to +25% Bux)',
  },
  {
    type: 'rare',
    name: 'Neon Cyber Egg',
    cost: 120,
    icon: '⚡',
    color: 'from-cyan-600 to-blue-600 border-cyan-400',
    description: 'Hatch Laser Fox, Volt Hamster, Penguin & more (+30% to +50% Bux)',
  },
  {
    type: 'legendary',
    name: 'Galaxy Egg',
    cost: 250,
    icon: '🌌',
    color: 'from-purple-600 via-indigo-600 to-blue-700 border-purple-400',
    description: 'Hatch Thunder Pegasus, Cyber Hydra, Phantom (+60% to 2.4x Bux)',
  },
  {
    type: 'mythic',
    name: 'Divine Mythic Egg',
    cost: 500,
    icon: '🔮',
    color: 'from-fuchsia-600 via-pink-600 to-amber-500 border-yellow-300',
    description: 'Chance at Cosmic Unicorn, Rainbow Dragon & Diamond Titan (Up to 3.5x Bux!)',
  },
];

export const PetShop: React.FC<PetShopProps> = ({
  profile,
  onHatchPet,
  onEquipPet,
  onBuyHat,
  onEquipHat,
}) => {
  const [activeTab, setActiveTab] = useState<'eggs' | 'pets' | 'hats'>('eggs');
  const [hatchingState, setHatchingState] = useState<'idle' | 'hatching' | 'revealed'>('idle');
  const [hatchedPet, setHatchedPet] = useState<Pet | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [reactingPetId, setReactingPetId] = useState<string | null>(null);

  const handlePetTouch = (petId: string) => {
    const reaction = getPetReactionProfile(petId);
    reaction.triggerSound();
    setReactingPetId(petId);
    setTimeout(() => setReactingPetId(null), 750);

    confetti({
      particleCount: 22,
      spread: 55,
      colors: reaction.particleColors,
    });
  };

  const handleStartHatch = (egg: EggConfig) => {
    if (profile.bloxBux < egg.cost) {
      soundService.playWrong();
      alert(`You need ${egg.cost} Blox Bux to buy this egg! Keep practicing to earn more!`);
      return;
    }

    soundService.playClick();
    setHatchingState('hatching');
    soundService.playHatch();

    setTimeout(() => {
      const pet = onHatchPet(egg.type, egg.cost);
      if (pet) {
        setHatchedPet(pet);
        setHatchingState('revealed');
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
        });
      } else {
        setHatchingState('idle');
      }
    }, 1800);
  };

  const closeHatchModal = () => {
    soundService.playClick();
    setHatchingState('idle');
    setHatchedPet(null);
  };

  const filteredPets = profile.inventoryPets.filter((pet) => {
    if (rarityFilter === 'all') return true;
    return pet.rarity === rarityFilter;
  });

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-900/60 via-purple-900/60 to-slate-900/60 border-4 border-pink-500/50 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Egg className="w-8 h-8 text-yellow-300 animate-bounce" />
            <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
              Roblox Pet & Gear Emporium
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Hatch over 30 pets, equip your multiplier companion, and interact with them anywhere!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1 rounded-2xl border-2 border-slate-700">
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('eggs');
            }}
            className={`px-4 py-2 rounded-xl font-blox text-xs sm:text-sm transition-all ${
              activeTab === 'eggs'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🥚 Hatch Eggs
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('pets');
            }}
            className={`px-4 py-2 rounded-xl font-blox text-xs sm:text-sm transition-all ${
              activeTab === 'pets'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🐾 My Pets ({profile.inventoryPets.length})
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('hats');
            }}
            className={`px-4 py-2 rounded-xl font-blox text-xs sm:text-sm transition-all ${
              activeTab === 'hats'
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-zinc-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🧢 Avatar Hats
          </button>
        </div>
      </div>

      {/* TAB 1: Egg Hatching Station */}
      {activeTab === 'eggs' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EGGS.map((egg) => {
            const canAfford = profile.bloxBux >= egg.cost;

            return (
              <div
                key={egg.type}
                className="blox-card p-5 flex flex-col items-center text-center justify-between space-y-3 hover:border-yellow-400 transition-all group"
              >
                <div
                  className={`w-24 h-32 rounded-full bg-gradient-to-tr ${egg.color} border-4 flex flex-col items-center justify-center shadow-xl group-hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  <span className="text-4xl filter drop-shadow">{egg.icon}</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div>
                  <h3 className="font-blox text-xl text-white">{egg.name}</h3>
                  <p className="text-[11px] text-slate-300 mt-1">{egg.description}</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-center gap-1 font-blox text-lg text-yellow-400">
                    <span>R$</span>
                    <span>{egg.cost} Bux</span>
                  </div>
                  <button
                    disabled={!canAfford}
                    onClick={() => handleStartHatch(egg)}
                    className={`w-full py-2.5 rounded-xl font-blox text-sm shadow-lg transition-all ${
                      canAfford
                        ? 'blox-button-green text-white cursor-pointer'
                        : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'HATCH EGG' : 'NEED BUX'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: My Pets Inventory */}
      {activeTab === 'pets' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-slate-300">
              Active Multiplier:{' '}
              <span className="text-yellow-400 font-blox text-sm">
                {profile.inventoryPets.find((p) => p.id === profile.equippedPetId)
                  ?.coinMultiplier || 1.0}
                x Blox Bux
              </span>
            </div>

            {/* Rarity Filter Chips */}
            <div className="flex flex-wrap gap-1">
              {['all', 'common', 'rare', 'epic', 'legendary', 'mythic'].map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => {
                    soundService.playClick();
                    setRarityFilter(rarity);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-blox uppercase transition-all ${
                    rarityFilter === rarity
                      ? 'bg-yellow-400 text-zinc-950 shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredPets.map((pet, idx) => {
              const isEquipped = profile.equippedPetId === pet.id;

              return (
                <div
                  key={`${pet.id}-${idx}`}
                  className={`blox-card p-3 sm:p-4 flex flex-col items-center text-center justify-between relative transition-all ${
                    isEquipped ? 'border-yellow-400 ring-4 ring-yellow-400/40' : ''
                  }`}
                >
                  {isEquipped && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-zinc-950 font-blox text-[10px] px-1.5 py-0.5 rounded-full border border-black shadow">
                      EQUIPPED
                    </span>
                  )}

                  {/* Full-Body Pet Display on Tactile 3D Pedestal Stage (NOT in a box!) */}
                  <div
                    onClick={() => handlePetTouch(pet.id)}
                    className="relative w-full h-24 sm:h-28 flex items-center justify-center my-1 cursor-pointer group/pet"
                    title={`Tap ${pet.name} to see its unique reaction!`}
                  >
                    {/* Themed Pedestal Stage Ring */}
                    <div
                      className={`absolute bottom-1 w-20 sm:w-24 h-6 rounded-full border-2 transition-all group-hover/pet:scale-110 ${
                        pet.rarity === 'mythic'
                          ? 'bg-fuchsia-950/70 border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.5)]'
                          : pet.rarity === 'legendary'
                          ? 'bg-amber-950/70 border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                          : pet.rarity === 'epic'
                          ? 'bg-purple-950/70 border-purple-400'
                          : pet.rarity === 'rare'
                          ? 'bg-cyan-950/70 border-cyan-400'
                          : 'bg-slate-950/70 border-slate-700'
                      }`}
                    />

                    {/* Full-Body Vector SVG Illustration */}
                    <PetSvg
                      petId={pet.id}
                      size="md"
                      isReacting={reactingPetId === pet.id}
                      showGroundShadow={false}
                      className="z-10 group-hover/pet:scale-110 transition-transform"
                    />
                  </div>

                  <div>
                    <h4 className="font-blox text-sm sm:text-base text-white">{pet.name}</h4>
                    <div className="flex items-center justify-center gap-1">
                      <span
                        className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${
                          pet.rarity === 'mythic'
                            ? 'text-fuchsia-300 bg-fuchsia-950'
                            : pet.rarity === 'legendary'
                            ? 'text-yellow-300 bg-yellow-950'
                            : pet.rarity === 'epic'
                            ? 'text-amber-300 bg-amber-950'
                            : pet.rarity === 'rare'
                            ? 'text-cyan-300 bg-cyan-950'
                            : 'text-green-300 bg-green-950'
                        }`}
                      >
                        {pet.rarity}
                      </span>
                      <span className="text-[9px] text-slate-400 flex items-center gap-0.5 cursor-pointer hover:text-yellow-300" onClick={() => handlePetTouch(pet.id)}>
                        <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                        <span>Touch</span>
                      </span>
                    </div>
                    <p className="text-xs text-yellow-300 font-extrabold mt-0.5">
                      {pet.coinMultiplier}x Bux
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundService.playClick();
                      onEquipPet(isEquipped ? null : pet.id);
                    }}
                    className={`w-full mt-2.5 py-1.5 rounded-xl font-blox text-xs shadow transition-all ${
                      isEquipped
                        ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                        : 'blox-button-blue text-white'
                    }`}
                  >
                    {isEquipped ? 'UNEQUIP' : 'EQUIP'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Avatar Hats Catalog */}
      {activeTab === 'hats' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {HAT_CATALOG.map((hat) => {
            const isOwned = profile.inventoryHats.includes(hat.id);
            const isEquipped = profile.avatar.equippedHatId === hat.id;
            const canAfford = profile.bloxBux >= hat.price;

            return (
              <div
                key={hat.id}
                className={`blox-card p-4 flex flex-col items-center text-center justify-between relative transition-all ${
                  isEquipped ? 'border-yellow-400 ring-4 ring-yellow-400/40' : ''
                }`}
              >
                {isEquipped && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-zinc-950 font-blox text-[10px] px-2 py-0.5 rounded-full border border-black shadow">
                    EQUIPPED
                  </span>
                )}

                <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-3xl shadow my-2">
                  {hat.icon}
                </div>

                <div>
                  <h4 className="font-blox text-base text-white">{hat.name}</h4>
                  <div className="text-xs text-yellow-400 font-blox mt-0.5">
                    {isOwned ? 'OWNED' : `R$ ${hat.price} Bux`}
                  </div>
                </div>

                <div className="w-full mt-3">
                  {isOwned ? (
                    <button
                      onClick={() => {
                        soundService.playClick();
                        onEquipHat(hat.id);
                      }}
                      className={`w-full py-1.5 rounded-xl font-blox text-xs shadow transition-all ${
                        isEquipped
                          ? 'bg-slate-700 text-slate-300'
                          : 'blox-button-green text-white'
                      }`}
                    >
                      {isEquipped ? 'EQUIPPED' : 'EQUIP'}
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => {
                        if (onBuyHat(hat)) {
                          soundService.playCoin();
                        } else {
                          soundService.playWrong();
                        }
                      }}
                      className={`w-full py-1.5 rounded-xl font-blox text-xs shadow transition-all ${
                        canAfford
                          ? 'blox-button-yellow text-zinc-950 cursor-pointer'
                          : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      BUY HAT
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dramatic Egg Hatching Overlay Modal */}
      {hatchingState !== 'idle' && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="blox-card p-8 max-w-sm w-full text-center space-y-6 relative border-yellow-400">
            {hatchingState === 'hatching' ? (
              <div className="space-y-4 py-8">
                <div className="text-7xl animate-bounce filter drop-shadow-2xl">
                  🥚
                </div>
                <div className="font-blox text-2xl text-yellow-300 animate-pulse">
                  CRACKING EGG...
                </div>
                <p className="text-xs text-slate-400">What pet will you get?!</p>
              </div>
            ) : (
              hatchedPet && (
                <div className="space-y-4 py-2 animate-in zoom-in-95">
                  <span className="text-xs font-black uppercase text-yellow-400 bg-yellow-950/80 px-3 py-1 rounded-full border border-yellow-500/60">
                    NEW PET UNLOCKED!
                  </span>

                  {/* Full-Body Hatch Reveal on Glowing Pedestal Stage */}
                  <div className="flex flex-col items-center my-3">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <div className="absolute bottom-2 w-32 h-8 rounded-full bg-gradient-to-r from-yellow-500/30 via-amber-400/50 to-yellow-500/30 border-2 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-pulse" />
                      <PetSvg
                        petId={hatchedPet.id}
                        size="2xl"
                        isReacting={true}
                        showGroundShadow={false}
                      />
                    </div>
                    <div className="text-xs text-yellow-300 font-black uppercase tracking-wider mt-1 animate-bounce">
                      * {getPetReactionProfile(hatchedPet.id).actionLabel} *
                    </div>
                  </div>

                  <h3 className="font-blox text-3xl text-white">{hatchedPet.name}</h3>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold uppercase">Pet Bonus:</span>
                    <p className="font-blox text-lg text-yellow-300 mt-0.5">
                      {hatchedPet.coinMultiplier}x Blox Bux on all math problems!
                    </p>
                  </div>

                  <button
                    onClick={closeHatchModal}
                    className="w-full blox-button-green text-white font-blox text-base py-3 rounded-xl shadow-xl"
                  >
                    AWESOME! COLLECT PET!
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
