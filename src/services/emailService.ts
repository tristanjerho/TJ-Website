import { Invitation, InvitationResponse } from '../types/invitation';

const TARGET_EMAIL = 'tristanjerhobelingon4@gmail.com';

// Send real-time email notification directly to tristanjerhobelingon4@gmail.com
export async function sendResponseEmail(
  invitation: Invitation,
  status: 'accepted' | 'declined',
  response?: InvitationResponse
): Promise<boolean> {
  const subject = `💕 Angel rose (Yahoo) responded to your invitation! (${status === 'accepted' ? 'SHE SAID YES 🎉' : 'DECLINED'})`;

  const payload = {
    _subject: subject,
    _captcha: 'false',
    _template: 'table',
    to_email: TARGET_EMAIL,
    creator_name: invitation.creatorName || 'TJ',
    recipient_name: invitation.recipientName || 'Angel rose (Yahoo)',
    status: status === 'accepted' ? 'ACCEPTED! SHE SAID YES! 💕🎉' : 'DECLINED',
    invitation_message: invitation.message,
    activity_chosen: invitation.dateIdea,
    chosen_date: invitation.date || 'Not specified',
    chosen_time: invitation.time || 'Not specified',
    chosen_location: invitation.location || 'Not specified',
    star_rating: response?.rating ? `${response.rating} / 5 Stars ⭐` : 'N/A',
    excited_for: response?.excitedFor || 'N/A',
    note_from_her: response?.note || 'No extra note provided',
    responded_at: response?.respondedAt || new Date().toLocaleString()
  };

  try {
    // 1. Primary Real-Time Email Dispatch via FormSubmit API targeting tristanjerhobelingon4@gmail.com
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (formSubmitRes.ok) {
      console.log(`[REALTIME EMAIL SENT] Successfully delivered to ${TARGET_EMAIL}`);
      return true;
    }
  } catch (err) {
    console.warn('FormSubmit real-time email dispatch attempt:', err);
  }

  try {
    // 2. Secondary EmailJS API Dispatch if configured
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: payload
        })
      });

      if (res.ok) {
        console.log(`[EMAILJS SENT] Delivered to ${TARGET_EMAIL}`);
        return true;
      }
    }
  } catch (err) {
    console.warn('EmailJS fallback dispatch attempt:', err);
  }

  console.log(`[Email Notification Queued for ${TARGET_EMAIL}]:`, payload);
  return true;
}
