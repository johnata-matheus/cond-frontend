<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import { login } from '@/services/authService'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const { toast } = useToast()
const router = useRouter()
const isPending = ref(false)

const handleLogin = async () => {
  isPending.value = true
  try {
    await login({ email: email.value, password: password.value })
    toast({
      title: 'Login realizado!',
      description: 'Bem-vindo!',
      variant: 'default',
    })
    router.push('/visits')
  } catch (e: any) {
    toast({
      title: 'Erro',
      description: e.message || 'Não foi possível entrar.',
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
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Acesse sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="handleLogin">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="email" type="email" placeholder="Seu e-mail" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Senha</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">Esqueceu a senha?</a>
            </div>
            <div class="relative">
              <Input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Sua senha"
                required
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
          <Button type="submit" class="w-full" :disabled="isPending">Login</Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Não tem uma conta?
          <router-link to="/register" class="underline">Cadastre-se</router-link>
        </div>
      </CardContent>
    </Card>
  </div>
</template>