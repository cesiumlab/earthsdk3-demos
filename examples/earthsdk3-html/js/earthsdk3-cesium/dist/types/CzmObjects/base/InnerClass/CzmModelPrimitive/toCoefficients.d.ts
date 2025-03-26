import * as Cesium from 'cesium';
export type CzmModelCoefficientsTypeN3 = [number, number, number];
export type CzmModelCoefficientsType = [
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3,
    CzmModelCoefficientsTypeN3
];
export declare function toCoefficients(value: CzmModelCoefficientsType): Cesium.Cartesian3[] | undefined;
