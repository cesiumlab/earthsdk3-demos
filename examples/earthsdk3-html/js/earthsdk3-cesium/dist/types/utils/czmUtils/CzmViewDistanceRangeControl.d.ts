import { ESCesiumViewer } from ".././../ESCesiumViewer";
import { Destroyable, Listener, ObjResettingWithEvent, ReactParamsType } from "xbsj-base";
declare class ViewDistanceDebugInner extends Destroyable {
    constructor(control: CzmViewDistanceRangeControl);
}
declare class ViewDistanceDebug extends Destroyable {
    private _control;
    private _debugObjResetting;
    get debugObjResetting(): ObjResettingWithEvent<ViewDistanceDebugInner, Listener<[boolean, boolean]>>;
    constructor(_control: CzmViewDistanceRangeControl);
}
export declare class CzmViewDistanceRangeControl extends Destroyable {
    private _czmViewer;
    private _positionReact;
    private _visibleAlpha;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _viewDistance;
    get viewDistance(): number;
    set viewDistance(value: number);
    get viewDistanceChanged(): Listener<[number, number]>;
    private _debug;
    get debug(): boolean;
    set debug(value: boolean);
    get debugChanged(): Listener<[boolean, boolean]>;
    get positionReact(): ReactParamsType<[number, number, number] | undefined, any>;
    get czmViewer(): ESCesiumViewer;
    private _viewDistanceDebug;
    get viewDistanceDebug(): ViewDistanceDebug;
    constructor(_czmViewer: ESCesiumViewer, viewDistanceRangeReact: ReactParamsType<[number, number, number, number] | undefined>, _positionReact: ReactParamsType<[number, number, number] | undefined>, radiusReact?: ReactParamsType<number | undefined>);
}
export {};
