# MathBlox: Roblox-Themed 1-12 Multiplication Adventure

A gamified, interactive web application tailored for an 8-year-old child to master and memorize multiplication tables from $1 \times 1$ up to $12 \times 12$.

Built with a Roblox-inspired theme, blocky customizable avatars, animated pet companions, egg hatching, an obstacle course (Obby), and a Glitch Boss Battle.

---

## 🌟 Key Features

### 1. Roblox Game Aesthetics & Audio
- **Blocky 3D UI**: Chunky beveled buttons, bold vibrant colors, drop shadows, and authentic game typography (`Lilita One` and `Fredoka`).
- **Web Audio API Sound Effects**: 100% offline synthesized sound effects including coin clinks, jumping boings, victory fanfare, egg crack wobbles, and gentle encouraging feedback.
- **Toggle Sound**: Instant sound on/off switch with state saved across sessions.

### 2. Five Fun Game Modes
1. **Lobby / Dashboard**:
   - Welcome greetings, active avatar showcase, quick launch buttons, streak flame, and total stars overview.
2. **12x12 Interactive Matrix Visualizer**:
   - Explore any fact from $1 \times 1$ to $12 \times 12$.
   - Live **visual Roblox block array** showing exact rows and columns (e.g. 4 rows of 7 blocks).
   - Repeated addition display ($7 + 7 + 7 + 7 = 28$).
   - Commutative property hints ($4 \times 7 = 7 \times 4$).
   - Secret tricks and catchy memory rhymes for every table!
3. **Table Practice (Tables 1 to 12 & Mixed All-Stars)**:
   - 10-question rounds with 3-star scoring (⭐ / ⭐⭐ / ⭐⭐⭐).
   - Streak multipliers (up to 5x streak bonus!).
   - Choice between **4 Chunky Blox Buttons** (Multiple Choice) or **Big Calculator Keypad** (0-9 input).
   - Visual hint system that displays the block grid if a child gets stuck.
4. **Floor is Lava: Tower Obby**:
   - 10 floating platform stones hovering over boiling lava.
   - Jump forward on correct answers with sound and particle effects.
   - Reach Stage 10 to unlock the golden chest and claim 150 Blox Bux!
5. **Glitch Bacon Boss Battle**:
   - 100 HP Glitch Monster with animated bacon hair and glowing eyes.
   - Timed turn countdown bar (15s).
   - Deal 25 damage with each correct multiplication answer to defeat the boss!
   - 200 Blox Bux prize bounty.

### 3. Pet Hatching & Avatar Shop
- **Egg Hatching Simulator**:
   - Hatch Starter Eggs (50 Bux), Neon Eggs (120 Bux), and Mythic Eggs (250 Bux).
   - Hatch pets like Blox Doge, Cyber Dragon, Cosmic Unicorn, and Sun Phoenix!
   - Equipped pets grant **1.1x up to 2.2x Blox Bux multipliers** on all solved math problems.
- **Customizable Avatar**:
   - Pick skin color, shirt color, pants color, face expressions (Happy, Cool, Wink, Star-Eyes, Silly).
   - Equip hats and gear (Propeller Hat, Ninja Headband, Golden Crown, Cool Shades, Gamer Headset, Dominus Hood).
   - Set custom gamer tag.

### 4. 100% LocalStorage Persistence
- All progress is saved automatically to the browser's `localStorage`:
  - Blox Bux balance
  - Level & XP
  - Table stars (1-12) & accuracy stats
  - Unlocked & equipped pets
  - Unlocked & equipped hats/gear
  - Avatar appearance and custom gamer tag
  - Badges & achievements

---

## 🚀 Running the App Locally

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```
