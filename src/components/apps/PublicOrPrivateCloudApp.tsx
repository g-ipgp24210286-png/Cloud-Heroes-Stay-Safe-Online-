import React, { useState } from 'react';
import { Globe, Lock, CheckCircle2, XCircle, RotateCcw, Server, Shield, Sparkles } from 'lucide-react';
import { PublicPrivateItem, ProgressState } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
  progress: ProgressState;
  onUpdateProgress: (updater: (prev: ProgressState) => ProgressState) => void;
}

const ITEMS: PublicPrivateItem[] = [
  {
    id: 'pp1',
    title: 'A cloud that many people and companies share',
    isPublic: true,
    explanation: '🌍 Public Cloud! Multiple users and organizations share the same giant data center hardware, with their data kept strictly separated and encrypted.',
    icon: '🌐',
  },
  {
    id: 'pp2',
    title: 'A cloud made just for one school',
    isPublic: false,
    explanation: '🔒 Private Cloud! This infrastructure is dedicated entirely to a single school or school district with custom security barriers.',
    icon: '🏫',
  },
  {
    id: 'pp3',
    title: 'Google Drive',
    isPublic: true,
    explanation: '🌍 Public Cloud service! Google provides cloud storage to millions of pupils, families, and businesses worldwide on their global cloud servers.',
    icon: '📁',
  },
  {
    id: 'pp4',
    title: 'A school’s own locked system',
    isPublic: false,
    explanation: '🔒 Private Cloud! Internal servers locked in the school server room exclusively for teachers and authorized school administration.',
    icon: '🔐',
  },
];

export const PublicOrPrivateCloudApp: React.FC<Props> = ({ onBack, progress, onUpdateProgress }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === ITEMS.length;

  const handleSelect = (itemId: string, choiceIsPublic: boolean) => {
    sound.tap();
    const item = ITEMS.find((it) => it.id === itemId);
    if (!item) return;

    const isCorrect = choiceIsPublic === item.isPublic;
    if (isCorrect) {
      sound.success();
    } else {
      sound.warning();
    }

    const nextAnswers = { ...answers, [itemId]: choiceIsPublic };
    setAnswers(nextAnswers);

    const correctCount = ITEMS.filter((it) => nextAnswers[it.id] === it.isPublic).length;

    onUpdateProgress((prev) => ({
      ...prev,
      publicPrivateCompleted: Object.keys(nextAnswers).length === ITEMS.length,
      publicPrivateScore: correctCount,
      publicPrivateTotal: ITEMS.length,
    }));
  };

  const handleReset = () => {
    sound.tap();
    setAnswers({});
  };

  const score = ITEMS.filter((it) => answers[it.id] === it.isPublic).length;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
        <button
          onClick={() => {
            sound.tap();
            onBack();
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:opacity-80 py-1 px-1 -ml-1 transition-opacity cursor-pointer"
        >
          <span className="text-lg leading-none">‹</span> Settings
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cloud Architecture</span>
        <button
          onClick={handleReset}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-teal-500/10 via-sky-500/10 to-transparent p-4 rounded-2xl border border-teal-200 dark:border-teal-900/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              3
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Public or private?
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Understand how computer clouds are organized! Is each service shared across the public globe or dedicated privately to one school?
          </p>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Checked: {answeredCount} of {ITEMS.length}</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold">Score: {score}/{answeredCount}</span>
          </div>
          <div className="mt-1.5 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / ITEMS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Comparison Helper Bar */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold flex items-center gap-1 text-sky-600 dark:text-sky-400 mb-0.5">
              <span>🌍</span> Public Cloud
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Shared by millions of users worldwide (e.g. Google Drive, OneDrive).
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold flex items-center gap-1 text-indigo-600 dark:text-indigo-400 mb-0.5">
              <span>🔒</span> Private Cloud
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dedicated and locked for one single school or organization.
            </p>
          </div>
        </div>

        {/* 4 Items from PDF */}
        <div className="space-y-3">
          {ITEMS.map((item) => {
            const hasChosen = answers[item.id] !== undefined;
            const userChoice = answers[item.id];
            const isCorrect = hasChosen && userChoice === item.isPublic;

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  hasChosen
                    ? isCorrect
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                      : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/60'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700/60 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 block">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* 2 Buttons matching the PDF */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelect(item.id, true)}
                    className={`h-11 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasChosen && userChoice === true
                        ? item.isPublic
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500'
                          : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-500'
                        : 'bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>Public 🌍</span>
                    {hasChosen && userChoice === true && (
                      item.isPublic ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <XCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSelect(item.id, false)}
                    className={`h-11 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasChosen && userChoice === false
                        ? !item.isPublic
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500'
                          : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-500'
                        : 'bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>Private 🔒</span>
                    {hasChosen && userChoice === false && (
                      !item.isPublic ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <XCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>

                {/* Feedback */}
                {hasChosen && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                    <p className={`font-medium ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                      {item.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion summary */}
        {isAllAnswered && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 text-white text-center space-y-2 shadow-lg mt-4">
            <Sparkles className="w-8 h-8 mx-auto text-yellow-300" />
            <h3 className="font-bold text-sm">Cloud Architect Mastered!</h3>
            <p className="text-xs text-teal-100">
              You scored {score} out of {ITEMS.length}! You understand public vs private cloud deployments.
            </p>
            <button
              onClick={() => {
                sound.tap();
                onBack();
              }}
              className="mt-2 px-4 py-2 bg-white text-teal-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Back to Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
