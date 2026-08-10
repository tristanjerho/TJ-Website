import { Invitation } from '../types/invitation';

export function getInvitationUrl(inviteId: string): string {
  let origin = 'https://tj-website-five.vercel.app';
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    origin = window.location.origin;
  } else if (import.meta.env.VITE_APP_URL) {
    origin = import.meta.env.VITE_APP_URL;
  }

  // If demo or main invite, point directly to root website domain
  if (!inviteId || inviteId === 'demo') {
    return `${origin}/`;
  }

  return `${origin}/invite/${inviteId}`;
}

export async function shareInvitation(invitation: Invitation): Promise<boolean> {
  const url = getInvitationUrl(invitation.id);
  const shareText = `Hey ${invitation.recipientName}! I created something special for you 💕 Check it out:`;

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `Outing Invitation for ${invitation.recipientName} 💕`,
        text: shareText,
        url: url
      });
      return true;
    } catch {
      // User cancelled share or failed
    }
  }

  return false;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text)
      .then(() => true)
      .catch(() => false);
  } else {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve(successful);
    } catch {
      return Promise.resolve(false);
    }
  }
}

export function getShareLinks(invitation: Invitation) {
  const url = getInvitationUrl(invitation.id);
  const text = encodeURIComponent(`Hey ${invitation.recipientName}! I created a cute invitation for you 💕 ${url}`);
  const rawUrl = encodeURIComponent(url);

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${text}`,
    messenger: `fb-messenger://share/?link=${rawUrl}`,
    sms: `sms:?&body=${text}`,
    email: `mailto:?subject=${encodeURIComponent(`A special invitation for ${invitation.recipientName} 💕`)}&body=${text}`
  };
}
