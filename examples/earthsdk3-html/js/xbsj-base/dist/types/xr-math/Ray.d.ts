import { Number3, Number6 } from "./Numbers";
export declare namespace Ray {
    function getOrigin(ray: Readonly<Number6>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function getDirection(ray: Readonly<Number6>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
}
