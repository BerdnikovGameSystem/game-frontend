import { Actor, type ActorStruct, GameActor, type GameActorStruct } from '@/stores/actors/actor.ts'
import { type GameSession } from '@/stores/sessions/session.ts'
import { assertExists, type MaybeReactive, type ModelStorage, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { useSessionsStore } from '@/stores/sessions'
import { useMobsStore } from '@/stores/actors/mobs/index.ts'

export type MobStruct = ActorStruct

export class Mob extends Actor<MobStruct> {
  public constructor(
    uuid: NullableModelKey,
    session: MaybeReactive<GameSession>,
    name: string,
    maxHealth: number,
    speed: number,
    kd: number,
    public type: string,
    public maxMana: number,
    public level: number,
  ) {
    super(uuid, session, name, maxHealth, speed, kd)
  }

  static revive(obj: MobStruct & Partial<ModelStruct>): Mob {
    const session = assertExists(useSessionsStore().getByKey(obj.session))
    return new Mob(obj.uuid, session, obj.name, obj.type, obj.maxHealth, obj.level, obj.kd, obj.speed, obj.maxMana)
  }

  toObject(): ModelStruct<MobStruct> {
    return {
      ...super.toObject(),
      maxMana: this.maxMana,
      type: this.type,
      level: this.level,
    }
  }

  makeGameActor(initial?: Partial<GameMobStruct>): GameActor {
    return GameMob.revive({
      health: this.maxHealth,
      mana: this.maxMana,
      ...initial,
      actor: this.getKey(),
    })
  }

  getGameActorsStore(): undefined | ModelStorage<GameActor, GameActorStruct> {
    return useGameMobsStore()
  }
}

export type GameMobStruct = GameActorStruct<{
  mana: number
}>

export class GameMob extends GameActor<Mob, GameMobStruct> {
  public constructor(
    uuid: NullableModelKey,
    actor: MaybeReactive<Mob>,
    health: number,
    public mana: number,
  ) {
    super(uuid, actor, health)
  }

  static revive(obj: GameMobStruct & Partial<ModelStruct>): GameMob {
    const actor = assertExists(useMobsStore().getByKey(obj.actor))
    return new GameMob(obj.uuid, actor, obj.health, obj.mana)
  }

  toObject(): ModelStruct<GameMobStruct> {
    return {
      ...super.toObject(),
    }
  }
}
