import { Destroyable } from "./Destroyable";
import { JsonValue } from "./JsonValue";
import { Listener } from './pipe';
export declare class ReactiveVariable<T> extends Destroyable {
    private _equalsFunc?;
    private _assignFunc?;
    private _changed?;
    private _value;
    private _oldValue;
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#mx31efK1XhKf4T26bjZBZB
     */
    get assignFunc(): ((newValue: T, target?: T | undefined) => T) | undefined;
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#ecbiy1aXUyNYaFThPmybZf
     */
    get equalsFunc(): ((a: T, b: T) => boolean) | undefined;
    /**
     *
     * @param value
     * @returns
     */
    equals(value: T): boolean;
    /**
     *
     * @param defaultValue
     * @param _equalsFunc
     * @param _assignFunc
     */
    constructor(defaultValue: T, _equalsFunc?: ((a: T, b: T) => boolean) | undefined, _assignFunc?: ((newValue: T, target?: T) => T) | undefined);
    /**
     * toChangeFunc回调函数返回值为false时，表示不能继续赋值！
     */
    toChangeFunc?: (newValue: T, oldValue: T) => boolean;
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#jv3pumc7vBU31BD4Tfvw9T
     */
    set value(value: T);
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#jv3pumc7vBU31BD4Tfvw9T
     */
    get value(): T;
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#qEeY8zMvCP9BwojXZVSUfu
     */
    get changed(): Listener<[T, T]>;
    /**
     * https://www.wolai.com/earthsdk/7iQ4m7gYBPVHK3ZMryMU6z#vovuXNhT9M5xbHe3BsvPTc
     * 强制触发修改事件!
     */
    forceChange(): void;
}
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#oAyiFKftxrMQMZUkUd4aSA
 * @param defaultValue
 * @param equalsFunc
 * @param assignFunc
 * @returns
 */
export declare function react<T>(defaultValue: T, equalsFunc?: (a: T, b: T) => boolean, assignFunc?: (newValue: T, target?: T) => T): ReactiveVariable<T>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#dysdyAvqDunH5aSvM4sYij
 * @param defaultValue
 * @returns
 */
export declare function reactArray<T extends any[]>(defaultValue: T): ReactiveVariable<T>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#299S8sWmFMwas8hPh1EHgG
 * 这里的T不能变成必须是数组类型，不能直接用元素的type，比如number来指代number[]，因为T有可能是多种类型的组合，比如[number, stirng, boolean]
 * @param defaultValue
 * @returns
 */
export declare function reactArrayWithUndefined<T extends (any[] | undefined)>(defaultValue: T | undefined): ReactiveVariable<T | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#sQUSR3MorbACtm8XPQRMzL
 * 这个T是元素类型，数组必须是T[]，注意和reactArray各有不同！如果数组类型过于复杂，可以用reactJson！
 * 比如 [[number, string], [boolean, boolean]]，像这样的类型，就直接用reactJson，因为既不符合reactArray的要求(元素类型必须是native或者只考虑指针)，也不符合reactDeepArray(元素类型必须一致！)
 * @param defaultValue
 * @param elementEqualsFunc
 * @param elementAssignFunc
 * @returns
 */
export declare function reactDeepArray<T>(defaultValue: T[], elementEqualsFunc: (a: T, b: T) => boolean, elementAssignFunc: (s: T, t?: T) => T): ReactiveVariable<T[]>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#6hvnFN9NdcJn2NF3yx2DZi
 * @param defaultValue
 * @param elementEqualsFunc
 * @param elementAssignFunc
 * @returns
 */
export declare function reactDeepArrayWithUndefined<T>(defaultValue: T[] | undefined, elementEqualsFunc: (a: T, b: T) => boolean, elementAssignFunc: (s: T, t?: T) => T): ReactiveVariable<T[] | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#8RP6bFJepDou2Q4cYin8GH
 * @param defaultValue
 * @returns
 */
export declare function reactJson<T extends JsonValue = JsonValue>(defaultValue: T): ReactiveVariable<T>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#8uw5ja3URVVU8FaiH8zUxT
 * @param defaultValue
 * @returns
 */
export declare function reactJsonWithUndefined<T extends JsonValue = JsonValue>(defaultValue: T | undefined): ReactiveVariable<T | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#f3yib5tPufsCzNhq3DKDxa
 * @param defaultValue
 * @returns
 */
export declare function reactPlainObject<T extends {
    [k: string]: any;
}>(defaultValue: T): ReactiveVariable<T>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#5ZnTZfknhGSSPpKLc6gHrE
 * @param defaultValue
 * @returns
 */
export declare function reactPlainObjectWithUndefined<T extends {
    [k: string]: any;
}>(defaultValue: T | undefined): ReactiveVariable<T | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#sX7hqDrWNkfZAh5NAzgcfW
 * @param defaultValue
 * @returns
 */
export declare function reactArrayCollection<T extends any[]>(defaultValue: T[]): ReactiveVariable<T[]>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#fTC26HE2NvMb1ZYhZ7xCgK
 * @param defaultValue
 * @returns
 */
export declare function reactArrayCollectionWithUndefined<T extends any[]>(defaultValue: T[] | undefined): ReactiveVariable<T[] | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#jRtXBSwDnRPDEek16KAt1
 * @param defaultValue
 * @returns
 */
export declare function reactJsonCollection<T extends JsonValue>(defaultValue: T[]): ReactiveVariable<T[]>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#5CwtFbaBPpT6XkUjGPxDWo
 * @param defaultValue
 * @returns
 */
export declare function reactJsonCollectionWithUndefined<T extends any[]>(defaultValue: T[] | undefined): ReactiveVariable<T[] | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#6qVkYWFGpA2DQBesFxNbkT
 * @param defaultValue
 * @returns
 */
export declare function reactPositions(defaultValue: [number, number, number][] | undefined): ReactiveVariable<[number, number, number][] | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#5cBNbpq7M39J2KsqbFVWE7
 * @param defaultValue
 * @returns
 */
export declare function reactPositionsSet(defaultValue: [number, number, number][][] | undefined): ReactiveVariable<[number, number, number][][] | undefined>;
/**
 * https://www.wolai.com/earthsdk/P9YGA3n9PSz4qXXzRJcUU#ayKMvCzoNha1dABTk35LXC
 * @param defaultValue
 * @returns
 */
export declare function reactPosition2DsSet(defaultValue: [number, number][][] | undefined): ReactiveVariable<[number, number][][] | undefined>;
