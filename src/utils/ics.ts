import type { AppLanguage, Appointment } from '@/types/domain';

function toUtcIcsTimestamp(dateKey: string, slotTime: string, addMinutes = 0): string {
  const isoStart = `${dateKey}T${slotTime}:00+07:00`;
  const startMs = Date.parse(isoStart);
  const target = new Date(startMs + addMinutes * 60_000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${target.getUTCFullYear()}` +
    `${pad(target.getUTCMonth() + 1)}` +
    `${pad(target.getUTCDate())}T` +
    `${pad(target.getUTCHours())}` +
    `${pad(target.getUTCMinutes())}` +
    `${pad(target.getUTCSeconds())}Z`
  );
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

export function buildAppointmentIcs(appointment: Appointment, language: AppLanguage): string {
  const dtStart = toUtcIcsTimestamp(appointment.dateKey, appointment.slotTime, 0);
  const dtEnd = toUtcIcsTimestamp(appointment.dateKey, appointment.slotTime, 45);
  const dtStamp = toUtcIcsTimestamp(appointment.dateKey, appointment.slotTime, 0);

  const summary =
    language === 'en'
      ? `Họa (Demo) — 1-on-1 Session with ${appointment.counselorName}`
      : `Họa (Demo) — Lịch hẹn tham vấn 1-1 cùng ${appointment.counselorName}`;

  const description =
    language === 'en'
      ? `Reference: ${appointment.referenceCode}. Demo booking stored in browser only; not sent to a real counselor.`
      : `Mã tham chiếu: ${appointment.referenceCode}. Lịch hẹn mô phỏng lưu trên trình duyệt, không gửi tới giảng viên thật.`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hoa CBT Companion//ULIS Demo//VI',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${appointment.id}@hoa-demo.local`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadAppointmentIcs(appointment: Appointment, language: AppLanguage): void {
  const icsContent = buildAppointmentIcs(appointment, language);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${appointment.referenceCode.toLowerCase()}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
