export type CzmMaterialJsonType = {
    type: 'Color';
    color?: [number, number, number, number];
} | {
    type: 'PolylineArrow';
    color?: [number, number, number, number];
} | {
    type: 'PolylineDash';
    color?: [number, number, number, number];
    gapColor?: [number, number, number, number];
    dashLength?: number;
    dashPattern?: number;
} | {
    type: 'PolylineGlow';
    color?: [number, number, number, number];
    glowPower?: number;
    taperPower?: number;
} | {
    type: 'PolylineOutline';
    color?: [number, number, number, number];
    outlineColor?: [number, number, number, number];
    outlineWidth?: number;
} | {
    type: 'Image';
    image?: string;
    repeat?: [number, number];
} | {
    type: 'DiffuseMap';
    image?: string;
    repeat?: [number, number];
    channels?: string;
} | {
    type: 'AlphaMap';
    image?: string;
    repeat?: [number, number];
    channel?: string;
} | {
    type: 'SpecularMap';
    image?: string;
    repeat?: [number, number];
    channel?: string;
} | {
    type: 'EmissionMap';
    image?: string;
    repeat?: [number, number];
    channels?: string;
} | {
    type: 'BumpMap';
    image?: string;
    repeat?: [number, number];
    channel?: string;
    strength?: number;
} | {
    type: 'NormalMap';
    image?: string;
    repeat?: [number, number];
    channels?: string;
    strength?: number;
} | {
    type: 'Grid';
    color?: [number, number, number, number];
    cellAlpha?: number;
    lineCount?: [number, number];
    lineThickness?: [number, number];
    lineOffset?: [number, number];
} | {
    type: 'Stripe';
    horizontal?: boolean;
    evenColor?: [number, number, number, number];
    oddColor?: [number, number, number, number];
    offset?: number;
    repeat?: number;
} | {
    type: 'Checkerboard';
    lightColor?: [number, number, number, number];
    darkColor?: [number, number, number, number];
    repeat?: [number, number];
} | {
    type: 'Dot';
    lightColor?: [number, number, number, number];
    darkColor?: [number, number, number, number];
    repeat?: [number, number];
} | {
    type: 'Water';
    baseWaterColor?: [number, number, number, number];
    blendColor?: [number, number, number, number];
    specularMap?: string;
    normalMap?: string;
    frequency?: number;
    animationSpeed?: number;
    amplitude?: number;
    specularIntensity?: number;
    fadeFactor?: number;
} | {
    type: 'RimLighting';
    color?: [number, number, number, number];
    rimColor?: [number, number, number, number];
    width?: number;
} | {
    type: 'Fade';
    fadeInColor?: [number, number, number, number];
    fadeOutColor?: [number, number, number, number];
    maximumDistance?: number;
    repeat?: boolean;
    fadeDirection?: [boolean, boolean];
    time?: [number, number];
} | {
    type: 'ElevationContour';
    color?: [number, number, number, number];
    spacing?: number;
    width?: number;
} | {
    type: 'ElevationRamp';
    image?: string;
    minimumHeight?: number;
    maximumHeight?: number;
} | {
    type: 'AspectRamp';
    image?: string;
} | {
    type: 'ElevationBand';
    colors?: string;
    heights?: string;
};
