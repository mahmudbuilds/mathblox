import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Skull, Heart, RotateCcw, Clock } from 'lucide-react';
import type { UserProfile, Question } from '../types';
import { generateQuestion } from '../services/multiplicationData';
import { soundService } from '../services/sound';
import { AvatarDisplay } from './AvatarDisplay';

interface BossBattleProps {
  profile: UserProfile;
  onBossDefeated: (coinsWon: number) => void;
}

const BOSS_MAX_HP = 100;
const DAMAGE_PER_HIT = 25;
const QUESTION_TIME_LIMIT = 15;

export const BossBattle: React.FC<BossBattleProps> = ({ profile, onBossDefeated }) => {
  const [bossHp, setBossHp] = useState<number>(BOSS_MAX_HP);
  const [playerHearts, setPlayerHearts] = useState<number>(3);
  const [activeQuestion, setActiveQuestion] = useState<Question>(() => generateQuestion());
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);
  const [isBossHurt, setIsBossHurt] = useState<boolean>(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'playing' | 'victory' | 'defeat'>('playing');
  const [coinsWon, setCoinsWon] = useState<number>(0);

  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);
  const multiplier = equippedPet ? equippedPet.coinMultiplier : 1.0;

  const handleTimeOut = () => {
    soundService.playWrong();
    setPlayerHearts((hearts) => {
      const newHearts = hearts - 1;
      if (newHearts <= 0) {
        setGameState('defeat');
      } else {
        setActiveQuestion(generateQuestion());
      }
      return newHearts;
    });
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return QUESTION_TIME_LIMIT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, activeQuestion]);

  const handleAnswer = (chosenAnswer: number) => {
    if (!activeQuestion || gameState !== 'playing') return;

    if (chosenAnswer === activeQuestion.correctAnswer) {
      soundService.playBossHit();
      setIsPlayerAttacking(true);
      setIsBossHurt(true);

      setTimeout(() => {
        setIsPlayerAttacking(false);
        setIsBossHurt(false);

        const newHp = Math.max(0, bossHp - DAMAGE_PER_HIT);
        setBossHp(newHp);

        if (newHp <= 0) {
          const reward = Math.round(200 * multiplier);
          setCoinsWon(reward);
          setGameState('victory');
          soundService.playFanfare();
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.5 },
          });
          onBossDefeated(reward);
        } else {
          setActiveQuestion(generateQuestion());
          setTimeLeft(QUESTION_TIME_LIMIT);
        }
      }, 400);
    } else {
      soundService.playWrong();
      setPlayerHearts((hearts) => {
        const newHearts = hearts - 1;
        if (newHearts <= 0) {
          setGameState('defeat');
        } else {
          setActiveQuestion(generateQuestion());
          setTimeLeft(QUESTION_TIME_LIMIT);
        }
        return newHearts;
      });
    }
  };

  const restartBattle = () => {
    soundService.playClick();
    setBossHp(BOSS_MAX_HP);
    setPlayerHearts(3);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGameState('playing');
    setActiveQuestion(generateQuestion());
    setIsBossHurt(false);
    setIsPlayerAttacking(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-5 space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-slate-900/70 border-4 border-rose-600/50 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Skull className="w-7 h-7 text-rose-400 animate-pulse" />
            <h2 className="font-blox text-xl sm:text-2xl text-rose-300">
              GLITCH BACON BOSS BATTLE!
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Solve multiplication problems to blast the Glitch Boss with math power!
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-2xl border-2 border-slate-700">
          <span className="text-xs font-bold text-slate-400 mr-1 uppercase">Lives:</span>
          {[1, 2, 3].map((h) => (
            <Heart
              key={h}
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                h <= playerHearts ? 'text-red-500 fill-red-500 scale-110' : 'text-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Responsive Split View: Left = Battle Arena, Right = Combat Input / Results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Battle Arena Visual Clash */}
        <div className="md:col-span-7">
          <div className="relative bg-slate-950/90 border-4 border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl overflow-hidden min-h-[300px] md:min-h-[360px] h-full flex flex-col justify-between">
            {/* Boss Health Bar */}
            <div className="w-full max-w-md mx-auto space-y-1.5">
              <div className="flex justify-between items-center text-xs font-blox tracking-wider">
                <span className="text-rose-400 flex items-center gap-1">
                  <Skull className="w-4 h-4" /> GLITCH BACON OVERLORD
                </span>
                <span className="text-yellow-400">
                  {bossHp} / {BOSS_MAX_HP} HP
                </span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full border-2 border-rose-900 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(bossHp / BOSS_MAX_HP) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Arena Characters Clash */}
            <div className="flex items-center justify-around py-4 relative my-auto">
              <div
                className={`transition-all duration-300 ${
                  isPlayerAttacking ? 'translate-x-12 scale-110' : ''
                }`}
              >
                <div className="sm:hidden">
                  <AvatarDisplay
                    avatar={profile.avatar}
                    equippedPet={equippedPet}
                    size="md"
                    showPet={true}
                  />
                </div>
                <div className="hidden sm:block">
                  <AvatarDisplay
                    avatar={profile.avatar}
                    equippedPet={equippedPet}
                    size="lg"
                    showPet={true}
                  />
                </div>
                <span className="block text-center font-blox text-xs text-cyan-300 mt-2">
                  {profile.username}
                </span>
              </div>

              {isPlayerAttacking && (
                <div className="text-4xl sm:text-5xl animate-ping absolute z-20">⚡</div>
              )}

              <div
                className={`flex flex-col items-center transition-all duration-200 ${
                  isBossHurt ? 'translate-x-4 scale-95 brightness-200 filter hue-rotate-90' : 'animate-bounce'
                }`}
              >
                <div className="relative scale-90 sm:scale-100 transition-transform">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    <div className="w-5 h-8 bg-amber-700 border-2 border-amber-950 rounded-t-md rotate-[-15deg]"></div>
                    <div className="w-6 h-9 bg-amber-600 border-2 border-amber-950 rounded-t-md"></div>
                    <div className="w-5 h-8 bg-amber-700 border-2 border-amber-950 rounded-t-md rotate-[15deg]"></div>
                  </div>

                  <div className="w-20 h-20 bg-red-600 border-4 border-black rounded-2xl flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                    <div className="flex space-x-4 mb-2">
                      <div className="w-4 h-4 bg-yellow-300 border-2 border-black rounded-xs animate-ping"></div>
                      <div className="w-4 h-4 bg-yellow-300 border-2 border-black rounded-xs animate-ping"></div>
                    </div>
                    <div className="w-8 h-3 bg-black rounded-sm flex items-center justify-center">
                      <div className="w-2 h-1 bg-white"></div>
                    </div>
                  </div>

                  <div className="w-24 h-20 bg-zinc-900 border-4 border-black rounded-lg -mt-1 mx-auto flex items-center justify-center">
                    <span className="text-2xl text-rose-500 font-blox">✖️</span>
                  </div>
                </div>

                <span className="font-blox text-xs text-rose-400 mt-2">
                  Bacon Glitch Boss
                </span>
              </div>
            </div>

            {/* Turn Timer Bar */}
            {gameState === 'playing' && (
              <div className="w-full max-w-xs mx-auto flex items-center gap-2">
                <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-500 animate-spin' : 'text-slate-400'}`} />
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      timeLeft <= 5 ? 'bg-red-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-blox ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Battle Combat Input or Game Over / Victory Screen */}
        <div className="md:col-span-5 flex flex-col justify-center">
          {gameState === 'victory' && (
            <div className="blox-card p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 h-full flex flex-col justify-center items-center">
              <div className="text-5xl sm:text-6xl animate-bounce">👑</div>
              <h3 className="font-blox text-2xl sm:text-3xl text-yellow-300">
                BOSS DESTROYED!
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-bold">
                You shattered the Glitch Boss with your multiplication mastery!
              </p>
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border-2 border-yellow-400 inline-flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Prize Bounty:</span>
                <span className="font-blox text-xl sm:text-2xl text-yellow-400">+{coinsWon} Blox Bux!</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={restartBattle}
                  className="blox-button-green text-white font-blox text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xl cursor-pointer"
                >
                  BATTLE AGAIN
                </button>
              </div>
            </div>
          )}

          {gameState === 'defeat' && (
            <div className="blox-card p-6 sm:p-8 text-center space-y-4 h-full flex flex-col justify-center items-center">
              <div className="text-5xl sm:text-6xl">💥</div>
              <h3 className="font-blox text-2xl sm:text-3xl text-rose-400">
                THE BOSS ESCAPED!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium">
                Don't give up! Practice your multiplication tables and try again!
              </p>
              <div className="pt-2">
                <button
                  onClick={restartBattle}
                  className="blox-button-red text-white font-blox text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xl flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  TRY AGAIN
                </button>
              </div>
            </div>
          )}

          {gameState === 'playing' && activeQuestion && (
            <div className="blox-card p-3.5 sm:p-5 text-center space-y-3 sm:space-y-4 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-wider text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-800">
                  Target Boss Weakness
                </span>
                <div className="font-blox text-3xl sm:text-4xl lg:text-5xl text-white flex items-center justify-center gap-2 sm:gap-3 mt-2">
                  <span className="bg-indigo-600/40 px-2.5 sm:px-3.5 py-1 rounded-2xl border border-indigo-400">
                    {activeQuestion.factor1}
                  </span>
                  <span className="text-rose-400 text-2xl sm:text-4xl">✖</span>
                  <span className="bg-purple-600/40 px-2.5 sm:px-3.5 py-1 rounded-2xl border border-purple-400">
                    {activeQuestion.factor2}
                  </span>
                  <span className="text-slate-400 text-2xl sm:text-4xl">=</span>
                  <span className="text-yellow-300">?</span>
                </div>
              </div>

              {/* 2x2 Answer Buttons Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    className="blox-button-purple text-white font-blox text-2xl sm:text-3xl py-3 sm:py-4 min-h-[54px] rounded-2xl shadow-lg border-b-4 sm:border-b-6 active:translate-y-1 cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 font-medium">
                Tap the correct product to trigger a lightning rocket attack!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
