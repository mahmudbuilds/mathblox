import React, { useEffect } from 'react';
import {
  X,
  Home,
  GraduationCap,
  LayoutGrid,
  Target,
  Flame,
  Skull,
  Egg,
  Award,
  User,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import type { UserProfile, GameView } from '../types';
import { PetSvg } from './PetSvg';
import { soundService } from '../services/sound';
import { getPetReactionProfile } from '../services/petReactions';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: GameView;
  onSelectView: (view: GameView) => void;
  profile: UserProfile;
  onOpenAvatarModal: () => void;
  onToggleSound: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onSelectView,
  profile,
  onOpenAvatarModal,
  onToggleSound,
}) => {
  const [petReactionActive, setPetReactionActive] = React.useState(false);
  const [petReactionMessage, setPetReactionMessage] = React.useState<string | null>(null);

  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (view: GameView) => {
    soundService.playClick();
    onSelectView(view);
    onClose();
  };

  const handlePetSidebarTouch = () => {
    if (!equippedPet) return;
    const reaction = getPetReactionProfile(equippedPet.id);
    reaction.triggerSound();
    setPetReactionActive(true);

    const randomMsg = reaction.dialogues[Math.floor(Math.random() * reaction.dialogues.length)];
    setPetReactionMessage(randomMsg);

    setTimeout(() => setPetReactionActive(false), 800);
    setTimeout(() => setPetReactionMessage(null), 3500);
  };

  // Calculate statistics
  const totalStars = Object.values(profile.tablesProgress).reduce(
    (acc, curr) => acc + (curr.stars || 0),
    0
  );
  const completedCourseTables = profile.courseCompletedTables.length;
  const unlockedBadges = profile.achievements.filter((a) => a.unlocked).length;

  const navGroups = [
    {
      title: 'Math Arenas & Learning',
      items: [
        {
          id: 'home' as GameView,
          label: 'Home Lobby',
          icon: <Home className="w-5 h-5 text-sky-400" />,
          badge: 'Hub',
        },
        {
          id: 'course' as GameView,
          label: 'Academy Course',
          icon: <GraduationCap className="w-5 h-5 text-yellow-400" />,
          badge: `${completedCourseTables}/12 Passed`,
        },
        {
          id: 'study-grid' as GameView,
          label: '12x12 Matrix Grid',
          icon: <LayoutGrid className="w-5 h-5 text-emerald-400" />,
          badge: 'Visualizer',
        },
        {
          id: 'practice' as GameView,
          label: 'Table Practice',
          icon: <Target className="w-5 h-5 text-purple-400" />,
          badge: `${totalStars}/36 ⭐`,
        },
        {
          id: 'obby' as GameView,
          label: 'Lava Obby Run',
          icon: <Flame className="w-5 h-5 text-amber-400" />,
          badge: '150 Bux',
        },
        {
          id: 'boss' as GameView,
          label: 'Glitch Boss Battle',
          icon: <Skull className="w-5 h-5 text-rose-400" />,
          badge: '200 Bux',
        },
      ],
    },
    {
      title: 'Shop & Collectibles',
      items: [
        {
          id: 'shop' as GameView,
          label: 'Pet & Gear Shop',
          icon: <Egg className="w-5 h-5 text-pink-400" />,
          badge: `${profile.inventoryPets.length} Pets`,
        },
        {
          id: 'achievements' as GameView,
          label: 'Badges & Trophies',
          icon: <Award className="w-5 h-5 text-yellow-400" />,
          badge: `${unlockedBadges}/10`,
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Sidebar Drawer Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-slate-900 border-r-4 border-slate-800 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200 overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950/90 border-b-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md border border-white/20">
              <span className="font-blox text-lg font-black">✖</span>
            </div>
            <div>
              <h3 className="font-blox text-lg text-yellow-300 leading-tight">MATHBLOX</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Quick Access Drawer
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {/* Active Equipped Pet Quick Companion Card */}
          {equippedPet && (
            <div
              onClick={handlePetSidebarTouch}
              className="blox-card p-3 bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500/50 hover:border-yellow-400 cursor-pointer transition-all group relative overflow-hidden"
              title="Click to interact with your pet!"
            >
              <div className="flex items-center gap-3">
                {/* Full-Body Pet SVG standing freely */}
                <div className="relative flex items-center justify-center w-16 h-16 shrink-0 group-hover:scale-105 transition-transform">
                  <PetSvg
                    petId={equippedPet.id}
                    size="md"
                    isReacting={petReactionActive}
                    showGroundShadow={true}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                      Companion
                    </span>
                    <span className="font-blox text-xs text-yellow-300 bg-yellow-950/80 px-2 py-0.5 rounded-full border border-yellow-500/40">
                      {equippedPet.coinMultiplier}x Bux
                    </span>
                  </div>
                  <h4 className="font-blox text-base text-white truncate">{equippedPet.name}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>Tap to pet & react!</span>
                  </p>
                </div>
              </div>

              {/* Pet Speech Reaction Bubble in Sidebar */}
              {petReactionMessage && (
                <div className="mt-2.5 bg-slate-950/95 border border-yellow-400/80 p-2 rounded-xl text-[11px] font-bold text-yellow-200 leading-snug animate-in fade-in slide-in-from-top-1">
                  {petReactionMessage}
                </div>
              )}
            </div>
          )}

          {/* User Quick Stats Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-blox flex items-center justify-center text-xs shadow">
                {profile.level}
              </div>
              <div>
                <div className="font-blox text-white text-xs">LVL {profile.level} Bloxer</div>
                <div className="text-[10px] text-slate-400">{profile.xp} XP</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-xl">
              <span className="w-4 h-4 rounded-full bg-amber-400 text-zinc-950 font-black text-[9px] flex items-center justify-center">
                R$
              </span>
              <span className="font-blox text-xs text-yellow-400">{profile.bloxBux}</span>
            </div>
          </div>

          {/* Navigation Links by Group */}
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <h5 className="text-[10px] font-black uppercase text-slate-500 tracking-wider px-2">
                {group.title}
              </h5>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-blox text-xs transition-all text-left group ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md border-b-2 border-indigo-900'
                          : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span className="tracking-wide">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Avatar Customizer Action */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                soundService.playClick();
                onOpenAvatarModal();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/40 hover:border-purple-400 text-slate-200 hover:text-white font-blox text-xs transition-all group"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Customize Roblox Avatar</span>
              </div>
              <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Drawer Footer: Settings & Sound */}
        <div className="p-3 bg-slate-950/90 border-t-2 border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              soundService.playClick();
              onToggleSound();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
          >
            {profile.soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span>Sound: OFF</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};
