<template>
  <div class="program-table" data-testid="program-table">
    <div class="table-header">
      <h3>Program</h3>
      <StatusBadge v-if="rounds.length > 0" :status="currentRoundIndex !== null ? 'active' : 'finished'" data-testid="program-status-badge">
        {{ currentRoundIndex !== null ? `Lap ${currentRoundIndex + 1}/6` : 'Finished' }}
      </StatusBadge>
    </div>
    <div class="table-content">
      <div v-if="rounds.length === 0" class="empty-state" data-testid="empty-state">
        No program generated
      </div>
      <div v-else class="rounds-list" data-testid="rounds-list">
        <div 
          v-for="round in rounds" 
          :key="round.roundNo"
          :class="['round-block', { active: currentRoundIndex === round.roundNo - 1, completed: isRoundCompleted(round.roundNo) }]"
          data-testid="round-block"
        >
          <div 
            class="round-header-row" 
            @click="toggleRound(round.roundNo)"
            @touchend="showMobileTooltip($event, round.roundNo)"
            data-testid="round-header"
          >
            <div class="round-number" data-testid="round-number">R{{ round.roundNo }}</div>
            <div class="round-info">
              <div class="round-distance" data-testid="round-distance">{{ round.distance }}m</div>
              <div class="round-horses">{{ round.horses.length }} horses</div>
            </div>
            <div class="toggle-icon" data-testid="toggle-icon">
              {{ isRoundExpanded(round.roundNo) ? '🔼' : '🔽' }}
            </div>
          </div>
          <div 
            class="horses-table" 
            v-show="isRoundExpanded(round.roundNo)"
            data-testid="round-horses-list"
          >
            <div v-for="(horse, idx) in round.horses" :key="horse.id" class="horse-row" data-testid="horse-row">
              <span class="pos">{{ idx + 1 }}</span>
              <span class="horse-name">{{ horse.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div 
      v-if="activeTooltipRound !== null" 
      class="bottom-sheet-overlay"
      @click="hideTooltip"
      @touchend="hideTooltip"
    >
      <div 
        class="bottom-sheet" 
        @click.stop
        @touchend.stop
      >
        <div class="bottom-sheet-handle"></div>
        <div class="bottom-sheet-header">
          <strong>Round {{ activeTooltipRound }} - Horses</strong>
          <button class="close-btn" @click="hideTooltip" @touchend="hideTooltip">✕</button>
        </div>
        <div class="bottom-sheet-content">
          <div 
            v-for="(horse, idx) in getTooltipRound()?.horses" 
            :key="horse.id" 
            class="horse-item"
          >
            <span class="horse-pos">{{ idx + 1 }}</span>
            <span class="horse-name">{{ horse.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Round } from '../../store/types'
import StatusBadge from '../atoms/StatusBadge.vue'
import { ref } from 'vue'

const props = defineProps<{
  rounds: Round[]
  currentRoundIndex: number | null
  completedRoundsCount: number
}>()

const isRoundCompleted = (roundNo: number) => {
  return roundNo <= props.completedRoundsCount
}

// Map to track MANUALLY toggled state of each round
// Key: roundNo, Value: true (force open) or false (force closed)
// If not in map, default behavior applies: Only current round is open.
const roundStateOverrides = ref<Record<number, boolean>>({})

const toggleRound = (roundNo: number) => {
  const currentState = isRoundExpanded(roundNo)
  roundStateOverrides.value[roundNo] = !currentState
}

const isRoundExpanded = (roundNo: number) => {
  // If manual override exists, use it
  if (roundNo in roundStateOverrides.value) {
    return roundStateOverrides.value[roundNo]
  }
  
  // Default behavior:
  // If currentRoundIndex is null (not started or finished), maybe open first/last?
  // Let's say if finished, maybe none open or last open? Use null check.
  
  if (props.currentRoundIndex === null) {
    // If finished (rounds exists), maybe open none
    return false
  }
  
  // Open ONLY if it matches current round index (0-based vs 1-based roundNo)
  return (props.currentRoundIndex + 1) === roundNo
}

// Mobile bottom sheet state
const activeTooltipRound = ref<number | null>(null)

const showMobileTooltip = (event: TouchEvent, roundNo: number) => {
  // Only on mobile
  if (window.innerWidth > 768) return
  
  event.preventDefault()
  event.stopPropagation()
  
  activeTooltipRound.value = roundNo
}

const hideTooltip = () => {
  activeTooltipRound.value = null
}

const getTooltipRound = () => {
  if (activeTooltipRound.value === null) return null
  return props.rounds.find(r => r.roundNo === activeTooltipRound.value)
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
  cursor: pointer;
  user-select: none;
}

.toggle-icon {
  font-size: 10px;
  color: var(--color-text-muted);
  opacity: 0.7;
}

.round-header-row:hover {
  background: rgba(0, 0, 0, 0.05);
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

/* Mobile Snap Scroll Carousel */
@media (max-width: 768px) {
  /* Header optimization */
  .table-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .table-header h3 {
    font-size: 16px;
  }
  
  .table-content {
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
  
  .rounds-list {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px 12px 0;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  .round-block {
    scroll-snap-align: start;
    flex: 0 0 140px;
    width: 140px;
    display: flex;
    flex-direction: column;
  }
  
  .round-header-row {
    padding: 12px 10px;
    flex-direction: column;
    gap: 8px;
    cursor: default;
    pointer-events: none;
  }
  
  .toggle-icon {
    display: none;
  }
  
  .round-number {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-md);
  }
  
  .round-info {
    text-align: center;
    width: 100%;
  }
  
  .round-distance {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    margin-bottom: 4px;
  }
  
  .round-horses {
    font-size: 10px;
  }
  
  /* Hide horses table on mobile */
  .horses-table {
    display: none !important;
  }
  
  .round-header-row {
    cursor: pointer;
    pointer-events: auto;
  }
}

/* Mobile Bottom Sheet */
.bottom-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  max-height: 70vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

.bottom-sheet-handle {
  width: 40px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  margin: 12px auto 8px;
}

.bottom-sheet-header {
  padding: 0 20px 16px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom-sheet-header strong {
  font-size: 16px;
  color: var(--color-text);
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:active {
  background: rgba(0,0,0,0.05);
}

.bottom-sheet-content {
  overflow-y: auto;
  flex: 1;
  padding: 8px 12px 20px;
}

.horse-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  background: white;
}

.horse-item:active {
  background: rgba(0,0,0,0.03);
}

.horse-pos {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border);
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}

.horse-name {
  flex: 1;
  color: var(--color-text);
  font-weight: 500;
}
</style>
