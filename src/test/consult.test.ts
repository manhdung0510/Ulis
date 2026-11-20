import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  appointmentService,
  computeSlotsForCounselorAndDate,
} from '@/services/appointmentService';
import {
  computeSampleReplyDelayMs,
  consultService,
  isSampleReplyReady,
  resolveConsultPostForDisplay,
} from '@/services/consultService';
import { resetSimulatedDelayRange, setSimulatedDelayRange } from '@/services/delay';
import { clearAllUserDataInStorage } from '@/services/storage';
import { buildAppointmentIcs } from '@/utils/ics';

describe('consult Q&A timestamp-based sample replies', () => {
  beforeEach(() => {
    setSimulatedDelayRange(0, 0);
    clearAllUserDataInStorage();
  });

  afterEach(() => {
    resetSimulatedDelayRange();
  });

  it('computes deterministic reply delay between 6 and 10 seconds', () => {
    const delayA = computeSampleReplyDelayMs('seed-1');
    const delayB = computeSampleReplyDelayMs('seed-1');
    expect(delayA).toBe(delayB);
    expect(delayA).toBeGreaterThanOrEqual(6000);
    expect(delayA).toBeLessThanOrEqual(10000);
  });

  it('resolves sample reply only when current time reaches persisted replyReadyAt', async () => {
    const created = await consultService.createPost({
      title: 'Căng thẳng trước kỳ thi nói',
      content: 'Mình hơi run mỗi lần chuẩn bị vào phòng thi vấn đáp.',
      topic: 'anxiety-stress',
      isAnonymous: true,
      language: 'vi',
    });

    expect(created.replyReadyAt).toBeDefined();
    const createdMs = Date.parse(created.createdAt);
    const readyMs = Date.parse(created.replyReadyAt!);

    expect(isSampleReplyReady(created, createdMs + 1000)).toBe(false);
    expect(isSampleReplyReady(created, readyMs)).toBe(true);

    const earlyResolved = await consultService.resolveReadyReplies(createdMs + 1000, 'vi');
    expect(earlyResolved).toHaveLength(0);

    const readyResolved = await consultService.resolveReadyReplies(readyMs + 100, 'vi');
    expect(readyResolved).toHaveLength(1);
    expect(readyResolved[0]?.id).toBe(created.id);
    expect(readyResolved[0]?.sampleReply?.suggestedExerciseId).toBeDefined();
  });

  it('translates seed posts by language while keeping user-entered post text untouched', async () => {
    const userPost = await consultService.createPost({
      title: 'Tiêu đề tự nhập bằng tiếng Việt',
      content: 'Nội dung người dùng tự viết không bị dịch sang tiếng Anh.',
      topic: 'study',
      isAnonymous: true,
      language: 'vi',
    });

    const posts = await consultService.getPosts();
    const seedPost = posts.find((p) => p.id === 'seed-post-1');
    expect(seedPost).toBeDefined();

    const seedEn = resolveConsultPostForDisplay(seedPost!, 'en');
    expect(seedEn.post.title).not.toBe(seedPost!.title);

    const userDisplayEn = resolveConsultPostForDisplay(userPost, 'en');
    expect(userDisplayEn.post.title).toBe('Tiêu đề tự nhập bằng tiếng Việt');
    expect(userDisplayEn.authorLabel).toBe('A fellow student');
  });
});

describe('appointment slot generation, double-booking guard, and ICS', () => {
  beforeEach(() => {
    setSimulatedDelayRange(0, 0);
    clearAllUserDataInStorage();
  });

  afterEach(() => {
    resetSimulatedDelayRange();
  });

  it('generates deterministic weekday dates (Mon–Fri) for the next 14 days', () => {
    const dates = appointmentService.getAvailableDates(new Date('2026-11-20T10:00:00+07:00'));
    expect(dates.length).toBeGreaterThanOrEqual(8);
    expect(dates.length).toBeLessThanOrEqual(10);
    for (const dateKey of dates) {
      const day = new Date(`${dateKey}T12:00:00+07:00`).getDay();
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(5);
    }
  });

  it('deterministically generates slots and prevents double-booking the same slot', async () => {
    const dates = appointmentService.getAvailableDates(new Date('2026-11-20T10:00:00+07:00'));
    const targetDate = dates[0]!;
    const slotsA = computeSlotsForCounselorAndDate('counselor-minh-thu', targetDate, []);
    const slotsB = computeSlotsForCounselorAndDate('counselor-minh-thu', targetDate, []);
    expect(slotsA).toEqual(slotsB);

    const availableSlot = slotsA.find((s) => s.status === 'available');
    expect(availableSlot).toBeDefined();

    const appt = await appointmentService.createAppointment({
      counselorId: 'counselor-minh-thu',
      counselorName: 'Cô Minh Thư (mẫu)',
      dateKey: targetDate,
      slotTime: availableSlot!.time,
      format: 'in-person',
      topic: 'study',
      studentName: 'Minh Anh',
      contact: 'minhanh@example.com',
    });

    expect(appt.referenceCode).toMatch(/^HOA-[A-Z0-9]{6}$/);

    const updatedSlots = await appointmentService.getSlotsForCounselorAndDate(
      'counselor-minh-thu',
      targetDate
    );
    expect(updatedSlots.find((s) => s.time === availableSlot!.time)?.status).toBe('booked-by-me');

    await expect(
      appointmentService.createAppointment({
        counselorId: 'counselor-minh-thu',
        counselorName: 'Cô Minh Thư (mẫu)',
        dateKey: targetDate,
        slotTime: availableSlot!.time,
        format: 'online',
        topic: 'study',
        studentName: 'Another',
        contact: '0912345678',
      })
    ).rejects.toThrow('SLOT_UNAVAILABLE');

    await appointmentService.cancelAppointment(appt.id);
    const reopenedSlots = await appointmentService.getSlotsForCounselorAndDate(
      'counselor-minh-thu',
      targetDate
    );
    expect(reopenedSlots.find((s) => s.time === availableSlot!.time)?.status).toBe('available');

    const ics = buildAppointmentIcs(appt, 'vi');
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain(appt.referenceCode);
  });
});
