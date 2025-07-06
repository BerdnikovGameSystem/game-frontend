<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>{{ title }}</AccordionTrigger>
      <AccordionContent class="flex-column">
        <players-table
          :characters="characters"
          class="mb-4"
          @delete="removeCharacter"
        />
        <div class="flex justify-end">
          <PlayersCreation :button_title="button_name" @create="addCharacter" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { IngamePlayer, Player } from '@/types/player'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  button_name: {
    type: String
  }
})

const characters = ref<IngamePlayer[]>([])

function toIngamePlayer(p: Player): IngamePlayer {
  return {
    ...p,
    hits: p.maxHits,
    energy: p.maxEnergy
  }
}

function addCharacter(player: Player) {
  characters.value.push(toIngamePlayer(player))
}

function removeCharacter(index: number) {
  characters.value.splice(index, 1)
}
</script>
