import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Fingerprint, ScanFace, Sparkles, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { PupilProfile } from '../types';
import { sound } from '../utils/sound';

interface Props {
  profile: PupilProfile;
  onSignInSuccess: (updatedProfile: PupilProfile) => void;
}

const AVATARS = [
  { id: 'fox', emoji: '🦊', label: 'Cyber Fox' },
  { id: 'cat', emoji: '🐱', label: 'Shield Cat' },
  { id: 'owl', emoji: '🦉', label: 'Cloud Owl' },
  { id: 'robot', emoji: '🤖', label: 'Robo Buddy' },
  { id: 'dog', emoji: '🐶', label: 'Astro Pup' },
  { id: 'bunny', emoji: '🐰', label: 'Tech Bunny' },
];

export const LockScreenSignIn: React.FC<Props> = ({ profile, onSignInSuccess }) => {
  const [name, setName] = useState(profile.name || 'Mia');
  const [schoolGrade, setSchoolGrade] = useState(profile.schoolGrade || 'Primary 4 Cadet');
  const [avatar, setAvatar] = useState(profile.avatar || '🦊');
  const [pin, setPin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'face' | 'fingerprint' | null>(null);
  const [currentTime, setCurrentTime] = useState('08:04');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDigit = (digit: string) => {
    sound.tap();
    setErrorMsg('');
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        completeUnlock(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    sound.tap();
    setPin((prev) => prev.slice(0, -1));
  };

  const completeUnlock = (inputPin?: string) => {
    sound.success();
    onSignInSuccess({
      ...profile,
      name: name.trim() || 'Mia',
      schoolGrade: schoolGrade.trim() || 'Primary 4 Cadet',
      avatar,
      pin: inputPin || pin || '1234',
      isSignedIn: true,
    });
  };

  const handleBiometricScan = (type: 'face' | 'fingerprint') => {
    sound.tap();
    setIsScanning(true);
    setScanType(type);
    setErrorMsg('');

    setTimeout(() => {
      sound.fanfare();
      setIsScanning(false);
      completeUnlock('9999');
    }, 1100);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Lock status & Clock */}
      <div className="pt-6 pb-2 px-6 text-center space-y-1 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-200 shadow-sm">
          <Lock className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-medium tracking-wide">HeroPhone OS · Pupil Sign In</span>
        </div>

        <div className="pt-3">
          <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white drop-shadow">
            {currentTime}
          </div>
          <p className="text-xs text-indigo-200/80 font-medium pt-0.5">
            Cloud Heroes: Stay Safe Online
          </p>
        </div>
      </div>

      {/* Scrollable Sign-in Card */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3.5 z-10">
        {/* Cadet Profile Selector */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-indigo-200">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Pupil Credentials</span>
            <span className="text-[10px] text-emerald-400 font-bold">● System Ready</span>
          </div>

          {/* Name & Class inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pupil Name"
                className="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/20 text-xs font-semibold text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-300 block mb-1">Class / Grade</label>
              <input
                type="text"
                value={schoolGrade}
                onChange={(e) => setSchoolGrade(e.target.value)}
                placeholder="e.g. Primary 4"
                className="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/20 text-xs font-semibold text-white focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* Avatar Bar */}
          <div>
            <label className="text-[10px] text-slate-300 block mb-1.5">Choose Cadet Avatar</label>
            <div className="grid grid-cols-6 gap-1.5">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => {
                    sound.tap();
                    setAvatar(av.emoji);
                  }}
                  className={`h-9 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer ${
                    avatar === av.emoji
                      ? 'bg-sky-500 ring-2 ring-white scale-105 shadow-md'
                      : 'bg-black/30 hover:bg-black/50 border border-white/10'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PIN Indicators */}
        <div className="text-center space-y-1.5">
          <p className="text-xs font-medium text-slate-300">
            Enter 4-Digit Passcode or use Quick Biometric Scan
          </p>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  pin.length > idx
                    ? 'bg-sky-400 border-sky-400 scale-110 shadow-sm shadow-sky-400/50'
                    : 'border-white/30 bg-white/5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Biometric Scanning Animation Overlay if active */}
        {isScanning && (
          <div className="p-3 bg-sky-950/80 rounded-2xl border border-sky-500/50 text-center space-y-2 animate-pulse">
            <div className="flex justify-center">
              {scanType === 'face' ? (
                <ScanFace className="w-8 h-8 text-sky-400 animate-spin" />
              ) : (
                <Fingerprint className="w-8 h-8 text-sky-400 animate-bounce" />
              )}
            </div>
            <p className="text-xs text-sky-200 font-semibold">
              Verifying Cadet {name} Face ID &amp; Cloud Permissions...
            </p>
          </div>
        )}

        {/* Quick Touch / Face ID Action Row */}
        {!isScanning && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleBiometricScan('face')}
              className="h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 text-sky-200 hover:text-white transition-all cursor-pointer"
            >
              <ScanFace className="w-4 h-4 text-sky-400" />
              <span>Face ID Scan</span>
            </button>
            <button
              onClick={() => handleBiometricScan('fingerprint')}
              className="h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 text-sky-200 hover:text-white transition-all cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-sky-400" />
              <span>Touch ID Scan</span>
            </button>
          </div>
        )}

        {/* 12-button Keypad */}
        <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto pb-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num)}
              className="h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-base font-bold text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 text-base font-bold text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-11 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 text-xs font-bold text-slate-300 transition-all flex items-center justify-center cursor-pointer"
          >
            ⌫
          </button>
        </div>

        {/* Direct Instant Enter Button */}
        <button
          onClick={() => completeUnlock()}
          className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.99] transition-all cursor-pointer"
        >
          <Unlock className="w-4 h-4" />
          <span>Sign In &amp; Enter Phone Settings</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
