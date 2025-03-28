import * as Cesium from 'cesium';
declare module "cesium" {
    interface Camera {
        readonly currentFlightEvent: Cesium.Event;
    }
}
export declare function fixCameraFlight(): void;
