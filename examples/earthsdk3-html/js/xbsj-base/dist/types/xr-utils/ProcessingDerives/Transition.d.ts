import { Destroyable } from "../base";
import { Player } from "../Player";
export declare class Transition extends Destroyable {
    _stop: import("../base").ReactiveVariable<number>;
    _current: import("../base").ReactiveVariable<number>;
    _start: import("../base").ReactiveVariable<number>;
    _player: Player;
    constructor(duraton: number);
    get current(): number;
    get currentChanged(): import("../base").Listener<[number, number]>;
    get source(): number;
    get sourceChanged(): import("../base").Listener<[number, number]>;
    get target(): number;
    get targetChanged(): import("../base").Listener<[number, number]>;
    get duration(): number;
    set duration(value: number);
    set target(value: number);
    reset(value: number): void;
}
