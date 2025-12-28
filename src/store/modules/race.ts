import type { HorsePosition, RaceState } from "../types";
import { calculateHorseSpeed } from "../../utils/algorithms";

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
    UPDATE_HORSE_POSITION(
      state,
      { horseId, position }: { horseId: string; position: HorsePosition }
    ) {
      state.horsePositions[horseId] = position;
    },
    RESET_POSITIONS(state) {
      state.horsePositions = {};
    },
    SET_ANIMATION_FRAME_ID(state, id: number | null) {
      state.animationFrameId = id;
    },
    SET_RACE_START_TIME(state, time: number | null) {
      state.raceStartTime = time;
    },
  },

  actions: {
    startRace({ commit, state, rootState, dispatch }) {
      const currentRound =
        rootState.program.rounds[rootState.program.currentRoundIndex || 0];
      if (!currentRound) {
        console.error("No active round");
        return;
      }

      // Resume mode: if positions already exist, don't reset
      const hasExistingPositions = Object.keys(state.horsePositions).length > 0;

      if (!hasExistingPositions) {
        // Fresh start: initialize positions
        commit("RESET_POSITIONS");
        commit("SET_RACE_START_TIME", Date.now());

        currentRound.horses.forEach((horse) => {
          commit("UPDATE_HORSE_POSITION", {
            horseId: horse.id,
            position: { horseId: horse.id, position: 0, speed: 0 },
          });
        });
      }

      commit("SET_RACE_ACTIVE", true);

      const animate = () => {
        if (!state.isRaceActive) return;

        let allFinished = true;

        currentRound.horses.forEach((horse) => {
          const currentPos = state.horsePositions[horse.id];
          if (!currentPos || currentPos.position >= 100) return;

          allFinished = false;

          const speed = calculateHorseSpeed(horse.condition);
          const newPosition = Math.min(
            currentPos.position + (speed / currentRound.distance) * 2,
            100
          );

          commit("UPDATE_HORSE_POSITION", {
            horseId: horse.id,
            position: { horseId: horse.id, position: newPosition, speed },
          });
        });

        if (allFinished) {
          dispatch("finishRound");
          return;
        }

        const frameId = requestAnimationFrame(animate);
        commit("SET_ANIMATION_FRAME_ID", frameId);
      };

      animate();
    },

    finishRound({ commit, state, rootState, dispatch }) {
      commit("SET_RACE_ACTIVE", false);

      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        commit("SET_ANIMATION_FRAME_ID", null);
      }

      const currentRound =
        rootState.program.rounds[rootState.program.currentRoundIndex || 0];
      if (!currentRound) return;

      const finishTime = state.raceStartTime
        ? Date.now() - state.raceStartTime
        : 0;

      const rankings = (Object.values(state.horsePositions) as HorsePosition[])
        .map((pos) => {
          const horse = currentRound.horses.find((h) => h.id === pos.horseId);
          return {
            horseId: pos.horseId,
            horseName: horse?.name || "",
            horseColor: horse?.color || "",
            position: 0,
            finishTime,
          };
        })
        .sort((a, b) => {
          const posA = state.horsePositions[a.horseId].position;
          const posB = state.horsePositions[b.horseId].position;
          return posB - posA;
        })
        .map((r, index) => ({ ...r, position: index + 1 }));

      dispatch(
        "results/saveRoundResult",
        {
          roundNo: currentRound.roundNo,
          distance: currentRound.distance,
          rankings,
        },
        { root: true }
      );

      setTimeout(() => {
        dispatch("program/nextRound", null, { root: true });
      }, 1000);
    },

    stopRace({ commit, state }) {
      commit("SET_RACE_ACTIVE", false);
      if (state.animationFrameId) {
        cancelAnimationFrame(state.animationFrameId);
        commit("SET_ANIMATION_FRAME_ID", null);
      }
    },

    resetRace({ commit }) {
      commit("SET_RACE_ACTIVE", false);
      commit("RESET_POSITIONS");
      commit("SET_ANIMATION_FRAME_ID", null);
      commit("SET_RACE_START_TIME", null);
    },
  },

  getters: {
    isRaceActive: (state): boolean => state.isRaceActive,
    horsePositions: (state) => state.horsePositions,
  },
};

export default raceModule;
