import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Egg } from 'lucide-react';
import type { UserProfile, Pet, HatGear } from '../types';
import { HAT_CATALOG } from '../services/storage';
import { soundService } from '../services/sound';

interface PetShopProps {
  profile: UserProfile;
  onHatchPet: (eggType: 'common' | 'rare' | 'mythic', cost: number) => Pet | null;
  onEquipPet: (petId: string | null) => void;
  onBuyHat: (hat: HatGear) => boolean;
  onEquipHat: (hatId: string) => void;
}

interface EggConfig {
  type: 'common' | 'rare' | 'mythic';
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
    description: 'Hatch Common & Rare pets (+10% to +35% Blox Bux)',
  },
  {
    type: 'rare',
    name: 'Neon Egg',
    cost: 120,
    icon: '✨',
    color: 'from-cyan-600 to-blue-600 border-cyan-400',
    description: 'High chance of Rare & Epic pets (+35% to +75% Blox Bux)',
  },
  {
    type: 'mythic',
    name: 'Mythic Egg',
    cost: 250,
    icon: '🔮',
    color: 'from-purple-600 via-fuchsia-600 to-pink-600 border-yellow-300',
    description: 'Chance at Cosmic Unicorn & Sun Phoenix (Up to 2.2x Blox Bux!)',
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
          particleCount: 120,
          spread: 80,
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
            Spend your hard-earned Blox Bux to hatch multiplier pets and style your avatar with epic gear!
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EGGS.map((egg) => {
            const canAfford = profile.bloxBux >= egg.cost;

            return (
              <div
                key={egg.type}
                className="blox-card p-6 flex flex-col items-center text-center justify-between space-y-4 hover:border-yellow-400 transition-all group"
              >
                <div
                  className={`w-28 h-36 rounded-full bg-gradient-to-tr ${egg.color} border-4 flex flex-col items-center justify-center shadow-xl group-hover:scale-105 transition-transform relative overflow-hidden`}
                >
                  <span className="text-5xl filter drop-shadow">{egg.icon}</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div>
                  <h3 className="font-blox text-2xl text-white">{egg.name}</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs">{egg.description}</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center justify-center gap-1.5 font-blox text-xl text-yellow-400">
                    <span>R$</span>
                    <span>{egg.cost} Bux</span>
                  </div>
                  <button
                    disabled={!canAfford}
                    onClick={() => handleStartHatch(egg)}
                    className={`w-full py-3 rounded-xl font-blox text-base shadow-lg transition-all ${
                      canAfford
                        ? 'blox-button-green text-white cursor-pointer'
                        : 'bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'HATCH EGG' : 'NEED MORE BUX'}
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
          <div className="text-sm font-bold text-slate-300 flex items-center justify-between">
            <span>Tap any pet to equip it as your multiplier companion!</span>
            <span className="text-yellow-400">
              Active Multiplier:{' '}
              {profile.inventoryPets.find((p) => p.id === profile.equippedPetId)
                ?.coinMultiplier || 1.0}
              x
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {profile.inventoryPets.map((pet, idx) => {
              const isEquipped = profile.equippedPetId === pet.id;

              return (
                <div
                  key={`${pet.id}-${idx}`}
                  className={`blox-card p-4 flex flex-col items-center text-center justify-between relative transition-all ${
                    isEquipped ? 'border-yellow-400 ring-4 ring-yellow-400/40' : ''
                  }`}
                >
                  {isEquipped && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-zinc-950 font-blox text-[10px] px-2 py-0.5 rounded-full border border-black shadow">
                      EQUIPPED
                    </span>
                  )}

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white/60 my-2 ${
                      pet.rarity === 'mythic'
                        ? 'bg-gradient-to-tr from-fuchsia-500 to-pink-500 ring-2 ring-yellow-300'
                        : pet.rarity === 'epic'
                        ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 ring-2 ring-amber-300'
                        : pet.rarity === 'rare'
                        ? 'bg-gradient-to-tr from-cyan-400 to-blue-500'
                        : 'bg-gradient-to-tr from-green-400 to-emerald-500'
                    }`}
                  >
                    {pet.icon}
                  </div>

                  <div>
                    <h4 className="font-blox text-base text-white">{pet.name}</h4>
                    <span
                      className={`text-[10px] uppercase font-black px-1.5 py-0.5 rounded ${
                        pet.rarity === 'mythic'
                          ? 'text-fuchsia-300 bg-fuchsia-950'
                          : pet.rarity === 'epic'
                          ? 'text-amber-300 bg-amber-950'
                          : pet.rarity === 'rare'
                          ? 'text-cyan-300 bg-cyan-950'
                          : 'text-green-300 bg-green-950'
                      }`}
                    >
                      {pet.rarity}
                    </span>
                    <p className="text-xs text-yellow-300 font-extrabold mt-1">
                      {pet.coinMultiplier}x Blox Bux
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundService.playClick();
                      onEquipPet(isEquipped ? null : pet.id);
                    }}
                    className={`w-full mt-3 py-1.5 rounded-xl font-blox text-xs shadow transition-all ${
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

                  <div className="flex justify-center my-4">
                    <div
                      className={`w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-2xl border-4 border-white animate-bounce ${
                        hatchedPet.rarity === 'mythic'
                          ? 'bg-gradient-to-tr from-fuchsia-500 to-pink-500 ring-4 ring-yellow-400'
                          : hatchedPet.rarity === 'epic'
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 ring-4 ring-amber-300'
                          : hatchedPet.rarity === 'rare'
                          ? 'bg-gradient-to-tr from-cyan-400 to-blue-500'
                          : 'bg-gradient-to-tr from-green-400 to-emerald-500'
                      }`}
                    >
                      {hatchedPet.icon}
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
