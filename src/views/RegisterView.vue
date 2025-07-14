<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import { register } from '@/services/authService'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const { toast } = useToast()
const router = useRouter()
const isPending = ref(false)

const handleRegister = async () => {
  isPending.value = true
  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      role: 'morador'
    })
    toast({
      title: 'Cadastro realizado!',
      description: 'Agora preencha seus dados de morador.',
      variant: 'default',
    })
    router.push('/register-resident')
  } catch (e: any) {
    toast({
      title: 'Erro',
      description: e.message || 'Não foi possível registrar.',
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
        <CardTitle class="text-2xl">Cadastro</CardTitle>
        <CardDescription>Crie sua conta para acessar o sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="handleRegister">
          <div class="grid gap-2">
            <Label for="name">Nome</Label>
            <Input id="name" v-model="name" type="text" placeholder="Seu nome" required maxlength="255" />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="Seu e-mail" required maxlength="255" />
          </div>
          <div class="grid gap-2">
            <Label for="password">Senha</Label>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Sua senha"
                required
                minlength="8"
                class="pr-10"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
              </button>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="password_confirmation">Confirme a senha</Label>
            <Input
              id="password_confirmation"
              v-model="passwordConfirmation"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Confirme sua senha"
              required
              minlength="8"
            />
          </div>
          <Button type="submit" class="w-full" :disabled="isPending">Cadastrar</Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Já tem uma conta?
          <router-link to="/login" class="underline">Entrar</router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>