import { Destroyable } from 'xbsj-base';
import { KeyboardCameraController } from './KeyboardCameraController';
import { MouseCameraController } from './MouseCameraController';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import * as Cesium from 'cesium';
export declare class FirstPersonController extends Destroyable {
    private _viewer;
    viewer: Cesium.Viewer;
    get czmViewer(): ESCesiumViewer;
    private _mouseCameraController;
    get mouseCameraController(): MouseCameraController;
    get mouseEnabled(): boolean;
    set mouseEnabled(value: boolean);
    get mouseEnabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _keyboardCameraController;
    get keyboardCameraController(): KeyboardCameraController;
    get keyboardEnabled(): boolean;
    set keyboardEnabled(value: boolean);
    get keyboardEnabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    constructor(_viewer: ESCesiumViewer);
}
