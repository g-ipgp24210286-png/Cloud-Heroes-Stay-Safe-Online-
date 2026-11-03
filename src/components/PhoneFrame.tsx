import React from 'react';
import { Smartphone, Monitor, RotateCcw, Volume2, VolumeX, Award, Sparkles, BookOpen } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { PupilProfile, ProgressState, WallpaperId } from '../types';
import { sound } from '../utils/sound';

interface Props {
  profile: PupilProfile;
  progress: ProgressState;
  children: React.ReactNode;
  isTabletMode: boolean;
  onToggleViewMode: () => void;
  onResetProgress: () => void;
  onOpenPDFReference?: () => void;
}

const WALLPAPER_CLASSES: Record<WallpaperId, string> = {
  'cyber-grid': 'bg-gradient-to-b from-slate-900 via-sky-950 to-slate-950',
  'nebula-cloud': 'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950',
  'sunset-glow': 'bg-gradient-to-b from-amber-950 via-rose-950 to-slate-950',
  'emerald-circuit': 'bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950',
  'pastel-sky': 'bg-gradient-to-b from-sky-100 via-indigo-50 to-slate-100',
};

export const PhoneFrame: React.FC<Props> = ({
  profile,
  progress,
  children,
  isTabletMode,
  onToggleViewMode,
  onResetProgress,
  onOpenPDFReference,
}) => {
  const wallpaperClass = WALLPAPER_CLASSES[profile.wallpaper] || WALLPAPER_CLASSES['cyber-grid'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Companion / Classroom Header (Follows 3-zone contract) */}
      <header className="flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
            ☁️
          </div>
          <div>
            <span className="text-base font-extrabold text-white font-display tracking-tight block">
              Cloud Heroes
            </span>
            <span className="text-[10px] text-sky-400 font-medium">
              Phone Settings &amp; Cyber Safety Lab
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation & Quick Tools */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-300">
          <span className="text-slate-400">
            Cadet: <strong className="text-white">{profile.name}</strong> ({profile.avatar})
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">
            Progress: <strong className="text-emerald-400">
              {(progress.privateShareCompleted ? 1 : 0) +
                (progress.cloudPowersCompleted ? 1 : 0) +
                (progress.publicPrivateCompleted ? 1 : 0) +
                (progress.cloudOutageCompleted ? 1 : 0)} / 4 Modules
            </strong>
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <a
            href="/assets/aistudio/aaa_8fa21ba5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors flex items-center gap-1 text-slate-300"
            title="View Cloud Heroes lesson handout PDF"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Handout PDF</span>
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">

          <button
            onClick={() => {
              sound.tap();
              onToggleViewMode();
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700 whitespace-nowrap"
            title="Toggle between Phone frame and Classroom Tablet format"
          >
            {isTabletMode ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Phone View</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Classroom View</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-x-hidden">
        {isTabletMode ? (
          /* Classroom / Tablet Mode (Wide 1000px container) */
          <div className="w-full max-w-4xl bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[85vh]">
            <StatusBar profile={profile} progress={progress} />
            <div className={`flex-1 overflow-hidden ${profile.fontSize === 'large' ? 'text-base' : ''}`}>
              {children}
            </div>
            {/* Tablet Home Bar */}
            <div className="h-4 bg-slate-900 flex items-center justify-center">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        ) : (
          /* Phone Frame Mode (Realistic 410px smartphone mockup with physical frame styling) */
          <div className="relative">
            {/* Outer phone chassis */}
            <div className="w-[380px] sm:w-[410px] h-[780px] sm:h-[820px] bg-slate-800 rounded-[50px] p-3 shadow-2xl border-4 border-slate-700 ring-1 ring-slate-900/60 relative flex flex-col">
              {/* Volume Rockers on side (aesthetic device cues) */}
              <div className="absolute -left-1.5 top-28 w-1 h-9 bg-slate-600 rounded-l-md" />
              <div className="absolute -left-1.5 top-40 w-1 h-9 bg-slate-600 rounded-l-md" />
              <div className="absolute -right-1.5 top-32 w-1 h-14 bg-slate-600 rounded-r-md" />

              {/* Inner Screen Bezel */}
              <div className="w-full h-full rounded-[40px] overflow-hidden bg-slate-950 flex flex-col relative shadow-inner border border-slate-800">
                {/* Status Bar with camera pill */}
                <StatusBar profile={profile} progress={progress} />

                {/* Screen Content */}
                <div
                  className={`flex-1 overflow-hidden relative flex flex-col ${
                    profile.fontSize === 'large' ? 'text-base' : ''
                  }`}
                >
                  {children}
                </div>

                {/* Phone Home Swipe Bar */}
                <div className="h-6 bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0 border-t border-slate-200/40 dark:border-slate-800/40">
                  <div className="w-28 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
