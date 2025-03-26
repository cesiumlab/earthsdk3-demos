import { ESOlViewer } from '@olSrc/ESOlViewer';
import { EngineObject } from 'earthsdk3';
import { getTopLeft, getWidth } from 'ol/extent';
import ImageLayer from 'ol/layer/Image.js';
import { get as getProjection } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import { createNextAnimateFrameEvent, Destroyable, react } from 'xbsj-base';
import { createTable, CurveChannels, getColorsLevelTable, getHSLChannels, HSLChannel, setBrightnessContrast } from '../base/colorManipulation/Color';
import { createRasterSource } from '../base/colorManipulation/colorManipulation';
import { ESXYZLayer } from './ESXYZLayer';

class OlXYZ extends Destroyable {
    constructor(sceneObject: ESXYZLayer, olViewer: ESOlViewer) {
        super()
        const viewer = olViewer.viewer;
        if (!viewer) {
            console.warn(`viewer is undefined!`);
            return;
        }

        const projection = getProjection('EPSG:3857');
        if (!projection) return;
        const projectionExtent = projection.getExtent();
        const size = getWidth(projectionExtent) / 256;
        const resolutions = new Array(19);
        const matrixIds = new Array(19);
        for (let z = 0; z < 19; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        //获取 色相饱和度 通道
        const getColorHSLChannels = () => {
            const colorHSL = {
                hue: 0,
                saturation: 0,
                lightness: 0
            }
            const allHSL0 = sceneObject.allHSL0 ? { colorIndex: 0, ...sceneObject.allHSL0 } : { colorIndex: 0, ...colorHSL };//色度
            const redHSL1 = sceneObject.redHSL1 ? { colorIndex: 1, ...sceneObject.redHSL1 } : { colorIndex: 1, ...colorHSL };
            const yellowHSL2 = sceneObject.yellowHSL2 ? { colorIndex: 2, ...sceneObject.yellowHSL2 } : { colorIndex: 2, ...colorHSL };
            const greenHSL3 = sceneObject.greenHSL3 ? { colorIndex: 3, ...sceneObject.greenHSL3 } : { colorIndex: 3, ...colorHSL };
            const cyanHSL4 = sceneObject.cyanHSL4 ? { colorIndex: 4, ...sceneObject.cyanHSL4 } : { colorIndex: 4, ...colorHSL };//青色
            const blueHSL5 = sceneObject.blueHSL5 ? { colorIndex: 5, ...sceneObject.blueHSL5 } : { colorIndex: 5, ...colorHSL };
            const magentaHSL6 = sceneObject.magentaHSL6 ? { colorIndex: 6, ...sceneObject.magentaHSL6 } : { colorIndex: 6, ...colorHSL };//洋红
            const list = [allHSL0, redHSL1, yellowHSL2, greenHSL3, cyanHSL4, blueHSL5, magentaHSL6]
            const channel = getHSLChannels(list)
            return channel
        };
        //获取色阶,亮度对比度,通道
        const getColorsTable = () => {
            const colorLevel = {
                shadow: 0,
                midtones: 1,
                highlight: 255,
                outputShadow: 0,
                outputHighlight: 255,
            }
            const levelRgb = sceneObject.colorLevelRgb ?? colorLevel;
            const levelRed = sceneObject.colorLevelRed ?? colorLevel;
            const levelGreen = sceneObject.colorLevelGreen ?? colorLevel;
            const levelBlue = sceneObject.colorLevelBlue ?? colorLevel;
            const tables = createTable()
            const list = getColorsLevelTable(tables, levelRgb, levelRed, levelGreen, levelBlue)
            const list2 = setBrightnessContrast(list, sceneObject.brightness ?? 0, sceneObject.contrast ?? 0)
            return list2
        }
        const getCurveChannels = () => {
            const points = [[0, 0], [255, 255]]
            const rgbColor = sceneObject.curveRgb ? sceneObject.curveRgb.points : points;
            const redColor = sceneObject.curveRed ? sceneObject.curveRed.points : points;
            const greenColor = sceneObject.curveGreen ? sceneObject.curveGreen.points : points;
            const blueColor = sceneObject.curveBlue ? sceneObject.curveBlue.points : points;
            const defaultCurve = { redColor, greenColor, blueColor, rgbColor }
            return defaultCurve
        }
        const xyz = new XYZ({
            //@ts-ignore
            tileGrid: new TileGrid(sceneObject.tileGrid ?? { origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds }),
            url: sceneObject.url,
            urls: sceneObject.urls,
            attributions: sceneObject.attributions,
            attributionsCollapsible: sceneObject.attributionsCollapsible,
            cacheSize: sceneObject.cacheSize,
            crossOrigin: sceneObject.crossOrigin ?? 'anonymous',
            interpolate: sceneObject.interpolate,
            //@ts-ignore
            projection: sceneObject.projection ?? projection,
            reprojectionErrorThreshold: sceneObject.reprojectionErrorThreshold,
            tilePixelRatio: sceneObject.tilePixelRatio,
            tileLoadFunction: sceneObject.tileLoadFunction && Function('"use strict";return (' + sceneObject.tileLoadFunction + ')')(),
            wrapX: sceneObject.wrapX,
            transition: sceneObject.transition,
            zDirection: sceneObject.zDirection,

            maxZoom: sceneObject.maxZoom,
            minZoom: sceneObject.minZoom,
            opaque: sceneObject.opaque,
            maxResolution: sceneObject.maxResolution,
            tileSize: sceneObject.tileSize,
            gutter: sceneObject.gutter,
            tileUrlFunction: sceneObject.tileUrlFunction && Function('"use strict";return (' + sceneObject.tileUrlFunction + ')')(),

        });
        this.dispose(() => xyz.dispose())
        const colorsTable = getColorsTable()
        const hslChannels = getColorHSLChannels()
        const curveChannels = getCurveChannels()
        const channels = this.disposeVar(react<{ colorsTable: number[][]; hslChannels: HSLChannel[]; curveChannels: CurveChannels }>({ colorsTable, hslChannels, curveChannels }));
        const source = createRasterSource([xyz], { sceneObject, channels });
        this.dispose(() => source.dispose())

        const imageLayer = new ImageLayer({
            opacity: 1,
            source,
        });
        imageLayer.setVisible(sceneObject.show ?? true)
        imageLayer.setZIndex(sceneObject.zIndex ?? 0)

        this.dispose(() => imageLayer.dispose())
        this.dispose(sceneObject.showChanged.disposableOn((flag) => {
            imageLayer.setVisible(flag ?? true)
        }));

        this.dispose(sceneObject.zIndexChanged.disposableOn((zIndex) => {
            imageLayer.setZIndex(zIndex ?? 0)
        }));

        viewer.addLayer(imageLayer);
        this.dispose(() => viewer.removeLayer(imageLayer))

        {//色阶,亮度对比度,色相饱和度 python改造
            const update = () => {
                const colorsTable = getColorsTable()
                const hslChannels = getColorHSLChannels()
                const curveChannels = getCurveChannels()
                channels.value = { colorsTable, hslChannels, curveChannels }
                source.changed()
            };
            update()
            const event = this.disposeVar(createNextAnimateFrameEvent(
                sceneObject.colorLevelRgbChanged,//色阶
                sceneObject.colorLevelRedChanged,
                sceneObject.colorLevelGreenChanged,
                sceneObject.colorLevelBlueChanged,

                sceneObject.brightnessChanged,//亮度对比度
                sceneObject.contrastChanged,

                sceneObject.allHSL0Changed,//色度
                sceneObject.redHSL1Changed,
                sceneObject.yellowHSL2Changed,
                sceneObject.greenHSL3Changed,
                sceneObject.cyanHSL4Changed,//青色
                sceneObject.blueHSL5Changed,
                sceneObject.magentaHSL6Changed,//洋红

                sceneObject.curveRgbChanged,//曲线
                sceneObject.curveRedChanged,
                sceneObject.curveGreenChanged,
                sceneObject.curveBlueChanged
            ));
            this.dispose(event.disposableOn(update));
        }

        {//更新属性
            const updateXYZ = () => {
                //@ts-ignore
                xyz.tileGrid = new TileGrid(sceneObject.tileGrid ?? { origin: getTopLeft(projectionExtent), resolutions: resolutions, matrixIds: matrixIds });
                sceneObject.attributions && xyz.setAttributions(sceneObject.attributions)
                sceneObject.tileLoadFunction && xyz.setTileLoadFunction(Function('"use strict";return (' + sceneObject.tileLoadFunction + ')')());
                sceneObject.tileUrlFunction && xyz.setTileUrlFunction(Function('"use strict";return (' + sceneObject.tileUrlFunction + ')')());
            }
            const updateEvent = this.disposeVar(createNextAnimateFrameEvent(
                sceneObject.attributionsChanged,
                sceneObject.tileGridChanged,
                sceneObject.tileLoadFunctionChanged,
                sceneObject.tileUrlFunctionChanged,
            ));
            this.dispose(updateEvent.disposableOn(updateXYZ));
        }
        {//url urls
            sceneObject.urlChanged.disposableOn((url) => {
                xyz.setUrl(url ?? "")
            })
            sceneObject.urlsChanged.disposableOn((urls) => {
                xyz.setUrls(urls ?? [])
            })
        }
    }
}

export class ESOlXYZLayer extends EngineObject<ESXYZLayer> {
    static readonly type = this.register('ESOlViewer', ESXYZLayer.type, this);
    constructor(sceneObject: ESXYZLayer, olViewer: ESOlViewer) {
        super(sceneObject, olViewer);

        let olXyz: OlXYZ | undefined;
        this.dispose(() => olXyz && olXyz.destroy())
        {
            const createXYZ = () => {
                if (olXyz) {
                    olXyz.destroy();
                    olXyz = undefined;
                }
                olXyz = new OlXYZ(sceneObject, olViewer)
            }
            createXYZ()
            const createEvent = this.disposeVar(createNextAnimateFrameEvent(
                sceneObject.attributionsCollapsibleChanged,
                sceneObject.cacheSizeChanged,
                sceneObject.crossOriginChanged,
                sceneObject.interpolateChanged,
                sceneObject.projectionChanged,
                sceneObject.reprojectionErrorThresholdChanged,
                sceneObject.tilePixelRatioChanged,
                sceneObject.wrapXChanged,
                sceneObject.transitionChanged,
                sceneObject.zDirectionChanged,
                sceneObject.maxZoomChanged,
                sceneObject.minZoomChanged,
                sceneObject.opaqueChanged,
                sceneObject.maxResolutionChanged,
                sceneObject.tileSizeChanged,
                sceneObject.gutterChanged,
            ));
            this.dispose(createEvent.disposableOn(createXYZ));
        }
    }
}
