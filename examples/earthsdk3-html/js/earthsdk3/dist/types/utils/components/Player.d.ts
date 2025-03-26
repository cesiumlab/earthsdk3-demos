import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export type PlayerChannelType = [id: string, startTimeStamp: number, duration: number];
export declare class Player extends Destroyable {
    private _ratio;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): import("xbsj-base").Listener<[number, number]>;
    private _subPlayers;
    static defaults: {
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        channels: boolean;
        ratio: number;
    };
    constructor();
    static channelsReadMe: string;
}
export declare namespace Player {
    const createDefaultProps: () => {
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        channels: import("xbsj-base").ReactiveVariable<PlayerChannelType[] | undefined>;
    };
}
export interface Player extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof Player.createDefaultProps>> {
}
