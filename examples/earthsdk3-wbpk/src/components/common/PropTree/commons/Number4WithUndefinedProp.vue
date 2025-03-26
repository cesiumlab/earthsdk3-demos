<script setup lang='ts'>
import { ref } from "vue";
// import Window from "../../WindowPop.vue";
import Window from "../../Window.vue";

type defaultValueType = [number | undefined, number | undefined, number | undefined, number | undefined]
const props = withDefaults(defineProps<{
    modelValue?: defaultValueType,
    defaultValue?: defaultValueType,
    withUndefined?: boolean
    readonly?: boolean,
    propertyName?: string
}>(), { withUndefined: true, readonly: false, propertyName: "属性值" })

const emits = defineEmits(["update:modelValue"]);

const collectionShow = ref(false)
const number4Ref = ref<defaultValueType | undefined>(undefined)

const inputHandler = (e: any, numberValues: defaultValueType | undefined, num: number) => {
    if (numberValues === undefined) return
    const numberArr = [...numberValues] as defaultValueType
    numberArr[num] = Number(e.target.value)
    number4Ref.value = [...numberArr]
}

const setItemToNumber = (numberValues: defaultValueType | undefined, index: number) => {
    if (numberValues === undefined) return
    const numberArr = [...numberValues] as defaultValueType
    numberArr[index] = 0
    number4Ref.value = [...numberArr]
}
const setItemToUndefined = (numberValues: defaultValueType | undefined, index: number) => {
    if (numberValues === undefined) return
    const numberArr = [...numberValues] as defaultValueType
    numberArr[index] = undefined
    number4Ref.value = [...numberArr]
}

const toNumber = () => {
    if (props.modelValue === undefined) {
        number4Ref.value = props.defaultValue ?? [undefined, undefined, undefined, undefined]
    } else {
        const arr = JSON.parse(JSON.stringify(props.modelValue)) as defaultValueType
        number4Ref.value = arr
    }
    collectionShow.value = true
}

const cancel = () => {
    number4Ref.value = undefined
    collectionShow.value = false
}
const ok = () => {
    const arr = JSON.parse(JSON.stringify(number4Ref.value))
    emits('update:modelValue', arr)
    collectionShow.value = false
}

</script>

<template>
    <div class="prop_box">
        <div class="prop_edit">
            <span class="is_undefined">{{ (modelValue === undefined) ? '未设置' : '' }}</span>
            <span class="set_btn" @click.stop="toNumber()" :title="`${readonly ? '查看' : '设置'}${propertyName}`">⚙</span>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined) && !readonly" class="set_btn"
            @click="emits('update:modelValue', undefined)" title="设为undefined">╳</span>
    </div>
    <Window :title="propertyName" :readonly="readonly" :show="collectionShow" @ok="ok" @cancel="cancel"
        :width="600" :height="300">
        <div class="prop_list" :class="{ 'readonly_style': readonly }">
            <div v-for="(item, index) in number4Ref" :key="index">
                <div v-if="item === undefined">
                    <span>未设置</span>
                    <span class="set_btn" @click="setItemToNumber(number4Ref, index)" :class="{ 'readonly_true': readonly }"
                        title="设置属性值">⚙</span>
                </div>
                <input v-if="(item !== undefined) && number4Ref" type="number" v-model.lazy="number4Ref[index]"
                    :disabled="readonly" @input="inputHandler($event, number4Ref, index)" />
                <span v-if="item !== undefined" class="set_btn" @click="setItemToUndefined(number4Ref, index)"
                    title="设为undefined" :class="{ 'readonly_true': readonly }">╳</span>
            </div>
        </div>
    </Window>
</template>

<style scoped>
.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.prop_list {
    width: 80%;
    height: 100%;
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.prop_list>div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

input {
    width: 90%;
    height: 18px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
}
input::selection {
    background: rgb(0, 200, 255);
    color: rgb(23, 22, 23);
}
.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.is_undefined {
    width: 36px;
    font-size: 12px;
    text-align: center;
}

.set_btn {
    cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
}

.set_btn:hover {
    background-color: #383838;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}

.readonly_style {
    cursor: not-allowed;
    cursor: no-drop;
    user-select: none;
}
</style>
