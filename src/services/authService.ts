import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './firebase';
import { UserProfile } from '../types/invitation';

const GUEST_KEY = 'date_app_guest_user';

export function getGuestUser(): UserProfile {
  let stored = localStorage.getItem(GUEST_KEY);
  if (!stored) {
    const guestProfile: UserProfile = {
      uid: 'guest-' + Math.random().toString(36).substring(2, 9),
      email: 'guest@dateapp.local',
      displayName: 'Romantic Creator',
      isGuest: true
    };
    localStorage.setItem(GUEST_KEY, JSON.stringify(guestProfile));
    return guestProfile;
  }
  return JSON.parse(stored);
}

export function subscribeToAuthChanges(callback: (user: UserProfile | null) => void) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          photoURL: user.photoURL,
          isGuest: false
        });
      } else {
        // Fallback to guest user
        callback(getGuestUser());
      }
    });
  } else {
    // If Firebase isn't configured, immediately provide guest user
    callback(getGuestUser());
    return () => {};
  }
}

export async function loginWithGoogle(): Promise<UserProfile | null> {
  if (isFirebaseConfigured && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        isGuest: false
      };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }
  return getGuestUser();
}

export async function logoutUser(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  // Clear guest state if requested
  localStorage.removeItem(GUEST_KEY);
}
