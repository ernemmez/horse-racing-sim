<template>
  <div class="race-layout">
    <header class="race-header">
      <h1>🐴 Horse Racing</h1>
      <RaceControls 
        :hasProgram="hasProgram"
        :canStart="canStart"
        :isRaceActive="isRaceActive"
        :isPaused="isPaused"
        :isProgramFinished="isProgramFinished"
        @generate="handleGenerate"
        @start="handleStart"
        @pause="handlePause"
      />
    </header>
    
    <div class="race-grid">
      <!-- Left: Horse List -->
      <section class="grid-horses">
        <HorseList :horses="horses" />
      </section>

      <!-- Center: Race Track -->
      <section class="grid-track">
        <RaceTrack 
          :currentRound="currentRound"
          :isRaceActive="isRaceActive"
          :horsePositions="horsePositions"
        />
      </section>

      <!-- Right 1: Program -->
      <section class="grid-program">
        <ProgramTable 
          :rounds="rounds"
          :currentRoundIndex="currentRoundIndex"
          :completedRoundsCount="completedRoundsCount"
        />
      </section>

      <!-- Right 2: Results -->
      <section class="grid-results">
        <ResultsPanel :results="results" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import RaceControls from '../molecules/RaceControls.vue'
import HorseList from '../organisms/HorseList.vue'
import RaceTrack from '../organisms/RaceTrack.vue'
import ProgramTable from '../organisms/ProgramTable.vue'
import ResultsPanel from '../organisms/ResultsPanel.vue'

import type { Horse, Round, HorsePosition, RoundResult } from '../../store/types'

defineProps<{
  horses: Horse[]
  rounds: Round[]
  currentRound: Round | null
  currentRoundIndex: number | null
  isRaceActive: boolean
  horsePositions: Record<string, HorsePosition>
  results: RoundResult[]
  completedRoundsCount: number
  hasProgram: boolean
  canStart: boolean
  isPaused: boolean
  isProgramFinished: boolean
}>()

const emit = defineEmits<{
  generate: []
  start: []
  pause: []
}>()

const handleGenerate = () => emit('generate')
const handleStart = () => emit('start')
const handlePause = () => emit('pause')
</script>

<style scoped>
.race-layout {
  min-height: 100vh;
  padding: var(--spacing-sm);
  background: var(--bg-gradient);
}

.race-header {
  margin-bottom: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.race-header h1 {
  margin: 0;
  font-size: var(--font-size-xl);
  color: var(--color-text);
}

/* CSS Grid - Example.png layout */
.race-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  grid-gap: var(--spacing-lg);
  height: calc(100vh - 140px);
}

.grid-horses,
.grid-track,
.grid-program,
.grid-results {
  min-height: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Ensure contents fill the grid area */
.grid-horses > *,
.grid-track > *,
.grid-program > *,
.grid-results > * {
  height: 100%;
  width: 100%;
}

/* Responsive */
@media (max-width: 1400px) {
  .race-grid {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
  }
  
  .grid-horses {
    grid-column: 1;
    grid-row: 1;
  }
  
  .grid-track {
    grid-column: 2;
    grid-row: 1 / 3;
  }
  
  .grid-program {
    grid-column: 1;
    grid-row: 2;
  }
  
  .grid-results {
    grid-column: 1 / 2;
    grid-row: 3;
  }
}

@media (max-width: 768px) {
  .race-grid {
    grid-template-columns: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: auto; /* Allow grid to grow vertically */
    height: auto;
  }
  
  .grid-horses,
  .grid-track,
  .grid-program,
  .grid-results {
    width: 100%;
    height: auto;
    min-height: fit-content;
  }
}
</style>
