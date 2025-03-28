import { ESCesiumViewer } from '../../../../ESCesiumViewer';
import { ReactivePropsToNativePropsAndChanged, ReactiveVariable } from 'xbsj-base';
import { ESJVector3D } from 'earthsdk3';
import { PointEditing } from '../index';
import { GeoScale } from './GeoScale';
export declare class ScaleEditing extends PointEditing {
    private _lastPosition;
    private _opInfo;
    private _scaleAxis;
    get scaleAxis(): {
        zAxis: GeoScale;
        yAxis: GeoScale;
        xAxis: GeoScale;
    } | undefined;
    constructor(czmViewer: ESCesiumViewer);
    private _createScaleAxis;
    private _pickingXYProcessing;
    private _pickingZProcessing;
}
export declare namespace ScaleEditing {
    const createDefaultProps: () => {
        scale: ReactiveVariable<ESJVector3D>;
        axisPixelSize: number;
        axisSnapPixelSize: number;
        position: ReactiveVariable<ESJVector3D | undefined>;
        enabled: boolean;
    };
}
export interface ScaleEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ScaleEditing.createDefaultProps>> {
}
