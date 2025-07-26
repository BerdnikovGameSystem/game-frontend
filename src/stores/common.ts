import { computed, type ComputedRef, isReactive, isRef, type MaybeRefOrGetter, type Reactive, reactive, ref, type Ref, watch } from 'vue'
import { useStorage, watchOnce } from '@vueuse/core'
import { toValue } from 'vue'
import { defineStore, type Store } from 'pinia'

export interface Objectable<S extends object = { [key in string]: string | number | null }> {
  toObject(): S
}

export interface Indexable {
  getKey(): ModelKey
}

export type ModelStruct<S extends object = object> = {
  uuid: ModelKey
} & S

export type NullableModelKey = ModelKey | null | undefined

export abstract class Model<S extends ModelStruct = ModelStruct> implements Objectable<S>, Indexable {
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

  onRemoving() {}

  onRemoved() {}
}

export abstract class BaseModel<S extends object> extends Model<ModelStruct & S> {}

export type ModelKey = string

export type ReviveModelStruct<S extends object = object> = Partial<ModelStruct> & S

export type ReviveModelFunction<T extends Model, S extends object = object> = (obj: ReviveModelStruct<S>) => T

export type MaybeReactive<T> = T | Reactive<T>
export type MaybeReactiveOrRefFlat<T> = MaybeReactive<T> | MaybeRefOrGetter<T>
export type MaybeReactiveOrRef<T> =
  | MaybeReactiveOrRefFlat<T>
  | MaybeReactiveOrRefFlat<MaybeReactiveOrRefFlat<T>>
  | MaybeReactiveOrRefFlat<MaybeReactiveOrRefFlat<MaybeReactiveOrRefFlat<T>>>

export function unwrapReactiveOrRefValue<T>(input: MaybeReactiveOrRef<T>): T {
  if (typeof input === 'function') {
    // Если функция — вызвать
    return unwrapReactiveOrRefValue((input as () => MaybeReactiveOrRef<T>)())
  }

  if (isRef(input)) {
    // Если Ref — взять .value
    input = input.value as T
    return unwrapReactiveOrRefValue(input.value)
  }

  if (isReactive(input)) {
    // Если reactive — вернуть как есть (Proxy)
    return toValue(input) as T
  }

  return input as T
}

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

  /**
   * Автоматически сохранять изменения
   *
   * @note Работает только если `wrapReactive` = `true`
   */
  autoSave?: boolean
}

export function useModelStorage<T extends Model, S extends object = object>(
  key: MaybeRefOrGetter<string>,
  revive: ReviveModelFunction<T, S>,
  options: ModelStorageOptions = {},
): ModelStorage<T, S> {
  const { wrapReactive = true, autoSave = true } = options

  const raw = useStorage<Record<ModelKey, ReviveModelStruct<S>>>(key, {})

  function reviveModelNullable(obj: ReviveModelStruct<S> | undefined): MaybeReactive<T> | undefined {
    if (obj === undefined) {
      return undefined
    }

    return reviveModel(obj)
  }

  function reviveModel(obj: MaybeReactiveOrRef<ReviveModelStruct<S>>): MaybeReactive<T> {
    return wrapReactiveModel(revive(unwrapReactiveOrRefValue(obj)))
  }

  function wrapReactiveModel(model: T): MaybeReactive<T> {
    if (wrapReactive) {
      const reactiveModel = reactive(model)

      if (autoSave) {
        watch(reactiveModel, (value) => {
          save(value)
        })
      }
      return reactiveModel
    } else {
      return model
    }
  }

  function create(obj: MaybeReactiveOrRef<ReviveModelStruct<S>>): T {
    return save(revive(unwrapReactiveOrRefValue(obj)))
  }

  function save(model: MaybeReactiveOrRef<T>): T {
    model = unwrapReactiveOrRefValue(model)

    if (!model.toObject().uuid) {
      throw new Error('Model must have a UUID before saving')
    }

    raw.value[model.getKey()] = model.toObject() as ReviveModelStruct<S>
    return model
  }

  function update(model: MaybeReactiveOrRef<T>): T {
    return save(model)
  }

  function remove(modelOrKey: MaybeReactiveOrRef<T | ModelKey>): void {
    const resolved = unwrapReactiveOrRefValue(modelOrKey)

    let model: T
    if (resolved instanceof Model) {
      model = resolved as T
    } else {
      model = getByKey(resolved) as T
    }

    model?.onRemoving()
    delete raw.value[model?.getKey() ?? resolved]
    model?.onRemoved()
  }

  function getByKey(key: MaybeReactiveOrRef<ModelKey>): MaybeReactive<T> | undefined {
    key = unwrapReactiveOrRefValue(key)
    return reviveModelNullable(raw.value[key] as ReviveModelStruct<S> | undefined)
  }

  function updateByKey(key: MaybeReactiveOrRef<ModelKey>, obj: ReviveModelStruct<S>): T {
    key = unwrapReactiveOrRefValue(key)
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
