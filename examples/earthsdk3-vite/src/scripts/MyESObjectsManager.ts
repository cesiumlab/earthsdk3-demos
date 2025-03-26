import { ESObjectsManager } from "earthsdk3";
import { Event } from "xbsj-base";

export default class MyESObjectsManager extends ESObjectsManager {
    constructor(...args: any[]) {
        super(...args);
    }

    private _viewerSwitchEvent = this.dv(new Event<['czm' | 'ue']>());
    get viewerSwitchEvent() { return this._viewerSwitchEvent; }
}
