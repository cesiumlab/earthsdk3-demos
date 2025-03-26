import { ESPlayer } from "../ESObjects";
import { Destroyable } from "xbsj-base";
import { ESObjectsManager } from ".";
type ChannelType = {
    pathId: string;
    sceneObjectIds: string[];
};
export declare class PathAnimationManager extends Destroyable {
    private _objectManager;
    private _player;
    get player(): ESPlayer;
    private _channels;
    get channels(): ChannelType[];
    get channelsChanged(): import("xbsj-base").Listener<[ChannelType[], ChannelType[]]>;
    set channels(value: ChannelType[]);
    constructor(_objectManager: ESObjectsManager);
}
export {};
