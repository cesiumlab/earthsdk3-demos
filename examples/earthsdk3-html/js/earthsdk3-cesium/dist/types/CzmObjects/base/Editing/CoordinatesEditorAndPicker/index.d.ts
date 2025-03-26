import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { GeoCoordinatesEditor } from "./../../../../CzmObjects";
import { GeoCoordinatesPicker } from "./GeoCoordinatesPicker";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export * from './GeoCoordinatesPicker';
export declare class GeoCoordinatesEditorAndPicker extends Destroyable {
    private _editor;
    get editor(): GeoCoordinatesEditor;
    private _picker;
    get picker(): GeoCoordinatesPicker;
    get picking(): boolean;
    get pickingChanged(): Listener<[boolean, boolean]>;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCoordinatesEditorAndPicker {
    const createDefaultProps: () => {
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        heading: number;
        axisPixelSize: number;
        axisSnapPixelSize: number;
        virtualHeight: number | undefined;
        noModifingAfterAdding: boolean;
        hideCursorInfo: boolean;
    };
}
export interface GeoCoordinatesEditorAndPicker extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCoordinatesEditorAndPicker.createDefaultProps>> {
}
