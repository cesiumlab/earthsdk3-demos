import { Number16, Number3 } from "./Numbers";
export declare class InverseViewMatrix {
    static getDirection(inverseViewMatrix: Readonly<Number16>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    static getRight(inverseViewMatrix: Readonly<Number16>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    static getUp(inverseViewMatrix: Readonly<Number16>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    static getEye(inverseViewMatrix: Readonly<Number16>, target?: Number3): [number, number, number] | Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
}
