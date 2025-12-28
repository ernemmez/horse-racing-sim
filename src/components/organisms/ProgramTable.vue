<template>
  <div class="program-table">
    <div class="table-header">
      <h3>Program</h3>
      <StatusBadge v-if="rounds.length > 0" :status="currentRoundIndex !== null ? 'active' : 'finished'">
        {{ currentRoundIndex !== null ? `Round ${currentRoundIndex + 1}/6` : 'Finished' }}
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
          :class="['round-item', { active: currentRoundIndex === round.roundNo - 1, completed: isRoundCompleted(round.roundNo) }]"
        >
          <div class="round-number">R{{ round.roundNo }}</div>
          <div class="round-info">
            <div class="round-distance">{{ round.distance }}m</div>
            <div class="round-horses">{{ round.horses.length }} horses</div>
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

.round-item {
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--radius-sm);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: all var(--transition-base);
}

.round-item.active {
  border-color: var(--color-primary);
  background: rgba(255, 107, 53, 0.05);
}

.round-item.completed {
  opacity: 0.6;
}

.round-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.round-item.active .round-number {
  background: var(--color-primary);
  color: white;
}

.round-item.completed .round-number {
  background: var(--color-success);
  color: white;
}

.round-info {
  flex: 1;
}

.round-distance {
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.round-horses {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
