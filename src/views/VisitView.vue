<script setup lang="ts">
import { ref } from 'vue'
import TitleBar from '@/components/TitleBar.vue'
import CreateVisitDialog from '@/components/tasks/CreateVisitDialog.vue'
import TaskListTab from '@/components/tasks/TaskListTab.vue'

const isDialogOpen = ref(false)
const openDialog = () => { isDialogOpen.value = true }
const taskListTab = ref()

const handleVisitCreated = () => {
  isDialogOpen.value = false
  taskListTab.value?.loadVisits()
}
</script>

<template>
  <div class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-8">
    <div class="mx-auto grid w-full max-w-6xl gap-2">
      <TitleBar
        title="Visitas"
        subtitle="Gerencie suas visitas"
        text-button="Agendar visita"
        @button-click="openDialog"
      />

      <TaskListTab ref="taskListTab" />
    </div>
    <CreateVisitDialog v-model:open="isDialogOpen" @visit-created="handleVisitCreated"/>
  </div>
</template>