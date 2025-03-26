<script setup lang='ts'>
import { nextTick, ref } from 'vue';
import { getAssetsDir } from '../tools';

const emits = defineEmits(['loadIframe']);

const mainIframe = ref<HTMLIFrameElement>();
// const iframeSrc = getAssetsDir('/monaco-editor/json-editor.html');
const iframeSrc = './monaco-editor/json-editor.html';

const loadJson = async (jsonStr: string) => {
    await nextTick()
    if (!mainIframe.value) return
    await setJson(jsonStr)
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

defineExpose({ loadJson, getJson })



</script>

<template>
    <iframe :src="iframeSrc" frameborder="0" ref="mainIframe" class="main-iframe" @load="emits('loadIframe')"></iframe>
</template>

<style scoped>
.main-iframe {
    width: 100%;
    height: 100%;
    cursor: not-allowed;
}
</style>
