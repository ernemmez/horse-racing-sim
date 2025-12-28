export const HORSE_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#E63946', '#A8DADC', '#457B9D', '#FF8FA3', '#6C5CE7',
  '#FDCB6E', '#00B894', '#FD79A8', '#74B9FF', '#A29BFE'
]

const HORSE_NAMES = [
  'Thunder', 'Lightning', 'Storm', 'Blaze', 'Spirit',
  'Shadow', 'Midnight', 'Flash', 'Arrow', 'Rocket',
  'Phoenix', 'Champion', 'Victory', 'Comet', 'Star',
  'Turbo', 'Ace', 'Bullet', 'Knight', 'Legend'
]

export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getUniqueColors(count: number): string[] {
  return shuffleArray(HORSE_COLORS).slice(0, count)
}

export function getUniqueNames(count: number): string[] {
  return shuffleArray(HORSE_NAMES).slice(0, count)
}

export function generateCondition(): number {
  return Math.floor(Math.random() * 100) + 1
}

// Speed calculation: 70% condition-based, 30% random
// High condition = more consistent, low condition = more variance
export function calculateHorseSpeed(condition: number): number {
  return (condition * 0.7) + (Math.random() * 30)
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(2)}s`
}

export function formatPosition(position: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = position % 100
  return position + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}
