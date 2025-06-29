export declare type Player = {
  name: string

  maxHits: number
  kd: number
  maxEnergy: number
  speed: number
}

export declare type IngamePlayer = Player & {
  hits: number
  speed: number
  energy: number
}

