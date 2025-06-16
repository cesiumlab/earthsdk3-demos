<template>
    <DraggablePopup2
        :title="`材质替换编辑器${(props.setStyleTreeItem && props.setStyleTreeItem.name) ? '（' + props.setStyleTreeItem.name + '）' : ''}`"
        :width="600" :height="'440px'" :left="350" :top="200" @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="material">
            <div class="middle">
                <div class="middle_title">
                    <p>选择</p>
                    <p>3DTiles</p>
                    <p>UE场景</p>
                </div>
                <div class="middle_content">
                    <div v-for="(item, index) in list" :key="index">
                        <input type="checkbox" v-model="item.select">
                        <p>{{ item.key }}</p>
                        <input type="text" v-model="item.value" @blur="handleBlur(item.value)">
                        <img src="../../../assets/material/caizhi_weixuanzhong.png" alt=""
                            @click="openMaterialPanel(item)" title="选择材质">
                    </div>
                </div>
            </div>
            <div class="footer">
                <div>
                    <input type="checkbox" v-model="isSelectAll">
                    <p>共计{{ list.length }}条记录</p>
                </div>
                <div>
                    <button @click="importJsonFile">导入</button>
                    <button @click="exportJsonFile">导出</button>
                    <button @click="clear">一键清空</button>
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

import { ref, onMounted, watch, nextTick } from "vue";
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import DraggablePopup2 from "../../DraggablePopup2.vue";
import MaterialSelect from "./MaterialSelect.vue";
import { ESUeViewer } from "earthsdk3-ue";
import { Message, messageBox } from "earthsdk-ui";
import { getOpenFileHandle, getSaveFileHandle, getTextFromFile, saveFile } from 'earthsdk-ui';

// 传入事件
const props = withDefaults(defineProps<{ isShow: boolean, setStyleTreeItem: SceneTreeItem | undefined, }>(), {});
// 分发事件
const emits = defineEmits(["changeShow"]);
/** <-----------------------------------材质替换器变量--------------------------------------------------------->*/
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
// 原始材质列表
const orginalMaterialOverrideMap = ref<any>({})



watch(isSelectAll, (newValue) => {
    list.value.forEach((item: item) => {
        item.select = newValue
    })
});

/**
 * 取消材质[替换]
 */
const changeCancel = () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    sceneObject.materialOverrideMap = orginalMaterialOverrideMap.value
    emits("changeShow", false);
}

/**
 * 确认材质[替换]
 */
const changeOk = async () => {
    replaceUeMaterial()
    emits("changeShow", false);
}

/**
 * 取消材质[选择]
 */
const cancelMaterialSelect = () => {
    materialSelectShow.value = false
    isSetMaterialFormMost.value = false
}

/**
 * 确认材质[选择]
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
    replaceUeMaterial()
}


/**
 * 获取Tileset材质名称列表
 */
const getMaterialNameList = async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    const temp = await sceneObject.getMaterialNameList() as any
    list.value = temp.map((item: any) => {
        return { key: item, value: sceneObject.materialOverrideMap ? sceneObject.materialOverrideMap[item] : undefined, select: false }
    })
}

/**
 * 获取UE材质列表
 */
const getTilesetMaterialIDList = async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    if (sceneObject.viewer instanceof ESUeViewer) {
        tilesetUEMaterial.value = await sceneObject.viewer.getTilesetMaterialIDList() as any
    }
}

/**
 * 打开材质选择面板
 * @param item 
 */
const openMaterialPanel = (item: item) => {
    currentItem.value = item
    materialSelectShow.value = true

}

/**
 * 批量替换材质
 */
const setMaterialFormMost = () => {

    if (list.value.filter((item: item) => item.select).length == 0) {
        Message.warning('请选择要批量替换的材质')
    } else {
        currentItem.value = {}
        materialSelectShow.value = true
        isSetMaterialFormMost.value = true
    }

}

/**
 * 清空UE材质
 */
const clear = () => {
    messageBox({ text: '确认一键清空？' }).then(() => {
        list.value.forEach((item: item) => { item.value = undefined })
        replaceUeMaterial()
    }).catch(() => { })
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


/**
 * 输入框失去焦点
 * @param value 

 */
const handleBlur = (value: string | undefined) => {
    if (!value) return
    const index = tilesetUEMaterial.value.findIndex((item: string) => item == value)
    if (index == -1) Message.warning('请输入正确的UE材质ID')

}

/**
 * 替换UE材质
 */
const replaceUeMaterial = () => {
    const result = convertListToObject(list.value)
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    sceneObject.materialOverrideMap = result
}


/**
 * 导入文件
 */
const importJsonFile = async () => {
    try {
        Message.warning('正在打开..')
        const handle = await getOpenFileHandle('json');
        if (!handle) return;
        const jsonStr = await getTextFromFile(handle);
        if (!jsonStr) return;
        console.log("字符串", jsonStr)
        let result = JSON.parse(jsonStr)

        const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
        sceneObject.materialOverrideMap = result
        list.value.forEach(item => {
            item.value = result[item.key]
        })
        Message.success('导入成功！')
    } catch (error) {
        Message.error(`打开失败！ error: ${error}`);
    }
}
/**
 * 导出文件
 */
const exportJsonFile = async () => {
    const jsonStr = JSON.stringify(convertListToObject(list.value))
    const name = "materialOverrideMap"
    try {
        Message.warning('正在另存为..');
        const handle = await getSaveFileHandle('json', name);
        if (!handle) return;
        await saveFile(handle, jsonStr);
        Message.success('另存成功!');
    } catch (error) {
        Message.error(`另存失败! error: ${error}`);
    }
}


onMounted(() => {
    getMaterialNameList()
    getTilesetMaterialIDList()
    nextTick(() => {
        const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
        orginalMaterialOverrideMap.value = sceneObject.materialOverrideMap ? JSON.parse(JSON.stringify(sceneObject.materialOverrideMap)) : {}
    });
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
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 40px 1fr 1fr 30px;
    align-items: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
}

.middle_title p {
    text-align: center;
    font-size: 12px;
    text-align: center;
    margin: 0px;
    padding: 0px;
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
    margin-right: 10px;
    cursor: pointer;
}

.footer button:hover {
    border: 2px solid rgba(44, 104, 247, 1);
}
</style>
