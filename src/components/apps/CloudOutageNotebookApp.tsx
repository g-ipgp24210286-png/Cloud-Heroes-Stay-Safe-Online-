import React, { useState } from 'react';
import { CloudOff, BookOpen, HardDrive, Sparkles, CheckCircle2, RotateCcw, AlertCircle, Save } from 'lucide-react';
import { ProgressState } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
  progress: ProgressState;
  onUpdateProgress: (updater: (prev: ProgressState) => ProgressState) => void;
}

export const CloudOutageNotebookApp: React.FC<Props> = ({ onBack, progress, onUpdateProgress }) => {
  const [whatLose, setWhatLose] = useState(progress.notebookNotes?.whatLose || '');
  const [whatDo, setWhatDo] = useState(progress.notebookNotes?.whatDo || '');
  const [isSaved, setIsSaved] = useState(progress.cloudOutageCompleted);
  const [showDrill, setShowDrill] = useState(false);
  const [drillSuccess, setDrillSuccess] = useState(false);

  const handleSaveNotes = () => {
    sound.tap();
    setIsSaved(true);
    sound.success();

    onUpdateProgress((prev) => ({
      ...prev,
      cloudOutageCompleted: true,
      notebookNotes: {
        whatLose,
        whatDo,
      },
    }));
  };

  const handleQuickAddLose = (phrase: string) => {
    sound.tap();
    setWhatLose((prev) => (prev ? `${prev}, ${phrase}` : phrase));
  };

  const handleQuickAddDo = (phrase: string) => {
    sound.tap();
    setWhatDo((prev) => (prev ? `${prev}, ${phrase}` : phrase));
  };

  const handleRunRescueDrill = () => {
    sound.tap();
    setShowDrill(true);
    setTimeout(() => {
      sound.fanfare();
      setDrillSuccess(true);
    }, 800);
  };

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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cloud Resilience</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Scenario Header from PDF page 3 */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤔</span>
            <h2 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200 font-display">
              What if the cloud stopped working?
            </h2>
          </div>
          <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed font-medium">
            Imagine your homework and photos are in the cloud and it stops. What would I lose? What would I do? Talk with a friend, then write your ideas in your notebook.
          </p>
        </div>

        {/* Notebook Entry Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Pupil Digital Notebook
            </h3>
          </div>

          {/* Question 1: What would I lose? */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              1. What would I lose?
            </label>
            <textarea
              rows={2}
              value={whatLose}
              onChange={(e) => setWhatLose(e.target.value)}
              placeholder="e.g. My school science project slides, family holiday photos, saved game levels..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none font-sans"
            />
            {/* Quick helper ideas */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="text-slate-400 self-center">Tap ideas:</span>
              <button
                type="button"
                onClick={() => handleQuickAddLose('Science project due tomorrow')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + School project
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddLose('Family photos')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + Photos
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddLose('Game save files')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + Game progress
              </button>
            </div>
          </div>

          {/* Question 2: What would I do? */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              2. What would I do?
            </label>
            <textarea
              rows={2}
              value={whatDo}
              onChange={(e) => setWhatDo(e.target.value)}
              placeholder="e.g. Keep calm, tell my teacher and parents, use my USB drive backup copy..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none font-sans"
            />
            {/* Quick helper ideas */}
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="text-slate-400 self-center">Tap ideas:</span>
              <button
                type="button"
                onClick={() => handleQuickAddDo('Tell teacher and parents')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + Tell teacher
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddDo('Plug in my USB backup drive')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + Use USB backup
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddDo('Never panic, ask a grown-up')}
                className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                + Don’t panic
              </button>
            </div>
          </div>

          <button
            onClick={handleSaveNotes}
            disabled={!whatLose.trim() || !whatDo.trim()}
            className="w-full h-11 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Notebook Ideas &amp; Earn Resilience Badge</span>
          </button>
        </div>

        {/* 3-2-1 Cloud Rescue Drill */}
        <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                The 3-2-1 Backup Solution
              </h4>
            </div>
            <span className="text-[10px] text-slate-400">Golden Rule</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Never rely on only one copy! Keep <strong>3</strong> copies of important homework, on <strong>2</strong> different devices (like your phone + a USB drive), with <strong>1</strong> copy safely in the cloud.
          </p>

          <button
            onClick={handleRunRescueDrill}
            className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2 border border-slate-600 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate USB Backup Restore Drill</span>
          </button>

          {showDrill && (
            <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {drillSuccess
                  ? 'Drill passed! Even if the cloud network freezes, your USB copy saves the day!'
                  : 'Restoring backup...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
