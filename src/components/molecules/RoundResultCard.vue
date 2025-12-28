<template>
  <div class="round-result-card card">
    <div class="round-header">
      <h4>Round {{ result.roundNo }}</h4>
      <span class="distance">{{ result.distance }}m</span>
    </div>
    <div class="rankings">
      <div 
        v-for="ranking in result.rankings.slice(0, 3)" 
        :key="ranking.horseId"
        class="ranking-item"
        :class="`position-${ranking.position}`"
      >
        <div class="rank-badge">{{ formatPosition(ranking.position) }}</div>
        <div class="horse-color" :style="{ backgroundColor: ranking.horseColor }" />
        <div class="horse-name">{{ ranking.horseName }}</div>
        <div class="finish-time">{{ formatTime(ranking.finishTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoundResult } from '../../store/types'
import { formatPosition, formatTime } from '../../utils/algorithms'

defineProps<{
  result: RoundResult
}>()
</script>

<style scoped>
.round-result-card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
}

.round-header h4 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.distance {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.rankings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.ranking-item:hover {
  background: var(--color-card-hover);
}

.position-1 {
  background: rgba(52, 168, 83, 0.05);
}

.rank-badge {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.position-1 .rank-badge {
  background: var(--color-success);
  color: white;
}

.horse-color {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}

.horse-name {
  flex: 1;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.finish-time {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-family: 'Courier New', monospace;
}
</style>
