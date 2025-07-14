<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'
import { createResident } from '@/services/residentService'

const apartment = ref('')
const block = ref('')
const phone = ref('')
const active = ref(true)
const { toast } = useToast()
const router = useRouter()
const isPending = ref(false)

const handleRegisterResident = async () => {
  isPending.value = true
  try {
    await createResident({
      apartment: apartment.value,
      block: block.value || null,
      phone: phone.value || null,
      active: active.value,
    })
    toast({
      title: 'Morador cadastrado!',
      description: 'Agora você pode agendar visitas.',
      variant: 'default',
    })
    apartment.value = ''
    block.value = ''
    phone.value = ''
    router.push('/visits')
  } catch (e: any) {
    toast({
      title: 'Erro',
      description: e.message || 'Não foi possível cadastrar o morador.',
      variant: 'destructive',
    })
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center px-4">
    <Card class="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl">Cadastro de Morador</CardTitle>
        <CardDescription>Preencha seus dados de apartamento para liberar o agendamento de visitas.</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleRegisterResident" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="apartment">Apartamento *</Label>
            <Input id="apartment" v-model="apartment" placeholder="Ex: 101" required maxlength="10" />
          </div>
          <div class="grid gap-2">
            <Label for="block">Bloco</Label>
            <Input id="block" v-model="block" placeholder="Ex: A" maxlength="5" />
          </div>
          <div class="grid gap-2">
            <Label for="phone">Telefone</Label>
            <Input id="phone" v-model="phone" placeholder="Ex: 11999999999" maxlength="20" />
          </div>
          <Button type="submit" class="w-full" :disabled="isPending">
            Cadastrar Morador
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>