<template>
  <div :class="['status-badge', status]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: 'active' | 'waiting' | 'finished'
}>()
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.active {
  background: rgba(52, 168, 83, 0.1);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.waiting {
  background: rgba(251, 188, 4, 0.1);
  color: var(--color-warning);
  border: 1px solid var(--color-warning);
}

.finished {
  background: rgba(0, 0, 0, 0.05);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}
</style>
