import { Property } from "./Property";
export type DefaultValueType<T> = T | (() => T) | (() => Extract<T, undefined>);
export type DVT<T> = DefaultValueType<T>;
export declare abstract class WithUndefinedProperty<T> extends Property {
    private _withUndefined;
    private _readonly;
    private _defaultValue?;
    constructor(name: string, description: string, _withUndefined: boolean, _readonly: boolean, _defaultValue?: DVT<T> | undefined);
    get withUndefined(): boolean;
    get readonly(): boolean;
    /**
     * defaultValue是变量从undefined转化为有值时的默认值，如果为undefined，表示未设置，由UI自行决定默认值！
     */
    get defaultValue(): T | undefined;
}
