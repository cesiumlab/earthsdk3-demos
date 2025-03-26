import { Listener } from './pipe/Event';
import { ReactiveVariable } from "./ReactiveVariable";
export type ReactPropKeys<T extends {
    [k: string]: any;
}> = keyof {
    [Property in keyof T as T[`${string & Property}Changed`] extends Listener<[T[Property], T[Property]]> ? Property : never]: T[Property];
};
export type ReactPropKeysWithType<T extends {
    [k: string]: any;
}, R> = keyof {
    [Property in keyof T as (T[`${string & Property}Changed`] extends Listener<[T[Property], T[Property]]> ? (T[Property] extends R ? Property : never) : never)]: T[Property];
};
export type ReactParamsType<ReactiveVariableType = any, T extends {
    [k: string]: any;
} = any> = ReactiveVariable<ReactiveVariableType> | [
    obj: T,
    propName: keyof T,
    changedName?: keyof T
];
export declare function getCompleteReactParams<T>(reactParams: ReactParamsType<T>): [Object, string, string];
export declare function track<T, T2, LeftType extends {
    [k: string]: any;
}, RightType extends {
    [k: string]: any;
}>(leftReactiveVariable: ReactParamsType<T, LeftType>, rightReactiveVariable: ReactParamsType<T2, RightType>, trackFunc?: (srcValue: T2) => T, weak?: boolean): any;
export declare function bind<T, T2, LeftType extends {
    [k: string]: any;
}, RightType extends {
    [k: string]: any;
}>(leftReactiveVariable: ReactParamsType<T, LeftType>, rightReactiveVariable: ReactParamsType<T2, RightType>, aTrackBFunc?: (srcValue: T2) => T, bTrackAFunc?: (srcValue: T) => T2, weak?: boolean): () => any;
export declare function bindu<T>(leftReactiveVariable: ReactParamsType<T>, rightReactiveVariable: ReactParamsType<T | undefined>, defaultValue: T, weak?: boolean): () => any;
