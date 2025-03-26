import { ESJVector3D } from "earthsdk3";
export type SmoothMoveRelativelyType = {
    SmoothMoveRelatively: {
        params: {
            id: string;
            RelativePosition: ESJVector3D;
            Time: number;
        };
        result: {
            error: string | undefined;
        };
    };
};
export type SmoothMoveRelativelyWithRotationType = {
    SmoothMoveRelativelyWithRotation: {
        params: {
            id: string;
            RelativePosition: ESJVector3D;
            NewRotation: ESJVector3D;
            Time: number;
        };
        result: {
            error: string | undefined;
        };
    };
};
export type CallUeFuncResult = {
    error: string | undefined;
};
