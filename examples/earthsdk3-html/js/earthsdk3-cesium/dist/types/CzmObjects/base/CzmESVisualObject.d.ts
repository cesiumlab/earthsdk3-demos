import { ESCesiumViewer } from "../../ESCesiumViewer";
import { EngineObject, ESJEditingBindModeType, ESVisualObject } from "earthsdk3";
export declare class CzmESVisualObject<T extends ESVisualObject = ESVisualObject, V extends ESCesiumViewer = ESCesiumViewer> extends EngineObject<T, V> {
    editingBindMode: ESJEditingBindModeType;
    constructor(sceneObject: T, czmViewer: V);
    updateEditing(): void;
    /**
     *
     * @param id
     * @param position
     * @param viewDistance
     * @param rotation
     * @param duration 注意单位是秒
     * @param hdelta
     * @param pdelta
     */
    protected flyToWithPromise(id: number, position: [number, number, number], viewDistance?: number | undefined, rotation?: [number, number, number] | undefined, duration?: number | undefined, hdelta?: number | undefined, pdelta?: number | undefined): void;
    /**
     *
     * @param duration 注意ES对象的时间单位都是秒
     * @param id
     * @returns
     */
    flyTo(duration: number | undefined, id: number): boolean;
    /**
     *
     * @param duration 注意ES对象的时间单位都是秒
     * @param id
     * @returns
     */
    flyIn(duration: number | undefined, id: number): boolean;
    get czmViewer(): ESCesiumViewer;
}
