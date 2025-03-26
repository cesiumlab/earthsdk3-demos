import { ESTreeParam, ToCutDownScaleType, ToScaleType } from "./index";
export type TreesFuncsType = {
    AddTrees: {
        params: {
            id: string;
            TreeParams: ESTreeParam[];
        };
        result: {
            error: string | undefined;
        };
    };
    RemoveAllTrees: {
        params: {
            id: string;
        };
        result: {
            error: string | undefined;
        };
    };
    UpdateTreeParams: {
        params: {
            id: string;
            TreeParams: ESTreeParam[];
        };
        result: {
            error: string | undefined;
        };
    };
    CutDownTrees: {
        params: {
            id: string;
            TreeIds: ToCutDownScaleType[];
            TimeLength: number;
        };
        result: {
            error: string | undefined;
        };
    };
    GrowthSimulation: {
        params: {
            id: string;
            ToParams: ToScaleType[];
            TimeLength: number;
            SwitchTime: number;
        };
        result: {
            error: string | undefined;
        };
    };
};
declare const addTreesCallFunc: (ueViewer: any, id: string, trees: ESTreeParam[]) => Promise<{
    error: string | undefined;
} | undefined>;
declare const removeAllTreesCallFunc: (ueViewer: any, id: string) => Promise<{
    error: string | undefined;
} | undefined>;
declare const updateTreeParamsCallFunc: (ueViewer: any, id: string, trees: ESTreeParam[]) => Promise<{
    error: string | undefined;
} | undefined>;
declare const cutDownTreesCallFunc: (ueViewer: any, id: string, TreeIds: ToCutDownScaleType[], TimeLength: number) => Promise<{
    error: string | undefined;
} | undefined>;
declare const growthSimulationCallFunc: (ueViewer: any, id: string, ToParams: ToScaleType[], TimeLength: number, SwitchTime: number) => Promise<{
    error: string | undefined;
} | undefined>;
export { addTreesCallFunc, removeAllTreesCallFunc, updateTreeParamsCallFunc, cutDownTreesCallFunc, growthSimulationCallFunc };
