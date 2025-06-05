<template>
    <DraggablePopup2 v-if="props.isShow"
        :title="`材质替换编辑器${(props.setStyleTreeItem && props.setStyleTreeItem.name) ? '（' + props.setStyleTreeItem.name + '）' : ''}`"
        :width="600" :height="'400px'" :left="650" :top="200" @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="material">
            <div class="header">
                <input type="text" v-model="materialName" placeholder="请输入材质名称">
                <div @click="searchMaterial">
                    <img class="search_img" src="../../../assets/material/search.png" alt="">
                </div>
            </div>
            <div class="middle">
                <div class="middle_title">
                    <p>Tiles材质名称</p>
                    <p>替换UE材质ID</p>
                </div>
                <div class="middle_content">
                    <div v-for="(item, index) in list" :key="index">
                        <input type="checkbox">
                        <p>{{ item.key }}</p>
                        <p>{{ item.value }}</p>
                        <img src="../../../assets/material/caizhi_weixuanzhong.png" alt="" @click="setMaterial(item)">
                        <img src="../../../assets/material/chongzhi_weixuanzhong.png" alt="">

                    </div>
                </div>
            </div>
        </div>
    </DraggablePopup2>
    <MaterialSelect :isShow="materialSelectShow" :tilesetUEMaterial="tilesetUEMaterial"
        :currentUEMaterial="currentItem.value" @cancel="cancelMaterialSelect" @ok="okMaterialSelect">
    </MaterialSelect>

</template>

<script setup lang="ts">
type item = { key: string, value: string | undefined };

import { ref, onMounted } from "vue";
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import DraggablePopup2 from "../../DraggablePopup2.vue";
import MaterialSelect from "./MaterialSelect.vue";
import { ESUeViewer } from "earthsdk3-ue";
import { Message } from "earthsdk-ui";

// 传入事件
const props = withDefaults(defineProps<{ isShow: boolean, setStyleTreeItem: SceneTreeItem | undefined, }>(), {});
// 分发事件
const emits = defineEmits(["changeShow"]);
// 当前材质名称
const materialName = ref("");
// 列表list
const list = ref<item[]>([])

// UE材质管理器显隐控制
const materialSelectShow = ref(false)
// UE材质ID列表
const tilesetUEMaterial = ref<any[]>([])
// 当前选择项
const currentItem = ref<any>({})

/**
 * 取消材质替换
 */
const changeCancel = () => {
    emits("changeShow", false);
}

/**
 * 确认材质替换
 */
const changeOk = async () => {
    const result = convertListToObject(list.value)
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    sceneObject.materialOverrideMap = result
    emits("changeShow", false);
}

/**
 * 取消材质选择
 */
const cancelMaterialSelect = () => {
    materialSelectShow.value = false
}

/**
 * 确认材质选择
 */
const okMaterialSelect = async (material: string) => {
    materialSelectShow.value = false
    currentItem.value.value = material

}


/**
 * 搜索材质
 */
const searchMaterial = () => {

}
/**
 * 获取材质名称列表
 */
const getMaterialNameList = async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    const temp = await sceneObject.getMaterialNameList() as any
    list.value = temp.map((item: any) => {
        return { key: item, value: sceneObject.materialOverrideMap ? sceneObject.materialOverrideMap[item] : undefined }
    })
}

/**
 * 获取替换Tileset的UE材质ID列表
 */
const getTilesetMaterialIDList = async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    if (sceneObject.viewer instanceof ESUeViewer) {
        tilesetUEMaterial.value = await sceneObject.viewer.getTilesetMaterialIDList() as any
    }
}

/**
 * 设置材质
 * @param item 
 */
const setMaterial = (item: item) => {
    currentItem.value = item
    materialSelectShow.value = true

}

/**
 * 将列表转换为对象
 * @param list 
 * @returns 
 */
const convertListToObject = (list: { key: string, value: string }[]) => {
    const result = list.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {} as Record<string, string | undefined>);

    return result;
};


onMounted(() => {
    getMaterialNameList()
    getTilesetMaterialIDList()
})


</script>
<style scoped>
.material {
    width: 100%;
    height: 100%;

}

.header {
    width: calc(100% - 30px);
    height: 32px;
    margin: auto;
    display: flex;
    align-items: center;
    padding-top: 20px;
    color: #fff;
}

.header input {
    width: calc(100% - 40px);
    height: 100%;
    background: #25262A;
    border-radius: 4px 0px 0px 4px;
    border: 1px solid #5d5e60;
    text-indent: 15px;
    box-sizing: border-box;
    color: #fff;
}

.header div {
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #5d5e60;
    box-sizing: border-box;
    border-radius: 0px 4px 4px 0px;
    border-left: 0px;
    cursor: pointer;
}

.search_img:active,
.search_img:hover {
    content: url(../../../assets/material/search_hover.png);
}

.middle {
    width: calc(100% - 30px);
    height: calc(100% - 80px);
    margin: auto;
}

.middle_title {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
}

.middle_title p {
    width: 50%;
    text-align: center;
    font-size: 12px;
}

.middle_content {
    width: 100%;
    height: calc(100% - 100px);
    overflow: auto;
}

.middle_content div {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 20px 20px;
    align-items: center;
    text-align: center;
    font-size: 12px;
}

.middle_content div p {
    height: 20px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3B3C40;
    margin: 4px;
    margin-right: 20px;
}
</style>
