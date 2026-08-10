import { Invitation, InvitationResponse } from '../types/invitation';

const TARGET_EMAIL = 'tristanjerhobelingon4@gmail.com';

// Send response notification email to Yahoo's Gmail account when Angel rose accepts or responds
export async function sendResponseEmail(
  invitation: Invitation,
  status: 'accepted' | 'declined',
  response?: InvitationResponse
): Promise<boolean> {
  const payload = {
    to_email: TARGET_EMAIL,
    creator_name: invitation.creatorName || 'TJ',
    recipient_name: invitation.recipientName || 'Angel rose (Yahoo)',
    status: status === 'accepted' ? 'ACCEPTED! SHE SAID YES! 💕🎉' : 'DECLINED',
    message: invitation.message,
    date_idea: invitation.dateIdea,
    date: invitation.date || 'Not specified',
    time: invitation.time || 'Not specified',
    location: invitation.location || 'Not specified',
    rating: response?.rating ? `${response.rating} / 5 Stars ⭐` : 'N/A',
    excited_for: response?.excitedFor || 'N/A',
    note: response?.note || 'No extra note provided',
    responded_at: response?.respondedAt || new Date().toLocaleString()
  };

  try {
    // 1. Try sending via EmailJS REST endpoint or Webhook service if available
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_date_app';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_date_invite';
    const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_demo_key';

    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: payload
        })
      });

      if (res.ok) {
        console.log(`Response email successfully sent to ${TARGET_EMAIL}`);
        return true;
      }
    }

    // 2. Backup Formspree / Webhook dispatch endpoint
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (formspreeEndpoint) {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `💕 Angel rose responded to your invitation! (${payload.status})`,
          ...payload
        })
      });
      return true;
    }

    // Log payload for development and tracking
    console.log(`[Email Notification Triggered for ${TARGET_EMAIL}]:`, payload);
    return true;
  } catch (err) {
    console.warn('Failed to send email notification:', err);
    return false;
  }
}
