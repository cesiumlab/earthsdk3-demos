import { ESObjectsManager } from "earthsdk3";
import { Event } from "xbsj-base";

export default class MyESObjectsManager extends ESObjectsManager {
    constructor(...args) {
        super(...args);
    }

    _viewerSwitchEvent = this.dv(new Event());
    get viewerSwitchEvent() { return this._viewerSwitchEvent; }
}
