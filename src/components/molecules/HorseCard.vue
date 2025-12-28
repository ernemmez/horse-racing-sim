<template>
  <div class="horse-card card">
    <div class="horse-header">
      <HorseIcon :color="horse.color" />
      <div class="horse-info">
        <h4>{{ horse.name }}</h4>
        <span class="condition">Condition: {{ horse.condition }}/100</span>
      </div>
    </div>
    <div class="color-indicator" :style="{ backgroundColor: horse.color }" />
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '../../store/types'
import HorseIcon from '../atoms/HorseIcon.vue'

defineProps<{
  horse: Horse
}>()
</script>

<style scoped>
.horse-card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.horse-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.horse-info {
  flex: 1;
}

.horse-info h4 {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.condition {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.color-indicator {
  height: 4px;
  width: 100%;
  margin-top: var(--spacing-sm);
  border-radius: var(--radius-full);
}
</style>
