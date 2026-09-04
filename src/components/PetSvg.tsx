import React from 'react';
import { getPetReactionProfile } from '../services/petReactions';

export interface PetSvgProps {
  petId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isReacting?: boolean;
  showGroundShadow?: boolean;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP: Record<string, { w: string; h: string }> = {
  xs: { w: 'w-9', h: 'h-9' },
  sm: { w: 'w-12', h: 'h-12' },
  md: { w: 'w-16', h: 'h-16' },
  lg: { w: 'w-24', h: 'h-24' },
  xl: { w: 'w-32', h: 'h-32' },
  '2xl': { w: 'w-40', h: 'h-40' },
};

export const PetSvg: React.FC<PetSvgProps> = ({
  petId,
  size = 'md',
  isReacting = false,
  showGroundShadow = true,
  className = '',
  onClick,
}) => {
  const profile = getPetReactionProfile(petId);
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  const renderPetBody = () => {
    switch (petId) {
      // 1. Blox Doge
      case 'starter-doge':
        return (
          <g id="doge">
            {/* Tail */}
            <path d="M 28 72 Q 16 62 20 50 Q 28 54 30 68 Z" fill="#d97706" />
            <circle cx="20" cy="50" r="4.5" fill="#fef08a" />
            {/* Back Legs */}
            <rect x="36" y="86" width="10" height="18" rx="4" fill="#b45309" />
            <rect x="74" y="86" width="10" height="18" rx="4" fill="#b45309" />
            {/* Body */}
            <rect x="32" y="58" width="56" height="34" rx="10" fill="#f59e0b" />
            <path d="M 44 64 Q 60 76 76 64 L 74 90 Q 60 92 46 90 Z" fill="#fef08a" />
            {/* Front Legs */}
            <rect x="42" y="88" width="10" height="18" rx="4" fill="#d97706" />
            <rect x="68" y="88" width="10" height="18" rx="4" fill="#d97706" />
            {/* Paws */}
            <ellipse cx="47" cy="105" rx="6" ry="3" fill="#fef08a" />
            <ellipse cx="73" cy="105" rx="6" ry="3" fill="#fef08a" />
            {/* Collar with gold tag */}
            <rect x="42" y="52" width="36" height="7" rx="3" fill="#ef4444" />
            <circle cx="60" cy="59" r="4.5" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
            {/* Head */}
            <rect x="38" y="24" width="44" height="34" rx="10" fill="#f59e0b" />
            <path d="M 48 38 Q 60 48 72 38 L 70 56 Q 60 58 50 56 Z" fill="#fef08a" />
            {/* Ears */}
            <polygon points="40,26 32,8 50,22" fill="#b45309" />
            <polygon points="41,24 35,12 48,22" fill="#fef08a" />
            <polygon points="80,26 88,8 70,22" fill="#b45309" />
            <polygon points="79,24 85,12 72,22" fill="#fef08a" />
            {/* Eyes */}
            <ellipse cx="50" cy="38" rx="3.5" ry="4" fill="#1e1b4b" />
            <circle cx="49" cy="36" r="1.3" fill="#ffffff" />
            <ellipse cx="70" cy="38" rx="3.5" ry="4" fill="#1e1b4b" />
            <circle cx="69" cy="36" r="1.3" fill="#ffffff" />
            {/* Snout & Nose */}
            <ellipse cx="60" cy="46" rx="3" ry="2.2" fill="#1e1b4b" />
            <path d="M 58 48 Q 60 51 62 48" stroke="#1e1b4b" strokeWidth="1.5" fill="none" />
            {/* Cheeks */}
            <circle cx="44" cy="42" r="3" fill="#fca5a5" opacity="0.6" />
            <circle cx="76" cy="42" r="3" fill="#fca5a5" opacity="0.6" />
          </g>
        );

      // 2. Pixel Kitty
      case 'pixel-cat':
        return (
          <g id="kitty">
            {/* Curled Tail */}
            <path d="M 84 78 Q 104 68 98 48 Q 90 48 94 62 Q 88 74 80 78" fill="#ea580c" />
            {/* Back Legs */}
            <rect x="36" y="86" width="9" height="18" rx="4" fill="#c2410c" />
            <rect x="75" y="86" width="9" height="18" rx="4" fill="#c2410c" />
            {/* Body */}
            <rect x="34" y="60" width="52" height="32" rx="10" fill="#fb923c" />
            {/* Tabby stripes */}
            <path d="M 44 60 L 46 72 M 58 60 L 60 74 M 72 60 L 74 72" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
            <path d="M 46 66 Q 60 76 74 66 L 72 88 Q 60 90 48 88 Z" fill="#fff7ed" />
            {/* Front Legs */}
            <rect x="42" y="88" width="9" height="18" rx="4" fill="#fb923c" />
            <rect x="69" y="88" width="9" height="18" rx="4" fill="#fb923c" />
            {/* Paws */}
            <ellipse cx="46.5" cy="105" rx="5.5" ry="3" fill="#fff7ed" />
            <ellipse cx="73.5" cy="105" rx="5.5" ry="3" fill="#fff7ed" />
            {/* Head */}
            <rect x="38" y="26" width="44" height="34" rx="10" fill="#fb923c" />
            {/* Tabby Forehead Stripes */}
            <path d="M 60 27 L 60 35 M 54 28 L 56 34 M 66 28 L 64 34" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
            {/* Pointy Ears */}
            <polygon points="40,28 32,10 52,24" fill="#ea580c" />
            <polygon points="42,26 36,15 50,23" fill="#fecdd3" />
            <polygon points="80,28 88,10 68,24" fill="#ea580c" />
            <polygon points="78,26 84,15 70,23" fill="#fecdd3" />
            {/* Eyes */}
            <ellipse cx="49" cy="40" rx="3.5" ry="4" fill="#15803d" />
            <ellipse cx="49" cy="40" rx="1.5" ry="3" fill="#052e16" />
            <circle cx="48" cy="38" r="1.2" fill="#ffffff" />
            <ellipse cx="71" cy="40" rx="3.5" ry="4" fill="#15803d" />
            <ellipse cx="71" cy="40" rx="1.5" ry="3" fill="#052e16" />
            <circle cx="70" cy="38" r="1.2" fill="#ffffff" />
            {/* Pink Nose & Whiskers */}
            <polygon points="60,46 57,43 63,43" fill="#f43f5e" />
            <path d="M 57 46 Q 60 49 63 46" stroke="#c2410c" strokeWidth="1.5" fill="none" />
            <line x1="30" y1="42" x2="42" y2="44" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="29" y1="48" x2="42" y2="47" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="90" y1="42" x2="78" y2="44" stroke="#fed7aa" strokeWidth="1.5" />
            <line x1="91" y1="48" x2="78" y2="47" stroke="#fed7aa" strokeWidth="1.5" />
          </g>
        );

      // 3. Blocky Piggy
      case 'chunky-piggy':
        return (
          <g id="piggy">
            {/* Curly Tail */}
            <path d="M 28 72 Q 18 68 20 60 Q 26 58 24 68" stroke="#f472b6" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Legs & Trotters */}
            <rect x="36" y="88" width="10" height="16" rx="4" fill="#f472b6" />
            <rect x="74" y="88" width="10" height="16" rx="4" fill="#f472b6" />
            <rect x="46" y="90" width="10" height="15" rx="4" fill="#fb7185" />
            <rect x="64" y="90" width="10" height="15" rx="4" fill="#fb7185" />
            {/* Trotter hooves */}
            <rect x="46" y="101" width="10" height="4" rx="1" fill="#be185d" />
            <rect x="64" y="101" width="10" height="4" rx="1" fill="#be185d" />
            {/* Body */}
            <rect x="30" y="56" width="60" height="38" rx="12" fill="#f472b6" />
            {/* Head */}
            <rect x="36" y="24" width="48" height="38" rx="12" fill="#f472b6" />
            {/* Ears */}
            <polygon points="38,26 28,18 42,20" fill="#db2777" />
            <polygon points="82,26 92,18 78,20" fill="#db2777" />
            {/* Big Piggy Snout */}
            <rect x="50" y="38" width="20" height="15" rx="6" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            <ellipse cx="56" cy="45" rx="2.2" ry="3.5" fill="#9d174d" />
            <ellipse cx="64" cy="45" rx="2.2" ry="3.5" fill="#9d174d" />
            {/* Eyes */}
            <circle cx="48" cy="34" r="3.5" fill="#1e1b4b" />
            <circle cx="47" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="72" cy="34" r="3.5" fill="#1e1b4b" />
            <circle cx="71" cy="33" r="1.2" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="43" cy="45" r="4" fill="#fda4af" opacity="0.8" />
            <circle cx="77" cy="45" r="4" fill="#fda4af" opacity="0.8" />
          </g>
        );

      // 4. Bouncing Bunny
      case 'tiny-bunny':
        return (
          <g id="bunny">
            {/* Fluffy Tail */}
            <circle cx="28" cy="78" r="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            {/* Body */}
            <rect x="34" y="60" width="52" height="34" rx="14" fill="#f8fafc" />
            <ellipse cx="60" cy="77" rx="16" ry="12" fill="#f1f5f9" />
            {/* Back Paws */}
            <ellipse cx="36" cy="98" rx="10" ry="6" fill="#e2e8f0" />
            {/* Front Paws */}
            <ellipse cx="52" cy="98" rx="6" ry="7" fill="#f8fafc" />
            <ellipse cx="68" cy="98" rx="6" ry="7" fill="#f8fafc" />
            {/* Head */}
            <rect x="40" y="34" width="40" height="32" rx="12" fill="#f8fafc" />
            {/* Long Ears */}
            <rect x="42" y="8" width="10" height="28" rx="5" fill="#f8fafc" />
            <rect x="44" y="12" width="6" height="22" rx="3" fill="#fbcfe8" />
            <rect x="68" y="8" width="10" height="28" rx="5" fill="#f8fafc" />
            <rect x="70" y="12" width="6" height="22" rx="3" fill="#fbcfe8" />
            {/* Eyes */}
            <ellipse cx="49" cy="46" rx="3" ry="4" fill="#db2777" />
            <circle cx="48" cy="44" r="1.2" fill="#ffffff" />
            <ellipse cx="71" cy="46" rx="3" ry="4" fill="#db2777" />
            <circle cx="70" cy="44" r="1.2" fill="#ffffff" />
            {/* Pink Nose & Mouth */}
            <polygon points="60,52 57,49 63,49" fill="#f43f5e" />
            <path d="M 57 53 Q 60 56 63 53" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            {/* Whiskers */}
            <line x1="32" y1="50" x2="43" y2="51" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="88" y1="50" x2="77" y2="51" stroke="#cbd5e1" strokeWidth="1.2" />
          </g>
        );

      // 5. Cuddle Bear
      case 'baby-bear':
        return (
          <g id="bear">
            {/* Small tail */}
            <circle cx="28" cy="74" r="5" fill="#92400e" />
            {/* Body */}
            <rect x="32" y="56" width="56" height="38" rx="14" fill="#b45309" />
            <ellipse cx="60" cy="75" rx="18" ry="14" fill="#fde68a" />
            {/* Honey emblem */}
            <path d="M 56 70 Q 60 74 64 70 Q 64 77 60 80 Q 56 77 56 70 Z" fill="#d97706" />
            {/* Back Legs */}
            <rect x="34" y="88" width="12" height="16" rx="5" fill="#78350f" />
            <rect x="74" y="88" width="12" height="16" rx="5" fill="#78350f" />
            {/* Front Paws */}
            <rect x="44" y="90" width="11" height="16" rx="5" fill="#92400e" />
            <rect x="65" y="90" width="11" height="16" rx="5" fill="#92400e" />
            <circle cx="49.5" cy="103" r="3" fill="#fde68a" />
            <circle cx="70.5" cy="103" r="3" fill="#fde68a" />
            {/* Head */}
            <rect x="38" y="24" width="44" height="36" rx="12" fill="#b45309" />
            {/* Rounded Ears */}
            <circle cx="40" cy="22" r="9" fill="#b45309" />
            <circle cx="40" cy="22" r="5" fill="#fde68a" />
            <circle cx="80" cy="22" r="9" fill="#b45309" />
            <circle cx="80" cy="22" r="5" fill="#fde68a" />
            {/* Muzzle */}
            <ellipse cx="60" cy="46" rx="12" ry="9" fill="#fde68a" />
            <ellipse cx="60" cy="42" rx="4.5" ry="3" fill="#451a03" />
            <path d="M 58 45 Q 60 48 62 45" stroke="#451a03" strokeWidth="1.5" fill="none" />
            {/* Eyes */}
            <circle cx="50" cy="35" r="3.5" fill="#451a03" />
            <circle cx="49" cy="34" r="1.2" fill="#ffffff" />
            <circle cx="70" cy="35" r="3.5" fill="#451a03" />
            <circle cx="69" cy="34" r="1.2" fill="#ffffff" />
          </g>
        );

      // 6. Yellow Duck
      case 'yellow-duck':
        return (
          <g id="duck">
            {/* Tail feathers */}
            <polygon points="26,66 36,60 34,74" fill="#eab308" />
            {/* Webbed Feet */}
            <path d="M 44 96 L 40 106 L 54 106 L 50 96" fill="#f97316" />
            <path d="M 68 96 L 64 106 L 78 106 L 74 96" fill="#f97316" />
            {/* Body */}
            <rect x="32" y="54" width="56" height="38" rx="16" fill="#facc15" />
            {/* Wings */}
            <rect x="42" y="60" width="22" height="18" rx="8" fill="#eab308" />
            {/* Head */}
            <circle cx="68" cy="36" r="18" fill="#facc15" />
            {/* Big Orange Bill */}
            <path d="M 80 34 Q 96 36 94 44 Q 84 46 80 42 Z" fill="#f97316" />
            {/* Eye */}
            <circle cx="74" cy="32" r="4" fill="#0f172a" />
            <circle cx="72.5" cy="30.5" r="1.5" fill="#ffffff" />
            {/* Cute Cheeks */}
            <circle cx="72" cy="40" r="3" fill="#f87171" opacity="0.6" />
          </g>
        );

      // 7. Dino Rex
      case 'green-dino':
        return (
          <g id="dino">
            {/* Heavy Dino Tail */}
            <path d="M 36 68 Q 12 72 8 86 Q 22 84 34 82 Z" fill="#15803d" />
            <polygon points="18,74 14,70 22,72" fill="#84cc16" />
            <polygon points="26,70 22,64 30,68" fill="#84cc16" />
            {/* Back Plates */}
            <polygon points="40,32 44,22 48,34" fill="#84cc16" />
            <polygon points="50,30 55,18 60,32" fill="#84cc16" />
            <polygon points="36,54 30,46 38,58" fill="#84cc16" />
            {/* Strong Legs */}
            <rect x="36" y="80" width="14" height="24" rx="6" fill="#166534" />
            <rect x="68" y="80" width="14" height="24" rx="6" fill="#166534" />
            {/* Claws */}
            <polygon points="34,104 38,98 42,104" fill="#fef08a" />
            <polygon points="44,104 48,98 52,104" fill="#fef08a" />
            <polygon points="66,104 70,98 74,104" fill="#fef08a" />
            <polygon points="76,104 80,98 84,104" fill="#fef08a" />
            {/* Chunky Body */}
            <rect x="34" y="48" width="52" height="42" rx="14" fill="#22c55e" />
            <path d="M 50 56 Q 66 66 74 56 L 70 86 Q 60 88 50 86 Z" fill="#bbf7d0" />
            {/* Tiny T-Rex Arms */}
            <rect x="64" y="62" width="12" height="7" rx="3" fill="#16a34a" />
            <polygon points="76,62 79,65 76,68" fill="#fef08a" />
            {/* Big Head & Jaw */}
            <rect x="48" y="18" width="46" height="34" rx="8" fill="#22c55e" />
            {/* Toothy Smile */}
            <polygon points="72,44 75,48 78,44" fill="#ffffff" />
            <polygon points="80,44 83,48 86,44" fill="#ffffff" />
            {/* Sharp Eyes */}
            <ellipse cx="64" cy="28" rx="4" ry="4.5" fill="#facc15" />
            <rect x="63" y="25" width="2" height="6" fill="#15803d" />
            <circle cx="62" cy="26" r="1.2" fill="#ffffff" />
          </g>
        );

      // 8. Blox Cow
      case 'mini-cow':
        return (
          <g id="cow">
            {/* Tail with tuft */}
            <path d="M 28 66 Q 16 70 18 84" stroke="#475569" strokeWidth="2.5" fill="none" />
            <circle cx="18" cy="85" r="4" fill="#0f172a" />
            {/* Legs with black hooves */}
            <rect x="36" y="86" width="10" height="18" rx="4" fill="#e2e8f0" />
            <rect x="74" y="86" width="10" height="18" rx="4" fill="#e2e8f0" />
            <rect x="46" y="88" width="10" height="16" rx="4" fill="#cbd5e1" />
            <rect x="64" y="88" width="10" height="16" rx="4" fill="#cbd5e1" />
            <rect x="46" y="100" width="10" height="4" rx="1" fill="#0f172a" />
            <rect x="64" y="100" width="10" height="4" rx="1" fill="#0f172a" />
            {/* Cow Body with Spots */}
            <rect x="30" y="56" width="60" height="38" rx="12" fill="#f8fafc" />
            {/* Spots */}
            <circle cx="44" cy="68" r="8" fill="#1e293b" />
            <circle cx="76" cy="64" r="7" fill="#1e293b" />
            <circle cx="62" cy="84" r="6" fill="#1e293b" />
            {/* Golden Cowbell */}
            <polygon points="56,54 64,54 66,64 54,64" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="60" cy="64" r="2" fill="#854d0e" />
            {/* Head */}
            <rect x="38" y="24" width="44" height="34" rx="10" fill="#f8fafc" />
            <path d="M 38 24 L 52 24 L 46 36 L 38 34 Z" fill="#1e293b" />
            {/* Horns */}
            <polygon points="40,24 34,14 44,20" fill="#fef08a" />
            <polygon points="80,24 86,14 76,20" fill="#fef08a" />
            {/* Ears */}
            <polygon points="36,28 26,30 36,36" fill="#f8fafc" />
            <polygon points="84,28 94,30 84,36" fill="#f8fafc" />
            {/* Pink Muzzle */}
            <rect x="48" y="42" width="24" height="15" rx="6" fill="#fbcfe8" />
            <ellipse cx="54" cy="50" rx="2" ry="3" fill="#be185d" />
            <ellipse cx="66" cy="50" rx="2" ry="3" fill="#be185d" />
            {/* Eyes */}
            <circle cx="50" cy="34" r="3.5" fill="#0f172a" />
            <circle cx="49" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="70" cy="34" r="3.5" fill="#0f172a" />
            <circle cx="69" cy="33" r="1.2" fill="#ffffff" />
          </g>
        );

      // 9. Neon Bunny (Cyber Bunny)
      case 'cyber-bunny':
        return (
          <g id="cyber-bunny">
            {/* Cyber Thruster Tail */}
            <rect x="22" y="70" width="10" height="12" rx="3" fill="#0284c7" />
            <polygon points="22,72 12,76 22,80" fill="#38bdf8" />
            {/* Robotic Body */}
            <rect x="32" y="56" width="56" height="36" rx="10" fill="#0891b2" />
            <rect x="38" y="62" width="44" height="24" rx="6" fill="#0e7490" />
            <line x1="42" y1="74" x2="78" y2="74" stroke="#22d3ee" strokeWidth="2" />
            {/* Tech Paws */}
            <rect x="40" y="88" width="12" height="16" rx="4" fill="#0284c7" />
            <rect x="68" y="88" width="12" height="16" rx="4" fill="#0284c7" />
            <circle cx="46" cy="98" r="2.5" fill="#22d3ee" />
            <circle cx="74" cy="98" r="2.5" fill="#22d3ee" />
            {/* Cyber Ears / Antennas */}
            <polygon points="42,26 36,4 48,18" fill="#0284c7" />
            <line x1="39" y1="8" x2="45" y2="18" stroke="#22d3ee" strokeWidth="2" />
            <polygon points="78,26 84,4 72,18" fill="#0284c7" />
            <line x1="81" y1="8" x2="75" y2="18" stroke="#22d3ee" strokeWidth="2" />
            {/* Head */}
            <rect x="36" y="24" width="48" height="34" rx="10" fill="#06b6d4" />
            {/* Neon Cyber Visor */}
            <rect x="42" y="32" width="36" height="12" rx="4" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
            <rect x="46" y="35" width="28" height="6" rx="2" fill="#22d3ee" />
            <circle cx="52" cy="38" r="1.5" fill="#ffffff" />
            <circle cx="68" cy="38" r="1.5" fill="#ffffff" />
          </g>
        );

      // 10. Robo Cheetah
      case 'speedy-cheetah':
        return (
          <g id="cheetah">
            {/* Booster Tail */}
            <path d="M 28 66 Q 10 60 14 42" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            <polygon points="14,42 8,36 18,34" fill="#f59e0b" />
            {/* Sleek Aerodynamic Body */}
            <polygon points="28,74 44,56 86,60 76,86 36,88" fill="#f59e0b" />
            {/* Tech spots / decals */}
            <circle cx="48" cy="68" r="3.5" fill="#78350f" />
            <circle cx="62" cy="72" r="4" fill="#78350f" />
            <circle cx="70" cy="65" r="3" fill="#78350f" />
            {/* Sprinting legs */}
            <line x1="42" y1="84" x2="34" y2="104" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="72" y1="84" x2="80" y2="104" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="56" y1="84" x2="52" y2="104" stroke="#f59e0b" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head with aerodynamic ear fins */}
            <rect x="58" y="24" width="36" height="30" rx="8" fill="#f59e0b" />
            <polygon points="62,24 58,12 70,22" fill="#d97706" />
            <polygon points="86,24 92,12 80,22" fill="#d97706" />
            {/* Cheetah Tear-stripes */}
            <path d="M 68 36 L 68 48" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            <path d="M 84 36 L 84 48" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            {/* Visor / Eyes */}
            <rect x="66" y="32" width="22" height="7" rx="2" fill="#0284c7" />
            <circle cx="72" cy="35" r="1.5" fill="#38bdf8" />
            <circle cx="82" cy="35" r="1.5" fill="#38bdf8" />
          </g>
        );

      // 11. Panda Sensei
      case 'panda-monk':
        return (
          <g id="panda">
            {/* Martial Bamboo Staff in hand */}
            <line x1="24" y1="28" x2="28" y2="105" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="24" cy="40" r="3" fill="#4ade80" />
            <circle cx="26" cy="70" r="3" fill="#4ade80" />
            {/* Body (White torso, black limbs) */}
            <rect x="34" y="58" width="52" height="36" rx="14" fill="#f8fafc" />
            {/* Black Paws & Feet */}
            <rect x="36" y="88" width="12" height="16" rx="5" fill="#1e293b" />
            <rect x="72" y="88" width="12" height="16" rx="5" fill="#1e293b" />
            <rect x="42" y="66" width="12" height="18" rx="5" fill="#1e293b" />
            <rect x="66" y="66" width="12" height="18" rx="5" fill="#1e293b" />
            {/* Head */}
            <rect x="36" y="24" width="48" height="38" rx="14" fill="#f8fafc" />
            {/* Big Black Panda Ears */}
            <circle cx="40" cy="22" r="8" fill="#1e293b" />
            <circle cx="80" cy="22" r="8" fill="#1e293b" />
            {/* Kung-Fu Martial Headband */}
            <rect x="34" y="28" width="52" height="7" fill="#dc2626" />
            <polygon points="86,30 98,24 96,36" fill="#dc2626" />
            {/* Black Eye Patches */}
            <ellipse cx="48" cy="42" rx="6" ry="7" fill="#1e293b" transform="rotate(-15 48 42)" />
            <ellipse cx="72" cy="42" rx="6" ry="7" fill="#1e293b" transform="rotate(15 72 42)" />
            <circle cx="49" cy="41" r="2.5" fill="#ffffff" />
            <circle cx="71" cy="41" r="2.5" fill="#ffffff" />
            <circle cx="50" cy="41" r="1.2" fill="#0f172a" />
            <circle cx="70" cy="41" r="1.2" fill="#0f172a" />
            {/* Snout */}
            <ellipse cx="60" cy="50" rx="3.5" ry="2.2" fill="#1e293b" />
          </g>
        );

      // 12. Frost Penguin
      case 'frost-penguin':
        return (
          <g id="penguin">
            {/* Feet */}
            <polygon points="44,98 38,105 52,105" fill="#f97316" />
            <polygon points="68,98 62,105 76,105" fill="#f97316" />
            {/* Back dark navy coat */}
            <rect x="34" y="32" width="52" height="68" rx="20" fill="#0369a1" />
            {/* White belly */}
            <ellipse cx="60" cy="68" rx="18" ry="24" fill="#f8fafc" />
            {/* Flippers */}
            <ellipse cx="30" cy="60" rx="6" ry="16" fill="#0284c7" transform="rotate(15 30 60)" />
            <ellipse cx="90" cy="60" rx="6" ry="16" fill="#0284c7" transform="rotate(-15 90 60)" />
            {/* Cozy Red Winter Scarf */}
            <rect x="42" y="44" width="36" height="8" rx="4" fill="#ef4444" />
            <rect x="66" y="48" width="8" height="20" rx="3" fill="#dc2626" />
            {/* Yellow Beak */}
            <polygon points="60,44 54,38 66,38" fill="#fbbf24" />
            {/* Cute Eyes */}
            <circle cx="52" cy="30" r="3.5" fill="#0f172a" />
            <circle cx="51" cy="29" r="1.2" fill="#ffffff" />
            <circle cx="68" cy="30" r="3.5" fill="#0f172a" />
            <circle cx="67" cy="29" r="1.2" fill="#ffffff" />
            {/* Winter earmuffs */}
            <circle cx="36" cy="30" r="5" fill="#38bdf8" />
            <circle cx="84" cy="30" r="5" fill="#38bdf8" />
            <path d="M 36 30 Q 60 14 84 30" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          </g>
        );

      // 13. Laser Fox
      case 'cyber-fox':
        return (
          <g id="fox">
            {/* Giant Fluffy Fox Tail with White Tip */}
            <path d="M 28 76 Q 8 60 14 36 Q 26 42 30 64 Z" fill="#ea580c" />
            <polygon points="14,36 10,48 22,46" fill="#ffffff" />
            {/* Body */}
            <rect x="34" y="58" width="52" height="34" rx="10" fill="#f97316" />
            <path d="M 46 64 Q 60 74 74 64 L 70 86 Q 60 88 50 86 Z" fill="#ffffff" />
            {/* Tech Paws */}
            <rect x="40" y="88" width="10" height="16" rx="4" fill="#c2410c" />
            <rect x="70" y="88" width="10" height="16" rx="4" fill="#c2410c" />
            {/* Pointy Big Ears */}
            <polygon points="40,26 30,6 52,20" fill="#ea580c" />
            <polygon points="42,24 35,12 48,20" fill="#ffffff" />
            <polygon points="80,26 90,6 68,20" fill="#ea580c" />
            <polygon points="78,24 85,12 72,20" fill="#ffffff" />
            {/* Head */}
            <polygon points="36,24 84,24 60,54" fill="#f97316" />
            <polygon points="46,38 74,38 60,52" fill="#ffffff" />
            {/* High-tech Red Monocle / Laser Sight on Left Eye */}
            <circle cx="50" cy="34" r="5" fill="none" stroke="#ef4444" strokeWidth="2" />
            <circle cx="50" cy="34" r="2" fill="#ef4444" />
            {/* Regular Right Eye */}
            <ellipse cx="70" cy="34" rx="3.5" ry="4" fill="#451a03" />
            <circle cx="69" cy="33" r="1.2" fill="#ffffff" />
            {/* Black Nose */}
            <circle cx="60" cy="52" r="2.5" fill="#0f172a" />
          </g>
        );

      // 14. Volt Hamster
      case 'electric-hamster':
        return (
          <g id="hamster">
            {/* Chubby Round Golden Body */}
            <ellipse cx="60" cy="68" rx="32" ry="30" fill="#eab308" />
            <ellipse cx="60" cy="74" rx="20" ry="18" fill="#fef08a" />
            {/* Tiny Paws holding a lightning bolt */}
            <rect x="42" y="92" width="10" height="12" rx="4" fill="#ca8a04" />
            <rect x="68" y="92" width="10" height="12" rx="4" fill="#ca8a04" />
            {/* Tiny Hands */}
            <circle cx="52" cy="74" r="4" fill="#fef08a" />
            <circle cx="68" cy="74" r="4" fill="#fef08a" />
            <polygon points="60,66 56,76 62,76 58,86 66,74 61,74" fill="#38bdf8" />
            {/* Round Ears */}
            <circle cx="36" cy="36" r="9" fill="#ca8a04" />
            <circle cx="36" cy="36" r="5" fill="#fef08a" />
            <circle cx="84" cy="36" r="9" fill="#ca8a04" />
            <circle cx="84" cy="36" r="5" fill="#fef08a" />
            {/* Electric Red Cheeks */}
            <circle cx="40" cy="58" r="6" fill="#ef4444" />
            <circle cx="80" cy="58" r="6" fill="#ef4444" />
            {/* Cute Eyes */}
            <circle cx="50" cy="48" r="4" fill="#0f172a" />
            <circle cx="48.5" cy="46.5" r="1.5" fill="#ffffff" />
            <circle cx="70" cy="48" r="4" fill="#0f172a" />
            <circle cx="68.5" cy="46.5" r="1.5" fill="#ffffff" />
            {/* Buck Teeth */}
            <polygon points="60,54 57,51 63,51" fill="#f43f5e" />
            <rect x="58" y="55" width="2" height="3" fill="#ffffff" />
            <rect x="61" y="55" width="2" height="3" fill="#ffffff" />
          </g>
        );

      // 15. Astro Koala
      case 'space-koala':
        return (
          <g id="koala">
            {/* Astronaut Space Suit */}
            <rect x="36" y="60" width="48" height="36" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
            {/* Oxygen pack */}
            <rect x="24" y="64" width="12" height="24" rx="4" fill="#818cf8" />
            {/* Space Boots */}
            <rect x="40" y="92" width="14" height="14" rx="5" fill="#4f46e5" />
            <rect x="66" y="92" width="14" height="14" rx="5" fill="#4f46e5" />
            {/* Glass Bubble Helmet */}
            <circle cx="60" cy="40" r="26" fill="rgba(199, 210, 254, 0.4)" stroke="#818cf8" strokeWidth="2.5" />
            <path d="M 44 26 Q 54 20 64 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            {/* Koala Head Inside */}
            <rect x="42" y="26" width="36" height="28" rx="10" fill="#94a3b8" />
            {/* Fluffy Round Ears */}
            <circle cx="38" cy="24" r="8" fill="#64748b" />
            <circle cx="38" cy="24" r="4" fill="#e2e8f0" />
            <circle cx="82" cy="24" r="8" fill="#64748b" />
            <circle cx="82" cy="24" r="4" fill="#e2e8f0" />
            {/* Big Black Oval Koala Nose */}
            <ellipse cx="60" cy="42" rx="5" ry="7" fill="#0f172a" />
            {/* Eyes */}
            <circle cx="50" cy="34" r="2.5" fill="#0f172a" />
            <circle cx="70" cy="34" r="2.5" fill="#0f172a" />
          </g>
        );

      // 16. Ninja Frog
      case 'ninja-frog':
        return (
          <g id="frog">
            {/* Ninja Shuriken on back */}
            <circle cx="28" cy="62" r="8" fill="#334155" />
            {/* Body */}
            <rect x="36" y="58" width="48" height="34" rx="14" fill="#10b981" />
            <ellipse cx="60" cy="74" rx="14" ry="12" fill="#a7f3d0" />
            {/* Webbed Feet */}
            <path d="M 32 94 Q 44 94 48 104 Q 38 104 32 94" fill="#059669" />
            <path d="M 88 94 Q 76 94 72 104 Q 82 104 88 94" fill="#059669" />
            {/* Purple Ninja Mask / Wrap */}
            <rect x="34" y="34" width="52" height="16" rx="4" fill="#7c3aed" />
            <polygon points="86,38 98,32 96,44" fill="#7c3aed" />
            {/* Frog Eyes on Top */}
            <circle cx="44" cy="24" r="10" fill="#10b981" />
            <circle cx="44" cy="24" r="6" fill="#fef08a" />
            <ellipse cx="44" cy="24" rx="2" ry="5" fill="#064e3b" />
            <circle cx="76" cy="24" r="10" fill="#10b981" />
            <circle cx="76" cy="24" r="6" fill="#fef08a" />
            <ellipse cx="76" cy="24" rx="2" ry="5" fill="#064e3b" />
            {/* Focused ninja glare slit */}
            <rect x="46" y="38" width="28" height="7" rx="2" fill="#0f172a" />
            <circle cx="52" cy="41" r="1.5" fill="#ffffff" />
            <circle cx="68" cy="41" r="1.5" fill="#ffffff" />
          </g>
        );

      // 17. Golden Lion
      case 'golden-lion':
        return (
          <g id="lion">
            {/* Glorious Mane */}
            <circle cx="60" cy="42" r="32" fill="#b45309" />
            <circle cx="60" cy="42" r="28" fill="#d97706" />
            {/* Tail with tuft */}
            <path d="M 28 72 Q 10 70 14 52" stroke="#b45309" strokeWidth="3" fill="none" />
            <circle cx="14" cy="52" r="5" fill="#78350f" />
            {/* Body */}
            <rect x="34" y="58" width="52" height="36" rx="10" fill="#f59e0b" />
            <rect x="38" y="88" width="12" height="16" rx="4" fill="#d97706" />
            <rect x="70" y="88" width="12" height="16" rx="4" fill="#d97706" />
            {/* Crown */}
            <polygon points="50,14 55,6 60,12 65,6 70,14" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
            {/* Head */}
            <rect x="42" y="26" width="36" height="32" rx="10" fill="#fbbf24" />
            {/* Eyes */}
            <ellipse cx="50" cy="36" rx="3.5" ry="4" fill="#451a03" />
            <circle cx="49" cy="35" r="1.2" fill="#ffffff" />
            <ellipse cx="70" cy="36" rx="3.5" ry="4" fill="#451a03" />
            <circle cx="69" cy="35" r="1.2" fill="#ffffff" />
            {/* Muzzle */}
            <ellipse cx="60" cy="46" rx="9" ry="7" fill="#fef08a" />
            <polygon points="60,45 56,41 64,41" fill="#78350f" />
          </g>
        );

      // 18. Mecha Dragon
      case 'mecha-dragon':
        return (
          <g id="mecha-dragon">
            {/* Cyber Wings */}
            <polygon points="34,48 10,24 24,56" fill="#059669" stroke="#34d399" strokeWidth="1.5" />
            <polygon points="86,48 110,24 96,56" fill="#059669" stroke="#34d399" strokeWidth="1.5" />
            {/* Spiked Tail */}
            <path d="M 34 76 Q 14 74 12 90" stroke="#047857" strokeWidth="5" fill="none" />
            <polygon points="12,90 6,86 16,82" fill="#34d399" />
            {/* Cyber Plated Body */}
            <rect x="34" y="56" width="52" height="38" rx="8" fill="#10b981" />
            <rect x="42" y="64" width="36" height="20" rx="4" fill="#047857" />
            <circle cx="60" cy="74" r="4" fill="#34d399" />
            {/* Legs */}
            <rect x="38" y="90" width="12" height="15" rx="3" fill="#065f46" />
            <rect x="70" y="90" width="12" height="15" rx="3" fill="#065f46" />
            {/* Horns */}
            <polygon points="46,24 38,10 50,18" fill="#34d399" />
            <polygon points="74,24 82,10 70,18" fill="#34d399" />
            {/* Head */}
            <polygon points="42,22 78,22 84,46 36,46" fill="#10b981" />
            {/* Glowing Green Plasma Eyes */}
            <rect x="48" y="28" width="8" height="5" rx="1" fill="#6ee7b7" />
            <rect x="64" y="28" width="8" height="5" rx="1" fill="#6ee7b7" />
          </g>
        );

      // 19. Shadow Wolf
      case 'shadow-wolf':
        return (
          <g id="wolf">
            {/* Ethereal Shadow Smoke Tail */}
            <path d="M 30 74 Q 10 68 12 46 Q 22 52 26 66 Z" fill="#6b21a8" />
            <circle cx="12" cy="46" r="4" fill="#c084fc" opacity="0.6" />
            {/* Twilight Body */}
            <rect x="34" y="58" width="52" height="34" rx="10" fill="#3b0764" />
            <rect x="38" y="88" width="10" height="16" rx="4" fill="#2e1065" />
            <rect x="72" y="88" width="10" height="16" rx="4" fill="#2e1065" />
            {/* Head & Pointy Wolf Ears */}
            <polygon points="42,26 34,8 52,18" fill="#581c87" />
            <polygon points="78,26 86,8 68,18" fill="#581c87" />
            <polygon points="38,24 82,24 60,56" fill="#3b0764" />
            {/* Glowing Amethyst Eyes */}
            <ellipse cx="50" cy="34" rx="4" ry="3" fill="#e9d5ff" />
            <circle cx="50" cy="34" r="1.5" fill="#a855f7" />
            <ellipse cx="70" cy="34" rx="4" ry="3" fill="#e9d5ff" />
            <circle cx="70" cy="34" r="1.5" fill="#a855f7" />
            {/* Black Snout */}
            <circle cx="60" cy="52" r="2.5" fill="#09090b" />
          </g>
        );

      // 20. Magma Beast
      case 'lava-golem':
        return (
          <g id="golem">
            {/* Volcanic Rock Body with Lava Veins */}
            <rect x="32" y="48" width="56" height="46" rx="10" fill="#1c1917" stroke="#dc2626" strokeWidth="2" />
            {/* Glowing Magma Fissures */}
            <path d="M 40 54 L 50 66 L 46 84 M 64 52 L 58 72 L 72 82" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 50 66 L 58 72" stroke="#facc15" strokeWidth="2" fill="none" />
            {/* Chunky Rock Limbs */}
            <rect x="34" y="90" width="16" height="15" rx="4" fill="#0c0a09" />
            <rect x="70" y="90" width="16" height="15" rx="4" fill="#0c0a09" />
            <rect x="20" y="56" width="14" height="24" rx="5" fill="#292524" />
            <rect x="86" y="56" width="14" height="24" rx="5" fill="#292524" />
            {/* Head Rock */}
            <rect x="40" y="20" width="40" height="30" rx="8" fill="#292524" />
            {/* Flaming Molten Eyes */}
            <rect x="46" y="30" width="10" height="6" rx="2" fill="#facc15" />
            <rect x="64" y="30" width="10" height="6" rx="2" fill="#facc15" />
          </g>
        );

      // 21. Cosmo Slime
      case 'galaxy-slime':
        return (
          <g id="slime">
            {/* Translucent Cosmic Jelly Dome */}
            <path d="M 30 84 Q 30 38 60 38 Q 90 38 90 84 Q 78 92 60 90 Q 42 92 30 84 Z" fill="#7c3aed" opacity="0.9" />
            <path d="M 38 80 Q 40 46 60 46 Q 80 46 82 80" fill="#a855f7" opacity="0.5" />
            {/* Planetary Ring */}
            <ellipse cx="60" cy="70" rx="36" ry="12" fill="none" stroke="#e9d5ff" strokeWidth="3" transform="rotate(-15 60 70)" />
            {/* Floating Stars Inside */}
            <circle cx="48" cy="62" r="2" fill="#fef08a" />
            <circle cx="72" cy="58" r="2.5" fill="#ffffff" />
            <circle cx="62" cy="78" r="1.5" fill="#fbcfe8" />
            {/* Cute Big Cartoon Eyes */}
            <circle cx="50" cy="56" r="4.5" fill="#0f172a" />
            <circle cx="48.5" cy="54" r="1.8" fill="#ffffff" />
            <circle cx="70" cy="56" r="4.5" fill="#0f172a" />
            <circle cx="68.5" cy="54" r="1.8" fill="#ffffff" />
          </g>
        );

      // 22. Astral Tiger
      case 'astral-tiger':
        return (
          <g id="tiger">
            {/* Astral Tail */}
            <path d="M 28 72 Q 10 64 16 44" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="16" cy="44" r="4" fill="#fde047" />
            {/* Cosmic Striped Body */}
            <rect x="34" y="58" width="52" height="34" rx="10" fill="#f59e0b" />
            <path d="M 44 58 L 46 70 M 58 58 L 60 72 M 72 58 L 74 70" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            {/* Paws */}
            <rect x="38" y="88" width="11" height="16" rx="4" fill="#d97706" />
            <rect x="71" y="88" width="11" height="16" rx="4" fill="#d97706" />
            {/* Tiger Ears */}
            <circle cx="40" cy="22" r="8" fill="#b45309" />
            <circle cx="40" cy="22" r="4" fill="#fef08a" />
            <circle cx="80" cy="22" r="8" fill="#b45309" />
            <circle cx="80" cy="22" r="4" fill="#fef08a" />
            {/* Head */}
            <rect x="38" y="24" width="44" height="36" rx="12" fill="#f59e0b" />
            {/* Forehead Markings */}
            <polygon points="60,26 56,32 64,32" fill="#451a03" />
            {/* Glowing Golden Eyes */}
            <ellipse cx="49" cy="38" rx="4" ry="4.5" fill="#fef08a" />
            <rect x="48.5" y="34" width="1.5" height="7" fill="#451a03" />
            <ellipse cx="71" cy="38" rx="4" ry="4.5" fill="#fef08a" />
            <rect x="70.5" y="34" width="1.5" height="7" fill="#451a03" />
            {/* Snout */}
            <ellipse cx="60" cy="48" rx="8" ry="6" fill="#fef08a" />
            <polygon points="60,47 56,44 64,44" fill="#78350f" />
          </g>
        );

      // 23. Thunder Pegasus
      case 'thunder-pegasus':
        return (
          <g id="pegasus">
            {/* Magnificent Cyan Wings */}
            <polygon points="36,46 6,18 24,54" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
            <polygon points="84,46 114,18 96,54" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
            {/* Tail */}
            <path d="M 28 66 Q 14 62 16 48 Q 24 50 26 62 Z" fill="#22d3ee" />
            {/* Celestial Horse Body */}
            <rect x="34" y="54" width="52" height="36" rx="12" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
            {/* Hooves */}
            <rect x="38" y="86" width="10" height="18" rx="3" fill="#bae6fd" />
            <rect x="72" y="86" width="10" height="18" rx="3" fill="#bae6fd" />
            <rect x="38" y="98" width="10" height="6" rx="1" fill="#0891b2" />
            <rect x="72" y="98" width="10" height="6" rx="1" fill="#0891b2" />
            {/* Lightning Mane */}
            <polygon points="52,14 46,26 54,26 48,36" fill="#facc15" />
            {/* Head */}
            <polygon points="44,22 76,22 84,46 52,46" fill="#f0f9ff" stroke="#0891b2" strokeWidth="1.2" />
            {/* Ears */}
            <polygon points="48,22 46,12 52,18" fill="#bae6fd" />
            {/* Electric Cyan Eye */}
            <circle cx="62" cy="32" r="3.5" fill="#0284c7" />
            <circle cx="61" cy="31" r="1.2" fill="#ffffff" />
          </g>
        );

      // 24. Cyber Hydra
      case 'cyber-hydra':
        return (
          <g id="hydra">
            {/* Main Body */}
            <rect x="36" y="64" width="48" height="32" rx="10" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
            <rect x="40" y="92" width="10" height="12" rx="3" fill="#115e59" />
            <rect x="70" y="92" width="10" height="12" rx="3" fill="#115e59" />
            {/* 3 Serpent Necks & Heads */}
            {/* Left Head */}
            <path d="M 44 66 Q 30 46 32 30" stroke="#14b8a6" strokeWidth="5" fill="none" />
            <circle cx="32" cy="28" r="9" fill="#0f766e" />
            <circle cx="30" cy="26" r="2.5" fill="#2dd4bf" />
            {/* Middle Head */}
            <path d="M 60 66 L 60 24" stroke="#14b8a6" strokeWidth="6" fill="none" />
            <circle cx="60" cy="20" r="11" fill="#0f766e" />
            <circle cx="58" cy="18" r="3" fill="#2dd4bf" />
            <circle cx="62" cy="18" r="3" fill="#2dd4bf" />
            {/* Right Head */}
            <path d="M 76 66 Q 90 46 88 30" stroke="#14b8a6" strokeWidth="5" fill="none" />
            <circle cx="88" cy="28" r="9" fill="#0f766e" />
            <circle cx="90" cy="26" r="2.5" fill="#2dd4bf" />
          </g>
        );

      // 25. Golden Doge Supreme
      case 'golden-doge-supreme':
        return (
          <g id="golden-doge">
            {/* Sparkling Gold Radiance */}
            <circle cx="60" cy="60" r="48" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
            {/* Golden Tail */}
            <path d="M 28 72 Q 16 60 22 48 Q 28 54 30 68 Z" fill="#eab308" />
            {/* Gilded Legs */}
            <rect x="36" y="86" width="10" height="18" rx="4" fill="#ca8a04" />
            <rect x="74" y="86" width="10" height="18" rx="4" fill="#ca8a04" />
            {/* Body with 24k luster */}
            <rect x="32" y="58" width="56" height="34" rx="10" fill="#facc15" stroke="#eab308" strokeWidth="2" />
            <ellipse cx="60" cy="74" rx="18" ry="12" fill="#fef08a" />
            {/* Paws */}
            <rect x="42" y="88" width="10" height="18" rx="4" fill="#eab308" />
            <rect x="68" y="88" width="10" height="18" rx="4" fill="#eab308" />
            {/* Diamond Collar */}
            <rect x="42" y="52" width="36" height="7" rx="3" fill="#1e1b4b" />
            <polygon points="60,54 64,59 60,64 56,59" fill="#38bdf8" />
            {/* Golden Head */}
            <rect x="38" y="24" width="44" height="34" rx="10" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
            {/* Ears */}
            <polygon points="40,26 32,8 50,22" fill="#ca8a04" />
            <polygon points="80,26 88,8 70,22" fill="#ca8a04" />
            {/* Swagger Thug-Life Pixel Sunglasses */}
            <rect x="42" y="32" width="16" height="10" fill="#09090b" stroke="#ffffff" strokeWidth="1" />
            <rect x="62" y="32" width="16" height="10" fill="#09090b" stroke="#ffffff" strokeWidth="1" />
            <rect x="58" y="34" width="4" height="2" fill="#ffffff" />
            {/* Snout */}
            <ellipse cx="60" cy="48" rx="4" ry="3" fill="#713f12" />
          </g>
        );

      // 26. Phantom Ghost
      case 'dark-reaper':
        return (
          <g id="ghost">
            {/* Levitating Ghost Sheet / Tail */}
            <path
              d="M 34 50 Q 34 20 60 20 Q 86 20 86 50 Q 86 86 78 94 Q 72 84 66 94 Q 60 84 54 94 Q 48 84 42 94 Q 34 86 34 50 Z"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Levitating Purple Lantern */}
            <rect x="88" y="54" width="10" height="14" rx="3" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx="93" cy="61" r="3" fill="#c084fc" />
            {/* Glowing Spooky Eyes */}
            <ellipse cx="50" cy="42" rx="4.5" ry="6" fill="#a855f7" />
            <circle cx="50" cy="40" r="1.5" fill="#ffffff" />
            <ellipse cx="70" cy="42" rx="4.5" ry="6" fill="#a855f7" />
            <circle cx="70" cy="40" r="1.5" fill="#ffffff" />
            {/* Spooky "O" Mouth */}
            <ellipse cx="60" cy="54" rx="4" ry="5.5" fill="#0f172a" />
          </g>
        );

      // 27. Neon Leviathan
      case 'neon-leviathan':
        return (
          <g id="leviathan">
            {/* Whale Fluke Tail */}
            <path d="M 32 64 Q 10 58 14 42 Q 22 46 28 58" fill="#1e40af" />
            <polygon points="14,42 6,36 18,34" fill="#3b82f6" />
            {/* Massive Ocean Body */}
            <ellipse cx="64" cy="64" rx="36" ry="24" fill="#1d4ed8" />
            {/* Bioluminescent Ventral Grooves */}
            <path d="M 44 76 Q 64 84 84 76 M 48 80 Q 64 88 80 80" stroke="#60a5fa" strokeWidth="2" fill="none" />
            {/* Flippers */}
            <ellipse cx="60" cy="74" rx="6" ry="14" fill="#2563eb" transform="rotate(30 60 74)" />
            {/* Blowhole Spray */}
            <path d="M 72 40 Q 68 22 62 18 M 72 40 Q 76 22 82 18" stroke="#93c5fd" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Gentle Whale Eye */}
            <circle cx="86" cy="56" r="3.5" fill="#0f172a" />
            <circle cx="85" cy="55" r="1.2" fill="#93c5fd" />
          </g>
        );

      // 28. Cosmic Unicorn
      case 'rainbow-unicorn':
        return (
          <g id="unicorn">
            {/* Prismatic Rainbow Mane & Tail */}
            <path d="M 28 66 Q 10 60 14 42 Q 22 46 26 58" fill="#ec4899" />
            <path d="M 26 58 Q 12 70 18 84" fill="#a855f7" />
            {/* Body */}
            <rect x="34" y="54" width="52" height="36" rx="12" fill="#fdf4ff" stroke="#f472b6" strokeWidth="1.5" />
            {/* Golden Hooves */}
            <rect x="38" y="86" width="10" height="18" rx="3" fill="#fae8ff" />
            <rect x="72" y="86" width="10" height="18" rx="3" fill="#fae8ff" />
            <rect x="38" y="98" width="10" height="6" rx="1" fill="#facc15" />
            <rect x="72" y="98" width="10" height="6" rx="1" fill="#facc15" />
            {/* Golden Spiraled Horn */}
            <polygon points="68,20 74,2 78,20" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            {/* Head */}
            <polygon points="46,22 78,22 86,46 54,46" fill="#fdf4ff" stroke="#f472b6" strokeWidth="1.2" />
            {/* Sparkly Starry Eye */}
            <circle cx="66" cy="32" r="4" fill="#a21caf" />
            <polygon points="66,30 67,33 70,33 67,35 68,38 66,36 64,38 65,35 62,33 65,33" fill="#ffffff" />
          </g>
        );

      // 29. Sun Phoenix
      case 'phoenix-fire':
        return (
          <g id="phoenix">
            {/* Fiery Wing Plumage */}
            <polygon points="36,54 8,26 24,68" fill="#ea580c" />
            <polygon points="36,54 14,36 28,64" fill="#facc15" />
            <polygon points="84,54 112,26 96,68" fill="#ea580c" />
            <polygon points="84,54 106,36 92,64" fill="#facc15" />
            {/* Long Burning Tail Streamers */}
            <path d="M 60 84 Q 40 100 36 114 M 60 84 Q 60 102 60 116 M 60 84 Q 80 100 84 114" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Phoenix Body */}
            <rect x="42" y="44" width="36" height="42" rx="14" fill="#dc2626" />
            <ellipse cx="60" cy="64" rx="10" ry="14" fill="#facc15" />
            {/* Crown Crest */}
            <polygon points="56,22 60,8 64,22" fill="#facc15" />
            {/* Head & Sharp Golden Beak */}
            <circle cx="60" cy="30" r="14" fill="#ef4444" />
            <polygon points="68,28 78,32 68,36" fill="#facc15" />
            {/* Blazing Eye */}
            <circle cx="64" cy="27" r="3" fill="#fef08a" />
            <circle cx="64" cy="27" r="1.2" fill="#7f1d1d" />
          </g>
        );

      // 30. Rainbow Dragon
      case 'rainbow-dragon':
        return (
          <g id="rainbow-dragon">
            {/* Magnificent Iridescent Wings */}
            <polygon points="36,46 4,14 22,58" fill="#ef4444" />
            <polygon points="36,46 12,24 24,54" fill="#facc15" />
            <polygon points="84,46 116,14 98,58" fill="#3b82f6" />
            <polygon points="84,46 108,24 96,54" fill="#8b5cf6" />
            {/* Rainbow Tail with crystal fin */}
            <path d="M 34 76 Q 14 74 12 90" stroke="#f59e0b" strokeWidth="5" fill="none" />
            <polygon points="12,90 4,82 16,78" fill="#ec4899" />
            {/* Scales Gradient Body */}
            <rect x="34" y="54" width="52" height="38" rx="10" fill="#6366f1" />
            <path d="M 44 60 Q 60 72 76 60 L 72 86 Q 60 88 48 86 Z" fill="#f43f5e" />
            {/* Dragon Legs & Claws */}
            <rect x="38" y="88" width="12" height="16" rx="4" fill="#4338ca" />
            <rect x="70" y="88" width="12" height="16" rx="4" fill="#4338ca" />
            {/* Crystal Horns */}
            <polygon points="46,24 38,8 52,18" fill="#f43f5e" />
            <polygon points="74,24 82,8 68,18" fill="#38bdf8" />
            {/* Head */}
            <polygon points="40,20 80,20 86,46 34,46" fill="#8b5cf6" />
            {/* Radiant Starlight Eyes */}
            <circle cx="50" cy="30" r="4" fill="#facc15" />
            <circle cx="70" cy="30" r="4" fill="#facc15" />
          </g>
        );

      // 31. Glitch Angel
      case 'glitch-angel':
        return (
          <g id="glitch-angel">
            {/* Digital Voxel Pixel Wings */}
            <rect x="12" y="28" width="12" height="12" fill="#a855f7" />
            <rect x="22" y="38" width="12" height="12" fill="#ec4899" />
            <rect x="14" y="48" width="12" height="12" fill="#06b6d4" />
            <rect x="96" y="28" width="12" height="12" fill="#a855f7" />
            <rect x="86" y="38" width="12" height="12" fill="#ec4899" />
            <rect x="94" y="48" width="12" height="12" fill="#06b6d4" />
            {/* Chromatic Shifting Halo */}
            <ellipse cx="60" cy="14" rx="20" ry="5" fill="none" stroke="#facc15" strokeWidth="2.5" />
            <ellipse cx="61" cy="15" rx="20" ry="5" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.7" />
            {/* Angelic Robe Body */}
            <polygon points="46,46 74,46 86,96 34,96" fill="#f8fafc" stroke="#a855f7" strokeWidth="1.5" />
            {/* Glowing Angelic Face */}
            <rect x="42" y="22" width="36" height="28" rx="8" fill="#f8fafc" />
            {/* Pixel / Binary Glitch Eyes */}
            <rect x="48" y="32" width="6" height="4" fill="#06b6d4" />
            <rect x="66" y="32" width="6" height="4" fill="#ec4899" />
          </g>
        );

      // 32. Diamond Blox Titan
      case 'diamond-titan':
        return (
          <g id="titan">
            {/* Orbiting Diamond Shards */}
            <polygon points="18,40 24,32 30,40 24,48" fill="#67e8f9" stroke="#0891b2" strokeWidth="1" />
            <polygon points="102,40 108,32 114,40 108,48" fill="#67e8f9" stroke="#0891b2" strokeWidth="1" />
            <polygon points="60,6 66,-2 72,6 66,14" fill="#a5f3fc" />
            {/* Crystalline Golem Body */}
            <polygon points="40,50 80,50 90,88 30,88" fill="#0891b2" stroke="#67e8f9" strokeWidth="2" />
            {/* Glowing Diamond Core */}
            <polygon points="60,56 70,68 60,80 50,68" fill="#a5f3fc" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="60" cy="68" r="4" fill="#ffffff" />
            {/* Faceted Heavy Legs */}
            <polygon points="36,88 52,88 48,106 32,106" fill="#0e7490" />
            <polygon points="68,88 84,88 88,106 72,106" fill="#0e7490" />
            {/* Head Facet */}
            <polygon points="44,20 76,20 84,46 36,46" fill="#06b6d4" stroke="#67e8f9" strokeWidth="1.5" />
            {/* Blinding Cyan Core Eyes */}
            <polygon points="48,32 54,28 60,32 54,36" fill="#ffffff" />
            <polygon points="66,32 72,28 78,32 72,36" fill="#ffffff" />
          </g>
        );

      default:
        // Default blocky pet fallback
        return (
          <g id="default-pet">
            <rect x="36" y="54" width="48" height="36" rx="10" fill="#f59e0b" />
            <rect x="40" y="88" width="10" height="16" rx="4" fill="#d97706" />
            <rect x="70" y="88" width="10" height="16" rx="4" fill="#d97706" />
            <rect x="40" y="24" width="40" height="32" rx="8" fill="#fbbf24" />
            <circle cx="50" cy="38" r="3.5" fill="#1e1b4b" />
            <circle cx="70" cy="38" r="3.5" fill="#1e1b4b" />
          </g>
        );
    }
  };

  const reactionClass = isReacting ? profile.animationClass : 'animate-pet-float';

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${sizeClasses.w} ${sizeClasses.h} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      title={`${profile.actionLabel} (Click to interact!)`}
    >
      <svg
        viewBox="0 0 120 120"
        className={`w-full h-full filter drop-shadow-md transition-transform duration-300 ${reactionClass}`}
      >
        {/* Full-Body Ground Ellipse Shadow */}
        {showGroundShadow && (
          <ellipse
            cx="60"
            cy="110"
            rx="32"
            ry="7"
            fill="rgba(15, 23, 42, 0.55)"
            className={isReacting ? '' : 'animate-pet-shadow'}
          />
        )}

        {/* Full-Body Vector Pet */}
        {renderPetBody()}
      </svg>
    </div>
  );
};
