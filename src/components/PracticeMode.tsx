import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, Flame, HelpCircle, ArrowRight, RotateCcw, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import type { UserProfile, Question } from '../types';
import { TABLE_METADATA, generateQuestion } from '../services/multiplicationData';
import { soundService } from '../services/sound';

interface PracticeModeProps {
  profile: UserProfile;
  onUpdateScore: (tableNum: number, correct: boolean, streak: number, coinsEarned: number, xpEarned: number) => void;
  onFinishRound: (tableNum: number, correctCount: number, totalCount: number) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  profile,
  onUpdateScore,
  onFinishRound,
}) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [isMixed, setIsMixed] = useState<boolean>(false);
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [coinsWonThisRound, setCoinsWonThisRound] = useState<number>(0);
  
  // Feedback state
  const [keypadInput, setKeypadInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isRoundOver, setIsRoundOver] = useState<boolean>(false);

  // Equipped pet multiplier
  const equippedPet = profile.inventoryPets.find((p) => p.id === profile.equippedPetId);
  const multiplier = equippedPet ? equippedPet.coinMultiplier : 1.0;

  // Start a new 10-question practice round
  const startRound = (tableNum: number | 'mixed') => {
    soundService.playClick();
    const mixed = tableNum === 'mixed';
    setIsMixed(mixed);
    setSelectedTable(mixed ? 0 : tableNum);

    const questions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      questions.push(generateQuestion(mixed ? undefined : tableNum));
    }
    setRoundQuestions(questions);
    setCurrentIndex(0);
    setCurrentStreak(0);
    setScore(0);
    setCoinsWonThisRound(0);
    setIsAnswered(false);
    setKeypadInput('');
    setShowHint(false);
    setIsRoundOver(false);
  };

  const handleAnswer = (answer: number) => {
    if (isAnswered) return;
    const currentQ = roundQuestions[currentIndex];
    const correct = answer === currentQ.correctAnswer;

    setIsAnswered(true);
    setIsCorrect(correct);

    let earnedCoins = 0;
    let earnedXp = 0;
    let newStreak = currentStreak;

    if (correct) {
      soundService.playCorrect();
      newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setScore((prev) => prev + 1);

      // Calculate coins: Base 5 + streak bonus * pet multiplier
      const streakBonus = Math.min(newStreak, 5);
      earnedCoins = Math.round((5 + streakBonus) * multiplier);
      earnedXp = 15;
      setCoinsWonThisRound((prev) => prev + earnedCoins);

      if (newStreak >= 3) {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } else {
      soundService.playWrong();
      newStreak = 0;
      setCurrentStreak(0);
      earnedXp = 5;
    }

    onUpdateScore(
      isMixed ? currentQ.factor1 : (selectedTable || currentQ.factor1),
      correct,
      newStreak,
      earnedCoins,
      earnedXp
    );
  };

  const handleNextQuestion = () => {
    soundService.playClick();
    if (currentIndex + 1 < roundQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setKeypadInput('');
      setShowHint(false);
    } else {
      setIsRoundOver(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      if (finalScore >= 8) {
        soundService.playFanfare();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      }
      onFinishRound(selectedTable || 1, finalScore, roundQuestions.length);
    }
  };

  // Keypad button click handler
  const handleKeypadPress = (val: string) => {
    soundService.playClick();
    if (val === 'clear') {
      setKeypadInput('');
    } else if (val === 'back') {
      setKeypadInput((prev) => prev.slice(0, -1));
    } else {
      if (keypadInput.length < 4) {
        setKeypadInput((prev) => prev + val);
      }
    }
  };

  const currentQ = roundQuestions[currentIndex];

  // VIEW 1: Round Complete Screen
  if (isRoundOver) {
    const starsEarned = score >= 10 ? 3 : score >= 8 ? 2 : score >= 5 ? 1 : 0;

    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-8">
        <div className="blox-card p-6 sm:p-10 text-center space-y-6">
          <div className="inline-block p-4 rounded-full bg-yellow-400/20 border-4 border-yellow-400 animate-bounce">
            <span className="text-5xl">🏆</span>
          </div>

          <h2 className="font-blox text-3xl sm:text-4xl text-yellow-300">
            ROUND COMPLETED!
          </h2>

          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={`w-12 h-12 transition-all ${
                  s <= starsEarned
                    ? 'text-yellow-400 fill-yellow-400 scale-125 filter drop-shadow-md'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>

          <p className="text-lg font-bold text-slate-200">
            You solved <span className="text-yellow-400 font-black text-2xl">{score}</span> out of{' '}
            <span className="text-white font-black text-2xl">{roundQuestions.length}</span> correct!
          </p>

          <div className="bg-slate-950/80 border-2 border-amber-500/40 p-4 rounded-2xl flex items-center justify-around max-w-sm mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Blox Bux Earned</span>
              <div className="flex items-center gap-1.5 text-yellow-400 font-blox text-2xl mt-1">
                <span>R$</span>
                <span>+{coinsWonThisRound}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800"></div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold uppercase">Accuracy</span>
              <span className="text-cyan-400 font-blox text-2xl mt-1">
                {Math.round((score / roundQuestions.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => startRound(isMixed ? 'mixed' : (selectedTable || 1))}
              className="blox-button-green text-white font-blox text-base px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              PLAY AGAIN
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setSelectedTable(null);
              }}
              className="blox-button-blue text-white font-blox text-base px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              CHOOSE ANOTHER TABLE
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: Active Question Playing Screen
  if (selectedTable !== null && currentQ) {
    return (
      <div className="max-w-3xl mx-auto p-3 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              soundService.playClick();
              setSelectedTable(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all"
          >
            ← Exit Round
          </button>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              Question {currentIndex + 1} / {roundQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/50 px-3 py-1.5 rounded-xl text-amber-300 font-blox text-sm">
            <Flame className={`w-4 h-4 ${currentStreak > 0 ? 'text-orange-400 animate-bounce' : 'text-slate-500'}`} />
            <span>Streak: {currentStreak}</span>
            {currentStreak >= 3 && (
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">
                BONUS!
              </span>
            )}
          </div>
        </div>

        <div className="blox-card p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
              {isMixed ? 'Mixed 1-12 Challenge' : `Table of ${currentQ.factor1}`}
            </span>
          </div>

          <div className="py-2">
            <div className="font-blox text-5xl sm:text-7xl text-white tracking-wide flex items-center justify-center gap-4 sm:gap-6">
              <span className="bg-indigo-600/40 px-4 sm:px-6 py-2 rounded-2xl border-2 border-indigo-400/40 shadow-inner">
                {currentQ.factor1}
              </span>
              <span className="text-amber-400 text-4xl sm:text-6xl">✖</span>
              <span className="bg-purple-600/40 px-4 sm:px-6 py-2 rounded-2xl border-2 border-purple-400/40 shadow-inner">
                {currentQ.factor2}
              </span>
              <span className="text-slate-400 text-4xl sm:text-6xl">=</span>
              <span className="bg-slate-950 px-4 sm:px-6 py-2 rounded-2xl border-2 border-yellow-400/80 text-yellow-300 min-w-[90px] sm:min-w-[120px] shadow-lg">
                {isAnswered
                  ? currentQ.correctAnswer
                  : profile.inputMode === 'keypad'
                  ? keypadInput || '?'
                  : '?'}
              </span>
            </div>
          </div>

          {isAnswered ? (
            <div
              className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-200 ${
                isCorrect
                  ? 'bg-green-950/80 border-green-500 text-green-300'
                  : 'bg-red-950/80 border-red-500 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2 text-lg font-blox">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <span>AWESOME JOB! CORRECT!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-400" />
                    <span>OOF! The correct answer is {currentQ.correctAnswer}</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 max-w-md font-medium">
                {currentQ.hint}
              </p>

              <button
                onClick={handleNextQuestion}
                className="mt-2 blox-button-green text-white font-blox text-base sm:text-lg px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <span>NEXT QUESTION</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  soundService.playClick();
                  setShowHint(!showHint);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-yellow-200 bg-amber-950/40 hover:bg-amber-900/40 px-3 py-1.5 rounded-xl border border-amber-600/40 transition-all font-bold"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>

              {showHint && (
                <div className="mt-4 bg-slate-950/90 border-2 border-amber-500/50 p-4 rounded-2xl max-w-md mx-auto space-y-2 animate-in fade-in">
                  <div className="text-xs font-bold text-amber-400">
                    Visual Array: {currentQ.factor1} rows of {currentQ.factor2} blocks
                  </div>
                  <div className="flex justify-center overflow-auto max-h-32 py-1">
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: `repeat(${currentQ.factor2}, minmax(0, 1fr))` }}
                    >
                      {Array.from({ length: currentQ.factor1 * currentQ.factor2 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3.5 h-3.5 rounded-xs bg-cyan-400 border border-cyan-200"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 italic">{currentQ.hint}</p>
                </div>
              )}
            </div>
          )}

          {!isAnswered && (
            <div>
              {profile.inputMode === 'multiple-choice' ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const colors = [
                      'blox-button-blue',
                      'blox-button-purple',
                      'blox-button-yellow',
                      'blox-button-green',
                    ];
                    const colorClass = colors[idx % colors.length];

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        className={`${colorClass} text-white font-blox text-3xl sm:text-4xl py-4 sm:py-5 rounded-2xl shadow-lg border-b-6 flex items-center justify-center`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="max-w-xs mx-auto space-y-3 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'].map(
                      (key) => (
                        <button
                          key={key}
                          onClick={() => handleKeypadPress(key)}
                          className="h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-blox text-xl border-b-3 border-slate-950 active:translate-y-0.5 active:border-b-0 shadow"
                        >
                          {key === 'clear' ? 'C' : key === 'back' ? '⌫' : key}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    disabled={!keypadInput}
                    onClick={() => handleAnswer(parseInt(keypadInput, 10))}
                    className={`w-full py-3 rounded-xl font-blox text-lg text-white shadow-lg transition-all ${
                      keypadInput
                        ? 'blox-button-green cursor-pointer'
                        : 'bg-slate-700 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    SUBMIT ANSWER
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // VIEW 3: Table Selection Menu (1 to 12 & Mixed)
  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900/60 border-4 border-purple-500/40 p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
            Multiplication Table Academy
          </h2>
          <p className="text-slate-300 text-sm mt-1">
            Pick a specific table to master with 3 stars ⭐, or test your skills on the Mixed Challenge!
          </p>
        </div>

        <button
          onClick={() => startRound('mixed')}
          className="blox-button-purple text-white font-blox text-base px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl whitespace-nowrap"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>ALL TABLES MIXED (1-12)</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((tableNum) => {
          const info = TABLE_METADATA[tableNum];
          const progress = profile.tablesProgress[tableNum];
          const stars = progress?.stars || 0;

          return (
            <div
              key={tableNum}
              className="blox-card p-4 flex flex-col justify-between hover:border-indigo-400 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 border-2 border-indigo-300 flex items-center justify-center text-white font-blox text-2xl shadow">
                  {tableNum}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= stars
                          ? 'text-yellow-400 fill-yellow-400 filter drop-shadow'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="my-3">
                <h4 className="font-blox text-base text-white group-hover:text-yellow-300 transition-colors">
                  {info.name}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-medium">
                  {info.trick}
                </p>
              </div>

              <button
                onClick={() => startRound(tableNum)}
                className="w-full blox-button-green text-white font-blox text-xs sm:text-sm py-2 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <span>PRACTICE</span>
                <span>→</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
