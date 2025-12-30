import { ref, computed } from "vue";
import { useStore } from "vuex";
import type { HorsePosition, Round } from "../store/types";
import {
  calculateHorseSpeed,
  calculateConditionLoss,
  applyConditionLoss,
} from "../utils/algorithms";

export function useRace() {
  const store = useStore();

  const horsePositions = ref<Record<string, HorsePosition>>({});
  const animationFrameId = ref<number | null>(null);
  const raceStartTime = ref<number | null>(null);

  const currentRound = computed<Round | null>(
    () => store.getters["program/currentRound"]
  );

  const startRace = () => {
    if (!currentRound.value) {
      return;
    }

    const round = currentRound.value;
    const hasExistingPositions = Object.keys(horsePositions.value).length > 0;

    if (!hasExistingPositions) {
      raceStartTime.value = Date.now();
      horsePositions.value = {};

      round.horses.forEach((horse) => {
        horsePositions.value[horse.id] = {
          horseId: horse.id,
          position: 0,
          speed: 0,
          finishTime: null,
        };
      });
    }

    store.commit("race/SET_RACE_ACTIVE", true);

    const animate = () => {
      if (!store.state.race.isRaceActive) return;

      let allFinished = true;
      const now = Date.now();
      const startTime = raceStartTime.value || now;

      round.horses.forEach((horse) => {
        const currentPos = horsePositions.value[horse.id];
        if (!currentPos) return;

        if (currentPos.finishTime !== null) return;

        if (currentPos.position >= 100) {
          horsePositions.value[horse.id] = {
            ...currentPos,
            finishTime: now - startTime,
          };
          return;
        }

        allFinished = false;

        const speed = calculateHorseSpeed(horse.condition, horse.stamina);
        let newPosition = currentPos.position + (speed / round.distance) * 2;

        let finishTime = null;
        if (newPosition >= 100) {
          newPosition = 100;
          finishTime = now - startTime;
        }

        horsePositions.value[horse.id] = {
          horseId: horse.id,
          position: newPosition,
          speed,
          finishTime,
        };
      });

      if (allFinished) {
        finishRound();
        return;
      }

      animationFrameId.value = requestAnimationFrame(animate);
    };

    animationFrameId.value = requestAnimationFrame(animate);
  };

  const pauseRace = () => {
    store.commit("race/SET_RACE_ACTIVE", false);
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }
  };

  const finishRound = () => {
    store.commit("race/SET_RACE_ACTIVE", false);
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
      animationFrameId.value = null;
    }

    const round = currentRound.value;
    if (!round) return;

    const resultExists = store.state.results.completedRounds.some(
      (r: any) => r.roundNo === round.roundNo
    );
    if (resultExists) return;

    const rankings = [];
    for (const horse of round.horses) {
      const pos = horsePositions.value[horse.id];
      if (pos) {
        rankings.push({
          horseId: horse.id,
          horseName: horse.name,
          horseColor: horse.color,
          position: 0,
          finishTime: pos.finishTime || Date.now() - (raceStartTime.value || 0),
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
        horsePositions.value = {};
        raceStartTime.value = null;
      }
    }, 1000);
  };

  const resetSimulation = () => {
    horsePositions.value = {};
    raceStartTime.value = null;
    if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value);
  };

  return {
    horsePositions,
    startRace,
    pauseRace,
    resetSimulation,
  };
}
