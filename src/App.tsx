/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppSection, PupilProfile, ProgressState } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { LockScreenSignIn } from './components/LockScreenSignIn';
import { HomeScreenSettings } from './components/HomeScreenSettings';
import { PrivateOrShareApp } from './components/apps/PrivateOrShareApp';
import { CloudPowerMatchApp } from './components/apps/CloudPowerMatchApp';
import { PublicOrPrivateCloudApp } from './components/apps/PublicOrPrivateCloudApp';
import { CloudOutageNotebookApp } from './components/apps/CloudOutageNotebookApp';
import { PreferencesApp } from './components/apps/PreferencesApp';
import { DigitalWellbeingApp } from './components/apps/DigitalWellbeingApp';
import { TeacherGuideApp } from './components/apps/TeacherGuideApp';
import { sound } from './utils/sound';

const STORAGE_KEY_PROFILE = 'cloud_heroes_pupil_profile_v3';
const STORAGE_KEY_PROGRESS = 'cloud_heroes_pupil_progress_v3';

const DEFAULT_PROFILE: PupilProfile = {
  name: 'Mia',
  avatar: '🦊',
  schoolGrade: 'Primary 4 Cadet',
  pin: '1234',
  isSignedIn: false, // Show sign-in gimmick first!
  wallpaper: 'cyber-grid',
  soundEnabled: true,
  theme: 'dark',
  fontSize: 'normal',
  trustedContactName: 'Mum & Dad',
  trustedContactPhone: '+60 12-345 6789',
};

const DEFAULT_PROGRESS: ProgressState = {
  privateShareCompleted: false,
  privateShareScore: 0,
  privateShareTotal: 6,

  cloudPowersCompleted: false,
  cloudPowersScore: 0,
  cloudPowersTotal: 5,

  publicPrivateCompleted: false,
  publicPrivateScore: 0,
  publicPrivateTotal: 4,

  cloudOutageCompleted: false,
  notebookNotes: {
    whatLose: '',
    whatDo: '',
  },
};

export default function App() {
  const [activeApp, setActiveApp] = useState<AppSection>('home');
  const [isTabletMode, setIsTabletMode] = useState<boolean>(false);

  // Initialize profile with local storage
  const [profile, setProfile] = useState<PupilProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  // Initialize progress with local storage
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_PROGRESS;
  });

  // Keep sound helper in sync
  useEffect(() => {
    sound.setEnabled(profile.soundEnabled);
  }, [profile.soundEnabled]);

  // Sync dark mode class on document element
  useEffect(() => {
    if (profile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);

  // Save profile updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {
      // Silent
    }
  }, [profile]);

  // Save progress updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // Silent
    }
  }, [progress]);

  const handleSignInSuccess = (updatedProfile: PupilProfile) => {
    setProfile(updatedProfile);
    setActiveApp('home');
  };

  const handleLockPhone = () => {
    sound.tap();
    setProfile((prev) => ({ ...prev, isSignedIn: false }));
  };

  const handleResetProgress = () => {
    sound.tap();
    if (window.confirm('Reset all your practice progress?')) {
      setProgress(DEFAULT_PROGRESS);
    }
  };

  return (
    <div className={profile.theme === 'dark' ? 'dark' : ''}>
      <PhoneFrame
        profile={profile}
        progress={progress}
        isTabletMode={isTabletMode}
        onToggleViewMode={() => setIsTabletMode(!isTabletMode)}
        onResetProgress={handleResetProgress}
      >
        {/* If pupil is not signed in, show the Phone LockScreen Sign-in Gimmick! */}
        {!profile.isSignedIn ? (
          <LockScreenSignIn
            profile={profile}
            onSignInSuccess={handleSignInSuccess}
          />
        ) : (
          /* Main Apps Inside Phone Settings */
          <>
            {activeApp === 'home' && (
              <HomeScreenSettings
                onSelectApp={(app) => setActiveApp(app)}
                profile={profile}
                progress={progress}
                onLockPhone={handleLockPhone}
              />
            )}

            {activeApp === 'private-or-share' && (
              <PrivateOrShareApp
                onBack={() => setActiveApp('home')}
                progress={progress}
                onUpdateProgress={setProgress}
              />
            )}

            {activeApp === 'cloud-powers' && (
              <CloudPowerMatchApp
                onBack={() => setActiveApp('home')}
                progress={progress}
                onUpdateProgress={setProgress}
              />
            )}

            {activeApp === 'public-private-cloud' && (
              <PublicOrPrivateCloudApp
                onBack={() => setActiveApp('home')}
                progress={progress}
                onUpdateProgress={setProgress}
              />
            )}

            {activeApp === 'cloud-outage' && (
              <CloudOutageNotebookApp
                onBack={() => setActiveApp('home')}
                progress={progress}
                onUpdateProgress={setProgress}
              />
            )}

            {activeApp === 'preferences' && (
              <PreferencesApp
                onBack={() => setActiveApp('home')}
                profile={profile}
                onUpdateProfile={setProfile}
              />
            )}

            {activeApp === 'wellbeing' && (
              <DigitalWellbeingApp onBack={() => setActiveApp('home')} />
            )}

            {activeApp === 'teacher-guide' && (
              <TeacherGuideApp onBack={() => setActiveApp('home')} />
            )}
          </>
        )}
      </PhoneFrame>
    </div>
  );
}
