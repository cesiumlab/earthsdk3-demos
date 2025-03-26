<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <div class="prop_edit">
                <span v-if="positionRef === undefined">未设置</span>
                <span class="Undefined_settting" @click="openWindow" title="设置属性值">⚙</span>
            </div>
            <span v-if="withUndefined && (positionRef !== undefined)" class="Undefined_settting"
                @click="positionRef = undefined" title="设为undefined">╳</span>
            <!-- <span class="Undefined_settting" @click="visualEditing = !visualEditing" title="可视化编辑"
                :class="visualEditing ? 'Undefined_settting_active' : ''">⨀</span> -->
        </div>
    </div>
    <Window :title="'位置数组'" :show="collectionShow" @ok="changeOk()" @cancel="collectionShow = false"
        :readonly="readonly" :width="600" :height="400">
        <div class="Positions">
            <div class="input3">
                <span>经度</span>
                <span>纬度</span>
                <span>高度</span>
                <span class="Undefined_settting" @click="addPosition()" title="添加点">+</span>
            </div>
            <div v-for="(item, index) in positionLocalRef" :key="index">
                <div class="input3">
                    <input type="number" name="" id="" v-model.number.lazy="item[0]" @mousewheel="item[0] + 1"
                        @DOMMouseScrol="item[0] - 1" />
                    <input type="number" name="" id="" v-model.number.lazy="item[1]" @mousewheel="item[1] + 1"
                        @DOMMouseScrol="item[1] - 1" />
                    <input type="number" name="" id="" v-model.number.lazy="item[2]" @mousewheel="item[2] + 1"
                        @DOMMouseScrol="item[2] - 1" />
                    <span class="Undefined_settting" @click="deletePosition(index)" title="删除点">╳</span>
                </div>
            </div>
        </div>
    </Window>
</template>


<script setup lang="ts">
import { PositionsProperty } from "earthsdk3";
import { createVueDisposer, toReadonlyVueRef, toVR } from "../../../tools";
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, toRaw, watch } from "vue";
import Window from "../../Window.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";
type Positions = [number, number, number][]
const props = withDefaults(defineProps<{
    property: any
}>(), {})
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const { property } = props
const readonly = property.readonly
const withUndefined = property.withUndefined
const disposer = createVueDisposer(onBeforeUnmount)
const positionRef = readonly ? toReadonlyVueRef<Positions | undefined>(disposer, property.reactVar, s => s && ([...s] as Positions)) : toVR<Positions | undefined>(disposer, property.reactVar, s => s && ([...s] as Positions))

const positionLocalRef = ref<Positions | undefined>(undefined)

const collectionShow = ref(false)

const addPosition = () => {
    if (!positionLocalRef.value) {
        positionLocalRef.value = []
    }
    positionLocalRef.value.push([0, 0, 0])
}
const deletePosition = (index: number) => {
    if (!positionLocalRef.value) {
        return
    }
    positionLocalRef.value.splice(index, 1)
}

const visualEditing = ref(false);

const instance = getCurrentInstance();
if (instance) {
    emits('callback', {
        componentInstance: instance,
        property,
        customEventName: 'BindingPositionsVisualEditing',
        otherParams: [property.reactVar],
    });
}
const openWindow = () => {
    if (positionRef.value === undefined) {
        positionLocalRef.value = undefined
    } else {
        positionLocalRef.value = JSON.parse(JSON.stringify(positionRef.value))
    }
    collectionShow.value = true
}

const changeOk = () => {
    positionRef.value = positionLocalRef.value
    collectionShow.value = false
}

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
    cursor: pointer;
    line-height: 20px;
    width: 20px;
    height: 20px;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    ;
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
