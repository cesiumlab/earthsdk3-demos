import { Event, UniteChanged } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
/**
 * https://www.wolai.com/earthsdk/sb6BoXk1ALsXvGf76g1tLW
 */
export declare class ESCameraView extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _thumbnail;
    get thumbnail(): string;
    set thumbnail(value: string);
    get thumbnailChanged(): import("xbsj-base").Listener<[string, string]>;
    private _duration;
    get duration(): number;
    set duration(value: number);
    get durationChanged(): import("xbsj-base").Listener<[number, number]>;
    private _resetWithCurrentCameraEvent;
    get resetWithCurrentCameraEvent(): Event<[]>;
    /**
     * 设置为当前视角
     */
    resetWithCurrentCamera(): void;
    private _captureEvent;
    get captureEvent(): Event<[x?: number | undefined, y?: number | undefined]>;
    /**
     * 获取缩略图
     * @param x 缩略图的宽度
     * @param y 缩略图的
     */
    capture(x?: number, y?: number): void;
    /**
     * 用于在创建时自动执行
     */
    execOnCreating(): void;
    /**
     * 以当前相机的姿态重置相机姿态 resetCamera名称修改initByCurrent
     * @returns
     */
    initByCurrent(): Promise<void>;
    static defaults: {
        thumbnailWidth: number;
        thumbnailHeight: number;
        duration: number;
        thumbnail: string;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESCameraView {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESCameraView extends UniteChanged<ReturnType<typeof ESCameraView.createDefaultProps>> {
}
