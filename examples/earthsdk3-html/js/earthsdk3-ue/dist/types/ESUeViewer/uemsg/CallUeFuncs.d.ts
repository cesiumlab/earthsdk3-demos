import { ESJVector2DArray, ESJVector3D, PickedResult } from "earthsdk3";
import { UeCloudViewerBase } from "./UeCloudViewerBase";
import { ESFlyToParam, NavigationModeCallFuncParam } from "./UeFuncsType";
declare const flyToCallFunc: (viewer: UeCloudViewerBase, id?: string, duration?: number, flyToParam?: ESFlyToParam, position?: ESJVector3D) => Promise<{
    endType: 0 | 1;
} | undefined>;
declare const destroyCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    error: string | undefined;
}>;
declare const calcFlyToParamCallFunc: (viewer: UeCloudViewerBase, id: string) => void;
declare const refreshTilesetCallFunc: (viewer: UeCloudViewerBase, id: string) => void;
declare const flyInCallFunc: (viewer: UeCloudViewerBase, id?: string, position?: ESJVector3D, rotation?: ESJVector3D, duration?: number) => Promise<{
    endType: 0 | 1;
} | undefined>;
declare const flyInDefaultCameraCallFunc: (viewer: UeCloudViewerBase, Duration?: number) => Promise<{
    error: string | undefined;
} | undefined>;
declare const startVoiceCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    [k: string]: any;
} | undefined>;
declare const stopVoiceCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    [k: string]: any;
} | undefined>;
declare const mountPakFiles: (viewer: UeCloudViewerBase, pakArr: any[]) => Promise<{
    [k: string]: any;
} | undefined>;
declare const generateMemReportCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    [k: string]: any;
} | undefined>;
declare const resetWithCurrentCameraCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    error: string | undefined;
}>;
declare const smoothMoveWithRotationCallFunc: (viewer: UeCloudViewerBase, id: string, Destination: ESJVector3D, NewRotation: ESJVector3D, Time: number) => void;
declare const smoothMoveOnGroundCallFunc: (viewer: UeCloudViewerBase, id: string, Lon: number, Lat: number, Ground: string, Time: number) => void;
declare const smoothMoveWithRotationOnGroundCallFunc: (viewer: UeCloudViewerBase, id: string, NewRotation: ESJVector3D, Lon: number, Lat: number, Time: number, Ground: string) => void;
declare const HighlightFeatureCallFunc: (viewer: UeCloudViewerBase, id: string, HlId: string) => void;
declare const HighlightFeatureAndFlyToCallFunc: (viewer: UeCloudViewerBase, id: string, HlId: string, Duration: number) => void;
declare const SetLayerVisibleCallFunc: (viewer: UeCloudViewerBase, id: string, LayerJson: string) => void;
declare const SetLayerColorCallFunc: (viewer: UeCloudViewerBase, id: string, LayerJson: string) => void;
declare const smoothMoveCallFunc: (viewer: UeCloudViewerBase, id: string, Destination: ESJVector3D, Time: number) => void;
declare const callFunctionCallFunc: (viewer: UeCloudViewerBase, id: string, fn: string, p: {
    [k: string]: any;
}) => void;
declare const setNodePositionCallFunc: (viewer: UeCloudViewerBase, id: string, NodeName: string, NodePosition: ESJVector3D) => void;
declare const setNodeRotationCallFunc: (viewer: UeCloudViewerBase, id: string, NodeName: string, NodeRotation: ESJVector3D) => void;
declare const setNodeScaleCallFunc: (viewer: UeCloudViewerBase, id: string, NodeName: string, NodeScale: ESJVector3D) => void;
declare const changeNavigationModeCallFunc: (viewer: UeCloudViewerBase, parms: NavigationModeCallFuncParam) => Promise<{
    error: string | undefined;
} | undefined>;
declare const setGlobalPropertyCallFunc: (viewer: UeCloudViewerBase, params: {
    [k: string]: any;
}) => Promise<{
    error: string | undefined;
} | undefined>;
declare const quitCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    error: string | undefined;
} | undefined>;
declare const pickCallFunc: (viewer: UeCloudViewerBase, screenPosition_?: [number, number], attachedInfo?: any, parentInfo_?: boolean) => Promise<PickedResult | undefined>;
declare const pickPositionCallFunc: (viewer: UeCloudViewerBase, screenPosition_?: [number, number]) => Promise<[number, number, number] | undefined>;
export declare const getHeightByLonLatCallFunc: (viewer: UeCloudViewerBase, Lon: number, Lat: number, Channel?: string) => Promise<{
    height?: number | undefined;
} | undefined>;
export declare const getHeightByLonLatsCallFunc: (viewer: UeCloudViewerBase, LonLats: ESJVector2DArray, Channel?: string) => Promise<(number | null)[] | undefined>;
export declare const captureCallFunc: (viewer: UeCloudViewerBase, resx?: number, resy?: number) => Promise<string | undefined>;
export declare const getLonLatAltToScreenPositionCallFunc: (viewer: UeCloudViewerBase, position: ESJVector3D) => Promise<{
    X: number;
    Y: number;
}>;
export declare const uePositionToLonLatAltCallFunc: (viewer: UeCloudViewerBase, UEPosition: ESJVector3D) => Promise<ESJVector3D | undefined>;
export declare const getAllSocketNamesByActorTagCallFunc: (viewer: UeCloudViewerBase, ActorTag: string) => Promise<string[] | undefined>;
export declare const getVersionCallFunc: (viewer: UeCloudViewerBase) => Promise<string | undefined>;
export declare const getBoundSphereCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    center?: [number, number, number] | undefined;
    radius?: number | undefined;
    tips?: string | undefined;
} | undefined>;
export declare const getBoundSphereWithChildrenCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    center?: [number, number, number] | undefined;
    radius?: number | undefined;
    tips?: string | undefined;
} | undefined>;
export declare const getStrokeMaterialParamInfoCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    params?: {
        name: string;
        type: string;
        value: number | [number, number, number, number];
    }[] | undefined;
} | undefined>;
export declare const getFillMaterialParamInfoCallFunc: (viewer: UeCloudViewerBase, id: string) => Promise<{
    params?: {
        name: string;
        type: string;
        value: number | [number, number, number, number];
    }[] | undefined;
} | undefined>;
export declare const getGlobalPropertyCallFunc: (viewer: UeCloudViewerBase, props: string[]) => Promise<{
    [k: string]: any;
} | undefined>;
export declare const getObjectByInfoCallFunc: (viewer: UeCloudViewerBase, info: {
    actorTag: string;
    componentTag?: string;
}) => Promise<{
    object?: {
        [k: string]: any;
        type: string;
    } | undefined;
} | undefined>;
export declare const bindActorByTagCallFunc: (viewer: UeCloudViewerBase, ID: string, ActorTag: string) => Promise<{
    re: {
        type: number;
    };
    error: string | undefined;
}>;
export declare const restoreOriginalSceneCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    error: string | undefined;
}>;
export declare const unBindActorByIDCallFunc: (viewer: UeCloudViewerBase, ID: string) => Promise<{
    error: string | undefined;
}>;
export declare const unBindActorByTagCallFunc: (viewer: UeCloudViewerBase, ActorTag: string) => Promise<{
    error: string | undefined;
}>;
export declare const createActorByClassCallFunc: (viewer: UeCloudViewerBase, ID: string, ActorClass: string) => Promise<{
    re: {
        type: number;
    };
    error: string | undefined;
}>;
export declare const bind3DTilesetByTagCallFunc: (viewer: UeCloudViewerBase, ID: string, ActorTag: string) => Promise<{
    re: {
        type: number;
    };
    error: string | undefined;
}>;
export declare const unBind3DTilesetByTagCallFunc: (viewer: UeCloudViewerBase, ActorTag: string) => Promise<{
    error: string | undefined;
}>;
export declare const unBind3DTilesetByIdCallFunc: (viewer: UeCloudViewerBase, ID: string) => Promise<{
    error: string | undefined;
}>;
export declare const bindImageryByTagCallFunc: (viewer: UeCloudViewerBase, ID: string, ActorTag: string, ComponentTag: string) => Promise<{
    re: {
        type: number;
    };
    error: string | undefined;
}>;
export declare const unBindImageryByTagCallFunc: (viewer: UeCloudViewerBase, ActorTag: string, ComponentTag: string) => Promise<{
    error: string | undefined;
}>;
export declare const unBindImageryByIdCallFunc: (viewer: UeCloudViewerBase, ID: string) => Promise<{
    error: string | undefined;
}>;
export declare const getIdByComponentNameAndHitItemCallFunc: (viewer: UeCloudViewerBase, id: string, ComponentName: string, HitItem: number) => Promise<{
    re: {
        TreeId: string;
    };
    error: string | undefined;
}>;
export declare const getCameraRelativeHeightCallFunc: (viewer: UeCloudViewerBase, Channel?: string) => Promise<{
    re: {
        height: number;
    };
    error: string | undefined;
}>;
export declare const saveStringToFileCallFunc: (viewer: UeCloudViewerBase, str: string, Path?: string, File?: string) => Promise<{
    error: string | undefined;
}>;
export declare const highlightActorByTagCallFunc: (viewer: UeCloudViewerBase, actorTag: string, isHighlight?: boolean) => Promise<{
    error: string | undefined;
}>;
export declare const sendCustomMessageCallFunc: (viewer: UeCloudViewerBase, Message: string) => Promise<{
    error: string | undefined;
}>;
export declare const getStatusCallFunc: (viewer: UeCloudViewerBase) => Promise<{
    FPS: number;
    position: [number, number, number];
    rotation: [number, number, number];
    length: number;
} | undefined>;
export declare const startEditingCallFunc: (viewer: UeCloudViewerBase, sceneObjectID: string, modes: string[] | string, useTabToSwitch?: boolean) => Promise<{
    error: string | undefined;
} | undefined>;
export declare const moveObjectsCallFunc: (viewer: UeCloudViewerBase, sceneObjectIDs: string[]) => Promise<{
    error: string | undefined;
} | undefined>;
export { generateMemReportCallFunc, startVoiceCallFunc, pickCallFunc, stopVoiceCallFunc, HighlightFeatureAndFlyToCallFunc, HighlightFeatureCallFunc, SetLayerColorCallFunc, SetLayerVisibleCallFunc, calcFlyToParamCallFunc, callFunctionCallFunc, changeNavigationModeCallFunc, destroyCallFunc, flyInCallFunc, flyInDefaultCameraCallFunc, flyToCallFunc, pickPositionCallFunc, quitCallFunc, refreshTilesetCallFunc, resetWithCurrentCameraCallFunc, setGlobalPropertyCallFunc, setNodePositionCallFunc, setNodeRotationCallFunc, setNodeScaleCallFunc, smoothMoveCallFunc, smoothMoveOnGroundCallFunc, smoothMoveWithRotationCallFunc, smoothMoveWithRotationOnGroundCallFunc, mountPakFiles };
