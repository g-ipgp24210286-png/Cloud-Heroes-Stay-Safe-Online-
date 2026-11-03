import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, CloudCheck, Sparkles } from 'lucide-react';
import { PupilProfile, ProgressState } from '../types';

interface Props {
  profile: PupilProfile;
  progress: ProgressState;
}

export const StatusBar: React.FC<Props> = ({ profile, progress }) => {
  const [timeStr, setTimeStr] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 px-5 flex items-center justify-between text-xs font-semibold select-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-20 sticky top-0 text-slate-800 dark:text-slate-200">
      {/* Time & Carrier */}
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold tracking-tight text-xs">{timeStr}</span>
        <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold hidden sm:inline">
          HeroNet 5G
        </span>
      </div>

      {/* Dynamic Island / Camera Pill */}
      <div className="h-5 px-3 rounded-full bg-slate-900 dark:bg-black text-white flex items-center gap-1.5 shadow-sm text-[10px] font-mono">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-slate-300">CloudShield</span>
      </div>

      {/* Signals & Battery */}
      <div className="flex items-center gap-2">
        <Wifi className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono">98%</span>
          <div className="w-5 h-2.5 border border-slate-600 dark:border-slate-400 rounded-sm p-0.5 flex items-center">
            <div className="h-full bg-emerald-500 rounded-2xs w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
