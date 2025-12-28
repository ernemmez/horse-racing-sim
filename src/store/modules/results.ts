import type { RoundResult, ResultsState } from "../types";

const resultsModule = {
  namespaced: true,

  state: (): ResultsState => ({
    completedRounds: [],
  }),

  mutations: {
    ADD_ROUND_RESULT(state, result: RoundResult) {
      state.completedRounds.push(result);
    },
    RESET_RESULTS(state) {
      state.completedRounds = [];
    },
  },

  actions: {
    saveRoundResult({ commit }, result: RoundResult) {
      commit("ADD_ROUND_RESULT", result);
    },

    resetResults({ commit }) {
      commit("RESET_RESULTS");
    },
  },

  getters: {
    allResults: (state): RoundResult[] => state.completedRounds,
    latestResult: (state): RoundResult | null => {
      if (state.completedRounds.length === 0) return null;
      return state.completedRounds[state.completedRounds.length - 1];
    },
    completedCount: (state): number => state.completedRounds.length,
  },
};

export default resultsModule;
