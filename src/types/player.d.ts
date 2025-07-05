export declare type Player = {
  name: string
  maxHits: number
  class:string
  kd: number
  maxEnergy: number
  speed: number
  level: number
}

export declare type IngamePlayer = Player & {
  hits: number
  speed: number
  energy: number
}

