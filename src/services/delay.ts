import { SIMULATED_DELAY_MAX_MS, SIMULATED_DELAY_MIN_MS } from '@/config/app';

let delayRange = {
  min: SIMULATED_DELAY_MIN_MS,
  max: SIMULATED_DELAY_MAX_MS,
};

/**
 * Cho phép unit test đặt độ trễ về 0 để chạy nhanh, không ảnh hưởng app thật.
 */
export function setSimulatedDelayRange(minMs: number, maxMs: number): void {
  delayRange = { min: minMs, max: maxMs };
}

export function resetSimulatedDelayRange(): void {
  delayRange = {
    min: SIMULATED_DELAY_MIN_MS,
    max: SIMULATED_DELAY_MAX_MS,
  };
}

export function waitSimulatedDelay(): Promise<void> {
  if (delayRange.max <= 0) {
    return Promise.resolve();
  }
  const span = Math.max(0, delayRange.max - delayRange.min);
  const ms = delayRange.min + Math.floor(Math.random() * (span + 1));
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
