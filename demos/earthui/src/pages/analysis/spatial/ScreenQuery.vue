<template>
    <PopList :title="'屏幕查询'" :showButton="false" class="screenQuery">
    </PopList>
</template>
<script setup lang="ts">
import { ESJVector2D, ESJVector2DArray, ESObjectWithLocation, SceneTreeItem, booleanPointInPolygon } from "earthsdk3";
import { inject, onMounted, onBeforeUnmount, ref } from "vue";
import { Message } from "earthsdk-ui";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import PopList from "../../../components/PopList.vue";

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const drawing = ref(false); // 是否正在绘制
const startScreen = ref<{ x: number, y: number } | null>(null); // 起点屏幕坐标
const endScreen = ref<{ x: number, y: number } | null>(null);   // 终点屏幕坐标
let drawCanvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

/**
 * 创建并挂载 canvas 到地球容器
 */
function createCanvas() {
    drawCanvas = document.createElement('canvas');
    drawCanvas.className = 'draw-canvas';
    drawCanvas.style.position = 'absolute';
    drawCanvas.style.left = '0';
    drawCanvas.style.top = '0';
    drawCanvas.style.width = '100%';
    drawCanvas.style.height = '100%';
    drawCanvas.style.zIndex = '1';
    drawCanvas.width = window.innerWidth;
    drawCanvas.height = window.innerHeight;
    const viewer = xbsjEarthUi.activeViewer;
    if (viewer && viewer.container) {
        viewer.container.appendChild(drawCanvas);
    } else {
        console.warn("容器未就绪，无法添加 canvas");
    }
    ctx = drawCanvas.getContext('2d');
}

/**
 * 移除 canvas
 */
function removeCanvas() {
    if (drawCanvas && drawCanvas.parentNode) {
        drawCanvas.parentNode.removeChild(drawCanvas);
    }
    drawCanvas = null;
    ctx = null;
}

/**
 * canvas 尺寸自适应窗口
 */
function updateCanvasSize() {
    if (drawCanvas) {
        drawCanvas.width = window.innerWidth;
        drawCanvas.height = window.innerHeight;
    }
}

/**
 * 绘制半透明矩形
 */
function drawRect() {
    if (!ctx || !startScreen.value || !endScreen.value) return;
    ctx.clearRect(0, 0, drawCanvas!.width, drawCanvas!.height);
    const x = Math.min(startScreen.value.x, endScreen.value.x);
    const y = Math.min(startScreen.value.y, endScreen.value.y);
    const w = Math.abs(startScreen.value.x - endScreen.value.x);
    const h = Math.abs(startScreen.value.y - endScreen.value.y);
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#2C68F7';
    ctx.fillRect(x, y, w, h);
    ctx.restore();
    ctx.strokeStyle = '#2C68F7';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
}

/**
 * 鼠标按下：记录起点，开始绘制
 */
function onMouseDown(e: MouseEvent) {
    drawing.value = true;
    startScreen.value = { x: e.clientX, y: e.clientY };
    endScreen.value = null;
}

/**
 * 鼠标移动：实时更新终点并绘制
 */
function onMouseMove(e: MouseEvent) {
    if (drawing.value && startScreen.value) {
        endScreen.value = { x: e.clientX, y: e.clientY };
        drawRect();
    }
}

/**
 * 鼠标抬起：记录终点，绘制完成，转地理坐标并高亮
 */
function onMouseUp(e: MouseEvent) {
    if (!drawing.value) return;
    drawing.value = false;
    if (startScreen.value) {
        endScreen.value = { x: e.clientX, y: e.clientY };
        drawRect();
        // 处理地理坐标转换和高亮
        handleScreenRect(startScreen.value, endScreen.value);
    }
    startScreen.value = null;
    endScreen.value = null;
}

/**
 * 屏幕矩形四角转地理坐标，筛选高亮
 */
async function handleScreenRect(start: { x: number, y: number }, end: { x: number, y: number }) {
    if (!xbsjEarthUi.activeViewer) {
        Message.warning("视口未加载");
        return;
    }
    try {
        const [p1, p2, p3, p4] = await Promise.all([
            xbsjEarthUi.activeViewer.pickPosition([start.x, start.y]),
            xbsjEarthUi.activeViewer.pickPosition([end.x, start.y]),
            xbsjEarthUi.activeViewer.pickPosition([end.x, end.y]),
            xbsjEarthUi.activeViewer.pickPosition([start.x, end.y])
        ]);
        if (!p1 || !p2 || !p3 || !p4) return;

        // 闭合多边形
        const polygon: ESJVector2DArray = [
            [p1[0], p1[1]],
            [p2[0], p2[1]],
            [p3[0], p3[1]],
            [p4[0], p4[1]],
            [p1[0], p1[1]]
        ];
        const allItems = [...xbsjEarthUi.sceneTree.getDescendants()] as SceneTreeItem[];
        xbsjEarthUi.sceneTree.sceneUiTree.clearAllSelectedItems();
        allItems.forEach(item => {
            if (item && item.sceneObject && item.sceneObject instanceof ESObjectWithLocation) {
                const point: ESJVector2D = [item.sceneObject.position[0], item.sceneObject.position[1]]
                const inside = booleanPointInPolygon(polygon, point)
                if (inside && item.show) item.uiTreeObject.selected = true;
            }
        });
    } catch (error) {
        console.error('屏幕坐标拾取失败:', error);
    }
}

// 生命周期：组件挂载时创建canvas并监听事件，卸载时清理
onMounted(() => {
    Message.loading({ id: 'message', content: '请按下并拖动绘制矩形，进行区域查询筛选' })
    createCanvas();
    window.addEventListener('resize', updateCanvasSize);
    const container = xbsjEarthUi.activeViewer?.container;
    if (container) {
        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);
    }
});
onBeforeUnmount(() => {
    removeCanvas();
    window.removeEventListener('resize', updateCanvasSize);
    const container = xbsjEarthUi.activeViewer?.container;
    if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseup', onMouseUp);
    }
    Message.remove("message")
});
</script>

<style scoped>
.screenQuery {
    position: relative;
}
</style>
