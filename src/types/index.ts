export type AppSection = 
  | 'home'
  | 'private-or-share'
  | 'cloud-powers'
  | 'public-private-cloud'
  | 'cloud-outage'
  | 'preferences'
  | 'wellbeing'
  | 'teacher-guide';

export type WallpaperId = 'cyber-grid' | 'nebula-cloud' | 'sunset-glow' | 'emerald-circuit' | 'pastel-sky';

export interface PupilProfile {
  name: string;
  avatar: string;
  schoolGrade: string;
  pin: string;
  isSignedIn: boolean;
  wallpaper: WallpaperId;
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  fontSize: 'normal' | 'large';
  trustedContactName: string;
  trustedContactPhone: string;
}

export type CloudPower = 'Alert' | 'Strong' | 'Brave' | 'Kind' | 'Smart';

export interface ProgressState {
  // Game 1: Private or OK to share (Page 1)
  privateShareCompleted: boolean;
  privateShareScore: number;
  privateShareTotal: number;

  // Game 2: Match the Cloud Power (Pages 1 & 2)
  cloudPowersCompleted: boolean;
  cloudPowersScore: number;
  cloudPowersTotal: number;

  // Game 3: Public or Private Cloud (Page 2)
  publicPrivateCompleted: boolean;
  publicPrivateScore: number;
  publicPrivateTotal: number;

  // Page 3: What if the cloud stopped working? (Pupil Notebook)
  cloudOutageCompleted: boolean;
  notebookNotes?: {
    whatLose: string;
    whatDo: string;
  };
}

export interface ShareItem {
  id: string;
  text: string;
  isPrivate: boolean; // true = Private, false = OK to share
  explanation: string;
  icon?: string;
}

export interface CloudPowerScenario {
  id: string;
  situation: string;
  correctPower: CloudPower;
  powerIcon: string;
  explanation: string;
}

export interface PublicPrivateItem {
  id: string;
  title: string;
  isPublic: boolean; // true = Public 🌍, false = Private 🔒
  explanation: string;
  icon: string;
}
