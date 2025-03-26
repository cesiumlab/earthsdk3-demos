import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
import { CzmTexture } from "../../../../../CzmObjects";
import { CustomPrimitiveForCircle } from "./CustomPrimitiveForCicle";
import { CircleCanvas } from "./CircleCanvas";
import { DebugAxis } from "./DebugAxis";
export declare class GeoRotatorCircle extends Destroyable {
    private _czmViewer;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
    };
    private _czmTexture;
    get czmTexture(): CzmTexture;
    private _customPrimitiveForCircle;
    get customPrimitiveForCircle(): CustomPrimitiveForCircle;
    private _circleCanvas;
    get circleCanvas(): CircleCanvas;
    private _debugAxis;
    get debugAxis(): DebugAxis;
    get czmViewer(): ESCesiumViewer;
    constructor(_czmViewer: ESCesiumViewer);
}
export declare namespace GeoRotatorCircle {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        editing: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        selfRotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        pixelSize: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        circleRotation: number;
        circleStartRotation: number;
        circleEndRotation: number;
        debug: boolean;
    };
}
export interface GeoRotatorCircle extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoRotatorCircle.createDefaultProps>> {
}
