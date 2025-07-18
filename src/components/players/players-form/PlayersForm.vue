<template>
  <div class="flex flex-col gap-y-3">
    <Label class="flex flex-col items-start">Имя
      <Input v-model="formPlayer.name" />
    </Label>
    <Label class="flex flex-col items-start">Уровень
      <Input type="number" v-model.number="formPlayer.level" />
    </Label>
    <Label class="flex flex-col items-start">Класс
      <app-select
        select-title="Классы"
        select-placeholder="Выберите класс"
        :select-items="classes"
        v-model="formPlayer.class"
      />
    </Label>
    <Label class="flex flex-col items-start">Макс. Хиты
      <Input type="number" v-model.number="formPlayer.maxHits" />
    </Label>
    <Label class="flex flex-col items-start">KD
      <Input type="number" v-model.number="formPlayer.kd" />
    </Label>
    <Label class="flex flex-col items-start">Макс. Энергия
      <Input type="number" v-model.number="formPlayer.maxEnergy" />
    </Label>
    <Label class="flex flex-col items-start">Скорость
      <Input type="number" v-model.number="formPlayer.speed" />
    </Label>
    <Button @click="createPlayer" class="my-5">
      {{ isEditing ? 'Сохранить' : 'Создать' }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue'
import type { Player } from '@/types/player'

const props = defineProps<{
  player?: Player | null
}>()

const emit = defineEmits<{
  (e: 'create', data: Player): void
}>()

const classes = [
  { value: 'thief', label: 'Вор' },
  { value: 'bard', label: 'Бард' },
  { value: 'mage', label: 'Маг' }
]

const formPlayer = ref<Player>({
  name: '',
  maxHits: 10,
  class: '',
  level: 0,
  kd: 1,
  maxEnergy: 5,
  speed: 10
})


watch(
  () => props.player,
  (newPlayer) => {
    if (newPlayer) {
      formPlayer.value = { ...newPlayer }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const isEditing = computed(() => props.player !== null)

function createPlayer() {
  emit('create', { ...formPlayer.value })
  if (!isEditing.value) {
    resetForm()
  }
}

function resetForm() {
  formPlayer.value = {
    name: '',
    maxHits: 10,
    class: '',
    level: 0,
    kd: 1,
    maxEnergy: 5,
    speed: 10
  }
}
</script>
