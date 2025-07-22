import { computed, type ComputedRef, type MaybeRefOrGetter, type Reactive, reactive, type Ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { toValue } from 'vue'
import { defineStore } from 'pinia'

export interface Objectable {
  toObject(): { [key in string]: string | number | null }
}

export interface Indexable {
  getKey(): ModelKey
}

export type ModelStruct<S extends object = object> = {
  uuid: ModelKey
} & S

export type NullableModelKey = ModelKey | null | undefined

export abstract class Model<S extends ModelStruct = ModelStruct> implements Objectable, Indexable {
  public readonly uuid: ModelKey

  protected constructor(uuid: NullableModelKey = null) {
    this.uuid = uuid ?? crypto.randomUUID()
  }

  getKey(): ModelKey {
    return this.uuid
  }

  toObject(): S {
    return {
      uuid: this.uuid,
    } as S
  }
}

export abstract class BaseModel<S extends object> extends Model<ModelStruct & S> {}

export type ModelKey = string

export type ReviveModelStruct<S extends object = object> = Partial<ModelStruct> & S

export type ReviveModelFunction<T extends Model, S extends object = object> = (obj: ReviveModelStruct<S>) => T

export type MaybeReactive<T> = T | Reactive<T>

export interface ModelStorage<T extends Model, S extends object = object> {
  raw: Ref<Record<ModelKey, ReviveModelStruct<S>>>
  list: ComputedRef<MaybeReactive<T>[]>
  dict: ComputedRef<Record<ModelKey, MaybeReactive<T>>>

  create(obj: S): T

  save(model: T): T

  remove(model: T | ModelKey): void

  getByKey(uuid: ModelKey): MaybeReactive<T> | undefined

  has(key: ModelKey): boolean

  clear(): void

  update(model: T): T
  updateByKey(key: ModelKey, obj: S): T

  isEmpty: ComputedRef<boolean>
}

export type ModelStorageOptions = {
  wrapReactive?: boolean
}

export function useModelStorage<T extends Model, S extends object = object>(
  key: MaybeRefOrGetter<string>,
  revive: ReviveModelFunction<T, S>,
  options: ModelStorageOptions = {},
): ModelStorage<T, S> {
  const { wrapReactive = true } = options

  const raw = useStorage<Record<ModelKey, ReviveModelStruct<S>>>(key, {})

  function reviveModelNullable(obj: ReviveModelStruct<S> | undefined): MaybeReactive<T> | undefined {
    if (obj === undefined) {
      return undefined
    }

    return reviveModel(obj)
  }

  function reviveModel(obj: ReviveModelStruct<S>): MaybeReactive<T> {
    const model = revive(obj)
    return wrapReactive ? reactive(model) : model
  }

  function create(obj: ReviveModelStruct<S>): T {
    return save(revive(obj))
  }

  function save(model: T): T {
    if (!model.toObject().uuid) {
      throw new Error('Model must have a UUID before saving')
    }
    raw.value[model.getKey()] = model.toObject() as ReviveModelStruct<S>
    return model
  }

  function update(model: T): T {
    return save(model)
  }

  function remove(model: MaybeRefOrGetter<T | ModelKey>): void {
    const resolved = toValue(model)

    let key: ModelKey
    if (resolved instanceof Model) {
      key = resolved.getKey()
    } else {
      key = resolved
    }

    delete raw.value[key]
  }

  function getByKey(uuid: ModelKey): MaybeReactive<T> | undefined {
    return reviveModelNullable(raw.value[uuid] as ReviveModelStruct<S> | undefined)
  }

  function updateByKey(key: ModelKey, obj: ReviveModelStruct<S>): T {
    raw.value[key] = obj
    return getByKey(key) as T
  }

  const list = computed<MaybeReactive<T>[]>(() => {
    return Object.values(raw.value).map((obj) => reviveModel(obj as ReviveModelStruct<S>))
  })

  const dict = computed<Record<ModelKey, MaybeReactive<T>>>(() => {
    return Object.fromEntries(Object.entries(raw.value).map(([key, obj]) => [key, reviveModel(obj as ReviveModelStruct<S>)]))
  })

  function has(key: ModelKey): boolean {
    return key in raw.value
  }

  function clear(): void {
    raw.value = {}
  }

  const isEmpty = computed(() => Object.keys(raw.value).length === 0)

  return {
    raw,
    list,
    dict,
    isEmpty,
    create,
    getByKey,
    save,
    update,
    remove,
    has,
    clear,
    updateByKey,
  } satisfies ModelStorage<T>
}

export type ModelStoreOptions = {
  storeId?: string
} & ModelStorageOptions

export function createModelStore<T extends Model, S extends object = object>(
  storageKey: string,
  revive: ReviveModelFunction<T, S>,
  options?: ModelStoreOptions,
) {
  const storeId = options?.storeId ?? `model:${storageKey}`

  return defineStore(storeId, () => {
    return useModelStorage<T, S>(storageKey, revive, options)
  })
}

export function assertExists<T>(value: T | undefined, message = 'Value not found'): T {
  if (value === undefined) {
    console.log(value)
    throw new Error(message)
  }
  return value
}
