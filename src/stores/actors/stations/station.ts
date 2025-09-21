import { Actor, type ActorStruct, GameActor, type GameActorStruct } from '@/stores/actors/actor.ts'
import { assertExists, type MaybeReactive, type ModelStorage, type ModelStruct, type NullableModelKey } from '@/stores/common.ts'
import { useSessionsStore } from '@/stores/sessions'
import { useGameStationsStore, useStationsStore } from '@/stores/actors/stations/index.ts'

export type StationStruct = ActorStruct

export class Station extends Actor<StationStruct> {
  static revive(obj: StationStruct & Partial<ModelStruct>): Station {
    const session = assertExists(useSessionsStore().getByKey(obj.session))
    return new Station(obj.uuid, session, obj.name, obj.maxHealth, obj.speed, obj.kd)
  }

  makeGameActor(initial?: Partial<GameStationStruct>): GameActor {
    return GameStation.revive({
      health: this.maxHealth,
      ...initial,
      actor: this.getKey(),
    })
  }

  getGameActorsStore(): undefined | ModelStorage<GameActor, GameActorStruct> {
    return useGameStationsStore()
  }
}

export type GameStationStruct = GameActorStruct

export class GameStation extends GameActor<Station, GameStationStruct> {
  public constructor(
    uuid: NullableModelKey,
    actor: MaybeReactive<Station>,
    health: number,
    public mana: number,
  ) {
    super(uuid, actor, health)
  }

  static revive(obj: GameStationStruct & Partial<ModelStruct>): GameStation {
    const actor = assertExists(useStationsStore().getByKey(obj.actor))
    return new GameStation(obj.uuid, actor, obj.health, obj.mana)
  }

  toObject(): ModelStruct<GameStationStruct> {
    return {
      ...super.toObject(),
      mana: this.mana,
    }
  }
}
