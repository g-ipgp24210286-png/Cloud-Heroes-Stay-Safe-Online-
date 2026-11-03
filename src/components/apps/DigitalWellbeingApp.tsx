import React, { useState } from 'react';
import { Clock, Eye, Moon, Shield, Award, Play, Pause, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
}

export const DigitalWellbeingApp: React.FC<Props> = ({ onBack }) => {
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setTimerCompleted(true);
      sound.fanfare();
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const startTimer = () => {
    sound.tap();
    setTimerSeconds(20);
    setTimerCompleted(false);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    sound.tap();
    setTimerRunning(false);
    setTimerSeconds(20);
    setTimerCompleted(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Digital Wellbeing</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Screen time summary card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Today's Screen Balance
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Within Healthy Limits 👍</span>
          </div>

          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            2h 15m <span className="text-xs font-normal text-slate-500 font-sans">total active usage</span>
          </div>

          {/* Bar breakdown */}
          <div className="space-y-1.5">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex">
              <div className="bg-sky-500 h-full" style={{ width: '55%' }} title="School & Learning: 1h 15m" />
              <div className="bg-indigo-500 h-full" style={{ width: '25%' }} title="Creative Coding: 35m" />
              <div className="bg-amber-400 h-full" style={{ width: '20%' }} title="Games & Play: 25m" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> School &amp; Learning (55%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Coding (25%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Gaming (20%)
              </span>
            </div>
          </div>
        </div>

        {/* 20-20-20 Rule Exercise Tool */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              The 20-20-20 Eye Rest Drill
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Every <strong>20 minutes</strong>, look away from your screen at an object at least <strong>20 feet away</strong> for <strong>20 seconds</strong> to protect your young eyes!
          </p>

          <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl text-center space-y-2">
            <div className="text-3xl font-black font-mono text-sky-600 dark:text-sky-400">
              {timerSeconds}s
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {timerRunning ? 'Look at a tree or window far away...' : timerCompleted ? 'Great job! Your eyes are refreshed!' : 'Press start to begin your 20-second eye relaxation'}
            </p>

            <div className="pt-2 flex justify-center gap-2">
              {!timerRunning ? (
                <button
                  onClick={startTimer}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start 20s Break</span>
                </button>
              ) : (
                <button
                  onClick={resetTimer}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3 Golden Cloud Habits */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-sky-500/10 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            3 Golden Rules for Pupil Screen Habits
          </h4>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 font-bold">1.</span>
              <span><strong>No phones in bed:</strong> Charge devices outside your bedroom 30 minutes before bedtime for deep sleep.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 font-bold">2.</span>
              <span><strong>Ask before install:</strong> Always let grown-ups review permissions and terms of service.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 font-bold">3.</span>
              <span><strong>Be kind online:</strong> What you post reflects who you are. Lift friends up, never put them down.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
