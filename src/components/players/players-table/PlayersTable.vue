<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>Аватар</TableHead>
        <TableHead>Имя</TableHead>
        <TableHead>Класс</TableHead>
        <TableHead class="text-right">Уровень</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(character, index) in characters" :key="index">
        <TableCell><app-avatar /></TableCell>
        <TableCell>{{ character.name }}</TableCell>
        <TableCell>{{ character.class }}</TableCell>
        <TableCell class="flex justify-end items-center gap-2">
          <span>{{ character.level }}</span>
          <i-radix-icons-exit
            class="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
            @click.stop="emit('delete', index)"
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { IngamePlayer } from '@/types/player'

const props = defineProps<{
  characters: IngamePlayer[]
}>()

const emit = defineEmits(['delete'])
</script>
