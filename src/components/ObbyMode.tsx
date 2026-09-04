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
    <div className="max-w-5xl mx-auto p-3 sm:p-5 space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-900/60 via-amber-900/60 to-slate-900/60 border-4 border-red-500/50 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
            <h2 className="font-blox text-xl sm:text-2xl text-yellow-300">
              Roblox Lava Obby Run!
            </h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Hop across floating stones above boiling lava! Solve each fact to leap forward!
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-950/80 px-3.5 py-1.5 rounded-2xl border-2 border-red-500/60 shadow-inner">
          <span className="text-xs font-bold text-slate-400 uppercase">Stage:</span>
          <span className="font-blox text-xl sm:text-2xl text-yellow-400">
            {currentStage} / {TOTAL_STAGES}
          </span>
        </div>
      </div>

      {/* Responsive Split View: Left = 3D Obby Visual Scene, Right = Question Input / Victory */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: 3D Obby Visual Scene */}
        <div className="md:col-span-7">
          <div className="relative w-full min-h-[290px] md:min-h-[360px] h-full rounded-3xl border-4 border-slate-800 bg-gradient-to-b from-sky-950 via-slate-900 to-amber-950 overflow-hidden shadow-2xl flex flex-col justify-between p-4">
            <div className="flex justify-between px-4 opacity-30 text-3xl">
              <span className="animate-pulse">☁️</span>
              <span className="animate-pulse delay-500">☁️</span>
              <span className="animate-pulse delay-1000">☁️</span>
            </div>

            <div className="relative z-10 flex items-center justify-between px-1 sm:px-3 w-full my-auto">
              {Array.from({ length: TOTAL_STAGES }, (_, i) => i + 1).map((stage) => {
                const isCurrent = stage === currentStage;
                const isCompleted = stage < currentStage;

                return (
                  <div key={stage} className="relative flex flex-col items-center">
                    {isCurrent && !isVictorious && (
                      <div
                        className={`absolute -top-20 z-30 transition-all duration-300 ${
                          isJumping ? '-translate-y-10 scale-110' : isWobbling ? 'rotate-12 translate-x-2' : ''
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
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg border-2 flex items-center justify-center font-blox text-[11px] sm:text-xs obby-tile transition-all ${
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

            <div className="absolute right-3 bottom-12 z-10 flex flex-col items-center">
              <div className="text-2xl sm:text-3xl filter drop-shadow-lg animate-bounce">
                🎁
              </div>
              <span className="text-[9px] font-black text-yellow-400 bg-black/60 px-1.5 py-0.5 rounded">
                +150 BUX
              </span>
            </div>

            <div className="relative h-9 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 rounded-b-xl flex items-center justify-around overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-red-600/30 animate-pulse"></div>
              <span className="text-[11px] font-black text-amber-200 tracking-widest uppercase z-10">
                🔥 DANGER! THE FLOOR IS LAVA! 🔥
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Platform Challenge Input / Victory Screen */}
        <div className="md:col-span-5 flex flex-col justify-center">
          {isVictorious ? (
            <div className="blox-card p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 h-full flex flex-col justify-center items-center">
              <div className="text-5xl sm:text-6xl animate-bounce">🏆</div>
              <h3 className="font-blox text-2xl sm:text-3xl text-yellow-300">
                OBBY CHAMPION!
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-bold max-w-xs mx-auto">
                You conquered all 10 stepping stones and leaped over the lava pit like a Roblox legend!
              </p>
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border-2 border-yellow-400/60 inline-flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Reward:</span>
                <span className="font-blox text-xl sm:text-2xl text-yellow-400">+{coinsWon} Blox Bux!</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={restartObby}
                  className="blox-button-green text-white font-blox text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-xl inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  PLAY AGAIN
                </button>
              </div>
            </div>
          ) : (
            activeQuestion && (
              <div className="blox-card p-4 sm:p-5 text-center space-y-4 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[11px] font-black uppercase text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800 tracking-wider">
                    Platform {currentStage} Leap Challenge
                  </span>

                  <div className="font-blox text-3xl sm:text-4xl lg:text-5xl text-white flex items-center justify-center gap-3 mt-2">
                    <span className="bg-indigo-600/40 px-3.5 py-1 rounded-2xl border border-indigo-400">
                      {activeQuestion.factor1}
                    </span>
                    <span className="text-amber-400">✖</span>
                    <span className="bg-purple-600/40 px-3.5 py-1 rounded-2xl border border-purple-400">
                      {activeQuestion.factor2}
                    </span>
                    <span className="text-slate-400">=</span>
                    <span className="text-yellow-300">?</span>
                  </div>
                </div>

                {/* 2x2 Answer Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {activeQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      disabled={isJumping || isWobbling}
                      className="blox-button-blue text-white font-blox text-2xl sm:text-3xl py-3 sm:py-4 rounded-2xl shadow-lg border-b-6 active:translate-y-1 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 font-medium italic">
                  Tip: Pick the right answer to leap onto the next stone!
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
