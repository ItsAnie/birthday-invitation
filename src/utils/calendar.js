/**
 * Օրացույցի գործիքներ (Calendar Utilities)
 * Գեներացնում է Google Calendar-ի հղում և ներբեռնվող .ics ֆայլ:
 */

export function generateGoogleCalendarUrl(event, venue) {
  const startDate = new Date(event.isoDate);
  const endDate = new Date(startDate.getTime() + (event.durationHours || 5) * 60 * 60 * 1000);

  const formatTime = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    dates: `${formatTime(startDate)}/${formatTime(endDate)}`,
    details: `${event.calendarDescription}\n\nՀասցե՝ ${venue.fullAddress}`,
    location: venue.fullAddress,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event, venue) {
  const startDate = new Date(event.isoDate);
  const endDate = new Date(startDate.getTime() + (event.durationHours || 5) * 60 * 60 * 1000);

  const formatIcsDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Digital Armenian Birthday Invitation//HY",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:birthday-${startDate.getTime()}@invitation.am`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${event.calendarTitle}`,
    `DESCRIPTION:${event.calendarDescription}`,
    `LOCATION:${venue.fullAddress}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "birthday-invitation.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
