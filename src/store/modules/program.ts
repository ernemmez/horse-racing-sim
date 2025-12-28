import { Module } from 'vuex'
import type { Horse, Round, ProgramState, RootState } from '../types'
import { ROUND_DISTANCES, shuffleArray } from '../../utils/algorithms'

const programModule: Module<ProgramState, RootState> = {
  namespaced: true,

  state: (): ProgramState => ({
    rounds: [],
    currentRoundIndex: null
  }),

  mutations: {
    SET_ROUNDS(state, rounds: Round[]) {
      state.rounds = rounds
    },
    SET_CURRENT_ROUND(state, index: number | null) {
      state.currentRoundIndex = index
    }
  },

  actions: {
    generateProgram({ commit, rootState }) {
      const allHorses = rootState.horses.horses

      if (allHorses.length !== 20) {
        console.error('Need exactly 20 horses')
        return
      }

      const rounds: Round[] = []

      for (let i = 0; i < 6; i++) {
        const selectedHorses = shuffleArray<Horse>(allHorses).slice(0, 10)

        rounds.push({
          roundNo: i + 1,
          distance: ROUND_DISTANCES[i],
          horses: selectedHorses
        })
      }

      commit('SET_ROUNDS', rounds)
      commit('SET_CURRENT_ROUND', 0)
    },

    nextRound({ state, commit }) {
      if (state.currentRoundIndex === null) return

      const nextIndex = state.currentRoundIndex + 1
      if (nextIndex < state.rounds.length) {
        commit('SET_CURRENT_ROUND', nextIndex)
      } else {
        commit('SET_CURRENT_ROUND', null)
      }
    },

    resetProgram({ commit }) {
      commit('SET_ROUNDS', [])
      commit('SET_CURRENT_ROUND', null)
    }
  },

  getters: {
    currentRound: (state): Round | null => {
      if (state.currentRoundIndex === null) return null
      return state.rounds[state.currentRoundIndex] || null
    },
    allRounds: (state): Round[] => state.rounds,
    isFinished: (state): boolean => {
      return state.currentRoundIndex === null && state.rounds.length > 0
    },
    remainingRounds: (state): number => {
      if (state.currentRoundIndex === null) return 0
      return state.rounds.length - state.currentRoundIndex - 1
    }
  }
}

export default programModule
