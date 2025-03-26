import { Destroyable } from "./Destroyable";
import { ConvertToChangedProps } from "./extendClassProps";
import { ReactiveVariable } from "./ReactiveVariable";
export declare function createProps<T extends {
    [k: string]: ReactiveVariable<any> | any;
}>(props: T): Destroyable & T & ConvertToChangedProps<T>;
