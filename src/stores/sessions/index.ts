import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { GameSession, type GameSessionStruct } from '@/stores/sessions/session.ts'
import { computed } from 'vue'
import { createModelStore, type ModelKey } from '@/stores/common.ts'

export const useSessionsStore = createModelStore<GameSession, GameSessionStruct>(
  'store.sessions',
  GameSession.revive,
);

export const useSelectedSessionStore = defineStore('selectedSession', () => {
  const key = useStorage<ModelKey | undefined>('store.selectedSession', undefined)

  const session = computed(() => (key.value ? useSessionsStore().getByKey(key.value) : undefined))

  function select(sessionOrKey: GameSession | ModelKey | undefined): GameSession | undefined {
    if (typeof sessionOrKey === 'string') {
      sessionOrKey = useSessionsStore().getByKey(sessionOrKey)
    }

    if (sessionOrKey === undefined) {
      return (key.value = undefined)
    } else {
      key.value = sessionOrKey.getKey()
      return sessionOrKey
    }
  }

  function is(session: GameSession | ModelKey) {
    if (session instanceof GameSession) {
      session = session.getKey()
    }

    return key.value === session
  }

  return {
    key,
    session,
    select,
    is,
  }
})
