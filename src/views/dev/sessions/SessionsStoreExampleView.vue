<template lang="pug">
.p-4.flex.flex-col.gap-y-4.w-64
  Input(v-model.trim='name', placeholder='Название сессии')
  Button(@click='createSession') Создать
.p-4.flex.flex-col.gap-y-4.w-96
  form(
    v-for='session in sessions.sessions',
    :key='session.getKey()',
    @submit.prevent='saveEdit(session)'
  )
    card(:class='{ "border-white": selectedSession.is(session) }')
      card-header
        card-title
          Input(
            v-model.trim='editingName',
            placeholder='Название сессии',
            v-if='editingItemKey === session.getKey()'
          )
          p.cursor-pointer(v-else, @click='initEdit(session)') {{ session.name }}
      card-content
        i {{ session.getKey() }}
      card-footer.gap-x-2
        template(v-if='editingItemKey === session.getKey()')
          card-action
            Button Сохранить
          card-action
            Button(type='button', variant='ghost', @click='resetEdit') Отменить
        template(v-else)
          card-action
            Button(
              type='button',
              @click='selectedSession.select(undefined)',
              v-if='selectedSession.is(session)'
            ) Отменить выбор
            Button(type='button', @click='selectedSession.select(session)', v-else) Выбрать
          card-action
            Button(type='button', variant='destructive', @click='removeSession(session)') Удалить
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSelectedSessionStore, useSessionsStore } from '@/stores/sessions'
import type { ModelKey } from '@/stores/common.ts'
import type { GameSession } from '@/stores/sessions/model.ts'

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

function removeSession(session: GameSession) {
  if (confirm(`Вы действительно хотите удалить сессию '${session.name}' (${session.getKey()})?`)) {
    sessions.remove(session)
  }
}

function createSession() {
  sessions.create(name.value)
}
</script>
