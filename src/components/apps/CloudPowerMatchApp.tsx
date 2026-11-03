import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { CloudPower, CloudPowerScenario, ProgressState } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
  progress: ProgressState;
  onUpdateProgress: (updater: (prev: ProgressState) => ProgressState) => void;
}

const POWERS: { id: CloudPower; icon: string; label: string; colorClass: string }[] = [
  { id: 'Alert', icon: '👀', label: 'Alert', colorClass: 'border-sky-400 text-sky-700 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300' },
  { id: 'Strong', icon: '🔒', label: 'Strong', colorClass: 'border-indigo-400 text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300' },
  { id: 'Brave', icon: '🦸', label: 'Brave', colorClass: 'border-purple-400 text-purple-700 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300' },
  { id: 'Kind', icon: '💛', label: 'Kind', colorClass: 'border-amber-400 text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300' },
  { id: 'Smart', icon: '🧠', label: 'Smart', colorClass: 'border-emerald-400 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300' },
];

const SCENARIOS: CloudPowerScenario[] = [
  {
    id: 'cp1',
    situation: 'A pop-up says “You won a prize!”',
    correctPower: 'Alert',
    powerIcon: '👀',
    explanation: '👀 Alert: Stay on guard! Pop-ups promising free prizes are phishing scams designed to steal accounts or install malware.',
  },
  {
    id: 'cp2',
    situation: 'You want to pick a password',
    correctPower: 'Strong',
    powerIcon: '🔒',
    explanation: '🔒 Strong: Build long, tough passphrases with uppercase letters, numbers, and symbols that bots can’t guess.',
  },
  {
    id: 'cp3',
    situation: 'Someone sends you a mean message',
    correctPower: 'Brave',
    powerIcon: '🦸',
    explanation: '🦸 Brave: Speak up! Tell your teacher or a grown-up right away. Standing up to cyberbullying takes real courage.',
  },
  {
    id: 'cp4',
    situation: 'You want to post a friend’s photo',
    correctPower: 'Kind',
    powerIcon: '💛',
    explanation: '💛 Kind: Always ask permission first before sharing someone else’s picture. Respecting others makes the internet safe.',
  },
  {
    id: 'cp5',
    situation: 'You want to post your address',
    correctPower: 'Smart',
    powerIcon: '🧠',
    explanation: '🧠 Smart: Think ahead! Never publish your physical address or daily location where strangers can view it.',
  },
];

export const CloudPowerMatchApp: React.FC<Props> = ({ onBack, progress, onUpdateProgress }) => {
  const [selectedPowers, setSelectedPowers] = useState<Record<string, CloudPower>>({});

  const answeredCount = Object.keys(selectedPowers).length;
  const isAllAnswered = answeredCount === SCENARIOS.length;

  const handleSelectPower = (scenarioId: string, power: CloudPower) => {
    sound.tap();
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    const isCorrect = power === scenario.correctPower;
    if (isCorrect) {
      sound.success();
    } else {
      sound.warning();
    }

    const nextSelected = { ...selectedPowers, [scenarioId]: power };
    setSelectedPowers(nextSelected);

    const correctCount = SCENARIOS.filter((s) => nextSelected[s.id] === s.correctPower).length;

    onUpdateProgress((prev) => ({
      ...prev,
      cloudPowersCompleted: Object.keys(nextSelected).length === SCENARIOS.length,
      cloudPowersScore: correctCount,
      cloudPowersTotal: SCENARIOS.length,
    }));
  };

  const handleReset = () => {
    sound.tap();
    setSelectedPowers({});
  };

  const score = SCENARIOS.filter((s) => selectedPowers[s.id] === s.correctPower).length;

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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cloud Powers</span>
        <button
          onClick={handleReset}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Intro */}
        <div className="bg-gradient-to-r from-purple-500/10 via-sky-500/10 to-transparent p-4 rounded-2xl border border-purple-200 dark:border-purple-900/50">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              2
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Game 2: Match the Cloud Power
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Which superhero power helps you in each situation? Choose the power that keeps you safe!
          </p>

          {/* Quick reference power legend */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {POWERS.map((p) => (
              <span
                key={p.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs"
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Progress: {answeredCount} of {SCENARIOS.length}</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">Score: {score}/{answeredCount}</span>
          </div>
          <div className="mt-1.5 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 5 Scenarios */}
        <div className="space-y-3.5">
          {SCENARIOS.map((sc, index) => {
            const chosenPower = selectedPowers[sc.id];
            const hasChosen = chosenPower !== undefined;
            const isCorrect = hasChosen && chosenPower === sc.correctPower;

            return (
              <div
                key={sc.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  hasChosen
                    ? isCorrect
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                      : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800/60'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Situation {index + 1}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      "{sc.situation}"
                    </h3>
                  </div>
                  {hasChosen && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-500 font-bold">Try another</span>
                      )}
                    </span>
                  )}
                </div>

                {/* 5 Power Buttons matching the PDF */}
                <div className="grid grid-cols-5 gap-1.5">
                  {POWERS.map((pow) => {
                    const isCurrent = chosenPower === pow.id;
                    return (
                      <button
                        key={pow.id}
                        onClick={() => handleSelectPower(sc.id, pow.id)}
                        className={`h-11 rounded-xl flex flex-col items-center justify-center p-1 text-[11px] font-semibold border transition-all cursor-pointer ${
                          isCurrent
                            ? pow.id === sc.correctPower
                              ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400 shadow-sm'
                              : 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-400 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-sm leading-none">{pow.icon}</span>
                        <span className="text-[10px] mt-0.5 truncate w-full text-center">{pow.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback explanation */}
                {hasChosen && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-xs">
                    <p className={`font-medium ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                      {sc.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion */}
        {isAllAnswered && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center space-y-2 shadow-lg mt-4">
            <Award className="w-8 h-8 mx-auto text-yellow-300" />
            <h3 className="font-bold text-sm">Superpowers Mastered!</h3>
            <p className="text-xs text-purple-100">
              You correctly aligned all cloud powers! Your phone security shield is fully charged.
            </p>
            <button
              onClick={() => {
                sound.tap();
                onBack();
              }}
              className="mt-2 px-4 py-2 bg-white text-purple-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Back to Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
