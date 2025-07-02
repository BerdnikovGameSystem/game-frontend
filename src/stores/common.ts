export interface Objectable {
  toObject(): { [key in string]: string | number | null }
}

export interface Indexable {
  getKey(): ModelKey
}

export interface Model extends Objectable, Indexable {}

export type ModelKey = string
