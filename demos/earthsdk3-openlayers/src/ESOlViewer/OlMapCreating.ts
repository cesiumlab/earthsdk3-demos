import { defaults as defaultControls } from 'ol/control.js';
import { defaults } from 'ol/interaction/defaults';
import OlMap from 'ol/Map.js';
import View from 'ol/View';
import { createProcessingFromAsyncFunc, Destroyable, sleep } from 'xbsj-base';
import { ESOlViewer } from "./index";

export class OlMapCreating extends Destroyable {
    constructor(container: HTMLDivElement, olViewer: ESOlViewer, setViewer: (viewer: OlMap | undefined) => void) {
        super();

        let subContainer: HTMLDivElement | undefined;
        this.d(() => { container && subContainer && container.removeChild(subContainer); });

        const resetViewer = () => {
            olViewer.setStatus('Raw');
            olViewer.setStatusLog('');
        };
        this.d(resetViewer);

        const createViewerProcessing = this.dv(createProcessingFromAsyncFunc<void, [container: HTMLDivElement]>(async (cancelsManager, container) => {
            olViewer.setStatus('Creating');
            olViewer.setStatusLog('正在创建OpenLayers视口...');

            subContainer = document.createElement('div');
            subContainer.style.cssText = `height: 100%`;
            container.appendChild(subContainer);

            const olmap = new OlMap({
                target: subContainer,
                view: new View({
                    center: [0, 0],
                    zoom: 0,
                    enableRotation: true,
                }),
                interactions: defaults({
                    doubleClickZoom: false, // 取消双击放大功能交互
                    // mouseWheelZoom: false, // 取消滚动鼠标中间的滑轮交互
                    // shiftDragZoom: false, // 取消shift+wheel左键拖动交互
                }),
                controls: defaultControls({
                    zoom: false,
                    rotate: false,
                    attribution: false
                })
            });

            // 同步渲染一次，生成frameState，这样getPixelFromCoordinateInternal等操作才能有效！
            await cancelsManager.promise(sleep(1000));
            olmap.renderSync();

            setViewer(olmap);
            this.d(() => setViewer(undefined));

            olViewer.setStatus('Created');
            olViewer.setStatusLog('成功创建OpenLayers视口!');
        }));

        createViewerProcessing.start(container);
    }
}
