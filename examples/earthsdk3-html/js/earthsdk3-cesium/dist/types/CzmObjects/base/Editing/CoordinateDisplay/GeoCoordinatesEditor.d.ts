import { GeoCoordinates } from '../../../../CzmObjects';
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CoordinatesComputingPickingInfo } from "../../../../utils";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, ReactiveVariable } from "xbsj-base";
export declare class GeoCoordinatesEditor extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
    };
    private _opInfo;
    constructor(czmViewer: ESCesiumViewer);
    private _createMainCoordinates;
    private _createOriginCoordinates;
    private _createGrid;
    private _createHelpLines;
    private _createCircle;
}
export declare namespace GeoCoordinatesEditor {
    const createDefaultProps: () => {
        enabled: boolean;
        position: ReactiveVariable<[number, number, number] | undefined>;
        heading: number;
        axisPixelSize: number;
        axisSnapPixelSize: number;
        showCoordinates: boolean;
        showCircle: boolean;
        disableX: boolean;
        disableY: boolean;
        disableZ: boolean;
        disableXY: boolean;
        disableZAxis: boolean;
    };
}
export interface GeoCoordinatesEditor extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCoordinatesEditor.createDefaultProps>> {
}
export declare function setCoordinatesColor(coordinates: GeoCoordinates, constraintMode: CoordinatesComputingPickingInfo['constraintMode'], transparent: boolean): void;
