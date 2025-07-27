<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>Аватар</TableHead>
        <TableHead>Имя</TableHead>
        <TableHead>Класс</TableHead>
        <TableHead>Уровень</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="player in players" :key="player.getKey()">
        <TableCell>
          <app-avatar />
        </TableCell>
        <TableCell>{{ player.name }}</TableCell>
        <TableCell>{{ player.type }}</TableCell>
        <TableCell>
          <span>{{ player.level }}</span>
        </TableCell>
        <TableCell>
          <div class="flex h-full flex-row items-center justify-center gap-2">
            <Button variant="outline" @click="emit('edit', player.getKey())">
              <i-radix-icons-pencil1 />
            </Button>
            <Button variant="outline" @click="emit('delete', player.getKey())">
              <i-radix-icons-trash />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
import type { Player } from '@/stores/actors/players/player.ts'

const props = defineProps<{
  players: Player[],
}>()

const emit = defineEmits(['delete', 'edit'])
</script>
