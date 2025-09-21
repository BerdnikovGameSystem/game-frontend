import { Actor, type ActorStruct, GameActor, type GameActorStruct } from '@/stores/actors/actor.ts'
import { type GameSession } from '@/stores/sessions/session.ts'
import { assertExists, type MaybeReactive, type ModelStorage, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { useSessionsStore } from '@/stores/sessions'
import { useGamePlayersStore, usePlayersStore } from '@/stores/actors/players/index.ts'

export type PlayerStruct = ActorStruct<{
  type: string
  level: number
  maxMana: number
}>

export class Player extends Actor<PlayerStruct> {
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

  static revive(obj: PlayerStruct & Partial<ModelStruct>): Player {
    const session = assertExists(useSessionsStore().getByKey(obj.session))
    return new Player(obj.uuid, session, obj.name, obj.maxHealth, obj.speed, obj.kd, obj.type, obj.maxMana, obj.level)
  }

  toObject(): ModelStruct<PlayerStruct> {
    return {
      ...super.toObject(),
      maxMana: this.maxMana,
      type: this.type,
      level: this.level,
    }
  }

  makeGameActor(initial?: Partial<GamePlayerStruct>): GameActor {
    return GamePlayer.revive({
      health: this.maxHealth,
      mana: this.maxMana,
      ...initial,
      actor: this.getKey(),
    })
  }

  getGameActorsStore(): undefined | ModelStorage<GameActor, GameActorStruct> {
    return useGamePlayersStore()
  }
}

export type GamePlayerStruct = GameActorStruct<{
  mana: number
}>

export class GamePlayer extends GameActor<Player, GamePlayerStruct> {
  public constructor(
    uuid: NullableModelKey,
    actor: MaybeReactive<Player>,
    health: number,
    public mana: number,
  ) {
    super(uuid, actor, health)
  }

  static revive(obj: GamePlayerStruct & Partial<ModelStruct>): GamePlayer {
    const actor = assertExists(usePlayersStore().getByKey(obj.actor))
    return new GamePlayer(obj.uuid, actor, obj.health, obj.mana)
  }

  toObject(): ModelStruct<GamePlayerStruct> {
    return {
      ...super.toObject(),
      mana: this.mana,
    }
  }
}
