<template>
  <div class="horse-card card" :style="{ borderLeftColor: horse.color }">
    <div class="horse-header">
      <HorseIcon :color="horse.color" />
      <div class="horse-info">
        <h4>{{ horse.name }}</h4>
        <div class="stats">
          <span class="stat" :class="conditionClass">⚡ {{ horse.condition }}/100</span>
          <span class="stat stamina">💪 {{ horse.stamina }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Horse } from '../../store/types'
import HorseIcon from '../atoms/HorseIcon.vue'

const props = defineProps<{
  horse: Horse
}>()

const conditionClass = computed(() => {
  if (props.horse.condition >= 80) return 'good'
  if (props.horse.condition >= 50) return 'medium'
  return 'low'
})
</script>

<style scoped>
.horse-card {
  padding: var(--spacing-xs) var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
  border-left: 3px solid;
}

.horse-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.horse-info {
  flex: 1;
  min-width: 0;
}

.horse-info h4 {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stats {
  display: flex;
  gap: var(--spacing-xs);
  margin-top: 2px;
}

.stat {
  font-size: 10px;
  font-weight: var(--font-weight-medium);
  padding: 1px 4px;
  border-radius: 3px;
  background: var(--color-border);
}

.stat.good {
  background: rgba(52, 168, 83, 0.15);
  color: var(--color-success);
}

.stat.medium {
  background: rgba(251, 188, 5, 0.15);
  color: #F59E0B;
}

.stat.low {
  background: rgba(234, 67, 53, 0.15);
  color: var(--color-danger);
}

.stat.stamina {
  background: rgba(66, 133, 244, 0.15);
  color: #4285F4;
}

.color-indicator {
  display: none;
}
</style>
