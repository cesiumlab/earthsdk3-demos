import { Destroyable } from 'xbsj-base';
export declare class UnLoading extends Destroyable {
    private _unloadEvent;
    constructor();
    unload(func: () => void): void;
}
export declare const unLoading: UnLoading;
