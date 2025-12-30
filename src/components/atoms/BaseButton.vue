<template>
  <button 
    :class="['base-button', variant, { disabled }]"
    :disabled="disabled"
    @click="$emit('click')"
    data-testid="base-button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.base-button {
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.base-button:hover:not(.disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.base-button:active:not(.disabled) {
  transform: translateY(0);
}

.primary {
  background: var(--color-primary);
  color: white;
}

.primary:hover:not(.disabled) {
  background: var(--color-primary-dark);
}

.secondary {
  background: var(--color-secondary);
  color: white;
}

.danger {
  background: var(--color-error);
  color: white;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .base-button {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 14px;
  }
}
</style>
