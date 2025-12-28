<template>
  <div class="program-table">
    <div class="table-header">
      <h3>Program</h3>
      <StatusBadge v-if="rounds.length > 0" :status="currentRoundIndex !== null ? 'active' : 'finished'">
        {{ currentRoundIndex !== null ? `Lap ${currentRoundIndex + 1}/6` : 'Finished' }}
      </StatusBadge>
    </div>
    <div class="table-content">
      <div v-if="rounds.length === 0" class="empty-state">
        No program generated
      </div>
      <div v-else class="rounds-list">
        <div 
          v-for="round in rounds" 
          :key="round.roundNo"
          :class="['round-block', { active: currentRoundIndex === round.roundNo - 1, completed: isRoundCompleted(round.roundNo) }]"
        >
          <div class="round-header-row">
            <div class="round-number">R{{ round.roundNo }}</div>
            <div class="round-info">
              <div class="round-distance">{{ round.distance }}m</div>
              <div class="round-horses">{{ round.horses.length }} horses</div>
            </div>
          </div>
          <div class="horses-table">
            <div v-for="(horse, idx) in round.horses" :key="horse.id" class="horse-row">
              <span class="pos">{{ idx + 1 }}</span>
              <span class="horse-name">{{ horse.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round } from '../../store/types'
import StatusBadge from '../atoms/StatusBadge.vue'

const props = defineProps<{
  rounds: Round[]
  currentRoundIndex: number | null
  completedRoundsCount: number
}>()

const isRoundCompleted = (roundNo: number) => {
  return roundNo <= props.completedRoundsCount
}
</script>

<style scoped>
.program-table {
  background: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.table-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

.rounds-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.round-block {
  background: white;
  border-radius: var(--radius-sm);
  border: 2px solid var(--color-border);
  overflow: hidden;
  transition: all var(--transition-base);
}

.round-block.active {
  border-color: var(--color-primary);
}

.round-block.completed {
  opacity: 0.7;
}

.round-header-row {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.round-block.active .round-header-row {
  background: rgba(255, 107, 53, 0.05);
}

.round-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  flex-shrink: 0;
}

.round-block.active .round-number {
  background: var(--color-primary);
  color: white;
}

.round-block.completed .round-number {
  background: var(--color-success);
  color: white;
}

.round-info {
  flex: 1;
  min-width: 0;
}

.round-distance {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.round-horses {
  font-size: 11px;
  color: var(--color-text-muted);
}

.horses-table {
  max-height: 200px;
  overflow-y: auto;
  border-top: 1px solid var(--color-border);
}

.horse-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 4px var(--spacing-sm);
  font-size: 11px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.horse-row:last-child {
  border-bottom: none;
}

.horse-row:hover {
  background: var(--color-card-hover);
}

.horse-row .pos {
  width: 20px;
  text-align: center;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  flex-shrink: 0;
}

.horse-row .horse-name {
  flex: 1;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
