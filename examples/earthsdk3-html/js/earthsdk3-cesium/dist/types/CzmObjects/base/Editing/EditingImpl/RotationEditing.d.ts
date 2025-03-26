import { Destroyable, ReactParamsType } from "xbsj-base";
import { GeoRotator } from "../RotatorDisplay";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class RotationEditing extends Destroyable {
    private _czmViewer;
    private _editingRef;
    get editingRef(): import("xbsj-base").ReactiveVariable<boolean>;
    private _geoRotator;
    get geoRotator(): GeoRotator;
    constructor(positionReactParam: ReactParamsType<[number, number, number] | undefined>, rotationReactParam: ReactParamsType<[number, number, number] | undefined>, rotationEditing: ReactParamsType<boolean> | undefined, _czmViewer: ESCesiumViewer, options?: {
        initialRotation?: [number, number, number];
        showHelper?: boolean;
    });
}
