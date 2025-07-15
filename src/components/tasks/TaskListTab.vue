<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAllVisits } from '@/services/visitService'
import type { IVisit } from '@/interfaces/IVisit'

const visits = ref<IVisit[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadVisits = async () => {
  isLoading.value = true
  try {
    visits.value = await fetchAllVisits()
    error.value = null
  } catch (e: any) {
    error.value = e.message || 'Erro ao carregar visitas'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadVisits)
defineExpose({ loadVisits })
</script>
<template>
  <div class="mx-auto grid w-full max-w-6xl">
    <div v-if="isLoading" class="text-center py-8">Carregando...</div>
    <div v-else-if="error" class="text-red-500 text-center py-8">{{ error }}</div>
    <div v-else>
      <div v-if="visits.length === 0" class="text-center py-8 text-gray-500">Nenhuma visita encontrada.</div>
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="visit in visits"
          :key="visit.id"
          class="flex items-center justify-between rounded-lg border bg-white shadow-sm px-4 py-3 hover:shadow-md transition-shadow duration-150"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div class="flex items-center justify-center rounded-full bg-primary/10 w-10 h-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="min-w-0">
              <div class="font-semibold text-base text-gray-900 truncate">{{ visit.visitor_name }}</div>
              <div class="text-xs text-gray-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 inline-block text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(visit.visit_date) }}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-700">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10a4 4 0 018 0v2a4 4 0 01-8 0v-2zm8 0a4 4 0 018 0v2a4 4 0 01-8 0v-2z" />
              </svg>
              <span class="font-medium">Tel:</span> {{ visit.visitor_phone || '-' }}
            </div>
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m-4-5v9" />
              </svg>
              <span class="font-medium">Obs:</span> {{ visit.notes || '-' }}
            </div>
            <template v-if="visit.car_model || visit.car_color || visit.license_plate">
              <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13l2-2m0 0l7-7 7 7M13 16v6h-2v-6m-4 0h10" />
                </svg>
                <span class="font-medium">Modelo:</span> {{ visit.car_model || '-' }}
              </div>
              <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2" />
                </svg>
                <span class="font-medium">Cor:</span> {{ visit.car_color || '-' }}
              </div>
              <div class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="6" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span class="font-medium">Placa:</span> {{ visit.license_plate || '-' }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>