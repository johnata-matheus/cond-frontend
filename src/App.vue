<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Toaster } from '@/components/ui/toast';
import Header from '@/components/layout/Header.vue'

const route = useRoute();
</script>

<template>
  <div>
    <Header v-if="!route.meta.hideHeader" />
    <main>
      <RouterView />
    </main>
    <Toaster />
  </div>
  <VueQueryDevtools />
</template>

