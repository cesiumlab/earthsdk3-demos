import { ReactParamsType } from "./bindAndTrack";
import { Listener } from "./pipe";
export type ReactFuncs<T> = [getValue: () => T, setValue: (value: T) => void, valueChanged: Listener<[T]>];
export declare function getReactFuncs<T>(reactParams: ReactParamsType): ReactFuncs<T>;
