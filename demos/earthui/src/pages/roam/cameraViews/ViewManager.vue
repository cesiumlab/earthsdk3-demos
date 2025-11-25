<template>
    <div class="view_panel">

        <div class="view-header" @click.stop="addView()">
            <span class="add-icon">+</span>
            <span class="view-title">视点书签</span>
            <div class="play" @click.stop="loopplying = !loopplying" :title="loopplying ? '暂停' : '播放'"><es-icon
                    :name="loopplying ? 'zanting' : 'bofang'" :color="'rgba(216, 216, 216, 1)'" :size="12" />
            </div>
        </div>
        <div class="view-content">
            <div class="view_item" :class="{ 'view_selected': currentViewIndex === index }"
                v-for="(item, index) in viewsRef" @click.stop="flyInByIndex(index)">
                <img class="view_item_img" :src="item.thumbnail" alt="" :title="item.name">
                <input v-if="editingIndex == index" @click.stop="" type="text" v-model="item.name" :title="item.name"
                    @blur="editingChange(item.name, index)" @keydown.enter="handleEnterKey"
                    :ref="el => setInputRef(el, index)">
                <span class="view_item_text" v-else>{{ item.name }}</span>
                <!-- <es-icon @click.stop="updateView(index)" :name="'gengxin'" :size="16" /> -->

                <span class="update-icon" @click.stop="updateView(index)">
                    <svg t="1764034594044" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="10350" fill="currentColor" width="20" height="20">
                        <path
                            d="M641.28 160a64 64 0 0 1 49.92 24L748.8 256h115.2a64 64 0 0 1 64 64v480a64 64 0 0 1-64 64h-704a64 64 0 0 1-64-64V320a64 64 0 0 1 64-64h115.2l57.6-72a64 64 0 0 1 49.92-24h258.56zM512 352a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m0 64a128 128 0 1 1 0 256 128 128 0 0 1 0-256z"
                            p-id="10351"></path>
                    </svg>
                </span>

                <!-- <es-icon @click.stop="startEditing(index)" :name="'bianji'" :size="16" /> -->

                <span class="update-icon" @click.stop="startEditing(index)">
                    <svg t="1764035057981" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="19426" fill="currentColor" width="20" height="20">
                        <path
                            d="M752.224 128A143.776 143.776 0 0 1 896 272.224v480A143.776 143.776 0 0 1 752.224 896h-480A143.776 143.776 0 0 1 128 752.224v-480A143.776 143.776 0 0 1 272.224 128h480z m-350.72 576H656a26.656 26.656 0 1 0 0-53.344H448l181.344-181.312-80.64-80.64-227.84 232.512V704h80.64z m295.68-307.2v-0.864a20.896 20.896 0 0 0 0.416-29.856l-48.64-48.64a20.896 20.896 0 0 0-29.856 0l-38.4 38.4 80.64 81.504 35.84-40.544z"
                            p-id="19427"></path>
                    </svg>
                </span>

                <!-- <es-icon @click.stop="deleteViewer(index)" :name="'shanchu_2'" :size="16" /> -->
                <span class="update-icon" @click.stop="deleteViewer(index)">
                    <svg t="1764034971236" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="16627" fill="currentColor" width="20" height="20">
                        <path
                            d="M180.7 289.1v-61c0-18.4 14.9-33.2 33.2-33.2h190.6v-33.2c0-18.4 14.9-33.2 33.2-33.2h150.7c18.4 0 33.2 14.9 33.2 33.2v33.2h190.6c18.4 0 33.2 14.9 33.2 33.2v61H180.7zM752.6 861c0 18.4-14.9 33.2-33.2 33.2H307c-18.4 0-33.2-14.9-33.2-33.2l-66.5-548.6h611.8L752.6 861zM420.1 438.7c0-18.4-14.9-33.2-33.2-33.2-18.4 0-33.2 14.9-33.2 33.2v332.5c0 18.4 14.9 33.2 33.2 33.2 18.4 0 33.2-14.9 33.2-33.2V438.7z m124.1 0c0-18.4-14.9-33.2-33.2-33.2-18.4 0-33.2 14.9-33.2 33.2v332.5c0 18.4 14.9 33.2 33.2 33.2 18.4 0 33.2-14.9 33.2-33.2V438.7z m126.4 0c0-18.4-14.9-33.2-33.2-33.2-18.4 0-33.2 14.9-33.2 33.2v332.5c0 18.4 14.9 33.2 33.2 33.2 18.4 0 33.2-14.9 33.2-33.2V438.7z"
                            p-id="16628"></path>
                    </svg>
                </span>
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-icon {
    font-size: 20px;
    margin-right: 10px;
}

.view-title {
    font-size: 14px;
    line-height: 24px;
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
    background-color: rgba(28, 28, 30, 0.9);
    border-radius: 5px;
}

.view_item_img {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    object-fit: cover;
}

.update-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 10px;
    color: #fff;

    &:hover {
        color: #2cf736;
    }
}

.view_selected,
.view_item:hover {
    background-color: rgba(44, 118, 247, 0.572)
}

.view_selected input,
.view_item:hover input {
    border: 1px solid #2cf736;
}



.view_item .view_item_text,
.view_item input {
    width: calc(100% - 200px);
    margin-left: 10px;
    height: 30px;
    box-sizing: border-box;
    outline: none;
    border: none;
    color: #fff;
    text-indent: 10px;
    border-radius: 5px;
}

.view_item .view_item_text {
    line-height: 30px;
}

.view_item input {
    border: 1px solid #2C68F7;
    background: rgba(28, 28, 30, 0.9);
}
</style>
