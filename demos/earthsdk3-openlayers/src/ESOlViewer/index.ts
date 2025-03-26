import { ESJFlyToParam, ESJVector2D, ESJVector2DArray, ESJVector3D, ESJVector4D, ESViewer, ESVOption, PickedResult } from "earthsdk3";
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

    //TODO: 以下方法需要实现
    pick(screenPosition: ESJVector2D, attachedInfo?: any, parentInfo?: boolean): Promise<PickedResult | undefined> { return Promise.resolve(undefined); };
    pickPosition(screenPosition: ESJVector2D): Promise<ESJVector3D | undefined> { return Promise.resolve(undefined); };
    flyIn(position: ESJVector3D, rotation?: ESJVector3D, duration?: number): void { };
    flyTo(flyToParam: ESJFlyToParam, position: ESJVector3D): void { };
    flyToBoundingSphere(rectangle: ESJVector4D, distance?: number, duration?: number | undefined): void { };
    getCurrentCameraInfo(): { position: ESJVector3D; rotation: ESJVector3D; } | undefined { return undefined; };
    getLengthInPixel(): number | undefined { return undefined; };
    changeToWalk(position: ESJVector3D): void { };
    changeToMap(): void { };
    changeToRotateGlobe(latitude?: number, height?: number, cycleTime?: number): void { };
    changeToLine(geoLineStringId: string, speed?: number, heightOffset?: number, loop?: boolean, turnRateDPS?: number, lineMode?: "auto" | "manual"): void { };
    changeToUserDefined(userDefinedPawn: string): void { };
    changeToRotatePoint(position: ESJVector3D, distance?: number, orbitPeriod?: number, heading?: number, pitch?: number): void { };
    changeToFollow(objectId: string, distance?: number, heading?: number, pitch?: number): void { };
    getFPS(): number { return 0; };
    override  getVersion(): Promise<any> { return Promise.resolve(undefined); };
    getHeightByLonLat(lon: number, lat: number, channel?: string): Promise<number | null> { return Promise.resolve(null); };
    getHeightsByLonLats(lonLats: ESJVector2DArray, channel?: string): Promise<(number | null)[] | undefined> { return Promise.resolve(undefined); };
    capture(resx?: number, resy?: number): Promise<string | undefined> { return Promise.resolve(undefined); };
    lonLatAltToScreenPosition(position: ESJVector3D): Promise<ESJVector2D | undefined> { return Promise.resolve(undefined); };
}

export namespace ESOlViewer {
    export const createDefaultProps = () => ({
        ...ESViewer.createDefaultProps(),
    });
}
extendClassProps(ESOlViewer.prototype, ESOlViewer.createDefaultProps);
export interface OpenLayersViewer extends UniteChanged<ReturnType<typeof ESOlViewer.createDefaultProps>> { }
