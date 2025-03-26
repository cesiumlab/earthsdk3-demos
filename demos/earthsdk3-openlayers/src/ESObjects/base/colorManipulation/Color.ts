
export type ColorLevel = { shadow: number, midtones: number, highlight: number, outputShadow: number, outputHighlight: number, }
export type ColorHSL = { hue: number, saturation: number, lightness: number }
export type ColorHSLs = { colorIndex: number, hue: number, saturation: number, lightness: number }
export type HSLChannel = {
    colorIndex: number;
    hue: number;
    saturation: number;
    lightness: number;
    _left: number;
    left: number;
    right: number;
    _right: number;
    defined: boolean;
}
export type CurveChannel = {
    controlPoints: number[][];
    points: number[][];
    density: number;
}
export type CurveChannels = {
    rgbColor: number[][];
    redColor: number[][];
    greenColor: number[][];
    blueColor: number[][];
}


//创建colorsTable
export function createTable() {
    const arr = Array.from({ length: 256 }, (_, i) => 0 + (i))
    const tables = [[...arr], [...arr], [...arr]]
    return tables
}
//切值
export function clipRange(value: number, min: number, max: number) {
    if (value > max)
        return max
    else if (value < min)
        return min
    else
        return value
};
//亮度对比度
export function brightnessContrast(pixelValue: number, brightness = 0, contrast = 0) {
    const clipBrightness = clipRange(brightness, -100, 100) / 100
    const clipContrast = clipRange(contrast, -100, 100) / 100
    const k = Math.tan((45 + 44 * clipContrast) / 180 * Math.PI)
    const value = (pixelValue - 127.5 * (1 - clipBrightness)) * k + 127.5 * (1 + clipBrightness)
    const pixelColor = clipRange(value, 0, 255)
    return pixelColor
};
//色阶通道
export function colorLevelChannel(level: ColorLevel, colorTable: number[]) {
    const shadow = clipRange(level.shadow, 0, 255)
    const midtones = clipRange(level.midtones, 0.01, 9.99)
    const highlight = clipRange(level.highlight, 0, 255)
    const outputShadow = clipRange(level.outputShadow, 0, 255)
    const outputHighlight = clipRange(level.outputHighlight, 0, 255)
    let colorList = [...colorTable]
    const diff = highlight - shadow
    const outDiff = outputHighlight - outputShadow

    const coef = 255 / diff;
    const outCoef = outDiff / 255;
    const exponent = 1 / midtones;

    let v = 0
    for (let i = 0; i < 256; i++) {
        if (colorList[i] <= shadow) {
            v = 0
        } else {
            v = ((colorList[i] - shadow) * coef + 0.5)
            if (v > 255) v = 255
        }
        v = (Math.pow(v / 255, exponent) * 255 + 0.5)
        colorList[i] = (v * outCoef + outputShadow + 0.5)
    }
    return colorList
};
//获取色阶转换后的colorsTable
export function getColorsLevelTable(list: number[][], levelRgb: ColorLevel, levelRed: ColorLevel, levelGreen: ColorLevel, levelBlue: ColorLevel) {
    let tables = [...list]
    tables[0] = colorLevelChannel(levelRed, tables[0])
    tables[1] = colorLevelChannel(levelGreen, tables[1])
    tables[2] = colorLevelChannel(levelBlue, tables[2])
    tables[0] = colorLevelChannel(levelRgb, tables[0])
    tables[1] = colorLevelChannel(levelRgb, tables[1])
    tables[2] = colorLevelChannel(levelRgb, tables[2])
    return tables
};
//亮度对比度转换后的colorsTable
export function setBrightnessContrast(arr: number[][], brightness = 0, contrast = 0) {
    let list = [...arr]
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        for (let j = 0; j < element.length; j++) {
            const pixelValue = element[j];
            const value = brightnessContrast(pixelValue, brightness, contrast)
            list[i][j] = value
        }
    }
    return list
}

export function getHsvScope(index: number) {
    const data = [
        [0, 0, 360, 360],
        [315, 345, 15, 45],
        [15, 45, 75, 105],
        [75, 105, 135, 165],
        [135, 165, 195, 225],
        [195, 225, 255, 285],
        [255, 285, 315, 345]
    ]
    const scope = data[index]
    return { _left: scope[0], left: scope[1], right: scope[2], _right: scope[3] }
}

export function calcDefined(hue: number, saturation: number, lightness: number) {
    if (hue !== 0 || saturation !== 0 || lightness !== 0) {
        return true
    } else {
        return false
    }
}

export function getHSLChannels(arr: ColorHSLs[]) {
    let list = [] as HSLChannel[]
    arr.forEach(item => {
        const colorIndex = clipRange(item.colorIndex, 0, 6)
        const hue = clipRange(item.hue, -180, 180)
        const saturation = clipRange(item.saturation, -100, 100)
        const lightness = clipRange(item.lightness, -100, 100)

        const scope = getHsvScope(colorIndex)
        const defined = calcDefined(hue, saturation, lightness)
        const param = { defined, colorIndex, hue, saturation, lightness, ...scope }
        list.push(param)
    });
    return list
}

export const sampleColorValue = {
    colorLevel: `
####   1. shadow, '[0,255] 默认值0,输入色阶黑点值';
####   2. highlight, '[0,255] 默认值255	输入色阶白点值';
####   3. midtones, '[0.01,9.99]默认值1.0,输入色阶灰点值';
####   4. outputShadow, '[0,255] 默认值0,输出色阶黑点值';
####   5. outputHighlight, '[0,255] 默认值255,输出色阶白点值'.
#### 默认值如下
${'```'}js
{
    shadow: 0,
    midtones: 1,
    highlight: 255,
    outputShadow: 0,
    outputHighlight: 255,
}
${'```'}
`,
    colorHSL: `
####   1. hue	[-180,180] 默认值0	色相;
####   2. satuation	[-100,100] 默认值0	饱和度;
####   3. lightness	[-100,100] 默认值0	明度;
#### 默认值如下
${'```'}js
{   
    hue: 0,
    saturation: 0,
    lightness: 0,
}
${'```'}`,
    curve: `
####   1. controlPoints	默认值[[0, 0], [255, 255]],控制点;
####   2. points 默认值[[0, 0], [255, 255]]，构成线的所有点;
####   3. density 默认20,代表每四个分段点内单段生成20个点来绘制曲线;
#### 默认值如下
${'```'}js
{
    controlPoints: [[0, 0], [255, 255]],
    points: [[0, 0], [255, 255]],
    density: 20
}
${'```'}`,
    brightness: `
    ####  亮度brightness,[-100,100] 默认值0
    `,
    contrast: `
   ####  对比度contrast,[-100,100]默认值0
    `
}

export const defaultColorValue = {
    colorLevel: {
        shadow: 0,
        midtones: 1,
        highlight: 255,
        outputShadow: 0,
        outputHighlight: 255,
    },
    colorHSL: {
        hue: 0,
        saturation: 0,
        lightness: 0,
    },
    curve: {
        controlPoints: [[0, 0], [255, 255]],
        points: [[0, 0], [255, 255]],
        density: 20
    },
    brightness: 0,
    contrast: 0
}
