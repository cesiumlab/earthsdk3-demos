import { Destroyable, react } from "xbsj-base";
import { XbsjEarthUi } from "../xbsjEarthUi";

export class ClassicNavigatorManager extends Destroyable {
    private _timeLine = this.dv(react<boolean>(false));//时间线显影
    get timeLine() { return this._timeLine.value; }
    set timeLine(value: boolean) { this._timeLine.value = value; }

    private _timeLineWidth = this.dv(react<string>('calc(100% - 280px)'));
    get timeLineWidth() { return this._timeLineWidth.value; }
    set timeLineWidth(value: string) { this._timeLineWidth.value = value; }
    get timeLineWidthChanged() { return this._timeLineWidth.changed; }

    private _navigatorShow = this.dv(react<boolean>(true))//导航显隐
    get navigatorShow() { return this._navigatorShow.value; }
    set navigatorShow(value: boolean) { this._navigatorShow.value = value; }
    get navigatorShowChanged() { return this._navigatorShow.changed; }

    private _scaleShow = this.dv(react<boolean>(true))//比例尺显隐
    get scaleShow() { return this._scaleShow.value; }
    set scaleShow(value: boolean) { this._scaleShow.value = value; }
    get scaleShowChanged() { return this._scaleShow.changed; }

    private _statusBarShow = this.dv(react<boolean>(true))//显隐
    get statusBarShow() { return this._statusBarShow.value; }
    set statusBarShow(value: boolean) { this._statusBarShow.value = value; }
    get statusBarShowChanged() { return this._statusBarShow.changed; }

    private _navigatorScaleRight = this.dv(react<number>(290))//导航比例尺的right
    get navigatorScaleRight() { return this._navigatorScaleRight.value; }
    set navigatorScaleRight(value: number) { this._navigatorScaleRight.value = value; }
    get navigatorScaleRightChanged() { return this._navigatorScaleRight.changed; }

    constructor(private xbsjEarthUi: XbsjEarthUi) {
        super();
    }
}
