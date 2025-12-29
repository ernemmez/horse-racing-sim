<template>
  <div class="round-result-card card" data-testid="round-result-card">
    <div class="round-header" data-testid="round-header">
      <h4>Lap {{ result.roundNo }}</h4>
      <span class="distance" data-testid="round-distance">{{ result.distance }}m</span>
    </div>
    <div class="rankings" data-testid="rankings-list">
      <div 
        v-for="ranking in result.rankings" 
        :key="ranking.horseId"
        class="ranking-item"
        :class="`position-${ranking.position}`"
        data-testid="ranking-item"
      >
        <div class="rank-badge" data-testid="rank-badge">{{ ranking.position }}</div>
        <div class="horse-color" :style="{ backgroundColor: ranking.horseColor }" data-testid="horse-color" />
        <div class="horse-name" data-testid="horse-name">
          {{ ranking.horseName }}
          <span v-if="ranking.position === 1" data-testid="winner-trophy">🏆</span>
        </div>
        <div class="finish-time" data-testid="finish-time">{{ formatTime(ranking.finishTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoundResult } from '../../store/types'
import { formatTime } from '../../utils/algorithms'

defineProps<{
  result: RoundResult
}>()
</script>

<style scoped>
.round-result-card {
  padding: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--color-border);
}

.round-header h4 {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.distance {
  font-size: 11px;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.rankings {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 4px var(--spacing-xs);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.ranking-item:hover {
  background: var(--color-card-hover);
}

.rank-badge {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: var(--font-weight-bold);
  flex-shrink: 0;
}

.horse-color {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.horse-name {
  flex: 1;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.finish-time {
  font-size: 11px;
  color: var(--color-text-muted);
  font-family: 'Courier New', monospace;
}
</style>
