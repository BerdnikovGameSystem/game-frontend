import { createModelStore } from '@/stores/common.ts'
import { GamePlayer, type GamePlayerStruct, Player, type PlayerStruct } from '@/stores/actors/players/player.ts'
import { registerSessionRelatedStore } from '@/stores/sessions/session.ts'

export const usePlayersStore = registerSessionRelatedStore(
  createModelStore<Player, PlayerStruct>('store.players', (...args) => Player.revive(...args)),
)

export const useGamePlayersStore = registerSessionRelatedStore(
  createModelStore<GamePlayer, GamePlayerStruct>('store.game-players', (...args) => GamePlayer.revive(...args)),
)
