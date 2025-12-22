import { ref, Ref } from "vue";
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi';
import { createAnimateFrameWithStartValues, ESJVector3D, Processing } from "earthsdk3";
import { ElMessage } from 'element-plus'

// 类型定义
interface CameraInfo {
    position: ESJVector3D;
    rotation: ESJVector3D;
}

interface StatusInfo {
    fps: number;
    position: ESJVector3D;
    rotation: ESJVector3D;
}

// 状态栏组合式函数
export function useStatusBar(xbsjEarthUi: XbsjEarthUi) {
    // 响应式数据
    const statusInfo = ref<StatusInfo>({ fps: 0, position: [0, 0, 0], rotation: [0, 0, 0] });
    const realTimeInfo: Ref<ESJVector3D | null> = ref(null);
    let dispose: (() => void) | null = null;
    let animateFrame: Processing | null = null;

    // 更新相机信息
    const updateCameraInfo = async (): Promise<void> => {
        const viewer = xbsjEarthUi.activeViewer;
        if (!viewer) return;

        try {
            statusInfo.value.fps = await viewer.getFPS();
            const cameraInfo = await viewer.getCurrentCameraInfo() as CameraInfo | null;

            if (cameraInfo?.position && cameraInfo?.rotation) {
                statusInfo.value.position = [...cameraInfo.position] as ESJVector3D;
                statusInfo.value.rotation = [...cameraInfo.rotation] as ESJVector3D;
            }
        } catch (error) {
            console.error('获取相机信息失败:', error);
        }
    };

    // 设置鼠标位置监听器
    const setupMousePositionListener = (): void => {
        const viewer = xbsjEarthUi.activeViewer;
        if (!viewer) return;

        // 清除之前的监听器
        if (dispose) {
            dispose();
            dispose = null;
        }

        dispose = viewer.hoverEvent.disposableOn((res) => {
            viewer.pickPosition(res.screenPosition)
                .then(result => {
                    if (result) {
                        realTimeInfo.value = [...result] as ESJVector3D;
                    } else {
                        realTimeInfo.value = null;
                    }
                })
                .catch(error => {
                    console.error('获取鼠标位置失败:', error);
                    realTimeInfo.value = null;
                });
        });
    };

    // 启动动画帧
    const startAnimateFrame = (): void => {
        animateFrame = createAnimateFrameWithStartValues(updateCameraInfo);
        animateFrame.start();
    };

    // 重新初始化
    const reinitialize = (): void => {
        destroy();
        updateCameraInfo();
        startAnimateFrame();
        setupMousePositionListener();
    };

    // 清理资源
    const destroy = (): void => {
        if (animateFrame) {
            animateFrame.destroy();
            animateFrame = null;
        }

        if (dispose) {
            dispose();
            dispose = null;
        }
    };

    // 复制鼠标位置到剪贴板
    const copyMousePosition = (): void => {
        if (!realTimeInfo.value) return;

        const [x, y, z] = realTimeInfo.value;
        const text = `${x.toFixed(5)}, ${y.toFixed(5)}, ${z.toFixed(2)}`;

        navigator.clipboard.writeText(text)
            .then(() => {
                ElMessage.success('复制成功');
            })
            .catch((error) => {
                ElMessage.error(`复制失败: ${error}`);
            });
    };

    // 格式化FPS
    const getFormattedFps = (): number => {
        return Math.floor(statusInfo.value.fps);
    };

    // 格式化位置信息
    const getFormattedPosition = (): string => {
        const [x, y, z] = statusInfo.value.position;
        return `${x.toFixed(5)}, ${y.toFixed(5)}, ${z.toFixed(2)}`;
    };

    // 格式化偏航角
    const getFormattedYaw = (): string => {
        return statusInfo.value.rotation[0].toFixed(2);
    };

    // 格式化俯仰角
    const getFormattedPitch = (): string => {
        return statusInfo.value.rotation[1].toFixed(2);
    };

    // 获取鼠标位置文本
    const getMousePositionText = (): string => {
        if (!realTimeInfo.value) {
            return '暂时无法获取鼠标位置...';
        }
        const [x, y, z] = realTimeInfo.value;
        return `鼠标位置: ${x.toFixed(5)}, ${y.toFixed(5)}, ${z.toFixed(2)}`;
    };

    // 获取鼠标位置提示信息
    const getMousePositionTitle = (): string => {
        return realTimeInfo.value ? '双击复制当前位置' : '';
    };

    return {
        // 数据
        statusInfo,
        realTimeInfo,

        // 方法
        updateCameraInfo,
        setupMousePositionListener,
        startAnimateFrame,
        reinitialize,
        destroy,
        copyMousePosition,
        getFormattedFps,
        getFormattedPosition,
        getFormattedYaw,
        getFormattedPitch,
        getMousePositionText,
        getMousePositionTitle
    };
}
