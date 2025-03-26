import { CzmCustomPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmCityBasePoint extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _circleCustomPrimitive;
    get circleCustomPrimitive(): CzmCustomPrimitive;
    private _cylinderCustomPrimitive;
    get cylinderCustomPrimitive(): CzmCustomPrimitive;
    private _cylinderParticlesCustomPrimitive;
    get cylinderParticlesCustomPrimitive(): CzmCustomPrimitive;
    static defaultParticlesImageUri: string;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmCityBasePoint {
    const createDefaultProps: () => {
        show: boolean | undefined;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean | undefined;
        scale: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        allowPicking: boolean | undefined;
    };
}
export interface CzmCityBasePoint extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCityBasePoint.createDefaultProps>> {
}
