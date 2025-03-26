import { Listener } from "./pipe";
import { ReactiveVariable } from "./ReactiveVariable";
export declare function extendClassProps<T extends {
    [k: string]: any;
}>(classProto: Object, createDefaultProps: () => T): void;
export type ExtractNativeTypeFromReactiveProp<T extends {
    [k: string]: any;
}> = T extends ReactiveVariable<infer R> ? R : T;
export type ExtractNativeTypeToReactiveProp<T extends {
    [k: string]: any;
}> = T extends ReactiveVariable<any> ? T : ReactiveVariable<T>;
export type ReactivePropsToNativeProps<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T]: ExtractNativeTypeFromReactiveProp<T[Property]>;
};
export type ConvertToChangedProps<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T as `${string & Property}Changed`]: Listener<[ExtractNativeTypeFromReactiveProp<T[Property]>, ExtractNativeTypeFromReactiveProp<T[Property]>]>;
};
export type ConvertToReactProps<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T as `${string & Property}React`]: ExtractNativeTypeToReactiveProp<T[Property]>;
};
export type ReactivePropsToNativePropsAndChanged<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T]: ExtractNativeTypeFromReactiveProp<T[Property]>;
} & ConvertToChangedProps<T> & ConvertToReactProps<T>;
export type OnlyWithUndefined<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T as (undefined extends T[Property] ? Property : never)]: T[Property];
};
export type ExclueUndefined<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T as (undefined extends T[Property] ? never : Property)]: T[Property];
};
export type PartialWithUndefined<T extends {
    [k: string]: any;
}> = Partial<OnlyWithUndefined<T>> & ExclueUndefined<T>;
export type PartialWithUndefinedReactivePropsToNativeProps<T extends {
    [k: string]: any;
}> = PartialWithUndefined<ReactivePropsToNativeProps<T>>;
export type UniteChanged<T extends {
    [k: string]: any;
}> = {
    [Property in keyof T]: ExtractNativeTypeFromReactiveProp<T[Property]>;
} & ConvertToChangedProps<T> & ConvertToReactProps<T>;
export type UniteJson<T extends {
    [k: string]: any;
}> = PartialWithUndefined<ReactivePropsToNativeProps<T>>;
