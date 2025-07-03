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
        <TableCell><table-avatar /></TableCell>
        <TableCell>{{ character.name }}</TableCell>
        <TableCell>{{ character.class }}</TableCell>
        <TableCell class="text-right"> {{ character.level }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { IngamePlayer } from '@/types/player'

const props = defineProps<{
  characters: IngamePlayer[]
}>()
</script>
