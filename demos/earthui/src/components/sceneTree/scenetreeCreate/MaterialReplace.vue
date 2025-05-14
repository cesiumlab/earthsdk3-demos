<template>
    <DraggablePopup2 v-if="props.isShow"
        :title="`${(props.setStyleTreeItem && props.setStyleTreeItem.name) ? props.setStyleTreeItem.name : ''}-材质替换编辑器`"
        :width="500" :height="'400px'" :left="500" :top="100" @close="changeCancel" :showButton="true" @ok="changeOk">
        <div class="set_materal">
            <div class="set_materal_title">
                <div>材质名称</div>
                <div>替换的材质ID</div>
                <div><span style="cursor:pointer;" @click.stop="addMaterial" title="添加" @mouseenter="hoverIndex = -1"
                        @mouseleave="hoverIndex = -2"><es-icon :name="'tianjia'"
                            :color="hoverIndex === -1 ? '#fff' : '#575B66'" :size="13" /></span></div>
            </div>
            <div class="set_materal_content" @scroll="handleScroll">
                <div class="materal_content_title" v-for="(item, index) in materalList" :key="index">
                    <div>
                        <EnumProp :scroll-position="scrollPosition" :withUndefined="false" :defaultValue="undefined"
                            :enumStrsList="materialNameList" v-model="item.name" :clickli="getEnumList">
                        </EnumProp>
                    </div>
                    <div>
                        <EnumProp :scroll-position="scrollPosition" :withUndefined="false" :defaultValue="undefined"
                            :enumStrsList="materialIdList" v-model="item.id">
                        </EnumProp>
                    </div>
                    <div><span @click="deleteMaterial(index)" @mouseenter="hoverIndex = index"
                            @mouseleave="hoverIndex = -2" style="cursor:pointer;">
                            <es-icon :name="'shanchu_2'" :color="hoverIndex === index ? '#fff' : '#575B66'"
                                :size="13" />
                        </span></div>
                </div>
            </div>
        </div>
    </DraggablePopup2>

</template>

<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import EnumProp from "../../eSPropPanel/propertiesMenu/commons/EnumProp.vue"
import DraggablePopup2 from "../../DraggablePopup2.vue";
import { ESUeViewer } from "earthsdk3-ue";
import { Message } from "earthsdk-ui";
const props = withDefaults(defineProps<{
    isShow: boolean,
    setStyleTreeItem: SceneTreeItem | undefined,
}>(), {});

const emits = defineEmits(["changeShow"]);
const changeCancel = () => {//点击取消
    emits("changeShow", false);
}
//控制划过变色的变量
const hoverIndex = ref(-2)
const materalList = ref([{
    name: '',
    id: ''
}])
const addMaterial = () => {//添加材质
    const item = {
        name: '',
        id: ''
    }
    materalList.value.push(item)
}
const deleteMaterial = (index: number) => {//删除材质
    materalList.value.splice(index, 1)
}
const materialNameList = ref<[aliasName: any, value: any, disabled: boolean][]>([])
const materialIdList = ref<[aliasName: any, value: any][]>([])
const scrollPosition = ref(0)
const handleScroll = (event: Event) => {
    if (event.target) {
        scrollPosition.value = (event.target as HTMLElement).scrollTop;
    }
}
const changeOk = async () => {//点击确定
    const result = materalList.value.reduce((obj: any, item: any) => {
        obj[item.name] = item.id;
        return obj;
    }, {});
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    sceneObject.materialOverrideMap = result
    emits("changeShow", false);
}
const changematerialNameList = (materialList: string[]): any => {
    if (materialList.length === 0) return []
    const list = materialList.map((item) => {
        if (materalList.value.findIndex((item1) => item1.name === item) !== -1) {
            return [item, item, true]
        } else {
            return [item, item, false]
        }
    })
    return list
}
const changematerialIDList = (materialList: string[]): any => {
    if (materialList.length === 0) return []
    const list = materialList.map((item) => {
        return [item, item]
    })
    return list
}
const getEnumList = async () => {//获取枚举列表
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    const materialNameListRes = await sceneObject.getMaterialNameList() as any
    materialNameList.value = changematerialNameList(materialNameListRes)
}
onMounted(async () => {
    const sceneObject = props.setStyleTreeItem?.sceneObject as ES3DTileset
    if (sceneObject.viewer instanceof ESUeViewer) {
        const materialNameListRes = await sceneObject.getMaterialNameList() as any
        materialNameList.value = changematerialNameList(materialNameListRes)
        const materialIdListRes = await sceneObject.viewer.getTilesetMaterialIDList() as any
        materialIdList.value = changematerialIDList(materialIdListRes)
        if (materialNameList.value.length === 0) Message.warning('未查询到对象的材质名称列表')
        materalList.value = [{
            name: materialNameList.value.length > 0 ? materialNameList.value[0][0] : '',
            id: materialIdList.value.length > 0 ? materialIdList.value[0][0] : ''
        }]
        getEnumList()
    }
})


</script>
<style scoped>
.set_materal {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.set_materal_title,
.materal_content_title {
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 45% 45% 10%;
    font-size: 14px;

}

.set_materal_title {
    background-color: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    margin: 5px 0;
}

.set_materal_title>div {
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-align: center;
}

.materal_content_title>div {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;


}

.materal_content_title>div:nth-child(3),
.set_materal_title>div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
}

.set_materal_content {
    width: 100%;
    flex: 1;
    overflow: auto;
}
</style>
