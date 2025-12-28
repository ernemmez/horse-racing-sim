import { Module } from 'vuex'
import type { Horse, HorsesState, RootState } from '../types'
import { getUniqueColors, getUniqueNames, generateCondition, generateId } from '../../utils/algorithms'

const horsesModule: Module<HorsesState, RootState> = {
  namespaced: true,

  state: (): HorsesState => ({
    horses: [],
    availableColors: []
  }),

  mutations: {
    SET_HORSES(state, horses: Horse[]) {
      state.horses = horses
    },
    SET_COLORS(state, colors: string[]) {
      state.availableColors = colors
    }
  },

  actions: {
    generateHorses({ commit }) {
      const colors = getUniqueColors(20)
      const names = getUniqueNames(20)

      const horses: Horse[] = []
      for (let i = 0; i < 20; i++) {
        horses.push({
          id: generateId(),
          name: names[i],
          color: colors[i],
          condition: generateCondition()
        })
      }

      commit('SET_HORSES', horses)
      commit('SET_COLORS', colors)
    },

    resetHorses({ commit }) {
      commit('SET_HORSES', [])
      commit('SET_COLORS', [])
    }
  },

  getters: {
    getHorseById: (state) => (id: string): Horse | undefined => {
      return state.horses.find(h => h.id === id)
    },
    allHorses: (state): Horse[] => state.horses,
    horseCount: (state): number => state.horses.length
  }
}

export default horsesModule
