import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { Invitation, InvitationResponse } from '../types/invitation';
import { sendResponseEmail } from './emailService';

const LOCAL_STORAGE_KEY = 'date_invitations_v1';

// Preset demo invitation for `/demo` route
export const DEMO_INVITATION: Invitation = {
  id: 'demo',
  creatorId: 'creator-demo-123',
  creatorName: 'TJ',
  recipientName: 'Angel rose (Yahoo)',
  message: "Hey Angel rose (Yahoo)! I've had the best time talking with you lately. Would you go out with me? 💕",
  dateIdea: 'coffee',
  date: '2026-08-22',
  time: '19:00',
  location: 'Baguio City Cafe & Bistro',
  notes: 'Bring your favorite smile! ✨',
  theme: 'pink-dream',
  status: 'pending',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Helper to interact with LocalStorage
function getLocalInvitations(): Invitation[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalInvitations(invitations: Invitation[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invitations));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
  if (id === 'demo') {
    return DEMO_INVITATION;
  }

  // 1. Try Firebase Firestore if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'invitations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as Invitation;
      }
    } catch (err) {
      console.warn('Firestore fetch failed, checking local storage:', err);
    }
  }

  // 2. Local Storage Fallback
  const locals = getLocalInvitations();
  const found = locals.find((inv) => inv.id === id);
  return found || null;
}

export async function createInvitation(invitation: Omit<Invitation, 'createdAt' | 'updatedAt'>): Promise<Invitation> {
  const now = new Date().toISOString();
  const newInvitation: Invitation = {
    ...invitation,
    createdAt: now,
    updatedAt: now
  };

  // 1. Save to Local Storage
  const locals = getLocalInvitations();
  locals.unshift(newInvitation);
  saveLocalInvitations(locals);

  // 2. Save to Firebase if configured
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'invitations', newInvitation.id);
      await setDoc(docRef, newInvitation);
    } catch (err) {
      console.warn('Firestore create invitation failed:', err);
    }
  }

  return newInvitation;
}

export async function updateInvitationResponse(
  id: string,
  status: 'accepted' | 'declined',
  response?: Omit<InvitationResponse, 'respondedAt'>
): Promise<Invitation | null> {
  if (id === 'demo') {
    return {
      ...DEMO_INVITATION,
      status,
      response: {
        ...response,
        respondedAt: new Date().toISOString()
      }
    };
  }

  const now = new Date().toISOString();
  const responseData: InvitationResponse = {
    ...response,
    respondedAt: now
  };

  let updatedInv: Invitation | null = null;

  // 1. Update in Local Storage
  const locals = getLocalInvitations();
  const index = locals.findIndex((inv) => inv.id === id);
  if (index !== -1) {
    locals[index] = {
      ...locals[index],
      status,
      response: responseData,
      updatedAt: now
    };
    saveLocalInvitations(locals);
    updatedInv = locals[index];
  }

  // 2. Update in Firebase
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'invitations', id);
      await updateDoc(docRef, {
        status,
        response: responseData,
        updatedAt: now
      });
    } catch (err) {
      console.warn('Firestore response update failed:', err);
    }
  }

  const targetInv = updatedInv || (await getInvitationById(id));
  if (targetInv) {
    sendResponseEmail(targetInv, status, responseData);
  }

  return targetInv;
}

export async function getUserInvitations(creatorId: string): Promise<Invitation[]> {
  const localItems = getLocalInvitations().filter((inv) => inv.creatorId === creatorId || creatorId === 'guest');

  if (isFirebaseConfigured && db && creatorId !== 'guest') {
    try {
      const q = query(collection(db, 'invitations'), where('creatorId', '==', creatorId));
      const querySnap = await getDocs(q);
      const remoteItems: Invitation[] = [];
      querySnap.forEach((docSnap) => {
        remoteItems.push(docSnap.data() as Invitation);
      });

      // Merge unique by ID
      const map = new Map<string, Invitation>();
      localItems.forEach((item) => map.set(item.id, item));
      remoteItems.forEach((item) => map.set(item.id, item));
      return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn('Firestore query failed, using local storage:', err);
    }
  }

  return localItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function deleteInvitation(id: string): Promise<boolean> {
  const locals = getLocalInvitations().filter((inv) => inv.id !== id);
  saveLocalInvitations(locals);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'invitations', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore delete failed:', err);
    }
  }

  return true;
}
