/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { GameSession } from '@/stores/sessions/model.ts'
import { computed, reactive } from 'vue'
import type { ModelKey } from '@/stores/common.ts'

export const useSessionsStore = defineStore('sessions', () => {
  const raw = useStorage<{ [key in string]: object }>('store.sessions', {})

  function reviveSessionNullable(obj: any | undefined): GameSession | undefined {
    if (obj === undefined) {
      return undefined
    }

    return reviveSession(obj)
  }

  function reviveSession(obj: any): GameSession {
    return reactive(new GameSession(obj.uuid, obj.name))
  }

  function create(name: string): GameSession {
    return save(new GameSession(crypto.randomUUID(), name))
  }

  function save(session: GameSession): GameSession {
    raw.value[session.getKey()] = session.toObject()
    return session
  }

  function remove(session: GameSession | ModelKey): undefined {
    if (session instanceof GameSession) {
      session = session.getKey()
    }

    delete raw.value[session]
    return undefined
  }

  function getByKey(uuid: string): GameSession | undefined {
    return reviveSessionNullable(raw.value[uuid])
  }

  const sessions = computed<GameSession[]>(() => {
    return Object.values(raw.value).map(reviveSession)
  })

  return {
    sessions,
    create,
    getByKey,
    save,
    remove,
  }
})

export const useSelectedSessionStore = defineStore('selectedSession', () => {
  const key = useStorage<ModelKey | undefined>('store.selectedSession', undefined)

  const session = computed(() => (key.value ? useSessionsStore().getByKey(key.value) : undefined))

  function select(sessionOrKey: GameSession | ModelKey | undefined): GameSession | undefined {
    if (typeof sessionOrKey === 'string') {
      sessionOrKey = useSessionsStore().getByKey(sessionOrKey)
    }

    if (sessionOrKey === undefined) {
      return key.value = undefined
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
