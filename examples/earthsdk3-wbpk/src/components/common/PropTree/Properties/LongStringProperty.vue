<template>
    <div class="readonly_flag" :class="readonly ? 'readonly_true' : ''">
        <div class="readonly_flag" :class="readonly ? 'readonly_none' : ''">
            <div class="prop_edit">
                <span v-if="stringRef === undefined">未设置</span>
                <span class="Undefined_settting" @click.stop="openPop" title="设置属性值">⚙</span>
            </div>
            <span v-if="withUndefined && (stringRef !== undefined)" class="Undefined_settting"
                @click.stop="changeUndefined" title="设为undefined">╳</span>
        </div>
    </div>
    <Window :title="propertyName" :show="collectionShow" @ok="changeStringRef" @cancel="changeCancel"
        :readonly="readonly" :width="700" :height="450">
        <div class="set_button">
            <button @click="copyString">复制</button>
            <button @click="importTextFile">导入</button>
            <button @click="saveTxtFile">导出</button>
            <button @click="sampleDocument">示例文档</button>
        </div>
        <div class="Positions">
            <textarea name="" id="" cols="30" rows="10" v-model="stringRecat"></textarea>
        </div>
    </Window>
    <SamplePanel :jsonStr="sampleValue ?? '<center>暂无数据</center>'" :propertyName="propertyName" :isShow="sampleShow"
        @changeShow="changeSampleShow">
    </SamplePanel>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { createVueDisposer, getOpenFileHandle, toReadonlyVueRef, toVR, getSaveFileHandle, getTextFromFile, saveFile } from "../../../tools";
import { LongStringProperty } from "earthsdk3";
import { copyClipboard } from "../../../utility/copyClipboard";
import Message from "../../../utility/Message";
import SamplePanel from '../../SamplePanel.vue';
import Window from "../../Window.vue";
import { PropertyCompCallbackFuncParamsType } from "./base";

const props = withDefaults(defineProps<{
    property: any
}>(), {
});
const emits = defineEmits<{
    (e: 'callback', params: PropertyCompCallbackFuncParamsType): void;
}>();

const collectionShow = ref(false)
const stringRecat = ref('')
const sampleShow = ref(false)

const { property } = props;
const readonly = property.readonly;
const withUndefined = property.withUndefined;
const propertyName = property.name;
const disposer = createVueDisposer(onBeforeUnmount);
const stringRef = readonly ? toReadonlyVueRef<string | undefined>(disposer, property.reactVar, s => s && s as string) : toVR<string | undefined>(disposer, property.reactVar, s => s && s as string)
const defaultValue: string | undefined = property.defaultValue
const sampleValue: string | undefined = property.sampleValue// property.sampleValue

const sampleDocument = () => {
    sampleShow.value = true
}

const changeSampleShow = (flag: boolean) => {
    sampleShow.value = flag
}

const copyString = () => {
    const str = stringRecat.value
    copyClipboard(str)//复制
}

const importTextFile = async () => { //导入文件
    try {
        Message.info('正在打开..')
        const handle = await getOpenFileHandle('txt');
        if (!handle) return;
        const str = await getTextFromFile(handle);
        if (!str) return;
        stringRecat.value = str
        Message.success('导入成功！')
    } catch (error) {
        Message.error(`打开失败！ error: ${error}`);
    }
}

const saveTxtFile = async () => {
    const str = stringRecat.value
    saveAs(str)
}

const saveAs = async (text: string) => {//导出下载
    try {
        Message.info('正在另存为..');
        const handle = await getSaveFileHandle('txt');
        if (!handle) return;
        await saveFile(handle, text);
        Message.success('另存成功!');
    } catch (error) {
        Message.error('另存失败! error: ${error}');
    }
}

const openPop = () => {
    stringRecat.value = JSON.parse(JSON.stringify(stringRef.value ?? defaultValue ?? ''))
    collectionShow.value = true
}

const changeStringRef = () => {
    stringRef.value = JSON.parse(JSON.stringify(stringRecat.value))
    collectionShow.value = false
}

const changeCancel = () => {
    collectionShow.value = false
    stringRecat.value = ''
}

const changeUndefined = () => {
    stringRef.value = undefined
    if (collectionShow.value) {
        changeCancel()

    }
}

</script>
<style scoped>
textarea {
    width: calc(100% - 40px);
    height: calc(100% - 50px);
    color: #fff;
    font-size: 12px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
    border-radius: 10px;
    background: #003847;
    border: 1px solid #384b50;
    outline: 1px solid #384b50;
}

textarea:focus {
    outline: 1px solid #384b50;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
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


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.set_button {
    margin-left: 10px;
}

button {
    width: 80px;
    height: 30px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    margin: 5px 10px 5px 0px;
    user-select: none;
    border: 1px solid #384b50;
    background-color: #0d2b34;
}

button:hover {
    background-color: #00212b;
}

.Positions {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.Undefined_settting {
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
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
</style>
