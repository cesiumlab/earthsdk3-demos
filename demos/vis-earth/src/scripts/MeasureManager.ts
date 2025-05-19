import { Destroyable, react } from "xbsj-base"
import type { VisObjectsManager } from "./VisObjectsManager";
import { EngineObject, ESAreaMeasurement, ESDistanceMeasurement, ESPoi2D, ESViewer } from "earthsdk3";
export type MeasureType = ESDistanceMeasurement | ESAreaMeasurement
export type MeasureTypeParam = 'ESDistanceMeasurement' | 'ESAreaMeasurement'

export class MeasureManager extends Destroyable {
    private _enable = this.dv(react<boolean>(false));
    get enable() { return this._enable.value; }
    set enable(value: boolean) { this._enable.value = value; }
    get enableChanged() { return this._enable.changed; }

    private _poi: ESPoi2D;
    get poi() { return this._poi; }

    private _objectlist: MeasureType[] = [];
    get objectlist() { return this._objectlist }
    constructor(private objm: VisObjectsManager) {
        super()
        console.log('ESViewer', ESViewer.context.registerObjsMap);
        console.log('EngineObject', EngineObject.context.registerEngines);

        const poi = this.objm.createSceneObjectFromClass(ESPoi2D);
        poi.show = false;
        poi.mode = 'P3D06';
        this._poi = poi;
    }
    create(type: MeasureTypeParam) {
        let esMeasurement = this.objm.createSceneObject<MeasureType>(type);
        if (!esMeasurement) {
            console.warn(`测量时，不能创建${type}类型的场景对象！`);
            return;
        }
        this._objectlist.push(esMeasurement);
        esMeasurement.editing = true;
    }

    clearAll() {
        if (this._objectlist.length === 0) return
        this._objectlist.forEach(item => {
            this.objm.destroySceneObject(item)
        })
        this._objectlist.length = 0
    }

}
