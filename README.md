# MathBlox: Roblox-Themed 1-12 Multiplication Adventure 🎮🧱

A gamified, mobile-first interactive web application tailored for children to master and memorize multiplication tables from $1 \times 1$ up to $12 \times 12$.

Built with authentic Roblox-inspired game aesthetics, blocky customizable 3D avatars, 30+ animated full-body pet companions, egg hatching simulators, obstacle courses (Obby), and a Glitch Bacon Boss Battle.

---

## 🌟 Key Features

### 1. Roblox Game Aesthetics & Web Audio Sound Engine
- **Blocky 3D UI**: Chunky beveled buttons, vibrant color palettes, drop shadows, and game typography (`Lilita One` and `Fredoka`).
- **Synthesized Sound Effects**: 100% offline procedural audio via the Web Audio API—coin clinks, jumping boings, victory fanfares, egg-cracking wobbles, and boss blasts.
- **Mobile Audio Auto-Resume**: Automatically unlocks and resumes AudioContext on the first touch or tap on iOS Safari and Android Chrome.
- **Toggle Sound**: Instant sound on/off switch with state saved across sessions.

---

### 2. Six Exciting Game Modes

#### 🎓 1. Blox Multiplication Academy (Course Mode)
- **Step-by-Step Guided Syllabus**: Structured into 4 learning stages:
  - *Stage 1: The Easy Launchers* (Tables 1, 2, 10 — mirror rules, doubling, and zero-pasting).
  - *Stage 2: The Fast Rhythms* (Tables 5, 11 — clock minutes and twin digits).
  - *Stage 3: The Secret Magicians* (Tables 3, 4, 9 — double-doubles, tri-force, and sums-to-9 finger trick).
  - *Stage 4: The Titan Tables* (Tables 6, 7, 8, 12 — rhymes, the $56 = 7 \times 8$ sequence, and the dozen split).
- **Tactile Roblox Block Arrays**: Interactive group visualizer where kids can tap any multiplier (1–12) to see physical block formations with bevels and shadows.
- **Rapid-Recall Speed Drills**: Rapid question queue with **Smart Error Loop-Back** (missed facts are re-inserted 2 cards ahead until mastered).
- **Table Boss Checkpoint Blitz**: 5 focused mastery questions including tricky hard facts to earn official Table Diplomas and Blox Bux bounties!

#### 🏠 2. Lobby / Dashboard
- Welcome greeting and active avatar showcase.
- Level progress, total stars ($/36$), and badge summary.
- One-click launch cards into any adventure.
- Daily Blox Secret Math Trick.

#### 📐 3. 12x12 Interactive Matrix Visualizer
- Explore any fact from $1 \times 1$ to $12 \times 12$.
- Live **Roblox Block Array** displaying exact rows and columns (e.g. 4 rows of 7 blocks).
- Repeated addition display ($7 + 7 + 7 + 7 = 28$).
- Commutative property hints ($4 \times 7 = 7 \times 4$).
- Secret tricks and catchy memory rhymes for every table!
- Horizontal swipe guide optimized for mobile touchscreens.

#### 🎯 4. Table Practice (Tables 1 to 12 & Mixed All-Stars)
- 10-question rounds with 3-star scoring (⭐ / ⭐⭐ / ⭐⭐⭐).
- Streak multipliers (up to 5x streak bonus!).
- Choice between **4 Chunky Blox Buttons** (Multiple Choice) or **Big Calculator Keypad** (0–9 input).
- Visual hint system that displays the block grid if a child gets stuck.
- Independent mixed mode challenge tracking that preserves individual table star ratings.

#### 🔥 5. Floor is Lava: Tower Obby
- 10 floating platform stones hovering over boiling lava.
- Jump forward on correct answers with sound and particle effects.
- Avatar leaps stone-to-stone in real time without being clipped on mobile screens.
- Reach Stage 10 to unlock the golden chest and claim 150 Blox Bux!

#### 👾 6. Glitch Bacon Boss Battle
- 100 HP Glitch Monster with animated bacon hair and glowing eyes.
- 15-second timed turn countdown bar.
- Deal 25 damage with each correct multiplication answer to defeat the boss!
- 200 Blox Bux prize bounty upon victory.

---

### 3. 30+ Animated Pets & Floating Companion

- **Egg Hatching Simulator**:
  - **Starter Egg** (50 Bux) — Doge, Kitty, Piggy, Bunny, Bear, Duck, Dino, Cow (+10% to +25% Bux).
  - **Neon Cyber Egg** (120 Bux) — Laser Fox, Volt Hamster, Frost Penguin, Astro Koala, Ninja Frog (+30% to +50% Bux).
  - **Galaxy Egg** (250 Bux) — Golden Lion, Mecha Dragon, Shadow Wolf, Magma Beast, Cosmo Slime, Thunder Pegasus, Cyber Hydra (+60% to 2.4x Bux).
  - **Divine Mythic Egg** (500 Bux) — Cosmic Unicorn, Sun Phoenix, Rainbow Dragon, Glitch Angel, Diamond Titan (up to **3.5x Multiplier**!).
- **Full-Body Vector SVG Illustrations**: Handcrafted high-detail SVGs standing freely on 3D pedestal stages.
- **Unique Touch Reactions**: Every pet has its own synthesized sound, unique motion animation (`wag`, `pounce`, `wiggle`, `hops`, `stomp`, `slide`, `zap`, `spin`, `roar`), custom particle colors, and signature dialogue.
- **Persistent Floating Pet Companion**:
  - Follows the player across all pages.
  - Interactive menu: Feed Math Apple (+15 XP), Perform Pet Trick (+10 Bux), and Secret Math Tips.
  - **Mobile-Friendly Minimized Pill**: Can be collapsed with one tap into a compact floating bubble so it never obstructs math problem buttons or keypad entries.

---

### 4. Custom Roblox Avatar & Gear Shop
- **Customizable Avatar**:
  - Skin colors, shirt colors, pants colors.
  - Facial expressions: Happy, Cool, Wink, Star-Eyes, Silly.
  - Hats & gear: Propeller Cap, Ninja Headband, Golden Crown, Sheriff Hat, Cool Shades, Gamer Headset, Party Cone, Dominus Hood.
  - Custom gamer tag.
  - Math answering style toggle: 4 Blox Buttons vs. Big Keypad.

---

### 5. 📱 Mobile-First Responsive Design
- **Thumb-Friendly Touch Targets**: All buttons, keypad numbers, and options have $\ge 44\text{px}$ touch targets for easy tapping on phone screens.
- **Zero Horizontal Overflow**: Carefully budgeted layouts that fit seamlessly from small 320px phone viewports up to 4K ultra-wide monitors.
- **Responsive Split Views**: Smooth transitions from stacked single-column layouts on mobile to side-by-side split views on tablets and desktops.
- **Touch Navigation**: Smooth horizontal panning with `-webkit-overflow-scrolling: touch` and momentum scrolling.
- **Quick-Access Sidebar Drawer**: Slide-out menu with companion status and direct shortcuts.

---

### 6. 100% LocalStorage Persistence
All game state is automatically saved locally in the browser:
- Blox Bux balance
- Level & XP progression
- Table stars (1–12) and accuracy records
- Completed Course table certifications
- Unlocked & equipped pets
- Unlocked & equipped hats
- Avatar customization and gamer tag
- Badges & achievements

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 with custom Roblox 3D button utility classes
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Audio**: Procedural Web Audio API (zero external `.mp3` dependencies)
- **Linter**: Oxlint

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation
```bash
# Clone the repository
git clone https://github.com/mahmudbuilds/mathblox.git
cd mathblox

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Type Check & Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📄 License

MIT License. Designed with ❤️ for kids mastering math!
