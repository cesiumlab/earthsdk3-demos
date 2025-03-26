import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmView extends Destroyable {
    private _czmViewer;
    static ResetFlag: {
        Position: number;
        Rotation: number;
        ViewDistance: number;
    };
    private _captureEvent;
    get captureEvent(): Event<[width?: number | undefined, height?: number | undefined]>;
    /**
    * 获取缩略图
    * @param x 缩略图的宽度
    * @param y 缩略图的高度
    */
    capture(width?: number, height?: number): void;
    static defaults: {
        thumbnailWidth: number;
        thumbnailHeight: number;
        enabled: boolean;
        show: boolean;
        position: [number, number, number];
        duration: number;
        default: boolean;
        thumbnail: string;
    };
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): Listener<[string, string]>;
    constructor(_czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    /**
     *
     * @param flag 1表示位置 2表示姿态 4表示视距 1|2|4表示全部
     * @returns
     */
    resetWithCurrentCamera(flag: number): void;
    /**
    * 飞入视角
    * @param duration 飞行时间
    */
    flyTo(duration?: number, onlyActived?: boolean): void;
}
export declare namespace CzmView {
    const createDefaultProps: () => {
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        show: boolean;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        viewDistance: number;
        duration: number | undefined;
        default: boolean;
        thumbnail: string;
    };
}
export interface CzmView extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmView.createDefaultProps>> {
}
