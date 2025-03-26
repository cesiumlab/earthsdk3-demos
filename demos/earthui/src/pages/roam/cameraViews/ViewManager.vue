<template>
    <div class="roam_custom_box">
        <div class="roam_custom_head">
            <div class="roam_custom_head_top">{{ '视角管理器' }} </div>
            <div class="roam_custom_head_bottom">
                <div @click.stop="cameraViewsManager.addView()" title="添加视角"><es-icon :name="'tianjia'"
                        :color="'rgba(216, 216, 216, 1)'" :size="12" /></div>
                <div @click.stop="loopplying = !loopplying" :title="loopplying ? '暂停' : '播放'"><es-icon
                        :name="loopplying ? 'zanting' : 'bofang'" :color="'rgba(216, 216, 216, 1)'" :size="12" />
                </div>
            </div>
        </div>
        <div class="poplist_content">
            <div class="roam_custom_centent">
                <div v-for="(item, index) in viewsRef" class="roam_custom_item" :title="item.name">
                    <div class="roam_custom_operate">
                        <span :title="'删除'" @click="deleteViewer(index)"><es-icon :name="'shanchu_2'"
                                :color="currentViewIndex === index ? 'rgba(230, 230, 230, 1)' : 'rgba(87, 91, 102, 1)'"
                                :size="8" /></span>
                        <span :title="'更新'" @click="cameraViewsManager.resetView(index)"><es-icon :name="'gengxin'"
                                :color="currentViewIndex === index ? 'rgba(230, 230, 230, 1)' : 'rgba(87, 91, 102, 1)'"
                                :size="8" /></span>
                        <span :title="'编辑'" @click="editingNmae = index"><es-icon :name="'bianji'"
                                :color="currentViewIndex === index ? 'rgba(230, 230, 230, 1)' : 'rgba(87, 91, 102, 1)'"
                                :size="8" /></span>
                    </div>
                    <img class="roam_img_item" :src="item.thumbnail" alt="" width="70" @click="demo(index)"
                        :class="{ 'roam_img_item_selected': currentViewIndex === index }">
                    <input type="text" class="roam_name_editing" v-if="editingNmae === index" v-model="item.name"
                        @blur="editingChange(item.name, index)" @keydown.enter="editingChange(item.name, index)">
                    <span class="roam_name_item" v-else>{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { Message, messageBox, createVueDisposer, toVR } from "earthsdk-ui";
import { ESJViewInfo } from "earthsdk3";
import { inject, onBeforeUnmount, ref } from 'vue';
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';

const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const { cameraViewsManager } = xbsjEarthUi
const hoverIndex = ref(-1)
const currentDeleteIndex = ref(-1)
const editingNmae = ref(-1)
const deleteViewer = (index: number) => {
    currentDeleteIndex.value = index
    messageBox({ text: '确认删除视角？' })
        .then(() => {
            deleteViewConfirm()
        })
        .catch((err) => {
        })
}
const editingChange = (name: string | undefined, index: number) => {
    editingNmae.value = -1
    cameraViewsManager.resetViewName(index, name ?? '视角')
}
const d = createVueDisposer(onBeforeUnmount)
const viewsRef = toVR<ESJViewInfo[]>(d, [cameraViewsManager, 'views'])//视角数组
const loopplying = toVR<boolean>(d, [cameraViewsManager, 'playing'])//视角数组
const currentViewIndex = toVR<number>(d, [cameraViewsManager, 'currentViewIndex'])//视角数组
const deleteViewConfirm = () => {
    cameraViewsManager.deleteView(currentDeleteIndex.value)
    currentDeleteIndex.value = -1
    Message.success('删除成功')
}
const emits = defineEmits(['close'])
const demo = (index: number) => {
    cameraViewsManager.setCurrentView(index)
    cameraViewsManager.flyToView(index)
}
</script>
