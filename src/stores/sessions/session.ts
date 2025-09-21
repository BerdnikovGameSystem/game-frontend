import { BaseModel, type ModelKey, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import type { StoreDefinition } from 'pinia'

export type GameSessionStruct = {
  name: string
}

const _sessionRelatedStores = []

/**
 * Стор должен содержать list и элементы должны содержать session как обьект
 */
export function registerSessionRelatedStore(store: StoreDefinition, sessionKeyGetter?: (obj: object) => ModelKey = undefined): StoreDefinition {
  sessionKeyGetter = sessionKeyGetter || ((obj: object) => obj.session.getKey())
  _sessionRelatedStores.push({
    store,
    sessionKeyGetter,
  })
  return store
}

export class GameSession extends BaseModel<GameSessionStruct> {
  constructor(
    uuid: NullableModelKey,
    public name: string,
  ) {
    super(uuid)
  }

  public static revive(obj: GameSessionStruct & Partial<ModelStruct>): GameSession {
    return new GameSession(obj.uuid, obj.name)
  }

  public toObject(): ModelStruct & GameSessionStruct {
    return {
      uuid: this.uuid,
      name: this.name,
    }
  }

  onRemoving() {
    for (const data of _sessionRelatedStores) {
      const store = data.store(useStore.store)
      for (const item of store.list) {
        if (data.sessionKeyGetter(item) === this.getKey()) {
          store.remove(item)
        }
      }
    }
  }
}
