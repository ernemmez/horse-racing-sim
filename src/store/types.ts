export interface Horse {
  id: string;
  name: string;
  color: string;
  condition: number;
  stamina: number;
  maxCondition: number;
}

export interface Round {
  roundNo: number;
  distance: number;
  horses: Horse[];
}

export interface HorsePosition {
  horseId: string;
  position: number;
  speed: number;
  finishTime: number | null;
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
  finishTime: number;
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
