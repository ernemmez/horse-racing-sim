<template>
  <div class="race-track">
    <div class="track-header">
      <h3>Race Track</h3>
      <div v-if="currentRound" class="round-badge">
        Round {{ currentRound.roundNo }} - {{ currentRound.distance }}m
      </div>
    </div>
    
    <div class="track-area">
      <div v-if="!currentRound" class="empty-state">
        Generate a program to start racing
      </div>
      
      <div v-else class="race-container">
        <!-- Racing Lanes -->
        <div class="race-lanes">
          <div 
            v-for="(horse, index) in currentRound.horses" 
            :key="horse.id"
            class="lane"
          >
            <!-- Lane Number -->
            <div class="lane-number">{{ index + 1 }}</div>
            
            <!-- Track with dashed lines -->
            <div class="lane-track">
              <div class="track-line"></div>
              
              <!-- Horse Silhouette -->
              <div 
                class="horse-silhouette"
                :style="{ 
                  left: `${horsePositions[horse.id]?.position || 0}%`,
                  color: horse.color
                }"
              >
                🏇
              </div>
            </div>
            
            <!-- Finish Line -->
            <div class="finish-marker">
              <div class="finish-line">FINISH</div>
            </div>
          </div>
        </div>
        
        <!-- Lap Info -->
        <div style="text-align: center;">
          <div class="lap-info">
            1st Lap - {{ currentRound.distance }}m
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round, HorsePosition } from '../../store/types'

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

.round-badge {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.5px;
}

.track-area {
  flex: 1;
  padding: var(--spacing-lg);
  background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
  overflow-y: auto;
  position: relative;
  max-height: 600px;
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

.race-container {
  position: relative;
  min-height: 100%;
}

.lap-info {
  position: sticky;
  bottom: var(--spacing-md);
  left: 0;
  right: 0;
  text-align: center;
  background: rgba(255, 107, 53, 0.95);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-base);
  box-shadow: var(--shadow-md);
  z-index: 10;
  display: inline-block;
  margin: 0 auto;
  max-width: fit-content;
}

.race-lanes {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: var(--spacing-md) 0;
  padding-bottom: 60px;
}

.lane {
  display: grid;
  grid-template-columns: 40px 1fr 80px;
  align-items: center;
  height: 40px;
  border-bottom: 1px dashed #C8E6C9;
  position: relative;
}

.lane:last-child {
  border-bottom: none;
}

.lane-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
  margin-left: var(--spacing-sm);
}

.lane-track {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.track-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #9E9E9E 0px,
    #9E9E9E 8px,
    transparent 8px,
    transparent 16px
  );
}

.horse-silhouette {
  position: absolute;
  left: 0;
  font-size: 24px;
  transition: left 0.05s linear;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 2;
  transform: scaleX(-1);
}

.finish-marker {
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-line {
  background: linear-gradient(135deg, #EF5350 0%, #D32F2F 100%);
  color: white;
  padding: 4px var(--spacing-sm);
  font-weight: var(--font-weight-bold);
  font-size: 11px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(211, 47, 47, 0.4);
  position: relative;
}

.finish-line::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: repeating-linear-gradient(
    to bottom,
    white 0px,
    white 6px,
    #D32F2F 6px,
    #D32F2F 12px
  );
}

/* Racing animation */
@keyframes gallop {
  0%, 100% { transform: scaleX(-1) translateY(0); }
  50% { transform: scaleX(-1) translateY(-2px); }
}

.horse-silhouette {
  animation: gallop 0.3s ease-in-out infinite;
}
</style>
