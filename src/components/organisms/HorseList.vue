<template>
  <div class="horse-list">
    <div class="list-header">
      <h3>Horses ({{ horses.length }})</h3>
      <StatusBadge :status="horses.length === 20 ? 'active' : 'waiting'">
        {{ horses.length === 20 ? 'Ready' : 'Waiting...' }}
      </StatusBadge>
    </div>
    <div class="list-content">
      <div v-if="horses.length === 0" class="empty-state">
        No horses generated
      </div>
      <div v-else class="horse-table-container">
        <table class="horse-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Condition</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horse in horses" :key="horse.id">
              <td class="col-name">{{ horse.name }}</td>
              <td class="col-condition">
                <div class="condition-wrapper">
                  <span :class="getConditionClass(horse.condition)">
                    {{ Math.floor(horse.condition) }}
                  </span>
                  <div 
                    class="stamina-pill" 
                    @click="showTooltip($event, horse.id)"
                    @mouseenter="showTooltip($event, horse.id)"
                    @mouseleave="hideTooltip"
                  >
                    S:{{ horse.stamina }}
                  </div>
                </div>
              </td>
              <td class="col-color">
                <div class="color-box" :style="{ backgroundColor: horse.color }"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div 
      v-if="activeTooltip" 
      class="custom-tooltip" 
      :style="{ top: `${tooltipPos.y}px`, left: `${tooltipPos.x}px` }"
    >
      <strong>🏆 Race Analysis:</strong><br>
      Stamina represents this horse's heart and endurance. <br><br>
      Just like real racing, galloping long distances (like 2200m) drains <strong>Condition</strong> rapidly. High stamina helps them resist fatigue longer. <br><br>
      ⚠️ As Condition drops, the horse will physically tire and slow down significantly in the final stretch!
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Horse } from '../../store/types'
import StatusBadge from '../atoms/StatusBadge.vue'
import { ref, reactive } from 'vue'

defineProps<{
  horses: Horse[]
}>()

const getConditionClass = (condition: number) => {
  if (condition >= 80) return 'text-success'
  if (condition >= 50) return 'text-warning'
  return 'text-danger'
}

const activeTooltip = ref<string | null>(null)
const tooltipPos = reactive({ x: 0, y: 0 })

const showTooltip = (event: MouseEvent, id: string) => {
  activeTooltip.value = id
  
  // Calculate position logic:
  // Show to the right of the cursor if possible, or slightly offset
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  
  // Position tooltip to the right of the pill
  tooltipPos.x = rect.right + 10;
  // Center vertically relative to pill
  tooltipPos.y = rect.top;
}

const hideTooltip = () => {
  activeTooltip.value = null
}
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
  padding: 0;
}

.horse-table-container {
  height: 100%;
}

.horse-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.horse-table th {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
  z-index: 10;
}

.horse-table td {
  padding: 6px 8px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.horse-table tr:hover {
  background-color: var(--color-card-hover);
}

.col-name {
  font-weight: 500;
  color: var(--color-text);
}

.col-condition {
  font-weight: 600;
  width: 80px;
}

.condition-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stamina-pill {
  font-size: 9px;
  background: #eef2ff;
  color: #4f46e5;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: 500;
  cursor: help;
  position: relative;
}

.custom-tooltip {
  position: fixed;
  background: rgba(33, 33, 33, 0.95);
  color: white;
  padding: 12px;
  border-radius: 6px;
  width: 220px;
  font-size: 11px;
  line-height: 1.5;
  z-index: 9999;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  pointer-events: none;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.1);
}

/* Arrow pointing left */
.custom-tooltip::after {
  content: '';
  position: absolute;
  top: 10px;
  right: 100%;
  margin-top: 0;
  border-width: 6px;
  border-style: solid;
  border-color: transparent rgba(33, 33, 33, 0.95) transparent transparent;
}

.col-color {
  width: 40px;
  text-align: center;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.1);
}

.text-success { color: var(--color-success); }
.text-warning { color: #F59E0B; }
.text-danger { color: var(--color-danger); }

.empty-state {
  padding: var(--spacing-xl);
  text-align: center;
  color: var(--color-text-muted);
}
</style>
