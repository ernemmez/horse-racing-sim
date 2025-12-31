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
] as const;

export const HORSE_NAMES = [
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
] as const;

export const RACE_CONSTANTS = {
  HORSE_COUNT: 20,
  MAX_CONDITION: 100,
  MIN_STAMINA: 60,
  MAX_STAMINA: 100,
  DISTANCE_MULTIPLIER: 2,
  ROUND_TRANSITION_DELAY: 1000,
  ANIMATION_INTERVAL: 50,
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

export const ROUND_CONFIG = {
  TOTAL_ROUNDS: 6,
  MIN_HORSES_PER_ROUND: 10,
  MAX_HORSES_PER_ROUND: 20,
} as const;

export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200] as const;
