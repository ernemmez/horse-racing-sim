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
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: var(--shadow-sm);
}
</style>
