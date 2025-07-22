import { BaseModel, type MaybeReactive, Model, type ModelKey, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { type GameSession } from '@/stores/sessions/session.ts'
import { toValue } from 'vue'

export type ActorStruct<S extends object = object> = {
  session: ModelKey
} & S

export abstract class Actor<S extends object = object> extends BaseModel<ActorStruct<S>> {
  protected constructor(
    uuid: NullableModelKey,
    public session: MaybeReactive<GameSession>,
  ) {
    super(uuid)
  }

  abstract makeGameActor(initial?: Partial<object>): GameActor

  toObject(): ModelStruct<ActorStruct<S>> {
    return {
      ...super.toObject(),
      session: this.session.getKey(),
    }
  }
}

export type GameActorStruct<S extends object = object> = {
  actor: ModelKey
} & S

export abstract class GameActor<M extends Actor = Actor, S extends object = object> extends BaseModel<GameActorStruct<S>> {
  protected constructor(
    uuid: NullableModelKey,
    public actor: MaybeReactive<M>,
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
    }
  }
}
