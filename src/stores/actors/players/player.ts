import { Actor, type ActorStruct, GameActor, type GameActorStruct } from '@/stores/actors/actor.ts'
import { type GameSession } from '@/stores/sessions/session.ts'
import { assertExists, type MaybeReactive, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { useSessionsStore } from '@/stores/sessions'
import { usePlayersStore } from '@/stores/actors/players/index.ts'

export type PlayerStruct = ActorStruct<{
  name: string
  type: string
  maxHealth: number
  level: number
  kd: number
  speed: number
  maxMana: number
}>

export class Player extends Actor<PlayerStruct> {
  public constructor(
    uuid: NullableModelKey,
    session: MaybeReactive<GameSession>,
    public name: string,
    public type: string,
    public maxHealth: number,
    public level: number,
    public kd: number,
    public speed: number,
    public maxMana: number,
  ) {
    super(uuid, session)
  }

  static revive(obj: PlayerStruct & Partial<ModelStruct>): Player {
    const session = assertExists(useSessionsStore().getByKey(obj.session))
    return new Player(obj.uuid, session, obj.name, obj.type, obj.maxHealth, obj.level, obj.kd, obj.speed, obj.maxMana)
  }

  toObject(): ModelStruct<PlayerStruct> {
    return {
      ...super.toObject(),
      maxHealth: this.maxHealth,
      level: this.level,
      kd: this.kd,
      speed: this.speed,
      maxMana: this.maxMana,
      name: this.name,
      type: this.type,
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
}

export type GamePlayerStruct = GameActorStruct<{
  health: number
  mana: number
}>

export class GamePlayer extends GameActor<Player, GamePlayerStruct> {
  public constructor(
    uuid: NullableModelKey,
    player: MaybeReactive<Player>,
    public health: number,
    public mana: number,
  ) {
    super(uuid, player)
  }

  static revive(obj: GamePlayerStruct & Partial<ModelStruct>): GamePlayer {
    const player = assertExists(usePlayersStore().getByKey(obj.actor))
    return new GamePlayer(obj.uuid, player, obj.health, obj.mana)
  }

  toObject(): ModelStruct<GamePlayerStruct> {
    return {
      ...super.toObject(),
      health: this.health,
      mana: this.mana,
    }
  }
}
