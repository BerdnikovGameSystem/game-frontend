import { createModelStore } from '@/stores/common.ts'
import { registerSessionRelatedStore } from '@/stores/sessions/session.ts'
import { GameMob, type GameMobStruct, Mob, type MobStruct } from '@/stores/actors/mobs/mob.ts'

export const useMobsStore = registerSessionRelatedStore(
  createModelStore<Mob, MobStruct>('store.mobs', (...args) => Mob.revive(...args)),
)

export const useGameMobsStore = registerSessionRelatedStore(
  createModelStore<GameMob, GameMobStruct>('store.game-mobs', (...args) => GameMob.revive(...args)),
)
