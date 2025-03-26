import { NativePrimitive } from './NativePrimitive';
import { NativePrimitiveResetting } from './NativePrimitiveResetting';
import { Destroyable } from 'xbsj-base';
export declare class NativePrimitiveCreating extends Destroyable {
    private _owner;
    get owner(): NativePrimitiveResetting;
    private _nativePrimitive;
    get nativePrimitive(): NativePrimitive | undefined;
    constructor(_owner: NativePrimitiveResetting);
}
