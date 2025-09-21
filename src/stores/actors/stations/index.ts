import { createModelStore } from '@/stores/common.ts'
import { registerSessionRelatedStore } from '@/stores/sessions/session.ts'
import { type GameStation, type GameStationStruct, Station, type StationStruct } from '@/stores/actors/stations/station.ts'

export const useStationsStore = registerSessionRelatedStore(
  createModelStore<Station, StationStruct>('store.stations', (...args) => Station.revive(...args)),
)

export const useGameStationsStore = registerSessionRelatedStore(
  createModelStore<GameStation, GameStationStruct>('store.game-stations', (...args) => GameStation.revive(...args)),
)
