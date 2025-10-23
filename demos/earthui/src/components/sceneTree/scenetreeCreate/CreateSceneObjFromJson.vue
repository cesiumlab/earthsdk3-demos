<template>
    <Window :minWidthHeight="[300, 200]" :title="'编辑器'" :show="props.isShow" @cancel="changeCancel" @ok="changeOk"
        :width="800" :height="500">
        <iframe :src="iframeSrc" frameborder="0" @load="loadIframe" ref="mainIframe"
            style="width:100%;  height:calc(100% - 50px);cursor: not-allowed"></iframe>
    </Window>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Message } from "earthsdk-ui"
import Window from "../../../components/commom/Window.vue";
import { ESSceneObject } from "earthsdk3";
const emits = defineEmits(["changeShow", "confirm"]);
const mainIframe = ref<HTMLIFrameElement>();
const props = withDefaults(defineProps<{
    isShow: boolean,
    json?: any
}>(), { json: {} });
const iframeSrc = ESSceneObject.getStrFromEnv('${earthsdk3-assets-script-dir}/markdown/monaco-editor/json-editor.html');
const loadIframe = async () => {
    await setJson(JSON.stringify(props.json ?? {}, undefined, '    '))
}
const changeOk = async () => {
    const str = await getJson()
    try {
        const json = JSON.parse(str);
        if (json) {
            emits("confirm", json)
        }
        changeCancel()
    } catch (error) {
        console.log('JSON格式错误!!!', error);
        Message.error(`JSON格式错误！ error: ${error}`);
        return
    }
}
const changeCancel = () => {
    emits("changeShow", false);
}
function getUuid() {
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

function setJson(value: string) {
    return new Promise<void>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const setKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'setJson', id: setKey, value })
        const time = setTimeout(() => {
            removeEventListener('message', messageSetEventWatch, false);
            reject();
        }, 10000);

        const messageSetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'setJsonReturn') || (data.id && data.id !== setKey)) {
                return;
            }
            removeEventListener('message', messageSetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok') {
                resolve();
            } else {
                reject();
            }
        }
        addEventListener('message', messageSetEventWatch, false);
    })

}

function getJson() {
    return new Promise<string>((resolve, reject) => {
        if (!mainIframe.value || !mainIframe.value.contentWindow) {
            return;
        }
        const getKey = getUuid()
        mainIframe.value.contentWindow.postMessage({ type: 'getJson', id: getKey })
        const time = setTimeout(() => {
            removeEventListener('message', messageGetEventWatch, false);
            reject();
        }, 10000);

        const messageGetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string, value: string | undefined } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'getJsonReturn') || (data.id && data.id !== getKey)) {
                return;
            }
            removeEventListener('message', messageGetEventWatch, false);
            clearTimeout(time)
            if (data.status === 'ok' && data.value) {
                resolve(data.value);
            } else {
                reject();
            }
        }
        addEventListener('message', messageGetEventWatch, false);
    })

}


</script>
<style scoped>
button {
    width: 80px;
    height: 32px;
    background: rgba(28, 28, 29, 0.60);
    border-radius: 4px;
    border: 1px solid rgba(28, 28, 29, 0.60);
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
    margin-left: 20px;
    margin-top: 10px;
}

button:hover {
    border: 1px solid #2c68f7;
}

.readonly_true {
    cursor: no-drop;
    background-color: #4c4c4c;
}
</style>