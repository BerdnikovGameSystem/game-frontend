import type { Model, ModelKey } from '@/stores/common.ts'

export class GameSession implements Model {
  constructor(
    public uuid: ModelKey,
    public name: string,
  ) {}

  public toObject(): { [key in string]: string | number | null } {
    return {
      uuid: this.uuid,
      name: this.name,
    }
  }

  public getKey(): ModelKey {
    return this.uuid
  }
}
