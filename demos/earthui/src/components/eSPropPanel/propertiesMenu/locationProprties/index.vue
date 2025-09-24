<script setup lang='ts'>
import { ESSceneObject, ReactVarProperty } from 'earthsdk3';
import { XbsjEarthUi } from '../../../../scripts/xbsjEarthUi';
const props = withDefaults(defineProps<{ properties: ReactVarProperty<any>[], type?: string; treeItem?: any, lonLatFormat: string }>(), {});
import { Message, propComps } from 'earthsdk-ui'
import { inject, onBeforeUnmount, onMounted } from 'vue';
// import { propComps } from '../../index'
const emtis = defineEmits<{
    (e: 'callback', params: any & { treeItem: any }): void;
}>();
const { treeItem } = props;
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const callback = (params: any): void => {
    emtis('callback', {
        treeItem,
        ...params,
    }); ``
};
let dispose: any
onMounted(() => {
    const sceneObject = xbsjEarthUi.propSceneTree.sceneObject
    dispose = sceneObject.editingChanged.disposableOn((res: boolean) => {
        if (res) {
            Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
        } else {
            Message.remove('xxx')
        }
    })
})
onBeforeUnmount(() => {
    if (dispose) {
        // Message.remove('xxx')
        dispose()
        dispose = undefined
    }
})


</script>

<template>
    <div class="item">
        <component :is="propComps[properties[0].type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
            :property="properties[0]" :type="type" @callback=callback :lonLatFormat="lonLatFormat">
        </component>
        <component :is="propComps[properties[1].type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
            :property="properties[1]" :type="type" @callback=callback :lonLatFormat="lonLatFormat">
        </component>
    </div>
    <div v-for="item in properties.slice(2)" :key="item.memId" class="item">
        <div class="item_type">
            <component :is="propComps[item.type]" :xbsjEarthUi="xbsjEarthUi" :treeItem="xbsjEarthUi.propSceneTree"
                :property="item" :type="type" @callback=callback :lonLatFormat="lonLatFormat"></component>
        </div>
    </div>
</template>

<style scoped>
.item {
    width: 100%;
    display: flex;
    font-size: 14px;
    line-height: 20px;
    padding: 2px 10px;
    box-sizing: border-box;
    margin: 0 0 3px 0;
}



.item_name {
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}

.item_type {
    width: 100%;
}

.item_type_editing {
    width: 20%;
}
</style>
