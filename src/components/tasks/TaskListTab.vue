<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAllVisits } from '@/services/visitService'

const visits = ref([])
const isLoading = ref(true)
const error = ref(null)

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

// Função para atualizar a lista de visitas
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

// Exporte para ser usada no componente pai (caso use <TaskListTab @visit-created />)
defineExpose({ loadVisits })
</script>

<template>
  <div class="mx-auto grid w-full max-w-6xl">
    <div v-if="isLoading" class="text-center py-8">Carregando...</div>
    <div v-else-if="error" class="text-red-500 text-center py-8">{{ error }}</div>
    <div v-else>
      <div v-if="visits.length === 0" class="text-center py-8 text-gray-500">Nenhuma visita encontrada.</div>
      <div v-else class="grid gap-6">
        <div
          v-for="visit in visits"
          :key="visit.id"
          class="rounded-lg border bg-white shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <div class="font-semibold text-lg">{{ visit.visitor_name }}</div>
            <div class="text-sm text-gray-500 mb-2">
              {{ formatDate(visit.visit_date) }}
            </div>
            <div class="text-sm"><span class="font-medium">Telefone:</span> {{ visit.visitor_phone || '-' }}</div>
            <div class="text-sm"><span class="font-medium">Observações:</span> {{ visit.notes || '-' }}</div>
          </div>
          <div v-if="visit.car_model || visit.car_color || visit.license_plate" class="flex flex-col gap-1">
            <div class="text-sm"><span class="font-medium">Modelo:</span> {{ visit.car_model || '-' }}</div>
            <div class="text-sm"><span class="font-medium">Cor:</span> {{ visit.car_color || '-' }}</div>
            <div class="text-sm"><span class="font-medium">Placa:</span> {{ visit.license_plate || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>