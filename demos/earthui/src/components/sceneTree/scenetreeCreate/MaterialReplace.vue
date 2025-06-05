<template>
    <DraggablePopup2 v-if="props.isShow"
        :title="`材质替换编辑器${(props.setStyleTreeItem && props.setStyleTreeItem.name) ? '（' + props.setStyleTreeItem.name + '）' : ''}`"
        :width="600" :height="'440px'" :left="650" :top="200" @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="material">
            <div class="middle">
                <div class="middle_title">
                    <p>Tiles材质名称</p>
                    <p>替换UE材质ID</p>
                </div>
                <div class="middle_content">
                    <div v-for="(item, index) in list" :key="index">
                        <input type="checkbox" v-model="item.select">
                        <p>{{ item.key }}</p>
                        <input type="text" v-model="item.value">
                        <img src="../../../assets/material/caizhi_weixuanzhong.png" alt="" @click="setMaterial(item)">

                    </div>
                </div>
            </div>
            <div class="footer">
                <div>
                    <input type="checkbox" v-model="isSelectAll">
                    <p>共计{{ list.length }}条记录</p>
                </div>
                <div>
                    <button @click="setMaterialFormMost">批量替换</button>
                </div>


            </div>

        </div>
    </DraggablePopup2>
    <MaterialSelect :isShow="materialSelectShow" :tilesetUEMaterial="tilesetUEMaterial"
        :currentUEMaterial="currentItem.value" @cancel="cancelMaterialSelect" @ok="okMaterialSelect">
    </MaterialSelect>

</template>

<script setup lang="ts">
type item = { key: string, value: string | undefined, select: boolean };

import { ref, onMounted, watch } from "vue";
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import DraggablePopup2 from "../../DraggablePopup2.vue";
import MaterialSelect from "./MaterialSelect.vue";
import { ESUeViewer } from "earthsdk3-ue";

// 传入事件
const props = withDefaults(defineProps<{ isShow: boolean, setStyleTreeItem: SceneTreeItem | undefined, }>(), {});
// 分发事件
const emits = defineEmits(["changeShow"]);
/** <-----------------------------------材质替换器变量--------------------------------------------------------->*/
// 当前材质名称
const materialName = ref("");
// 列表list
const list = ref<item[]>([])
// 当前选择项
const currentItem = ref<any>({})
// 全选
const isSelectAll = ref(false)
// 是否批量设置
const isSetMaterialFormMost = ref(false)

/** <-----------------------------------材质管理器传入变量--------------------------------------------------------->*/
// UE材质管理器显隐控制
const materialSelectShow = ref(false)
// UE材质ID列表
const tilesetUEMaterial = ref<any[]>([])




watch(isSelectAll, (newValue) => {
    list.value.forEach((item: item) => {
        item.select = newValue
    })
});

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
    isSetMaterialFormMost.value = false
}

/**
 * 确认材质选择
 */
const okMaterialSelect = async (material: string) => {
    materialSelectShow.value = false
    if (isSetMaterialFormMost.value) {
        list.value.forEach((item: item) => {
            if (item.select) item.value = material
        })
        isSetMaterialFormMost.value = false
    } else {
        currentItem.value.value = material

    }
}


/**
 * 获取材质名称列表
 */
const getMaterialNameList = async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    const temp = await sceneObject.getMaterialNameList() as any
    list.value = temp.map((item: any) => {
        return { key: item, value: sceneObject.materialOverrideMap ? sceneObject.materialOverrideMap[item] : undefined, select: false }
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
 * 批量替换材质
 */
const setMaterialFormMost = () => {
    currentItem.value = {}
    materialSelectShow.value = true
    isSetMaterialFormMost.value = true
}

/**
 * 将列表转换为对象
 * @param list 
 * @returns 
 */
const convertListToObject = (list: item[]) => {
    const result = list.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {} as any);

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
    height: calc(100% - 60px);

}


.middle {
    width: calc(100% - 30px);
    height: 100%;
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
    height: calc(100% - 50px);
    overflow: auto;
}

.middle_content div {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 30px;
    grid-column-gap: 15px;
    align-items: center;
    text-align: center;
    font-size: 12px;
}

.middle_content div p {
    height: 20px;
    margin: 4px;
    margin-right: 20px;
}

.middle_content div input {
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3B3C40;
    color: #fff;
    text-align: center;
}

.middle_content div img {
    cursor: pointer;
}

.middle_content div img:hover {
    content: url(../../../assets/material/caizhi_xuanzhong.png);
}

.footer {
    width: calc(100% - 50px);
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: space-between;
}

.footer>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.footer p {
    padding: 0px;
    margin: 0px;
    font-size: 12px;
}

.footer button {
    width: 79px;
    height: 30px;
    background: #25262A;
    border-radius: 4px;
    border: 1px solid #B7B7B7;
    color: #fff;
    font-size: 12px;
}
</style>
