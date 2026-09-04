import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, RotateCcw } from 'lucide-react';
import type { UserProfile, Question } from '../types';
import { generateQuestion } from '../services/multiplicationData';
import { soundService } from '../services/sound';
import { AvatarDisplay } from './AvatarDisplay';

interface ObbyModeProps {
  profile: UserProfile;
  onObbyWin: (coinsWon: number) => void;
}

const TOTAL_STAGES = 10;

export const ObbyMode: React.FC<ObbyModeProps> = ({ profile, onObbyWin }) => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isWobbling, setIsWobbling] = useState<boolean>(false);
  const [isVictorious, setIsVictorious] = useState<boolean>(false);
  const [coinsWon, setCoinsWon] = useState<number>(0);

  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);
  const multiplier = equippedPet ? equippedPet.coinMultiplier : 1.0;

  useEffect(() => {
    setActiveQuestion(generateQuestion());
  }, []);

  const handleAnswer = (chosenAnswer: number) => {
    if (!activeQuestion || isJumping || isWobbling || isVictorious) return;

    if (chosenAnswer === activeQuestion.correctAnswer) {
      soundService.playJump();
      setIsJumping(true);

      setTimeout(() => {
        setIsJumping(false);
        const nextStage = currentStage + 1;

        if (nextStage > TOTAL_STAGES) {
          const reward = Math.round(150 * multiplier);
          setCoinsWon(reward);
          setIsVictorious(true);
          soundService.playFanfare();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
          });
          onObbyWin(reward);
        } else {
          setCurrentStage(nextStage);
          setActiveQuestion(generateQuestion());
        }
      }, 500);
    } else {
      soundService.playWrong();
      setIsWobbling(true);
      setTimeout(() => {
        setIsWobbling(false);
      }, 600);
    }
  };

  const restartObby = () => {
    soundService.playClick();
    setCurrentStage(1);
    setIsVictorious(false);
    setActiveQuestion(generateQuestion());
    setIsJumping(false);
    setIsWobbling(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-900/60 via-amber-900/60 to-slate-900/60 border-4 border-red-500/50 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-7 h-7 text-amber-400 animate-bounce" />
            <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
              Roblox Lava Obby Run!
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Hop across the floating blocks above the lava! Solve each multiplication fact to leap to the next stone!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2 rounded-2xl border-2 border-red-500/60 shadow-inner">
          <span className="text-xs font-bold text-slate-400 uppercase">Stage:</span>
          <span className="font-blox text-2xl text-yellow-400">
            {currentStage} / {TOTAL_STAGES}
          </span>
        </div>
      </div>

      {/* 3D Obby Visual Scene */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl border-4 border-slate-800 bg-gradient-to-b from-sky-950 via-slate-900 to-amber-950 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        <div className="flex justify-between px-6 opacity-30 text-4xl">
          <span className="animate-pulse">☁️</span>
          <span className="animate-pulse delay-500">☁️</span>
          <span className="animate-pulse delay-1000">☁️</span>
        </div>

        <div className="relative z-10 flex items-center justify-between px-2 sm:px-6 w-full my-auto">
          {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map((stage) => {
            const isCurrent = stage === currentStage;
            const isCompleted = stage < currentStage;

            return (
              <div key={stage} className="relative flex flex-col items-center">
                {isCurrent && !isVictorious && (
                  <div
                    className={`absolute -top-24 z-30 transition-all duration-300 ${
                      isJumping ? '-translate-y-12 scale-110' : isWobbling ? 'rotate-12 translate-x-2' : ''
                    }`}
                  >
                    <AvatarDisplay
                      avatar={profile.avatar}
                      equippedPet={equippedPet}
                      size="sm"
                      showPet={true}
                    />
                  </div>
                )}

                <div
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg border-2 flex items-center justify-center font-blox text-xs sm:text-sm obby-tile transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-t from-yellow-500 to-amber-300 text-zinc-950 border-white scale-125 ring-4 ring-yellow-400/60 z-20'
                      : isCompleted
                      ? 'bg-gradient-to-t from-emerald-600 to-teal-400 text-white border-emerald-300 shadow'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {stage === TOTAL_STAGES ? '🏁' : stage}
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute right-4 bottom-14 z-10 flex flex-col items-center">
          <div className="text-3xl sm:text-4xl filter drop-shadow-lg animate-bounce">
            🎁
          </div>
          <span className="text-[10px] font-black text-yellow-400 bg-black/60 px-1.5 py-0.5 rounded">
            +150 BUX
          </span>
        </div>

        <div className="relative h-10 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 rounded-b-xl flex items-center justify-around overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-red-600/30 animate-pulse"></div>
          <span className="text-xs font-black text-amber-200 tracking-widest uppercase z-10">
            🔥 DANGER! THE FLOOR IS LAVA! 🔥
          </span>
        </div>
      </div>

      {isVictorious ? (
        <div className="blox-card p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95">
          <div className="text-6xl animate-bounce">🏆</div>
          <h3 className="font-blox text-3xl sm:text-4xl text-yellow-300">
            OBBY CHAMPION!
          </h3>
          <p className="text-slate-200 font-bold max-w-md mx-auto">
            You conquered all 10 stepping stones and leaped over the lava pit like a Roblox legend!
          </p>
          <div className="bg-slate-950/80 p-4 rounded-2xl border-2 border-yellow-400/60 inline-flex items-center gap-3">
            <span className="text-sm font-bold text-slate-300">Reward:</span>
            <span className="font-blox text-2xl text-yellow-400">+{coinsWon} Blox Bux!</span>
          </div>
          <div>
            <button
              onClick={restartObby}
              className="blox-button-green text-white font-blox text-base px-8 py-3 rounded-xl shadow-xl inline-flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              PLAY AGAIN
            </button>
          </div>
        </div>
      ) : (
        activeQuestion && (
          <div className="blox-card p-5 sm:p-7 text-center space-y-5">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Platform {currentStage} Challenge
            </span>

            <div className="font-blox text-4xl sm:text-6xl text-white flex items-center justify-center gap-4">
              <span className="bg-indigo-600/40 px-4 py-2 rounded-2xl border border-indigo-400">
                {activeQuestion.factor1}
              </span>
              <span className="text-amber-400">✖</span>
              <span className="bg-purple-600/40 px-4 py-2 rounded-2xl border border-purple-400">
                {activeQuestion.factor2}
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-yellow-300">?</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2">
              {activeQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={isJumping || isWobbling}
                  className="blox-button-blue text-white font-blox text-2xl sm:text-3xl py-4 rounded-2xl shadow-lg border-b-6 active:translate-y-1"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400 font-medium italic">
              Tip: Pick the right answer to jump onto the next stepping stone!
            </p>
          </div>
        )
      )}
    </div>
  );
};
