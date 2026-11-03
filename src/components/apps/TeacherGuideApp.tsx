import React, { useState } from 'react';
import { BookOpen, Users, Shield, CheckCircle, FileText, Download, Award, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Props {
  onBack: () => void;
}

export const TeacherGuideApp: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'cyberlaw' | 'classroom'>('curriculum');

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
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Teachers &amp; Parents</span>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-transparent p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Educator &amp; Family Guidance</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            From the "Cloud Heroes: Stay Safe Online" student-teacher initiative. Aligned with primary computing, personal data safety, and digital ethics.
          </p>
        </div>

        {/* Segmented Tab Bar */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => {
              sound.tap();
              setActiveTab('curriculum');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => {
              sound.tap();
              setActiveTab('cyberlaw');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'cyberlaw'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cyber Law (10–12)
          </button>
          <button
            onClick={() => {
              sound.tap();
              setActiveTab('classroom');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'classroom'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Activities
          </button>
        </div>

        {/* Tab 1: Curriculum */}
        {activeTab === 'curriculum' && (
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                Key Learning Outcomes (Ages 8–12)
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Private vs OK to Share:</strong> Distinguishing between shareable interests (favourite colours, artwork, books) and sensitive identifying credentials (passwords, addresses, school and class).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>The 5 Cloud Powers:</strong> Applying situational ethics and defensive instincts: Alert (phishing popups), Strong (passwords), Brave (reporting mean messages), Kind (asking before posting friends' photos), and Smart (protecting home addresses).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Public vs Private Clouds:</strong> Grasping multi-tenant public infrastructure (like Google Drive) versus dedicated school servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Cloud Outage Resilience:</strong> Discussing "What if the cloud stopped working?" and maintaining independent 3-2-1 backup copies on USB thumb drives.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Cyber Law */}
        {activeTab === 'cyberlaw' && (
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                <Shield className="w-4 h-4" />
                <span>⭐ Challenge Corner (Ages 10–12)</span>
              </div>

              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white mb-0.5">1. Personal Data Protection (PDPA / Privacy)</span>
                  Pupils learn that their full legal name, home address, school, and biometric face photos constitute private personal data that apps cannot harvest without parental consent.
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white mb-0.5">2. Copyright &amp; Intellectual Property</span>
                  Digital assets, illustrations, and music found online are protected by copyright. Pupils must learn fair-use attribution and understand why copying code/art is illegal.
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white mb-0.5">3. Computer Misuse &amp; Unauthorized Access</span>
                  Logging into a classmate's school portal or guessing someone else's PIN without consent is unauthorized computer access under cyber law legislation.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Activities */}
        {activeTab === 'classroom' && (
          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                Classroom Discussion Prompts
              </h3>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>Why is it OK to share your favourite colour, but never your home address or school class?</li>
                <li>Which of the 5 Cloud Powers (Alert, Strong, Brave, Kind, Smart) do you use the most when playing online games?</li>
                <li>What would happen to your school if the cloud system stopped for one whole week? How do backup USB drives help?</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
