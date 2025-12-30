<script setup lang="ts">
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import RaceLayout from './components/templates/RaceLayout.vue'
import { useRace } from './composables/useRace'

const store = useStore()
const { horsePositions, startRace, pauseRace, resetSimulation } = useRace()

const horses = computed(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['program/allRounds'])
const currentRound = computed(() => store.getters['program/currentRound'])
const currentRoundIndex = computed(() => store.state.program.currentRoundIndex)
const isRaceActive = computed(() => store.getters['race/isRaceActive'])
const results = computed(() => store.getters['results/allResults'])
const completedRoundsCount = computed(() => store.getters['results/completedCount'])
const isProgramFinished = computed(() => store.getters['program/isFinished'])
const canStart = computed(() => store.getters['program/canStartRace'])
const hasProgram = computed(() => store.getters['program/hasRounds'])

watch(hasProgram, (newVal) => {
  if (!newVal) resetSimulation()
})

const isPaused = computed(() => 
  !isRaceActive.value && 
  Object.keys(horsePositions.value).length > 0 &&
  !isProgramFinished.value
)

const handleGenerate = () => {
  store.dispatch('horses/generateHorses')
  store.dispatch('program/generateProgram')
  store.dispatch('results/resetResults')
  resetSimulation()
}

const handleStart = () => {
  if (canStart.value) {
    startRace()
  }
}

const handlePause = () => {
  pauseRace()
}
</script>

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
