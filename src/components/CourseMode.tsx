import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Zap,
  Flame,
  RotateCcw,
  Trophy,
} from 'lucide-react';
import type { UserProfile } from '../types';
import { TABLE_METADATA, generateDistractors } from '../services/multiplicationData';
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
    subtitle: 'Master the mirror rule, doubling numbers, and pasting zeros!',
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
    subtitle: 'Double-doubles, 3s tri-force, and the 9s finger trick!',
    color: 'from-amber-600 to-orange-600 border-amber-400',
    tables: [3, 4, 9],
  },
  {
    phaseNumber: 4,
    title: 'Stage 4: The Titan Tables',
    subtitle: 'Catchy rhymes, the 56=7×8 sequence, and dozen dynamite!',
    color: 'from-rose-600 to-purple-600 border-rose-400',
    tables: [6, 7, 8, 12],
  },
];

interface DrillCard {
  factor: number;
  isRetry?: boolean;
}

interface CheckpointQuestion {
  factor1: number;
  factor2: number;
  correctAnswer: number;
  options: number[];
  hint: string;
}

export const CourseMode: React.FC<CourseModeProps> = ({ profile, onCompleteCourseTable }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [lessonStep, setLessonStep] = useState<'cheat-code' | 'drill' | 'checkpoint' | 'certified' | 'checkpoint-retry'>('cheat-code');

  // Step 1: Interactive Block Array factor
  const [arrayMultiplier, setArrayMultiplier] = useState<number>(4);

  // Step 2: Gamified Rapid-Recall Drill State
  const [drillQueue, setDrillQueue] = useState<DrillCard[]>([]);
  const [currentDrillIndex, setCurrentDrillIndex] = useState<number>(0);
  const [drillOptions, setDrillOptions] = useState<number[]>([]);
  const [drillAnswered, setDrillAnswered] = useState<boolean>(false);
  const [drillIsCorrect, setDrillIsCorrect] = useState<boolean>(false);
  const [drillStreak, setDrillStreak] = useState<number>(0);
  const [drillMasteredCount, setDrillMasteredCount] = useState<number>(0);
  const [remediationHint, setRemediationHint] = useState<string | null>(null);

  // Step 3: Checkpoint Blitz State
  const [checkpointQuestions, setCheckpointQuestions] = useState<CheckpointQuestion[]>([]);
  const [checkpointIndex, setCheckpointIndex] = useState<number>(0);
  const [checkpointScore, setCheckpointScore] = useState<number>(0);
  const [checkpointAnswered, setCheckpointAnswered] = useState<boolean>(false);
  const [checkpointIsCorrect, setCheckpointIsCorrect] = useState<boolean>(false);

  // 1. Launch a table lesson
  const startTableLesson = (tableNum: number) => {
    soundService.playClick();
    setSelectedTable(tableNum);
    setLessonStep('cheat-code');
    setArrayMultiplier(Math.min(4, 12));
  };

  // Helper to generate options for a drill card
  const setupDrillQuestion = (tableNum: number, factor: number) => {
    const correct = tableNum * factor;
    const opts = generateDistractors(correct, tableNum, factor);
    setDrillOptions(opts);
    setDrillAnswered(false);
    setRemediationHint(null);
  };

  // 2. Start the Rapid-Recall Speed Drill
  const startDrill = () => {
    soundService.playClick();
    if (!selectedTable) return;

    // Build shuffled factors 1 through 12
    const initialFactors: DrillCard[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .sort(() => Math.random() - 0.5)
      .map((f) => ({ factor: f }));

    setDrillQueue(initialFactors);
    setCurrentDrillIndex(0);
    setDrillStreak(0);
    setDrillMasteredCount(0);
    setupDrillQuestion(selectedTable, initialFactors[0].factor);
    setLessonStep('drill');
  };

  // Handle drill answer click
  const handleDrillAnswer = (selectedAns: number) => {
    if (drillAnswered || !selectedTable) return;
    const currentCard = drillQueue[currentDrillIndex];
    const correct = selectedTable * currentCard.factor;
    const isRight = selectedAns === correct;

    setDrillAnswered(true);
    setDrillIsCorrect(isRight);

    if (isRight) {
      soundService.playCorrect();
      setDrillStreak((prev) => prev + 1);
      setDrillMasteredCount((prev) => prev + 1);

      // Auto-advance after brief delay if correct
      setTimeout(() => {
        advanceDrillQueue(true);
      }, 700);
    } else {
      soundService.playWrong();
      setDrillStreak(0);

      // Get hint from hard facts or general trick
      const meta = TABLE_METADATA[selectedTable];
      const matchingHardFact = meta.hardFacts.find((h) => h.factor === currentCard.factor);
      const hint = matchingHardFact ? matchingHardFact.hint : meta.trick;
      setRemediationHint(hint);

      // SMART ERROR LOOP-BACK: Put this missed factor back in the queue 2 cards ahead!
      const updatedQueue = [...drillQueue];
      const retryCard: DrillCard = { factor: currentCard.factor, isRetry: true };
      const insertIdx = Math.min(updatedQueue.length, currentDrillIndex + 3);
      updatedQueue.splice(insertIdx, 0, retryCard);
      setDrillQueue(updatedQueue);
    }
  };

  const advanceDrillQueue = (_wasCorrect: boolean) => {
    if (!selectedTable) return;
    const nextIdx = currentDrillIndex + 1;

    if (nextIdx < drillQueue.length) {
      setCurrentDrillIndex(nextIdx);
      setupDrillQuestion(selectedTable, drillQueue[nextIdx].factor);
    } else {
      // Drill Complete!
      soundService.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      startCheckpoint();
    }
  };

  // 3. Start Table Boss Checkpoint Blitz (5 focused questions)
  const startCheckpoint = () => {
    if (!selectedTable) return;
    soundService.playClick();
    const meta = TABLE_METADATA[selectedTable];

    // Guarantee 2 hard facts + 3 other facts
    const questions: CheckpointQuestion[] = [];
    const usedFactors = new Set<number>();

    // Add hard facts first
    meta.hardFacts.slice(0, 2).forEach((hf) => {
      usedFactors.add(hf.factor);
      questions.push({
        factor1: selectedTable,
        factor2: hf.factor,
        correctAnswer: selectedTable * hf.factor,
        options: generateDistractors(selectedTable * hf.factor, selectedTable, hf.factor),
        hint: hf.hint,
      });
    });

    // Fill remaining up to 5
    const candidateFactors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .filter((f) => !usedFactors.has(f))
      .sort(() => Math.random() - 0.5);

    while (questions.length < 5 && candidateFactors.length > 0) {
      const f = candidateFactors.pop()!;
      questions.push({
        factor1: selectedTable,
        factor2: f,
        correctAnswer: selectedTable * f,
        options: generateDistractors(selectedTable * f, selectedTable, f),
        hint: meta.trick,
      });
    }

    // Shuffle questions
    const finalQuestions = questions.sort(() => Math.random() - 0.5);

    setCheckpointQuestions(finalQuestions);
    setCheckpointIndex(0);
    setCheckpointScore(0);
    setCheckpointAnswered(false);
    setLessonStep('checkpoint');
  };

  const handleCheckpointAnswer = (ans: number) => {
    if (checkpointAnswered) return;
    const currentQ = checkpointQuestions[checkpointIndex];
    const correct = ans === currentQ.correctAnswer;
    setCheckpointAnswered(true);
    setCheckpointIsCorrect(correct);

    if (correct) {
      soundService.playCorrect();
      setCheckpointScore((prev) => prev + 1);
    } else {
      soundService.playWrong();
    }
  };

  const handleNextCheckpointQuestion = () => {
    soundService.playClick();
    const nextIdx = checkpointIndex + 1;

    if (nextIdx < checkpointQuestions.length) {
      setCheckpointIndex(nextIdx);
      setCheckpointAnswered(false);
    } else {
      // Checkpoint evaluated
      const finalScore = checkpointScore;

      // Need 4/5 or 5/5 to pass
      if (finalScore >= 4 && selectedTable) {
        soundService.playFanfare();
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.5 },
        });
        setLessonStep('certified');
        onCompleteCourseTable(selectedTable, 50);
      } else {
        soundService.playWrong();
        setLessonStep('checkpoint-retry');
      }
    }
  };

  const completedCount = profile.courseCompletedTables.length;
  const progressPercent = Math.round((completedCount / 12) * 100);

  // VIEW: INSIDE A SELECTED TABLE LESSON
  if (selectedTable !== null) {
    const meta = TABLE_METADATA[selectedTable];

    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
        {/* Navigation Bar inside Table Lesson */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              soundService.playClick();
              setSelectedTable(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Syllabus
          </button>

          {/* Step Badges */}
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-700 text-xs font-blox">
            <button
              onClick={() => {
                soundService.playClick();
                setLessonStep('cheat-code');
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                lessonStep === 'cheat-code'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Cheat Code & Blocks
            </button>
            <button
              onClick={startDrill}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                lessonStep === 'drill'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Speed Drill
            </button>
            <button
              onClick={startCheckpoint}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                lessonStep === 'checkpoint' || lessonStep === 'certified'
                  ? 'bg-yellow-400 text-zinc-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Checkpoint Blitz
            </button>
          </div>
        </div>

        {/* ================= STEP 1: VISUAL CHEAT CODE & BLOCK ARRAY ================= */}
        {lessonStep === 'cheat-code' && (
          <div className="blox-card p-4 sm:p-6 space-y-4 animate-in fade-in">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 px-3 py-0.5 rounded-full text-xs font-black uppercase">
                <Sparkles className="w-4 h-4" /> Step 1: The Mental Cheat Code
              </div>
              <h2 className="font-blox text-2xl sm:text-3xl text-white">
                Table of {selectedTable}: {meta.name}
              </h2>
              <p className="text-xs text-slate-400">
                Learn the shortcut trick, see the Roblox block array, and memorize it forever!
              </p>
            </div>

            {/* Responsive 2-Column Split View: Left = Cheat Code, Right = Interactive Block Array & Launch */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch max-w-5xl mx-auto">
              {/* Left Column: The Cheat Code Card */}
              <div className="md:col-span-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border-3 border-indigo-500/60 p-4 sm:p-5 rounded-2xl space-y-3 shadow-lg flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-blox text-base sm:text-lg text-yellow-400 flex items-center gap-2">
                      <span>⚡</span> {meta.cheatCodeTitle}
                    </span>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 border border-indigo-500/40">
                      Secret Hack
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-100 font-bold leading-relaxed">
                    {meta.cheatCodeExplanation}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="bg-slate-950/90 border border-indigo-400/40 p-2.5 rounded-xl flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Example:</span>
                    <span className="font-blox text-sm sm:text-base text-emerald-400">
                      {meta.cheatCodeExample}
                    </span>
                  </div>

                  {meta.rhyme && (
                    <div className="bg-purple-900/50 border border-purple-400/50 p-2.5 rounded-xl flex items-center gap-2">
                      <span className="text-lg">🎵</span>
                      <p className="text-xs font-extrabold text-pink-200 italic">
                        "{meta.rhyme}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Tactile Block Array & Launch Drill Button */}
              <div className="md:col-span-6 bg-slate-950/80 border-2 border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                      <span>🧱</span> Visual Block Array
                    </span>
                    <span className="font-blox text-xs sm:text-sm text-yellow-400">
                      {selectedTable} ✖ {arrayMultiplier} = {selectedTable * arrayMultiplier}
                    </span>
                  </div>

                  {/* Multiplier Pills */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          soundService.playClick();
                          setArrayMultiplier(m);
                        }}
                        className={`w-7 h-7 rounded-lg font-blox text-xs transition-all cursor-pointer ${
                          arrayMultiplier === m
                            ? 'bg-yellow-400 text-zinc-950 shadow-md scale-110'
                            : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  {/* Visual Grid of Blocks */}
                  <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center overflow-x-auto min-h-[110px]">
                    <div
                      className="grid gap-1 p-1.5 bg-slate-950/60 rounded-xl border border-slate-800"
                      style={{
                        gridTemplateColumns: `repeat(${arrayMultiplier}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: selectedTable * arrayMultiplier }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md ${meta.blockColor} border border-black/40 shadow-[inset_0_-2px_0_rgba(0,0,0,0.3)] animate-in zoom-in-50 flex items-center justify-center`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-slate-400 font-bold mt-2">
                      {arrayMultiplier} groups of {selectedTable} blocks ={' '}
                      <span className="text-yellow-300 font-black">
                        {selectedTable * arrayMultiplier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Launch Drill Action */}
                <button
                  onClick={startDrill}
                  className="w-full blox-button-green text-white font-blox text-sm sm:text-base py-3 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>READY! START SPEED DRILL</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: GAMIFIED RAPID-RECALL SPEED DRILL ================= */}
        {lessonStep === 'drill' && drillQueue[currentDrillIndex] && (
          <div className="blox-card p-4 sm:p-6 space-y-4 text-center animate-in zoom-in-95">
            {/* Header: Progress & Streak */}
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 rounded-full text-amber-400 font-extrabold text-xs">
                <Flame className={`w-3.5 h-3.5 ${drillStreak > 0 ? 'animate-bounce text-orange-400' : ''}`} />
                <span>Streak: {drillStreak}</span>
              </div>

              <div className="text-xs font-bold text-slate-400">
                Queue: {drillQueue.length - currentDrillIndex} cards left
              </div>

              <span className="text-xs font-black text-yellow-400 bg-yellow-950/60 px-2.5 py-0.5 rounded-full border border-yellow-500/40">
                {drillMasteredCount}/12 Mastered
              </span>
            </div>

            {/* Split View: Left = Question Card, Right = Options or Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch max-w-4xl mx-auto">
              {/* Left Column: Question Card */}
              <div className="md:col-span-7 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-3 border-indigo-500/50 p-5 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
                {drillQueue[currentDrillIndex].isRetry && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white font-blox text-[10px] px-2 py-0.5 rounded-full border border-black animate-pulse">
                    RETRY CARD
                  </span>
                )}

                <span className="text-[11px] font-black uppercase text-indigo-300 tracking-wider">
                  Quick Recall Blitz
                </span>

                <div className="font-blox text-4xl sm:text-5xl lg:text-6xl text-white py-3 flex items-center justify-center gap-3">
                  <span className="bg-indigo-600/50 px-3.5 py-1 rounded-2xl border border-indigo-400">
                    {selectedTable}
                  </span>
                  <span className="text-yellow-400">✖</span>
                  <span className="bg-purple-600/50 px-3.5 py-1 rounded-2xl border border-purple-400">
                    {drillQueue[currentDrillIndex].factor}
                  </span>
                  <span className="text-slate-400">=</span>
                  <span className="text-yellow-300">
                    {drillAnswered
                      ? selectedTable * drillQueue[currentDrillIndex].factor
                      : '?'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  Speed builds fluency! Select the correct product.
                </p>
              </div>

              {/* Right Column: 4 Chunky Buttons or Feedback */}
              <div className="md:col-span-5 flex flex-col justify-center">
                {!drillAnswered ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {drillOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDrillAnswer(opt)}
                        className="blox-button-purple text-white font-blox text-2xl sm:text-3xl py-3.5 sm:py-4 rounded-2xl shadow-lg border-b-6 active:translate-y-1 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in h-full flex flex-col justify-center">
                    <div
                      className={`p-3.5 rounded-2xl border-3 flex flex-col items-center gap-2 ${
                        drillIsCorrect
                          ? 'bg-green-950/80 border-green-500 text-green-300'
                          : 'bg-red-950/80 border-red-500 text-red-300'
                      }`}
                    >
                      <div className="font-blox text-base sm:text-lg flex items-center gap-2">
                        {drillIsCorrect ? (
                          <>
                            <Zap className="w-5 h-5 text-yellow-300" />
                            <span>FAST & ACCURATE! +10 XP</span>
                          </>
                        ) : (
                          <>
                            <RotateCcw className="w-5 h-5 text-red-400 animate-spin" />
                            <span>Loop-back activated!</span>
                          </>
                        )}
                      </div>

                      {remediationHint && (
                        <div className="bg-slate-950/80 border border-yellow-400/60 p-2 rounded-xl text-xs font-bold text-yellow-200">
                          💡 <strong>Cheat Code:</strong> {remediationHint}
                        </div>
                      )}

                      {!drillIsCorrect && (
                        <p className="text-[11px] text-slate-300">
                          Card re-inserted in practice queue to reinforce memory!
                        </p>
                      )}
                    </div>

                    {!drillIsCorrect && (
                      <button
                        onClick={() => advanceDrillQueue(false)}
                        className="w-full blox-button-yellow text-zinc-950 font-blox text-sm sm:text-base py-2.5 rounded-xl shadow cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>GOT IT, KEEP GOING</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: TABLE BOSS CHECKPOINT (5 QUESTIONS) ================= */}
        {lessonStep === 'checkpoint' && checkpointQuestions[checkpointIndex] && (
          <div className="blox-card p-4 sm:p-6 space-y-4 text-center animate-in zoom-in-95">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <span className="text-xs font-black uppercase text-amber-400 bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span>Table Boss Checkpoint</span>
              </span>
              <span className="text-xs font-bold text-slate-400">
                Question {checkpointIndex + 1} of 5
              </span>
            </div>

            {/* Split View: Left = Question Card, Right = Choices or Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch max-w-4xl mx-auto">
              {/* Left Column: Checkpoint Question */}
              <div className="md:col-span-7 bg-slate-950/80 border-3 border-indigo-500/40 p-5 rounded-3xl flex flex-col justify-between">
                <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                  Checkpoint Mastery Test
                </span>

                <div className="font-blox text-4xl sm:text-5xl lg:text-6xl text-white py-3 flex items-center justify-center gap-3">
                  <span className="bg-indigo-600/40 px-3.5 py-1 rounded-2xl border border-indigo-400">
                    {checkpointQuestions[checkpointIndex].factor1}
                  </span>
                  <span className="text-amber-400">✖</span>
                  <span className="bg-purple-600/40 px-3.5 py-1 rounded-2xl border border-purple-400">
                    {checkpointQuestions[checkpointIndex].factor2}
                  </span>
                  <span className="text-slate-400">=</span>
                  <span className="text-yellow-300">
                    {checkpointAnswered
                      ? checkpointQuestions[checkpointIndex].correctAnswer
                      : '?'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">
                  Pass this checkpoint to unlock your official Certified Diploma!
                </p>
              </div>

              {/* Right Column: 4 Buttons or Feedback */}
              <div className="md:col-span-5 flex flex-col justify-center">
                {!checkpointAnswered ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {checkpointQuestions[checkpointIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCheckpointAnswer(opt)}
                        className="blox-button-purple text-white font-blox text-2xl sm:text-3xl py-3.5 sm:py-4 rounded-2xl shadow-lg border-b-6 active:translate-y-1 cursor-pointer transition-all hover:scale-[1.02]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 animate-in fade-in h-full justify-center ${
                      checkpointIsCorrect
                        ? 'bg-green-950/80 border-green-500 text-green-300'
                        : 'bg-red-950/80 border-red-500 text-red-300'
                    }`}
                  >
                    <div className="font-blox text-base sm:text-lg flex items-center gap-2">
                      {checkpointIsCorrect ? 'CRUSHED IT! CORRECT!' : 'UH OH! Remember the cheat code!'}
                    </div>
                    <button
                      onClick={handleNextCheckpointQuestion}
                      className="mt-2 blox-button-green text-white font-blox text-sm sm:text-base px-6 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow"
                    >
                      <span>CONTINUE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CERTIFIED CELEBRATION ================= */}
        {lessonStep === 'certified' && (
          <div className="blox-card p-6 sm:p-10 text-center space-y-6 animate-in zoom-in-95">
            <div className="text-6xl animate-bounce">🎓</div>
            <h3 className="font-blox text-3xl sm:text-4xl text-yellow-300">
              TABLE {selectedTable} CERTIFIED DIPLOMA!
            </h3>
            <p className="text-slate-200 font-bold max-w-md mx-auto">
              Outstanding work! You mastered the Cheat Code, conquered the rapid-recall drill, and passed the Table Boss Checkpoint!
            </p>
            <div className="bg-slate-950/80 p-4 rounded-2xl border-2 border-yellow-400 inline-flex items-center gap-2 shadow-xl">
              <span className="text-sm font-bold text-slate-300">Course Bounty:</span>
              <span className="font-blox text-2xl text-yellow-400">+50 Blox Bux!</span>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="blox-button-green text-white font-blox text-base px-8 py-3 rounded-xl shadow-xl cursor-pointer"
              >
                BACK TO COURSE SYLLABUS
              </button>
            </div>
          </div>
        )}

        {/* ================= CHECKPOINT RETRY SCREEN ================= */}
        {lessonStep === 'checkpoint-retry' && (
          <div className="blox-card p-6 sm:p-10 text-center space-y-5 animate-in zoom-in-95">
            <div className="text-5xl sm:text-6xl animate-bounce">⚡</div>
            <h3 className="font-blox text-2xl sm:text-3xl text-amber-300">
              ALMOST CERTIFIED!
            </h3>
            <p className="text-slate-200 font-bold max-w-md mx-auto text-sm sm:text-base">
              You scored <span className="text-yellow-400 font-black text-xl">{checkpointScore} / 5</span>! You need at least 4/5 correct to graduate Table {selectedTable} and claim your Diploma!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
              <button
                onClick={startDrill}
                className="blox-button-purple text-white font-blox text-sm sm:text-base px-6 py-3 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                PRACTICE SPEED DRILL
              </button>
              <button
                onClick={startCheckpoint}
                className="blox-button-yellow text-zinc-950 font-blox text-sm sm:text-base px-6 py-3 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                RETRY CHECKPOINT BLITZ
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // VIEW: MAIN COURSE SYLLABUS HUB
  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Academy Course Hero */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-4 border-blue-500/50 p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-yellow-400 animate-bounce" />
            <h2 className="font-blox text-2xl sm:text-3xl text-yellow-300">
              Blox Multiplication Academy
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            A step-by-step guided journey to memorize all 12 tables! Unlock mental cheat codes, see physical Roblox block arrays, drill with rapid recall, and crush Table Boss checkpoints!
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

      {/* Course Stages List */}
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
                        <div className="flex items-center gap-1 bg-green-950 border border-green-500 text-green-400 px-2.5 py-0.5 rounded-full text-xs font-blox">
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
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-xs font-black text-yellow-400">
                          {meta.cheatCodeTitle}
                        </span>
                      </div>
                      <h4 className="font-blox text-base text-white">{meta.name}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-medium">
                        {meta.cheatCodeExplanation}
                      </p>
                    </div>

                    <button
                      onClick={() => startTableLesson(tableNum)}
                      className={`w-full py-2.5 rounded-xl font-blox text-xs sm:text-sm shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
