<script setup lang='ts'>
import { ref, watch } from 'vue'

import Window from '../../Window.vue'
import ToggleSwitch from "../../InputCheckBox.vue";
const props = withDefaults(defineProps<{
    modelValue?: [boolean, boolean][],
    withUndefined: boolean,
    defaultValue?: [boolean, boolean][],
    readonly?: boolean
}>(), { readonly: false })


const emits = defineEmits(["update:modelValue"]);

const boolean2sRef = ref<[boolean, boolean][]>([])
const viewsShow = ref(false);

// booleansRef.value = props.modelValue as boolean[]


// const changeOk = () => {
//     emits('update:modelValue', booleansRef.value)
// }

const toTheBoolean = () => {
    if (props.modelValue === undefined) {
        const arr = JSON.parse(JSON.stringify(props.defaultValue ?? [])) as [boolean, boolean][]
        boolean2sRef.value = [...arr]
        // boolean2sRef.value = arr
    } else {
        const arr = JSON.parse(JSON.stringify(props.modelValue)) as [boolean, boolean][]
        boolean2sRef.value = [...arr]
    }
    viewsShow.value = true
    // const strArr = defaultValue ?? []
    // booleansRef.value = strArr
    // viewsShow.value = true
}

const inputHandler = (obj: { flag: boolean, index: number }) => {
    const a = Math.floor(obj.index / 10)
    const b = obj.index % 10
    const bools = JSON.parse(JSON.stringify(boolean2sRef.value))
    bools[a - 1][b] = obj.flag
    boolean2sRef.value = bools
}
const toUndefined = () => {
    emits('update:modelValue', undefined)
}

const addFlag = () => {
    boolean2sRef.value.push([true, true])
}
const deleteFlag = (index: number) => {
    boolean2sRef.value.splice(index, 1)
}
const cancel = () => {
    // console.log(111);
    boolean2sRef.value = []
    viewsShow.value = false
    // booleansRef.value=[]


}
const ok = () => {
    const arr = JSON.parse(JSON.stringify(boolean2sRef.value)) as [boolean, boolean][]
    emits('update:modelValue', [...arr])
    // console.log(222);
    viewsShow.value = false
}
// watch(booleansRef, changeOk, { deep: true })
</script>

<template>
    <!-- <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div v-if="modelValue === undefined">
            <span>未设置</span>
            <span class="undefined_settting" @click="toTheNumber()" title="设置属性值">⚙</span>
        </div>
        <span v-if="modelValue !== undefined" class="undefined_settting" @click="toTheNumber()" title="设置属性值">⚙</span>
        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div> -->
    <div class="prop_box" :class="readonly ? 'readonly_true' : ''">
        <div class="prop_edit">
            <span class="is_undefined">{{ (modelValue === undefined) ? '未设置' : '' }}</span>
            <span class="set_btn" @click.stop="toTheBoolean()" title="'设置属性值'">⚙</span>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined)" class="set_btn" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
    <!-- <Window :title="'boolean数组'" :footervisible="true" :showCancelButton="false" v-if="viewsShow" :confirmtext="'关闭'"
        @ok="viewsShow = false" :width="600" :height="400">
        <div class="Positions">
            <div class="input3">
                <span>boolean数组</span>
                <span class="Undefined_settting" @click="addFlag()" title="添加">+</span>
            </div>
            <div class="Positions_line" v-for="(_, index) in booleansRef" :key="index">
                <div class="booleansRef">
                    <ToggleSwitch :booleanValue="booleansRef[index]" :index="index" @update:booleanValue="inputHandler">
                    </ToggleSwitch>
                    <span class="Undefined_settting" @click="deleteFlag(index)" title="删除">╳</span>
                </div>
            </div>

        </div>
    </Window> -->
    <Window :show="viewsShow" :title="'boolean数组'" :okText="'确认'" :cancelText="'取消'" :onlyButton="false" :readonly="readonly"
        :width="600" :height="400" :isFocus="true" @cancel="cancel" @ok="ok">
        <div class="Positions">
            <div class="input3">
                <span>值</span>
                <span class="Undefined_settting" @click="addFlag()" title="添加">+</span>
            </div>
            <!-- <div class="Positions_line" v-for="(_, index) in booleansRef" :key="index">
                <div class="booleansRef">
                    <ToggleSwitch :booleanValue="booleansRef[index]" :index="index" @update:booleanValue="inputHandler">
                    </ToggleSwitch>
                    <ToggleSwitch :booleanValue="booleansRef[index]" :index="index" @update:booleanValue="inputHandler">
                    </ToggleSwitch>
                    <span class="Undefined_settting" @click="deleteFlag(index)" title="删除">╳</span>
                </div>
            </div> -->
            <div class="Positions_line" v-for="(item, index) in boolean2sRef" :key="index">
                <div class="booleansRef">
                    <!-- <template v-for="(listitem,i) in item">
                        <ToggleSwitch v-model:booleanValue="listitem" :index="i" @update:booleanValue="inputHandler">
                        </ToggleSwitch>
                    </template> -->
                    <ToggleSwitch :booleanValue="item[0]" :index="Number(`${index + 1}0`)"
                        @update:booleanValue="inputHandler">
                    </ToggleSwitch>
                    <ToggleSwitch :booleanValue="item[1]" :index="Number(`${index + 1}1`)"
                        @update:booleanValue="inputHandler">
                    </ToggleSwitch>
                    <span class="Undefined_settting" @click="deleteFlag(index)" title="删除">╳</span>
                </div>
            </div>
        </div>
    </Window>
</template>
<style scoped>
.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}



.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.Positions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.Positions_line {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.booleansRef {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
    align-items: left;
}

.booleansRef>span {
    padding-left: 7px;
}

.input3 {
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
    align-items: center;
}


.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}



.set_btn {
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 22px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
}

.is_undefined {
    width: 36px;
    font-size: 12px;
    text-align: center;
}

.set_btn:hover {
    background-color: #383838;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}</style>
