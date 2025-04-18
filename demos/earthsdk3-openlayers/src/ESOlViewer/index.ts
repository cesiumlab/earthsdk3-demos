import { ESJFlyToParam, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESSceneObject, ESViewer, ESVOption, PickedResult } from "earthsdk3";
import OlMap from 'ol/Map.js';
import { extendClassProps, ObjResettingWithEvent, react, UniteChanged } from "xbsj-base";
import { OlMapCreating } from "./OlMapCreating";

export class ESOlViewer extends ESViewer {
    static readonly type = this.register('ESOlViewer', this);

    private _viewer = this.dv(react<OlMap | undefined>(undefined));
    get viewer() { return this._viewer.value; }

    constructor(option: ESVOption) {
        super(option);
        if (option.type !== 'ESOlViewer') throw new Error('option.type must be ESOlViewer');
        this.d(this._viewer.changed.don(() => { this.viewerChanged.emit(this.viewer); }));

        this.dv(new ObjResettingWithEvent(this.subContainerChanged, () => {
            this.setStatus('Raw');
            this.setStatusLog('');
            if (!this.subContainer) return undefined;
            return new OlMapCreating(this.subContainer, this, (viewer) => (this._viewer.value = viewer));
        }));

    }

    _func(flag: boolean = false) {
        console.warn('ESOlViewer 暂未实现该方法!');
        return Promise.resolve(undefined);
    }
    //TODO: 以下方法需要实现
    pick(screenPosition: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<PickedResult | undefined> { return this._func(); };
    pickPosition(screenPosition: ESJVector2D): Promise<ESJVector3D | undefined> { return this._func(); };
    flyIn(position: ESJVector3D, rotation?: ESJVector3D, duration?: number): void { this._func(); };
    flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): void { this._func(); };
    flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number | undefined): void { this._func(); };
    getCurrentCameraInfo(): { position: ESJVector3D; rotation: ESJVector3D; } | undefined { return undefined };
    getLengthInPixel(): number | undefined { return undefined; };
    changeToWalk(position: ESJVector3D): void { this._func(); };
    changeToMap(): void { this._func(); };
    changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): void { this._func(); };
    changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): void { this._func(); };
    changeToUserDefined(userDefinedPawn: string): void { this._func(); };
    changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): void { this._func(); };
    changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number): void { this._func(); };
    getFPS(): number { return 0; };
    override  getVersion(): Promise<any> { return this._func(); };
    getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null> { return Promise.resolve(null); };
    getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[] | undefined> { return this._func(); };
    capture(resx?: number, resy?: number): Promise<string | undefined> { return this._func(); };
    lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined> { return this._func(); };
    getBoundSphere(id: string) { return this._func(); };
    startEditing(sceneObject: ESSceneObject, modes: string[] | string, useKeyToSwitch?: boolean): void { this._func(); };
    stopEditing(): void { this._func(); };
    moveObjects(sceneObjects: ESSceneObject[]): void { this._func(); };

}

export namespace ESOlViewer {
    export const createDefaultProps = () => ({
        ...ESViewer.createDefaultProps(),
    });
}
extendClassProps(ESOlViewer.prototype, ESOlViewer.createDefaultProps);
export interface OpenLayersViewer extends UniteChanged<ReturnType<typeof ESOlViewer.createDefaultProps>> { }
