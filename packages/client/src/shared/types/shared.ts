export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Diff<T, U> = T extends U ? never : T;
export type NonNullable<T> = Diff<T, null | undefined>;