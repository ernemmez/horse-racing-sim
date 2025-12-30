<template>
  <div class="race-track" data-testid="race-track">
    <div class="track-header">
      <h3>Hippodrome</h3>
      <div class="header-right">
        <div class="timer-badge" data-testid="race-timer">
          {{ formatTime(raceTime) }}
        </div>
        <div v-if="currentRound" class="round-badge" data-testid="round-info-badge">
          Lap {{ currentRound.roundNo }} - {{ currentRound.distance }}m
        </div>
      </div>
    </div>
    
    <div class="track-area" ref="trackAreaRef">
      <div v-if="!currentRound" class="empty-state" data-testid="empty-state">
        Generate a program to start racing
      </div>
      
      <div v-else class="race-container" data-testid="race-container">
        <div class="race-lanes">
          <div 
            v-for="(horse, index) in currentRound.horses" 
            :key="horse.id"
            class="lane"
            data-testid="race-lane"
          >
            <div class="lane-number" data-testid="lane-number">{{ index + 1 }}</div>
            
            <div class="lane-track">
              <div class="track-line"></div>
              
            <div class="finish-marker" data-testid="finish-line">
              <div class="finish-flag">🏁</div>
              <div v-if="horsePositions[horse.id]?.position >= 100" class="confetti-container" data-testid="finish-confetti">
                <div class="confetti c1"></div>
                <div class="confetti c2"></div>
                <div class="confetti c3"></div>
                <div class="confetti c4"></div>
                <div class="confetti c5"></div>
              </div>
            </div>
             <div 
                class="horse-runner"
                :style="{ 
                  transform: `translateX(${horsePositions[horse.id]?.position || 0}%)`
                }"
                data-testid="horse-runner"
              >
                <div class="horse-inner">
                  <div class="horse-emoji" :style="{ color: horse.color }" data-testid="horse-emoji">🏇</div>
                  <div class="horse-name-label" data-testid="horse-name">{{ horse.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Round, HorsePosition } from '../../store/types'
import { computed, ref, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { formatTime } from '../../utils/algorithms'

const props = defineProps<{
  currentRound: Round | null
  isRaceActive: boolean
  horsePositions: Record<string, HorsePosition>
}>()

const store = useStore()
const raceTime = ref(0)
let timerInterval: number | null = null

const raceStartTime = computed(() => store.state.race.raceStartTime)

watch(() => props.isRaceActive, (active) => {
  if (active) {
    if (timerInterval) clearInterval(timerInterval)
    timerInterval = window.setInterval(() => {
      if (raceStartTime.value) {
        raceTime.value = Date.now() - raceStartTime.value
      }
    }, 50)
  } else {
    if (timerInterval) clearInterval(timerInterval)
    if (!raceStartTime.value) raceTime.value = 0
  }
}, { immediate: true })

watch(raceStartTime, (newTime) => {
  if (!newTime) {
    raceTime.value = 0
    if (timerInterval) clearInterval(timerInterval)
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

const trackAreaRef = ref<HTMLElement | null>(null)
let lastScrollPos = 0
let scrollTimeout: number | null = null

watch(() => props.isRaceActive, (active) => {
  if (!active && trackAreaRef.value && window.innerWidth <= 768) {
    trackAreaRef.value.scrollTo({ left: 0, behavior: 'smooth' })
    lastScrollPos = 0
  }
})

watch(() => props.horsePositions, (positions) => {
  if (!props.isRaceActive || !trackAreaRef.value) return
  if (window.innerWidth > 768) return
  
  if (scrollTimeout) return
  
  scrollTimeout = window.setTimeout(() => {
    scrollTimeout = null
  }, 200)
  
  let maxPosition = 0
  Object.values(positions).forEach(horsePos => {
    if (horsePos.position > maxPosition) {
      maxPosition = horsePos.position
    }
  })
  
  if (maxPosition < 5) return
  
  if (maxPosition > 70) return
  
  const container = trackAreaRef.value
  if (!container) return
  
  const trackWidth = container.scrollWidth - container.clientWidth
  const viewportWidth = container.clientWidth
  
  const leaderTrackPos = (maxPosition / 100) * trackWidth
  const targetScrollPos = leaderTrackPos - (viewportWidth * 0.3)
  
  const clampedScroll = Math.max(0, Math.min(targetScrollPos, trackWidth))
  
  const scrollDelta = Math.abs(clampedScroll - lastScrollPos)
  if (scrollDelta < 10) return
  
  lastScrollPos = clampedScroll
  
  container.scrollTo({
    left: clampedScroll,
    behavior: 'smooth'
  })
}, { deep: true })
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

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.timer-badge {
  background: #333;
  color: #0F0;
  font-family: 'Courier New', monospace;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid #555;
  min-width: 80px;
  text-align: center;
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
  overflow-x: auto;
  position: relative;
}

.track-area::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.track-area::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
}

.track-area::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
}

.track-area::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

.race-container {
  position: relative;
  min-height: 100%;
  min-width: 600px; 
}

.race-lanes {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: var(--spacing-md) 0;
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
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 2;
  transition: transform 0.05s linear;
  will-change: transform;
}

.horse-inner {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
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
  position: relative;
  z-index: 2;
}

.confetti-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 1;
}

.confetti {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #f00;
  top: 50%;
  left: 50%;
  opacity: 0;
}

.c1 { background: #ff0; animation: pop1 0.6s ease-out forwards; }
.c2 { background: #0f0; animation: pop2 0.6s ease-out forwards; }
.c3 { background: #00f; animation: pop3 0.6s ease-out forwards; }
.c4 { background: #f0f; animation: pop4 0.6s ease-out forwards; }
.c5 { background: #0ff; animation: pop5 0.6s ease-out forwards; }

@keyframes pop1 { 0% { transform: translate(0,0) scale(0); opacity: 1; } 100% { transform: translate(-15px, -15px) scale(1) rotate(45deg); opacity: 0; } }
@keyframes pop2 { 0% { transform: translate(0,0) scale(0); opacity: 1; } 100% { transform: translate(15px, -15px) scale(1) rotate(-45deg); opacity: 0; } }
@keyframes pop3 { 0% { transform: translate(0,0) scale(0); opacity: 1; } 100% { transform: translate(-10px, 15px) scale(1) rotate(90deg); opacity: 0; } }
@keyframes pop4 { 0% { transform: translate(0,0) scale(0); opacity: 1; } 100% { transform: translate(10px, 10px) scale(1) rotate(-90deg); opacity: 0; } }
@keyframes pop5 { 0% { transform: translate(0,0) scale(0); opacity: 1; } 100% { transform: translate(0, -20px) scale(1) rotate(0deg); opacity: 0; } }

@keyframes wave {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes gallop {
  0%, 100% { transform: scaleX(-1) translateY(0) rotate(-5deg); }
  50% { transform: scaleX(-1) translateY(-3px) rotate(0deg); }
}

@media (max-width: 768px) {
  .track-header {
    padding: var(--spacing-sm) var(--spacing-md);
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
  
  .track-header h3 {
    font-size: 16px;
    flex: 1;
    min-width: 0;
  }
  
  .header-right {
    gap: 6px;
    flex-shrink: 0;
  }
  
  .timer-badge {
    padding: 3px 8px;
    font-size: 11px;
    min-width: 60px;
  }
  
  .round-badge {
    padding: 3px 10px;
    font-size: 11px;
    letter-spacing: 0.3px;
  }
  
  .track-area {
    padding: var(--spacing-sm);
  }
  
  .lane {
    height: 36px;
  }
  
  .lane-number {
    width: 28px;
    height: 28px;
    font-size: 11px;
    margin-left: 4px;
  }
  
  .horse-emoji {
    font-size: 20px;
  }
  
  .horse-name-label {
    font-size: 8px;
    padding: 1px 3px;
  }
  
  .finish-flag {
    font-size: 26px;
  }
}
</style>
