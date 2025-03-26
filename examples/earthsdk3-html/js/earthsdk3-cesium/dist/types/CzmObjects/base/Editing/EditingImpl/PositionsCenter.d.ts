import { Destroyable, ReactParamsType } from "xbsj-base";
export declare class PositionsCenter extends Destroyable {
    private _center;
    get centerReact(): import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
    get center(): [number, number, number] | undefined;
    get centerChanged(): import("xbsj-base").Listener<[[number, number, number] | undefined, [number, number, number] | undefined]>;
    private _radius;
    get radiusReact(): import("xbsj-base").ReactiveVariable<number>;
    get radius(): number;
    get radiusChanged(): import("xbsj-base").Listener<[number, number]>;
    constructor(positionsReactParams: ReactParamsType<[number, number, number][] | undefined>);
}
