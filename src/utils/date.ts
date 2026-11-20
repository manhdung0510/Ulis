import { APP_TIMEZONE } from '@/config/app';
import type { AppLanguage } from '@/types/domain';

/**
 * Lấy chuỗi ngày YYYY-MM-DD theo múi giờ Asia/Ho_Chi_Minh bằng Intl.
 */
export function getDateKeyInAppTz(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * Cộng/trừ số ngày từ một Date và trả về YYYY-MM-DD theo múi giờ Việt Nam.
 */
export function addDaysDateKey(baseDate: Date, offsetDays: number): string {
  const shifted = new Date(baseDate.getTime() + offsetDays * 86_400_000);
  return getDateKeyInAppTz(shifted);
}

/**
 * Trả về thứ trong tuần (0 = Chủ nhật .. 6 = Thứ bảy) của một dateKey YYYY-MM-DD.
 */
export function getWeekdayFromDateKey(dateKey: string): number {
  const parts = dateKey.split('-').map(Number);
  const year = parts[0] ?? 2026;
  const month = parts[1] ?? 1;
  const day = parts[2] ?? 1;
  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return utcDate.getUTCDay();
}

/**
 * Định dạng ngày thân thiện theo ngôn ngữ và múi giờ Asia/Ho_Chi_Minh.
 */
export function formatDisplayDate(
  isoOrDateKey: string,
  language: AppLanguage,
  includeTime = false
): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-GB';
  const date =
    isoOrDateKey.length === 10
      ? new Date(`${isoOrDateKey}T12:00:00+07:00`)
      : new Date(isoOrDateKey);

  if (Number.isNaN(date.getTime())) {
    return isoOrDateKey;
  }

  if (includeTime) {
    return new Intl.DateTimeFormat(locale, {
      timeZone: APP_TIMEZONE,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  return new Intl.DateTimeFormat(locale, {
    timeZone: APP_TIMEZONE,
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Định dạng ngày ngắn gọn (ví dụ 20/11 hoặc 20 Nov) cho lịch sử 7 ngày.
 */
export function formatShortDay(dateKey: string, language: AppLanguage): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-GB';
  const date = new Date(`${dateKey}T12:00:00+07:00`);
  return new Intl.DateTimeFormat(locale, {
    timeZone: APP_TIMEZONE,
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

/**
 * Định dạng tên thứ ngắn gọn cho nút chọn ngày đặt lịch.
 */
export function formatWeekdayShort(dateKey: string, language: AppLanguage): string {
  const locale = language === 'vi' ? 'vi-VN' : 'en-US';
  const date = new Date(`${dateKey}T12:00:00+07:00`);
  return new Intl.DateTimeFormat(locale, {
    timeZone: APP_TIMEZONE,
    weekday: 'short',
  }).format(date);
}
