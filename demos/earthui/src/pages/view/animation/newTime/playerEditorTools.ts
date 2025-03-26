import { Ref } from "vue";
import { Destroyable } from "xbsj-base";
export abstract class Dragger extends Destroyable {
    protected _startX = this._event.offsetX
    protected _target = this._event.target as HTMLElement
    protected _pointerId = this._event.pointerId
    constructor(protected _event: PointerEvent, ) {
        super();
        this._target.setPointerCapture(this._pointerId)
        this.dispose(() => this._target.releasePointerCapture(this._pointerId))
    }
    abstract update(event: PointerEvent): void
}


export class CurrentTimeLineDragger extends Dragger {

    constructor(event: PointerEvent, private _currentTime: Ref<number>) {
        super(event)
    }
    update(event: PointerEvent) {


    }
}

