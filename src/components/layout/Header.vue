<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/services/userService' // ajuste o path se necessário

defineOptions({ name: 'AppHeader' })

const user = ref(null)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    user.value = await fetchCurrentUser()
  } catch (e: any) {
    error.value = e.message || 'Erro ao buscar usuário'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <a href="#" class="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <RouterLink 
          to="/visits" 
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Visitas
        </RouterLink>

        <RouterLink
          to="/calendar"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Calendário
        </RouterLink>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline" size="icon" class="shrink-0 md:hidden">
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <a href="#" class="flex items-center gap-2 text-lg font-semibold">
              <Package2 class="h-6 w-6" />
              <span class="sr-only">Acme Inc</span>
            </a>
            <RouterLink to="/" class="text-muted-foreground hover:text-foreground"> Dashboard </RouterLink>
            <RouterLink to="/calendar" class="text-muted-foreground hover:text-foreground"> Calendário </RouterLink>
            <RouterLink to="/tasks" class="text-muted-foreground hover:text-foreground"> Tarefas </RouterLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
          <div class="relative">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full overflow-hidden p-0">
              <template v-if="user && user.profile_photo_url">
                <img
                  :src="user.profile_photo_url"
                  alt="Avatar"
                  class="h-10 w-10 rounded-full object-cover"
                />
              </template>
              <template v-else>
                <CircleUser class="h-5 w-5" />
              </template>
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  </div>
</template>