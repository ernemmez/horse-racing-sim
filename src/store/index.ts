import { createStore } from 'vuex'
import type { RootState } from './types'
import horsesModule from './modules/horses'
import programModule from './modules/program'
import raceModule from './modules/race'
import resultsModule from './modules/results'

const store = createStore<RootState>({
  modules: {
    horses: horsesModule,
    program: programModule,
    race: raceModule,
    results: resultsModule
  }
})

export default store
