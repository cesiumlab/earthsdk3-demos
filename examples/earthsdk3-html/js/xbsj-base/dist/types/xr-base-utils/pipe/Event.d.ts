import { Destroyable } from '../Destroyable';
import { ListenerPipe } from './ListenerPipe';
import { SmartListenerHandler } from './SmartListenerHandler';
export declare class EventListenerHandler<T extends any[] = []> extends SmartListenerHandler<T> {
}
/**
 * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu
 */
export declare class Event<T extends any[] = []> extends Destroyable {
    private __pipe?;
    private get _pipe();
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#rAmq7qBXVfiEAsqQgSSDmv
     */
    get empty(): boolean;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#9GhotyzcRTWPsHA4NceWoB
     */
    beforeCallback?: (...args: T) => void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#hA9CKJmgWXVQJLNTJj6ExU
     */
    afterCallback?: (...args: T) => void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#eR9tnByJUsQzaxCasPNNF9
     * @param args
     */
    emit(...args: T): void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#w3AbF3Xj9HHXijyyE8w6uS
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    on(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): EventListenerHandler<T>;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#rjSrpzE5x8VYWLzGK62ebm
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    disposableOn(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#iPZFVS4XhxZDfTw8PhZQL4
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    don(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#dP9hKQVbz6AkRVtDRPR41E
     * 监听事件以后，当事件本身销毁时，会自动解绑事件，
     * 除非确定event有可能提前销毁，否则尽量使用disposableOn，而不是disposableWeakOn
     * 因为disposableOn使用后，如果没有及时销毁，控制台会给出事件有监听的警告！
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    disposableWeakOn(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    /**
     * 监听事件以后，当事件本身销毁时，会自动解绑事件，
     * 除非确定event有可能提前销毁，否则尽量使用disposableOn，而不是disposableWeakOn
     * 因为disposableOn使用后，如果没有及时销毁，控制台会给出事件有监听的警告！
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    dwon(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#t9iYM5E6MqjCRA11RjmFVV
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    once(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): EventListenerHandler<T>;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#bmn5iF21VQQ2Y44FyzsG4s
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    disposableOnce(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => false | void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#4Yq5btpNhTvnPbAyXTpZnA
     * @param func
     * @param scope
     * @param first
     * @param handler
     * @returns
     */
    donce(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => false | void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#sorMBrpsgLc7i4Y69EmCgw
     * 取消监听
     * @param handler
     */
    off(handler: EventListenerHandler<T>): void;
    /**
     * https://www.wolai.com/earthsdk/hwmaPRyLERtj1yyDCbBwbu#b28jj8Bp6vaKhjMXyW987s
     */
    reset(): void;
    destroyImp(): void;
}
export type Listener<T extends any[] = []> = Omit<Event<T>, 'emit'>;
export type Emitter<T extends any[] = []> = Pick<Event<T>, 'emit'>;
export type EventForTest<T extends any[] = []> = {
    _pipe: ListenerPipe<T>;
} & Omit<Event<T>, '_pipe'>;
export type ExtractListener<T> = T extends Event<infer R> ? Listener<R> : never;
export type ExtractEmitter<T> = T extends Event<infer R> ? Emitter<R> : never;
export type ExtractListenerParams<T extends Listener<any[]>> = T extends Listener<infer R> ? R : [];
