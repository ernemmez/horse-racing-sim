import type { Horse, HorsesState } from "../types";
import {
  getUniqueColors,
  getUniqueNames,
  generateId,
} from "../../utils/algorithms";
import { RACE_CONSTANTS } from "../../utils/constants";

const horsesModule = {
  namespaced: true,

  state: (): HorsesState => ({
    horses: [],
    availableColors: [],
  }),

  mutations: {
    SET_HORSES(state, horses: Horse[]) {
      state.horses = horses;
    },
    SET_COLORS(state, colors: string[]) {
      state.availableColors = colors;
    },
    UPDATE_HORSE_CONDITION(
      state,
      payload: { horseId: string; condition: number }
    ) {
      const horse = state.horses.find((h) => h.id === payload.horseId);
      if (horse) {
        horse.condition = payload.condition;
      }
    },
  },

  actions: {
    generateHorses({ commit }) {
      const colors = getUniqueColors(RACE_CONSTANTS.HORSE_COUNT);
      const names = getUniqueNames(RACE_CONSTANTS.HORSE_COUNT);

      const horses: Horse[] = [];
      for (let i = 0; i < RACE_CONSTANTS.HORSE_COUNT; i++) {
        horses.push({
          id: generateId(),
          name: names[i],
          color: colors[i],
          condition: RACE_CONSTANTS.MAX_CONDITION,
          stamina:
            Math.floor(
              Math.random() *
                (RACE_CONSTANTS.MAX_STAMINA - RACE_CONSTANTS.MIN_STAMINA + 1)
            ) + RACE_CONSTANTS.MIN_STAMINA,
          maxCondition: RACE_CONSTANTS.MAX_CONDITION,
        });
      }

      commit("SET_HORSES", horses);
      commit("SET_COLORS", colors);
    },

    resetHorses({ commit }) {
      commit("SET_HORSES", []);
      commit("SET_COLORS", []);
    },
  },

  getters: {
    getHorseById:
      (state) =>
      (id: string): Horse | undefined => {
        return state.horses.find((h) => h.id === id);
      },
    allHorses: (state): Horse[] => state.horses,
    horseCount: (state): number => state.horses.length,
  },
};

export default horsesModule;
