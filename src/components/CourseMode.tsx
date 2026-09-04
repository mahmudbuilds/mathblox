import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import type { UserProfile, Question } from '../types';
import { TABLE_METADATA, generateQuestion } from '../services/multiplicationData';
import { soundService } from '../services/sound';

interface CourseModeProps {
  profile: UserProfile;
  onCompleteCourseTable: (tableNum: number, coinsEarned: number) => void;
}

interface CoursePhase {
  phaseNumber: number;
  title: string;
  subtitle: string;
  color: string;
  tables: number[];
}

const COURSE_PHASES: CoursePhase[] = [
  {
    phaseNumber: 1,
    title: 'Stage 1: The Easy Launchers',
    subtitle: 'Learn the mirror rule, doubling numbers, and adding zeros!',
    color: 'from-blue-600 to-indigo-600 border-blue-400',
    tables: [1, 2, 10],
  },
  {
    phaseNumber: 2,
    title: 'Stage 2: The Fast Rhythms',
    subtitle: 'Clock minutes pattern and twin digits magic!',
    color: 'from-emerald-600 to-teal-600 border-emerald-400',
    tables: [5, 11],
  },
  {
    phaseNumber: 3,
    title: 'Stage 3: The Secret Magicians',
    subtitle: 'Skip counting chants, double-doubles, and 9s finger trick!',
    color: 'from-amber-600 to-orange-600 border-amber-400',
    tables: [3, 4, 9],
  },
  {
    phaseNumber: 4,
    title: 'Stage 4: The Titan Tables',
    subtitle: 'Catchy rhymes, the 56=7×8 trick, and dozen dynamite!',
    color: 'from-rose-600 to-purple-600 border-rose-400',
    tables: [6, 7, 8, 12],
  },
];

export const CourseMode: React.FC<CourseModeProps> = ({ profile, onCompleteCourseTable }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [lessonStep, setLessonStep] = useState<'trick' | 'flashcards' | 'quiz' | 'certified'>('trick');
  
  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(1); // 1 to 12
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Mini quiz state
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const startTableLesson = (tableNum: number) => {
    soundService.playClick();
    setSelectedTable(tableNum);
    setLessonStep('trick');
    setFlashcardIndex(1);
    setIsFlipped(false);
  };

  const startFlashcards = () => {
    soundService.playClick();
    setLessonStep('flashcards');
    setFlashcardIndex(1);
    setIsFlipped(false);
  };

  const startQuiz = () => {
    soundService.playClick();
    if (!selectedTable) return;
    const questions: Question[] = [];
    for (let i = 0; i < 3; i++) {
      questions.push(generateQuestion(selectedTable));
    }
    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setLessonStep('quiz');
  };

  const handleQuizAnswer = (ans: number) => {
    if (quizAnswered) return;
    const currentQ = quizQuestions[quizIndex];
    const correct = ans === currentQ.correctAnswer;
    setQuizAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
      setQuizScore((prev) => prev + 1);
    } else {
      soundService.playWrong();
    }
  };

  const handleNextQuizQuestion = () => {
    soundService.playClick();
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizAnswered(false);
    } else {
      // Quiz complete
      const finalScore = quizScore + (isCorrect ? 1 : 0);
      if (finalScore >= 3 && selectedTable) {
        soundService.playFanfare();
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.5 },
        });
        setLessonStep('certified');
        onCompleteCourseTable(selectedTable, 50);
      } else {
        alert(`You got ${finalScore}/3! Let's practice with the flashcards once more to get 3/3!`);
        startFlashcards();
      }
    }
  };

  const completedCount = profile.courseCompletedTables.length;
  const progressPercent = Math.round((completedCount / 12) * 100);

  if (selectedTable !== null) {
    const meta = TABLE_METADATA[selectedTable];

    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              soundService.playClick();
              setSelectedTable(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Course
          </button>

          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-700 text-xs font-blox">
            <button
              onClick={() => {
                soundService.playClick();
                setLessonStep('trick');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                lessonStep === 'trick'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. The Secret
            </button>
            <button
              onClick={startFlashcards}
              className={`px-3 py-1 rounded-lg transition-all ${
                lessonStep === 'flashcards'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Flashcards
            </button>
            <button
              onClick={startQuiz}
              className={`px-3 py-1 rounded-lg transition-all ${
                lessonStep === 'quiz' || lessonStep === 'certified'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Checkpoint
            </button>
          </div>
        </div>

        {lessonStep === 'trick' && (
          <div className="blox-card p-6 sm:p-8 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 px-3 py-1 rounded-full text-xs font-black uppercase">
              <Sparkles className="w-4 h-4" /> Step 1: The Master Secret
            </div>

            <h2 className="font-blox text-3xl sm:text-4xl text-white">
              Table of {selectedTable}: {meta.name}
            </h2>

            <div className="bg-indigo-950/60 border-3 border-indigo-500/50 p-5 rounded-2xl max-w-xl mx-auto space-y-3">
              <span className="text-3xl">💡</span>
              <p className="text-base sm:text-lg text-slate-100 font-bold leading-relaxed">
                {meta.trick}
              </p>
              {meta.rhyme && (
                <div className="bg-purple-900/50 border border-purple-400/50 p-3 rounded-xl">
                  <span className="text-xs font-black text-pink-400 uppercase">Rhyme Chant:</span>
                  <p className="text-base font-extrabold text-pink-200 mt-1 italic">
                    "{meta.rhyme}"
                  </p>
                </div>
              )}
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Tap each number to chant the {selectedTable}s rhythm!
              </span>
              <div className="flex flex-wrap gap-2 justify-center pt-1">
                {meta.skipCount.map((num, i) => (
                  <button
                    key={i}
                    onClick={() => soundService.playCoin()}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-800 hover:bg-yellow-400 hover:text-zinc-950 text-white font-blox text-base border-b-3 border-slate-950 active:translate-y-0.5 active:border-b-0 shadow transition-all flex items-center justify-center"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={startFlashcards}
                className="blox-button-green text-white font-blox text-lg px-8 py-3.5 rounded-2xl shadow-xl inline-flex items-center gap-2"
              >
                <span>I'M READY! PRACTICE FLASHCARDS</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {lessonStep === 'flashcards' && (
          <div className="blox-card p-6 sm:p-8 space-y-6 text-center">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <span className="text-xs font-bold text-slate-400">
                Card {flashcardIndex} of 12
              </span>
              <span className="text-xs font-black text-yellow-400 bg-yellow-950/60 px-2.5 py-0.5 rounded-full border border-yellow-500/40">
                Tap Card to Flip! 🔄
              </span>
            </div>

            <div
              onClick={() => {
                soundService.playClick();
                setIsFlipped(!isFlipped);
              }}
              className={`w-full max-w-md h-64 mx-auto rounded-3xl p-6 border-4 cursor-pointer shadow-2xl transition-all duration-300 flex flex-col items-center justify-center select-none ${
                isFlipped
                  ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-400 ring-4 ring-emerald-500/30'
                  : 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-indigo-400 ring-4 ring-indigo-500/30'
              }`}
            >
              {!isFlipped ? (
                <div className="space-y-4 animate-in fade-in">
                  <span className="text-xs font-black uppercase text-indigo-300 tracking-wider">
                    What is the answer?
                  </span>
                  <div className="font-blox text-5xl sm:text-6xl text-white">
                    {selectedTable} ✖ {flashcardIndex} = ?
                  </div>
                  <p className="text-xs text-slate-400 font-bold">
                    (Tap card to reveal the answer and blocks!)
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-in zoom-in-95">
                  <span className="text-xs font-black uppercase text-emerald-300 tracking-wider">
                    Answer:
                  </span>
                  <div className="font-blox text-5xl sm:text-6xl text-yellow-300">
                    {selectedTable * flashcardIndex}
                  </div>
                  <div className="text-xs text-slate-200 font-bold bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
                    {selectedTable} groups of {flashcardIndex} = {selectedTable * flashcardIndex}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
              <button
                disabled={flashcardIndex <= 1}
                onClick={() => {
                  soundService.playClick();
                  setFlashcardIndex((prev) => Math.max(1, prev - 1));
                  setIsFlipped(false);
                }}
                className="blox-button-blue text-white font-blox text-sm px-4 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {flashcardIndex < 12 ? (
                <button
                  onClick={() => {
                    soundService.playClick();
                    setFlashcardIndex((prev) => Math.min(12, prev + 1));
                    setIsFlipped(false);
                  }}
                  className="blox-button-green text-white font-blox text-sm px-6 py-2.5 rounded-xl shadow"
                >
                  Next Card →
                </button>
              ) : (
                <button
                  onClick={startQuiz}
                  className="blox-button-yellow text-zinc-950 font-blox text-sm px-6 py-2.5 rounded-xl shadow-lg animate-bounce"
                >
                  TAKE CHECKPOINT QUIZ! 🚀
                </button>
              )}
            </div>
          </div>
        )}

        {lessonStep === 'quiz' && quizQuestions[quizIndex] && (
          <div className="blox-card p-6 sm:p-8 space-y-6 text-center">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <span className="text-xs font-black uppercase text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                Checkpoint Quiz (Need 3/3 to Pass!)
              </span>
              <span className="text-xs font-bold text-slate-400">
                Question {quizIndex + 1} / 3
              </span>
            </div>

            <div className="font-blox text-5xl sm:text-6xl text-white py-2 flex items-center justify-center gap-4">
              <span className="bg-indigo-600/40 px-4 py-1.5 rounded-2xl border border-indigo-400">
                {quizQuestions[quizIndex].factor1}
              </span>
              <span className="text-amber-400">✖</span>
              <span className="bg-purple-600/40 px-4 py-1.5 rounded-2xl border border-purple-400">
                {quizQuestions[quizIndex].factor2}
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-yellow-300">
                {quizAnswered ? quizQuestions[quizIndex].correctAnswer : '?'}
              </span>
            </div>

            {!quizAnswered ? (
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                {quizQuestions[quizIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt)}
                    className="blox-button-purple text-white font-blox text-3xl py-4 rounded-2xl shadow-lg border-b-6"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className={`p-4 rounded-2xl border-3 max-w-md mx-auto flex flex-col items-center gap-2 ${
                  isCorrect
                    ? 'bg-green-950/80 border-green-500 text-green-300'
                    : 'bg-red-950/80 border-red-500 text-red-300'
                }`}
              >
                <div className="font-blox text-lg flex items-center gap-2">
                  {isCorrect ? 'AWESOME! CORRECT!' : 'UH OH! Keep this one in mind!'}
                </div>
                <button
                  onClick={handleNextQuizQuestion}
                  className="mt-2 blox-button-green text-white font-blox text-base px-6 py-2.5 rounded-xl flex items-center gap-2"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {lessonStep === 'certified' && (
          <div className="blox-card p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95">
            <div className="text-6xl animate-bounce">🎓</div>
            <h3 className="font-blox text-3xl sm:text-4xl text-yellow-300">
              TABLE {selectedTable} CERTIFIED!
            </h3>
            <p className="text-slate-200 font-bold max-w-md mx-auto">
              Outstanding work! You mastered the secret trick, flipped all the flashcards, and scored 3/3 on the checkpoint quiz!
            </p>
            <div className="bg-slate-950/80 p-4 rounded-2xl border-2 border-yellow-400 inline-flex items-center gap-2">
              <span className="text-sm font-bold text-slate-300">Course Bounty:</span>
              <span className="font-blox text-2xl text-yellow-400">+50 Blox Bux!</span>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="blox-button-green text-white font-blox text-base px-8 py-3 rounded-xl shadow-xl"
              >
                BACK TO COURSE SYLLABUS
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-4 border-blue-500/50 p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-yellow-400 animate-bounce" />
            <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
              Blox Multiplication Academy Course
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            A step-by-step guided journey to memorize all 12 tables! Master secrets, flip flashcards, and pass checkpoints to earn your Blox Diploma!
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border-2 border-blue-500/60 shadow-inner">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-blox text-lg">
            {completedCount}/12
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Course Progress</div>
            <div className="font-blox text-base text-yellow-400">{progressPercent}% Completed</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {COURSE_PHASES.map((phase) => (
          <div key={phase.phaseNumber} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-yellow-400 rounded-full"></span>
              <div>
                <h3 className="font-blox text-lg text-white">{phase.title}</h3>
                <p className="text-xs text-slate-400 font-medium">{phase.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {phase.tables.map((tableNum) => {
                const meta = TABLE_METADATA[tableNum];
                const isCompleted = profile.courseCompletedTables.includes(tableNum);

                return (
                  <div
                    key={tableNum}
                    className={`blox-card p-5 flex flex-col justify-between space-y-3 transition-all ${
                      isCompleted ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 border-2 border-indigo-300 flex items-center justify-center text-white font-blox text-2xl shadow">
                        {tableNum}
                      </div>

                      {isCompleted ? (
                        <div className="flex items-center gap-1 bg-green-950 border border-green-500 text-green-400 px-2 py-0.5 rounded-full text-xs font-blox">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>CERTIFIED</span>
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase font-black tracking-wider text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded-full border border-yellow-500/40">
                          +50 BUX
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-blox text-base text-white">{meta.name}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-medium">
                        {meta.trick}
                      </p>
                    </div>

                    <button
                      onClick={() => startTableLesson(tableNum)}
                      className={`w-full py-2.5 rounded-xl font-blox text-xs sm:text-sm shadow flex items-center justify-center gap-1.5 transition-all ${
                        isCompleted
                          ? 'blox-button-blue text-white'
                          : 'blox-button-green text-white'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isCompleted ? 'REVIEW LESSON' : 'START LESSON'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
