export type GeoBoundingSphereType = {
    center: [number, number, number];
    radius: number;
};
export declare function getGeoBoundingSphereFromPositions(positions: [number, number, number][]): GeoBoundingSphereType | undefined;
