/**
 *
 * @param iteratorOrIterable 迭代器
 * @param callbackfn 返回值为true时，表示需要打断！
 * @returns 是否被打断
 */
export declare function forEachWithBreak<T>(iteratorOrIterable: Iterable<T> | Iterator<T>, callbackfn: (currentValue: T, currentIndex: number) => boolean | void): boolean;
