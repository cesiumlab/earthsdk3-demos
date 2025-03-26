<script setup lang='ts'>
import { ref, watch } from 'vue';
import { getAssetsDir } from '../tools';
const props = withDefaults(defineProps<{ markdownStr?: string, isJson?: boolean }>(), { isJson: false });

// const mdiframeSrc = getAssetsDir('/marked/index.html');
const mdiframeSrc = './marked/index.html';
// const jsoniframeSrc = getAssetsDir('/monaco-editor/json-editor.html');
const jsoniframeSrc = './monaco-editor/json-editor.html';

const markdownIframe = ref<HTMLIFrameElement>();
const mainIframe = ref<HTMLIFrameElement>();

function setMarkdown(value: string) {
    return new Promise<void>((resolve, reject) => {
        if (!markdownIframe.value || !markdownIframe.value.contentWindow) {
            return;
        }
        const setKey = getUuid()
        markdownIframe.value.contentWindow.postMessage({ type: 'setSample', id: setKey, value })
        const time = setTimeout(() => {
            removeEventListener('message', messageSetEventWatch, false);
            reject();
        }, 10000);

        const messageSetEventWatch = (messageEvent: MessageEvent<{ type: string, id: string, status: string } | undefined>) => {
            var data = messageEvent.data;
            if (!data || (data.type && data.type !== 'setSampleReturn') || (data.id && data.id !== setKey)) {
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

const loadIframe = async () => {
    if (props.isJson) {
        await setJson(props.markdownStr ?? '')
    } else {
        await setMarkdown(props.markdownStr ?? '<center>暂无数据</center>')
    }
}

watch(() => props.markdownStr, () => {
    loadIframe()
})

</script>

<template>
    <div style="width:100%;height:100%;">
        <iframe :src="mdiframeSrc" frameborder="0" v-if="!isJson" @load="loadIframe" ref="markdownIframe"
            style="width:100%;height:calc(100% - 10px);"></iframe>
        <iframe :src="jsoniframeSrc" frameborder="0" v-else @load="loadIframe" ref="mainIframe"
            style="width:100%;  height:calc(100% - 10px);cursor: not-allowed;"></iframe>
    </div>
</template>
