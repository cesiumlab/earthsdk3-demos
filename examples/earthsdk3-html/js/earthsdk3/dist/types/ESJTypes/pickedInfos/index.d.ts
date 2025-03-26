import { ESSceneObject } from "../../ESObjects";
export declare class PickedInfo {
    childPickedInfo?: PickedInfo | undefined;
    constructor(childPickedInfo?: PickedInfo | undefined);
    static getFinalAttachedInfo(pickedInfo: PickedInfo): any;
}
export declare class AttachedPickedInfo extends PickedInfo {
    attachedInfo: any;
    constructor(attachedInfo: any, childPickedInfo?: PickedInfo);
}
export declare class ESJPickedInfo {
    pickedInfo?: any;
    attachedInfo?: any;
    constructor(pickedInfo?: any, attachedInfo?: any);
}
export declare class DivPickedInfo extends PickedInfo {
    element: any;
    constructor(element: any, childPickedInfo?: PickedInfo);
}
export declare class SceneObjectPickedInfo extends PickedInfo {
    sceneObject: ESSceneObject;
    constructor(sceneObject: ESSceneObject, childPickedInfo?: PickedInfo);
}
export type ESJPickResultType = SceneObjectPickedInfo | {
    childPickedInfo: PickedInfo | undefined;
    sceneObject: undefined;
};
export declare class PickedResult {
    pickResult?: any;
    sceneObject?: ESSceneObject | undefined;
    tilesetPickInfo?: any;
    geojsonPickInfo?: any;
    attachedInfo?: any;
    constructor(pickResult?: any, sceneObject?: ESSceneObject | undefined, tilesetPickInfo?: any, geojsonPickInfo?: any, attachedInfo?: any);
}
