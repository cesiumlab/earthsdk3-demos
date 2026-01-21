<template>
    <el-dialog :model-value="props.show" title="Cesium 源码" width="850px" :modal="false" :draggable="true"
        :before-close="props.resolve" class="create-scene-object-dialog" destroy-on-close>
        <div class="dialog-content" ref="contentRef">
            <!-- 左侧：代码编辑器 -->
            <div class="editor-panel" :style="{ width: leftWidth + 'px' }">
                <ESEditor :content="props.code" :readonly="true" :language="'js'" ref="editorRef" @load="editorLoad" />
            </div>

            <!-- 可拖动的分隔条 -->
            <div class="resizer" @mousedown="startResize" :class="{ 'resizing': isResizing }">
                <div class="resizer-line"></div>
            </div>

            <!-- 右侧：Cesium 3D 视图 -->
            <div class="viewer-panel">
                <div class="viewer_right" ref="cesiumContainerRef">
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium';
import { ESEditor } from "earthsdk-ui";
import { ElDialog } from "element-plus";
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

/** 编辑器引用 */
const editorRef = useTemplateRef<{
    getVal: () => string;
    setVal: (v: string) => void;
    formatCode: () => void;
}>('editorRef');

/** 组件属性定义 */
const props = withDefaults(defineProps<{
    show: boolean,
    code: string,
    resolve: () => void,
}>(), {});

/**
 * 编辑器加载完成回调
 * 设置代码内容并格式化
 */
const editorLoad = () => {
    editorRef.value?.setVal(props.code);
    editorRef.value?.formatCode();
}

/** Cesium 容器引用 */
const cesiumContainerRef = useTemplateRef('cesiumContainerRef');

/** 内容容器引用 */
const contentRef = useTemplateRef('contentRef');

/** Cesium Viewer 实例 */
let viewer: Cesium.Viewer | null = null;

/** 左侧面板宽度 */
const leftWidth = ref(400);

/** 是否正在调整大小 */
const isResizing = ref(false);

/** 最小宽度限制 */
const MIN_WIDTH = 250;

/**
 * 开始调整大小
 * @param e - 鼠标事件
 */
const startResize = (e: MouseEvent) => {
    isResizing.value = true;
    const startX = e.clientX;
    const startWidth = leftWidth.value;

    /**
     * 鼠标移动处理
     * @param moveEvent - 鼠标移动事件
     */
    const onMouseMove = (moveEvent: MouseEvent) => {
        if (!contentRef.value) return;

        const deltaX = moveEvent.clientX - startX;
        const newWidth = startWidth + deltaX;
        const containerWidth = contentRef.value.clientWidth;
        const maxWidth = containerWidth - MIN_WIDTH - 10; // 10px 为分隔条宽度

        // 限制宽度范围
        if (newWidth >= MIN_WIDTH && newWidth <= maxWidth) {
            leftWidth.value = newWidth;
        }
    };

    /**
     * 鼠标释放处理
     */
    const onMouseUp = () => {
        isResizing.value = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // 恢复文本选择
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    };

    // 禁用文本选择，避免拖动时选中文本
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

/**
 * 初始化 Cesium Viewer
 */
const init = () => {
    if (!cesiumContainerRef.value) return;
    try {
        // 创建 Cesium Viewer
        viewer = new Cesium.Viewer(cesiumContainerRef.value);

        // 移除所有默认影像图层
        if (viewer.imageryLayers) {
            viewer.imageryLayers.removeAll();
        }
        // 执行用户代码
        eval(props.code);

    } catch (error) {
        console.error('Cesium 初始化失败:', error);
    }
}

/**
 * 组件挂载后初始化
 */
onMounted(() => {
    setTimeout(() => init(), 1000)
});

/**
 * 组件卸载前清理 Cesium 实例
 */
onBeforeUnmount(() => {
    if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
        viewer = null;
    }
});

</script>

<style scoped lang="scss">
@use './style.scss';
</style>
