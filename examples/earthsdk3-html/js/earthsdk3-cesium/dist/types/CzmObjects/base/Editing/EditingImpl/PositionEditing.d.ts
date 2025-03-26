import { GeoCoordinatesEditorAndPicker } from "../../../../CzmObjects";
import { PositionEditingConfigType } from "../../../../ESJTypesCzm";
import { Destroyable, ReactParamsType } from "xbsj-base";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class PositionEditing extends Destroyable {
    private _czmViewer;
    static defaultConfig: PositionEditingConfigType;
    private _config;
    get config(): PositionEditingConfigType;
    set config(value: PositionEditingConfigType);
    get configChanged(): import("xbsj-base").Listener<[PositionEditingConfigType, PositionEditingConfigType]>;
    private _editingRef;
    get editingRef(): import("xbsj-base").ReactiveVariable<boolean>;
    get picking(): boolean | undefined;
    get pickingChanged(): import("xbsj-base").Listener<[boolean, boolean]> | undefined;
    private _geoCoordinatesEditorAndPicker;
    get geoCoordinatesEditorAndPicker(): GeoCoordinatesEditorAndPicker | undefined;
    constructor(positionReactParam: ReactParamsType<[number, number, number] | undefined>, positionEditing: ReactParamsType<boolean> | undefined, _czmViewer: ESCesiumViewer);
}
