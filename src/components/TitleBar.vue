<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  title: string
  subtitle: string
  textButton?: string
}>()

const emit = defineEmits(['button-click'])

const onButtonClick = () => {
  emit('button-click')
}
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center justify-between mb-5">
    <div>
      <h1 class="text-3xl font-semibold mb-1">{{ title }}</h1>
      <span class="text-3x1">{{ subtitle }}</span>
    </div>
    <Button v-if="props.textButton" @click="onButtonClick">
      <Plus />
      {{ textButton }}
    </Button>
  </div>
</template>
