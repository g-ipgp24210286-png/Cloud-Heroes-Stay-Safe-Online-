import React, { useState } from 'react';
import { User, Image, Volume2, VolumeX, Moon, Sun, Type, Phone, Shield, Sparkles, Check } from 'lucide-react';
import { PupilProfile, WallpaperId } from '../../types';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
  profile: PupilProfile;
  onUpdateProfile: (updater: (prev: PupilProfile) => PupilProfile) => void;
}

const AVATARS = [
  { id: 'fox', emoji: '🦊', label: 'Cyber Fox' },
  { id: 'cat', emoji: '🐱', label: 'Shield Cat' },
  { id: 'owl', emoji: '🦉', label: 'Cloud Owl' },
  { id: 'robot', emoji: '🤖', label: 'Robo Buddy' },
  { id: 'dog', emoji: '🐶', label: 'Astro Pup' },
  { id: 'bunny', emoji: '🐰', label: 'Tech Bunny' },
];

const WALLPAPERS: { id: WallpaperId; name: string; bgClass: string; previewColor: string }[] = [
  { id: 'cyber-grid', name: 'Cyber Grid', bgClass: 'from-slate-900 via-sky-950 to-slate-900', previewColor: '#0369a1' },
  { id: 'nebula-cloud', name: 'Nebula Cloud', bgClass: 'from-indigo-950 via-purple-950 to-slate-900', previewColor: '#581c87' },
  { id: 'sunset-glow', name: 'Sunset Glow', bgClass: 'from-amber-950 via-rose-950 to-slate-900', previewColor: '#be123c' },
  { id: 'emerald-circuit', name: 'Emerald Circuit', bgClass: 'from-slate-950 via-emerald-950 to-slate-900', previewColor: '#047857' },
  { id: 'pastel-sky', name: 'Daylight Sky', bgClass: 'from-sky-100 via-indigo-50 to-white', previewColor: '#38bdf8' },
];

export const PreferencesApp: React.FC<Props> = ({ onBack, profile, onUpdateProfile }) => {
  const [localName, setLocalName] = useState(profile.name);
  const [localGrade, setLocalGrade] = useState(profile.schoolGrade);
  const [localContactName, setLocalContactName] = useState(profile.trustedContactName);
  const [localContactPhone, setLocalContactPhone] = useState(profile.trustedContactPhone);

  const handleNameBlur = () => {
    onUpdateProfile((prev) => ({
      ...prev,
      name: localName.trim() || 'Hero Pupil',
      schoolGrade: localGrade.trim() || 'Primary Cadet',
      trustedContactName: localContactName.trim() || 'Mom / Dad',
      trustedContactPhone: localContactPhone.trim() || 'Parent Emergency',
    }));
  };

  const toggleSound = () => {
    sound.tap();
    const nextVal = !profile.soundEnabled;
    sound.setEnabled(nextVal);
    onUpdateProfile((prev) => ({ ...prev, soundEnabled: nextVal }));
  };

  const toggleTheme = () => {
    sound.tap();
    const nextTheme = profile.theme === 'dark' ? 'light' : 'dark';
    onUpdateProfile((prev) => ({ ...prev, theme: nextTheme }));
  };

  const setWallpaper = (id: WallpaperId) => {
    sound.tap();
    onUpdateProfile((prev) => ({ ...prev, wallpaper: id }));
  };

  const setAvatar = (emoji: string) => {
    sound.tap();
    onUpdateProfile((prev) => ({ ...prev, avatar: emoji }));
  };

  const toggleFontSize = () => {
    sound.tap();
    const nextSize = profile.fontSize === 'normal' ? 'large' : 'normal';
    onUpdateProfile((prev) => ({ ...prev, fontSize: nextSize }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
        <button
          onClick={() => {
            sound.tap();
            handleNameBlur();
            onBack();
          }}
          className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:opacity-80 py-1 px-1 -ml-1 transition-opacity cursor-pointer"
        >
          <span className="text-lg leading-none">‹</span> Settings
        </button>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Customize Preferences</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Profile Details Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Pupil Identity Card
            </h3>
          </div>

          {/* Avatar selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Choose Hero Avatar</label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  onClick={() => setAvatar(av.emoji)}
                  className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                    profile.avatar === av.emoji
                      ? 'bg-sky-500 text-white ring-2 ring-sky-400 scale-105 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={av.label}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                Pupil Name
              </label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                onBlur={handleNameBlur}
                className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                School Class / Grade
              </label>
              <input
                type="text"
                value={localGrade}
                onChange={(e) => setLocalGrade(e.target.value)}
                onBlur={handleNameBlur}
                className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Wallpaper Picker */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-purple-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Phone Wallpaper
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {WALLPAPERS.map((wp) => (
              <button
                key={wp.id}
                onClick={() => setWallpaper(wp.id)}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  profile.wallpaper === wp.id
                    ? 'border-sky-500 ring-2 ring-sky-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <div
                  className={`w-full h-12 rounded-lg bg-gradient-to-br ${wp.bgClass} flex items-center justify-center`}
                >
                  {profile.wallpaper === wp.id && <Check className="w-4 h-4 text-white drop-shadow" />}
                </div>
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {wp.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hardware & Accessibility Switches */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              System Settings &amp; Audio
            </h3>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
            {/* Dark Theme toggle */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {profile.theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span className="font-semibold text-slate-800 dark:text-slate-200">Dark / Light Interface</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  profile.theme === 'dark' ? 'bg-sky-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                    profile.theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Sound FX Toggle */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Tactile Audio Chimes</span>
                  <span className="text-[10px] text-slate-400">Button taps &amp; success celebrations</span>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  profile.soundEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                    profile.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Font Size Toggle */}
            <div className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Readable Large Font</span>
              </div>
              <button
                onClick={toggleFontSize}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  profile.fontSize === 'large'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                {profile.fontSize === 'large' ? 'Large (18px)' : 'Standard'}
              </button>
            </div>
          </div>
        </div>

        {/* Trusted Grown-Up Card */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Emergency Trusted Grown-Up
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Keep the contact info of the adult you trust to call if you encounter suspicious links or cyberbullying.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={localContactName}
              onChange={(e) => setLocalContactName(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="e.g. Mum / Dad / Teacher Wong"
              className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="text"
              value={localContactPhone}
              onChange={(e) => setLocalContactPhone(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="e.g. +60 12-345 6789"
              className="w-full h-10 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
