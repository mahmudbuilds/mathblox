import React, { useState } from 'react';
import { X, Check, User, Palette, Keyboard, Trash2 } from 'lucide-react';
import type { UserProfile } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { soundService } from '../services/sound';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveAvatar: (newAvatar: UserProfile['avatar'], newUsername: string, newInputMode: 'multiple-choice' | 'keypad') => void;
  onResetData: () => void;
}

const SKIN_COLORS = [
  { name: 'Classic Yellow', hex: '#FEE12B' },
  { name: 'Peach', hex: '#F5D0A9' },
  { name: 'Tan', hex: '#C68642' },
  { name: 'Cocoa', hex: '#8D5524' },
  { name: 'Neon Cyan', hex: '#00E5FF' },
  { name: 'Alien Green', hex: '#69F0AE' },
];

const SHIRT_COLORS = [
  { name: 'Classic Cyan', hex: '#00A2FF' },
  { name: 'Crimson Red', hex: '#E11D48' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Gold', hex: '#F59E0B' },
  { name: 'Stealth Black', hex: '#18181B' },
];

const PANTS_COLORS = [
  { name: 'Classic Green', hex: '#27AE60' },
  { name: 'Jeans Blue', hex: '#2563EB' },
  { name: 'Dark Slate', hex: '#1E293B' },
  { name: 'Bright White', hex: '#F8FAFC' },
  { name: 'Khaki Gold', hex: '#D97706' },
];

const FACES: { id: UserProfile['avatar']['faceExpression']; label: string; icon: string }[] = [
  { id: 'happy', label: 'Happy', icon: '😄' },
  { id: 'cool', label: 'Cool', icon: '😎' },
  { id: 'wink', label: 'Wink', icon: '😉' },
  { id: 'star-eyes', label: 'Star Eyes', icon: '🤩' },
  { id: 'silly', label: 'Silly', icon: '😜' },
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveAvatar,
  onResetData,
}) => {
  const [username, setUsername] = useState<string>(profile.username);
  const [avatar, setAvatar] = useState<UserProfile['avatar']>({ ...profile.avatar });
  const [inputMode, setInputMode] = useState<'multiple-choice' | 'keypad'>(profile.inputMode);

  if (!isOpen) return null;

  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);

  const handleSave = () => {
    soundService.playCorrect();
    onSaveAvatar(avatar, username.trim() || 'SuperBloxer', inputMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="blox-card w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-indigo-500/60">
        {/* Header */}
        <div className="p-4 border-b-2 border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h3 className="font-blox text-xl text-yellow-300">
              Customize Your Bloxer
            </h3>
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Avatar Preview Card */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center relative">
            <AvatarDisplay
              avatar={avatar}
              equippedPet={equippedPet}
              size="lg"
              showPet={true}
              animate={true}
            />
            <div className="mt-4 font-blox text-lg text-white">
              {username || 'Bloxer'}
            </div>
          </div>

          {/* Player Gamer Tag */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-400" /> Your Roblox Gamer Name:
            </label>
            <input
              type="text"
              maxLength={15}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-3 py-2 text-white font-blox text-base focus:border-yellow-400 outline-none"
              placeholder="e.g. MathBloxer99"
            />
          </div>

          {/* Skin Colors */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Skin Color:</label>
            <div className="flex flex-wrap gap-2">
              {SKIN_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    soundService.playClick();
                    setAvatar((prev) => ({ ...prev, skinColor: c.hex }));
                  }}
                  className={`w-9 h-9 rounded-xl border-3 transition-transform ${
                    avatar.skinColor === c.hex
                      ? 'border-white scale-110 shadow-lg ring-2 ring-yellow-400'
                      : 'border-slate-800 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Shirt Colors */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Shirt Color:</label>
            <div className="flex flex-wrap gap-2">
              {SHIRT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    soundService.playClick();
                    setAvatar((prev) => ({ ...prev, shirtColor: c.hex }));
                  }}
                  className={`w-9 h-9 rounded-xl border-3 transition-transform ${
                    avatar.shirtColor === c.hex
                      ? 'border-white scale-110 shadow-lg ring-2 ring-yellow-400'
                      : 'border-slate-800 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Pants Colors */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Pants Color:</label>
            <div className="flex flex-wrap gap-2">
              {PANTS_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => {
                    soundService.playClick();
                    setAvatar((prev) => ({ ...prev, pantsColor: c.hex }));
                  }}
                  className={`w-9 h-9 rounded-xl border-3 transition-transform ${
                    avatar.pantsColor === c.hex
                      ? 'border-white scale-110 shadow-lg ring-2 ring-yellow-400'
                      : 'border-slate-800 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Facial Expressions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Face Expression:</label>
            <div className="flex flex-wrap gap-2">
              {FACES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    soundService.playClick();
                    setAvatar((prev) => ({ ...prev, faceExpression: f.id }));
                  }}
                  className={`px-3 py-1.5 rounded-xl border-2 font-blox text-xs flex items-center gap-1.5 transition-all ${
                    avatar.faceExpression === f.id
                      ? 'bg-yellow-400 text-zinc-950 border-yellow-200 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Practice Input Mode preference */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-purple-400" /> Math Answering Style:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundService.playClick();
                  setInputMode('multiple-choice');
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  inputMode === 'multiple-choice'
                    ? 'bg-indigo-600/40 border-indigo-400 text-white shadow'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-blox text-sm">4 Blox Buttons</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Multiple Choice</div>
              </button>
              <button
                onClick={() => {
                  soundService.playClick();
                  setInputMode('keypad');
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  inputMode === 'keypad'
                    ? 'bg-indigo-600/40 border-indigo-400 text-white shadow'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-blox text-sm">Big Keypad</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Type Numbers (0-9)</div>
              </button>
            </div>
          </div>

          {/* Reset data */}
          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all game data and progress?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t-2 border-slate-800 bg-slate-900 flex justify-end gap-3">
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-blox text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="blox-button-green text-white font-blox text-sm px-6 py-2 rounded-xl shadow-lg flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};
