<template>
    <div class="view_panel">

        <div class="view-header" @click.stop="addView()">
            <span>+</span>
            <span>视点书签</span>
            <div class="play" @click.stop="loopplying = !loopplying" :title="loopplying ? '暂停' : '播放'"><es-icon
                    :name="loopplying ? 'zanting' : 'bofang'" :color="'rgba(216, 216, 216, 1)'" :size="12" />
            </div>
        </div>
        <div class="view-content">
            <div class="view_item" :class="{ 'view_selected': currentViewIndex === index }"
                v-for="(item, index) in viewsRef" @click.stop="flyInByIndex(index)">
                <img :src="item.thumbnail" alt="" width="40" height="40" :title="item.name">
                <input v-if="editingIndex == index" @click.stop="" type="text" v-model="item.name" :title="item.name"
                    @blur="editingChange(item.name, index)" @keydown.enter="handleEnterKey"
                    :ref="el => setInputRef(el, index)">
                <span v-else>{{ item.name }}</span>
                <es-icon @click.stop="updateView(index)" :name="'gengxin'" :size="16" />
                <es-icon @click.stop="startEditing(index)" :name="'bianji'" :size="16" />
                <es-icon @click.stop="deleteViewer(index)" :name="'shanchu_2'" :size="16" />
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { Message, messageBox, createVueDisposer, toVR } from "earthsdk-ui";
import { ESJViewInfo } from "earthsdk3";
import { inject, onBeforeUnmount, ref, nextTick } from 'vue';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { cameraViewsManager } = xbsjEarthUi
const emits = defineEmits(['close'])
const currentDeleteIndex = ref(-1)
const editingIndex = ref(-1)
const deleteViewer = (index: number) => {
    currentDeleteIndex.value = index
    messageBox({ text: '确认删除视角？' })
        .then(() => {
            deleteViewConfirm()
        })
        .catch((err) => {
        })
}
// 添加一个标志来防止重复调用
const isProcessingEdit = ref(false)

const editingChange = (name: string | undefined, index: number) => {
    if (isProcessingEdit.value) return // 如果正在处理编辑，直接返回

    isProcessingEdit.value = true
    editingIndex.value = -1
    cameraViewsManager.resetViewName(index, name ?? '视角')
    Message.success('编辑成功')

    // 重置标志
    setTimeout(() => {
        isProcessingEdit.value = false
    }, 100)
}

const handleEnterKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    const index = editingIndex.value
    if (index !== -1) {
        editingChange(target.value, index)
    }
}

// 存储输入框引用
const inputRefs = ref<{ [key: number]: HTMLInputElement }>({})

const setInputRef = (el: any, index: number) => {
    if (el) {
        inputRefs.value[index] = el
    }
}

const startEditing = (index: number) => {
    editingIndex.value = index
    // 等待DOM更新后聚焦输入框
    nextTick(() => {
        const input = inputRefs.value[index]
        if (input) {
            input.focus()
            input.select() // 选中所有文本
        }
    })
}
const d = createVueDisposer(onBeforeUnmount)
const viewsRef = toVR<ESJViewInfo[]>(d, [cameraViewsManager, 'views'])//视角数组
const loopplying = toVR<boolean>(d, [cameraViewsManager, 'playing'])//视角数组
const currentViewIndex = toVR<number>(d, [cameraViewsManager, 'currentViewIndex'])//视角数组
cameraViewsManager.intervalTime = 2

/**
 * 删除视角
 */
const deleteViewConfirm = () => {
    cameraViewsManager.deleteView(currentDeleteIndex.value)
    currentDeleteIndex.value = -1
    Message.success('删除成功')
}


/**
 * 飞行定位
 * @param index 
 */
const flyInByIndex = (index: number) => {
    cameraViewsManager.setCurrentView(index)
    cameraViewsManager.flyToView(index)
}

/**
 * 添加视角
 */
const addView = () => {
    changeToMap()
    cameraViewsManager.addView()
    Message.success('添加成功')
}

/**
 * 切换到地图模式
 */
const changeToMap = () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    viewer.changeToMap()
    xbsjEarthUi.roamMode = 'Map'
}

const updateView = (index: number) => {
    cameraViewsManager.update(index)
    Message.success('视角更新')
}
</script>

<style scoped>
.view_panel {
    width: 100%;
    font-size: 14px;
    margin: 5px 15px 15px 15px;
}

.view-header {
    position: relative;
    background: rgba(28, 28, 30, 0.9);
    border: 1px solid #2C68F7;
    margin-bottom: 20px;
    text-align: center;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
}

.play {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-45%);
}

.view-content {
    overflow-y: auto;
}

.view-header:hover {
    box-shadow: inset 0px 0px 11px 2px #2C63E4;
    border: 1px solid #2C68F7;
}

.view_item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    padding: 5px;
}

.view_selected,
.view_item:hover {
    background-color: rgba(44, 118, 247, 0.572)
}

.view_selected input,
.view_item:hover input {
    border: 1px solid #2cf736;
}



.view_item span,
.view_item input {
    width: calc(100% - 100px);
    margin-left: 10px;
    height: 30px;

    box-sizing: border-box;
    background: rgba(28, 28, 30, 0.9);
    outline: none;
    border: none;
    color: #fff;
    text-indent: 10px;
    border: 1px solid #5c5c5c;
    border-radius: 5px;
}

.view_item span {
    line-height: 30px;
}

.view_item input {
    border: 1px solid #2C68F7;
}

.es-icon {
    margin-left: 5px;
    cursor: pointer;
    color: #fff !important;
}

.es-icon:hover {
    color: #2cf736 !important;
}
</style>
