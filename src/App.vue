<template>
  <RaceLayout 
    :horses="horses"
    :rounds="rounds"
    :currentRound="currentRound"
    :currentRoundIndex="currentRoundIndex"
    :isRaceActive="isRaceActive"
    :horsePositions="horsePositions"
    :results="results"
    :completedRoundsCount="completedRoundsCount"
    :hasProgram="hasProgram"
    :canStart="canStart"
    :isPaused="isPaused"
    :isProgramFinished="isProgramFinished"
    @generate="handleGenerate"
    @start="handleStart"
    @pause="handlePause"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import RaceLayout from './components/templates/RaceLayout.vue'

const store = useStore()

const horses = computed(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['program/allRounds'])
const currentRound = computed(() => store.getters['program/currentRound'])
const currentRoundIndex = computed(() => store.state.program.currentRoundIndex)
const isRaceActive = computed(() => store.getters['race/isRaceActive'])
const horsePositions = computed(() => store.getters['race/horsePositions'])
const results = computed(() => store.getters['results/allResults'])
const completedRoundsCount = computed(() => store.getters['results/completedCount'])
const isProgramFinished = computed(() => store.getters['program/isFinished'])

const hasProgram = computed(() => rounds.value.length > 0)
const canStart = computed(() => 
  hasProgram.value && 
  !isRaceActive.value && 
  currentRound.value !== null
)

// isPaused: if we have positions but race is not active AND program is not finished
// When program is finished, we should show "Start Race" not "Resume"
const isPaused = computed(() => 
  !isRaceActive.value && 
  Object.keys(horsePositions.value).length > 0 && 
  !isProgramFinished.value
)

const handleGenerate = () => {
  store.dispatch('horses/generateHorses')
  store.dispatch('program/generateProgram')
  store.dispatch('results/resetResults')
}

const handleStart = () => {
  if (canStart.value) {
    store.dispatch('race/startRace')
  }
}

const handlePause = () => {
  store.dispatch('race/stopRace')
}
</script>
