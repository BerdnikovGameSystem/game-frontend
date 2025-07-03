<template>
  <Sheet>
    <SheetTrigger class="bg-white text-black cursor-pointer p-2 rounded-lg">
      {{ button_title }}
    </SheetTrigger>
    <SheetContent class="w-full">
      <SheetHeader>
        <SheetTitle class="mb-4">{{ button_title }}</SheetTitle>
        <SheetDescription>
          <creation-form @create="handleCreate" />
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Player } from '@/types/player'

const props = defineProps({
  button_title: {
    type: String
  }
})

const emit = defineEmits<{
  (e: 'create', player: Player): void
}>()

function handleCreate(player: Player) {
  emit('create', player)
}
</script>
