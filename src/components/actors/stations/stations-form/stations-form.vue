<template>
  <form class="flex flex-col gap-y-3" @submit.prevent="createPlayer">
    <Label class="flex flex-col items-start">Имя
      <Input v-model="formPlayer.name" />
    </Label>
    <Label class="flex flex-col items-start">Уровень
      <Input type="number" v-model.number="formPlayer.level" />
    </Label>
    <Label class="flex flex-col items-start">Класс
      <app-select select-title="Классы" select-placeholder="Выберите класс" :select-items="classes"
        v-model="formPlayer.type" />
    </Label>
    <Label class="flex flex-col items-start">Макс. Хиты
      <Input type="number" v-model.number="formPlayer.maxHealth" />
    </Label>
    <Label class="flex flex-col items-start">KD
      <Input type="number" v-model.number="formPlayer.kd" />
    </Label>
    <Label class="flex flex-col items-start">Спецочки
      <Input type="number" v-model.number="formPlayer.maxMana" />
    </Label>
    <Label class="flex flex-col items-start">Скорость
      <Input type="number" v-model.number="formPlayer.speed" />
    </Label>
    <Button type="submit" class="my-5">
      {{ isEditing ? 'Сохранить' : 'Создать' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Player, type PlayerStruct } from '@/stores/actors/players/player.ts'
import { useSelectedSessionStore } from '@/stores/sessions'

const selectedSession = useSelectedSessionStore()

const props = defineProps<{
  player?: Player | null
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'create', data: PlayerStruct): void
}>()

const classes = [
  { value: 'thief', label: 'Вор' },
  { value: 'bard', label: 'Бард' },
  { value: 'mage', label: 'Маг' },
]

const formPlayer = ref<PlayerStruct>(emptyPlayer())

function emptyPlayer(): PlayerStruct {
  return {
    session: selectedSession.key ?? '',
    name: '',
    maxHealth: 10,
    type: '',
    level: 0,
    kd: 10,
    maxMana: 5,
    speed: 30,
  }
}

const isEditing = computed(() => props.player !== null && props.player !== undefined)

watch(
  () => props.player,
  (newPlayer) => {
    if (newPlayer) {
      formPlayer.value = newPlayer.toObject()
    } else {
      formPlayer.value = emptyPlayer()
    }
  },
  { immediate: true }
)

watch(
  () => props.isOpen,
  (val) => {
    if (!val) {
      formPlayer.value = emptyPlayer()
    }
  }
)

function createPlayer() {
  emit('create', { ...formPlayer.value })
}
</script>
