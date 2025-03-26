import { Destroyable, Listener } from 'xbsj-base';
export declare class ObservableSet<T> extends Destroyable {
    private _set;
    private _toChangeEvent;
    private _changedEvent;
    get toChange(): Listener<[toDels: T[], toAdds: T[]]>;
    get changed(): Listener<[toDels: T[], toAdds: T[]]>;
    static warnOnDestroying: boolean;
    constructor();
    add(...elements: T[]): void;
    delete(...elements: T[]): void;
    disposableAdd(...elements: T[]): () => void;
    get size(): number;
    clear(): void;
    values(): IterableIterator<T>;
}
