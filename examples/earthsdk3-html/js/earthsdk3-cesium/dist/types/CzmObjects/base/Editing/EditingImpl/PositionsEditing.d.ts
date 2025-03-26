import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ObjResettingWithEvent, ReactParamsType } from "xbsj-base";
import { GeoPolylineEditor } from "../GeoPolylineEditor";
import { PositionsEditingConfigType } from "../../../../ESJTypesCzm";
declare class GeoPolylineEditorWrapper extends Destroyable {
    private _geoPolylineEditor;
    get geoPolylineEditor(): GeoPolylineEditor;
    constructor(positionsEditing: PositionsEditing, positionsReactParams: ReactParamsType<[number, number, number][] | undefined>, loopReactParams: ReactParamsType<boolean | undefined> | boolean | undefined, czmViewer: ESCesiumViewer, maxPointsNum?: number);
}
export declare class PositionsEditing extends Destroyable {
    private _resetting;
    get resetting(): ObjResettingWithEvent<GeoPolylineEditorWrapper, Listener<[[number, number, number][] | undefined]>>;
    static defaultConfig: PositionsEditingConfigType;
    private _config;
    get config(): PositionsEditingConfigType;
    set config(value: PositionsEditingConfigType);
    get configChanged(): Listener<[PositionsEditingConfigType, PositionsEditingConfigType]>;
    private _moveWithFirstPosition;
    get moveWithFirstPosition(): boolean;
    set moveWithFirstPosition(value: boolean);
    get moveWithFirstPositionChanged(): Listener<[boolean, boolean]>;
    constructor(positionsReactParams: ReactParamsType<[number, number, number][] | undefined>, loopReactParams: ReactParamsType<boolean | undefined> | boolean | undefined, positionsEditing: ReactParamsType<boolean | undefined> | ReactParamsType<boolean>, viewer: ESCesiumViewer, maxPointsNum?: number, defaultPositionsEditing?: boolean);
}
export {};
