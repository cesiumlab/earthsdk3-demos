<template>
    <DraggablePopup2 v-if="props.isShow" :minWidthHeight="[510, 100]"
        :title="`${(scenetree && scenetree.name) ? scenetree.name : ''}-编辑器`" :width="1000" :height="'600px'"
        :left="300" :top="100" @close="cancel" :showButton="true" @ok="confirm">
        <div class="style">
            <div class="left">
                <div class="left-header">
                    <button @click="switchConfig('规则配置UI')"
                        :class="{ activeButton: configMode == '规则配置UI' }">规则配置UI</button>
                    <button @click="switchConfig('规则配置JSON')"
                        :class="{ activeButton: configMode == '规则配置JSON' }">规则配置JSON</button>
                </div>
                <div class="left-content">
                    <div v-if="configMode == '规则配置UI'">
                        <div class="rule-fun">
                            <button>添加规则</button>
                        </div>
                        <div class="rule-header">
                            <p>序号</p>
                            <p>规则</p>
                            <p>颜色</p>
                            <p>显隐</p>
                        </div>
                        <div class="rule-content">
                            <div>

                            </div>
                        </div>
                    </div>
                    <iframe v-else :src="iframeSrc" frameborder="0" @load="loadIframe" ref="mainIframe"
                        style="width:calc(100% - 10px);  height:calc(100% - 10px);cursor: not-allowed"></iframe>
                </div>
                <div class="left-footer">
                    <button>配置规则</button>
                    <button>另存新样式</button>
                    <button>应用</button>
                </div>
            </div>
            <div class="right">
                <div v-for="(item, index) in styleList" :key="index">
                    <img :src="item.thumbnail">
                    <ESTooltip :tooltip="item.name" position="top">
                        <p>{{ item.name }}</p>
                    </ESTooltip>
                </div>
            </div>
        </div>
    </DraggablePopup2>

</template>

<script setup lang="ts">
import { Message, messageBox } from "earthsdk-ui";
import { inject, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { SceneObject } from "xbsj-base";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import ContextMenuCom from '../../../components/commom/ContextMenuCom.vue';
import { SceneTreeItem, ES3DTileset } from "earthsdk3";
import EnumProp from "../../eSPropPanel/propertiesMenu/commons/EnumProp.vue"
import { ESColor, ESTooltip } from "earthsdk-ui"
import BooleanProp from "../../eSPropPanel/propertiesMenu/commons/BooleanProp.vue";

import DraggablePopup2 from "../../DraggablePopup2.vue";
import { ESSceneObject } from "earthsdk3";
// 传入值
const props = withDefaults(defineProps<{ isShow: boolean, setStyleTreeItem: SceneTreeItem | undefined, }>(), {});
// 分发内容
const emits = defineEmits(["changeShow"]);
// 配置方式
const configMode = ref('规则配置UI')
// 当前选中对象
const scenetree = ref()
//默认的样式
const styleList = ref([
    {
        name: "默认样式",
        code: [
            {
                condition: [{
                    field: "id",
                    op: "==",
                    value: "xxx"
                }],
                color: [1, 0, 0, 1],
                show: true
            }
        ],
        thumbnail: "data:image/jpeg;base64,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",
    }
])
//规则的变量
const ruleRef = ref<any>([
    {
        condition: [{
            field: "id",
            op: "==",
            value: "xxx"
        }],
        color: [1, 0, 0, 1],
        show: true
    }
])
// iframe的地址
const iframeSrc = ESSceneObject.getStrFromEnv('${earthsdk3-assets-script-dir}/markdown/monaco-editor/json-editor.html');
// iframe的ref
const mainIframe = ref<HTMLIFrameElement>();


// 监听setStyleTreeItem
watch(() => props.setStyleTreeItem, async () => {
    scenetree.value = props.setStyleTreeItem
}, { immediate: true })
/**
 * 切换配置方式
 * @param config 
 */
const switchConfig = (config: string) => {
    configMode.value = config
}
// json编辑器初始化
const loadIframe = async () => {
    if (!mainIframe.value || !mainIframe.value.contentWindow) {
        return;
    }
    const setKey = getUuid()
    mainIframe.value.contentWindow.postMessage({ type: 'setJson', id: setKey, value: JSON.stringify(ruleRef.value) })
}

// 确定
const confirm = () => {
    emits('changeShow', false);
}
// 取消
const cancel = () => {
    emits('changeShow', false);
}
// 生成随机ID 
const getUuid = () => {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
</script>
<style scoped>
.style {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
}

.left-header button {
    width: 120px;
    height: 32px;
    background: rgba(28, 28, 29, 0.6);
    border: 1px solid #888888;
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
}

.activeButton {
    background: rgba(44, 104, 247, 1) !important;
}

.left-header button:hover {
    background: rgb(17, 51, 244) !important;
}

.left-header button:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
    border-right: none;
}

.left-header button:nth-child(2) {
    border-radius: 0px 4px 4px 0px;
}

.rule-fun button,
.left-footer button {
    min-width: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 32px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #6c7184;
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
    margin-right: 10px;
}

.rule-fun button:hover,
.left-footer button:hover {
    border: 1px solid rgba(44, 104, 247, 1);
}

.left {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.left-content {
    position: relative;
    flex-grow: 1;
    background-color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
}

.right {
    padding: 30px 15px;
    overflow-y: auto;
}

.right div {
    width: 68px;
    height: 98px;
    cursor: pointer;
    margin: 5px;
    display: flex;
    flex-direction: column;
}

.right img {
    display: inline-block;
    border: 2px solid #fff;
    border-radius: 5px;

}

.right img:hover {
    border: 2px solid rgb(5, 156, 250);
}

.right p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    padding: 0px;
    margin: 0px;
    text-align: center;
}

.right p:hover {
    color: rgb(57, 186, 255);
}

.es-tooltip {
    margin: 5px 0px !important;
}

.rule-header {
    display: grid;
    grid-template-columns: 80px 1fr 80px 80px;

    padding: 5px 10px;
    background-color: #414247;
}

.rule-header p {
    padding: 0px;
    margin: 0px;
    border-right: 1px solid rgb(130, 130, 130);
    text-align: center;
    font-size: 13px;
}

.rule-header p:last-child {
    border: none
}

.rule-fun {
    position: absolute;
    top: -10px;
    right: 0px;
    transform: translateY(-100%);
    display: flex;
    justify-content: flex-end;
}
</style>