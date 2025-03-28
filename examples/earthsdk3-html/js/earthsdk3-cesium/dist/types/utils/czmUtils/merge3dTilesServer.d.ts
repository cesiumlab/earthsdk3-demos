type returnMerge3dTilesServer = {
    state: 'success' | 'error';
    tilesUrl: {
        [xx: string]: any;
    } | undefined;
    info?: {
        index: number;
        url: string;
        message: string;
    }[];
};
export declare function merge3dTilesServer(tilesUrlArr: any[]): Promise<returnMerge3dTilesServer>;
export {};
