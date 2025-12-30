import type { Horse, Round, ProgramState } from "../types";
import { ROUND_DISTANCES, shuffleArray } from "../../utils/algorithms";
import { RACE_CONSTANTS, ROUND_CONFIG } from "../../utils/constants";

const programModule = {
  namespaced: true,

  state: (): ProgramState => ({
    rounds: [],
    currentRoundIndex: null,
  }),

  mutations: {
    SET_ROUNDS(state, rounds: Round[]) {
      state.rounds = rounds;
    },
    SET_CURRENT_ROUND(state, index: number | null) {
      state.currentRoundIndex = index;
    },
  },

  actions: {
    generateProgram({ commit, rootState }) {
      const allHorses = rootState.horses.horses;

      if (allHorses.length < RACE_CONSTANTS.HORSE_COUNT) {
        console.error(`Need at least ${RACE_CONSTANTS.HORSE_COUNT} horses`);
        return;
      }

      const rounds: Round[] = [];

      for (let i = 0; i < ROUND_CONFIG.TOTAL_ROUNDS; i++) {
        const lapHorses = shuffleArray<Horse>(allHorses).slice(
          0,
          ROUND_CONFIG.MIN_HORSES_PER_ROUND
        );

        rounds.push({
          roundNo: i + 1,
          distance: ROUND_DISTANCES[i],
          horses: lapHorses,
        });
      }

      commit("SET_ROUNDS", rounds);
      commit("SET_CURRENT_ROUND", 0);
    },

    nextRound({ state, commit, dispatch }) {
      if (state.currentRoundIndex === null) return;

      const nextIndex = state.currentRoundIndex + 1;
      if (nextIndex < state.rounds.length) {
        commit("SET_CURRENT_ROUND", nextIndex);
        dispatch("race/resetRace", null, { root: true });
      } else {
        commit("SET_CURRENT_ROUND", null);
      }
    },

    resetProgram({ commit }) {
      commit("SET_ROUNDS", []);
      commit("SET_CURRENT_ROUND", null);
    },
  },

  getters: {
    currentRound: (state): Round | null => {
      if (state.currentRoundIndex === null) return null;
      return state.rounds[state.currentRoundIndex] || null;
    },
    allRounds: (state): Round[] => state.rounds,
    isFinished: (state): boolean => {
      return state.currentRoundIndex === null && state.rounds.length > 0;
    },
    remainingRounds: (state): number => {
      if (state.currentRoundIndex === null) return 0;
      return state.rounds.length - state.currentRoundIndex - 1;
    },
    hasRounds: (state): boolean => state.rounds.length > 0,
    canStartRace: (state, getters, rootState): boolean => {
      return (
        getters.hasRounds &&
        !rootState.race.isRaceActive &&
        getters.currentRound !== null
      );
    },
  },
};

export default programModule;
