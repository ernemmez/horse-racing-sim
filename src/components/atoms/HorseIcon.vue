<template>
  <div class="horse-icon" :style="{ backgroundColor: color }">
    🐴
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<style scoped>
.horse-icon {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}
</style>
