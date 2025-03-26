<script setup lang='ts'>
import { vue3Xe2Bind } from 'earthsdk-ui';
import { ES3DTileset, SceneTree } from "earthsdk3";
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
import RightList from '../../components/RightList.vue';
import SliderTime from '../../components/SliderTime.vue';
const sceneTree = inject('sceneTree') as SceneTree
const isshow = ref(false)
const showName = ref('请选中瓦片图层')

const lineNameMode = ref<string>('真实材质')
// const czmColorBlendMode = ref<'HIGHLIGHT' | 'REPLACE' | 'MIX'>('HIGHLIGHT')

const listsModeList = [
    {
        name: '真实材质',
        id: 'HIGHLIGHT'
    },
    {
        name: '图层纯色',
        id: 'REPLACE'
    },
    {
        name: '图层混合',
        id: 'MIX'
    }
]
const changeLineModeId = (item: any) => {
    // czmColorBlendMode.value = item.id
    lineNameMode.value = item.name
}
const selectedItems = sceneTree.selectedItems
const chlastSelectedItem = () => {
    isshow.value = false
    showName.value = '请选中瓦片图层'
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (!lastSelectedItem) return
    if (lastSelectedItem.type == 'ES3DTileset') {
        if (lastSelectedItem.sceneObject instanceof ES3DTileset) {
            maximumScreenSpaceError.value = lastSelectedItem.sceneObject.maximumScreenSpaceError
            cacheBytes.value = lastSelectedItem.sceneObject.cacheBytes
            newCzmCacheBytes.value = cacheBytes.value / 1024 / 1024
            // czmColorBlendMode.value = lastSelectedItem.sceneObject.czmColorBlendMode
            // setTimeout(() => {
            //     const a = listsModeList.find((item) => item.id === czmColorBlendMode.value)
            //     if (a && a.name) {
            //         lineNameMode.value = a.name
            //     }
            // }, 100)
        }
        setTimeout(() => {
            showName.value = lastSelectedItem.name
        }, 100)
        isshow.value = true
    } else {
        showName.value = '请选中瓦片图层'
        isshow.value = false
    }
}
const beDefault = (type: string) => {
    //显示精度
    if (type == 'maximumScreenSpaceError') {
        maximumScreenSpaceError.value = 16
    } else if (type == 'cacheBytes') {
        cacheBytes.value = 536870912
        newCzmCacheBytes.value = cacheBytes.value / 1024 / 1024

    }
}
//显示精度
const maximumScreenSpaceError = ref(16.0)
const maximumScreenSpaceErrorChange = (val: number) => {
    maximumScreenSpaceError.value = val
}

//显存
const cacheBytes = ref(536870912)
const newCzmCacheBytes = ref(512)
const czmCacheBytesChange = (val: number) => {
    newCzmCacheBytes.value = val
    cacheBytes.value = newCzmCacheBytes.value * 1024 * 1024
}
class ES3DTilesetController extends Destroyable {
    constructor(private _eS3DTileset: ES3DTileset) {
        super();
        this.d(vue3Xe2Bind(maximumScreenSpaceError, [this._eS3DTileset, 'maximumScreenSpaceError'], 16));//最大精度
        // this.d(vue3Xe2Bind(czmColorBlendMode, [this._eS3DTileset, 'czmColorBlendMode'], 'HIGHLIGHT'));//颜色
        this.d(vue3Xe2Bind(cacheBytes, [this._eS3DTileset, 'cacheBytes'], 536870912));//显存
    }
}
onMounted(() => {
    const objResetting = new ObjResettingWithEvent(sceneTree.selectedItems.changedEvent, () => {
        const { lastSelectedItem } = sceneTree;
        if (!lastSelectedItem) return undefined;
        const { sceneObject } = lastSelectedItem;
        if (!sceneObject) return undefined;
        if (sceneObject.typeName !== 'ES3DTileset') return undefined;
        if (!(sceneObject instanceof ES3DTileset)) return undefined;
        return new ES3DTilesetController(sceneObject);
    });
    chlastSelectedItem()
    const dispose = selectedItems.changedEvent.don(chlastSelectedItem);
    onBeforeUnmount(dispose)
    onBeforeUnmount(() => objResetting.destroy());
});
</script>

<template>
    <RightList :title="`可视化--${showName}`">
        <div class="images_relative_box">
            <label @dblclick="beDefault('maximumScreenSpaceError')"> {{ '显示精度' }}</label>
            <SliderTime :width="159" v-model:value="maximumScreenSpaceError" :max="256"
                @change="maximumScreenSpaceErrorChange" :realVal="`${maximumScreenSpaceError}`" :disabled="!isshow" />
            <span>{{ maximumScreenSpaceError }}</span>
        </div>
        <div class="images_relative_box" style="margin: 0 15px 0 15px;">
            <label @dblclick="beDefault('cacheBytes')"> {{ '显存' }}</label>
            <SliderTime :width="154" v-model:value="newCzmCacheBytes" :min="512" :max="5120" :step="38"
                @change="czmCacheBytesChange" :realVal="`${newCzmCacheBytes}`" :disabled="!isshow" />
            <span>{{ newCzmCacheBytes }}</span>
        </div>
        <!-- <div style="margin: 0 15px 10px 15px;">
            <LabelInput v-model="lineNameMode" :label="'颜色模式'" :disabled="!isshow" :activeMode="czmColorBlendMode"
                :checkbox="true" :list="listsModeList" :liClickFun="changeLineModeId" :placeholder="'请选择或输入'">
            </LabelInput>
        </div> -->

    </RightList>
</template>