<template>
  <div class="horse-list">
    <div class="list-header">
      <h3>Horses ({{ horses.length }})</h3>
      <StatusBadge :status="horses.length === 20 ? 'active' : 'waiting'">
        {{ horses.length === 20 ? 'Ready' : 'Generating...' }}
      </StatusBadge>
    </div>
    <div class="list-content">
      <HorseCard 
        v-for="horse in horses" 
        :key="horse.id"
        :horse="horse"
      />
      <div v-if="horses.length === 0" class="empty-state">
        No horses generated yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '../../store/types'
import HorseCard from '../molecules/HorseCard.vue'
import StatusBadge from '../atoms/StatusBadge.vue'

defineProps<{
  horses: Horse[]
}>()
</script>

<style scoped>
.horse-list {
  background: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  color: var(--color-text);
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}
</style>
