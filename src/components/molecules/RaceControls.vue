<template>
  <div class="race-controls">
    <BaseButton 
      variant="primary" 
      :disabled="isRaceActive || (hasProgram && !isProgramFinished)"
      @click="$emit('generate')"
    >
      Generate Program
    </BaseButton>
    <BaseButton 
      v-if="!isRaceActive"
      variant="secondary"
      :disabled="!canStart || isProgramFinished"
      @click="$emit('start')"
    >
      ▶️ Start Race
    </BaseButton>
    <BaseButton 
      v-else
      variant="danger"
      @click="$emit('pause')"
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
