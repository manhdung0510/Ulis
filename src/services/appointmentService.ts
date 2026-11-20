import { consultContentVi } from '@/content/vi/consult';
import { consultContentEn } from '@/content/en/consult';
import type {
  AppLanguage,
  Appointment,
  ConsultFormat,
  ConsultTopic,
  CounselorProfile,
  TimeSlotOption,
} from '@/types/domain';
import { addDaysDateKey, getWeekdayFromDateKey } from '@/utils/date';
import { waitSimulatedDelay } from './delay';
import { readStorageState, updateStorageState } from './storage';

const BASE_TIME_SLOTS = ['08:30', '09:30', '10:30', '14:00', '15:00', '16:00'] as const;

export interface CreateAppointmentInput {
  counselorId: string;
  counselorName: string;
  dateKey: string;
  slotTime: string;
  format: ConsultFormat;
  topic: ConsultTopic;
  studentName: string;
  contact: string;
  note?: string;
}

export interface IAppointmentService {
  getCounselors(language: AppLanguage): CounselorProfile[];
  getAvailableDates(baseDate?: Date): string[];
  getSlotsForCounselorAndDate(counselorId: string, dateKey: string): Promise<TimeSlotOption[]>;
  getAppointments(): Promise<Appointment[]>;
  createAppointment(input: CreateAppointmentInput): Promise<Appointment>;
  cancelAppointment(id: string): Promise<void>;
}

function hashDeterministic(text: string): number {
  let hash = 7;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 37 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Sinh khung giờ xác định theo id giảng viên và ngày, đồng thời đánh dấu khung giờ người dùng đã đặt.
 */
export function computeSlotsForCounselorAndDate(
  counselorId: string,
  dateKey: string,
  existingAppointments: Appointment[]
): TimeSlotOption[] {
  const seed = hashDeterministic(`${counselorId}:${dateKey}`);
  const fullIndexA = seed % BASE_TIME_SLOTS.length;
  const fullIndexB =
    seed % 2 === 0 ? (seed + 2) % BASE_TIME_SLOTS.length : -1;

  const bookedTimes = new Set(
    existingAppointments
      .filter(
        (item) =>
          item.status === 'upcoming' &&
          item.counselorId === counselorId &&
          item.dateKey === dateKey
      )
      .map((item) => item.slotTime)
  );

  return BASE_TIME_SLOTS.map((time, idx) => {
    if (bookedTimes.has(time)) {
      return { time, status: 'booked-by-me' };
    }
    if (idx === fullIndexA || idx === fullIndexB) {
      return { time, status: 'full' };
    }
    return { time, status: 'available' };
  });
}

function generateReferenceCode(seedText: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let value = hashDeterministic(seedText);
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[value % alphabet.length];
    value = Math.floor(value / alphabet.length) + i * 17 + 3;
  }
  return `HOA-${code}`;
}

export const appointmentService: IAppointmentService = {
  getCounselors(language) {
    return language === 'en' ? consultContentEn.counselors : consultContentVi.counselors;
  },

  getAvailableDates(baseDate = new Date()) {
    const dates: string[] = [];
    for (let offset = 1; offset <= 14; offset += 1) {
      const dateKey = addDaysDateKey(baseDate, offset);
      const weekday = getWeekdayFromDateKey(dateKey);
      if (weekday >= 1 && weekday <= 5) {
        dates.push(dateKey);
      }
    }
    return dates;
  },

  async getSlotsForCounselorAndDate(counselorId, dateKey) {
    await waitSimulatedDelay();
    const state = readStorageState();
    return computeSlotsForCounselorAndDate(counselorId, dateKey, state.appointments);
  },

  async getAppointments() {
    await waitSimulatedDelay();
    const state = readStorageState();
    return [...state.appointments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async createAppointment(input) {
    await waitSimulatedDelay();
    const state = readStorageState();
    const slots = computeSlotsForCounselorAndDate(
      input.counselorId,
      input.dateKey,
      state.appointments
    );
    const chosenSlot = slots.find((s) => s.time === input.slotTime);
    if (!chosenSlot || chosenSlot.status !== 'available') {
      throw new Error('SLOT_UNAVAILABLE');
    }

    const nowIso = new Date().toISOString();
    const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const referenceCode = generateReferenceCode(
      `${id}:${input.counselorId}:${input.dateKey}:${input.slotTime}`
    );

    const appointment: Appointment = {
      id,
      referenceCode,
      counselorId: input.counselorId,
      counselorName: input.counselorName,
      dateKey: input.dateKey,
      slotTime: input.slotTime,
      format: input.format,
      topic: input.topic,
      studentName: input.studentName.trim(),
      contact: input.contact.trim(),
      note: input.note?.trim() || undefined,
      status: 'upcoming',
      createdAt: nowIso,
    };

    updateStorageState((prev) => ({
      ...prev,
      appointments: [appointment, ...prev.appointments],
    }));

    return appointment;
  },

  async cancelAppointment(id) {
    await waitSimulatedDelay();
    updateStorageState((prev) => ({
      ...prev,
      appointments: prev.appointments.map((item) =>
        item.id === id ? { ...item, status: 'cancelled' } : item
      ),
    }));
  },
};
