import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Cloud, 
  Palette, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Search, 
  Lock, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { AppSection, PupilProfile, ProgressState } from '../types';
import { sound } from '../utils/sound';

interface Props {
  onSelectApp: (app: AppSection) => void;
  profile: PupilProfile;
  progress: ProgressState;
  onLockPhone: () => void;
}

export const HomeScreenSettings: React.FC<Props> = ({
  onSelectApp,
  profile,
  progress,
  onLockPhone,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 4 modules from the PDF (25% each = 100%)
  let scorePoints = 0;
  if (progress.privateShareCompleted) scorePoints += 25;
  if (progress.cloudPowersCompleted) scorePoints += 25;
  if (progress.publicPrivateCompleted) scorePoints += 25;
  if (progress.cloudOutageCompleted) scorePoints += 25;

  const appItems = [
    {
      id: 'private-or-share' as AppSection,
      title: 'Game 1: Private or OK to share?',
      subtitle: 'Passwords, addresses, colours, school names (Page 1)',
      icon: ShieldCheck,
      iconColor: 'bg-emerald-500 text-white',
      badge: progress.privateShareCompleted
        ? `${progress.privateShareScore}/${progress.privateShareTotal} Safe ✅`
        : 'Play Game 1',
      isCompleted: progress.privateShareCompleted,
      keywords: 'private share password address colour drawing school book',
    },
    {
      id: 'cloud-powers' as AppSection,
      title: 'Game 2: Match the Cloud Power',
      subtitle: 'Alert 👀, Strong 🔒, Brave 🦸, Kind 💛, Smart 🧠 (Page 2)',
      icon: Sparkles,
      iconColor: 'bg-purple-500 text-white',
      badge: progress.cloudPowersCompleted
        ? `${progress.cloudPowersScore}/${progress.cloudPowersTotal} Powers ⚡`
        : 'Play Game 2',
      isCompleted: progress.cloudPowersCompleted,
      keywords: 'powers alert strong brave kind smart pop up mean message photo',
    },
    {
      id: 'public-private-cloud' as AppSection,
      title: 'Game 3: Public or private?',
      subtitle: 'Google Drive vs School locked systems (Page 2)',
      icon: Cloud,
      iconColor: 'bg-teal-500 text-white',
      badge: progress.publicPrivateCompleted
        ? `${progress.publicPrivateScore}/${progress.publicPrivateTotal} Cloud 🌍`
        : 'Play Game 3',
      isCompleted: progress.publicPrivateCompleted,
      keywords: 'public private cloud google drive school network server',
    },
    {
      id: 'cloud-outage' as AppSection,
      title: '🤔 What if the cloud stopped working?',
      subtitle: 'Pupil notebook ideas & 3-2-1 backup drill (Page 3)',
      icon: BookOpen,
      iconColor: 'bg-amber-500 text-white',
      badge: progress.cloudOutageCompleted ? 'Notes Saved 📝' : 'Open Notebook',
      isCompleted: progress.cloudOutageCompleted,
      keywords: 'notebook what if cloud stopped lose homework backup friend',
    },
    {
      id: 'preferences' as AppSection,
      title: 'Display & Pupil Preferences',
      subtitle: 'Wallpapers, dark theme, cadet avatar & sounds',
      icon: Palette,
      iconColor: 'bg-sky-500 text-white',
      badge: 'Customize',
      isCompleted: false,
      keywords: 'preferences wallpaper theme color sound avatar name profile dark mode',
    },
    {
      id: 'wellbeing' as AppSection,
      title: 'Digital Wellbeing & Eye Rest',
      subtitle: 'Screen balance & 20-20-20 eye relaxation drill',
      icon: Clock,
      iconColor: 'bg-rose-500 text-white',
      badge: 'Wellbeing',
      isCompleted: false,
      keywords: 'screen time wellbeing eyes health balance rules sleep',
    },
    {
      id: 'teacher-guide' as AppSection,
      title: 'Teachers & Parents Corner',
      subtitle: 'Classroom discussion prompts & learning guide',
      icon: HelpCircle,
      iconColor: 'bg-indigo-500 text-white',
      badge: 'Guide',
      isCompleted: false,
      keywords: 'teacher parent school law copyright curriculum ethics',
    },
  ];

  const filteredApps = appItems.filter((app) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.title.toLowerCase().includes(q) ||
      app.subtitle.toLowerCase().includes(q) ||
      app.keywords.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 overflow-y-auto">
      {/* Top Settings Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Settings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cloud Heroes Student OS · Be Smart, Be Kind, Be Safe
          </p>
        </div>

        {/* Lock Phone / Sign-Out Gimmick button */}
        <button
          onClick={() => {
            sound.tap();
            onLockPhone();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          title="Lock screen / Switch Cadet"
        >
          <Lock className="w-3.5 h-3.5 text-sky-500" />
          <span>Lock Phone</span>
        </button>
      </div>

      {/* Pupil Hero Profile Card */}
      <div className="px-4 py-2">
        <div
          onClick={() => {
            sound.tap();
            onSelectApp('preferences');
          }}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-all flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-2xl shadow-sm ring-2 ring-white dark:ring-slate-700">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Cadet {profile.name}
                </span>
                {scorePoints === 100 && (
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-bold border border-emerald-300 dark:border-emerald-700 flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" /> All Done!
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {profile.schoolGrade} · Signed In
              </p>
              {/* Mini Security Bar */}
              <div className="mt-1 flex items-center gap-2">
                <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${scorePoints}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {scorePoints}% Completed
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search games, cloud powers, public cloud, notebook..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-200/60 dark:bg-slate-800 border border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Be a Good Digital Citizen Spotlight Card from attached asset */}
      <div className="px-4 py-2">
        <div className="rounded-2xl border border-sky-300 dark:border-sky-800 bg-gradient-to-br from-sky-50 via-white to-sky-100/60 dark:from-slate-800 dark:via-slate-800 dark:to-sky-950/40 p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">☁️</span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-sky-900 dark:text-sky-300">
                Be a Good Digital Citizen
              </span>
            </div>
            <button
              onClick={() => {
                sound.tap();
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  const utterance = new SpeechSynthesisUtterance(
                    "Be a good digital citizen! Number 1: Ask first before you use someone's picture or work. Number 2: Say where it came from when you copy an idea or a picture. Number 3: Ask a grown-up before you use an A.I. helper, and check what it says."
                  );
                  utterance.rate = 0.95;
                  window.speechSynthesis.speak(utterance);
                } else {
                  sound.success();
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
              title="Listen to digital citizen rules read aloud"
            >
              <span>🔊 Listen</span>
            </button>
          </div>

          {/* Embed attached infographic */}
          <div className="rounded-xl overflow-hidden border border-sky-200 dark:border-slate-700 bg-sky-100 dark:bg-slate-900">
            <img
              src="/assets/aistudio/07922f73-6a06-49c9-ad0f-0e1fa61bf6e2_ac826b54.png"
              alt="Be a good digital citizen: Ask first before you use someone's picture or work. Say where it came from when you copy an idea or a picture. Ask a grown-up before you use an AI helper."
              className="w-full h-auto object-cover max-h-48"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-center">
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800">
              🖼️ Ask First
            </div>
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800">
              💬 Credit Source
            </div>
            <div className="p-1.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800">
              🤖 Check with Adult
            </div>
          </div>
        </div>
      </div>

      {/* Settings List grouped */}
      <div className="px-4 py-2 space-y-4 pb-8">
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Cloud Heroes Learning Modules (Pages 1–3)
          </span>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 divide-y divide-slate-100 dark:divide-slate-700/60 shadow-sm overflow-hidden">
            {filteredApps.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.tap();
                    onSelectApp(item.id);
                  }}
                  className="w-full p-3 sm:p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${item.iconColor} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 block group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="text-center py-2 space-y-1">
          <p className="text-[11px] text-slate-400 font-medium">
            Be Smart, Be Kind, Be Safe : Your Online Adventure Starts Here!
          </p>
          <p className="text-[10px] text-slate-400/80">
            Cloud Heroes · Student Teacher Project
          </p>
        </div>
      </div>
    </div>
  );
};
