import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { createAnimateFrameWithStartValues, ESJVector3D, Processing } from "earthsdk3";
import { ref } from "vue";

// 类型定义
interface CameraInfo {
    position: ESJVector3D;
    rotation: ESJVector3D;
}

/**
 * 指南针导航 Hook
 * @param xbsjEarthUi EarthUI 实例
 * @returns 指南针相关的响应式数据和方法
 */
export function useNavigator(xbsjEarthUi: XbsjEarthUi) {
    // 响应式数据
    const rotation = ref<number>(0);
    let animateFrame: Processing | null = null;
    let disposeViewerChanged: (() => void) | null = null;

    /**
     * 更新指南针旋转角度
     */
    const updateRotation = async (): Promise<void> => {
        try {
            const viewer = xbsjEarthUi.activeViewer;
            if (!viewer) return;

            const cameraInfo = await viewer.getCurrentCameraInfo() as CameraInfo | null;
            if (cameraInfo?.rotation) {
                rotation.value = cameraInfo.rotation[0];
            }
        } catch (error) {
            console.error('获取相机信息失败:', error);
        }
    };

    /**
     * 飞向北方
     */
    const flyToNorth = (): void => {
        const viewer = xbsjEarthUi.activeViewer;
        if (!viewer) return;

        try {
            const cameraInfo = viewer.getCurrentCameraInfo() as CameraInfo | null;
            if (cameraInfo?.position && cameraInfo?.rotation) {
                const position: ESJVector3D = [...cameraInfo.position];
                const rotation: ESJVector3D = [...cameraInfo.rotation];
                // 设置偏航角为0度(北向)
                rotation[0] = 0;
                viewer.flyIn(position, rotation, 1);
            }
        } catch (error) {
            console.error('飞向北方失败:', error);
        }
    };

    /**
     * 启动动画帧
     */
    const startAnimateFrame = (): void => {
        // 先清理之前的动画帧
        destroyAnimateFrame();
        animateFrame = createAnimateFrameWithStartValues(updateRotation);
        animateFrame.start();
    };

    /**
     * 销毁动画帧资源
     */
    const destroyAnimateFrame = (): void => {
        if (animateFrame) {
            animateFrame.destroy();
            animateFrame = null;
        }
    };

    /**
     * 监听视图器变化
     */
    const watchViewerChange = (): void => {
        // 先清理之前的监听器
        if (disposeViewerChanged) {
            disposeViewerChanged();
            disposeViewerChanged = null;
        }

        disposeViewerChanged = xbsjEarthUi.activeViewerChanged.don(() => {
            destroyAnimateFrame();
            updateRotation();
            startAnimateFrame();
        })

    };

    /**
     * 初始化指南针
     */
    const initNavigator = (): void => {
        updateRotation();
        startAnimateFrame();
        watchViewerChange();
    };

    /**
     * 清理所有资源
     */
    const destroy = (): void => {
        destroyAnimateFrame();

        if (disposeViewerChanged) {
            disposeViewerChanged();
            disposeViewerChanged = null;
        }
    };

    return {
        // 数据
        rotation,

        // 方法
        updateRotation,
        flyToNorth,
        startAnimateFrame,
        destroyAnimateFrame,
        watchViewerChange,
        initNavigator,
        destroy
    };
}
