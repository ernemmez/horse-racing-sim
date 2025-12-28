<template>
  <div class="race-track">
    <div class="track-header">
      <h3>Race Track</h3>
      <StatusBadge v-if="currentRound" :status="isRaceActive ? 'active' : 'waiting'">
        {{ isRaceActive ? `Round ${currentRound.roundNo} - Racing!` : `Round ${currentRound.roundNo} - ${currentRound.distance}m` }}
      </StatusBadge>
    </div>
    <div class="track-area">
      <div v-if="!currentRound" class="empty-state">
        Generate a program to start racing
      </div>
      <div v-else class="race-lanes">
        <div 
          v-for="horse in currentRound.horses" 
          :key="horse.id"
          class="lane"
        >
          <div class="lane-horse">
            <HorseIcon :color="horse.color" />
            <span class="horse-name">{{ horse.name }}</span>
          </div>
          <div class="lane-track">
            <div 
              class="horse-runner"
              :style="{ 
                left: `${horsePositions[horse.id]?.position || 0}%`,
                backgroundColor: horse.color
              }"
            />
          </div>
          <div class="finish-line">🏁</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round, HorsePosition } from '../../store/types'
import HorseIcon from '../atoms/HorseIcon.vue'
import StatusBadge from '../atoms/StatusBadge.vue'

defineProps<{
  currentRound: Round | null
  isRaceActive: boolean
  horsePositions: Record<string, HorsePosition>
}>()
</script>

<style scoped>
.race-track {
  background: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.track-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.track-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.track-area {
  flex: 1;
  padding: var(--spacing-lg);
  background: var(--color-track-bg);
  overflow-y: auto;
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

.race-lanes {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.lane {
  display: grid;
  grid-template-columns: 150px 1fr 40px;
  gap: var(--spacing-sm);
  align-items: center;
  padding: var(--spacing-sm);
  background: white;
  border-radius: var(--radius-sm);
}

.lane-horse {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.horse-name {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lane-track {
  position: relative;
  height: 24px;
  background: var(--color-track-line);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.horse-runner {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
  transition: left var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-line {
  font-size: 24px;
}
</style>
