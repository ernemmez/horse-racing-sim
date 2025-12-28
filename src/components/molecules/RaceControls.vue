<template>
  <div class="race-controls">
    <BaseButton 
      variant="primary" 
      :disabled="hasProgram"
      @click="$emit('generate')"
    >
      Generate Program
    </BaseButton>
    <BaseButton 
      variant="secondary"
      :disabled="!canStart"
      @click="$emit('start')"
    >
      {{ isRaceActive ? 'Racing...' : 'Start Race' }}
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../atoms/BaseButton.vue'

defineProps<{
  hasProgram: boolean
  canStart: boolean
  isRaceActive: boolean
}>()

defineEmits<{
  generate: []
  start: []
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
