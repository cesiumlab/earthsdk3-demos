import { Ref } from "vue";
import { Destroyable } from "earthsdk3";
import { XbsjEarthUi } from "../../../../scripts/xbsjEarthUi";
import { ESPath, ESSceneObject } from "earthsdk3";
export abstract class Dragger extends Destroyable {
    protected _startX: number;
    protected _target: HTMLElement;
    protected _pointerId: number;
    // protected _startX = this._event.offsetX
    // protected _target = this._event.target as HTMLElement
    // protected _pointerId = this._event.pointerId
    constructor(protected _event: PointerEvent, protected _xScale: Ref<number>) {
        super();
        // 安全获取 offsetX，优先从 event.offsetX 获取，否则计算相对位置
        this._startX = _event.offsetX

        this._target = _event.target as HTMLElement;
        this._pointerId = _event.pointerId;
        this._target.setPointerCapture(this._pointerId)
        this.dispose(() => this._target.releasePointerCapture(this._pointerId))
    }
    abstract update(event: PointerEvent): void
}


export class StartTimeLineDragger extends Dragger {
    protected _start: number;

    constructor(event: PointerEvent, xScale: Ref<number>, private _startTimeRef: Ref<number>) {
        super(event, xScale)
        this._start = this._startTimeRef.value

    }
    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value
        this._startTimeRef.value = this._start + diff * 1000
    }
}
export class CurrentTimeLineDragger extends Dragger {
    // private _start = this._currentTime.value
    private _start: number; // 先声明但不初始化
    constructor(event: PointerEvent, xScale: Ref<number>, private _currentTime: Ref<number>) {
        super(event, xScale)
        // 添加防御性检查
        if (!this._currentTime || typeof this._currentTime.value === 'undefined') {
            throw new Error('Invalid currentTime ref provided');
        }

        // 现在安全地初始化
        this._start = this._currentTime.value;
    }
    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value
        this._currentTime.value = this._start + diff * 1000
    }
}

export class LastTimeLineDragger extends Dragger {
    private _start: number; // 先声明但不初始化
    constructor(event: PointerEvent, xScale: Ref<number>, private _stopTimeRef: Ref<number>) {
        super(event, xScale)
        this._start = this._stopTimeRef.value
    }

    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value
        this._stopTimeRef.value = this._start + diff * 1000
    }
}

export class PlayingRectLineDragger extends Dragger {
    private _startTimeStamps: number[]
    private _scene: ESPath

    constructor(event: PointerEvent, xScale: Ref<number>, private _channelIndex: number, private _xbsjEarthUi: XbsjEarthUi, private _channelsRef: Ref<{
        pathId: string;
        flag: boolean;
        sceneObjectIds: string[];
    }[] | undefined>) {
        super(event, xScale)
        const channelsRef = this._channelsRef;
        const channels = channelsRef.value
        if (!channels) {
            throw new Error(`!channels`)
        }
        const channel = channels[this._channelIndex]
        if (!channel) {
            throw new Error(`!channel`)
        }
        this._scene = this._xbsjEarthUi.getSceneObjectById(channel.pathId) as ESPath
        //@ts-ignore
        this._startTimeStamps = [...this._scene.timeStamps]
    }

    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value
        if (this._scene && this._scene.timeStamps && this._scene.timeStamps.length > 0) {
            let newTimeStamps: number[] = []
            this._startTimeStamps.forEach((item) => {
                newTimeStamps.push(item + diff * 1000)
            })
            this._scene.timeStamps = newTimeStamps
        }
    }
}

export class PlayingChannelLeftLineDragger extends Dragger {
    private _start: number
    private _scene: ESPath
    constructor(event: PointerEvent, xScale: Ref<number>, private _channelIndex: number, private _xbsjEarthUi: XbsjEarthUi, private _channelsRef: Ref<{
        pathId: string;
        flag: boolean;
        sceneObjectIds: string[];
    }[] | undefined>) {
        super(event, xScale)
        const channelsRef = this._channelsRef;
        const channels = channelsRef.value
        if (!channels) {
            throw new Error(`!channels`)
        }
        const channel = channels[this._channelIndex]
        if (!channel) {
            throw new Error(`!channel`)
        }
        this._scene = this._xbsjEarthUi.getSceneObjectById(channel.pathId) as ESPath
        //@ts-ignore
        this._start = this._scene.timeStamps[0]
    }

    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value

        if (this._scene && this._scene.timeStamps && this._scene.timeStamps.length > 0) {
            const timeStamps = [...this._scene.timeStamps]
            timeStamps[0] = this._start + diff * 1000
            this._scene.timeStamps = timeStamps
        }
    }
}

export class PlayingChannelRightLineDragger extends Dragger {
    private _start: number
    private _scene: ESPath

    constructor(event: PointerEvent, xScale: Ref<number>, private _channelIndex: number, private _xbsjEarthUi: XbsjEarthUi, private _channelsRef: Ref<{
        pathId: string;
        flag: boolean;
        sceneObjectIds: string[];
    }[] | undefined>) {
        super(event, xScale)
        const channelsRef = this._channelsRef;
        const channels = channelsRef.value
        if (!channels) {
            throw new Error(`!channels`)
        }
        const channel = channels[this._channelIndex]
        if (!channel) {
            throw new Error(`!channel`)
        }
        this._scene = this._xbsjEarthUi.getSceneObjectById(channel.pathId) as ESPath
        //@ts-ignore
        this._start = this._scene.timeStamps[this._scene.timeStamps.length - 1]
    }
    update(event: PointerEvent) {
        const diff = (event.offsetX - this._startX) / this._xScale.value
        if (this._scene && this._scene.timeStamps && this._scene.timeStamps.length > 0) {
            const timeStamps = [...this._scene.timeStamps]
            timeStamps[timeStamps.length - 1] = this._start + diff * 1000
            this._scene.timeStamps = timeStamps
        }
    }
}
