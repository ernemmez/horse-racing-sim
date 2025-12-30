import type { RaceState, HorsePosition } from "../types";

const raceModule = {
  namespaced: true,

  state: (): RaceState => ({
    isRaceActive: false,
    horsePositions: {},
    animationFrameId: null,
    raceStartTime: null,
  }),

  mutations: {
    SET_RACE_ACTIVE(state: RaceState, isActive: boolean) {
      state.isRaceActive = isActive;
    },

    SET_HORSE_POSITIONS(
      state: RaceState,
      positions: Record<string, HorsePosition>
    ) {
      state.horsePositions = positions;
    },

    UPDATE_ALL_POSITIONS(
      state: RaceState,
      updates: Record<string, HorsePosition>
    ) {
      state.horsePositions = { ...state.horsePositions, ...updates };
    },

    UPDATE_SINGLE_POSITION(
      state: RaceState,
      payload: { horseId: string; position: HorsePosition }
    ) {
      state.horsePositions[payload.horseId] = payload.position;
    },

    SET_ANIMATION_FRAME(state: RaceState, frameId: number | null) {
      state.animationFrameId = frameId;
    },

    SET_RACE_START_TIME(state: RaceState, time: number | null) {
      state.raceStartTime = time;
    },

    RESET_POSITIONS(state: RaceState) {
      state.horsePositions = {};
    },

    RESET_RACE(state: RaceState) {
      state.isRaceActive = false;
      state.horsePositions = {};
      state.animationFrameId = null;
      state.raceStartTime = null;
    },
  },

  actions: {
    startRace({ commit }: { commit: Function }) {
      commit("SET_RACE_ACTIVE", true);
    },

    stopRace({ commit }: { commit: Function }) {
      commit("SET_RACE_ACTIVE", false);
    },

    resetRace({ commit }: { commit: Function }) {
      commit("RESET_RACE");
    },

    cleanupAnimation({
      state,
      commit,
    }: {
      state: RaceState;
      commit: Function;
    }) {
      if (state.animationFrameId !== null) {
        cancelAnimationFrame(state.animationFrameId);
        commit("SET_ANIMATION_FRAME", null);
      }
    },
  },

  getters: {
    isRaceActive: (state: RaceState): boolean => state.isRaceActive,
    horsePositions: (state: RaceState): Record<string, HorsePosition> =>
      state.horsePositions,
    animationFrameId: (state: RaceState): number | null =>
      state.animationFrameId,
    raceStartTime: (state: RaceState): number | null => state.raceStartTime,
  },
};

export default raceModule;
