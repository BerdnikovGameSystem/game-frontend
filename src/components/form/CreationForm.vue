  <template>
    <div class="flex flex-col gap-y-3">
      <Label class="flex flex-col items-start">Имя
        <Input v-model="player.name" />
      </Label>
      <Label class="flex flex-col items-start">Уровень
        <Input type="number" v-model.number="player.level" />
      </Label>
      <Label class="flex flex-col items-start">Класс
        <form-select select_title="Классы" select_placeholder="Выберите класс" :select_items="classes"
          v-model="player.class" />
      </Label>
      <Label class="flex flex-col items-start">Макс. Хиты
        <Input type="number" v-model.number="player.maxHits" />
      </Label>
      <Label class="flex flex-col items-start">KD
        <Input type="number" step="0.1" v-model.number="player.kd" />
      </Label>
      <Label class="flex flex-col items-start">Макс. Энергия
        <Input type="number" v-model.number="player.maxEnergy" />
      </Label>
      <Label class="flex flex-col items-start">Скорость
        <Input type="number" v-model.number="player.speed" />
      </Label>
      <Button v-on:click="createPlayer" class="my-5">Создать</Button>
    </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
import type { Player } from '@/types/player'

const emit = defineEmits<{
  (e: 'create', data: Player): void
}>()

const classes = [
  { value: 'thief', label: 'Вор' },
  { value: 'bard', label: 'Бард' },
  { value: 'mage', label: 'Маг' }
]
const player = ref<Player>({
  name: '',
  maxHits: 10,
  class: " ",
  level: 0,
  kd: 1,
  maxEnergy: 5,
  speed: 10
})

function createPlayer() {
  emit('create', player.value)
  player.value = {
    name: '',
    maxHits: 10,
    class: "",
    level: 0,
    kd: 1,
    maxEnergy: 5,
    speed: 10
  }
}
</script>
