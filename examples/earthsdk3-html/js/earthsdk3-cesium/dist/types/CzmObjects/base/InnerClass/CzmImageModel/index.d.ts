import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmCustomPrimitive } from "../CzmCustomPrimitive";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export type CzmImageModelRotationMode = 'WithCameraOnlyZ' | 'WithCamera' | 'WithProp';
export declare class CzmImageModel extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _customPrimitive;
    get customPrimitive(): CzmCustomPrimitive;
    static defaults: {
        position: [number, number, number];
        viewDistanceRange: [number, number, number, number];
        useAxis: string;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmImageModel {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        uri: string;
        czmTextureId: string;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        /**
         * @deprecated rotationWithCamera属性已废弃，请使用rotationMode！
         */
        rotationWithCamera: boolean;
        rotationMode: CzmImageModelRotationMode;
        useAxis: string;
        size: import("xbsj-base").ReactiveVariable<[number, number]>;
        scale: [number, number];
        maximumScale: number;
        minimumScale: number;
        pixelSize: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        originRatioAndOffset: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]>;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
    };
}
export interface CzmImageModel extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmImageModel.createDefaultProps>> {
}
