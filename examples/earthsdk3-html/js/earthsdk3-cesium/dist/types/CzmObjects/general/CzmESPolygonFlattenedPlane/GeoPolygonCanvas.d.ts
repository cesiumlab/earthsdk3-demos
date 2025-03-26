import { ESGeoPolygon, ESSceneObjectWithId } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
declare function saveCanvasToClipboard(canvas: HTMLCanvasElement): void;
declare class PolygonCanvasResetting extends Destroyable {
    private _geoPolygonCanvas;
    private _geoPolygon;
    static toMercatorPos: (lbh: [number, number, number]) => number[];
    constructor(_geoPolygonCanvas: GeoPolygonCanvas, _geoPolygon: ESGeoPolygon);
}
export type CanvasGeoInfoType = {
    rect: [number, number, number, number];
    height: number;
};
export declare class GeoPolygonCanvas extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _geoPolygonWithId;
    get geoPolygonWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    private _canvas;
    get canvas(): HTMLCanvasElement;
    private _canvasCtx;
    get canvasCtx(): CanvasRenderingContext2D;
    private _canvasChanged;
    get canvasChanged(): Event<[]>;
    private _canvasGeoInfo;
    get canvasGeoInfo(): CanvasGeoInfoType | undefined;
    set canvasGeoInfo(value: CanvasGeoInfoType | undefined);
    get canvasGeoInfoChanged(): Listener<[CanvasGeoInfoType | undefined, CanvasGeoInfoType | undefined]>;
    static saveCanvasToClipboard: typeof saveCanvasToClipboard;
    static PolygonCanvasResetting: typeof PolygonCanvasResetting;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoPolygonCanvas {
    const createDefaultProps: () => {
        enabled: boolean;
        geoPolygonId: string;
        canvasWidth: number;
    };
}
export interface GeoPolygonCanvas extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoPolygonCanvas.createDefaultProps>> {
}
export {};
