import {
  BaseModel,
  type ModelStruct, type NullableModelKey
} from '@/stores/common.ts'

export type GameSessionStruct = {
  name: string,
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
}
