<template>
  <div class="race-track">
    <div class="track-header">
      <h3>Race Track</h3>
      <div v-if="currentRound" class="round-badge">
        Lap {{ currentRound.roundNo }} - {{ currentRound.distance }}m
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
                class="horse-runner"
                :style="{ 
                  left: `${horsePositions[horse.id]?.position || 0}%`,
                }"
              >
                <div class="horse-emoji" :style="{ color: horse.color }">🏇</div>
                <div class="horse-name-label">{{ horse.name }}</div>
              </div>
            </div>
            
            <!-- Finish Line -->
            <div class="finish-marker">
              <div class="finish-flag">🏁</div>
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
  top: 50%;
  left: 0;
  right: 48px;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    #ddd 0px,
    #ddd 10px,
    transparent 10px,
    transparent 20px
  );
  transform: translateY(-50%);
}

.horse-runner {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.05s linear;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.horse-emoji {
  font-size: 24px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  animation: gallop 0.4s ease-in-out infinite;
  display: inline-block;
}

.horse-name-label {
  font-size: 9px;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.9);
  padding: 1px 4px;
  border-radius: 3px;
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  /* Ensure text doesn't flip if parent flips */
  transform: scaleX(1); 
}

.finish-marker {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  z-index: 1;
}

.finish-flag {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

/* Racing animation */
@keyframes gallop {
  0%, 100% { transform: scaleX(-1) translateY(0) rotate(-5deg); }
  50% { transform: scaleX(-1) translateY(-3px) rotate(0deg); }
}

/* Removed unused .horse-silhouette */
</style>
