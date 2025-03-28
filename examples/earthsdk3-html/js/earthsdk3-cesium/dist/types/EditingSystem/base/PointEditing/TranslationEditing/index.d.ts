import { ReactivePropsToNativePropsAndChanged, ReactiveVariable } from "xbsj-base";
import { PointEditing } from "..";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { ESJVector3D, ESJVector4D } from "earthsdk3";
export declare class TranslationEditing extends PointEditing {
    private _opInfo;
    static defaults: {
        heading: number;
        dimensions: ESJVector3D;
        xAxisColor: ESJVector4D;
        yAxisColor: ESJVector4D;
        zAxisColor: ESJVector4D;
        position: [number, number, number];
        enabled: boolean;
    };
    constructor(czmViewer: ESCesiumViewer);
    private _createCoordinates;
    private _createOriginCoordinates;
    private _createGrid;
    private _createHelpLine;
    private _createCircle;
    private _pickingXYProcessing;
    private _pickingZProcessing;
    private _pickingZAxisProcessing;
}
export declare namespace TranslationEditing {
    const createDefaultProps: () => {
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
        xAxisShow: boolean;
        yAxisShow: boolean;
        zAxisShow: boolean;
        position: ReactiveVariable<ESJVector3D | undefined>;
        enabled: boolean;
    };
}
export interface TranslationEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof TranslationEditing.createDefaultProps>> {
}
