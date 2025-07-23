import { createModelStore } from '@/stores/common.ts'
import { GamePlayer, type GamePlayerStruct, Player, type PlayerStruct } from '@/stores/actors/players/player.ts'

export const usePlayersStore = createModelStore<Player, PlayerStruct>('store.players', (...args) => Player.revive(...args))

export const useGamePlayersStore = createModelStore<GamePlayer, GamePlayerStruct>('store.game-players', (...args) => GamePlayer.revive(...args))
