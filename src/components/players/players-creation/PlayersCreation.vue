<template>
  <Sheet :open="props.open" @update:open="emit('update:open', $event)">
    <SheetTrigger as-child>
      <Button class="cursor-pointer p-2 rounded-lg">
        {{ button_title }}
      </Button>
    </SheetTrigger>

    <SheetContent class="w-full max-w-md">
      <SheetHeader>
        <SheetTitle class="mb-4">{{ button_title }}</SheetTitle>
        <SheetDescription>
          <players-form :player="playerToEdit" @create="handleCreate" />
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Player } from '@/types/player'

const props = defineProps<{
  button_title: string
  playerToEdit?: Player | null
  open?: boolean
}>()

const emit = defineEmits<{
  (e: 'create', player: Player): void
  (e: 'update:open', value: boolean): void
}>()

function handleCreate(player: Player) {
  emit('create', player)
  emit('update:open', false)
}


</script>
