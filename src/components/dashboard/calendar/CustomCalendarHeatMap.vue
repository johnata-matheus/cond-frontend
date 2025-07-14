<template>
  <div class="calendar-heatmap-container">
    <TooltipProvider>
      <CalendarHeatMapGrid
        :values="values"
        :end-date="endDate"
        :months="months"
        :days="days"
        :colors="colors"
      />
    </TooltipProvider>
    <div class="calendar-heatmap-footer flex flex-wrap gap-2 items-center justify-between mt-2 ml-[32px]">
      <span class="text-xs text-muted-foreground">
        Os quadrados representam tarefas concluídas por dia
      </span>
      <div class="flex items-center gap-2 mr-7">
        <span class="text-xs text-muted-foreground">Menos</span>
        <div class="flex items-center gap-1">
          <span
            v-for="(color) in colors"
            :key="color"
            :style="{
              display: 'inline-block',
              width: '15px',
              height: '15px',
              borderRadius: '3px',
              background: color,
              border: '1px solid #d1d5db'
            }"
          />
        </div>
        <span class="text-xs text-muted-foreground">Mais</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue';
import CalendarHeatMapGrid from './CalendarHeatMapGrid.vue'

interface Value {
  date: string
  count: number
}

const props = defineProps<{
  values: Value[]
  endDate: string
  months: string[]
  days: string[]
  colors: string[]
}>()

const { values, endDate, months, days, colors } = props
</script>

<style scoped>
.calendar-heatmap-container {
  position: relative;
  width: 100%;
}
.calendar-heatmap-footer {
  user-select: none;
}
</style>