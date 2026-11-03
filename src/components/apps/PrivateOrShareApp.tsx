import React, { useState } from 'react';
import { Lock, ThumbsUp, CheckCircle2, XCircle, RotateCcw, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { ShareItem, ProgressState } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
  progress: ProgressState;
  onUpdateProgress: (updater: (prev: ProgressState) => ProgressState) => void;
}

const ITEMS: ShareItem[] = [
  {
    id: 'ps1',
    text: 'Your password',
    isPrivate: true,
    explanation: '🔒 Passwords are the master lock to your private identity! Never share passwords with friends or online strangers.',
    icon: '🔑',
  },
  {
    id: 'ps2',
    text: 'Your favourite colour',
    isPrivate: false,
    explanation: '👍 Safe to share! Hobbies, favourite colours, and fun opinions don’t reveal your real identity or location.',
    icon: '🎨',
  },
  {
    id: 'ps3',
    text: 'Your home address',
    isPrivate: true,
    explanation: '🔒 Strictly private! Your home address is personal location data. Never post where you live on websites or chats.',
    icon: '🏠',
  },
  {
    id: 'ps4',
    text: 'A drawing you made',
    isPrivate: false,
    explanation: '👍 OK to share! Creative artwork is wonderful to showcase, as long as it does not include your real name or address.',
    icon: '🖍️',
  },
  {
    id: 'ps5',
    text: 'Your school name and class',
    isPrivate: true,
    explanation: '🔒 Keep it private! Sharing your exact school and class helps strangers pinpoint where you are every day.',
    icon: '🏫',
  },
  {
    id: 'ps6',
    text: 'Your best book',
    isPrivate: false,
    explanation: '👍 OK to share! Recommending your favourite storybook is positive, kind, and 100% safe online.',
    icon: '📚',
  },
];

export const PrivateOrShareApp: React.FC<Props> = ({ onBack, progress, onUpdateProgress }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === ITEMS.length;

  const handleChoose = (itemId: string, choiceIsPrivate: boolean) => {
    sound.tap();
    const item = ITEMS.find((it) => it.id === itemId);
    if (!item) return;

    const isCorrect = choiceIsPrivate === item.isPrivate;
    if (isCorrect) {
      sound.success();
    } else {
      sound.warning();
    }

    const nextAnswers = { ...answers, [itemId]: choiceIsPrivate };
    setAnswers(nextAnswers);

    const correctCount = ITEMS.filter((it) => nextAnswers[it.id] === it.isPrivate).length;

    onUpdateProgress((prev) => ({
      ...prev,
      privateShareCompleted: Object.keys(nextAnswers).length === ITEMS.length,
      privateShareScore: correctCount,
      privateShareTotal: ITEMS.length,
    }));
  };

  const handleReset = () => {
    sound.tap();
    setAnswers({});
  };

  const score = ITEMS.filter((it) => answers[it.id] === it.isPrivate).length;

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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Privacy &amp; Sharing</span>
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
        <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent p-4 rounded-2xl border border-sky-200 dark:border-sky-900/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              1
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Game 1: Private or OK to share?
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Choose for each one! Some things must be kept locked, while others are fun and safe to share with classmates.
          </p>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Checked: {answeredCount} of {ITEMS.length}</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold">Score: {score}/{answeredCount}</span>
          </div>
          <div className="mt-1.5 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / ITEMS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 6 Items Grid/List */}
        <div className="space-y-3">
          {ITEMS.map((item) => {
            const hasChosen = answers[item.id] !== undefined;
            const userChoice = answers[item.id];
            const isCorrect = hasChosen && userChoice === item.isPrivate;

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
                      {item.text}
                    </span>
                  </div>
                </div>

                {/* 2 Buttons matching the PDF */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleChoose(item.id, true)}
                    className={`h-11 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasChosen && userChoice === true
                        ? item.isPrivate
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500'
                          : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-500'
                        : 'bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>🔒 Private</span>
                    {hasChosen && userChoice === true && (
                      item.isPrivate ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <XCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>

                  <button
                    onClick={() => handleChoose(item.id, false)}
                    className={`h-11 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      hasChosen && userChoice === false
                        ? !item.isPrivate
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500'
                          : 'bg-rose-600 text-white shadow-md ring-2 ring-rose-500'
                        : 'bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>👍 OK to share</span>
                    {hasChosen && userChoice === false && (
                      !item.isPrivate ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <XCircle className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                </div>

                {/* Feedback note */}
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

        {/* Completion Card */}
        {isAllAnswered && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-center space-y-2 shadow-lg mt-4">
            <Sparkles className="w-8 h-8 mx-auto text-yellow-300" />
            <h3 className="font-bold text-sm">Game 1 Completed!</h3>
            <p className="text-xs text-sky-100">
              You scored {score} out of {ITEMS.length}! You know exactly what belongs in your private vault.
            </p>
            <button
              onClick={() => {
                sound.tap();
                onBack();
              }}
              className="mt-2 px-4 py-2 bg-white text-sky-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Back to Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
