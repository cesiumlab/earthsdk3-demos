import { Destroyable } from "./Destroyable";
export declare class HasOwner<T> extends Destroyable {
    private _owner;
    get owner(): T;
    constructor(_owner: T);
}
