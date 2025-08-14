<template>
    <div class="versiuo_info_list">
        <div v-for="item in version" :title="`${item.name}:${item.version}`">{{ item.name }} : {{ item.version }}</div>
    </div>
</template>
<script setup lang="ts">
import { ESUeViewer } from "earthsdk3-ue";
import { inject, onMounted, ref } from "vue";
import { getEarthuiVersion } from "../../../scripts/earthuiVersion";
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const version = ref<{ name: string, version: string }[]>([])
function getValueBeforeFirstComma(str: string) {
    var parts = str.split('  ');
    return parts[0];
}
function getValueBeforeFirstComma2(str: string) {
    var parts = str.split('  ');
    return parts[1];
}
const getVersion = async () => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    const v: any = []
    const versions = await viewer.getVersion()
    if (!versions) return
    for (let key in versions) {
        if (versions.hasOwnProperty(key)) { // 确保是对象自有属性，不是原型链上的属性
            if (key === 'esforue') {
                if (viewer instanceof ESUeViewer) {
                    v.push({ name: getValueBeforeFirstComma(versions[key]), version: getValueBeforeFirstComma2(versions[key]) })
                }
            } else {
                v.push({ name: key, version: versions[key].version })
            }
        }
    }
    v.push({ name: 'earth-ui', version: getEarthuiVersion() })
    //@ts-ignore
    v.push({ name: 'cesium', version: window.CESIUM_VERSION })
    version.value = v
}
onMounted(() => {
    getVersion()
})
</script>
<style scoped>
.versiuo_info_list {
    position: fixed;
    right: 5px;
    bottom: 35px;
    min-width: 200px;
    max-width: 300px;
    /* height: 200px; */
    background: rgba(37, 38, 42, 1);
    z-index: 2000;
    border: 1px solid rgba(180, 180, 180, 1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    padding: 3px 10px;
}

.versiuo_info_list>div {
    width: 100%;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
</style>