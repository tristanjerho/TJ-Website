export type ThemeId = 
  | 'love-letter' 
  | 'pink-dream' 
  | 'midnight-romance' 
  | 'sunset' 
  | 'minimal-hearts' 
  | 'cute-funny';

export type DateIdeaType = 
  | 'coffee' 
  | 'dinner' 
  | 'movie' 
  | 'beach' 
  | 'picnic' 
  | 'arcade' 
  | 'surprise';

export interface DateIdeaOption {
  id: DateIdeaType;
  label: string;
  emoji: string;
  description: string;
}

export type InvitationStatus = 'pending' | 'accepted' | 'declined';

export interface InvitationResponse {
  excitedFor?: string;
  rating?: number;
  note?: string;
  respondedAt: string;
}

export interface Invitation {
  id: string;
  creatorId: string;
  creatorName: string;
  recipientName: string;
  message: string;
  dateIdea: DateIdeaType | string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:mm
  location?: string;
  notes?: string;
  photoUrl?: string;
  theme: ThemeId;
  status: InvitationStatus;
  response?: InvitationResponse;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isGuest?: boolean;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  backgroundClass: string;
  cardClass: string;
  textHeadingClass: string;
  textBodyClass: string;
  accentButtonClass: string;
  accentBadgeClass: string;
  fontClass: string;
  floatingEmojis: string[];
}
