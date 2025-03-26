import { Event as XbsjEvent, Listener } from '../base';
interface ListenerObject {
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export declare class DomElementEvent<T extends ListenerObject, EventType> extends XbsjEvent<[EventType]> {
    private _domElement;
    private _type;
    callback?: ((ev: Event) => any) | undefined;
    static getLastLisenNo(): number;
    static getCurrentTarget(ev: Event): EventTarget | undefined;
    static getListenerNo(ev: Event): number | undefined;
    static getListenerTime(ev: Event): number | undefined;
    /**
     * 用来保证disposableOn之后接收到的消息才处理！
     * @param event
     * @param callback
     * @returns
     */
    static on<T extends Event>(event: Listener<[T]>, callback: (event: T) => void): () => void;
    /**
     * 请不要使用 new DomElementEvent 方式创建对象，可以使用 DomElementEvent.create(...)方式来创建！
     * @error 请不要使用 new DomElementEvent 方式创建对象，可以使用 DomElementEvent.create(...)方式来创建！
     * @param _domElement
     * @param _type
     * @param options
     *
     * @example
     *
     * const pointerenterEvent = DomElementEvent.create(element, 'pointerenter', false);
     * pointerenterEvent.disposableOn(pe => {
     *     // ...
     * });
     *
     */
    private constructor();
    get element(): T;
    /**
     * 创建DomElementEvent对象
     *
     * @param domElement DOM元素
     * @param type 事件类型，比如 pointerenter等
     * @param options 和addEventListener的最后一个参数的设置相同！
     *
     * @example
     *
     * const pointerenterEvent = DomElementEvent.create(element, 'pointerenter', false);
     * pointerenterEvent.disposableOn(pe => {
     *     // ...
     * });
     */
    static create<K extends keyof DocumentEventMap>(domElement: Document, type: K, options?: boolean | AddEventListenerOptions): DomElementEvent<HTMLElement, DocumentEventMap[K]>;
    static create<K extends keyof HTMLBodyElementEventMap>(domElement: HTMLBodyElement, type: K, options?: boolean | AddEventListenerOptions): DomElementEvent<HTMLElement, HTMLBodyElementEventMap[K]>;
    static create<K extends keyof HTMLElementEventMap>(domElement: HTMLElement, type: K, options?: boolean | AddEventListenerOptions): DomElementEvent<HTMLElement, HTMLElementEventMap[K]>;
}
export {};
