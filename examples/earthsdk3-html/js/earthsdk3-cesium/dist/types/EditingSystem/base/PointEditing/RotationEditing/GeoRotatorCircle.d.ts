import { CzmCustomPrimitive, CzmTexture, ESCesiumViewer } from "../../../../index";
import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
/**
 * 圆圈实现，用于旋转编辑
 */
export declare class GeoRotatorCircle extends Destroyable {
    static defaults: {
        position: [number, number, number];
    };
    private _czmTexture?;
    get czmTexture(): CzmTexture | undefined;
    private _customPrimitiveForCircle?;
    get customPrimitiveForCircle(): CzmCustomPrimitive | undefined;
    private _circleCanvas?;
    get circleCanvas(): CanvasRenderingContext2D | undefined;
    private _debugAxis?;
    get debugAxis(): CzmCustomPrimitive | undefined;
    constructor(czmViewer: ESCesiumViewer);
    private _createCircleCanvas;
    private _createCustomPrimitiveForCircle;
    private _createDebugAxis;
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
