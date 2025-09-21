import { BaseModel, type MaybeReactive, type ModelKey, type ModelStorage, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { type GameSession } from '@/stores/sessions/session.ts'
import { toValue } from 'vue'

export type ActorStruct<S extends object = object> = {
  session: ModelKey
  name: string
  maxHealth: number
  speed: number
  kd: number
} & S

export abstract class Actor<S extends object = object> extends BaseModel<ActorStruct<S>> {
  protected constructor(
    uuid: NullableModelKey,
    public session: MaybeReactive<GameSession>,
    public name: string,
    public maxHealth: number,
    public speed: number,
    public kd: number,
  ) {
    super(uuid)
  }

  abstract makeGameActor(initial?: Partial<object>): GameActor

  toObject(): ModelStruct<ActorStruct<S>> {
    return {
      ...super.toObject(),
      session: this.session.getKey(),
      name: this.name,
      maxHealth: this.maxHealth,
      speed: this.speed,
      kd: this.kd,
    }
  }

  getGameActorsStore(): undefined | ModelStorage<GameActor, GameActorStruct> {
    return undefined
  }

  onRemoving() {
    const store = this.getGameActorsStore()
    if (!store) {
      return
    }

    const forDelete: ModelKey[] = []
    for (const gameActor of store.list) {
      if (gameActor.actor.getKey() === this.getKey()) {
        forDelete.push(gameActor.getKey())
      }
    }

    for (const key of forDelete) {
      store.remove(key)
    }
  }
}

export type GameActorStruct<S extends object = object> = {
  actor: ModelKey
  health: number
} & S

export abstract class GameActor<M extends Actor = Actor, S extends object = object> extends BaseModel<GameActorStruct<S>> {
  protected constructor(
    uuid: NullableModelKey,
    public actor: MaybeReactive<M>,
    public health: number,
  ) {
    super(uuid)
  }

  get session(): GameSession {
    return toValue(this.actor).session
  }

  toObject(): ModelStruct<GameActorStruct<S>> {
    return {
      ...super.toObject(),
      actor: this.actor.getKey(),
      health: this.health,
    }
  }
}
