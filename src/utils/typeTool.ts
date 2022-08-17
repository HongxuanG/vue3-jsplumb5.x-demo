// 联合类型转交叉类型
export type UnionToIntersection<T> = (
  T extends T ? (k: T) => void : never
) extends (k: infer P) => void
  ? P
  : never
type IntersectionToIntersectionFn<T> = UnionToIntersection<
  T extends unknown ? () => T : never
>
// 联合类型转元组
export type UnionToTuple<
  Union,
  T extends any[] = []
> = IntersectionToIntersectionFn<Union> extends () => infer I
  ? UnionToTuple<Exclude<Union, I>, [I, ...T]>
  : T
// 合并联合类型成为一个string类型
type MergeStringUnion<U extends string> = UnionToTuple<U> extends string[]
  ? TupleToString<UnionToTuple<U>>
  : never
// 元组转string类型
export type TupleToString<
  S extends string[],
  Result extends string = ''
> = S extends [infer F, ...infer Rest]
  ? F extends string
    ? Rest extends string[]
      ? `${F}${TupleToString<Rest>}`
      : never
    : never
  : Result

type UnionKeyVal<
  T extends Record<string, any>,
  U extends string = keyof T & string
> = U extends `${infer prefix}-${infer suffix}`
  ? `${prefix}${Uppercase<suffix>}: ${T[U]};`
  : `${U}: ${T[U]};`


export type GetStringifyStyle<T extends Record<string, any>> = MergeStringUnion<
  UnionKeyVal<T>
>
