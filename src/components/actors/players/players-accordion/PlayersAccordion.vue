<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>{{ title }}</AccordionTrigger>
      <AccordionContent class="flex-column">
        <players-table :players="players.list" class="mb-4" @delete="removeCharacter" @edit="editCharacter"
   />
        <div class="flex justify-end">
          <PlayersCreation :button_title="button_name" :playerToEdit="playerToEdit" v-model:open="sheetOpen"
            @create="addCharacter" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePlayersStore } from '@/stores/actors/players'
import { Player, type PlayerStruct } from '@/stores/actors/players/player.ts'
import type { ModelKey } from '@/stores/common.ts'

const sheetOpen = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button_name: {
    type: String,
    default: 'Добавить',
  },
})


const players = usePlayersStore()
const editingIndex = ref<ModelKey | undefined>(undefined)
const playerToEdit = ref<Player | undefined>(undefined)

function addCharacter(player: PlayerStruct) {
  if (editingIndex.value) {
    players.updateByKey(editingIndex.value, player)
  } else {
    players.create(player)
  }

  sheetOpen.value = false
  editingIndex.value = undefined
  playerToEdit.value = undefined
}

function removeCharacter(player: ModelKey | Player) {
  players.remove(player)
}

function editCharacter(player: ModelKey) {
  playerToEdit.value = players.getByKey(player)
  editingIndex.value = player
  sheetOpen.value = true
}

watch(sheetOpen, (val) => {
  if (!val) {
    playerToEdit.value = undefined
    editingIndex.value = undefined
  }
})
</script>
