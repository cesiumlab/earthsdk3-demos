<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <div class="prop_edit">
                <span v-if="positionRef === undefined">未设置</span>
                <span class="Undefined_settting" @click="collectionShow = true" title="设置属性值">⚙</span>
            </div>
            <span v-if="withUndefined && (positionRef !== undefined)" class="Undefined_settting"
                @click="positionRef = undefined" title="设为undefined">╳</span>
        </div>
    </div>
    <Window :title="'位置集合'" :footervisible="true" :showCancelButton="false" v-if="collectionShow" :confirmtext="'关闭'"
        @ok="collectionShow = false" :width="600" :height="400">
        <div class="Positions">
            <div class="input3">
                <span>经度</span>
                <span>纬度</span>
                <span>高度</span>
                <span class="Undefined_settting" @click="addPosition()" title="添加线">+</span>
            </div>
            <div v-for="(item, index) in positionRef" :key="index">
                <template v-for="(item1, index1) in item" :key="index1">
                    <div v-if="index1 === 0" class="input3_line">
                        <span class="Undefined_settting" @click="addPoint(index)" title="添加点">+</span>
                        <span class="Undefined_settting" @click="deletePosition(index)" title="删除线">╳</span>
                    </div>
                    <div class="input3">
                        <input type="number" :value="item1[0]"
                            @input="inputHandler($event, positionRef, index, index1, 0)" />
                        <input type="number" :value="item1[1]"
                            @input="inputHandler($event, positionRef, index, index1, 1)" />
                        <input type="number" :value="item1[2]"
                            @input="inputHandler($event, positionRef, index, index1, 2)" />
                        <!-- <span class="Undefined_settting" @click="visualEditing = !visualEditing" title="可视化编辑"
                            :class="visualEditing ? 'Undefined_settting_active' : ''">⨀</span> -->
                        <span class="Undefined_settting" @click="deletePoint(index, index1)" title="删除点">╳</span>
                    </div>
                </template>

            </div>
        </div>
    </Window>
</template>


<script setup lang="ts">
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { onBeforeUnmount, ref } from "vue";
import { PositionsSetPropety } from "earthsdk3";
import Window from "../../WindowPop.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";
type Positions = [number, number, number][][]

const props = withDefaults(defineProps<{
    property: any
}>(), {})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();
const collectionShow = ref(false)

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const positionRef = readonly ? toReadonlyVueRef<Positions | undefined>(disposer, property.reactVar, s => s && ([...s] as Positions)) : toVR<Positions | undefined>(disposer, property.reactVar, s => s && ([...s] as Positions))

const addPosition = () => {
    if (positionRef.value === undefined) {
        positionRef.value = [[[0, 0, 0], [0, 0, 0]]]
        return
    }
    positionRef.value.push([[0, 0, 0], [0, 0, 0]])
}
const deletePosition = (index: number) => {
    if (positionRef.value === undefined) {
        return
    }
    positionRef.value.splice(index, 1)
}

const addPoint = (index: number) => {
    //,item.push([0, 0, 0])
    if (!positionRef.value) {
        return
    }
    let positionArr = JSON.parse(JSON.stringify(positionRef.value))
    positionArr[index].push([0, 0, 0])
    positionRef.value = positionArr

}
const deletePoint = (index: number, index1: number) => {
    if (positionRef.value === undefined) {
        return
    }
    let positionArr = JSON.parse(JSON.stringify(positionRef.value))
    positionArr[index].splice(index1, 1)
    positionRef.value = positionArr
}
const inputHandler = (e: any, posValues: [number, number, number][][] | undefined, index: number, index1: number, num: number) => {
    if (posValues === undefined) {
        return
    }
    let positionArr = JSON.parse(JSON.stringify(posValues))
    positionArr[index][index1][num] = Number(e.target.value)
    positionRef.value = positionArr
}

// @ts-ignore
const visualEditing = false
// const visualEditing = createPositionVisualEditingForVue3((window.g_projectManager as ProjectManager).sceneObjectsManager, property.reactVar);

</script>

<style scoped>
.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.Positions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.input3 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 5px 0px;
    align-items: center;
}

.input3_line {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 5px 0px;
    align-items: center;
}

.input3>input {
    width: 25%;
    height: 18px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
}

.Undefined_settting {
    width: 20px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;

}

.Undefined_settting_active {
    color: #64bd63;
}


.Undefined_settting:hover {
    background-color: #383838;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.readonly_true {
    cursor: not-allowed;
    cursor: no-drop;
}

.readonly_none {
    pointer-events: none;
}
</style>
