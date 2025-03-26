import { Raster } from 'ol/source.js';



const getSlopeStr = `function getSlope(color, curve) {
    let outPut = color
    curve.forEach((el, index) => {
        if ((curve[index + 1]) && (color >= el[0] && color <= curve[index + 1][0])) {
            const point2 = curve[index + 1]
            const k = (point2[1] - el[1]) / (point2[0] - el[0])
            outPut = point2[1] - ((point2[0] - color) * k)
            return
        }
    })
    const outPutColor = clipRange(outPut, 0, 255)
    return outPutColor
}`;

/**
 * 入参取值范围 r, g, b: [0, 255]
 * 出参取值范围 h: [0, 180], s: [0, 255], v: [0, 255] （h`sv`和h`sl`使用不同的取值范围以区分）
 */
const RGB2HSVStr = `function RGB2HSV([r, g, b]) {
    r = r / 255
    g = g / 255
    b = b / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const d = max - min
    const v = max
    const s = max === 0 ? 0 : d / max
    let h = 0
    if (d !== 0) {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
            default:
                break
        }
        h = h / 6
    }
    return [parseInt(h * 360 / 2), parseInt(s * 255), parseInt(v * 255)]
}`;

/**
 * 入参取值范围 h: [0, 360], s: [0, 1], v: [0, 1] （h`sv`和h`sl`使用不同的取值范围以区分）
 * 出参取值范围 r, g, b: [0, 255]
 */

const HSV2RGBStr = `function HSV2RGB([h, s, v]) {
    let i, f, p1, p2, p3;
    let r = 0, g = 0, b = 0;
    if (s < 0) s = 0;
    if (s > 1) s = 1;
    if (v < 0) v = 0;
    if (v > 1) v = 1;
    h %= 360;
    if (h < 0) h += 360;
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p1 = v * (1 - s);
    p2 = v * (1 - s * f);
    p3 = v * (1 - s * (1 - f));
    switch (i) {
        case 0: r = v; g = p3; b = p1; break;
        case 1: r = p2; g = v; b = p1; break;
        case 2: r = p1; g = v; b = p3; break;
        case 3: r = p1; g = p2; b = v; break;
        case 4: r = p3; g = p1; b = v; break;
        case 5: r = v; g = p1; b = p2; break;
    }
    return [parseInt(r*255), parseInt(g * 255), parseInt(b * 255)];
}`;

const adjustHSLStr = `function adjustHSL(pixelHue, delta, channel) {
    const { colorIndex, hue, saturation, lightness, _left, left, right, _right } = channel
    let deltaHsb = [...delta]
    if (colorIndex === 0) {
        deltaHsb[0] += hue
        deltaHsb[1] += saturation
        deltaHsb[2] += lightness
        return deltaHsb
    }
    if (left < right) {
        if (pixelHue >= _left && pixelHue <= _right) {
            if (pixelHue >= left && pixelHue <= right) {
                deltaHsb[0] += hue
                deltaHsb[1] += saturation
                deltaHsb[2] += lightness
                return deltaHsb
            } else if (pixelHue >= _left && pixelHue <= left && left > _left) {
                deltaHsb[0] += hue * (pixelHue - _left) / (left - _left)
                deltaHsb[1] += saturation * (pixelHue - _left) / (left - _left)
                deltaHsb[2] += lightness * (pixelHue - _left) / (left - _left)
                return deltaHsb
            } else if (pixelHue >= right && pixelHue <= _right && _right > right) {
                deltaHsb[0] += hue * (_right - pixelHue) / (_right - right)
                deltaHsb[1] += saturation * (_right - pixelHue) / (_right - right)
                deltaHsb[2] += lightness * (_right - pixelHue) / (_right - right)
                return deltaHsb
            } else {
                return deltaHsb
            }
        } else {
            return deltaHsb
        }
    } else {
        if (pixelHue >= left && pixelHue <= 360) {
            deltaHsb[0] += hue
            deltaHsb[1] += saturation
            deltaHsb[2] += lightness
            return deltaHsb
        } else if (pixelHue >= 0 && pixelHue <= right) {
            deltaHsb[0] += hue
            deltaHsb[1] += saturation
            deltaHsb[2] += lightness
            return deltaHsb
        } else if (pixelHue >= _left && pixelHue <= left && left > _left) {
            deltaHsb[0] += hue * (pixelHue - _left) / (left - _left)
            deltaHsb[1] += saturation * (pixelHue - _left) / (left - _left)
            deltaHsb[2] += lightness * (pixelHue - _left) / (left - _left)
            return deltaHsb
        } else if (pixelHue >= right && pixelHue <= _right && _right > right) {
            deltaHsb[0] += hue * (_right - pixelHue) / (_right - right)
            deltaHsb[1] += saturation * (_right - pixelHue) / (_right - right)
            deltaHsb[2] += lightness * (_right - pixelHue) / (_right - right)
            return deltaHsb
        } else {
            return deltaHsb
        }
    }
}`;

const getHsvStr = `function getHsv(hsv, delta) {
    let hsb = [...hsv]
    let deltaHsb = [...delta]

    hsb[0] = (hsb[0] + deltaHsb[0]) % 360
    if (hsb[0] < 0) hsb[0] += 360

    deltaHsb[1] = clipRange(deltaHsb[1], -100, 100)
    if (deltaHsb[1] < 0) {
        hsb[1] = hsb[1] * (1 + deltaHsb[1] / 100.0)
    } else {
        hsb[1] = hsb[1] + (1 - hsb[1]) * deltaHsb[1] / 100.0
        hsb[2] = hsb[2] + (1 - hsb[2]) * deltaHsb[1] / 100.0
    }

    deltaHsb[2] = clipRange(deltaHsb[2], -100, 100)
    if (deltaHsb[2] < 0) {
        hsb[2] = hsb[2] * (1 + deltaHsb[2] / 100.0)
    } else {
        hsb[2] = hsb[2] + (1 - hsb[2]) * deltaHsb[2] / 100.0
        hsb[1] = hsb[1] - hsb[1] * deltaHsb[2] / 100.0
    }
    return hsb
}`;

//切范围
const clipRangeStr = `function clipRange (value, min, max) {
    if (value > max)
        return max
    else if (value < min)
        return min
    else
        return value
}`;

const operationFunStr = `function (pixels, data) {
    let rgb = pixels[0];

    {
        //PS色阶 亮度对比度
        const colorsTable = data.colorsTable
        rgb[0] = colorsTable[0][rgb[0]]
        rgb[1] = colorsTable[1][rgb[1]]
        rgb[2] = colorsTable[2][rgb[2]]

    }

    {
        //曲线改造
        const { redColor, greenColor, blueColor, rgbColor } = data.curveChannels
        const rColor = getSlope(rgb[0], redColor)
        const gColor = getSlope(rgb[1], greenColor)
        const bColor = getSlope(rgb[2], blueColor)
        rgb[0] = getSlope(rColor, rgbColor)
        rgb[1] = getSlope(gColor, rgbColor)
        rgb[2] = getSlope(bColor, rgbColor)
    }

    {
        //色相饱和度HSL
        const hslChannels = data.hslChannels
        let hsb = []
        let deltaHsb = [0, 0, 0]

        const colorA = rgb[3]
        const color = [rgb[0], rgb[1], rgb[2]]

        const hsv = RGB2HSV(color)
        const hsbH = hsv[0] * 2;
        const hsbS = hsv[1] / 255;
        const hsbB = hsv[2] / 255;
        hsb = [hsbH, hsbS, hsbB]

        for (let i = 0; i < 7; i++) {
            if (hslChannels[i].defined) {
                deltaHsb = adjustHSL(hsb[0], deltaHsb, hslChannels[i])
            }
        }
        const hsl = getHsv(hsb, deltaHsb)
        const rgbColor = HSV2RGB(hsl)
        rgbColor.push(colorA)
        rgb = [...rgbColor]
    }
    return rgb;
}`;

export function createRasterSource(sources, props) {
    const raster = new Raster({
        sources,
        operation: Function(`"use strict"; return (${operationFunStr})`)(),
        lib: {
            getSlope: Function(`"use strict"; return (${getSlopeStr})`)(),
            clipRange: Function(`"use strict"; return (${clipRangeStr})`)(),//切范围
            RGB2HSV: Function(`"use strict"; return (${RGB2HSVStr})`)(),//rgb转hsv
            HSV2RGB: Function(`"use strict"; return (${HSV2RGBStr})`)(),//hsv转rgb
            getHsv: Function(`"use strict"; return (${getHsvStr})`)(),
            adjustHSL: Function(`"use strict"; return (${adjustHSLStr})`)(),
        },
    });

    raster.on('beforeoperations', function (event) {
        const data = event.data;
        data['colorsTable'] = props.channels.value.colorsTable;
        data['hslChannels'] = props.channels.value.hslChannels;
        data['curveChannels'] = props.channels.value.curveChannels;
    });

    return raster;
}
