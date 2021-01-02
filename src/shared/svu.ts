/**
 * ts 相关定义
 */
export const enum ReactiveFlags {
    SKIP = '__v_skip',
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly',
    RAW = '__v_raw'
}

export interface Target {
    [ReactiveFlags.SKIP]?: boolean
    [ReactiveFlags.IS_REACTIVE]?: boolean
    [ReactiveFlags.IS_READONLY]?: boolean
    [ReactiveFlags.RAW]?: any
}

export type KeyToDepMap = Map<any, Dep>
export type Dep = Set<ReactiveEffect>
export interface ReactiveEffect<T = any> {
    (): T
    _isEffect: true
    id: number
    active: boolean
    raw: () => T
    deps: Array<Dep>
  }