import { CzmPolylinesPrimitive, GeoAxis, PositionEditing, PrsEditing, RotationEditing } from '../../../CzmObjects';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged } from 'xbsj-base';
export declare class CzmPlane extends Destroyable {
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): Listener<[string, string]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
    };
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing;
    private _sRotationEditing;
    get sRotationEditing(): RotationEditing;
    private _sPrsEditing;
    get sPrsEditing(): PrsEditing;
    private _polylines;
    get polylines(): CzmPolylinesPrimitive;
    private _axis;
    get axis(): GeoAxis;
    constructor(czmViewer: ESCesiumViewer, id?: string);
}
export declare namespace CzmPlane {
    const createDefaultProps: () => {
        show: boolean;
        showArrow: boolean;
        editing: boolean;
        positionEditing: boolean;
        rotationEditing: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        width: number;
        minSize: import("xbsj-base").ReactiveVariable<[number, number]>;
        maxSize: import("xbsj-base").ReactiveVariable<[number, number]>;
    };
}
export interface CzmPlane extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPlane.createDefaultProps>> {
}
