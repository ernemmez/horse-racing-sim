<template>
  <div class="race-controls" data-testid="race-controls">
    <BaseButton 
      variant="primary" 
      :disabled="isRaceActive || (hasProgram && !isProgramFinished)"
      @click="$emit('generate')"
      data-testid="generate-button"
    >
      Generate Program
    </BaseButton>
    <BaseButton 
      v-show="!isRaceActive"
      variant="secondary"
      :disabled="!canStart || isProgramFinished"
      @click="$emit('start')"
      data-testid="start-button"
    >
      {{ isPaused ? '▶️ Resume' : '▶️ Start Race' }}
    </BaseButton>
    <BaseButton 
      v-show="isRaceActive"
      variant="danger"
      @click="$emit('pause')"
      data-testid="pause-button"
    >
      ⏸️ Pause Race
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../atoms/BaseButton.vue'

defineProps<{
  hasProgram: boolean
  canStart: boolean
  isRaceActive: boolean
  isPaused: boolean
  isProgramFinished: boolean
}>()

defineEmits<{
  generate: []
  start: []
  pause: []
}>()
</script>

<style scoped>
.race-controls {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
</style>
