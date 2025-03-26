<script setup lang='ts'>
import { ref } from 'vue';
import JsonStringProps from './JsonStringProps.vue';

const props = withDefaults(defineProps<{
    modelValue: any[],
    paramTypes: string[],
    readonly?: boolean,
    sampleValue?: string
}>(), { readonly: false });

const collectionShow = ref(false)
const emits = defineEmits(["func", "setVal"]);

const openPop = () => {
    let obj: { [k: string]: any } = {}
    try {
        props.paramTypes.forEach((key, index) => {
            obj[key] = props.modelValue[index]
        })
        jsonStr.value = JSON.stringify(obj, undefined, '    ')
        console.log(jsonStr.value)
        collectionShow.value = true
    } catch (error) {
        console.error(error)
    }
}

const jsonStr = ref('')

const getJsonStr = (str: string) => {
    try {
        const arr: any[] = []
        const obj: { [k: string]: any } = JSON.parse(str)
        props.paramTypes.forEach(el => {
            if (obj[el] === undefined) {
                console.warn('参数' + el + '未设置值,自动赋值为undefined')
            }
            arr.push(obj[el])
        })
        emits("setVal", arr)
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="readonly_flag" :class="{ 'readonly_true': readonly }">
        <button @click="emits('func')">运行</button>
        <div class="prop_edit">
            <span class="undefined_settting" @click.stop="openPop" title="设置函数及参数">⚙</span>
        </div>
    </div>
    <JsonStringProps :readonly="readonly" :jsonStr="jsonStr" :isShow="collectionShow" @getJsonStr="getJsonStr"
        :sampleValue="sampleValue" @changeShow="collectionShow = false">
    </JsonStringProps>
</template>

<style scoped>
button {
    cursor: pointer;
    width: 60px;
    height: 20px;
    line-height: 19px;
    font-size: 12px;
    margin-right: 10px;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    background-color: #383838;
    border: none;
}

button:hover {
    background-color: #00212b;
}


.undefined_settting {
    cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
}

.undefined_settting:hover {
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
    pointer-events: none;
    user-select: none;
}
</style>
