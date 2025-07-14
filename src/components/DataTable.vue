<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import type { IVisitor } from '@/config/visitColumns';

const props = defineProps<{
  columns: ColumnDef<IVisitor, string>[]
  data: IVisitor[]
}>()

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <div class="border rounded-b-md bg-white overflow-x-auto">
    <Table class="w-full table-auto border-collapse">
      <TableHeader class="bg-gray-50">
        <TableRow>
          <TableHead class="px-4 py-2 text-left w-[30%]">Título</TableHead>
          <TableHead class="px-4 py-2 text-left w-[55%] hidden md:table-cell">Descrição</TableHead>
          <TableHead class="px-4 py-2 text-left w-[15%]">Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b h-12"
            :class="{
              'line-through text-gray-500': row.original.status === 'completed',
            }"
          >
            <TableCell class="px-4 py-2">
              <FlexRender :render="row.getValue('title')" />
            </TableCell>
            <TableCell class="px-4 py-2 hidden md:table-cell">
              <FlexRender :render="row.getValue('description')" />
            </TableCell>
            <TableCell class="px-4 py-2">
              <FlexRender :render="row.getValue('status')" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="3" class="h-12 text-center">Sem resultados.</TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>