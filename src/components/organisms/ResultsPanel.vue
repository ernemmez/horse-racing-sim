<template>
  <div class="results-panel" data-testid="results-panel">
    <div class="panel-header">
      <h3>Results</h3>
      <StatusBadge 
        v-if="results.length > 0" 
        status="finished"
        data-testid="results-count-badge"
      >
        {{ results.length }} Laps
      </StatusBadge>
    </div>
    <div class="panel-content">
      <div v-if="results.length === 0" class="empty-state" data-testid="empty-state">
        No results yet
      </div>
      <div v-else class="results-list" data-testid="results-list">
        <RoundResultCard 
          v-for="result in reversedResults" 
          :key="result.roundNo"
          :result="result"
          data-testid="round-result-card"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RoundResult } from '../../store/types'
import RoundResultCard from '../molecules/RoundResultCard.vue'
import StatusBadge from '../atoms/StatusBadge.vue'

const props = defineProps<{
  results: RoundResult[]
}>()

const reversedResults = computed(() => [...props.results].reverse())
</script>

<style scoped>
.results-panel {
  background: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

/* Mobile Snap Scroll Carousel */
@media (max-width: 768px) {
  /* Header optimization */
  .panel-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .panel-header h3 {
    font-size: 16px;
  }
  
  .panel-content {
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
  
  .results-list {
    display: flex;
    flex-direction: row;
    gap: 12px;
    padding: 12px;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  .results-list > * {
    scroll-snap-align: start;
    flex: 0 0 280px;
    width: 280px;
  }
}
</style>
