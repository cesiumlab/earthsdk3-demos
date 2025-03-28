import { JsonValue } from "xbsj-base";
import { UeEventsType } from "./UeEventsType";
import { PickedInfo } from "earthsdk3";
export type Vector2D = [number, number];
export type ESTreeType = {
    name: string;
    mesh: string;
    cullingDistance: number;
    scale: number;
};
export type ESXiaoBanWidget = {
    class: string;
    pivot: Vector2D;
    space: number;
};
export type ESPoiType = {
    type: string;
    povit: Vector2D;
    widget: string;
    worldScale: number;
    hiddenDistance: number;
};
export type WidthType = "world" | "screen";
export type ESPointStyle = {
    size: number;
    sizeType: WidthType;
    color: [number, number, number, number];
    material: string;
    materialParams: JsonValue;
};
export type ESStrokeStyle = {
    width: number;
    widthType: WidthType;
    color: [number, number, number, number];
    material: string;
    materialParams: JsonValue;
};
export type ESFillStyle = {
    color: [number, number, number, number];
    material: string;
    materialParams: JsonValue;
};
export type ESFlyToParam = {
    distance: number;
    heading: number;
    pitch: number;
    flyDuration: number;
    hDelta: number;
    pDelta: number;
};
export type NavigationModeCallFuncParam = {
    mode: 'Map';
} | {
    mode: 'Walk';
    position: [number, number, number];
    jumpZVelocity: number;
} | {
    mode: 'Line';
    geoLineStringId: string;
    speed: number;
    heightOffset: number;
    loop: boolean;
    turnRateDPS: number;
    lineMode: "auto" | "manual";
} | {
    mode: 'UserDefined';
    userDefinedPawn: string;
} | {
    mode: 'RotateGlobe';
    latitude: number;
    height: number;
    cycleTime: number;
} | {
    mode: 'RotatePoint';
    position: [number, number, number];
    distance: number;
    orbitPeriod: number;
    heading: number;
    pitch: number;
} | {
    mode: 'Follow';
    objectId: string;
    distance: number;
    heading: number;
    pitch: number;
    relativeRotation: boolean;
};
export type UeVisualObject = {
    show: boolean;
    flyToParam: ESFlyToParam;
    name: string;
};
export type UeGeoVector = {
    editing: boolean;
    pointStyle: ESPointStyle;
    pointed: boolean;
    strokeStyle: ESStrokeStyle;
    stroked: boolean;
    fillStyle: ESFillStyle;
    filled: boolean;
} & UeVisualObject;
export type UeObjectWithLocation = {
    rotation: [number, number, number];
    position: [number, number, number];
    editing: boolean;
} & UeVisualObject;
export type UeLabel = {
    screenRender: boolean;
    size: [number, number];
    anchor: [number, number];
    sizeByContent: boolean;
} & UeObjectWithLocation;
export type UeCreateFuncParams = (Partial<UeVisualObject> & {
    type: 'ESTerrainLayer';
    id: string;
    url?: string;
    actorTag?: string;
}) | (Partial<UeVisualObject> & {
    type: 'ESImageryLayer';
    id: string;
    url?: string;
}) | (Partial<UeVisualObject> & {
    type: 'ES3DTileset';
    id: string;
    url?: string;
}) | (Partial<UeVisualObject> & {
    type: 'ESForestTileset';
    id: string;
    url?: string;
    treeTypes?: ESTreeType[];
    xiaoBanWidget?: ESXiaoBanWidget;
    youShiSZ?: string;
    diLei?: string;
    senLinLB?: string;
    labelMaterial?: string;
    heightOffset?: number;
}) | (Partial<UeVisualObject> & {
    type: 'ESPoiTileset';
    id: string;
    url?: string;
    poiTypes?: ESPoiType[];
    heightOffset?: number;
}) | (Partial<UeVisualObject> & {
    type: 'ESPolygonFence';
    id: string;
    materialPath?: string;
    height?: number;
    points?: [number, number, number][];
    editing?: boolean;
}) | (Partial<UeVisualObject> & {
    type: 'ESPipeFence';
    id: string;
    materialPath?: string;
    height?: number;
    width?: number;
    points?: [number, number, number][];
    editing?: boolean;
}) | (Partial<UeVisualObject> & {
    type: 'ESUEWidget';
    id: string;
}) | (Partial<UeGeoVector> & {
    type: 'ESGeoLineString';
    id: string;
    points?: [number, number, number][];
}) | (Partial<UeGeoVector> & {
    type: 'ESPath';
    id: string;
    points?: [number, number, number][];
}) | (Partial<UeGeoVector> & {
    type: 'ESSpline';
    id: string;
    points?: [number, number, number][];
    strokeMaterialPath?: string;
}) | (Partial<UeGeoVector> & {
    type: 'ESGeoPolygon';
    id: string;
    points?: [number, number, number][];
}) | (Partial<UeObjectWithLocation> & {
    type: 'ESCameraView';
    id: string;
}) | (Partial<UeObjectWithLocation> & {
    type: 'ESGltfModel';
    id: string;
    url?: string;
}) | (Partial<UeObjectWithLocation> & {
    type: "ESUnrealActor";
    id: string;
    actorTag?: string;
    opacity?: number;
    actorClass?: string;
    highlight?: boolean;
    collision?: boolean;
    allowPicking?: boolean;
}) | (Partial<UeLabel> & {
    type: 'ESTextLabel';
    id: string;
    text?: string;
    color?: [number, number, number, number];
}) | (Partial<UeLabel> & {
    type: 'ESImageLabel';
    id: string;
    url?: string;
}) | (Partial<UeObjectWithLocation> & {
    type: 'ESLocalPolygonZ';
    id: string;
    color?: [number, number, number, number];
    outline?: boolean;
    outlineColor?: [number, number, number, number];
    outlineWidth?: number;
}) | (Partial<UeObjectWithLocation> & {
    type: 'ESLocalPolygon';
    id: string;
    points?: [number, number][];
}) | (Partial<UeObjectWithLocation> & {
    type: 'ESLocalCircle';
    id: string;
    radius?: number;
}) | {
    type: 'ESPipeserTileset';
    id: string;
} | {
    type: string;
    id: string;
};
export type UeFuncsType = {
    create: {
        params: UeCreateFuncParams;
        result: {
            error: string | undefined;
        };
    };
    SendCustomMessage: {
        params: {
            Message: string;
        };
        result: {
            error: string | undefined;
        };
    };
    BindActorByTag: {
        params: {
            ID: string;
            ActorTag: string;
        };
        result: {
            re: {
                type: number;
            };
            error: string | undefined;
        };
    };
    UnBindActorByID: {
        params: {
            ID: string;
        };
        result: {
            error: string | undefined;
        };
    };
    UnBindActorByTag: {
        params: {
            ActorTag: string;
        };
        result: {
            error: string | undefined;
        };
    };
    CreateActorByClass: {
        params: {
            ID: string;
            ActorClass: string;
        };
        result: {
            re: {
                type: number;
            };
            error: string | undefined;
        };
    };
    destroy: {
        params: {
            id: string;
        };
        result: {
            error: string | undefined;
        };
    };
    update: {
        params: {
            id: string;
            [k: string]: any;
        };
        result: {
            error: string | undefined;
        };
    };
    addEventListener: {
        params: {
            eid: string;
            et: keyof UeEventsType;
        };
        result: {
            error: string | undefined;
        };
    };
    removeEventListener: {
        params: {
            eid: string;
        };
        result: {
            error: string | undefined;
        };
    };
    RestoreOriginalScene: {
        params: undefined;
        result: {
            error: string | undefined;
        };
    };
    GetIdByComponentNameAndHitItem: {
        params: {
            id: string;
            ComponentName: string;
            HitItem: number;
        };
        result: {
            re: {
                TreeId: string;
            };
            error: string | undefined;
        };
    };
    flyTo: {
        params: {
            id?: string;
            duration?: number;
            flyToParam?: ESFlyToParam;
            position?: [number, number, number];
        };
        result: {
            error: string | undefined;
            re: {
                endType: 0 | 1;
            };
        };
    };
    flyIn: {
        params: {
            id?: string;
            position?: [number, number, number];
            rotation?: [number, number, number];
            duration?: number;
        };
        result: {
            error: string | undefined;
            re: {
                endType: 0 | 1;
            };
        };
    };
    GetObjectByInfo: {
        params: {
            info: {
                actorTag: string;
                componentTag?: string;
            };
        };
        result: {
            re: {
                object?: {
                    type: string;
                    [k: string]: any;
                };
            };
            error: string | undefined;
        };
    };
    GetHeightByLonLat: {
        params: {
            Lon: number;
            Lat: number;
            Channel: string;
        };
        result: {
            re: {
                height?: number;
            };
            error: string | undefined;
        };
    };
    getCurrentCameraInfo: {
        params: undefined;
        result: {
            re: {
                position: [number, number, number];
                rotation: [number, number, number];
            };
            error: string | undefined;
        };
    };
    GetFPS: {
        params: undefined;
        result: {
            re: {
                FPS: number;
            };
            error: string | undefined;
        };
    };
    GetStatus: {
        params: undefined;
        result: {
            re: {
                FPS: number;
                position: [number, number, number];
                rotation: [number, number, number];
                length: number;
            };
            error: string | undefined;
        };
    };
    LonLatAltToScreenPosition: {
        params: {
            LonLatAlt: [number, number, number];
        };
        result: {
            re: {
                X: number;
                Y: number;
            };
            error: string | undefined;
        };
    };
    ChangeNavigationMode: {
        params: NavigationModeCallFuncParam;
        result: {
            error: string | undefined;
        };
    };
    resetWithCurrentCamera: {
        params: {
            id: string;
        };
        result: {
            error: string | undefined;
        };
    };
    capture: {
        params: {
            resx: number;
            resy: number;
        };
        result: {
            re: {
                image: string;
            };
            error: string | undefined;
        };
    };
    setGlobalProperty: {
        params: {
            [k: string]: any;
        };
        result: {
            error: string | undefined;
        };
    };
    getGlobalProperty: {
        params: {
            props: string[];
        };
        result: {
            re: {
                [k: string]: any;
            };
            error: string | undefined;
        };
    };
    calcFlyToParam: {
        params: {
            id: string;
        };
        result: {
            error: string | undefined;
        };
    };
    pick: {
        params: {
            screenPosition?: [number, number];
            parentInfo?: boolean;
        };
        result: {
            re: {
                id?: string;
                position?: [number, number, number];
                screenPosition?: [number, number];
                actorTags?: string[];
                className?: string;
                parentInfo?: {
                    name?: string;
                    className?: string;
                    actorTags?: string[];
                }[];
                features?: {
                    [k: string]: any;
                };
                hitItem?: number;
                componentName?: string;
                add?: {
                    [key: string]: any;
                };
                [key: string]: any;
            };
            error: string | undefined;
        };
    };
    pickPosition: {
        params: {
            screenPosition?: [number, number];
            parentInfo?: boolean;
        };
        result: {
            re: {
                position: [number, number, number];
            };
            error: string | undefined;
        };
    };
    callFunction: {
        params: {
            id: string;
            fn: string;
            p: {
                [k: string]: any;
            };
        };
        result: {
            error: string | undefined;
        };
    };
    smoothMove: {
        params: {
            id: string;
            Destination: [number, number, number];
            Time: number;
        };
        result: {
            error: string | undefined;
        };
    };
    smoothMoveWithRotation: {
        params: {
            id: string;
            Destination: [number, number, number];
            NewRotation: [number, number, number];
            Time: number;
        };
        result: {
            error: string | undefined;
        };
    };
    smoothMoveOnGround: {
        params: {
            id: string;
            Lon: number;
            Lat: number;
            Time: number;
            Ground: string;
        };
        result: {
            error: string | undefined;
        };
    };
    smoothMoveWithRotationOnGround: {
        params: {
            id: string;
            NewRotation: [number, number, number];
            Lon: number;
            Lat: number;
            Time: number;
            Ground: string;
        };
        result: {
            error: string | undefined;
        };
    };
    UEPositionToLonLatAlt: {
        params: {
            UEPosition: [number, number, number];
        };
        result: {
            re: {
                LonLatAlt: [number, number, number];
            };
            error: string | undefined;
        };
    };
    GetAllSocketNamesByActorTag: {
        params: {
            ActorTag: string;
        };
        result: {
            re: {
                socketNames: string[];
            };
            error: string | undefined;
        };
    };
    refreshTileset: {
        params: {
            id: string;
        };
        result: {
            error: string | undefined;
        };
    };
    HighlightFeature: {
        params: {
            id: string;
            HlId: string;
        };
        result: {
            error: string | undefined;
        };
    };
    HighlightFeatureAndFlyTo: {
        params: {
            id: string;
            HlId: string;
            Duration: number;
        };
        result: {
            error: string | undefined;
        };
    };
    SetLayerVisible: {
        params: {
            id: string;
            LayerJson: string;
        };
        result: {
            error: string | undefined;
        };
    };
    SetLayerColor: {
        params: {
            id: string;
            LayerJson: string;
        };
        result: {
            error: string | undefined;
        };
    };
    DefaultCameraFlyIn: {
        params: {
            Duration: number;
        };
        result: {
            error: string | undefined;
        };
    };
    GetBoundSphere: {
        params: {
            id: string;
        };
        result: {
            re: {
                center?: [number, number, number];
                radius?: number;
                tips?: string;
            };
            error: string | undefined;
        };
    };
    GetBoundSphereWithChildren: {
        params: {
            id: string;
        };
        result: {
            re: {
                center?: [number, number, number];
                radius?: number;
                tips?: string;
            };
            error: string | undefined;
        };
    };
    Quit: {
        params: undefined;
        result: {
            error: string | undefined;
        };
    };
    GetStrokeMaterialParamInfo: {
        params: {
            id: string;
        };
        result: {
            re: {
                params?: {
                    name: string;
                    type: string;
                    value: number | [number, number, number, number];
                }[];
            };
            error: string | undefined;
        };
    };
    GetFillMaterialParamInfo: {
        params: {
            id: string;
        };
        result: {
            re: {
                params?: {
                    name: string;
                    type: string;
                    value: number | [number, number, number, number];
                }[];
            };
            error: string | undefined;
        };
    };
    GetVersion: {
        params: undefined;
        result: {
            re: {
                version: string;
            };
            error: string | undefined;
        };
    };
    Bind3DTilesetByTag: {
        params: {
            ID: string;
            ActorTag: string;
        };
        result: {
            re: {
                type: number;
            };
            error: string | undefined;
        };
    };
    UnBind3DTilesetByTag: {
        params: {
            ActorTag: string;
        };
        result: {
            error: string | undefined;
        };
    };
    UnBind3DTilesetById: {
        params: {
            ID: string;
        };
        result: {
            error: string | undefined;
        };
    };
    BindImageryByTag: {
        params: {
            ID: string;
            ActorTag: string;
            ComponentTag: string;
        };
        result: {
            re: {
                type: number;
            };
            error: string | undefined;
        };
    };
    UnBindImageryByTag: {
        params: {
            ActorTag: string;
            ComponentTag: string;
        };
        result: {
            error: string | undefined;
        };
    };
    UnBindImageryById: {
        params: {
            ID: string;
        };
        result: {
            error: string | undefined;
        };
    };
    GetHeightsByLonLats: {
        params: {
            LonLats: [number, number][];
            Channel: string;
        };
        result: {
            re: {
                heights: (number | null)[];
            };
            error: string | undefined;
        };
    };
    GetCameraRelativeHeight: {
        params: {
            Channel: string;
        };
        result: {
            re: {
                height: number;
            };
            error: string | undefined;
        };
    };
    SaveStringToFile: {
        params: {
            String: string;
            Path?: string;
            File?: string;
        };
        result: {
            error: string | undefined;
        };
    };
    SetNodePosition: {
        params: {
            id: string;
            NodeName: string;
            NodePosition: [number, number, number];
        };
        result: {
            error: string | undefined;
        };
    };
    SetNodeRotation: {
        params: {
            id: string;
            NodeName: string;
            NodeRotation: [number, number, number];
        };
        result: {
            error: string | undefined;
        };
    };
    SetNodeScale: {
        params: {
            id: string;
            NodeName: string;
            NodeScale: [number, number, number];
        };
        result: {
            error: string | undefined;
        };
    };
    HighlightActorByTag: {
        params: {
            ActorTag: string;
            Highlight: boolean;
        };
        result: {
            error: string | undefined;
        };
    };
    GetLengthInPixel: {
        params: undefined;
        result: {
            re: {
                length: number;
            };
            error: string | undefined;
        };
    };
    startEditing: {
        params: {
            sceneObjectID: string;
            modes: string[] | string;
            useTabToSwitch?: boolean;
        };
        result: {
            error: string | undefined;
        };
    };
    moveObjects: {
        params: {
            sceneObjectIDs: string[];
        };
        result: {
            error: string | undefined;
        };
    };
    [k: string]: {
        params: {
            [k: string]: any;
        } | undefined;
        result: {
            [k: string]: any;
        };
    };
};
export declare class UePickedInfo extends PickedInfo {
    uePickResult?: {
        [key: string]: any;
        id?: string | undefined;
        position?: [number, number, number] | undefined;
        screenPosition?: [number, number] | undefined;
        actorTags?: string[] | undefined;
        className?: string | undefined;
        parentInfo?: {
            name?: string | undefined;
            className?: string | undefined;
            actorTags?: string[] | undefined;
        }[] | undefined;
        features?: {
            [k: string]: any;
        } | undefined;
        hitItem?: number | undefined;
        componentName?: string | undefined;
        add?: {
            [key: string]: any;
        } | undefined;
    } | undefined;
    tilesetPickInfo?: any;
    constructor(uePickResult?: {
        [key: string]: any;
        id?: string | undefined;
        position?: [number, number, number] | undefined;
        screenPosition?: [number, number] | undefined;
        actorTags?: string[] | undefined;
        className?: string | undefined;
        parentInfo?: {
            name?: string | undefined;
            className?: string | undefined;
            actorTags?: string[] | undefined;
        }[] | undefined;
        features?: {
            [k: string]: any;
        } | undefined;
        hitItem?: number | undefined;
        componentName?: string | undefined;
        add?: {
            [key: string]: any;
        } | undefined;
    } | undefined, childPickedInfo?: PickedInfo, tilesetPickInfo?: any);
}
