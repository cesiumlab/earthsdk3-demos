import { CzmModelPrimitive } from ".";
import { Destroyable } from "xbsj-base";
export declare class NativePrimitiveResetting extends Destroyable {
    private _owner;
    get owner(): CzmModelPrimitive;
    constructor(_owner: CzmModelPrimitive);
}
