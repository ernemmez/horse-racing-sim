export const HORSE_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B739",
  "#52B788",
  "#E63946",
  "#A8DADC",
  "#457B9D",
  "#FF8FA3",
  "#6C5CE7",
  "#FDCB6E",
  "#00B894",
  "#FD79A8",
  "#74B9FF",
  "#A29BFE",
  "#55EFC4",
  "#81ECEC",
  "#FAB1A0",
  "#FF7675",
  "#00CEC9",
  "#0984E3",
  "#D63031",
  "#636E72",
  "#2D3436",
  "#B2BEC3",
];

const HORSE_NAMES = [
  "Sergen",
  "Düldül",
  "Bold Pilot",
  "Ribella",
  "Turbo",
  "Karayel",
  "Yavuzhan",
  "Kafkaslı",
  "Grand Ekinoks",
  "Trapper",
  "Ayabakan",
  "Johnny Guitar",
  "Odin",
  "Caş",
  "Long Runner",
  "Burgas",
  "Call To Victory",
  "Trakya Ateşi",
  "Şampiyon",
  "Devir",
];
export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getUniqueColors(count: number): string[] {
  return shuffleArray(HORSE_COLORS).slice(0, count);
}

export function getUniqueNames(count: number): string[] {
  return shuffleArray(HORSE_NAMES).slice(0, count);
}

export function generateCondition(): number {
  return Math.floor(Math.random() * 100) + 1;
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
