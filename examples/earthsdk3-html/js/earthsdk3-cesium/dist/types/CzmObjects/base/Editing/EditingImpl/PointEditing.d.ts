import { Destroyable, ReactParamsType } from "xbsj-base";
import { PositionEditing } from "./PositionEditing";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class PointEditing extends Destroyable {
    private _czmViewer;
    private _point;
    get point(): [number, number, number] | undefined;
    set point(value: [number, number, number] | undefined);
    get pointChanged(): [number, number, number] | undefined;
    get pointReact(): import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
    private _innerPointEditing;
    get innerPointEditing(): import("xbsj-base").ReactiveVariable<boolean>;
    private _sPositionsEditing;
    get sPositionEditing(): PositionEditing;
    constructor(positionsReactParams: ReactParamsType<[number, number, number][] | undefined>, pointEditing: ReactParamsType<boolean | undefined> | ReactParamsType<boolean>, _czmViewer: ESCesiumViewer);
}
