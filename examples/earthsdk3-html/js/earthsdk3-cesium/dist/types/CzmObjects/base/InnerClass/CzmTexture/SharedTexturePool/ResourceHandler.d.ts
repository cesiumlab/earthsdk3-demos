import { Destroyable } from "xbsj-base";
export declare class ResourceHandler<T extends {
    destroy(): void;
}> extends Destroyable {
    _resouceRef?: {
        resouce: T;
        ref: number;
    };
    constructor(resouce?: T);
    get valid(): boolean;
    get raw(): T | undefined;
    get ref(): number | undefined;
    getRef(target?: ResourceHandler<T>): ResourceHandler<T>;
    equal(target: ResourceHandler<T>): boolean;
    reset(handler?: ResourceHandler<T>): this;
}
