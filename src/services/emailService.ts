import { Invitation, InvitationResponse } from '../types/invitation';

const TARGET_EMAIL = 'tristanjerhobelingon4@gmail.com';

// Send real-time email notification directly to tristanjerhobelingon4@gmail.com
export async function sendResponseEmail(
  invitation: Invitation,
  status: 'accepted' | 'declined',
  response?: InvitationResponse
): Promise<boolean> {
  const subject = `💕 Angel rose (Yahoo) responded to your invitation! (${status === 'accepted' ? 'SHE SAID YES 🎉' : 'DECLINED'})`;

  // Create FormData for browser compatibility without CORS preflight issues
  const formData = new FormData();
  formData.append('email', TARGET_EMAIL);
  formData.append('_subject', subject);
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');
  formData.append('Recipient', invitation.recipientName || 'Angel rose (Yahoo)');
  formData.append('Status', status === 'accepted' ? 'ACCEPTED! SHE SAID YES! 💕🎉' : 'DECLINED');
  formData.append('Activity Chosen', invitation.dateIdea || 'Coffee & Chat');
  formData.append('Chosen Date', invitation.date || 'Not specified');
  formData.append('Chosen Time', invitation.time || 'Not specified');
  formData.append('Chosen Location', invitation.location || 'Not specified');
  formData.append('Star Rating', response?.rating ? `${response.rating} / 5 Stars ⭐` : '5 Stars ⭐');
  formData.append('Note From Her', response?.note || 'No extra note provided');
  formData.append('Responded At', response?.respondedAt || new Date().toLocaleString());

  try {
    // 1. Primary Email Dispatch via FormSubmit AJAX FormData
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (res.ok) {
      console.log(`[FormSubmit Sent] Delivered request for ${TARGET_EMAIL}`);
      return true;
    }
  } catch (err) {
    console.warn('FormSubmit AJAX error:', err);
  }

  try {
    // 2. Backup Direct Form Action submit via hidden iframe
    const form = document.createElement('form');
    form.action = `https://formsubmit.co/${TARGET_EMAIL}`;
    form.method = 'POST';
    form.target = 'hidden_iframe_email';
    form.style.display = 'none';

    // Add hidden input fields
    formData.forEach((value, key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    });

    // Create hidden iframe if not exists
    let iframe = document.getElementById('hidden_iframe_email') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'hidden_iframe_email';
      iframe.name = 'hidden_iframe_email';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    document.body.appendChild(form);
    form.submit();
    setTimeout(() => {
      if (document.body.contains(form)) document.body.removeChild(form);
    }, 2000);

    console.log(`[Hidden Form Submitted] Sent to FormSubmit endpoint for ${TARGET_EMAIL}`);
    return true;
  } catch (err) {
    console.warn('Hidden form submit error:', err);
  }

  return false;
}
