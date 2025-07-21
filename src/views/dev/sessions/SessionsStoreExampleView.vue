<template>
  <div class="p-6">
    <div class="mb-8 p-4 rounded-lg border">
      <div class="flex flex-row items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Управление сессиями</h1>
          <p class="text-sm text-muted-foreground mt-1">Создавайте и редактируйте игровые сессии</p>
        </div>
        <div class="flex flex-row gap-3">
          <Input v-model.trim="name" placeholder="Новое название сессии" class="min-w-[200px]" />
          <Button @click="createSession">
            Новая сессия
          </Button>
        </div>
      </div>
    </div>
    <div v-if="sessions.sessions.length === 0" class="p-8 text-center border rounded-lg">
      <p class="text-muted-foreground">У вас пока нет созданных сессий</p>
    </div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card v-for="session in sessions.sessions" :key="session.getKey()" class="bg-muted/50 hover:border-primary"
        :class="{ 'border-primary': selectedSession.is(session) }">
        <form @submit.prevent="saveEdit(session)">
          <CardHeader class="pb-3">
            <CardTitle>
              <div v-if="editingItemKey === session.getKey()">
                <Input v-model.trim="editingName" placeholder="Название сессии" class="w-full" autoFocus />
              </div>
              <div v-else @click="initEdit(session)" class="cursor-pointer">
                <p class="font-medium mb-2">
                  {{ session.name }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">ID: {{ session.getKey() }}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardFooter class="flex justify-end gap-2 pt-3 border-t">
            <template v-if="editingItemKey === session.getKey()">
              <Button type="button" variant="outline" @click="resetEdit">
                Отмена
              </Button>
              <Button type="submit">
                Сохранить
              </Button>
            </template>
            <template v-else>
              <Button type="button" variant="outline" @click="toggleSelect(session)">
                {{ selectedSession.is(session) ? 'Отменить' : 'Выбрать' }}
              </Button>
              <Button type="button" variant="destructive" @click="removeSession(session)">
                Удалить
              </Button>
            </template>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSelectedSessionStore, useSessionsStore } from '@/stores/sessions'
import type { ModelKey } from '@/stores/common.ts'
import type { GameSession } from '@/stores/sessions/session.ts'

const sessions = useSessionsStore()
const selectedSession = useSelectedSessionStore()

const name = ref<string>('')
const editingItemKey = ref<ModelKey | undefined>(undefined)
const editingName = ref<string>('')

function resetEdit() {
  editingItemKey.value = undefined
  editingName.value = ''
}

function initEdit(session: GameSession) {
  editingItemKey.value = session.getKey()
  editingName.value = session.name
}

function saveEdit(session: GameSession) {
  session.name = editingName.value
  sessions.save(session)
  resetEdit()
}

function toggleSelect(session: GameSession) {
  if (selectedSession.is(session)) {
    selectedSession.select(undefined)
  } else {
    selectedSession.select(session)
  }
}

function removeSession(session: GameSession) {
  if (confirm(`Удалить сессию "${session.name}"?`)) {
    sessions.remove(session)
    if (selectedSession.is(session)) {
      selectedSession.select(undefined)
    }
  }
}

function createSession() {
  if (name.value.trim()) {
    sessions.create(name.value)
    name.value = ''
  }
}
</script>
