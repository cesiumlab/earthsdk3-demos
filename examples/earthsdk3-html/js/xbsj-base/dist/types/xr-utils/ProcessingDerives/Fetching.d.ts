/**
 * 可取消可监视进度的fetch
 * @param progressFunc 用来获取下载的进度信息
 * @param args 原始fetch的参数
 */
export declare function cancelableFetchWithProgress(progressFunc: ((loaded: number, total: number) => void), ...args: Parameters<typeof fetch>): Promise<Response>;
/**
 * 可取消可监视进度的fetch
 * @param args 原始fetch的参数
 * @returns
 */
export declare function cancelableFetch(...args: Parameters<typeof fetch>): Promise<Response>;
export declare function createFetching(): import("..").Processing<Response, [input: string | URL | Request, init?: RequestInit | undefined]>;
export declare function createFetchingWithStartValues(...args: Parameters<typeof fetch>): import("..").Processing<Response, []>;
