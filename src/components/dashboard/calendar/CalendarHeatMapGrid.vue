<template>
  <div class="calendar-heatmap-container">
    <svg
      :width="svgWidth"
      :height="svgHeight"
      class="custom-heatmap calendar-heatmap-svg"
    >
      <g>
        <text
          v-for="label in monthLabels"
          :key="label.name + '-' + label.x"
          :x="label.x"
          :y="labelPaddingTop"
          class="month-label"
          text-anchor="start"
          font-size="12"
          fill="#767676"
          font-family="inherit"
        >
          {{ label.name }}
        </text>
      </g>
      <g>
        <text
          v-for="idx in 7"
          :key="idx"
          :x="labelWidth - 6"
          :y="labelPaddingTop + labelHeight + (idx - 1) * (cellSize + cellGap) + cellSize / 2"
          font-size="12"
          fill="#767676"
          font-family="inherit"
          dominant-baseline="middle"
          text-anchor="end"
        >
          {{ daysMap[idx - 1] || '' }}
        </text>
      </g>
    </svg>
    <div
      class="calendar-heatmap-grid"
      :style="calendarGridDynamicStyle"
    >
      <TooltipProvider :delay-duration="0">
        <template v-for="dayIdx in 7" :key="dayIdx">
          <template v-for="(week, weekIdx) in weeks" :key="weekIdx">
            <Tooltip v-if="week[dayIdx - 1] && week[dayIdx - 1].date">
              <TooltipTrigger as-child>
                <div
                  class="heatmap-cell"
                  :style="getCellDynamicStyle(weekIdx, dayIdx, week[dayIdx - 1].count)"
                  :data-date="week[dayIdx - 1].date"
                />
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <div class="tooltip-title">
                  {{ week[dayIdx - 1].count === 0 ? 'Nenhuma tarefa' : week[dayIdx - 1].count + ' tarefa' + (week[dayIdx - 1].count === 1 ? '' : 's') }}
                </div>
                <div class="tooltip-date">
                  {{ formatDate(week[dayIdx - 1].date || '') }}
                </div>
              </TooltipContent>
            </Tooltip>
          </template>
        </template>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'

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

const cellSize = 15
const cellGap = 4
const labelWidth = 32
const labelHeight = 16
const labelPaddingTop = 16

const startDate = computed(() => {
  const oneYearAgo = dayjs(props.endDate).subtract(1, 'year')
  const firstDayOfMonth = oneYearAgo.startOf('month')
  if (firstDayOfMonth.day() === 0) {
    return firstDayOfMonth.format('YYYY-MM-DD')
  }
  const daysToAdd = 7 - firstDayOfMonth.day()
  return firstDayOfMonth.add(daysToAdd, 'day').format('YYYY-MM-DD')
})

function generateWeeks(start: string, end: string) {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const weeks: { date: string | null; count: number }[][] = []
  const current = startDate
  let weekStart = current.subtract(current.day(), 'day')
  while (weekStart.isBefore(endDate) || weekStart.isSame(endDate, 'day')) {
    const week: { date: string | null; count: number }[] = []
    for (let i = 0; i < 7; i++) {
      const day = weekStart.add(i, 'day')
      if (day.isBefore(startDate) || day.isAfter(endDate)) {
        week.push({ date: null, count: 0 })
      } else {
        const dateStr = day.format('YYYY-MM-DD')
        const found = props.values.find(v => v.date === dateStr)
        week.push({ date: dateStr, count: found ? found.count : 0 })
      }
    }
    weeks.push(week)
    weekStart = weekStart.add(7, 'day')
  }
  return weeks
}

const weeks = computed(() => generateWeeks(startDate.value, props.endDate))

const monthLabels = computed(() => {
  const labels: { name: string; x: number }[] = []
  const monthsAdded = new Set<string>()
  weeks.value.forEach((week, weekIdx) => {
    const firstDay = week.find(cell => cell.date !== null)
    if (!firstDay) return
    const d = dayjs(firstDay.date!)
    const monthIdx = d.month()
    const year = d.year()
    const monthKey = `${monthIdx}-${year}`
    const monthName = props.months[monthIdx]
    if (!monthsAdded.has(monthKey)) {
      labels.push({
        name: monthName,
        x: labelWidth + weekIdx * (cellSize + cellGap),
      })
      monthsAdded.add(monthKey)
    }
  })
  return labels
})

const svgWidth = computed(() => labelWidth + weeks.value.length * (cellSize + cellGap))
const svgHeight = computed(() => labelPaddingTop + labelHeight + 7 * (cellSize + cellGap))

const calendarGridDynamicStyle = computed<StyleValue>(() => ({
  marginLeft: `${labelWidth}px`,
  marginTop: `${labelPaddingTop + labelHeight}px`,
  width: `${weeks.value.length * (cellSize + cellGap)}px`,
  height: `${7 * (cellSize + cellGap)}px`,
}))

function getCellDynamicStyle(weekIdx: number, dayIdx: number, count: number): StyleValue {
  return {
    left: `${weekIdx * (cellSize + cellGap)}px`,
    top: `${(dayIdx - 1) * (cellSize + cellGap)}px`,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    background: getColor(count),
  }
}

function getColor(count: number) {
  if (count === 0) return props.colors[0]
  if (count === 1) return props.colors[1] || props.colors[0]
  if (count === 2) return props.colors[2] || props.colors[1] || props.colors[0]
  if (count === 3) return props.colors[3] || props.colors[2] || props.colors[1] || props.colors[0]
  return props.colors[4] || props.colors[3] || props.colors[2] || props.colors[1] || props.colors[0]
}

const daysMap = computed(() => {
  if (props.days.length === 7) return props.days
  const arr = Array(7).fill('')
  const defaultIdx = [1, 3, 5]
  props.days.forEach((d, i) => {
    if (defaultIdx[i] !== undefined) arr[defaultIdx[i]] = d
  })
  return arr
})

function formatDate(date: string) {
  return dayjs(date).locale('pt-br').format('DD/MM/YYYY')
}
</script>

<style scoped>
.calendar-heatmap-container {
  position: relative;
  width: 100%;
  overflow-x: auto;
}
.calendar-heatmap-svg {
  background: none;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1;
}
.calendar-heatmap-grid {
  position: relative;
  max-width: min-content;
  z-index: 2;
}
.heatmap-cell {
  position: absolute;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-heatmap .month-label {
  font-weight: 500;
  letter-spacing: 0.5px;
}
.tooltip-title {
  font-weight: bold;
}
.tooltip-date {
  font-size: 12px;
  color: #767676;
}
.calendar-heatmap-footer {
  user-select: none;
}
</style>