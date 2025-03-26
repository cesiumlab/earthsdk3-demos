import { Destroyable, UniteChanged } from "xbsj-base";
import { Player } from "../../../utils";
export declare class AbsolutePlayer extends Destroyable {
    private _player;
    get player(): Player;
    get ratio(): number;
    get ratioChanged(): import("xbsj-base").Listener<[number, number]>;
    set ratio(value: number);
    constructor();
}
export declare namespace AbsolutePlayer {
    const createDefaultProps: () => {
        currentTime: number | undefined;
        startTime: number | undefined;
        stopTime: number | undefined;
        playing: boolean | undefined;
        loop: boolean | undefined;
        speed: number | undefined;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface AbsolutePlayer extends UniteChanged<ReturnType<typeof AbsolutePlayer.createDefaultProps>> {
}
