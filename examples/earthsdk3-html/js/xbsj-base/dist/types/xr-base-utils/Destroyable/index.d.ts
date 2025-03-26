import { destroyObject } from "./destroyObject";
export { destroyObject };
export interface Destroyable {
    isDestroyed(): boolean;
    destroy(): undefined;
}
/**
 * https://www.wolai.com/earthsdk/3CCBudoKrPvJGLAk3sCAdT
 */
export declare class Destroyable {
    private get __v_skip();
    static _lastMemId: number;
    private _memId;
    get memId(): number;
    private _disposers?;
    get disposers(): (() => void)[];
    dispose(disposeFunc: () => void): () => void;
    d(disposeFunc: () => void): () => void;
    disposeVar<T extends {
        destroy(): void;
    }>(obj: T): T;
    dv<T extends {
        destroy(): void;
    }>(obj: T): T;
    tryDisposeVar<T extends {
        tryDestroy(): void;
    }>(obj: T): T;
    tdv<T extends {
        tryDestroy(): void;
    }>(obj: T): T;
    autoDispose(disposeFunc: () => void): () => void;
    autoDispose<T extends {
        destroy(): void;
    }>(obj: T): T;
    ad(disposeFunc: () => void): () => void;
    ad<T extends {
        destroy(): void;
    }>(obj: T): T;
    destroyImp(): void;
    tryDestory(): undefined;
}
import { Listener } from "../pipe";
export interface Destroyable {
    get toDestroyEvent(): Listener;
}
