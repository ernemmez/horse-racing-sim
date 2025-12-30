import type { RaceState } from "../types";

const raceModule = {
  namespaced: true,

  state: (): RaceState => ({
    isRaceActive: false,
    horsePositions: {},
    animationFrameId: null,
    raceStartTime: null,
  }),

  mutations: {
    SET_RACE_ACTIVE(state, isActive: boolean) {
      state.isRaceActive = isActive;
    },
    resetRace(state) {
      state.isRaceActive = false;
    },
    RESET_POSITIONS(state) {
      state.horsePositions = {};
    },
  },

  actions: {
    startRace({ commit }) {
      commit("SET_RACE_ACTIVE", true);
    },
    stopRace({ commit }) {
      commit("SET_RACE_ACTIVE", false);
    },
    resetRace({ commit }) {
      commit("SET_RACE_ACTIVE", false);
      commit("RESET_POSITIONS");
    },
  },

  getters: {
    isRaceActive: (state): boolean => state.isRaceActive,
    horsePositions: (state) => state.horsePositions,
  },
};

export default raceModule;
