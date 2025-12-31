import { HORSE_COLORS, HORSE_NAMES } from "./constants";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getUniqueColors(count: number): string[] {
  return shuffleArray([...HORSE_COLORS]).slice(0, count);
}

export function getUniqueNames(count: number): string[] {
  return shuffleArray([...HORSE_NAMES]).slice(0, count);
}

export function calculateHorseSpeed(
  condition: number,
  stamina: number
): number {
  const conditionMultiplier = condition / 100;
  const staminaBonus = stamina / 200;

  const baseSpeed =
    condition * conditionMultiplier * 0.8 + stamina * staminaBonus;

  const randomFactor = Math.random() * 20;

  return baseSpeed + randomFactor;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatPosition(position: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = position % 100;
  return position + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

const CONDITION_DEPLETION_FACTOR = 0.5;

export function calculateConditionLoss(
  distance: number,
  stamina: number,
  currentCondition: number
): number {
  if (currentCondition <= 0) return 0;

  const distanceFactor = distance / 1000;
  const staminaFactor = 100 - stamina;
  const baseLoss = distanceFactor * staminaFactor * CONDITION_DEPLETION_FACTOR;
  const minLoss = distance / 1200;

  return Math.max(minLoss, baseLoss);
}

export function applyConditionLoss(
  currentCondition: number,
  loss: number
): number {
  return Math.max(0, currentCondition - loss);
}
