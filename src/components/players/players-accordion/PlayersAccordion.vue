<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>{{ title }}</AccordionTrigger>
      <AccordionContent class="flex-column">
        <players-table :characters="characters" class="mb-4" @delete="removeCharacter" @edit="editCharacter" />
        <div class="flex justify-end">
          <PlayersCreation :button_title="button_name" :playerToEdit="playerToEdit" v-model:open="sheetOpen"
            @create="addCharacter" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { IngamePlayer, Player } from '@/types/player'
const sheetOpen = ref(false)
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button_name: {
    type: String,
    default: 'Добавить'
  }
})

const characters = ref<IngamePlayer[]>([])
const editingIndex = ref<number | null>(null)
const playerToEdit = ref<Player | null>(null)

function toIngamePlayer(p: Player): IngamePlayer {
  return {
    ...p,
    hits: p.maxHits,
    energy: p.maxEnergy
  }
}

function toPlayer(p: IngamePlayer): Player {
  return {
    name: p.name,
    class: p.class,
    maxHits: p.hits,
    maxEnergy: p.energy,
    kd: p.kd || 0,
    speed: p.speed || 0,
    level: p.level || 1
  }
}

function addCharacter(player: Player) {
  if (editingIndex.value !== null) {
    characters.value[editingIndex.value] = toIngamePlayer(player)
    editingIndex.value = null
    playerToEdit.value = null
  } else {
    characters.value.push(toIngamePlayer(player))
  }
}

function removeCharacter(index: number) {
  characters.value.splice(index, 1)
}

function editCharacter(index: number) {
  playerToEdit.value = toPlayer(characters.value[index])
  editingIndex.value = index
  sheetOpen.value = true
}
</script>
