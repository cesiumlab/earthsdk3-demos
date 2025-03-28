export declare function resourcesDownload(url: string, responseType?: XMLHttpRequestResponseType, dlprogress?: (url: string, loaded: number, total: number, isDone: boolean) => void): Promise<unknown>;
export declare function addScriptToDom(scriptCode: Blob): Promise<unknown>;
export declare function formatBytes(bytes: number): string;
export declare const UTF8ArrayToString: (heapOrArray: any, idx?: number, maxBytesToRead?: number) => string;
export declare const UTF8ToString: (ptr: any, maxBytesToRead?: any) => string;
