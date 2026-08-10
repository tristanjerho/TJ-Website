import { Invitation } from '../types/invitation';

export function getGoogleCalendarUrl(invitation: Invitation): string {
  const title = encodeURIComponent(`Date with ${invitation.creatorName}! 💕`);
  const details = encodeURIComponent(
    `Date Idea: ${invitation.dateIdea}\n` +
    `Message: ${invitation.message}\n` +
    (invitation.notes ? `Notes: ${invitation.notes}\n` : '') +
    `Created via Date Invitation App 💕`
  );
  const location = encodeURIComponent(invitation.location || 'Special Location ✨');

  let datesParam = '';
  if (invitation.date) {
    const timeStr = invitation.time || '19:00';
    const [hours, minutes] = timeStr.split(':');
    const startDate = new Date(invitation.date);
    startDate.setHours(parseInt(hours || '19', 10), parseInt(minutes || '0', 10));

    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours default duration

    const formatICSDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    datesParam = `&dates=${formatICSDate(startDate)}/${formatICSDate(endDate)}`;
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${datesParam}`;
}

export function downloadIcsFile(invitation: Invitation): void {
  const title = `Date with ${invitation.creatorName}! 💕`;
  const description = `Date Idea: ${invitation.dateIdea}\\nMessage: ${invitation.message}\\n${invitation.notes ? `Notes: ${invitation.notes}` : ''}`;
  const location = invitation.location || 'Special Location ✨';

  let startDate = new Date();
  if (invitation.date) {
    const timeStr = invitation.time || '19:00';
    const [hours, minutes] = timeStr.split(':');
    startDate = new Date(invitation.date);
    startDate.setHours(parseInt(hours || '19', 10), parseInt(minutes || '0', 10));
  } else {
    // Default to tomorrow if unspecified
    startDate.setDate(startDate.getDate() + 1);
  }

  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatICSDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DateInvitationApp//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `date_with_${invitation.creatorName.toLowerCase().replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
