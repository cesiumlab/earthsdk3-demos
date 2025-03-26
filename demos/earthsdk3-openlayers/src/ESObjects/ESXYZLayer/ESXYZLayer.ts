// http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=abd187e1140259634e44eea628b65e00  //测试url
import { BooleanProperty, ESSceneObject, EvalStringProperty, GroupProperty, JsonProperty, NumberProperty, StringProperty, StringsProperty } from "earthsdk3";
import { extendClassProps, JsonValue, reactArrayWithUndefined, reactJsonWithUndefined, UniteChanged } from "xbsj-base";
import { ColorHSL, ColorLevel, CurveChannel } from '../base/colorManipulation/Color';
import { defaults, description } from "./data";

export class ESXYZLayer extends ESSceneObject {
    static readonly type = this.register('ESXYZLayer', this, { chsName: 'ESXYZLayer', tags: ['ESOlObjects'], description: "ESXYZLayer" });
    get typeName() { return 'ESXYZLayer'; }
    override get defaultProps() { return ESXYZLayer.createDefaultProps(); }

    static description = { ...description };
    static default = { ...defaults };

    constructor(id?: string) {
        super(id);
    }

    override getProperties(language?: string) {
        return [
            ...super.getProperties(language),
            new GroupProperty('通用', '通用', [
                new BooleanProperty('是否可见', '是否可见.', true, false, [this, 'show'], true),

                new GroupProperty('样式', '样式', [
                    new GroupProperty('亮度对比度', '亮度对比度', [
                        new NumberProperty('亮度', '亮度brightness,[-100,100] 默认值0', true, false, [this, 'brightness'], 0),
                        new NumberProperty('对比度', '对比度contrast,[-100,100]默认值0', true, false, [this, 'contrast'], 0),
                    ]),
                    new GroupProperty('色阶', '色阶', [
                        new JsonProperty('rgb通道', 'rgb通道', true, false, [this, 'colorLevelRgb'], ESXYZLayer.default.colorLevel, ESXYZLayer.description.colorLevel),
                        new JsonProperty('red通道', 'red通道', true, false, [this, 'colorLevelRed'], ESXYZLayer.default.colorLevel, ESXYZLayer.description.colorLevel),
                        new JsonProperty('green通道', 'green通道', true, false, [this, 'colorLevelGreen'], ESXYZLayer.default.colorLevel, ESXYZLayer.description.colorLevel),
                        new JsonProperty('blue通道', 'blue通道', true, false, [this, 'colorLevelBlue'], ESXYZLayer.default.colorLevel, ESXYZLayer.description.colorLevel),
                    ]),
                    new GroupProperty('色相饱和度(HSL)', '色相饱和度(HSL)', [
                        new JsonProperty('全图', '全图通道0', true, false, [this, 'allHSL0'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('红色', '红色通道1', true, false, [this, 'redHSL1'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('黄色', '黄色通道2', true, false, [this, 'yellowHSL2'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('绿色', '绿色通道3', true, false, [this, 'greenHSL3'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('青色', '青色通道4', true, false, [this, 'cyanHSL4'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('蓝色', '蓝色通道5', true, false, [this, 'blueHSL5'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                        new JsonProperty('洋红', '洋红通道6', true, false, [this, 'magentaHSL6'], ESXYZLayer.default.colorHSL, ESXYZLayer.description.colorHSL),
                    ]),
                    new GroupProperty('曲线', '曲线', [
                        new JsonProperty('rgb通道', 'rgb通道', true, false, [this, 'curveRgb'], ESXYZLayer.default.curve, ESXYZLayer.description.curve),
                        new JsonProperty('red通道', 'red通道', true, false, [this, 'curveRed'], ESXYZLayer.default.curve, ESXYZLayer.description.curve),
                        new JsonProperty('green通道', 'green通道', true, false, [this, 'curveGreen'], ESXYZLayer.default.curve, ESXYZLayer.description.curve),
                        new JsonProperty('blue通道', 'blue通道', true, false, [this, 'curveBlue'], ESXYZLayer.default.curve, ESXYZLayer.description.curve),
                    ])
                ]),
                new GroupProperty('XYZ', 'XYZ', [
                    new StringProperty('url', ESXYZLayer.description.url, true, false, [this, 'url']),
                    new StringsProperty('urls', ESXYZLayer.description.urls, true, false, [this, 'urls']),
                    new StringsProperty('attributions', ESXYZLayer.description.attributions, true, false, [this, 'attributions']),
                    new BooleanProperty('attributionsCollapsible', ESXYZLayer.description.attributionsCollapsible, true, false, [this, 'attributionsCollapsible'], ESXYZLayer.default.attributionsCollapsible),
                    new NumberProperty('cacheSize', ESXYZLayer.description.cacheSize, true, false, [this, 'cacheSize']),
                    new NumberProperty('zIndex', 'z-index', true, false, [this, 'zIndex'], 0),
                    new StringProperty('crossOrigin', ESXYZLayer.description.crossOrigin, true, false, [this, 'crossOrigin'], 'anonymous'),
                    new BooleanProperty('interpolate', ESXYZLayer.description.interpolate, true, false, [this, 'interpolate'], ESXYZLayer.default.interpolate),
                    new JsonProperty('tileGrid', ESXYZLayer.description.tileGrid, true, false, [this, 'tileGrid']),
                    new JsonProperty('projection', ESXYZLayer.description.projection, true, false, [this, 'projection']),
                    new NumberProperty('reprojectionErrorThreshold', ESXYZLayer.description.reprojectionErrorThreshold, true, false, [this, 'reprojectionErrorThreshold'], ESXYZLayer.default.reprojectionErrorThreshold),
                    new NumberProperty('tilePixelRatio', ESXYZLayer.description.tilePixelRatio, true, false, [this, 'tilePixelRatio'], ESXYZLayer.default.tilePixelRatio),
                    new EvalStringProperty('tileLoadFunction', ESXYZLayer.description.tileLoadFunction, true, false, [this, 'tileLoadFunction'], ESXYZLayer.default.tileLoadFunction),
                    new BooleanProperty('wrapX', ESXYZLayer.description.wrapX, true, false, [this, 'wrapX'], ESXYZLayer.default.wrapX),
                    new NumberProperty('transition', ESXYZLayer.description.transition, true, false, [this, 'transition'], ESXYZLayer.default.transition),
                    new NumberProperty('zDirection', ESXYZLayer.description.zDirection, true, false, [this, 'zDirection'], ESXYZLayer.default.zDirection),
                    new NumberProperty('maxZoom', ESXYZLayer.description.maxZoom, true, false, [this, 'maxZoom'], ESXYZLayer.default.maxZoom),
                    new NumberProperty('minZoom', ESXYZLayer.description.minZoom, true, false, [this, 'minZoom'], ESXYZLayer.default.minZoom),
                    new NumberProperty('tileSize', ESXYZLayer.description.tileSize, true, false, [this, 'tileSize'], ESXYZLayer.default.tileSize),
                    new NumberProperty('gutter', ESXYZLayer.description.gutter, true, false, [this, 'gutter'], ESXYZLayer.default.gutter),
                    new NumberProperty('maxResolution', ESXYZLayer.description.maxResolution, true, false, [this, 'maxResolution']),
                    new EvalStringProperty('tileUrlFunction', ESXYZLayer.description.tileUrlFunction, true, false, [this, 'tileUrlFunction']),
                    new BooleanProperty('opaque', ESXYZLayer.description.opaque, true, false, [this, 'opaque'], ESXYZLayer.default.opaque),
                ])
            ]),
        ];
    }
}

export namespace ESXYZLayer {
    export const createDefaultProps = () => ({
        ...ESSceneObject.createDefaultProps(),

        show: undefined as boolean | undefined,

        curveRgb: reactJsonWithUndefined<CurveChannel>(undefined),//曲线
        curveRed: reactJsonWithUndefined<CurveChannel>(undefined),
        curveGreen: reactJsonWithUndefined<CurveChannel>(undefined),
        curveBlue: reactJsonWithUndefined<CurveChannel>(undefined),

        colorLevelRgb: reactJsonWithUndefined<ColorLevel>(undefined),//色阶
        colorLevelRed: reactJsonWithUndefined<ColorLevel>(undefined),
        colorLevelGreen: reactJsonWithUndefined<ColorLevel>(undefined),
        colorLevelBlue: reactJsonWithUndefined<ColorLevel>(undefined),

        allHSL0: reactJsonWithUndefined<ColorHSL>(undefined),//色度
        redHSL1: reactJsonWithUndefined<ColorHSL>(undefined),
        yellowHSL2: reactJsonWithUndefined<ColorHSL>(undefined),
        greenHSL3: reactJsonWithUndefined<ColorHSL>(undefined),
        cyanHSL4: reactJsonWithUndefined<ColorHSL>(undefined),//青色
        blueHSL5: reactJsonWithUndefined<ColorHSL>(undefined),
        magentaHSL6: reactJsonWithUndefined<ColorHSL>(undefined),//洋红

        brightness: undefined as number | undefined,//亮度对比度
        contrast: undefined as number | undefined,

        attributions: reactArrayWithUndefined<string[] | undefined>(undefined),
        attributionsCollapsible: undefined as boolean | undefined,
        cacheSize: undefined as number | undefined,
        crossOrigin: undefined as string | undefined,
        interpolate: undefined as boolean | undefined,
        projection: reactJsonWithUndefined<JsonValue>(undefined),
        reprojectionErrorThreshold: undefined as number | undefined,
        maxZoom: undefined as number | undefined,
        minZoom: undefined as number | undefined,
        opaque: undefined as boolean | undefined,
        maxResolution: undefined as number | undefined,
        tileSize: undefined as number | undefined,
        gutter: undefined as number | undefined,
        tileUrlFunction: undefined as string | undefined,
        tileGrid: reactJsonWithUndefined<JsonValue>(undefined),
        tileLoadFunction: undefined as string | undefined,
        tilePixelRatio: undefined as number | undefined,
        url: undefined as string | undefined,
        urls: reactArrayWithUndefined<string[] | undefined>(undefined),
        wrapX: undefined as boolean | undefined,
        transition: undefined as number | undefined,
        zDirection: undefined as number | undefined,
        zIndex: undefined as number | undefined,
    });
}
extendClassProps(ESXYZLayer.prototype, ESXYZLayer.createDefaultProps);
export interface ESXYZLayer extends UniteChanged<ReturnType<typeof ESXYZLayer.createDefaultProps>> { }
