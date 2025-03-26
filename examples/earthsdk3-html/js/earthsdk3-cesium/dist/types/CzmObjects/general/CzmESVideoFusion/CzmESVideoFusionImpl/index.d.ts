import { CzmTexture, RayEditing } from "../../../../CzmObjects";
import { Destroyable, Event, Listener, ObjResettingWithEvent, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESCesiumViewer } from "./../../../../ESCesiumViewer";
import { XbsjCameraVideo } from "../XbsjCameraVideo";
export declare class CzmCameraVideo extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _resetWithCameraInfoEvent;
    get resetWithCameraInfoEvent(): Event<[]>;
    resetWithCameraInfo(): void;
    static defaults: {
        position: [number, number, number];
        czmTextureId: string;
    };
    private _rayEditing;
    get rayEditing(): RayEditing;
    private _sharedCzmTexture;
    get sharedCzmTexture(): CzmTexture | undefined;
    getCurrentCzmTexture(): CzmTexture | undefined;
    private _fovy;
    get fovy(): number;
    set fovy(value: number);
    get fovyChanged(): Listener<[number, number]>;
    private _fovyUpdate;
    private _fovx;
    get fovx(): number;
    set fovx(value: number);
    get fovxChanged(): Listener<[number, number]>;
    private _fovxUpdate;
    private _xbsjCameraVideoResettingEvent;
    private _xbsjCameraVideoResetting;
    get xbsjCameraVideoResetting(): ObjResettingWithEvent<XbsjCameraVideoResetting, Listener<any[]>>;
    get xbsjCameraVideoChanged(): Listener<[XbsjCameraVideoResetting | undefined, XbsjCameraVideoResetting | undefined]>;
    get xbsjCameraVideo(): XbsjCameraVideo | undefined;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmCameraVideo {
    const createDefaultProps: () => {
        show: boolean;
        editing: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        fov: number;
        aspectRatio: number;
        near: number;
        far: number;
        showHelperPrimitive: boolean;
        czmTextureId: string | undefined;
    };
}
export interface CzmCameraVideo extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCameraVideo.createDefaultProps>> {
}
declare class XbsjCameraVideoResetting extends Destroyable {
    private _xbsjCameraVideo;
    get xbsjCameraVideo(): XbsjCameraVideo;
    constructor(czmCameraVideo: CzmCameraVideo, czmViewer: ESCesiumViewer);
}
export {};
