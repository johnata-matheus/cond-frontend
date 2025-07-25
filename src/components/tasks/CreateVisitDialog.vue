<script setup lang="ts">
import { computed, h, nextTick, reactive, ref } from 'vue'
import { z } from 'zod'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Button from '@/components/ui/button/Button.vue'
import Switch from '@/components/ui/switch/Switch.vue'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { CheckIcon } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { createVisit } from '@/services/visitService'

function getToday() {
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  return today.toISOString().slice(0, 10)
}
const minDate = getToday()

const visitSchema = z.object({
  visitor_name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  visitor_phone: z.string().min(8, 'Telefone inválido.').optional(),
  visit_date: z.string().min(1, 'Informe a data.'),
  car_model: z.string().optional(),
  car_color: z.string().optional(),
  license_plate: z.string().optional(),
  notes: z.string().optional(),
})

const newVisit = ref({
  visitor_name: '',
  visitor_phone: '',
  visit_date: '',
  car_model: '',
  car_color: '',
  license_plate: '',
  notes: '',
})

const showCarFields = ref(false)

const isFormValid = computed(() => visitSchema.safeParse(newVisit.value).success)

const touchedFields = reactive<Record<string, boolean>>({
  visitor_name: false,
  visitor_phone: false,
  visit_date: false,
  car_model: false,
  car_color: false,
  license_plate: false,
  notes: false,
})

const handleBlur = (field: string) => {
  touchedFields[field] = true
}

const errors = computed(() => {
  const result = visitSchema.safeParse(newVisit.value)
  if (result.success) return {}
  const allErrors = Object.fromEntries(
    Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [
      key,
      value?.[0] || '',
    ])
  )
  return Object.fromEntries(Object.entries(allErrors).filter(([key]) => touchedFields[key]))
})

const resetForm = async () => {
  newVisit.value = {
    visitor_name: '',
    visitor_phone: '',
    visit_date: '',
    car_model: '',
    car_color: '',
    license_plate: '',
    notes: '',
  }
  showCarFields.value = false
  Object.keys(touchedFields).forEach(k => touchedFields[k] = false)
  await nextTick()
}

const { toast } = useToast()
const isPending = ref(false)
const emit = defineEmits(['visit-created'])

const isDialogOpen = ref(false)
const closeDialog = async () => {
  await resetForm()
  isDialogOpen.value = false
}

const handleCreateVisit = async () => {
  Object.keys(touchedFields).forEach(k => touchedFields[k] = true)
  if (!isFormValid.value) return
  isPending.value = true
  try {
    const payload = {
      ...newVisit.value,
      car_model: newVisit.value.car_model || null,
      car_color: newVisit.value.car_color || null,
      license_plate: newVisit.value.license_plate || null,
      notes: newVisit.value.notes || null,
      visitor_phone: newVisit.value.visitor_phone || null,
    }
    await createVisit(payload)
    toast({
      title: 'Visita criada com sucesso!',
      description: h('div', { class: 'flex items-center gap-2' }, [
        h(CheckIcon, { class: 'text-green-500 w-5 h-5' }),
        h('span', 'A nova visita foi adicionada.'),
      ]),
      variant: 'default',
      duration: 4000,
    })
    emit('visit-created')
    closeDialog()
  } catch (e: any) {
    toast({
      title: 'Erro',
      description: e.message || 'Não foi possível criar a visita.',
      variant: 'destructive',
    })
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen" @update:open="closeDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar Nova Visita</DialogTitle>
        <DialogDescription>Preencha os campos abaixo com os detalhes da visita</DialogDescription>
      </DialogHeader>
      <div class="grid gap-3">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <Label for="visitor_name">Nome do Visitante</Label>
            <Input id="visitor_name" v-model="newVisit.visitor_name" @blur="handleBlur('visitor_name')" />
            <span v-if="errors.visitor_name" class="text-red-500 text-sm">{{ errors.visitor_name }}</span>
          </div>
          <div>
            <Label for="visitor_phone">Telefone</Label>
            <Input id="visitor_phone" v-model="newVisit.visitor_phone" @blur="handleBlur('visitor_phone')" />
            <span v-if="errors.visitor_phone" class="text-red-500 text-sm">{{ errors.visitor_phone }}</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <Label for="visit_date">Data da Visita</Label>
            <Input
              id="visit_date"
              type="date"
              v-model="newVisit.visit_date"
              @blur="handleBlur('visit_date')"
              :min="minDate"
            />
            <span v-if="errors.visit_date" class="text-red-500 text-sm">{{ errors.visit_date }}</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2">
          <Switch v-model="showCarFields" />
          <Label>Possui veículo?</Label>
        </div>
        <div v-if="showCarFields" class="grid grid-cols-2 gap-3">
          <div>
            <Label for="car_model">Modelo do Carro</Label>
            <Input id="car_model" v-model="newVisit.car_model" @blur="handleBlur('car_model')" />
          </div>
          <div>
            <Label for="car_color">Cor do Carro</Label>
            <Input id="car_color" v-model="newVisit.car_color" @blur="handleBlur('car_color')" />
          </div>
          <div class="col-span-2">
            <Label for="license_plate">Placa</Label>
            <Input id="license_plate" v-model="newVisit.license_plate" @blur="handleBlur('license_plate')" />
          </div>
        </div>
        <div>
          <Label for="notes">Observações</Label>
          <Input id="notes" v-model="newVisit.notes" @blur="handleBlur('notes')" />
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleCreateVisit" :disabled="isPending">Salvar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>