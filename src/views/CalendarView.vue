<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import Button from '@/components/ui/button/Button.vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import type { CalendarOptions } from '@fullcalendar/core/index.js'
import TitleBar from '@/components/TitleBar.vue'

const calendarRef = ref()
const currentTitle = ref('')

const updateTitle = () => {
  currentTitle.value = calendarRef.value?.getApi()?.view?.title || ''
}

const goPrev = () => {
  calendarRef.value?.getApi()?.prev()
  updateTitle()
}
const goNext = () => {
  calendarRef.value?.getApi()?.next()
  updateTitle()
}
const goToday = () => {
  calendarRef.value?.getApi()?.today()
  updateTitle()
}

onMounted(() => {
  updateTitle()
})

const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: 'pt-br',
  events: [
    { title: 'Pagar crunchroll', date: '2025-06-05', color: '#3b82f6' },
    { title: 'Dia dos Namorados', date: '2025-06-12', color: '#a78bfa' },
    { title: 'Corpo de Deus', date: '2025-06-19', color: '#a78bfa' },
    { title: 'Pagar crunchroll', date: '2025-07-05', color: '#3b82f6' },
  ],
  height: 'auto',
  headerToolbar: false,
}
</script>

<template>
  <div class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-8">
    <div class="mx-auto grid w-full max-w-6xl gap-2">
      <TitleBar
        title="Calendário"
        subtitle="Visualize suas tarefas criadas e salvas diretamente no calendário"
      />
      <div class="flex items-center justify-between mb-4">
        <div class="flex gap-2">
          <Button variant="outline" @click="goPrev">
            <ChevronLeftIcon class="w-4 h-4" />
          </Button>
          <Button variant="outline" @click="goToday">
            Hoje
          </Button>
          <Button variant="outline" @click="goNext">
            <ChevronRightIcon class="w-4 h-4" />
          </Button>
        </div>
        <div class="text-lg font-medium text-end flex-1">
          {{ currentTitle }}
        </div>
      </div>
      <FullCalendar
        ref="calendarRef"
        :options="calendarOptions"
        @datesSet="updateTitle"
        @mounted="updateTitle"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.fc-scrollgrid) {
  border: 1px solid #e5e7eb !important;
  border-radius: calc(var(--radius) - 2px);
  overflow: hidden;
}

:deep(.fc-scrollgrid-sync-table th:first-child),
:deep(.fc-scrollgrid-sync-table td:first-child) {
  border-left: none !important;
}
:deep(.fc-scrollgrid-sync-table th:last-child),
:deep(.fc-scrollgrid-sync-table td:last-child) {
  border-right: none !important;
}
:deep(.fc-scrollgrid-sync-table tr:first-child th) {
  border-top: none !important;
}
:deep(.fc-scrollgrid-sync-table tr:last-child td),
:deep(.fc-scrollgrid-sync-table tr:last-child th) {
  border-bottom: none !important;
}
:deep(.fc-scrollgrid-sync-table tr > td:last-child),
:deep(.fc-scrollgrid-sync-table tr > th:last-child) {
  border-right: none !important;
}
:deep(.fc-scrollgrid-sync-table tr:last-child > td),
:deep(.fc-scrollgrid-sync-table tr:last-child > th) {
  border-bottom: none !important;
}

:deep(.fc-scrollgrid-section:last-child),
:deep(.fc-scrollgrid-section-liquid),
:deep(.fc-scrollgrid-section > td:last-child),
:deep(.fc-scrollgrid-section > th:last-child) {
  border-right: none !important;
  border-bottom: none !important;
}

:deep(.fc-col-header-cell) {
  background: #F5F7F9 !important;
  border-bottom: 1.5px solid #e5e7eb !important;
  box-shadow: 0 1px 0 0 #e5e7eb;
}
:deep(.fc-col-header-cell-cushion) {
  color: #65738A !important;
  font-weight: 500;
  letter-spacing: 0.01em;
}

:deep(.fc-scrollgrid),
:deep(.fc-scrollgrid-sync-table),
:deep(.fc-scrollgrid-sync-table td),
:deep(.fc-scrollgrid-sync-table th) {
  background: #fff !important;
}
</style>