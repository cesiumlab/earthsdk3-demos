import { JsonValue } from "xbsj-base";
import { Destroyable } from "./base";
export type getFileSelectFuncType = (files: string[], dirs: string[]) => Promise<({
    file: string;
} | {
    dir: string;
} | undefined)>;
export declare function getSubEntriesFromDir(dirHandle: FileSystemDirectoryHandle): Promise<{
    files: string[];
    dirs: string[];
}>;
export declare function getFileText(fileHandle: FileSystemFileHandle): Promise<string>;
export declare function getFileJson(fileHandle: FileSystemFileHandle): Promise<JsonValue>;
export declare function getFileArrayBuffer(fileHandle: FileSystemFileHandle): Promise<ArrayBuffer>;
export declare class LocalRootDir extends Destroyable {
    private _rootDirHandle;
    get rootDirHandle(): FileSystemDirectoryHandle;
    constructor(_rootDirHandle: FileSystemDirectoryHandle);
    getSubFilesAndDirs(): Promise<{
        files: string[];
        dirs: string[];
    }>;
    getDir(dirNames: string[]): Promise<FileSystemDirectoryHandle | undefined>;
    getFile(dirNames: string[], fileName: string): Promise<FileSystemFileHandle | undefined>;
}
export declare class LocalFileServer extends Destroyable {
    private _prefix;
    private _startRootDirId;
    private _dirMap;
    get prefix(): string;
    constructor(_prefix: string);
    getRootDirId(recentId?: string): Promise<string | undefined>;
    getRootDir(rootDirId: string): LocalRootDir | undefined;
    getFile(path: string): Promise<FileSystemFileHandle | undefined>;
    getText(path: string): Promise<string | undefined>;
    getArrayBuffer(path: string): Promise<ArrayBuffer | undefined>;
    getJson(path: string): Promise<JsonValue>;
    getLocalFilePath(exts?: string[], recentId?: string, selectFunc?: getFileSelectFuncType): Promise<string | undefined>;
}
export declare const defaultLocalFileServer: LocalFileServer;
export declare function defaultGetLocalFilePath(exts?: string[], recentId?: string, selectFunc?: getFileSelectFuncType): Promise<string | undefined>;
