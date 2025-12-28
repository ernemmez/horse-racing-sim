export interface Horse {
  id: string;
  name: string;
  color: string;
  condition: number; // Current condition (0-100, depletes during races)
  stamina: number; // Base stamina/endurance (60-100)
  maxCondition: number; // Always 100
}

export interface Round {
  roundNo: number; // 1-6
  distance: number; // meters: 1200, 1400, 1600, 1800, 2000, 2200
  horses: Horse[];
}

export interface HorsePosition {
  horseId: string;
  position: number; // 0-100%
  speed: number;
  finishTime: number | null; // ms from start, null if not finished
}

export interface RoundResult {
  roundNo: number;
  distance: number;
  rankings: HorseRanking[];
}

export interface HorseRanking {
  horseId: string;
  horseName: string;
  horseColor: string;
  position: number;
  finishTime: number; // ms
}

export interface RootState {
  horses: HorsesState;
  program: ProgramState;
  race: RaceState;
  results: ResultsState;
}

export interface HorsesState {
  horses: Horse[];
  availableColors: string[];
}

export interface ProgramState {
  rounds: Round[];
  currentRoundIndex: number | null;
}

export interface RaceState {
  isRaceActive: boolean;
  horsePositions: Record<string, HorsePosition>;
  animationFrameId: number | null;
  raceStartTime: number | null;
}

export interface ResultsState {
  completedRounds: RoundResult[];
}
