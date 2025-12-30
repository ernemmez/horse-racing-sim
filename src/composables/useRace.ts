import { computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import type { HorsePosition, Round } from "../store/types";
import {
  calculateHorseSpeed,
  calculateConditionLoss,
  applyConditionLoss,
} from "../utils/algorithms";
import { RACE_CONSTANTS } from "../utils/constants";

export function useRace() {
  const store = useStore();

  const horsePositions = computed<Record<string, HorsePosition>>(
    () => store.getters["race/horsePositions"]
  );

  const currentRound = computed<Round | null>(
    () => store.getters["program/currentRound"]
  );

  const raceStartTime = computed<number | null>(
    () => store.getters["race/raceStartTime"]
  );

  onBeforeUnmount(() => {
    try {
      store.dispatch("race/cleanupAnimation", null, { root: true });
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  });

  const startRace = () => {
    try {
      if (!currentRound.value) {
        console.warn("Cannot start race: no active round");
        return;
      }

      const round = currentRound.value;
      const hasExistingPositions = Object.keys(horsePositions.value).length > 0;

      store.dispatch("race/cleanupAnimation", null, { root: true });

      if (!hasExistingPositions) {
        const initialTime = Date.now();
        store.commit("race/SET_RACE_START_TIME", initialTime, { root: true });

        const initialPositions: Record<string, HorsePosition> = {};
        round.horses.forEach((horse) => {
          initialPositions[horse.id] = {
            horseId: horse.id,
            position: 0,
            speed: 0,
            finishTime: null,
          };
        });

        store.commit("race/SET_HORSE_POSITIONS", initialPositions, {
          root: true,
        });
      }

      store.commit("race/SET_RACE_ACTIVE", true, { root: true });

      const animate = () => {
        try {
          if (!store.state.race.isRaceActive) return;

          let allFinished = true;
          const now = Date.now();
          const startTime = raceStartTime.value || now;

          const updates: Record<string, HorsePosition> = {};

          round.horses.forEach((horse) => {
            const currentPos = horsePositions.value[horse.id];
            if (!currentPos) return;

            // Skip if already finished
            if (currentPos.finishTime !== null) return;

            // Check if crossed finish line
            if (currentPos.position >= 100) {
              updates[horse.id] = {
                ...currentPos,
                finishTime: now - startTime,
              };
              return;
            }

            allFinished = false;

            // Calculate new position
            const speed = calculateHorseSpeed(horse.condition, horse.stamina);
            let newPosition =
              currentPos.position +
              (speed / round.distance) * RACE_CONSTANTS.DISTANCE_MULTIPLIER;

            let finishTime = null;
            if (newPosition >= 100) {
              newPosition = 100;
              finishTime = now - startTime;
            }

            updates[horse.id] = {
              horseId: horse.id,
              position: newPosition,
              speed,
              finishTime,
            };
          });

          store.commit("race/UPDATE_ALL_POSITIONS", updates, { root: true });

          if (allFinished) {
            finishRound();
            return;
          }

          const frameId = requestAnimationFrame(animate);
          store.commit("race/SET_ANIMATION_FRAME", frameId, { root: true });
        } catch (error) {
          console.error("Error during race animation:", error);
          pauseRace();
        }
      };

      const frameId = requestAnimationFrame(animate);
      store.commit("race/SET_ANIMATION_FRAME", frameId, { root: true });
    } catch (error) {
      console.error("Error starting race:", error);
      pauseRace();
    }
  };

  const pauseRace = () => {
    try {
      store.commit("race/SET_RACE_ACTIVE", false, { root: true });
      store.dispatch("race/cleanupAnimation", null, { root: true });
    } catch (error) {
      console.error("Error pausing race:", error);
    }
  };

  const finishRound = () => {
    try {
      store.commit("race/SET_RACE_ACTIVE", false, { root: true });
      store.dispatch("race/cleanupAnimation", null, { root: true });

      const round = currentRound.value;
      if (!round) return;

      const resultExists = store.state.results.completedRounds.some(
        (r: any) => r.roundNo === round.roundNo
      );
      if (resultExists) return;

      // Calculate rankings
      const rankings = [];
      for (const horse of round.horses) {
        const pos = horsePositions.value[horse.id];
        if (pos) {
          rankings.push({
            horseId: horse.id,
            horseName: horse.name,
            horseColor: horse.color,
            position: 0,
            finishTime:
              pos.finishTime || Date.now() - (raceStartTime.value || 0),
          });
        }
      }

      rankings.sort((a, b) => a.finishTime - b.finishTime);
      rankings.forEach((r, i) => (r.position = i + 1));

      round.horses.forEach((horse) => {
        const loss = calculateConditionLoss(
          round.distance,
          horse.stamina,
          horse.condition
        );
        const newCondition = applyConditionLoss(horse.condition, loss);

        store.commit(
          "horses/UPDATE_HORSE_CONDITION",
          {
            horseId: horse.id,
            condition: newCondition,
          },
          { root: true }
        );
      });

      store.dispatch(
        "results/addRoundResult",
        {
          roundNo: round.roundNo,
          distance: round.distance,
          rankings,
        },
        { root: true }
      );

      setTimeout(() => {
        if (store.state.program.currentRoundIndex === round.roundNo - 1) {
          store.dispatch("program/nextRound", null, { root: true });
          store.commit("race/RESET_POSITIONS", null, { root: true });
          store.commit("race/SET_RACE_START_TIME", null, { root: true });
        }
      }, RACE_CONSTANTS.ROUND_TRANSITION_DELAY);
    } catch (error) {
      console.error("Error finishing round:", error);
      store.dispatch("race/resetRace", null, { root: true });
    }
  };

  const resetSimulation = () => {
    try {
      store.dispatch("race/cleanupAnimation", null, { root: true });
      store.commit("race/RESET_POSITIONS", null, { root: true });
      store.commit("race/SET_RACE_START_TIME", null, { root: true });
    } catch (error) {
      console.error("Error resetting simulation:", error);
    }
  };

  return {
    horsePositions,
    startRace,
    pauseRace,
    resetSimulation,
  };
}
